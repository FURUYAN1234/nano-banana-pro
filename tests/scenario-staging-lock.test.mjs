import test, { after, before } from 'node:test';
import assert from 'node:assert/strict';
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

const buildPrompt = (manualTopic, inputMode = 'manual') => getScenarioPrompt({
  randomCategory: '会議',
  targetDate: '2026-07-15',
  inputMode,
  manualTopic,
  newsContext: '',
  searchTopicKeywords: '',
  bg360Image: null,
  bg360Analysis: null,
  bg360Enabled: false,
  customLocation: '',
  customOutfit: '',
  ragLocationDetails: '',
  ragReactions: '',
  punchlineType: 'すれ違い',
  comedyTone: 'standard',
  styleJson: null
});

test('all scenario modes automatically design conversational eye-lines', () => {
  for (const inputMode of ['manual', 'news']) {
    const prompt = buildPrompt('会議をする。', inputMode);
    assert.match(prompt, /自動会話演出/);
    assert.match(prompt, /話者・聞き手・リアクション役/);
    assert.match(prompt, /顔・目線・肩・胴体/);
    assert.match(prompt, /読者・画面・カメラ正面/);
    assert.match(prompt, /直接呼びかける演出/);
    assert.match(prompt, /各コマの「状況」/);
  }
});

test('manual scenario prompt locks explicit interlocutor and eye-line staging', () => {
  const prompt = buildPrompt('ユイはナオに話しかける。互いに視線を合わせ、カメラを見ない。');

  assert.match(prompt, /誰が誰に話す|話者と聞き手/);
  assert.match(prompt, /不変条件/);
  assert.match(prompt, /別のキャラクター同士へ変更|組み替え/);
  assert.match(prompt, /該当する各コマの「状況」/);
  assert.match(prompt, /顔・目線・肩・胴体/);
  assert.match(prompt, /カメラワーク.*衝突.*ユーザー/);
});

test('manual topic remains embedded verbatim beside staging lock', () => {
  const manualTopic = 'ユイ→ナオ。セリフ「確認します」';
  const prompt = buildPrompt(manualTopic);

  assert.ok(prompt.includes(manualTopic));
  assert.match(prompt, /セリフ.*原文/);
});
