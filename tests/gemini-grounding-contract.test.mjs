import test, {before, after} from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'vite';

let server;
let callThinkingGemini;
let setApiKey;
before(async () => {
  server = await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
  ({callThinkingGemini, setApiKey} = await server.ssrLoadModule('/src/lib/gemini.js'));
});
after(async () => {setApiKey(''); await server?.close();});

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
