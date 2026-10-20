import { resolveAutoScenarioMode } from '../src/lib/scenario-validation.js';
import { applyOpenAIImageEngineWatermark } from '../src/lib/openai-image-settings.js';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { beginApiWork, cancelApiWork } from '../src/lib/api-work-cancellation.js';
import { collectRecentScenarioOutcomes } from '../src/lib/generation-history.js';
import * as scenarioHistory from '../src/lib/generation-history.js';
import { retryImagePolicyGeneration } from '../src/lib/image-policy-retry.js';
import { assertRenderOptions, buildRenderOptionsContract } from '../src/lib/render-options.js';
import { assertPrintableDialogue } from '../src/lib/bubble-text.js';
import { assertPromptEndingModeConsistency } from '../src/lib/ending-mode-policy.js';
import { buildReferenceAssetContext } from '../src/lib/reference-assets.js';
import { DEFAULT_OPENAI_STEP1_MODEL_ID, DEFAULT_OPENAI_STEP3_MODEL_ID } from '../src/lib/openai-model-routes.js';

const source = await readFile(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');
const step2 = await readFile(new URL('../src/components/Step2Panel.jsx', import.meta.url), 'utf8');

// Execute the production callbacks verbatim. Only React's state setters, time,
// and provider/UI dependencies are substituted; no lifecycle logic is copied.
function callback(name) {
  const marker = `const ${name} = `;
  const start = source.indexOf(marker);
  assert.notEqual(start, -1, name);
  return source.slice(start + marker.length, source.indexOf('\n  };', start) + 4);
}

function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

function harness(overrides = {}) {
  const state = {
    referenceEditorError: '', isApiProcessing:false, colorMode:'color', castListRef:{current:'cast'}, bg360EnabledRef:{current:false}, bg360ImageRef:{current:null}, bg360CameraWork:null, bg360CroppedPanels:[], usedModel:null, explanation:'', explanationNotice:'', mangaTitle:'', lockedLocation:'', lockedOutfit:'', generatedImage:null, assembleThought:'', resolveAutoScenarioMode, onAutoPageModeChange: enabled => { state.experimentalEnabled = enabled; }, pageModeRef: {current: false}, DEFAULT_OPENAI_STEP1_MODEL_ID, DEFAULT_OPENAI_STEP3_MODEL_ID,
    buildReferenceAssetContext, referenceAssetsRef: { current: [] }, imagesRef: { current: [] },
    beginApiWork, cancelApiWork, is360Analyzing: false, isAnalyzingRef: { current: false }, analyzeThought: '',
    scenario: 'Original scenario with enough text for enhancement', castList: 'Reference cast with sufficient detail',
    originalScenario: '', scenarioThought: '', enhanceLog: '', genLog: [], finalPrompt: 'Original prompt',
    isSearching: false, isEnhancing: false, isGeneratingImage: false, isFixingPolicy: false,
    policyAutoRetrying: false, allowImageQualityRepair: true, is360CameraWorking: false, isFullAutoMode: false, isAborting: false,
    isAssembling: false, isAnalyzing: false, experimentalEnabled: false,
    get scenarioMode() { return this.experimentalEnabled ? 'experimental-manga' : 'four-panel'; },
    scenarioRunEpochRef: { current: 0 }, promptAssemblyRunRef: { current: 0 },
    promptAssemblyAbortRef: { current: null }, fullAutoAbortRef: { current: false },
    isFullAutoModeRef: { current: false }, qualityRetryAbortRef: { current: false },
    resolvedPunchlineTypeRef: { current: '' }, scenarioUsedModelRef: { current: null },
    recentScenarioTextsRef: { current: [] }, generationHistory: [], collectRecentScenarioOutcomes,
    createScenarioSourceKey: async () => '', findScenarioSourceKey: (...args) => scenarioHistory.findScenarioSourceKey(...args),
    lastPolicyErrorRef: { current: '' }, isEndlessModeRef: { current: false },
    step2Ref: { current: null }, step3Ref: { current: null }, imageResultRef: { current: null },
    enhanceExpressions: true, enhanceBodyLang: false, enhanceEffects: false,
    enhanceBackgrounds: false, enhanceCameraWork: false, enhanceDialogue: false, enhanceGag: false,
    categories: [{ id: 'news', label: 'News', checked: true, keywords: 'news' }],
    inputMode: 'manual', manualTopic: 'A generic short scene', searchTopic: '', targetDate: '2026-10-02',
    customLocation: '', customOutfit: '', punchlineType: 'Auto',
    bg360Image: null, bg360Analysis: null, bg360Enabled: false, bg360ImageParts: [],
    styleJson: {}, scenarioModelId: 'unchanged', mosaicCopyrightedCharacters: true,
    isOpenAIEngine: true, applyOpenAIImageEngineWatermark, openAIImageQuality: 'sunburst-max', selectedEngine: 'chatgpt', policyErrorMsg: 'policy refusal', MAX_POLICY_RETRIES: 5,
    updateResolvedPunchlineType: () => {}, showStatus: () => {},
    validateMangaScenario: () => ({ ok: true }), formatGeneratedMangaTitle: title => title,
    translateApiError: error => error.message, console: { error: () => {} },
    assertPromptEndingModeConsistency: () => {}, assertPrintableDialogue: () => {}, assertRenderOptions: () => {},
    inferImageQualityMode: () => 'four-panel', collectCastNameEntries: () => [], showWatermarks: true,
    setInterval: () => 1, clearInterval: () => {}, setTimeout: fn => { fn(); return 1; },
    window: { scrollTo: () => {} }, document: { body: { scrollHeight: 1 } },
    getCurrentPromptProviderFamily: () => 'chatgpt', ...overrides,
  };
  state.generationHistoryRef = {current: state.generationHistory};
  state.pageModeRef.current = state.experimentalEnabled;
  state.isExperimentalPage = () => state.pageModeRef.current && state.isOpenAIEngine;
  state.getScenarioMode = () => state.isExperimentalPage() ? 'experimental-manga' : 'four-panel';
  const scope = new Proxy(state, {
    has: () => true,
    get: (target, key) => {
      if (key === Symbol.unscopables) return undefined;
      if (key in target) return target[key];
      if (/^set[A-Z]/.test(key)) return value => {
        const prop = key[3].toLowerCase() + key.slice(4);
        target[prop] = typeof value === 'function' ? value(target[prop]) : value;
      };
      if (key in globalThis) return globalThis[key];
      throw new Error(`Missing test dependency: ${String(key)}`);
    },
  });
  const bind = name => (state[name] = new Function('scope', `with (scope) { return (${callback(name)}); }`)(scope));
  for (const name of ['cacheCurrentPage', 'finishScenarioTiming', 'invalidateScenarioRun', 'invalidatePromptAssembly',
    'invalidateScenarioOutput', 'setScenarioFromUser', 'setPunchlineType', 'assertImageGenerationPrompt', 'resetPageCaches']) {
    if (source.includes(`const ${name} = `)) bind(name);
  }
  return { state, bind };
}

const result = { topic: 'Generic title', scenario: 'A complete generated scenario', usedModel: 'unchanged' };
const flush = async () => { for (let i = 0; i < 12; i++) await Promise.resolve(); };

for (const experimentalEnabled of [false, true]) {
  test(`full-auto keeps ${experimentalEnabled ? 'native 5–8' : 'four-panel'} mode across normal STEP2, STEP3 and STEP4`, async () => {
    const calls=[];
    const generatedScenario=Array.from({length:experimentalEnabled?8:4},(_,i)=>`[${i+1}コマ目]\n状況: 次の札を動かす。\nA「次です。」`).join('\n');
    const {state,bind}=harness({experimentalEnabled,
      generateScenario:async input=>{calls.push(['provider',input.scenarioMode,input.inputMode]);return {...result,scenario:generatedScenario,panelCountDecision:{reason:'導入から結果まで必要な展開を過不足なく伝える'}};},
      validateMangaScenario:(_scenario,_cast,options)=>{calls.push(['validate',options.scenarioMode]);return {ok:true,structuralValid:true};},
      assemblePrompt:async(_skip,scenario)=>{calls.push(['step3',scenario]);return 'assembled current prompt';},
      regenerateImage:async(_skip,prompt,options)=>{calls.push(['step4',prompt,options.sourceScenario]);return true;},
    });
    bind('generateScenarioFromNews');
    await bind('runFullAuto')();
    const mode=experimentalEnabled?'experimental-manga':'four-panel';
    assert.deepEqual(calls,[['provider',mode,'news'],['validate',mode],['step3',state.scenario],['step4','assembled current prompt',state.scenario]]);
    assert.ok(state.scenario.includes(generatedScenario));
    assert.equal(state.isFullAutoMode,false);
    assert.equal(state.isSearching,false);
  });
}

for (const outcome of ['success', 'failure']) {
  test(`editing the scenario releases enhancement; stale ${outcome} cannot relock or overwrite it`, async () => {
    const request = deferred();
    const { state, bind } = harness({ enhanceScenarioText: () => request.promise });
    const enhance = bind('enhanceScenario');
    const pending = enhance();
    assert.equal(state.isEnhancing, true);
    state.setScenarioFromUser('User replacement scenario with enough text');
    assert.equal(state.isEnhancing, false);
    if (outcome === 'success') request.resolve({ text: 'Obsolete enhancement', validation: { ok: true } });
    else request.reject(new Error('Obsolete provider failure'));
    await pending;
    assert.equal(state.isEnhancing, false);
    assert.equal(state.scenario, 'User replacement scenario with enough text');
  });
}

test('force stop releases every STEP and full-auto/loop mode without clearing saved inputs or image', () => {
  for (const mode of ['isAnalyzing', 'isSearching', 'isAssembling', 'isGeneratingImage', 'isFixingPolicy', 'isFullAutoMode']) {
    const { state, bind } = harness({ [mode]: true, generatedImage: 'best image', isEndlessMode: true });
    state.isFullAutoModeRef.current = true;
    state.isEndlessModeRef.current = true;
    const before = [state.castList, state.scenario, state.finalPrompt, state.generatedImage];
    bind('stopApiProcessing')();
    assert.deepEqual([state.castList, state.scenario, state.finalPrompt, state.generatedImage], before);
    assert.equal(state.scenarioRunEpochRef.current, 1);
    assert.equal(state.fullAutoAbortRef.current, true);
    assert.equal(state.isFullAutoModeRef.current, false);
    assert.equal(state.isEndlessModeRef.current, false);
    for (const flag of ['isAnalyzing', 'is360Analyzing', 'isSearching', 'isAssembling', 'isGeneratingImage', 'isFixingPolicy', 'isFullAutoMode', 'isEndlessMode']) {
      assert.equal(state[flag], false, `${mode}: ${flag}`);
    }
    beginApiWork();
  }
});

test('a new STEP2 owns all busy state and stale enhancement completion cannot unlock its successor', async () => {
  const old = deferred(), current = deferred(), scenarioRequest = deferred();
  let calls = 0;
  const { state, bind } = harness({
    enhanceScenarioText: () => ++calls === 1 ? old.promise : current.promise,
    generateScenario: () => scenarioRequest.promise,
  });
  const enhance = bind('enhanceScenario'), generate = bind('generateScenarioFromNews');
  const stale = enhance();
  Object.assign(state, { isGeneratingImage: true, isFixingPolicy: true, policyAutoRetrying: true, is360CameraWorking: true });
  const generation = generate();
  assert.equal(state.isSearching, true);
  for (const flag of ['isEnhancing', 'isGeneratingImage', 'isFixingPolicy', 'policyAutoRetrying', 'is360CameraWorking']) {
    assert.equal(state[flag], false, flag);
  }
  scenarioRequest.resolve(result);
  await generation;
  const latest = enhance();
  old.resolve({ text: 'stale', validation: { ok: true } });
  await stale;
  assert.equal(state.isEnhancing, true, 'stale finally must leave the new enhancement busy');
  current.reject(new Error('current failure'));
  await latest;
  assert.equal(state.isEnhancing, false);
});

for (const outcome of ['complete', 'failed', 'cancelled']) {
  test(`STEP2 records precise ${outcome} elapsed time without relying on timer ticks`, async () => {
    const request = deferred();
    let now = 1000;
    const { state, bind } = harness({ Date: { now: () => now }, generateScenario: () => request.promise });
    const pending = bind('generateScenarioFromNews')();
    await flush();
    state.scenarioThought += '\n> ⏳ AI応答を待機中... (120秒経過)';
    now = 126432;
    if (outcome === 'cancelled') state.setScenarioFromUser('replacement');
    else if (outcome === 'complete') request.resolve(result);
    else request.reject(new Error('upstream failure'));
    if (outcome === 'cancelled') { now = 500000; request.resolve(result); }
    await pending;
    assert.match(state.scenarioThought, /125\.432秒/);
    assert.match(state.scenarioThought.split('\n').at(-1), /\[STEP2 TIME\].*125\.432秒/);
    assert.doesNotMatch(state.scenarioThought, /AI応答を待機中/);
    assert.match(state.scenarioThought, new RegExp({ complete: '完了', failed: '失敗', cancelled: '中断' }[outcome]));
    assert.equal(state.isSearching, false);
  });
}

test('stale STEP2 success/failure cannot replace newer timing or release newer loading state', async () => {
  for (const failed of [false, true]) {
    const first = deferred(), second = deferred();
    let calls = 0, now = 0;
    const { state, bind } = harness({ Date: { now: () => now }, generateScenario: () => ++calls === 1 ? first.promise : second.promise });
    const generate = bind('generateScenarioFromNews');
    const old = generate();
    await flush();
    now = 1000;
    state.setScenarioFromUser('replacement');
    const latest = generate();
    await flush();
    now = 3000;
    if (failed) first.reject(new Error('obsolete failure')); else first.resolve(result);
    await old;
    assert.equal(state.isSearching, true);
    assert.doesNotMatch(state.scenarioThought, /\[STEP2 TIME\]/);
    now = 4500;
    second.resolve(result);
    await latest;
    assert.equal(state.isSearching, false);
    assert.match(state.scenarioThought, /3\.500秒/);
  }
});

test('hard reset clears both story-history sources and stale STEP2 cannot restore them', async () => {
  const request = deferred();
  let providerInput;
  const { state, bind } = harness({
    recentScenarioTextsRef: { current: ['[4コマ目: 結]\n状況: 箱を開くと贈り物が現れる。'] },
    generationHistory: [{ metadataContext: { scenario: '[4コマ目: 結]\n状況: 探していた鍵は手元にあった。' } }],
    resetScenarioModelId: () => {}, DEFAULT_CATEGORIES: [],
    generateScenario: input => { providerInput = input; return request.promise; },
  });
  const pending = bind('generateScenarioFromNews')();
  await flush();
  assert.equal(providerInput.recentScenarios.length, 2, 'both existing history sources reach STEP2');

  bind('hardReset')();
  assert.deepEqual(state.recentScenarioTextsRef.current, []);
  assert.deepEqual(state.generationHistory, []);

  request.resolve(result);
  assert.equal(await pending, null, 'the generation invalidated by reset is discarded');
  assert.equal(state.scenario, '');
  assert.deepEqual(state.recentScenarioTextsRef.current, []);
  assert.deepEqual(state.generationHistory, []);
});

test('STEP2 retains source provenance and excludes a same-input rerun from current, session and image history', async () => {
  const sourceKey = `manual:sha256:${'a'.repeat(64)}`;
  const differentKey = `manual:sha256:${'b'.repeat(64)}`;
  const same = '[4コマ目: 結]\n状況: 二人で支えて風鈴を直す。';
  const other = '[4コマ目: 結]\n状況: 別の原案で二人が風鈴を直す。';
  const unknown = '[4コマ目: 結]\n状況: 古い原案で二人が風鈴を直す。';
  const inputs = [];
  const { state, bind } = harness({
    scenario: same, createScenarioSourceKey: async () => sourceKey,
    recentScenarioTextsRef: { current: [{ scenario: same, sourceKey }, { scenario: other, sourceKey: differentKey }, unknown] },
    generationHistory: [{ metadataContext: { scenario: same, settings: { scenario_source_key: sourceKey } } }],
    generateScenario: async input => { inputs.push(input); return { ...result, scenario: same }; },
  });
  const generate = bind('generateScenarioFromNews');
  await generate();
  assert.deepEqual(inputs[0].recentScenarios.map(item => item.outcome), ['状況: 別の原案で二人が風鈴を直す。', '状況: 古い原案で二人が風鈴を直す。']);
  assert.deepEqual(state.recentScenarioTextsRef.current[0], { scenario: state.scenario, sourceKey });
  await generate();
  assert.deepEqual(inputs[1].recentScenarios, inputs[0].recentScenarios, 'the newly current scenario does not bypass provenance filtering');
  state.createScenarioSourceKey = async () => differentKey;
  await generate();
  assert.ok(inputs[2].recentScenarios.some(item => item.outcome === '状況: 二人で支えて風鈴を直す。'), 'a different input still compares the previous plot');
});

test('STEP2 cannot start a provider after source hashing is invalidated by a user edit', async () => {
  const key = deferred();
  let calls = 0;
  const { state, bind } = harness({
    createScenarioSourceKey: () => key.promise,
    generateScenario: async () => { calls++; return result; },
  });
  const pending = bind('generateScenarioFromNews')();
  state.setScenarioFromUser('User replacement');
  key.resolve(`manual:sha256:${'a'.repeat(64)}`);
  assert.equal(await pending, null);
  assert.equal(calls, 0, 'invalidated preflight must not start a provider');
  assert.equal(state.scenario, 'User replacement');
});

for (const mode of ['new-work', 'full-auto', 'endless']) {
  test(`STEP2 ${mode} keeps history comparison even when the manual topic matches`, async () => {
    const sourceKey = `manual:sha256:${'a'.repeat(64)}`;
    const same = '[4コマ目: 結]\n状況: 二人で支えて風鈴を直す。';
    let input;
    const { bind } = harness({
      scenario: mode === 'new-work' ? '' : same, createScenarioSourceKey: async () => sourceKey,
      isFullAutoModeRef: { current: mode === 'full-auto' }, isEndlessModeRef: { current: mode === 'endless' },
      recentScenarioTextsRef: { current: [{ scenario: same, sourceKey }] },
      generateScenario: async value => { input = value; return result; },
    });
    await bind('generateScenarioFromNews')();
    assert.deepEqual(input.recentScenarios.map(item => item.outcome), ['状況: 二人で支えて風鈴を直す。']);
  });
}

test('full-auto releases its own mode when an unexpected downstream error escapes', async () => {
  const { state, bind } = harness({
    generateScenarioFromNews: async () => 'generated scenario',
    assemblePrompt: async () => { throw new Error('unexpected assembly error'); },
  });
  await bind('runFullAuto')();
  assert.equal(state.isFullAutoMode, false);
  assert.equal(state.fullAutoStep, 0);
  assert.equal(state.isAborting, false);
});

test('obsolete full-auto cannot run STEP3 or release a newer full-auto run', async () => {
  const old = deferred(), latest = deferred();
  let calls = 0, assemblies = 0;
  const { state, bind } = harness({
    generateScenarioFromNews: () => ++calls === 1 ? old.promise : latest.promise,
    assemblePrompt: async () => { assemblies++; return null; },
  });
  const run = bind('runFullAuto');
  const a = run();
  await flush();
  const b = run();
  await flush();
  old.resolve('old scenario');
  await a;
  assert.equal(assemblies, 0);
  assert.equal(state.isFullAutoMode, true);
  latest.resolve('new scenario');
  await b;
  assert.equal(assemblies, 1);
  assert.equal(state.isFullAutoMode, false);
});

test('STEP2 disabled state agrees with the analysis overlay', () => {
  const condition = step2.match(/onClick=\{generateScenarioFromNews\}\s+disabled=\{([^}]+)\}/)[1];
  const disabled = new Function('isSearching', 'currentStep', 'isAnalyzing', `return (${condition});`);
  assert.equal(disabled(false, 1, false), true);
  assert.equal(disabled(false, 2, true), true);
  assert.equal(disabled(false, 2, false), false);
  assert.equal(disabled(true, 3, false), true);
});

