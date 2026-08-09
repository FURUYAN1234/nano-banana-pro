import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';
import {
  assertSeasonalOutfit,
  buildSeasonalOutfitInstruction,
  getSeasonContext
} from '../src/lib/seasonal-outfit.js';

test('maps Japanese calendar boundary months without timezone drift', () => {
  assert.equal(getSeasonContext({ targetDate: '2026-03-01', inputMode: 'news' }).label, '春');
  assert.equal(getSeasonContext({ targetDate: '2026-06-01', inputMode: 'news' }).label, '夏');
  assert.equal(getSeasonContext({ targetDate: '2026-09-01', inputMode: 'news' }).label, '秋');
  assert.equal(getSeasonContext({ targetDate: '2026-12-01', inputMode: 'news' }).label, '冬');
  assert.equal(getSeasonContext({ targetDate: '2026-02-28', inputMode: 'news' }).label, '冬');
});

test('returns no date season for invalid dates or manual mode', () => {
  assert.equal(getSeasonContext({ targetDate: '', inputMode: 'news' }), null);
  assert.equal(getSeasonContext({ targetDate: '2026-02-30', inputMode: 'news' }), null);
  assert.equal(getSeasonContext({ targetDate: '2026-08-09', inputMode: 'manual' }), null);
});

test('builds date-season guidance for news and explicit cue guidance for manual input', () => {
  const summer = getSeasonContext({ targetDate: '2026-08-09', inputMode: 'news' });
  assert.match(buildSeasonalOutfitInstruction({ seasonContext: summer, inputMode: 'news' }), /対象日付 2026-08-09/);
  assert.match(buildSeasonalOutfitInstruction({ seasonContext: summer, inputMode: 'news' }), /夏/);
  assert.match(buildSeasonalOutfitInstruction({ inputMode: 'manual', manualTopic: '駅前の夏祭り' }), /夏祭り/);
  assert.match(buildSeasonalOutfitInstruction({ customOutfit: '全員ダウンジャケット' }), /最優先/);
});

test('rejects obvious summer winterwear and winter summerwear with concrete reasons', () => {
  const summer = getSeasonContext({ targetDate: '2026-08-09', inputMode: 'news' });
  const winter = getSeasonContext({ targetDate: '2026-12-09', inputMode: 'news' });
  assert.throws(
    () => assertSeasonalOutfit({ outfit: '厚手のダウンジャケットとマフラー', seasonContext: summer, contextText: '屋外の夏祭り' }),
    /夏（8月）なのに防寒着/
  );
  assert.throws(
    () => assertSeasonalOutfit({ outfit: '薄手の半袖と水着', seasonContext: winter, contextText: '冬の屋外会場' }),
    /冬（12月）なのに夏向けの薄着/
  );
});

test('allows environmental exceptions and explicit outfit overrides', () => {
  const summer = getSeasonContext({ targetDate: '2026-08-09', inputMode: 'news' });
  const winter = getSeasonContext({ targetDate: '2026-12-09', inputMode: 'news' });
  assert.equal(assertSeasonalOutfit({ outfit: '防寒着', seasonContext: summer, contextText: '屋内スケート場' }), true);
  assert.equal(assertSeasonalOutfit({ outfit: '薄手の半袖', seasonContext: winter, contextText: '暖房の効いた屋内会場' }), true);
  assert.equal(assertSeasonalOutfit({ outfit: 'ダウンジャケット', seasonContext: summer, contextText: '夏祭り', customOutfit: 'ダウンジャケット' }), true);
});

test('rejects empty and ambiguous automatic outfit values', () => {
  assert.throws(() => assertSeasonalOutfit({ outfit: '' }), /Outfitが空/);
  assert.throws(() => assertSeasonalOutfit({ outfit: 'キャラシート準拠' }), /具体的な衣装カテゴリー/);
});

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

after(async () => server?.close());

const promptArgs = {
  randomCategory: '地域ニュース',
  targetDate: '2026-08-09',
  inputMode: 'news',
  manualTopic: '',
  newsContext: '',
  searchTopicKeywords: '地域ニュース',
  bg360Image: null,
  bg360Analysis: null,
  bg360Enabled: false,
  customLocation: '',
  customOutfit: '',
  locationPlan: {
    mode: 'adaptive',
    anchorName: '',
    guidance: '内容に適した場所を選ぶこと。'
  },
  ragReactions: '',
  punchlineType: 'Auto',
  comedyTone: 'HighTension',
  styleJson: null
};

test('news prompt uses the target-date season with contextual exceptions', () => {
  const prompt = getScenarioPrompt(promptArgs);
  assert.match(prompt, /対象日付 2026-08-09/);
  assert.match(prompt, /季節目安は「夏」/);
  assert.match(prompt, /イベント固有衣装、職業・安全装備、場所、実際の天候、屋内環境/);
});

test('manual prompt ignores target-date season and protects explicit seasonal event cues', () => {
  const prompt = getScenarioPrompt({
    ...promptArgs,
    inputMode: 'manual',
    manualTopic: '駅前の夏祭り'
  });
  assert.match(prompt, /手動トピック「駅前の夏祭り」/);
  assert.match(prompt, /対象日付から季節を推測してはならない/);
  assert.doesNotMatch(prompt, /季節目安は「夏」/);
});

test('custom outfit remains above automatic season selection', () => {
  const prompt = getScenarioPrompt({ ...promptArgs, customOutfit: '全員ダウンジャケット' });
  assert.match(prompt, /ユーザー指定衣装「全員ダウンジャケット」を最優先/);
});

test('scenario provider validates and retries seasonal outfit failures with the concrete reason', async () => {
  const source = await readFile(new URL('../src/lib/scenario-provider.js', import.meta.url), 'utf8');
  assert.match(source, /SEASONAL_OUTFIT/);
  assert.match(source, /assertSeasonalOutfit/);
  assert.match(source, /SEASONAL_OUTFIT_RETRY_INSTRUCTION/);
  assert.match(source, /message/);
});

test('STEP2 shows a read-only news season hint without adding a season control', async () => {
  const source = await readFile(new URL('../src/components/Step2Panel.jsx', import.meta.url), 'utf8');
  assert.match(source, /getSeasonContext/);
  assert.match(source, /季節目安:/);
  assert.match(source, /対象日付から自動/);
  assert.doesNotMatch(source, /setSeason|name=["']season["']|<select[^>]*season/i);
});
