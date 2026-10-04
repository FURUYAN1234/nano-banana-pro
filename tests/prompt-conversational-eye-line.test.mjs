import assert from 'node:assert/strict';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';
import { readFile } from 'node:fs/promises';

let server;
let buildMangaPrompt;
let getCameraForPanel;
let buildPanelEyeLineRule;
let extractDialogueOnly;
let extractCastLimitRule;

before(async () => {
  server = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true }
  });
  ({ buildMangaPrompt } = await server.ssrLoadModule('/src/lib/prompt-assembler.js'));
  ({ getCameraForPanel, buildPanelEyeLineRule, extractDialogueOnly, extractCastLimitRule } = await server.ssrLoadModule('/src/lib/panel-utils.js'));
});

after(async () => {
  await server?.close();
});

const CAST_LIST = `
## SpeakerA
- short dark hair, no glasses
## SpeakerB
- long blonde hair, glasses
`;

const makeScenario = (panelTwo) => `
## Title: Editorial Meeting
Location: meeting room
Outfit: office casual

[1コマ目: 起]
[EMOTION: NORMAL]
Action: SpeakerA reviews a draft alone.
SpeakerA「The first page needs work.」

[2コマ目: 承]
[EMOTION: NORMAL]
${panelTwo}

[3コマ目: 転]
[EMOTION: NORMAL]
Action: SpeakerB checks the next page alone.
SpeakerB「The pacing changes here.」

[4コマ目: 結]
[EMOTION: NORMAL]
Action: SpeakerA closes the draft alone.
SpeakerA「Let us revise it.」
`;

const buildPrompt = (providerFamily, panelTwo) => buildMangaPrompt({
  scenario: makeScenario(panelTwo),
  castList: CAST_LIST,
  colorMode: 'color',
  providerFamily,
  punchlineType: 'Auto',
  systemVersion: 'v4.8.7-test'
});

