import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';

let server;
let getEndingModePolicy;
let isSeriousEnding;
let SERIOUS_ENDING_OPTIONS;
let GAG_ENDING_OPTIONS;
let getPunchlineLabel;
let getScenarioPrompt;
let classifyTopicTreatment;
let resolveAutoEndingType;
let buildMangaPrompt;
let buildComedyReviewRequest;

const step2Url = new URL('../src/components/Step2Panel.jsx', import.meta.url);
const appUrl = new URL('../src/App.jsx', import.meta.url);
const workflowUrl = new URL('../src/hooks/useMangaWorkflow.js', import.meta.url);

before(async () => {
  server = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true }
  });
  ({
    getEndingModePolicy,
    isSeriousEnding,
    SERIOUS_ENDING_OPTIONS,
    GAG_ENDING_OPTIONS
  } = await server.ssrLoadModule('/src/lib/ending-mode-policy.js'));
  ({ getPunchlineLabel } = await server.ssrLoadModule('/src/lib/constants.js'));
  ({ getScenarioPrompt } = await server.ssrLoadModule('/src/lib/prompts.js'));
  ({ buildMangaPrompt } = await server.ssrLoadModule('/src/lib/prompt-assembler.js'));
  ({ buildComedyReviewRequest } = await server.ssrLoadModule('/src/lib/comedy-review.js'));
  ({
    classifyTopicTreatment,
    resolveAutoEndingType
  } = await server.ssrLoadModule('/src/lib/serious-topic-policy.js'));
});

const CAST_LIST = `## ミク
- adult woman, long blonde hair
## ヒカリ
- adult woman, short black hair`;

const SERIOUS_SCENARIO = `## タイトル: 雨のあと
Logline: 二人が被害の記録を確認し、静かに今後を決める。
Location: 市民会館の会議室
Outfit: 私服
Punchline: 静かな余韻

[1コマ目: 起]
[EMOTION: NORMAL]
[Camera: high-angle wide shot]
Action: ミクが被害状況の地図を机に広げ、ヒカリが向かい側から見る。
ミク「まず、残った記録を確認しよう。」

[2コマ目: 承]
[EMOTION: SAD]
[Camera: telephoto close shot]
Action: ヒカリが地図の傷んだ箇所に指を置き、ミクが手元を見る。
ヒカリ「ここには、もう戻れない人もいる。」

[3コマ目: 転]
[EMOTION: GEKIGA]
[Camera: floor-level low angle]
Action: ミクが椅子から立ち、窓の外の雨雲を見上げる。
ミク「忘れないことから始める。」

[4コマ目: 結]
[EMOTION: NORMAL]
[Camera: distant wide shot]
Action: 二人が並んで記録を箱に収め、会議室の灯りを一つ残す。
ヒカリ「明日、続きをしよう。」`;

test('edited scenario ending overrides stale gag metadata in both copy providers', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildMangaPrompt({ scenario: SERIOUS_SCENARIO, castList: CAST_LIST,
      colorMode: 'color', providerFamily, punchlineType: 'Explosion', systemVersion: 'test' });
    assert.match(prompt, /SERIOUS INTENT/);
    assert.doesNotMatch(prompt, /COMEDY INTENT/);
  }
});

const buildScenarioRequest = (punchlineType, manualTopic = '友人たちが新しい喫茶店のメニューを相談する') => getScenarioPrompt({
  randomCategory: '手動入力',
  targetDate: '2026-09-17',
  inputMode: 'manual',
  manualTopic,
  newsContext: '',
  searchTopicKeywords: '',
  bg360Image: null,
  bg360Analysis: null,
  bg360Enabled: false,
  customLocation: '',
  customOutfit: '',
  locationPlan: {
    mode: 'adaptive',
    anchorName: '',
    guidance: '題材に合う具体的な場所を選ぶ。'
  },
  ragReactions: '',
  punchlineType,
  comedyTone: 'HighTension',
  styleJson: null
});

after(async () => {
  await server?.close();
});

test('registers general serious endings independently from documentary fidelity', () => {
  assert.equal(getEndingModePolicy('Auto').endingTone, 'auto');
  assert.equal(getEndingModePolicy('SeriousAuto').endingTone, 'serious');
  assert.equal(getEndingModePolicy('QuietAftermath').documentary, false);
  assert.equal(getEndingModePolicy('QuietAftermath').preserveReferenceStyle, false);
  assert.equal(isSeriousEnding('SeriousAuto'), true);
  assert.equal(isSeriousEnding('TragicClosure'), true);
  assert.equal(isSeriousEnding('Explosion'), false);
  assert.deepEqual(SERIOUS_ENDING_OPTIONS.map(({ value }) => value), [
    'SeriousAuto',
    'QuietAftermath',
    'Resolve',
    'Warning',
    'OpenQuestion',
    'EmotionalClosure',
    'TragicClosure'
  ]);
  assert.deepEqual(GAG_ENDING_OPTIONS.map(({ value }) => value), [
    'Surreal',
    'Explosion',
    'FakeEmotion',
    'Metafiction',
    'Unreasonable',
    'RunningGag',
    'Dream',
    'Misunderstanding',
    'CanceledEnding'
  ]);
  assert.equal(getPunchlineLabel('SeriousAuto'), 'シリアス内でおまかせ');
  assert.equal(getPunchlineLabel('QuietAftermath'), '静かな余韻');
  assert.equal(getPunchlineLabel('TragicClosure'), '悲劇・喪失');
});

