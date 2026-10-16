import { getScenarioPanelBlocks } from './scenario-validation.js';
import { extractEmotionStyle } from './panel-utils.js';
import { getEndingModePolicy, resolveScenarioEndingType } from './ending-mode-policy.js';

const SUPPORTED_MEDIA = Object.freeze(['POP_ART', 'WATERCOLOR', 'GEKIGA']);

// This is a rendering aid, never a STEP1 material or an override of an authored style.
export function selectPanelMediumStyles({ scenario = '', colorMode = 'color', preserveReferenceStyle = false,
  styleJson = null, punchlineType } = {}) {
  if (colorMode !== 'color' || preserveReferenceStyle || styleJson
    || getEndingModePolicy(punchlineType).preserveReferenceStyle
    || getEndingModePolicy(resolveScenarioEndingType(scenario, punchlineType)).preserveReferenceStyle) return [];
  return [...new Set(getScenarioPanelBlocks(scenario).map(panel => extractEmotionStyle(panel.text)))]
    .filter(style => SUPPORTED_MEDIA.includes(style));
}

export function buildPanelMediumReferenceInstruction(styles) {
  if (!Array.isArray(styles) || !styles.length || new Set(styles).size !== styles.length
    || styles.some(style => !SUPPORTED_MEDIA.includes(style))) {
    throw new Error('描法参照の画風はPOP_ART・WATERCOLOR・GEKIGAから重複なく指定してください。');
  }
  const locations = { POP_ART: 'TOP LEFT', WATERCOLOR: 'MIDDLE RIGHT', GEKIGA: 'MIDDLE LEFT' };
  return 'STYLE ONLY 描法見本。人物参照/STEP1素材/修復・編集元ではなくM番号なし。'
    + `見本位置: ${styles.map(style => `${locations[style]}=${style}`).join('; ')}。`
    + '明示された画風のコマだけに適用し、未選択セルは無視。出力位置ではなくコマ指定の媒体で対応。'
    + '見える顔/髪の処理を含む輪郭の強弱・ハッチ・網点・pigment washes/painted edgesの描法だけを借用。'
    + '見本の顔/同一性/識別特徴/髪型・色/服/ポーズ/Camera/構図/背景/小物/文字/6分割配置は複製しない。'
    + '同一性の資料は承認済みプロンプトと人物参照のみ。指定の衣装/固有色/ポーズ/Camera/Action/表情/台詞/可視人物/コマ数/配置/各コマの媒体を保持。見本人物/ラベルやこの指示文を描画しない。';
}
