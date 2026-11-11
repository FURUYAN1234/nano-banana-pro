import assert from 'node:assert/strict';
import test, { before, after } from 'node:test';
import { createServer } from 'vite';

let server, history, getScenarioPrompt, EMOTION_STYLES, composition;
before(async () => {
  server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });
  history = await server.ssrLoadModule('/src/lib/generation-history.js');
  composition = await server.ssrLoadModule('/src/lib/manga-page-composition.js');
  ({ getScenarioPrompt } = await server.ssrLoadModule('/src/lib/prompts.js'));
  ({ EMOTION_STYLES } = await server.ssrLoadModule('/src/lib/constants.js'));
});
after(async () => server?.close());

const page = (frames, hero, title = 'test') => `## タイトル: ${title}\nPageComposition: ${JSON.stringify({layout:'free',frames,reason:'物語の山場を大きく描く',heroPanels:[hero],foregrounds:[],breakouts:[],bleed:[]})}\n` + frames.map((_,i)=>`[${i+1}コマ目]\n状況: 固有の物語データ。\nA「秘密の台詞${i}」`).join('\n');
const rightStack = (count, width = .6) => [{x:1-width,y:0,w:width,h:1}, ...Array.from({length:count-1},(_,i)=>({x:0,y:i/(count-1),w:1-width,h:1/(count-1)}))];

test('recent page comparison counts structurally identical works, not duplicate history entries or prose', () => {
  const a=page(rightStack(5),1,'one'), b=page(rightStack(6,.42),1,'two');
  const recent=history.collectRecentPageCompositions([a,{scenario:a},{scenario:b},null,'PageComposition: {bad}\n[1コマ目]']);
  assert.equal(recent.length,2);
  assert.equal(recent[0].family,recent[1].family,'changing count and width alone is still the same page structure');
  assert.equal(recent[0].family,'right-full-height');
  assert.equal(recent[0].smallPanels,'left-stack');
  assert.equal(recent[0].heroBeat,'opening');
  assert.doesNotMatch(JSON.stringify(recent),/秘密|固有|タイトル|台詞|reason/);
  assert.equal(history.collectRecentPageCompositions(Array.from({length:12},(_,i)=>page(rightStack(5),1,`work${i}`))).length,6);
});

test('page comparison distinguishes left, horizontal and later story peaks', () => {
  const left=[{x:.65,y:0,w:.35,h:.3},{x:0,y:0,w:.65,h:1},{x:.65,y:.3,w:.35,h:.35},{x:.65,y:.65,w:.35,h:.35}];
  const bottom=[{x:.5,y:0,w:.5,h:.25},{x:0,y:0,w:.5,h:.25},{x:0,y:.25,w:1,h:.25},{x:0,y:.5,w:1,h:.5}];
  const recent=history.collectRecentPageCompositions([page(left,2),page(bottom,4)]);
  assert.equal(recent[0].family,'left-full-height');
  assert.equal(recent[0].heroBeat,'middle');
  assert.equal(recent[1].family,'lower-wide');
  assert.equal(recent[1].heroBeat,'ending');
  assert.notEqual(recent[0].smallPanels,recent[1].smallPanels);
});

test('ordinary free-mode authoring uses actual recent layouts without a canonical right-side example or diversity retries', () => {
  const recentPageCompositions=history.collectRecentPageCompositions([page(rightStack(5),1,'a'),page(rightStack(6),1,'b')]);
  const prompt=getScenarioPrompt({...options,scenarioMode:'experimental-manga',recentPageCompositions});
  assert.match(prompt,/RECENT PAGE STRUCTURES/);
  assert.match(prompt,/"right-full-height":2/);
  assert.match(prompt,/異なる3案/);
  assert.match(prompt,/見せ場.*1コマ目.*固定しない/);
  assert.match(prompt,/明示.*配置.*優先/);
  assert.doesNotMatch(composition.SCENARIO_PAGE_COMPOSITION,/基本形は|"heroPanels":\[1\]|ページの右側ほぼ全高/);
  const legacy=getScenarioPrompt({...options,scenarioMode:'four-panel',recentPageCompositions});
  assert.doesNotMatch(legacy,/RECENT PAGE STRUCTURES/);
  const automatic=getScenarioPrompt({...options,autoSelectPanelCount:true,recentPageCompositions});
  assert.match(automatic,/RECENT PAGE STRUCTURES/);
  // An intentional repeated authored layout is still valid; variety is not a rejection gate.
  const repeated={layout:'free',frames:rightStack(5),heroPanels:[1],reason:'明示された同じ配置を維持する',foregrounds:[{panel:1,character:'A',over:[2,3,4,5],placement:'一続きの身体を大きく保ち小コマの文字を避ける'}],breakouts:[],bleed:[]};
  assert.doesNotThrow(()=>composition.assertGeneratedPageComposition(`PageComposition: ${JSON.stringify(repeated)}\n`+Array.from({length:5},(_,i)=>`[${i+1}コマ目]`).join('\n'),5));
});

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

test('scene-based automatic palette contains only the six accepted media, without tag quotas', () => {
  const accepted = ['NORMAL', 'GEKIGA', 'WATERCOLOR', 'POP_ART', 'SKETCH', 'CHIBI_GAG'];
  for (const punchlineType of ['GagAuto', 'SeriousAuto', 'Dream', 'Explosion', 'Surreal']) {
    const prompt = getScenarioPrompt({ ...options, punchlineType, comedyTone: punchlineType === 'Explosion' ? 'HighTension' : 'Auto' });
    const offered = [...prompt.matchAll(/^- ([A-Z_]+):.*drawing_family=/gm)].map(match => match[1]);
    assert.deepEqual([...new Set(offered)].sort(), accepted.filter(style => punchlineType !== 'SeriousAuto' || style !== 'CHIBI_GAG').sort());
    if (punchlineType === 'SeriousAuto') assert.doesNotMatch(prompt, /CHIBI_GAG/);
    assert.match(prompt, /絵柄に優劣や好き嫌い/);
    assert.doesNotMatch(prompt, /推奨EMOTION|推奨される感情絵柄タグ|NORMAL以外のタグを優先|少なくとも2種類以上のタグ|EMOTION: SAD/);
    assert.doesNotMatch(prompt, /他キャラにも均等にオチ/);
  }
  const documentary = getScenarioPrompt({ ...options, punchlineType: 'SeriousDocumentary' });
  assert.match(documentary, /EMOTION.*必ずNORMAL|必ずNORMAL/);
});

test('automatic choices retain six visible drawing media and preserve excluded manual recipes', () => {
  const prompt = getScenarioPrompt({ ...options, punchlineType: 'GagAuto' });
  assert.doesNotMatch(prompt, /^- PASTEL:/m);
  assert.match(EMOTION_STYLES.PASTEL.style, /pastel/i);
  assert.match(prompt, /NORMAL:.*drawing_family=anime/);
  for (const tag of ['IMPACT', 'CEL', 'UKIYOE', 'THICK_PAINT', 'PASTEL']) {
    assert.doesNotMatch(prompt, new RegExp(`^- ${tag}:`, 'm'));
    assert.ok(EMOTION_STYLES[tag].style);
  }
  for (const tag of ['GEKIGA', 'CHIBI_GAG', 'WATERCOLOR', 'POP_ART', 'SKETCH']) {
    assert.ok(prompt.includes(`- ${tag}:`));
    assert.doesNotMatch(prompt.match(new RegExp(`^- ${tag}:.*$`, 'm'))[0], /drawing_family=anime/);
  }
  assert.match(prompt, /同系統のタグ差だけでは.*描法変更/);
});
