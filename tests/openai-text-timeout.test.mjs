import {test, before, after} from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';

let server, client, session;
const originalFetch = globalThis.fetch;
before(async () => {
  server = await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true, hmr:false}});
  client = await server.ssrLoadModule('/src/lib/openai-text.js');
  session = await server.ssrLoadModule('/src/lib/api-session.js');
  session.setApiSession('openai', 'test-only-credential');
});
after(async () => { globalThis.fetch = originalFetch; session?.clearApiSession(); await server?.close(); });

const chatRequest = logs => client.requestOpenAIChatCompletion({
  modelId:'test-model', messages:[{role:'user', content:'PRIVATE_REQUEST_CONTENT'}],
  apiKey:'test-only-key', timeoutMs:20, onThinkingUpdate:line => logs.push(line),
});

test('chat completion timeout covers a stalled response body after headers and identifies that phase', async () => {
  const logs = [];
  let bodyController;
  globalThis.fetch = async (_url, options) => {
    const body = new ReadableStream({start(controller) {
      bodyController = controller;
      options.signal.addEventListener('abort', () => controller.error(new DOMException('aborted', 'AbortError')));
    }});
    return new Response(body, {headers: {'content-type':'application/json'}});
  };
  try {
    const result = await Promise.race([
      chatRequest(logs)
        .then(() => 'unexpected success', error => error.message),
      new Promise(resolve => setTimeout(() => resolve('still waiting after headers'), 120)),
    ]);
    assert.match(result, /Timeout/, result);
    assert.match(result, /stage=receiving_body/);
    assert.ok(logs.some(line => /\[TIMING\].*HTTP応答受信.*elapsed_ms=\d+/.test(line)));
    assert.ok(logs.some(line => /\[TIMING\].*TIMEOUT.*stage=receiving_body.*elapsed_ms=\d+/.test(line)));
    assert.ok(!logs.some(line => line.includes('本文受信完了')));
  } finally {
    bodyController?.error(new Error('test cleanup'));
    globalThis.fetch = originalFetch;
  }
});

test('chat completion identifies a timeout before HTTP headers without inventing body receipt', async () => {
  const logs = [];
  globalThis.fetch = (_url, {signal}) => new Promise((_resolve, reject) => {
    signal.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError')));
  });
  try {
    await assert.rejects(chatRequest(logs), error => error.code === 'TIMEOUT' && /stage=awaiting_response/.test(error.message));
    assert.ok(logs.some(line => /\[TIMING\].*送信開始.*elapsed_ms=\d+/.test(line)));
    assert.ok(logs.some(line => /\[TIMING\].*TIMEOUT.*stage=awaiting_response.*elapsed_ms=\d+/.test(line)));
    assert.ok(!logs.some(line => /HTTP応答受信|本文受信完了/.test(line)));
  } finally { globalThis.fetch = originalFetch; }
});

for (const webSearch of [false, true]) {
  const name = webSearch ? 'Responses search' : 'Chat/Vision';
  test(`${name} records elapsed times at actual transport boundaries without request or response contents`, async (t) => {
    let now = 0;
    t.mock.method(performance, 'now', () => now);
    const logs = [];
    globalThis.fetch = async () => {
      now = 125;
      return {
        ok:true, status:200,
        json:async () => {
          now = 450;
          return webSearch
            ? {status:'completed', output_text:'PRIVATE_RESPONSE_CONTENT'}
            : {choices:[{finish_reason:'stop', message:{content:'PRIVATE_RESPONSE_CONTENT'}}]};
        },
      };
    };
    try {
      await client.callOpenAIText('PRIVATE_REQUEST_CONTENT', webSearch ? null : [{inlineData:{mimeType:'image/png',data:'PRIVATE_IMAGE_CONTENT'}}], null, line => logs.push(line), {useWebSearch:webSearch});
      const timings = logs.filter(line => line.includes('[TIMING]'));
      assert.equal(timings.length, 3);
      assert.match(timings[0], /送信開始.*elapsed_ms=0/);
      assert.match(timings[1], /HTTP応答受信.*elapsed_ms=125/);
      assert.match(timings[2], /本文受信完了.*elapsed_ms=450/);
      assert.ok(!logs.join('\n').includes('PRIVATE_'));
      assert.ok(!logs.join('\n').includes('test-only-credential'));
      assert.ok(!logs.join('\n').includes('Authorization'));
    } finally { globalThis.fetch = originalFetch; }
  });
}

for (const awaitingBody of [false, true]) {
  test(`Responses search identifies ${awaitingBody ? 'body' : 'headers'} timeout before preserving existing fallback`, async () => {
    let calls = 0;
    const logs = [];
    globalThis.fetch = async (_url, {signal}) => {
      if (++calls > 1) return Response.json({status:'completed', output_text:'completed fixture'});
      const stalled = () => new Promise((_resolve, reject) => signal.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError'))));
      return awaitingBody ? {ok:true,status:200,json:stalled} : stalled();
    };
    try {
      const result = await client.callOpenAIText('fixture', null, null, line => logs.push(line), {useWebSearch:true,timeoutMs:20});
      assert.equal(result.text, 'completed fixture');
      assert.equal(calls, 2);
      const timeouts = logs.filter(line => line.includes('[TIMING]') && line.includes('TIMEOUT'));
      assert.equal(timeouts.length, 1);
      assert.match(timeouts[0], new RegExp(`stage=${awaitingBody ? 'receiving_body' : 'awaiting_response'}`));
    } finally { globalThis.fetch = originalFetch; }
  });
}
