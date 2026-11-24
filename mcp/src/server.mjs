import { McpServer, ResourceTemplate } from '@modelcontextprotocol/server';
import { StdioServerTransport } from '@modelcontextprotocol/server/stdio';
import * as z from 'zod/v4';
import path from 'node:path';
import { promises as fs } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { verifyProductionRuntime } from './runtime-build.mjs';
import { createHash } from 'node:crypto';
import { ProjectStore, approvalHash } from './store.mjs';
import { acquireWorkspaceLease } from './workspace-lease.mjs';
import { JobQueue } from './jobs.mjs';
import { startBridge } from './bridge.mjs';
import { MCP_CONTRACT_VERSION, MCP_OPERATION_COVERAGE, MCP_STATE_EDIT_ACTIONS, PAGE_SETTING_TYPES, assertNoSecrets, MangaControlError } from '../../src/lib/mcp/contract.js';
import { readMcpSaveStatus } from './save-status.mjs';
import { getMcpSettingCatalog } from '../../src/lib/mcp/catalog.js';
import { relocateProjectExports } from './exports.mjs';

const id = z.string().min(1).max(128);
const mutation = { projectId: id, expectedRevision: z.number().int().positive(), idempotencyKey: id };
const settings = z.record(z.string(), z.unknown());
const text = z.string().max(200_000);
const publicProject = project => {
  const result = structuredClone(project); delete result.requests;
  result.pages = result.pages.map(page => ({ ...page, snapshot: page.snapshot ? {
    available: true, resourceUri: `manga://projects/${project.id}/pages/${page.id}/snapshot`,
  } : null }));
  return { ...result, planHash: approvalHash(project) };
};
export function createMangaMcpServer(store, { jobs, bridge } = {}) {
  const server = new McpServer({ name: 'super-furu-manga', version: '0.1.0' });
  const register = (name, description, inputSchema, handler, readOnly = false, {openWorld=false}={}) => {
    server.registerTool(name, { description, inputSchema, annotations: {
      readOnlyHint: readOnly, destructiveHint: false, idempotentHint: true, openWorldHint: openWorld,
    } }, async args => {
      try {
        assertNoSecrets(args);
        const result = await handler(args);
        return { content: [{ type: 'text', text: JSON.stringify(result) }], structuredContent: result };
      } catch (error) {
        const result = { error: { code: error.code ?? 'OPERATION_FAILED', message: error.message } };
        return { isError: true, content: [{ type: 'text', text: JSON.stringify(result) }], structuredContent: result };
      }
    });
  };
  const capabilities = () => ({ contractVersion: MCP_CONTRACT_VERSION, totalPagesIncludesCover: true,
    bookPanelCountsByProvider: { openai: [1, 2, 3, 4, 5, 6, 7, 8], gemini: [4] }, ordinaryPageCountsUnchanged: true,
    operations: MCP_OPERATION_COVERAGE, settings: PAGE_SETTING_TYPES, settingChoices: getMcpSettingCatalog(),
    stateEditActions:MCP_STATE_EDIT_ACTIONS, diagnostics:{read:'manga_run(read_state, input:{includeDiagnostics:true})',failedJob:'manga_job_get.error.failureContext',scope:'this-browser-origin',bounded:true},
    historyAccess:{read:'manga_snapshot',select:'manga_edit(history_select)',clear:'manga_edit(history_clear, confirm:true)'},
    advancedEdits:{inspect:'panel_inspect',generate:'panel_generate',adopt:'panel_adopt',discard:'panel_discard',modes:['style','free'],regions:'Use the exact inspected frame rectangle; free means a free-form instruction, not an arbitrary crop.'},
    exports:{statusTool:'manga_save_status',automatic:Boolean(jobs),method:'mcp_server_filesystem',browserDownloadPermission:'unknown_and_independent',finishedPages:'PNG + same-stem JSON + portable asset folder and project manifest',text:'manga_snapshot provides the editable final prompt, scenario and explanation for copy/TXT equivalents; image metadata is retained on generation history items'},
    manualBoundaries:{providerCredentials:'normal application UI only',microphone:'AI client transcript -> typed topic edit; no remote microphone control',legacyNormalization:'retained four-panel artifacts only; never reshape a native page'},
    connection: { status: jobs?.client ? 'connected' : 'not_connected', browserBridge: bridge ? 'enabled' : 'start_server_with_--bridge', operations: jobs?.client?.operations ?? [], availableFeatures:['asset-refs-v1'], negotiatedFeatures:jobs?.client?.features??[] },
    approval: 'request does not approve; record_user_response requires an explicit decision and exact current plan hash/revision',
    credentials: 'Only the normal application accepts session-only provider keys. Never pass keys through MCP.',
  });
  register('manga_capabilities', 'Read supported operations, settings and current implementation/connection status. Planned operations are not runnable.', z.object({}).strict(), capabilities, true);
  register('manga_save_status', 'Inspect MCP automatic saving configuration and actual latest PNG/JSON, material hashes and manifest readback without writing files or opening a picker. Browser download permission remains unknown and independent.', z.object({projectId:id}).strict(), async ({projectId}) => readMcpSaveStatus(store,await store.get(projectId),{jobs,downloadsDirectory:jobs?.downloadsDirectory}), true);
  register('manga_connection', 'Obtain a short-lived local pairing URL for the current built application. Use replaceIdle only after the user authorizes switching a waiting application. Never log or persist the pairing fragment.', z.object({replaceIdle:z.boolean().optional()}).strict(), async options => bridge ? bridge.connection(options) : { connected: false, requiresRestart: true, option: '--bridge', note: 'Start this server with --bridge to serve the current application and its same-origin control endpoint.' });
  register('manga_project_create', 'Create a private persisted project. totalPages includes a cover. Without assetMode, request the user’s material choice before creation work. No paid API is called.', z.object({
    name: z.string().min(1).max(160), brief: text.optional(), totalPages: z.number().int().min(1).max(50).optional(),
    assetMode: z.enum(['user_supplied', 'ai_generated']).optional(), settings: settings.optional(), idempotencyKey: id,
  }).strict(), async ({ idempotencyKey, ...input }) => publicProject(await store.create(input, idempotencyKey)));
  register('manga_project_list', 'List projects from the configured workspace without reading unrelated directories.', z.object({}).strict(), async () => ({ items: await store.list() }), true);
  register('manga_project_get', 'Read current project/page revisions, detailed plan, settings and approval state.', z.object({ projectId: id }).strict(), async a => publicProject(await store.get(a.projectId)), true);
  register('manga_project_set_save_owner', 'Save a derived costume/material project inside an existing work folder under 資料. Copies all existing portable files with byte verification, preserves originals and future generation history. Save metadata only; no paid API or approval change. Ownership cannot be reassigned.', z.object({ ...mutation, ownerProjectId:id }).strict(), async a=>{
    if([...(jobs?.jobs?.values()||[])].some(job=>[a.projectId,a.ownerProjectId].includes(job.projectId)&&['queued','waiting_for_connection','running','cancelling'].includes(job.state)))throw new MangaControlError('SERVICE_BUSY','Wait for this work and its material generation to finish before changing save ownership.');
    const result=await store.setSaveOwner(a),project=await store.get(a.projectId);
    const exported=await relocateProjectExports(store,project,{downloadsDirectory:jobs?.downloadsDirectory});
    return {...result,...exported};
  });
  register('manga_asset_import', 'Import a supplied image into immutable local storage. Return IDs/hash only. sourcePath is an explicitly supplied local image path, never a URL or credential file.', z.object({
    sourcePath: z.string().max(4096).optional(), dataUrl: z.string().max(67_000_000).optional(),
  }).strict(), async a => {
    if (Boolean(a.sourcePath) === Boolean(a.dataUrl)) throw new Error('Specify exactly one local image path or dataUrl.');
    if (a.dataUrl) return store.assets.putDataUrl(a.dataUrl);
    if (!path.isAbsolute(a.sourcePath) || !/\.(?:png|jpe?g|webp)$/i.test(a.sourcePath)) throw new Error('Use an absolute PNG/JPEG/WebP path.');
    if ((await fs.lstat(a.sourcePath)).isSymbolicLink()) throw new Error('Linked input files are not accepted.');
    if ((await fs.stat(a.sourcePath)).size >= 50_000_000) throw new Error('Image file must be below 50 MB.');
    const mime = /\.png$/i.test(a.sourcePath) ? 'image/png' : /\.webp$/i.test(a.sourcePath) ? 'image/webp' : 'image/jpeg';
    return store.assets.putDataUrl(`data:${mime};base64,${(await fs.readFile(a.sourcePath)).toString('base64')}`);
  });
  register('manga_asset_list', 'List shared immutable asset bindings and required approved specification slots without embedding image bytes.', z.object({ projectId: id }).strict(), async a => {
    const project = await store.get(a.projectId); return { specifications: project.assetSpecs, bindings: project.assetBindings };
  }, true);
  register('manga_asset_assign', 'Assign an imported asset to a common identity/prop/background slot. Manual changes invalidate previous approval.', z.object({
    ...mutation, slotId: id, assetId: z.string().regex(/^[a-f0-9]{64}$/).optional(), role: z.enum(['character_sheet','prop','background']).optional(),
    displayName:z.string().max(160).optional(),provenance:z.object({source:z.string().max(2000).optional(),creator:z.string().max(300).optional(),license:z.string().max(2000).optional(),notes:z.string().max(4000).optional(),verification:z.enum(['unverified','user_declared']).default('unverified')}).strict().optional(),
    pageId:id.optional(),action:z.enum(['assign','exclude','clear_override']).default('assign'),
  }).strict(), async a => {
    if(a.action==='assign'&&(!a.assetId||!a.role))throw new Error('Assign requires an asset ID and explicit role.');
    if(a.action!=='assign'&&!a.pageId)throw new Error('Exclude/clear_override are page-specific actions.');
    const asset=a.action==='assign'?await store.assets.reference(a.assetId):null;
    return store.mutate(a.projectId, a.expectedRevision, a.idempotencyKey, { operation:'asset_assign', slotId:a.slotId, assetId:a.assetId, role:a.role,pageId:a.pageId,action:a.action,displayName:a.displayName,provenance:a.provenance }, p => {
      const page=a.pageId?p.pages.find(item=>item.id===a.pageId):null;
      if(a.pageId&&!page)throw new Error('Page does not belong to this project.');
      if(page) {
        if(a.action==='clear_override')delete page.assetOverrides[a.slotId];
        else page.assetOverrides[a.slotId]=a.action==='exclude'?null:{asset,role:a.role,source:'imported',...(a.displayName!==undefined?{displayName:a.displayName}:{}),...(a.provenance?{provenance:a.provenance}:{})};
      } else {p.assetBindings[a.slotId] = { asset, role:a.role, source:'imported',...(a.displayName!==undefined?{displayName:a.displayName}:{}),...(a.provenance?{provenance:a.provenance}:{}) };p.recognition=null;}
      for(const target of page?[page]:p.pages)if(target.snapshot){delete target.snapshot.images;delete target.snapshot.referenceAssets;target.snapshot.assembly={};target.snapshot.finalPrompt='';target.snapshot.accepted=false;}
    });
  });
  register('manga_project_update', 'Change common color/settings, brief or material choice. Substantive changes invalidate previous plan approval; page overrides remain explicit.', z.object({
    ...mutation, name: z.string().min(1).max(160).optional(), brief: text.optional(),
    assetMode: z.enum(['user_supplied', 'ai_generated']).optional(), settings: settings.optional(),
  }).strict(), a => store.updateProject(a));
  register('manga_page_update', 'Update one book page. false values are preserved. Substantive changes invalidate approval. This does not change ordinary single-page generation rules.', z.object({
    ...mutation, pageId: id, settings: settings.optional(), panelCount: z.number().int().min(1).max(8).optional(),
    kind: z.enum(['comic', 'illustration']).optional(), presentation: z.record(z.string(), z.unknown()).optional(),
  }).strict(), a => store.updatePage(a));
  register('manga_snapshot', 'Read or write one persisted non-secret page snapshot. This first slice persists state; browser workflow hydration is advertised separately.', z.object({
    projectId: id, pageId: id, action: z.enum(['read', 'write']), expectedRevision: z.number().int().positive().optional(),
    idempotencyKey: id.optional(), snapshot: z.record(z.string(), z.unknown()).optional(),
    offset: z.number().int().min(0).optional(), limit: z.number().int().min(1).max(16000).optional(),
  }).strict(), async a => {
    if (a.action === 'read') {
      const p = await store.get(a.projectId), page = p.pages.find(x => x.id === a.pageId);
      if (!page) throw new Error('Page not found.');
      const serialized = JSON.stringify(page.snapshot);
      const content = serialized.length <= 32000 && a.offset === undefined ? { snapshot: page.snapshot }
        : { content: serialized.slice(a.offset ?? 0, (a.offset ?? 0) + (a.limit ?? 8000)), offset: a.offset ?? 0,
          totalCharacters: serialized.length, nextOffset: (a.offset ?? 0) + (a.limit ?? 8000) < serialized.length ? (a.offset ?? 0) + (a.limit ?? 8000) : null };
      return { projectId: p.id, revision: p.revision, pageId: page.id, settings: { ...p.settings, ...page.settings }, ...content };
    }
    if (!a.snapshot || !a.expectedRevision || !a.idempotencyKey) throw new Error('Writing requires snapshot, expectedRevision and idempotencyKey.');
    return store.mutate(a.projectId, a.expectedRevision, a.idempotencyKey, a, p => {
      const page = p.pages.find(x => x.id === a.pageId); if (!page) throw new Error('Page not found.');
      page.snapshot = structuredClone(a.snapshot); page.revision += 1;
    }, { invalidateApproval: true });
  });
  register('manga_plan', 'Read or set a simple outline and detailed production plan. This slice accepts supplied plans; engine planning requires the connected browser capability. An outline change explicitly invalidates older detail.', z.object({
    projectId: id, action: z.enum(['get', 'set']), expectedRevision: z.number().int().positive().optional(), idempotencyKey: id.optional(),
    outline: z.union([text, z.record(z.string(), z.unknown())]).optional(), detail: z.union([text, z.record(z.string(), z.unknown())]).optional(),
    castBible: text.optional(), assetSpecs: z.array(z.record(z.string(), z.unknown())).max(100).optional(),
  }).strict(), async a => {
    if (a.action === 'get') { const p = await store.get(a.projectId); return { projectId: p.id, revision: p.revision, plan: p.plan, approval: p.approval, planHash: approvalHash(p) }; }
    if (!a.expectedRevision || !a.idempotencyKey) throw new Error('Setting a plan requires expectedRevision and idempotencyKey.');
    return store.setPlan(a);
  });
  register('manga_request_approval', 'Request review without approving. Only AFTER the user replies, record_user_response records an explicit approve/reject decision for the exact presented plan hash and revision. Never invent the user response.', z.object({
    ...mutation, action: z.enum(['request', 'record_user_response']),
    planHash: z.string().regex(/^[a-f0-9]{64}$/).optional(), planRevision: z.number().int().positive().optional(),
    decision: z.enum(['approve', 'reject']).optional(), userResponse: text.optional(),
  }).strict(), a => store.requestApproval(a));
  if (jobs) {
    register('manga_edit','Edit the explicitly applied page using existing application actions. No evaluation or arbitrary setter is available. panel_generate is paid and requires plan approval; panel_adopt requires the active verified candidate ID.',z.object({
      ...mutation,pageId:id,action:z.enum(MCP_STATE_EDIT_ACTIONS),text:text.optional(),field:z.enum(['name','description','location','lighting','spatialType','objects','mood']).optional(),
      slotId:id.optional(),itemIndex:z.number().int().min(0).optional(),value:z.unknown().optional(),historyId:id.optional(),confirm:z.boolean().optional(),
      panelIndex:z.number().int().min(0).max(7).optional(),region:z.object({x:z.number().int().min(0),y:z.number().int().min(0),width:z.number().int().positive(),height:z.number().int().positive()}).strict().optional(),
      mode:z.enum(['style','free']).optional(),style:z.string().max(80).optional(),instruction:text.optional(),candidateId:id.optional(),
    }).strict(),({action,...a})=>jobs.submit({...a,operation:'edit_state',input:{action,...Object.fromEntries(Object.entries(a).filter(([key])=>!['projectId','pageId','expectedRevision','idempotencyKey'].includes(key)))}}),false,{openWorld:true});
    register('manga_create_manga','Start an asynchronous book workflow. New projects require the material choice and explicit totalPages INCLUDING cover. Outline/detail do not render images. render requires exact detailed-plan approval; it resumes by retaining completed pages.',z.object({
      projectId:id.optional(),expectedRevision:z.number().int().positive().optional(),idempotencyKey:id,
      name:z.string().max(160).optional(),brief:text.optional(),totalPages:z.number().int().min(1).max(50).optional(),assetMode:z.enum(['user_supplied','ai_generated']).optional(),settings:settings.optional(),phase:z.enum(['outline','detail','render']).default('outline'),
    }).strict(),async a=>{
      const key=createHash('sha256').update(a.idempotencyKey).digest('hex');
      if(!a.projectId&&(!a.name||!a.totalPages))throw new Error('Provide name and explicit totalPages (including cover), or an existing projectId.');
      const project=a.projectId?await store.get(a.projectId):await store.create({name:a.name,brief:a.brief,totalPages:a.totalPages,assetMode:a.assetMode,settings:a.settings},`book-${key}`);
      if(!project.assetMode)return {project:publicProject(project),requiresMaterialChoice:true};
      const job=await jobs.submit({projectId:project.id,expectedRevision:a.expectedRevision??project.revision,idempotencyKey:`start-${key}`,operation:a.phase==='render'?'render_book':'plan_story',input:a.phase==='render'?{}:{phase:a.phase}});
      return {projectId:project.id,job};
    },false,{openWorld:true});
    register('manga_run', 'Queue an existing application operation and return a job ID immediately. The connected application must explicitly advertise the operation; unsupported actions never report success.', z.object({ ...mutation, pageId: id.optional(), operation: z.enum(['read_state', 'apply_page', 'plan_story', 'recognition', 'scenario', 'enhance', 'prompt', 'image', 'image_edit', 'generate_assets', 'render_book']), input: z.record(z.string(), z.unknown()).optional() }).strict(), a => jobs.submit(a),false,{openWorld:true});
    register('manga_job_get', 'Read asynchronous job status. Failed, cancelled or unknown completion is never success.', z.object({ jobId: id }).strict(), a => jobs.summary(jobs.get(a.jobId)), true);
    register('manga_job_list', 'List recent jobs with bounded status summaries.', z.object({ projectId: id.optional(), limit: z.number().int().min(1).max(100).default(20) }).strict(), a => ({ items: [...jobs.jobs.values()].filter(j => !a.projectId || j.projectId === a.projectId).slice(-a.limit).map(j => jobs.summary(j)) }), true);
    register('manga_job_cancel', 'Cancel queued work or request the existing application stop boundary for active work, retaining partial state.', z.object({ jobId: id }).strict(), a => jobs.cancel(a.jobId));
    register('manga_job_resume', 'Resolve a stopped job. use_retained_result verifies a successful read_state recovery; abandon preserves partial data and submits nothing. retry creates a new job; retryUnknown must be explicit after inspecting an unknown paid outcome.', z.object({
      jobId: id, resolution: z.enum(['retry', 'use_retained_result', 'abandon']), recoveryJobId: id.optional(),
      expectedRevision: z.number().int().positive().optional(), idempotencyKey: id.optional(), retryUnknown: z.boolean().default(false),
    }).strict(), a => a.resolution === 'retry' ? jobs.resume(a.jobId, a) : jobs.resolveInterrupted(a.jobId, a));
  }
  server.registerResource('manga-asset', new ResourceTemplate('manga://assets/{assetId}', { list: undefined }), { description: 'Explicit binary access to an immutable image. Tools otherwise return only IDs and hashes.' }, async (uri, { assetId }) => {
    const reference = await store.assets.reference(assetId), data = await store.assets.dataUrl(reference);
    return { contents: [{ uri: uri.href, mimeType: reference.mimeType, blob: data.slice(data.indexOf(',') + 1) }] };
  });
  server.registerResource('manga-capabilities', 'manga://capabilities', { mimeType: 'application/json', description: 'Current available operations; planned operations remain explicit.' }, async uri => ({
    contents: [{ uri: uri.href, mimeType: 'application/json', text: JSON.stringify(capabilities()) }],
  }));
  server.registerResource('manga-page-snapshot', new ResourceTemplate('manga://projects/{projectId}/pages/{pageId}/snapshot', { list: undefined }),
    { mimeType: 'application/json', description: 'Snapshot index. Large contents are read in bounded chunks with manga_snapshot; image bytes are not included.' }, async (uri, variables) => {
      const p = await store.get(String(variables.projectId)), page = p.pages.find(x => x.id === variables.pageId);
      if (!page) throw new Error('Page not found.');
      return { contents: [{ uri: uri.href, mimeType: 'application/json', text: JSON.stringify({ projectId: p.id, pageId: page.id, revision: p.revision,
        available: Boolean(page.snapshot), fields: page.snapshot ? Object.keys(page.snapshot) : [], totalCharacters: JSON.stringify(page.snapshot).length, readTool: 'manga_snapshot' }) }] };
    });
  server.registerResource('manga-book-skill', 'manga://skills/book-production', { mimeType: 'text/markdown', description: 'The bundled production skill, shared by clients with and without skill installation.' }, async uri => ({
    contents: [{ uri: uri.href, mimeType: 'text/markdown', text: await (await import('node:fs/promises')).readFile(new URL('../skills/manga-book-production/SKILL.md', import.meta.url), 'utf8') }],
  }));
  server.registerPrompt('manga_book_workflow', { description: 'Material choice → outline → detailed plan → user OK → shared assets → ordered pages → PNG+JSON per page → optional sharing.' }, async () => ({ messages: [{ role: 'user', content: { type: 'text', text:
    'First ask whether the user supplies character sheets or wants AI-generated original assets. Before presenting a scenario, privately read the entire draft and fix any inconsistencies. Check the outline for continuity, cause and effect, and payoff. For the detailed script, review every page and panel, including the cover and requested total, against references, character voices, dialogue, depicted actions and story setups. Correct unexplained changes such as a dialect appearing only in the last panel, then reread affected scenes. Present the complete corrected script before any visible audit and request the user’s OK; never mark a request as approval. Record only the actual user response for the exact current plan hash/revision. Render no paid pages without valid approval. Show and confirm the character sheets before starting the body. After the script and sheets are confirmed, render in order, automatically review each page and run a final automated review of the saved pages. Ask between pages only if the user specifically requests that workflow. Keep original sheets/props/background primary, previous completed pages auxiliary. Choose background detail for each panel in this story. Check the new project settings, final prompts and rendered reading order. Establishing scenes can show space, light and depth; a close-up can reduce detail or contrast around the focus. Figures or limbs may naturally cross panel borders. Judge story readability, speaker, dialogue and action. Crossing alone does not require a redraw, and no page has a crossing quota. Check completed Japanese dialogue through the last panel of every page. End statements with 。 and retain approved ！, ？ or their combinations without appending 。. Put terminal punctuation inside the closing speech quote. Exclude labels, sound effects, titles and mid-sentence breaks. Read the printed lines and columns together, checking both missing and extra punctuation against the approved dialogue. Check line breaks in balloons, marginal text and narration at final display size. Keep names, word groups, ruby and punctuation together, using the available space for a vertical column or a horizontal line. Correct only unreadable passages and verify the adopted PNG, JSON and history. Save each accepted page as PNG+same-name JSON plus portable assets. Track each long-running job or delegated drawing, release or announcement through its result. Report a stop, failure or changed recovery estimate promptly, with confirmed progress, impact, next action and any required user input. Trace the cause against retained evidence and apply an authorized fix or alternative. Resume the failed step, verify recovery and the next step, and avoid repeating a charge for an unknown result. Continue independent authorized work. Show all saved pages in reading order. At the end, ask once whether to post the finished comic if the user has not decided, and follow the user’s answer. Read manga_capabilities before using an operation.' } }] }));
  return server;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const option = process.argv.indexOf('--workspace');
  const workspace = option >= 0 ? process.argv[option + 1] : process.env.MANGA_MCP_WORKSPACE;
  try {
    const appRoot = fileURLToPath(new URL('../../', import.meta.url));
    await verifyProductionRuntime(workspace,appRoot);
    const store = await new ProjectStore(workspace).init();
    const lease = await acquireWorkspaceLease(store.root);
    const downloadsAt=process.argv.indexOf('--downloads');
    const downloadsDirectory=downloadsAt>=0?process.argv[downloadsAt+1]:undefined;
    if(downloadsDirectory&&(!path.isAbsolute(downloadsDirectory)||(await fs.lstat(downloadsDirectory)).isSymbolicLink()||!(await fs.stat(downloadsDirectory)).isDirectory()))throw new Error('--downloads must be an existing absolute directory without a symlink.');
    const jobs = await new JobQueue(store,{downloadsDirectory}).init();
    const portAt = process.argv.indexOf('--port'), port = portAt >= 0 ? Number(process.argv[portAt + 1]) : 45931;
    const bridge = process.argv.includes('--bridge') ? await startBridge({ store, jobs, appRoot, distDirectory: path.join(appRoot, 'dist'), port }) : null;
    const server = createMangaMcpServer(store, { jobs, bridge });
    const transport = new StdioServerTransport();
    await server.connect(transport);
    const onclose = transport.onclose;
    transport.onclose = () => { onclose?.(); void Promise.all([bridge?.close(), lease.close()]); };
  } catch (error) { process.stderr.write(`Manga MCP startup: ${error.message}\n`); process.exitCode = 1; }
}
