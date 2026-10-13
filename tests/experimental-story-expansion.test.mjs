import assert from 'node:assert/strict';
import test from 'node:test';
import {createServer} from 'vite';
const server=await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
try {
 const m=await server.ssrLoadModule('/src/lib/experimental-manga.js');
 const qa=await server.ssrLoadModule('/src/lib/image-quality-qa.js');
 const input={scenario:'## タイトル: つながる動き\n'+[1,2,3,4,5,6].map(n=>`[${n}コマ目]\n[Camera: ${n%2?'右前から強く俯瞰':'床すれすれから強く見上げる広角'}]\n[EMOTION: ${n===2?'GEKIGA':'NORMAL'}]\n状況: ユウとナギが箱を運ぶ。動作${n}。\nユウ「${n}番目は、そのまま！」`).join('\n'),castList:'## ユウ\n[WEIGHTS]: (black hair:1.4)\n## ナギ\n[WEIGHTS]: (blonde hair:1.4)',colorMode:'color'};
 const source=m.readExperimentalSource(input);
 const anchor=n=>({sourcePanel:n,kind:'anchor',camera:source.panels[n-1].camera,action:'ユウとナギが箱を運ぶ。元の動作'+n+'を保持。',dialogueIds:source.panels[n-1].dialogueIds,visualEffects:[],breakout:null});
 const plan={count:6,layout:'two_columns',reason:'受け渡しと受け止めを保つ',pageIntent:'二人の動きの連携を見せる',panels:source.panels.map(p=>anchor(p.id))};
 test('native page preserves every original panel and dialogue in one shared physical reading manifest',()=>{
  const valid=m.validateExperimentalPlan(plan,source);
  assert.deepEqual(valid.expectedDialogue.map(d=>d.id),[0,1,2,3,4,5]);
  for(const d of source.dialogue) assert.deepEqual(valid.expectedDialogue.find(x=>x.id===d.id),d);
  assert.deepEqual(valid.panels.map(p=>p.sourcePanel),[1,2,3,4,5,6]);
  const page=m.buildExperimentalPageContract(plan,source);
  assert.equal(page.count,6);
  assert.deepEqual(page.panels[1],{panel:2,sourcePanel:2,camera:plan.panels[1].camera,style:source.panels[1].style,action:plan.panels[1].action,dialogue:[{speaker:'ユウ',text:'2番目は、そのまま！'}]});
  assert.deepEqual(page.panels.flatMap(p=>p.dialogue),valid.expectedDialogue.map(({speaker,text})=>({speaker,text})));
  const prompt=m.buildExperimentalImagePrompt(plan,source,input);
  for(const d of source.dialogue) assert.equal(prompt.split(JSON.stringify(d.text)).length-1,1);
  const review=m.buildExperimentalReviewPrompt(plan,source,input);
  for(const d of source.dialogue) assert.ok(!review.includes(d.text),'blind assessment must not receive expected speech');
  assert.ok(valid.expectedCast.find(c=>c.panel===2).names.includes('ナギ'));
 });
 test('native layout rejects expansion, added dialogue, reordered panels and altered camera or speech',()=>{
  for(const mutate of [
   p=>{p.addedDialogue=[{id:'add:1',sourcePanel:1,speaker:'ナギ',text:'こっちは任せて',purpose:'支える動作'}];},
   p=>{p.panels[1].kind='insert';},
   p=>{p.panels[1].sourcePanel=1;},
   p=>{[p.panels[1],p.panels[2]]=[p.panels[2],p.panels[1]];},
   p=>{p.count=7;p.panels.splice(1,0,{...anchor(1),kind:'insert'});},
   p=>{p.panels[1].dialogueIds=['add:404'];},
   p=>{p.panels[1].dialogueIds=[2];},
   p=>{p.panels[1].dialogueIds=[1,1];},
   p=>{p.panels[1].dialogueIds=[];},
   p=>{p.panels[0].dialogueIds=[];},
   p=>{p.panels[5].dialogueIds=[4,5];p.panels[4].dialogueIds=[];},
   p=>{p.panels[0].camera='アイレベル';},
  ]) {const bad=structuredClone(plan);mutate(bad);assert.throws(()=>m.validateExperimentalPlan(bad,source),/実験的コマ割り/);}
 });
 test('native review rejects expansion permission and preserves purposeful scripted silence',()=>{
  const quiet=m.readExperimentalSource({...input,scenario:input.scenario.replace('ユウ「6番目は、そのまま！」','セリフなし')});
  const quietPlan=structuredClone(plan);quietPlan.panels[5].dialogueIds=[];
  const review=m.buildExperimentalReviewPrompt(quietPlan,quiet,input);
  assert.match(review,/NATIVE PANEL FIDELITY: exactly 6 source panels, one-to-one/);
  for(const condition of ['count, reading order, action, facts, causal progression, ending and dialogue','No additional frames, inserted beats or unscripted speech are authorized','Purposeful scripted silence remains silent','source-grounded staging within the same moment']) assert.ok(review.includes(condition),condition);
  assert.doesNotMatch(review,/APPROVED STORY EXPANSION|original four-beat|planned added dialogue|approved expanded sequence|"addedDialogue":/);
  for(const d of quiet.dialogue) assert.ok(!review.includes(d.text),'independent transcription remains blind');
  assert.throws(()=>m.buildExperimentalReviewPrompt(plan,{...source,panels:source.panels.slice(0,4)},input),/コマ数/,'old four-beat expansion is invalid before review compilation');
  assert.throws(()=>m.buildExperimentalReviewPrompt({...plan,addedDialogue:[{id:'add:1',text:'追加'}]},source,input),/台詞/);
 });
 test('source/reference style fallback survives the native-page comparison boundary',()=>{
  const withoutStyle=m.readExperimentalSource({...input,scenario:input.scenario.replace('[EMOTION: NORMAL]\n','')});
  const page=m.buildExperimentalPageContract(plan,withoutStyle);
  const prompt=qa.buildImageQualityComparisonPrompt({approvedExperimentalPage:page});
  assert.equal(page.panels[0].style,'preserve source/reference art style');
  assert.equal(page.panels[1].style,'GEKIGA');
  assert.match(prompt,/preserve source\/reference art style/);
  assert.match(m.buildExperimentalImagePrompt(plan,withoutStyle,input),/Style: preserve source\/reference art style/);
 });
 test('an intentional native silent ending remains silent and cannot receive added dialogue',()=>{
  assert.equal(m.validateExperimentalPlan(plan,source).expectedDialogue.at(-1).id,5);
  const quietInput={...input,scenario:input.scenario.replace('ユウ「6番目は、そのまま！」','セリフなし')};
  const quiet=m.readExperimentalSource(quietInput),quietPlan=structuredClone(plan);quietPlan.panels[5].dialogueIds=[];
  assert.equal(m.validateExperimentalPlan(quietPlan,quiet).count,6);
  quietPlan.addedDialogue=[{id:'add:1',sourcePanel:6,speaker:'ナギ',text:'最後も声を足す',purpose:'結末への反応'}];quietPlan.panels[5].dialogueIds=['add:1'];
  assert.throws(()=>m.validateExperimentalPlan(quietPlan,quiet),/台詞/);
 });
 test('independent physical transcription detects a missing native line and retains the complete candidate',async()=>{
  const valid=m.validateExperimentalPlan(plan,source);
  const review={inspectionVersion:2,status:'pass',observedCount:6,readingOrder:'pass',camera:'pass',style:'pass',story:'pass',anatomy:'pass',pageText:'pass',breakout:'not_requested',issues:[],pageEvidence:'つながる動きの題字は正しく読める',evidence:m.experimentalLayout(6,'two_columns').map((r,i)=>({panel:i+1,center:[r.x+r.w/2,r.y+r.h/2],camera:'人物の顎と机下面が見えている',style:'人物の顔と背景に指定の線がある',story:'箱を運ぶ身体の連携が描かれている',anatomy:'手首と肘と肩が自然につながる',dialogue:valid.panels[i].dialogueIds.map(id=>valid.expectedDialogue.find(d=>d.id===id).text),cast_instances:valid.expectedCast.find(c=>c.panel===i+1).names.map(name=>({name,observed_count:1,status:'ok',instances:[{location:'各人物は左右に別々に描かれている',matched_features:['指定された髪の形','指定された服の色']}]}))}))};
  assert.equal(m.validateExperimentalReview(review,valid).readingOrder,'pass');
  const changedEnding={...review,story:'fail',issues:['最終コマが元の結末を別の決着に変えている。']};
  assert.equal(m.validateExperimentalReview(changedEnding,valid).story,'fail');
  assert.equal(m.validateExperimentalReview(changedEnding,valid).status,'warning');
  const missing=structuredClone(review);missing.evidence[1].dialogue=[];
  assert.equal(m.validateExperimentalReview(missing,valid).readingOrder,'fail');
  let called=false;
  const original={groupId:'same',prompt:'same approved native page',plan:valid,review,image:{base64Img:'original'}};
  const chosen=await m.selectExperimentalCandidate(original,{...original,review:missing,image:{base64Img:'missing-line'}},()=>{called=true;throw Error('must not prefer a missing line');});
  assert.equal(chosen.candidate,original.image);assert.equal(called,false);
 });
} finally {await server.close();}
