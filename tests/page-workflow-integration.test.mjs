import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import test from 'node:test';

const source=await readFile(new URL('../src/hooks/useMangaWorkflow.js',import.meta.url),'utf8');
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;

for (const status of ['pass','warning','unverified']) {
  test(`shared experimental QA retains observations and validation diagnostics: ${status}`,async()=>{
    const body=source.slice(source.indexOf('const reviewImageCandidate = async'))
      .match(/if\(experimentalPrepared\) \{([\s\S]*?)\r?\n        \}\r?\n        progressPhase/)[1];
    const review={status,observedCount:status==='unverified'?null:6,readingOrder:'pass',camera:'pass',style:'pass',story:'pass',anatomy:status==='warning'?'fail':'pass',pageText:'pass',issues:status==='pass'?[]:['人物の重複を検出'],
      validationErrors:status==='unverified'?['evidence[2].camera: missing or too short']:[],
      pageEvidence:'実画像で確認した題字と左右のクレジット',
      evidence:[{panel:1,dialogue:['本当に、ここ？'],camera:'頭頂部と机の天板が見える',
        style:'人物の顔も透明な水彩で描かれている',story:'右側の人物が窓を開いている',anatomy:'人物の腕は両肩から連続している'}]};
    const candidate={},progress=[],log=[];
    const scope={candidate,experimentalPrepared:{plan:{count:6},source:{}},generationScenario:'scenario',
      experimentalInput:()=>({}),buildExperimentalReviewPrompt:()=>'',reviewExperimentalImage:async()=>({review,requests:2}),
      validateExperimentalReview:x=>x,onReviewProgress:value=>progress.push(value),signal:undefined,
      reviewRequest:()=>{},statCallback:value=>log.push(value),progressPhase:''};
    const result=await new AsyncFunction(...Object.keys(scope),body)(...Object.values(scope));
    assert.equal(result.pass,status==='pass');
    assert.equal(candidate.experimentalReview,review);
    const observed=Object.values(result.observations).join('\n');
    for(const value of [review.pageEvidence,...Object.values(review.evidence[0]).filter(v=>typeof v==='string'),'本当に、ここ？',...review.validationErrors]) {
      assert.ok(observed.includes(value),`lost observation: ${value}`);
    }
    assert.deepEqual(progress.at(-1),result);
    const verdict=JSON.parse(result.observations['検査の項目別判定']);
    assert.equal(verdict.observedCount,review.observedCount);
    assert.equal(verdict.status,status);
    assert.equal(verdict.anatomy,review.anatomy);
    assert.ok(log.join('\n').includes('本当に、ここ？'),'each candidate observation must survive later selection of an older image');
    if(status==='warning')assert.notEqual(result.issues[0].type,'unverified');
    if(status==='unverified')assert.equal(result.issues[0].type,'unverified');
  });
}

function modeHarness() {
  const body=source.match(/const changePageMode = ([\s\S]+?);\r?\n  \/\/ --- Step 3/)[1];
  const state={isApiProcessing:false,experimentalEnabled:false,scenario:'original scenario',inputMode:'manual',manualTopic:'original request',
    castListRef:{current:'original cast'},colorMode:'color',showWatermarks:true,mosaicCopyrightedCharacters:true,
    selectedEngine:'chatgpt',openAIImageQuality:'max',scenarioUsedModelRef:{current:'model'},
    imagesRef:{current:[]},referenceAssetsRef:{current:[]},bg360EnabledRef:{current:false},bg360ImageRef:{current:null},
    bg360Analysis:null,styleJson:{},getCurrentPromptProviderFamily:()=> 'chatgpt',
    promptAssemblyRunRef:{current:0},finalPrompt:'normal prompt',generatedImage:'normal image',
    generationHistory:[{image:'normal image'}],genLog:['normal log'],assembleThought:'normal assembly'};
  for(const prop of ['finalPrompt','generatedImage','generationHistory','genLog','assembleThought']) {
    state[`set${prop[0].toUpperCase()}${prop.slice(1)}`]=value=>{state[prop]=value;};
  }
  const scope=new Proxy(state,{has:()=>true,get:(target,key)=>key===Symbol.unscopables?undefined:key in target?target[key]:globalThis[key]});
  const change=new Function('scope',`with(scope){return (${body});}`)(scope);
  return {state,change};
}

for(const changed of ['unchanged','scenario','cast','color','watermark','references','provider','direction']) {
  test(`mode restore ${changed}: preserve history and restore only matching prompt inputs`,()=>{
    const {state,change}=modeHarness();
    change(true);state.experimentalEnabled=true;
    state.finalPrompt='experimental prompt';state.generatedImage='experimental image';
    state.generationHistory=[{image:'experimental image'}];
    if(changed==='scenario')state.scenario='new scenario';
    if(changed==='cast')state.castListRef.current='new cast';
    if(changed==='color')state.colorMode='monochrome';
    if(changed==='watermark')state.showWatermarks=false;
    if(changed==='references')state.imagesRef.current=['new reference'];
    if(changed==='provider')state.selectedEngine='gemini';
    if(changed==='direction')state.manualTopic='new page direction';
    change(false);
    assert.equal(state.finalPrompt,changed==='unchanged'?'normal prompt':'');
    assert.equal(state.generatedImage,'normal image');
    assert.deepEqual(state.generationHistory,[{image:'normal image'}]);
    assert.equal(state.promptAssemblyRunRef.pages.experimental.generatedImage,'experimental image');
  });
}

