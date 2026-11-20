import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { extractCastLimitRule, extractDialogueOnly, extractActionOnly, buildPanelEyeLineRule } from '../src/lib/panel-utils.js';

const cast = '## 甲\n## 乙\n## 丙';
const camera = '[Camera: 右上から甲と乙を俯瞰で捉える。]';
const historical = '丙が組んだ模型は机の上に置かれている。';
const scene = (description = historical, extra = '') => `${camera}\n状況: ${description}画面内は二人。甲は右、乙は左で向かい合って会話する。${extra}\n甲「きれいだね。」`;
const names = rule => [...(rule.match(/(?:CAST COUNT:|ANTI-CLONE REMINDER:)[^\n]*/)?.[0] || '').matchAll(/\[([^\]]+)\]/g)].map(match => match[1]).sort();

test('unique Japanese short subjects keep silent background actors without treating ordinary words as people', () => {
 const cast='## 七瀬こはる\n## 朝倉蓮';
 const source='[Camera: 店入口の高い位置からカウンターを見下ろす。]\n状況: こはるが入口の札を裏返して「CLOSED」にする。奥では蓮が片付いたカウンターに二つのカップを用意している。\n七瀬こはる:「今日で、この店も終わりかぁ。」';
 for(const compact of [false,true]) {
  const rule=extractCastLimitRule(source,cast,{compact});
  assert.deepEqual(names(rule),['七瀬こはる','朝倉蓮']);assert.doesNotMatch(rule,/ABSENT:.*朝倉蓮/);
  assert.deepEqual(names(extractCastLimitRule(source.replaceAll('蓮','朝倉蓮'),cast,{compact})),['七瀬こはる','朝倉蓮']);
 }
 const local=description=>`[Camera: カウンターを見下ろす。]\n状況: ${description}\n七瀬こはる「待ってる。」`;
 assert.deepEqual(names(extractCastLimitRule('[Camera: カウンターを俯瞰。]\n状況: 奥ではこはるがカップを持っている。\n朝倉蓮「できた。」',cast,{compact:true})),['七瀬こはる','朝倉蓮']);
 assert.deepEqual(extractDialogueOnly(source,cast,{asEntries:true}).map(entry=>entry.text),['今日で、この店も終わりかぁ。']);
 assert.ok(extractActionOnly(source,cast).includes('奥では蓮が片付いたカウンターに二つのカップを用意している。'));
 for(const description of ['蓮は画面外にいる。','「蓮がカップを用意する」と書いた紙だけがある。','蓮の写真が机にある。'])assert.deepEqual(names(extractCastLimitRule(local(description),cast,{compact:true})),['七瀬こはる'],description);
 assert.deepEqual(names(extractCastLimitRule(local('奥では蓮がカップを用意している。'),`${cast}\n## 佐藤蓮`,{compact:true})),['七瀬こはる']);
 const generic=`${cast}\n## 佐藤花\n## 田中光\n## 山田明`;
 for(const description of ['花が咲く。窓では光が差す。明の文字がある。','花が用意されている。','花が話の中心にある。','光が顔を照らしている。'])assert.deepEqual(names(extractCastLimitRule(local(description),generic,{compact:true})),['七瀬こはる'],description);
 assert.deepEqual(names(extractCastLimitRule(local('蓮は口を挟まず、彼女の話を聞く。'),cast,{compact:true})),['七瀬こはる','朝倉蓮']);
 assert.deepEqual(names(extractCastLimitRule(local('奥では蓮がカップを用意している。'),'## 七瀬こはる\n## 朝倉蓮（蓮）',{compact:true})),['七瀬こはる','朝倉蓮']);
});

