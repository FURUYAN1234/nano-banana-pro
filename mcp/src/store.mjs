import { promises as fs } from 'node:fs';
import path from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import { assertSafeIdentifier, assertNoSecrets, validatePageSettings, validateBookPresentation, DEFAULT_PAGE_SETTINGS, MangaControlError } from '../../src/lib/mcp/contract.js';
import { AssetStore } from './assets.mjs';

const clone = value => structuredClone(value);
const canonical=value=>Array.isArray(value)?value.map(canonical):value&&typeof value==='object'?Object.fromEntries(Object.keys(value).sort().map(key=>[key,canonical(value[key])])):value;
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const requireRevision = (project, expected) => {
  if (project.revision !== expected) throw new MangaControlError('REVISION_CONFLICT', `Expected revision ${expected}; current revision is ${project.revision}. Read the project again.`);
};
const semanticPlan = project => ({
  brief: project.brief, assetMode: project.assetMode, settings: project.settings, userEditRevision: project.userEditRevision ?? 0,
  castBible: project.castBible, assetSpecs: project.assetSpecs, assetAssignments: project.assetAssignments ?? {},
  // Only first generated fills of approved specification slots are runtime data.
  // Arbitrary/manual bindings always participate in approval invalidation.
  externalBindings: Object.fromEntries(Object.entries(project.assetBindings ?? {}).filter(([, b]) =>
    !(b.source === 'generated' && b.initialSlotFill === true && project.assetSpecs.some(s => s.id === b.specId && s.revision === b.specRevision)))),
  plan: project.plan ? { outline: project.plan.outline, detail: project.plan.detail } : null,
  pages: project.pages.map(p => ({ id: p.id, kind: p.kind, panelCount: p.panelCount, settings: p.settings, presentation: p.presentation, assetOverrides: p.assetOverrides })),
});
export function approvalHash(project) { return hash(semanticPlan(project)); }
// Export receipts, selection flags and diagnostics do not change approved
// content. Callers normalize image data URLs to immutable references first.
export function pageGenerationMetadata(snapshot){
 const selected=snapshot?.generationHistory?.find(item=>item.selected===true)
  ??snapshot?.generationHistory?.find(item=>item.img?.sha256&&item.img.sha256===snapshot.generatedImage?.sha256);
 return selected?{context:selected.metadataContext??null,modelId:selected.modelId??null,generatedAt:selected.generatedAt??null}:null;
}
export function generationMetadataHash(metadata){return hash(canonical(metadata??null));}
export function pageContentHash(snapshot,verifiedExportSha){
 const state=snapshot??{},content={};
 for(const key of ['scenario','originalScenario','finalPrompt','castList','manualTopic','lockedLocation','lockedOutfit','mangaTitle','explanation'])content[key]=state[key]??'';
 for(const key of ['images','referenceAssets'])content[key]=state[key]??[];
 for(const key of ['generatedImage','styleJson','bg360Image','bg360Analysis','bg360ImageParts','bg360CameraWork','bg360CroppedPanels'])content[key]=state[key]??null;
 content.bg360Enabled=state.bg360Enabled??false;content.settings=state.settings??{};
 if(verifiedExportSha)content.generatedImage={verifiedExportSha};
 content.generationMetadata=pageGenerationMetadata(state);
 return hash(canonical(content));
}

