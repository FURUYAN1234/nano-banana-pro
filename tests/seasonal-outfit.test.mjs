import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';
import {
  assertSeasonalOutfit,
  buildSeasonalOutfitInstruction,
  getSeasonContext,
  stripReferenceWardrobe,
  buildScenarioCastContext
} from '../src/lib/seasonal-outfit.js';

const referenceCast = `## 1. テスト人物
| **髪(Hair)** | 黒髪 | [WEIGHTS]: (black hair:1.4) |
| **服装(Outfit)** | ブレザー制服と書類 | [WEIGHTS]: (school uniform:1.3) |
| **性格(Mind)** | 冷静。幼馴染を気遣う。 | [WEIGHTS]: (calm:1.2) |`;

test('scenario cast retains identity and relationships but excludes reference wardrobe', () => {
  const result = stripReferenceWardrobe(referenceCast);
  for (const text of ['テスト人物', '黒髪', '冷静。幼馴染を気遣う。']) assert.ok(result.includes(text));
  assert.doesNotMatch(result, /school uniform|ブレザー|書類/);
  assert.match(referenceCast, /school uniform/, 'the saved character analysis is not mutated');
  assert.match(buildScenarioCastContext(referenceCast), /CHARACTER IDENTITY, NOT STORY SETTING/);
});

test('wardrobe removal handles multiline sections and labelled fallback without eating adjacent traits', () => {
  for (const source of [
    '## A\n### 服装 (Outfit)\nブレザー制服\n[WEIGHTS]: (school uniform:1.3)\n### 性格\n友人思い\n## B\n髪: 茶髪',
    'Character [A]: 黒髪\n**服装**: 制服\n[WEIGHTS]: (school uniform:1.3)\n性格: 友人思い\nCharacter [B]: 茶髪'
  ]) {
    const result = stripReferenceWardrobe(source);
    assert.doesNotMatch(result, /school uniform|制服/);
    assert.match(result, /友人思い/);
    assert.match(result, /茶髪/);
  }
  assert.equal(stripReferenceWardrobe('性格: 衣装作りが好き。友人は制服店で働く。'), '性格: 衣装作りが好き。友人は制服店で働く。');
});

test('school attire needs source context, not a school-role excuse invented in the scenario', () => {
  assert.throws(() => assertSeasonalOutfit({
    outfit: 'ブレザー・リボン付きブラウスの学生ボランティア姿',
    contextText: '高校生が地域会館でボランティアをする',
    wardrobeSourceText: '地域会館の長寿祝い受付'
  }), /学校制服/);
  for (const outfit of ['私服（casual wear）', '受付スタッフのビジネススーツ', '病院の看護師用ユニフォーム', '警察官の制服姿']) {
    assert.equal(assertSeasonalOutfit({ outfit, wardrobeSourceText: '地域の催し' }), true);
  }
  assert.equal(assertSeasonalOutfit({ outfit: '学校制服', wardrobeSourceText: '高校の卒業式' }), true);
  assert.equal(assertSeasonalOutfit({ outfit: '学校制服', customOutfit: '学校制服', wardrobeSourceText: '休日の買い物' }), true);
});

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
let generateScenario;
let enhanceScenarioText;
let setFixtureResponse;
let cleanCastList;

before(async () => {
  server = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    plugins: [{
      name: 'wardrobe-fixture-api',
      enforce: 'pre',
      resolveId(id, importer) {
        if (id === 'virtual:wardrobe-fixture-api' || (id === './ai-provider' && importer?.endsWith('/scenario-provider.js'))) return '\0wardrobe-fixture-api';
      },
      load(id) {
        if (id === '\0wardrobe-fixture-api') return 'let respond; export const setFixtureResponse = fn => { respond = fn; }; export const callAI = (...args) => respond(...args);';
      }
    }],
    server: { middlewareMode: true }
  });
  ({ getScenarioPrompt } = await server.ssrLoadModule('/src/lib/prompts.js'));
  ({ generateScenario, enhanceScenarioText } = await server.ssrLoadModule('/src/lib/scenario-provider.js'));
  ({ setFixtureResponse } = await server.ssrLoadModule('virtual:wardrobe-fixture-api'));
  ({ cleanCastList } = await server.ssrLoadModule('/src/lib/panel-utils.js'));
});