test('qualified nonhuman cast names resolve unique short body references but not mentions or collisions', () => {
 const cast='## アカリ\n## ヒカリ\n## 石の守護獣';
 const panel=action=>`[Camera: 戦場の低い位置。]\n状況: ${action}\nアカリ「硬っ……！」`;
 for(const action of ['ヒカリは丸眼鏡越しに守護獣の腕の動きを追い、眉を寄せる。','アカリが長剣を守護獣の胸の石殻へ打ち込む。','アカリが長剣を石の守護獣の胸へ打ち込む。','守護獣の大きな腕が地面へ振り下ろされる。','アカリが鉤を守護獣の右前腕に掛ける。','ヒカリが結界とともに守護獣を固定する。']) {
  const rule=extractCastLimitRule(panel(action),cast,{compact:true});
  assert.ok(names(rule).includes('石の守護獣'),action);assert.doesNotMatch(rule,/ABSENT:.*石の守護獣/);
 }
 for(const action of ['アカリが「守護獣の胸を斬る」と話す。','守護獣の腕について話す。','守護獣の胸の写真を見ている。','守護獣の腕は画面外にあり、描かない。'])assert.ok(!names(extractCastLimitRule(panel(action),cast,{compact:true})).includes('石の守護獣'),action);
 const action='アカリが剣を守護獣の胸へ打ち込む。';
 assert.ok(!names(extractCastLimitRule(panel(action),`${cast}\n## 炎の守護獣`,{compact:true})).includes('石の守護獣'));
 const collision=names(extractCastLimitRule(panel(action),`${cast}\n## 守護獣`,{compact:true}));
 assert.ok(collision.includes('守護獣'));assert.ok(!collision.includes('石の守護獣'));
 assert.ok(names(extractCastLimitRule(panel(action),'## アカリ\n## 石の守護獣（守護獣）',{compact:true})).includes('石の守護獣'));
});

test('a past object modifier cannot add a body beyond the explicit current shot', () => {
  for (const description of [historical, '丙が運んだ荷物が床にある。', '丙が掲げた一個は塔の上に置かれ、']) {
    const source = scene(description);
    for (const compact of [false, true]) assert.deepEqual(names(extractCastLimitRule(source, cast, { compact })), ['乙', '甲']);
    assert.match(extractCastLimitRule(source, cast, { compact: true }), /NO OTHER ACTORS: exactly 2 bodies/);
    assert.match(extractCastLimitRule(source, cast, { compact: true }), /do NOT draw \[丙\]/);
    assert.ok(extractActionOnly(source, cast).includes(description), 'story history remains in authored Action');
    assert.deepEqual(extractDialogueOnly(source, cast, { asEntries: true }).map(entry => entry.text), ['きれいだね。']);
    assert.doesNotMatch(buildPanelEyeLineRule(source, cast), /\[丙\]/, 'context-only actor is not manufactured as a current listener');
  }
});
test('space reserved for a later breakout does not add another local body',()=>{
 const reservation='下半分には後続コマから丙が大きく入る空間を残す。';
 const source=`${camera}\n状況: 甲と乙が本を片づける。${reservation}\n甲「できた。」`;
 assert.deepEqual(names(extractCastLimitRule(source,cast,{compact:true})),['乙','甲']);
 assert.ok(extractActionOnly(source,cast).includes(reservation),'the required receiving space stays in the drawing instructions');
 assert.deepEqual(names(extractCastLimitRule(source+'\n状況: 丙の手が画面内に見える。',cast,{compact:true})),['丙','乙','甲']);
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

test('role plaques remain in the artwork and cannot become actor speech', () => {
  const cast = '## 甲\n## 乙';
  const panel = '状況: 甲と乙が向き合う。コマ内の小さな役名「地図係」「案内役」。\n'
    + '役名札:「道案内」\n'
    + '甲:「灯りを持って。」\n'
    + '状況: 乙がうなずく。旅人「門を開けて。」';
  for (const forImagePrompt of [false, true]) {
    assert.deepEqual(extractDialogueOnly(panel, cast, { asEntries: true, forImagePrompt }), [
      { speaker: '甲', text: '灯りを持って。' },
      { speaker: '旅人', text: '門を開けて。' },
    ]);
  }
  const action = extractActionOnly(panel, cast);
  for (const label of ['地図係', '案内役', '道案内']) assert.ok(action.includes(label), action);
});