test('groups automatic, serious, gag, and documentary endings in the existing selector', async () => {
  const source = await readFile(step2Url, 'utf8');
  assert.match(source, /<optgroup label="おまかせ">/);
  assert.match(source, /<optgroup label="シリアス">/);
  assert.match(source, /<optgroup label="ギャグ">/);
  assert.doesNotMatch(source, /<optgroup label="資料忠実">/);
  assert.match(source, /value="GagAuto"/);
  assert.equal(getEndingModePolicy('GagAuto').endingTone, 'gag');
  for (const option of SERIOUS_ENDING_OPTIONS) assert.match(option.menuLabel, /（.+）/);
  const seriousGroup = source.split('<optgroup label="シリアス">')[1].split('</optgroup>')[0];
  const gagGroup = source.split('<optgroup label="ギャグ">')[1].split('</optgroup>')[0];
  assert.match(seriousGroup, /value === 'SeriousDocumentary'/);
  assert.match(gagGroup, /value === 'Documentary'/);
  assert.match(source, /SERIOUS_ENDING_OPTIONS\.map/);
  assert.match(source, /GAG_ENDING_OPTIONS\.map/);
  assert.match(source, /DOCUMENTARY_ENDING_OPTIONS\.filter/);
});

test('Auto routes clearly tragic or inappropriate-to-joke topics into serious mode before prompt assembly', () => {
  const fatality = classifyTopicTreatment('大規模な地震で多数の犠牲者が出て、遺族が追悼式を開いた。');
  const bereavement = classifyTopicTreatment('親友との死別を受け止め、静かに別れを告げる。');
  const ordinary = classifyTopicTreatment('友人たちが新作パンケーキの盛り付けを相談する。');

  assert.equal(fatality.tone, 'serious');
  assert.equal(bereavement.tone, 'serious');
  assert.equal(ordinary.tone, 'gag');
  assert.equal(resolveAutoEndingType('大規模事故で死者と負傷者が出た。', () => 0.99), 'SeriousAuto');
  assert.equal(resolveAutoEndingType('猫が箱を取り合う。', () => 0), 'Surreal');
  assert.equal(resolveAutoEndingType('猫が箱を取り合う。', () => 0.999), 'CanceledEnding');
});

test('general serious scenario prompts use serious story structure without gag or chibi coercion', () => {
  const seriousAuto = buildScenarioRequest('SeriousAuto');
  const quiet = buildScenarioRequest('QuietAftermath');
  const gag = buildScenarioRequest('Explosion');

  assert.match(seriousAuto, /シリアス結末設計/);
  assert.match(seriousAuto, /静かな余韻.*決意・再出発.*警告.*問題提起.*感動・救い.*悲劇・喪失/s);
  assert.match(quiet, /強制シリアス結末: 静かな余韻/);
  assert.match(quiet, /表情・視線・身体演技・カメラ・構図・照明・間/);
  assert.doesNotMatch(quiet, /笑いの構造設計|ギャグ強度の方針|CHIBI_GAG|強制コメディトーン指定/);
  assert.match(gag, /笑いの構造設計/);
  assert.match(gag, /強制オチ指定: 爆発型/);
});

test('general serious image prompts carry serious intent without forcing documentary art style', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildMangaPrompt({
      scenario: SERIOUS_SCENARIO,
      castList: CAST_LIST,
      colorMode: 'color',
      providerFamily,
      punchlineType: 'QuietAftermath',
      systemVersion: 'test',
      cinematicTechniques: false
    });

    assert.match(prompt, /SERIOUS INTENT/);
    assert.doesNotMatch(prompt, /COMEDY INTENT|GAG INTENT OVERLAY|CHIBI_GAG/);
    assert.doesNotMatch(prompt, /chibi too|scripted surreal gags/i);
    assert.doesNotMatch(prompt, /REFERENCE-SHEET ART-STYLE LOCK/);
  }
});

test('general serious review preserves serious drama without documentary-only fidelity rules', () => {
  const general = buildComedyReviewRequest({
    prompt: 'SERIOUS INTENT',
    scenario: SERIOUS_SCENARIO,
    castList: CAST_LIST,
    reviewTone: 'serious',
    preserveReferenceStyle: false
  });
  const documentary = buildComedyReviewRequest({
    prompt: 'SERIOUS DOCUMENTARY INTENT',
    scenario: SERIOUS_SCENARIO,
    castList: CAST_LIST,
    reviewTone: 'serious',
    preserveReferenceStyle: true
  });

  assert.match(general, /editor of serious four-panel manga/);
  assert.match(general, /selected art style/);
  assert.doesNotMatch(general, /source-faithful|character-reference art style/);
  assert.match(documentary, /source-faithful serious four-panel manga/);
  assert.match(documentary, /character-reference art style/);
});

test('Auto resolution is retained as the effective ending through the workflow and UI', async () => {
  const [workflowSource, appSource, step2Source] = await Promise.all([
    readFile(workflowUrl, 'utf8'),
    readFile(appUrl, 'utf8'),
    readFile(step2Url, 'utf8')
  ]);

  assert.match(workflowSource, /resolvedPunchlineTypeRef/);
  assert.match(workflowSource, /result\.resolvedEndingType/);
  assert.match(workflowSource, /effectivePunchlineType/);
  assert.match(appSource, /effectivePunchlineType/);
  assert.match(step2Source, /effectivePunchlineType/);
});
