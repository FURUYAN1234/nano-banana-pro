import assert from 'node:assert/strict';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';

let server;
let buildMangaPrompt;

before(async () => {
  server = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true }
  });
  ({ buildMangaPrompt } = await server.ssrLoadModule('/src/lib/prompt-assembler.js'));
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

test('normal multi-speaker panels keep interlocutor eye-lines while requiring depth and varied views for both providers', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildPrompt(providerFamily, NORMAL_CONVERSATION);
    const panel = panelTwoSection(prompt);
    assert.match(prompt, /never lens\/front/i);
    assert.match(prompt, /CONVERSATIONAL DEPTH BASE/i);
    assert.doesNotMatch(prompt, /STRICT SIDE OR REAR VIEW ONLY/i);
    assert.doesNotMatch(prompt, /far eye of every visible character fully hidden/i);
    assert.match(panel, /Camera:/);
    assert.doesNotMatch(panel, /PURE 90° SIDE-ON/);
    assert.match(panel, /three-quarter/i);
    assert.match(panel, /PRIMARY THREE-QUARTER/);
    assert.match(panel, /BACK-THREE-QUARTER OR OVER-THE-SHOULDER PARTNER/);
    assert.match(panel, /VISIBLE REAR DEPTH CHECK/);
    assert.match(panel, /back of \[SpeakerB\]'s head or shoulder(?: in)? foreground/i);
    assert.match(panel, /camera is physically behind \[SpeakerB\]'s shoulder/i);
    assert.match(panel, /EYE-LINE LOCK/);
    assert.match(panel, /address.*counterpart/i);
    assert.match(panel, /Camera preserves (?:the )?scenario direction/i);
  }
});

test('Gemini conversation panels end with a mandatory rear-foreground depth lock without changing the ChatGPT prompt', () => {
  const geminiPanel = panelTwoSection(buildPrompt('gemini', NORMAL_CONVERSATION));
  const chatgptPanel = panelTwoSection(buildPrompt('chatgpt', NORMAL_CONVERSATION));

  assert.match(geminiPanel, /GEMINI REAR-FOREGROUND LOCK \(ABSOLUTE\)/);
  assert.match(geminiPanel, /MUST occupy the foreground/);
  assert.match(geminiPanel, /Do NOT show \[SpeakerB\]'s face front-on/);
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
    assert.match(panel, /\[SpeakerA\].*(?:camera-visible|visible to camera|user\+camera|and camera)/i);
    assert.match(panel, /\[SpeakerB\].*(?:back\/edge|back or edge)/i);
    assert.match(panel, /Do NOT show \[SpeakerA\]'s face front-on/i);
    assert.match(panel, /read\/operate=self/i);
    assert.match(panel, /submit\/present\/show=recipient/i);
    assert.match(panel, /SpeakerA.*reads\/operates.*front\+UI camera-visible/i);
  }
});

test('an explicit presentation targets the recipient rather than the holder or camera', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const panel = panelTwoSection(buildPrompt(providerFamily, EXPLICIT_SHOULDER_PRESENTATION));
    assert.match(panel, /submit\/present\/show=recipient/i);
    assert.match(panel, /derive visibility from recipient side/i);
    assert.doesNotMatch(panel, /SpeakerA.*reads\/operates.*front\+UI camera-visible/i);
  }
});

test('Japanese screen-viewing action keeps the screen front visible from the named shoulder camera', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const panel = panelTwoSection(buildPrompt(providerFamily, EXPLICIT_SHOULDER_JAPANESE_VIEW));
    assert.match(panel, /EXPLICIT REAR CAMERA/i);
    assert.match(panel, /SpeakerA.*reads\/operates.*front\+UI camera-visible/i);
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

test('every panel receives a local functional-surface projection check', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildPrompt(providerFamily, NORMAL_CONVERSATION);
    assert.equal((prompt.match(/FUNCTIONAL SURFACE PANEL CHECK:/g) || []).length, 4);
    assert.match(prompt, /solve target-to-front\/back geometry before projection/i);
  }
});