const panelTwoSection = (prompt) =>
  prompt.match(/## Panel 2[\s\S]*?(?=## Panel 3)/)?.[0] || '';

const NORMAL_CONVERSATION = `
[Camera: Aesthetic Thirds]
Action: SpeakerA and SpeakerB sit opposite one another and discuss the draft.
SpeakerA「What do you think of this scene?」
SpeakerB「The emotion should be clearer.」`;

test('dialogue order never assigns actors to horizontal slots, including depth-only and unspecified staging', () => {
  for (const camera of ['SpeakerAの肩越し。SpeakerBとSpeakerCは奥で別々の資料を見る', 'Aesthetic Thirds']) {
    const scene = `[Camera: ${camera}]\nAction: SpeakerA shows a draft; SpeakerB checks it; SpeakerC listens.\nSpeakerA「確認して。」\nSpeakerB「ここだね。」\nSpeakerC「分かった。」`;
    for (const providerFamily of ['chatgpt', 'gemini']) {
      const prompt = buildMangaPrompt({scenario: makeScenario(scene), castList: CAST_LIST + '\n## SpeakerC\n- short red hair, no glasses', providerFamily, colorMode: 'color'});
      const panel = panelTwoSection(prompt);
      assert.doesNotMatch(panel, /SPEAKER X:|SPEAKER HORIZONTAL ORDER|3-ZONE|BODY POSITION LOCK|RIGHT ZONE:/);
      // Shared staging policy may be deduplicated into PROMPT PRIORITY.
      assert.match(prompt, /(?:never|not) (?:derive|assign).*body positions.*dialogue order/i);
      assert.match(panel, /B1.*RIGHTMOST|B1 rightmost/);
      assert.match(panel, /B2.*LEFT OF B1|B2\/B3\+ strictly leftward/);
      assert.match(panel, /TAIL TIP LOCK[^\n]*\[SpeakerA\].*\[SpeakerB\].*\[SpeakerC\]/);
    }
  }
});

test('keeps an explicit Japanese gaze target instead of forcing all speakers to face one another', () => {
  const scene = `[Camera: 左奥からの超広角。手前のSpeakerAと奥のSpeakerBを捉える。]
状況: SpeakerAは札を掲げてSpeakerBを見る。SpeakerBは机の資料を見る。
SpeakerA「確認してください。」
SpeakerB「読んでいます。」`;
  for (const provider of ['chatgpt', 'gemini']) {
    const panel = panelTwoSection(buildPrompt(provider, scene));
    assert.match(panel, /keep each actor's scripted gaze target/);
    assert.doesNotMatch(panel, /\[SpeakerA\] ↔ \[SpeakerB\]|reactors watch the active speaker/);
  }
});

test('named rear camera and screen positions override dialogue-order staging', () => {
  for (const rear of ['SpeakerAの左後方', 'SpeakerAの右後ろ', 'from behind SpeakerA']) {
    const scene = `[Camera: Over The Shoulder／${rear}、肩の高さからの中景。SpeakerAの横顔を左手前、SpeakerBの顔を右奥に置く]
Action: SpeakerA operates the screen and turns toward SpeakerB. SpeakerB replies.
SpeakerA「確認しよう。」
SpeakerB「そうだね。」`;
    for (const provider of ['chatgpt', 'gemini']) {
      const panel = panelTwoSection(buildPrompt(provider, scene));
      assert.match(panel, /camera is physically behind \[SpeakerA\]'s shoulder/i);
      assert.doesNotMatch(panel, /camera is physically behind \[SpeakerB\]'s shoulder/i);
      assert.doesNotMatch(panel, /RIGHT \[SpeakerA\]|RIGHT side: \[SpeakerA\]|RIGHT ZONE: \[SpeakerA\]/);
      assert.match(panel, /左手前/);
      assert.match(panel, /\[SpeakerA\].*(?:sole instance|one and only instance)/);
    }
  }
});

test('OTS preserves independent scripted gaze and rear ownership without forcing mutual acting', () => {
  for (const camera of ['SpeakerAの肩越し、奥の資料を捉える', 'Over The Shoulder']) {
    const scene = `[Camera: ${camera}]
状況: SpeakerAは手前で資料を見る。SpeakerBは奥から時計を見上げる。
SpeakerA「読み終わるまで待って。」
SpeakerB「もう時間だよ。」`;
    for (const provider of ['chatgpt', 'gemini']) {
      const panel = panelTwoSection(buildPrompt(provider, scene));
      assert.match(panel, /keep each actor's scripted gaze target/);
      assert.match(panel, /camera is physically behind/);
      assert.doesNotMatch(panel, /address counterparts|address their counterparts|reactors watch|PRIMARY THREE-QUARTER toward|PARTNER toward/);
      if (camera.startsWith('SpeakerA')) assert.match(panel, /behind \[SpeakerA\]'s shoulder/);
    }
  }
});

test('a distant rear camera does not invent an over-the-shoulder foreground', () => {
  const scene = `[Camera: SpeakerAの後方から全身を小さく入れる遠景]
Action: SpeakerA speaks to SpeakerB across an empty courtyard.
SpeakerA「遠くまで来たね。」
SpeakerB「戻ろうか。」`;
  for (const provider of ['chatgpt', 'gemini']) {
    const panel = panelTwoSection(buildPrompt(provider, scene));
    assert.doesNotMatch(panel, /VISIBLE REAR DEPTH CHECK|OTS CAST INSTANCE LOCK|GEMINI REAR-FOREGROUND LOCK/);
  }
});

test('the supplied four-panel scenario preserves camera geometry and closing lettering through assembly', async () => {
  const scenario = await readFile(new URL('./fixtures/camera-lettering-conflict-scenario.txt', import.meta.url), 'utf8');
  const castList = '## ミク\n- blonde hair, no glasses\n## リン\n- brown twin tails, glasses\n## サエコ\n- black hair, no glasses\n## アカリ\n- orange bob, no glasses\n## ヒカリ\n- blonde bob, glasses';
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildMangaPrompt({ scenario, castList, colorMode: 'color', providerFamily, punchlineType: 'Auto', systemVersion: 'v6.3.0-test' });
    const first = prompt.match(/## Panel 1[\s\S]*?(?=## Panel 2)/)[0];
    const third = prompt.match(/## Panel 3[\s\S]*?(?=## Panel 4)/)[0];
    const last = prompt.split('## Panel 4')[1];
    assert.match(first, /camera is physically behind \[ミク\]'s shoulder/);
    assert.doesNotMatch(first, /RIGHT \[ミク\]|RIGHT side: \[ミク\]|physically behind \[ヒカリ\]/);
    assert.match(third, /頭から両足先まで/);
    assert.doesNotMatch(third, /(?:FG only|FOREGROUND MUST CONTAIN ONLY): \[ミク\] and \[ヒカリ\]/);
    assert.doesNotMatch(prompt, /\[画面文字\]/);
    assert.match(last, /Action[^\n]*本作は公開範囲の調整中に打ち切りとなりました。/);
    assert.doesNotMatch(last.split('Dialogue (')[1], /本作は公開範囲/);
    assert.match(last.split('Dialogue (')[1], /続きは非公開で。/);
    for (const camera of scenario.matchAll(/\[Camera: ([^\]]+)\]/g)) assert.ok(prompt.includes(camera[1]));
  }
});

test('explicit foreground and background depths do not become a row of speakers', () => {
  const scene = `[Camera: Hyper Perspective／床からの低い引き。手前のSpeakerAを大きく、奥のSpeakerBを小さく見せる]
Action: SpeakerA crouches and speaks to SpeakerB, who reacts from the far side.
SpeakerA「ここへ隠れよう。」
SpeakerB「見えているよ。」`;
  for (const provider of ['chatgpt', 'gemini']) {
    const panel = panelTwoSection(buildPrompt(provider, scene));
    assert.doesNotMatch(panel, /(?:FG only|FOREGROUND MUST CONTAIN ONLY): \[SpeakerA\] and \[SpeakerB\]/);
    assert.match(panel, /each EXACTLY ONCE|each appears EXACTLY ONCE/);
    assert.match(panel, /exactly 2 people|EXACTLY 2 distinct individuals|TOTAL 2 people; no others/i);
    assert.doesNotMatch(panel, /Slots fixed|BODY POSITION LOCK/);
  }
});

test('scene lettering stays in Action and never becomes a speaker, eye-line target or bubble', () => {
  for (const label of ['画面文字', '画面内文字', '字幕', 'テロップ', 'Screen text', 'Caption']) {
    const scene = `[Camera: Bokeh Depth／腰の高さからの引き]
Action: SpeakerA closes a curtain and turns toward SpeakerB, who silently reacts. Place the caption on the curtain.
${label}: 「公開の準備中です。」
SpeakerA「また明日。」`;
    for (const provider of ['chatgpt', 'gemini']) {
      const panel = panelTwoSection(buildPrompt(provider, scene));
      const dialogue = panel.split('Dialogue (')[1] || '';
      const eyeLine = panel.match(/EYE-LINE LOCK:[^\n]*/)?.[0] || '';
      assert.doesNotMatch(dialogue, /公開の準備中です。/);
      assert.ok(!eyeLine.includes(`[${label}]`), eyeLine);
      assert.ok(!panel.includes(`[${label}]`), label);
      assert.match(panel, /Action[^\n]*公開の準備中です。/);
      assert.match(dialogue, /また明日。/);
    }
  }
});

const DIRECT_ADDRESS = `
[Camera: Eye-level medium shot]
Action: SpeakerA turns to the in-story livestream camera and directly addresses the viewers while SpeakerB monitors the broadcast.
SpeakerA「Viewers, please listen.」
SpeakerB「We are live.」`;

const VIEWER_CAMERA_WITH_NORMAL_DIALOGUE = `
[Camera: Innocent High, looking up at viewer]
Action: SpeakerA and SpeakerB sit opposite one another and discuss the draft.
SpeakerA「Does this panel read clearly?」
SpeakerB「Move the reaction closer.」`;

const CAMERA_FACING_PROHIBITED = `
[Camera: Eye-level medium shot]
Action: SpeakerA and SpeakerB speak to each other. 画面正面を向かせるのは厳禁。お互いに視線を合わせる。
SpeakerA「この流れで進めますか？」
SpeakerB「互いの表情を確認しましょう。」`;

const SINGLE_SPEAKER = `
[Camera: Aesthetic Thirds]
Action: SpeakerA studies the draft alone.
SpeakerA「I need another pass.」`;

const SINGLE_SPEAKER_WITH_REACTOR = `
[Camera: Over The Shoulder]
Action: SpeakerA turns toward SpeakerB and asks for a decision. SpeakerB reacts in stunned silence.
SpeakerA「Will you approve this version?」`;

const SINGLE_SPEAKER_WITH_GROUP_REACTION = `
[Camera: Over The Shoulder]
Action: SpeakerA shouts across the meeting table. The editors react in stunned silence.
SpeakerA「This meeting is over!」`;

const SINGLE_SPEAKER_WITH_NUMBERED_GROUP_REACTION = `
[Camera: Dominant Low]
Action: SpeakerAが叫び、編集者4人は床に座って反応する。
SpeakerA「会議は終わりです！」`;

const EXPLICIT_USER_STAGING = `
[Camera: Aesthetic Thirds]
Action: SpeakerA and SpeakerB discuss the draft.
[USER STAGING LOCK - ABSOLUTE]: SpeakerBはSpeakerAの方に話しかける。互いに視線を合わせ、画面正面は禁止。
SpeakerB「確認してください。」`;

const EXPLICIT_SHOULDER_CAMERA = `
[Camera: SpeakerAの肩越し、スマホ画面越しにSpeakerBの顔が見える俯瞰]
Action: SpeakerA reads and operates a smartphone while SpeakerB leans in and answers.
SpeakerA「いま確認している。」
SpeakerB「確認しました。」`;

const EXPLICIT_FOREGROUND_SHOULDER_CAMERA = `
[Camera: 左後方の肩越し。手前のSpeakerAの肩と横顔を大きく、奥の画面を見せる]
Action: SpeakerA points at the screen and turns toward SpeakerB. SpeakerB answers from across the aisle.
SpeakerA「この数字を見て。」
SpeakerB「確認した。」`;

const EXPLICIT_SHOULDER_PRESENTATION = `
[Camera: SpeakerAの肩越し、SpeakerBを見る中景]
Action: SpeakerA presents the smartphone screen to SpeakerB for inspection.
SpeakerA「この画面を見て。」
SpeakerB「確認しました。」`;

const EXPLICIT_SHOULDER_JAPANESE_VIEW = `
[Camera: SpeakerAの肩越し、スマホ画面越しにSpeakerBを見る俯瞰]
Action: SpeakerAがスマホを両手で持ち、画面を見る。SpeakerBは机の向こうから答える。
SpeakerA「いま見ている。」
SpeakerB「確認しました。」`;

const EXPLICIT_OVERHEAD_DETAIL_CAMERA = `
[Camera: SpeakerAの手元から真上寄り、書類とスタンプを強調する超接写]
Action: SpeakerA stamps a document while SpeakerB watches from across the counter.
SpeakerA「確認します。」
SpeakerB「お願いします。」`;

test('normal multi-speaker panels keep eye-lines without imposing a shoulder viewpoint', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildPrompt(providerFamily, NORMAL_CONVERSATION);
    const panel = panelTwoSection(prompt);
    assert.match(prompt, /never lens\/front/i);
    assert.match(prompt, /CONVERSATIONAL DEPTH BASE/i);
    assert.doesNotMatch(prompt, /STRICT SIDE OR REAR VIEW ONLY/i);
    assert.doesNotMatch(prompt, /far eye of every visible character fully hidden/i);
    assert.match(panel, /Camera:/);
    assert.doesNotMatch(panel, /PURE 90° SIDE-ON/);
    assert.match(panel, /three-quarter|RIGHT-FRONT OBLIQUE/i);
    assert.match(panel, /VIEWPOINT FREEDOM/);
    assert.doesNotMatch(panel, /VISIBLE REAR DEPTH CHECK|DEPTH ASSIGNMENT \(REQUIRED\)/);
    assert.match(panel, /EYE-LINE LOCK/);
    assert.match(panel, /address.*counterpart/i);
    assert.match(panel, /Camera preserves (?:the )?scenario direction|Script camera wins|VIEWPOINT FREEDOM: exact Camera projection/i);
  }
});

test('only explicit shoulder cameras receive Gemini rear-foreground depth locks', () => {
  const geminiPanel = panelTwoSection(buildPrompt('gemini', EXPLICIT_SHOULDER_CAMERA));
  assert.doesNotMatch(panelTwoSection(buildPrompt('gemini', NORMAL_CONVERSATION)), /GEMINI REAR-FOREGROUND LOCK/);
  const chatgptPanel = panelTwoSection(buildPrompt('chatgpt', NORMAL_CONVERSATION));

  assert.match(geminiPanel, /GEMINI REAR-FOREGROUND LOCK \(ABSOLUTE\)/);
  assert.match(geminiPanel, /MUST occupy the foreground/);
  assert.match(geminiPanel, /Do NOT show \[SpeakerA\]'s face front-on/);
  assert.doesNotMatch(chatgptPanel, /GEMINI REAR-FOREGROUND LOCK \(ABSOLUTE\)/);
});

test('explicit direct address preserves intentional camera-facing staging', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const panel = panelTwoSection(buildPrompt(providerFamily, DIRECT_ADDRESS));
    assert.match(panel, /DIRECT-ADDRESS EXCEPTION/);
    assert.doesNotMatch(panel, /EYE-LINE LOCK/);
  }
});

test('a viewer-facing camera angle alone does not bypass the conversation lock', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const panel = panelTwoSection(buildPrompt(providerFamily, VIEWER_CAMERA_WITH_NORMAL_DIALOGUE));
    assert.doesNotMatch(panel, /looking up at viewer/i);
    assert.match(panel, /Camera:/);
    assert.doesNotMatch(panel, /PURE 90° SIDE-ON/);
    assert.match(panel, /EYE-LINE LOCK/);
    assert.match(panel, /never lens\/front/i);
  }
});

test('camera-facing prohibition text is not mistaken for a direct-address exception', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const panel = panelTwoSection(buildPrompt(providerFamily, CAMERA_FACING_PROHIBITED));
    assert.match(panel, /EYE-LINE LOCK/);
    assert.doesNotMatch(panel, /DIRECT-ADDRESS EXCEPTION/);
  }
});

