import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';

let server;
let getScenarioPrompt;
let createDynamicLocationPlan;

before(async () => {
  server = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true }
  });
  ({ getScenarioPrompt } = await server.ssrLoadModule('/src/lib/prompts.js'));
  ({ createDynamicLocationPlan } = await server.ssrLoadModule('/src/lib/location-policy.js'));
});

after(async () => {
  await server?.close();
});

const buildScenarioPrompt = (overrides = {}) => getScenarioPrompt({
  randomCategory: '地域ニュース',
  targetDate: '2026-07-20',
  inputMode: 'manual',
  manualTopic: '駅前で新しい夏祭りが始まる',
  newsContext: '地域の商店が参加する。',
  searchTopicKeywords: '地域ニュース',
  bg360Image: null,
  bg360Analysis: null,
  bg360Enabled: false,
  customLocation: '',
  customOutfit: '',
  ragReactions: '会話相手を見る。',
  locationPlan: {
    mode: 'custom',
    anchorName: '駅前広場',
    guidance: '指定場所「駅前広場」を使用すること。'
  },
  punchlineType: 'Auto',
  comedyTone: 'HighTension',
  styleJson: null,
  ...overrides
});

test('scenario prompt locks an explicit location while designing its details dynamically', () => {
  const prompt = buildScenarioPrompt();

  assert.match(prompt, /今回の漫画の舞台は「駅前広場」/);
  assert.match(prompt, /動的背景設計/);
  assert.match(prompt, /SAFE VISUAL CONTENT LOCK/);
  assert.doesNotMatch(prompt, /指定場所: 「ニュース内容に即した場所」/);
  assert.doesNotMatch(prompt, /サイコホラー型|HORROR: ホラー演出/);
});

test('automatic location planning leaves the setting open for the scenario instead of preselecting a generic preset', () => {
  const plan = createDynamicLocationPlan();

  assert.equal(plan.mode, 'adaptive');
  assert.equal(plan.anchorName, '');
  assert.deepEqual(plan.anchors, []);
  assert.doesNotMatch(plan.guidance, /コインランドリー|大型乾燥機|折りたたみ台/);
  assert.match(plan.guidance, /ニュース本文|シナリオ/);
});

test('adaptive location prompt requires a concrete story-fit setting without leaking a preset anchor', () => {
  const prompt = buildScenarioPrompt({
    manualTopic: '港で新しい旅客船の就航式が開かれた',
    newsContext: '旅客船の就航式と港の利用者についての記事本文',
    locationPlan: {
      mode: 'adaptive',
      anchorName: '',
      anchors: [],
      guidance: 'ニュース本文と4コマの行動を先に読み、出来事が自然に起きる具体的な舞台を選ぶこと。'
    },
  });

  assert.match(prompt, /ニュース本文と4コマの行動/);
  assert.match(prompt, /最も適した具体的な舞台/);
  assert.doesNotMatch(prompt, /強制舞台指定/);
  assert.doesNotMatch(prompt, /コインランドリー|大型乾燥機|折りたたみ台/);
  assert.match(prompt, /VisualEvidence:/);
  assert.match(prompt, /3.{0,12}5個/);
  assert.match(prompt, /最低2コマ/);
});

test('legacy PsychoHorror input is normalized to a safe surreal ending', () => {
  const prompt = buildScenarioPrompt({ punchlineType: 'PsychoHorror' });

  assert.match(prompt, /強制オチ指定: 静寂型（シュール）/);
  assert.doesNotMatch(prompt, /サイコホラー|推奨EMOTION: HORROR|HORROR: ホラー演出/);
});

test('scenario provider consumes dynamic background validation and safe retry while the UI no longer offers PsychoHorror', async () => {
  const providerSource = await readFile(new URL('../src/lib/scenario-provider.js', import.meta.url), 'utf8');
  const step2Source = await readFile(new URL('../src/components/Step2Panel.jsx', import.meta.url), 'utf8');
  const automaticOptions = providerSource.match(/const punchlineOptions = \[([\s\S]*?)\];/)?.[1] || '';

  assert.match(providerSource, /createDynamicLocationPlan/);
  assert.match(providerSource, /assertDynamicBackground/);
  assert.match(providerSource, /DYNAMIC_BACKGROUND_RETRY_INSTRUCTION/);
  assert.match(providerSource, /requestSafeScenario/);
  assert.match(providerSource, /requestSafeScenarioContent/);
  assert.match(providerSource, /assertVisualStoryEvidence/);
  assert.match(providerSource, /VISUAL_STORY_EVIDENCE_RETRY_INSTRUCTION/);
  assert.match(providerSource, /punchlineType === 'PsychoHorror' \? 'Surreal'/);
  assert.doesNotMatch(automaticOptions, /PsychoHorror/);
  assert.doesNotMatch(step2Source, /value="PsychoHorror"/);
});
