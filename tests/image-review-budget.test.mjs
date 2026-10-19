import assert from 'node:assert/strict';
import test from 'node:test';
import * as cancellation from '../src/lib/api-work-cancellation.js';
import { runImageQualityFailsafe } from '../src/lib/image-quality-failsafe.js';
import { createServer } from 'vite';

test('a transport that never settles cannot leave an explicitly bounded review waiting', async () => {
  const controller = new AbortController();
  const pending = cancellation.withImageReviewCancellation(() => new Promise(() => {}), controller.signal, { timeoutMs: 20 });
  const result = await Promise.race([
    pending.then(() => 'unexpected success', error => error.code),
    new Promise(resolve => setTimeout(() => resolve('still waiting'), 100)),
  ]);
  controller.abort();
  assert.equal(result, 'IMAGE_REVIEW_TIMEOUT');
});

test('QA budget spans sequential stages, aborts a stalled transport and refuses late results or another request', async t => {
  assert.equal(typeof cancellation.createImageReviewBudget, 'function');
  t.mock.timers.enable({ apis: ['setTimeout', 'Date'], now: 0 });
  const budget = cancellation.createImageReviewBudget({ timeoutMs: 180_000 });
  assert.equal(await budget.run(async () => { t.mock.timers.tick(70_000); return 'inventory'; }), 'inventory');
  t.mock.timers.tick(600_000); // Image generation/idle time is outside the QA budget.
  let received, late, calls = 0;
  const pending = budget.run(signal => {
    received = signal; calls++;
    return new Promise(resolve => { late = resolve; });
  });
  const rejected = assert.rejects(pending, error => error.code === 'IMAGE_REVIEW_TIMEOUT');
  await new Promise(resolve => setImmediate(resolve));
  t.mock.timers.tick(109_999);
  assert.equal(received.aborted, false);
  t.mock.timers.tick(1);
  await rejected;
  assert.equal(received.aborted, true);
  assert.equal(budget.exhausted, true);
  late({ pass: true });
  await assert.rejects(budget.run(async () => { calls++; }), { code: 'IMAGE_REVIEW_TIMEOUT' });
  assert.equal(calls, 1);
  assert.equal(cancellation.getApiWorkSignal().aborted, false, 'a QA timeout must not cancel the next user action');
});

test('normal multi-stage inspection succeeds, disposes its timer and preserves user cancellation', async t => {
  assert.equal(typeof cancellation.createImageReviewBudget, 'function');
  t.mock.timers.enable({ apis: ['setTimeout', 'Date'], now: 0 });
  const budget = cancellation.createImageReviewBudget({ timeoutMs: 180_000 });
  let completedSignal;
  await budget.run(async signal => { completedSignal = signal; t.mock.timers.tick(40_000); });
  assert.deepEqual(await budget.run(async () => { t.mock.timers.tick(50_000); return { pass: true }; }), { pass: true });
  t.mock.timers.tick(600_000);
  assert.equal(budget.exhausted, false);
  assert.equal(completedSignal.aborted, false);
  const controller = new AbortController();
  const stopped = budget.run(() => new Promise(() => {}), controller.signal);
  const rejected = assert.rejects(stopped, { code: 'CANCELLED' });
  controller.abort();
  await rejected;
  assert.equal(budget.exhausted, false);
});