test('a negated camera target beside a separate actor gaze never grants direct address', () => {
  for (const action of [
    'SpeakerBは資料を見つめる。SpeakerAは時計を見る。誰も読者やカメラを見ない。',
    'SpeakerB gazes at the document. SpeakerA looks at the clock. No one looks into the camera.',
  ]) {
    for (const provider of ['chatgpt', 'gemini']) {
      const panel = panelTwoSection(buildPrompt(provider, `[Camera: SpeakerAの肩越し]\nAction: ${action}\nSpeakerA「時間だよ。」\nSpeakerB「待って。」`));
      assert.doesNotMatch(panel, /DIRECT-ADDRESS EXCEPTION/);
      assert.match(panel, /keep each actor's scripted gaze target/);
      assert.match(panel, /camera is physically behind \[SpeakerA\]/);
    }
  }
});

test('single-speaker non-direct-address panels do not invent an interlocutor', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const panel = panelTwoSection(buildPrompt(providerFamily, SINGLE_SPEAKER));
    assert.doesNotMatch(panel, /EYE-LINE LOCK|DIRECT-ADDRESS EXCEPTION/);
  }
});

test('single-speaker panels with an explicit cast interlocutor or reactor still lock mutual staging', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const panel = panelTwoSection(buildPrompt(providerFamily, SINGLE_SPEAKER_WITH_REACTOR));
    assert.match(panel, /EYE-LINE LOCK/);
    assert.match(panel, /\[SpeakerA\] addresses \[SpeakerB\]/);
    assert.match(panel, /listeners look back/);
    assert.match(panel, /\[SpeakerA\] PRIMARY THREE-QUARTER/);
    assert.match(panel, /\[SpeakerB\] BACK-THREE-QUARTER OR OVER-THE-SHOULDER PARTNER/);
    assert.doesNotMatch(panel, /DIRECT-ADDRESS EXCEPTION/);
  }
});

