import test from 'node:test';
import assert from 'node:assert/strict';
// This client and its dependencies are plain ESM. A development server adds
// an asynchronous SSR loading boundary without contributing to this contract.
import {callThinkingGemini, setApiKey} from '../src/lib/gemini.js';

test('ordinary text requests do not consume Google Search grounding', async () => {
  const originalFetch = globalThis.fetch;
  const bodies = [];
  setApiKey('test-only-key');
  globalThis.fetch = async (_url, options) => {
    bodies.push(JSON.parse(options.body));
    return new Response(JSON.stringify({candidates:[{content:{parts:[{text:'result'}]}}]}), {status:200});
  };
  try {
    assert.equal((await callThinkingGemini('prompt', null, null, null, {useWebSearch:false})).text, 'result');
    assert.equal(bodies.length, 1);
    assert.equal(bodies[0].tools, undefined);
  } finally {globalThis.fetch = originalFetch; setApiKey('');}
});

test('explicit JSON output reaches Gemini and exposes completion metadata without changing ordinary text', async () => {
  const originalFetch = globalThis.fetch;
  const bodies = [];
  setApiKey('test-only-key');
  globalThis.fetch = async (_url, options) => {
    bodies.push(JSON.parse(options.body));
    return Response.json({ candidates: [{ finishReason: 'STOP', content: { parts: [{ text: '{"status":"unverified"}' }] } }],
      usageMetadata: { promptTokenCount: 200, candidatesTokenCount: 100, totalTokenCount: 300 } });
  };
  try {
    const ordinary = await callThinkingGemini('Return JSON.', null, null, null);
    const json = await callThinkingGemini('Return JSON.', null, null, null, { responseFormat: 'json_object' });
    assert.equal(bodies.length, 2);
    assert.deepEqual(bodies[0].generationConfig, { maxOutputTokens: 8192 });
    assert.deepEqual(bodies[1], { ...bodies[0], generationConfig: { maxOutputTokens: 8192, responseMimeType: 'application/json' } });
    assert.equal(ordinary.finishReason, undefined);
    assert.equal(ordinary.usage, undefined);
    assert.equal(json.finishReason, 'STOP');
    assert.deepEqual(json.usage, { prompt_tokens: 200, completion_tokens: 100, total_tokens: 300 });
    assert.equal(json.text, ordinary.text);
  } finally { globalThis.fetch = originalFetch; setApiKey(''); }
});

test('JSON output returns a nonempty truncated Gemini response and its finish reason without another request', async () => {
  const originalFetch = globalThis.fetch;
  let calls = 0;
  setApiKey('test-only-key');
  globalThis.fetch = async () => {
    calls++;
    return Response.json({ candidates: [{ finishReason: 'MAX_TOKENS', content: { parts: [{ text: '{"partial":true}' }] } }] });
  };
  try {
    const result = await callThinkingGemini('Return JSON.', null, null, null, { responseFormat: 'json_object' });
    assert.equal(result.finishReason, 'MAX_TOKENS', 'the review boundary must be able to reject incomplete output');
    assert.equal(result.text, '{"partial":true}');
    assert.equal(calls, 1);
  } finally { globalThis.fetch = originalFetch; setApiKey(''); }
});

test('unsupported Gemini JSON formats fail before any request or fallback', async () => {
  const originalFetch = globalThis.fetch;
  let calls = 0;
  setApiKey('test-only-key');
  globalThis.fetch = async () => { calls++; return Response.json({ candidates: [{ content: { parts: [{ text: 'fixture' }] } }] }); };
  try {
    for (const responseFormat of [null, 'json', { type: 'json_object' }]) {
      await assert.rejects(callThinkingGemini('fixture', null, null, null, { responseFormat }), /Unsupported response format/);
    }
    assert.equal(calls, 0);
  } finally { globalThis.fetch = originalFetch; setApiKey(''); }
});

test('required news search never succeeds through an ungrounded retry', async () => {
  const originalFetch = globalThis.fetch;
  const bodies = [];
  setApiKey('test-only-key');
  globalThis.fetch = async (url, options) => {
    if (String(url).endsWith('/models')) return new Response(JSON.stringify({models:[]}));
    const body = JSON.parse(options.body);
    bodies.push(body);
    return body.tools
      ? new Response(JSON.stringify({error:{message:'grounding unavailable',code:400}}), {status:400})
      : new Response(JSON.stringify({candidates:[{content:{parts:[{text:'unverified news'}]}}]}));
  };
  try {
    await assert.rejects(callThinkingGemini('news', null, null, null, {useWebSearch:true}), /全モデル接続失敗/);
    assert.ok(bodies.length > 0);
    assert.ok(bodies.every(body => body.tools?.[0]?.googleSearch));
  } finally {globalThis.fetch = originalFetch; setApiKey('');}
});

test('required news search needs a grounded source in the adopted candidate', async () => {
  const originalFetch = globalThis.fetch;
  setApiKey('test-only-key');
  globalThis.fetch = async (url) => String(url).endsWith('/models')
    ? new Response(JSON.stringify({models:[]}))
    : new Response(JSON.stringify({candidates:[{content:{parts:[{text:'unsupported answer'}]}}]}));
  try {
    await assert.rejects(callThinkingGemini('news', null, null, null, {useWebSearch:true}), /全モデル接続失敗/);
  } finally {globalThis.fetch = originalFetch; setApiKey('');}
});
