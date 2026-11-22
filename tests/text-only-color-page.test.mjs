import assert from 'node:assert/strict';
import test from 'node:test';
import {createServer} from 'vite';

const server = await createServer({configFile:false, envFile:false, appType:'custom', logLevel:'silent', server:{middlewareMode:true, watch:null}});
try {
  const {buildExperimentalImagePrompt, readExperimentalSource} = await server.ssrLoadModule('/src/lib/experimental-manga.js');
  const {resolveFinalPromptReviewContract} = await server.ssrLoadModule('/src/lib/final-prompt-review-contract.js');
  const {buildOpenAIReferencePlan} = await server.ssrLoadModule('/src/lib/openai-image-references.js');
  const {assertRenderOptions} = await server.ssrLoadModule('/src/lib/render-options.js');
  const {resolvePageWorkflow} = await server.ssrLoadModule('/src/lib/page-workflow.js');
  const {applyPageComposition} = await server.ssrLoadModule('/src/lib/manga-page-composition.js');
  const castList = '## 1. アキ\n外見: 短い銀髪、丸い眼鏡。\n## 2. ナオ\n外見: 茶髪、赤い前掛け。';
  const shots = ['左上から見下ろす中景','棚の下から見上げる寄り','右上から斜めに俯瞰','床から見上げる広角'];
  const actions = ['アキが角の欠けた青い箱を見つける。','アキがナオへ箱の鍵を差し出す。','ナオが鍵で箱を開き、中の赤い風車を取り出す。','二人は窓に風車を飾る。'];
  const scenario = 'Topic: 窓の風車\nLogline: 古道具屋で二人が風車を見つける。\nLocation: 雨上がりの古道具屋。\nOutfit: アキは青いシャツ、ナオは赤い前掛け。\n'
    + 'PageComposition: {"layout":"two_columns","reason":"手元を追う","heroPanels":[],"breakouts":[],"bleed":[],"restraintReason":"小さな手仕事を同じ大きさで追う"}\n'
    + actions.map((action,i) => `[${i+1}コマ目]\n[Camera: ${shots[i]}]\n[EMOTION: NORMAL]\n状況: ${action}\n${['セリフなし','アキ「鍵、あったよ。」','ナオ「回った！」','セリフなし'][i]}`).join('\n');
  const input = {providerFamily:'chatgpt',colorMode:'color',scenario,castList,hasCharacterReferences:false,imageReferenceCount:0,
    allowScenarioQualityWarning:true,showTitle:true,showWatermarks:false,mosaicCopyrightedCharacters:true};
  const source = readExperimentalSource(input);
  const plan = applyPageComposition({count:4,layout:'two_columns',reason:'風車が見えるまでの手元の動作を読ませる。',
    panels:source.panels.map((p,i)=>({sourcePanel:p.id,kind:'anchor',camera:p.camera,action:`配置案による動作の言い換え${i+1}。`,dialogueIds:p.dialogueIds,breakout:null}))},source);

  test('zero-image color page foregrounds the actual story and sends one authoritative action per frame',()=>{
    const prompt = buildExperimentalImagePrompt(plan,source,input);
    assert.ok(prompt.indexOf('古道具屋で二人が風車を見つける。') < prompt.indexOf('[PAGE FRAME P1'), 'story context must precede the frames');
    assert.ok(prompt.indexOf('丸い眼鏡') < prompt.indexOf('[PAGE FRAME P1'), 'written cast must introduce the actors');
    const checked = resolveFinalPromptReviewContract({source,plan},prompt);
    for(const [i,frame] of checked.plan.panels.entries()) {
      assert.equal(frame.camera,shots[i]);
      assert.ok(frame.action.includes(actions[i]));
      assert.equal(prompt.split(actions[i]).length-1,1);
    }
    assert.doesNotMatch(prompt,/配置案による動作の言い換え/);
    assert.deepEqual(checked.plan.expectedDialogue.map(d=>[d.sourcePanel,d.speaker,d.text]),[[2,'アキ','鍵、あったよ。'],[3,'ナオ','回った！']]);
    assertRenderOptions(prompt,{...input,protectedCast:['アキ','ナオ']});
    assert.throws(()=>resolvePageWorkflow({experimentalEnabled:false,prompt}),/実験用/);
    assert.ok(prompt.length<6500,`non-story scaffolding displaced this short four-panel story (${prompt.length} characters)`);
  });

  test('background, style and continuity references each retain the image-conditioned route even with no character photos',()=>{
    const png='data:image/png;base64,iVBORw0KGgo=';
    const cases=[{}, {backgroundEnabled:true,backgroundImage:png}, {mediumReference:{styles:['WATERCOLOR'],imageUrl:png}},
      {continuityReferences:[{sourcePageId:'previous-page',imageUrl:png}]}];
    for(const options of cases){
      const count=buildOpenAIReferencePlan(options).imageInputs.length;
      const prompt=buildExperimentalImagePrompt(plan,source,{...input,imageReferenceCount:count});
      const [frame]=resolveFinalPromptReviewContract({source,plan},prompt).plan.panels;
      assert.ok(frame.action.includes(count ? plan.panels[0].action : actions[0]));
    }
  });

  test('normal color art has pressure-varied G-pen ink by default; a supplied medium and reference keep their own rendering',()=>{
    const ink=/通常のカラーコマは強いGペンタッチ。[^\n]+/;
    const base=buildExperimentalImagePrompt(plan,source,input);
    assert.match(base,ink);
    const [instruction]=base.match(ink);
    assert.match(instruction,/手前の輪郭と重なりを太く/);
    assert.match(instruction,/指先の線は細く/);
    const userDirected={...source,userDirection:`扉の方向を維持する。\n${instruction}`};
    const directed=buildExperimentalImagePrompt(plan,userDirected,input);
    assert.equal(directed.split(instruction).length,2);
    assert.match(directed,/扉の方向を維持する。/);
    const watercolor={...source,panels:source.panels.map(panel=>({...panel,style:'WATERCOLOR'}))};
    assert.doesNotMatch(buildExperimentalImagePrompt(plan,watercolor,input),ink);
    assert.match(buildExperimentalImagePrompt(plan,watercolor,input),/画風 WATERCOLOR:/);
    assert.doesNotMatch(buildExperimentalImagePrompt(plan,source,{...input,imageReferenceCount:1,hasCharacterReferences:true}),ink);
  });

  test('a one-page personal footer uses both configured labels while a new distributed project omits them',()=>{
    const settings={showWatermarks:true,watermarkTexts:{left:'制作システム',right:'作画エンジン'}};
    const active=buildExperimentalImagePrompt(plan,source,{...input,...settings});
    assertRenderOptions(active,{...input,...settings});
    assert.match(active,/制作システム/);
    assert.match(active,/作画エンジン/);
    const plain=buildExperimentalImagePrompt(plan,source,input);
    assertRenderOptions(plain,input);
    assert.doesNotMatch(plain,/制作システム|作画エンジン/);
  });
} finally { await server.close(); }
