import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {createServer} from 'vite';
const baseline=JSON.parse(readFileSync(new URL('./fixtures/native-mono-compact-before.json',import.meta.url)));
const server=await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
try {
 const mono=await server.ssrLoadModule('/src/lib/manga-render-mode.js');
 const m=await server.ssrLoadModule('/src/lib/experimental-manga.js');
 const {resolvePageWorkflow}=await server.ssrLoadModule('/src/lib/page-workflow.js');
 const {resolveFinalPromptReviewContract}=await server.ssrLoadModule('/src/lib/final-prompt-review-contract.js');
 const source=m.readExperimentalSource({enabled:true,scenario:baseline.scenario,castList:baseline.castList});
 const plan={count:5,layout:'mixed_rows',reason:'展示順',panels:source.panels.map((p,i)=>({sourcePanel:i+1,kind:'anchor',camera:p.camera,action:`PLAN_NOTE_${i}。甲と乙が箱を支える。`,dialogueIds:p.dialogueIds,breakout:null}))};
 test('native mono shares full selected recipes, keeps source facts and readable white-paper manuscript within a compact envelope',()=>{
  const prompt=m.buildExperimentalImagePrompt(plan,source,{colorMode:'monochrome',providerFamily:'chatgpt',hasCharacterReferences:false});
  assert.ok(prompt.length<14000,`compact anonymous fixture: ${prompt.length}`);
  for(const [style,recipe] of Object.entries(baseline.recipes)) {
   assert.equal(prompt.split(recipe).length-1,1,`${style} exact recipe once`);
   assert.match(prompt,new RegExp(`FRAME MEDIUM P${baseline.styles.indexOf(style)+1} — ${style}: Apply the shared ${style} recipe`));
  }
  for(let i=0;i<5;i++) {assert.ok(prompt.includes(`SOURCE_FACT_${i}`));assert.ok(!prompt.includes(`PLAN_NOTE_${i}`),'AI paraphrase must not override source action');assert.ok(prompt.includes(source.panels[i].camera));}
  assert.match(prompt,/SOURCE PRIORITY/);
  assert.ok(prompt.includes(mono.MONOCHROME_RENDERING_LOCK_COMPACT),'entire existing paper/black/skin/screen lock remains byte-exact');
  assert.match(prompt,/背景一面の網点膜\/背景消去は禁止/);
  assert.match(prompt,/非焦点defocusは輪郭\/細部の焦点差/);
  assert.match(prompt,/暗い肌\/素材の割当トーンと根拠ある影は保持/);
  assert.match(prompt,/HAND INK:/);
  assert.match(prompt,/FOCUS PLAN:/);
  const review=resolveFinalPromptReviewContract({plan,source},prompt);
  assert.deepEqual(review.plan.expectedDialogue.map(d=>[d.speaker,d.text]),source.dialogue.map(d=>[d.speaker,d.text]));
  assert.deepEqual(review.plan.panels.map(p=>p.camera),source.panels.map(p=>p.camera));
  assert.deepEqual(review.plan.panels.map(p=>p.reviewStyle),baseline.styles);
  for(let i=0;i<5;i++)assert.ok(review.plan.panels[i].action.includes(`SOURCE_FACT_${i}`));
 });
 test('native mono keeps STEP3 staging when the authored beat supplies only Camera and dialogue',()=>{
  const scenario=baseline.scenario.replace(/^状況:.*\n/gm,'');
  const sparse=m.readExperimentalSource({scenario,castList:baseline.castList});
  const prompt=m.buildExperimentalImagePrompt(plan,sparse,{colorMode:'monochrome',hasCharacterReferences:false});
  const review=resolveFinalPromptReviewContract({plan,source:sparse},prompt);
  for(let i=0;i<5;i++)assert.equal(review.plan.panels[i].action,plan.panels[i].action);
  assert.deepEqual(review.plan.expectedDialogue.map(d=>d.text),sparse.dialogue.map(d=>d.text));
 });
 test('native MONO compact cannot enter the ordinary workflow, while ordinary prose and unmatched labels remain usable',()=>{
  const prompt=m.buildExperimentalImagePrompt(plan,source,{colorMode:'monochrome',hasCharacterReferences:false});
  assert.throws(()=>resolvePageWorkflow({experimentalEnabled:false,prompt}),/通常4コマ/);
  assert.throws(()=>resolvePageWorkflow({experimentalEnabled:false,prompt:'Create ONE complete Japanese manga page with EXACTLY 5 framed panels.'}),/通常4コマ/);
  for(const prompt of [
   '日本の白黒漫画を一ページ描く。場面数は厳密に 5 コマ。物語の自由入力です。',
   '普通の漫画。\n[PAGE FRAME P1 | reference only]\n説明\n[END PAGE FRAME P1]',
   '日本の白黒漫画を一ページ描く。場面数は厳密に 5 コマ。\n[PAGE FRAME P1 | unpaired example]'
  ])assert.doesNotThrow(()=>resolvePageWorkflow({experimentalEnabled:false,prompt}));
 });
 test('native color remains byte identical to pre-mono-compact renderer for each provider',()=>{
  for(const row of baseline.rows.filter(r=>r.colorMode==='color')) {
   const prompt=m.buildExperimentalImagePrompt(plan,source,{colorMode:row.colorMode,providerFamily:row.providerFamily,hasCharacterReferences:false});
   assert.equal(createHash('sha256').update(prompt).digest('hex'),row.sha256);
  }
 });
} finally {await server.close();}