test('single-speaker panels with an explicit listener group still lock conversational staging', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const panel = panelTwoSection(buildPrompt(providerFamily, SINGLE_SPEAKER_WITH_GROUP_REACTION));
    assert.match(panel, /EYE-LINE LOCK/);
    assert.match(panel, /described listener group/);
    assert.match(panel, /group looks back/);
  }
});

test('numbered Japanese listener groups receive the same automatic eye-line lock', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const panel = panelTwoSection(buildPrompt(providerFamily, SINGLE_SPEAKER_WITH_NUMBERED_GROUP_REACTION));
    assert.match(panel, /EYE-LINE LOCK/);
    assert.match(panel, /described listener group/);
  }
});

test('explicit user staging derives opposing conversation sides from cast names', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const panel = panelTwoSection(buildPrompt(providerFamily, EXPLICIT_USER_STAGING));
    assert.match(panel, /SIDES> \[SpeakerA\] ↔ \[SpeakerB\]/);
    assert.match(panel, /three-quarter or rear\/OTS staging/);
    assert.match(panel, /never lens\/front/i);
  }
});

test('an explicit over-the-shoulder subject controls the rear foreground instead of dialogue order', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const panel = panelTwoSection(buildPrompt(providerFamily, EXPLICIT_SHOULDER_CAMERA));
    assert.match(panel, /camera is physically behind \[SpeakerA\]'s shoulder/i);
    assert.match(panel, /EXPLICIT REAR CAMERA/i);
    assert.match(panel, /back of \[SpeakerA\]'s head or shoulder(?: in)? foreground/i);
    assert.doesNotMatch(panel, /camera is physically behind \[SpeakerB\]'s shoulder/i);
    assert.match(panel, /OTS FUNCTIONAL FACE CONSEQUENCE:/);
    assert.match(panel, /Use the reader\/operator or recipient explicitly described in Action/);
    assert.match(panel, /derive visible front\/back\/edge from those relations/);
    assert.match(panel, /Do NOT show \[SpeakerA\]'s face front-on/i);
    assert.match(panel, /read\/operate=self/i);
    assert.match(panel, /submit\/present\/show=recipient/i);
    assert.doesNotMatch(panel, /\[SpeakerA\] reads\/operates|\[SpeakerB\] is across the object/);
  }
});

test('a named foreground shoulder in Camera controls the rear foreground instead of dialogue order', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const panel = panelTwoSection(buildPrompt(providerFamily, EXPLICIT_FOREGROUND_SHOULDER_CAMERA));
    assert.match(panel, /camera is physically behind \[SpeakerA\]'s shoulder/i);
    assert.match(panel, /back of \[SpeakerA\]'s head or shoulder(?: in)? foreground/i);
    assert.doesNotMatch(panel, /camera (?:is physically )?behind \[SpeakerB\](?:'s shoulder)?/i);
  }
});

test('a named over-the-shoulder subject is one foreground cast instance and never repeated in the background', () => {
  const castList = `
## Focus
- wavy blonde hair, no glasses
## Observer
- short blonde hair, glasses
## MemberA
- orange bob hair, no glasses
## MemberB
- brown twin tails, glasses
## MemberC
- long black hair, no glasses
`;
  const scenario = `
## Title: Policy Meeting
Location: meeting room
Outfit: casual wear

[1コマ目: 起]
[EMOTION: THINKING]
[Camera: Over Observer's shoulder, with Observer's rear head and shoulder at the lower-left edge]
Focus leans forward and speaks. Observer occupies the camera-side shoulder foreground. MemberA reads notes, MemberB holds a document, and MemberC thinks with folded arms.
Focus「What are we really protecting?」

[2コマ目: 承]
Action: MemberC writes on the board.
MemberC「Who benefits?」

[3コマ目: 転]
Action: MemberB studies the document.
MemberB「This happened before.」

[4コマ目: 結]
Action: MemberA lowers their eyes.
MemberA「The loudest voice wins.」`;

  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildMangaPrompt({
      scenario,
      castList,
      colorMode: 'color',
      providerFamily,
      punchlineType: 'Documentary',
      systemVersion: 'v5.3.4-test'
    });
    const panel = prompt.match(/## Panel 1[\s\S]*?(?=## Panel 2)/)?.[0] || '';

    assert.match(panel, /(?:CAST LIMIT: (?:main )?focus \[Focus\]\.|CRITICAL CAST PLACEMENT: Ensure \[Focus\] are the main focus\.)/);
    assert.match(panel, /(?:FG|FG only|FOREGROUND MUST CONTAIN ONLY): \[Observer\]\./);
    assert.match(panel, /(?:BG|BG only|BACKGROUND MUST CONTAIN ONLY): \[Focus\], \[MemberA\], \[MemberB\], \[MemberC\]\./);
    assert.match(panel, /OTS CAST INSTANCE LOCK:.*\[Observer\].*(?:sole instance|one and only instance)/i);
    assert.doesNotMatch(panel, /(?:BG only|BACKGROUND MUST CONTAIN ONLY):[^\n]*\[Observer\]/);
    assert.match(panel, /(?:NO OTHER HUMANS: exactly 5 people|NO OTHERS: total 5 people|TOTAL 5 people; no others|Total EXACTLY 5 distinct individuals)\./);
  }
});

test('an explicit presentation targets the recipient rather than the holder or camera', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const panel = panelTwoSection(buildPrompt(providerFamily, EXPLICIT_SHOULDER_PRESENTATION));
    assert.match(panel, /submit\/present\/show=recipient/i);
    assert.match(panel, /recipient explicitly described in Action/);
    assert.doesNotMatch(panel, /SpeakerA.*reads\/operates.*front\+UI camera-visible/i);
  }
});

test('Japanese screen-viewing action keeps the screen front visible from the named shoulder camera', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const panel = panelTwoSection(buildPrompt(providerFamily, EXPLICIT_SHOULDER_JAPANESE_VIEW));
    assert.match(panel, /EXPLICIT REAR CAMERA/i);
    assert.doesNotMatch(panel, /\[SpeakerA\] reads\/operates|\[SpeakerB\] is across the object/);
  }
});

