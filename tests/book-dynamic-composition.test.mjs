import assert from 'node:assert/strict';
import test, {before, after} from 'node:test';
import {createServer} from 'vite';
import {assertRenderOptions} from '../src/lib/render-options.js';
import {buildBookDetail} from '../src/lib/mcp/book-detail.js';

let server, composition, getScenarioPrompt, native;
before(async()=>{
  server=await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
  composition=await server.ssrLoadModule('/src/lib/manga-page-composition.js');
  ({getScenarioPrompt}=await server.ssrLoadModule('/src/lib/prompts.js'));
  native=await server.ssrLoadModule('/src/lib/experimental-manga.js');
});
after(async()=>server?.close());

const layoutFor=count=>({layout:'free',frames:count===2
  ?[{x:0,y:0,w:1,h:.7},{x:0,y:.7,w:1,h:.3}]
  :[{x:.6,y:0,w:.4,h:.3},{x:0,y:0,w:.6,h:1},{x:.6,y:.3,w:.4,h:.7}],
  reason:'手を伸ばす見せ場と、受け取る反応の読順を両立する',heroPanels:[count===2?1:2],foregrounds:[],
  breakouts:[{panel:count===2?1:2,part:'ユウの肩から手までの連続した腕',into:count===2?2:3}],bleed:[]});
const scenarioFor=(count,c=layoutFor(count))=>`PageComposition: ${JSON.stringify(c)}\n`+Array.from({length:count},(_,i)=>
  `[${i+1}コマ目]\n[Camera: 床近くから手元を見上げる]\n[EMOTION: NORMAL]\n状況: ユウが手を伸ばして小包を受け取る。\nユウ:「届けたよ${i+1}」`).join('\n');

test('2–8 panel book prompts actively design a story-led foreground without a vertical/empty default',()=>{
  for(let count=2;count<=8;count++){
    const recent=[{count:2,family:'upper-wide',heroPanel:1,heroBeat:'opening',smallPanels:'right-stack'}];
    const prompt=getScenarioPrompt({scenarioMode:`book-page-${count}-continue`,manualTopic:'静かな対話。台詞「待っていたよ」と床からのカメラを保持。',recentPageCompositions:recent});
    assert.match(prompt,/骨格の異なる3案/);
    assert.match(prompt,/RECENT PAGE STRUCTURES[^\n]*"count":2/);
    assert.match(prompt,/見せ場から前景・枠越えを積極的に検討/);
    assert.match(prompt,/毎ページのノルマにしない/);
    assert.match(prompt,/restraintReason/);
    assert.match(prompt,/静かな表情や余韻/);
    assert.match(prompt,/layout（通常は"free"）/);
    assert.doesNotMatch(prompt,/layout:"vertical_page"|foregrounds:\[\]、breakouts:\[\]/);
    assert.ok(prompt.includes('台詞「待っていたよ」と床からのカメラを保持。'));
  }
  const single=composition.scenarioPageCompositionInstruction('book-page-1-continue');
  assert.match(single,/存在しない別コマへの越境は足さない/);
});

test('book detail carries only prior comic structure, newest first, without story/camera leakage',async()=>{
  const pages=[{id:'cover',kind:'illustration',panelCount:1},...[2,3,2].map((n,i)=>({id:`p${i}`,kind:'comic',panelCount:n}))];
  const outline={synopsis:'小包を渡す話',pages:pages.map(p=>({pageId:p.id,beat:'現在の受け渡し'}))};
  const calls=[];
  await buildBookDetail({pages,settings:{},castBible:'## 1. ユウ\n配達員。大人の人物。青い上着。',plan:{outline}},async input=>{
    calls.push(input); const count=pages[calls.length].panelCount;
    return {scenario:scenarioFor(count)};
  });
  assert.deepEqual(calls[0].recentPageCompositions,[]);
  assert.equal(calls[1].recentPageCompositions[0].count,2);
  assert.deepEqual(calls[2].recentPageCompositions.map(p=>p.count),[3,2]);
  const carried=JSON.stringify(calls[2].recentPageCompositions);
  assert.doesNotMatch(carried,/ユウ|届けた|床近く|NORMAL|小包|cover/);
  assert.deepEqual(Object.keys(calls[2].recentPageCompositions[0]).sort(),['count','family','heroBeat','heroPanel','smallPanels'].sort());
});

