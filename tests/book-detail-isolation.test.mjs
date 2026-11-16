import test from 'node:test';
import assert from 'node:assert/strict';
import {buildBookDetail} from '../src/lib/mcp/book-detail.js';

test('book details isolate current-page staging from cover and prior-page dialogue',async()=>{
 const pages=[{id:'cover',kind:'illustration',panelCount:1,presentation:{logoText:'COVER ONLY'}},...[1,2,3].map(n=>({id:`comic${n}`,kind:'comic',panelCount:n,presentation:{}}))];
 const outline={synopsis:'A parcel travels through a storm.',pages:pages.map((p,i)=>({pageId:p.id,beat:i?`CURRENT BEAT ${i}`:'COVER SILENCE',direction:i?`CURRENT DIRECTION ${i}`:'1コマ目はセリフなし、表紙の一枚絵、ロゴCOVER ONLY'})),assetSpecs:[]};
 const calls=[];
 await buildBookDetail({pages,settings:{},castBible:'## 1. Nagi\nAppearance: adult courier with a blue jacket.',plan:{outline}},async input=>{calls.push(input);return {scenario:`[1コマ目]\nNagi:「PRIOR SPEECH ${calls.length}」\nBalloonLayout: prior-only`};});
 assert.equal(calls.length,3);
 for(const [i,input] of calls.entries()){
  assert.match(input.manualTopic,new RegExp(`CURRENT BEAT ${i+1}`));
  assert.doesNotMatch(input.manualTopic,/COVER|PRIOR SPEECH|BalloonLayout/);
  for(let other=1;other<=3;other++)if(other!==i+1)assert.ok(!input.manualTopic.includes(`CURRENT BEAT ${other}`));
  assert.doesNotMatch(input.referenceAssetContext,/PRIOR SPEECH|BalloonLayout|COVER ONLY|1コマ目はセリフなし/);
  assert.match(input.referenceAssetContext,/CONTINUITY DATA ONLY/);
 }
});
