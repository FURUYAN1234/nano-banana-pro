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

test('normal multi-speaker panels lock eye-lines to the interlocutor for both providers', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildPrompt(providerFamily, NORMAL_CONVERSATION);
    const panel = panelTwoSection(prompt);
    assert.match(prompt, /never lens\/front/i);
    assert.match(prompt, /STRICT SIDE OR REAR VIEW ONLY/i);
    assert.match(prompt, /far eye of every visible character fully hidden/i);
    assert.match(prompt, /two eyes are visible on anyone, redraw the whole panel/i);
    assert.match(prompt, /No exception for listeners\/reactors/i);
    assert.match(panel, /Camera: PURE 90° SIDE-ON/);
    assert.match(panel, /camera perpendicular to dialogue axis/i);
    assert.match(panel, /opposing sides face inward in profile/i);
    assert.match(panel, /NO OTS\/front/i);
    assert.match(panel, /EYE-LINE LOCK/);
    assert.match(panel, /opposing profiles/i);
    assert.match(panel, /pupils meet/i);
    assert.match(panel, /Camera yields/i);
  }
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
    assert.match(panel, /Camera: PURE 90° SIDE-ON/);
    assert.match(panel, /EYE-LINE LOCK/);
    assert.ok(panel.indexOf('EYE-LINE LOCK') > panel.indexOf('Camera:'));
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
    assert.match(panel, /\[SpeakerA\] profile → \[SpeakerB\]/);
    assert.match(panel, /listeners look back/);
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
    assert.match(panel, /strict inward profiles/);
    assert.match(panel, /no front/i);
  }
});
