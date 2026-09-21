import assert from 'node:assert/strict';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';
import { readFileSync } from 'node:fs';

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

test('camera is a protected projection, not movable for face or screen legibility', () => {
  for (const provider of ['chatgpt', 'gemini']) {
    const prompt = build(provider);
    assert.match(prompt, /PROMPT PRIORITY:.*Camera geometry/);
    assert.match(prompt, /CAMERA FIRST:.*never relocate.*legibility/);
    assert.match(prompt, /(?:Only when Camera leaves position unspecified|If unspecified, move camera)/);
    for (const panel of prompt.split(/## Panel \d/).slice(1)) {
      assert.match(panel, /^\s*Camera:/);
    }
  }
  const low = getPanelShotExecution('floor-level low angle, full body');
  assert.match(low, /horizon below.*face/);
  assert.match(low, /upward convergence/);
  assert.match(low, /preserve the scripted proportions/);
  assert.doesNotMatch(low, /chibi too/);
  assert.match(getPanelShotExecution('telephoto close-up'), /overlapping depth planes.*similar scale/);
});

test('a distant rear camera preserves back planes without turning the wide shot into OTS', () => {
  for (const camera of ['Observerの左後方から広角の全身ショット', 'wide rear view']) {
    const cue = getPanelShotExecution(camera);
    assert.match(cue, /back planes.*scripted subject/);
    assert.doesNotMatch(cue, /shoulder foreground|tight crop/);
  }
  assert.doesNotMatch(getPanelShotExecution('ローアングル、背後に稲妻エフェクト'), /back planes/);
});

test('natural Japanese camera height produces projection cues, not just enlarged foreground', () => {
  for (const camera of [
    'Hyper Perspective／空いた床から右奥へ向けた低い斜めの引き。頭から両足先まで入れる',
    '床すれすれの撮影位置から人物を捉える',
    '地面近くの低い位置から撮る'
  ]) {
    const cue = getPanelShotExecution(camera);
    assert.match(cue, /below.*face|look up/);
    assert.match(cue, /underside|lower surfaces/);
    assert.match(cue, /eye.level/);
  }
  assert.match(getPanelShotExecution('天板を浅く見下ろす近めの対面ショット'), /look down.*head\/shoulder tops/);
  assert.match(getPanelShotExecution('床から低い斜めの引き。頭から両足先まで入れる'), /head-to-feet/);
  assert.doesNotMatch(getPanelShotExecution('アイレベルの肩越し、背景ボケ'), /look up|look down/);
  assert.doesNotMatch(getPanelShotExecution('Bokeh Depth'), /look up|look down|eye.level/);
});

test('floor camera height and viewing pitch remain separate', () => {
  const horizontal = getPanelShotExecution('床すれすれから水平に撮る。ちびキャラを全身で捉える');
  assert.match(horizontal, /floor.level|below.*face/);
  assert.doesNotMatch(horizontal, /look up/);
  const down = getPanelShotExecution('床近くから小物を見下ろす');
  assert.match(down, /look down/);
  assert.doesNotMatch(down, /look up|underside/);
});

test('supplied four-panel scenario retains observable height cues after prompt compaction', () => {
  const input = readFileSync(new URL('./fixtures/camera-lettering-conflict-scenario.txt', import.meta.url), 'utf8');
  for (const providerFamily of ['chatgpt', 'gemini']) {
    for (const colorMode of ['color', 'monochrome']) {
      const prompt = buildMangaPrompt({ scenario: input, castList, providerFamily, colorMode, cinematicTechniques: false });
      const panel2 = prompt.match(/## Panel 2[\s\S]*?(?=## Panel 3)/)[0];
      const panel3 = prompt.match(/## Panel 3[\s\S]*?(?=## Panel 4)/)[0];
      assert.match(panel2, /SHOT EXECUTION:.*look down/);
      assert.match(panel3, /SHOT EXECUTION:.*head-to-feet.*(?:below.*face|look up)/);
      assert.match(panel3, /underside|lower surfaces/);
      assert.match(prompt, /eye-line is gaze, not camera height/i);
    }
  }
});

test('scenario direction distinguishes shot labels from physical height and QA checks the pixels', () => {
  const enhanced = buildScenarioEnhancementPrompt({ scenario, selectedCategories: ['camera'] });
  assert.match(enhanced, /俯瞰.*アオリ|アオリ.*俯瞰/);
  assert.match(enhanced, /アイレベル/);
  const qa = quality.buildImageQualityQaPrompt({ scenario, finalPrompt: build('chatgpt') });
  assert.match(qa, /camera_geometry:.*(?:elevation|pitch)/);
  assert.match(qa, /large.*(?:shoe|foreground).*not.*(?:elevation|low.angle)/i);
  assert.match(qa, /eye.level.*(?:crouch|chibi)/i);
});

const castList = '- Character [SpeakerA]: adult, short black hair, no glasses\n- Character [SpeakerB]: adult, blonde hair, glasses';
test('zoom framing and telephoto compression are distinct observable requirements', () => {
  for (const camera of ['ズームインで顔に寄る', 'Deep Emotion Close', 'close-up']) {
    const cue = getPanelShotExecution(camera);
    assert.match(cue, /tight crop/);
    assert.doesNotMatch(cue, /compressed depth/);
  }
  for (const camera of ['ズームアウトの引き', 'Epic Wide']) {
    assert.match(getPanelShotExecution(camera), /smaller.*(?:subject|figure)|subject.*smaller/);
  }
  for (const camera of ['望遠圧縮', 'telephoto close-up', 'long-lens shot']) {
    assert.match(getPanelShotExecution(camera), /distant camera.*compressed depth/);
    assert.match(getPanelShotExecution(camera), /background.*larger.*closer/);
  }
  assert.match(getPanelShotExecution('広角レンズ'), /near.*far.*scale/);
  assert.match(getPanelShotExecution('Innocent High'), /look down/);
  assert.match(getPanelShotExecution('Dominant Low'), /look up/);
});
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
    const prompt = build(provider, scenario.replace('extreme low angle, 25 degree Dutch tilt', 'SpeakerAの反射帯付き安全ベストの肩越し、SpeakerBを見る'));
    const panel = prompt.match(/## Panel 1[\s\S]*?(?=## Panel 2)/)[0];
    assert.match(prompt, /EXPLICIT REAR CAMERA/);
    assert.match(prompt, /camera is physically behind \[SpeakerA\]/);
    assert.doesNotMatch(panel, /camera behind \[SpeakerB\]/);
    for (const dialogue of ['ここです。', '確認します。', '待って。', '決まりです。']) assert.ok(prompt.includes(dialogue));
    assert.match(prompt, /NO speech bubbles|NO DIALOGUE|no speech bubbles/i);
  }
});

test('named shoulder ownership does not span across another cast member', () => {
  for (const camera of [
    'SpeakerAの顔を見る、SpeakerBの安全ベストの肩越し',
    'SpeakerAの隣に立つSpeakerBの安全ベストの肩越し'
  ]) {
    for (const provider of ['chatgpt', 'gemini']) {
      const prompt = build(provider, scenario.replace('extreme low angle, 25 degree Dutch tilt', camera));
      const panel = prompt.match(/## Panel 1[\s\S]*?(?=## Panel 2)/)[0];
      assert.match(panel, /camera is physically behind \[SpeakerB\]/);
      assert.doesNotMatch(panel, /camera is physically behind \[SpeakerA\]/);
    }
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
  assert.match(prompt, /静かな会話でも.*アオリ.*望遠/);
  assert.match(prompt, /文字を読むコマ.*身体演技/);
  assert.doesNotMatch(prompt, /この極限カメラを選んだコマのみ|激しい動き、狂気、ギャグの爆発シーンに使用/);
});

test('a rear-facing holder may occlude a chest-held document instead of showing it through their torso', () => {
  const rearDocumentScenario = scenario.replace(
    'extreme low angle, 25 degree Dutch tilt',
    'SpeakerAの反射帯付き安全ベストの肩越し、SpeakerBを見る'
  ).replace(
    'SpeakerAが予定表を指さす。SpeakerBが答える。',
    'SpeakerAが胸元に記録票を抱え、SpeakerBが答える。'
  );
  for (const provider of ['chatgpt', 'gemini']) {
    const prompt = build(provider, rearDocumentScenario);
    if (provider === 'chatgpt') {
      assert.match(prompt, /Rear holder \+ chest object: occlude\/show side\/back\/edge/);
      assert.match(prompt, /never project front\/hands through torso/);
    } else {
      assert.match(prompt, /A rear-facing holder keeping a document or device to their chest may naturally hide it behind their torso/);
      assert.match(prompt, /never project its front or hands through the back/);
    }
  }
});

test('single-speaker modified shoulder camera keeps the named foreground owner', () => {
  const modifiedShoulderScenario = scenario.replace(
    'extreme low angle, 25 degree Dutch tilt',
    'SpeakerAの反射帯付き安全ベストの肩越し、SpeakerBを見る。カメラはSpeakerBの背後へ回り込まない'
  ).replace(
    'SpeakerAが予定表を指さす。SpeakerBが答える。',
    'SpeakerBが背中を向けて胸元に記録票を抱える。'
  ).replace('SpeakerA「ここです。」', '');

  for (const provider of ['chatgpt', 'gemini']) {
    const prompt = build(provider, modifiedShoulderScenario);
    const panel = prompt.match(/## Panel 1[\s\S]*?(?=## Panel 2)/)[0];
    assert.match(panel, /EXPLICIT REAR CAMERA/);
    assert.match(panel, /camera is physically behind \[SpeakerA\]'s shoulder/);
    assert.match(panel, /OTS CAST INSTANCE LOCK:[^\n]*\[SpeakerA\]/);
    assert.doesNotMatch(panel, /camera is physically behind \[SpeakerB\]'s shoulder/);
  }
});

test('lettering is planned per beat and never promoted into an all-panel reading requirement', () => {
  const planning = getScenarioPrompt({ inputMode: 'manual', manualTopic: '二人が掲示を読んで荷物を運ぶ', targetDate: '2026-09-17', punchlineType: 'Auto', comedyTone: 'standard', customLocation: '', customOutfit: '', newsContext: '', ragReactions: '' });
  assert.match(planning, /証拠物の再登場.*全文を再読/);
  assert.match(planning, /読ませる文字列.*コマ.*状況/);
  assert.match(planning, /吹き出し.*カメラ/);

  const input = `VisualEvidence: 掲示板、台車\n${scenario}`
    .replace('SpeakerAが予定表を指さす。', 'SpeakerAが掲示板の「搬入口」を指さす。')
    .replace('SpeakerAが椅子を引く。', 'SpeakerAが台車を引く。背景に同じ掲示板の側面が見える。');
  for (const provider of ['chatgpt', 'gemini']) {
    const prompt = build(provider, input);
    assert.match(prompt, /SCENE LETTERING:.*per-panel.*no cross-panel legibility requirement/);
    const panel1 = prompt.match(/## Panel 1[\s\S]*?(?=## Panel 2)/)[0];
    const panel2 = prompt.match(/## Panel 2[\s\S]*?(?=## Panel 3)/)[0];
    assert.match(panel1, /搬入口/);
    assert.match(panel1, /extreme low angle/);
    assert.match(panel2, /掲示板の側面/);
    assert.doesNotMatch(panel2, /搬入口/);
  }
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
  assert.match(getPanelShotExecution('overhead wide shot'), /head\/shoulder tops.*upper prop faces/);
  assert.match(getPanelShotExecution('floor-level low angle, full body'), /head-to-feet/);
  assert.match(getPanelShotExecution('floor-level low angle, full body'), /headroom and floor beyond BOTH shoes/);
  assert.match(getPanelShotExecution('floor-level low angle, full body'), /look up/);
  assert.match(getPanelShotExecution('全員の頭からつま先まで入る俯瞰'), /head-to-feet/);
  assert.match(getPanelShotExecution('足元から上半身まで見上げる'), /head-to-feet/);
  assert.doesNotMatch(getPanelShotExecution('顔の超アップ、ローアングル'), /head-to-feet/);
  for (const provider of ['chatgpt', 'gemini']) {
    const prompt = build(provider);
    assert.match(prompt, /SHOT EXECUTION:/);
    assert.match(prompt, /head\/shoulder tops/);
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