test('full-auto passes the newly generated scenario through shared STEP3 and STEP4',async()=>{
  const body=source.match(/const fullAutoProviderFamily = getCurrentPromptProviderFamily\(\);([\s\S]*?const step4ok = await regenerateImage\([^;]+;)/)[0];
  const calls=[];
  const scope={generatedScenario:'new scenario',getCurrentPromptProviderFamily:()=> 'chatgpt',
    assemblePrompt:async(...args)=>{calls.push(['step3',...args]);return 'new prompt';},
    regenerateImage:async(...args)=>{calls.push(['step4',...args]);return true;},
    isCurrent:()=>true,fullAutoAbortRef:{current:false},setFullAutoStep:()=>{},
    window:{scrollTo:()=>{}},document:{body:{scrollHeight:100}},setTimeout:fn=>fn()};
  await new AsyncFunction(...Object.keys(scope),body)(...Object.values(scope));
  assert.deepEqual(calls,[['step3',true,'new scenario','chatgpt'],['step4',true,'new prompt',{sourceScenario:'new scenario'}]]);
});

test('experimental preparation takes current cast and actual scenario model from shared workflow refs',()=>{
  const body=source.match(/const experimentalInput = ([\s\S]+?);\r?\n  const changePageMode/)[1];
  const scope={scenario:'old scenario',castList:'old cast',castListRef:{current:'current cast'},inputMode:'manual',manualTopic:'完成ページは5〜8コマで、無言の間を残す',
    colorMode:'color',mosaicCopyrightedCharacters:false,showWatermarks:true,isOpenAIEngine:true,
    formatOpenAIImageEngineName:()=> 'image model',openAIImageQuality:'max',scenarioModelId:'selected',
    scenarioUsedModelRef:{current:'actual'},OPENAI_SCENARIO_MODEL_OPTIONS:[{id:'selected',label:'selected model'},{id:'actual',label:'actual model'}],
    referenceAssetsRef:{current:[]},imagesRef:{current:[]},bg360Enabled:false,bg360Analysis:null,bg360Image:null,
    buildReferenceAssetContext:()=>'',buildOpenAIReferencePlan:()=>({rolePrompt:''}),getOpenAIPromptBodyBudget:()=>32000,
    summarizeExperimentalLayouts:x=>x,generationHistory:[]};
  const input=new Function(...Object.keys(scope),`return (${body})`)(...Object.values(scope))('new scenario');
  assert.equal(input.scenario,'new scenario');
  assert.equal(input.castList,'current cast');
  assert.equal(input.scenarioModelLabel,'actual model');
  assert.equal(input.userDirection,scope.manualTopic);
  scope.inputMode='news';
  const newsInput=new Function(...Object.keys(scope),`return (${body})`)(...Object.values(scope))('new scenario');
  assert.equal(newsInput.userDirection,'','news mode must not reuse an old manual request');
});

for (const colorMode of ['color','monochrome']) {
  test('experimental STEP3 reserves transport references once: '+colorMode,async()=>{
    const {buildOpenAIReferencePlan,getOpenAIPromptBodyBudget,appendOpenAIReferencePrompt}=await import('../src/lib/openai-image-references.js');
    const {buildReferenceAssetContext,buildWebReferencePlan}=await import('../src/lib/reference-assets.js');
    const source=await readFile(new URL('../src/hooks/useMangaWorkflow.js',import.meta.url),'utf8');
    const body=source.match(/const experimentalInput = ([\s\S]+?);\r?\n  const changePageMode/)[1];
    const images=['data:image/png;base64,YQ==','data:image/png;base64,Yg=='];
    const scope={scenario:'source',castListRef:{current:'cast'},colorMode,mosaicCopyrightedCharacters:false,showWatermarks:true,
      inputMode:'manual',manualTopic:'retain detailed source',isOpenAIEngine:true,formatOpenAIImageEngineName:()=> 'ChatGPT Images 2.5',openAIImageQuality:'high',
      GEMINI_IMAGE_MODEL:'gemini',OPENAI_SCENARIO_MODEL_OPTIONS:[],scenarioUsedModelRef:{current:'gpt-6-luna'},
      buildReferenceAssetContext,buildWebReferencePlan,buildOpenAIReferencePlan,getOpenAIPromptBodyBudget,
      referenceAssetsRef:{current:[]},imagesRef:{current:images},bg360Enabled:false,bg360Analysis:null,bg360Image:null,
      summarizeExperimentalLayouts:()=>[],generationHistory:[]};
    const input=new Function(...Object.keys(scope),'return ('+body+')();')(...Object.values(scope));
    const refs=buildOpenAIReferencePlan({compact:true,characterImages:images,colorMode});
    assert.equal(input.promptMaxChars,getOpenAIPromptBodyBudget(refs));
    assert.equal(input.referenceContext,buildReferenceAssetContext([],images,{purpose:'image',panorama:null}));
    assert.ok(!input.referenceContext.includes('[IMAGE REFERENCE ROLES]'),'transport appends the authoritative role map for both API and Web');
    const bodyPrompt='あ'.repeat(input.promptMaxChars);
    assert.equal(appendOpenAIReferencePrompt(bodyPrompt,refs).length,32000);
    assert.throws(()=>appendOpenAIReferencePrompt(bodyPrompt+'い',refs),/上限/);
  });
}

test('only experimental candidate comparison receives the expanded-page contract',()=>{
 assert.equal((source.match(/approvedExperimentalPage:buildExperimentalPageContract/g)||[]).length,1);
 assert.match(source,/if\(experimentalPrepared\)[\s\S]*selectExperimentalCandidate[\s\S]*approvedExperimentalPage:buildExperimentalPageContract\(experimentalPrepared.plan,experimentalPrepared.source\)/);
 assert.match(source,/buildImageQualityComparisonPrompt\(\{ scenario:generationScenario, castList, finalPrompt: originalPrompt, \.\.\.comparisonOptions \}\)/);
});
