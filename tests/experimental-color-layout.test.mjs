import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { createServer } from 'vite';

const server=await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
try {
  const m=await server.ssrLoadModule('/src/lib/experimental-manga.js');
  const {validateMangaScenario}=await server.ssrLoadModule('/src/lib/scenario-validation.js');
  const fixture=(count=5)=>({enabled:true,scenarioMode:'experimental-manga',colorMode:'color',castList:'## ユウ',showWatermarks:false,mosaicCopyrightedCharacters:false,
    scenario:Array.from({length:count},(_,i)=>`[${i+1}コマ目]\n[Camera: ${i%2?'床から強く見上げる':'机の上から強く俯瞰'}]\n[EMOTION: NORMAL]\n状況: ユウが道具${i+1}を手に取る。\nユウ「手順${i+1}」`).join('\n'),
    userDirection:'作業の順序を保つ',referenceContext:'人物参照',referenceImages:['image-a'],backgroundImage:null,backgroundEnabled:false});
  const planFor=input=>({count:m.readExperimentalSource(input).panels.length,layout:'two_columns',reason:'手順を読みやすく並べる',panels:m.readExperimentalSource(input).panels.map(p=>({sourcePanel:p.id,kind:'anchor',camera:p.camera,action:`ユウが道具${p.id}を手に取る。`,dialogueIds:p.dialogueIds,breakout:null}))});
  const prepare=input=>m.prepareExperimentalManga(input,async()=>JSON.stringify(planFor(input)));

  for(const count of [5,8]) test(`native ${count}-panel color round trips recompile the same layout without another planning request`,async()=>{
    const input=fixture(count);let requests=0;
    let previous=await prepare(input);
    const original=previous;
    for(const colorMode of ['monochrome','color','monochrome','color']) {
      const next=await m.prepareExperimentalManga({...input,colorMode,recentLayouts:[{layout:'hero_top'}],promptMaxChars:31000},async()=>{requests++;return JSON.stringify({...planFor(input),layout:'hero_top'});},{colorOnlyPrepared:previous});
      assert.equal(next.plan.layout,original.plan.layout);
      assert.deepEqual(next.plan.panels,original.plan.panels);
      assert.equal(next.source.colorMode,colorMode);
      assert.equal(next.prompt.includes('BLACK AND WHITE ink and screentones only'),colorMode==='monochrome');
      previous=next;
    }
    assert.equal(requests,0);
    assert.equal(previous.prompt,original.prompt);
    assert.equal(original.source.colorMode,'color','recompilation does not mutate the stored source');
  });

  test('ordinary STEP3 still requests a fresh layout and legacy or tampered preparation is never reused',async()=>{
    const input=fixture(),old=await prepare(input);let requests=0;
    const request=async()=>{requests++;return JSON.stringify({...planFor(input),layout:'hero_top'});};
    assert.equal((await m.prepareExperimentalManga(input,request)).plan.layout,'hero_top');
    for(const previous of [{source:old.source,plan:old.plan,prompt:old.prompt},{...old,prompt:old.prompt+' stale'},{...old,plan:{...old.plan,layout:'unknown'}},{...old,source:{...old.source,scenario:old.source.scenario+' changed'}}]) {
      assert.equal((await m.prepareExperimentalManga({...input,colorMode:'monochrome'},request,{colorOnlyPrepared:previous})).plan.layout,'hero_top');
    }
    assert.equal(requests,5);
  });

  test('source, reference and explicit rendering changes require normal planning even after color selection',async()=>{
    const input=fixture(),previous=await prepare(input);
    const changes=[
      {scenario:input.scenario.replace('道具1','道具を確認してから部品1')}, {castList:input.castList+'\n髪: 黒'},
      {userDirection:'手順と動作を変える'}, {referenceContext:'別の素材指定'}, {referenceImages:['image-b']},
      {backgroundImage:'background-b'}, {backgroundEnabled:true}, {showWatermarks:true},
      {mosaicCopyrightedCharacters:true}, {imageEngineLabel:'別の画像エンジン'}, {scenarioModelLabel:'別の台本モデル'},
    ];
    for(const change of changes) {
      let requests=0;const next={...input,colorMode:'monochrome',...change};
      const result=await m.prepareExperimentalManga(next,async()=>{requests++;return JSON.stringify({...planFor(next),layout:'hero_top'});},{colorOnlyPrepared:previous});
      assert.equal(requests,1,JSON.stringify(change));assert.equal(result.plan.layout,'hero_top');
    }
    let requests=0;
    await assert.rejects(m.prepareExperimentalManga({...input,colorMode:'monochrome',scenario:'not a scenario'},async()=>{requests++;},{colorOnlyPrepared:previous}),/STEP2/);
    assert.equal(requests,0);
  });

  test('color-only reuse accepts a stored compact prompt when the new budget changes',async()=>{
    const input=fixture(5),full=await prepare(input);
    const previous=await prepare({...input,promptMaxChars:full.prompt.length-1});
    assert.ok(previous.prompt.length<full.prompt.length,'fixture exercises the compact form');
    let requests=0;
    const next=await m.prepareExperimentalManga({...input,colorMode:'monochrome',promptMaxChars:31000},async()=>{requests++;return JSON.stringify(planFor(input));},{colorOnlyPrepared:previous});
    assert.equal(requests,0);
    assert.deepEqual(next.plan,previous.plan);
  });

  test('color-only reuse checks the current prompt budget and cancellation without falling through to a paid plan',async()=>{
    const input=fixture(),previous=await prepare(input);let requests=0;
    const request=async()=>{requests++;return JSON.stringify(planFor(input));};
    await assert.rejects(m.prepareExperimentalManga({...input,colorMode:'monochrome',promptMaxChars:100},request,{colorOnlyPrepared:previous}));
    const controller=new AbortController();controller.abort();
    await assert.rejects(m.prepareExperimentalManga({...input,colorMode:'monochrome',signal:controller.signal},request,{colorOnlyPrepared:previous}),{name:'AbortError'});
    await assert.rejects(m.prepareExperimentalManga({...input,enabled:false},request,{colorOnlyPrepared:previous}),/OFF/);
    assert.equal(requests,0);
  });

  const hook=await readFile(new URL('../src/hooks/useMangaWorkflow.js',import.meta.url),'utf8');
  const callback=name=>{
    const start=hook.indexOf(`const ${name} = `);
    assert.ok(start>=0,name);
    return hook.slice(start+`const ${name} = `.length,hook.indexOf('\n  };',start)+4);
  };
  const inputStart=hook.indexOf('const experimentalInput = ');
  const inputCallback=hook.slice(inputStart+'const experimentalInput = '.length,hook.indexOf('\n  const changePageMode',inputStart)).trim().replace(/;$/,'');
  function workflowState() {
    const input=fixture();
    const state={...input,isColorModeLocked:false,isOpenAIEngine:false,experimentalEnabled:true,scenarioModelId:'test-model',
      castListRef:{current:input.castList},imagesRef:{current:input.referenceImages},referenceAssetsRef:{current:[]},bg360Image:null,bg360Enabled:false,bg360Analysis:null,bg360EnabledRef:{current:false},
      scenarioUsedModelRef:{current:null},OPENAI_SCENARIO_MODEL_OPTIONS:[],GEMINI_IMAGE_MODEL:'gemini-nano-banana-test',inputMode:'manual',manualTopic:input.userDirection,
      generationHistory:[{img:'saved-image'}],generatedImage:'visible-image',finalPrompt:'',isAssembling:false,referenceEditorError:'',
      isApiProcessing:false,punchlineType:'Auto',selectedEngine:'gemini',openAIImageQuality:'max',styleJson:null,bg360ImageRef:{current:null},
      originalScenario:'',scenarioThought:'',explanation:'',explanationNotice:'',mangaTitle:'',enhanceLog:'',lockedLocation:'',lockedOutfit:'',bg360CameraWork:null,bg360CroppedPanels:[],usedModel:null,genLog:[],assembleThought:'',resolvedPunchlineTypeRef:{current:''},
      promptAssemblyRunRef:{current:0},promptAssemblyAbortRef:{current:null},scenarioRunEpochRef:{current:0},copyFeedbackTimerRef:{current:null},lastPolicyErrorRef:{current:''},
      normalizeMangaColorMode:v=>v==='monochrome'?v:'color',assertImageInputBudget:()=>{},beginApiWork:()=>{},normalizePromptProviderFamily:v=>v,
      getCurrentPromptProviderFamily:()=> 'gemini',buildReferenceAssetContext:()=>input.referenceContext,summarizeExperimentalLayouts:m.summarizeExperimentalLayouts,
      validateMangaScenario,formatMangaScenarioValidationIssue:()=> 'invalid',prepareExperimentalManga:m.prepareExperimentalManga,
      showStatus:message=>{state.status=message;},translateApiError:error=>{state.lastError=error.message;return error.message;},requests:0,
      updateResolvedPunchlineType:value=>{state.resolvedPunchlineTypeRef.current=value;},
      callAI:async()=>{state.requests++;return {text:JSON.stringify(planFor({...input,scenario:state.scenario}))};}};
    const scope=new Proxy(state,{has:()=>true,get:(s,k)=>{
      if(k===Symbol.unscopables)return undefined;
      if(k in s)return s[k];
      if(typeof k==='string'&&/^set[A-Z]/.test(k))return v=>{const key=k==='setColorModeState'?'colorMode':k[3].toLowerCase()+k.slice(4);s[key]=typeof v==='function'?v(s[key]||''):v;};
      if(k in globalThis)return globalThis[k];
      throw Error('Missing dependency '+String(k));
    }});
    const bind=text=>new Function('scope',`with(scope){return (${text});}`)(scope);
    state.invalidatePromptAssembly=bind(callback('invalidatePromptAssembly'));
    state.experimentalInput=bind(inputCallback);
    return {state,setColor:bind(callback('setColorMode')),assemble:bind(callback('assemblePrompt')),changePage:bind(callback('changePageMode')),resetPages:bind(callback('resetPageCaches'))};
  }

  test('real selection and STEP3 callbacks preserve image/history and reuse only the pending color change',async()=>{
    const {state,setColor,assemble}=workflowState();
    assert.ok(await assemble(),state.status);assert.equal(state.requests,1);
    const originalLayout=state.promptAssemblyRunRef.experimentalPrepared.plan.layout;
    for(const colorMode of ['monochrome','color','monochrome','color']) {
      const requests=state.requests;setColor(colorMode);
      assert.equal(state.finalPrompt,'');assert.equal(state.generatedImage,'visible-image');
      assert.deepEqual(state.generationHistory,[{img:'saved-image'}]);assert.equal(state.requests,requests);
      assert.ok(await assemble(),state.status);assert.equal(state.requests,requests);
      assert.equal(state.promptAssemblyRunRef.experimentalPrepared.plan.layout,originalLayout);
    }
    await assemble();assert.equal(state.requests,2,'explicit normal STEP3 rerun still replans');
    setColor('monochrome');state.scenario=state.scenario.replace('道具1','別の部品1');
    assert.ok(await assemble(),state.status);assert.equal(state.requests,3,'editing after color selection needs a new plan');
    setColor('color');state.imagesRef.current=['replacement-image'];
    assert.ok(await assemble(),state.status);assert.equal(state.requests,4,'actual hook reference inputs participate in the reuse guard');
  });

  test('two color selections before STEP3 preserve the original plan, and ordinary mode still clears its stale image',async()=>{
    const {state,setColor,assemble}=workflowState();await assemble();const original=state.finalPrompt;
    setColor('monochrome');setColor('color');
    assert.ok(await assemble(),state.status);assert.equal(state.requests,1);assert.equal(state.finalPrompt,original);
    state.experimentalEnabled=false;setColor('monochrome');assert.equal(state.generatedImage,null);
  });

  test('real STEP3 callback publishes the repaired scenario with the same completed preparation',async()=>{
    const {state,assemble}=workflowState();
    const original=state.scenario;
    state.scenario=original.replace('状況:','BalloonLayout: []\n状況:');
    const placement=[{speaker:'ユウ',x:0.7,anchor:'右の頭の輪郭',route:'上の余白から頭へ'}];
    const fixed=state.scenario.replace('BalloonLayout: []','BalloonLayout: '+JSON.stringify(placement));
    state.callAI=async()=>({text:++state.requests===1?JSON.stringify([{panel:1,field:'BalloonLayout',value:placement}]):JSON.stringify(planFor({...state,scenario:fixed}))});
    assert.ok(await assemble(),state.lastError);
    assert.equal(state.requests,2);assert.equal(state.scenario,fixed);
    assert.equal(state.promptAssemblyRunRef.completedScenario,fixed);
    assert.equal(state.promptAssemblyRunRef.experimentalPrepared.source.scenario,fixed);
    assert.equal(state.promptAssemblyRunRef.completedRun,state.promptAssemblyRunRef.current);
    assert.equal(state.generatedImage,'visible-image');
    assert.deepEqual(state.generationHistory,[{img:'saved-image'}]);
  });

  test('mode round trips and every reset clear pending color reuse without erasing saved history',async()=>{
    const {state,setColor,assemble,changePage,resetPages}=workflowState();await assemble();setColor('monochrome');
    assert.ok(state.promptAssemblyRunRef.colorLayoutPrepared);
    changePage(false);state.experimentalEnabled=false;
    assert.equal(state.promptAssemblyRunRef.colorLayoutPrepared,undefined);
    changePage(true);state.experimentalEnabled=true;
    assert.equal(state.promptAssemblyRunRef.colorLayoutPrepared,undefined);
    assert.ok(await assemble(),state.status);assert.equal(state.requests,2,'returning from another mode does not consume an old color-only request');
    setColor('color');assert.ok(state.promptAssemblyRunRef.colorLayoutPrepared);
    resetPages();assert.equal(state.promptAssemblyRunRef.colorLayoutPrepared,undefined);
    assert.equal(state.promptAssemblyRunRef.experimentalPrepared,null);
    assert.deepEqual(state.generationHistory,[{img:'saved-image'}]);
    for(const name of ['partialReset','hardReset']) assert.match(callback(name),/resetPageCaches\(\)/);
    assert.match(callback('step1Reset'),/partialReset\(\)/);
  });
} finally {await server.close();}
