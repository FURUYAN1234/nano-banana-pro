import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';

import {
  buildDynamicBackgroundLock,
  formatDynamicBackground,
  parseDynamicBackground,
  validateDynamicBackground
} from '../src/lib/dynamic-background.js';

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

test('parses and formats a complete per-story dynamic background design', () => {
  const source = `BackgroundSpace: 屋外の駅前広場。改札口とロータリーを歩いて移動できる。
BackgroundLayers: 前景: 濡れた点字ブロック / 中景: 発車案内板と改札 / 後景: 駅舎と雨雲
BackgroundLighting: 夕方の雨上がり。左側の駅舎灯が暖色の主光源。
BackgroundAtmosphere: 雨だれ、到着アナウンス、通勤客の足音。
BackgroundAnchors: 発車案内板、濡れた点字ブロック
BackgroundInteractions: 改札、傘立て、ベンチ
BackgroundAvoid: 晴天や昼への変化、別の駅、人体内部、無関係な室内。`;
  const design = parseDynamicBackground(source);

  assert.deepEqual(design.anchors, ['発車案内板', '濡れた点字ブロック']);
  assert.deepEqual(design.interactions, ['改札', '傘立て', 'ベンチ']);
  assert.equal(formatDynamicBackground(design), source);
});

test('STEP2 keeps only the optional free-text location input', async () => {
  const source = await readFile(new URL('../src/components/Step2Panel.jsx', import.meta.url), 'utf8');

  assert.doesNotMatch(source, /getBackgroundPresetOptions|背景プリセット/);
  assert.match(source, /type="text"/);
  assert.match(source, /空間構造・前景／中景／後景/);
});

