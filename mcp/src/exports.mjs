import {promises as fs,constants as fsConstants} from 'node:fs';
import path from 'node:path';
import {promisify} from 'node:util';
import {execFile} from 'node:child_process';
import {randomUUID,createHash} from 'node:crypto';
import {assertNoSecrets,assertSafeIdentifier,MangaControlError} from '../../src/lib/mcp/contract.js';
import {generationMetadataHash} from './store.mjs';
import {buildGeneratedImageMetadata,embedGeneratedImageMetadata,extractGeneratedImageMetadata} from '../../src/lib/generated-image-metadata.js';
const sha=b=>createHash('sha256').update(b).digest('hex'),queues=new Map();
const fail=(c,m)=>new MangaControlError(c,m);
const safeName=(v,max=48)=>Array.from(String(v??'').normalize('NFC').replace(/[<>:"/\\|?*\x00-\x1f\x7f]/g,'_').replace(/\s+/g,' ').trim().replace(/[. ]+$/g,'')).slice(0,max).join('')||'名称未設定';
function timestamp(v){const d=new Date(v);if(!Number.isFinite(d.getTime()))throw fail('INVALID_EXPORT_DATE','Export requires a valid timestamp.');const p=n=>String(n).padStart(2,'0');return `${d.getFullYear()}${p(d.getMonth()+1)}${p(d.getDate())}_${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;}
const title=p=>safeName(p.plan?.outline?.title||p.name||'漫画');
function deliverableMetadata(v){if(Array.isArray(v))return v.map(deliverableMetadata);if(v&&typeof v==='object'){if(['repair_source','original'].includes(v.role)&&v.storage!=='private_workspace_only'){const image=v.dataUrl||v.image||v.image_url;const fingerprint=image?.__mangaAsset?{assetId:image.id,sha256:image.sha256,mimeType:image.mimeType,width:image.width,height:image.height}:{available:false};return {...Object.fromEntries(Object.entries(v).filter(([k])=>!['dataUrl','image','image_url'].includes(k)).map(([k,c])=>[k,deliverableMetadata(c)])),imageFingerprint:fingerprint,storage:'private_workspace_only'};}return Object.fromEntries(Object.entries(v).map(([k,c])=>[k,deliverableMetadata(c)]));}return v;}
function restoreExportState(state,manifest){for(const e of manifest.productionHistory?.pages||[])if(e.pageId&&e.attemptId&&e.pngName&&e.jsonName)state.pages[`${e.pageId}:${e.attemptId}`]={...e,status:'committed'};function visit(v){if(v?.__mangaAsset===true&&/^[a-f0-9]{64}$/.test(v.id)&&v.relativePath?.startsWith('資料/')){const name=v.relativePath.slice(3);if(path.basename(name)===name)state.assets[v.id]={name,sha256:v.sha256,role:v.role||'input_reference',provenance:v.provenance||{source:'unknown',license:'unknown',verification:'unverified'}};}else if(v&&typeof v==='object')for(const c of Object.values(v))visit(c);}visit(manifest.project);}
function pageLabel(p,page){const n=p.pages.filter(x=>x.kind!=='illustration').sort((a,b)=>a.index-b.index).findIndex(x=>x.id===page.id)+1;return page.kind==='illustration'?'表紙':`${String(n||page.index).padStart(3,'0')}ページ`;}
async function exists(f){try{await fs.lstat(f);return true;}catch(e){if(e.code==='ENOENT')return false;throw e;}}
async function rename(a,b){for(let i=0;;i++){try{return await fs.rename(a,b);}catch(e){if(!['EPERM','EACCES','EBUSY'].includes(e.code)||i===5)throw e;await new Promise(r=>setTimeout(r,20*2**i));}}}
async function durableWrite(f,b){const h=await fs.open(f,'wx',0o600);try{await h.writeFile(b);await h.sync();}finally{await h.close();}}
async function atomicJson(store,f,v){assertNoSecrets(v);await store.rejectLinkedFile(f);const tmp=`${f}.${randomUUID()}.tmp`;await durableWrite(tmp,JSON.stringify(v,null,2)+'\n');await rename(tmp,f);}
async function directory(store,parent,name){const p=path.join(parent,name);if(path.dirname(p)!==parent)throw fail('PATH_REJECTED','Export directory escapes its parent.');await store.rejectLinkedFile(p);await fs.mkdir(p,{recursive:true});return fs.realpath(p);}
async function stagingDirectory(store,book){const p=await directory(store,book,'.保存準備');if(process.platform==='win32'){const command=`$p='${p.replaceAll("'","''")}'; $i=Get-Item -LiteralPath $p -Force; $i.Attributes=$i.Attributes -bor [IO.FileAttributes]::Hidden`;await promisify(execFile)('powershell.exe',['-NoProfile','-NonInteractive','-EncodedCommand',Buffer.from(command,'utf16le').toString('base64')],{windowsHide:true});}return p;}
export async function resolveDownloadsDirectory(){
 if(process.env.NODE_TEST_CONTEXT||process.env.MANGA_MCP_TEST_ROOT)throw fail('DOWNLOADS_NOT_CONFIGURED','Tests must configure an explicit isolated Downloads directory.');
 if(process.platform!=='win32')throw fail('DOWNLOADS_NOT_CONFIGURED','Configure an explicit export directory on this platform.');
 const command="[Environment]::ExpandEnvironmentVariables((Get-ItemProperty -LiteralPath 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\User Shell Folders').'{374DE290-123F-4565-9164-39C4925E467B}')";
 const {stdout}=await promisify(execFile)('powershell.exe',['-NoProfile','-NonInteractive','-Command',command],{windowsHide:true});const p=stdout.trim();
 if(!path.isAbsolute(p)||(await fs.lstat(p)).isSymbolicLink()||!(await fs.stat(p)).isDirectory())throw fail('DOWNLOADS_NOT_AVAILABLE','The OS Downloads directory is not available.');return fs.realpath(p);
}
async function withBook(store,project,options,action){
 assertSafeIdentifier(project.id);const requested=options.downloadsDirectory||await resolveDownloadsDirectory();await store.rejectLinkedFile(requested);const downloads=await fs.realpath(requested),key=`${store.root}:${project.id}:${downloads}`;
 const operation=(queues.get(key)||Promise.resolve()).catch(()=>{}).then(async()=>{
  const privateDir=await store.safeDirectory(path.join(store.root,'exports',project.id)),stateFile=path.join(privateDir,`${sha(downloads).slice(0,24)}.json`);await store.rejectLinkedFile(stateFile);
  let state;try{state=JSON.parse(await fs.readFile(stateFile,'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;state={format:2,projectId:project.id,assets:{},pages:{}};}
  if(state.projectId!==project.id)throw fail('EXPORT_STATE_INVALID','Export state belongs to another project.');
  if(!state.bookDirectory){const base=`${title(project)}_${timestamp(project.createdAt||options.now||new Date())}`;for(let i=1;;i++){const name=base+(i===1?'':`_${String(i).padStart(2,'0')}`),candidate=path.join(downloads,name);await store.rejectLinkedFile(candidate);try{await fs.mkdir(candidate);state.bookDirectory=name;break;}catch(e){if(e.code!=='EEXIST')throw e;try{const m=JSON.parse(await fs.readFile(path.join(candidate,'作品全体.json'),'utf8'));if(m.project?.id===project.id){assertNoSecrets(m);state.bookDirectory=name;restoreExportState(state,m);break;}}catch{}}}}
  if(path.basename(state.bookDirectory)!==state.bookDirectory||state.bookDirectory==='..')throw fail('EXPORT_STATE_INVALID','Unsafe book directory.');
  const book=await directory(store,downloads,state.bookDirectory),save=()=>atomicJson(store,stateFile,state);await save();const ctx={store,project,book,state,save,privateDir};try{return await action(ctx);}finally{await ctx.assetCopyTail;}
 });queues.set(key,operation);try{return await operation;}finally{if(queues.get(key)===operation)queues.delete(key);}
}
function assetLabel(project,binding={},slotId){const spec=project.assetSpecs?.find(s=>s.id===slotId),cast=project.plan?.outline?.cast?.find(c=>c.id===slotId||String(slotId).startsWith(c.id+'-'));const name=binding.displayName||cast?.name||spec?.name||spec?.description?.split(/[。\n]/)[0]||slotId||'参照資料';return `${safeName(name,28)}_${{character_sheet:'キャラクターシート',prop:'小物',background:'背景',previous_page_continuity:'前ページ参照',style_reference:'描法見本',medium_reference:'描法見本'}[binding.role]||'参照'}`;}
function referenceBinding(ctx,asset,context={}){
 if(!ctx.referenceHints){
  ctx.referenceHints=new Map();
  const visit=(v,parent={})=>{if(v?.__mangaAsset===true){if(['previous_page_continuity','style_reference','medium_reference'].includes(parent.role)&&!ctx.referenceHints.has(v.id))ctx.referenceHints.set(v.id,parent);return;}if(v&&typeof v==='object'&&!['repair_source','original'].includes(v.role))for(const child of Object.values(v))visit(child,v);};
  visit(ctx.project);for(const page of Object.values(ctx.state.pages))visit(page.metadata);
 }
 const usage=['previous_page_continuity','style_reference','medium_reference'].includes(context.role)?context:ctx.referenceHints.get(asset.id);
 if(usage?.role==='previous_page_continuity'){
  const source=ctx.project.pages.find(page=>page.id===usage.sourcePageId);
  return {role:usage.role,displayName:source?pageLabel(ctx.project,source):'前ページ',provenance:{source:'previous_page_reference',sourcePageId:usage.sourcePageId??null,license:'unknown',verification:'unverified'}};
 }
 return usage?{role:usage.role,displayName:'描法見本'}:{};
}
function portableAsset(ctx,asset,binding={},slotId){ctx.assetPending??=new Map();if(!ctx.assetPending.has(asset.id)){const pending=(ctx.assetCopyTail||Promise.resolve()).then(()=>copyPortableAsset(ctx,asset,binding,slotId));ctx.assetPending.set(asset.id,pending);ctx.assetCopyTail=pending.catch(()=>{});}return ctx.assetPending.get(asset.id);}
async function copyPortableAsset(ctx,asset,binding={},slotId){
 const {store,book,state,save,project}=ctx,dir=await directory(store,book,'資料'),extension=asset.mimeType==='image/png'?'png':asset.mimeType==='image/jpeg'?'jpg':'webp';let e=state.assets[asset.id];
 if(!e){const base=assetLabel(project,binding,slotId);for(let i=1;;i++){const name=`${base}${i===1?'':`_${String(i).padStart(2,'0')}`}.${extension}`;if(Object.values(state.assets).some(x=>x.name===name)||await exists(path.join(dir,name)))continue;e={name,sha256:asset.sha256,role:binding.role||'input_reference',provenance:binding.provenance||{source:binding.source||'unknown',license:'unknown',verification:'unverified',...(binding.model?{generationModel:binding.model}:{})}};state.assets[asset.id]=e;await save();break;}}
 const provenance=binding.provenance&&binding.role==='previous_page_continuity'&&e.provenance
  ?{...binding.provenance,...e.provenance,sourcePageId:binding.provenance.sourcePageId,...(!e.provenance.source||e.provenance.source==='unknown'?{source:binding.provenance.source}:{})}:binding.provenance;
 if(provenance&&JSON.stringify(e.provenance)!==JSON.stringify(provenance)){e.provenance=provenance;await save();}
 if(e.role==='input_reference'&&binding.role&&binding.role!=='input_reference'){e.role=binding.role;await save();}
 if(path.basename(e.name)!==e.name)throw fail('EXPORT_STATE_INVALID','Unsafe exported asset name.');const file=path.join(dir,e.name);await store.rejectLinkedFile(file);
 const bytes=Buffer.from((await store.assets.dataUrl(asset)).split(',')[1],'base64');if(sha(bytes)!==asset.sha256)throw fail('ASSET_CORRUPTED','Source asset hash changed.');
 if(e.sha256!==asset.sha256)throw fail('EXPORT_STATE_INVALID','Asset journal hash differs from its immutable source.');
 if(await exists(file)){
  const actual=sha(await fs.readFile(file));
  if(actual!==asset.sha256){
   const aliases=Object.entries(state.assets).filter(([,entry])=>entry.name===e.name);
   // Only a proven historical filename alias is repairable. An unrelated user
   // modification, or a uniquely assigned changed file, remains a hard failure.
   const keeper=aliases.find(([id,entry])=>id!==asset.id&&id===actual&&entry.sha256===actual);
   if(aliases.length<2||!keeper)throw fail('EXPORTED_ASSET_CHANGED','A portable exported asset was modified.');
   const canonicalKeeper=await store.assets.reference(keeper[0]);
   if(sha(Buffer.from((await store.assets.dataUrl(canonicalKeeper)).split(',')[1],'base64'))!==actual)throw fail('ASSET_CORRUPTED','The aliased keeper differs from its immutable source.');
   const base=assetLabel(project,binding,slotId);
   for(let i=1;;i++){const candidate=`${base}${i===1?'':`_${String(i).padStart(2,'0')}`}.${extension}`;if(Object.values(state.assets).some(entry=>entry.name===candidate)||await exists(path.join(dir,candidate)))continue;e.name=candidate;await save();return copyPortableAsset(ctx,asset,binding,slotId);}
  }
 }else{
  const tmp=path.join(dir,`.${randomUUID()}.tmp`);await durableWrite(tmp,bytes);
  try{try{try{await fs.link(tmp,file);}catch(error){if(!['ENOTSUP','EOPNOTSUPP','EPERM'].includes(error.code))throw error;await fs.copyFile(tmp,file,fsConstants.COPYFILE_EXCL);const handle=await fs.open(file,'r+');try{await handle.sync();}finally{await handle.close();}}}catch(error){if(error.code!=='EEXIST')throw error;if(sha(await fs.readFile(file))!==asset.sha256)throw fail('EXPORTED_ASSET_CHANGED','A portable asset target appeared with different bytes.');}}
  finally{await fs.unlink(tmp).catch(()=>{});}
 }

 return {...asset,relativePath:`資料/${e.name}`,role:e.role,provenance:e.provenance};
}
async function bindAssets(ctx){const refs=new Map();for(const [slot,b] of Object.entries(ctx.project.assetBindings||{}))refs.set(b.asset.id,await portableAsset(ctx,b.asset,b,slot));for(const page of ctx.project.pages)for(const [slot,b] of Object.entries(page.assetOverrides||{}))if(b)refs.set(b.asset.id,await portableAsset(ctx,b.asset,b,slot));return refs;}
async function writeManifest(ctx){
 const refs=await bindAssets(ctx),completed=Object.values(ctx.state.pages).filter(p=>p.status==='committed'),pageImages=new Map(completed.map(p=>[p.image.id,{...p.image,relativePath:p.pngName}]));
 async function portable(v,context={}){if(v?.__mangaAsset===true)return refs.get(v.id)||pageImages.get(v.id)||portableAsset(ctx,v,referenceBinding(ctx,v,context));if(v&&['repair_source','original'].includes(v.role)&&v.storage!=='private_workspace_only')return deliverableMetadata(v);if(Array.isArray(v))return Promise.all(v.map(item=>portable(item,context)));if(v&&typeof v==='object'){const o={};for(const [k,c] of Object.entries(v)){if(['requests','generationHistory','originalImage','diagnostics','assembly'].includes(k))continue;o[k]=await portable(c,v);}return o;}return v;}
 const sourceProject={...ctx.project,pages:ctx.project.pages.map(page=>{const owner=page.snapshot?.bookPageContext;return owner&&(owner.projectId!==ctx.project.id||owner.pageId!==page.id)?{...page,snapshot:null,snapshotOmission:{reason:'foreign_application_context'}}:page;})};
 const project=await portable(sourceProject);
 for(const page of project.pages){const e=completed.filter(p=>p.pageId===page.id).at(-1);if(e){page.export={relativeDirectory:'.',pngRelativePath:e.pngName,jsonRelativePath:e.jsonName,imageSha256:e.image.sha256,attemptId:e.attemptId,jobId:e.jobId};page.snapshot={...page.snapshot,generatedImage:{...e.image,relativePath:e.pngName},accepted:page.snapshot?.accepted??true};}}
 const app=JSON.parse(await fs.readFile(new URL('../../package.json',import.meta.url),'utf8'));
 const manifestPath=path.join(ctx.book,'作品全体.json'),record={format:2,project,productionHistory:{recordPurpose:'Production/restart evidence, not certification of rights or publisher acceptance.',exporterAppVersion:app.version,createdAt:ctx.project.createdAt,updatedAt:ctx.project.updatedAt,approval:ctx.project.approval??null,approvalResponse:ctx.project.approvalResponse??null,userEditRevision:ctx.project.userEditRevision??0,priorEditDetails:'Only recorded facts are included; unrecorded past edits are unavailable.',pages:await portable(completed.map(({status:_status,...p})=>p))}};await atomicJson(ctx.store,manifestPath,record);return {directory:ctx.book,manifestPath};
}
export async function writeProjectManifest(store,project,options={}){if(!Object.keys(project.assetBindings||{}).length&&!project.pages.some(p=>p.snapshot?.generatedImage||Object.values(p.assetOverrides||{}).some(Boolean)))return {skipped:true,reason:'NO_GENERATED_OR_IMPORTED_OUTPUT'};return withBook(store,project,options,writeManifest);}
async function verifyPair(ctx,e){for(const name of [e.pngName,e.jsonName]){if(path.basename(name)!==name)throw fail('EXPORT_STATE_INVALID','Unsafe page file name.');await ctx.store.rejectLinkedFile(path.join(ctx.book,name));}const j=JSON.parse(await fs.readFile(path.join(ctx.book,e.jsonName),'utf8')),bytes=await fs.readFile(path.join(ctx.book,e.pngName));if(j.projectId!==ctx.project.id||j.pageId!==e.pageId||j.attemptId!==e.attemptId||j.image.relativePath!==e.pngName||j.image.sha256!==e.image.sha256||sha(bytes)!==e.image.sha256)throw fail('EXPORTED_PAGE_CHANGED','Committed page image/JSON changed.');return j;}
function result(ctx,e,recovered=false){return {directory:ctx.book,relativeDirectory:'.',pngRelativePath:e.pngName,jsonRelativePath:e.jsonName,pngPath:path.join(ctx.book,e.pngName),jsonPath:path.join(ctx.book,e.jsonName),manifestPath:path.join(ctx.book,'作品全体.json'),image:e.image,recovered};}
export async function exportCompletedPage(store,project,page,{dataUrl,metadata},options={}){
 assertNoSecrets(metadata);metadata=deliverableMetadata(metadata);const attemptId=options.attemptId||randomUUID();if(!/^[A-Za-z0-9_-]{1,128}$/.test(attemptId))throw fail('INVALID_ATTEMPT','Export requires a bounded attempt identifier.');const image=await store.assets.putDataUrl(dataUrl);if(image.mimeType!=='image/png')throw fail('PNG_REQUIRED','Use the normal PNG metadata saver before export.');
 return withBook(store,project,options,async ctx=>{
  const key=`${page.id}:${attemptId}`;let e=ctx.state.pages[key];if(e&&e.image.sha256!==image.sha256)throw fail('EXPORTED_PAGE_CHANGED','The completed attempt image changed.');if(e?.status==='committed'){await verifyPair(ctx,e);if(!options.deferManifest)await writeManifest(ctx);return result(ctx,e,true);}
  const refs=await bindAssets(ctx);async function gather(v,context={}){if(v?.__mangaAsset===true){if(!refs.has(v.id)){const previous=Object.values(ctx.state.pages).find(p=>p.status==='committed'&&p.image.id===v.id);if(previous){await verifyPair(ctx,previous);refs.set(v.id,{...v,relativePath:previous.pngName,role:'previous_page_continuity',provenance:{source:'completed_page',sourcePageId:previous.pageId}});}else refs.set(v.id,await portableAsset(ctx,v,{role:context.role||'input_reference',...referenceBinding(ctx,v,context)}));}}else if(v&&typeof v==='object')for(const c of Object.values(v))await gather(c,v);}await gather(metadata);const assets=[...refs.values()].map(r=>({assetId:r.id,sha256:r.sha256,relativePath:r.relativePath,role:r.role,provenance:r.provenance}));
  if(!e){const now=options.now||new Date(),base=`${title(project)}_${pageLabel(project,page)}_${timestamp(now)}`;for(let i=1;;i++){const stem=base+(i===1?'':`_${String(i).padStart(2,'0')}`),pngName=stem+'.png',jsonName=stem+'.json';if(Object.values(ctx.state.pages).some(p=>p.pngName===pngName)||await exists(path.join(ctx.book,pngName))||await exists(path.join(ctx.book,jsonName)))continue;e={pageId:page.id,pageIndex:page.index,attemptId,jobId:options.jobId,pngName,jsonName,image,exportedAt:new Date(now).toISOString(),status:'pending',metadata};ctx.state.pages[key]=e;await ctx.save();break;}}
  const staging=await stagingDirectory(store,ctx.book),stage=await directory(store,staging,sha(key).slice(0,24)),json={format:2,projectId:project.id,pageId:page.id,pageIndex:page.index,attemptId,jobId:e.jobId,exportedAt:e.exportedAt,planRevision:project.plan?.revision,approvedPlanHash:project.approval?.hash,image:{sha256:image.sha256,relativePath:e.pngName,width:image.width,height:image.height},assets,metadata};assertNoSecrets(json);
  const moved=[];
  try{
   for(const [name,bytes] of [[e.pngName,Buffer.from(dataUrl.split(',')[1],'base64')],[e.jsonName,Buffer.from(JSON.stringify(json,null,2)+'\n')]]){const f=path.join(stage,name),target=path.join(ctx.book,name);await store.rejectLinkedFile(f);await store.rejectLinkedFile(target);if(await exists(target)){if(!(await fs.readFile(target)).equals(bytes))throw fail('EXPORT_PENDING_CHANGED','Partially committed file does not match retained data.');continue;}if(!await exists(f))await durableWrite(f,bytes);else if(!(await fs.readFile(f)).equals(bytes))throw fail('EXPORT_PENDING_CHANGED','Pending pair does not match retained data.');}
   for(const name of [e.pngName,e.jsonName]){const target=path.join(ctx.book,name);await store.rejectLinkedFile(target);if(!await exists(target)){await rename(path.join(stage,name),target);moved.push(name);}}
   await verifyPair(ctx,e);e.status='committed';await ctx.save();if(!options.deferManifest)await writeManifest(ctx);
  }catch(error){if(e.status!=='committed')for(const name of moved.reverse())await rename(path.join(ctx.book,name),path.join(stage,name)).catch(()=>{});throw error;}finally{if(e.status==='committed'){await fs.rmdir(stage).catch(()=>{});await fs.rmdir(staging).catch(()=>{});}}
  return result(ctx,e);
 });
}
// Inspect first; migration only copies verified pairs and never removes originals.
export async function migrateLegacyExports(store,project,{sourceDirectory,downloadsDirectory,dryRun=true}={}){
 if(!sourceDirectory||!path.isAbsolute(sourceDirectory))throw fail('MIGRATION_SOURCE_REQUIRED','Supply the explicit legacy book directory.');await store.rejectLinkedFile(sourceDirectory);const source=await fs.realpath(sourceDirectory),pairs=[];
 async function walk(dir){for(const item of await fs.readdir(dir,{withFileTypes:true})){const f=path.join(dir,item.name);if(item.isSymbolicLink())throw fail('PATH_REJECTED','Migration refuses linked files.');if(item.isDirectory())await walk(f);else if(item.name.endsWith('.json')&&item.name!=='project-manifest.json'){const j=JSON.parse(await fs.readFile(f,'utf8'));if(j.projectId!==project.id||!j.image?.relativePath)continue;const pngPath=path.resolve(dir,j.image.relativePath);if(!pngPath.startsWith(source+path.sep))throw fail('PATH_REJECTED','Legacy image escapes its book.');await store.rejectLinkedFile(pngPath);const realPng=await fs.realpath(pngPath);if(!realPng.startsWith(source+path.sep))throw fail('PATH_REJECTED','Legacy image link escapes its book.');const bytes=await fs.readFile(realPng);if(sha(bytes)!==j.image.sha256)throw fail('EXPORTED_PAGE_CHANGED','Legacy image hash differs.');pairs.push({jsonPath:f,pngPath,pageId:j.pageId,attemptId:j.attemptId,exportedAt:j.exportedAt||(await fs.stat(f)).mtime.toISOString(),metadata:j.metadata,sha256:j.image.sha256});}}}
 await walk(source);pairs.sort((a,b)=>a.exportedAt.localeCompare(b.exportedAt));if(dryRun)return {dryRun:true,sourceDirectory:source,pairs};const results=[];for(const p of pairs){const page=project.pages.find(x=>x.id===p.pageId);if(!page)throw fail('PAGE_NOT_FOUND','Legacy page does not belong to project.');results.push(await exportCompletedPage(store,project,page,{dataUrl:'data:image/png;base64,'+(await fs.readFile(p.pngPath)).toString('base64'),metadata:p.metadata},{downloadsDirectory,attemptId:p.attemptId,now:p.exportedAt,deferManifest:true}));}const manifest=results.length?await writeProjectManifest(store,project,{downloadsDirectory}):{};return {dryRun:false,sourceDirectory:source,results,...manifest,originalsPreserved:true};
}
export async function readPortableProject(store,manifestPath){
 await store.rejectLinkedFile(manifestPath);const root=await fs.realpath(path.dirname(manifestPath)),manifest=JSON.parse(await fs.readFile(manifestPath,'utf8'));assertNoSecrets(manifest);if(manifest.format!==2||!manifest.project)throw fail('MANIFEST_INVALID','Use a format-2 whole-book JSON.');
 async function hydrate(v){if(v?.__mangaAsset===true){if(!v.relativePath)throw fail('MANIFEST_INVALID','Portable image has no relative path.');const f=path.resolve(root,v.relativePath);if(!f.startsWith(root+path.sep))throw fail('PATH_REJECTED','Portable asset escapes its book.');await store.rejectLinkedFile(f);const real=await fs.realpath(f);if(!real.startsWith(root+path.sep))throw fail('PATH_REJECTED','Portable asset link escapes its book.');const bytes=await fs.readFile(real);if(sha(bytes)!==v.sha256)throw fail('ASSET_CORRUPTED','Portable asset hash differs.');return store.assets.putDataUrl(`data:${v.mimeType};base64,${bytes.toString('base64')}`);}if(Array.isArray(v))return Promise.all(v.map(hydrate));if(v&&typeof v==='object')return Object.fromEntries(await Promise.all(Object.entries(v).map(async([k,c])=>[k,await hydrate(c)])));return v;}
 const project=await hydrate(manifest.project);project.requests={};return project;
}

// Use the real workspace project as authority; a legacy whole-book manifest is
// never imported here. Every selected legacy pair must match its accepted PNG.
export async function reexportAcceptedPages(store,project,{sourceDirectory,downloadsDirectory,dryRun=true}={}){
 const legacy=sourceDirectory?await migrateLegacyExports(store,project,{sourceDirectory,downloadsDirectory,dryRun:true}):{pairs:[]},plan=[];
 for(const page of project.pages.filter(p=>p.snapshot?.accepted&&p.snapshot.generatedImage).sort((a,b)=>a.index-b.index)){
  const dataUrl=await store.assets.hydrate(page.snapshot.generatedImage),hash=sha(Buffer.from(dataUrl.split(',')[1],'base64'));
  const generation=page.snapshot.generationHistory?.find(item=>item.selected===true)
    ??page.snapshot.generationHistory?.find(item=>item.img?.sha256===hash);
  const context=generation?.metadataContext;
  let match;
  for(const candidate of legacy.pairs.filter(p=>p.pageId===page.id).reverse()){
   // A current export record narrows the candidate, but is never proof by itself.
   if(page.export?.imageSha256&&candidate.sha256!==page.export.imageSha256)continue;
   if(context&&generationMetadataHash(await store.assets.dehydrate(candidate.metadata))!==generationMetadataHash(await store.assets.dehydrate(context)))continue;
   if(candidate.sha256===hash){match=candidate;break;}
   if(!context||generation.img?.sha256!==hash||!generation.generatedAt&&!Number.isFinite(Number(generation.id)))continue;
   const bytes=await fs.readFile(candidate.pngPath),wrapped=`data:image/png;base64,${bytes.toString('base64')}`;
   if(sha(bytes)!==candidate.sha256)throw fail('EXPORTED_PAGE_CHANGED','Legacy image changed during verification.');
   const embedded=await extractGeneratedImageMetadata(wrapped);
   if(embedded?.output?.content_sha256!==hash)continue;
   const expected=await buildGeneratedImageMetadata({appVersion:embedded.software?.version,generatedAt:generation.generatedAt||new Date(generation.id).toISOString(),
    provider:context.provider,modelId:generation.modelId||'unknown',workflowMode:'api_image_generation',humanOversightLevel:'prompt_guided',
    scenario:context.scenario,finalPrompt:context.finalPrompt,inputImages:await store.assets.hydrate(context.inputImages),settings:context.settings,
    referenceContext:context.referenceContext,outputImage:dataUrl,fallbackOccurred:generation.fallbackOccurred===true});
   if(generationMetadataHash(expected)!==generationMetadataHash(embedded))continue;
   // Canonical re-embedding verifies the metadata chunk itself. Neutralizing
   // only our metadata proves every other PNG byte (including pixels) is equal.
   if(embedGeneratedImageMetadata(wrapped,embedded)!==wrapped||embedGeneratedImageMetadata(wrapped,{})!==embedGeneratedImageMetadata(dataUrl,{}))continue;
   match=candidate;break;
  }
  if(sourceDirectory&&!match)throw fail('LEGACY_CANONICAL_MISMATCH','No verified legacy PNG/JSON pair matches an accepted canonical project page.');
  plan.push({pageId:page.id,pageIndex:page.index,imageSha256:match?.sha256||hash,canonicalImageSha256:hash,legacyPngPath:match?.pngPath,legacyJsonPath:match?.jsonPath,attemptId:match?.attemptId||`reexport-${hash.slice(0,24)}`,exportedAt:match?.exportedAt,metadata:context||match?.metadata,hasGenerationContext:Boolean(context)});
 }
 if(dryRun)return {dryRun:true,canonicalProjectId:project.id,canonicalRevision:project.revision,pages:plan};
 const results=[];for(const entry of plan){const page=project.pages.find(p=>p.id===entry.pageId);let dataUrl=await store.assets.hydrate(page.snapshot.generatedImage);if(entry.legacyPngPath){const bytes=await fs.readFile(entry.legacyPngPath);if(sha(bytes)!==entry.imageSha256)throw fail('EXPORTED_PAGE_CHANGED','Legacy image changed before copying.');dataUrl=`data:image/png;base64,${bytes.toString('base64')}`;}results.push(await exportCompletedPage(store,project,page,{dataUrl,metadata:{...entry.metadata,...(entry.hasGenerationContext?{}:{scenario:page.snapshot.scenario,finalPrompt:page.snapshot.finalPrompt,settings:page.snapshot.settings}),exportSource:{kind:'canonical_project_snapshot',projectRevision:project.revision}}},{downloadsDirectory,attemptId:entry.attemptId,now:entry.exportedAt||new Date(),deferManifest:true}));}const manifest=await writeProjectManifest(store,project,{downloadsDirectory});return {dryRun:false,canonicalProjectId:project.id,canonicalRevision:project.revision,results,...manifest,originalsPreserved:true};
}
