import assert from 'node:assert/strict';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';

let server;
let buildMangaPrompt;
let validateScenarioEnhancement;
let getScenarioPrompt;
let singleImagePrompt;
let quality;
let extractCastLimitRule;
let getPanelShotExecution;
let buildScenarioEnhancementPrompt;

before(async () => {
  server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });
  ({ buildMangaPrompt } = await server.ssrLoadModule('/src/lib/prompt-assembler.js'));
  ({ validateScenarioEnhancement } = await server.ssrLoadModule('/src/lib/scenario-enhancement.js'));
  ({ getScenarioPrompt } = await server.ssrLoadModule('/src/lib/prompts.js'));
  singleImagePrompt = await server.ssrLoadModule('/src/lib/single-image-prompt.js');
  quality = await server.ssrLoadModule('/src/lib/image-quality-qa.js');
  ({ extractCastLimitRule } = await server.ssrLoadModule('/src/lib/panel-utils.js'));
  ({ getPanelShotExecution } = await server.ssrLoadModule('/src/lib/composition-variety.js'));
  ({ buildScenarioEnhancementPrompt } = await server.ssrLoadModule('/src/lib/scenario-enhancement.js'));
});
after(async () => { await server?.close(); });

const castList = '- Character [SpeakerA]: adult, short black hair, no glasses\n- Character [SpeakerB]: adult, blonde hair, glasses';
const scenario = `[1コマ目: 起]
[Camera: extreme low angle, 25 degree Dutch tilt]
状況: SpeakerAが予定表を指さす。SpeakerBが答える。
SpeakerA「ここです。」
SpeakerB「確認します。」
[2コマ目: 承]
[Camera: overhead wide shot]
状況: SpeakerAが椅子を引く。SpeakerBが振り返る。
SpeakerA「待って。」
[3コマ目: 転]
[Camera: side view, strong foreshortening]
状況: SpeakerBが資料を拾う。
SpeakerB「決まりです。」
[4コマ目: 結]
[Camera: wide shot]
状況: SpeakerAが椅子へ座り、SpeakerBも静かに目を伏せる。意図した無言の間。
セリフなし`;
const build = (providerFamily, input = scenario, cast = castList) => buildMangaPrompt({
  scenario: input, castList: cast, colorMode: 'color', providerFamily, punchlineType: 'Auto', systemVersion: 'test'
});

