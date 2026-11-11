import test from 'node:test';
import assert from 'node:assert/strict';
import {
  makeDiagnosticEvent, retainDiagnosticEvents, DIAGNOSTIC_LIMITS,
  createDiagnosticFetch, getDiagnosticRequest, summarizeDiagnosticError,
  beginDiagnosticRun, beginDiagnosticAction, getDiagnosticContext, endDiagnosticRun, readDiagnostics,
  observeDiagnosticRun,
} from '../src/lib/diagnostics.js';

test('lettering application and skip reasons survive diagnostic export without text or credentials',()=>{
  const event=makeDiagnosticEvent('image.lettering',{applied:false,reason:'unresolved_frames',version:1,
    balloonCount:0,skippedPanels:[4],outsideBalloonInteriorsUnchanged:true,text:'private dialogue',apiKey:'sk-secret'});
  assert.equal(event.reason,'unresolved_frames');assert.equal(event.applied,false);
  assert.equal(event.letteringVersion,1);assert.deepEqual(event.skippedPanels,[4]);
  assert.doesNotMatch(JSON.stringify(event),/private dialogue|sk-secret/);
});

test('image repair outcomes retain failure inputs and review evidence without claiming edited pixels passed',async()=>{
  const d=await import('../src/lib/diagnostics.js');
  const events=[];const unsubscribe=d.subscribeDiagnosticErrors(e=>events.push(e));
  for(const mode of ['repair_failed','single_repair_completed','passed','skipped']){
    const run=d.beginDiagnosticRun('step4',{failureContext:{scenario:'失敗した同じ台本',castList:'人物設定',finalPrompt:'完全な描画指示'}});
    const error=Object.assign(new Error('修正指示の上限超過'),{code:'IMAGE_PROMPT_BUDGET',promptLength:33000,promptMaxChars:30460});
    const result={stopReason:mode,repairError:mode==='repair_failed'?error:null,candidate:{base64Img:'PRIVATE_PIXELS'},
      originalReview:{pass:mode==='passed',skipped:mode==='skipped',issues:[{panel:6,type:'bubble_text',reason:'欠けた台詞',correction:'台詞全文を戻す'}]},
      finalReview:{pass:mode==='passed',notRechecked:mode==='single_repair_completed'}};
    await d.recordImageQualityReview(result,{observations:[{panel:6,dialogue:['検査で読んだ文']}],finalPrompt:'完全な描画指示'});
    const row=(await d.readDiagnostics()).events.find(e=>e.runId===run.runId&&e.event==='image.review');
    assert.equal(row.ok,mode==='passed');
    if(mode==='repair_failed'){
      assert.equal(row.errorCode,'IMAGE_PROMPT_BUDGET');assert.equal(row.promptLength,33000);assert.equal(row.promptMaxChars,30460);
      assert.equal(row.failureContext.scenario,'失敗した同じ台本');assert.equal(row.failureContext.finalPrompt,'完全な描画指示');
      assert.match(row.failureContext.validationResponse,/欠けた台詞/);assert.match(row.failureContext.validationResponse,/検査で読んだ文/);
      assert.equal(row.failureContext.validationError,'修正指示の上限超過');
    }
    if(mode==='single_repair_completed')assert.equal(row.outcome,'repaired_unverified');
    if(['passed','skipped'].includes(mode))assert.equal(row.failureContext,undefined);
    assert.doesNotMatch(JSON.stringify(row),/PRIVATE_PIXELS/);
    d.endDiagnosticRun(run,'settled');
  }
  unsubscribe();assert.equal(events.length,0,'image review findings do not open a terminal-error popup');
});

test('diagnostics discard unapproved fields and credentials rather than persisting payloads', () => {
  const event = makeDiagnosticEvent('api.request', {
    provider: 'openai', requestedModel: 'gpt-6-luna', step: 1, imageCount: 2,
    apiKey: 'sk-secret', authorization: 'Bearer secret', prompt: 'private story',
    image: 'data:image/png;base64,secret', message: 'private story',
    errorCode: 'sk-secret', responseModel: 'gpt-6-luna?api_key=secret',
  }, {now: 1000, sessionId: 'test'});
  const json = JSON.stringify(event);
  assert.equal(event.requestedModel, 'gpt-6-luna');
  assert.equal(event.imageCount, 2);
  assert.doesNotMatch(json, /secret|private|data:image|authorization|apiKey|responseModel/);
  assert.throws(() => makeDiagnosticEvent('private story', {}));
});

