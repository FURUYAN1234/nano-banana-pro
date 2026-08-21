import { getScenarioPanelBlocks } from './scenario-validation.js';

const EXPLICIT_AZIMUTH_RE = /(?:左(?:側|斜め|前|後ろ)?|右(?:側|斜め|前|後ろ)?|斜め(?:前|後ろ)?|肩越し|背後|背越し|後方|横顔|側面|over[ -]the[ -]shoulder|\bOTS\b|three-quarter|3\/4|front-left|front-right|rear(?:ward)?|side(?:ways)?|profile)/i;
const FORWARD_EXTENSION_GESTURE_RE = /(?:指(?:さ|差|し示)|point(?:s|ed|ing)?\b)|(?:(?:手|腕|拳|物|小道具).{0,18}(?:前方|手前|こちら|カメラ|レンズ|viewer|toward).{0,18}(?:突き出|伸ば|差し出|thrust|reach))|(?:(?:机|テーブル|卓|台|カウンター|床|壁|扉|ドア|演台|黒板|ボード|支持面).{0,18}(?:叩|打ち|殴|叩きつけ|slam|bang|strike))/iu;
const INTENTIONAL_GESTURE_REPETITION_RE = /(?:各コマ|全コマ|毎コマ|繰り返|反復|天丼|反復ギャグ|running[ -]?gag|repeat(?:ed|ing)?|recurring).{0,36}(?:指|手|腕|拳|叩|打|thrust|point|slam|gesture)|(?:指|手|腕|拳|叩|打|thrust|point|slam|gesture).{0,36}(?:繰り返|反復|天丼|running[ -]?gag|repeat(?:ed|ing)?|recurring)/iu;

const PANEL_AZIMUTH_SLOTS = [
  'LEFT-FRONT OBLIQUE: place the camera 35-55 degrees to the subject\'s left-front; turn shoulders and hips away from a square-on lens-facing pose.',
  'RIGHT-FRONT OBLIQUE: place the camera 35-55 degrees to the subject\'s right-front; put the nearer shoulder and hand visibly larger than the farther side.',
  'REAR THREE-QUARTER: place the camera behind one shoulder or 30-50 degrees toward the subject\'s rear; keep the face readable through a natural turn toward the scene partner or key action.',
  'DIAGONAL LEFT-FRONT: place the camera 30-50 degrees to the subject\'s left-front and combine it with the scripted tilt/elevation; keep the body axis diagonal rather than bilaterally centered.'
];

const COMPACT_PANEL_AZIMUTH_SLOTS = [
  'LEFT-FRONT OBLIQUE 35-55 degrees; unequal shoulder depth.',
  'RIGHT-FRONT OBLIQUE 35-55 degrees; near hand larger.',
  'REAR THREE-QUARTER 30-50 degrees; readable turned face and layered depth.',
  'DIAGONAL LEFT-FRONT 30-50 degrees; combine the scripted tilt/elevation with an asymmetric body axis.'
];

export const SCENARIO_COMPOSITION_VARIETY_RULES = `
             - **【水平方位・ポーズ多様化（通常生成で常時必須）】**:
               * 各[Camera:]タグには、ショット種類・高さ・傾きだけでなく、被写体に対する水平方位（左前斜め／右前斜め／背後寄り3/4／肩越し等）を物理的に明記せよ。
               * 4コマ中、真正面は最大1コマ。最低3種類の被写体基準の水平方位を使い、隣接コマで同じ左右方向を繰り返すな。ローアングル・俯瞰・ズームの違いだけを構図差として数えてはならない。
               * 明示指定がない通常生成ではアイレベルを原則禁止し、俯瞰、ローアングル、肩越し、斜め上下など物語に合う高さを選ぶ。ユーザーが明示したアイレベルや、正確な水平視点が物語上必要な場合は保持する。
               * 主役の肩・腰・顔を毎回カメラへ正対させるな。肩・腰・顔の向きに自然な差をつけ、身体を30〜60度ひねり、左右非対称で読みやすいシルエットを作れ。
               * 両手を使う動作では、Actionの内容と手の本数を保ったまま、左右の手に前後差・高さ差・役割差をつける。両手を同じ高さでレンズ側へ広げる左右対称ポーズを既定値にするな。
               * 明示されたユーザー構図や物語上必須の視線・Actionは上書きしない。構図多様化は同じ出来事を別の物理カメラ位置と身体軸で見せるために使う。`;

export const SCENARIO_GESTURE_VARIETY_RULES = `
             - **【身体演技・ジェスチャー反復抑制（通常生成で常時必須）】**:
               * キャラクター参照画像に写るポーズは顔・髪・衣装・体格の同一性資料であり、性格を示す定番動作ではない。参照ポーズを各コマのActionや決めポーズとして反復するな。
               * 4コマ全体で最低3種類の身体演技を使う。物を扱う、移動・重心移動、相手との受け渡し、環境へ働きかける、抑制した反応、動作後の余韻などを、物語の因果に合わせて選ぶ。
               * 指し示す、腕や手を正面へ大きく突き出す、支持面を叩く等を同じ「前方伸展ジェスチャー」系統として数え、この系統は4コマ中最大1コマにする。別キャラへ置き換えただけの反復も不可。
               * 指し示す、物を手前へ突き出す、支持面を叩く動作は、その対象と接触が物語上必要な場合だけ使う。権威、怒り、説明、ツッコミを表す既定ポーズとして自動追加しない。
               * 各Actionでは動作の直前・最中・直後のどの瞬間か、支持脚または着座面、重心、左右の手の役割、接触対象を具体化する。顔、重要な手、小道具が重ならない読みやすいシルエットを作る。
               * ユーザーが明示した動作は必ず保持する。反復抑制は、明示されていない定型ジェスチャーを発明しないために使う。`;