export class ProjectStore {
  constructor(workspace) {
    if (!workspace) throw new MangaControlError('WORKSPACE_REQUIRED', 'Configure an explicit private MCP workspace directory.');
    this.workspace = path.resolve(workspace); this.tail = Promise.resolve();
  }
  async safeDirectory(directory) {
    try { if ((await fs.lstat(directory)).isSymbolicLink()) throw new MangaControlError('PATH_REJECTED', 'Linked project directories are not allowed.'); }
    catch (e) { if (e.code !== 'ENOENT') throw e; }
    await fs.mkdir(directory, { recursive: true });
    const real = await fs.realpath(directory);
    if (!real.startsWith(this.root + path.sep)) throw new MangaControlError('PATH_REJECTED', 'Project paths must remain in the configured workspace.');
    return real;
  }
  async rejectLinkedFile(file) {
    try { if ((await fs.lstat(file)).isSymbolicLink()) throw new MangaControlError('PATH_REJECTED', 'Linked project files are not allowed.'); }
    catch (e) { if (e.code !== 'ENOENT') throw e; }
  }
  async init() {
    await fs.mkdir(this.workspace, { recursive: true }); this.root = await fs.realpath(this.workspace);
    await this.safeDirectory(path.join(this.root, 'projects')); this.assets = new AssetStore(this); return this;
  }
  exclusive(fn) { const p = this.tail.then(fn); this.tail = p.catch(() => {}); return p; }
  async projectPath(id) {
    assertSafeIdentifier(id);
    await this.safeDirectory(path.join(this.root, 'projects'));
    const real = await this.safeDirectory(path.join(this.root, 'projects', id));
    const file = path.join(real, 'project.json'); await this.rejectLinkedFile(file); return file;
  }
  async atomic(file, value) {
    assertNoSecrets(value);
    const stored = await this.assets.dehydrate(value);
    await this.rejectLinkedFile(file);
    const temporary = `${file}.${randomUUID()}.tmp`;
    const handle = await fs.open(temporary, 'wx', 0o600);
    try { await handle.writeFile(JSON.stringify(stored, null, 2) + '\n'); await handle.sync(); }
    finally { await handle.close(); }
    for (let attempt = 0; ; attempt += 1) {
      try { await this.rejectLinkedFile(file); await fs.rename(temporary, file); return; }
      catch (error) {
        if (!['EPERM', 'EACCES', 'EBUSY'].includes(error.code) || attempt === 5) throw error;
        await new Promise(resolve => setTimeout(resolve, 20 * (2 ** attempt)));
      }
    }
  }
  async get(id) { const project = JSON.parse(await fs.readFile(await this.projectPath(id), 'utf8')); assertNoSecrets(project); return project; }
  async list() {
    const rows = [];
    for (const item of await fs.readdir(path.join(this.root, 'projects'), { withFileTypes: true })) {
      if (!item.isDirectory()) continue;
      try { const p = await this.get(item.name); rows.push({ id: p.id, name: p.name, revision: p.revision, totalPages: p.pages.length, updatedAt: p.updatedAt }); }
      catch (error) { if (error.code !== 'ENOENT') throw error; }
    }
    return rows;
  }
  async create(input, idempotencyKey) {
    assertNoSecrets(input); assertSafeIdentifier(idempotencyKey); validatePageSettings(input.settings);
    return this.exclusive(async () => {
      const registryFile = path.join(this.root, 'requests.json');
      await this.rejectLinkedFile(registryFile);
      let registry = {}; try { registry = JSON.parse(await fs.readFile(registryFile, 'utf8')); } catch (e) { if (e.code !== 'ENOENT') throw e; }
      const requestId = hash(idempotencyKey), fingerprint = hash(input);
      if (registry[requestId]) {
        if (registry[requestId].fingerprint !== fingerprint) throw new MangaControlError('IDEMPOTENCY_CONFLICT', 'This request identifier was already used with different input.');
        return this.get(registry[requestId].projectId);
      }
      const now = new Date().toISOString(), id = randomUUID(), total = input.totalPages ?? 1;
      if (!Number.isInteger(total) || total < 1 || total > 50) throw new MangaControlError('INVALID_PAGE_COUNT', 'totalPages includes the cover and must be between 1 and 50.');
      const project = { format: 1, id, name: input.name, brief: input.brief ?? '', revision: 1, createdAt: now, updatedAt: now,
        assetMode: input.assetMode ?? null, settings: { ...DEFAULT_PAGE_SETTINGS, ...input.settings },
        castBible: '', assetSpecs: [], assetAssignments: {}, assetBindings: {}, plan: null, approval: null, requests: {},
        pages: Array.from({ length: total }, (_, i) => ({ id: randomUUID(), index: i + 1, revision: 1, kind: 'comic', panelCount: 4, settings: {}, presentation: {}, assetOverrides: {}, snapshot: null })) };
      await this.atomic(await this.projectPath(id), project);
      registry[requestId] = { fingerprint, projectId: id }; await this.atomic(registryFile, registry); return clone(project);
    });
  }
  async mutate(id, expectedRevision, idempotencyKey, payload, apply, { affectsPlan = true, invalidateApproval = false } = {}) {
    assertSafeIdentifier(idempotencyKey); assertNoSecrets(payload);
    return this.exclusive(async () => {
      const p = await this.get(id), requestId = hash(idempotencyKey), fingerprint = hash(payload);
      if (p.requests[requestId]) {
        if (p.requests[requestId].fingerprint !== fingerprint) throw new MangaControlError('IDEMPOTENCY_CONFLICT', 'The request identifier belongs to different input.');
        return clone(p.requests[requestId].result);
      }
      requireRevision(p, expectedRevision); const before = approvalHash(p); await apply(p);
      if (invalidateApproval) p.userEditRevision = (p.userEditRevision ?? 0) + 1;
      if (affectsPlan && approvalHash(p) !== before) {
        p.approval = null;
        if (p.plan) p.plan.revision += 1;
      }
      p.revision += 1; p.updatedAt = new Date().toISOString();
      const result = { projectId: p.id, revision: p.revision, planHash: approvalHash(p), planRevision: p.plan?.revision ?? 0 };
      p.requests[requestId] = { fingerprint, result };
      await this.atomic(await this.projectPath(id), p); return clone(result);
    });
  }
  updatePage({ projectId, pageId, expectedRevision, idempotencyKey, settings = {}, panelCount, kind, presentation }) {
    validatePageSettings(settings);
    if(presentation!==undefined)validateBookPresentation(presentation);
    if (panelCount !== undefined && (!Number.isInteger(panelCount) || panelCount < 1 || panelCount > 8)) throw new MangaControlError('INVALID_PANEL_COUNT', 'Book pages support 1–8 panels; ordinary single-page rules are unchanged.');
    if (kind !== undefined && !['comic', 'illustration'].includes(kind)) throw new MangaControlError('INVALID_PAGE_KIND', 'Choose comic or illustration.');
    return this.mutate(projectId, expectedRevision, idempotencyKey, { operation: 'page_update', pageId, settings, panelCount, kind, presentation }, p => {
      const page = p.pages.find(item => item.id === pageId); if (!page) throw new MangaControlError('PAGE_NOT_FOUND', 'Read the project to obtain its page identifier.');
      const before=JSON.stringify({settings:page.settings,panelCount:page.panelCount,kind:page.kind,presentation:page.presentation});
      const structuralChange=(panelCount!==undefined&&panelCount!==page.panelCount)||(kind!==undefined&&kind!==page.kind);
      Object.assign(page.settings, settings);
      if (panelCount !== undefined) page.panelCount = panelCount;
      if (kind !== undefined) page.kind = kind;
      if (presentation !== undefined) page.presentation = clone(presentation);
      if(page.kind==='illustration'&&page.panelCount!==1)throw new MangaControlError('ILLUSTRATION_PANEL_COUNT','An illustration cover has one scene; set panelCount=1 explicitly.');
      if(page.presentation.coverLayout==='illustration'&&page.kind!=='illustration'||page.presentation.coverLayout==='hero_top'&&page.kind!=='comic')throw new MangaControlError('PRESENTATION_KIND_MISMATCH','Use illustration presentation for an illustration cover, or hero_top for a comic page.');
      if(before!==JSON.stringify({settings:page.settings,panelCount:page.panelCount,kind:page.kind,presentation:page.presentation})){
        for(const affected of p.pages)if(affected.index>=page.index&&affected.snapshot){affected.snapshot.accepted=false;affected.snapshot.finalPrompt='';affected.snapshot.assembly={};}
        if(structuralChange&&p.plan)p.plan.detail=null;
      }
      page.revision += 1;
    });
  }
  updateProject({ projectId, expectedRevision, idempotencyKey, name, brief, assetMode, settings = {} }) {
    validatePageSettings(settings);
    if (assetMode !== undefined && !['user_supplied', 'ai_generated'].includes(assetMode)) throw new MangaControlError('INVALID_ASSET_MODE', 'Choose user_supplied or ai_generated.');
    return this.mutate(projectId, expectedRevision, idempotencyKey, { operation: 'project_update', name, brief, assetMode, settings }, p => {
      const previous=JSON.stringify({brief:p.brief,assetMode:p.assetMode,settings:p.settings});
      if (name !== undefined) p.name = name;
      if (brief !== undefined) p.brief = brief;
      if (assetMode !== undefined) p.assetMode = assetMode;
      Object.assign(p.settings, settings);
      if(previous!==JSON.stringify({brief:p.brief,assetMode:p.assetMode,settings:p.settings}))for(const page of p.pages)if(page.snapshot){page.snapshot.accepted=false;page.snapshot.finalPrompt='';page.snapshot.assembly={};}
    });
  }
  setPlan({ projectId, expectedRevision, idempotencyKey, outline, detail, castBible, assetSpecs }) {
    return this.mutate(projectId, expectedRevision, idempotencyKey, { operation: 'plan', outline, detail, castBible, assetSpecs }, p => {
      const previous = { plan: clone(p.plan), castBible: p.castBible, assetSpecs: clone(p.assetSpecs) };
      const changedOutline = outline !== undefined && JSON.stringify(canonical(outline)) !== JSON.stringify(canonical(p.plan?.outline));
      p.plan = { revision: (p.plan?.revision ?? 0), outline: outline ?? p.plan?.outline ?? '',
        detail: detail !== undefined ? detail : changedOutline ? null : p.plan?.detail ?? null };
      if (castBible !== undefined) p.castBible = castBible;
      if (assetSpecs !== undefined) p.assetSpecs = clone(assetSpecs);
      const changed = JSON.stringify(canonical({ outline: previous.plan?.outline, detail: previous.plan?.detail, castBible: previous.castBible, assetSpecs: previous.assetSpecs }))
        !== JSON.stringify(canonical({ outline: p.plan.outline, detail: p.plan.detail, castBible: p.castBible, assetSpecs: p.assetSpecs }));
      if (changed && p.pages.some(page => page.snapshot || page.export)) {
        // Keep prior drafts and immutable image references recoverable, outside
        // active page state and without copying the archive into itself.
        (p.planHistory ??= []).push({ ...previous, projectRevision: p.revision, archivedAt: new Date().toISOString(),
          pages: p.pages.map(page => ({ pageId: page.id, revision: page.revision, snapshot: clone(page.snapshot), ...(page.export ? { export: clone(page.export) } : {}) })) });
        for (const page of p.pages) {
          if (page.snapshot) {
            const retained = {};
            for (const key of ['images', 'referenceAssets', 'castList', 'styleJson', 'bg360Enabled', 'bg360Image', 'bg360Analysis', 'bg360ImageParts'])
              if (page.snapshot[key] !== undefined) retained[key] = page.snapshot[key];
            if (previous.castBible !== p.castBible || previous.plan?.detail?.castBible !== p.plan.detail?.castBible)
              retained.castList = p.castBible || p.plan.detail?.castBible || '';
            page.snapshot = retained;
          }
          delete page.export;
          page.revision += 1;
        }
      }
    });
  }
  requestApproval({ projectId, expectedRevision, idempotencyKey, action, planHash, planRevision, userResponse, decision }) {
    return this.mutate(projectId, expectedRevision, idempotencyKey, { operation: 'approval', action, planHash, planRevision, userResponse, decision }, p => {
      if (!p.plan?.detail) throw new MangaControlError('PLAN_REQUIRED', 'Generate and present a detailed plan before requesting approval.');
      if (action === 'record_user_response') {
        if (!userResponse?.trim()) throw new MangaControlError('USER_RESPONSE_REQUIRED', 'Only record approval after the user has explicitly responded to this detailed plan.');
        if (planHash !== approvalHash(p) || planRevision !== p.plan.revision) throw new MangaControlError('APPROVAL_STALE', 'The plan or settings changed. Present the latest detailed plan for approval.');
        if (!['approve', 'reject'].includes(decision)) throw new MangaControlError('DECISION_REQUIRED', 'Record the user’s explicit approve or reject decision; a nonempty response alone is not approval.');
        p.approvalResponse = { decision, userResponse, planHash, planRevision, recordedAt: new Date().toISOString() };
        p.approval = decision === 'approve' ? { hash: planHash, planRevision, userResponse, approvedAt: new Date().toISOString() } : null;
      } else if (action !== 'request') throw new MangaControlError('INVALID_APPROVAL_ACTION', 'Choose request or record_user_response.');
    }, { affectsPlan: false });
  }
  async assertApproved(projectId) {
    const p = await this.get(projectId);
    if (!p.approval || p.approval.hash !== approvalHash(p) || p.approval.planRevision !== p.plan?.revision) throw new MangaControlError('APPROVAL_REQUIRED', 'Present the current detailed plan and obtain the user’s OK before paid page generation.');
    return p;
  }
}