test('retention removes expired, oldest and duplicate rows, with UTF-8 byte and count limits', () => {
  const make = (id, time, extra = {}) => ({id, time, event: 'session.start', ...extra});
  const now = 10 * 86400000;
  const rows = [make('old', now - DIAGNOSTIC_LIMITS.maxAgeMs - 1), make('2', now - 2), make('1', now - 3), make('2', now - 2), make('3', now - 1)];
  assert.deepEqual(retainDiagnosticEvents(rows, now, {maxEvents: 2}).map(x => x.id), ['2', '3']);
  const large = [make('a', now, {stack: '日'.repeat(20)}), make('b', now + 1, {stack: '日'.repeat(20)})];
  const bytes = new TextEncoder().encode(JSON.stringify([large[1]])).length;
  assert.deepEqual(retainDiagnosticEvents(large, now + 2, {maxBytes: bytes}), [large[1]]);
  assert.deepEqual(retainDiagnosticEvents(rows, now + DIAGNOSTIC_LIMITS.maxAgeMs + 1), []);
});

test('fetch traces preserve response/body, snapshot run context, distinguish HTTP response from completion and network failure', async () => {
  const events = [];
  let context = {runId: 'run-1', step: 2};
  const response = new Response('{"model":"gpt-6-luna","choices":[]}', {status:200, headers: {'x-request-id':'req_123'}});
  const request = createDiagnosticFetch(async (_url, options) => {
    assert.equal(options.headers.Authorization, 'Bearer sk-secret');
    context = {runId: 'run-2', step: 3};
    return response;
  }, (event, details) => events.push({event, ...details}), () => context);
  const result = await request('https://api.openai.com/v1/chat/completions?api_key=secret', {
    method:'POST', headers:{Authorization:'Bearer sk-secret'},
    body:JSON.stringify({model:'gpt-6-luna', messages:[{content:'private story'}]}),
  });
  assert.equal(result, response);
  assert.equal((await result.json()).model, 'gpt-6-luna');
  assert.equal(events[0].event, 'api.request');
  assert.equal(events[1].event, 'api.response');
  assert.equal(events[1].runId, 'run-1');
  assert.equal(events[1].requestId, events[0].requestId);
  assert.equal(getDiagnosticRequest(response).requestId, events[0].requestId);
  assert.doesNotMatch(JSON.stringify(events), /secret|private|messages|api_key/);
  const failure = new TypeError('sk-secret private story');
  const failed = createDiagnosticFetch(async () => { throw failure; }, (event, details) => events.push({event, ...details}), () => ({}));
  await assert.rejects(failed('https://api.openai.com/v1/responses'), e => e === failure);
  assert.equal(events.at(-1).event, 'api.error');
  assert.equal(events.at(-1).errorName, 'TypeError');
  assert.doesNotMatch(JSON.stringify(events), /sk-secret|private story/);
});

test('diagnostic sink failures cannot change API outcomes', async () => {
  const response = new Response('ok');
  const request = createDiagnosticFetch(async () => response, () => { throw new Error('storage failed'); }, () => ({}));
  assert.equal(await request('https://api.openai.com/v1/responses'), response);
});

test('error locations retain code frames and remove message, URL queries, local user paths and credentials', () => {
  const details = summarizeDiagnosticError({name:'TypeError', code:'TIMEOUT', status:504,
    message:'sk-secret private story', stack:'TypeError: private story sk-secret\n    at request (http://localhost:5173/src/lib/openai-text.js?key=sk-secret:12:3)\n    at run (C:\\Users\\private\\app.js:10:2)'});
  const json = JSON.stringify(details);
  assert.equal(details.errorCode, 'TIMEOUT');
  assert.match(details.stack, /openai-text\.js/);
  assert.doesNotMatch(json, /secret|private|Users|localhost|key=/);
});

test('STEP1 observed before file intake keeps one run ID and records the actual send count through completion', async () => {
  const observed = beginDiagnosticRun('step1', {imageCount:0, provider:'openai'});
  beginDiagnosticAction('step1', {imageCount:2});
  const sending = getDiagnosticContext();
  assert.equal(sending.runId, observed.runId, 'preparation and request must share the observed run');
  assert.equal(sending.imageCount, 2, 'request count must come from actual selected images');
  endDiagnosticRun(observed, 'settled');
  const report = await readDiagnostics();
  const end = report.events.find(e => e.event === 'workflow.end' && e.runId === observed.runId);
  assert.equal(end.imageCount, 2, 'completion must use the updated run snapshot');
  beginDiagnosticAction('step1', {imageCount:1});
  assert.notEqual(getDiagnosticContext().runId, observed.runId, 'a later action must get a new ID');
});

