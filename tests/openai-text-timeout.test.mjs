import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';

test('chat completion timeout covers a stalled response body after headers', async () => {
  const server = await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
  const {requestOpenAIChatCompletion} = await server.ssrLoadModule('/src/lib/openai-text.js');
  const originalFetch = globalThis.fetch;
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
      requestOpenAIChatCompletion({modelId:'test-model', messages:[], apiKey:'test-only-key', timeoutMs:20})
        .then(() => 'unexpected success', error => error.message),
      new Promise(resolve => setTimeout(() => resolve('still waiting after headers'), 120)),
    ]);
    assert.match(result, /Timeout/, result);
  } finally {
    bodyController?.error(new Error('test cleanup'));
    globalThis.fetch = originalFetch;
    await server.close();
  }
});
