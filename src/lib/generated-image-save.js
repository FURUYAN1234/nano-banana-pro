import { selectGenerationMetadataContext } from './generation-history.js';
import { buildGeneratedImageMetadata, embedGeneratedImageMetadata, serializeGeneratedImageMetadata, getImageContentHash } from './generated-image-metadata.js';
import { extractScenarioTitle } from './scenario-title.js';

export const downloadGeneratedImageJson = (text,filename,documentObject=document) => {
  const url=URL.createObjectURL(new Blob([text],{type:'application/json;charset=utf-8'}));
  const anchor=documentObject.createElement('a');anchor.href=url;anchor.download=filename;
  try{documentObject.body.appendChild(anchor);anchor.click();}
  finally{if(anchor.parentNode)anchor.parentNode.removeChild(anchor);setTimeout(()=>URL.revokeObjectURL(url),60_000);}
};
const requestDownload=async(download,...args)=>{if(await download(...args)===false)throw new Error('ブラウザーがダウンロード要求を受け付けませんでした。複数ファイルの許可を確認してください。');};

export const convertImageDataUrlToPng = (dataUrl) => {
  if (/^data:image\/png;base64,/i.test(dataUrl || '')) return Promise.resolve(dataUrl);
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext('2d');
      if (!context) return reject(new Error('PNG保存用の画像処理を開始できませんでした。'));
      context.drawImage(image, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    image.onerror = () => reject(new Error('PNG保存用の画像を読み取れませんでした。'));
    image.src = dataUrl;
  });
};

