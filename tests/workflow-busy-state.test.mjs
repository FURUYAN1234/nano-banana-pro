import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

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
    scenario: 'Original scenario with enough text for enhancement', castList: 'Reference cast with sufficient detail',
    originalScenario: '', scenarioThought: '', enhanceLog: '', genLog: [], finalPrompt: 'Original prompt',
    isSearching: false, isEnhancing: false, isGeneratingImage: false, isFixingPolicy: false,
    policyAutoRetrying: false, is360CameraWorking: false, isFullAutoMode: false, isAborting: false,
    isAssembling: false, isAnalyzing: false,
    scenarioRunEpochRef: { current: 0 }, promptAssemblyRunRef: { current: 0 },
    promptAssemblyAbortRef: { current: null }, fullAutoAbortRef: { current: false },
    isFullAutoModeRef: { current: false }, qualityRetryAbortRef: { current: false },
    resolvedPunchlineTypeRef: { current: '' }, scenarioUsedModelRef: { current: null },
    lastPolicyErrorRef: { current: '' }, isEndlessModeRef: { current: false },
    step2Ref: { current: null }, step3Ref: { current: null }, imageResultRef: { current: null },
    enhanceExpressions: true, enhanceBodyLang: false, enhanceEffects: false,
    enhanceBackgrounds: false, enhanceCameraWork: false, enhanceDialogue: false, enhanceGag: false,
    categories: [{ id: 'news', label: 'News', checked: true, keywords: 'news' }],
    inputMode: 'manual', manualTopic: 'A generic short scene', searchTopic: '', targetDate: '2026-10-02',
    customLocation: '', customOutfit: '', punchlineType: 'Auto',
    bg360Image: null, bg360Analysis: null, bg360Enabled: false, bg360ImageParts: [],
    styleJson: {}, scenarioModelId: 'unchanged', mosaicCopyrightedCharacters: true,
    isOpenAIEngine: true, selectedEngine: 'chatgpt', policyErrorMsg: 'policy refusal', MAX_POLICY_RETRIES: 5,
    updateResolvedPunchlineType: () => {}, showStatus: () => {},
    validateMangaScenario: () => ({ ok: true }), formatGeneratedMangaTitle: title => title,
    translateApiError: error => error.message, console: { error: () => {} },
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
    'invalidateScenarioOutput', 'setScenarioFromUser', 'setPunchlineType']) {
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

test('invalid STEP2 input leaves the existing generation and run ownership intact', async () => {
  const { state, bind } = harness({ manualTopic: '', isGeneratingImage: true, alert: () => {} });
  await bind('generateScenarioFromNews')();
  assert.equal(state.scenarioRunEpochRef.current, 0);
  assert.equal(state.isGeneratingImage, true);
  assert.equal(state.finalPrompt, 'Original prompt');
});
