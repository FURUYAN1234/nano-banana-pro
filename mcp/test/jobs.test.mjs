import test from 'node:test';
import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { ProjectStore,approvalHash } from '../src/store.mjs';
import { JobQueue } from '../src/jobs.mjs';
async function fixture() {
  const root = process.env.MANGA_MCP_TEST_ROOT ?? path.join(tmpdir(), 'super-furu-manga-tests');
  await fs.mkdir(root, { recursive: true }); const store = await new ProjectStore(await fs.mkdtemp(path.join(root, 'jobs-'))).init();
  const project = await store.create({ name: 'Queue' }, 'create'); await fs.mkdir(path.join(store.root,'downloads'),{recursive:true}); const jobs = await new JobQueue(store,{downloadsDirectory:path.join(store.root,'downloads')}).init();
  await jobs.connect('browser-one', ['read_state']); return { store, project, jobs };
}
test('apply_page cannot report completed or overwrite snapshots without a committed matching application token',async()=>{
 const {store,project,jobs}=await fixture();jobs.client.operations=['apply_page'];const pageId=project.pages[0].id;
 const job=await jobs.submit({projectId:project.id,pageId,expectedRevision:1,idempotencyKey:'apply-uncommitted',operation:'apply_page'});
 const dispatched=(await jobs.next('browser-one')).job;await jobs.start('browser-one',{jobId:job.id,attemptId:dispatched.attemptId});
 const result=await jobs.complete('browser-one',{jobId:job.id,attemptId:dispatched.attemptId,success:true,result:{applied:true,applicationToken:'requested'},snapshot:{bookPageContext:null,scenario:''}});
 assert.equal(result.state,'failed');assert.equal(result.error.code,'PAGE_APPLY_NOT_COMMITTED');assert.equal((await store.get(project.id)).pages[0].snapshot,null);
});
test('repeated cancel retains the active slot and cancellation signal until its result arrives', async () => {
  const { project, jobs } = await fixture();
  const one = await jobs.submit({ projectId: project.id, expectedRevision: 1, idempotencyKey: 'one', operation: 'read_state' });
  const two = await jobs.submit({ projectId: project.id, expectedRevision: 1, idempotencyKey: 'two', operation: 'read_state' });
  const dispatched = (await jobs.next('browser-one')).job;
  assert.equal(dispatched.id, one.id);
  await jobs.start('browser-one',{jobId:one.id,attemptId:dispatched.attemptId});
  await jobs.cancel(one.id); await jobs.cancel(one.id);
  assert.equal(jobs.get(one.id).state, 'cancelling');
  assert.deepEqual(jobs.heartbeat('browser-one').cancelJobIds, [one.id]);
  assert.equal((await jobs.next('browser-one')).job, null);
  await jobs.complete('browser-one', { jobId: one.id, attemptId: dispatched.attemptId, success: false, error: { code: 'CANCELLED', message: 'Stopped' } });
  assert.equal((await jobs.next('browser-one')).job.id, two.id);
});
test('expired-client replacement interrupts the old attempt, rejects late success and never automatically retries it', async () => {
  const { project, jobs } = await fixture();
  const one = await jobs.submit({ projectId: project.id, expectedRevision: 1, idempotencyKey: 'one', operation: 'read_state' });
  const attempt = (await jobs.next('browser-one')).job;
  await jobs.start('browser-one',{jobId:attempt.id,attemptId:attempt.attemptId});
  await assert.rejects(jobs.connect('browser-two', ['read_state']), { code: 'BROWSER_ALREADY_CONNECTED' });
  jobs.client.seenAt = Date.now() - 180001;
  await jobs.connect('browser-two', ['read_state']);
  assert.equal(jobs.get(one.id).state, 'interrupted'); assert.equal(jobs.get(one.id).error.code, 'COMPLETION_UNKNOWN');
  await assert.rejects(jobs.complete('browser-one', { jobId: one.id, attemptId: attempt.attemptId, success: true }), { code: 'STALE_RESULT' });
  assert.equal((await jobs.next('browser-two')).job, null); assert.equal(jobs.jobs.size, 1);
  await assert.rejects(jobs.resume(one.id, { expectedRevision: 1, idempotencyKey: 'resume' }), { code: 'COMPLETION_UNKNOWN' });
});