test('expired QA preserves pixels and concrete findings, fails closed and spends no repair or supplementary request', async t => {
  assert.equal(typeof cancellation.createImageReviewBudget, 'function');
  t.mock.timers.enable({ apis: ['setTimeout', 'Date'], now: 0 });
  const budget = cancellation.createImageReviewBudget({ timeoutMs: 180_000 });
  const image = { base64Img: 'preserved', mimeType: 'image/png' };
  let late;
  const pending = runImageQualityFailsafe({
    originalCandidate: image, originalPrompt: 'approved', allowRepair: true,
    isReviewBudgetExhausted: () => budget.exhausted,
    reviewCandidate: (_image, _prompt, { onReviewProgress }) => budget.run(() => {
      onReviewProgress({ pass: false, issues: [{ type: 'anatomy', panel: 1, reason: 'Three attached arms' }] });
      return new Promise(resolve => { late = resolve; });
    }),
    analyzeFailure: () => assert.fail('expired QA cannot spend analysis'),
    generateRepairCandidate: () => assert.fail('expired QA cannot generate an image'),
    compareCandidates: () => assert.fail('expired QA cannot compare'),
  });
  await new Promise(resolve => setImmediate(resolve));
  t.mock.timers.tick(180_000);
  const result = await pending;
  assert.equal(result.candidate, image);
  assert.equal(result.attempts, 1);
  assert.equal(result.finalReview.pass, false);
  assert.equal(result.stopReason, 'review_timeout');
  assert.ok(result.finalReview.issues.some(issue => issue.type === 'anatomy'));
  assert.ok(result.finalReview.issues.some(issue => issue.type === 'unverified'));
  late({ pass: true, issues: [] });
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(result.finalReview.pass, false);
});

test('the shared deadline aborts actual provider clients while awaiting headers or body, without fallback', async () => {
  const server = await createServer({ appType:'custom', logLevel:'silent', server:{middlewareMode:true, hmr:false} });
  const originalFetch = globalThis.fetch;
  try {
    const control = await server.ssrLoadModule('/src/lib/api-work-cancellation.js');
    const session = await server.ssrLoadModule('/src/lib/api-session.js');
    const openai = await server.ssrLoadModule('/src/lib/openai-text.js');
    const gemini = await server.ssrLoadModule('/src/lib/gemini.js');
    for (const [provider, client] of [['openai', openai.callOpenAIText], ['gemini', gemini.callThinkingGemini]]) {
      session.setApiSession(provider, 'test-only-credential');
      for (const bodyWaiting of [false, true]) {
        let calls = 0, receivedSignal;
        globalThis.fetch = async (_url, {signal}) => {
          calls++; receivedSignal = signal;
          if (!bodyWaiting) return new Promise((_resolve,reject) => {
            signal.addEventListener('abort',()=>reject(new DOMException('Aborted','AbortError')), {once:true});
          });
          return new Response(new ReadableStream({ start(controller) {
            signal.addEventListener('abort',()=>controller.error(new DOMException('Aborted','AbortError')), {once:true});
          } }), {headers:{'content-type':'application/json'}});
        };
        const budget = control.createImageReviewBudget({timeoutMs:30});
        await assert.rejects(budget.run(signal => client('inspect', [{inlineData:{mimeType:'image/png',data:'test'}}], null, ()=>{}, {signal})), {code:'IMAGE_REVIEW_TIMEOUT'});
        await new Promise(resolve=>setImmediate(resolve));
        assert.equal(receivedSignal.aborted, true, `${provider}: abort reached transport`);
        assert.equal(calls, 1, `${provider}: no provider fallback after deadline`);
        assert.equal(control.getApiWorkSignal().aborted, false);
      }
    }
    session.clearApiSession();
  } finally { globalThis.fetch = originalFetch; await server.close(); }
});

test('default QA budget allows more than three minutes and stops at ten minutes', async t => {
  t.mock.timers.enable({apis:['setTimeout','Date'],now:0});
  const budget = cancellation.createImageReviewBudget();
  let signal;
  const pending = budget.run(active => {signal=active; return new Promise(()=>{});});
  const stopped = pending.then(()=>null,error=>error.code);
  await new Promise(resolve=>setImmediate(resolve));
  t.mock.timers.tick(180_000);
  assert.equal(signal.aborted,false,'three minutes must not truncate inspection');
  t.mock.timers.tick(419_999);
  assert.equal(signal.aborted,false);
  t.mock.timers.tick(1);
  assert.equal(await stopped,'IMAGE_REVIEW_TIMEOUT');
  assert.equal(budget.elapsedMs,600_000);
});
