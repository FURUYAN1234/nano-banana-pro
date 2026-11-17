import test from 'node:test';
import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { ProjectStore, approvalHash } from '../src/store.mjs';
import { selectMcpPageSnapshot } from '../../src/lib/mcp/page-state.js';

const fixtureRoot = process.env.MANGA_MCP_TEST_ROOT ?? path.join(tmpdir(), 'super-furu-manga-tests');
async function fixture() {
  await fs.mkdir(fixtureRoot, { recursive: true });
  return new ProjectStore(await fs.mkdtemp(path.join(fixtureRoot, 'store-'))).init();
}

test('changed plan archives authored page state and lets old clients select the current story', async () => {
 const s=await fixture(),p=await s.create({name:'Replan',totalPages:1},'replan-create');
 const pageId=p.pages[0].id,outline={title:'Old broadcast'},detail={pages:[{pageId,scenario:'Old broadcast scenario'}]};
 await s.setPlan({projectId:p.id,expectedRevision:1,idempotencyKey:'initial',outline,detail,castBible:'Original cast'});
 let current=await s.get(p.id);
 await s.mutate(p.id,current.revision,'authored',{},project=>{
  project.recognition={castList:'Recognized original cast',images:['original-sheet']};
  project.pages[0].snapshot={scenario:'Manually revised broadcast',originalScenario:'Old broadcast scenario',finalPrompt:'Old logo',generatedImage:'old-image',accepted:true,assembly:{completedRun:9},manualTopic:'Old topic',lockedLocation:'Old studio',lockedOutfit:'Old uniform',mangaTitle:'Old title',explanation:'Old explanation',generationHistory:[{img:'old-image'}],uiDrafts:{scenario:'Unsaved author draft'},images:['original-sheet'],referenceAssets:[{name:'Original character'}],castList:'Original cast',styleJson:{medium:'Gpen'}};
  project.pages[0].export={imageSha256:'old-export'};
 },{affectsPlan:false});
 current=await s.get(p.id);const authored=structuredClone(current.pages[0].snapshot);
 await s.setPlan({projectId:p.id,expectedRevision:current.revision,idempotencyKey:'identical',outline:{...outline},detail:structuredClone(detail),castBible:'Original cast'});
 current=await s.get(p.id);assert.deepEqual(current.pages[0].snapshot,authored);assert.equal(current.planHistory,undefined);
 await s.setPlan({projectId:p.id,expectedRevision:current.revision,idempotencyKey:'new-detail',detail:{pages:[{pageId,scenario:'Private cafe scenario'}]}});
 current=await new ProjectStore(s.root).init().then(store=>store.get(p.id));
 const page=current.pages[0],planned=current.plan.detail.pages[0];
 const applied=selectMcpPageSnapshot(page.snapshot,current.id,page.id,[]);
 assert.equal(applied?.scenario??planned.scenario,'Private cafe scenario');
 for(const key of ['scenario','originalScenario','finalPrompt','generatedImage','accepted','assembly','manualTopic','lockedLocation','lockedOutfit','mangaTitle','explanation','generationHistory','uiDrafts'])assert.equal(page.snapshot[key],undefined,key);
 assert.deepEqual(page.snapshot.images,authored.images);assert.deepEqual(page.snapshot.referenceAssets,authored.referenceAssets);assert.deepEqual(page.snapshot.styleJson,authored.styleJson);
 assert.deepEqual(current.recognition,{castList:'Recognized original cast',images:['original-sheet']});assert.equal(page.export,undefined);
 assert.deepEqual(current.planHistory[0].pages[0].snapshot,authored);assert.equal(current.planHistory[0].pages[0].export.imageSha256,'old-export');
 await s.setPlan({projectId:p.id,expectedRevision:current.revision,idempotencyKey:'new-outline',outline:{title:'New cafe title'}});
 current=await s.get(p.id);assert.equal(current.plan.detail,null);assert.equal(current.pages[0].snapshot?.scenario??current.plan.detail?.pages?.[0]?.scenario??'','');
 assert.equal(current.planHistory.length,2);assert.equal(current.planHistory[1].planHistory,undefined);
});

test('cast/spec changes retire active work while immutable sheets and archived drafts stay recoverable', async () => {
 const s=await fixture(),p=await s.create({name:'Assets'},'assets-create');
 const png='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=';
 const asset=await s.assets.putDataUrl(png);
 await s.setPlan({projectId:p.id,expectedRevision:1,idempotencyKey:'asset-plan',outline:{title:'Book'},detail:{pages:[]},castBible:'Old cast',assetSpecs:[{id:'sheet',revision:1}]});
 for(const [index,change] of [{castBible:'New cast'},{assetSpecs:[{id:'sheet',revision:2}]}].entries()){
  let current=await s.get(p.id);
  await s.mutate(p.id,current.revision,`draft-${index}`,{},project=>{project.pages[0].snapshot={format:1,bookPageContext:{projectId:p.id,pageId:p.pages[0].id,assetSignature:[]},scenario:`Draft ${index}`,generatedImage:asset,accepted:true,images:[asset],referenceAssets:[{image:asset,items:[{name:'Original'}]}],castList:project.castBible};},{affectsPlan:false});
  current=await s.get(p.id);
  await s.setPlan({projectId:p.id,expectedRevision:current.revision,idempotencyKey:`change-${index}`,...change});
  current=await s.get(p.id);
  assert.equal(selectMcpPageSnapshot(current.pages[0].snapshot,p.id,p.pages[0].id,[]).scenario,undefined);
  assert.equal(current.pages[0].snapshot.castList,'New cast');
  assert.deepEqual(current.pages[0].snapshot.images,[asset]);
  assert.equal(current.planHistory[index].pages[0].snapshot.scenario,`Draft ${index}`);
  assert.deepEqual(current.planHistory[index].pages[0].snapshot.generatedImage,asset);
  assert.equal(await s.assets.hydrate(asset),png);
 }
});

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
