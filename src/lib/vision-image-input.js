// Conservative transfer budget for the current OpenAI Vision route, where a
// 50 MB aggregate rejection was observed. This is not a universal model limit.
export const OPENAI_VISION_TRANSFER_BUDGET_BYTES=40_000_000;
const cancelled=signal=>{if(signal?.aborted)throw Object.assign(new Error('Image preparation cancelled.'),{name:'AbortError',code:'CANCELLED'});};
export function visionImageDataUrl(part){
 return typeof part==='string'&&part.startsWith('data:image/')?part:part?.inlineData?`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`:null;
}
export function encodedImageBytes(dataUrl){
 if(!dataUrl)return 0;const data=dataUrl.slice(dataUrl.indexOf(',')+1);
 return Math.floor(data.length*3/4)-(data.endsWith('==')?2:data.endsWith('=')?1:0);
}
export async function renderVisionDerivative(dataUrl,{mimeType='image/png',quality=0.96,maxEdge=Infinity,signal}={}){
 cancelled(signal);
 if(typeof Image==='undefined'||typeof document==='undefined')throw Object.assign(new Error('This oversized image batch requires the normal browser image preparation.'),{code:'VISION_IMAGE_PREPARATION_REQUIRED'});
 const image=await new Promise((resolve,reject)=>{
  const element=new Image();
  const abort=()=>{element.src='';reject(Object.assign(new Error('Image preparation cancelled.'),{name:'AbortError',code:'CANCELLED'}));};
  element.onload=()=>{signal?.removeEventListener('abort',abort);resolve(element);};
  element.onerror=()=>{signal?.removeEventListener('abort',abort);reject(Object.assign(new Error('A supplied image could not be decoded.'),{code:'VISION_IMAGE_INVALID'}));};
  signal?.addEventListener('abort',abort,{once:true});element.src=dataUrl;
 });
 cancelled(signal);
 const ratio=Math.min(1,maxEdge/Math.max(image.naturalWidth,image.naturalHeight));
 const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(image.naturalWidth*ratio));canvas.height=Math.max(1,Math.round(image.naturalHeight*ratio));
 const context=canvas.getContext('2d');if(!context)throw new Error('Image preparation canvas is unavailable.');
 context.fillStyle='#fff';context.fillRect(0,0,canvas.width,canvas.height);
 context.imageSmoothingEnabled=true;context.imageSmoothingQuality='high';context.drawImage(image,0,0,canvas.width,canvas.height);
 const result={dataUrl:canvas.toDataURL(mimeType,quality),width:canvas.width,height:canvas.height};
 canvas.width=1;canvas.height=1;cancelled(signal);return result;
}
export async function prepareVisionImageBatch(images,{maxBytes=OPENAI_VISION_TRANSFER_BUDGET_BYTES,convert=renderVisionDerivative,onProgress=()=>{},signal}={}){
 if(!Array.isArray(images)||!images.length)return {images,originalBytes:0,sentBytes:0,transformed:false,stage:'unchanged'};
 const source=images.map(visionImageDataUrl),originalBytes=source.reduce((sum,url)=>sum+encodedImageBytes(url),0);
 if(originalBytes<=maxBytes)return {images,originalBytes,sentBytes:originalBytes,transformed:false,stage:'unchanged'};
 onProgress(`[画像送信準備] 合計${(originalBytes/1e6).toFixed(2)}MB。原本を保持し、送信画像だけ白地・容量を調整します。`);
 let best=[...source],sizes=source.map(encodedImageBytes),dimensions=[];
 const stages=[{name:'white-png',mimeType:'image/png'},{name:'high-quality-jpeg',mimeType:'image/jpeg',quality:0.96},...[2560,2048,1600].map(maxEdge=>({name:`jpeg-${maxEdge}`,mimeType:'image/jpeg',quality:0.96,maxEdge}))];
 for(const stage of stages){
  for(let i=0;i<source.length;i++){
   cancelled(signal);if(!source[i])continue;
   const candidate=await convert(source[i],{...stage,signal});const bytes=encodedImageBytes(candidate.dataUrl);
   if(bytes<sizes[i]){best[i]=candidate.dataUrl;sizes[i]=bytes;dimensions[i]={width:candidate.width,height:candidate.height};}
  }
  const sentBytes=sizes.reduce((sum,n)=>sum+n,0);
  if(sentBytes<=maxBytes){
   const prepared=images.map((part,i)=>{
    if(best[i]===source[i])return part;
    if(typeof part==='string')return best[i];
    const comma=best[i].indexOf(',');return {...part,inlineData:{...part.inlineData,mimeType:best[i].slice(5,best[i].indexOf(';')),data:best[i].slice(comma+1)}};
   });
   onProgress(`[画像送信準備] ${images.length}枚・${(sentBytes/1e6).toFixed(2)}MB (${stage.name})。元の画像・資料ID・並び順は変更していません。`);
   return {images:prepared,originalBytes,sentBytes,transformed:true,stage:stage.name,dimensions};
  }
 }
 throw Object.assign(new Error('送信専用の画像調整後も今回のVision送信容量を超えています。原本は保持しました。素材を分けて認識してください。'),{code:'VISION_IMAGE_BUDGET'});
}
