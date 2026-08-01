import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';

import {
  getAvailableLocationDetails,
  getBackgroundPresetOptions,
  rankBackgroundPresets
} from '../src/lib/background-rag.js';
import { getLocationDetails } from '../src/lib/knowledge.js';

let viteServer;
let buildMangaPrompt;

before(async () => {
  viteServer = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true }
  });
  ({ buildMangaPrompt } = await viteServer.ssrLoadModule('/src/lib/prompt-assembler.js'));
});

after(async () => {
  await viteServer?.close();
});

const details = {
  '雨の駅前': {
    props: ['傘立て', '濡れたタイル', '発車案内板', '改札'],
    ambient: '雨音と到着アナウンス',
    visual: '濡れた路面に灯りが反射する',
    tags: ['駅', '雨', '通勤', '日常'],
    anchors: ['発車案内板', '濡れたタイル'],
    moods: ['コメディ', '緊張']
  },
  '静かな図書館': {
    props: ['書架', '閲覧机', '返却台', 'しおり'],
    ambient: 'ページをめくる静かな音',
    visual: '柔らかな窓光と整然とした書架',
    tags: ['読書', '静か', '屋内'],
    anchors: ['書架', '閲覧机'],
    moods: ['穏やか']
  }
};

test('ranks a safe preset from topic keywords and returns persistent visual anchors', () => {
  const [winner] = rankBackgroundPresets({
    locationDetails: details,
    topicText: '雨の日に駅で傘を忘れた通勤コメディ',
    moodText: 'コメディ'
  });

  assert.equal(winner.name, '雨の駅前');
  assert.deepEqual(winner.anchors, ['発車案内板', '濡れたタイル']);
  assert.ok(winner.score > 0);
});

test('exposes curated presets for direct UI selection without exposing unsafe entries', () => {
  const options = getBackgroundPresetOptions({ locationDetails: details });

  assert.deepEqual(options.map((option) => option.name), ['雨の駅前', '静かな図書館']);
  assert.equal(options[0].label, '雨の駅前 — 駅 / 雨 / 通勤 / 日常');
});

test('extends the legacy dictionary with at least 24 practical, tagged background presets', () => {
  const catalogue = getAvailableLocationDetails({ '既存背景': details['静かな図書館'] });
  const curated = getBackgroundPresetOptions({ locationDetails: catalogue });

  assert.equal(Object.keys(catalogue).length >= 25, true);
  assert.equal(curated.length >= 24, true);
  assert.ok(curated.some(({ name }) => name === '雨の駅前'));
  assert.ok(curated.some(({ name }) => name === '会議室'));
  assert.ok(curated.some(({ name }) => name === '夏祭りの準備会場'));
});

test('resolves a selected practical preset into its own RAG details instead of generic fallback text', () => {
  const catalogue = getAvailableLocationDetails({});
  const ragDetails = getLocationDetails('雨の駅前', catalogue);

  assert.match(ragDetails, /発車案内板/);
  assert.match(ragDetails, /濡れたタイル/);
});

test('STEP2 offers the curated background presets without removing free-text location input', async () => {
  const source = await readFile(new URL('../src/components/Step2Panel.jsx', import.meta.url), 'utf8');

  assert.match(source, /getBackgroundPresetOptions/);
  assert.match(source, /背景プリセット/);
  assert.match(source, /<select/);
  assert.match(source, /type="text"/);
});

test('keeps selected preset anchors in every provider final image prompt', () => {
  const scenario = `
## タイトル: 雨の駅前コメディ
Location: 雨の駅前
Outfit: 通勤服

[1コマ目: 起]
状況: アカリが濡れた駅前で傘を忘れたことに気づく。
アカリ「傘がない！」

[2コマ目: 承]
状況: ヒカリが傘を差し出すが風で裏返る。
ヒカリ「一緒に入ろう！」

[3コマ目: 転]
状況: 二人で走り出し、改札前で水たまりを踏む。
アカリ「急ごう！」

[4コマ目: 結]
状況: 二人ともずぶ濡れで笑い合う。
ヒカリ「結局同じだね！」
`;
  const castList = `## アカリ\n- orange bob hair\n## ヒカリ\n- short blonde hair, glasses`;

  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildMangaPrompt({
      scenario,
      castList,
      colorMode: 'color',
      providerFamily,
      punchlineType: 'Auto',
      systemVersion: 'test'
    });

    assert.match(prompt, /BACKGROUND CONTINUITY LOCK/);
    assert.match(prompt, /雨の駅前/);
    assert.match(prompt, /発車案内板/);
    assert.match(prompt, /濡れたタイル/);
    assert.match(prompt, /In EVERY panel/i);
  }
});
