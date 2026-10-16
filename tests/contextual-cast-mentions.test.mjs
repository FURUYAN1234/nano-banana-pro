import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { extractCastLimitRule, extractDialogueOnly, extractActionOnly, buildPanelEyeLineRule } from '../src/lib/panel-utils.js';

const cast = '## 甲\n## 乙\n## 丙';
const camera = '[Camera: 右上から甲と乙を俯瞰で捉える。]';
const historical = '丙が組んだ模型は机の上に置かれている。';
const scene = (description = historical, extra = '') => `${camera}\n状況: ${description}画面内は二人。甲は右、乙は左で向かい合って会話する。${extra}\n甲「きれいだね。」`;
const names = rule => [...(rule.match(/(?:CAST COUNT:|ANTI-CLONE REMINDER:)[^\n]*/)?.[0] || '').matchAll(/\[([^\]]+)\]/g)].map(match => match[1]).sort();

test('a past object modifier cannot add a body beyond the explicit current shot', () => {
  for (const description of [historical, '丙が運んだ荷物が床にある。', '丙が掲げた一個は塔の上に置かれ、']) {
    const source = scene(description);
    for (const compact of [false, true]) assert.deepEqual(names(extractCastLimitRule(source, cast, { compact })), ['乙', '甲']);
    assert.match(extractCastLimitRule(source, cast, { compact: true }), /NO OTHER HUMANS: exactly 2 people/);
    assert.match(extractCastLimitRule(source, cast, { compact: true }), /do NOT draw \[丙\]/);
    assert.ok(extractActionOnly(source, cast).includes(description), 'story history remains in authored Action');
    assert.deepEqual(extractDialogueOnly(source, cast, { asEntries: true }).map(entry => entry.text), ['きれいだね。']);
    assert.doesNotMatch(buildPanelEyeLineRule(source, cast), /\[丙\]/, 'context-only actor is not manufactured as a current listener');
  }
});

test('the rule follows cast aliases, different objects and numeric current-body counts', () => {
  const source = '[Camera: ユウとナギを斜め上から見下ろす。]\n状況: ユキが描いた設計図は壁にある。画面内は２人。ユウとナギが会話する。\nユウ「見よう。」';
  assert.deepEqual(names(extractCastLimitRule(source, '## ユウ (Yuu)\n## ナギ (Nagi)\n## ユキ (Yuki)', { compact: true })), ['ナギ', 'ユウ']);
  const romanized = source.replace('ユキが', 'Yukiが');
  assert.deepEqual(names(extractCastLimitRule(romanized, '## ユウ (Yuu)\n## ナギ (Nagi)\n## ユキ (Yuki)', { compact: true })), ['ナギ', 'ユウ']);
});

test('current direct or implicitly continuing actors, visible parts and speakers remain present', () => {
  const permitted = [
    scene('丙が笑った。'),
    scene('丙が置いた箱を持ち上げている。'),
    scene('丙が支えていた模型を今も押さえている。'),
    scene('丙が乗っていた車は脇に止められている。'),
    scene('丙が座った椅子はきしんでいる。'),
    scene(historical, '丙は隣で立っている。'),
    scene(historical, '丙の手だけが画面内に見える。'),
    scene(historical, '丙の後ろ姿が遠景に小さく見える。'),
    scene(historical) + '\n丙「私も見る。」',
    scene('丙が見守った甲は微笑む。'),
    scene('丙が笑ったことは乙も知っている。'),
    scene('丙の模型は机の上にある。'),
  ];
  for (const source of permitted) for (const compact of [false, true]) {
    assert.deepEqual(names(extractCastLimitRule(source, cast, { compact })), ['丙', '乙', '甲'], source);
  }
  const currentInCamera = scene(historical).replace(camera, '[Camera: 丙の肩越しに甲と乙を俯瞰で捉える。]');
  assert.deepEqual(names(extractCastLimitRule(currentInCamera, cast, { compact: true })), ['丙', '乙', '甲']);
  const member = scene('甲が組んだ模型は机の上にある。');
  assert.deepEqual(names(extractCastLimitRule(member, cast, { compact: true })), ['乙', '甲']);
});

test('ambiguous or quoted count information never silently removes an actor', () => {
  for (const source of [
    scene().replace('画面内は二人。', ''),
    scene().replace('画面内は二人。', '画面内は三人。'),
    scene().replace('画面内は二人。', '').replace('きれいだね。', '画面内は二人。'),
    scene().replace(camera, '[Camera: テーブルを上から見下ろす。]'),
    scene().replace('画面内は二人。', '画面内は二人。画面内は三人。'),
    scene('丙が組んだ模型を眺めている。'),
  ]) assert.deepEqual(names(extractCastLimitRule(source, cast, { compact: true })), ['丙', '乙', '甲'], source);
  const english = '[Camera: Alpha and Beta from above]\nAction: Gamma carried a box. Gamma now holds it. Only two people are in frame.\nAlpha「Hello.」';
  assert.deepEqual(names(extractCastLimitRule(english, '## Alpha\n## Beta\n## Gamma', { compact: true })), ['Alpha', 'Beta', 'Gamma']);
});

test('ordinary and native prompt plus QA cast contracts share the current-body decision', async () => {
  const server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });
  try {
    const native = await server.ssrLoadModule('/src/lib/experimental-manga.js');
    const { buildMangaPrompt } = await server.ssrLoadModule('/src/lib/prompt-assembler.js');
    const makeScenario = count => Array.from({ length: count }, (_, index) => `[${index + 1}コマ目]\n[EMOTION: NORMAL]\n${index === 0 ? scene() : `${camera}\n状況: 甲と乙が並ぶ。\nセリフなし`}`).join('\n');
    const scenario = makeScenario(4);
    for (const providerFamily of ['chatgpt', 'gemini']) for (const promptMaxChars of [24000, 32000]) {
      const prompt = buildMangaPrompt({ scenario, castList: cast, colorMode: 'color', providerFamily, promptMaxChars, showWatermarks: false });
      const frame = prompt.split('## Panel 1\n')[1].split('## Panel 2\n')[0];
      assert.deepEqual(names(frame), ['乙', '甲']);
      assert.match(frame, /きれいだね。/);
      assert.ok(frame.includes('甲と乙を俯瞰'));
    }
    const input = { enabled: true, scenario: makeScenario(5), castList: cast, colorMode: 'color' };
    const source = native.readExperimentalSource(input);
    const plan = { count: 5, layout: 'two_columns', reason: '現在の出来事を順に描く', panels: source.panels.map(panel => ({
      sourcePanel: panel.id, kind: 'anchor', camera: panel.camera, action: '甲と乙が模型を見て会話する。', dialogueIds: panel.dialogueIds, breakout: null,
    })) };
    const prepared = await native.prepareExperimentalManga(input, async () => JSON.stringify(plan));
    assert.deepEqual(native.validateExperimentalPlan(plan, source).expectedCast[0].names.sort(), ['乙', '甲']);
    const frame = prepared.prompt.split('[PAGE FRAME P1 |')[1].split('[END PAGE FRAME P1]')[0];
    assert.deepEqual(names(frame), ['乙', '甲']);
    assert.ok(prepared.prompt.includes(historical));
    assert.equal(prepared.source.scenario, input.scenario);
  } finally { await server.close(); }
});
