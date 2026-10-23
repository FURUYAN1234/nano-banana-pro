import assert from 'node:assert/strict';
import test from 'node:test';

import {
  OPENAI_SCENARIO_MODEL_OPTIONS,
  OPENAI_SCENARIO_PRICE_SNAPSHOT_DATE,
  OPENAI_SCENARIO_TEXT_MODEL_IDS,
  resolveDefaultOpenAIScenarioModelId,
  getOpenAIScenarioCostEstimate,
  getOpenAIScenarioModelRoute,
} from '../src/lib/openai-model-routes.js';

test('STEP2 starts on Luna 6 in both environments', () => {
  assert.equal(resolveDefaultOpenAIScenarioModelId(true), 'gpt-6-luna');
  assert.equal(resolveDefaultOpenAIScenarioModelId(false), 'gpt-6-luna');
});

const step2PanelSource = await import('node:fs/promises')
  .then(({ readFile }) => readFile(new URL('../src/components/Step2Panel.jsx', import.meta.url), 'utf8'));
const modelPanelSource = await import('node:fs/promises')
  .then(({ readFile }) => readFile(new URL('../src/components/ModelSelectionPanel.jsx', import.meta.url), 'utf8'));
const workflowSource = await import('node:fs/promises')
  .then(({ readFile }) => readFile(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8'));
const cssSource = await import('node:fs/promises')
  .then(({ readFile }) => readFile(new URL('../src/index.css', import.meta.url), 'utf8'));

test('initial selection, invalid selection and full reset share the environment default without overwriting an explicit model', () => {
  const selectionBlock = workflowSource.slice(
    workflowSource.indexOf('const [scenarioModelId, setScenarioModelIdState]'),
    workflowSource.indexOf('const [promptModelId, setPromptModelIdState]'),
  );
  const initializeSelection = new Function('useState', 'DEFAULT_OPENAI_SCENARIO_MODEL_ID', 'OPENAI_SCENARIO_TEXT_MODEL_IDS',
    `${selectionBlock}; return {scenarioModelId, setScenarioModelId, resetScenarioModelId};`);
  for (const [development, expected] of [[true, 'gpt-6-luna'], [false, 'gpt-6-luna']]) {
    let selected;
    const selection = initializeSelection(initial => {
      selected = initial;
      return [initial, value => { selected = value; }];
    }, resolveDefaultOpenAIScenarioModelId(development), OPENAI_SCENARIO_TEXT_MODEL_IDS);
    assert.equal(selection.scenarioModelId, expected);
    selection.setScenarioModelId('gpt-6-sol');
    assert.equal(selected, 'gpt-6-sol', 'an intentional supported choice remains allowed');
    selection.setScenarioModelId('not-a-model');
    assert.equal(selected, expected);
    selection.setScenarioModelId('gpt-6-astra');
    selection.resetScenarioModelId();
    assert.equal(selected, expected);
  }
});

test('the STEP2 selectable route includes every supported scenario fallback model', () => {
  assert.deepEqual(OPENAI_SCENARIO_TEXT_MODEL_IDS, [
    'gpt-6-astra',
    'gpt-6.1-sol',
    'gpt-6-sol',
    'gpt-5.6-sol',
    'gpt-5.6-terra',
    'gpt-6-luna',
    'gpt-5.6-luna',
  ]);
  assert.deepEqual(
    OPENAI_SCENARIO_MODEL_OPTIONS.map(({ id }) => id),
    OPENAI_SCENARIO_TEXT_MODEL_IDS,
  );
  assert.ok(OPENAI_SCENARIO_MODEL_OPTIONS.every(({ label, description }) => label && description));
  assert.equal(OPENAI_SCENARIO_PRICE_SNAPSHOT_DATE, '2026-10-23');
  assert.equal(OPENAI_SCENARIO_MODEL_OPTIONS.find(({ id }) => id === 'gpt-6.1-sol').priceSnapshotDate, '2026-10-23');
  assert.ok(OPENAI_SCENARIO_MODEL_OPTIONS.every(({ inputPriceUsdPerM, outputPriceUsdPerM }) => (
    Number.isFinite(inputPriceUsdPerM) && Number.isFinite(outputPriceUsdPerM)
  )));
  assert.match(
    OPENAI_SCENARIO_MODEL_OPTIONS.find(({ id }) => id === 'gpt-5.6-terra').comparisonNote,
    /GPT-4\.1と入力単価は同じ/,
  );
  assert.match(
    OPENAI_SCENARIO_MODEL_OPTIONS.find(({ id }) => id === 'gpt-5.6-terra').description,
    /バランス/,
  );
  assert.deepEqual(
    OPENAI_SCENARIO_MODEL_OPTIONS.filter(({ id }) => id.startsWith('gpt-6-'))
      .map(({ id, inputPriceUsdPerM, outputPriceUsdPerM }) => [id, inputPriceUsdPerM, outputPriceUsdPerM]),
    [['gpt-6-astra', 10, 50], ['gpt-6-sol', 2, 10], ['gpt-6-luna', 0.1, 0.5]],
  );
});

test('a fixed scenario model falls back only to later models', () => {
  assert.deepEqual(getOpenAIScenarioModelRoute('gpt-6-sol').slice(0, 3), [
    'gpt-6-sol', 'gpt-5.6-sol', 'gpt-5.6-terra',
  ]);
  assert.deepEqual(getOpenAIScenarioModelRoute('gpt-6-luna').slice(0, 2), [
    'gpt-6-luna', 'gpt-5.6-luna',
  ]);
  assert.deepEqual(getOpenAIScenarioModelRoute('gpt-5.6-luna'), [
    'gpt-5.6-luna',
  ]);
  assert.ok(OPENAI_SCENARIO_TEXT_MODEL_IDS.every(id=>!/^gpt-4/.test(id)));
});

test('local Luna validation cannot silently fall back while production and other selected models keep their routes', () => {
  assert.deepEqual(getOpenAIScenarioModelRoute('gpt-6-luna', true), ['gpt-6-luna']);
  assert.deepEqual(getOpenAIScenarioModelRoute('gpt-6-luna', false), [
    'gpt-6-luna', 'gpt-5.6-luna',
  ]);
  for (const id of OPENAI_SCENARIO_TEXT_MODEL_IDS.filter(id => id !== 'gpt-6-luna')) {
    assert.deepEqual(getOpenAIScenarioModelRoute(id, true), getOpenAIScenarioModelRoute(id, false));
  }
});

test('Vite development and production render the three independent initial models', async () => {
  const [{ createServer }, { default: React }, { renderToStaticMarkup }] = await Promise.all([
    import('vite'), import('react'), import('react-dom/server'),
  ]);
  const originalNodeEnv = process.env.NODE_ENV;
  try {
    for (const environment of ['development', 'production']) {
      process.env.NODE_ENV = environment;
      const server = await createServer({
        appType: 'custom', logLevel: 'silent', mode: environment,
        server: { middlewareMode: true, hmr: false },
      });
      try {
        assert.equal(server.config.isProduction, environment === 'production');
        const routes = await server.ssrLoadModule('/src/lib/openai-model-routes.js');
        const { default: ModelSelectionPanel } = await server.ssrLoadModule('/src/components/ModelSelectionPanel.jsx');
        assert.equal(routes.DEFAULT_OPENAI_SCENARIO_MODEL_ID, 'gpt-6-luna');
        assert.equal(routes.getOpenAIScenarioModelRoute('gpt-6-luna').length, environment === 'development' ? 1 : 2);
        const html = renderToStaticMarkup(React.createElement(ModelSelectionPanel, {
          analysisModelId: routes.DEFAULT_OPENAI_STEP1_MODEL_ID,
          scenarioModelId: routes.DEFAULT_OPENAI_SCENARIO_MODEL_ID,
          promptModelId: routes.DEFAULT_OPENAI_STEP3_MODEL_ID,
        }));
        assert.match(html, /STEP1 · 素材の画像解析[\s\S]*?STEP2 · シナリオ生成・強化[\s\S]*?STEP3 · 描画指示の構築・確認/);
        assert.equal((html.match(/value="gpt-6-luna" selected=""/g) || []).length, 3);
      } finally {
        await server.close();
      }
    }
  } finally {
    if (originalNodeEnv === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = originalNodeEnv;
  }
});

test('automatic or invalid selection keeps the complete default route', () => {
  assert.deepEqual(getOpenAIScenarioModelRoute('auto'), OPENAI_SCENARIO_TEXT_MODEL_IDS);
  assert.deepEqual(getOpenAIScenarioModelRoute('not-a-model'), OPENAI_SCENARIO_TEXT_MODEL_IDS);
});

test('scenario usage has a transparent list-price estimate', () => {
  assert.deepEqual(
    getOpenAIScenarioCostEstimate('gpt-5.6-terra', { input_tokens: 1_000, output_tokens: 2_000 }),
    { inputTokens: 1_000, outputTokens: 2_000, estimatedUsd: 0.026 },
  );
  assert.equal(getOpenAIScenarioCostEstimate('not-a-model', { input_tokens: 1, output_tokens: 1 }), null);
});

test('missing or invalid usage never becomes a zero-cost actual result', () => {
  for (const usage of [undefined, null, {}, { input_tokens: 100 }, { output_tokens: 20 },
    { input_tokens: -1, output_tokens: 20 }, { input_tokens: '', output_tokens: 20 },
    { input_tokens: false, output_tokens: 20 }]) {
    assert.equal(getOpenAIScenarioCostEstimate('gpt-5.6-terra', usage), null);
  }
  assert.deepEqual(getOpenAIScenarioCostEstimate('gpt-5.6-terra', { input_tokens: 0, output_tokens: 0 }),
    { inputTokens: 0, outputTokens: 0, estimatedUsd: 0 });
  assert.deepEqual(getOpenAIScenarioCostEstimate('gpt-5.6-terra', { prompt_tokens: 1000, completion_tokens: 2000 }),
    { inputTokens: 1000, outputTokens: 2000, estimatedUsd: 0.026 });
});

test('all three model choices appear before STEP1 with a clear price unit', () => {
  assert.match(modelPanelSource, /STEP1[\s\S]*STEP2[\s\S]*STEP3/);
  assert.match(modelPanelSource, /OPENAI_SCENARIO_MODEL_OPTIONS\.filter/);
  assert.match(modelPanelSource, /OPENAI_VISION_MODEL_IDS\.includes/);
  assert.match(modelPanelSource, /inputPriceUsdPerM, outputPriceUsdPerM/);
  assert.match(modelPanelSource, /USD\/100万トークン/);
  assert.doesNotMatch(step2PanelSource, /scenario-model-select-card/);
});

test('the scenario model dropdown has explicit readable closed and option colors', () => {
  assert.match(cssSource, /\.scenario-model-select-input\s*\{[\s\S]*background-color:\s*#e0f2fe;[\s\S]*color:\s*#0f172a;/);
  assert.match(cssSource, /\.scenario-model-select-input option\s*\{[\s\S]*background-color:\s*#0f172a;[\s\S]*color:\s*#f8fafc;/);
});

test('the three model controls fit one row or stack at narrow widths', () => {
  assert.match(cssSource, /\.model-selection-grid\s*\{[^}]*grid-template-columns:\s*repeat\(3,minmax\(0,1fr\)\)/);
  assert.match(cssSource, /@media \(max-width:700px\)\s*\{\s*\.model-selection-grid\s*\{\s*grid-template-columns:1fr;/);
});

test('all step models reset to Luna and keep choices in memory only', () => {
  assert.match(workflowSource, /useState\(DEFAULT_OPENAI_STEP1_MODEL_ID\)/);
  assert.match(workflowSource, /useState\(DEFAULT_OPENAI_SCENARIO_MODEL_ID\)/);
  assert.match(workflowSource, /useState\(DEFAULT_OPENAI_STEP3_MODEL_ID\)/);
  assert.doesNotMatch(workflowSource, /nano-banana-pro:scenario-model-id/);
  assert.doesNotMatch(workflowSource, /localStorage\.(?:getItem|setItem)/);
  assert.match(workflowSource, /scenarioModelId/);
  assert.match(workflowSource, /const hardReset = \(\) => \{[\s\S]*?resetScenarioModelId\(\);/);
  assert.match(workflowSource, /setAnalysisModelId\(DEFAULT_OPENAI_STEP1_MODEL_ID\)/);
  assert.match(workflowSource, /setPromptModelId\(DEFAULT_OPENAI_STEP3_MODEL_ID\)/);
});

test('Sol 6.1 uses its listed price and never escalates fallback to Astra', () => {
  assert.deepEqual(getOpenAIScenarioModelRoute('gpt-6.1-sol').slice(0, 3), ['gpt-6.1-sol', 'gpt-6-sol', 'gpt-5.6-sol']);
  assert.ok(!getOpenAIScenarioModelRoute('gpt-6.1-sol').includes('gpt-6-astra'));
  assert.equal(getOpenAIScenarioCostEstimate('gpt-6.1-sol', { input_tokens: 1000, output_tokens: 2000 }).estimatedUsd, 0.022);
});