for (const failed of [false, true]) {
  test(`late manual policy ${failed ? 'failure' : 'success'} cannot unlock or overwrite a newer request`, async () => {
    const old = deferred(), latest = deferred();
    let calls = 0;
    const { state, bind } = harness({ fixPolicyViolation: () => ++calls === 1 ? old.promise : latest.promise });
    const repair = bind('regenerateSafePrompt');
    const a = repair();
    assert.equal(state.isFixingPolicy, true);
    state.setScenarioFromUser('replacement');
    assert.equal(state.isFixingPolicy, false);
    state.finalPrompt = 'Current prompt';
    const b = repair();
    if (failed) old.reject(new Error('old failure'));
    else old.resolve({ success: true, modifiedPrompt: 'Old prompt' });
    await a;
    assert.equal(state.isFixingPolicy, true);
    assert.equal(state.finalPrompt, 'Current prompt');
    latest.resolve({ success: true, modifiedPrompt: 'New prompt' });
    await b;
    assert.equal(state.isFixingPolicy, false);
    assert.equal(state.finalPrompt, 'New prompt');
  });
}

test('obsolete image generation cannot initiate a paid policy retry for the new scenario', async () => {
  const request = deferred();
  const { state, bind } = harness({
    generateImageOnce: () => request.promise,
    runPolicyAutoRetries: () => assert.fail('obsolete generation must not start another retry'),
  });
  const pending = bind('regenerateImage')();
  state.setScenarioFromUser('replacement');
  state.lastPolicyErrorRef.current = 'An unrelated current error';
  request.resolve(false);
  assert.equal(await pending, false);
});

