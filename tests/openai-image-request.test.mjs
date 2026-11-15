import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildOpenAIImageRequestBody,
  generateImageWithOpenAI,
  setOpenAIApiKey,
} from '../src/lib/openai.js';

test('gpt-image request uses the supported low moderation level', () => {
  const request = buildOpenAIImageRequestBody('full production manga prompt');

  assert.equal(request.model, 'gpt-image-2.6-sunburst');
  assert.equal(request.quality, 'max');
  assert.equal(request.prompt, 'full production manga prompt');
  assert.equal(request.moderation, 'low');
  assert.equal(request.stream, true);
  assert.equal(request.partial_images, 1);
});

test('non-streaming fallback omits streaming-only request fields', () => {
  const request = buildOpenAIImageRequestBody('fallback prompt', { stream: false });

  assert.equal(request.model, 'gpt-image-2.6-sunburst');
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
    const result = await generateImageWithOpenAI('fallback prompt', () => {}, { quality: 'high' });
    assert.equal(requests.every(request => request.quality === 'high'), true);
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

test('normal generation accepts an ordinary JSON response without changing production request fields',async()=>{
 const savedFetch=globalThis.fetch;const sent=[];setOpenAIApiKey('test-key');
 globalThis.fetch=async(url,options)=>{sent.push({url,body:JSON.parse(options.body)});return new Response(JSON.stringify({data:[{b64_json:'json-final'}]}),{headers:{'content-type':'application/json'}});};
 try{const prompt='approved five-scene monochrome manga';const result=await generateImageWithOpenAI(prompt,()=>{},{quality:'sunburst-max',size:'2240x3168'});
  assert.equal(result.base64Img,'json-final');assert.equal(sent.length,1);assert.ok(sent[0].url.endsWith('/images/generations'));
  assert.deepEqual(sent[0].body,buildOpenAIImageRequestBody(prompt,{stream:true,quality:'sunburst-max',size:'2240x3168'}));
  assert.equal(sent[0].body.stream,true);assert.equal(sent[0].body.partial_images,1);
 }finally{globalThis.fetch=savedFetch;setOpenAIApiKey('');}
});
test('generation preserves HTTP failure and cancellation without retry',async()=>{
 const savedFetch=globalThis.fetch;setOpenAIApiKey('test-key');let calls=0;
 try{
  globalThis.fetch=async()=>{calls++;return new Response(JSON.stringify({error:{message:'provider failed'}}),{status:500});};
  await assert.rejects(generateImageWithOpenAI('approved',()=>{},{}),/OpenAI API Error: 500/);assert.equal(calls,1);
  calls=0;const controller=new AbortController();
  globalThis.fetch=async(_url,options)=>{calls++;return new Promise((_resolve,reject)=>{const abort=()=>reject(new DOMException('cancelled','AbortError'));if(options.signal.aborted)abort();else options.signal.addEventListener('abort',abort,{once:true});});};
  const pending=generateImageWithOpenAI('approved',()=>{},{signal:controller.signal});controller.abort();
  await assert.rejects(pending,/停止|中断|cancelled/i);assert.ok(calls<=1);
 }finally{globalThis.fetch=savedFetch;setOpenAIApiKey('');}
});
