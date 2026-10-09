import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { beginApiWork } from '../src/lib/api-work-cancellation.js';
import { assertImageInputBudget } from '../src/lib/image-input-budget.js';
import { buildReferenceAssetContext } from '../src/lib/reference-assets.js';
import { formatOpenAIImageEngineName } from '../src/lib/openai-image-settings.js';
import { GEMINI_IMAGE_MODEL } from '../src/lib/gemini-image-settings.js';

const workflow = readFileSync(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');
const assembly = workflow.slice(workflow.indexOf('const assemblePrompt ='), workflow.indexOf('// [v3.04]'));

test('STEP3 rejects an over-budget legacy session before starting API work', async () => {
  for (const [count, background] of [[15, false], [11, true]]) {
    let calls = 0; let error = '';
    const context = { assertImageInputBudget, referenceEditorError: '',
      imagesRef:{current:Array.from({length:count}, (_, i) => `sheet-${i}`)}, bg360EnabledRef:{current:background},
      beginApiWork:()=>{calls++;}, setImageInputError:value=>{error=value;}, showStatus:()=>{} };
    vm.createContext(context);
    vm.runInContext(assembly + 'globalThis.start=assemblePrompt;', context);
    assert.equal(await context.start(), null);
    assert.equal(calls, 0);
    assert.match(error, background ? /10枚/ : /14枚/);
  }
});

test('scenario invalidation releases STEP3 and an old review cannot unlock or overwrite a new run', async () => {
  const reviews = [];
  let active = false;
  let output = '';
  const context = {
    referenceEditorError: '',
    formatOpenAIImageEngineName, GEMINI_IMAGE_MODEL, openAIImageQuality: 'sunburst_max', translateApiError: error => error.message,
    beginApiWork,
    buildReferenceAssetContext, referenceAssetsRef: { current: [] },
    assertImageInputBudget, imagesRef:{current:[]}, bg360EnabledRef:{current:false}, setImageInputError:()=>{},
    scenarioRunEpochRef:{current:0}, promptAssemblyRunRef:{current:0}, promptAssemblyAbortRef:{current:null},
    scenario:'fixture scenario', castList:'fixture cast', collectCastNameEntries:()=>[], validateMangaScenario:()=>({ok:true}),
    setIsAssembling:value=>{active=value;}, setFinalPrompt:value=>{output=value;},
    setGenLog:()=>{},setPolicyErrorMsg:()=>{},setPolicyFixLog:()=>{},setIsPolicyPanelOpen:()=>{},setShowPolicyChoice:()=>{},
    lastPolicyErrorRef:{current:''},setAssembleThought:()=>{},normalizePromptProviderFamily:value=>value,getCurrentPromptProviderFamily:()=> 'gemini',
    Date,AbortController,setInterval:()=>1,clearInterval:()=>{},resolvedPunchlineTypeRef:{current:'gag'},resolveScenarioEndingType:()=> 'gag',
    punchlineType:'gag',updateResolvedPunchlineType:()=>{},PROMPT_PROVIDER_FAMILIES:{CHATGPT:'chatgpt'},assembleMangaPromptWithRecovery:async options=> ({artifact:{prompt:'built prompt'},scenario:options.scenario,repaired:false}),validateMangaPromptArtifact:()=>({valid:true}),
    colorMode:'color',mosaicCopyrightedCharacters:true,showWatermarks:true,assertRenderOptions:()=>{},bg360Image:null,bg360Analysis:null,bg360Enabled:false,bg360CroppedPanels:null,SYSTEM_VERSION:'fixture',
    OPENAI_SCENARIO_MODEL_OPTIONS:[],scenarioUsedModelRef:{current:null},getEndingModePolicy:()=>({endingTone:'gag'}),
    reviewComedyPrompt:input=>new Promise(resolve=>reviews.push({resolve,signal:input.signal})),callAI:()=>{},isDocumentaryEnding:()=>false,
    assertPromptEndingModeConsistency:()=>{},assertPrintableDialogue:()=>{},showStatus:()=>{},console,
    qualityRetryAbortRef:{current:false},setGeneratedImage:()=>{},setIsGeneratingImage:()=>{},setIsFixingPolicy:()=>{},setPolicyAutoRetrying:()=>{},
    setIsSearching:()=>{},setIsEnhancing:()=>{},setIs360CameraWorking:()=>{}
  };
  const resetStart = workflow.includes('const invalidatePromptAssembly =') ? 'const invalidatePromptAssembly =' : 'const invalidateScenarioOutput =';
  const invalidation = workflow.slice(workflow.indexOf(resetStart), workflow.indexOf('const setScenarioFromUser ='));
  vm.createContext(context);
  vm.runInContext(assembly + invalidation + 'globalThis.start=assemblePrompt;globalThis.invalidate=invalidateScenarioOutput;', context);
  const first = context.start();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(active, true);
  context.invalidate();
  assert.equal(active, false, 'invalidated assembly must release its loading state immediately');
  assert.equal(reviews[0].signal.aborted, true, 'the invalidated API request must be cancelled');
  const second = context.start();
  await new Promise(resolve => setImmediate(resolve));
  reviews[0].resolve({prompt:'stale prompt'});
  assert.equal(await first, null);
  assert.equal(active, true, 'old finally must not unlock the new run');
  assert.equal(output, '');
  reviews[1].resolve({prompt:'current prompt'});
  assert.equal(await second, 'current prompt');
  assert.equal(output, 'current prompt');
  assert.equal(active, false);
});

test('prompt review updates one elapsed-time line and ignores superseded runs', () => {
  let now = 10000;
  let thought = 'AI精査中...';
  let tick;
  const epoch = { current: 1 };
  const run = { current: 1 };
  const timerStart = assembly.indexOf('const assemblyStartedAt');
  const timer = assembly.slice(timerStart, assembly.indexOf('\n    try {', timerStart));
  vm.runInNewContext(timer, {
    Date: { now: () => now },
    setInterval: (callback, delay) => { assert.equal(delay, 1000); tick = callback; },
    setAssembleThought: update => { thought = update(thought); },
    promptScenarioEpoch: 1, scenarioRunEpochRef: epoch,
    assemblyRun: 1, promptAssemblyRunRef: run,
  });
  now += 1000;
  tick();
  assert.match(thought, /AI応答を待機中\.\.\. \(1秒経過\)/);
  thought += '\n' + '進捗ログ'.repeat(250);
  now += 64000;
  tick();
  assert.match(thought, /\(65秒経過\)/);
  assert.equal(thought.match(/AI応答を待機中/g).length, 1);
  const previous = thought;
  run.current++;
  now += 1000;
  tick();
  assert.equal(thought, previous);
  run.current = 1;
  epoch.current++;
  tick();
  assert.equal(thought, previous);
  assert.match(assembly, /finally\s*\{\s*clearInterval\(thinkTimer\)/);
});

test('obsolete STEP4 timer and API callbacks leave the current generation log intact', () => {
  const generation = workflow.slice(workflow.indexOf('const generateImageOnce ='), workflow.indexOf('const runPolicyAutoRetries ='));
  const timer = generation.slice(generation.indexOf('const generationStartedAt'), generation.indexOf('// Artificial delay'));
  const callback = generation.slice(generation.indexOf('const statCallback ='), generation.indexOf('const geminiReferenceImages ='));
  let now = 1000, tick;
  let log = ['current log'];
  let deferred = false;
  const updates = [];
  const epoch = { current: 1 };
  const context = {
    beginApiWork,
    Date: { now: () => now }, generationOptions: {}, qualityRunEpoch: 1, scenarioRunEpochRef: epoch,
    setInterval: fn => { tick = fn; return 1; },
    setGenLog: update => { if (deferred) updates.push(update); else log = update(log); },
  };
  vm.createContext(context);
  vm.runInContext(timer + callback + 'globalThis.progress = statCallback;', context);
  now = 3000;
  tick();
  context.progress('active API progress');
  assert.equal(log[1], '[WAIT] ⏳ 画像生成中… 合計2秒経過');
  assert.equal(log[2], 'active API progress');

  // React may apply a functional update after the scenario is superseded.
  deferred = true;
  tick();
  context.progress('queued obsolete progress');
  epoch.current = 2;
  log = ['new generation'];
  const currentLog = log;
  for (const update of updates.splice(0)) log = update(log);
  assert.equal(log, currentLog);

  deferred = false;
  now = 99000;
  tick();
  context.progress('late obsolete progress');
  assert.equal(log, currentLog);
});
