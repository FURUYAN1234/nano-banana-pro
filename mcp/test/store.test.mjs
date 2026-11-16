import test from 'node:test';
import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { ProjectStore, approvalHash } from '../src/store.mjs';

const fixtureRoot = process.env.MANGA_MCP_TEST_ROOT ?? path.join(tmpdir(), 'super-furu-manga-tests');
async function fixture() {
  await fs.mkdir(fixtureRoot, { recursive: true });
  return new ProjectStore(await fs.mkdtemp(path.join(fixtureRoot, 'store-'))).init();
}

test('changed page settings invalidate reuse and dependent pages while preserving retained images',async()=>{
 const s=await fixture(),p=await s.create({name:'Settings',totalPages:3},'settings-book');
 await s.mutate(p.id,1,'completed',{},project=>{project.plan={revision:1,detail:{pages:[]}};for(const page of project.pages)page.snapshot={accepted:true,generatedImage:'retained-image',scenario:'Retained scene',finalPrompt:'Old instructions',assembly:{run:1}};},{affectsPlan:false});
 let current=await s.get(p.id);
 await s.updatePage({projectId:p.id,pageId:p.pages[1].id,expectedRevision:current.revision,idempotencyKey:'new-watermark',settings:{showWatermarks:false}});
 current=await s.get(p.id);assert.equal(current.pages[0].snapshot.accepted,true);
 for(const page of current.pages.slice(1)){assert.equal(page.snapshot.accepted,false);assert.equal(page.snapshot.generatedImage,'retained-image');assert.equal(page.snapshot.scenario,'Retained scene');assert.equal(page.snapshot.finalPrompt,'');}
 await s.updatePage({projectId:p.id,pageId:p.pages[1].id,expectedRevision:current.revision,idempotencyKey:'new-count',panelCount:2});
 current=await s.get(p.id);assert.equal(current.plan.detail,null);
});
test('false title/watermark and book panel counts survive persistent snapshot roundtrip and idempotent requests', async () => {
  const s = await fixture(), input = { name: 'Book', assetMode: 'ai_generated', totalPages: 4, settings: { showTitle: false, showWatermarks: false, colorMode: 'monochrome' } };
  const p = await s.create(input, 'create-1');
  assert.equal((await s.create(input, 'create-1')).id, p.id);
  await assert.rejects(s.create({ ...input, name: 'Different' }, 'create-1'), { code: 'IDEMPOTENCY_CONFLICT' });
  const result = await s.updatePage({ projectId: p.id, pageId: p.pages[0].id, expectedRevision: 1, idempotencyKey: 'page-1', panelCount: 1, settings: { pageNumber: false } });
  assert.equal(result.revision, 2);
  const restored = await new ProjectStore(s.root).init().then(x => x.get(p.id));
  assert.equal(restored.settings.showTitle, false); assert.equal(restored.settings.showWatermarks, false);
  assert.equal(restored.settings.colorMode, 'monochrome'); assert.equal(restored.pages[0].panelCount, 1);
  assert.equal(restored.pages[0].settings.pageNumber, false);
  await assert.rejects(s.updatePage({ projectId: p.id, pageId: p.pages[0].id, expectedRevision: 1, idempotencyKey: 'stale', settings: {} }), { code: 'REVISION_CONFLICT' });
  await assert.rejects(s.create({ name: 'Secret', settings: { apiKey: 'forbidden' } }, 'secret'), { code: 'SECRET_NOT_ALLOWED' });
  await assert.rejects(s.get('../outside'), { code: 'INVALID_ID' });
});
test('approval is explicit/hash-bound, request and rejection never approve; material replacement invalidates', async () => {
  const s = await fixture(), p = await s.create({ name: 'Approval' }, 'create');
  await s.setPlan({ projectId: p.id, expectedRevision: 1, idempotencyKey: 'plan', outline: 'Outline', detail: 'Detailed pages', assetSpecs: [{ id: 'cast', revision: 1 }] });
  let current = await s.get(p.id);
  await s.requestApproval({ projectId: p.id, expectedRevision: current.revision, idempotencyKey: 'request', action: 'request' });
  await assert.rejects(s.assertApproved(p.id), { code: 'APPROVAL_REQUIRED' });
  current = await s.get(p.id);
  const approval = { projectId: p.id, expectedRevision: current.revision, idempotencyKey: 'approve', action: 'record_user_response', planHash: approvalHash(current), planRevision: current.plan.revision, userResponse: 'OK', decision: 'approve' };
  await s.requestApproval(approval); await s.assertApproved(p.id);
  current = await s.get(p.id);
  await s.mutate(p.id, current.revision, 'asset-fill', { generated: true }, x => { x.assetBindings.cast = { source: 'generated', initialSlotFill: true, specId: 'cast', specRevision: 1, assetId: 'generated-image' }; });
  await s.assertApproved(p.id);
  current = await s.get(p.id);
  await s.mutate(p.id, current.revision, 'manual-replace', { manual: true }, x => { x.assetBindings.cast = { source: 'manual', assetId: 'different-image' }; });
  await assert.rejects(s.assertApproved(p.id), { code: 'APPROVAL_REQUIRED' });
  current = await s.get(p.id);
  await s.requestApproval({ ...approval, expectedRevision: current.revision, idempotencyKey: 'reject', planHash: approvalHash(current), planRevision: current.plan.revision, userResponse: '変更して', decision: 'reject' });
  assert.equal((await s.get(p.id)).approvalResponse.decision, 'reject');
  await assert.rejects(s.assertApproved(p.id), { code: 'APPROVAL_REQUIRED' });
  current = await s.get(p.id);
  await s.setPlan({ projectId: p.id, expectedRevision: current.revision, idempotencyKey: 'new-outline', outline: 'Changed outline' });
  assert.equal((await s.get(p.id)).plan.detail, null);
});
