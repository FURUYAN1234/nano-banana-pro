import test from 'node:test';import assert from 'node:assert/strict';import {promises as fs} from 'node:fs';import path from 'node:path';import os from 'node:os';import {withMangaClient} from '../src/client.mjs';
test('optional material names and declared provenance persist without claiming verified rights',async()=>{
 const base=process.env.MANGA_MCP_TEST_ROOT||os.tmpdir();await fs.mkdir(base,{recursive:true});const root=await fs.mkdtemp(path.join(base,'provenance-')),downloads=path.join(root,'downloads');await fs.mkdir(downloads);
 await withMangaClient(path.join(root,'state'),async client=>{
  const call=async(name,args)=>{const r=await client.callTool({name,arguments:args});assert.notEqual(r.isError,true,JSON.stringify(r));return r.structuredContent;};
  const p=await call('manga_project_create',{name:'Provenance fixture',idempotencyKey:'create'}),asset=await call('manga_asset_import',{dataUrl:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl6tZkAAAAASUVORK5CYII='});
  await call('manga_asset_assign',{projectId:p.id,expectedRevision:p.revision,idempotencyKey:'assign',slotId:'character',assetId:asset.id,role:'character_sheet',displayName:'人物の資料',provenance:{source:'User supplied description',creator:'Declared creator',license:'Not yet checked',verification:'user_declared'}});
  const current=await call('manga_project_get',{projectId:p.id});assert.equal(current.assetBindings.character.displayName,'人物の資料');assert.equal(current.assetBindings.character.provenance.verification,'user_declared');assert.equal(current.assetBindings.character.provenance.license,'Not yet checked');
  const bad=await client.callTool({name:'manga_asset_assign',arguments:{projectId:p.id,expectedRevision:current.revision,idempotencyKey:'bad-rights',slotId:'character',assetId:asset.id,role:'character_sheet',provenance:{verification:'automatically_verified'}}});assert.equal(bad.isError,true);
 },{downloadsDirectory:downloads});assert.deepEqual(await fs.readdir(downloads),[]);
});
