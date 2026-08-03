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

const buildPrompt = () => getScenarioPrompt({
  randomCategory: '地域ニュース',
  targetDate: '2026-08-04',
  inputMode: 'manual',
  manualTopic: '港で新しい旅客船の就航式が開かれた',
  newsContext: '港で式典が開催され、旅客船が出航した。',
  searchTopicKeywords: '地域ニュース',
  bg360Image: null,
  bg360Analysis: null,
  bg360Enabled: false,
  customLocation: '',
  customOutfit: '',
  locationPlan: {
    mode: 'adaptive',
    anchorName: '',
    guidance: '出来事と行動に最も適した具体的な場所を決めること。'
  },
  ragLocationDetails: '旧RAGの固定小道具',
  ragReactions: '会話相手を見る。',
  punchlineType: 'Auto',
  comedyTone: 'HighTension',
  styleJson: null
});

test('scenario prompt requires a complete dynamic background design for any generated location', () => {
  const prompt = buildPrompt();

  for (const field of [
    'BackgroundSpace:',
    'BackgroundLayers:',
    'BackgroundLighting:',
    'BackgroundAtmosphere:',
    'BackgroundAnchors:',
    'BackgroundInteractions:',
    'BackgroundAvoid:'
  ]) {
    assert.match(prompt, new RegExp(field));
  }
  assert.match(prompt, /前景.*中景.*後景/s);
  assert.match(prompt, /各コマ.*アンカー/s);
  assert.doesNotMatch(prompt, /旧RAGの固定小道具|環境設定データベース|参考候補/);
});

test('STEP2 exposes one optional free-text location input without a preset dropdown', async () => {
  const source = await readFile(new URL('../src/components/Step2Panel.jsx', import.meta.url), 'utf8');

  assert.doesNotMatch(source, /background-rag|getBackgroundPresetOptions|背景プリセット|<select[\s\S]*customLocation/);
  assert.match(source, /空欄ならAIが.*具体的な舞台/);
});

test('scenario provider no longer performs exact-name static background lookup', async () => {
  const source = await readFile(new URL('../src/lib/scenario-provider.js', import.meta.url), 'utf8');

  assert.doesNotMatch(source, /background-rag|locations\.js|getLocationDetails|ragLocationDetails|ローカルRAG/);
  assert.match(source, /dynamicBackground|動的背景/);
});
