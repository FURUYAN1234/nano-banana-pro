import {promises as fs,createReadStream} from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {resolveDownloadsDirectory} from './exports.mjs';
const sha=value=>createHash('sha256').update(value).digest('hex');
const safeName=name=>typeof name==='string'&&name!=='.'&&name!=='..'&&path.basename(name)===name&&!name.includes('/')&&!name.includes('\\');
async function inspectFile(store,file,expectedSha256){
 try{
  await store.rejectLinkedFile(file);const stat=await fs.stat(file);
  if(!stat.isFile())return{path:file,status:'invalid_file'};
  const hash=createHash('sha256');for await(const chunk of createReadStream(file))hash.update(chunk);
  const actualSha256=hash.digest('hex');return{path:file,status:expectedSha256?(actualSha256===expectedSha256?'verified':'hash_mismatch'):'read_back',bytes:stat.size,sha256:actualSha256,...(expectedSha256?{expectedSha256}:{})};
 }catch(error){return{path:file,status:error.code==='ENOENT'?'missing':'unconfirmed',errorCode:error.code||'READ_FAILED'};}
}
async function readJson(store,file){await store.rejectLinkedFile(file);if((await fs.stat(file)).size>32*1024*1024)throw Object.assign(new Error('Status JSON exceeds bounded inspection size'),{code:'STATUS_JSON_LIMIT'});return JSON.parse(await fs.readFile(file,'utf8'));}
function materialReferences(value,refs=new Map(),issues=[]){
 if(!value||typeof value!=='object')return {refs,issues};
 if(value.__mangaAsset===true||value.assetId&&value.relativePath){
  const relative=value.relativePath;
  if(typeof relative==='string'&&relative.startsWith('資料/')){
   const id=value.id||value.assetId,hash=value.sha256,name=relative.slice(3);
   if(!safeName(name)||!/^[a-f0-9]{64}$/.test(id||'')||!/^[a-f0-9]{64}$/.test(hash||'')){issues.push('INVALID_MATERIAL_REFERENCE');return {refs,issues};}
   const prior=refs.get(relative);if(prior&&(prior.id!==id||prior.sha256!==hash))issues.push('CONFLICTING_MATERIAL_REFERENCE');
   refs.set(relative,{id,sha256:hash,name});
  }
  return {refs,issues};
 }
 for(const child of Object.values(value))materialReferences(child,refs,issues);
 return {refs,issues};
}
export async function readMcpSaveStatus(store,project,{jobs,downloadsDirectory}={}){
 const result={observedAt:new Date().toISOString(),enabled:Boolean(jobs),method:'mcp_server_filesystem',automatic:Boolean(jobs),
  scope:'MCP completed pages and shared materials; independent of ordinary browser downloads',
  browserDownloads:{required:false,permission:'unknown'},nativeFolderPickerRequired:false,
  browserAutomaticDownloads:{state:'unknown',reason:'Browser download permissions are not exposed to this server; they do not gate MCP filesystem exports.'},requiresFolderPicker:false,
  verification:{status:project.pages.some(p=>p.snapshot?.generatedImage)||Object.keys(project.assetBindings||{}).length?'not_saved':'not_generated',note:'A configured destination alone does not prove a saved file.'}};
 const projectJobs=[...(jobs?.jobs?.values()||[])].filter(job=>job.projectId===project.id).sort((a,b)=>String(a.updatedAt).localeCompare(String(b.updatedAt)));
 const latestJob=projectJobs.at(-1),exportFailure=projectJobs.filter(job=>/EXPORT|DOWNLOAD|SAVE|CHECKPOINT/.test(job.error?.code||'')).at(-1);
 if(latestJob)result.latestJob={jobId:latestJob.id,state:latestJob.state,observedAt:latestJob.updatedAt,...(latestJob.error?{errorCode:latestJob.error.code,saveOutcome:latestJob===exportFailure?'failed':'unconfirmed'}:{})};
 if(exportFailure)result.lastRecordedSaveFailure={jobId:exportFailure.id,observedAt:exportFailure.updatedAt,code:exportFailure.error.code};
 let downloads;
 try{const requested=downloadsDirectory||await resolveDownloadsDirectory();await store.rejectLinkedFile(requested);downloads=await fs.realpath(requested);result.destination={path:downloads,state:'resolved',writable:'unconfirmed_read_only_no_probe'};}
 catch(error){result.destination={state:'unavailable',errorCode:error.code||'DESTINATION_UNAVAILABLE'};result.verification.status='unconfirmed';return result;}
 const journalFile=path.join(store.root,'exports',project.id,sha(downloads).slice(0,24)+'.json');
 let journal;
 try{journal=await readJson(store,journalFile);}catch(error){if(error.code!=='ENOENT')result.verification={status:'unconfirmed',errorCode:error.code||'JOURNAL_INVALID'};else if(exportFailure)result.verification.status='failed';return result;}
 if(journal.projectId!==project.id||!safeName(journal.bookDirectory)){result.verification={status:'unconfirmed',errorCode:'EXPORT_STATE_INVALID'};return result;}
 const relative=journal.bookRelativeDirectory||journal.bookDirectory;
 const book=path.resolve(downloads,relative);
 if(!book.startsWith(downloads+path.sep)){result.verification={status:'unconfirmed',errorCode:'EXPORT_STATE_INVALID'};return result;}
 let checked=downloads;for(const part of path.relative(downloads,book).split(path.sep)){checked=path.join(checked,part);try{await store.rejectLinkedFile(checked);}catch{result.verification={status:'unconfirmed',errorCode:'PATH_REJECTED'};return result;}}
 result.destination.bookDirectory=book;
 result.pageVersions=Object.values(journal.pages||{}).filter(entry=>entry.status==='committed'&&!entry.awaitingAdoption&&safeName(entry.pngName)&&safeName(entry.jsonName))
  .map(entry=>({pageId:entry.pageId,attemptId:entry.attemptId,archived:entry.archived===true,exportedAt:entry.exportedAt,
    pngRelativePath:(entry.archived?'履歴/':'')+entry.pngName,jsonRelativePath:(entry.archived?'履歴/':'')+entry.jsonName}));
 const entries=Object.values(journal.pages||{}).filter(entry=>!entry.archived&&!entry.awaitingAdoption).sort((a,b)=>String(a.exportedAt).localeCompare(String(b.exportedAt)));
 const latest=entries.at(-1);
 let failed=false,uncertain=false,latestSidecar;
 if(latest){
  if(!safeName(latest.pngName)||!safeName(latest.jsonName)){result.verification={status:'unconfirmed',errorCode:'EXPORT_STATE_INVALID'};return result;}
  const png=await inspectFile(store,path.join(book,latest.pngName),latest.image?.sha256),json=await inspectFile(store,path.join(book,latest.jsonName));
  let correspondence='unconfirmed';
  if(json.status==='read_back')try{const sidecar=await readJson(store,json.path);latestSidecar=sidecar;correspondence=sidecar.projectId===project.id&&sidecar.pageId===latest.pageId&&sidecar.attemptId===latest.attemptId&&sidecar.image?.sha256===latest.image?.sha256&&sidecar.image?.relativePath===latest.pngName?'verified':'mismatch';}catch{correspondence='invalid_json';}
  result.lastPair={pageId:latest.pageId,attemptId:latest.attemptId,exportedAt:latest.exportedAt,recordedStatus:latest.status,png,json,correspondence,jsonIntegrity:'identity_and_image_hash_only; no historical whole-JSON hash is recorded'};
  failed=['missing','hash_mismatch','invalid_file'].includes(png.status)||['missing','invalid_file'].includes(json.status)||['mismatch','invalid_json'].includes(correspondence);
  uncertain=latest.status!=='committed'||png.status!=='verified'||json.status!=='read_back'||correspondence!=='verified';
 }
 const manifest=await inspectFile(store,path.join(book,'作品全体.json'));let portable;
 if(manifest.status==='read_back')try{portable=await readJson(store,manifest.path);manifest.projectIdentity=portable.project?.id===project.id?'verified':'mismatch';}catch{manifest.projectIdentity='invalid_json';}
 result.manifest=manifest;
 failed ||= manifest.status==='missing'||['mismatch','invalid_json'].includes(manifest.projectIdentity);
 uncertain ||= manifest.status!=='read_back'||manifest.projectIdentity!=='verified';
 const materials=[],historical=[],references=materialReferences(portable),used=new Set();
 if(manifest.projectIdentity==='verified'){
  materialReferences(latestSidecar,references.refs,references.issues);
  const bindingMatches=(binding,delivered)=>binding.asset?.id===delivered?.asset?.id&&binding.asset?.sha256===delivered?.asset?.sha256;
  for(const [slot,binding]of Object.entries(project.assetBindings||{}))if(!bindingMatches(binding,portable.project.assetBindings?.[slot]))references.issues.push('CANONICAL_MATERIAL_NOT_REFERENCED');
  for(const page of project.pages)for(const [slot,binding]of Object.entries(page.assetOverrides||{}))if(binding&&!bindingMatches(binding,portable.project.pages?.find(item=>item.id===page.id)?.assetOverrides?.[slot]))references.issues.push('CANONICAL_MATERIAL_NOT_REFERENCED');
  for(const ref of references.refs.values()){
   used.add(ref.id);const index=journal.assets?.[ref.id];
   if(!index||index.name!==ref.name||index.sha256!==ref.sha256)references.issues.push('MATERIAL_INDEX_MISMATCH');
   materials.push(await inspectFile(store,path.join(book,'資料',ref.name),ref.sha256));
  }
 }else{
  // Without a readable matching manifest the active reference set is unknown;
  // keep the conservative old index checks and do not report success.
  for(const [id,asset]of Object.entries(journal.assets||{})){used.add(id);if(!safeName(asset.name)){references.issues.push('INVALID_MATERIAL_INDEX');continue;}materials.push(await inspectFile(store,path.join(book,'資料',asset.name),asset.sha256));}
 }
 for(const [id,asset]of Object.entries(journal.assets||{}))if(!used.has(id))historical.push({assetId:id,requiredForCurrentDelivery:false,...(safeName(asset.name)?await inspectFile(store,path.join(book,'資料',asset.name),asset.sha256):{status:'invalid_index'})});
 result.materials={count:materials.length,files:materials,referenceScope:manifest.projectIdentity==='verified'?'portable_manifest_and_latest_sidecar':'journal_fallback_manifest_unavailable',indexedCount:Object.keys(journal.assets||{}).length,historicalIndex:{count:historical.length,files:historical,note:'Unreferenced prior index entries are retained as history and do not establish a current missing deliverable.'}};
 if(references.issues.length)result.materials.referenceIssues=[...new Set(references.issues)];
 failed ||= references.issues.length>0||materials.some(file=>['missing','hash_mismatch','invalid_file'].includes(file.status));
 uncertain ||= materials.some(file=>file.status!=='verified');
 result.verification={status:failed?'failed':uncertain?'unconfirmed':latest||materials.length?'verified':'not_saved',checked:'latest recorded PNG/JSON pair, portable manifest/latest-sidecar referenced material hashes, canonical binding coverage and manifest identity',historicalIndexIssues:historical.filter(file=>file.status!=='verified').length,historicalPairs:Object.keys(journal.pages||{}).length,allHistoricalPairsChecked:false};
 if(exportFailure&&(!latest||exportFailure.updatedAt>=latest.exportedAt))result.verification.status='failed';
 if(latestJob?.error&&(!latest||latestJob.updatedAt>latest.exportedAt)&&!exportFailure&&result.verification.status==='verified')result.verification.status='unconfirmed';
 return result;
}
