import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';

let server;
let getScenarioPrompt;
let parseScenarioResponse;
let resolveGeneratedEnding;
let assertNoInputModeLabelLeak;
let sanitizeInputModeLabelLeak;

before(async () => {
  server = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true },
  });
  ({ getScenarioPrompt } = await server.ssrLoadModule('/src/lib/prompts.js'));
  ({
    parseScenarioResponse,
    assertNoInputModeLabelLeak,
    sanitizeInputModeLabelLeak,
  } = await server.ssrLoadModule('/src/lib/scenario-provider.js'));
  ({ resolveGeneratedEnding } = await server.ssrLoadModule('/src/lib/ending-mode-policy.js'));
});

after(async () => {
  await server?.close();
});

const buildPrompt = (overrides = {}) => getScenarioPrompt({
  randomCategory: '自由入力モード',
  targetDate: '2026-09-23',
  inputMode: 'manual',
  manualTopic: '山岳救助隊が新しい交代手順を試す',
  newsContext: '',
  searchTopicKeywords: '',
  bg360Image: null,
  bg360Analysis: null,
  bg360Enabled: false,
  customLocation: '',
  customOutfit: '',
  locationPlan: null,
  ragReactions: '',
  punchlineType: 'Auto',
  comedyTone: 'HighTension',
  styleJson: null,
  ...overrides,
});

test('manual topics never receive input-mode labels or news-search directives as story content', () => {
  const prompt = buildPrompt();
  const promptWithExclusions = buildPrompt({
    manualTopic: '山岳救助隊が新しい交代手順を試す。お金ネタは禁止。',
  });

  assert.match(prompt, /トピック: 山岳救助隊が新しい交代手順を試す/);
  assert.doesNotMatch(prompt, /手動入力|手入力|自由入力/);
  assert.doesNotMatch(promptWithExclusions, /手動入力|手入力|自由入力/);
  assert.doesNotMatch(prompt, /Time Machine Lock|Data Freshness Lock|MUST search for news\/events/);
  assert.doesNotMatch(prompt, /IT系ネタは禁止|具体的でマイナーな[^\n]*ニュース|Topic: \[ニュースの見出し/);
  assert.doesNotMatch(prompt, /ニュースのトピック/);
  assert.match(prompt, /大破壊|支離滅裂/);
  assert.match(prompt, /辻褄合わせ|後付け説明/);
});

test('news mode keeps category, date, freshness, and search instructions', () => {
  const prompt = buildPrompt({
    randomCategory: '最新 科学 宇宙 考古学 発見',
    inputMode: 'news',
    manualTopic: '',
    searchTopicKeywords: '最新 科学 宇宙 考古学 発見 -AI',
  });

  assert.match(prompt, /Topic Lock.*最新 科学 宇宙 考古学 発見/);
  assert.match(prompt, /Time Machine Lock/);
  assert.match(prompt, /Data Freshness Lock/);
  assert.match(prompt, /具体的でマイナーな[^\n]*ニュース/);
});

test('manual response parsing falls back to the user topic instead of the input mode label', () => {
  assert.equal(typeof parseScenarioResponse, 'function');
  const result = parseScenarioResponse({
    text: `Logline: 救助隊が連携を見直す
Location: 山岳基地
Scenario:
[1コマ目: 起]
状況: 隊員が交代表を確認する。
隊員「順番を確かめよう。」`,
  }, {
    randomCategory: '手動入力',
    inputMode: 'manual',
    manualTopic: '山岳救助隊が新しい交代手順を試す',
    searchTopic: '',
  });

  assert.equal(result.topic, '山岳救助隊が新しい交代手順を試す');
});

test('manual output rejects input-mode labels unless the user topic explicitly contains them', () => {
  assert.equal(typeof assertNoInputModeLabelLeak, 'function');
  for (const scenario of [
    { topic: '手入力が現場を占領' },
    { topic: 'ユーザー提供トピックの救助隊' },
    { topic: 'Custom Scenario' },
    { location: 'Generic Background' },
    { scenario: '[1コマ目: 起]\n状況: 最新ニュースを見て交代表を確認する。' },
  ]) {
    assert.throws(() => assertNoInputModeLabelLeak({
      manualTopic: '山岳救助隊が新しい交代手順を試す',
      scenario: {
        scenario: '[1コマ目: 起]\n状況: 隊員が交代表を確認する。',
        ...scenario,
      },
    }), (error) => error?.code === 'INPUT_MODE_LABEL_LEAK');
  }

  assert.equal(assertNoInputModeLabelLeak({
    manualTopic: '紙の手入力を減らす業務改善',
    scenario: {
      topic: '手入力を減らす現場',
      scenario: '[1コマ目: 起]\n状況: 紙の手入力欄を確認する。',
    },
  }), true);
});

test('the best retained candidate is sanitized instead of being discarded after retries', () => {
  assert.equal(typeof sanitizeInputModeLabelLeak, 'function');
  const sanitized = sanitizeInputModeLabelLeak({
    manualTopic: '山岳救助隊が新しい交代手順を試す',
    scenario: {
      topic: '手入力が現場を占領',
      location: 'Generic Background',
      visualEvidence: '交代表、手入力欄、安全帯',
      scenario: '[1コマ目: 起]\n状況: 隊員が手入力欄を確認する。\n隊員「最新ニュースじゃなく交代表を見よう。」',
    },
  });

  assert.equal(sanitized.topic, '山岳救助隊が新しい交代手順を試す');
  assert.equal(sanitized.location, '');
  assert.doesNotMatch(`${sanitized.visualEvidence}\n${sanitized.scenario}`, /手動入力|手入力|自由入力|最新ニュース|Generic Background/);

  const providerSource = readFileSync(new URL('../src/lib/scenario-provider.js', import.meta.url), 'utf8');
  const fatalValidationBlock = providerSource.match(/fatalValidationCodes:\s*\[[\s\S]*?\],/)?.[0] || '';
  assert.doesNotMatch(fatalValidationBlock, /INPUT_MODE_LABEL_LEAK/);
});

test('the internally selected ending mode cannot be replaced by an incompatible model label', () => {
  assert.equal(typeof resolveGeneratedEnding, 'function');
  assert.deepEqual(
    resolveGeneratedEnding({ activeType: 'SeriousAuto', generatedPunchline: '感動詐欺' }),
    { type: 'SeriousAuto', label: 'シリアス内でおまかせ' },
  );
  assert.deepEqual(
    resolveGeneratedEnding({ activeType: 'SeriousAuto', generatedPunchline: '決意・再出発' }),
    { type: 'Resolve', label: '決意・再出発' },
  );
  assert.deepEqual(
    resolveGeneratedEnding({ activeType: 'FakeEmotion', generatedPunchline: '静かな余韻' }),
    { type: 'FakeEmotion', label: '感動詐欺' },
  );
});

test('STEP3 assembly keeps the resolved selector mode authoritative', () => {
  const source = readFileSync(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');
  assert.match(
    source,
    /const activePunchlineType = resolvedPunchlineTypeRef\.current \|\| resolveScenarioEndingType\(currentScenario, punchlineType\);/,
  );
});
