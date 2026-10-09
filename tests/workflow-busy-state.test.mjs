import { applyOpenAIImageEngineWatermark } from '../src/lib/openai-image-settings.js';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { beginApiWork, cancelApiWork } from '../src/lib/api-work-cancellation.js';
import { collectRecentScenarioOutcomes } from '../src/lib/generation-history.js';
import { retryImagePolicyGeneration } from '../src/lib/image-policy-retry.js';
import { assertRenderOptions, buildRenderOptionsContract } from '../src/lib/render-options.js';
import { assertPrintableDialogue } from '../src/lib/bubble-text.js';
import { assertPromptEndingModeConsistency } from '../src/lib/ending-mode-policy.js';
import { buildReferenceAssetContext } from '../src/lib/reference-assets.js';

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
    referenceEditorError: '',
    buildReferenceAssetContext, referenceAssetsRef: { current: [] }, imagesRef: { current: [] },
    beginApiWork, cancelApiWork, is360Analyzing: false, isAnalyzingRef: { current: false }, analyzeThought: '',
    scenario: 'Original scenario with enough text for enhancement', castList: 'Reference cast with sufficient detail',
    originalScenario: '', scenarioThought: '', enhanceLog: '', genLog: [], finalPrompt: 'Original prompt',
    isSearching: false, isEnhancing: false, isGeneratingImage: false, isFixingPolicy: false,
    policyAutoRetrying: false, allowImageQualityRepair: true, is360CameraWorking: false, isFullAutoMode: false, isAborting: false,
    isAssembling: false, isAnalyzing: false,
    scenarioRunEpochRef: { current: 0 }, promptAssemblyRunRef: { current: 0 },
    promptAssemblyAbortRef: { current: null }, fullAutoAbortRef: { current: false },
    isFullAutoModeRef: { current: false }, qualityRetryAbortRef: { current: false },
    resolvedPunchlineTypeRef: { current: '' }, scenarioUsedModelRef: { current: null },
    recentScenarioTextsRef: { current: [] }, generationHistory: [], collectRecentScenarioOutcomes,
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
  for (const name of ['finishScenarioTiming', 'invalidateScenarioRun', 'invalidatePromptAssembly',
    'invalidateScenarioOutput', 'setScenarioFromUser', 'setPunchlineType', 'assertImageGenerationPrompt']) {
    if (source.includes(`const ${name} = `)) bind(name);
  }
  return { state, bind };
}

const result = { topic: 'Generic title', scenario: 'A complete generated scenario', usedModel: 'unchanged' };
const flush = async () => { for (let i = 0; i < 12; i++) await Promise.resolve(); };

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
    now = 1000;
    state.setScenarioFromUser('replacement');
    const latest = generate();
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

for (const mode of ['disabled', 'review-only']) {
  test(`${mode} image generation cannot automatically enter the paid policy repair path`, async () => {
    const { state, bind } = harness({
      allowImageQualityRepair: mode !== 'disabled',
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
      allowImageQualityRepair: mode !== 'disabled',
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
    const { state, bind } = harness({ allowImageQualityRepair: mode !== 'disabled' });
    assert.equal(await bind('generateImageOnce')(true, 'Unapproved changed prompt', {
      policyAttempt: 1, reviewOnly: mode === 'review-only',
    }), false);
    assert.equal(state.finalPrompt, 'Original prompt');
    assert.equal(state.isGeneratingImage, false);
    assert.deepEqual(state.genLog, []);
  });
}

test('enabled automatic policy repair retains its one successful repair and generation flow', async () => {
  let generations = 0, repairs = 0;
  const { state, bind } = harness({
    retryImagePolicyGeneration,
    fixPolicyViolation: async () => { repairs++; return { success: true, modifiedPrompt: 'Compliant revised prompt' }; },
    generateImageOnce: async (_skip, prompt, options) => {
      generations++;
      assert.equal(options.suppressPolicyChoice, true);
      if (generations === 1) { state.lastPolicyErrorRef.current = 'Safety refusal'; return false; }
      assert.equal(prompt, 'Compliant revised prompt');
      assert.equal(options.policyAttempt, 1);
      state.lastPolicyErrorRef.current = '';
      return true;
    },
  });
  bind('runPolicyAutoRetries');
  assert.equal(await bind('regenerateImage')(), true);
  assert.equal(generations, 2);
  assert.equal(repairs, 1);
  assert.equal(state.finalPrompt, 'Compliant revised prompt');
  assert.equal(state.policyAutoRetrying, false);
  assert.equal(state.isFixingPolicy, false);
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

test('an invalid policy proposal is replanned with feedback until a valid image can be generated', async () => {
  const original = `${buildRenderOptionsContract()}\nApproved scene`;
  const revised = `${buildRenderOptionsContract()}\nValid revised scene`;
  let repairs = 0, generations = 0;
  const { state, bind } = harness({
    finalPrompt: original, assertRenderOptions, retryImagePolicyGeneration,
    fixPolicyViolation: async ({ repairFeedback, shouldStop }) => {
      repairs++;
      assert.equal(shouldStop(), false);
      if (repairs === 1) return { success: true, modifiedPrompt: `${buildRenderOptionsContract({ mosaicCopyrightedCharacters: false })}\nInvalid scene` };
      assert.match(repairFeedback, /モザイク／ウオーターマークの設定/);
      assert.equal(state.finalPrompt, original);
      return { success: true, modifiedPrompt: revised };
    },
    generateImageOnce: async () => { generations++; return true; },
  });
  assert.equal(await bind('runPolicyAutoRetries')({ initialPrompt: original, initialPolicyError: 'Safety refusal' }), true);
  assert.equal(repairs, 2);
  assert.equal(generations, 1);
  assert.equal(state.finalPrompt, revised);
  assert.deepEqual(state.policyPromptHistory, [original, revised]);
  assert.match(state.genLog.join('\n'), /次の修正検討へ引き継ぎます/);
  assert.match(state.genLog.join('\n'), /修正検討2回・画像再生成1回で成功/);
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
