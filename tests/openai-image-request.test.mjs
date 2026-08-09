import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildOpenAIImageRequestBody,
  generateImageWithOpenAI,
  setOpenAIApiKey,
} from '../src/lib/openai.js';

test('gpt-image request uses the supported low moderation level', () => {
  const request = buildOpenAIImageRequestBody('full production manga prompt');

  assert.equal(request.model, 'gpt-image-2');
  assert.equal(request.prompt, 'full production manga prompt');
  assert.equal(request.moderation, 'low');
  assert.equal(request.stream, true);
  assert.equal(request.partial_images, 1);
});

test('non-streaming fallback omits streaming-only request fields', () => {
  const request = buildOpenAIImageRequestBody('fallback prompt', { stream: false });

  assert.equal(request.model, 'gpt-image-2');
  assert.equal(request.prompt, 'fallback prompt');
  assert.equal('stream' in request, false);
  assert.equal('partial_images' in request, false);
});

test('retries once without streaming when the browser stream fetch fails', async () => {
  const originalFetch = globalThis.fetch;
  const requests = [];
  setOpenAIApiKey('test-key');
  globalThis.fetch = async (_url, options) => {
    requests.push(JSON.parse(options.body));
    if (requests.length === 1) throw new TypeError('Failed to fetch');
    return new Response(JSON.stringify({ data: [{ b64_json: 'fallback-image' }] }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  };

  try {
    const result = await generateImageWithOpenAI('fallback prompt', () => {});
    assert.equal(result.base64Img, 'fallback-image');
    assert.equal(requests.length, 2);
    assert.equal(requests[0].stream, true);
    assert.equal('stream' in requests[1], false);
    assert.equal('partial_images' in requests[1], false);
  } finally {
    globalThis.fetch = originalFetch;
    setOpenAIApiKey('');
  }
});
