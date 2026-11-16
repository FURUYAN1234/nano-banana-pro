import test from 'node:test';
import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { ProjectStore,approvalHash } from '../src/store.mjs';
import { JobQueue } from '../src/jobs.mjs';
import { startBridge } from '../src/bridge.mjs';
import { runtimeFingerprint } from '../src/runtime-build.mjs';
import { createMangaBridgeClient } from '../../src/lib/mcp/browser-client.js';

const png='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl6tZkAAAAASUVORK5CYII=';
test('real loopback transport checkpoints ordered page PNG/JSON pairs without replaying paid work',async()=>{
  const root=process.env.MANGA_MCP_TEST_ROOT??path.join(tmpdir(),'super-furu-manga-tests');await fs.mkdir(root,{recursive:true});
  const base=await fs.mkdtemp(path.join(root,'integration-')),downloads=path.join(base,'downloads'),appRoot=path.join(base,'app'),dist=path.join(appRoot,'dist');
  for(const dir of [downloads,dist,path.join(appRoot,'src'),path.join(appRoot,'public')])await fs.mkdir(dir,{recursive:true});
  await fs.writeFile(path.join(appRoot,'index.html'),'<html><head></head><body></body></html>');await fs.writeFile(path.join(appRoot,'package.json'),'{"version":"8.0.0"}');
  await fs.writeFile(path.join(dist,'mcp-runtime.json'),JSON.stringify({fingerprint:await runtimeFingerprint(appRoot)}));
  const store=await new ProjectStore(path.join(base,'workspace')).init();let p=await store.create({name:'Storage fixture',assetMode:'user_supplied',totalPages:2,settings:{showWatermarks:false}},'create');
  await store.setPlan({projectId:p.id,expectedRevision:p.revision,idempotencyKey:'detail',outline:'Fixture outline',detail:{pages:p.pages.map(page=>({pageId:page.id,scenario:'Approved fixture scenario'}))}});
  p=await store.get(p.id);await store.requestApproval({projectId:p.id,expectedRevision:p.revision,idempotencyKey:'ok',action:'record_user_response',decision:'approve',userResponse:'Fixture approval',planHash:approvalHash(p),planRevision:p.plan.revision});
  p=await store.get(p.id);const jobs=await new JobQueue(store,{downloadsDirectory:downloads}).init();
  const bridge=await startBridge({store,jobs,appRoot,distDirectory:dist,port:0});
  let client;try {
    const connection=await bridge.connection(),token=new URL(connection.url).hash.slice(5);
    const completed=[];
    let completedOverHttp;
    const completion=new Promise(resolve=>{completedOverHttp=resolve;});
    client=createMangaBridgeClient({origin:bridge.origin,cancel(){},fetcher:async(url,options)=>{
      const response=await fetch(url,{...options,headers:{...options.headers,Origin:bridge.origin}});
      if(new URL(url).pathname==='/mcp-bridge/complete')completedOverHttp({status:response.status,body:await response.clone().json()});
      return response;
    },execute:async(job,context)=>{
      for(const page of job.project.pages){const loaded=await context.loadPage(page.id);assert.equal(loaded.page.id,page.id);
        if(page.index===2)assert.equal(loaded.continuityReferences[0].sourcePageId,job.project.pages[0].id);
        await context.savePage({pageId:page.id,dataUrl:png,metadata:{scenario:'Approved fixture scenario',finalPrompt:'Fixture transport only, not an API rendering result',settings:{showWatermarks:false}},snapshot:{format:1,scenario:'Approved fixture scenario'}});
        completed.push(page.id);
      }
      return {result:{complete:true}};
    }});
    await client.connect(token,['render_book']);const job=await jobs.submit({projectId:p.id,expectedRevision:p.revision,idempotencyKey:'render',operation:'render_book'});
    let deadline;
    try{
      const response=await Promise.race([completion,new Promise((_,reject)=>{deadline=setTimeout(()=>reject(new Error(`HTTP completion deadline exceeded; job=${job.id}, state=${jobs.get(job.id).state}`)),45000);})]);
      assert.equal(response.status,200,JSON.stringify(response.body));
      assert.equal(response.body.state,'completed',JSON.stringify(response.body));
    }finally{clearTimeout(deadline);}
    assert.equal(jobs.get(job.id).state,'completed');assert.equal(completed.length,2);assert.equal(jobs.get(job.id).result.exports.length,2);
    const saved=await store.get(p.id);assert.ok(saved.pages.every(page=>page.snapshot.accepted));assert.equal(saved.approval.hash,approvalHash(saved));
    const exported=jobs.get(job.id).result.exports,book=exported[0].directory;
    assert.ok(exported.every(item=>item.directory===book));
    const manifest=JSON.parse(await fs.readFile(exported[0].manifestPath,'utf8'));assert.equal(manifest.project.pages.length,2);
    const files=await fs.readdir(book);assert.equal(files.filter(name=>name.endsWith('.png')).length,2);assert.equal(files.filter(name=>name.endsWith('.json')).length,3);
    for(const page of saved.pages){const entry=exported.find(item=>item.pageId===page.id);assert.equal(page.export.relativeDirectory,'.');assert.equal(page.export.pngRelativePath,entry.pngRelativePath);assert.equal(page.export.jsonRelativePath,entry.jsonRelativePath);assert.equal(path.basename(entry.pngRelativePath,'.png'),path.basename(entry.jsonRelativePath,'.json'));await fs.access(path.join(book,page.export.pngRelativePath));const metadata=JSON.parse(await fs.readFile(path.join(book,page.export.jsonRelativePath),'utf8'));assert.equal(metadata.pageId,page.id);}

  }finally{await client?.disconnect();await bridge.close();}
});
