import {MangaControlError} from '../../src/lib/mcp/contract.js';
export const ASSET_REFS_FEATURE='asset-refs-v1';
export class AssetTransfer {
 constructor(jobId,attemptId){this.jobId=jobId;this.attemptId=attemptId;this.assets={};}
 encode(value){
  if(value?.__mangaAsset===true){
   const {id,sha256,mimeType,bytes,width,height}=value;
   if(!/^[a-f0-9]{64}$/.test(id)||id!==sha256||!['image/png','image/jpeg','image/webp'].includes(mimeType)||!Number.isSafeInteger(bytes)||bytes<=0||bytes>=50_000_000)throw new MangaControlError('INVALID_ASSET_REFERENCE','Invalid image transfer reference.');
   const metadata={id,sha256,mimeType,bytes,width,height};
   if(this.assets[id]&&JSON.stringify(this.assets[id])!==JSON.stringify(metadata))throw new MangaControlError('INVALID_ASSET_REFERENCE','Conflicting immutable image metadata.');
   this.assets[id]=metadata;return {__mangaWireImage:id};
  }
  if(value?.__mangaCandidate===true)return {__mangaWireCandidate:true,image:this.encode(value.image),metadata:this.encode(value.metadata)};
  if(Array.isArray(value))return value.map(item=>this.encode(item));
  if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([key,item])=>[key,this.encode(item)]));
  return value;
 }
 descriptor(){return {feature:ASSET_REFS_FEATURE,jobId:this.jobId,attemptId:this.attemptId,assets:this.assets};}
}