export const prepareGeneratedImageSave = async (item, appVersion) => {
  if (!item?.img) throw new Error('保存する生成画像がありません。');
  const original=selectGenerationMetadataContext(item);
  // Capture editable records before PNG conversion/hashing yields. Immutable
  // image strings can be shared without cloning their large encoded bytes.
  const context={...original,settings:structuredClone(original.settings??{}),referenceContext:structuredClone(original.referenceContext??null),
    inputImages:(original.inputImages??[]).map(({role,dataUrl,sourcePageId,assetId})=>({role,dataUrl,sourcePageId,assetId}))};
  const generation={img:item.img,id:item.id,generatedAt:item.generatedAt,modelId:item.modelId,fallbackOccurred:item.fallbackOccurred===true,saveWorkTitle:item.saveWorkTitle};
  const png = await convertImageDataUrlToPng(generation.img);
  const metadata = await buildGeneratedImageMetadata({
    appVersion, generatedAt: generation.generatedAt || new Date(generation.id || Date.now()).toISOString(),
    provider: context.provider, modelId: generation.modelId || 'unknown',
    workflowMode: 'api_image_generation', humanOversightLevel: 'prompt_guided',
    scenario: context.scenario, finalPrompt: context.finalPrompt,
    fallbackOccurred: generation.fallbackOccurred, inputImages: context.inputImages,
    outputImage: png, settings: context.settings, referenceContext: context.referenceContext,
  });
  const title = safeSaveName(context.workTitle||generation.saveWorkTitle||extractScenarioTitle(context.scenario),48);
  const now=new Date(),pad=n=>String(n).padStart(2,'0');
  const timestamp=`${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  const suffix=crypto.randomUUID().slice(0,8),folderName=`${title}_${timestamp}_${suffix}`,filename=`${title}_001ページ_${timestamp}_${suffix}.png`;
  const dataUrl=embedGeneratedImageMetadata(png,metadata);
  return {dataUrl,filename,folderName,title,savedPngSha256:await getImageContentHash(dataUrl),
    jsonText:serializeGeneratedImageMetadata(metadata),jsonFilename:filename.replace(/\.png$/i,'.json')};
};

const safeSaveName=(value,max=70)=>Array.from(String(value||'無題').normalize('NFC').replace(/[\\/:*?"<>|\x00-\x1f]/g,'_').trim().replace(/[. ]+$/g,'')).slice(0,max).join('')||'無題';
let configuredDirectory=import.meta.hot?.data?.saveDirectory||null;
if(import.meta.hot)import.meta.hot.dispose(data=>{data.saveDirectory=configuredDirectory;});
export const getGeneratedImageSaveDestination=()=>({mode:configuredDirectory?'folder':'zip',name:configuredDirectory?.name||'',supported:typeof window!=='undefined'&&typeof window.showDirectoryPicker==='function'});
export const selectGeneratedImageDirectory=async(picker=typeof window!=='undefined'&&window.showDirectoryPicker?window.showDirectoryPicker.bind(window):null)=>{
 if(!picker)return {mode:'zip'};
 try{const handle=await picker({id:'super-furu-manga-output',mode:'readwrite'});configuredDirectory=handle;return {mode:'folder',name:handle.name};}catch(error){if(error?.name==='AbortError')return {mode:'cancelled'};throw error;}
};
const bytesOf=dataUrl=>Uint8Array.from(atob(dataUrl.split(',')[1]),c=>c.charCodeAt(0));
const equalBytes=(a,b)=>a.length===b.length&&a.every((value,index)=>value===b[index]);
const pairEntries=saved=>{
 if(!saved?.jsonText||!saved.jsonFilename||!saved.filename)throw new Error('PNGとJSONの保存用データが揃っていません。');
 for(const name of [saved.filename,saved.jsonFilename])if(/[\\/:*?"<>|\x00-\x1f]/.test(name)||name.endsWith('.'))throw new Error('保存ファイル名が不正です。');
 if(saved.filename.replace(/\.png$/i,'')!==saved.jsonFilename.replace(/\.json$/i,''))throw new Error('PNGとJSONのファイル名が一致しません。');
 return [[saved.filename,bytesOf(saved.dataUrl)],[saved.jsonFilename,new TextEncoder().encode(saved.jsonText)]];
};
// ZIP STORE: exactly two UTF-8 named files, no dependencies or re-encoding.
export const buildGeneratedImageArchive=saved=>{
 const entries=pairEntries(saved),folder=safeSaveName(saved.folderName||saved.filename.replace(/\.png$/i,''),140),chunks=[],central=[];let offset=0;
 const crc=bytes=>{let c=0xffffffff;for(const byte of bytes){c^=byte;for(let bit=0;bit<8;bit++)c=(c>>>1)^((c&1)?0xedb88320:0);}return(c^0xffffffff)>>>0;};
 for(const [file,bytes] of entries){const name=new TextEncoder().encode(`${folder}/${file}`),header=new Uint8Array(30+name.length),view=new DataView(header.buffer),sum=crc(bytes);view.setUint32(0,0x04034b50,true);view.setUint16(4,20,true);view.setUint16(6,0x800,true);view.setUint32(14,sum,true);view.setUint32(18,bytes.length,true);view.setUint32(22,bytes.length,true);view.setUint16(26,name.length,true);header.set(name,30);chunks.push(header,bytes);
  const record=new Uint8Array(46+name.length),r=new DataView(record.buffer);r.setUint32(0,0x02014b50,true);r.setUint16(4,20,true);r.setUint16(6,20,true);r.setUint16(8,0x800,true);r.setUint32(16,sum,true);r.setUint32(20,bytes.length,true);r.setUint32(24,bytes.length,true);r.setUint16(28,name.length,true);r.setUint32(42,offset,true);record.set(name,46);central.push(record);offset+=header.length+bytes.length;
 }
 const end=new Uint8Array(22),v=new DataView(end.buffer),size=central.reduce((n,c)=>n+c.length,0);v.setUint32(0,0x06054b50,true);v.setUint16(8,entries.length,true);v.setUint16(10,entries.length,true);v.setUint32(12,size,true);v.setUint32(16,offset,true);return {blob:new Blob([...chunks,...central,end],{type:'application/zip'}),filename:folder+'.zip'};
};
export const downloadGeneratedImageArchive=(blob,filename,documentObject=document)=>{
 const url=URL.createObjectURL(blob),anchor=documentObject.createElement('a');anchor.href=url;anchor.download=filename;
 try{documentObject.body.appendChild(anchor);anchor.click();}finally{anchor.remove();setTimeout(()=>URL.revokeObjectURL(url),60_000);}
};
const locations=new WeakMap();
const directoryQueues=new WeakMap();
const failedSnapshots=new Map();
const retainFailed=(source,saved)=>{if(source===undefined)return;failedSnapshots.set(source,saved);if(failedSnapshots.size>20)failedSnapshots.delete(failedSnapshots.keys().next().value);};
const granted=async handle=>{try{return handle&&await handle.queryPermission({mode:'readwrite'})==='granted';}catch{return false;}};
const notFound=error=>error?.name==='NotFoundError';
const savePair=async(saved,{directoryHandle=configuredDirectory,download=downloadGeneratedImageArchive,isCurrent=()=>true}={})=>{
 if(!isCurrent())return 'stale';const entries=pairEntries(saved);
 if(!await granted(directoryHandle)){const archive=buildGeneratedImageArchive(saved);if(!isCurrent())return 'stale';await requestDownload(download,archive.blob,archive.filename);return 'requested';}
 let location=locations.get(saved);
 const sameParent=location&&(location.parent===directoryHandle||await location.parent.isSameEntry?.(directoryHandle));
 if(!sameParent){const base=safeSaveName(saved.folderName||saved.filename.replace(/\.png$/i,''),140);for(let i=1;;i++){const name=base+(i===1?'':`_${String(i).padStart(2,'0')}`);try{await directoryHandle.getDirectoryHandle(name);continue;}catch(error){if(!notFound(error))throw error;}if(!isCurrent())return 'stale';const handle=await directoryHandle.getDirectoryHandle(name,{create:true});location={parent:directoryHandle,handle,owned:new Set(),written:new Set()};locations.set(saved,location);break;}}
 if(!isCurrent())return 'stale';
 for(const [name,bytes] of entries){let file;
  try{file=await location.handle.getFileHandle(name);if(!location.owned.has(name))throw new Error('同名ファイルが存在します。既存のファイルは上書きしません。');}catch(error){if(!notFound(error))throw error;file=await location.handle.getFileHandle(name,{create:true});location.owned.add(name);}
  if(location.written.has(name)){if(!equalBytes(new Uint8Array(await(await file.getFile()).arrayBuffer()),bytes))throw new Error('保存済みファイルが変更されています。上書きせず停止しました。');continue;}
  const stream=await file.createWritable();try{await stream.write(new Blob([bytes]));await stream.close();}catch(error){await stream.abort().catch(()=>{});throw error;}
  if(!equalBytes(new Uint8Array(await(await file.getFile()).arrayBuffer()),bytes))throw new Error('保存したファイルの内容を確認できませんでした。');location.written.add(name);
 }
 return 'saved';
};
export const saveGeneratedImagePair=async(saved,options={})=>{
 const handle=options.directoryHandle===undefined?configuredDirectory:options.directoryHandle;
 if(!handle)return savePair(saved,options);
 const work=(directoryQueues.get(handle)||Promise.resolve()).catch(()=>{}).then(()=>savePair(saved,{...options,directoryHandle:handle}));directoryQueues.set(handle,work);try{return await work;}finally{if(directoryQueues.get(handle)===work)directoryQueues.delete(handle);}
};
// Only explicit final selection calls this; showing/history selection never saves.
export const createFinalImageSaver=({prepare=prepareGeneratedImageSave,write=saveGeneratedImagePair,download=downloadGeneratedImageArchive}={})=>{
 const pending=new Map(),retained=new Map(),completed=new Set(),identities=new Map();
 return async(item,version,isCurrent)=>{
  if(!isCurrent())return 'stale';let key=identities.get(item.id);if(!key||key.img!==item.img){key={id:item.id,img:item.img};identities.set(item.id,key);}
  if(completed.has(key))return 'duplicate';if(pending.has(key))return pending.get(key);
  const operation=(async()=>{let saved=retained.get(key);if(!saved){saved=await prepare(item,version);if(!isCurrent())return 'stale';retained.set(key,saved);if(retained.size>20)retained.delete(retained.keys().next().value);}let status;try{status=await write(saved,{download,isCurrent});}catch(error){retainFailed(item,saved);throw error;}if(status==='stale'||!isCurrent())return 'stale';completed.add(key);retained.delete(key);failedSnapshots.delete(item);if(completed.size>20)completed.delete(completed.values().next().value);return status;})();
  pending.set(key,operation);try{return await operation;}finally{pending.delete(key);if(identities.size>30)for(const [id,value] of identities){if(!pending.has(value)&&!retained.has(value))identities.delete(id);if(identities.size<=30)break;}}
 };
};
export const saveImageToChosenLocation=async({prepare,source,picker=typeof window!=='undefined'&&window.showDirectoryPicker?window.showDirectoryPicker.bind(window):null,download=downloadGeneratedImageArchive})=>{
 let saved;try{const handle=picker?await picker({id:'super-furu-manga-output',mode:'readwrite'}):null;if(handle)configuredDirectory=handle;saved=failedSnapshots.get(source)||await prepare();const result=await saveGeneratedImagePair(saved,{directoryHandle:handle,download});if(result==='saved'||result==='requested')failedSnapshots.delete(source);return result;}catch(error){if(saved)retainFailed(source,saved);if(error?.name==='AbortError')return 'cancelled';throw error;}
};
