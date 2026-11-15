import assert from 'node:assert/strict';
import test, { before, after } from 'node:test';
import { readFile } from 'node:fs/promises';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import { createManualTopicInput, MANUAL_TOPIC_FIELD_ID, SCENARIO_FIELD_ID } from '../src/lib/manual-topic-input.js';

let server, Step2Panel, Step3Panel, GenerationHistory;

before(async () => {
  server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true, hmr: false } });
  ({ default: Step2Panel } = await server.ssrLoadModule('/src/components/Step2Panel.jsx'));
  ({ default: Step3Panel } = await server.ssrLoadModule('/src/components/Step3Panel.jsx'));
  ({ default: GenerationHistory } = await server.ssrLoadModule('/src/components/GenerationHistory.jsx'));
});

after(async () => { await server?.close(); });

test('the actual history selection callback changes only the selected image, retaining topic and scenario', () => {
  const state = { topic: 'original request', scenario: 'completed scenario', image: 'old' };
  const tree = GenerationHistory({ generationHistory: [{ id: 1, img: 'retained' }], generatedImage: state.image,
    setGeneratedImage: value => { state.image = value; }, setGenerationHistory() {} });
  let select;
  const walk = element => {
    if (!element || typeof element !== 'object') return;
    if (element.key === '1' && element.props.onClick) select = element.props.onClick;
    React.Children.forEach(element.props?.children, walk);
  };
  walk(tree);
  assert.equal(typeof select, 'function');
  select();
  assert.deepEqual(state, { topic: 'original request', scenario: 'completed scenario', image: 'retained' });
});

test('actual STEP2 field callbacks keep independent identities and reject cross-field dispatch without throwing', () => {
  const state = { topic: 'original topic', scenario: 'generated scenario' }, events = [];
  const topic = createManualTopicInput({ initialValue: state.topic, setValue: value => { state.topic = value; }, record: (_event, row) => events.push(row) });
  topic.observeScenario(state.scenario);
  const production = Step2Panel;
  let tree;
  Step2Panel = props => { tree = production(props); return tree; };
  try {
    renderStep2({ manualTopic: state.topic, scenario: state.scenario,
      setManualTopic: (value, metadata) => topic.update(value, metadata), flushManualTopicChanges: () => topic.flush('blur'),
      setScenario: value => { state.scenario = value; } });
  } finally { Step2Panel = production; }
  const fields = [];
  const walk = element => {
    if (!element || typeof element !== 'object') return;
    if (element.type === 'textarea') fields.push(element);
    React.Children.forEach(element.props?.children, walk);
  };
  walk(tree);
  const manual = fields.find(field => field.props.id === MANUAL_TOPIC_FIELD_ID);
  const scenario = fields.find(field => field.props.id === SCENARIO_FIELD_ID);
  assert(manual && scenario);
  assert.notEqual(manual.key, scenario.key);
  assert.notEqual(manual.props['aria-label'], scenario.props['aria-label']);
  const wrong = { id: SCENARIO_FIELD_ID, value: 'misrouted generated script', dataset: {} };
  assert.doesNotThrow(() => manual.props.onChange({ currentTarget: wrong, target: wrong, nativeEvent: { inputType: 'insertText', isTrusted: false } }));
  assert.equal(state.topic, 'original topic');
  assert.equal(events.at(-1).inputRejected, true);
  scenario.props.onChange({ target: { value: 'edited scenario only' } });
  assert.equal(state.topic, 'original topic');
  assert.equal(state.scenario, 'edited scenario only');
  const correct = { id: MANUAL_TOPIC_FIELD_ID, value: 'a legitimate pasted full script', dataset: {} };
  manual.props.onPaste({ currentTarget: correct });
  manual.props.onChange({ currentTarget: correct, target: correct, nativeEvent: { isTrusted: true } });
  assert.equal(state.topic, correct.value);
  assert.equal(events.at(-1).inputReason, 'paste');
  assert.equal(events.at(-1).inputTrusted, true);
  assert.doesNotMatch(JSON.stringify(events), /misrouted generated script|legitimate pasted full script/);
});

