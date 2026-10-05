import assert from 'node:assert/strict';
import test, { before, after } from 'node:test';
import { createServer } from 'vite';

let server, history, getScenarioPrompt, EMOTION_STYLES;
before(async () => {
  server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });
  history = await server.ssrLoadModule('/src/lib/generation-history.js');
  ({ getScenarioPrompt } = await server.ssrLoadModule('/src/lib/prompts.js'));
  ({ EMOTION_STYLES } = await server.ssrLoadModule('/src/lib/constants.js'));
});
after(async () => server?.close());

const scenario = (ending, action) => `Logline: 店の仲間が展示を準備する。\nPunchline: ${ending}\n[1コマ目: 起]\n状況: 荷物を開ける。\n[4コマ目: 結]\n[EMOTION: NORMAL]\n[Camera: 俯瞰]\nBalloonLayout: []\n状況: ${action}\nA「届いたよ。」`;
const options = { randomCategory: '手動', targetDate: '2026-10-05', inputMode: 'manual', manualTopic: '展示の準備', newsContext: '', searchTopicKeywords: '', customLocation: '', customOutfit: '', comedyTone: 'Auto' };

test('recent outcomes are bounded, deduplicated story data, without image or camera payloads', () => {
  const first = scenario('天丼', '同じ箱の中からさらに箱が出る。');
  const result = history.collectRecentScenarioOutcomes([first, first, ...Array.from({ length: 9 }, (_, i) => scenario('勘違い', `看板${i}を掛け替える。`))]);
  assert.equal(result.length, 6);
  assert.equal(result[0].ending, '天丼');
  assert.match(result[0].outcome, /さらに箱/);
  assert.doesNotMatch(JSON.stringify(result), /Camera|EMOTION|BalloonLayout/);
  assert.deepEqual(history.collectRecentScenarioOutcomes([null, '', 'no panels']), []);
  for (const header of ['[４コマ目: 結]', '[ 四 こま目: 結 ]', '[ 4 コマ目: 結]']) {
    assert.deepEqual(history.collectRecentScenarioOutcomes([first.replace('[4コマ目: 結]', header)]), [result[0]]);
  }
});

test('ending selection receives prior mechanisms without banning an ending or fixed rotations', () => {
  const recentScenarios = history.collectRecentScenarioOutcomes([scenario('夢オチ', '同じ寝床で目覚め、出来事が消える。')]);
  for (const punchlineType of ['Auto', 'GagAuto', 'SeriousAuto', 'Dream']) {
    const prompt = getScenarioPrompt({ ...options, punchlineType, recentScenarios });
    assert.match(prompt, /RECENT STORY OUTCOMES/);
    assert.match(prompt, /同じ寝床/);
    assert.match(prompt, /同じ型だけで不合格にしない/);
    assert.match(prompt, /明示された結末/);
    assert.match(prompt, /大前提.*必然性.*オチとして成立/);
    assert.match(prompt, /多様性は成立する候補同士/);
    if (punchlineType === 'Dream') assert.match(prompt, /強制オチ指定: 夢オチ/);
  }
});

test('scene-based style palette is complete, without ending preferences or tag quotas', () => {
  for (const punchlineType of ['GagAuto', 'SeriousAuto', 'Dream', 'Explosion', 'Surreal']) {
    const prompt = getScenarioPrompt({ ...options, punchlineType, comedyTone: punchlineType === 'Explosion' ? 'HighTension' : 'Auto' });
    for (const style of Object.keys(EMOTION_STYLES)) {
      if (punchlineType === 'SeriousAuto' && style === 'CHIBI_GAG') continue;
      assert.ok(prompt.includes(style), `${punchlineType}: missing ${style}`);
    }
    if (punchlineType === 'SeriousAuto') assert.doesNotMatch(prompt, /CHIBI_GAG/);
    assert.match(prompt, /絵柄に優劣や好き嫌い/);
    assert.doesNotMatch(prompt, /推奨EMOTION|推奨される感情絵柄タグ|NORMAL以外のタグを優先|少なくとも2種類以上のタグ|EMOTION: SAD/);
    assert.doesNotMatch(prompt, /他キャラにも均等にオチ/);
  }
  const documentary = getScenarioPrompt({ ...options, punchlineType: 'SeriousDocumentary' });
  assert.match(documentary, /EMOTION.*必ずNORMAL|必ずNORMAL/);
});
