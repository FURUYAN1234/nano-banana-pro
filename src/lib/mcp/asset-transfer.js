import {MangaControlError} from './contract.js';
export const ASSET_REFS_FEATURE='asset-refs-v1';
const fail=(code,message)=>{throw new MangaControlError(code,message);};
const check=signal=>{if(signal?.aborted)fail('CANCELLED','The page image transfer was stopped.');};
async function readImage(response,asset,signal){
 if(!response.ok)fail('ASSET_FETCH_FAILED',`The local image transfer failed (${response.status}).`);
 const mime=response.headers.get('content-type')?.split(';')[0];
 if(mime!==asset.mimeType)fail('ASSET_TYPE_MISMATCH','The local image type differs from its immutable reference.');
 const length=response.headers.get('content-length');
 if(length!==null&&Number(length)!==asset.bytes)fail('ASSET_SIZE_MISMATCH','The local image size differs from its immutable reference.');
 let bytes;
 if(response.body?.getReader){
  const reader=response.body.getReader(),chunks=[];let size=0;
  try{while(true){check(signal);const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>asset.bytes)fail('ASSET_SIZE_MISMATCH','The local image exceeds its declared size.');chunks.push(value);}
  if(size!==asset.bytes)fail('ASSET_SIZE_MISMATCH','The local image transfer was incomplete.');bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}}
  finally{await reader.cancel().catch(()=>{});reader.releaseLock();}
 }else bytes=new Uint8Array(await response.arrayBuffer());
 check(signal);if(bytes.length!==asset.bytes)fail('ASSET_SIZE_MISMATCH','The local image transfer was incomplete.');
 const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),byte=>byte.toString(16).padStart(2,'0')).join('');
 check(signal);if(digest!==asset.sha256)fail('ASSET_HASH_MISMATCH','The local image does not match its immutable SHA-256.');
 const parts=[];for(let offset=0;offset<bytes.length;offset+=32768)parts.push(String.fromCharCode(...bytes.subarray(offset,offset+32768)));
 return `data:${asset.mimeType};base64,${btoa(parts.join(''))}`;
}

// Cache lifetime is one page transfer. Metadata references are deliberately
// untouched; only explicit image placeholders become workflow data URLs.
export async function hydrateMcpAssetTransfer(value,{origin,token,fetcher=fetch,signal,concurrency=2}={}){
 const transfer=value?.assetTransfer;if(!transfer)return value;
 const parsed=new URL(origin);
 if(parsed.protocol!=='http:'||parsed.hostname!=='127.0.0.1'||parsed.origin!==origin)fail('LOOPBACK_REQUIRED','Image transfers require the paired local origin.');
 if(transfer.feature!==ASSET_REFS_FEATURE||!transfer.assets||typeof transfer.assets!=='object'||Array.isArray(transfer.assets)||![transfer.jobId,transfer.attemptId].every(id=>typeof id==='string'&&/^[A-Za-z0-9_-]{1,128}$/.test(id)))fail('ASSET_TRANSFER_INVALID','Invalid image transfer descriptor.');
 const ids=new Set();
 function collect(item){
  if(item&&typeof item==='object'&&Object.hasOwn(item,'__mangaWireImage')){
   const id=item.__mangaWireImage,asset=transfer.assets[id];
   if(typeof id!=='string'||!/^[a-f0-9]{64}$/.test(id)||!Object.hasOwn(transfer.assets,id)||!asset||asset.id!==id||asset.sha256!==id||!['image/png','image/jpeg','image/webp'].includes(asset.mimeType)||!Number.isSafeInteger(asset.bytes)||asset.bytes<=0||asset.bytes>=50_000_000)fail('ASSET_TRANSFER_INVALID','Invalid image placeholder or immutable metadata.');
   ids.add(id);return;
  }
  if(item&&typeof item==='object')for(const[key,child]of Object.entries(item))if(key!=='assetTransfer')collect(child);
 }
 collect(value);const pending=[...ids],images=new Map();let next=0;
 const parentSignal=signal,controller=new AbortController(),abort=()=>controller.abort();
 if(parentSignal?.aborted)controller.abort();else parentSignal?.addEventListener('abort',abort,{once:true});
 signal=controller.signal;
 async function worker(){while(next<pending.length){check(signal);const id=pending[next++],asset=transfer.assets[id];const url=new URL(`/mcp-bridge/asset/${id}`,origin);url.searchParams.set('jobId',transfer.jobId);url.searchParams.set('attemptId',transfer.attemptId);
  const response=await fetcher(url.href,{signal,credentials:'omit',cache:'no-store',headers:{Authorization:`Bearer ${token}`}});images.set(id,await readImage(response,asset,signal));}}
 const tasks=Array.from({length:Math.min(Math.max(1,Math.min(2,concurrency)),pending.length)},worker);
 try{await Promise.all(tasks);}
 catch(error){controller.abort();await Promise.allSettled(tasks);if(parentSignal?.aborted)fail('CANCELLED','The page image transfer was stopped.');throw error;}
 finally{parentSignal?.removeEventListener('abort',abort);}
 check(signal);
 function restore(item){
  if(item&&typeof item==='object'&&Object.hasOwn(item,'__mangaWireImage'))return images.get(item.__mangaWireImage);
  if(item?.__mangaWireCandidate===true){const image=restore(item.image);if(typeof image!=='string')fail('ASSET_TRANSFER_INVALID','A candidate requires an image placeholder.');return {...restore(item.metadata),base64Img:image.slice(image.indexOf(',')+1),mimeType:transfer.assets[item.image.__mangaWireImage].mimeType};}
  if(Array.isArray(item))return item.map(restore);
  if(item&&typeof item==='object')return Object.fromEntries(Object.entries(item).filter(([key])=>key!=='assetTransfer').map(([key,child])=>[key,restore(child)]));
  return item;
 }
 return restore(value);
}