test('short book free layouts retain authored crossings, camera and exact dialogue through the compiler',async()=>{
  for(const count of [2,3]){
    const input={enabled:true,scenarioMode:`book-page-${count}-continue`,castList:'## ユウ',colorMode:'monochrome',scenario:scenarioFor(count)};
    const source=native.readExperimentalSource(input);
    const prepared=await native.prepareExperimentalManga(input,async()=>JSON.stringify({count,layout:'vertical_page',reason:'別案',panels:source.panels.map(p=>({sourcePanel:p.id,kind:'anchor',camera:'変更したカメラ',action:'ユウが小包を持つ。',dialogueIds:p.dialogueIds}))}));
    assert.equal(prepared.plan.layout,'free');
    assert.deepEqual(prepared.plan.composition.frames,layoutFor(count).frames);
    assert.match(prepared.prompt,/REQUIRED BREAKOUT/);
    assert.deepEqual(prepared.plan.expectedDialogue,source.dialogue);
    assert.equal(prepared.plan.panels[0].camera,source.panels[0].camera);
    const quiet={...layoutFor(count),breakouts:[],reason:'読み終えた後の静かな表情と間を大小のコマで伝える'};
    assert.deepEqual(composition.assertGeneratedPageComposition(scenarioFor(count,quiet),count,{scenarioMode:input.scenarioMode}).breakouts,[]);
    const invalid={...layoutFor(count),breakouts:[{panel:1,part:'腕',into:1}]};
    assert.throws(()=>composition.assertGeneratedPageComposition(scenarioFor(count,invalid),count,{scenarioMode:input.scenarioMode}),error=>error.code==='PAGE_COMPOSITION_CONTRACT');
  }
});

test('book foreground selection preserves a dominant body through normal and compact native rendering',async()=>{
  const guidance=composition.scenarioPageCompositionInstruction('book-page-3-continue');
  assert.match(guidance,/腕・剣・足先だけのbreakoutsを、人物全体を大きく見せる前景の代用にしない/);
  assert.match(guidance,/前景を毎ページ強制しない/);
  assert.equal(composition.scenarioPageCompositionInstruction('normal'),composition.SCENARIO_PAGE_COMPOSITION);
  const c={...layoutFor(3),breakouts:[],foregrounds:[{panel:2,character:'ユウ',over:[1,3],placement:'大きな全身を一続きに配置し、右の小コマと台詞の余白を周囲へ確保する'}],bleed:[{panel:2,edges:['left','top','bottom']}]};
  const input={enabled:true,scenarioMode:'book-page-3-continue',castList:'## ユウ',colorMode:'monochrome',scenario:scenarioFor(3,c)};
  const source=native.readExperimentalSource(input);
  const {plan}=await native.prepareExperimentalManga(input,async()=>JSON.stringify({count:3,layout:'vertical_page',reason:'原案を保持',panels:source.panels.map(p=>({sourcePanel:p.id,kind:'anchor',camera:p.camera,action:extractAction(p.text),dialogueIds:p.dialogueIds}))}));
  for(const promptMaxChars of [32000,15000]){
    const prompt=native.buildExperimentalImagePrompt(plan,source,{providerFamily:'chatgpt',colorMode:'monochrome',showTitle:false,promptMaxChars});
    assert.match(prompt,/PAGE DOMINANT FIGURE F1: ユウ/);
    assert.match(prompt,/元場面のCamera・姿勢・道具とSOURCE MEDIUM/);
    assert.match(prompt,/越境部分もP2の身体で、受入場面の新たな人物ではない/);
    assert.match(prompt,/Explicit FULL BLEED edges extend artwork/);
    assertRenderOptions(prompt,{showTitle:false,showWatermarks:false,mosaicCopyrightedCharacters:false});
    assert.doesNotMatch(prompt,/Keep the A4 portrait canvas, all four outer frame sides\/corners, white outer margins/);
    assert.deepEqual(plan.expectedDialogue,source.dialogue);
    assert.deepEqual(plan.panels.map(p=>p.camera),source.panels.map(p=>p.camera));
  }
});
const extractAction=text=>text.match(/状況: ([^\n]+)/)?.[1]||text;

test('an authored leg or garment crossing hides the shared frame line and gutter in both media', async()=>{
  for(const [colorMode,part] of [['color','ユウの右脚と靴'],['monochrome','ユウのコートを着た肩と腕']]) {
    const c=layoutFor(2);
    c.breakouts[0].part=part;
    const input={enabled:true,scenarioMode:'book-page-2-continue',castList:'## ユウ',colorMode,scenario:scenarioFor(2,c)};
    const source=native.readExperimentalSource(input);
    const result=await native.prepareExperimentalManga(input,async()=>JSON.stringify({count:2,layout:'free',reason:'境界を越える動勢',panels:source.panels.map(p=>({sourcePanel:p.id,kind:'anchor',action:extractAction(p.text),dialogueIds:p.dialogueIds}))}));
    assert.match(result.prompt,/P1 crosses into (?:adjacent )?P2/);
    assert.match(result.prompt,/Hide BOTH the frame line and gutter wherever the crossing silhouette covers them/);
    assert.match(native.buildExperimentalReviewPrompt(result.plan,source),/locate any frame line or gutter visibly drawn over the crossing anatomy or clothing/i);
    const contained=native.readExperimentalSource({...input,scenario:scenarioFor(2,{...c,breakouts:[]})});
    const noCrossing=await native.prepareExperimentalManga({...input,scenario:contained.scenario},async()=>JSON.stringify({count:2,layout:'free',reason:'読みやすい通常配置',panels:contained.panels.map(p=>({sourcePanel:p.id,kind:'anchor',action:extractAction(p.text),dialogueIds:p.dialogueIds}))}));
    assert.doesNotMatch(noCrossing.prompt,/REQUIRED BREAKOUT:|Hide BOTH the frame line/);
  }
});