for (const mode of ['disabled', 'review-only', 'experimental']) {
  test(`${mode} image generation cannot automatically enter the paid policy repair path`, async () => {
    const { state, bind } = harness({
      allowImageQualityRepair: mode !== 'disabled', experimentalEnabled: mode === 'experimental',
      generateImageOnce: async (_skip, _prompt, options) => {
        assert.equal(options.suppressPolicyChoice, false);
        state.lastPolicyErrorRef.current = 'Safety refusal';
        return false;
      },
      runPolicyAutoRetries: () => assert.fail('automatic paid repair is disabled'),
    });
    assert.equal(await bind('regenerateImage')(false, null, { reviewOnly: mode === 'review-only' }), false);
    assert.equal(state.lastPolicyErrorRef.current, 'Safety refusal');
  });

  test(`${mode} policy entry rejects direct calls before prompt repair or image generation`, async () => {
    let repairs = 0, generations = 0;
    const { state, bind } = harness({
      allowImageQualityRepair: mode !== 'disabled', experimentalEnabled: mode === 'experimental',
      retryImagePolicyGeneration,
      fixPolicyViolation: async () => { repairs++; return { success: true, modifiedPrompt: 'Unapproved changed prompt' }; },
      generateImageOnce: async () => { generations++; return true; },
    });
    assert.equal(await bind('runPolicyAutoRetries')({
      initialPrompt: 'Original prompt', initialPolicyError: 'Safety refusal',
      generationOptions: { reviewOnly: mode === 'review-only' },
    }), false);
    assert.equal(repairs, 0);
    assert.equal(generations, 0);
    assert.equal(state.finalPrompt, 'Original prompt');
    assert.equal(state.policyAutoRetrying, false);
    assert.equal(state.isFixingPolicy, false);
    assert.doesNotMatch(state.genLog.join('\n'), /修正に失敗/);
  });

  test(`${mode} policy-attempt image callback cannot bypass the automatic repair guard`, async () => {
    const { state, bind } = harness({ allowImageQualityRepair: mode !== 'disabled', experimentalEnabled: mode === 'experimental' });
    assert.equal(await bind('generateImageOnce')(true, 'Unapproved changed prompt', {
      policyAttempt: 1, reviewOnly: mode === 'review-only',
    }), false);
    assert.equal(state.finalPrompt, 'Original prompt');
    assert.equal(state.isGeneratingImage, false);
    assert.deepEqual(state.genLog, []);
  });
}