const renderStep2 = (overrides = {}) => renderToStaticMarkup(React.createElement(Step2Panel, {
  currentStep: 2,
  isAnalyzing: false,
  inputMode: 'manual',
  setInputMode() {},
  targetDate: '2026-09-19',
  setTargetDate() {},
  categories: [],
  toggleCategory() {},
  manualTopic: 'テスト用の題材',
  setManualTopic() {},
  bg360Image: null,
  bg360Enabled: false,
  setBg360Enabled() {},
  bg360Analysis: null,
  is360Analyzing: false,
  customLocation: '',
  setCustomLocation() {},
  customOutfit: '',
  setCustomOutfit() {},
  punchlineType: 'Auto',
  effectivePunchlineType: 'Auto',
  setPunchlineType() {},
  isSearching: false,
  generateScenarioFromNews() {},
  scenarioThought: '',
  scenario: '',
  setScenario() {},
  isScenarioCopied: false,
  setIsScenarioCopied() {},
  originalScenario: '',
  isEnhancePanelOpen: false,
  setIsEnhancePanelOpen() {},
  enhanceExpressions: false,
  setEnhanceExpressions() {},
  enhanceBodyLang: false,
  setEnhanceBodyLang() {},
  enhanceEffects: false,
  setEnhanceEffects() {},
  enhanceBackgrounds: false,
  setEnhanceBackgrounds() {},
  enhanceCameraWork: false,
  setEnhanceCameraWork() {},
  enhanceDialogue: false,
  setEnhanceDialogue() {},
  enhanceGag: false,
  setEnhanceGag() {},
  isEnhancing: false,
  enhanceScenario() {},
  revertScenario() {},
  enhanceLog: '',
  showStatus() {},
  styleJson: null,
  ...overrides,
}));

test('STEP2 help uses the selected panel-count names without old experimental ON/OFF labels', () => {
  for (const experimentEnabled of [false, true]) {
    const html = renderStep2({ experimentEnabled });
    assert.match(html, experimentEnabled ? /4～8コマ<!-- -->のストーリー設定|4～8コマのストーリー設定/ : /4コマ<!-- -->のストーリー設定|4コマのストーリー設定/);
    assert.match(html, /「4コマ生成（横長コマ）レガシー」は横長4コマの縦一列固定/);
    assert.match(html, /「4～8コマ生成」では4～8コマで指定でき/);
    assert.doesNotMatch(html, /実験的コマ割り|通常モードは4コマ固定/);
  }
});

test('STEP2 generation keeps the real progress log visible while hiding stale result controls', () => {
  const html = renderStep2({
    isSearching: true,
    scenarioThought: '> OpenAI Web Search で検索中...\n> ⏳ AI応答を待機中... (4秒経過)',
    scenario: '以前のシナリオ',
  });

  assert.match(html, /SCENARIO GENERATING/);
  assert.match(html, /AI応答を待機中/);
  assert.doesNotMatch(html, /<textarea[^>]*aria-label="生成されたシナリオ"/);
  assert.doesNotMatch(html, /以前のシナリオ/);
  assert.doesNotMatch(html, /シナリオをコピー/);
  assert.doesNotMatch(html, /シナリオ強化/);
});

test('STEP2 result controls return after generation finishes', () => {
  const html = renderStep2({ currentStep: 3, scenario: '生成済みシナリオ。人物の行動と台詞が入った台本。' });

  assert.match(html, /<textarea[^>]*aria-label="生成されたシナリオ"/);
  assert.match(html, /生成済みシナリオ/);
  assert.match(html, /シナリオをコピー/);
  assert.match(html, /シナリオ強化/);
});

test('STEP2 progress frame remains for pasted scenarios without inventing an API result', () => {
  const html = renderStep2({ currentStep: 4, scenario: '手入力したシナリオ', scenarioThought: '' });
  assert.match(html, /Neural Process/);
  assert.match(html, /STEP2を実行すると/);
  assert.doesNotMatch(html, /STEP2 TIME|シナリオ生成完了/);
});