test('unknown completion can be recovered from verified retained state or abandoned without another request', async () => {
  const { project, jobs } = await fixture();
  const one = await jobs.submit({ projectId: project.id, expectedRevision: 1, idempotencyKey: 'one', operation: 'read_state' });
  const original=(await jobs.next('browser-one')).job;await jobs.start('browser-one',{jobId:original.id,attemptId:original.attemptId}); await jobs.disconnect('browser-one');
  await jobs.connect('browser-two', ['read_state']);
  const read = await jobs.submit({ projectId: project.id, expectedRevision: 1, idempotencyKey: 'read', operation: 'read_state' });
  const attempt = (await jobs.next('browser-two')).job;
  await jobs.start('browser-two',{jobId:attempt.id,attemptId:attempt.attemptId});
  await assert.rejects(jobs.resolveInterrupted(one.id, { resolution: 'use_retained_result', recoveryJobId: read.id }), { code: 'RECOVERY_EVIDENCE_REQUIRED' });
  await jobs.complete('browser-two', { jobId: read.id, attemptId: attempt.attemptId, success: true,
    result: { recovery: { sourceJobId: one.id, complete: true, result: { finalPrompt: 'Retained completed result' } } } });
  const recovered = await jobs.resolveInterrupted(one.id, { resolution: 'use_retained_result', recoveryJobId: read.id });
  assert.equal(recovered.state, 'completed'); assert.equal(jobs.jobs.size, 2);
  assert.equal(jobs.get(one.id).result.finalPrompt, 'Retained completed result');
  const next = await jobs.submit({ projectId: project.id, expectedRevision: 1, idempotencyKey: 'next', operation: 'read_state' });
  const again=(await jobs.next('browser-two')).job;await jobs.start('browser-two',{jobId:again.id,attemptId:again.attemptId}); await jobs.disconnect('browser-two');
  assert.equal((await jobs.resolveInterrupted(next.id, { resolution: 'abandon' })).state, 'cancelled');
  assert.equal(jobs.jobs.size, 3);
});

test('late plan results cannot overwrite a user edit and remain recoverable on the job', async () => {
  const { store, project, jobs } = await fixture();
  const job = await jobs.submit({ projectId: project.id, expectedRevision: 1, idempotencyKey: 'plan', operation: 'read_state' });
  const attempt = (await jobs.next('browser-one')).job;
  await jobs.start('browser-one',{jobId:attempt.id,attemptId:attempt.attemptId});
  await store.setPlan({ projectId: project.id, expectedRevision: 1, idempotencyKey: 'user-edit', outline: 'User changed outline' });
  const result = await jobs.complete('browser-one', { jobId: job.id, attemptId: attempt.attemptId, success: true, result: { plan: { outline: 'Late old plan' } } });
  assert.equal(result.state, 'failed'); assert.equal(result.error.code, 'REVISION_CONFLICT');
  assert.equal((await store.get(project.id)).plan.outline, 'User changed outline');
  assert.equal(result.result.plan.outline, 'Late old plan');
});

test('invalid retry cannot acknowledge unknown completion and stale disconnect cannot remove the new client', async () => {
  const { project, jobs } = await fixture();
  const job = await jobs.submit({ projectId: project.id, expectedRevision: 1, idempotencyKey: 'one', operation: 'read_state' });
  const dispatched=(await jobs.next('browser-one')).job;await jobs.start('browser-one',{jobId:dispatched.id,attemptId:dispatched.attemptId}); jobs.client.seenAt = 0; await jobs.connect('browser-two', ['read_state']);
  await assert.rejects(jobs.resume(job.id, { expectedRevision: 99, idempotencyKey: 'retry', retryUnknown: true }), { code: 'REVISION_CONFLICT' });
  assert.equal(Boolean(jobs.get(job.id).recoveryAcknowledged), false);
  assert.equal(jobs.jobs.size, 1);
  await assert.rejects(jobs.disconnect('browser-one'), { code: 'STALE_CLIENT' });
  assert.equal(jobs.client.id, 'browser-two');
});