test('an explicit overhead hand-detail camera is not replaced with an invented rear shoulder', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const panel = panelTwoSection(buildPrompt(providerFamily, EXPLICIT_OVERHEAD_DETAIL_CAMERA));
    assert.match(panel, /手元から真上寄り/);
    assert.match(panel, /EXPLICIT DETAIL CAMERA LOCK/);
    assert.doesNotMatch(panel, /camera is physically behind \[SpeakerB\]'s shoulder/i);
    assert.doesNotMatch(panel, /VISIBLE REAR DEPTH CHECK/);
  }
});

test('all panels share the full functional-surface contract after redundant reminders are removed', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildPrompt(providerFamily, NORMAL_CONVERSATION);
    assert.ok([0, 4].includes((prompt.match(/FUNCTIONAL SURFACE PANEL CHECK:/g) || []).length));
    assert.match(prompt, /FUNCTIONAL SURFACE ORIENTATION LOCK:/);
    assert.match(prompt, /FUNCTIONAL SURFACE ORIENTATION LOCK:/);
    assert.match(prompt, /Front=target; opposite=back|Front faces actual operator\/customer\/reader/i);
  }
});

test('Gemini lens conversion preserves the literal shoulder owner and viewing direction', () => {
  for (const camera of [
    'Observerの背後、右肩越しに画面を見る',
    'Over The Shoulder from behind the customer reading the form',
    '俯瞰、操作者の背中側からキーボードと画面を見る',
  ]) {
    const result = getCameraForPanel(`[Camera: ${camera}]\nAction: read the existing display`, ['unused fallback'], { index: 0 });
    assert.ok(result.startsWith(camera + '; '), result);
    assert.match(result, /NEVER draw text of camera names/);
  }
});


