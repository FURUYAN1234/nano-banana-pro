import test from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'vite';
import {runPageImageQuality} from '../src/lib/image-quality-failsafe.js';
const server=await createServer({configFile:false,envFile:false,appType:'custom',logLevel:'silent',server:{middlewareMode:true,watch:null}});
try {
 const m=await server.ssrLoadModule('/src/lib/experimental-manga.js');
 const plan={count:5,layout:'mixed_rows',panels:Array.from({length:5},(_,i)=>({sourcePanel:i+1,kind:'anchor',camera:'high angle',action:'actors move a box',dialogueIds:[],breakout:null}))};
 const tools={detect:async()=>[],inspect:async()=>({width:2240,height:3168}),crop:async()=>({dataUrl:'footer-fixture'})};
 for(const sample of [
  {name:'single photograph',kind:'non_comic',category:'single_photograph',evidence:'A single lens photograph shows continuous natural skin gradients and a real bedroom; no sequential story.',blocked:true},
  {name:'unrelated diagram',kind:'non_comic',category:'unrelated_image',evidence:'A single unrelated product chart contains bars and product labels, replacing the requested actors and story.',blocked:true},
  {name:'borderless comic with overlap',kind:'comic',category:'sequential_art',evidence:'An ink figure crosses borderless sequential scenes with deliberate overlapping actions.',blocked:false},
  {name:'silent abstract comic',kind:'comic',category:'sequential_art',evidence:'Abstract ink shapes convey the silent sequence and reaction, with deliberately missing gutters.',blocked:false},
  {name:'ambiguous boundaries only',kind:'non_comic',category:'uncertain',evidence:'Panel boundaries cannot be traced with confidence.',blocked:false},
  {name:'unsupported photographic label',kind:'non_comic',category:'single_photograph',evidence:'',blocked:false},
 ]) test(`whole-page content: ${sample.name}`,async()=>{
  let requests=0;const raw={complete:false,observedFrames:[],observedCount:null,evidence:[],pageEvidence:'Observed title unreadable',pageContent:{kind:sample.kind,category:sample.category,evidence:sample.evidence}};
  const result=await m.reviewExperimentalImage({image:{mimeType:'image/png',base64Img:'test-only'},plan,prompt:'approved five scene comic'},async()=>{requests++;return {text:JSON.stringify(raw),model:'gpt-test'};},tools);
  assert.equal(requests,1);assert.equal(result.requests,1);
  assert.equal(result.review.nonComicOutput===true,sample.blocked);
  assert.equal(result.review.status,sample.blocked?'warning':'unverified');
  assert.equal(result.review.observedCount,null,'content judgment never fabricates a frame count');
  assert.deepEqual(result.review.unboundObservations,raw,'early geometry return retains actual observations without treating them as bound panel evidence');
  const again=m.validateExperimentalReview(result.review,plan);assert.equal(again.nonComicOutput===true,sample.blocked);
  if(sample.blocked){assert.equal(result.review.story,'fail');assert.ok(m.experimentalRepairIssues(result.review,plan).some(i=>i.type==='story_integrity'));}
 });
 test('confirmed non-comic output never becomes an edit source or an auto continuation',async()=>{
  let edits=0;const image={base64Img:'unrelated-image'};const result=await runPageImageQuality({kind:'experimental-manga',count:5},{mode:'experimental-manga',originalCandidate:image,originalPrompt:'approved comic',allowRepair:true,
   reviewCandidate:async()=>({pass:false,nonComicOutput:true,issues:[{type:'story_integrity',panel:null,reason:'single unrelated photograph'}]}),generateRepairCandidate:async()=>{edits++;throw new Error('must not edit unrelated photograph');}});
  assert.equal(edits,0);assert.equal(result.stopReason,'non_comic_output');assert.equal(result.canContinue,false);assert.equal(result.candidate,image);assert.equal(result.finalReview.pass,false);
 });
}finally{await server.close();}