test('keeps generated dynamic background anchors in every provider final image prompt', () => {
  const scenario = `
## タイトル: 雨の駅前コメディ
Location: 雨の駅前
BackgroundSpace: 屋外の駅前広場。改札口とロータリーを歩いて移動できる。
BackgroundLayers: 前景: 濡れた点字ブロック / 中景: 発車案内板と改札 / 後景: 駅舎と雨雲
BackgroundLighting: 夕方の雨上がり。左側の駅舎灯が暖色の主光源。
BackgroundAtmosphere: 雨だれ、到着アナウンス、通勤客の足音。
BackgroundAnchors: 発車案内板、濡れた点字ブロック
BackgroundInteractions: 改札、傘立て、ベンチ
BackgroundAvoid: 晴天や昼への変化、別の駅、人体内部、無関係な室内。
Outfit: 通勤服

[1コマ目: 起]
状況: 発車案内板の下で、アカリが濡れた点字ブロックを見て傘を忘れたことに気づく。
アカリ「傘がない！」

[2コマ目: 承]
状況: 発車案内板の下で、ヒカリが傘を差し出すが風で裏返る。
ヒカリ「一緒に入ろう！」

[3コマ目: 転]
状況: 二人で濡れた点字ブロック沿いを走り、改札前で水たまりを踏む。
アカリ「急ごう！」

[4コマ目: 結]
状況: 発車案内板と濡れた点字ブロックの前で、二人ともずぶ濡れで笑い合う。
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

    assert.match(prompt, /DYNAMIC BACKGROUND CONTINUITY LOCK/);
    assert.match(prompt, /雨の駅前/);
    assert.match(prompt, /発車案内板/);
    assert.match(prompt, /濡れた点字ブロック/);
    assert.match(prompt, /In EVERY panel/i);
  }
});

test('rejects incomplete, unsafe, or non-recurring dynamic backgrounds', () => {
  const scenario = `[1コマ目: 起]\n状況: 発車案内板。\n[2コマ目: 承]\n状況: 発車案内板。\n[3コマ目: 転]\n状況: 別の部屋。\n[4コマ目: 結]\n状況: 別の部屋。`;
  const validation = validateDynamicBackground({
    location: '巨大な胃袋の中',
    backgroundDesign: {
      space: '狭い空間',
      layers: '背景だけ',
      lighting: '',
      atmosphere: '生体音',
      anchors: ['発車案内板'],
      interactions: ['床'],
      avoid: ''
    },
    scenario
  });

  assert.equal(validation.ok, false);
  assert.ok(validation.issueCodes.includes('background_layers_incomplete'));
  assert.ok(validation.issueCodes.includes('background_anchor_count'));
  assert.ok(validation.issueCodes.includes('background_anchor_panel_coverage'));
  assert.ok(validation.issueCodes.includes('background_unsafe'));
  assert.equal(buildDynamicBackgroundLock('Location: 雨の駅前'), '');
});

test('rejects a panel that drops all anchors or changes the declared time and weather', () => {
  const scenario = `[1コマ目: 起]\n状況: 花輪アーチと乗船ゲートの前に全員が並ぶ。\n[2コマ目: 承]\n状況: 紙テープだけが舞い、背景の固定物は見えない。\n[3コマ目: 転]\n状況: 花輪アーチへ紙テープが絡む。\n[4コマ目: 結]\n状況: 夕日を浴びた巨大旅客船が雨の中で出航する。`;
  const validation = validateDynamicBackground({
    location: '港の乗船ゲート前',
    backgroundDesign: {
      space: '屋外の岸壁と乗船ゲートを歩いて移動できる。',
      layers: '前景: 紙テープ / 中景: 花輪アーチと乗船ゲート / 後景: 巨大旅客船',
    lighting: '午後、快晴、右上の太陽が主光源。',
      atmosphere: '汽笛、潮風、見学客の拍手。',
      anchors: ['花輪アーチ', '乗船ゲート', '巨大旅客船'],
      interactions: ['紙テープ', '手すり'],
      avoid: '夕方や夜、雨天、別の港への変化。'
    },
    scenario
  });

  assert.equal(validation.ok, false);
  assert.ok(validation.issueCodes.includes('background_anchor_every_panel'));
  assert.ok(validation.issueCodes.includes('background_time_conflict'));
  assert.ok(validation.issueCodes.includes('background_weather_conflict'));
});

test('carries dynamic story evidence from the scenario into every provider image prompt', () => {
  const scenario = `
## タイトル: 新しい施設の開業
Location: 港の桟橋
VisualEvidence: 式典看板、乗船ゲート、港湾職員
Outfit: カジュアルな私服
[1コマ目: 起]
状況: 式典看板の前で話す。
人物A「始まるよ！」
[2コマ目: 承]
状況: 乗船ゲートで港湾職員が案内する。
人物B「こっちだよ！」
[3コマ目: 転]
状況: 桟橋で驚く。
人物A「大きい！」
[4コマ目: 結]
状況: 全員で笑う。
人物B「出航だ！」`;
  const castList = `## 人物A\n- orange bob hair\n## 人物B\n- black long hair`;

  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildMangaPrompt({
      scenario,
      castList,
      colorMode: 'color',
      providerFamily,
      punchlineType: 'Auto',
      systemVersion: 'test'
    });

    assert.match(prompt, /VISUAL STORY EVIDENCE LOCK/);
    assert.match(prompt, /式典看板/);
    assert.match(prompt, /乗船ゲート/);
    assert.match(prompt, /港湾職員/);
    assert.match(prompt, /at least two panels/i);
  }
});

test('places visual story evidence immediately after the script lock and before style guidance', () => {
  const scenario = `
## タイトル: 開業式
Location: 港の桟橋
VisualEvidence: 式典看板、乗船ゲート、港湾職員
Outfit: カジュアルな私服
[1コマ目: 起]
状況: 式典看板の前で話す。
人物A「始まるよ！」
[2コマ目: 承]
状況: 乗船ゲートで港湾職員が案内する。
人物B「こっちだよ！」
[3コマ目: 転]
状況: 桟橋で驚く。
人物A「大きい！」
[4コマ目: 結]
状況: 全員で笑う。
人物B「出航だ！」`;
  const castList = `## 人物A\n- orange bob hair\n## 人物B\n- black long hair`;

  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildMangaPrompt({
      scenario,
      castList,
      colorMode: 'color',
      providerFamily,
      punchlineType: 'Auto',
      systemVersion: 'test'
    });
    const evidenceIndex = prompt.indexOf('VISUAL STORY EVIDENCE LOCK');
    const scriptIndex = prompt.indexOf('STRICT SCRIPT LOCK');
    const styleIndex = providerFamily === 'chatgpt'
      ? prompt.indexOf('ART / RENDERING QUALITY')
      : prompt.indexOf('Style:');

    assert.ok(evidenceIndex > scriptIndex, `${providerFamily}: evidence must follow script lock`);
    assert.ok(evidenceIndex < styleIndex, `${providerFamily}: evidence must precede style guidance`);
    assert.doesNotMatch(prompt, /\n{3,}VISUAL STORY EVIDENCE LOCK/);
  }
});
