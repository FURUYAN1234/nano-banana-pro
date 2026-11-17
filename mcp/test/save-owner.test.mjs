import test from 'node:test';
import assert from 'node:assert/strict';
import {promises as fs} from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {ProjectStore,approvalHash} from '../src/store.mjs';
import {exportCompletedPage,relocateProjectExports,readPortableProject} from '../src/exports.mjs';
import {readMcpSaveStatus} from '../src/save-status.mjs';
const png='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl6tZkAAAAASUVORK5CYII=';
async function fixture(t){const root=await fs.mkdtemp(path.join(os.tmpdir(),'save-owner-'));t.after(()=>fs.rm(root,{recursive:true,force:true}));const store=await new ProjectStore(path.join(root,'state')).init(),downloadsDirectory=path.join(root,'downloads');await fs.mkdir(downloadsDirectory);const parent=await store.create({name:'Current work'},'parent'),child=await store.create({name:'Costume materials'},'child');return{store,parent,child,options:{downloadsDirectory}};}
async function save(f,p,attemptId){return exportCompletedPage(f.store,p,p.pages[0],{dataUrl:png,metadata:{scenario:'Complete text'}},{...f.options,attemptId});}
test('regular save ownership preserves every pair and future writes under current work',async t=>{
 const f=await fixture(t),parent=await save(f,f.parent,'parent'),first=await save(f,f.child,'first'),second=await save(f,f.child,'second');
 const original=await fs.readFile(first.jsonPath),before=approvalHash(f.child);
 await f.store.setSaveOwner({projectId:f.child.id,ownerProjectId:f.parent.id,expectedRevision:1,idempotencyKey:'owner'});
 const child=await f.store.get(f.child.id);assert.equal(approvalHash(child),before);
 const moved=await relocateProjectExports(f.store,child,f.options);
 assert.equal(path.dirname(path.dirname(moved.directory)),parent.directory);
 assert.deepEqual(await fs.readFile(path.join(moved.directory,path.basename(first.jsonPath))),original);
 assert.deepEqual(await fs.readFile(first.jsonPath),original);
 assert.deepEqual(await fs.readFile(path.join(moved.directory,path.basename(second.pngPath))),await fs.readFile(second.pngPath));
 const third=await save(f,child,'third');assert.equal(third.directory,moved.directory);
 const portable=await readPortableProject(f.store,third.manifestPath);assert.equal(portable.id,child.id);
 const ownerManifest=JSON.parse(await fs.readFile(parent.manifestPath,'utf8'));assert.equal(ownerManifest.project.materialProjects[0].projectId,child.id);
 const status=await readMcpSaveStatus(f.store,child,f.options);assert.equal(status.destination.bookDirectory,moved.directory);
 const retry=await relocateProjectExports(f.store,child,f.options);assert.equal(retry.directory,moved.directory);
 assert.equal((await save(f,f.parent,'parent-next')).directory,parent.directory);
});
test('ownership rejects cycles, missing workspace identities and conflicting owners',async t=>{
 const f=await fixture(t),other=await f.store.create({name:'Other'},'other');
 await assert.rejects(f.store.setSaveOwner({projectId:f.child.id,ownerProjectId:f.child.id,expectedRevision:1,idempotencyKey:'self'}),{code:'SAVE_OWNER_CYCLE'});
 await assert.rejects(f.store.setSaveOwner({projectId:f.child.id,ownerProjectId:'../bad',expectedRevision:1,idempotencyKey:'path'}));
 await assert.rejects(f.store.setSaveOwner({projectId:f.child.id,ownerProjectId:'missing',expectedRevision:1,idempotencyKey:'missing'}),{code:'ENOENT'});
 await f.store.setSaveOwner({projectId:f.child.id,ownerProjectId:f.parent.id,expectedRevision:1,idempotencyKey:'owner'});
 await assert.rejects(f.store.setSaveOwner({projectId:f.parent.id,ownerProjectId:f.child.id,expectedRevision:1,idempotencyKey:'cycle'}),{code:'SAVE_OWNER_CYCLE'});
 await assert.rejects(f.store.setSaveOwner({projectId:f.child.id,ownerProjectId:other.id,expectedRevision:2,idempotencyKey:'conflict'}),{code:'SAVE_OWNER_CONFLICT'});
});
test('different destination bytes fail without overwriting either file',async t=>{
 const f=await fixture(t),parent=await save(f,f.parent,'p'),source=await save(f,f.child,'c');
 await f.store.setSaveOwner({projectId:f.child.id,ownerProjectId:f.parent.id,expectedRevision:1,idempotencyKey:'owner'});
 const target=path.join(parent.directory,'資料',path.basename(source.directory));await fs.mkdir(target,{recursive:true});const conflict=path.join(target,path.basename(source.pngPath));await fs.writeFile(conflict,'user file');
 await assert.rejects(relocateProjectExports(f.store,await f.store.get(f.child.id),f.options),{code:'EXPORTED_PAGE_CHANGED'});
 assert.equal(await fs.readFile(conflict,'utf8'),'user file');assert.deepEqual(await fs.readFile(source.pngPath),Buffer.from(png.split(',')[1],'base64'));
});

test('official stdio operation associates material output without a browser or paid API',async t=>{
 const {Client}=await import('@modelcontextprotocol/client');const{StdioClientTransport}=await import('@modelcontextprotocol/client/stdio');const{fileURLToPath}=await import('node:url');
 const f=await fixture(t);await save(f,f.parent,'owner');const source=await save(f,f.child,'material');
 const transport=new StdioClientTransport({command:process.execPath,args:[fileURLToPath(new URL('../src/server.mjs',import.meta.url)),'--workspace',f.store.root,'--downloads',f.options.downloadsDirectory],stderr:'pipe'}),client=new Client({name:'save-owner-fixture',version:'1'});
 await client.connect(transport);t.after(()=>client.close());
 const tools=(await client.listTools()).tools;assert.ok(tools.some(x=>x.name==='manga_project_set_save_owner'));
 const args={projectId:f.child.id,ownerProjectId:f.parent.id,expectedRevision:1,idempotencyKey:'regular-owner'};
 const result=await client.callTool({name:'manga_project_set_save_owner',arguments:args});assert.equal(result.isError,undefined,JSON.stringify(result));
 assert.equal(result.structuredContent.originalsPreserved,true);assert.ok(result.structuredContent.directory.includes(path.sep+'資料'+path.sep));
 assert.deepEqual(await fs.readFile(path.join(result.structuredContent.directory,path.basename(source.jsonPath))),await fs.readFile(source.jsonPath));
 const again=await client.callTool({name:'manga_project_set_save_owner',arguments:args});assert.equal(again.isError,undefined,JSON.stringify(again));
});

test('corrupt original history is rejected before copying it',async t=>{
 const f=await fixture(t);await save(f,f.parent,'owner');const source=await save(f,f.child,'material');await fs.writeFile(source.pngPath,'corrupt');
 await f.store.setSaveOwner({projectId:f.child.id,ownerProjectId:f.parent.id,expectedRevision:1,idempotencyKey:'owner'});
 await assert.rejects(relocateProjectExports(f.store,await f.store.get(f.child.id),f.options),{code:'EXPORTED_PAGE_CHANGED'});
});
