import test from 'node:test';
import assert from 'node:assert/strict';
import {
  makeDiagnosticEvent, retainDiagnosticEvents, DIAGNOSTIC_LIMITS,
  createDiagnosticFetch, getDiagnosticRequest, summarizeDiagnosticError,
  beginDiagnosticRun, beginDiagnosticAction, getDiagnosticContext, endDiagnosticRun, readDiagnostics,
  observeDiagnosticRun,
} from '../src/lib/diagnostics.js';

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
