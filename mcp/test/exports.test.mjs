import test from 'node:test';
import assert from 'node:assert/strict';
import {promises as fs} from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {createHash} from 'node:crypto';
import {ProjectStore,approvalHash} from '../src/store.mjs';
import {exportCompletedPage,writeProjectManifest,resolveDownloadsDirectory,readPortableProject,migrateLegacyExports,reexportAcceptedPages,readSavedPageVersion} from '../src/exports.mjs';

const png='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl6tZkAAAAASUVORK5CYII=';
const now=new Date(2026,10,16,16,40,25);
async function fixture(){
 const base=process.env.MANGA_MCP_TEST_ROOT||os.tmpdir();await fs.mkdir(base,{recursive:true});
 const root=await fs.mkdtemp(path.join(base,'readable-export-'));
 const store=await new ProjectStore(path.join(root,'state')).init();
 const project=await store.create({name:'Fallback project',totalPages:3},'create');
 project.plan={revision:1,outline:{title:'風まかせ便'}};project.pages[0].kind='illustration';
 const asset=await store.assets.putDataUrl(png);project.assetBindings={sheet:{asset,role:'character_sheet'}};
 const downloadsDirectory=path.join(root,'Downloads');await fs.mkdir(downloadsDirectory);
 return {store,project,downloadsDirectory};
}
test('readable cover/body paired names retain portable assets and manifest data',async()=>{
 const f=await fixture();
 for(const [index,label] of [[0,'表紙'],[1,'001ページ'],[2,'002ページ']]){
  const saved=await exportCompletedPage(f.store,f.project,f.project.pages[index],{dataUrl:png,metadata:{scenario:'Retained dialogue',showWatermarks:false}},{downloadsDirectory:f.downloadsDirectory,attemptId:`attempt-${index}`,now});
  assert.equal(path.basename(saved.pngPath),`風まかせ便_${label}_20261116_164025.png`);
  assert.equal(path.basename(saved.jsonPath,'.json'),path.basename(saved.pngPath,'.png'));
  const json=JSON.parse(await fs.readFile(saved.jsonPath,'utf8'));
  assert.equal(json.image.relativePath,path.basename(saved.pngPath));assert.equal(json.metadata.showWatermarks,false);
  const assetBytes=await fs.readFile(path.resolve(saved.directory,json.assets[0].relativePath));
  assert.equal(createHash('sha256').update(assetBytes).digest('hex'),json.assets[0].sha256);
  f.project.pages[index].export={relativeDirectory:saved.relativeDirectory,pngRelativePath:saved.pngRelativePath,jsonRelativePath:saved.jsonRelativePath,imageSha256:saved.image.sha256};
 }
 const {manifestPath}=await writeProjectManifest(f.store,f.project,{downloadsDirectory:f.downloadsDirectory});
 const manifest=JSON.parse(await fs.readFile(manifestPath,'utf8'));assert.equal(path.basename(manifestPath),'作品全体.json');
 for(const page of manifest.project.pages){assert.equal(page.export.relativeDirectory,'.');assert.ok(await fs.stat(path.join(path.dirname(manifestPath),page.export.pngRelativePath)));}
 const entries=await fs.readdir(path.dirname(manifestPath));assert.equal(entries.filter(x=>x.endsWith('.png')).length,3);assert.equal(entries.filter(x=>x.endsWith('.json')).length,4);assert.equal(entries.includes('pages'),false);assert.equal(entries.includes('.保存準備'),false);
});
test('same second never overwrites another attempt and recovery keeps its original timestamp',async()=>{
 const f=await fixture(),input={dataUrl:png,metadata:{scenario:'Preserved'}};
 const first=await exportCompletedPage(f.store,f.project,f.project.pages[1],input,{downloadsDirectory:f.downloadsDirectory,attemptId:'first',now});
 const original=await fs.readFile(first.jsonPath);
 const second=await exportCompletedPage(f.store,f.project,f.project.pages[1],input,{downloadsDirectory:f.downloadsDirectory,attemptId:'second',now});
 assert.equal(first.directory,second.directory);assert.notEqual(first.pngPath,second.pngPath);assert.match(second.pngPath,/_02\.png$/);
 const archive=path.join(first.directory,'履歴');
 await assert.rejects(fs.access(first.pngPath),{code:'ENOENT'});
 await assert.rejects(fs.access(first.jsonPath),{code:'ENOENT'});
 assert.deepEqual(await fs.readFile(path.join(archive,path.basename(first.jsonPath))),original);
 const recovered=await exportCompletedPage(f.store,f.project,f.project.pages[1],input,{downloadsDirectory:f.downloadsDirectory,attemptId:'first',now:new Date(2027,0,1)});
 assert.equal(recovered.recovered,true);assert.equal(recovered.pngPath,path.join(archive,path.basename(first.pngPath)));
 const manifest=JSON.parse(await fs.readFile(second.manifestPath));
 assert.equal(manifest.project.pages[1].export.attemptId,'second');
 assert.equal(manifest.productionHistory.pages.find(item=>item.attemptId==='first').archived,true);
});

