import test from 'node:test';
import assert from 'node:assert/strict';
import {prepareVisionImageBatch,encodedImageBytes} from '../src/lib/vision-image-input.js';
const url=bytes=>'data:image/png;base64,'+Buffer.alloc(bytes,42).toString('base64');
test('ordinary low-capacity Vision input is the same array and exact bytes; no canvas or source mutation',async()=>{
 const images=Object.freeze([Object.freeze({inlineData:Object.freeze({mimeType:'image/png',data:Buffer.from('original').toString('base64')})})]);
 const result=await prepareVisionImageBatch(images,{maxBytes:100,convert:()=>assert.fail('No conversion below budget')});
 assert.equal(result.images,images);assert.equal(result.transformed,false);assert.equal(result.sentBytes,8);
});
test('oversized recognition keeps image order and original parts, tries full-size white PNG before full-size high-quality JPEG',async()=>{
 const images=[0,1,2].map(i=>Object.freeze({tag:i,inlineData:Object.freeze({mimeType:'image/png',data:url(60).split(',')[1]})}));const before=JSON.stringify(images),calls=[];
 const result=await prepareVisionImageBatch(images,{maxBytes:120,convert:async(source,options)=>{calls.push(options);assert.equal(encodedImageBytes(source),60);return {dataUrl:url(options.mimeType==='image/png'?50:30).replace('image/png',options.mimeType),width:2240,height:3168};}});
 assert.equal(result.stage,'high-quality-jpeg');assert.equal(result.sentBytes,90);assert.equal(calls.length,6);assert.ok(calls.every(x=>x.maxEdge===undefined));
 assert.deepEqual(result.images.map(x=>x.tag),[0,1,2]);assert.ok(result.images.every(x=>x.inlineData.mimeType==='image/jpeg'));assert.equal(JSON.stringify(images),before);assert.ok(result.dimensions.every(x=>x.width===2240&&x.height===3168));
});
test('unrepresentable batches stop before any provider request instead of truncating or deleting an image',async()=>{
 const images=[url(200),url(200)];await assert.rejects(prepareVisionImageBatch(images,{maxBytes:100,convert:async()=>({dataUrl:url(300),width:1600,height:1600})}),{code:'VISION_IMAGE_BUDGET'});assert.equal(images.length,2);
 const controller=new AbortController();controller.abort();await assert.rejects(prepareVisionImageBatch(images,{maxBytes:100,signal:controller.signal,convert:()=>assert.fail('Cancelled preparation must not decode')}),{code:'CANCELLED'});
});