test('enabled QA never starts paid policy repair automatically after refusal', async () => {
  let generations = 0;
  const {state,bind}=harness({
    fixPolicyViolation:()=>assert.fail('automatic policy repair is prohibited'),
    runPolicyAutoRetries:()=>assert.fail('explicit policy action required'),
    generateImageOnce:async(_skip,_prompt,options)=>{
      generations++;
      assert.equal(options.suppressPolicyChoice,false);
      state.lastPolicyErrorRef.current='Safety refusal';
      return false;
    },
  });
  assert.equal(await bind('regenerateImage')(),false);
  assert.equal(generations,1);
  assert.equal(state.finalPrompt,'Original prompt');
  assert.equal(state.policyAutoRetrying,false);
  assert.equal(state.isFixingPolicy,false);
});

for (const valid of [false, true]) {
  test(`${valid ? 'valid' : 'broken'} policy render contract is checked before adopting or sending the revised prompt`, async () => {
    const original = `${buildRenderOptionsContract()}\nOriginal approved scene`;
    const revised = `${buildRenderOptionsContract({ mosaicCopyrightedCharacters: valid })}\nCompliant revised scene`;
    let generations = 0;
    const { state, bind } = harness({
      finalPrompt: original, assertRenderOptions, retryImagePolicyGeneration,
      fixPolicyViolation: async () => ({ success: true, modifiedPrompt: revised }),
      generateImageOnce: async (_skip, prompt) => {
        generations++;
        assert.equal(prompt, revised);
        return true;
      },
    });
    assert.equal(await bind('runPolicyAutoRetries')({ initialPrompt: original, initialPolicyError: 'Safety refusal' }), valid);
    assert.equal(generations, valid ? 1 : 0);
    assert.equal(state.finalPrompt, valid ? revised : original);
    assert.deepEqual(state.policyPromptHistory, valid ? [original, revised] : [original]);
    if (!valid) assert.match(state.genLog.join('\n'), /モザイク／ウオーターマークの設定が指示文と一致しません/);
  });
}

