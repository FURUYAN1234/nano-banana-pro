import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';

let server;
let getScenarioPrompt;

before(async () => {
  server = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true }
  });
  ({ getScenarioPrompt } = await server.ssrLoadModule('/src/lib/prompts.js'));
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
  ragLocationDetails: '小道具: 時計台、ベンチ',
  ragReactions: '会話相手を見る。',
  locationPlan: {
    mode: 'hybrid',
    anchorName: '駅前広場',
    guidance: '安全な参考候補は「駅前広場」。この候補を採用してもよいが、ニュース内容により適した別の安全な場所を新規に考案してもよい。'
  },
  punchlineType: 'Auto',
  comedyTone: 'HighTension',
  styleJson: null,
  ...overrides
});

test('scenario prompt describes a safe anchor-or-new-location hybrid instead of a forced random location', () => {
  const prompt = buildScenarioPrompt();

  assert.match(prompt, /安全な参考候補は「駅前広場」/);
  assert.match(prompt, /別の安全な場所を新規に考案してもよい/);
  assert.match(prompt, /SAFE VISUAL CONTENT LOCK/);
  assert.doesNotMatch(prompt, /指定場所: 「ニュース内容に即した場所」/);
  assert.doesNotMatch(prompt, /サイコホラー型|HORROR: ホラー演出/);
});

test('legacy PsychoHorror input is normalized to a safe surreal ending', () => {
  const prompt = buildScenarioPrompt({ punchlineType: 'PsychoHorror' });

  assert.match(prompt, /強制オチ指定: 静寂型（シュール）/);
  assert.doesNotMatch(prompt, /サイコホラー|推奨EMOTION: HORROR|HORROR: ホラー演出/);
});

test('scenario provider consumes the hybrid plan and safe retry while the UI no longer offers PsychoHorror', async () => {
  const providerSource = await readFile(new URL('../src/lib/scenario-provider.js', import.meta.url), 'utf8');
  const step2Source = await readFile(new URL('../src/components/Step2Panel.jsx', import.meta.url), 'utf8');
  const automaticOptions = providerSource.match(/const punchlineOptions = \[([\s\S]*?)\];/)?.[1] || '';

  assert.match(providerSource, /createHybridLocationPlan/);
  assert.match(providerSource, /requestSafeScenario/);
  assert.match(providerSource, /requestSafeScenarioContent/);
  assert.match(providerSource, /punchlineType === 'PsychoHorror' \? 'Surreal'/);
  assert.doesNotMatch(automaticOptions, /PsychoHorror/);
  assert.doesNotMatch(step2Source, /value="PsychoHorror"/);
});