test('external page edits invalidate detailed approval and dependent accepted pages; read-only inspection does not',async()=>{
 const {store,jobs}=await fixture();
 const project=await store.create({name:'Edit dependencies',totalPages:3},'edit-project');
 await store.mutate(project.id,project.revision,'seed-edit',{},p=>{p.plan={revision:1,detail:{pages:p.pages.map(x=>({pageId:x.id,scenario:'Approved scene'}))}};p.approval={hash:'approved',revision:1};for(const page of p.pages)page.snapshot={scenario:'Approved scene',accepted:true};},{affectsPlan:false});
 jobs.client.operations=['edit_state'];
 let current=await store.get(project.id);
 const inspection=await jobs.submit({projectId:project.id,pageId:current.pages[0].id,expectedRevision:current.revision,idempotencyKey:'inspect-only',operation:'edit_state',input:{action:'panel_inspect'}});
 let dispatch=(await jobs.next('browser-one')).job;await jobs.start('browser-one',{jobId:inspection.id,attemptId:dispatch.attemptId});
 await jobs.complete('browser-one',{jobId:inspection.id,attemptId:dispatch.attemptId,success:true,snapshot:current.pages[0].snapshot});
 current=await store.get(project.id);assert.ok(current.approval);assert.equal(current.pages[1].snapshot.accepted,true);
 const edit=await jobs.submit({projectId:project.id,pageId:current.pages[0].id,expectedRevision:current.revision,idempotencyKey:'edit-scene',operation:'edit_state',input:{action:'scenario'}});
 dispatch=(await jobs.next('browser-one')).job;await jobs.start('browser-one',{jobId:edit.id,attemptId:dispatch.attemptId});
 await jobs.complete('browser-one',{jobId:edit.id,attemptId:dispatch.attemptId,success:true,snapshot:{scenario:'User changed scene',accepted:true}});
 current=await store.get(project.id);assert.equal(current.approval,null);assert.ok(current.pages.every(p=>p.snapshot.accepted===false));
});
test('a checkpointed history adoption is retained without paid regeneration and invalidates following-page continuity',async()=>{
 const {store,jobs}=await fixture(),project=await store.create({name:'Adopt history',totalPages:2},'adoption-book');
 await store.setPlan({projectId:project.id,expectedRevision:1,idempotencyKey:'adoption-plan',outline:'Fixture',detail:{pages:project.pages.map(p=>({pageId:p.id,scenario:'Approved scene'}))}});
 let p=await store.get(project.id);await store.requestApproval({projectId:p.id,expectedRevision:p.revision,idempotencyKey:'adoption-ok',action:'record_user_response',decision:'approve',userResponse:'Fixture approval',planHash:approvalHash(p),planRevision:p.plan.revision});
 p=await store.get(p.id);await store.mutate(p.id,p.revision,'following-page',{},x=>{x.pages[1].snapshot={accepted:true};},{affectsPlan:false});p=await store.get(p.id);
 const downloads=path.join(store.root,'downloads');await fs.mkdir(downloads,{recursive:true});jobs.downloadsDirectory=downloads;jobs.client.operations=['edit_state'];
 const job=await jobs.submit({projectId:p.id,pageId:p.pages[0].id,expectedRevision:p.revision,idempotencyKey:'history-adoption',operation:'edit_state',input:{action:'history_select'}});
 const dispatch=(await jobs.next('browser-one')).job;await jobs.start('browser-one',{jobId:job.id,attemptId:dispatch.attemptId});
 const image='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl6tZkAAAAASUVORK5CYII=';
 await jobs.checkpointPage('browser-one',{jobId:job.id,attemptId:dispatch.attemptId,pageId:p.pages[0].id,dataUrl:image,metadata:{},snapshot:{scenario:'Approved scene',accepted:true}});
 await jobs.complete('browser-one',{jobId:job.id,attemptId:dispatch.attemptId,success:true,result:{completed:true},snapshot:{scenario:'Approved scene',generatedImage:image,accepted:true}});
 p=await store.get(p.id);assert.equal(p.pages[0].snapshot.accepted,true);assert.equal(p.pages[1].snapshot.accepted,false);assert.equal(p.approval,null);assert.equal(jobs.get(job.id).result.exports.length,1);
});