for (const violation of [
  { name: 'dialogue', original: 'Dialogue TEXT (PRINT VALUES ONLY): B1="Valid words"', revised: 'Dialogue TEXT (PRINT VALUES ONLY): B1=""', expected: /吹き出しの本文/ },
  { name: 'ending mode', original: 'SERIOUS DOCUMENTARY INTENT: scene\nREFERENCE-SHEET ART-STYLE LOCK (ABSOLUTE — ALL FOUR PANELS)', revised: 'COMEDY INTENT: changed mode', punchlineType: 'SeriousDocumentary', expected: /シリアス結末と最終プロンプトが一致しません/ },
]) {
  test(`policy repair cannot bypass the shared ${violation.name} validator`, async () => {
    const original = `${buildRenderOptionsContract()}\n${violation.original}`;
    let generations = 0;
    const { state, bind } = harness({
      finalPrompt: original, punchlineType: violation.punchlineType || 'Auto',
      assertRenderOptions, assertPrintableDialogue, assertPromptEndingModeConsistency, retryImagePolicyGeneration,
      fixPolicyViolation: async () => ({ success: true, modifiedPrompt: `${buildRenderOptionsContract()}\n${violation.revised}` }),
      generateImageOnce: async () => { generations++; return true; },
    });
    assert.equal(await bind('runPolicyAutoRetries')({ initialPrompt: original, initialPolicyError: 'Safety refusal' }), false);
    assert.equal(generations, 0);
    assert.equal(state.finalPrompt, original);
    assert.deepEqual(state.policyPromptHistory, [original]);
    assert.match(state.genLog.join('\n'), violation.expected);
  });
}

