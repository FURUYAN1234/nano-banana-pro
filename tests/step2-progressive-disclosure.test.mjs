import assert from 'node:assert/strict';
import test, { before, after } from 'node:test';
import { readFile } from 'node:fs/promises';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

let server, Step2Panel;

before(async () => {
  server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true, hmr: false } });
  ({ default: Step2Panel } = await server.ssrLoadModule('/src/components/Step2Panel.jsx'));
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

test('preview and STEP3 are disclosed only after a scenario exists', async () => {
  const app = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8');

  assert.match(
    app,
    /\{currentStep >= 3 && \(\s*<>[\s\S]*?<GenerationPreview[\s\S]*?<Step3Panel[\s\S]*?<\/?>\s*\)\}/,
  );
});