test('dialogue preserves the low tilted shot without inventing a rear-shoulder owner', () => {
  for (const provider of ['chatgpt', 'gemini']) {
    const prompt = build(provider);
    const panel = prompt.match(/## Panel 1[\s\S]*?(?=## Panel 2)/)[0];
    assert.match(panel, /extreme low angle, 25 degree Dutch tilt/);
    assert.match(panel, /EYE-LINE LOCK/);
    assert.doesNotMatch(panel, /VISIBLE REAR DEPTH CHECK|GEMINI REAR-FOREGROUND LOCK|DEPTH ASSIGNMENT \(REQUIRED\)/);
    assert.match(panel, /SpeakerA/);
    assert.match(panel, /SpeakerB/);
  }
});

test('explicit named shoulder and protected words survive freer direction', () => {
  for (const provider of ['chatgpt', 'gemini']) {
    const prompt = build(provider, scenario.replace('extreme low angle, 25 degree Dutch tilt', 'SpeakerAの肩越し、SpeakerBを見る'));
    assert.match(prompt, /EXPLICIT REAR CAMERA/);
    assert.match(prompt, /camera is physically behind \[SpeakerA\]/);
    for (const dialogue of ['ここです。', '確認します。', '待って。', '決まりです。']) assert.ok(prompt.includes(dialogue));
    assert.match(prompt, /NO speech bubbles|NO DIALOGUE|no speech bubbles/i);
  }
});

test('background effects behind a subject do not request a rear camera', () => {
  for (const provider of ['chatgpt', 'gemini']) {
    const prompt = build(provider, scenario.replace('extreme low angle, 25 degree Dutch tilt', '超ローアングル、背後に稲妻エフェクト'));
    const panel = prompt.match(/## Panel 1[\s\S]*?(?=## Panel 2)/)[0];
    assert.match(panel, /超ローアングル/);
    assert.doesNotMatch(panel, /VISIBLE REAR DEPTH CHECK|GEMINI REAR-FOREGROUND LOCK|camera behind/);
  }
});

test('both providers retain expressive permission and geometry protections after long-prompt compaction', () => {
  for (const provider of ['chatgpt', 'gemini']) {
    const prompt = build(provider, scenario, `${castList}\n${'Appearance detail: plain clothing, consistent hair and face.\n'.repeat(70)}`);
    assert.match(prompt, /EXPRESSIVE DIRECTION:/);
    assert.match(prompt, /foreshortening/);
    assert.match(prompt, /full-body/);
    assert.match(prompt, /panel contrast/i);
    assert.match(prompt, /OBJECT GEOMETRY LOCK/);
    assert.match(prompt, /FUNCTIONAL SURFACE/);
    assert.doesNotMatch(prompt, /avoid extreme foreshortening|geometry overrides automatic pose\/angle variety|Geometry beats automatic staging|same forward-extension gesture family in no more than one panel/);
  }
});

test('body enhancement accepts pointing, reaching and impact in different panels while protecting dialogue', () => {
  const candidate = scenario.replace('椅子を引く', '片手を画面手前へ大きく突き出す').replace('資料を拾う', '机を叩いて立ち上がる');
  const validate = (text) => validateScenarioEnhancement({ originalScenario: scenario, candidateScenario: text, selectedCategories: ['body'] });
  assert.equal(validate(candidate).ok, true, JSON.stringify(validate(candidate).issues));
  assert.equal(validate(candidate.replace('待って。', 'やめて。')).ok, false);
});

test('normal scenario generation explicitly allows camera and body exaggeration with quiet beats preserved', () => {
  const prompt = getScenarioPrompt({ inputMode: 'manual', manualTopic: '締切を相談する二人', targetDate: '2026-09-12', punchlineType: 'Auto', comedyTone: 'standard', customLocation: '', customOutfit: '', newsContext: '', ragReactions: '' });
  assert.match(prompt, /強い遠近感/);
  assert.match(prompt, /全身.*誇張/);
  assert.match(prompt, /静かな間/);
  assert.doesNotMatch(prompt, /この系統は4コマ中最大1コマ/);
});

test('single-image copy text shares expressive permission without a four-panel requirement', () => {
  const text = singleImagePrompt.buildSingleImageEmotionalPrompt();
  assert.ok(text, 'exported single-image prompt');
  assert.match(text, /EXPRESSIVE DIRECTION:/);
  assert.match(text, /full-body/);
  assert.doesNotMatch(text, /Across the four panels|at least three.*panels/);
});

test('quality review and candidate comparison do not reward flattening expressive staging', () => {
  for (const prompt of [quality.buildImageQualityQaPrompt(), quality.buildImageQualityComparisonPrompt()]) {
    assert.match(prompt, /Preserve expressive staging/);
    assert.match(prompt, /foreshortening/);
    assert.match(prompt, /full-body/);
    assert.match(prompt, /Ordinary background people.*not main-cast duplicates/);
  }
});

test('meeting group actions retain the registered cast without inventing mobs or a solo shot', () => {
  for (const action of ['全員が椅子から立ち上がる。', 'SpeakerAが目覚める。他のメンバーも静かに座っている。']) {
    const rule = extractCastLimitRule(`[Camera: low angle]\n状況: ${action}\nSpeakerA「終わりです。」`, castList, { compact: true });
    assert.match(rule, /CAST COUNT: \[SpeakerA\], \[SpeakerB\] each EXACTLY ONCE/);
    assert.doesNotMatch(rule, /SOLO:|ABSENT:|adult mobs/);
  }
});

test('explicit non-cast groups do not pull all registered characters into the shot', () => {
  const rule = extractCastLimitRule('状況: SpeakerAが社員全員に説明する。\nSpeakerA「終わりです。」', castList, { compact: true });
  assert.match(rule, /ABSENT: do NOT draw \[SpeakerB\]/);
});

test('shot execution makes height and full-body framing visible while respecting close-ups', () => {
  assert.match(getPanelShotExecution('overhead wide shot'), /tops of heads.*table/);
  assert.match(getPanelShotExecution('floor-level low angle, full body'), /head-to-feet/);
  assert.match(getPanelShotExecution('floor-level low angle, full body'), /headroom and floor beyond BOTH shoes/);
  assert.match(getPanelShotExecution('floor-level low angle, full body'), /look up/);
  assert.match(getPanelShotExecution('全員の頭からつま先まで入る俯瞰'), /head-to-feet/);
  assert.match(getPanelShotExecution('足元から上半身まで見上げる'), /head-to-feet/);
  assert.doesNotMatch(getPanelShotExecution('顔の超アップ、ローアングル'), /head-to-feet/);
  for (const provider of ['chatgpt', 'gemini']) {
    const prompt = build(provider);
    assert.match(prompt, /SHOT EXECUTION:/);
    assert.match(prompt, /tops of heads/);
    assert.match(prompt, /look up/);
  }
});

test('combined camera and body enhancement designs shot scale and action as one beat', () => {
  const integrated = buildScenarioEnhancementPrompt({ scenario, selectedCategories: ['camera', 'body', 'effects'] });
  assert.match(integrated, /画角と身体動作の一体設計/);
  assert.match(integrated, /頭から足先/);
  assert.match(integrated, /静かな間/);
  const cameraOnly = buildScenarioEnhancementPrompt({ scenario, selectedCategories: ['camera'] });
  assert.doesNotMatch(cameraOnly, /【画角と身体動作の一体設計】/);
});