test('explicit policy repair rejects an invalid proposal without another paid attempt', async () => {
  const original=buildRenderOptionsContract()+'\nApproved scene';
  let repairs=0,generations=0;
  const {state,bind}=harness({finalPrompt:original,assertRenderOptions,retryImagePolicyGeneration,
    fixPolicyViolation:async()=>{repairs++;return {success:true,modifiedPrompt:buildRenderOptionsContract({mosaicCopyrightedCharacters:false})+'\nInvalid scene'};},
    generateImageOnce:async()=>{generations++;return true;},
  });
  assert.equal(await bind('runPolicyAutoRetries')({initialPrompt:original,initialPolicyError:'Safety refusal'}),false);
  assert.equal(repairs,1);
  assert.equal(generations,0);
  assert.equal(state.finalPrompt,original);
  assert.deepEqual(state.policyPromptHistory,[original]);
  assert.match(state.genLog.join('\n'),/モザイク／ウオーターマークの設定/);
});

for (const cancellation of ['obsolete', 'stop']) {
  test(`${cancellation} policy repair cannot generate an image after prompt repair resolves`, async () => {
    const request = deferred();
    const { state, bind } = harness({
      retryImagePolicyGeneration,
      fixPolicyViolation: () => request.promise,
      generateImageOnce: () => assert.fail('cancelled prompt repair must not generate an image'),
    });
    const pending = bind('runPolicyAutoRetries')({ initialPrompt: 'Original prompt', initialPolicyError: 'Safety refusal' });
    assert.equal(state.isFixingPolicy, true);
    if (cancellation === 'obsolete') state.setScenarioFromUser('Replacement scenario');
    else state.qualityRetryAbortRef.current = true;
    request.resolve({ success: true, modifiedPrompt: 'Obsolete revised prompt' });
    assert.equal(await pending, false);
    assert.equal(state.finalPrompt, cancellation === 'obsolete' ? '' : 'Original prompt');
    assert.equal(state.policyAutoRetrying, false);
  });
}