test('OTS aliases resolve one canonical actor across gaze, tail and cast', () => {
  const cast = '## 甲（Alpha）\n- adult\n## 乙 (Beta)\n- adult';
  for (const name of ['甲','Alpha','alpha','ALPHA']) {
    const panel = `[Camera: ${name}の右肩越し、広角、ダッチアングル]\n状況: 甲は画面を見つめて操作する。乙は左奥でカードを動かす。\n甲「確認しよう。」\n乙「了解。」`;
    const rule = buildPanelEyeLineRule(panel,cast);
    assert.match(rule, /behind \[甲\]'s shoulder/);
    assert.doesNotMatch(rule, /behind \[(?:Alpha|乙)\]'s shoulder/);
    assert.doesNotMatch(rule, /is across the object|\[甲\] reads\/operates/);
    assert.match(extractDialogueOnly(panel,cast,{forImagePrompt:true}), /B1=>\[甲\] visible rear-head contour/);
    assert.doesNotMatch(extractCastLimitRule(panel,cast), /\[Alpha\]/);
  }
});

test('unknown, colliding and partial camera names cannot fall back to the second speaker', () => {
  for (const [name,cast] of [
    ['ObserverX','## 甲 (Alpha)\n## 乙 (Beta)'],
    ['Alpha','## 甲 (Alpha)\n## 乙 (Alpha)'],
    ['SuperAlpha','## 甲 (Alpha)\n## 乙 (Beta)']
  ]) {
    const panel = `[Camera: ${name}の右肩越し]\n状況: 甲は画面を見つめる。乙はカードを見る。\n甲「一。」\n乙「二。」`;
    assert.doesNotMatch(buildPanelEyeLineRule(panel,cast), /behind \[(?:甲|乙|Alpha)\]'s shoulder/);
    assert.match(buildPanelEyeLineRule(panel,cast), /never assign.*dialogue order/i);
    assert.doesNotMatch(extractDialogueOnly(panel,cast,{forImagePrompt:true}), /mouth\/head/);
  }
});


test('camera, temporal gaze, focal depth and expressive linework survive aliases and balloon order', () => {
  const cast='## 甲 (Alpha)\n- adult\n## 乙 (Beta)\n- adult\n## 丙 (Gamma)\n- adult';
  const beats=[
    '甲は右手前で乙に資料を示す。乙は左奥から資料を見る。丙は奥で画面を見る。',
    '乙は資料へ視線を移し、眉を上げて身を屈める。甲は背を伸ばして待つ。丙は画面を見つめる。',
    '甲は乙の顔を見る。乙の驚きを受けて口を開く。丙は画面を見つめる。',
    '乙は甲へ視線を戻して返す。甲は机へ手をついて受け止める。丙は画面を見つめる。'
  ];
  const cameras=['Alphaの右肩越し、左前上方の俯瞰、望遠', '右下からアオリ、広角、手前と奥の距離差', '後方から魚眼、ダッチアングル、寄りとズーム', '左前から引き、deep focus、奥まで見える'];
  for (const providerFamily of ['chatgpt','gemini']) for (const colorMode of ['color','monochrome']) for (const reverse of [false,true]) {
    const names=reverse ? ['乙','甲'] : ['甲','乙'];
    const source='## Title: 反応の連鎖\nLocation: 会議室\nOutfit: business casual\n'+beats.map((beat,i)=>`[${i+1}コマ目: 展開]\n[EMOTION: ${['NORMAL','WATERCOLOR','GEKIGA','CHIBI_GAG'][i]}]\n[Camera: ${cameras[i]}]\nBalloonLayout: ${JSON.stringify(names.map((speaker,j)=>({speaker,x:j?0.25:0.75,anchor:speaker+'の輪郭',route:'上の余白'})))}\n状況: ${beat} 主役の顔と重要な資料文字は明瞭。手前と奥は意図的に薄い線と低コントラスト。\n${names[0]}「確認。」\n${names[1]}「了解。」`).join('\n');
    const prompt=buildMangaPrompt({scenario:source,castList:cast,providerFamily,colorMode,systemVersion:'test',promptMaxChars:32000});
    beats.forEach((beat,i)=>{
      const panel=prompt.split(`## Panel ${i+1}`)[1].split(`## Panel ${i+2}`)[0];
      assert.ok(panel.includes(beat),`${providerFamily}/${i+1} action`);
      assert.ok(panel.includes(cameras[i]),`${providerFamily}/${i+1} camera`);
      assert.match(panel,/scripted gaze target/);
      assert.doesNotMatch(panel,/reactors watch the active speaker|is across the object/);
    });
    assert.match(prompt,/G-pen|G pen/i);
    assert.match(prompt,/FOCAL READABILITY|FOCUS PLAN/);
    assert.match(prompt,/RICH PANEL COMPOSITION|PAGE READING RHYTHM/);
  }
});


test('eye and head target clauses keep independent gaze instead of a speaker default', () => {
  for (const target of ['甲の目は画面へ、乙は資料を気にしている。','甲は画面を振り返る。乙は資料へ目を走らせる。','甲は端末を見据える。乙は資料を凝視する。','甲は窓を眺め、乙は手元を注視する。']) {
    const rule=buildPanelEyeLineRule(`[Camera: 斜めの広角]\n状況: ${target}\n甲「一。」\n乙「二。」`, '## 甲\n## 乙');
    assert.match(rule,/keep each actor.s scripted gaze target/);
    assert.doesNotMatch(rule,/reactors watch the active speaker/);
  }
});

test('cast counting uses speech entries even when every tail targets a visible contour', () => {
  const panel = '[Camera: ObserverXの右肩越し]\n甲「確認。」\n乙「了解。」';
  const result = extractCastLimitRule(panel, '甲、乙');
  assert.match(result, /\[甲\]/);
  assert.match(result, /\[乙\]/);
  assert.match(result, /2 (?:people|distinct individuals)/);
  assert.deepEqual(extractDialogueOnly(panel, '甲、乙', {asEntries: true, forImagePrompt: true}), [
    {speaker: '甲', text: '確認。'}, {speaker: '乙', text: '了解。'}
  ]);
  const invalid = panel + '\nBalloonLayout: [{"speaker":"甲","x":0.7,"anchor":"甲の輪郭","route":"上"}]';
  assert.throws(() => extractCastLimitRule(invalid, '甲、乙'), {code: 'BALLOON_LAYOUT_INVALID'});
  assert.throws(() => extractDialogueOnly(invalid, '甲、乙', {asEntries: true, forImagePrompt: true}), {code: 'BALLOON_LAYOUT_INVALID'});
});