export const MANGA_COMPOSITION_VARIETY_LOCK = `MANGA CAMERA / POSE VARIETY LOCK:
- Across the four panels, use at least three distinct subject-relative azimuths. Differences in elevation, zoom, lens, or crop alone do not count as different azimuths.
- NO default eye-level shot. Unless an eye-level view is explicitly scripted or physically required by the story, use a motivated high, low, overhead, ground-level, or vertically oblique camera position.
- Use no more than one flat front-on panel. Unless direct address is explicitly scripted, do not square the main subject's face, shoulders, hips, and both hands toward the lens at the same time.
- Preserve every scripted Camera shot type, elevation, tilt, Action, prop, limb count, and eye-line. When the Camera lacks a horizontal azimuth, add the panel's COMPOSITION STAGING direction instead of replacing the scripted shot.
- Build asymmetrical silhouettes with a 30-60 degree torso turn, unequal shoulder depth, and clear near/mid/far layers. Alternate left-front, right-front, rear three-quarter, and over-the-shoulder depth across the page.
- For any two-handed action, keep exactly the scripted two hands but stagger the hands in depth and/or height. Give the two hands distinct physical roles when the Action permits; never default to both palms spread equally toward the viewer.
- Radial speed lines, centered impact VFX, or a screen-filling expression must follow the chosen oblique perspective and must not force bilateral front-facing symmetry.`;

export const MANGA_COMPOSITION_VARIETY_LOCK_COMPACT = 'MANGA CAMERA / POSE VARIETY LOCK: >=3 azimuths; NO default eye-level shot unless explicitly scripted or story-required; max 1 flat front-on panel; preserve camera/action/props/limbs; turn torso; stagger hands in depth/height; VFX follows angle.';

export const MANGA_GESTURE_VARIETY_LOCK = `BODY ACTING / GESTURE VARIETY LOCK:
- A reference-sheet pose is identity evidence, not a recurring action or personality signature. Reproduce identity and clothing, but derive acting from the current story beat.
- Across the four panels, use at least three physically distinct acting families. Use the same forward-extension gesture family in no more than one panel, even when assigned to different characters: pointing, thrusting a hand or object toward the lens, and striking a supporting surface all belong to that family.
- Preserve every explicitly scripted pointing, reaching, presenting, or surface impact action. Never replace it. When the script does not require one, do not invent a pointing pose, lens-facing hand thrust, symmetrical two-hand thrust, or surface strike as generic emphasis, anger, explanation, authority, or punchline acting.
- For each lead action, resolve the action phase, weight-bearing support, center of gravity, left/right hand roles, and contact target. Keep the face, important hands, and story prop readable in a clean asymmetrical silhouette.
- Prefer story-specific alternatives when compatible with Action: handling or exchanging a prop, stepping or turning with weight shift, changing distance to a scene partner, interacting with the environment, a restrained reaction, or the follow-through after an action.`;

export const MANGA_GESTURE_VARIETY_LOCK_COMPACT = 'BODY ACTING / GESTURE VARIETY LOCK: reference-sheet pose is identity evidence, not a recurring action; same forward-extension gesture family in no more than one panel; preserve explicitly scripted pointing/surface impact; action phase/support/contact.';

export const GESTURE_VARIETY_RETRY_INSTRUCTION = `BODY ACTING VARIETY RETRY:
The previous scenario repeated the same forward-extension gesture family across multiple panels. Preserve the topic, cast, dialogue, panel order, location, outfit, punchline type, and every user-explicit action. Keep a pointing, forward thrust, presentation, or surface impact only in the panel where the story physically requires it. Replace only the extra unscripted repetitions with story-specific acting from different families, such as prop handling or exchange, locomotion and weight shift, interpersonal distance change, environmental interaction, restrained reaction, or action follow-through. State the action phase, support, hand roles, and contact target without adding body distortion.`;

export const assertScenarioGestureVariety = ({
  scenario = '',
  punchlineType = '',
  protectedText = ''
} = {}) => {
  if (/RunningGag|天丼/iu.test(String(punchlineType))) return true;
  if (INTENTIONAL_GESTURE_REPETITION_RE.test(String(protectedText))) return true;

  const repeatedPanels = getScenarioPanelBlocks(scenario)
    .filter(({ found }) => found)
    .filter(({ text }) => {
      const visualDirectionOnly = String(text).replace(/「[^」]*」/gu, '');
      return FORWARD_EXTENSION_GESTURE_RE.test(visualDirectionOnly);
    })
    .map(({ num }) => num);

  if (repeatedPanels.length > 1) {
    const error = new Error('repeated_forward_extension_gesture');
    error.panels = repeatedPanels;
    throw error;
  }

  return true;
};

export const getPanelCompositionAssist = (panelText, panelNumber, { compact = false } = {}) => {
  if (EXPLICIT_AZIMUTH_RE.test(String(panelText || ''))) {
    return compact
      ? 'PRESERVE EXPLICIT AZIMUTH; keep a diagonal asymmetric body.'
      : 'PRESERVE EXPLICIT AZIMUTH: keep the scenario\'s named horizontal direction; retain a diagonal body axis and avoid flat bilateral symmetry unless direct address is explicitly scripted.';
  }

  const index = Math.max(0, (Number(panelNumber) || 1) - 1) % PANEL_AZIMUTH_SLOTS.length;
  return compact ? COMPACT_PANEL_AZIMUTH_SLOTS[index] : PANEL_AZIMUTH_SLOTS[index];
};
