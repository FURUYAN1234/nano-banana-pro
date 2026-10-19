import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { addGenerationHistoryItem } from '../src/lib/generation-history.js';

const workflow = readFileSync(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');
const region = { x: 5, y: 8, width: 20, height: 10 };
const source = 'data:image/png;base64,c291cmNl';
function setup(overrides = {}) {
  const calls = [], saves = [], timers = new Map();
  let logs = [], now = 1000, timerId = 0;
  let displayed = source, history = [{ id: 1, img: source, metadataContext: { settings: { panel_count: 6 } } }], busy = false;
  const context = {
    isOpenAIEngine: true, generatedImage: source, generationHistory: history, colorMode: 'color',
    isGeneratingImage: false, isSearching: false, isAssembling: false, isEnhancing: false,
    isAnalyzing: false, is360CameraWorking: false, isFixingPolicy: false, isFullAutoMode: false,
    imageEditRunRef: { current: null, displayedImage: source }, scenarioRunEpochRef: { current: 1 },
    openAIImageSize: '2240x3168', openAIImageQuality: 'sunburst-max',
    readPanelStyleEditFrames: async image => ({ sourceImage: image, width: 40, height: 60,
      frames: [{ index: 0, region, thumbnail: 'before' }] }),
    preparePanelStyleEdit: async () => ({ before: 'before', plan: { size: '2240x3168' },
      request: { prompt: 'single medium', imageInputs: [{ image_url: 'padded-panel' }] } }),
    composePanelStyleEdit: async () => ({ dataUrl: 'composite', after: 'after', outsidePixelsUnchanged: true }),
    generateImageWithOpenAI: (...args) => new Promise((resolve, reject) => calls.push({ args, resolve, reject })),
    beginApiWork: () => {}, setGenLog: value => { logs = typeof value === 'function' ? value(logs) : value; }, showStatus: () => {}, translateApiError: e => e.message,
    setIsGeneratingImage: value => { busy = value; }, setIsGenerationError: () => {},
    setGeneratedImage: value => { displayed = value; }, setImageQualityNeedsRepair: () => {},
    setGenerationHistory: update => { history = update(history); },
    addGenerationHistoryItem,
    autoSaveFinalImage: async item => { saves.push(item); return true; }, Date,
    setInterval: callback => { const id = ++timerId; timers.set(id, callback); return id; },
    clearInterval: id => timers.delete(id),
    ...overrides,
  };
  const start = workflow.indexOf('const panelStyleEditBusy =');
  const end = workflow.indexOf('const editGeneratedImage =', start);
  assert.ok(start >= 0 && end > start);
  vm.runInNewContext(workflow.slice(start, end) + '\nObject.assign(globalThis,{preparePanelStyleEditor,generatePanelStyleEdit,adoptPanelStyleEdit,discardPanelStyleEdit});', context);
  return { context, calls, saves, timers, logs: () => logs,
    tick: milliseconds => { now += milliseconds; for (const callback of timers.values()) callback(); },
    clock: { now: () => now }, state: () => ({ displayed, history, busy }) };
}
const args = { sourceImage: source, panelIndex: 0, region, style: 'GEKIGA' };
async function start(h) {
  await h.context.preparePanelStyleEditor({ sourceImage: source, panelCount: 6 });
  const pending = h.context.generatePanelStyleEdit(args);
  await Promise.resolve(); await Promise.resolve();
  return { pending };
}
const response = { base64Img: 'Y2FuZGlkYXRl', mimeType: 'image/png', usedModel: 'test-image-model' };

test('panel editing reports elapsed time for both providers and cleans up success, failure and stale runs', async () => {
  for (const isOpenAIEngine of [true, false]) for (const outcome of ['success', 'failure', 'stale']) {
    const h = setup({ isOpenAIEngine });
    h.context.Date = h.clock;
    h.state().history[0].metadataContext.settings.panel_count = 4;
    h.context.generateImageWithImagen = (...args) => new Promise((resolve, reject) => h.calls.push({ args, resolve, reject }));
    await h.context.preparePanelStyleEditor({ sourceImage: source, panelCount: 4 });
    const pending = h.context.generatePanelStyleEdit(args);
    await new Promise(setImmediate);
    assert.equal(h.calls.length, 1);
    h.tick(3000);
    assert.match(h.logs().find(item => item.startsWith('[WAIT]')) || '', /3秒経過/);
    assert.equal(h.logs().filter(item => item.startsWith('[WAIT]')).length, 1);
    if (outcome === 'stale') h.context.scenarioRunEpochRef.current++;
    const before = [...h.logs()];
    h.tick(2000);
    if (outcome === 'stale') assert.deepEqual(Array.from(h.logs()), before);
    else assert.match(h.logs().find(item => item.startsWith('[WAIT]')), /5秒経過/);
    if (outcome === 'failure') h.calls[0].reject(new Error('HTTP 429'));
    else h.calls[0].resolve(response);
    await pending;
    assert.equal(h.timers.size, 0);
    const completed = [...h.logs()]; h.tick(4000); assert.deepEqual(Array.from(h.logs()), completed);
  }
});
test('Gemini panel edits dispatch only to Gemini and retain provider on reviewed adoption', async () => {
  let options;
  const h = setup({isOpenAIEngine:false,
    preparePanelStyleEdit:async (_image,_region,input) => { options=input; return {before:'before',plan:{imageOptions:{aspectRatio:'1:1',imageSize:'1K'}},request:{prompt:'one panel',referenceImages:['padded-panel'],imageInputs:[{image_url:'padded-panel'}]}}; },
  });
  h.context.generateImageWithImagen = (...args)=>new Promise(resolve=>h.calls.push({args,resolve}));
  await assert.rejects(h.context.preparePanelStyleEditor({sourceImage:source,panelCount:6}),/Gemini.*4コマ/);
  assert.equal(h.calls.length,0);
  await assert.rejects(h.context.preparePanelStyleEditor({sourceImage:source,panelCount:4}),/Gemini.*4コマ/);
  h.state().history[0].metadataContext.settings.panel_count = 4;
  await h.context.preparePanelStyleEditor({sourceImage:source,panelCount:4});
  const pending=h.context.generatePanelStyleEdit(args);
  await new Promise(setImmediate);
  assert.equal(options.provider,'gemini');
  assert.deepEqual(Array.from(h.calls[0].args[2]),['padded-panel']);
  assert.equal(h.calls[0].args[3].imageSize,'1K');
  h.calls[0].resolve(response);
  const candidate=await pending;
  assert.equal(candidate.provider,'gemini');
  assert.equal(await h.context.adoptPanelStyleEdit({candidate,reviewConfirmed:true}),true);
  assert.equal(h.state().history[0].metadataContext.provider,'gemini');
});

test('panel preparation uses the selected image plan and preserves its verified panel number on adoption', async () => {
  let received;
  const h = setup({ readPanelStyleEditFrames: async (image, count, options) => {
    received = { image, count, options };
    return { sourceImage: image, width: 40, height: 60, readingOrderConfirmed: true,
      frames: [{ index: 0, panelNumber: 1, region, thumbnail: 'before' }] };
  } });
  const sourcePlan = { count: 6, layout: 'two_columns' };
  h.state().history[0].experimentalPlan = sourcePlan;
  await h.context.preparePanelStyleEditor({ sourceImage: source, panelCount: 6 });
  assert.equal(received.options?.plan, sourcePlan);
  const pending = h.context.generatePanelStyleEdit(args);
  await new Promise(resolve => setImmediate(resolve));
  h.calls[0].resolve(response);
  const candidate = await pending;
  assert.equal(candidate.panelNumber, 1);
  assert.equal(await h.context.adoptPanelStyleEdit({ candidate, reviewConfirmed: true }), true);
  assert.equal(h.state().history[0].experimentalPlan, sourcePlan);
  assert.equal(h.state().history[0].metadataContext.settings.panel_edit.panel_number, 1);
  assert.match(h.state().history[0].editInstruction, /^1コマ目:/);
});

test('both panel providers finish the returned monochrome crop before composition using the source mode', async () => {
  for (const isOpenAIEngine of [true,false]) {
    let finishes=0;
    const h=setup({isOpenAIEngine,colorMode:'color',
      finalizeMonochromeCandidate:async(candidate,mode)=>{assert.equal(mode,'monochrome');finishes++;return {...candidate,base64Img:'bW9ubw=='};},
      composePanelStyleEdit:async(_source,edited)=>{assert.match(edited,/bW9ubw==$/);return {dataUrl:'composite',after:'after',outsidePixelsUnchanged:true};},
    });
    h.state().history[0].metadataContext.settings={panel_count:4,color_mode:'monochrome'};
    h.context.generateImageWithImagen=(...args)=>new Promise(resolve=>h.calls.push({args,resolve}));
    await h.context.preparePanelStyleEditor({sourceImage:source,panelCount:4});
    const pending=h.context.generatePanelStyleEdit(args);
    await new Promise(setImmediate); h.calls[0].resolve(response);
    assert.ok(await pending); assert.equal(finishes,1);
  }
});

test('reopening a panel-only adoption passes its source lineage; whole-page changes do not reuse old frames', async () => {
  let options;
  const h = setup({ readPanelStyleEditFrames: async (image, count, input) => {
    options = input; return {sourceImage:image, frames: [{index:0, region}]};
  } });
  h.state().history[0].sourceImage = 'original-page';
  h.state().history[0].metadataContext.settings.panel_edit = {region};
  h.state().history[0].metadataContext.settings.outside_panel_pixels_unchanged = true;
  await h.context.preparePanelStyleEditor({sourceImage:source, panelCount:6});
  assert.equal(options.editLineage?.length, 1);
  assert.equal(options.editLineage[0].sourceImage, 'original-page');
  assert.deepEqual({...options.editLineage[0].region}, region);
  delete h.state().history[0].metadataContext.settings.outside_panel_pixels_unchanged;
  await h.context.preparePanelStyleEditor({sourceImage:source, panelCount:6});
  assert.equal(options.editLineage.length, 0);
});

test('single paid call prepares candidate; direct explicit adoption retains the original without asserting visual review', async () => {
  const h = setup(); const { pending } = await start(h);
  assert.equal(h.calls.length, 1);
  assert.equal(h.calls[0].args[2].imageInputs[0].image_url, 'padded-panel');
  assert.equal(await h.context.generatePanelStyleEdit(args), null);
  h.calls[0].resolve(response); const candidate = await pending;
  assert.equal(h.state().displayed, source); assert.equal(h.state().history.length, 1);
  assert.equal(h.saves.length, 0); assert.equal(h.state().busy, false);
  assert.equal(await h.context.adoptPanelStyleEdit({ candidate: { ...candidate }, reviewConfirmed: true }), false);
  assert.equal(await h.context.adoptPanelStyleEdit({ candidate }), true);
  assert.equal(h.state().history[0].metadataContext.settings.visual_review_confirmed, undefined);
  assert.equal(h.state().displayed, 'composite'); assert.equal(h.state().history[1].img, source);
  assert.equal(h.state().history[0].qualityPass, false);
  assert.equal(h.state().history[0].metadataContext.settings.panel_count, 6);
  assert.equal(h.state().history[0].metadataContext.provider, 'openai');
  assert.equal(h.state().history[0].metadataContext.inputImages[0].dataUrl, 'padded-panel');
  assert.equal(h.saves.length, 1);
  assert.equal(await h.context.adoptPanelStyleEdit({ candidate, reviewConfirmed: true }), false);
});

test('free panel instruction reaches the shared crop request and retained history without a forced style', async () => {
  let received;
  const h = setup({ preparePanelStyleEdit: async (image, selected, options) => {
    received = { image, selected, options };
    return { before: 'before', plan: { size: '2240x3168' },
      request: { prompt: 'free panel change', imageInputs: [{ image_url: 'padded-panel' }] } };
  } });
  await h.context.preparePanelStyleEditor({ sourceImage: source, panelCount: 6 });
  const pending = h.context.generatePanelStyleEdit({ sourceImage: source, panelIndex: 0, region,
    mode: 'free', instruction: '  手元の箱だけを赤くする。  ' });
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(received.options.mode, 'free');
  assert.equal(received.options.instruction, '手元の箱だけを赤くする。');
  assert.equal(received.options.style, undefined);
  assert.equal(h.calls.length, 1);
  h.calls[0].resolve(response);
  const candidate = await pending;
  assert.equal(candidate.mode, 'free');
  assert.equal(candidate.instruction, '手元の箱だけを赤くする。');
  assert.equal(candidate.style, undefined);
  assert.equal(h.state().displayed, source);
  assert.equal(await h.context.adoptPanelStyleEdit({ candidate, reviewConfirmed: true }), true);
  assert.match(h.state().history[0].editInstruction, /手元の箱だけを赤くする/);
  assert.equal(h.state().history[0].metadataContext.settings.panel_edit.mode, 'free');
  assert.equal(h.state().history[0].metadataContext.settings.panel_edit.instruction, candidate.instruction);
  assert.equal(h.state().history[0].metadataContext.settings.panel_style_edit, undefined);
  assert.equal(h.state().history[1].img, source);
});

test('adopting from the oldest history keeps original selectable and clears obsolete QA; failed save stays failed', async () => {
  const h = setup({ autoSaveFinalImage: async () => false });
  const original = h.state().history[0];
  original.experimentalReview = { status: 'pass' }; original.qualityIssues = ['old'];
  original.experimentalGroupId = 'old-qa-group'; original.metadataContext.provider = 'gemini';
  h.state().history.unshift(...Array.from({ length: 9 }, (_, i) => ({ id: i + 2, img: `old${i}` })));
  const { pending } = await start(h); h.calls[0].resolve(response); const candidate = await pending;
  assert.equal(await h.context.adoptPanelStyleEdit({ candidate, reviewConfirmed: true }), false);
  assert.equal(h.state().history.length, 10);
  assert.equal(h.state().history[1].img, source);
  assert.equal(h.state().history[0].experimentalReview, undefined);
  assert.equal(h.state().history[0].qualityIssues, undefined);
  assert.equal(h.state().history[0].experimentalGroupId, undefined);
});

test('unprepared, different image, altered region and busy state do not call API', async () => {
  const h = setup(); assert.equal(await h.context.generatePanelStyleEdit(args), null);
  await h.context.preparePanelStyleEditor({ sourceImage: source, panelCount: 6 });
  for (const change of [{ sourceImage: 'different' }, { region: { ...region, x: 6 } }, { panelIndex: 4 }]) {
    assert.equal(await h.context.generatePanelStyleEdit({ ...args, ...change }), null);
  }
  h.context.isGeneratingImage = true;
  assert.equal(await h.context.generatePanelStyleEdit(args), null); assert.equal(h.calls.length, 0);
});

test('transport/composition failures keep original and never retry automatically', async () => {
  for (const compositionFails of [false, true]) {
    const h = setup(compositionFails ? { composePanelStyleEdit: async () => { throw new Error('wrong dimensions'); } } : {});
    const { pending } = await start(h);
    if (compositionFails) h.calls[0].resolve(response); else h.calls[0].reject(new Error('HTTP 429'));
    assert.equal(await pending, null); assert.equal(h.calls.length, 1);
    assert.equal(h.state().displayed, source); assert.equal(h.state().history.length, 1);
    assert.equal(h.saves.length, 0); assert.equal(h.state().busy, false);
  }
});

test('stopped or changed-source late response cannot create or adopt a candidate', async () => {
  for (const invalidate of [h => h.context.scenarioRunEpochRef.current++, h => { h.context.imageEditRunRef.displayedImage = 'other'; }]) {
    const h = setup(); const { pending } = await start(h); invalidate(h);
    h.calls[0].resolve(response); assert.equal(await pending, null);
    assert.equal(h.context.imageEditRunRef.candidate, undefined);
    assert.equal(h.state().displayed, source); assert.equal(h.saves.length, 0);
  }
});

test('discard rejects later adoption and a valid candidate does not occupy the API run lock', async () => {
  const h = setup(); const { pending } = await start(h); h.calls[0].resolve(response);
  const candidate = await pending;
  assert.equal(h.context.imageEditRunRef.current, null);
  h.context.discardPanelStyleEdit();
  assert.equal(await h.context.adoptPanelStyleEdit({ candidate, reviewConfirmed: true }), false);
  assert.equal(h.state().displayed, source);
});

test('a source changed during preparation is rejected before it can be used', async () => {
  const h = setup({ readPanelStyleEditFrames: async () => {
    h.context.imageEditRunRef.displayedImage = 'other';
    return { sourceImage: source, frames: [{ index: 0, region }] };
  } });
  await assert.rejects(h.context.preparePanelStyleEditor({ sourceImage: source, panelCount: 6 }), /修正元/);
  assert.equal(h.context.imageEditRunRef.prepared, undefined);
});
