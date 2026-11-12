import test from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'vite';

const server=await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
try {
  const c=await server.ssrLoadModule('/src/lib/manga-page-composition.js');
  const m=await server.ssrLoadModule('/src/lib/experimental-manga.js');
  const v=await server.ssrLoadModule('/src/lib/scenario-validation.js');
  const {resolvePageWorkflow}=await server.ssrLoadModule('/src/lib/page-workflow.js');
  const frames=[{x:.36,y:0,w:.64,h:1},{x:0,y:0,w:.36,h:.3},{x:0,y:.3,w:.36,h:.32},{x:0,y:.62,w:.36,h:.38}];
  const composition={layout:'free',frames,reason:'大きな人物の登場を右全面に見せ、左の三つの小コマで発見とオチを読む。',heroPanels:[1],breakouts:[],foregrounds:[{panel:1,character:'ユウ',over:[2,3,4],placement:'右全面の全身を主役にし、肩と髪と左肘の輪郭を左の小コマの縁へ重ねる。小コマの人物と台詞は左側の余白に置く。'}],bleed:[{panel:1,edges:['right','bottom']}]};
  const scenarioFor=c=>`Title: 朝の発見\nPageComposition: ${JSON.stringify(c)}\n`+Array.from({length:4},(_,i)=>`[${i+1}コマ目]\n[Camera: ${i===0?'床から見上げる全身':'斜め上から俯瞰'}]\n[EMOTION: NORMAL]\n状況: ${i===0?'ユウが窓を開ける。':'ミオが窓辺を調べる。'}\n${i===0?'ユウ':'ミオ'}「確認${i+1}」`).join('\n');
  const input={enabled:true,scenarioMode:'experimental-manga',castList:'## ユウ\n## ミオ',colorMode:'monochrome',scenario:scenarioFor(composition)};

  test('ordinary four-beat page retains a dominant figure spanning three small panels through STEP3',async()=>{
    const source=m.readExperimentalSource(input);
    const result=await m.prepareExperimentalManga(input,async()=>JSON.stringify({count:4,layout:'two_columns',reason:'ignored alternate',panels:source.panels.map(p=>({sourcePanel:p.id,kind:'anchor',action:p.text,dialogueIds:p.dialogueIds,breakout:null,visualEffects:[]}))}));
    assert.deepEqual(c.pageCompositionRects(result.plan),frames);
    assert.deepEqual(result.plan.composition.foregrounds,composition.foregrounds);
    assert.deepEqual(result.plan.expectedDialogue,source.dialogue);
    assert.deepEqual(result.plan.expectedCast.map(p=>p.names),[['ユウ'],['ミオ'],['ミオ'],['ミオ']]);
    assert.match(result.prompt,/PAGE DOMINANT FIGURE F1/);
    assert.match(result.prompt,/P2, P3, P4/);
    assert.match(result.prompt,/FULL BLEED P1/);
    assert.match(result.prompt,/EXACTLY 4 story scenes/);
    assert.doesNotMatch(result.prompt,/EXACTLY 4 framed panels|綺麗に越えられなければ全輪郭を枠内に保持/);
    assert.match(result.prompt,/PAGE DOMINANT FIGURE.*省略しない/);
    assert.equal(result.prompt.split(composition.foregrounds[0].placement).length-1,1,'authored placement is retained once, not duplicated as JSON');
    assert.ok(result.prompt.includes(composition.reason));
    for(const frame of frames) assert.ok(result.prompt.includes('rect='+JSON.stringify(frame)));
    const heroFrame=result.prompt.split('[PAGE FRAME P1 |')[1].split('[END PAGE FRAME P1]')[0];
    assert.match(heroFrame,/元の矩形へ縮小せず/);
    assert.doesNotMatch(heroFrame,/両靴とその先の床\/頭上余白を枠内に/);
    assert.throws(()=>resolvePageWorkflow({experimentalEnabled:false,prompt:result.prompt,input}),/STEP3/,'a dominant page must not fall through to the four-strip workflow');
    assert.match(m.buildExperimentalReviewPrompt(result.plan,result.source),/foreground:P1/);
    assert.equal(v.resolveAutoScenarioMode({scenario:input.scenario,panelCountReason:'四つの出来事で導入からオチまで伝わる。'}).scenarioMode,'experimental-manga');
    assert.equal(v.resolveAutoScenarioMode({scenario:input.scenario.replace(/^PageComposition:.*\n/m,''),panelCountReason:'四つの出来事で伝わる。'}).scenarioMode,'four-panel','legacy four strips remain supported');
  });

  test('multiple bleed edges share the compiler contract without losing edge ownership',()=>{
    const withBleed={...composition,bleed:[...composition.bleed,{panel:4,edges:['left','bottom']}]};
    const instructions=c.pageCompositionRendering({composition:withBleed});
    assert.match(instructions,/FULL BLEED P1:.*right.*bottom/);
    assert.match(instructions,/FULL BLEED P4:.*left.*bottom/);
    assert.equal(instructions.split('Footer credits may overlay artwork').length-1,1);
    assert.ok(instructions.includes(composition.reason));
  });

  test('free geometry rejects overlapping frames and ambiguous reading order without restricting to a catalog',()=>{
    assert.deepEqual(c.assertGeneratedPageComposition(input.scenario,4),composition);
    const overlap=structuredClone(composition);overlap.frames[1].w=.6;
    assert.throws(()=>c.readPageComposition(scenarioFor(overlap),4),/重な/);
    const reversed=structuredClone(composition);[reversed.frames[0],reversed.frames[1]]=[reversed.frames[1],reversed.frames[0]];
    assert.throws(()=>c.readPageComposition(scenarioFor(reversed),4),/読順/);
    const impossible=structuredClone(composition);impossible.foregrounds[0].over=[1,7];
    assert.throws(()=>c.readPageComposition(scenarioFor(impossible),4),/前景/);
  });

  test('a distinct later appearance of the page figure remains a local story actor',async()=>{
    const later={...input,scenario:input.scenario.replace('状況: ミオが窓辺を調べる。\nミオ「確認3」','状況: ユウが窓の鍵を指さす。\nユウ「確認3」')};
    const source=m.readExperimentalSource(later);
    const plan=c.applyPageComposition({count:4,layout:'free',reason:composition.reason,panels:source.panels.map(p=>({sourcePanel:p.id,kind:'anchor',camera:p.camera,action:p.text,dialogueIds:p.dialogueIds,breakout:null,visualEffects:[]}))},source);
    assert.deepEqual(m.validateExperimentalPlan(plan,source).expectedCast[2].names,['ユウ']);
  });

  test('cross-panel body ownership requires observed continuity and a grounded source identity',()=>{
    const plan={count:4,layout:'free',composition};
    const review={compositionChecks:[{id:'foreground:P1',status:'pass',observed:'右の胴から左の肩へ一つの輪郭が続き、枠線が背後で消える。'}],evidence:[
      {panel:1,physical_bodies:[{id:'a',features:['短い黒髪','縞模様の上着']}],cast_instances:[{name:'ユウ',status:'ok',instances:[{body_id:'a',matched_features:['短い黒髪','縞模様の上着']}]}]},
      {panel:2,physical_bodies:[{id:'part',features:['縞模様の上着','袖に白い縫い目']}],cast_instances:[],body_dispositions:[{body_id:'part',kind:'foreground',source_panel:1,source_body_id:'a',observed_features:['縞模様の上着','袖に白い縫い目'],evidence:'右の大きな身体の上着からこの袖へ輪郭が連続している。'}]},
    ]};
    assert.equal(c.observedForegroundBodies(review,plan,2).get('part')?.panel,1);
    const ungrounded=structuredClone(review);ungrounded.evidence[0].cast_instances[0].instances[0].matched_features=['作り話'];
    assert.equal(c.observedForegroundBodies(ungrounded,plan,2).size,0);
    const disconnected=structuredClone(review);disconnected.compositionChecks[0].status='fail';
    assert.equal(c.observedForegroundBodies(disconnected,plan,2).size,0);
    const shifted=structuredClone(review);
    Object.assign(shifted.compositionChecks[0],{status:'fail',materialImpact:'minor_variation',impactReason:'接続した肩と腕の越境位置がずれただけで人物と台詞は読める。'});
    const otherRecipient={...plan,composition:{...composition,foregrounds:composition.foregrounds.map(f=>({...f,over:[3,4]}))}};
    assert.equal(c.observedForegroundBodies(shifted,otherRecipient,2).get('part')?.panel,1,'observed continuous silhouette ownership survives a harmless receiving-frame shift');
    shifted.evidence[1].body_dispositions[0].evidence=null;
    assert.equal(c.observedForegroundBodies(shifted,otherRecipient,2).size,0,'a layout waiver cannot invent a connection');
    assert.equal(c.observedForegroundBodies(review,{...plan,composition:{...composition,foregrounds:[]}},2).size,0);
    const doubleClaim=structuredClone(review);doubleClaim.evidence[1].cast_instances=[{name:'ユウ',instances:[{body_id:'part'}]}];
    assert.equal(c.observedForegroundBodies(doubleClaim,plan,2).size,0,'one body cannot be both an incoming layer and an independent local actor');
  });
} finally {await server.close();}
