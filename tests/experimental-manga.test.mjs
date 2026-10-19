import assert from 'node:assert/strict';
import test from 'node:test';
import { createHash } from 'node:crypto';
import { prepareGeneratedImageSave } from '../src/lib/generated-image-save.js';
import { extractGeneratedImageMetadata } from '../src/lib/generated-image-metadata.js';
import { createServer } from 'vite';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Ajv from 'ajv';

const server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });
try {
  const m = await server.ssrLoadModule('/src/lib/experimental-manga.js');
  const openaiReviewTransport = await server.ssrLoadModule('/src/lib/openai-text.js');
  // Explicit test-only layout response. STEP3 does not add or rewrite beats.
  const planResponse=(_prompt,plan)=>JSON.stringify(plan);
  const {resolvePageWorkflow,applyPageCandidateSelection}=await server.ssrLoadModule('/src/lib/page-workflow.js');
  const {withImageReviewCancellation,createImageReviewBudget,beginApiWork,cancelApiWork}=await server.ssrLoadModule('/src/lib/api-work-cancellation.js');
  const shared = await server.ssrLoadModule('/src/lib/shared-image-quality.js');
  const {runPageImageQuality}=await server.ssrLoadModule('/src/lib/image-quality-failsafe.js');
  const {default:Step3}=await server.ssrLoadModule('/src/components/Step3Panel.jsx');
  const {default:Panel}=await server.ssrLoadModule('/src/components/ExperimentalMangaPanel.jsx');
  test('experimental image uses the normal metadata PNG saver with its generation-time snapshot', async()=>{
    const png='iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl6tZkAAAAASUVORK5CYII=';
    const item={id:123,image:{base64Img:png,mimeType:'image/png',usedModel:'gpt-test'},
      metadataContext:{provider:'openai',scenario:'元の台本',finalPrompt:'approved six panels',inputImages:[],settings:{pageKind:'experimental-manga',panelCount:6}}};
    const saved=await prepareGeneratedImageSave(m.experimentalImageSaveItem(item),'test');
    const metadata=await extractGeneratedImageMetadata(saved.dataUrl);
    assert.ok(JSON.stringify(metadata).includes('approved six panels'));
    assert.ok(JSON.stringify(metadata).includes('元の台本'));
    assert.equal(metadata.settings.panelCount,6);
    assert.throws(()=>m.experimentalImageSaveItem({}),/画像/);
    const legacy=m.experimentalImageSaveItem({id:124,image:item.image});
    assert.equal(legacy.metadataContext,undefined,'old results must not borrow current inputs');
  });
  const scenarioFor = count => Array.from({length:count},(_,i)=>i+1).map(n => `[${n}コマ目]\n[Camera: ${n % 2 ? '強い俯瞰、広角' : '低い位置からアオリ、全身'}]\n[EMOTION: NORMAL]\n状況: 行動${n}\nセリフなし`).join('\n');
  const scenario = scenarioFor(6);
  const input = { enabled: true, scenario, castList: '人物A', colorMode: 'monochrome', images: [] };
  const source = m.readExperimentalSource(input);
  test('experimental reading flow preserves acting and forbids eye-level or viewer eye contact',()=>{
    for(const prompt of [m.buildExperimentalPlanPrompt(source),m.buildExperimentalImagePrompt(six,source,input),m.buildExperimentalReviewPrompt(six,source,input)]) {
      assert.match(prompt,/READING FLOW WITH ACTING/);
      assert.match(prompt,/No eye-level shots/);
      assert.match(prompt,/never look at the viewer or camera lens/);
      assert.match(prompt,/preserve camera strength, drawing quality, style, expression and dramatic energy/);
    }
    const bad=structuredClone(six);bad.panels[1].camera='アイレベルの接写';
    assert.throws(()=>m.validateExperimentalPlan(bad,source),/アイレベル/);
    bad.panels[1].camera='アイレベルではなく、手元を高所から俯瞰';
    const directed=m.readExperimentalSource({...input,scenario:scenario.replace('低い位置からアオリ、全身',bad.panels[1].camera)});
    assert.equal(m.validateExperimentalPlan(bad,directed).count,6);
  });
  test('page direction survives source parsing and a changed request invalidates the prepared page',async()=>{
    const userDirection='完成ページはこの6コマで配置。無言の間を残す。';
    const src=m.readExperimentalSource({...input,userDirection});
    assert.equal(src.userDirection,userDirection);
    assert.ok(m.buildExperimentalPlanPrompt(src).includes(userDirection));
    assert.match(m.buildExperimentalPlanPrompt(src),/count=6|EXACTLY 6/);
    const prepared=await m.prepareExperimentalManga({...input,userDirection},async prompt=>planResponse(prompt,six));
    assert.throws(()=>resolvePageWorkflow({experimentalEnabled:true,prepared,prompt:prepared.prompt,input:{...input,userDirection:'別の演出'}}),/変更/);
    assert.equal(resolvePageWorkflow({experimentalEnabled:true,prepared,prompt:prepared.prompt,input:{...input,userDirection}}).count,6);
  });
  const planFor = count => ({ count, layout:count===4?'strips':'tall_right_middle', reason: '動作と反応に間を置く', panels: Array.from({length:count}, (_,i) => {
    const sourcePanel = i + 1;
    return { sourcePanel, kind:'anchor', camera:source.panels[i%source.panels.length].camera, action:'元の出来事の反応', dialogueIds:[], breakout:null };
  }) });
  const six = planFor(6);
  test('native monochrome frames retain character skin bases without changing color output', () => {
    const castList = '## 葵\n肌: 小麦色\n[WEIGHTS]: (tanned skin:1.2)\n## 凛\n肌: 明るい肌色\n[WEIGHTS]: (fair skin:1.2)';
    const scenario = scenarioFor(6).replaceAll(/行動\d+/g, '葵と凛が木箱を運ぶ。');
    const plan = structuredClone(six);
    plan.panels.forEach(p => { p.action = '葵と凛が木箱を運ぶ。'; });
    const colorSource = m.readExperimentalSource({scenario, castList, colorMode:'color'});
    const color = m.buildExperimentalImagePrompt(plan, colorSource, {colorMode:'color'});
    // Captured before the monochrome-only fix; version text is intentionally normalized.
    assert.equal(createHash('sha256').update(color.replace(/v\d+\.\d+\.\d+/g,'v<VERSION>')).digest('hex'),
      '5951da401a8db0995f364a3e4b3753238f54532d014a327b308308c48813f20f');
    for (const count of [5,6,7,8]) {
      const scenario = scenarioFor(count).replaceAll(/行動\d+/g, '葵と凛が木箱を運ぶ。');
      const source = m.readExperimentalSource({scenario, castList, colorMode:'monochrome'});
      const plan = {...planFor(count), layout:'mixed_rows'};
      plan.panels.forEach(p => { p.action = '葵と凛が木箱を運ぶ。'; });
      const prompt = m.buildExperimentalImagePrompt(plan, source, {colorMode:'monochrome'});
      assert.equal((prompt.match(/WHITE-SKIN\[凛\]:lit=unprinted; shade=screen\/black/g)||[]).length, count);
      assert.equal((prompt.match(/SCREEN-SKIN\[葵\]:base stays in light; no broad patches/g)||[]).length, count);
      assert.doesNotMatch(prompt, /WHITE-SKIN\[葵\]/);
    }
    assert.doesNotMatch(color, /PANEL INK:|WHITE-SKIN\[|SCREEN-SKIN\[/);
  });
  test('native monochrome rendering and review interpret source paint as ink without changing source cameras',()=>{
    const scenario=scenarioFor(6).replaceAll('行動','赤い札を掲げる行動');
    const src=m.readExperimentalSource({...input,scenario});
    const prompt=m.buildExperimentalImagePrompt(six,src,input);
    assert.match(prompt,/SCENE COLOR PRIORITY: keep story and verbatim text; source hues yield to assigned ink\/skin bases/);
    const review=m.buildExperimentalReviewPrompt(six,src,input);
    assert.match(review,/MONOCHROME REVIEW:/);
    assert.match(review,/MONOCHROME THREE-TONE MANUSCRIPT LOCK/);
    const color=m.buildExperimentalReviewPrompt(six,{...src,colorMode:'color'},{...input,colorMode:'color'});
    assert.doesNotMatch(color,/MONOCHROME REVIEW:|MONOCHROME THREE-TONE MANUSCRIPT LOCK/);
    for(const p of six.panels) assert.ok(prompt.includes(p.camera));
    assert.ok(prompt.includes('赤い札を掲げる行動'),'story evidence must not be removed to remove paint directives');
  });
  test('native monochrome cast descriptors strip source chroma and retain the final ink audit',()=>{
    const castList='## 葵\n[WEIGHTS]: (blonde hair:1.2), (pink-tipped hair:1.3), (loose wavy hair:1.2), (tanned skin:1.2)\n## 凛\n[WEIGHTS]: (black hair:1.2), (fair skin:1.2)';
    const src=m.readExperimentalSource({...input,castList});
    const prompt=m.buildExperimentalImagePrompt(six,src,{colorMode:'monochrome'});
    const cast=prompt.split('CAST: ')[1].split('[END REFERENCE CAST DATA]')[0];
    assert.doesNotMatch(cast,/\b(?:pink|blonde|black)\b/i);
    assert.match(cast,/loose wavy hair/);
    assert.match(prompt,/MONOCHROME FINAL CHROMA AUDIT/);
    const color=m.buildExperimentalImagePrompt(six,{...src,colorMode:'color'},{colorMode:'color'});
    assert.match(color,/pink-tipped hair/);
  });
  test('native monochrome shared medium direction cannot reintroduce colored watercolor after ink recipes',()=>{
    const prompt=m.buildExperimentalImagePrompt(six,source,input);
    const direction=prompt.split('Identity is not a frozen drawing style.')[1].split('\nREFERENCES:')[0];
    assert.doesNotMatch(direction,/透明顔料|不透明人物|水彩背景/);
    assert.match(direction,/墨|紙白/);
    for (const panel of six.panels) assert.ok(prompt.includes(panel.camera));
    const color=m.buildExperimentalImagePrompt(six,{...source,colorMode:'color'},{...input,colorMode:'color'});
    assert.match(color,/水彩は顔\/服\/背景すべて透明顔料と紙白/);
  });
  test('all-horizontal strip layouts are excluded for every native count while mixed layouts remain',()=>{
    for(const count of [5,6,7,8]) {
      const nativeSource=m.readExperimentalSource({...input,scenario:scenarioFor(count)});
      const plan={...planFor(count),layout:'strips'};
      assert.ok(!m.experimentalLayoutOptions(count).some(option=>option.id==='strips'));
      assert.doesNotMatch(m.buildExperimentalPlanPrompt(nativeSource),/"id":"strips"/);
      assert.throws(()=>m.experimentalLayout(count,'strips'),/配置/);
      assert.throws(()=>m.validateExperimentalPlan(plan,nativeSource),/配置/);
      assert.equal(m.validateExperimentalPlan({...plan,layout:'mixed_rows'},nativeSource).count,count);
    }
    const oldHistory=[...[5,6,7,8].map(count=>({plan:{count,layout:'strips'}})),{plan:{count:6,layout:'mixed_rows'}}];
    assert.deepEqual(m.summarizeExperimentalLayouts(oldHistory).map(entry=>entry.layout),['mixed_rows']);
    assert.equal(oldHistory.length,5,'saved images and history remain intact');
  });
  test('experimental rendering reuses normal cast-instance and wardrobe contracts without filling silent close-ups with the whole cast',()=>{
    const castList='## ユウ\n### 髪\n[WEIGHTS]: (black hair:1.4)\n### 服装\n[WEIGHTS]: (school uniform:1.3)\n## ナギ\n[WEIGHTS]: (blond hair:1.4)';
    for(const outfit of ['', 'Outfit: ユウは赤いコート、ナギは青い作業着。\n']) {
      const scenario=outfit+[1,2,3,4,5,6].map(n=>`[${n}コマ目]\n[Camera: ${n===2?'手元を見下ろす接写':'ユウの肩越し、後方からナギを見下ろす'}]\n[EMOTION: NORMAL]\n状況: ${n===2?'ユウの手と本だけが見える。':'手前のユウの後頭部と肩。奥のナギが本を開く。'}\nセリフなし`).join('\n');
      const src=m.readExperimentalSource({scenario,castList,colorMode:'color'});
      const plan=structuredClone(six);
      plan.panels.forEach(p=>{p.camera=src.panels[p.sourcePanel-1].camera;p.action='ユウの肩越しにナギが本を開く。';});
      plan.panels[1].action='ユウの手と本だけが見える。';
      const prompt=m.buildExperimentalImagePrompt(plan,src,{colorMode:'color'});
      assert.match(prompt,/CAST COUNT:.*\[ユウ\].*\[ナギ\].*EXACTLY ONCE/);
      assert.match(prompt,/OTS CAST INSTANCE LOCK:.*\[ユウ\]/);
      const insert=prompt.split('[PAGE FRAME P2 |')[1].split('[END PAGE FRAME P2]')[0];
      assert.match(insert,/ABSENT: do NOT draw \[ナギ\]/);
      assert.match(insert,/手元を見下ろす接写/);
      const cast=prompt.split('CAST: ')[1].split('SOURCE FACTS')[0];
      assert.match(cast,/black hair/);
      if(outfit)assert.doesNotMatch(cast,/school uniform/);
      else assert.match(cast,/school uniform/);
    }
  });
  test('native silent panels preserve the source physical roster and people depicted in a photo',()=>{
    const castList='## ユウ\n## ナギ\n## ソラ';
    const scenario=[1,2,3,4,5,6].map(n=>`[${n}コマ目]\n[Camera: ユウの肩越しに見下ろす]\n[EMOTION: NORMAL]\n状況: ユウとナギが再生画面を見る。再生画面には三人全員の写真が見える。ソラは画角外にいる。\nセリフなし`).join('\n');
    const src=m.readExperimentalSource({scenario,castList});
    const plan=structuredClone(six);
    plan.panels.forEach(p=>{p.camera=src.panels[p.sourcePanel-1].camera;p.action='ユウとナギが再生画面を見る。再生画面には三人全員の写真が見える。ソラの顔が笑っている。';});
    const prompt=m.buildExperimentalImagePrompt(plan,src,{});
    const insert=prompt.split('[PAGE FRAME P2 |')[1].split('[END PAGE FRAME P2]')[0];
    assert.match(insert,/CAST COUNT: \[ユウ\], \[ナギ\] each EXACTLY ONCE/);
    assert.match(insert,/PHYSICALLY ABSENT: \[ソラ\]/);
    assert.match(insert,/DIEGETIC REPLICA LAYER:.*\[ソラ\]/);
  });
  test('layout history retains recurring structures across intervening four-panel checks',()=>{
    const records=[5,6,6,4,4].map(count=>({plan:planFor(count)}));
    const history=m.summarizeExperimentalLayouts(records);
    assert.equal(history.length,3);
    assert.equal(history.filter(p=>p.layout==='tall_right_middle').length,3);
    assert.equal(history[0].geometry,m.experimentalLayoutFingerprint(records[0].plan));
    assert.equal(m.summarizeExperimentalLayouts([...records,...records]).length,6);
    const prompt=m.buildExperimentalPlanPrompt(source,{recentLayouts:history});
    assert.match(prompt,/compatible layout IDs, including a non-spanning arrangement/);
    assert.match(prompt,/wide frames can contain full-body depth; tall frames are not mandatory/);
    assert.match(prompt,/Recent geometries are context, not quotas/);
    assert.match(m.EXPERIMENTAL_LAYOUTS.mixed_rows.description,/6=\[\[2,0\.20\],\[1,0\.30\],\[2,0\.23\],\[1,0\.27\]\]/);
    assert.match(m.EXPERIMENTAL_LAYOUTS.tall_right_middle.description,/count5=0\.77/);
  });
  test('named cast cannot invent or reuse bodies absent from blind physical inventory',()=>{
    const report={inspectionVersion:3,status:'pass',observedCount:6,readingOrder:'pass',camera:'pass',style:'pass',story:'pass',anatomy:'pass',pageText:'pass',breakout:'not_requested',issues:[],pageEvidence:'原画のタイトルと左右のクレジット',evidence:six.panels.map((_,i)=>({panel:i+1,camera:'頭頂と肩の上面が見える',style:'顔の輪郭と陰影が明瞭',story:'人物の動作と道具が整合',anatomy:'両手と肩の接続が連続',physical_bodies:[{id:'body1',bounds:[0.1,0.1,0.5,0.8],features:['黒い短髪','赤いコート']}],cast_instances:[{name:'甲',observed_count:1,status:'ok',instances:[{body_id:'body1',location:'中央',matched_features:['黒い短髪','赤いコート']}]}]}))};
    const plan={...six,expectedCast:six.panels.map((_,i)=>({panel:i+1,names:['甲']}))};
    assert.equal(m.validateExperimentalReview(report,plan).status,'pass');
    for(const count of [5,6,7,8]) {
      const candidatePlan=count===6?plan:{...planFor(count),layout:'two_columns'};
      const candidate={...report,observedCount:count,evidence:Array.from({length:count},(_,index)=>({...structuredClone(report.evidence[0]),panel:index+1}))};
      const strips=Array.from({length:count},(_,index)=>({bounds:[.03,.06+index*.84/count,.94,.8/count]}));
      candidate.observedFrames=strips;
      candidate.evidence.forEach((entry,index)=>{entry.bounds=strips[index].bounds;});
      assert.equal(m.validateExperimentalReview(candidate,candidatePlan).status,'warning');
      const mixed=structuredClone(candidate);
      const rects=m.experimentalLayout(count,'mixed_rows');
      mixed.observedFrames=rects.map(rect=>({bounds:[.02+.96*rect.x,.05+.9*rect.y,.96*rect.w,.88*rect.h]}));
      mixed.evidence.forEach((entry,index)=>{entry.bounds=mixed.observedFrames[index].bounds;});
      assert.equal(m.validateExperimentalReview(mixed,candidatePlan).status,'pass');
    }
    const compound=structuredClone(report);compound.evidence[0].physical_bodies[0].features=['黒い短髪、赤いコート'];
    assert.equal(m.validateExperimentalReview(compound,plan).status,'pass','comma-delimited observed cues do not lose their independent meaning');
    compound.evidence[0].physical_bodies[0].features=['人物'];
    assert.equal(m.validateExperimentalReview(compound,plan).status,'unverified','a single vague cue remains insufficient');
    const staged=structuredClone(report);staged.inspectionVersion=4;
    for(const panel of staged.evidence) panel.view={elevation:'high',gaze:'in_scene',evidence:'頭頂と机の上面が見え、顔は向かいの相手に向く'};
    assert.equal(m.validateExperimentalReview(staged,plan).status,'pass');
    for(const view of [{elevation:'eye_level',gaze:'in_scene'},{elevation:'high',gaze:'at_viewer'}]) {
      const forbidden=structuredClone(staged);Object.assign(forbidden.evidence[0].view,view);
      assert.equal(m.validateExperimentalReview(forbidden,plan).camera,'fail');
    }
    const uncertain=structuredClone(staged);delete uncertain.evidence[0].view;
    assert.equal(m.validateExperimentalReview(uncertain,plan).status,'unverified');
    const hiddenEyes=structuredClone(staged);hiddenEyes.evidence[0].view.gaze='no_visible_eyes';
    assert.equal(m.validateExperimentalReview(hiddenEyes,plan).status,'pass','hands-only or rear-view shots need no forced visible eyes');
    const invented=structuredClone(report);invented.evidence[0].cast_instances[0].instances[0].body_id='unseen';
    const rejected=m.validateExperimentalReview(invented,plan);
    assert.equal(rejected.status,'unverified');
    assert.equal(rejected.inspectionVersion,3);
    const rechecked=m.validateExperimentalReview(rejected,plan);
    assert.deepEqual(rechecked.validationErrors,rejected.validationErrors,'retaining diagnostics must not manufacture new validation failures');
    assert.deepEqual(rechecked.issues,rejected.issues,'rechecking must not turn structured cast evidence into missing evidence');
    assert.deepEqual(rejected.evidence[0].physical_bodies,report.evidence[0].physical_bodies);
    const detailed=structuredClone(invented);
    detailed.evidence[0].physical_bodies=Array.from({length:8},(_,i)=>({...report.evidence[0].physical_bodies[0],id:`b${i}`}));
    const retained=m.validateExperimentalReview(detailed,plan);
    assert.deepEqual(retained.evidence[0].physical_bodies,detailed.evidence[0].physical_bodies);
    const reused=structuredClone(report);reused.evidence[0].cast_instances.push({name:'乙',observed_count:1,status:'ok',instances:[{body_id:'body1',location:'中央',matched_features:['黒い短髪','赤いコート']}]});
    assert.equal(m.validateExperimentalReview(reused,plan).status,'unverified');
    const missing=structuredClone(report);delete missing.evidence[0].physical_bodies;
    assert.equal(m.validateExperimentalReview(missing,plan).status,'unverified');
  });
  const currentPairReview=()=>({inspectionVersion:4,status:'pass',observedCount:6,readingOrder:'pass',camera:'pass',style:'pass',story:'pass',anatomy:'pass',pageText:'pass',breakout:'not_requested',issues:[],pageEvidence:'原画のタイトルと左右のクレジット',evidence:six.panels.map((_,i)=>({panel:i+1,camera:'頭頂と肩の上面が見える',style:'顔の輪郭と陰影が明瞭',story:'人物の動作と道具が整合',anatomy:'両手と肩の接続が連続',view:{elevation:'high',gaze:'in_scene',evidence:'人物は机を見下ろし頭頂と肩上面が見える'},physical_bodies:[],cast_instances:[]}))});
  const blindGaze=(i=0)=>({eye_visibility:'visible',direction:'in_scene',eye_position:[.25+i*.4,.25],
    eye_evidence:i?'虹彩は瞼の左下へ寄り、右側の白目が広く見える。':'黒目が瞼の右下へ寄り、左側の白目が広く見える。',
    face_direction:i?'首を自然に傾けて顔の左側を台へ向ける。':'横向きの顔を右下の台へ向けている。',
    target:{description:'二人の間にある赤い計測器の表示面。',position:[.5,.65]}});
  const styledReview=()=>{
    const report=currentPairReview();report.inspectionVersion=9;
    report.expectedOutfits={global:'',panels:six.panels.map((_,i)=>({panel:i+1,outfit:''}))};
    report.wardrobe_observation={status:'pass',evidence:'各人物の見える上着を参照と照合し、コマ間でも同じ形を保っている。',issues:[]};
    report.expectedStyles=six.panels.map((_,i)=>({panel:i+1,style:i===2?'WATERCOLOR':'GEKIGA'}));
    report.evidence.forEach((e,i)=>{e.style_observation={medium:report.expectedStyles[i].style,status:'pass',evidence:'背景と衣服に指定媒体の筆触が明瞭に見える。',actors:[]};});
    report.evidence[0].physical_bodies=['left','right'].map((id,i)=>({id,bounds:[.1+i*.4,.1,.3,.8],features:['短い黒髪','白い作業服'],gaze:blindGaze(i)}));
    report.evidence[0].style_observation.actors=['left','right'].map(body_id=>({body_id,medium:'GEKIGA',status:'pass',face_visibility:'visible',face:'小さい虹彩と厚い瞼、鼻梁と頬骨の立体が見える。',shading:'鼻側面と頬に細い斜線が交差し紙の隙間が残る。'}));
    return report;
  };
  const wardrobeReview=()=>{
    const report=styledReview();report.inspectionVersion=9;
    report.expectedOutfits={global:'人物Aは灰色のジャケットと黒いパンツ。',castNames:['人物A','人物B'],panels:six.panels.map((_,i)=>({panel:i+1,outfit:''}))};
    report.evidence[0].cast_instances=[{name:'人物A',observed_count:1,status:'ok',instances:[{body_id:'left',location:'左側',matched_features:['短い黒髪','丸い眼鏡']}]}];
    report.wardrobe_observation={status:'pass',evidence:'見える上着と脚の服を指定と照合し、他の人物は参照衣装を保つ。',issues:[]};
    return report;
  };
  const castCoverageReview=()=>{
    const report=styledReview();
    report.evidence.forEach(e=>{e.physical_bodies=[];e.cast_instances=[];e.style_observation.actors=[];});
    const panel=report.evidence[3];
    panel.physical_bodies=['near','far'].map((id,i)=>({id,bounds:[.1+i*.4,.1,.3,.8],features:['黒い長髪','紫のローブ'],gaze:blindGaze(i)}));
    panel.cast_instances=[{name:'人物A',observed_count:1,status:'ok',instances:[{body_id:'near',location:'左前景の独立した身体',matched_features:['黒い長髪','紫のローブ']}]}];
    panel.style_observation.actors=['near','far'].map(body_id=>({body_id,medium:'GEKIGA',status:'pass',face_visibility:'visible',face:'小さい虹彩と厚い瞼、鼻梁と頬骨の立体が見える。',shading:'鼻側面と頬に細い斜線が交差し紙の隙間が残る。'}));
    return report;
  };
  const castCoveragePlan={...six,expectedCast:six.panels.map((_,i)=>({panel:i+1,names:i===3?['人物A']:[]}))};
  const backgroundDisposition=()=>({body_id:'far',kind:'non_cast',observed_features:['短い白髪','緑の作業着'],evidence:'背景の人物は短い白髪と緑の作業着で、人物Aの黒い長髪と紫のローブとは異なる。'});
  test('native cast coverage cannot pass an unmapped body from the independent census',()=>{
    const report=castCoverageReview(),original=structuredClone(report);
    const checked=m.validateExperimentalReview(report,castCoveragePlan);
    assert.equal(checked.anatomy,'uncertain');assert.equal(checked.status,'unverified');
    assert.match(checked.issues.join('\n'),/far.*人物対応/);
    assert.deepEqual(report,original,'coverage verification preserves the original observations');
    assert.ok(!checked.issues.some(issue=>/Expected exactly one|2体/.test(issue)),'unmapped does not prove duplication');
    const legacy={...report,inspectionVersion:7};
    assert.equal(m.validateExperimentalReview(legacy,castCoveragePlan).anatomy,'uncertain','old evidence cannot hide an unbound observed body');
  });
  test('native cast coverage allows grounded background bodies and preserves cropped identity uncertainty',()=>{
    const report=castCoverageReview(),panel=report.evidence[3];
    panel.physical_bodies[1].features=['短い白髪','緑の作業着'];
    panel.body_dispositions=[backgroundDisposition()];
    assert.equal(m.validateExperimentalReview(report,castCoveragePlan).status,'pass');
    for(const damage of [
      e=>{e.body_dispositions=[];},
      e=>{e.body_dispositions[0].kind='uncertain';},
      e=>{e.body_dispositions[0].evidence='背景';},
      e=>{e.body_dispositions[0].observed_features=['奥にいる'];},
      e=>{e.body_dispositions[0].observed_features=['別の髪型','別の服'];},
      e=>{e.body_dispositions[0].observed_features=['短い白髪','短い白髪'];},
      e=>{e.body_dispositions[0].body_id='missing';},
      e=>{e.body_dispositions.push({...e.body_dispositions[0]});},
      e=>{e.body_dispositions.push({...e.body_dispositions[0],body_id:'near'});},
      e=>{e.body_dispositions=[];e.cast_instances.push({name:'勝手に追加した人物名',observed_count:1,status:'ok',instances:[{body_id:'far',location:'右後列の身体',matched_features:['短い白髪','緑の作業着']}]});},
    ]) {
      const copy=structuredClone(report);damage(copy.evidence[3]);
      assert.equal(m.validateExperimentalReview(copy,castCoveragePlan).anatomy,'uncertain');
    }
    const cropped=structuredClone(report);cropped.evidence[3].physical_bodies[1].features=['袖だけが見える'];
    cropped.evidence[3].body_dispositions=[{body_id:'far',kind:'uncertain',observed_features:['袖だけが見える'],evidence:'顔と胴体は画角外で袖のみ見え、人物Aか背景人物かは同定できない。'}];
    const checked=m.validateExperimentalReview(cropped,castCoveragePlan);
    assert.equal(checked.anatomy,'uncertain');assert.notEqual(checked.status,'warning');
    const malformed=structuredClone(report);malformed.evidence[3].camera='pass';
    assert.deepEqual(m.validateExperimentalReview(malformed,castCoveragePlan).evidence[3].body_dispositions,panel.body_dispositions,
      'other malformed observations cannot discard the actual identity dispositions');
  });
  test('native cast coverage preserves a grounded duplicate alongside an unresolved body',()=>{
    const report=castCoverageReview(),panel=report.evidence[3];
    panel.cast_instances[0].observed_count=2;panel.cast_instances[0].status='defect';
    panel.cast_instances[0].instances.push({body_id:'far',location:'右後列の独立した身体',matched_features:['黒い長髪','紫のローブ']});
    panel.physical_bodies.push({id:'partial',bounds:[.8,.8,.1,.1],features:['白い袖だけが見える']});
    panel.body_dispositions=[{body_id:'partial',kind:'uncertain',observed_features:['白い袖だけが見える'],evidence:'腕だけが画角内に見え、どの人物につながるかは不明。'}];
    const checked=m.validateExperimentalReview(report,castCoveragePlan);
    assert.equal(checked.anatomy,'fail');assert.equal(checked.status,'warning');
    assert.match(checked.issues.join('\n'),/observed 2/);
  });
  test('native cast coverage prompt assesses every census body without forcing background people into the cast',()=>{
    const prompt=m.buildExperimentalReviewPrompt(six,source,input);
    assert.match(prompt,/body_dispositions/);
    assert.match(prompt,/Never stop after the first identity match/);
    assert.match(prompt,/ordinary background people/);
    assert.match(prompt,/uncertain.*not.*duplicate/i);
  });
  const explicitWardrobeIssue=()=>({panel:1,subject:'人物A',reason:'指定パンツが見えるスカートに置き換わった。',material_impact:'material',impact_reason:'指定された衣装の種類と脚部の構成が変わっている。',
    wardrobe_evidence:{basis:'approved_outfit',component:'脚部の衣服',difference_kind:'component_state',expected_scope:'global',expected_quote:'人物Aは灰色のジャケットと黒いパンツ。',later_body_id:'left',
      later_location:'人物Aの露出している腰から膝',later_state:'青いプリーツスカートと露出した脚',later_visibility:'clear',matched_features:['短い黒髪','丸い眼鏡'],scripted_change:'none'}});
  test('native wardrobe rejects a visible single-panel conflict with the authoritative outfit',()=>{
    const report=wardrobeReview();report.evidence[0].physical_bodies[0].features=['短い黒髪','丸い眼鏡','青いプリーツスカート'];
    report.wardrobe_observation.issues=[explicitWardrobeIssue()];
    const checked=m.validateExperimentalReview(report,six);
    assert.equal(checked.story,'fail');assert.equal(checked.status,'warning');
    assert.match(checked.issues.join('\n'),/衣装/);
  });
  test('native wardrobe keeps unseen regions, ambiguous authority and scripted changes out of repair',()=>{
    for(const patch of [{later_visibility:'cropped'},{later_visibility:'occluded'},{scripted_change:'present'},
      {expected_quote:'別人の衣装を誤って引用'},{expected_scope:'panel'},{later_body_id:'missing'},{matched_features:['one cue']}]) {
      const report=wardrobeReview(),issue=explicitWardrobeIssue();Object.assign(issue.wardrobe_evidence,patch);report.wardrobe_observation.issues=[issue];
      const checked=m.validateExperimentalReview(report,six);assert.equal(checked.story,'uncertain');assert.notEqual(checked.status,'warning');
    }
    const harmless=wardrobeReview(),issue=explicitWardrobeIssue();issue.material_impact='minor_variation';issue.impact_reason='同じ服の皺と照明の差だけで構成は一致。';harmless.wardrobe_observation.issues=[issue];
    assert.equal(m.validateExperimentalReview(harmless,six).status,'pass');
    const changed=wardrobeReview();changed.expectedOutfits.panels[0].outfit='人物Aは雨具に着替える。';
    assert.equal(m.validateExperimentalReview(changed,six).status,'pass','observed compliant scripted outfit changes are allowed');
  });
  test('native wardrobe requires observations and preserves their evidence after validation failure',()=>{
    const report=wardrobeReview();delete report.wardrobe_observation;
    assert.equal(m.validateExperimentalReview(report,six).story,'uncertain');
    const broken=wardrobeReview();broken.wardrobe_observation.issues=[explicitWardrobeIssue()];broken.evidence[0].camera='pass';
    const checked=m.validateExperimentalReview(broken,six);assert.equal(checked.status,'unverified');
    assert.deepEqual(checked.wardrobe_observation,broken.wardrobe_observation);
    assert.deepEqual(checked.expectedOutfits,broken.expectedOutfits);
  });
  test('native wardrobe reuses grounded cross-panel continuity and retains harmless changes',()=>{
    const report=wardrobeReview();
    const first=report.evidence[0],later=report.evidence[2];
    later.physical_bodies=[{...structuredClone(first.physical_bodies[0]),id:'later',features:['短い黒髪','丸い眼鏡','新しい肩掛け紐']}];
    later.cast_instances=[{...structuredClone(first.cast_instances[0]),instances:[{body_id:'later',location:'中央',matched_features:['短い黒髪','丸い眼鏡']}]}];
    later.style_observation.actors=[{...first.style_observation.actors[0],body_id:'later',medium:'WATERCOLOR'}];
    const issue={panel:3,subject:'人物A',reason:'同じ人物の露出した肩の衣服が変わっている。',material_impact:'material',impact_reason:'同じ場面の衣装構成が別の構成へ置き換わった。',
      wardrobe_evidence:{basis:'cross_panel',component:'肩掛け紐',difference_kind:'component_state',first_panel:1,first_body_id:'left',later_body_id:'later',
        first_location:'人物Aの両肩',later_location:'人物Aの両肩',first_state:'紐のない上着',later_state:'両肩に新しい幅広の紐',
        first_visibility:'clear',later_visibility:'clear',matched_features:['短い黒髪','丸い眼鏡'],scripted_change:'none'}};
    report.wardrobe_observation.issues=[issue];
    assert.equal(m.validateExperimentalReview(report,six).story,'fail');
    const scripted=structuredClone(report);scripted.expectedOutfits.panels[2].outfit='人物Aは青い雨具に着替える。';
    assert.equal(m.validateExperimentalReview(scripted,six).story,'uncertain','model scripted_change:none cannot negate a compiler-owned outfit change');
    for(const patch of [{first_visibility:'occluded'},{later_visibility:'cropped'},{scripted_change:'present'},{first_body_id:'missing'}]) {
      const copy=structuredClone(report);Object.assign(copy.wardrobe_observation.issues[0].wardrobe_evidence,patch);
      assert.equal(m.validateExperimentalReview(copy,six).story,'uncertain');
    }
    const allowed=structuredClone(report);allowed.wardrobe_observation.issues=[];
    allowed.wardrobe_observation.evidence='人物Aは台本どおり上着を着替え、見える各部品も指定に一致している。';
    assert.equal(m.validateExperimentalReview(allowed,six).status,'pass');
  });
  test('native wardrobe authority cannot transfer another actor panel outfit or hide the unchanged global outfit',()=>{
    const report=wardrobeReview();report.expectedOutfits.panels[0].outfit='人物Bは青い雨具。';
    const issue=explicitWardrobeIssue();issue.wardrobe_evidence.expected_scope='panel';issue.wardrobe_evidence.expected_quote=report.expectedOutfits.panels[0].outfit;
    report.wardrobe_observation.issues=[issue];
    assert.equal(m.validateExperimentalReview(report,six).story,'uncertain','B panel outfit does not apply to A');
    issue.wardrobe_evidence.expected_scope='global';issue.wardrobe_evidence.expected_quote=report.expectedOutfits.global;
    assert.equal(m.validateExperimentalReview(report,six).story,'fail','B-only override does not disable A global instruction');
    for(const outfit of ['受付係は青い雨具。','人物A以外は青い雨具。','人物Bは青い雨具。受付係は白い制服。']) {
      report.expectedOutfits.panels[0].outfit=outfit;
      assert.equal(m.validateExperimentalReview(report,six).story,'uncertain','unresolved role/exclusion scopes cannot become material defects');
    }
  });
  test('native wardrobe evidence quotes only the subject instruction in a multi-actor scope',()=>{
    const report=wardrobeReview(),issue=explicitWardrobeIssue();
    report.expectedOutfits.global+='人物Bは青い雨具。';
    issue.wardrobe_evidence.expected_quote=report.expectedOutfits.global;
    report.wardrobe_observation.issues=[issue];
    assert.equal(m.validateExperimentalReview(report,six).story,'uncertain','whole-scope quotation cannot ground another actor clothing');
    issue.wardrobe_evidence.expected_quote='人物Bは青い雨具。';
    assert.equal(m.validateExperimentalReview(report,six).story,'uncertain','another actor clause cannot become this actor expectation');
    issue.wardrobe_evidence.expected_quote='人物Aは灰色のジャケットと黒いパンツ。';
    assert.equal(m.validateExperimentalReview(report,six).story,'fail','exact applicable actor clause still grounds a visible material difference');
  });
  test('native review shares the wardrobe contract and preserves separate outfit scopes',()=>{
    const scoped=m.readExperimentalSource({...input,scenario:'Outfit: 人物Aは赤い作業着。\n'+scenario.replace('[3コマ目]','[3コマ目]\n[Outfit: 人物Aは青い雨具に着替える。]')});
    const prompt=m.buildExperimentalReviewPrompt(six,scoped,input);
    assert.match(prompt,/WARDROBE CONTINUITY CHECK:/);assert.match(prompt,/OUTFIT SCOPE:/);
    assert.match(prompt,/basis=approved_outfit/);
    const authority=JSON.parse(prompt.match(/^EXPECTED OUTFIT SCOPES: (.+)$/m)[1]);
    assert.equal(authority.global,'人物Aは赤い作業着。');assert.equal(authority.panels[2].outfit,'人物Aは青い雨具に着替える。');
    assert.equal(authority.panels[1].outfit,'');
    const report=wardrobeReview();report.expectedOutfits.panels[0].outfit='人物Aは青い雨具に着替える。';
    report.wardrobe_observation.issues=[explicitWardrobeIssue()];
    assert.equal(m.validateExperimentalReview(report,six).story,'uncertain','an old global expectation cannot override a local costume change');
    report.wardrobe_observation.issues[0].wardrobe_evidence.expected_scope='panel';
    report.wardrobe_observation.issues[0].wardrobe_evidence.expected_quote=report.expectedOutfits.panels[0].outfit;
    assert.equal(m.validateExperimentalReview(report,six).story,'fail','a visible conflict with the actual local instruction remains detectable');
  });
  test('blind body gaze rejects the observed narrative in_scene claim without inventing eye observations',()=>{
    const report=styledReview();
    report.evidence[5].view={elevation:'high',gaze:'in_scene',evidence:'高所から全員の頭頂と目線が水平器へ集まっている。'};
    report.evidence[5].physical_bodies=[{id:'p6_1',bounds:[.18,.21,.13,.61],features:['long black hair','grey suit','arms folded']}];
    const checked=m.validateExperimentalReview(report,six);
    assert.equal(checked.camera,'uncertain','the actual assessment claim has no independent pupil/eyelid observations');
    assert.equal(checked.status,'unverified');
    assert.equal(checked.evidence[5].view.gaze,'uncertain');
  });
  test('blind gaze preserves natural head tilt, side gaze and concretely invisible rear heads',()=>{
    const report=styledReview();report.evidence[0].view.gaze='at_viewer';
    const checked=m.validateExperimentalReview(report,six);
    assert.equal(checked.camera,'pass','assessment cannot override body-bound independent in-scene eye evidence');
    assert.equal(checked.evidence[0].view.gaze,'in_scene');
    for(const description of ['水平器','机上のコップ','cup']) {
      const brief=styledReview();brief.evidence[0].physical_bodies[0].gaze.target.description=description;
      assert.equal(m.validateExperimentalReview(brief,six).camera,'pass','a short visible object name with coordinates is sufficient target evidence');
    }
    for(const eye_evidence of ['後頭部の髪だけが見え、目と瞼は頭の裏側で見えない。','手首と指だけが切り取られ、頭部と目はコマ外にある。']) {
      const hidden=styledReview();hidden.evidence[0].physical_bodies[0].gaze={eye_visibility:'not_visible',direction:'no_visible_eyes',eye_position:null,
        eye_evidence,face_direction:null,target:null};
      assert.equal(m.validateExperimentalReview(hidden,six).camera,'pass');
    }
  });
  test('blind gaze fails closed on missing, misplaced or boilerplate evidence but preserves a grounded viewer violation',()=>{
    for(const damage of [
      body=>{delete body.gaze;},body=>{body.gaze.eye_position=[.99,.99];},body=>{body.gaze.target.position=[-1,.5];},
      body=>{body.gaze.target.description='   ';},
      body=>{body.gaze.target=null;},body=>{body.gaze.eye_evidence='顔が正面で首が傾いている。';body.gaze.direction='at_viewer';},
      body=>{body.gaze.eye_evidence='虹彩が見えていて対象へ向いている。';},
      body=>{body.gaze.eye_visibility='occluded';},body=>{body.gaze.eye_visibility='too_small';},
    ]) {
      const report=styledReview();damage(report.evidence[0].physical_bodies[0]);
      const checked=m.validateExperimentalReview(report,six);
      assert.equal(checked.camera,'uncertain');assert.equal(checked.status,'unverified');
    }
    const repeated=styledReview();Object.assign(repeated.evidence[0].physical_bodies[1].gaze,{eye_evidence:blindGaze().eye_evidence,face_direction:blindGaze().face_direction});
    assert.equal(m.validateExperimentalReview(repeated,six).camera,'uncertain','copying the same anatomical prose cannot establish two independent gaze observations');
    const violation=styledReview();Object.assign(violation.evidence[0].physical_bodies[0].gaze,{direction:'at_viewer',
      eye_evidence:'両眼の虹彩が瞼の中央にあり、視軸が紙面の外の読者へ向く。',target:null});
    delete violation.evidence[0].physical_bodies[1].gaze;
    const checked=m.validateExperimentalReview(violation,six);
    assert.equal(checked.camera,'fail');assert.equal(checked.status,'warning');
    assert.ok(checked.issues.some(issue=>issue.includes('left')&&issue.includes('カメラ目線')));
    assert.deepEqual(m.validateExperimentalReview(JSON.parse(JSON.stringify(checked)),six),checked,'saved evidence must retain the same grounded failure after a JSON round trip');
  });
  test('style review binds every visible body to the expected panel medium instead of accepting one successful actor',()=>{
    assert.equal(m.validateExperimentalReview(styledReview(),six).style,'pass');
    const mismatch=styledReview();
    Object.assign(mismatch.evidence[0].style_observation.actors[1],{medium:'NORMAL',status:'fail',face:'眼鏡越しの大きな虹彩と省略された小さい鼻が見える。',shading:'頬は滑らかな色面で顔の交差斜線がない。'});
    assert.equal(m.validateExperimentalReview(mismatch,six).style,'fail');
    const leak=styledReview();leak.evidence[2].style_observation.medium='GEKIGA';
    assert.equal(m.validateExperimentalReview(leak,six).style,'fail','a neighboring medium cannot pass in a watercolor panel');
    const missing=styledReview();missing.evidence[0].style_observation.actors.pop();
    assert.equal(m.validateExperimentalReview(missing,six).style,'uncertain');
    const reused=styledReview();reused.evidence[0].style_observation.actors[1].body_id='left';
    assert.equal(m.validateExperimentalReview(reused,six).style,'uncertain');
    const absent=styledReview();delete absent.expectedStyles;
    assert.equal(m.validateExperimentalReview(absent,six).style,'uncertain','a model verdict cannot supply the missing expected contract');
  });
  test('hidden or tiny faces remain unverified without becoming a style failure or erasing a confirmed mismatch',()=>{
    for(const face_visibility of ['hidden','too_small','uncertain']) {
      const report=styledReview();Object.assign(report.evidence[0].style_observation.actors[0],{face_visibility,status:'fail',medium:'uncertain'});
      const checked=m.validateExperimentalReview(report,six);
      assert.equal(checked.style,'uncertain');assert.equal(checked.status,'unverified');
      assert.deepEqual(m.validateExperimentalReview(checked,six),checked);
      report.evidence[0].style_observation.actors[1].status='fail';
      assert.equal(m.validateExperimentalReview(report,six).style,'fail','visible material mismatch survives another hidden face');
    }
  });
  test('style assessment prompt carries source-derived panel media and body-bound observation requirements',()=>{
    const mixed=m.readExperimentalSource({...input,scenario:scenario.replace('[EMOTION: NORMAL]','[EMOTION: GEKIGA]')});
    const prompt=m.buildExperimentalReviewPrompt(six,mixed,input);
    const styles=JSON.parse(prompt.match(/^EXPECTED PANEL STYLES: (.+)$/m)?.[1]||'null');
    assert.deepEqual(styles,six.panels.map((p,i)=>({panel:i+1,style:p.sourcePanel===1?'GEKIGA':'NORMAL'})));
    assert.match(prompt,/style_observation/);assert.match(prompt,/face_visibility/);
  });
  test('partial body observations remain uncertain but comparable; confirmed regressions remain blocked',async()=>{
    const original={plan:six,review:currentPairReview(),image:{base64Img:'old'},prompt:'same',groupId:'same'};
    const partial=currentPairReview();
    partial.evidence[0].physical_bodies=[{id:'partly-hidden',bounds:[.2,.3,.1,.1],features:['短い赤髪']}];
    const reviewed=m.validateExperimentalReview(partial,six);
    assert.equal(reviewed.status,'unverified');
    assert.equal(reviewed.anatomy,'uncertain');
    assert.equal(reviewed.validationErrors?.length||0,0,'one visible cue is incomplete identification, not broken data');
    let options;
    const next={...original,review:reviewed,image:{base64Img:'new'}};
    const selected=await m.selectExperimentalCandidate(original,next,async(a,b,p,o)=>{options=o;return {preferred:'repair',reason:'奥の人物同定は未確認だが、前景の演技と構図が改善。'};});
    assert.equal(selected.candidate,next.image);
    assert.equal(selected.selectedReview.pass,false,'comparison must not promote uncertainty to a full pass');
    assert.ok(selected.selectedReview.issues.some(i=>i.type==='unverified'));
    assert.equal(options.allowIncomplete,true);
    assert.ok(options.candidateUncertainties.repair.includes('anatomy'));
    for(const bad of [
      {...reviewed,anatomy:'fail',status:'warning',issues:['肩から腕が三本に分岐している。']},
    ]) {
      const kept=await m.selectExperimentalCandidate(original,{...next,review:bad},()=>{throw Error('must not compare known regression');});
      assert.equal(kept.candidate,original.image);assert.equal(kept.comparison.status,'not_compared');
    }
  });
  const censusComparisonCase=()=>{
    const plan={...six,layout:'two_columns',expectedDialogue:[{id:0,text:'右の言葉'},{id:1,text:'左の返事'}],
      expectedCast:[{panel:1,names:['甲']}],panels:six.panels.map((p,i)=>({...p,dialogueIds:i===0?[0,1]:[]}))};
    const review=currentPairReview();
    review.observedFrames=m.experimentalLayout(plan.count,plan.layout).map(r=>({bounds:[.01+r.x*.98,.02+r.y*.96,r.w*.96,r.h*.94]}));
    review.evidence.forEach((e,i)=>{
      e.bounds=review.observedFrames[i].bounds;
      e.center=[e.bounds[0]+e.bounds[2]/2,e.bounds[1]+e.bounds[3]/2];
      e.dialogue=i===0?['右の言葉','左の返事']:[];
      e.text_regions=i===0?[{region_kind:'speech_balloon',text:'右の言葉',center_x:.8},{region_kind:'speech_balloon',text:'左の返事',center_x:.2}]:[];
    });
    review.evidence[0].physical_bodies=[{id:'body1',bounds:[.1,.1,.2,.6],features:['黒い短髪','赤いコート']}];
    review.evidence[0].cast_instances=[{name:'甲',observed_count:1,status:'ok',instances:[{body_id:'body1',location:'右側の身体',matched_features:['黒い短髪','赤いコート']}]}];
    const checks={original:plan.panels.map((_,i)=>({panel:i+1,status:'pass'})),repair:plan.panels.map((_,i)=>({panel:i+1,status:'pass'}))};
    return {plan,review,checks,original:{plan,review,image:{base64Img:'old'},prompt:'same',groupId:'same'}};
  };
  test('census quarantine permits comparison with intact independent reading without certifying anatomy',async()=>{
    for(const damage of [
      e=>e.physical_bodies.push({id:'outside',bounds:[.2,.55,.4,.72],features:['短い髪','青い服']}),
      e=>e.physical_bodies.push({id:'broken',bounds:[.1,.2],features:['短い髪']}),
      e=>e.physical_bodies.push({...e.physical_bodies[0]}),
      e=>e.cast_instances[0].instances[0].body_id='unsupported',
      e=>e.cast_instances.push({...structuredClone(e.cast_instances[0]),name:'乙'}),
      e=>{e.physical_bodies=null;e.cast_instances={};},
    ]) {
      const {plan,review,checks,original}=censusComparisonCase();
      assert.equal(m.validateExperimentalReview(review,plan).status,'pass');
      const broken=structuredClone(review);damage(broken.evidence[0]);
      const untouched=structuredClone(broken);
      const checked=m.validateExperimentalReview(broken,plan);
      assert.equal(checked.status,'unverified');assert.equal(checked.anatomy,'uncertain');
      assert.deepEqual(checked.validationErrors||[],[],'census uncertainty must not disable independent image comparison');
      assert.deepEqual(checked.observedFrames,review.observedFrames);
      for(const key of ['bounds','text_regions','dialogue']) assert.deepEqual(checked.evidence[0][key],review.evidence[0][key]);
      assert.deepEqual(broken,untouched,'validation must not mutate the stored raw observation');
      assert.deepEqual(m.validateExperimentalReview(checked,plan),checked,'quarantine must survive repeated validation');
      assert.ok(!checked.evidence[0].physical_bodies?.some(body=>['outside','broken'].includes(body.id)));
      let comparisons=0;
      const next={...original,image:{base64Img:'new'},review:checked};
      const selected=await m.selectExperimentalCandidate(original,next,async(a,b,p,options)=>{
        comparisons++;
        assert.deepEqual(options.readingEvidence.repair[0].dialogue,review.evidence[0].dialogue);
        assert.deepEqual(options.readingEvidence.repair[0].balloons,review.evidence[0].text_regions.map(({text,center_x})=>({text,center_x})));
        assert.ok(options.candidateUncertainties.repair.includes('anatomy'));
        assert.doesNotMatch(JSON.stringify(options),/physical_bodies|cast_instances|unsupported|"outside"|"broken"/);
        return {preferred:'repair',reason:'台詞を保ち、演技が明瞭。',readingOrderChecks:checks};
      });
      assert.equal(comparisons,1);assert.equal(selected.candidate,next.image);
      assert.equal(selected.comparison.status,'completed');assert.equal(selected.selectedReview.pass,false);
    }
  });
  test('census quarantine preserves grounded duplicates and independent anatomy failures',async()=>{
    for(const duplicate of [true,false]) {
      const {plan,review,original}=censusComparisonCase();
      const broken=structuredClone(review),e=broken.evidence[0];
      e.physical_bodies.push({id:'outside',bounds:[.9,.9,.8,.8],features:['短い髪','青い服']});
      e.cast_instances.push({name:'乙',observed_count:1,status:'ok',instances:[{body_id:'outside',location:'画像外と申告された身体',matched_features:['短い髪','青い服']}]});
      if(duplicate) {
        e.physical_bodies.push({...structuredClone(e.physical_bodies[0]),id:'body2',bounds:[.5,.1,.2,.6]});
        e.cast_instances[0].observed_count=2;
        e.cast_instances[0].instances.push({...structuredClone(e.cast_instances[0].instances[0]),body_id:'body2',location:'左側の別の身体'});
      } else {broken.anatomy='fail';broken.issues=['肩から腕が三本に分岐している。'];}
      const checked=m.validateExperimentalReview(broken,plan);
      assert.equal(checked.anatomy,'fail');assert.equal(checked.status,'warning');
      assert.deepEqual(checked.validationErrors||[],[]);
      assert.deepEqual(m.validateExperimentalReview(checked,plan),checked);
      if(duplicate) assert.ok(checked.issues.some(issue=>issue.includes('observed 2')));
      const selected=await m.selectExperimentalCandidate(original,{...original,image:{base64Img:'bad'},review:checked},()=>{throw Error('known failure must not be compared away');});
      assert.equal(selected.candidate,original.image);assert.equal(selected.comparison.status,'not_compared');
    }
  });
  test('census quarantine preserves grounded duplicates within a partially invalid actor record',async()=>{
    for(const validCount of [2,1]) {
      const {plan,review,checks,original}=censusComparisonCase();
      const broken=structuredClone(review),e=broken.evidence[0],actor=e.cast_instances[0];
      if(validCount===2) {
        e.physical_bodies.push({...structuredClone(e.physical_bodies[0]),id:'body2',bounds:[.5,.1,.2,.6]});
        actor.instances.push({...structuredClone(actor.instances[0]),body_id:'body2',location:'左側の別の身体'});
      }
      actor.instances.push({...structuredClone(actor.instances[0]),body_id:'not-observed',location:'対応未確認の身体'});
      actor.observed_count=actor.instances.length;
      const checked=m.validateExperimentalReview(broken,plan);
      assert.equal(checked.anatomy,validCount===2?'fail':'uncertain');
      assert.equal(checked.status,validCount===2?'warning':'unverified');
      assert.equal(checked.evidence[0].cast_instances,null,'an incomplete actor inventory must not become a certified exact count');
      assert.deepEqual(checked.validationErrors||[],[]);
      assert.deepEqual(m.validateExperimentalReview(checked,plan),checked,'partial census handling must remain stable');
      assert.deepEqual(checked.evidence[0].dialogue,review.evidence[0].dialogue);
      if(validCount===2) {
        assert.ok(checked.issues.some(issue=>issue.includes('少なくとも2体')));
        const retained=await m.selectExperimentalCandidate(original,{...original,image:{base64Img:'bad'},review:checked},()=>{throw Error('a supported duplicate must not be compared away');});
        assert.equal(retained.candidate,original.image);assert.equal(retained.comparison.status,'not_compared');
        const selected=await m.selectExperimentalCandidate({...original,review:checked},{...original,groupId:'different'},()=>{throw Error('different groups must not be compared');});
        assert.equal(selected.selectedReview.pass,false);
        assert.ok(selected.selectedReview.issues.some(issue=>issue.type==='experimental_quality'&&issue.reason.includes('少なくとも2体')));
      } else {
        assert.ok(!checked.issues.some(issue=>issue.includes('少なくとも')));
        const next={...original,image:{base64Img:'new'},review:checked};
        const selected=await m.selectExperimentalCandidate(original,next,async()=>({preferred:'repair',reason:'台詞を保ち、演技が明瞭。',readingOrderChecks:checks}));
        assert.equal(selected.candidate,next.image);assert.equal(selected.comparison.status,'completed');
        assert.equal(selected.selectedReview.pass,false);
        assert.ok(selected.selectedReview.issues.every(issue=>issue.type==='unverified'));
      }
    }
  });
  test('census quarantine never bypasses missing reading, invalid frames, or a confirmed reading regression',async()=>{
    for(const damage of [e=>{e.dialogue=null;},e=>{e.dialogue.reverse();},e=>{e.bounds=[.9,.9,.8,.8];}]) {
      const {plan,review,original}=censusComparisonCase();
      const broken=structuredClone(review);
      broken.evidence[0].physical_bodies=null;damage(broken.evidence[0]);
      const checked=m.validateExperimentalReview(broken,plan);
      const selected=await m.selectExperimentalCandidate(original,{...original,image:{base64Img:'bad'},review:checked},()=>{throw Error('independent reading gate must remain closed');});
      assert.equal(selected.candidate,original.image);assert.equal(selected.comparison.status,'not_compared');
    }
  });
  test('census quarantine revalidates only exact legacy errors with preserved physical reading evidence',async()=>{
    const {plan,review,checks,original}=censusComparisonCase();
    const legacy=structuredClone(review);
    legacy.status='unverified';legacy.evidence[0].physical_bodies[0].bounds=[.2,.55,.4,.72];
    legacy.validationErrors=['evidence[1].physical_bodies: missing or invalid independent census','evidence[1].cast_instances: unsupported or reused body_id'];
    const checked=m.validateExperimentalReview(legacy,plan);
    assert.deepEqual(checked.validationErrors||[],[]);
    assert.deepEqual(m.validateExperimentalReview(checked,plan),checked);
    const old={...original,review:legacy};let inspections=0;
    await m.reviewExperimentalCandidatePair({base64Img:'fresh'},{...old,review:{...legacy,inspectionVersion:9}},async()=>{inspections++;return {};});
    assert.equal(inspections,1,'a quarantined census must not start another inspection of the old image');
    const next={...original,image:{base64Img:'fresh'}};
    const selected=await m.selectExperimentalCandidate(old,next,async()=>({preferred:'repair',reason:'台詞を保ち、演技が明瞭。',readingOrderChecks:checks}));
    assert.equal(selected.candidate,next.image);assert.equal(selected.comparison.status,'completed');
    for(const damage of [
      value=>value.validationErrors.push('evidence[1].view: missing or invalid projection/gaze evidence'),
      value=>value.validationErrors.push('evidence[1].physical_bodies: different unknown validation error'),
      value=>{delete value.observedFrames;for(const e of value.evidence){delete e.bounds;delete e.text_regions;}},
    ]) {
      const incomplete=structuredClone(legacy);damage(incomplete);
      const retained=await m.selectExperimentalCandidate(original,{...next,review:incomplete},()=>{throw Error('other errors and lost physical reading must remain blocked');});
      assert.equal(retained.candidate,original.image);assert.equal(retained.comparison.status,'not_compared');
    }
  });
  test('comparison retains physical reading evidence and rejects a contradictory or missing order judgment',async()=>{
    const plan={...six,expectedDialogue:[{id:0,text:'右の言葉'},{id:1,text:'左の返事'}],
      panels:six.panels.map((p,i)=>({...p,dialogueIds:i===0?[0,1]:[]}))};
    const review=currentPairReview();
    const rects=m.experimentalLayout(plan.count,plan.layout);
    review.evidence.forEach((e,i)=>{e.dialogue=i===0?['右の言葉','左の返事']:[];
      e.center=[rects[i].x+rects[i].w/2,rects[i].y+rects[i].h/2];
      e.text_regions=i===0?[{region_kind:'speech_balloon',text:'右の言葉',center_x:.8},{region_kind:'speech_balloon',text:'左の返事',center_x:.2}]:[];});
    assert.deepEqual(m.validateExperimentalReview(review,plan).validationErrors||[],[]);
    const original={plan,review,image:{base64Img:'old'},prompt:'approved',groupId:'same'};
    const next={...original,image:{base64Img:'new'}};
    const checks={original:plan.panels.map((_,i)=>({panel:i+1,status:'pass'})),repair:plan.panels.map((_,i)=>({panel:i+1,status:'pass'}))};
    let received;
    const valid=await m.selectExperimentalCandidate(original,next,async(a,b,p,options)=>{
      received=options.readingEvidence;
      return {preferred:'repair',reason:'台詞順を保ち、表情と描線が明瞭。',readingOrderChecks:checks};
    });
    assert.deepEqual(received?.repair[0].dialogue,['右の言葉','左の返事']);
    assert.deepEqual(received?.repair[0].balloons.map(b=>b.center_x),[.8,.2]);
    assert.equal(valid.candidate,next.image);assert.equal(valid.comparison.status,'completed');
    const kept=await m.selectExperimentalCandidate(original,next,async()=>({preferred:'original',reason:'両画像の台詞順は正しく、以前の絵の表情が明瞭。',readingOrderChecks:checks}));
    assert.equal(kept.candidate,original.image);assert.equal(kept.comparison.status,'completed');
    for(const wrong of [undefined,{...checks,repair:checks.repair.map((c,i)=>({...c,status:i===0?'fail':'pass'}))},
      {...checks,repair:checks.repair.map((c,i)=>i===1?checks.repair[0]:c)}]) {
      const result=await m.selectExperimentalCandidate(original,next,async()=>({preferred:'original',reason:'新画像の左右が逆',readingOrderChecks:wrong}));
      assert.equal(result.candidate,original.image);
      assert.equal(result.comparison.status,'not_compared','unsupported hard-condition claims are not a verified best-candidate comparison');
      assert.match(result.comparison.reason,/読順|根拠/);
    }
  });
  test('candidate selection retains confirmed warnings and shared STEP4 does not mislabel them as uncertainty',async()=>{
    for(const defect of [true,false]) {
      const review={...currentPairReview(),status:'unverified',observedCount:null,anatomy:defect?'fail':'uncertain',issues:[defect?'腕が肩から分岐して三本ある。':'人物の身体が隠れて確認できません。']};
      const original={image:{base64Img:'old'},plan:six,review,prompt:'same',groupId:'same'};
      const selection=await m.selectExperimentalCandidate(original,{...original,groupId:'other'},()=>{throw Error('unrelated candidates must not be compared');});
      assert.equal(selection.selectedReview.issues[0].type,defect?'experimental_quality':'unverified');
      const log=[];
      const outcome=await runPageImageQuality({kind:'experimental-manga',count:6},{mode:'experimental-manga',allowRepair:false,
        originalCandidate:original.image,originalPrompt:'same',reviewCandidate:async()=>selection.selectedReview,
        onProgress:line=>log.push(line),generateCandidate:()=>{throw Error('automatic regeneration is disabled');}});
      assert.equal(outcome.candidate,original.image);
      if(defect) {assert.match(log.join('\n'),/自動修正OFF/);assert.doesNotMatch(log.join('\n'),/未確認のみで明確な欠陥がない/);}
      else assert.match(log.join('\n'),/未確認のみ/);
    }
  });
  test('candidate review pair starts necessary old and new inspections together before either completes',async()=>{
    const old={base64Img:'old'},fresh={base64Img:'new'};
    const original={image:old,plan:six,review:{...currentPairReview(),evidence:[]},prompt:'same',groupId:'same'};
    const started=[],finish=[];
    const pending=m.reviewExperimentalCandidatePair(fresh,original,async(image,signal)=>{
      started.push(image); await new Promise(resolve=>finish.push(resolve)); signal.throwIfAborted();
      image.experimentalReview=currentPairReview(); return {pass:true,issues:[]};
    });
    await new Promise(resolve=>setImmediate(resolve));
    assert.deepEqual(started,[fresh,old],'old inspection must not receive only the time left after the new inspection');
    finish.forEach(resolve=>resolve());
    assert.equal((await pending).pass,true);
    let compared=0;
    const selected=await m.selectExperimentalCandidate(original,{...original,image:fresh,review:fresh.experimentalReview},async()=>{compared++;return {preferred:'repair',reason:'演技と構図が改善し、台詞と人物を維持している。'};});
    assert.equal(compared,1);assert.equal(selected.candidate,fresh);assert.equal(selected.comparison.status,'completed');
  });
  test('parallel candidate reviews share one QA budget while normal two-stage inspections succeed',async t=>{
    t.mock.timers.enable({apis:['setTimeout','Date'],now:0});
    const frames=m.experimentalLayout(six.count,six.layout).map(r=>({bounds:[.01+.98*r.x,.05+.90*r.y,.98*r.w,.88*r.h]}));
    const regionTools={detect:async()=>frames,inspect:async()=>({width:2240,height:3168}),crop:async()=>({dataUrl:'test-crop'})};
    const fresh={mimeType:'image/png',base64Img:'new'},old={mimeType:'image/png',base64Img:'old'};
    const original={image:old,plan:six,review:{...currentPairReview(),evidence:[]}};
    const calls=[],progress=[],budget=createImageReviewBudget();
    const result=budget.run(signal=>m.reviewExperimentalCandidatePair(fresh,original,async(image,signal,reviewContext)=>{
      const response=await m.reviewExperimentalImage({image,plan:six,prompt:'Review test-only pixels',signal,reviewContext,
        onPhaseProgress:message=>progress.push(message)},async(_prompt,_images,requestSignal,options)=>{
          calls.push({candidate:image.base64Img,options,started:Date.now(),signal:requestSignal});
          await new Promise((resolve,reject)=>{
            const timer=setTimeout(resolve,45_000);
            requestSignal.addEventListener('abort',()=>{clearTimeout(timer);reject(new DOMException('stop','AbortError'));},{once:true});
          });
          return {text:JSON.stringify({...styledReview(),evidence:styledReview().evidence.map(e=>({...e,text_regions:[]}))}),finishReason:'stop'};
        },regionTools);
      return response;
    },signal)).then(value=>({value}),error=>({error}));
    await new Promise(resolve=>setImmediate(resolve));
    assert.equal(calls.length,2,'both independent inventories start together');
    t.mock.timers.tick(45_000);
    await new Promise(resolve=>setImmediate(resolve));
    assert.equal(calls.length,4,'each assessment starts once after its own inventory');
    t.mock.timers.tick(45_000);
    const completed=await result;
    assert.equal(completed.error,undefined,'two parallel inspections finish within the shared 600-second budget');
    assert.equal(completed.value.requests,2);
    assert.ok(calls.every(call=>call.options.timeoutMs===undefined),'provider limits are not overridden by a review timer');
    assert.ok(calls.every(call=>call.options.responseFormat==='json_object'));
    assert.ok(calls.every(call=>!call.signal.aborted));
    assert.ok(progress.some(message=>/inventory/.test(message)&&/共有する残り時間/.test(message)));
    assert.ok(progress.some(message=>/assessment/.test(message)&&/共有する残り時間/.test(message)));
    assert.equal(budget.elapsedMs,90_000,'parallel candidates consume wall time only once');
  });
  test('assessment shares the remaining QA budget and rejects its late response after expiry',async t=>{
    t.mock.timers.enable({apis:['setTimeout','Date'],now:0});
    const frames=m.experimentalLayout(six.count,six.layout).map(r=>({bounds:[.01+.98*r.x,.05+.90*r.y,.98*r.w,.88*r.h]}));
    const regionTools={detect:async()=>frames,inspect:async()=>({width:2240,height:3168}),crop:async()=>({dataUrl:'test-crop'})};
    const calls=[],progress=[],budget=createImageReviewBudget();let lateResolve;
    const pending=budget.run(workSignal=>m.reviewExperimentalCandidatePair({mimeType:'image/png',base64Img:'kept'},null,(_image,signal,reviewContext)=>
      m.reviewExperimentalImage({image:_image,plan:six,prompt:'Test-only review',signal,reviewContext,onPhaseProgress:message=>progress.push(message)},
        async(_prompt,_images,requestSignal,options)=>{
          calls.push({signal:requestSignal,options});
          if(calls.length===1) {
            await new Promise(resolve=>setTimeout(resolve,90_000));
            return {text:'{"pageEvidence":"observed lettering","evidence":[]}',finishReason:'stop'};
          }
          return await new Promise(resolve=>{lateResolve=resolve;});
        },regionTools),workSignal)).then(value=>({value}),error=>({error}));
    await new Promise(resolve=>setImmediate(resolve));
    t.mock.timers.tick(90_000);
    await new Promise(resolve=>setImmediate(resolve));
    assert.equal(calls.length,2);
    assert.equal(calls[1].options.timeoutMs,undefined,'the shared signal bounds the phase without resetting a new provider timer');
    assert.ok(progress.some(message=>/assessment/.test(message)&&/共有する残り時間/.test(message)));
    t.mock.timers.tick(509_999);
    assert.ok(calls.every(call=>!call.signal.aborted),'assessment may use the remaining budget');
    t.mock.timers.tick(1);
    const result=await pending;
    assert.equal(result.error?.code,'IMAGE_REVIEW_TIMEOUT');
    assert.ok(calls.every(call=>call.signal.aborted));
    lateResolve({text:'{"status":"pass"}',finishReason:'stop'});
    await new Promise(resolve=>setImmediate(resolve));
    assert.equal(result.value,undefined,'late results never replace the deadline outcome');
    assert.equal(calls.length,2,'expiry does not add retries');
  });
  test('strict review schemas preserve honest unknowns and reject the observed nested panel hierarchy',async()=>{
    const frames=m.experimentalLayout(six.count,six.layout).map(r=>({bounds:[.01+.98*r.x,.05+.90*r.y,.98*r.w,.88*r.h]}));
    const tools={detect:async()=>frames,inspect:async()=>({width:2240,height:3168}),crop:async()=>({dataUrl:'test-crop'})};
    const formats=[];
    await m.reviewExperimentalImage({image:{mimeType:'image/png',base64Img:'test-only'},plan:six,prompt:'Test-only review',useStructuredOutput:true},
      async(_prompt,_images,_signal,options)=>{formats.push(options.responseFormat);return {text:'{"pageEvidence":null,"evidence":[]}',finishReason:'stop'};},tools);
    assert.deepEqual(formats.map(format=>format?.type),['json_schema','json_schema']);
    const originalFetch=globalThis.fetch,bodies=[];
    try {
      globalThis.fetch=async(_url,init)=>{bodies.push(JSON.parse(init.body));return Response.json({choices:[{finish_reason:'stop',message:{content:'{}'}}]});};
      for(const responseFormat of formats)await openaiReviewTransport.requestOpenAIChatCompletion({modelId:'gpt-4.1',messages:[],apiKey:'test-only-credential',timeoutMs:1000,responseFormat});
      assert.deepEqual(bodies.map(body=>body.response_format),formats,'both real phase schemas survive the provider boundary unchanged');
    } finally {globalThis.fetch=originalFetch;}
    const ajv=new Ajv({allErrors:true});
    const [inventory,assessment]=formats.map(format=>{
      assert.equal(format.json_schema.strict,true);
      const check=schema=>{
        const types=[].concat(schema.type||[]);
        if(types.includes('object')) {
          assert.equal(schema.additionalProperties,false);
          assert.deepEqual([...schema.required].sort(),Object.keys(schema.properties).sort());
          Object.values(schema.properties).forEach(check);
        }
        if(types.includes('array'))check(schema.items);
      };
      check(format.json_schema.schema);return ajv.compile(format.json_schema.schema);
    });
    const census={pageEvidence:null,evidence:[{panel:3,physical_bodies:null,text_regions:null}]};
    assert.equal(inventory(census),true,JSON.stringify(inventory.errors));
    const body={id:'p3b1',bounds:[.1,.1,.4,.7],features:['黒い長髪','灰色の上着'],gaze:null};
    census.evidence[0].physical_bodies=[body];census.evidence[0].text_regions=[];
    assert.equal(inventory(census),true,JSON.stringify(inventory.errors));
    body.gaze=blindGaze();assert.equal(inventory(census),true,JSON.stringify(inventory.errors));
    const nestedEyes=structuredClone(census);nestedEyes.evidence[0].gaze=nestedEyes.evidence[0].physical_bodies[0].gaze;
    delete nestedEyes.evidence[0].physical_bodies[0].gaze;
    assert.equal(inventory(nestedEyes),false,'independent eye evidence belongs only to its existing physical body');
    const panel={panel:3,camera:'やや高い位置から台の上面が見える。',style:'淡い水彩の筆触が顔と衣服にも見える。',story:null,anatomy:null,breakout:null,
      view:{elevation:'high',gaze:'in_scene',evidence:'人物は台の水平器へ視線を向ける。'},
      style_observation:{medium:'WATERCOLOR',status:'pass',evidence:'顔と衣服に淡彩と紙の白が見える。',actors:[{
        body_id:'p3b1',medium:'WATERCOLOR',status:'pass',face_visibility:'visible',face:'細い目と真っすぐな口の輪郭が見える。',shading:'頬に薄い水彩の重なりが見える。'}]},
      body_dispositions:[],cast_instances:[{name:'人物甲',observed_count:1,status:'ok',evidence:null,
        instances:[{body_id:'p3b1',location:'左奥に立つ人物',matched_features:['黒い長髪','灰色の上着']}]}],text_regions:[],dialogue:null};
    const report={status:'unverified',observedCount:null,readingOrder:'uncertain',camera:'uncertain',style:'uncertain',story:'uncertain',anatomy:'uncertain',pageText:'uncertain',breakout:'not_requested',issues:['細部を確認できない。'],pageEvidence:null,evidence:[panel],wardrobe_observation:null};
    assert.equal(assessment(report),true,JSON.stringify(assessment.errors));
    const missingWardrobe=structuredClone(report);delete missingWardrobe.wardrobe_observation;
    assert.equal(assessment(missingWardrobe),false,'clothing observation cannot silently disappear from the native review schema');
    const missingCoverage=structuredClone(report);delete missingCoverage.evidence[0].body_dispositions;
    assert.equal(assessment(missingCoverage),false,'unbound body dispositions must be requested in every assessment');
    const background=structuredClone(report);background.evidence[0].body_dispositions=[backgroundDisposition()];
    assert.equal(assessment(background),true,JSON.stringify(assessment.errors));
    background.evidence[0].body_dispositions[0].kind='ignore';
    assert.equal(assessment(background),false,'unexamined census bodies cannot be dismissed with an arbitrary label');
    const garment=structuredClone(report);garment.wardrobe_observation={status:'uncertain',evidence:'脚部の衣服が台の後ろへ隠れて確認できない。',issues:[]};
    assert.equal(assessment(garment),true,JSON.stringify(assessment.errors));
    const original=structuredClone(report);
    assert.equal(assessment(report),true);assert.deepEqual(report,original,'schema validation never fills or relocates observations');
    const nested=structuredClone(report);
    for(const key of ['style_observation','cast_instances']) {nested.evidence[0].view[key]=nested.evidence[0][key];delete nested.evidence[0][key];}
    assert.equal(assessment(nested),false,'the actual P3 view nesting violates the transmitted schema');
    assert.ok(assessment.errors.some(error=>error.keyword==='additionalProperties'));
    const unknown=structuredClone(report);Object.assign(unknown.evidence[0],{view:null,style_observation:null,cast_instances:null,camera:null,style:null});
    assert.equal(assessment(unknown),true,JSON.stringify(assessment.errors));
    const invalid=structuredClone(report);invalid.style={status:'pass'};
    assert.equal(assessment(invalid),false,'a root verdict cannot become an object');
    invalid.style='pass';invalid.evidence[0].panel='3';assert.equal(assessment(invalid),false,'panel IDs cannot silently change type');
  });
  test('five and eight panel reviews keep exactly two JSON requests with provider limits and stop prevents the next phase',async()=>{
    for(const useStructuredOutput of [false,true]) for(const count of [5,8]) {
      const plan={...six,count,layout:'mixed_rows'};
      const frames=m.experimentalLayout(count,plan.layout).map(r=>({bounds:[.01+.98*r.x,.05+.90*r.y,.98*r.w,.88*r.h]}));
      const regionTools={detect:async()=>frames,inspect:async()=>({width:2240,height:3168}),crop:async()=>({dataUrl:'test-crop'})};
      const image={mimeType:'image/png',base64Img:'test-only'},calls=[];
      await m.reviewExperimentalImage({image,plan,prompt:'Test-only review',useStructuredOutput},async(_prompt,_images,_signal,options)=>{
        calls.push(options);return {text:'{"pageEvidence":"observed lettering","evidence":[]}',finishReason:'stop'};
      },regionTools);
      assert.equal(calls.length,2);
      assert.ok(calls.every(options=>(useStructuredOutput?options.responseFormat?.type==='json_schema':options.responseFormat==='json_object')&&options.timeoutMs===undefined));
      const controller=new AbortController();let stoppedCalls=0;
      await assert.rejects(m.reviewExperimentalImage({image,plan,prompt:'Test-only review',signal:controller.signal,useStructuredOutput},async()=>{
        stoppedCalls++;controller.abort();return {text:'{"status":"pass"}',finishReason:'stop'};
      },regionTools),error=>error.name==='AbortError');
      assert.equal(stoppedCalls,1,'user cancellation never starts the assessment');
    }
  });
  test('candidate review pair reuses valid current evidence and never inspects another prepared group',async()=>{
    const original={image:{base64Img:'old'},plan:six,review:styledReview()};
    let requests=0;
    for(const previous of [original,null]) {
      await m.reviewExperimentalCandidatePair({},previous,async()=>{requests++;return {pass:true,issues:[]};});
    }
    assert.equal(requests,2,'only each new image requires a review');
  });
  test('candidate review pair refreshes prior body-coverage and layout inspection versions',async()=>{
    for(const inspectionVersion of [7,8]) {
      const original={image:{base64Img:'old'},plan:six,review:{...styledReview(),inspectionVersion}};
      const fresh={base64Img:'new'},started=[];
      await m.reviewExperimentalCandidatePair(fresh,original,async image=>{
        started.push(image);image.experimentalReview=styledReview();return {pass:true,issues:[]};
      });
      assert.deepEqual(started,[fresh,original.image]);
      assert.equal(original.review.inspectionVersion,9);
    }
  });
  test('candidate review pair preserves provider timeout failures and does not claim a comparison',async()=>{
    const signals=[];
    const original={image:{},plan:six,review:{...currentPairReview(),evidence:[]},groupId:'same',prompt:'same'};
    await assert.rejects(m.reviewExperimentalCandidatePair({},original,async(_image,signal)=>{
      signals.push(signal);throw Object.assign(new Error('provider response timeout'),{code:'TIMEOUT'});
    }),error=>error.code==='TIMEOUT');
    assert.equal(signals.length,2,'one request per candidate; no automatic timeout retries');
    const selection=await m.selectExperimentalCandidate(original,{...original,image:{},review:currentPairReview()},async()=>{throw new Error('must not compare incomplete evidence');});
    assert.equal(selection.comparison.status,'not_compared');
  });
  test('candidate review pair propagates cancellation and preserves a completed new review when old review fails',async()=>{
    const original={image:{base64Img:'old'},plan:six,review:{...currentPairReview(),evidence:[]}};
    const logs=[];
    const result=await m.reviewExperimentalCandidatePair({},original,async image=>{
      if(image===original.image)throw new Error('old review unavailable');return {pass:true,issues:[]};
    },undefined,{onProgress:message=>logs.push(message)});
    assert.equal(result.pass,true);assert.ok(logs.some(message=>message.includes('未完了')));
    const controller=new AbortController(),signals=[];
    const pending=m.reviewExperimentalCandidatePair({},original,async(_image,signal)=>{signals.push(signal);return new Promise(()=>{});},controller.signal);
    await new Promise(resolve=>setImmediate(resolve));controller.abort();
    await assert.rejects(pending,error=>error.name==='AbortError');
    assert.ok(signals.every(signal=>signal.aborted));
  });
  test('candidate comparison refreshes an older inspection contract before comparing verdicts',async()=>{
    const image={base64Img:'old'},nextImage={base64Img:'new'};
    const base={status:'pass',observedCount:6,readingOrder:'pass',camera:'pass',style:'pass',story:'pass',anatomy:'pass',pageText:'pass',breakout:'not_requested',issues:[],pageEvidence:'原画のタイトルと左右のクレジット',evidence:six.panels.map((_,i)=>({panel:i+1,camera:'頭頂と肩の上面が見える',style:'顔の輪郭と陰影が明瞭',story:'人物の動作と道具が整合',anatomy:'両手と肩の接続が連続'}))};
    const original={image,plan:six,review:base,prompt:'same',groupId:'same'};
    const next={...original,image:nextImage,review:{...base,inspectionVersion:1,readingOrder:'fail',status:'warning',issues:['順序違反']}};
    let refreshes=0,comparisons=0;
    const result=await m.selectExperimentalCandidate(original,next,async()=>{comparisons++;return {preferred:'repair'};},undefined,async actual=>{assert.equal(actual,image);refreshes++;return {...base,inspectionVersion:1};});
    assert.equal(refreshes,1);assert.equal(comparisons,0);assert.equal(result.candidate,image);
    await m.selectExperimentalCandidate(original,next,async()=>{comparisons++;},undefined,async()=>{refreshes++;});
    assert.equal(refreshes,1,'current inspection must not be repeated');
    for(const refresh of [async()=>{throw new Error('offline');},async()=>null]) {
      const rejected=await m.selectExperimentalCandidate(original,{...next,review:{...next.review,inspectionVersion:2}},async()=>{comparisons++;return {preferred:'repair'};},undefined,refresh);
      assert.equal(rejected.candidate,image,'failed or incomplete refresh preserves the known image');
    }
    assert.equal(comparisons,0);
  });
  test('same-version malformed prior evidence is refreshed once before candidate comparison',async()=>{
    const base={inspectionVersion:1,status:'pass',observedCount:6,readingOrder:'pass',camera:'pass',style:'pass',story:'pass',anatomy:'pass',pageText:'pass',breakout:'not_requested',issues:[],pageEvidence:'原画のタイトルと左右のクレジット',evidence:six.panels.map((_,i)=>({panel:i+1,camera:'頭頂と肩の上面が見える',style:'顔の輪郭と陰影が明瞭',story:'人物の動作と道具が整合',anatomy:'両手と肩の接続が連続'}))};
    let refreshes=0,comparisons=0;
    const old={base64Img:'old'},fresh={base64Img:'new'};
    const original={image:old,plan:six,review:{...base,evidence:[]},prompt:'same',groupId:'same'};
    const next={...original,image:fresh,review:base};
    const selected=await m.selectExperimentalCandidate(original,next,async()=>{comparisons++;return {preferred:'repair',reason:'New candidate retains the verified conditions and improves acting.'};},undefined,async()=>{refreshes++;return base;});
    assert.equal(refreshes,1);assert.equal(comparisons,1);assert.equal(selected.candidate,fresh);
    const broken={...original,review:{...base,evidence:[]}};
    const retained=await m.selectExperimentalCandidate(broken,next,async()=>{throw new Error('must not compare unknown evidence');},undefined,async()=>{refreshes++;return null;});
    assert.equal(retained.candidate,old);assert.equal(retained.selectedReview.pass,false);
  });
  test('retaining an image never resurrects a stale pass when the new review is incomplete',async()=>{
    const base={inspectionVersion:2,status:'pass',observedCount:6,readingOrder:'pass',camera:'pass',style:'pass',story:'pass',anatomy:'pass',pageText:'pass',breakout:'not_requested',issues:[],pageEvidence:'原画のタイトルと左右のクレジット',evidence:six.panels.map((_,i)=>({panel:i+1,camera:'頭頂と肩の上面が見える',style:'顔の輪郭と陰影が明瞭',story:'人物の動作と道具が整合',anatomy:'両手と肩の接続が連続'}))};
    const old={base64Img:'old',experimentalReview:base},fresh={base64Img:'new'};
    const original={image:old,plan:six,review:base,prompt:'same',groupId:'same'};
    let calls=0;
    const selection=await m.selectExperimentalCandidate(original,{...original,image:fresh,review:{...base,inspectionVersion:3,evidence:[]}},async()=>{calls++;},undefined,async()=>{calls++;});
    const applied=applyPageCandidateSelection({candidate:fresh,finalReview:{pass:false,issues:[]},history:[],canContinue:true},selection,{pass:true,issues:[]});
    assert.equal(applied.candidate,old);
    assert.equal(applied.finalReview.pass,false,'old pass is invalid after its inspection contract changes');
    assert.equal(old.experimentalReview.status,'unverified','history must retain the invalidated verdict with the image');
    assert.ok(applied.finalReview.issues.some(issue=>issue.type==='unverified'));
    assert.equal(calls,0,'an unusable new candidate needs neither comparison nor another paid review');
    const same={...original,review:base,image:{base64Img:'same',experimentalReview:base}};
    const retained=await m.selectExperimentalCandidate(same,{...same,image:fresh,review:{...base,evidence:[]}},async()=>{calls++;});
    assert.equal(applyPageCandidateSelection({candidate:fresh,finalReview:{pass:false},history:[],canContinue:true},retained,{pass:true,issues:[]}).finalReview.pass,true,'an unchanged valid inspection remains usable');
  });
  test('experimental QA checks physical cast instances with the shared evidence criteria',()=>{
    const plan={...six,expectedCast:[{panel:1,names:['ユウ'],replicaNames:[]}]};
    const report={status:'pass',observedCount:6,readingOrder:'pass',camera:'pass',style:'pass',story:'pass',anatomy:'pass',pageText:'pass',breakout:'not_requested',issues:[],pageEvidence:'原画像にある題字と左右の文字',
      evidence:six.panels.map((p,i)=>({panel:i+1,camera:'頭の上面と机の天板が見える',style:'人物に細い斜線の影が見える',story:'人物の手が小道具に触れている',anatomy:'腕が肩から手まで連続している'}))};
    report.evidence[0].cast_instances=[{name:'ユウ',observed_count:1,status:'ok',instances:[{location:'右前景の後頭部と肩',matched_features:['黒い短髪','赤いコート']}]}];
    assert.equal(m.validateExperimentalReview(report,plan).status,'pass');
    const duplicate=structuredClone(report);
    duplicate.evidence[0].cast_instances[0].observed_count=2;
    duplicate.evidence[0].cast_instances[0].instances.push({location:'左奥にもう一人',matched_features:['同じ黒い短髪','同じ赤いコート']});
    const rejected=m.validateExperimentalReview(duplicate,plan);
    assert.equal(rejected.status,'warning');assert.equal(rejected.anatomy,'fail');
    assert.match(rejected.issues.join(' '),/ユウ|two|2/);
    for(const uncertain of [{observedCount:null},{status:'unverified'},{observedCount:null,status:'unverified'}]) {
      const mixed=m.validateExperimentalReview({...structuredClone(duplicate),...uncertain},plan);
      assert.equal(mixed.status,'warning','a supported duplicate remains a defect even when another check is unverified');
      assert.equal(mixed.anatomy,'fail');
    }
    const invalid=structuredClone(duplicate);invalid.evidence[0].camera='';
    assert.equal(m.validateExperimentalReview(invalid,plan).status,'unverified','invalid evidence must not authorize repair');
    assert.equal(m.validateExperimentalReview({...structuredClone(report),observedCount:null},plan).status,'unverified','unknown count alone is not a defect');
    const unknown=structuredClone(report);delete unknown.evidence[0].cast_instances;
    assert.equal(m.validateExperimentalReview(unknown,plan).status,'unverified');
    const brokenAnatomy=m.validateExperimentalReview({...structuredClone(unknown),anatomy:'fail',issues:['手首から先に別の腕が分岐している。']},plan);
    assert.equal(brokenAnatomy.anatomy,'fail','unknown cast identity cannot erase a separate anatomy defect');
    assert.equal(brokenAnatomy.status,'warning');
    const cropped=structuredClone(report);
    cropped.evidence[0].cast_instances[0].instances[0].location='画面端に後頭部と肩だけ見える';
    assert.equal(m.validateExperimentalReview(cropped,plan).status,'pass','an intentional crop is still one grounded physical instance');
  });
  test('render prompt contains only the chosen geometry and preserves source content without old panel instructions', () => {
    const text='Location: 工房の長い机\n'+scenario.replace('状況: 行動1','状況: 行動1\n左の棚には触れない（原作の細部）').replace('セリフなし','人物A：「順番を守ろう」');
    const src=m.readExperimentalSource({...input,scenario:text});
    const p=structuredClone(six);p.layout='hero_top';p.panels[0].dialogueIds=[0];
    const prompt=m.buildExperimentalImagePrompt(p,src,input);
    assert.doesNotMatch(prompt,/\[\dコマ目\]|tall right panel precedes|usual middle tall-right/);
    assert.ok(prompt.includes('左の棚には触れない（原作の細部）'));
    assert.ok(prompt.includes('Location: 工房の長い机'));
    assert.equal(prompt.split('順番を守ろう').length-1,1);
    assert.ok(prompt.includes(source.panels[0].camera));
    assert.equal(m.buildExperimentalWebCopy(prompt).join(''),prompt+'\n');
  });
  test('layout history describes geometry, and directing compares camera fit without forcing a variety quota', () => {
    const a=m.experimentalLayoutFingerprint({...six,layout:'hero_top'});
    assert.equal(a,m.experimentalLayoutFingerprint({...six,layout:'hero_top',reason:'別名の説明'}));
    assert.notEqual(a,m.experimentalLayoutFingerprint({...six,layout:'two_columns'}));
    const prompt=m.buildExperimentalPlanPrompt(source,{recentLayouts:[{count:6,layout:'hero_top',geometry:a}]});
    assert.match(prompt,/alternatives/);assert.match(prompt,/pageIntent/);
    assert.match(prompt,/lettering/);assert.match(prompt,/No effect quotas/);
    assert.match(prompt,/never remove a scenario panel/);
  });
  test('panel media override generic ink and cel shading without weakening anatomy or the normal shared contract', () => {
    assert.equal(shared.buildImageQualityContract(),shared.SHARED_IMAGE_QUALITY_CONTRACT);
    assert.equal(createHash('sha256').update(shared.SHARED_IMAGE_QUALITY_CONTRACT).digest('hex'),'a898f9df6b1f6718c90bab8928ca71bd81ce1d7bdcb34040217461f6f9307804');
    const src=m.readExperimentalSource({...input,colorMode:'color',scenario:scenario.replaceAll('NORMAL','WATERCOLOR')});
    const prompt=m.buildExperimentalImagePrompt(six,src,{...input,colorMode:'color'});
    assert.doesNotMatch(prompt,/strongest G-pen|Focal G-pen|use clean, localized cel-shaded shadow planes/);
    assert.match(prompt,/人物\/顔\/服\/道具\/背景すべてをその枠の媒体で描き、全ページを同じ墨\/塗りへ均さない/);
    assert.match(prompt,/透明画へ不透明なセル塗りを強制しない/);assert.match(prompt,/LIMB OWNERSHIP/);
    assert.match(prompt,/no heavy black contours or opaque base/);
    const mixed=m.readExperimentalSource({...input,colorMode:'color',scenario:scenario.replace('[EMOTION: NORMAL]','[EMOTION: GEKIGA]')});
    const mixedPrompt=m.buildExperimentalImagePrompt(six,mixed,{...input,colorMode:'color'});
    assert.match(mixedPrompt,/realistic GEKIGA/);assert.match(mixedPrompt,/Primary facial shading is dense fine pen hatching/);
    assert.match(mixedPrompt,/Solid black is a secondary accent/);
  });
  test('review failures retain the delivered image without issuing another image request', async () => {
    for (const response of [null,()=>{throw Object.assign(new Error('timeout'),{code:'REVIEW_TIMEOUT'});}]) {
      let images=0,adopted=0;
      const result=await m.runExperimentalManga(input,{plan:async prompt=>planResponse(prompt,six),image:async()=>{images++;return {base64Img:'test-only',mimeType:'image/png'};},onImage:()=>adopted++,review:async()=>typeof response==='function'?response():response});
      assert.equal(images,1);assert.equal(adopted,1);assert.equal(result.image.base64Img,'test-only');assert.equal(result.review.status,'unverified');
    }
  });
  test('experimental candidates use shared best selection and never compare different prepared contracts', async () => {
    const report={status:'pass',observedCount:6,readingOrder:'pass',camera:'pass',style:'pass',story:'pass',anatomy:'pass',pageText:'pass',pageEvidence:'上の題字と左右のクレジットが全文読める',breakout:'not_requested',issues:[],evidence:six.panels.map((p,i)=>({panel:i+1,camera:'人物の頭頂と肩の上面が見えている',style:'顔の輪郭と頬の墨の陰影が見える',story:'手と小道具の接点から動作が読める',anatomy:'両腕と体の接続が連続している'}))};
    const first={id:1,groupId:'a',prompt:'approved',plan:six,review:report,image:{base64Img:'one'}};
    const second={...first,id:2,image:{base64Img:'two'}};
    let calls=0;
    const compare=async()=>{calls++;return {preferred:'repair',reason:'The same hands and text remain; specified actor medium improves.'};};
    assert.equal((await m.selectExperimentalCandidate(first,second,compare)).candidate,second.image);
    const observedIssue='3コマ目の吹き出し左右順が台本と逆転しています';
    const warned={...first,review:{...report,status:'warning',readingOrder:'fail',issues:[observedIssue]}};
    let comparisonEvidence;
    await m.selectExperimentalCandidate(warned,second,async(a,b,p,options)=>{comparisonEvidence=options.originalIssues;return {preferred:'original',reason:'同等'};});
    assert.ok(comparisonEvidence.some(issue=>issue.reason===observedIssue),'comparison must receive prior observed defects');
    const cameraRegression={...second,review:{...report,camera:'fail',status:'warning',issues:['頭頂だけの俯瞰が正面顔に変わっている']}};
    assert.equal((await m.selectExperimentalCandidate(first,cameraRegression,compare)).candidate,first.image);
    const invalid={...second,review:{status:'unverified',issues:['検査が届かない']}};
    assert.equal((await m.selectExperimentalCandidate(first,invalid,compare)).candidate,first.image);
    calls=0;
    assert.equal((await m.selectExperimentalCandidate(first,{...second,groupId:'b'},compare)).candidate,first.image);
    assert.equal((await m.selectExperimentalCandidate(first,{...second,prompt:'changed'},compare)).candidate,first.image);
    assert.equal(calls,0);
  });
  test('review decoding and transport failures retain safe, distinct diagnostics without a paid repair', async () => {
    for(const mode of ['unknown','transport','decode','evidence']) {
      let images=0;
      const result=await m.runExperimentalManga(input,{
        plan:async prompt=>planResponse(prompt,six),
        image:async()=>{images++;return {base64Img:'test-only',mimeType:'image/png'};},
        review:async()=>{
          if(mode==='decode') return m.parseExperimentalReview('invalid JSON');
          if(mode==='transport') throw Object.assign(new Error('HTTP 503'),{status:503,code:'HTTP_ERROR'});
          if(mode==='unknown') throw new Error('unexpected failure Authorization: Bearer sk-test-secret-value');
          return null;
        }
      });
      assert.equal(images,1);assert.equal(result.image.base64Img,'test-only');
      assert.equal(result.review.status,'unverified');
      assert.equal(result.review.diagnostics.stage,mode==='decode'?'decode':mode==='evidence'?'validation':'request');
      assert.ok(result.review.diagnostics.imageMs>=0);assert.ok(result.review.diagnostics.reviewMs>=0);
      assert.doesNotMatch(JSON.stringify(result.review),/sk-test-secret-value/);
      if(mode==='decode') assert.match(result.review.issues.join(' '),/REVIEW_INVALID_JSON/);
      if(mode==='transport') assert.equal(result.review.diagnostics.kind,'server');
    }
    assert.deepEqual(m.parseExperimentalReview('```json\n{"status":"unverified"}\n```'),{status:'unverified'});
    assert.throws(()=>m.parseExperimentalReview('not json'),error=>error.code==='REVIEW_INVALID_JSON');
  });
  test('experimental pages require five to eight panels at planning and rendering boundaries', async () => {
    const four=planFor(4);
    assert.throws(()=>m.validateExperimentalPlan(four,source),/コマ数/);
    assert.throws(()=>m.experimentalLayoutOptions(4),/コマ数/);
    assert.throws(()=>m.buildExperimentalImagePrompt(four,source,input),/コマ数/);
    await assert.rejects(m.prepareExperimentalManga(input,async()=>JSON.stringify(four)),/コマ数/);
    for(let count=5;count<=8;count++) {
      const nativeSource=m.readExperimentalSource({...input,scenario:scenarioFor(count)});
      assert.equal(m.validateExperimentalPlan({...planFor(count),layout:'mixed_rows'},nativeSource).count,count);
    }
    assert.throws(()=>m.readExperimentalSource({...input,scenario:scenarioFor(4)}),/5〜8|5～8|5–8|コマ/);
    assert.match(m.buildExperimentalPlanPrompt(source),/EXACTLY 6 panels/);
    assert.doesNotMatch(m.buildExperimentalPlanPrompt(source),/4\.\.8|count4=/);
    const oldHistory=[{plan:four},{plan:six}];
    assert.deepEqual(m.summarizeExperimentalLayouts(oldHistory).map(p=>p.count),[6]);
    assert.equal(oldHistory.length,2,'legacy images and their records must not be deleted');
  });
  test('experimental review decoding rejects non-object and unfinished output with value-safe stage evidence',()=>{
    for(const stage of ['inventory','assessment']) {
      for(const text of ['not JSON sk-test-secret-value','null','[]','"free text"']) {
        assert.throws(()=>m.parseExperimentalReview(text,{stage,finishReason:'stop',usage:{completion_tokens:42}}),error=>{
          assert.equal(error.code,'REVIEW_INVALID_JSON');
          assert.deepEqual(error.reviewDiagnostics,{stage,characters:text.length,finishReason:'stop',completionTokens:42});
          assert.doesNotMatch(JSON.stringify(error)+error.message,/sk-test-secret-value|free text/);
          return true;
        });
      }
      for(const finishReason of ['length','MAX_TOKENS','content_filter','SAFETY']) {
        assert.throws(()=>m.parseExperimentalReview('{"status":"pass"}',{stage,finishReason}),error=>error.code==='REVIEW_INCOMPLETE');
      }
    }
    for(const finishReason of ['stop','STOP',undefined]) {
      assert.deepEqual(m.parseExperimentalReview('```json\n{"status":"unverified"}\n```',{finishReason}),{status:'unverified'});
    }
  });
  test('both experimental inspections request JSON and stop at the failed stage without paid retries',async()=>{
    const frames=m.experimentalLayout(six.count,six.layout).map(r=>({bounds:[.01+.98*r.x,.05+.90*r.y,.98*r.w,.88*r.h]}));
    const regionTools={detect:async()=>frames,inspect:async()=>({width:2240,height:3168}),crop:async()=>({dataUrl:'test-crop'})};
    for(const failedStage of [1,2]) {
      let calls=0;
      await assert.rejects(m.reviewExperimentalImage({image:{mimeType:'image/png',base64Img:'kept-image'},plan:six,prompt:'Return JSON'},
        async(_prompt,_images,_signal,options)=>{
          calls++;
          assert.equal(options.responseFormat,'json_object');
          assert.equal(options.timeoutMs,undefined,'the provider owns its response timeout');
          return {text:calls===failedStage?'broken JSON':'{"evidence":[]}',finishReason:'stop',usage:{completion_tokens:7}};
        },regionTools),error=>{
          assert.equal(error.code,'REVIEW_INVALID_JSON');
          assert.equal(error.reviewDiagnostics.stage,failedStage===1?'inventory':'assessment');
          return true;
        });
      assert.equal(calls,failedStage,'never request the next stage or a repair after invalid JSON');
    }
  });
  test('review prompt shapes match the numeric panel and body-bound observation contract',async t=>{
    const frames=m.experimentalLayout(six.count,six.layout).map(r=>({bounds:[.01+.98*r.x,.05+.90*r.y,.98*r.w,.88*r.h]}));
    const regionTools={detect:async()=>frames,inspect:async()=>({width:2240,height:3168}),crop:async()=>({dataUrl:'test-crop'})};
    const prompts=[];
    await m.reviewExperimentalImage({image:{mimeType:'image/png',base64Img:'test-only'},plan:six,
      prompt:m.buildExperimentalReviewPrompt(six,source,input)},async prompt=>{
      prompts.push(prompt);
      return {text:'{"evidence":[]}',finishReason:'stop'};
    },regionTools);
    assert.equal(prompts.length,2,'schema instructions must not add another request');
    await t.test('inventory maps one-based numeric panel IDs to native crop image IDs',()=>{
      assert.match(prompts[0],/panel.*integer.*1\.\.6/i);
      assert.match(prompts[0],/Image 2\s*=\s*(?:physical )?P(?:anel )?1/i);
      assert.match(prompts[0],/Image 7\s*=\s*(?:physical )?P(?:anel )?6/i);
      assert.match(prompts[0],/never.*(?:image number|renumber)|(?:do not|not).*image number/i);
    });
    await t.test('inventory explicitly types body bounds and visual features as arrays',()=>{
      assert.match(prompts[0],/bounds \(array of exactly four numbers/i);
      assert.match(prompts[0],/features \(array of at least two[^)]*strings/i);
    });
    await t.test('assessment example retains every required style actor and cast body link',()=>{
      const example=prompts[1].match(/Each evidence object has this shape[^:]*:\s*(\{[^\n]+\})\. Never compress/);
      assert.ok(example,'the model-visible complete evidence shape must remain inspectable');
      const shape=JSON.parse(example[1]);
      assert.ok(shape.style_observation&&typeof shape.style_observation==='object','complete example must include the required style observation');
      for(const key of ['medium','status','evidence']) assert.equal(typeof shape.style_observation[key],'string',key);
      const actor=shape.style_observation.actors?.[0];
      assert.ok(actor,'complete example must include one typed per-body actor shape, not only an empty array');
      for(const key of ['body_id','medium','status','face_visibility','face','shading']) assert.equal(typeof actor[key],'string',key);
      const cast=shape.cast_instances?.[0];
      assert.ok(cast,'complete example must describe the cast-instance shape');
      assert.equal(cast.instances?.[0]?.body_id,actor.body_id,'both observations refer to the same independently observed body ID');
      assert.match(prompts[1],/style_observation.*(?:face|shading).*at least 8 characters/i);
    });
  });
  test('variable count rejects missing beats and altered anchor cameras', () => {
    assert.equal(m.validateExperimentalPlan(six,source).count,6);
    assert.throws(()=>m.validateExperimentalPlan({...six,count:9},source));
    assert.throws(()=>m.validateExperimentalPlan({...six,panels:six.panels.slice(1)},source));
    const changed=structuredClone(six); changed.panels[0].camera='正面の顔アップ';
    assert.throws(()=>m.validateExperimentalPlan(changed,source),/Camera/);
  });
  test('dialogue inventory is immutable and scripted silent panels remain silent', () => {
    const spoken=m.readExperimentalSource({...input,scenario:scenario.replace('セリフなし','人物A：「待って」')});
    const p=structuredClone(six); p.panels[0].dialogueIds=[0];
    assert.equal(m.validateExperimentalPlan(p,spoken).count,6);
    assert.throws(()=>m.validateExperimentalPlan(six,spoken),/台詞/);
    p.panels[1].dialogueIds=[0];
    assert.throws(()=>m.validateExperimentalPlan(p,spoken),/台詞/);
    const added=structuredClone(six);added.addedDialogue=[{sourcePanel:2,text:'新しい台詞'}];
    assert.throws(()=>m.validateExperimentalPlan(added,source),/台詞/);
    const inserted=structuredClone(six);inserted.panels[1].kind='insert';
    assert.throws(()=>m.validateExperimentalPlan(inserted,source),/コマ|anchor|追加/);
  });
  test('each supported count has unambiguous RTL row order and an optional continuous breakout', () => {
    for(let count=5;count<=8;count++) {
      const rects=m.experimentalLayout(count);
      assert.equal(rects.length,count);
      assert.ok(rects.every(r=>r.x>=0&&r.y>=0&&r.x+r.w<=1.00001&&r.y+r.h<=1.00001));
      for(let i=0;i<rects.length;i++) for(let j=i+1;j<rects.length;j++) {
        const a=rects[i],b=rects[j];
        assert.ok(a.x+a.w<=b.x+0.00001||b.x+b.w<=a.x+0.00001||a.y+a.h<=b.y+0.00001||b.y+b.h<=a.y+0.00001);
      }
    }
    const p=structuredClone(six); p.panels[2].breakout={part:'手と前腕',into:4};
    assert.equal(m.validateExperimentalPlan(p,source).count,6);
    p.panels[2].breakout.into=2;
    assert.throws(()=>m.validateExperimentalPlan(p,source),/隣接/);
    const prompt=m.buildExperimentalImagePrompt(six,source,input);
    assert.match(prompt,/strong|Camera/i);
    assert.doesNotMatch(prompt,/four horizontal|2×2.*禁止/);
  });
  test('OFF sends no API request, ON uses one image and does not mutate inputs or run repairs', async () => {
    const before=JSON.stringify(input); let calls=0,images=0;
    const deps={plan:async prompt=>{calls++;return planResponse(prompt,six);},image:async()=>{images++;return {base64Img:'test-only',mimeType:'image/png'};},review:async()=>({status:'unverified',issues:['角度を確認できない']})};
    await assert.rejects(m.runExperimentalManga({...input,enabled:false},deps));
    assert.equal(calls,0);
    const result=await m.runExperimentalManga(input,deps);
    assert.equal(images,1); assert.equal(result.review.status,'unverified');
    assert.equal(JSON.stringify(input),before);
  });
  test('cancelled plan never starts image; cancelled late image is never adopted',async()=>{
    for(const stopAt of ['plan','image']) {
      const controller=new AbortController(); let adopted=0,images=0;
      const deps={plan:async prompt=>{if(stopAt==='plan')controller.abort();return planResponse(prompt,six);},image:async()=>{images++;controller.abort();return {base64Img:'test-only'};},onImage:()=>adopted++,review:async()=>({status:'pass'})};
      await assert.rejects(m.runExperimentalManga({...input,signal:controller.signal},deps));
      assert.equal(images,stopAt==='plan'?0:1);assert.equal(adopted,0);
    }
  });
  test('prepared input rejects a changed story before image generation; web chunks retain the complete variable-panel contract',async()=>{
    const prepared=await m.prepareExperimentalManga(input,async prompt=>planResponse(prompt,six));let images=0;
    await assert.rejects(m.runExperimentalManga({...input,scenario:scenario+'\n追加',prepared},{image:async()=>images++}),/変更/);
    assert.equal(images,0);
    const chunks=m.buildExperimentalWebCopy(prepared.prompt);
    assert.equal(chunks.join(''),prepared.prompt+'\n');
    assert.ok(chunks.every(chunk=>chunk.length<=9500));
    assert.match(chunks.join(''),/EXACTLY 6 framed panels/);
    assert.match(chunks.join(''),/GEKIGA|NORMAL/);
  });
  test('missing root review stays unverified during cast auditing and retains the existing candidate',async()=>{
    const castPlan={...six,expectedCast:six.panels.map((_,i)=>({panel:i+1,names:['甲']}))};
    for(const missing of [undefined,null,false,0,'invalid',[]]) {
      const checked=m.validateExperimentalReview(missing,castPlan);
      assert.equal(checked.status,'unverified');assert.equal(checked.observedCount,null);
      assert.equal(checked.anatomy,'uncertain');assert.ok(checked.validationErrors.includes('status: invalid'));
    }
    const valid={status:'pass',observedCount:6,readingOrder:'pass',camera:'pass',style:'pass',story:'pass',anatomy:'pass',pageText:'pass',breakout:'not_requested',issues:[],pageEvidence:'題字と左右のクレジットを実画像で確認した',evidence:six.panels.map((_,i)=>({panel:i+1,camera:'人物の頭頂と肩上面がはっきり見える',style:'顔に媒体固有の線と陰影が見える',story:'道具と人物の接触が脚本の動作を示す',anatomy:'両腕と手と肩が自然につながっている',cast_instances:[{name:'甲',observed_count:1,status:'ok',instances:[{location:'中央の一人の身体',matched_features:['黒い短髪','赤いコート']}]}]}))};
    assert.equal(m.validateExperimentalReview(valid,castPlan).status,'pass');
    const original={groupId:'same',prompt:'same',plan:castPlan,image:{base64Img:'retained'},review:undefined};
    let comparisons=0;
    const selected=await m.selectExperimentalCandidate(original,{...original,image:{base64Img:'new'},review:null},()=>{comparisons++;throw new Error('unverified candidates must not spend comparison');});
    assert.equal(selected.candidate,original.image);assert.equal(comparisons,0);
    for(const missing of [undefined,null]) {
      const retained={...original,image:{base64Img:'retained'},review:missing};
      const fresh={base64Img:'new'},started=[];
      const result=await m.reviewExperimentalCandidatePair(fresh,retained,async image=>{
        started.push(image);
        if(image===retained.image)throw new Error('old inspection unavailable');
        image.experimentalReview=structuredClone(valid);return {pass:true,issues:[]};
      });
      assert.deepEqual(started,[fresh,retained.image],'missing old evidence must not prevent the new inspection from starting');
      assert.equal(result.pass,true,'a completed new inspection survives the unavailable old inspection');
      const kept=await m.selectExperimentalCandidate(retained,{...retained,image:fresh,review:fresh.experimentalReview},()=>{throw new Error('missing old evidence must not be compared or passed');});
      assert.equal(kept.candidate,retained.image);assert.equal(kept.comparison.status,'not_compared');
      assert.equal(kept.selectedReview.pass,false);
      assert.equal(fresh.experimentalReview.status,'pass','both retained images keep their own evidence');
    }
  });
  test('QA cannot turn uncertainty, a missing required field or wrong panel count into pass',()=>{
    const review={status:'pass',observedCount:6,readingOrder:'pass',camera:'pass',style:'pass',story:'pass',anatomy:'pass',pageText:'pass',pageEvidence:'上部の題字と下部の左右の透かし全文を読める',breakout:'not_requested',issues:[],evidence:six.panels.map((p,i)=>({panel:i+1,camera:'人物の頭頂と肩の上面が見えている',style:'顔の墨線と陰影の描き分けが見える',story:'手と小道具の接点で行動が読み取れる',anatomy:'手首から腕と肩まで一続きに見える'}))};
    assert.equal(m.validateExperimentalReview(review,six).status,'pass');
    assert.equal(m.validateExperimentalReview({...review,camera:'uncertain'},six).status,'unverified');
    assert.equal(m.validateExperimentalReview({...review,observedCount:4},six).status,'warning');
    assert.equal(m.validateExperimentalReview({...review,story:undefined},six).status,'unverified');
    const pageChecked={...review,expectedPageText:['実際の題字','実際のクレジット'],pageEvidence:'実際の題字\n実際のクレジット'};
    assert.equal(m.validateExperimentalReview(pageChecked,six).status,'pass');
    const misread=m.validateExperimentalReview({...pageChecked,pageEvidence:'実際の題字\n別の会社のクレジット'},six);
    assert.equal(misread.status,'unverified');assert.equal(misread.pageText,'uncertain');
    assert.equal(m.validateExperimentalReview({...review,status:'unverified'},six).status,'unverified');
    assert.equal(m.validateExperimentalReview({...review,evidence:undefined,issues:['Example finding without an observation']},six).status,'unverified');
    assert.equal(m.validateExperimentalReview({...review,issues:[{}]},six).status,'unverified');
    const short=structuredClone(review);short.evidence[2].anatomy='手が不明';
    const rejected=m.validateExperimentalReview(short,six);
    assert.equal(rejected.status,'unverified');
    assert.ok(rejected.validationErrors.includes('evidence[3].anatomy: missing or too short'));
    assert.equal(rejected.evidence[2].anatomy,'手が不明');
    assert.equal(rejected.camera,'pass');
    assert.deepEqual(m.validateExperimentalReview(rejected,six).validationErrors,rejected.validationErrors);
    const malformed=structuredClone(review);malformed.evidence[0].camera={unexpected:true};
    assert.equal(m.validateExperimentalReview(malformed,six).status,'unverified');
    malformed.evidence[0].story='api_key=sk-test-secret-value';
    assert.doesNotMatch(JSON.stringify(m.validateExperimentalReview(malformed,six)),/sk-test-secret-value/);
    const echoed=structuredClone(review);echoed.evidence[0].camera=six.panels[0].camera;
    assert.equal(m.validateExperimentalReview(echoed,six).status,'unverified');
    const optional=structuredClone(six);optional.panels[2].breakout={part:'手',into:4};
    const omitted=structuredClone(review);omitted.breakout='not_requested';
    omitted.evidence[2].breakout='手は枠内につながり、枠外には出ていない';
    assert.equal(m.validateExperimentalReview(omitted,optional).status,'pass');
  });
  test('page envelope explicitly constrains outside margins without removing gutters',()=>{
    const prompt=m.buildExperimentalImagePrompt(six,source,input);
    assert.match(prompt,/0\.6%/);assert.match(prompt,/white gutters/);
  });
  test('observed dialogue is checked in physical reading slots, not reordered by the story',()=>{
    const spokenSource=m.readExperimentalSource({...input,scenario:scenario.replace(/セリフなし/g,'人物A：「同じ言葉、私は人物A。」').replace(/同じ言葉、私は人物A。」$/,'結末の言葉」')});
    const spokenPlan=structuredClone(six);
    for(const p of spokenPlan.panels) p.dialogueIds=p.kind==='anchor'?[p.sourcePanel-1]:[];
    const contract=m.validateExperimentalPlan(spokenPlan,spokenSource);
    const rects=m.experimentalLayout(contract.count,contract.layout);
    const report={status:'pass',observedCount:6,readingOrder:'pass',camera:'pass',style:'pass',story:'pass',anatomy:'pass',pageText:'pass',pageEvidence:'上の題字と下の両クレジットを転記した内容',breakout:'not_requested',issues:[],evidence:contract.panels.map((p,i)=>({panel:i+1,camera:'人物の頭と肩の上面が見えている',style:'人物の顔に細い墨の陰影が見える',story:'手と小道具の接点から動作が読める',anatomy:'両腕と体の接続が連続している',dialogue:p.dialogueIds.map(id=>spokenSource.dialogue.find(d=>d.id===id).text.replace('同じ言葉','同じ 言葉！'))}))};
    report.evidence.forEach((e,i)=>e.center=[rects[i].x+rects[i].w/2,rects[i].y+rects[i].h/2]);
    report.evidence.forEach(e=>{e.cast_instances=(contract.expectedCast.find(c=>c.panel===e.panel)?.names||[]).map(name=>({name,observed_count:1,status:'ok',instances:[{location:'右前景の一つの身体',matched_features:['黒い短髪','赤い服']}]}));});
    assert.equal(m.validateExperimentalReview(report,contract).status,'pass');
    // A genuine name inside dialogue and harmless spacing/punctuation pass;
    // an extra speaker heading printed in every balloon must remain a defect.
    const labeled=structuredClone(report);
    labeled.evidence.forEach(e=>{e.dialogue=e.dialogue.map(text=>'人物A\n'+text);});
    const labelFailure=m.validateExperimentalReview(labeled,contract);
    assert.equal(labelFailure.readingOrder,'fail');
    assert.equal(labelFailure.status,'warning');
    const reversed=structuredClone(report);
    [reversed.evidence[4].dialogue,reversed.evidence[5].dialogue]=[reversed.evidence[5].dialogue,reversed.evidence[4].dialogue];
    const result=m.validateExperimentalReview(reversed,contract);
    assert.equal(result.readingOrder,'fail');assert.equal(result.status,'warning');
    assert.match(result.issues.join(' '),/5|6/);
    const missing=structuredClone(report);delete missing.evidence[4].dialogue;
    assert.equal(m.validateExperimentalReview(missing,contract).status,'unverified');
    const wrongType={...report,pageEvidence:{title:'実画像の題字'}};
    const invalid=m.validateExperimentalReview(wrongType,contract);
    assert.equal(invalid.status,'unverified');assert.match(invalid.pageEvidence,/実画像の題字/);
    const prompt=m.buildExperimentalImagePrompt(contract,spokenSource,input);
    assert.match(prompt,/PHYSICAL READING PATH/);assert.match(prompt,/FINAL ENDING/);
    assert.match(prompt,/PANEL RENDERING MAP/);
    assert.match(prompt,/Identity is not a frozen drawing style/);
  });
  test('QA binds observations by their measured location even if the model numbers left first',()=>{
    const spokenSource=m.readExperimentalSource({...input,scenario:scenario.replace(/セリフなし/g,'人物A：「同じ言葉」')});
    const plan=structuredClone(six);plan.layout='two_columns';
    for(const p of plan.panels) p.dialogueIds=p.kind==='anchor'?[p.sourcePanel-1]:[];
    const contract=m.validateExperimentalPlan(plan,spokenSource);
    const rects=m.experimentalLayout(contract.count,contract.layout);
    const report={status:'pass',observedCount:6,readingOrder:'pass',camera:'pass',style:'pass',story:'pass',anatomy:'pass',pageText:'pass',pageEvidence:'上の題字と下の両クレジットを転記した内容',breakout:'not_requested',issues:[],evidence:contract.panels.map((p,i)=>({panel:i%2===0?i+2:i,center:[rects[i].x+rects[i].w/2,rects[i].y+rects[i].h/2],camera:'人物の頭と肩の上面が見えている',style:'人物の顔に細い墨の陰影が見える',story:'手と小道具の接点から動作が読める',anatomy:'両腕と体の接続が連続している',dialogue:p.dialogueIds.length?['同じ言葉']:[]}))};
    report.evidence.forEach((e,i)=>{e.cast_instances=(contract.expectedCast.find(c=>c.panel===i+1)?.names||[]).map(name=>({name,observed_count:1,status:'ok',instances:[{location:'右前景の一つの身体',matched_features:['黒い短髪','赤い服']}]}));});
    assert.equal(m.validateExperimentalReview(report,contract).status,'pass');
    const duplicate=structuredClone(report);duplicate.evidence[1].center=duplicate.evidence[0].center;
    assert.equal(m.validateExperimentalReview(duplicate,contract).status,'unverified');
  });
  test('review attachments retain the full page and cut its physical slots in reading order',async()=>{
    const plan={...six,layout:'two_columns'},regions=[];
    const frames=m.experimentalLayout(6,'two_columns').map(r=>({bounds:[r.x===0?0.01:0.62,0.05+r.y*.90,r.x===0?0.59:0.37,r.h*.87]}));
    const request=await m.prepareExperimentalReviewImages({mimeType:'image/png',base64Img:'test-only'},plan,undefined,{
      inspect:async()=>({width:2240,height:3168}),crop:async(url,region)=>{regions.push(region);return {dataUrl:`crop-${regions.length}`};}
    },frames);
    assert.equal(request.images.length,9);assert.match(request.images[0],/^data:image\/png/);
    assert.ok(regions[0].x>regions[1].x);assert.equal(regions[0].y,regions[1].y);
    assert.ok(regions[4].x>regions[5].x);
    assert.equal(regions[0].x,Math.round(2240*.62),'crop must follow observed frame, not the planned half-page');
    assert.equal(regions[1].width,Math.round(2240*.60)-Math.round(2240*.01));
    assert.match(request.instruction,/Image 7 = physical P6/);
    assert.equal(regions[6].x,0);assert.equal(regions[7].x,1120);
    assert.ok(regions[6].y>3000);assert.match(request.instruction,/footer/);
    const controller=new AbortController();controller.abort();
    await assert.rejects(m.prepareExperimentalReviewImages({},plan,controller.signal),{name:'AbortError'});
  });
  test('blind transcription overrides narrative-biased QA and never receives expected story text',async()=>{
    const calls=[];
    const independentBody={id:'body1',bounds:[.1,.1,.3,.8],features:['短い黒髪','白い作業服'],gaze:blindGaze()};
    const expectedStyles=six.panels.map((_,i)=>({panel:i+1,style:i===2?'WATERCOLOR':'GEKIGA'}));
    const expectedOutfits={global:'人物Aは灰色の作業服。',panels:six.panels.map((_,i)=>({panel:i+1,outfit:''}))};
    const frames=m.experimentalLayout(six.count,six.layout).map((r,i)=>({bounds:[.01+.98*r.x,.05+.90*r.y,.98*r.w,.88*r.h],dialogue:i===4?['実際は先に結末がある']:[]}));
    const result=await m.reviewExperimentalImage({image:{mimeType:'image/png',base64Img:'test-only'},plan:six,prompt:'PRIVATE_EXPECTED_STORY\nEXPECTED PANEL STYLES: '+JSON.stringify(expectedStyles)+'\nEXPECTED OUTFIT SCOPES: '+JSON.stringify(expectedOutfits)},async(prompt,images)=>{
      calls.push({prompt,count:images.length});
      return calls.length===1?{text:JSON.stringify({pageEvidence:'実画像の題字とフッターをここに転記',evidence:six.panels.map((p,i)=>({panel:i+1,physical_bodies:i===0?[independentBody]:[],text_regions:i===4?[
          {region_kind:'speech_balloon',text:'左の台詞',center_x:.2},
          {region_kind:'sound_effect',text:'ピッ'},
          {region_kind:'printed_object',text:'3'},
          {region_kind:'speech_balloon',text:'右の台詞',center_x:.8}
        ]:[]}))})}
        :{text:JSON.stringify({status:'unverified',observedCount:null,camera:'uncertain',expectedStyles:[{panel:1,style:'NORMAL'}],expectedOutfits:{global:'採点側が捏造した衣装指定',panels:[]},evidence:six.panels.map((p,i)=>({panel:i+1,physical_bodies:[{...independentBody,gaze:null}],text_regions:[{region_kind:'speech_balloon',text:'採点側の誤った上書き',center_x:.9}],dialogue:['古い誤読'],camera:'観察',style:'観察'}))}),model:'test'};
    },{detect:async()=>frames,inspect:async()=>({width:2240,height:3168}),crop:async()=>({dataUrl:'test-crop'})});
    assert.equal(calls.length,2);assert.equal(calls[0].count,9,'blind reading sees all native frames and footer crops without the expected plan');
    assert.equal(result.review.inspectionVersion,9);
    assert.deepEqual(result.review.evidence[0].physical_bodies,[independentBody],'assessment cannot replace independent gaze, body identity or geometry');
    assert.deepEqual(result.review.expectedStyles,expectedStyles,'expected media come from the source contract, not the assessment model');
    assert.deepEqual(result.review.expectedOutfits,expectedOutfits,'outfit authority comes from the compiler, never the assessment response');
    assert.match(calls[1].prompt,/ROOT VERDICTS ONLY/);
    assert.match(calls[1].prompt,/PANEL OBSERVATIONS ARE PROSE/);
    assert.doesNotMatch(calls[1].prompt,/"status":"unverified"|"observedCount":null|"readingOrder":"uncertain"/,
      'the assessment must not supply a filled-in unverified verdict for the model to copy');
    assert.match(calls[1].prompt,/observedCount: integer counted from the full page/);
    assert.match(calls[1].prompt,/Assess each required check independently/);
    assert.equal(result.review.observedCount,null,'an unresolved API count must not be filled from the plan or crops');
    assert.equal(result.review.camera,'uncertain','unresolved observations must not be converted to pass');
    assert.doesNotMatch(m.buildExperimentalReviewPrompt(six,source,input),/any uncertain required check means unverified/,
      'the base prompt must not override confirmed failures with an unrelated uncertainty');
    assert.match(calls[1].prompt,/do not put pass, fail, high or low into these four observation strings/);

    assert.doesNotMatch(calls[0].prompt,/PRIVATE_EXPECTED_STORY|sourcePanel|dialogueIds/);
    assert.match(m.buildExperimentalReviewPrompt(six,source,input),/instances:\[\{body_id,/);
    assert.doesNotMatch(calls[0].prompt,/features:\["visible hair\/face cue"/);
    assert.deepEqual(result.review.evidence[4].dialogue,['右の台詞','左の台詞'],'only speech balloons sorted by physical x, never sound effects or full-page OCR');
    assert.deepEqual(result.review.evidence[0].dialogue,[],'a silent panel stays silent');
    for(const regions of [[{region_kind:'uncertain',text:'不明'}],[{region_kind:'speech_balloon',text:'台詞',center_x:2}]]) {
      let call=0;
      const uncertain=await m.reviewExperimentalImage({image:{mimeType:'image/png',base64Img:'test-only'},plan:six,prompt:'story'},async()=>({text:JSON.stringify(++call===1?{evidence:six.panels.map((_,i)=>({panel:i+1,text_regions:regions}))}:{evidence:six.panels.map((_,i)=>({panel:i+1,text_regions:[]}))})}),{detect:async()=>frames,inspect:async()=>({width:2240,height:3168}),crop:async()=>({dataUrl:'test-crop'})});
      assert.equal(uncertain.review.evidence[0].dialogue,null,'unreadable text or invalid coordinates must stay unverified');
    }
    assert.equal(result.attachedImages,9);
    const controller=new AbortController();let requests=0;
    await assert.rejects(m.reviewExperimentalImage({image:{mimeType:'image/png',base64Img:'test-only'},plan:six,prompt:'story',signal:controller.signal},async()=>{
      requests++;controller.abort();return {text:'{}'};
    },{detect:async()=>frames,inspect:async()=>({width:2240,height:3168}),crop:async()=>({dataUrl:'test-crop'})}),{name:'AbortError'});
    assert.equal(requests,1);
    let badRequests=0;
    await assert.rejects(m.reviewExperimentalImage({image:{mimeType:'image/png',base64Img:'test-only'},plan:six,prompt:'story'},async()=>{
      badRequests++;return {text:'{}'};
    },{detect:async()=>frames.map(()=>frames[0]),inspect:async()=>({width:2240,height:3168}),crop:async()=>({dataUrl:'test-crop'})}),/境界|重な/);
    assert.equal(badRequests,0,'ambiguous pixel geometry must not fabricate cuts or spend an inspection');
  });
  test('clear observed seven versus planned six is retained as a count warning without crops or paid review',async()=>{
    const frames=Array.from({length:7},(_,i)=>({bounds:[.05,.02+i*.137,.9,.12]}));
    let requests=0,crops=0;
    const result=await m.reviewExperimentalImage({image:{mimeType:'image/png',base64Img:'test-only'},plan:six,prompt:'story'},async()=>{requests++;throw new Error('no paid review for count mismatch');},{detect:async()=>frames,inspect:async()=>({width:400,height:600}),crop:async()=>{crops++;throw new Error('no crop based on incompatible plan');}});
    assert.equal(requests,0);assert.equal(crops,0);assert.equal(result.requests,0);
    assert.equal(result.review.observedCount,7);assert.deepEqual(result.review.observedFrames,frames);
    assert.equal(result.review.inspectionVersion,9,'local count evidence belongs to the current inspection format');
    const review=m.validateExperimentalReview(result.review,six);
    assert.equal(review.status,'warning');assert.equal(review.observedCount,7);
    assert.equal(m.validateExperimentalReview(JSON.parse(JSON.stringify(review)),six).status,'warning','saved local geometry retains its supported count warning');
    assert.equal(review.style,'uncertain');assert.equal(review.camera,'uncertain');
    assert.ok(review.issues.some(issue=>/7/.test(issue)&&/6/.test(issue)));
    assert.equal(m.validateExperimentalReview({...result.review,observedCount:8},six).status,'unverified','claimed count must agree with recorded geometry');
    assert.equal(m.validateExperimentalReview({...result.review,observedFrames:frames.map(()=>frames[0])},six).status,'unverified','overlapping observations cannot prove a count defect');
    await assert.rejects(m.reviewExperimentalImage({image:{mimeType:'image/png',base64Img:'test-only'},plan:six,prompt:'story'},async()=>{requests++;return {text:'{}'};},{detect:async()=>frames.map(()=>frames[0])}),/境界|重な/);
    assert.equal(requests,0);
  });
  test('fewer observed rectangles remain unverified because connected panels can undercount the page',async()=>{
    // Six visible panels with the first pair joined along top AND bottom can
    // produce these five closed rectangles; the two inner panels still exist.
    const frames=[{bounds:[.025,.05,.95,.2]},
      {bounds:[.025,.275,.45,.2]},{bounds:[.525,.275,.45,.2]},
      {bounds:[.025,.5,.45,.2]},{bounds:[.525,.5,.45,.2]}];
    let requests=0;
    const result=await m.reviewExperimentalImage({image:{mimeType:'image/png',base64Img:'test-only'},plan:six,prompt:'story'},async()=>{requests++;throw new Error('ambiguous count must not spend a review');},{detect:async()=>frames});
    assert.equal(requests,0);assert.equal(result.requests,0);
    assert.equal(result.review.status,'unverified');assert.equal(result.review.observedCount,null);
    assert.equal(m.validateExperimentalReview(result.review,six).status,'unverified');
    const checked=m.validateExperimentalReview({inspectionKind:'frame-geometry',observedFrames:frames,observedCount:5},six);
    assert.equal(checked.status,'unverified');assert.equal(checked.observedCount,null,'a lower candidate count is not a verified total');
    assert.equal(checked.style,'uncertain');assert.equal(checked.anatomy,'uncertain');
  });
  test('native crop inspection receives no expected speech even when the plan action repeats it',()=>{
    const phrase='照合用の台詞、答えを渡さない！';
    const src=m.readExperimentalSource({...input,scenario:scenario.replace('セリフなし',`人物A「${phrase}」`)});
    const plan=structuredClone(six);plan.panels[0].dialogueIds=[0];plan.panels[0].action+=phrase;
    const prompt=m.buildExperimentalReviewPrompt(plan,src);
    assert.ok(!prompt.includes(phrase));
    assert.match(prompt,/RIGHTMOST FIRST/);
    assert.match(prompt,/speech-0-withheld/);
    assert.equal(src.dialogue[0].text,phrase,'the deterministic expected contract remains intact');
  });
  test('experimental API and Web prompts retain source title and both configured footer credits',()=>{
    const named=m.readExperimentalSource({...input,scenario:'タイトル：枠の外へ！\n'+scenario});
    const prompt=m.buildExperimentalImagePrompt(six,named,{...input,showWatermarks:true,imageEngineLabel:'ChatGPT Images 2.5'});
    assert.match(prompt,/Top title EXACTLY "枠の外へ！"/);
    assert.match(prompt,/https:\/\/note.com\/happy_duck780/);
    assert.match(prompt,/Generated by ChatGPT Images 2.5 with Super FURU AI 4-koma/);
    assert.doesNotMatch(prompt,/FURU • EXPERIMENT/);
    assert.equal(m.buildExperimentalWebCopy(prompt).join(''),prompt+'\n');
    const off=m.buildExperimentalImagePrompt(six,named,{...input,showWatermarks:false});
    assert.match(off,/Top title EXACTLY "枠の外へ！"/);
    assert.doesNotMatch(off,/https:\/\/note.com\/happy_duck780/);
    const qa=m.buildExperimentalReviewPrompt(six,named,{showWatermarks:true,imageEngineLabel:'ChatGPT Images 2.5'});
    assert.match(qa,/https:\/\/note.com\/happy_duck780/);
    assert.match(qa,/Generated by ChatGPT Images 2.5 with Super FURU AI 4-koma/);
    assert.doesNotMatch(qa,/credit from the drawing prompt/);
  });
  test('review phase reports the actual failed request and never retries it',async()=>{
    const frames=m.experimentalLayout(six.count,six.layout).map(r=>({bounds:[.01+.98*r.x,.05+.90*r.y,.98*r.w,.88*r.h]}));
    const regionTools={detect:async()=>frames,inspect:async()=>({width:2240,height:3168}),crop:async()=>({dataUrl:'test-crop'})};
    for(const failedStage of ['inventory','assessment']) {
      const progress=[];let requests=0;
      await assert.rejects(m.reviewExperimentalImage({image:{mimeType:'image/png',base64Img:'test-only'},plan:six,prompt:'Test-only review',
        onPhaseProgress:message=>progress.push(message)},async()=>{
        requests++;
        if(failedStage==='inventory'||requests===2)throw Object.assign(new Error('provider timeout'),{code:'TIMEOUT'});
        return {text:'{"pageEvidence":"observed lettering","evidence":[]}',finishReason:'stop'};
      },regionTools),error=>error.code==='TIMEOUT');
      assert.equal(requests,failedStage==='inventory'?1:2);
      assert.ok(progress.some(message=>message.includes(`${failedStage}: APIの応答待ち上限到達`)));
      assert.ok(progress.every(message=>!/全体期限|全体の残り/.test(message)));
    }
  });
  test('visual effects preserve reading slots and camera, and reject incompatible or unknown effects',()=>{
    const rich=structuredClone(six);
    rich.panels[2].visualEffects=['hero_scale','foreground_depth','diagonal_frame'];
    rich.panels[1].visualEffects=['silhouette','silent_pause'];
    assert.equal(m.validateExperimentalPlan(rich,source).count,6);
    const prompt=m.buildExperimentalImagePrompt(rich,source,input);
    assert.match(prompt,/DIAGONAL FRAME/);assert.match(prompt,/FOREGROUND DEPTH/);assert.match(prompt,/SILENT PAUSE/);
    assert.match(prompt,/inside its allocated rectangle/);
    assert.ok(prompt.includes(source.panels[1].camera));
    const unknown=structuredClone(rich);unknown.panels[2].visualEffects=['made_up'];
    assert.throws(()=>m.validateExperimentalPlan(unknown,source),/演出/);
    const duplicate=structuredClone(rich);duplicate.panels[2].visualEffects=['hero_scale','hero_scale'];
    assert.throws(()=>m.validateExperimentalPlan(duplicate,source),/演出/);
    const hiddenAnchor=structuredClone(rich);hiddenAnchor.panels[2].visualEffects=['silhouette'];
    assert.equal(m.validateExperimentalPlan(hiddenAnchor,source).count,6,'an original silent panel may use a silhouette');
    const spoken=m.readExperimentalSource({...input,scenario:scenario.replace('セリフなし','人物A：「待って」')});
    const hiddenSpeech=structuredClone(rich);hiddenSpeech.panels[0].dialogueIds=[0];hiddenSpeech.panels[0].visualEffects=['silhouette'];
    assert.throws(()=>m.validateExperimentalPlan(hiddenSpeech,spoken),/無言/);
  });
  test('a changed rendering contract cannot silently generate a different prompt from the prepared Web prompt',async()=>{
    const prepared=await m.prepareExperimentalManga(input,async prompt=>planResponse(prompt,six));let images=0;
    await assert.rejects(m.runExperimentalManga({...input,prepared,showWatermarks:true},{image:async()=>images++}),/STEP3/);
    assert.equal(images,0);
  });
  test('the same count offers genuinely different reading-safe layouts, not a fixed tall-right middle',()=>{
    for(let count=5;count<=8;count++) {
      const layouts=m.experimentalLayoutOptions(count);
      assert.ok(layouts.length>=(count===8?6:7));
      const shapes=new Set();
      for(const {id} of layouts) {
        const rects=m.experimentalLayout(count,id);
        assert.equal(rects.length,count);shapes.add(JSON.stringify(rects));
        assert.ok(Math.abs(rects.reduce((sum,r)=>sum+r.w*r.h,0)-1)<.00001);
        for(let i=0;i<count;i++) {
          const a=rects[i];assert.ok(a.x>=0&&a.y>=0&&a.x+a.w<=1.00001&&a.y+a.h<=1.00001);
          if(i) {const previous=rects[i-1];assert.ok(a.y>previous.y-.00001);if(Math.abs(a.y-previous.y)<.00001)assert.ok(a.x<previous.x);}
          for(let j=i+1;j<count;j++) {const b=rects[j];assert.ok(a.x+a.w<=b.x+.00001||b.x+b.w<=a.x+.00001||a.y+a.h<=b.y+.00001||b.y+b.h<=a.y+.00001);}
        }
      }
      assert.ok(shapes.size>=6);
    }
    const wide={...six,layout:'hero_top'};
    assert.equal(m.validateExperimentalPlan(wide,source).layout,'hero_top');
    const prompt=m.buildExperimentalImagePrompt(wide,source,input);
    assert.match(prompt,/layout=hero_top/);assert.ok(prompt.includes('"x":0,"y":0,"w":1,"h":0.38'));
    assert.throws(()=>m.validateExperimentalPlan({...six,layout:'unknown'},source),/配置/);
    assert.throws(()=>m.validateExperimentalPlan({...six,layout:undefined},source),/配置/);
    const brokenBreakout=structuredClone(six);brokenBreakout.layout='two_columns';brokenBreakout.panels[2].breakout={part:'手',into:6};
    assert.throws(()=>m.validateExperimentalPlan(brokenBreakout,source),/隣接/);
  });
  test('shared STEP3 visibly names the selected route; switch itself exposes no automatic API action',()=>{
    for(const experimentEnabled of [false,true]) {
      const html=renderToStaticMarkup(React.createElement(Step3,{currentStep:3,experimentEnabled}));
      assert.match(html,experimentEnabled?/5～8コマ用の指示文/:/4コマ用の指示文/);
    }
    const props={currentStep:3,onModeChange:()=>{}};
    const html=renderToStaticMarkup(React.createElement(Panel,{...props,enabled:false}));
    assert.match(html,/role="switch" aria-checked="false"/);
    assert.match(html,/右に切り替えると「5～8コマ生成」になり、最初から5～8コマのシナリオ/);assert.doesNotMatch(html,/4コマ生成へ戻す|乱れる場合|元の4コマ台本/);
    assert.doesNotMatch(html,/実験画像を1枚生成/);
    const active=renderToStaticMarkup(React.createElement(Panel,{...props,enabled:true}));
    assert.match(active,/4コマ生成へ戻す/);assert.match(active,/乱れる場合/);
    assert.doesNotMatch(active,/実験画像を1枚生成|実験を停止|Web貼付用プロンプトをコピー|実験プロンプトと画像/);
    assert.doesNotMatch(active,/通常と同じSTEP4|合計120秒|60秒まで|API 2回/);
    assert.doesNotMatch(active,/<details|<summary/);
    assert.match(active,/動きの軌跡/);
  });
  test('experimental selector is available before STEP2 generation and hidden during source work',()=>{
    for (const currentStep of [1,2,3,4,5]) {
      for (const enabled of [false,true]) {
        for (const phase of [{}, {isAnalyzing:true}, {isSearching:true}]) {
          const html=renderToStaticMarkup(React.createElement(Panel,
            {currentStep,enabled,...phase,onModeChange:()=>{}},
            React.createElement('div',{'data-testid':'step3-content'},'STEP3')));
          const expected=currentStep>=2&&!phase.isAnalyzing&&!phase.isSearching;
          assert.equal(html.includes('role="switch"'),expected,JSON.stringify({currentStep,enabled,...phase}));
          assert.equal(html.includes('step3-content'),false,'STEP3 is mounted separately from the STEP2 mode selector');
          assert.doesNotMatch(html,/position:(?:fixed|sticky)/);
        }
      }
    }
  });
  test('experimental footer retains the scenario model attribution',()=>{
    const options={...input,showWatermarks:true,imageEngineLabel:'ChatGPT Images',scenarioModelLabel:'Scenario model'};
    assert.match(m.buildExperimentalImagePrompt(six,source,options),/ChatGPT Images \/ Scenario model \/ FURU/);
    assert.match(m.buildExperimentalReviewPrompt(six,source,options),/ChatGPT Images \/ Scenario model \/ FURU/);
  });
  test('page boundary rejects cross-mode prompts and changed input before generation',async()=>{
    const prepared=await m.prepareExperimentalManga(input,async request=>planResponse(request,six));
    const {prompt}=prepared;
    assert.match(prompt,/^Create ONE complete Japanese manga page with EXACTLY 6 framed panels\./);
    assert.match(prompt,/\nSHOT P\d+(?:\/P\d+)* ONLY:/,'exercise a prompt with shared shot clauses');
    assert.deepEqual(resolvePageWorkflow({experimentalEnabled:false,prompt:'normal four-panel prompt'}),{kind:'four-panel',count:4});
    assert.deepEqual(resolvePageWorkflow({experimentalEnabled:true,prepared,prompt,input}),{kind:'experimental-manga',count:6});
    assert.throws(()=>resolvePageWorkflow({experimentalEnabled:false,prompt}),/通常4コマ/);
    assert.throws(()=>resolvePageWorkflow({experimentalEnabled:true,prepared,prompt:prompt+' changed',input}),/変更/);
    assert.throws(()=>resolvePageWorkflow({experimentalEnabled:true,prepared,prompt,input:{...input,castList:'別の人'}}),/変更/);
    assert.throws(()=>resolvePageWorkflow({experimentalEnabled:true,prepared,prompt,input:{...input,showWatermarks:!input.showWatermarks}}),/変更/);
  });
  test('the accepted image carries its own verdict after best-candidate selection',()=>{
    const old={base64Img:'old'},next={base64Img:'new'};
    for(const oldPass of [false,true]) for(const nextPass of [false,true]) for(const retained of [false,true]) {
      const outcome={candidate:next,finalReview:{pass:nextPass,issues:[]},history:[],canContinue:true};
      const result=applyPageCandidateSelection(outcome,{candidate:retained?old:next,comparison:{preferred:retained?'original':'repair'}},{pass:oldPass,issues:[]});
      assert.equal(result.finalReview.pass,retained?oldPass:nextPass);
      assert.equal(result.validationWarning,!(retained?oldPass:nextPass));
      assert.equal(result.candidate,retained?old:next);
    }
  });
  test('experimental explanation describes native STEP2 generation and retained mode contents',()=>{
    for(const enabled of [false,true]) {
      const html=renderToStaticMarkup(React.createElement(Panel,{enabled,currentStep:3,onModeChange:()=>{},normalBusy:false},React.createElement('button',null,'STEP3 sentinel')));
      assert.match(html,/aria-controls="experimental-manga-description"/);
      assert.match(html,/<div id="experimental-manga-description" style="color:#cbd5e1;font-size:11.5px">/);
      const short='スイッチが左のときは「4コマ生成」です。右に切り替えると「5～8コマ生成」になり、最初から5～8コマのシナリオを作成して、内容に合ったコマ配置で漫画にします。';
      if(enabled) {
        assert.ok(!html.includes(short));
        for(const sentence of ['左右2列、横長と分割の組み合わせ','シナリオのコマ数・順序・カメラ・画風・台詞を保ち','左の4コマ生成へ戻す：','作成済みの4コマの台本と生成結果へ戻ります。','左の「4コマ生成」に戻してご利用ください。']) assert.ok(html.includes(sentence));
      } else {
        assert.ok(html.includes(short));
        assert.ok(!html.includes('左右2列'));
        assert.ok(!html.includes('4コマ生成へ戻す：'));
      }
      assert.doesNotMatch(html,/STEP3 sentinel|元の4コマ台本/);
      assert.equal((html.match(/<button/g)||[]).length,1,'no separate disclosure button');
    }
  });
  test('shared review cancellation adds no cumulative timer and rejects a late result after user stop',async t=>{
    t.mock.timers.enable({apis:['setTimeout','Date'],now:0});
    beginApiWork();
    let received,late;
    const pending=withImageReviewCancellation(signal=>{received=signal;return new Promise(resolve=>{late=resolve;});});
    await new Promise(resolve=>setImmediate(resolve));
    t.mock.timers.tick(1_200_000);
    assert.equal(received.aborted,false,'the wrapper does not add a timer on top of provider requests');
    late({pass:true});assert.deepEqual(await pending,{pass:true});
    let stoppedSignal,lateAfterStop;
    const stopped=withImageReviewCancellation(signal=>{stoppedSignal=signal;return new Promise(resolve=>{lateAfterStop=resolve;});});
    await new Promise(resolve=>setImmediate(resolve));
    cancelApiWork();await assert.rejects(stopped,error=>error.code==='CANCELLED');
    assert.equal(stoppedSignal.aborted,true);lateAfterStop({pass:true});
    beginApiWork();
    await assert.rejects(withImageReviewCancellation(async()=>{throw Object.assign(new Error('provider timeout'),{code:'TIMEOUT'});}),error=>error.code==='TIMEOUT');
    let requests=0;
    const stoppedBeforeStart=withImageReviewCancellation(async()=>{requests++;});
    cancelApiWork();await assert.rejects(stoppedBeforeStart,error=>error.code==='CANCELLED');
    assert.equal(requests,0,'stop between scheduling and request start prevents the request');
    beginApiWork();
  });
} finally { await server.close(); }
