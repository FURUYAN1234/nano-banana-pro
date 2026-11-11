import assert from 'node:assert/strict';
import test from 'node:test';
import {createServer} from 'vite';

const server=await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
try {
  const m=await server.ssrLoadModule('/src/lib/experimental-manga.js');
  const v=await server.ssrLoadModule('/src/lib/scenario-validation.js');
  const c=await server.ssrLoadModule('/src/lib/manga-page-composition.js');
  const renderOptions=await server.ssrLoadModule('/src/lib/render-options.js');
  const composition={layout:'tall_right_middle',reason:'落ちた幕を受け止める瞬間を大きく見せ、左の反応へつなぐ',heroPanels:[3],breakouts:[{panel:3,part:'ユウの頭髪',into:1}],bleed:[{panel:3,edges:['right','bottom']}]};
  const body=Array.from({length:5},(_,i)=>`[${i+1}コマ目]\n[Camera: 斜め上から俯瞰]\n[EMOTION: NORMAL]\n状況: ユウが幕を支える。\nユウ「確認${i+1}」`).join('\n');
  const inputFor=(c=composition)=>({enabled:true,scenarioMode:'experimental-manga',castList:'## ユウ',colorMode:'monochrome',scenario:(c?`PageComposition: ${JSON.stringify(c)}\n`:'')+body});
  const planFor=source=>({count:5,layout:'two_columns',reason:'全体の動作を読む',panels:source.panels.map(p=>({sourcePanel:p.id,kind:'anchor',camera:p.camera,action:'ユウが幕を支える。',dialogueIds:p.dialogueIds,breakout:null,visualEffects:[]}))});

  test('new scenarios require bold default composition or an explicit story-grounded restraint reason',()=>{
    const missing={layout:'hero_bottom',reason:'最後の幕を大きく見せる',heroPanels:[5],breakouts:[],bleed:[{panel:5,edges:['bottom']}]};
    assert.throws(()=>c.assertGeneratedPageComposition(inputFor(missing).scenario,5),/restraintReason/);
    assert.deepEqual(c.assertGeneratedPageComposition(inputFor().scenario,5),composition);
    const quiet={...missing,restraintReason:'原入力で指定された静かな会話の間を守り、人物の動作を誇張しない。'};
    assert.equal(c.assertGeneratedPageComposition(inputFor(quiet).scenario,5).restraintReason,quiet.restraintReason);
    assert.deepEqual(c.readPageComposition(inputFor(missing).scenario,5),missing,'older imported scenarios remain usable');
  });

  test('STEP2 authored composition survives an omitted or conflicting STEP3 answer',async()=>{
    const input=inputFor(),source=m.readExperimentalSource(input),reply=planFor(source);
    reply.panels[2].camera='床から見上げる';
    const result=await m.prepareExperimentalManga(input,async()=>JSON.stringify(reply));
    assert.equal(result.plan.layout,composition.layout);
    assert.deepEqual(result.plan.panels[2].breakout,{part:'ユウの頭髪',into:1,required:true});
    assert.deepEqual(result.plan.panels[2].bleed,['right','bottom']);
    assert.ok(result.plan.panels[2].visualEffects.includes('hero_scale'));
    assert.equal(result.plan.panels[2].camera,source.panels[2].camera);
    assert.deepEqual(result.plan.expectedDialogue,source.dialogue);
    assert.match(result.prompt,/FULL BLEED P3.*right.*bottom/);
    assert.match(result.prompt,/REQUIRED BREAKOUT/);
    assert.match(result.prompt,/CROSSING EDGE: P3\.top -> P1\.bottom/);
    assert.match(result.prompt,/INCOMING FROM P3:.*bottom.*P3.*身体/);
    assert.doesNotMatch(result.prompt,/外枠の四辺\/四隅を余白付きで画布内へ収め、切落とし\/画外拡張は禁止/);
    assert.doesNotMatch(result.prompt,/If a clean crossing is impossible, keep the body inside its source panel/);
    assert.match(m.buildExperimentalReviewPrompt(result.plan,result.source),/AUTHORED PAGE COMPOSITION/);
  });
  test('crossing directions come from adjacent frame geometry, never from panel numbering',()=>{
    const rects=c.experimentalLayout(5,'tall_right_middle');
    assert.equal(c.breakoutEdge(rects[2],rects[0]),'top');
    assert.equal(c.breakoutEdge(rects[0],rects[2]),'bottom');
    assert.equal(c.breakoutEdge(rects[2],rects[3]),'left');
    assert.equal(c.breakoutEdge(rects[3],rects[2]),'right');
    assert.match(c.SCENARIO_PAGE_COMPOSITION,/直立.*肩.*下辺/);
    assert.match(c.SCENARIO_PAGE_COMPOSITION,/肩越し.*別ポーズ/);
  });

  test('required breakout is one page-level body, with recipient medium scoped to local actors',async()=>{
    const input=inputFor(),source=m.readExperimentalSource(input);
    const result=await m.prepareExperimentalManga(input,async()=>JSON.stringify(planFor(source)));
    assert.match(result.prompt,/PAGE FOREGROUND F1:.*P3.*P1/);
    assert.match(result.prompt,/ONE physical body.*ONE head/);
    assert.match(result.prompt,/SOURCE MEDIUM: NORMAL/);
    assert.match(result.prompt,/FRAME MEDIUM P1[^\n]*LOCAL ACTORS ONLY/);
    assert.match(result.prompt,/receiving-panel Camera.*do not reproject/);
    const legacy=m.readExperimentalSource(inputFor(null));
    const old=await m.prepareExperimentalManga(inputFor(null),async()=>JSON.stringify(planFor(legacy)));
    assert.doesNotMatch(old.prompt,/PAGE FOREGROUND F1|LOCAL ACTORS ONLY/);
  });

  test('partial observation cannot pass but independently grounded composition failures remain repairable',()=>{
    const source=m.readExperimentalSource(inputFor()),plan=c.applyPageComposition(planFor(source),source);
    const bounds=m.experimentalLayout(plan.count,plan.layout).map(r=>[r.x,r.y,r.w,r.h]);
    const review={status:'warning',observedCount:5,readingOrder:'pass',camera:'uncertain',style:'uncertain',story:'uncertain',anatomy:'uncertain',pageText:'uncertain',breakout:'fail',issues:['頭と肩の越境が接続していない。'],pageEvidence:'題字の文字は判読できる。',
      observedFrames:bounds.map(b=>({bounds:b,edgeEvidence:'白い溝と黒い枠線の連続を確認。'})),
      compositionChecks:[{id:'breakout:P3',status:'fail',observed:'受入コマには独立した頭があり、大コマの胴と首はつながっていない。'}],corrections:[],
      evidence:bounds.map((b,i)=>({panel:i+1,bounds:b,center:[b[0]+b[2]/2,b[1]+b[3]/2],camera:'顔と肩の上面がはっきり見える。',style:'墨線と網点で描かれている。',story:'人物は幕を手で支えている。',anatomy:'腕と肩の接続が見える。',breakout:i===0?'大コマからの連続ではなく、別の頭が枠内に見える。':null}))};
    review.evidence[4].story=null;
    const checked=m.validateExperimentalReview(review,plan);
    assert.equal(checked.status,'unverified');
    assert.ok(checked.validationErrors.length);
    assert.deepEqual(m.experimentalRepairIssues(checked,plan).map(i=>i.type),['page_composition']);
    assert.equal(m.validateExperimentalReview(checked,plan).status,'unverified','retaining evidence never turns the incomplete inspection into a pass');
    const uncertain=structuredClone(checked);uncertain.compositionChecks[0].status='uncertain';
    assert.deepEqual(m.experimentalRepairIssues(uncertain,plan),[]);
    const noPixels=structuredClone(checked);delete noPixels.observedFrames;
    assert.deepEqual(m.experimentalRepairIssues(noPixels,plan),[]);
    const noEndpoint=structuredClone(checked);noEndpoint.evidence.forEach(e=>e.breakout=null);
    assert.deepEqual(m.experimentalRepairIssues(noEndpoint,plan),[]);
    const brokenRoot=structuredClone(checked);brokenRoot.validationErrors.push('observedFrames: ambiguous or overlapping actual frame bounds');
    assert.deepEqual(m.experimentalRepairIssues(brokenRoot,plan),[]);
  });
  test('incoming authored bodies belong to their source in both renderer and QA cast counts',async()=>{
    const input=inputFor({layout:'tall_right_top',reason:'登場を大きく見せて札の発見へつなぐ',heroPanels:[1],breakouts:[{panel:1,part:'ユウの頭と肩',into:2}],bleed:[]});
    input.castList='## ユウ\n## ヒカリ';
    input.scenario=input.scenario.replace('[2コマ目]\n[Camera: 斜め上から俯瞰]\n[EMOTION: NORMAL]\n状況: ユウが幕を支える。\nユウ「確認2」',
      '[2コマ目]\n[Camera: 左上から札とヒカリを見下ろす寄り]\n[EMOTION: SKETCH]\n状況: 1コマ目からユウの頭と肩が上の空間へ越境したまま、ヒカリは札を読む。\nヒカリ「幕の札だ！」');
    const source=m.readExperimentalSource(input);
    const result=await m.prepareExperimentalManga(input,async()=>JSON.stringify(planFor(source)));
    assert.deepEqual(result.plan.expectedCast[0].names,['ユウ']);
    assert.deepEqual(result.plan.expectedCast[1].names,['ヒカリ']);
    const target=result.prompt.split('[PAGE FRAME P2 |')[1].split('[END PAGE FRAME P2]')[0];
    assert.match(target,/CAST COUNT: \[ヒカリ\] each EXACTLY ONCE/);
    assert.doesNotMatch(target,/CAST COUNT:[^\n]*ユウ|ABSENT:[^\n]*ユウ|SOLO:|MONOLOGUE:/);
    assert.match(target,/LOCAL CAST SCOPE:.*\[ユウ\]/);
    assert.ok(result.prompt.includes('1コマ目からユウの頭と肩が上の空間へ越境したまま'),'source artwork staging remains intact');
    assert.equal(result.plan.expectedDialogue[1].speaker,'ヒカリ');
    // Without authored ownership, a visible partial actor is still a required body.
    const legacy={...input,scenario:input.scenario.replace(/^PageComposition:.*\n/,'')};
    const legacySource=m.readExperimentalSource(legacy);
    const legacyPlan=m.validateExperimentalPlan(planFor(legacySource),legacySource);
    assert.deepEqual(legacyPlan.expectedCast[1].names.sort(),['ヒカリ','ユウ']);
  });
  test('invalid bleed, detached breakout and malformed metadata fail before spending on STEP3',async()=>{
    for(const bad of [
      {...composition,bleed:[{panel:3,edges:['left']}]},
      {...composition,breakouts:[{panel:5,part:'頭',into:1}]},
      {...composition,heroPanels:[9]},
      {...composition,layout:'invented'},
    ]) {
      const input=inputFor(bad);
      assert.equal(v.validateMangaScenario(input.scenario,input.castList,{scenarioMode:'experimental-manga'}).ok,false);
      let calls=0;
      await assert.rejects(m.prepareExperimentalManga(input,async()=>{calls++;return '{}';}),/PageComposition/);
      assert.equal(calls,0);
    }
    const input=inputFor();input.scenario=input.scenario.replace(/PageComposition: .*/, 'PageComposition: {broken');
    assert.equal(v.validateMangaScenario(input.scenario,input.castList,{scenarioMode:'experimental-manga'}).ok,false);
  });
  test('legacy scenarios retain ordinary margins and optional breakout semantics',async()=>{
    const input=inputFor(null),source=m.readExperimentalSource(input);
    const result=await m.prepareExperimentalManga(input,async()=>JSON.stringify(planFor(source)));
    assert.equal(result.plan.layout,'two_columns');
    assert.doesNotMatch(result.prompt,/FULL BLEED P/);
    assert.match(result.prompt,/外枠の四辺\/四隅を余白付きで画布内/);
    assert.deepEqual(result.plan.expectedDialogue,source.dialogue);
  });
  test('full-body framing keeps the authored breakout connected across frames instead of containing it',async()=>{
    const input=inputFor({...composition,breakouts:[{panel:3,part:'ユウの頭全体・両肩・右腕',into:1}]});
    input.scenario=input.scenario.replaceAll('斜め上から俯瞰','床すれすれから見上げる全身ショット');
    const source=m.readExperimentalSource(input);
    const result=await m.prepareExperimentalManga(input,async()=>JSON.stringify(planFor(source)));
    const frame=n=>result.prompt.split(`[PAGE FRAME P${n} |`)[1].split(`[END PAGE FRAME P${n}]`)[0];
    assert.doesNotMatch(frame(3),/頭から両靴とその先の床\/頭上余白を枠内|head-to-feet inside panel/);
    assert.match(frame(3),/全身.*ページ内/);
    assert.match(frame(3),/頭全体・両肩・右腕.*P1/);
    assert.match(frame(1),/頭から両靴とその先の床\/頭上余白を枠内/);
    assert.equal(result.plan.panels[2].camera,source.panels[2].camera);
  });
  test('bleed extends behind page lettering with credits on or off while ordinary footer margins stay intact',async()=>{
    for(const showWatermarks of [true,false]) {
      const input={...inputFor(),showWatermarks};
      const source=m.readExperimentalSource(input);
      const result=await m.prepareExperimentalManga(input,async()=>JSON.stringify(planFor(source)));
      assert.doesNotMatch(result.prompt,/FOOTER ONLY, below the last panel|leave (?:the bottom margin|footer) blank/);
      assert.match(result.prompt,/bottom.*artwork|artwork.*bottom/);
      assert.equal(result.plan.expectedDialogue.length,5);
      assert.equal(renderOptions.assertRenderOptions(result.prompt,{mosaicCopyrightedCharacters:false,showWatermarks,showTitle:true}),result.prompt);
      if(showWatermarks) assert.match(result.prompt,/Bottom-left EXACTLY/);
      else assert.match(result.prompt,/watermarks=off/);
    }
    const input={...inputFor(null),showWatermarks:false},source=m.readExperimentalSource(input);
    const result=await m.prepareExperimentalManga(input,async()=>JSON.stringify(planFor(source)));
    assert.match(result.prompt,/leave the bottom margin blank/);
    const topInput={...inputFor({...composition,breakouts:[],bleed:[{panel:1,edges:['top']}]}),showWatermarks:true};
    const topSource=m.readExperimentalSource(topInput);
    const topResult=await m.prepareExperimentalManga(topInput,async()=>JSON.stringify(planFor(topSource)));
    assert.doesNotMatch(topResult.prompt,/Top title EXACTLY[^\n]*白地中央/);
    assert.match(topResult.prompt,/Top title EXACTLY[^\n]*上端/);
    assert.match(topResult.prompt,/FOOTER ONLY: Bottom-left EXACTLY/);
  });
  test('native page-text verification keeps required title but does not require hidden footer credits',async()=>{
    for(const showTitle of [true,false]) {
      const input={...inputFor(),showTitle,showWatermarks:true};input.scenario='## タイトル: 出番\n'+input.scenario;
      const source=m.readExperimentalSource(input);
      const prepared=await m.prepareExperimentalManga(input,async()=>JSON.stringify(planFor(source)));
      const prompt=m.buildExperimentalReviewPrompt(prepared.plan,prepared.source,{...input,finalPrompt:prepared.prompt});
      const frames=m.experimentalLayout(5,prepared.plan.layout).map(r=>({bounds:[.01+.98*r.x,.05+.90*r.y,.98*r.w,.88*r.h]}));
      const result=await m.reviewExperimentalImage({image:{mimeType:'image/png',base64Img:'fixture-only'},plan:prepared.plan,prompt},async()=>({text:JSON.stringify({status:'unverified',pageEvidence:showTitle?'出番。下部の文字は絵に隠れて見えない。':'下部の文字は絵に隠れて見えない。',evidence:[]})}),{detect:async()=>frames,inspect:async()=>({width:2240,height:3168}),crop:async()=>({dataUrl:'fixture-crop'})});
      assert.deepEqual(result.review.expectedPageText,showTitle?['出番']:[]);
      assert.equal(result.review.pageTextOptional,!showTitle);
      assert.notEqual(result.review.status,'pass','a footer waiver does not certify unobserved panels');
    }
  });
  test('composition QA separates visible failure, authorized bleed and missing evidence',()=>{
    const plan={composition};
    const compositionChecks=c.requiredCompositionChecks(plan).map(check=>({...check,status:'pass',observed:'対象人物の輪郭とページ端へ続く背景がはっきり見える。'}));
    assert.equal(c.inspectCompositionChecks({compositionChecks},plan).status,'pass');
    assert.equal(c.inspectCompositionChecks({compositionChecks:[]},plan).status,'uncertain');
    assert.equal(c.inspectCompositionChecks({compositionChecks:compositionChecks.slice(1)},plan).status,'uncertain');
    const failed=structuredClone(compositionChecks);
    failed[2].status='fail';failed[2].observed='指定の右辺に白い余白と外枠線が残り、背景が画布端へ届いていない。';
    assert.equal(c.inspectCompositionChecks({compositionChecks:failed},plan).status,'fail');
    failed[2].observed='';
    assert.equal(c.inspectCompositionChecks({compositionChecks:failed},plan).status,'uncertain');
    assert.equal(c.inspectCompositionChecks({},{}).status,'not_requested');
  });
  test('normal QA requires authored effects and repairs only a grounded missing effect',()=>{
    const source=m.readExperimentalSource(inputFor()),plan=c.applyPageComposition(planFor(source),source);
    const review={status:'pass',observedCount:5,readingOrder:'pass',camera:'pass',style:'pass',story:'pass',anatomy:'pass',pageText:'pass',breakout:'pass',issues:[],pageEvidence:'題字と下部のクレジット全文が読める。',
      compositionChecks:c.requiredCompositionChecks(plan).map(check=>({...check,status:'pass',observed:'指定の人物の輪郭と背景が境界を越えて連続して見える。'})),corrections:[],
      evidence:plan.panels.map((p,i)=>({panel:i+1,camera:'人物の頭頂と肩の上面がはっきり見える。',style:'人物と背景に通常漫画の墨線と網点が見える。',story:'手と布が接続して脚本の主動作を表している。',anatomy:'頭から首と肩が一続きで手足も自然につながる。'}))};
    assert.equal(m.validateExperimentalReview(review,plan).status,'pass');
    const missing={...review,compositionChecks:[]};
    assert.equal(m.validateExperimentalReview(missing,plan).status,'unverified');
    const failed=structuredClone(review);failed.compositionChecks[2].status='fail';
    failed.compositionChecks[2].observed='右外周に白余白と黒枠が残り、布と背景が端へ届かない。';
    failed.corrections=[{type:'page_composition',panel:3,subject:'右タチキリ',observed:failed.compositionChecks[2].observed,expected:'背景と布が右端まで連続する。',correction:'右余白と外枠だけを取り除き、同じ背景と布を画布端までつなぐ。',materialImpact:'material',impactReason:'指定された外周タチキリが描かれていない。'}];
    const checked=m.validateExperimentalReview(failed,plan);
    assert.equal(checked.status,'warning');
    assert.equal(m.experimentalRepairIssues(checked,plan).filter(i=>i.type==='page_composition').length,1);
    failed.compositionChecks[2].status='uncertain';
    assert.equal(m.experimentalRepairIssues(m.validateExperimentalReview(failed,plan),plan).filter(i=>i.type==='page_composition').length,0);
    const optional={...plan};delete optional.composition;
    assert.equal(m.experimentalRepairIssues({...checked,pageComposition:'fail'},optional).filter(i=>i.type==='page_composition').length,0);
  });
} finally {await server.close();}
