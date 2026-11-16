import {mcpDiagnosticError} from '../../src/lib/mcp/diagnostics.js';
import {assertMcpApplyCommitted} from '../../src/lib/mcp/page-state.js';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { randomUUID, createHash } from 'node:crypto';
import { assertNoSecrets, assertSafeIdentifier, resolvePageAssetBindings, MangaControlError } from '../../src/lib/mcp/contract.js';
import { exportCompletedPage, writeProjectManifest } from './exports.mjs';
import {compactPageTransport,assertPageTransportBudget} from './page-transport.mjs';
import {AssetTransfer,ASSET_REFS_FEATURE} from './asset-transfer.mjs';
import {pageContentHash,pageGenerationMetadata,generationMetadataHash} from './store.mjs';

const semanticEdits = new Set(['topic','scenario','prompt','cast','recognition','reference_item','background','style_json','enhance_revert','history_select','panel_adopt']);
const terminal = new Set(['completed', 'failed', 'cancelled', 'interrupted']);
export class JobQueue {
  constructor(store,{downloadsDirectory}={}) { this.store = store; this.downloadsDirectory=downloadsDirectory;this.jobs = new Map(); this.tail = Promise.resolve(); this.client = null; }
  exclusive(fn) { const p = this.tail.then(fn); this.tail = p.catch(() => {}); return p; }
  async init() {
    this.directory = await this.store.safeDirectory(path.join(this.store.root, 'jobs'));
    for (const name of await fs.readdir(this.directory)) {
      if (!/^[a-f0-9-]{36}\.json$/.test(name)) continue;
      const file = path.join(this.directory, name); await this.store.rejectLinkedFile(file);
      const job = JSON.parse(await fs.readFile(file, 'utf8'));
      assertNoSecrets(job);
      if (['running', 'cancelling'].includes(job.state)) {
        job.state = job.executionStarted===false?'cancelled':'interrupted'; job.error = { code: job.executionStarted===false?'NOT_STARTED':'COMPLETION_UNKNOWN', message: 'The prior server ended while this dispatch was active. Unacknowledged work was not started; acknowledged unknown work is never automatically repeated.' }; await this.save(job);
      }
      this.jobs.set(job.id, job);
    }
    return this;
  }
  async save(job) { await this.store.atomic(path.join(this.directory, `${assertSafeIdentifier(job.id)}.json`), job); }
  summary(job) {
    return { id: job.id, projectId: job.projectId, pageId: job.pageId, operation: job.operation, state: job.state,
      createdAt: job.createdAt, updatedAt: job.updatedAt, progress: job.progress ?? null, error: job.error ?? null,
      result: job.result ?? null, cancelRequested: Boolean(job.cancelRequested) };
  }
  get(id) { const job = this.jobs.get(assertSafeIdentifier(id)); if (!job) throw new MangaControlError('JOB_NOT_FOUND', 'Use a job identifier returned by manga_run.'); return job; }
  async submit({ projectId, pageId, operation, input = {}, expectedRevision, idempotencyKey }) {
    return this.exclusive(() => this.submitUnlocked({ projectId, pageId, operation, input, expectedRevision, idempotencyKey }));
  }
  async submitUnlocked({ projectId, pageId, operation, input = {}, expectedRevision, idempotencyKey }) {
    if(this.closing)throw new MangaControlError('SERVICE_STOPPING','This service is shutting down; no new work was submitted.');
    assertNoSecrets(input); assertSafeIdentifier(idempotencyKey);
      const requestHash = createHash('sha256').update(JSON.stringify({ projectId, pageId, operation, input, expectedRevision })).digest('hex');
      const keyHash = createHash('sha256').update(idempotencyKey).digest('hex');
      const existing = [...this.jobs.values()].find(j => j.keyHash === keyHash);
      if (existing) { if (existing.requestHash !== requestHash) throw new MangaControlError('IDEMPOTENCY_CONFLICT', 'This job request identifier was used with different input.'); return this.summary(existing); }
      const project = await this.store.get(projectId);
      if (project.revision !== expectedRevision) throw new MangaControlError('REVISION_CONFLICT', `Read current project revision ${project.revision} before dispatch.`);
      if (pageId && !project.pages.some(p => p.id === pageId)) throw new MangaControlError('PAGE_NOT_FOUND', 'Page does not belong to this project.');
      const now = new Date().toISOString(), job = { id: randomUUID(), projectId, pageId, operation, input,
        expectedRevision, keyHash, requestHash, state: this.client ? 'queued' : 'waiting_for_connection', createdAt: now, updatedAt: now };
      await this.save(job); this.jobs.set(job.id, job); return this.summary(job);
  }
  async connect(clientId, operations, features=[]) {
    return this.exclusive(async () => {
    if(this.closing)throw new MangaControlError('SERVICE_STOPPING','This service is shutting down; reconnect to the next healthy instance.');
    if (this.client && this.client.id !== clientId && Date.now() - this.client.seenAt < 180000) throw new MangaControlError('BROWSER_ALREADY_CONNECTED', 'Disconnect the currently paired application before replacing it.');
    if (this.client && this.client.id !== clientId) {
      for (const job of this.jobs.values()) if (job.clientId === this.client.id && ['running', 'cancelling'].includes(job.state)) {
        job.state = job.executionStarted===false?'cancelled':'interrupted'; job.error = { code: job.executionStarted===false?'NOT_STARTED':'COMPLETION_UNKNOWN', message: 'The prior application connection expired. Inspect retained state and explicitly resume acknowledged unknown work; late results cannot replace another attempt.' }; await this.save(job);
      }
    }
    this.client = { id: clientId, operations, features, seenAt: Date.now() }; return { connected: true };
    });
  }
  heartbeat(clientId) {
    if (this.client?.id !== clientId) throw new MangaControlError('BROWSER_NOT_CONNECTED', 'Pair this application session again.');
    this.client.seenAt = Date.now();
    return { cancelJobIds: [...this.jobs.values()].filter(j => j.clientId === clientId && j.cancelRequested && !terminal.has(j.state)).map(j => j.id) };
  }
  async next(clientId) {
    return this.exclusive(async () => {
      if(this.closing)return {job:null};
      this.heartbeat(clientId);
      if ([...this.jobs.values()].some(j => ['running', 'cancelling'].includes(j.state))) return { job: null };
      const job = [...this.jobs.values()].find(j => ['queued', 'waiting_for_connection'].includes(j.state));
      if (!job) return { job: null };
      const unknown = [...this.jobs.values()].find(j => j.state === 'interrupted' && !j.recoveryAcknowledged);
      if (unknown && !['read_state', 'apply_page'].includes(job.operation)) {
        job.state = 'waiting_for_recovery'; job.error = { code: 'COMPLETION_UNKNOWN', message: `Inspect interrupted job ${unknown.id} before explicitly resuming paid work.` }; await this.save(job); return { job: null };
      }
      if (!this.client.operations.includes(job.operation)) {
        job.state = 'failed'; job.error = { code: 'OPERATION_UNAVAILABLE', message: 'This connected application does not implement the requested operation. Update the current application; no API was called.' }; await this.save(job); return { job: null };
      }
      const project = await this.store.get(job.projectId);
      if (project.revision !== job.expectedRevision) {
        job.state = 'failed'; job.error = { code: 'REVISION_CONFLICT', message: 'Project changed before dispatch; no API was called.' }; await this.save(job); return { job: null };
      }
      if (['image', 'image_edit', 'generate_assets', 'render_book'].includes(job.operation)||job.operation==='edit_state'&&['panel_generate','panel_adopt'].includes(job.input.action)) {
        try { await this.store.assertApproved(job.projectId); }
        catch (error) { job.state = 'failed'; job.error = { code: error.code, message: error.message }; await this.save(job); return { job: null }; }
      }
      job.approvedPlanHash=project.approval?.hash;
      const page = project.pages.find(item => item.id === job.pageId);
      if(job.operation==='edit_state'&&semanticEdits.has(job.input.action)){
        if(['history_select','panel_adopt'].includes(job.input.action))job.contentBeforeExportSha=page?.export?.imageSha256;
        job.contentBefore=pageContentHash(page?.snapshot,job.contentBeforeExportSha);
      }
      job.state = 'running';job.executionStarted=false; job.clientId = clientId; job.attemptId = randomUUID(); job.updatedAt = new Date().toISOString(); await this.save(job);
      try {
      const bindings = Object.entries(resolvePageAssetBindings(project,page)).map(([slotId, binding]) => ({ slotId, ...binding }));
      const previous = page && project.pages.find(item => item.index === page.index - 1);
      const materialize = ['apply_page','recognition'].includes(job.operation);
      const signature=bindings.map(binding=>`${binding.slotId}:${binding.asset.id}:${binding.role}`).sort();
      const compact=materialize?compactPageTransport(project,page,signature,{recognitionReset:job.operation==='recognition'}):{};
      const transfer=this.client.features?.includes(ASSET_REFS_FEATURE)?new AssetTransfer(job.id,job.attemptId):null;
      const hydrate=value=>transfer?transfer.encode(value):this.store.assets.hydrate(value);
      if(materialize&&!transfer)assertPageTransportBudget({snapshot:compact.snapshot,recognition:compact.recognition,assets:bindings.map(binding=>binding.asset),previous:previous?.snapshot?.accepted!==false?previous?.snapshot?.generatedImage:undefined});
      return { job: { id: job.id, attemptId: job.attemptId, operation: job.operation, input: job.input,
        projectId: job.projectId, pageId: job.pageId, expectedRevision: job.expectedRevision,
        expectedScenario:page?.snapshot?.scenario??project.plan?.detail?.pages?.find(item=>item.pageId===page?.id)?.scenario??project.plan?.detail?.pages?.find(item=>item.pageId===page?.id)?.direction,
        project: { id: project.id, brief: project.brief, settings: project.settings, castBible: project.castBible, assetMode: project.assetMode, plan: project.plan,
          assetSpecs: project.assetSpecs, assetBindings:project.assetBindings, ...(materialize?{recognition:await hydrate(compact.recognition)}:{}), pages: project.pages.map(({snapshot: _snapshot, ...meta})=>meta) },
        ...(materialize ? { page:page?{...page,snapshot:undefined}:page, snapshot: await hydrate(compact.snapshot), ...(compact.foreignSnapshotOmitted?{recognitionReset:{foreignSnapshotOmitted:true}}:{}),
          assets: await Promise.all(bindings.map(async binding => ({ ...binding, dataUrl: await hydrate(binding.asset) }))),
          continuityReferences: previous?.snapshot?.generatedImage && previous.snapshot.accepted !== false ? [{
            sourcePageId: previous.id, assetId: previous.snapshot.generatedImage.id, sha256: previous.snapshot.generatedImage.sha256,
            imageUrl: await hydrate(previous.snapshot.generatedImage), role: 'previous_page_continuity',
          }] : [] } : {}),
        ...(transfer?{assetTransfer:transfer.descriptor()}:{}),
      } };
      } catch(error) {
        job.state='failed';job.error={code:error.code??'DISPATCH_FAILED',message:error.message};job.updatedAt=new Date().toISOString();await this.save(job);throw error;
      }
    });
  }
  async complete(clientId, { jobId, attemptId, success, result, error, snapshot }) {
    return this.exclusive(async () => {
      const job = this.get(jobId);
      if (job.clientId !== clientId || job.attemptId !== attemptId || job.executionStarted!==true || !['running', 'cancelling'].includes(job.state)) throw new MangaControlError('STALE_RESULT', 'This result does not belong to an acknowledged active job attempt.');
      if (typeof success !== 'boolean') throw new MangaControlError('RESULT_REQUIRED', 'An explicit successful or failed action result is required.');
      assertNoSecrets(result); assertNoSecrets(snapshot);
      // Keep paid results even when an external edit makes their checkpoint stale.
      job.result = await this.store.assets.dehydrate(result&&typeof result==='object'&&!Array.isArray(result)?{...job.result,...result}:result??job.result??null);
      if(success&&job.operation==='apply_page'){
        try{assertMcpApplyCommitted(result,snapshot,job.projectId,job.pageId);}
        catch(failure){success=false;error={code:failure.code,message:failure.message};snapshot=undefined;job.result={applied:false};}
      }
      let checkpointRevision = job.expectedRevision;
      try {
      if(!job.cancelRequested&&success&&result?.recognition) {
        const checkpoint=await this.store.mutate(job.projectId,checkpointRevision,`recognition-${job.id}`,{jobId:job.id},p=>{
          p.recognition=result.recognition;
          if(!p.plan?.detail)p.castBible=result.recognition.castList;
        },{affectsPlan:false});checkpointRevision=checkpoint.revision;
      }
      if (!job.cancelRequested && snapshot && job.pageId) {
        snapshot=await this.store.assets.dehydrate(snapshot);
        const adoptedExport=['history_select','panel_adopt'].includes(job.input?.action)?job.result?.exports?.find(item=>item.pageId===job.pageId):undefined;
        const semanticEdit=Boolean(success&&job.operation==='edit_state'&&semanticEdits.has(job.input.action)
          &&job.contentBefore!==pageContentHash(snapshot,job.contentBeforeExportSha?adoptedExport?.image?.sha256:undefined));
        const checkpoint = await this.store.mutate(job.projectId, checkpointRevision, `checkpoint-${job.id}`, { jobId: job.id }, p => {
          const page = p.pages.find(x => x.id === job.pageId); page.snapshot = snapshot; page.revision += 1;
          if(semanticEdit){
            const savedAdoption=['history_select','panel_adopt'].includes(job.input.action)&&snapshot.accepted===true&&job.result?.exports?.some(item=>item.pageId===job.pageId);
            page.snapshot.accepted=Boolean(savedAdoption);
            for(const following of p.pages)if(following.index>page.index&&following.snapshot)following.snapshot.accepted=false;
          }
          if(['scenario','enhance'].includes(job.operation)&&p.plan?.detail?.pages) {
            const planned=p.plan.detail.pages.find(item=>item.pageId===job.pageId);if(planned)planned.scenario=snapshot.scenario;
          }
        }, { affectsPlan: ['scenario','enhance'].includes(job.operation)||semanticEdit, invalidateApproval:semanticEdit });
        checkpointRevision = checkpoint.revision;
      }
      if (!job.cancelRequested && success && result?.plan) {
        await this.store.setPlan({ ...result.plan, projectId: job.projectId, expectedRevision: checkpointRevision, idempotencyKey: `plan-${job.id}` });
      }
      } catch (checkpointError) {
        job.state = job.cancelRequested ? 'cancelled' : 'failed';
        job.error = mcpDiagnosticError({code:checkpointError.code??'CHECKPOINT_FAILED',message:`${checkpointError.message} The action result is retained in this job; no automatic retry was made.`,diagnosticContext:checkpointError.diagnosticContext});
        job.updatedAt = new Date().toISOString(); await this.save(job); return this.summary(job);
      }
      job.state = job.cancelRequested||error?.code==='CANCELLED' ? 'cancelled' : success ? 'completed' : 'failed';
      job.error = error ? mcpDiagnosticError(error) : null;
      job.updatedAt = new Date().toISOString(); await this.save(job);
      return this.summary(job);
    });
  }
  async start(clientId,{jobId,attemptId}) {
    return this.exclusive(async()=>{
      const job=this.get(jobId);
      if(this.client?.id!==clientId||job.clientId!==clientId||job.attemptId!==attemptId||job.state!=='running'||job.cancelRequested)throw new MangaControlError('CANCELLED','The dispatch is no longer active; do not execute it.');
      job.executionStarted=true;await this.save(job);return {started:true};
    });
  }
  async checkpointAssets(clientId, {jobId,attemptId,assets}) {
    return this.exclusive(async()=>{
      const job=this.get(jobId);
      if(job.clientId!==clientId||job.attemptId!==attemptId||job.state!=='running'||job.operation!=='generate_assets') throw new MangaControlError('STALE_RESULT','Asset checkpoint does not belong to the active asset-generation attempt.');
      if(!Array.isArray(assets)||assets.length!==1) throw new MangaControlError('INVALID_ASSET_CHECKPOINT','Checkpoint each completed asset separately.');
      const item=assets[0], asset=await this.store.assets.putDataUrl(await this.store.assets.hydrate(item.dataUrl));
      job.result={...job.result,retainedAssets:[...(job.result?.retainedAssets||[]),{slotId:item.slotId,asset,role:item.role}]};
      await this.save(job);
      const saved=await this.store.mutate(job.projectId,job.expectedRevision,`asset-${job.id}-${item.slotId}`,{operation:'generated_asset',slotId:item.slotId,assetId:asset.id},p=>{
        const spec=p.assetSpecs.find(s=>s.id===item.slotId);
        if(!spec||!['character_sheet','prop','background'].includes(spec.role)||spec.role!==item.role) throw new MangaControlError('ASSET_SPEC_MISMATCH','Generated asset must fill an approved specification slot.');
        p.assetBindings[item.slotId]={asset,role:spec.role,specId:spec.id,specRevision:spec.revision,source:'generated',initialSlotFill:!p.assetBindings[item.slotId],model:item.model};
      });
      job.expectedRevision=saved.revision;job.progress={completedAsset:item.slotId};await this.save(job);
      const manifest=await writeProjectManifest(this.store,await this.store.get(job.projectId),{downloadsDirectory:this.downloadsDirectory});
      return {...saved,asset,...manifest};
    });
  }
  async checkpointPage(clientId,{jobId,attemptId,pageId,dataUrl,metadata,snapshot}) {
    return this.exclusive(async()=>{
      const job=this.get(jobId);
      if(job.clientId!==clientId||job.attemptId!==attemptId||job.state!=='running'||!(['image','image_edit','render_book'].includes(job.operation)||job.operation==='edit_state'&&['panel_adopt','history_select'].includes(job.input.action))
        ||job.pageId&&job.pageId!==pageId)throw new MangaControlError('STALE_RESULT','Page export does not belong to the active image attempt.');
      const project=await this.store.assertApproved(job.projectId);
      if(project.revision!==job.expectedRevision)throw new MangaControlError('REVISION_CONFLICT','Project changed while generating; retain this attempt before adopting it.');
      const page=project.pages.find(item=>item.id===pageId);
      if(!page)throw new MangaControlError('PAGE_NOT_FOUND','Page is not part of this project.');
      dataUrl=await this.store.assets.hydrate(dataUrl);
      const safeMetadata=await this.store.assets.dehydrate(metadata);
      const generationContext=pageGenerationMetadata(snapshot)?.context;
      if(generationContext&&generationMetadataHash(await this.store.assets.dehydrate(generationContext))!==generationMetadataHash(safeMetadata))throw new MangaControlError('GENERATION_METADATA_MISMATCH','The page export metadata differs from its retained generation snapshot.');
      const exported=await exportCompletedPage(this.store,project,page,{dataUrl,metadata:safeMetadata},{attemptId,jobId,downloadsDirectory:this.downloadsDirectory});
      const completedSnapshot=await this.store.assets.dehydrate({...snapshot,generatedImage:exported.image,accepted:true});
      const contentChanged=pageContentHash(page.snapshot,page.export?.imageSha256)!==pageContentHash(completedSnapshot,page.export?.imageSha256?exported.image.sha256:undefined);
      job.result={...job.result,exports:[...(job.result?.exports||[]).filter(item=>item.pageId!==pageId),{pageId,...exported}]};await this.save(job);
      const saved=await this.store.mutate(job.projectId,job.expectedRevision,`page-${job.id}-${pageId}`,{operation:'completed_page',pageId,imageId:exported.image.id},p=>{
        const target=p.pages.find(item=>item.id===pageId);target.snapshot=completedSnapshot;target.revision+=1;
        if(contentChanged)for(const following of p.pages)if(following.index>target.index&&following.snapshot){following.snapshot.accepted=false;following.snapshot.finalPrompt='';following.snapshot.assembly={};}
        target.export={relativeDirectory:exported.relativeDirectory??`pages/${path.basename(exported.directory)}`,
          ...(exported.pngRelativePath?{pngRelativePath:exported.pngRelativePath}:{}),...(exported.jsonRelativePath?{jsonRelativePath:exported.jsonRelativePath}:{}),
          imageSha256:exported.image.sha256,attemptId,jobId};
      },{affectsPlan:false});
      job.expectedRevision=Math.max(job.expectedRevision,saved.revision);await this.save(job);
      const manifest=await writeProjectManifest(this.store,await this.store.get(job.projectId),{downloadsDirectory:this.downloadsDirectory});
      return {...exported,...saved,...manifest};
    });
  }
  async browserPage(clientId,{jobId,attemptId,pageId}) {
    return this.exclusive(async()=>{
      const job=this.get(jobId);
      if(job.clientId!==clientId||job.attemptId!==attemptId||job.state!=='running'||job.operation!=='render_book')throw new MangaControlError('STALE_RESULT','Only the active ordered-book attempt may load its next page.');
      const project=await this.store.assertApproved(job.projectId);
      if(project.revision!==job.expectedRevision||project.approval.hash!==job.approvedPlanHash)throw new MangaControlError('REVISION_CONFLICT','The approved project changed. Stop and inspect retained completed pages.');
      const page=project.pages.find(item=>item.id===pageId);if(!page)throw new MangaControlError('PAGE_NOT_FOUND','Unknown book page.');
      const previous=project.pages.find(item=>item.index===page.index-1);
      if(previous&&!previous.snapshot?.accepted)throw new MangaControlError('PREVIOUS_PAGE_INCOMPLETE','Render pages in order; the prior page has not completed.');
      const bindings=Object.entries(resolvePageAssetBindings(project,page));
      const compact=compactPageTransport(project,page,bindings.map(([slotId,binding])=>`${slotId}:${binding.asset.id}:${binding.role}`).sort());
      const transfer=this.client.features?.includes(ASSET_REFS_FEATURE)?new AssetTransfer(job.id,job.attemptId):null;
      const hydrate=value=>transfer?transfer.encode(value):this.store.assets.hydrate(value);
      if(!transfer)assertPageTransportBudget({snapshot:compact.snapshot,recognition:compact.recognition,assets:bindings.map(([,binding])=>binding.asset),previous:previous?.snapshot?.generatedImage});
      return {projectId:project.id,pageId,project:{...project,pages:project.pages.map(({snapshot:_snapshot,...meta})=>meta),requests:undefined,
          recognition:await hydrate(compact.recognition)},page:{...page,snapshot:undefined},snapshot:await hydrate(compact.snapshot),
        expectedScenario:page.snapshot?.scenario??project.plan.detail.pages.find(item=>item.pageId===pageId)?.scenario??project.plan.detail.pages.find(item=>item.pageId===pageId)?.direction,
        assets:await Promise.all(bindings.map(async([slotId,binding])=>({slotId,...binding,dataUrl:await hydrate(binding.asset)}))),
        continuityReferences:previous?[{sourcePageId:previous.id,assetId:previous.snapshot.generatedImage.id,sha256:previous.snapshot.generatedImage.sha256,role:'previous_page_continuity',imageUrl:await hydrate(previous.snapshot.generatedImage)}]:[],...(transfer?{assetTransfer:transfer.descriptor()}: {})};
    });
  }
  async prepareShutdown(){return this.exclusive(async()=>{
    if(this.client&&Date.now()-this.client.seenAt<180000||[...this.jobs.values()].some(j=>['running','cancelling'].includes(j.state)))throw new MangaControlError('SERVICE_BUSY','Disconnect the application and wait for active jobs before stopping/updating this service.');
    this.closing=true;
  });}
  async cancel(jobId) { return this.exclusive(async () => { const job = this.get(jobId); if (terminal.has(job.state)) return this.summary(job); job.cancelRequested = true; job.state = ['running', 'cancelling'].includes(job.state) ? 'cancelling' : 'cancelled'; job.updatedAt = new Date().toISOString(); await this.save(job); return this.summary(job); }); }
  async resume(jobId, { expectedRevision, idempotencyKey, retryUnknown = false }) {
    return this.exclusive(async () => {
    const job = this.get(jobId);
    if (!['failed', 'cancelled', 'interrupted', 'waiting_for_recovery'].includes(job.state)) throw new MangaControlError('JOB_NOT_RESUMABLE', 'Only a stopped or failed job can be explicitly resumed.');
    if (job.state === 'interrupted' && !retryUnknown) throw new MangaControlError('COMPLETION_UNKNOWN', 'Inspect retained application/provider results first. Explicit retryUnknown may incur another charge.');
    const submitted = await this.submitUnlocked({ projectId: job.projectId, pageId: job.pageId, operation: job.operation,
      input: { ...job.input, resumeFromJobId: job.id }, expectedRevision, idempotencyKey });
    if (job.state === 'interrupted') { job.recoveryAcknowledged = true; await this.save(job); }
    return submitted;
    });
  }
  async resolveInterrupted(jobId, { resolution, recoveryJobId }) {
    return this.exclusive(async () => {
      const job = this.get(jobId);
      if (job.state !== 'interrupted') throw new MangaControlError('JOB_NOT_INTERRUPTED', 'Only an interrupted unknown attempt needs this resolution.');
      if (resolution === 'use_retained_result') {
        const read = this.get(recoveryJobId);
        if (read.operation !== 'read_state' || read.state !== 'completed' || read.projectId !== job.projectId || read.pageId !== job.pageId
          || read.result?.recovery?.sourceJobId !== job.id || read.result.recovery.complete !== true) {
          throw new MangaControlError('RECOVERY_EVIDENCE_REQUIRED', 'First run read_state for the same page/attempt and verify an actually completed retained result.');
        }
        job.state = 'completed'; job.result = read.result.recovery.result; job.error = null;
      } else if (resolution === 'abandon') {
        job.state = 'cancelled'; job.error = { code: 'UNKNOWN_ATTEMPT_ABANDONED', message: 'The user chose not to retry this attempt; retained partial data is preserved.' };
      } else throw new MangaControlError('INVALID_RECOVERY', 'Choose use_retained_result or abandon; neither submits a paid request.');
      job.recoveryAcknowledged = true; job.updatedAt = new Date().toISOString(); await this.save(job);
      for (const waiting of this.jobs.values()) if (waiting.state === 'waiting_for_recovery') { waiting.state = 'queued'; waiting.error = null; await this.save(waiting); }
      return this.summary(job);
    });
  }
  async disconnect(clientId) {
    return this.exclusive(async () => {
    if (this.client?.id !== clientId) throw new MangaControlError('STALE_CLIENT', 'The prior browser cannot disconnect the current paired application.');
    for (const job of this.jobs.values()) if (job.clientId === clientId && ['running', 'cancelling'].includes(job.state)) {
      job.state = job.executionStarted===false?'cancelled':'interrupted'; job.error = job.executionStarted===false
        ?{code:'NOT_STARTED',message:'The application disconnected before acknowledging execution. No action was started.'}
        :{ code: 'BROWSER_DISCONNECTED', message: 'Completion is unknown. Inspect retained page state before explicitly resuming; no automatic repeat is made.' }; await this.save(job);
    }
    this.client = null;
    });
  }
}
