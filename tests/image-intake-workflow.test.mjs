import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { planImageAddition, assertImageInputBudget } from '../src/lib/image-input-budget.js';
import { parse360Analysis } from '../src/lib/panorama360.js';
import { buildReferenceAnalysisPrompt, parseReferenceAnalysis, getReferenceImagesToAnalyze, mergeReferenceAnalysis, reconcileReferenceCast } from '../src/lib/reference-assets.js';

// Execute the production event handler with state/API boundaries instrumented.
const source = await readFile(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');
const handler = source.slice(source.indexOf('const processFiles = async'), source.indexOf('// --- Step 2.5:'))
  .replace(/^const processFiles = /, '').trim().replace(/;$/, '');
const sheets = count => Array.from({ length: count }, (_, i) => `data:image/png;base64,${Buffer.from(`sheet${i}`).toString('base64')}`);
const file = (data, panorama = false) => ({ name: 'sheet.png', type: 'image/png', data, panorama });
const jsonFile = { name: 'style.json', type: 'application/json', text: async () => JSON.stringify({ style_name: 'new style', reproduction_prompt: 'new prompt' }) };
function setup(existing = [], background = false) {
  const state = { images: [...existing], style: 'old style', background: 'old background', enabled: background, cast: 'existing named people', apiCalls: 0, error: '', analyzing: false, messages: [] };
  const imagesRef = { current: state.images };
  const referenceAssetsRef = { current: existing.map(image => ({image,analysisCompleted:true,items:[{kind:'character',name:'Existing',description:'user retained'}]})) };
  const ctx = {
    apiKey: true, isAnalyzingRef: { current: false }, imagesRef,
    bg360EnabledRef: { current: background }, scenarioRunEpochRef: { current: 1 }, castRevisionRef: { current: 1 },
    castListRef: {current:state.cast}, referenceAssetsRef, scenario:'', finalPrompt:'', isSearching:false, isGeneratingImage:false,
    isFullAutoModeRef: { current: false }, fullAutoAbortRef: { current: false },
    isEndlessModeRef: {current:false}, setIsEndlessMode:value=>{state.endless=value;}, setIsFullAutoMode:value=>{state.fullAuto=value;},
    setTriggerFullAuto:value=>{state.trigger=typeof value==='function'?value(state.trigger||0):value;},
    invalidateReferenceOutputs:()=>{ctx.scenarioRunEpochRef.current++;},
    getReferenceImagesToAnalyze, mergeReferenceAnalysis, reconcileReferenceCast,
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
    setImages: value => { imagesRef.current = value; state.images = value; },
    setStyleJson: value => { state.style = value; },
    setBg360Image: value => { state.background = value; },
    setBg360Enabled: value => { state.enabled = value; },
    setCastList: value => { state.cast = value; },
    setImageInputError: value => { state.error = value; },
    setIsAnalyzing: value => { state.analyzing = value; },
    get360AnalysisPrompt: () => 'test-360', parse360Analysis, setBg360ImageParts: () => {},
    setIs360Analyzing: () => {}, setBg360Analysis: value => {state.analysis = value;}, setCustomLocation: value => {state.location = value;},
    showStatus: value => {state.messages.push(value);}, setShowModal: () => {}, beginApiWork: () => {}, setAnalyzeThought: () => {},
    setUsedModel: () => {}, setShowOpenAIKeyModal: () => {}, translateApiError: e => e.message,
    console: { error: () => {}, warn: () => {} }, setInterval: () => 1, clearInterval: () => {},
  };
  return { state, ctx, processFiles: new Function(...Object.keys(ctx), `return (${handler});`)(...Object.values(ctx)) };
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
  assert.equal(state.cast, 'existing named people\n\n## 1. New Person\nnew named people');
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
  assert.equal(state.cast, 'existing named people');
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