test('a superseded page stays current if the new pair fails; selecting the old picture again restores it as a new accepted pair',async()=>{
 const f=await fixture(),page=f.project.pages[1],options={downloadsDirectory:f.downloadsDirectory,now};
 const first=await exportCompletedPage(f.store,f.project,page,{dataUrl:png,metadata:{scenario:'first script'}},{...options,attemptId:'one'});
 const initial=await fs.readFile(first.manifestPath),original=await fs.readFile(first.jsonPath);
 const dataUrl=await import('../../src/lib/generated-image-metadata.js').then(m=>m.embedGeneratedImageMetadata(png,{version:'redraw'}));
 const rename=fs.rename;
 try {
  fs.rename=async(a,b)=>{if(b===first.manifestPath)throw Object.assign(new Error('test failure'),{code:'EIO'});return rename(a,b);};
  await assert.rejects(exportCompletedPage(f.store,f.project,page,{dataUrl,metadata:{scenario:'redraw'}},{...options,attemptId:'two'}),{code:'EIO'});
 }finally{fs.rename=rename;}
 assert.deepEqual(await fs.readFile(first.manifestPath),initial);
 assert.deepEqual(await fs.readFile(first.jsonPath),original);
 const second=await exportCompletedPage(f.store,f.project,page,{dataUrl,metadata:{scenario:'redraw'}},{...options,attemptId:'two'});
 await assert.rejects(fs.access(first.pngPath),{code:'ENOENT'});
 const archivedJson=path.join(first.directory,'履歴',path.basename(first.jsonPath));
 const old=JSON.parse(await fs.readFile(archivedJson));
 const oldPng=await fs.readFile(path.join(path.dirname(archivedJson),old.image.relativePath));
 const prior=await readSavedPageVersion(f.store,f.project,page.id,'one',options);
 await assert.rejects(readSavedPageVersion(f.store,f.project,f.project.pages[0].id,'one',options),{code:'PAGE_VERSION_NOT_FOUND'});
 const restored=await exportCompletedPage(f.store,f.project,page,{dataUrl:await f.store.assets.hydrate(prior.image),metadata:prior.metadata},{...options,attemptId:'restore-one'});
 assert.deepEqual(await fs.readFile(restored.pngPath),oldPng);
 assert.deepEqual(JSON.parse(await fs.readFile(restored.jsonPath)).metadata,old.metadata);
 assert.deepEqual(await fs.readFile(archivedJson),original);
 assert.ok(await fs.stat(path.join(first.directory,'履歴',path.basename(second.jsonPath))));
 assert.equal(JSON.parse(await fs.readFile(restored.manifestPath)).project.pages[1].export.attemptId,'restore-one');
 await fs.writeFile(archivedJson,JSON.stringify({...old,metadata:{scenario:'changed'}}));
 await assert.rejects(readSavedPageVersion(f.store,f.project,page.id,'one',options),{code:'EXPORTED_PAGE_CHANGED'});
});
test('JSON write failure never commits a lone PNG and the same attempt can be retried',async()=>{
 const f=await fixture(),open=fs.open;let injected=false;
 try{
  fs.open=async function(file,flags,...args){if(String(file).includes('.保存準備')&&String(file).endsWith('.json')&&flags==='wx'){injected=true;throw Object.assign(new Error('Simulated disk write failure'),{code:'EIO'});}return open.call(this,file,flags,...args);};
  await assert.rejects(exportCompletedPage(f.store,f.project,f.project.pages[0],{dataUrl:png,metadata:{}},{downloadsDirectory:f.downloadsDirectory,attemptId:'disk-error',now}),{code:'EIO'});
 }finally{fs.open=open;}
 assert.equal(injected,true);
 const book=path.join(f.downloadsDirectory,(await fs.readdir(f.downloadsDirectory))[0]);
 assert.equal((await fs.readdir(book)).filter(name=>name.endsWith('.png')||name.endsWith('.json')).length,0);
 const saved=await exportCompletedPage(f.store,f.project,f.project.pages[0],{dataUrl:png,metadata:{}},{downloadsDirectory:f.downloadsDirectory,attemptId:'disk-error',now});
 assert.ok(await fs.stat(saved.pngPath));assert.ok(await fs.stat(saved.jsonPath));
});
test('long forbidden titles remain bounded and legacy exports survive readable re-export',async()=>{
 const f=await fixture();f.project.plan.outline.title='<bad>:"/\\|?*\n'+ '長い題名'.repeat(50);
 const saved=await exportCompletedPage(f.store,f.project,f.project.pages[0],{dataUrl:png,metadata:{}},{downloadsDirectory:f.downloadsDirectory,attemptId:'legacy',now});
 assert.doesNotMatch(path.basename(saved.pngPath),/[<>:"/\\|?*\x00-\x1f]/);assert.ok(path.basename(saved.pngPath).length<110);
 const legacy=path.join(path.dirname(f.downloadsDirectory),'legacy-book'),oldPage=path.join(legacy,'pages','Page01-original');await fs.mkdir(oldPage,{recursive:true});
 await fs.copyFile(saved.pngPath,path.join(oldPage,'Page01.png'));const json=JSON.parse(await fs.readFile(saved.jsonPath,'utf8'));json.image.relativePath='Page01.png';json.attemptId='old-attempt';await fs.writeFile(path.join(oldPage,'Page01.json'),JSON.stringify(json));const old=await fs.readFile(path.join(oldPage,'Page01.json'));
 const plan=await migrateLegacyExports(f.store,f.project,{sourceDirectory:legacy,downloadsDirectory:f.downloadsDirectory});assert.equal(plan.dryRun,true);assert.equal(plan.pairs.length,1);
 const migration=await migrateLegacyExports(f.store,f.project,{sourceDirectory:legacy,downloadsDirectory:f.downloadsDirectory,dryRun:false});assert.equal(migration.originalsPreserved,true);assert.deepEqual(await fs.readFile(path.join(oldPage,'Page01.json')),old);assert.ok(await fs.stat(migration.results[0].pngPath));
});

test('empty plans create no deliverable folder and implicit test Downloads is rejected',async()=>{
 const f=await fixture();f.project.assetBindings={};assert.equal((await writeProjectManifest(f.store,f.project,{downloadsDirectory:f.downloadsDirectory})).skipped,true);assert.deepEqual(await fs.readdir(f.downloadsDirectory),[]);
 await assert.rejects(resolveDownloadsDirectory(),{code:'DOWNLOADS_NOT_CONFIGURED'});
 await assert.rejects(exportCompletedPage(f.store,f.project,f.project.pages[0],{dataUrl:png,metadata:{}},{attemptId:'no-default'}),{code:'DOWNLOADS_NOT_CONFIGURED'});
});
test('whole-book JSON restores hashes without exporting internal history or inventing rights',async()=>{
 const f=await fixture();const ref=f.project.assetBindings.sheet.asset;f.project.pages[0].snapshot={images:[ref],referenceAssets:[{image:ref}],generatedImage:ref,generationHistory:[{image:ref}],originalImage:ref,settings:{colorMode:'color'},scenario:'Approved scene'};
 f.project.approvalResponse={decision:'approve',recordedAt:now.toISOString(),userResponse:'Approved'};
 const saved=await exportCompletedPage(f.store,f.project,f.project.pages[0],{dataUrl:png,metadata:{model:'Observed model',scenario:'Approved scene',finalPrompt:'Preserved prompt',reference:ref}},{downloadsDirectory:f.downloadsDirectory,attemptId:'portable',now});
 const manifest=JSON.parse(await fs.readFile(saved.manifestPath,'utf8'));assert.equal(manifest.project.pages[0].snapshot.generationHistory,undefined);assert.equal(manifest.project.pages[0].snapshot.originalImage,undefined);assert.equal(manifest.productionHistory.approvalResponse.userResponse,'Approved');assert.ok(manifest.productionHistory.exporterAppVersion);
 assert.equal(manifest.project.assetBindings.sheet.asset.provenance.verification,'unverified');assert.equal(manifest.project.assetBindings.sheet.asset.provenance.license,'unknown');
 const restored=await readPortableProject(f.store,saved.manifestPath);assert.equal(restored.pages[0].snapshot.generatedImage.sha256,ref.sha256);assert.equal(restored.assetBindings.sheet.asset.sha256,ref.sha256);assert.equal(approvalHash(restored),approvalHash(f.project));assert.deepEqual(restored.requests,{});assert.equal((await fs.readdir(path.join(saved.directory,'資料'))).length,1);
 const fresh=await new ProjectStore(path.join(path.dirname(f.downloadsDirectory),'restored-state')).init(),freshProject=await readPortableProject(fresh,saved.manifestPath);
 const resumed=await writeProjectManifest(fresh,freshProject,{downloadsDirectory:f.downloadsDirectory});assert.equal(resumed.manifestPath,saved.manifestPath);assert.equal((await fs.readdir(f.downloadsDirectory)).length,1);const resumedJson=JSON.parse(await fs.readFile(resumed.manifestPath,'utf8'));assert.equal(resumedJson.productionHistory.pages.length,1);assert.equal((await fs.readdir(path.join(saved.directory,'資料'))).length,1);
 f.project.assetBindings.sheet.provenance={source:'Declared source',license:'Not checked',verification:'user_declared'};await writeProjectManifest(f.store,f.project,{downloadsDirectory:f.downloadsDirectory});const declared=JSON.parse(await fs.readFile(saved.manifestPath,'utf8'));assert.equal(declared.project.assetBindings.sheet.asset.provenance.verification,'user_declared');assert.equal(declared.project.assetBindings.sheet.asset.provenance.license,'Not checked');
 manifest.project.assetBindings.sheet.asset.relativePath='../outside.png';await fs.writeFile(saved.manifestPath,JSON.stringify(manifest));await assert.rejects(readPortableProject(f.store,saved.manifestPath),{code:'PATH_REJECTED'});
});
test('canonical accepted project, not a legacy whole-book JSON, controls migration selection',async()=>{
 const f=await fixture(),legacy=path.join(path.dirname(f.downloadsDirectory),'legacy-canonical'),dir=path.join(legacy,'pages','old');await fs.mkdir(dir,{recursive:true});
 const image=f.project.assetBindings.sheet.asset;f.project.pages[0].snapshot={accepted:true,generatedImage:image,scenario:'Canonical scene',finalPrompt:'Canonical prompt',settings:{showWatermarks:false}};
 const bytes=Buffer.from(png.split(',')[1],'base64');await fs.writeFile(path.join(dir,'Page01.png'),bytes);await fs.writeFile(path.join(dir,'Page01.json'),JSON.stringify({projectId:f.project.id,pageId:f.project.pages[0].id,attemptId:'canonical-old',exportedAt:now.toISOString(),image:{relativePath:'Page01.png',sha256:image.sha256},metadata:{scenario:'Older metadata'}}));
 await fs.writeFile(path.join(legacy,'project-manifest.json'),'{"project":{"name":"Wrong clone","pages":[]}}');
 const plan=await reexportAcceptedPages(f.store,f.project,{sourceDirectory:legacy,downloadsDirectory:f.downloadsDirectory});assert.equal(plan.pages.length,1);assert.equal(plan.pages[0].imageSha256,image.sha256);assert.deepEqual(await fs.readdir(f.downloadsDirectory),[]);
 f.project.pages[1].snapshot={accepted:true,generatedImage:image};await assert.rejects(reexportAcceptedPages(f.store,f.project,{sourceDirectory:legacy,downloadsDirectory:f.downloadsDirectory}),{code:'LEGACY_CANONICAL_MISMATCH'});delete f.project.pages[1].snapshot;
 const migrated=await reexportAcceptedPages(f.store,f.project,{sourceDirectory:legacy,downloadsDirectory:f.downloadsDirectory,dryRun:false});assert.equal(migrated.results.length,1);const json=JSON.parse(await fs.readFile(migrated.results[0].jsonPath,'utf8'));assert.equal(json.metadata.scenario,'Canonical scene');assert.equal(json.metadata.finalPrompt,'Canonical prompt');assert.ok(await fs.stat(path.join(dir,'Page01.png')));
});
test('second rename failure rolls back the first public file and retry keeps one paired output',async()=>{
 const f=await fixture(),rename=fs.rename;
 try{fs.rename=async function(a,b){if(String(a).includes('.保存準備')&&String(b).endsWith('.json'))throw Object.assign(new Error('Second rename failure'),{code:'EIO'});return rename.call(this,a,b);};await assert.rejects(exportCompletedPage(f.store,f.project,f.project.pages[0],{dataUrl:png,metadata:{}},{downloadsDirectory:f.downloadsDirectory,attemptId:'rename-fail',now}),{code:'EIO'});}finally{fs.rename=rename;}
 const book=path.join(f.downloadsDirectory,(await fs.readdir(f.downloadsDirectory))[0]);assert.equal((await fs.readdir(book)).filter(x=>x.endsWith('.png')||x.endsWith('.json')).length,0);
 const saved=await exportCompletedPage(f.store,f.project,f.project.pages[0],{dataUrl:png,metadata:{}},{downloadsDirectory:f.downloadsDirectory,attemptId:'rename-fail',now});assert.ok(await fs.stat(saved.pngPath));assert.ok(await fs.stat(saved.jsonPath));
 f.project.pages[0].snapshot={accepted:false};await writeProjectManifest(f.store,f.project,{downloadsDirectory:f.downloadsDirectory});const m=JSON.parse(await fs.readFile(saved.manifestPath,'utf8'));assert.equal(m.project.pages[0].snapshot.accepted,false);
});
test('pair is recovered without a new image after a failure updating the whole-book JSON',async()=>{
 const f=await fixture(),rename=fs.rename;let injected=false;
 try{fs.rename=async function(a,b){if(String(b).endsWith('作品全体.json')){injected=true;throw Object.assign(new Error('Manifest disk error'),{code:'EIO'});}return rename.call(this,a,b);};await assert.rejects(exportCompletedPage(f.store,f.project,f.project.pages[0],{dataUrl:png,metadata:{}},{downloadsDirectory:f.downloadsDirectory,attemptId:'manifest-failure',now}),{code:'EIO'});}finally{fs.rename=rename;}
 assert.equal(injected,true);const saved=await exportCompletedPage(f.store,f.project,f.project.pages[0],{dataUrl:png,metadata:{}},{downloadsDirectory:f.downloadsDirectory,attemptId:'manifest-failure',now});assert.equal(saved.recovered,true);assert.ok(await fs.stat(saved.manifestPath));assert.equal((await fs.readdir(saved.directory)).filter(x=>x.endsWith('.png')).length,1);
});
test('interrupted half-pair is recovered without duplicate staging or overwriting its PNG',async()=>{
 const f=await fixture(),rename=fs.rename;
 try{fs.rename=async function(a,b){if(String(a).includes('.保存準備')&&String(b).endsWith('.json')||String(b).includes('.保存準備')&&String(a).endsWith('.png'))throw Object.assign(new Error('Interrupted rename and rollback'),{code:'EIO'});return rename.call(this,a,b);};await assert.rejects(exportCompletedPage(f.store,f.project,f.project.pages[0],{dataUrl:png,metadata:{}},{downloadsDirectory:f.downloadsDirectory,attemptId:'half-pair',now}),{code:'EIO'});}finally{fs.rename=rename;}
 const book=path.join(f.downloadsDirectory,(await fs.readdir(f.downloadsDirectory))[0]);assert.equal((await fs.readdir(book)).filter(x=>x.endsWith('.png')).length,1);assert.equal((await fs.readdir(book)).filter(x=>x.endsWith('.json')).length,0);
 const saved=await exportCompletedPage(f.store,f.project,f.project.pages[0],{dataUrl:png,metadata:{}},{downloadsDirectory:f.downloadsDirectory,attemptId:'half-pair',now});assert.ok(await fs.stat(saved.pngPath));assert.ok(await fs.stat(saved.jsonPath));assert.equal((await fs.readdir(book)).includes('.保存準備'),false);
});
test('repair-source images stay private while fingerprints remain in page and whole-book JSON',async()=>{
 const f=await fixture(),bytes=Buffer.concat([Buffer.from(png.split(',')[1],'base64'),Buffer.from('private-repair-source')]),source=await f.store.assets.putDataUrl('data:image/png;base64,'+bytes.toString('base64'));
 const saved=await exportCompletedPage(f.store,f.project,f.project.pages[0],{dataUrl:png,metadata:{inputImages:[{role:'repair_source',dataUrl:source}]}},{downloadsDirectory:f.downloadsDirectory,attemptId:'repair-private',now});
 assert.equal((await fs.readdir(path.join(saved.directory,'資料'))).length,1);const page=JSON.parse(await fs.readFile(saved.jsonPath,'utf8')),whole=JSON.parse(await fs.readFile(saved.manifestPath,'utf8'));
 assert.equal(page.metadata.inputImages[0].storage,'private_workspace_only');assert.equal(page.metadata.inputImages[0].imageFingerprint.sha256,source.sha256);assert.equal(page.assets.some(a=>a.assetId===source.id),false);assert.equal(whole.productionHistory.pages[0].metadata.inputImages[0].imageFingerprint.sha256,source.sha256);assert.ok(await f.store.assets.dataUrl(source));
});
test('previous completed page uses its root PNG; unexported continuity remains portable',async()=>{
 const f=await fixture(),bytes=Buffer.concat([Buffer.from(png.split(',')[1],'base64'),Buffer.from('completed-page')]),priorUrl='data:image/png;base64,'+bytes.toString('base64');
 const prior=await exportCompletedPage(f.store,f.project,f.project.pages[0],{dataUrl:priorUrl,metadata:{}},{downloadsDirectory:f.downloadsDirectory,attemptId:'prior',now});
 const next=await exportCompletedPage(f.store,f.project,f.project.pages[1],{dataUrl:png,metadata:{inputImages:[{role:'previous_page_continuity',sourcePageId:f.project.pages[0].id,dataUrl:prior.image}]}},{downloadsDirectory:f.downloadsDirectory,attemptId:'next',now});
 const json=JSON.parse(await fs.readFile(next.jsonPath,'utf8'));assert.equal(json.assets.find(a=>a.assetId===prior.image.id).relativePath,path.basename(prior.pngPath));assert.equal((await fs.readdir(path.join(next.directory,'資料'))).length,1);
 const extra=await f.store.assets.putDataUrl('data:image/png;base64,'+Buffer.concat([bytes,Buffer.from('unexported')]).toString('base64'));
 const saved=await exportCompletedPage(f.store,f.project,f.project.pages[2],{dataUrl:png,metadata:{inputImages:[{role:'previous_page_continuity',dataUrl:extra}]}},{downloadsDirectory:f.downloadsDirectory,attemptId:'extra',now});const extraJson=JSON.parse(await fs.readFile(saved.jsonPath,'utf8'));assert.match(extraJson.assets.find(a=>a.assetId===extra.id).relativePath,/^資料\//);assert.equal((await fs.readdir(path.join(next.directory,'資料'))).length,2);
});
import{buildGeneratedImageMetadata,embedGeneratedImageMetadata}from'../../src/lib/generated-image-metadata.js';
async function wrappedLegacyFixture(){const f=await fixture(),page=f.project.pages[0],raw=f.project.assetBindings.sheet.asset,context={provider:'openai',scenario:'Canonical scene',finalPrompt:'Actual API prompt including reference roles',inputImages:[{role:'character_reference',dataUrl:raw}],settings:{color_mode:'color'},referenceContext:null};const record=await buildGeneratedImageMetadata({appVersion:'v8.0.0',generatedAt:now.toISOString(),provider:'openai',modelId:'gpt-test',workflowMode:'api_image_generation',scenario:context.scenario,finalPrompt:context.finalPrompt,inputImages:await f.store.assets.hydrate(context.inputImages),settings:context.settings,referenceContext:null,outputImage:png});const wrapped=embedGeneratedImageMetadata(png,record),bytes=Buffer.from(wrapped.split(',')[1],'base64'),wrappedHash=createHash('sha256').update(bytes).digest('hex');page.snapshot={accepted:true,generatedImage:raw,scenario:'Canonical scene',finalPrompt:'UI final prompt',settings:{showWatermarks:false},generationHistory:[{id:now.getTime(),img:raw,selected:true,generatedAt:now.toISOString(),modelId:'gpt-test',metadataContext:context}]};page.export={imageSha256:wrappedHash};const legacy=path.join(path.dirname(f.downloadsDirectory),'legacy-wrapped');await fs.mkdir(legacy);const pngPath=path.join(legacy,'Page01.png'),jsonPath=path.join(legacy,'Page01.json');const sidecar={projectId:f.project.id,pageId:page.id,attemptId:'wrapped-old',exportedAt:now.toISOString(),image:{relativePath:'Page01.png',sha256:wrappedHash},metadata:context};await fs.writeFile(pngPath,bytes);await fs.writeFile(jsonPath,JSON.stringify(sidecar));return{...f,page,raw,context,record,wrapped,bytes,legacy,pngPath,jsonPath,sidecar};}
test('accepted raw PNG migration verifies metadata wrapping and copies the original metadata PNG bytes intact',async()=>{const f=await wrappedLegacyFixture();const plan=await reexportAcceptedPages(f.store,f.project,{sourceDirectory:f.legacy,downloadsDirectory:f.downloadsDirectory});assert.equal(plan.pages[0].canonicalImageSha256,f.raw.sha256);assert.equal(plan.pages[0].imageSha256,f.sidecar.image.sha256);assert.notEqual(plan.pages[0].imageSha256,f.raw.sha256);assert.deepEqual(await fs.readdir(f.downloadsDirectory),[]);const saved=await reexportAcceptedPages(f.store,f.project,{sourceDirectory:f.legacy,downloadsDirectory:f.downloadsDirectory,dryRun:false});assert.deepEqual(await fs.readFile(saved.results[0].pngPath),f.bytes);assert.deepEqual(await fs.readFile(f.pngPath),f.bytes);const sidecar=JSON.parse(await fs.readFile(saved.results[0].jsonPath,'utf8'));assert.equal(sidecar.metadata.finalPrompt,f.context.finalPrompt);const whole=JSON.parse(await fs.readFile(saved.manifestPath,'utf8'));assert.equal(whole.project.name,f.project.name);assert.equal(whole.project.pages[0].snapshot.finalPrompt,'UI final prompt');});
for(const tamper of['pixels','embedded-metadata','sidecar-metadata','metadata-crc'])test('raw migration rejects '+tamper+' even when outer export claims are updated',async()=>{const f=await wrappedLegacyFixture();let bytes=f.bytes;if(tamper==='pixels'){const changed='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGP4z8DwHwAFAAH/iZk9HQAAAABJRU5ErkJggg==';bytes=Buffer.from(embedGeneratedImageMetadata(changed,f.record).split(',')[1],'base64');}else if(tamper==='embedded-metadata')bytes=Buffer.from(embedGeneratedImageMetadata(png,{...f.record,ai:{...f.record.ai,model_id:'forged-model'}}).split(',')[1],'base64');else if(tamper==='metadata-crc'){bytes=Buffer.from(bytes);const at=bytes.indexOf(Buffer.from('iTXt')),length=bytes.readUInt32BE(at-4);bytes[at+4+length]^=1;}else f.sidecar.metadata={...f.context,scenario:'Forged scene'};if(tamper!=='sidecar-metadata'){const hash=createHash('sha256').update(bytes).digest('hex');f.page.export.imageSha256=hash;f.sidecar.image.sha256=hash;await fs.writeFile(f.pngPath,bytes);}await fs.writeFile(f.jsonPath,JSON.stringify(f.sidecar));await assert.rejects(reexportAcceptedPages(f.store,f.project,{sourceDirectory:f.legacy,downloadsDirectory:f.downloadsDirectory}),{code:'LEGACY_CANONICAL_MISMATCH'});assert.deepEqual(await fs.readdir(f.downloadsDirectory),[]);});
async function twoAcceptedLegacyPages(){const f=await fixture(),red='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGP4z8DwHwAFAAH/iZk9HQAAAABJRU5ErkJggg==',blue='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGNgYPj/HwADAgH/5ncLrgAAAABJRU5ErkJggg==',rawCover=await f.store.assets.putDataUrl(red),rawBody=await f.store.assets.putDataUrl(blue),legacy=path.join(path.dirname(f.downloadsDirectory),'two-accepted-legacy');await fs.mkdir(legacy);const imageHashes=[];for(const[index,url,raw]of[[0,red,rawCover],[1,blue,rawBody]]){const page=f.project.pages[index],inputImages=[{role:'character_reference',dataUrl:f.project.assetBindings.sheet.asset},...(index?[{role:'previous_page_continuity',sourcePageId:f.project.pages[0].id,dataUrl:rawCover}]:[])],context={provider:'openai',scenario:'Approved '+index,finalPrompt:'API prompt '+index,inputImages,settings:{color_mode:'color'},referenceContext:null},record=await buildGeneratedImageMetadata({appVersion:'v8.0.0',generatedAt:now.toISOString(),provider:'openai',modelId:'gpt-test',workflowMode:'api_image_generation',scenario:context.scenario,finalPrompt:context.finalPrompt,inputImages:await f.store.assets.hydrate(inputImages),outputImage:url,settings:context.settings}),wrapped=embedGeneratedImageMetadata(url,record),asset=await f.store.assets.putDataUrl(wrapped);imageHashes.push(asset.sha256);page.snapshot={accepted:true,generatedImage:index?asset:raw,scenario:context.scenario,finalPrompt:'UI prompt '+index,generationHistory:[{id:index+1,selected:true,img:raw,modelId:'gpt-test',generatedAt:now.toISOString(),metadataContext:context}]};page.export={imageSha256:asset.sha256};await fs.writeFile(path.join(legacy,`Page${index}.png`),Buffer.from(wrapped.split(',')[1],'base64'));await fs.writeFile(path.join(legacy,`Page${index}.json`),JSON.stringify({projectId:f.project.id,pageId:page.id,attemptId:'batch-'+index,exportedAt:now.toISOString(),image:{relativePath:`Page${index}.png`,sha256:asset.sha256},metadata:context}));}return{...f,legacy,imageHashes,rawCover};}
for(const migrate of[reexportAcceptedPages,migrateLegacyExports])test(migrate.name+' avoids orphan output-image material copies and labels retained raw continuity',async()=>{const f=await twoAcceptedLegacyPages(),saved=await migrate(f.store,f.project,{sourceDirectory:f.legacy,downloadsDirectory:f.downloadsDirectory,dryRun:false}),book=saved.results[0].directory,materials=await fs.readdir(path.join(book,'資料')),hashes=await Promise.all(materials.map(async name=>({name,sha:createHash('sha256').update(await fs.readFile(path.join(book,'資料',name))).digest('hex')})));assert.equal(materials.length,2,'only the supplied sheet and actual raw previous-page input belong in materials');assert.equal(hashes.some(item=>f.imageHashes.includes(item.sha)),false,'committed root PNGs must not be duplicated in materials');const previous=hashes.find(item=>item.sha===f.rawCover.sha256);assert.match(previous.name,/表紙_前ページ参照\.png$/);const pageRecords=await Promise.all(saved.results.map(async result=>({result,data:JSON.parse(await fs.readFile(result.jsonPath,'utf8'))}))),bodyEntry=pageRecords.find(entry=>entry.data.pageId===f.project.pages[1].id),body=bodyEntry.data,ref=body.assets.find(asset=>asset.sha256===f.rawCover.sha256);assert.equal(ref.role,'previous_page_continuity');assert.equal(ref.provenance.sourcePageId,f.project.pages[0].id);const whole=JSON.parse(await fs.readFile(saved.manifestPath,'utf8'));assert.equal(whole.project.pages[1].snapshot.generatedImage.relativePath,bodyEntry.result.pngRelativePath);assert.equal((await fs.readdir(book)).filter(name=>name.endsWith('.png')).length,2);});

// Distinct assets with the same fallback label are traversed concurrently by portable arrays.
test('parallel portable references reserve unique filenames and retain every immutable hash',async()=>{
 const f=await fixture();
 try{const assets=[];for(let i=0;i<6;i++)assets.push(await f.store.assets.putDataUrl(png.slice(0,png.indexOf(',')+1)+Buffer.concat([Buffer.from(png.split(',')[1],'base64'),Buffer.from(`fixture-${i}`)]).toString('base64')));
 f.project.pages[0].snapshot={images:assets};
 const saved=await writeProjectManifest(f.store,f.project,{downloadsDirectory:f.downloadsDirectory});
 const manifest=JSON.parse(await fs.readFile(saved.manifestPath,'utf8')),refs=manifest.project.pages[0].snapshot.images;
 assert.equal(new Set(refs.map(ref=>ref.relativePath)).size,assets.length);
 for(const ref of refs)assert.equal(createHash('sha256').update(await fs.readFile(path.join(saved.directory,ref.relativePath))).digest('hex'),ref.sha256);
 await writeProjectManifest(f.store,f.project,{downloadsDirectory:f.downloadsDirectory});
 const target=path.join(saved.directory,refs[0].relativePath);await fs.writeFile(target,'user modification');
 await assert.rejects(writeProjectManifest(f.store,f.project,{downloadsDirectory:f.downloadsDirectory}),{code:'EXPORTED_ASSET_CHANGED'});assert.equal(await fs.readFile(target,'utf8'),'user modification');
 }finally{await fs.rm(path.dirname(f.store.root),{recursive:true,force:true});}
});

test('known legacy journal aliases recover into fresh names only when existing bytes match one canonical alias; tampering stays rejected',async()=>{
 const f=await fixture();try{
 const variants=[];for(let i=0;i<3;i++)variants.push(await f.store.assets.putDataUrl('data:image/png;base64,'+Buffer.concat([Buffer.from(png.split(',')[1],'base64'),Buffer.from('alias-'+i)]).toString('base64')));
 f.project.pages[0].snapshot={images:variants};const saved=await writeProjectManifest(f.store,f.project,{downloadsDirectory:f.downloadsDirectory});
 const folder=path.join(f.store.root,'exports',f.project.id),journal=path.join(folder,(await fs.readdir(folder))[0]),state=JSON.parse(await fs.readFile(journal,'utf8'));
 const keep=state.assets[variants[0].id].name,keepPath=path.join(saved.directory,'資料',keep),keepBytes=await fs.readFile(keepPath);
 for(const asset of variants.slice(1)){await fs.unlink(path.join(saved.directory,'資料',state.assets[asset.id].name));state.assets[asset.id].name=keep;}await fs.writeFile(journal,JSON.stringify(state));
 await writeProjectManifest(f.store,f.project,{downloadsDirectory:f.downloadsDirectory});const repaired=JSON.parse(await fs.readFile(journal,'utf8'));assert.equal(new Set(variants.map(a=>repaired.assets[a.id].name)).size,3);assert.deepEqual(await fs.readFile(keepPath),keepBytes);
 for(const asset of variants)assert.equal(createHash('sha256').update(await fs.readFile(path.join(saved.directory,'資料',repaired.assets[asset.id].name))).digest('hex'),asset.sha256);
 // Recreate an alias whose actual bytes match none of its journal hashes.
 for(const asset of variants.slice(1))repaired.assets[asset.id].name=keep;await fs.writeFile(journal,JSON.stringify(repaired));await fs.writeFile(keepPath,'unrelated user bytes');
 await assert.rejects(writeProjectManifest(f.store,f.project,{downloadsDirectory:f.downloadsDirectory}),{code:'EXPORTED_ASSET_CHANGED'});assert.equal(await fs.readFile(keepPath,'utf8'),'unrelated user bytes');
 }finally{await fs.rm(path.dirname(f.store.root),{recursive:true,force:true});}
});
test('portable manifest omits foreign-owned runtime snapshots instead of copying another book assets',async()=>{
 const f=await fixture();try{const foreign=await f.store.assets.putDataUrl('data:image/png;base64,'+Buffer.concat([Buffer.from(png.split(',')[1],'base64'),Buffer.from('foreign')]).toString('base64'));f.project.pages[0].snapshot={bookPageContext:{projectId:'another-book',pageId:'old-page',assets:[{dataUrl:foreign}]},images:[foreign]};const before=structuredClone(f.project);const saved=await writeProjectManifest(f.store,f.project,{downloadsDirectory:f.downloadsDirectory});const manifest=JSON.parse(await fs.readFile(saved.manifestPath,'utf8'));assert.equal(manifest.project.pages[0].snapshot,null);assert.equal(manifest.project.pages[0].snapshotOmission.reason,'foreign_application_context');assert.equal((await fs.readdir(path.join(saved.directory,'資料'))).length,1);assert.deepEqual(f.project,before);}finally{await fs.rm(path.dirname(f.store.root),{recursive:true,force:true});}
});