test('action-before-observer and image-edit alias finish their own run without reusing it later', async () => {
  beginDiagnosticAction('image_edit', {imageCount:1});
  const request = getDiagnosticContext();
  const observed = observeDiagnosticRun('step4');
  assert.equal(observed.runId, request.runId);
  endDiagnosticRun(observed, 'settled');
  beginDiagnosticAction('image_edit', {imageCount:2});
  assert.notEqual(getDiagnosticContext().runId, request.runId);
  endDiagnosticRun(getDiagnosticContext(), 'settled');
});

test('a guarded earlier action cannot lend its run ID to a different STEP1 intake', () => {
  beginDiagnosticAction('safe_prompt');
  const guarded = getDiagnosticContext();
  const observed = observeDiagnosticRun('step1');
  assert.notEqual(observed.runId, guarded.runId);
  assert.equal(observed.operation, 'step1');
  beginDiagnosticAction('step1', {imageCount:2});
  assert.equal(getDiagnosticContext().runId, observed.runId);
  endDiagnosticRun(observed, 'settled');
});

test('only new failures notify the viewer, with persisted sanitized data and isolated subscribers', async () => {
  const d = await import('../src/lib/diagnostics.js');
  assert.equal(typeof d.subscribeDiagnosticErrors, 'function');
  const received = [];
  const broken = d.subscribeDiagnosticErrors(() => { throw new Error('viewer failed'); });
  const unsubscribe = d.subscribeDiagnosticErrors(row => received.push(row));
  await d.recordDiagnostic('api.response', {ok:true, status:200});
  await d.recordDiagnostic('workflow.cancel', {outcome:'requested'});
  await d.recordDiagnostic('api.error', {errorName:'AbortError'});
  await d.recordDiagnostic('workflow.error', {errorCode:'CANCELLED'});
  await d.recordDiagnostic('workflow.error', summarizeDiagnosticError('処理を中断しました。必要なら現在の入力で再実行してください。'));
  await d.recordDiagnostic('workflow.warning', {errorCode:'SCENARIO_PAYOFF_QUALITY',failureContext:{scenario:'修復前の台本',validationError:'flat_action_staging'}});
  assert.equal(received.length, 0, 'normal results and cancellation must not open the panel');
  const warning=(await d.readDiagnostics()).events.find(e=>e.event==='workflow.warning');
  assert.equal(warning?.failureContext.scenario,'修復前の台本','nonterminal findings must still preserve their evidence');
  await d.recordDiagnostic('api.error', {errorName:'TypeError', errorKind:'network', message:'private story sk-secret'});
  await d.recordDiagnostic('api.response', {ok:false, status:500});
  await d.recordDiagnostic('workflow.error', {errorName:'Error'});
  assert.equal(received.length, 3);
  assert.doesNotMatch(JSON.stringify(received), /private story|sk-secret/);
  const report = await d.readDiagnostics();
  assert(report.events.some(e => e.id === received[0].id), 'the notified error must already be readable');
  unsubscribe(); broken();
  await d.recordDiagnostic('runtime.error', {errorName:'Error'});
  assert.equal(received.length, 3, 'unmounted viewers must not receive events');
});

test('every complete export includes a generic app contract, investigation guide and readable event context', async () => {
  const d = await import('../src/lib/diagnostics.js');
  const event = d.makeDiagnosticEvent('api.error', {operation:'step3', errorKind:'network'}, {now:1000});
  assert.equal(event.timeISO, '1970-01-01T00:00:01.000Z');
  assert.match(event.operationLabel, /描画指示/);
  const report = await d.readDiagnostics();
  assert.equal(report.schemaVersion, 2);
  assert.equal(report.applicationSpec.stages.length, 4);
  assert(report.investigationGuide.steps.length >= 5);
  assert.match(JSON.stringify(report.investigationGuide), /確認済み|推測|未確認/);
  assert.match(JSON.stringify(report.applicationSpec), /参照|台本|描画指示|画像生成/);
  assert.doesNotMatch(JSON.stringify([report.applicationSpec, report.investigationGuide]), /Super FURU|OpenAI|Gemini|sk-/);
  assert(report.events.every(e => typeof e.timeISO === 'string' && typeof e.operationLabel === 'string'));
});

test('typed Japanese contract failures remain validation errors with rejected candidate context',()=>{
 const event=summarizeDiagnosticError(Object.assign(new Error('枠越え元が必要です。'),{code:'PAGE_COMPOSITION_CONTRACT',diagnosticContext:{stage:'step2_scenario_validation',scenario:'生成候補',validationError:'breakouts[0].panel'}}));
 assert.equal(event.errorKind,'validation');
 assert.equal(event.failureContext.scenario,'生成候補');
 assert.equal(event.failureContext.validationError,'breakouts[0].panel');
});