after(async () => server?.close());

test('image cast projection retains tagged identity across table and subsection formats', () => {
  for (const cast of [referenceCast, '## A\n### 髪\n[WEIGHTS]: (black hair:1.4)\n### 服装\n[WEIGHTS]: (school uniform:1.3)\n### 性格\n[WEIGHTS]: (calm:1.2)']) {
    const result = cleanCastList(cast, '私服');
    assert.match(result, /black hair/);
    assert.match(result, /calm/);
    assert.doesNotMatch(result, /school uniform/);
  }
  assert.match(cleanCastList(referenceCast, ''), /school uniform/, 'an intentionally absent override retains the original wardrobe');
});

// Synthetic transport fixture only: this exercises the real orchestration,
// parser, validation/retry and enhancement paths without a paid model call.
const fixtureBody = `[1コマ目: 起]
状況: テスト人物が会館で受付机に案内板を置く。
テスト人物「準備できた」
[2コマ目: 承]
状況: テスト人物が受付机の筆記具を手に取る。
テスト人物「書こう」
[3コマ目: 転]
状況: テスト人物が案内板を振り返る。
テスト人物「逆だ」
[4コマ目: 結]
状況: テスト人物が案内板を回して入口を指す。
テスト人物「こちらです」`;

test('actual scenario and enhancement call paths exclude sheet wardrobe and retry ungrounded uniforms', async () => {
  const calls = [];
  setFixtureResponse(async (prompt, images, system, progress, options) => {
    calls.push({ prompt, images, system, options });
    return { text: `Topic: 会館の受付\nLocation: 地域会館\nVisualEvidence: 受付机、案内板、筆記具\nOutfit: ${calls.length === 1 ? '学生ボランティアの学校制服' : '動きやすい私服'}\nScenario:\n${fixtureBody}`, model: 'test-fixture' };
  });
  const result = await generateScenario({
    castList: referenceCast, categories: [], inputMode: 'manual', manualTopic: '地域会館の受付',
    targetDate: '2026-09-15', customLocation: '', customOutfit: '', punchlineType: 'Surreal',
    onProgress: () => {}
  });
  assert.equal(calls.length, 2);
  assert.equal(result.outfit, '動きやすい私服');
  assert.equal(result.validationWarning, null);
  assert.match(calls[1].prompt, /学校制服の根拠/);
  const original = `Outfit: 動きやすい私服\n${fixtureBody}`;
  setFixtureResponse(async (prompt, images, system, progress, options) => {
    calls.push({ prompt, images, system, options });
    return { text: original, model: 'test-fixture' };
  });
  await enhanceScenarioText({ scenario: original, selectedCategories: ['background'], punchlineType: 'Surreal', castList: referenceCast, onProgress: () => {} });
  assert.ok(calls.length >= 3, 'enhancement must also cross the provider boundary');
  for (const call of calls) {
    assert.doesNotMatch(call.system, /school uniform|ブレザー制服/);
    assert.match(call.system, /冷静。幼馴染を気遣う。/);
    assert.match(call.system, /CHARACTER IDENTITY, NOT STORY SETTING/);
    assert.equal(call.options.modelRoute, 'scenario');
  }
});

test('JSON scenario response preserves wardrobe metadata instead of dropping the override', async () => {
  setFixtureResponse(async () => ({ text: JSON.stringify({
    topic: '受付', location: '会館', visualEvidence: '受付机、案内板、筆記具',
    outfit: '受付用スーツ', logline: '案内の向きを直す', punchline: '静寂型', scenario: fixtureBody
  }), model: 'test-fixture' }));
  const result = await generateScenario({
    castList: referenceCast, categories: [], inputMode: 'manual', manualTopic: '会館の受付',
    targetDate: '2026-09-15', customLocation: '', customOutfit: '', punchlineType: 'Surreal', onProgress: () => {}
  });
  assert.equal(result.outfit, '受付用スーツ');
  assert.equal(result.logline, '案内の向きを直す');
  assert.equal(result.punchline, '静寂型');
  assert.equal(result.validationWarning, null);
});

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