test('invalid STEP2 input leaves the existing generation and run ownership intact', async () => {
  const { state, bind } = harness({ manualTopic: '', isGeneratingImage: true, alert: () => {} });
  await bind('generateScenarioFromNews')();
  assert.equal(state.scenarioRunEpochRef.current, 0);
  assert.equal(state.isGeneratingImage, true);
  assert.equal(state.finalPrompt, 'Original prompt');
});

for (const selectedNative of [false,true]) {
 test('full-auto adopts content-selected mode before STEP3/4, initial native='+selectedNative, async () => {
  const count=selectedNative?4:6, calls=[];
  const generated=Array.from({length:count},(_,i)=>'['+(i+1)+'コマ目]\n状況: 札を動かす。\nA「次です。」').join('\n');
  const {state,bind}=harness({experimentalEnabled:selectedNative,
   generateScenario:async input=>{assert.equal(input.autoSelectPanelCount,true);return {...result,scenario:generated,panelCountDecision:{reason:'必要な行動と判断を順に伝える'}};},
   assemblePrompt:async()=>{calls.push(state.getScenarioMode());return 'new prompt';},
   regenerateImage:async()=>{calls.push(state.getScenarioMode());return true;},
  });
  bind('generateScenarioFromNews');await bind('runFullAuto')();
  const expected=count===4?'four-panel':'experimental-manga';
  assert.deepEqual(calls,[expected,expected]);
  assert.equal(state.experimentalEnabled,!selectedNative);
  assert.equal(state.pageModeRef.current,!selectedNative);
 });
}
for (const fullAuto of [false,true]) {
 test('manual STEP2 cannot opt into content selection, auto flag='+fullAuto,async()=>{
  let input;const {state,bind}=harness({experimentalEnabled:true,
   generateScenario:async value=>{input=value;return result;},
  });
  await bind('generateScenarioFromNews')(undefined,undefined,{autoSelectPanelCount:fullAuto});
  assert.equal(input.autoSelectPanelCount,false);
  assert.equal(state.experimentalEnabled,true);
 });
}
test('Gemini full-auto retains four-panel provider boundary',async()=>{
 let input;const {state,bind}=harness({isOpenAIEngine:false,experimentalEnabled:false,
  generateScenario:async value=>{input=value;return result;},
  assemblePrompt:async()=> 'prompt',regenerateImage:async()=>true,
 });
 bind('generateScenarioFromNews');await bind('runFullAuto')();
 assert.equal(input.autoSelectPanelCount,false);assert.equal(input.scenarioMode,'four-panel');
 assert.equal(state.experimentalEnabled,false);
});
test('late auto selection cannot replace mode after stop',async()=>{
 const pending=deferred();const {state,bind}=harness({experimentalEnabled:false,
  generateScenario:()=>pending.promise,assemblePrompt:async()=>assert.fail('stale assembly'),
 });
 bind('generateScenarioFromNews');const work=bind('runFullAuto')();await flush();
 bind('stopApiProcessing')();
 pending.resolve({...result,scenario:'obsolete',panelCountDecision:{reason:'obsolete'}});
 await work;assert.equal(state.experimentalEnabled,false);assert.equal(state.pageModeRef.current,false);
});

