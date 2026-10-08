import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { planImageAddition, assertImageInputBudget } from '../src/lib/image-input-budget.js';

// Execute the production event handler with state/API boundaries instrumented.
const source = await readFile(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');
const handler = source.slice(source.indexOf('const processFiles = async'), source.indexOf('// --- Step 2.5:'))
  .replace(/^const processFiles = /, '').trim().replace(/;$/, '');
const sheets = count => Array.from({ length: count }, (_, i) => `data:image/png;base64,${Buffer.from(`sheet${i}`).toString('base64')}`);
const file = (data, panorama = false) => ({ name: 'sheet.png', type: 'image/png', data, panorama });
const jsonFile = { name: 'style.json', type: 'application/json', text: async () => JSON.stringify({ style_name: 'new style', reproduction_prompt: 'new prompt' }) };
function setup(existing = [], background = false) {
  const state = { images: [...existing], style: 'old style', background: 'old background', enabled: background, cast: 'existing named people', apiCalls: 0, error: '', analyzing: false };
  const imagesRef = { current: state.images };
  const ctx = {
    apiKey: true, isAnalyzingRef: { current: false }, imagesRef,
    bg360EnabledRef: { current: background }, scenarioRunEpochRef: { current: 1 }, castRevisionRef: { current: 1 },
    castList: state.cast, isFullAutoModeRef: { current: false }, fullAutoAbortRef: { current: false },
    planImageAddition, assertImageInputBudget,
    isEquirectangularFile: async f => f.panorama,
    readFileAsDataURL: async f => f.data,
    callAI: async () => { state.apiCalls++; return { text: 'new named people', model: 'test' }; },
    getCharacterAnalysisPrompt: () => 'analyze all named people',
    setImages: value => { imagesRef.current = value; state.images = value; },
    setStyleJson: value => { state.style = value; },
    setBg360Image: value => { state.background = value; },
    setBg360Enabled: value => { state.enabled = value; },
    setCastList: value => { state.cast = value; },
    setImageInputError: value => { state.error = value; },
    setIsAnalyzing: value => { state.analyzing = value; },
    showStatus: () => {}, setShowModal: () => {}, beginApiWork: () => {}, setAnalyzeThought: () => {},
    setUsedModel: () => {}, setShowOpenAIKeyModal: () => {}, translateApiError: e => e.message,
    console: { error: () => {}, warn: () => {} }, setInterval: () => 1, clearInterval: () => {},
  };
  return { state, processFiles: new Function(...Object.keys(ctx), `return (${handler});`)(...Object.values(ctx)) };
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
  assert.equal(state.cast, 'new named people');
  assert.equal(state.error, '');
});

test('background switch rejects 11 sheets but accepts 10 using the actual setter', () => {
  const start = source.indexOf('const setBg360Enabled = (value) =>');
  const setter = source.slice(start, source.indexOf('const imageInputBudget =', start))
    .replace(/^const setBg360Enabled = /, '').trim().replace(/;$/, '');
  for (const count of [11, 10]) {
    const background = { current: false }; let displayed = false; let error = '';
    const ctx = { bg360EnabledRef: background, imagesRef: { current: sheets(count) }, assertImageInputBudget,
      setImageInputError: value => { error = value; }, setBg360EnabledState: value => { displayed = value; } };
    const change = new Function(...Object.keys(ctx), `return (${setter});`)(...Object.values(ctx));
    assert.equal(change(true), count === 10);
    assert.equal(background.current, count === 10);
    assert.equal(displayed, count === 10);
    if (count === 11) assert.match(error, /10枚/); else assert.equal(error, '');
  }
});

test('both file selectors retain a file snapshot and allow repeat selection after rejection', async () => {
  const panel = await readFile(new URL('../src/components/Step1Panel.jsx', import.meta.url), 'utf8');
  const code = panel.slice(panel.indexOf('const handleFileChange ='), panel.indexOf('  return ('))
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
  assert.equal((panel.match(/onChange=\{handleFileChange\}/g) || []).length, 2);
});
