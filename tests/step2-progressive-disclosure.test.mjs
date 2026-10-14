import assert from 'node:assert/strict';
import test, { before, after } from 'node:test';
import { readFile } from 'node:fs/promises';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

let server, Step2Panel, Step3Panel;

before(async () => {
  server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true, hmr: false } });
  ({ default: Step2Panel } = await server.ssrLoadModule('/src/components/Step2Panel.jsx'));
  ({ default: Step3Panel } = await server.ssrLoadModule('/src/components/Step3Panel.jsx'));
});

after(async () => { await server?.close(); });

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
    assert.match(html, experimentEnabled ? /5～8コマ<!-- -->のストーリー設定|5～8コマのストーリー設定/ : /4コマ<!-- -->のストーリー設定|4コマのストーリー設定/);
    assert.match(html, /「4コマ生成」は4コマ固定/);
    assert.match(html, /「5～8コマ生成」では5～8コマで指定でき/);
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
  assert.doesNotMatch(html, /生成されたシナリオ/);
  assert.doesNotMatch(html, /シナリオをコピー/);
  assert.doesNotMatch(html, /シナリオ強化/);
});

test('STEP2 result controls return after generation finishes', () => {
  const html = renderStep2({ currentStep: 3, scenario: '生成済みシナリオ' });

  assert.match(html, /生成されたシナリオ/);
  assert.match(html, /シナリオをコピー/);
  assert.match(html, /シナリオ強化/);
});

test('STEP2 progress frame remains for pasted scenarios without inventing an API result', () => {
  const html = renderStep2({ currentStep: 4, scenario: '手入力したシナリオ', scenarioThought: '' });
  assert.match(html, /Neural Process/);
  assert.match(html, /STEP2を実行すると/);
  assert.doesNotMatch(html, /STEP2 TIME|シナリオ生成完了/);
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
  assert.match(app, /\{!isAnalyzing && !isSearching && currentStep >= 3 && \(\s*<>\s*<GenerationPreview[\s\S]*?<\/?>\s*\)\}/);
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
