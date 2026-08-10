const EXPLICIT_AZIMUTH_RE = /(?:左(?:側|斜め|前|後ろ)?|右(?:側|斜め|前|後ろ)?|斜め(?:前|後ろ)?|肩越し|背後|背越し|後方|横顔|側面|over[ -]the[ -]shoulder|\bOTS\b|three-quarter|3\/4|front-left|front-right|rear(?:ward)?|side(?:ways)?|profile)/i;

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
               * 主役の肩・腰・顔を毎回カメラへ正対させるな。肩・腰・顔の向きに自然な差をつけ、身体を30〜60度ひねり、左右非対称で読みやすいシルエットを作れ。
               * 両手を使う動作では、Actionの内容と手の本数を保ったまま、左右の手に前後差・高さ差・役割差をつける。両手を同じ高さでレンズ側へ広げる左右対称ポーズを既定値にするな。
               * 明示されたユーザー構図や物語上必須の視線・Actionは上書きしない。構図多様化は同じ出来事を別の物理カメラ位置と身体軸で見せるために使う。`;

export const MANGA_COMPOSITION_VARIETY_LOCK = `MANGA CAMERA / POSE VARIETY LOCK:
- Across the four panels, use at least three distinct subject-relative azimuths. Differences in elevation, zoom, lens, or crop alone do not count as different azimuths.
- Use no more than one flat front-on panel. Unless direct address is explicitly scripted, do not square the main subject's face, shoulders, hips, and both hands toward the lens at the same time.
- Preserve every scripted Camera shot type, elevation, tilt, Action, prop, limb count, and eye-line. When the Camera lacks a horizontal azimuth, add the panel's COMPOSITION STAGING direction instead of replacing the scripted shot.
- Build asymmetrical silhouettes with a 30-60 degree torso turn, unequal shoulder depth, and clear near/mid/far layers. Alternate left-front, right-front, rear three-quarter, and over-the-shoulder depth across the page.
- For any two-handed action, keep exactly the scripted two hands but stagger the hands in depth and/or height. Give the two hands distinct physical roles when the Action permits; never default to both palms spread equally toward the viewer.
- Radial speed lines, centered impact VFX, or a screen-filling expression must follow the chosen oblique perspective and must not force bilateral front-facing symmetry.`;

export const MANGA_COMPOSITION_VARIETY_LOCK_COMPACT = 'MANGA CAMERA / POSE VARIETY LOCK: use at least three subject-relative azimuths; no more than one flat front-on panel; preserve scripted camera/action/props/limb count; turn the torso 30-60 degrees; stagger two hands in depth/height; centered VFX follows the oblique angle.';

export const getPanelCompositionAssist = (panelText, panelNumber, { compact = false } = {}) => {
  if (EXPLICIT_AZIMUTH_RE.test(String(panelText || ''))) {
    return compact
      ? 'PRESERVE EXPLICIT AZIMUTH; keep a diagonal asymmetric body.'
      : 'PRESERVE EXPLICIT AZIMUTH: keep the scenario\'s named horizontal direction; retain a diagonal body axis and avoid flat bilateral symmetry unless direct address is explicitly scripted.';
  }

  const index = Math.max(0, (Number(panelNumber) || 1) - 1) % PANEL_AZIMUTH_SLOTS.length;
  return compact ? COMPACT_PANEL_AZIMUTH_SLOTS[index] : PANEL_AZIMUTH_SLOTS[index];
};