test('first STEP2 keeps a pasteable editor and reveals enhancement only for usable scenario text', () => {
  const empty = renderStep2();
  assert.match(empty, /aria-label="生成されたシナリオ"/);
  assert.match(empty, /STEP2を実行すると/);
  assert.doesNotMatch(empty, /シナリオ強化/);
  const scenario = '生成済みシナリオ。人物の行動と台詞が入った台本。';
  const closed = renderStep2({ scenario });
  assert.match(closed, /aria-expanded="false"/);
  assert.doesNotMatch(closed, /シナリオ強化実行/);
  const open = renderStep2({ scenario, isEnhancePanelOpen: true });
  assert.match(open, /aria-expanded="true"/);
  assert.match(open, /シナリオ強化実行/);
  assert.doesNotMatch(open, /シナリオ強化を開始しています/);
  assert.equal((open.match(/Neural Process/g) || []).length, 1, 'no unused enhancement progress space');
  for (const activity of [{ isEnhancing: true }, { enhanceLog: '> 強化に失敗しました。元の台本は保持しています。' }]) {
    const active = renderStep2({ scenario, isEnhancePanelOpen: true, ...activity });
    assert.equal((active.match(/Neural Process/g) || []).length, 2, 'started or failed enhancement retains progress');
  }
});

test('automatic or active processing cannot reopen enhancement and conceal downstream progress', async () => {
  const html = renderStep2({ scenario: '生成済みシナリオ。人物の行動と台詞が入った台本。',
    isEnhancePanelOpen: true, enhanceExpressions: true, enhancementControlsDisabled: true });
  const buttons = [...html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)];
  const toggle = buttons.find(([,attrs]) => attrs.includes('aria-expanded='));
  const execute = buttons.find(([, ,body]) => body.includes('シナリオ強化実行'));
  assert.match(toggle[1], /disabled=""/);
  assert.match(execute[1], /disabled=""/);
  const app = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8');
  const condition = app.match(/const enhancementViewOpen = ([^;]+);/)[1];
  const visible = new Function('isFullAutoMode','isEnhancePanelOpen','scenario',`return Boolean(${condition});`);
  assert.equal(visible(true,true,'a'.repeat(30)),false);
  assert.equal(visible(false,true,'a'.repeat(30)),true);
});

test('STEP2 completion log and final time remain beside the generated scenario', () => {
  const html = renderStep2({ currentStep: 3, scenario: '生成済みシナリオ',
    scenarioThought: '> シナリオ生成完了\n> [STEP2 TIME] 完了: 12.345秒' });
  assert.match(html, /シナリオ生成完了/);
  assert.match(html, /\[STEP2 TIME\] 完了: 12\.345秒/);
  assert.match(html, /生成されたシナリオ/);
  assert.doesNotMatch(html, /STEP2を実行すると/);
});

test('preview waits for a scenario and the page-mode switch precedes STEP2', async () => {
  const app = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8');
  assert.match(app, /\{!isAnalyzing && !isSearching && !enhancementViewOpen && currentStep >= 3 && \(\s*<>\s*<GenerationPreview[\s\S]*?<\/?>\s*\)\}/);
  assert.match(app, /<ExperimentalMangaPanel[\s\S]*?currentStep=\{currentStep\} isAnalyzing=\{isAnalyzing\} isSearching=\{isSearching\}[\s\S]*?\/>[\s\S]*?<Step2Panel/);
  assert.doesNotMatch(app, /<\/ExperimentalMangaPanel>/);
});

test('STEP3 stays locked until STEP2 is ready in both page modes', () => {
  for (const experimentEnabled of [false, true]) {
    const render = overrides => renderToStaticMarkup(React.createElement(Step3Panel, {
      currentStep: 3, experimentEnabled, scenarioModeValid: true,
      setColorMode() {}, setShowWatermarks() {}, assemblePrompt() {}, ...overrides,
    }));
    for (const blocked of [{ currentStep: 2 }, { isAnalyzing: true }, { isSearching: true }]) {
      const html = render(blocked);
      assert.match(html, /<button[^>]*disabled=""/);
      assert.match(html, /pointer-events:auto/);
    }
    const ready = render({});
    assert.doesNotMatch(ready, /<button[^>]*disabled=""/);
    assert.doesNotMatch(ready, /pointer-events:auto/);
  }
});
