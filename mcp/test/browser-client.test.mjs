import test from 'node:test';
import assert from 'node:assert/strict';
import { createMangaBridgeClient } from '../../src/lib/mcp/browser-client.js';
import { buildBookOutlineRequest, parseBookOutline } from '../../src/lib/mcp/book-plan.js';

test('browser bridge only pairs loopback and reports an action error as failure, never success', async () => {
  assert.throws(() => createMangaBridgeClient({ origin: 'https://example.com', execute() {}, cancel() {} }), { code: 'LOOPBACK_REQUIRED' });
  const sent = []; let resolveDone;
  const done = new Promise(resolve => { resolveDone = resolve; });
  const client = createMangaBridgeClient({ origin: 'http://127.0.0.1:45931', cancel() {}, execute: async () => { throw Object.assign(new Error('Stopped'), { code: 'CANCELLED', diagnosticContext:{stage:'camera_contract',scenario:'[Camera: low18 degree, no fisheye]',validationError:'Bearer fixturePrivateToken'} }); },
    fetcher: async (url, options) => {
      const route = url.split('/').at(-1), body = options.body && JSON.parse(options.body); sent.push({ route, body });
      let value = {};
      if (route === 'connect') value = { token: 'paired-session' };
      if (route === 'heartbeat') value = { cancelJobIds: [] };
      if (route === 'next') value = { job: { id: 'job', attemptId: 'attempt', operation: 'plan_story' } };
      if (route === 'complete') resolveDone();
      return { ok: true, json: async () => value };
    } });
  await client.connect('pair', ['plan_story']); await done; await client.disconnect();
  const result = sent.find(x => x.route === 'complete').body;
  assert.equal(result.success, false); assert.equal(result.error.code, 'CANCELLED'); assert.equal(result.error.failureContext.stage,'camera_contract'); assert.match(result.error.failureContext.scenario,/low18 degree/); assert.doesNotMatch(JSON.stringify(result.error),/fixturePrivateToken/);
  assert.equal(JSON.stringify(sent).includes('apiKey'), false);
});

test('book outline preserves ordered page identities and never claims detailed approval readiness', () => {
  const project = { brief: 'A quiet reunion', pages: [{ id: 'cover', kind: 'illustration', panelCount: 1 }, { id: 'page', kind: 'comic', panelCount: 2 }] };
  assert.match(buildBookOutlineRequest(project), /middle pages need no independent punchline/);
  assert.match(buildBookOutlineRequest(project), /not an approved detailed scenario/);
  assert.deepEqual(parseBookOutline('{"outline":{"cast":[],"assetSpecs":[],"pages":[{"pageId":"cover","beat":"Portrait"},{"pageId":"page","beat":"Reunion"}]}}', project).outline.pages.map(x => x.pageId), ['cover', 'page']);
  assert.throws(() => parseBookOutline('{"outline":{"pages":[{"pageId":"wrong","beat":"Portrait"}]}}', project), { code: 'PLAN_INVALID' });
});

test('disconnect waits for the actual cancelled action settlement before permitting normal-state restoration',async()=>{
  let release,started,cancelled=0;const entered=new Promise(resolve=>{started=resolve;});
  const action=new Promise(resolve=>{release=resolve;});const routes=[];
  const client=createMangaBridgeClient({origin:'http://127.0.0.1:45931',cancel:()=>{cancelled++;},execute:async()=>{started();await action;return {success:false,error:{code:'CANCELLED'}};},
    fetcher:async(url)=>{const route=url.split('/').at(-1);routes.push(route);return{ok:true,json:async()=>route==='connect'?{token:'session'}:route==='heartbeat'?{cancelJobIds:[]}:route==='next'?{job:{id:'job',attemptId:'attempt',operation:'image'}}:{}};}});
  await client.connect('pair',['image']);await entered;
  let restored=false;const disconnect=client.disconnect().then(()=>{restored=true;});
  await new Promise(resolve=>setTimeout(resolve,10));
  assert.equal(restored,false);assert.equal(routes.includes('disconnect'),false);assert.equal(cancelled,1);
  release();await disconnect;
  assert.equal(restored,true);assert.ok(routes.indexOf('complete')<routes.indexOf('disconnect'));
});

test('a delayed next response cannot execute after disconnect has returned',async()=>{
  let deliver,entered;const waiting=new Promise(resolve=>{entered=resolve;});let executions=0;
  const client=createMangaBridgeClient({origin:'http://127.0.0.1:45931',cancel(){},execute:async()=>{executions++;return {result:{}};},fetcher:async url=>{
    const route=url.split('/').at(-1);
    if(route==='next'){entered();return new Promise(resolve=>{deliver=()=>resolve({ok:true,json:async()=>({job:{id:'late',attemptId:'attempt',operation:'image'}})});});}
    return {ok:true,json:async()=>route==='connect'?{token:'session'}:route==='heartbeat'?{cancelJobIds:[]}:{}};
  }});
  await client.connect('pair',['image']);await waiting;await client.disconnect();deliver();await new Promise(resolve=>setTimeout(resolve,10));
  assert.equal(executions,0);
});

test('local stop settles before unlock even when service ACK fails; repeated stop is idempotent',async()=>{
 let finish,started,abortCount=0;const begun=new Promise(r=>started=r),settled=new Promise(r=>finish=r);
 const status=[];
 const client=createMangaBridgeClient({origin:'http://127.0.0.1:45931',cancel(){abortCount++;},onStatus:s=>status.push(s),execute:async()=>{started();await settled;return {success:false};},fetcher:async url=>{
  const route=url.split('/').at(-1);
  if(route==='disconnect'||route==='complete')throw new TypeError('Network unavailable');
  return {ok:true,json:async()=>route==='connect'?{token:'local-session'}:route==='next'?{job:{id:'job',attemptId:'attempt',operation:'image'}}:{cancelJobIds:[]}};
 }});
 await client.connect('pair',['image']);await begun;
 let returned=false;const first=client.disconnect().then(x=>{returned=true;return x;});const second=client.disconnect();
 await new Promise(r=>setTimeout(r,10));assert.equal(returned,false);assert.equal(abortCount,1);
 finish();const [a,b]=await Promise.all([first,second]);assert.equal(a.warning,b.warning);assert.match(a.warning,/サーバー/);
 assert.equal(status.at(-1).connected,false);assert.equal(abortCount,1);
});

test('pending completion and disconnect ACKs time out only after the local action settles',async()=>{
 let finish,started;const begun=new Promise(r=>started=r),settled=new Promise(r=>finish=r);
 const client=createMangaBridgeClient({origin:'http://127.0.0.1:45931',ackTimeoutMs:15,cancel(){},execute:async()=>{started();await settled;return {success:false};},fetcher:async url=>{
  const route=url.split('/').at(-1);if(['complete','disconnect'].includes(route))return new Promise(()=>{});
  return {ok:true,json:async()=>route==='connect'?{token:'local-session'}:route==='next'?{job:{id:'job',attemptId:'attempt',operation:'image'}}:{cancelJobIds:[]}};
 }});
 await client.connect('pair',['image']);await begun;let unlocked=false;
 const stop=client.disconnect().then(result=>{unlocked=true;return result;});
 await new Promise(r=>setTimeout(r,40));assert.equal(unlocked,false);
 finish();const result=await stop;assert.match(result.warning,/timed out/);assert.equal(unlocked,true);
});
