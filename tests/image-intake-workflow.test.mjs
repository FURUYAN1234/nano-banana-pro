import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { planImageAddition, assertImageInputBudget } from '../src/lib/image-input-budget.js';
import { parse360Analysis } from '../src/lib/panorama360.js';
import { buildReferenceAnalysisPrompt, parseReferenceAnalysis, getReferenceImagesToAnalyze, mergeReferenceAnalysis, reconcileReferenceCast, assertReferenceCharacterRequirement } from '../src/lib/reference-assets.js';
import {collectCastNameEntries} from '../src/lib/panel-utils.js';
import { DEFAULT_OPENAI_STEP1_MODEL_ID } from '../src/lib/openai-model-routes.js';

// Execute the production event handler with state/API boundaries instrumented.
const source = await readFile(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');
const handler = source.slice(source.indexOf('const processFiles = async'), source.indexOf('// --- Step 2.5:'))
  .replace(/^const processFiles = /, '').trim().replace(/;$/, '');
const sheets = count => Array.from({ length: count }, (_, i) => `data:image/png;base64,${Buffer.from(`sheet${i}`).toString('base64')}`);
const file = (data, panorama = false) => ({ name: 'sheet.png', type: 'image/png', data, panorama });
const jsonFile = { name: 'style.json', type: 'application/json', text: async () => JSON.stringify({ style_name: 'new style', reproduction_prompt: 'new prompt' }) };
function setup(existing = [], background = false) {
  const state = { images: [...existing], style: 'old style', background: 'old background', enabled: background, cast: '## Existing\nexisting named people', apiCalls: 0, error: '', analyzing: false, messages: [] };
  const imagesRef = { current: state.images };
  const referenceAssetsRef = { current: existing.map(image => ({image,analysisCompleted:true,items:[{kind:'character',name:'Existing',description:'user retained'}]})) };
  const ctx = {
    apiKey: true, analysisModelId: DEFAULT_OPENAI_STEP1_MODEL_ID, isAnalyzingRef: { current: false }, imagesRef,
    bg360EnabledRef: { current: background }, bg360ImageRef: {current: null}, scenarioRunEpochRef: { current: 1 }, castRevisionRef: { current: 1 },
    castListRef: {current:state.cast}, referenceAssetsRef, scenario:'', finalPrompt:'', isSearching:false, isGeneratingImage:false,
    isFullAutoModeRef: { current: false }, fullAutoAbortRef: { current: false },
    isEndlessModeRef: {current:false}, setIsEndlessMode:value=>{state.endless=value;}, setIsFullAutoMode:value=>{state.fullAuto=value;},
    setTriggerFullAuto:value=>{state.trigger=typeof value==='function'?value(state.trigger||0):value;},
    setFullAutoStep:value=>{state.fullAutoStep=value;},
    invalidateReferenceOutputs:()=>{ctx.scenarioRunEpochRef.current++;},
    getReferenceImagesToAnalyze, mergeReferenceAnalysis, reconcileReferenceCast, assertReferenceCharacterRequirement, collectCastNameEntries,
    planImageAddition, assertImageInputBudget,
    isEquirectangularFile: async f => f.panorama,
    readFileAsDataURL: async f => f.data,
    callAI: async (prompt, parts) => { state.apiCalls++; state.sentParts = parts;
      if (prompt === 'test-360') return {text: JSON.stringify({location:'gallery', lighting:'window daylight', spatialType:'indoor', objects:'bench', mood:'calm'})};
      return { text: JSON.stringify({ castList: '## 1. New Person\nnew named people', references: parts.map((_, index) => ({ imageIndex: index + 1,
        items: [{ kind: 'character', name: 'New Person', description: '人物設定資料' }] })) }), model: 'test' }; },
    buildReferenceAnalysisPrompt, parseReferenceAnalysis,
    setReferenceAssets: value => { state.assets = value; referenceAssetsRef.current=value; },
    getCharacterAnalysisPrompt: () => 'analyze all named people',
    setImagesState: value => { state.images = value; },
    setStyleJson: value => { state.style = value; },
    setBg360Image: value => { state.background = value; },
    setBg360Enabled: value => { state.enabled = value; },
    setCastList: value => { state.cast = value; ctx.castListRef.current = value; ctx.castRevisionRef.current++; },
    setImageInputError: value => { state.error = value; },
    setReferenceEditorError: value => { state.editorError = value; },
    setIsAnalyzing: value => { state.analyzing = value; },
    get360AnalysisPrompt: () => 'test-360', parse360Analysis, setBg360ImageParts: () => {},
    setIs360Analyzing: () => {}, setBg360Analysis: value => {state.analysis = value;}, setCustomLocation: value => {state.location = value;},
    showStatus: value => {state.messages.push(value);}, setShowModal: () => {}, beginApiWork: () => {}, setAnalyzeThought: () => {},
    setUsedModel: () => {}, setShowOpenAIKeyModal: () => {}, translateApiError: e => e.message,
    console: { error: () => {}, warn: () => {} }, setInterval: () => 1, clearInterval: () => {},
  };
  const start = source.indexOf('const setImages = (value) =>');
  const setter = source.slice(start, source.indexOf('  const [imageInputError', start))
    .replace(/^const setImages = /, '').trim().replace(/;$/, '');
  ctx.setImages = new Function(...Object.keys(ctx), 'return ('+setter+');')(...Object.values(ctx));
  const bindProcess=()=>new Function(...Object.keys(ctx), `return (${handler});`)(...Object.values(ctx));
  return { state, ctx, bindProcess, processFiles: bindProcess() };
}

test('over-limit mixed drop keeps images, style, background and cast; no API call', async () => {
  const { state, processFiles } = setup(sheets(13));
  const before = { ...state, images: [...state.images] };
  await processFiles([jsonFile, file('data:image/png;base64,bmV3MQ=='), file('data:image/png;base64,bmV3Mg==')]);
  for (const key of ['images', 'style', 'background', 'enabled', 'cast']) assert.deepEqual(state[key], before[key]);
  assert.equal(state.apiCalls, 0);
  assert.match(state.error, /14枚/);
  assert.equal(state.analyzing, false);
});

test('new panorama cannot shrink an existing 11-sheet budget; rejection is atomic', async () => {
  const { state, processFiles } = setup(sheets(11));
  await processFiles([jsonFile, file('data:image/png;base64,Ymc=', true)]);
  assert.equal(state.images.length, 11);
  assert.equal(state.style, 'old style');
  assert.equal(state.background, 'old background');
  assert.equal(state.enabled, false);
  assert.equal(state.apiCalls, 0);
  assert.match(state.error, /10枚/);
});

test('at full capacity a JSON-only selection and a duplicate image remain allowed', async () => {
  const { state, processFiles } = setup(sheets(14));
  await processFiles([jsonFile, file(state.images[0])]);
  assert.equal(state.images.length, 14);
  assert.equal(state.style.style_name, 'new style');
  assert.equal(state.apiCalls, 0);
  assert.equal(state.error, '');
});

test('ordinary new sheet is retained and follows normal character analysis', async () => {
  const { state, processFiles } = setup(sheets(1));
  await processFiles([file('data:image/png;base64,bmV3')]);
  assert.equal(state.images.length, 2);
  assert.equal(state.apiCalls, 1);
  assert.equal(state.cast, '## 1. New Person\nnew named people\n\n## Existing\nexisting named people');
  assert.equal(state.sentParts.length, 1, 'only the new image is analyzed; existing recognition is retained');
  assert.equal(state.assets.length, 2);
  assert.equal(state.error, '');
});

test('background switch rejects 11 sheets but accepts 10 using the actual setter', () => {
  const start = source.indexOf('const setBg360Enabled = (value) =>');
  const setter = source.slice(start, source.indexOf('const imageInputBudget =', start))
    .replace(/^const setBg360Enabled = /, '').trim().replace(/;$/, '');
  for (const count of [11, 10]) {
    const background = { current: false }; let displayed = false; let error = '';
    const ctx = { bg360EnabledRef: background, bg360ImageRef:{current:'panorama'}, invalidateReferenceOutputs:()=>{}, imagesRef: { current: sheets(count) }, assertImageInputBudget,
      setImageInputError: value => { error = value; }, setBg360EnabledState: value => { displayed = value; } };
    const change = new Function(...Object.keys(ctx), `return (${setter});`)(...Object.values(ctx));
    assert.equal(change(true), count === 10);
    assert.equal(background.current, count === 10);
    assert.equal(displayed, count === 10);
    if (count === 11) assert.match(error, /10枚/); else assert.equal(error, '');
  }
});

test('the persistent file selector retains a file snapshot and allow repeat selection after rejection', async () => {
  const panel = await readFile(new URL('../src/components/Step1Panel.jsx', import.meta.url), 'utf8');
  const start = panel.indexOf('const handleFileChange =');
  const code = panel.slice(start, panel.indexOf('  return (', start))
    .replace(/^const handleFileChange = /, '').trim().replace(/;$/, '');
  const calls = [];
  const handle = new Function('apiKey', 'setShowModal', 'processFiles', `return (${code});`)(true, () => {}, files => calls.push(files));
  const selected = [file('one sheet with several people')];
  for (let i = 0; i < 2; i++) {
    const input = { files: selected, value: 'chosen-file' };
    handle({ target: input });
    assert.equal(input.value, '');
  }
  assert.deepEqual(calls, [selected, selected]);
  assert.equal((panel.match(/onChange=\{handleFileChange\}/g) || []).length, 1);
});


test('adding only a panorama retains existing materials and does not request another character upload', async () => {
  const {state, processFiles} = setup(sheets(3));
  const before = [...state.images];
  await processFiles([file('data:image/png;base64,cGFub3JhbWE=', true)]);
  assert.deepEqual(state.images, before);
  assert.equal(state.cast, '## Existing\nexisting named people');
  assert.equal(state.enabled, true);
  assert.equal(state.analysis.location, 'gallery');
  assert.equal(state.apiCalls, 1);
  assert.ok(state.messages.every(message => !/キャラクターシート.*追加|キャラクターシート.*一緒/.test(message)));
  assert.equal(state.analyzing, false);
});

test('failed duplicate is analyzed again while a completed duplicate needs no paid call',async()=>{
  const {state,ctx,processFiles}=setup(sheets(2));
  ctx.referenceAssetsRef.current[0].analysisCompleted=false;
  await processFiles([file(state.images[0])]);
  assert.equal(state.apiCalls,1); assert.equal(state.sentParts.length,1);
  assert.equal(state.assets[1].items[0].description,'user retained');
  await processFiles([file(state.images[0])]); assert.equal(state.apiCalls,1);
});

test('initial full-auto and endless arming survive its own material intake',async()=>{
  const {state,ctx,processFiles}=setup();
  ctx.isFullAutoModeRef.current=true; ctx.isEndlessModeRef.current=true;
  await processFiles([file(sheets(1)[0])]);
  assert.equal(state.fullAuto,true); assert.equal(state.endless,true);
  assert.ok(state.trigger); assert.equal(state.error,'');
});

for (const replacementName of ['New Person', 'Old Person']) test('delete then analyze replacement: '+replacementName, async () => {
  const {state,ctx,processFiles} = setup(sheets(2));
  const original = state.images[0];
  const retained = state.images[1];
  ctx.setReferenceAssets([
    {image:original,analysisCompleted:true,items:[{kind:'character',name:'Old Person',description:'Old sheet'}],castProfiles:{'Old Person':'## Old Person\nOld appearance'}},
    {image:retained,analysisCompleted:true,items:[{kind:'character',name:'Retained Person',description:'Retained sheet'}],castProfiles:{'Retained Person':'## Retained Person\nRetained appearance'}},
  ]);
  ctx.setCastList('## Old Person\nOld edited appearance\n\n## Retained Person\nRetained edited appearance');
  ctx.setImages(images=>images.filter(image=>image!==original));
  assert.doesNotMatch(state.cast,/Old Person|Old edited appearance/);
  const ordinaryCall = ctx.callAI;
  ctx.callAI = async (prompt,parts,...rest) => {
    assert.doesNotMatch(prompt,/Old edited appearance/);
    assert.match(prompt,/Retained edited appearance/);
    const response=await ordinaryCall(prompt,parts,...rest);
    return {...response,text:response.text.replaceAll('New Person',replacementName)};
  };
  const processReplacement = new Function(...Object.keys(ctx), 'return ('+handler+');')(...Object.values(ctx));
  const replacement = file('data:image/png;base64,cmVwbGFjZW1lbnQ=');
  await processReplacement([replacement]);
  assert.equal(state.apiCalls,1);
  assert.equal(state.sentParts.length,1);
  assert.deepEqual(state.images,[retained,replacement.data]);
  assert.match(state.cast,/new named people/);
  assert.match(state.cast,/Retained edited appearance/);
  assert.doesNotMatch(state.cast,/Old edited appearance/);
  assert.equal(state.assets[1].analysisCompleted,true);
  await processFiles([replacement]);
  assert.equal(state.apiCalls,1,'unchanged completed image does not trigger another paid call');
});

for(const kind of ['background','prop'])test(`first ${kind}-only drop is rejected after classification without replacing existing inputs`,async()=>{
  const {state,ctx,bindProcess}=setup();ctx.setCastList('');
  let finish;
  ctx.callAI=async()=>{state.apiCalls++;return new Promise(resolve=>{finish=()=>resolve({text:JSON.stringify({castList:'',references:[{imageIndex:1,items:[{kind,name:'素材',description:'人物はいない'}]}]})});});};
  const before={images:[...state.images],style:state.style,background:state.background,enabled:state.enabled,cast:state.cast};
  const run=bindProcess()([jsonFile,file(sheets(1)[0])]);
  await new Promise(resolve=>setImmediate(resolve));
  for(const key of Object.keys(before))assert.deepEqual(state[key],before[key],`pending ${key}`);
  finish();await run;
  for(const key of Object.keys(before))assert.deepEqual(state[key],before[key],`rejected ${key}`);
  assert.match(state.error,/人物を1人以上/);assert.match(state.error,/受け入れていません/);
  assert.equal(state.apiCalls,1);assert.equal(state.analyzing,false);assert.equal(ctx.isAnalyzingRef.current,false);
  assert.equal(ctx.isFullAutoModeRef.current,false);assert.equal(ctx.scenarioRunEpochRef.analysisFiles,null);
});

test('Story text supplies the registered actor for an ordinary background or prop image',async()=>{
  for(const kind of ['background','prop']) {
    const {state,ctx,bindProcess}=setup();
    const cast='## 1. 葵\n外見: 黒い短髪\n服装: 青い作業着';ctx.setCastList(cast);
    ctx.callAI=async()=>{state.apiCalls++;return {text:JSON.stringify({castList:'',references:[{imageIndex:1,items:[{kind,name:'素材',description:'背景または小物'}]}]})};};
    await bindProcess()([file(sheets(1)[0])]);
    assert.equal(state.cast,cast);assert.equal(state.images.length,1);assert.equal(state.assets[0].items[0].kind,kind);assert.equal(state.error,'');
  }
});

test('a first mixed character and background batch is accepted together and full-auto remains armed',async()=>{
  const {state,ctx,bindProcess}=setup();ctx.setCastList('');ctx.isFullAutoModeRef.current=true;
  state.editorError='previous invalid pasted text';
  ctx.callAI=async()=>{state.apiCalls++;return {text:JSON.stringify({castList:'## 1. 葵\n外見: 黒髪\n服装: 青い服',references:[
    {imageIndex:1,items:[{kind:'character',name:'葵',description:'人物設定'}]},
    {imageIndex:2,items:[{kind:'background',name:'部屋',description:'古い映写室'}]},
  ]})};};
  await bindProcess()(sheets(2).map(image=>file(image)));
  assert.equal(state.images.length,2);assert.deepEqual(state.assets.map(a=>a.items[0].kind),['character','background']);
  assert.deepEqual(collectCastNameEntries(state.cast).map(c=>c.displayName),['葵']);assert.equal(state.error,'');assert.equal(state.editorError,'');assert.ok(state.trigger);
});

test('panorama-only requires a registered actor before paid analysis; style JSON alone does not',async()=>{
  const {state,ctx,processFiles}=setup();ctx.setCastList('');
  await processFiles([file('data:image/png;base64,cGFub3JhbWE=',true)]);
  assert.equal(state.apiCalls,0);assert.equal(state.background,'old background');assert.equal(state.enabled,false);assert.match(state.error,/人物を1人以上/);
  await processFiles([jsonFile]);assert.equal(state.apiCalls,0);assert.equal(state.style.style_name,'new style');assert.equal(state.error,'');
});

test('a character and panorama in the same initial batch commit only after both analyses',async()=>{
  const {state,ctx,processFiles}=setup();ctx.setCastList('');
  await processFiles([file('data:image/png;base64,cGFub3JhbWE=',true),file(sheets(1)[0])]);
  assert.equal(state.apiCalls,2);assert.equal(state.enabled,true);assert.equal(state.analysis.location,'gallery');assert.equal(state.images.length,1);
  assert.equal(collectCastNameEntries(state.cast).length,1);assert.equal(state.error,'');
});

test('a panorama plus prop with no actor does not commit either new image or replace the prior panorama',async()=>{
  const {state,ctx,bindProcess}=setup();ctx.setCastList('');
  const ordinary=ctx.callAI;
  ctx.callAI=async(prompt,...args)=>{
    if(prompt==='test-360')return ordinary(prompt,...args);
    state.apiCalls++;
    return {text:JSON.stringify({castList:'',references:[{imageIndex:1,items:[{kind:'prop',name:'リール',description:'金属製の円盤'}]}]})};
  };
  await bindProcess()([jsonFile,file('data:image/png;base64,cGFub3JhbWE=',true),file(sheets(1)[0])]);
  assert.equal(state.apiCalls,2);assert.deepEqual(state.images,[]);assert.equal(state.background,'old background');assert.equal(state.enabled,false);
  assert.equal(state.style,'old style');assert.equal(state.analysis,undefined);assert.equal(state.cast,'');assert.match(state.error,/人物を1人以上/);
});

test('staged first-image recognition cannot overwrite a newer character edit or a reset',async()=>{
  for(const action of ['edit','reset']) {
    const {state,ctx,bindProcess}=setup();ctx.setCastList('');let finish;
    ctx.callAI=()=>new Promise(resolve=>{finish=()=>resolve({text:JSON.stringify({castList:'## New Person\n設定',references:[{imageIndex:1,items:[{kind:'character',name:'New Person',description:'新しい資料'}]}]})});});
    const run=bindProcess()([file(sheets(1)[0])]);await new Promise(resolve=>setImmediate(resolve));
    if(action==='edit')ctx.setCastList('## 手編集した人物\nこの設定を保持');
    else ctx.scenarioRunEpochRef.current++;
    const expected=state.cast;finish();await run;
    assert.equal(state.cast,expected);assert.deepEqual(state.images,[]);assert.deepEqual(ctx.referenceAssetsRef.current,[]);
  }
});

test('accepted staged recognition invalidates previous outputs even when the image list is unchanged',async()=>{
  const {state,ctx,bindProcess}=setup(sheets(1));ctx.setCastList('');
  ctx.setReferenceAssets([{image:state.images[0],analysisCompleted:false,items:[{kind:'unknown',name:'未認識',description:'pending'}]}]);
  Object.assign(state,{scenario:'previous pasted scenario',finalPrompt:'previous prompt',generatedImage:'previous image'});
  ctx.cancelApiWork=()=>{};
  ctx.invalidateScenarioRun=()=>{ctx.scenarioRunEpochRef.current++;};
  const start=source.indexOf('const invalidateReferenceOutputs = ');
  const definition=source.slice(start,source.indexOf('\n  };',start)+5).replace(/^const invalidateReferenceOutputs = /,'').replace(/;$/,'');
  for(const [,name] of definition.matchAll(/\b(set[A-Z]\w*)\(/g))if(!ctx[name])ctx[name]=value=>{state[name[3].toLowerCase()+name.slice(4)]=value;};
  ctx.invalidateReferenceOutputs=new Function(...Object.keys(ctx),`return (${definition});`)(...Object.values(ctx));
  let finish;const ordinary=ctx.callAI;
  ctx.callAI=(...args)=>new Promise(resolve=>{finish=async()=>resolve(await ordinary(...args));});
  const run=bindProcess()([file(state.images[0])]);await new Promise(resolve=>setImmediate(resolve));
  assert.equal(state.scenario,'previous pasted scenario');assert.equal(state.finalPrompt,'previous prompt');assert.equal(state.generatedImage,'previous image');
  await finish();await run;
  assert.equal(state.images.length,1);assert.equal(state.scenario,'');assert.equal(state.finalPrompt,'');assert.equal(state.generatedImage,null);
  assert.equal(state.analyzing,false);assert.equal(ctx.isAnalyzingRef.current,false);assert.equal(state.error,'');
});
