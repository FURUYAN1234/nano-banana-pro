import assert from 'node:assert/strict';
import test from 'node:test';
import {createServer} from 'vite';
const server=await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
try {
 const m=await server.ssrLoadModule('/src/lib/experimental-manga.js');
 const qa=await server.ssrLoadModule('/src/lib/image-quality-qa.js');
 const input={scenario:'## タイトル: つながる動き\n'+[1,2,3,4].map(n=>`[${n}コマ目]\n[Camera: ${n%2?'右前から強く俯瞰':'床すれすれから強く見上げる広角'}]\n[EMOTION: ${n===2?'GEKIGA':'NORMAL'}]\n状況: ユウとナギが箱を運ぶ。動作${n}。\nユウ「${n}番目は、そのまま！」`).join('\n'),castList:'## ユウ\n[WEIGHTS]: (black hair:1.4)\n## ナギ\n[WEIGHTS]: (blonde hair:1.4)',colorMode:'color'};
 const source=m.readExperimentalSource(input);
 const anchor=n=>({sourcePanel:n,kind:'anchor',camera:source.panels[n-1].camera,action:'ユウとナギが箱を運ぶ。元の動作'+n+'を保持。',dialogueIds:source.panels[n-1].dialogueIds,visualEffects:[],breakout:null});
 const insert=(n,id)=>({...anchor(n),kind:'insert',camera:'低い位置から両手を見上げる近景',action:'ナギが箱の傾きに合わせ、肘と足で踏ん張ってユウを支える。',dialogueIds:[id]});
 const plan={count:6,layout:'two_columns',reason:'受け渡しと受け止めを具体化',pageIntent:'二人の動きの連携を見せる',addedDialogue:[{id:'add:1',sourcePanel:1,speaker:'ナギ',text:'こっちは、任せて！',purpose:'支える手と応答の連携を見せる'},{id:'add:2',sourcePanel:3,speaker:'ナギ',text:'よし、受け止めた！',purpose:'既存の運搬動作への反応を具体化する'}],panels:[anchor(1),insert(1,'add:1'),anchor(2),anchor(3),insert(3,'add:2'),anchor(4)]};
 test('approved expansion keeps original dialogue and adds known-speaker lines to one shared physical reading manifest',()=>{
  const valid=m.validateExperimentalPlan(plan,source);
  assert.deepEqual(valid.expectedDialogue.map(d=>d.id),[0,'add:1',1,2,'add:2',3]);
  for(const d of source.dialogue) assert.deepEqual(valid.expectedDialogue.find(x=>x.id===d.id),d);
  assert.equal(valid.expectedDialogue.find(d=>d.id==='add:1').speaker,'ナギ');
  assert.equal(valid.expectedDialogue.find(d=>d.id==='add:1').sourcePanel,1);
  const page=m.buildExperimentalPageContract(plan,source);
  assert.equal(page.count,6);
  assert.deepEqual(page.panels[1],{panel:2,sourcePanel:1,camera:plan.panels[1].camera,style:source.panels[0].style,action:plan.panels[1].action,dialogue:[{speaker:'ナギ',text:'こっちは、任せて！'}]});
  assert.deepEqual(page.panels.flatMap(p=>p.dialogue),valid.expectedDialogue.map(({speaker,text})=>({speaker,text})));
  const prompt=m.buildExperimentalImagePrompt(plan,source,input);
  for(const d of [...source.dialogue,...plan.addedDialogue]) assert.equal(prompt.split(JSON.stringify(d.text)).length-1,1);
  const review=m.buildExperimentalReviewPrompt(plan,source,input);
  for(const d of plan.addedDialogue) assert.ok(!review.includes(d.text),'blind assessment must not receive expected added text');
  assert.match(review,/approved.*expansion/i);
  assert.ok(valid.expectedCast.find(c=>c.panel===2).names.includes('ナギ'));
 });
 test('expansion rejects missing, duplicate, cross-beat, unknown-speaker or unmotivated lines and keeps the original ending last',()=>{
  for(const mutate of [
   p=>{p.addedDialogue[0].speaker='未登場の人物';},
   p=>{p.addedDialogue[0].purpose='';},
   p=>{p.addedDialogue[0].id=0;},
   p=>{p.addedDialogue[1].id='add:1';},
   p=>{p.panels[1].dialogueIds=['add:404'];},
   p=>{p.panels[1].dialogueIds=['add:2'];},
   p=>{p.panels[1].dialogueIds=['add:1','add:1'];},
   p=>{p.panels[1].dialogueIds=[];},
   p=>{p.panels[0].dialogueIds=[];},
   p=>{p.panels[5].dialogueIds=[3,'add:2'];p.panels[4].dialogueIds=[];p.addedDialogue[1].sourcePanel=4;},
   p=>{p.panels[0].camera='アイレベル';},
  ]) {const bad=structuredClone(plan);mutate(bad);assert.throws(()=>m.validateExperimentalPlan(bad,source),/実験的コマ割り/);}
 });
 test('source/reference style fallback survives the expanded-page comparison boundary',()=>{
  const withoutStyle=m.readExperimentalSource({...input,scenario:input.scenario.replace('[EMOTION: NORMAL]\n','')});
  const page=m.buildExperimentalPageContract(plan,withoutStyle);
  const prompt=qa.buildImageQualityComparisonPrompt({approvedExperimentalPage:page});
  assert.equal(page.panels[0].style,'preserve source/reference art style');
  assert.equal(page.panels[1].style,page.panels[0].style);
  assert.match(prompt,/preserve source\/reference art style/);
  assert.match(m.buildExperimentalImagePrompt(plan,withoutStyle,input),/Style: preserve source\/reference art style/);
 });
 test('source-grounded added dialogue may precede the original final line while an intentional silent ending remains silent',()=>{
  const end=structuredClone(plan);end.addedDialogue[1].sourcePanel=4;end.panels[4].dialogueIds=[];end.panels[5].dialogueIds=['add:2',3];
  assert.equal(m.validateExperimentalPlan(end,source).expectedDialogue.at(-1).id,3);
  const quietInput={...input,scenario:input.scenario.replace('ユウ「4番目は、そのまま！」','セリフなし')};
  const quiet=m.readExperimentalSource(quietInput),quietPlan=structuredClone(end);quietPlan.panels[5].dialogueIds=['add:2'];
  assert.throws(()=>m.validateExperimentalPlan(quietPlan,quiet),/無言|結末/);
  quietPlan.addedDialogue.pop();quietPlan.panels[5].dialogueIds=[];
  assert.equal(m.validateExperimentalPlan(quietPlan,quiet).count,6);
 });
 test('independent physical transcription detects a missing added line without confusing it with unauthorized dialogue',async()=>{
  const valid=m.validateExperimentalPlan(plan,source);
  const review={inspectionVersion:2,status:'pass',observedCount:6,readingOrder:'pass',camera:'pass',style:'pass',story:'pass',anatomy:'pass',pageText:'pass',breakout:'not_requested',issues:[],pageEvidence:'つながる動きの題字は正しく読める',evidence:m.experimentalLayout(6,'two_columns').map((r,i)=>({panel:i+1,center:[r.x+r.w/2,r.y+r.h/2],camera:'人物の顎と机下面が見えている',style:'人物の顔と背景に指定の線がある',story:'箱を運ぶ身体の連携が描かれている',anatomy:'手首と肘と肩が自然につながる',dialogue:valid.panels[i].dialogueIds.map(id=>valid.expectedDialogue.find(d=>d.id===id).text),cast_instances:valid.expectedCast.find(c=>c.panel===i+1).names.map(name=>({name,observed_count:1,status:'ok',instances:[{location:'各人物は左右に別々に描かれている',matched_features:['指定された髪の形','指定された服の色']}]}))}))};
  assert.equal(m.validateExperimentalReview(review,valid).readingOrder,'pass');
  const changedEnding={...review,story:'fail',issues:['最終コマが元の結末を別の決着に変えている。']};
  assert.equal(m.validateExperimentalReview(changedEnding,valid).story,'fail');
  assert.equal(m.validateExperimentalReview(changedEnding,valid).status,'warning');
  const missing=structuredClone(review);missing.evidence[1].dialogue=[];
  assert.equal(m.validateExperimentalReview(missing,valid).readingOrder,'fail');
  let called=false;
  const original={groupId:'same',prompt:'same approved expansion',plan:valid,review,image:{base64Img:'original'}};
  const chosen=await m.selectExperimentalCandidate(original,{...original,review:missing,image:{base64Img:'missing-line'}},()=>{called=true;throw Error('must not prefer a missing line');});
  assert.equal(chosen.candidate,original.image);assert.equal(called,false);
 });
} finally {await server.close();}
