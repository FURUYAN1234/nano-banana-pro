import { getScenarioPanelBlocks } from './scenario-validation.js';

const PASSIVE_LINEUP_RE = /(?:横一列|一列.{0,12}(?:並|立)|(?:並|立).{0,12}一列|棒立ち|整列|記念写真|集合写真)/;
const PASSIVE_AUDIENCE_RE = /(?:無言.{0,12}(?:見守|眺め)|(?:見守|眺め).{0,12}無言|観客|拍手(?:している|するだけ)|ただ(?:立|並))/;

export const FINAL_PANEL_ACTIVE_STAGING_SCENARIO_CONTRACT = `【4コマ目の静止集合オチ抑制】
- シュール指定以外の4コマ目で、複数キャラを横一列・棒立ち・無言の観客列にして主役を見守らせるだけの構図は禁止する。
- 複数キャラを見せる場合は、主役と脇役を含めて少なくとも2人が、話の結果に関わる別々の物理アクションを行うこと。例: 渡す、貼る、指し示す、運ぶ、配る、押さえる、避ける、拾う。
- 前景・中景・後景に役割を分け、顔、シルエット、手と行動が読み取れるようにする。全員を同じ向き・同じポーズにしない。`;

export const FINAL_PANEL_ACTIVE_STAGING_IMAGE_LOCK = `FINAL-PANEL ACTIVE STAGING LOCK: For a non-surreal ending, never render a straight-line lineup, a static group portrait, or passive audience members merely watching the lead. When multiple characters are visible in panel 4, give at least two characters distinct physical action tied to the story result, staged across foreground, midground, and background. Keep faces, silhouettes, and hands readable; do not put every character in the same direction or pose.`;

export const FINAL_PANEL_ACTIVE_STAGING_RETRY_INSTRUCTION = `FINAL-PANEL STAGING RETRY:
The previous scenario ended with a passive multi-character tableau. Rewrite the complete scenario with the same topic, cast, dialogue requirements, four-panel structure, and selected punchline type. In panel 4, replace the straight-line or silent audience arrangement with story-specific, distinct physical actions across depth. Do not solve this by adding a generic pose or by making one lead move while everyone else watches.`;

export const assertActiveFinalPanelStaging = ({ scenario = '', punchlineType = '' } = {}) => {
  if (/^Surreal$|静寂型.{0,8}シュール/u.test(String(punchlineType))) return true;

  const finalPanel = getScenarioPanelBlocks(scenario).find((panel) => panel.num === 4)?.text || '';
  if (PASSIVE_LINEUP_RE.test(finalPanel) && PASSIVE_AUDIENCE_RE.test(finalPanel)) {
    throw new Error('passive_final_tableau');
  }

  return true;
};