for (const initialMode of [false,true]) {
  test('automatic mode choice preserves separate histories: '+initialMode, async()=>{
    const nextMode=!initialMode;
    const outgoing=[{img:'previous outgoing image'}];
    const incoming=[{img:'previous incoming image'}];
    const chosenScenario=Array.from({length:nextMode?6:4},(_,i)=>`[${i+1}コマ目]
状況: 必要な出来事を順に描く。
A「次へ。」`).join('\n');
    const {state,bind}=harness({experimentalEnabled:initialMode,generationHistory:outgoing,
      promptAssemblyRunRef:{current:0,pages:{[nextMode?'experimental':'normal']:{generationHistory:incoming}}},
      generateScenario:async()=>({...result,scenario:chosenScenario,panelCountDecision:{reason:'内容を省略せず最小のコマ数で描く'}}),
      assemblePrompt:async()=> 'new prompt',
      regenerateImage:async()=>{assert.deepEqual(state.generationHistory,incoming);assert.deepEqual(state.generationHistoryRef.current,incoming);state.generationHistory=[...state.generationHistory,{img:'new image'}];return true;},
    });
    bind('generateScenarioFromNews');
    await bind('runFullAuto')();
    assert.deepEqual(state.promptAssemblyRunRef.pages[initialMode?'experimental':'normal'].generationHistory,outgoing);
    assert.equal(state.promptAssemblyRunRef.pages[initialMode?'experimental':'normal'].scenario,'Original scenario with enough text for enhancement');
    assert.deepEqual(state.generationHistory,[...incoming,{img:'new image'}]);
    bind('changePageMode')(initialMode);
    assert.deepEqual(state.generationHistory,outgoing);
  });
}
