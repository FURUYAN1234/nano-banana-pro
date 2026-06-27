import { 
  buildChatGPTMangaPrompt, 
  buildGeminiMangaPrompt 
} from './prompts';
import { 
  cleanCastList, 
  buildIdentityMatrix, 
  buildEmotionBlock, 
  extractPlacementRule, 
  extractCastLimitRule, 
  getCameraForChatGPT, 
  getCameraForPanel, 
  injectOutfitReminder, 
  extractActionOnly, 
  extractDialogueOnly, 
  stripWeightTags 
} from './panel-utils';
import { 
  applySafetyAgeUp, 
  sanitizeForDocumentary 
} from './safety-filters';
import { 
  DYNAMIC_CAMERA_PROTOCOL, 
  ANTI_CHARSHEET_PREFIX, 
  cameraAngles 
} from './constants';
import {
  formatMangaScenarioValidationIssue,
  validateMangaScenario
} from './scenario-validation';

/**
 * Fisher-Yates アルゴリズムによる配列のシャッフル
 * @param {Array} arr - シャッフルする配列
 * @returns {Array} シャッフルされた新しい配列
 */
const shuffleArray = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/**
 * シナリオテキストから特定のコマの段落を抽出する
 * @param {string} text - 全体のシナリオテキスト
 * @param {string} header - 開始見出し (例: "1コマ目")
 * @param {string} nextHeader - 次の見出し (例: "2コマ目")
 * @returns {string} 抽出されたコマのテキスト
 */
const extractPanel = (text, header, nextHeader) => {
  const regex = new RegExp(`\\[${header}.*?\\]([\\s\\S]*?)(?=\\[${nextHeader}|$)`, 'i');
  const match = text.match(regex);
  return match ? match[1].trim() : "";
};

const POINTING_GESTURE_RE = /(?:\bpoint(?:ing|s|ed)?\b|finger[-\s]?point|\u6307\u5dee|\u6307\u3055|\u6307\u3092(?:\u7a81\u304d\u7acb\u3066|\u5411\u3051|\u5dee\u3057|\u3055\u3057))/i;

const appendPointingHandLock = (actionText) => {
  if (!POINTING_GESTURE_RE.test(actionText)) return actionText;
  return `${actionText}
HAND POSE LOCK: pointing hand must be anatomically correct, connected to same-side shoulder, natural index/thumb/palm/wrist/forearm; no mirrored, inverted, or extra pointing hand.`;
};

const buildPanelActionText = (panelText, castList, activeOutfit) => {
  const placementRule = extractPlacementRule(panelText, castList);
  const actionText = injectOutfitReminder(extractActionOnly(panelText, castList, placementRule), activeOutfit);
  return appendPointingHandLock(actionText);
};

const compactScriptLockOrReference = (text, maxLength, referenceText) => {
  const compact = String(text || '').replace(/\s+/g, ' ').trim();
  if (!compact) return referenceText;
  return compact.length <= maxLength ? compact : referenceText;
};

const formatScriptLockDialogue = (dialogueText) => {
  const raw = String(dialogueText || '').trim();
  if (!raw) return '';

  const entries = [];
  const speechBubbleRe = /\[([^\]]+)\]\s*:\s*"([^"]*)"/g;
  let match;
  while ((match = speechBubbleRe.exec(raw)) !== null) {
    entries.push(`${match[1].trim()}「${match[2].trim()}」`);
  }
  return entries.length ? entries.join(' / ') : raw;
};

const buildStrictScriptLock = ({ safeTopic, panels, castList, activeOutfit }) => {
  const panelLocks = panels.map((panelText, index) => {
    const panelNumber = index + 1;
    const storyBeat = compactScriptLockOrReference(
      buildPanelActionText(panelText, castList, activeOutfit),
      80,
      `EXACT Panel ${panelNumber} Action below`
    );
    const dialogue = compactScriptLockOrReference(
      formatScriptLockDialogue(extractDialogueOnly(panelText, castList)),
      64,
      `EXACT Panel ${panelNumber} Dialogue below`
    );
    return `- Panel ${panelNumber} required story beat: ${storyBeat}
- Panel ${panelNumber} required dialogue: ${dialogue}`;
  }).join('\n');

  return `STRICT SCRIPT LOCK:
- Title: ${safeTopic}
- Scenario is source truth. A different story is a failed output.
- Do not replace conflict, setting, sequence, ending, or punchline.
- Do not replace, rewrite, paraphrase, omit, or add dialogue.
- If any lower camera, layout, cast-placement, or style instruction conflicts with this script lock, follow this script lock.
${panelLocks}`;
};

const extractScenarioTitle = (scenarioText = '') => {
  const titleLine = scenarioText.match(/##\s*タイトル\s*[:：]\s*([^\n]+)/)?.[1]?.trim();
  const explicitTitleLine = scenarioText.match(/^##\s*(?:Title|タイトル)\s*[:：]\s*([^\n]+)/im)?.[1]?.trim();
  const rawTitle = explicitTitleLine || titleLine || scenarioText.split('\n')[0].substring(0, 20);
  return rawTitle
    .replace(/^Topic:\s*/i, '')
    .replace(/\s+([!！?？]+)$/u, '$1')
    .trim();
};

export const PROMPT_PROVIDER_FAMILIES = Object.freeze({
  CHATGPT: 'chatgpt',
  GEMINI: 'gemini'
});

export const normalizePromptProviderFamily = (providerFamily) => {
  if (providerFamily === PROMPT_PROVIDER_FAMILIES.CHATGPT) return providerFamily;
  if (providerFamily === PROMPT_PROVIDER_FAMILIES.GEMINI) return providerFamily;
  throw new Error(`Unknown prompt provider family: ${providerFamily}`);
};

/**
 * ** [v3.82-alpha] ** 4コマ漫画プロンプトを構築する純粋なロジック関数
 * App.jsx からプロンプト組み立て処理を切り離し、再利用性を向上
 * 
 * @param {Object} params - プロンプトビルドに必要なパラメータ
 * @returns {string} 構築された最終プロンプト
 */
export const buildMangaPrompt = ({
  scenario,
  castList,
  colorMode,
  providerFamily,
  bg360Image,
  bg360Analysis,
  bg360Enabled,
  bg360CroppedPanels,
  punchlineType,
  systemVersion
}) => {
  const scenarioValidation = validateMangaScenario(scenario);
  if (!scenarioValidation.ok) {
    throw new Error(`Incomplete 4-koma scenario: ${formatMangaScenarioValidationIssue(scenarioValidation)}`);
  }
  const effectiveProviderFamily = normalizePromptProviderFamily(providerFamily);
  const isChatGPTFamily = effectiveProviderFamily === PROMPT_PROVIDER_FAMILIES.CHATGPT;

  // カラーモードの判定 (モノクロ / カラー / 自動判定)
  let isMonochrome = colorMode === 'monochrome';
  if (colorMode === 'auto') {
    const lowerCast = castList.toLowerCase();
    isMonochrome = lowerCast.includes('style_tag: monochrome') || 
                   lowerCast.includes('monochrome') || 
                   lowerCast.includes('greyscale') || 
                   lowerCast.includes('screentone');
  }

  // アートスタイルの基本プロンプトの決定
  const styleCore = isMonochrome
    ? "Draw in a traditional Japanese black and white manga style using G-pen ink lines, screentones, and manual hatching. The artwork should have high-contrast black and white shading without any color, similar to a professionally published comic."
    : "Draw in a high-budget, chic and cinematic full-color TV anime style. The characters should have delicate and detailed anime features with beautiful eyes, dramatic cinematic lighting, rich deep color grading, and sharp clean ink contours. Ensure the artwork looks like an official Japanese animation illustration.";

  const dynamicCamera = DYNAMIC_CAMERA_PROTOCOL;

  // タイトル抽出とサニタイズ
  const cleanTopic = extractScenarioTitle(scenario);

  // シナリオテキストから場所・服装設定の読み取り
  const scenarioLocationMatch = scenario.match(/Location:\s*(.*?)(\n|$)/i)?.[1]?.trim();
  const scenarioOutfitMatch = scenario.match(/Outfit:\s*(.*?)(\n|$)/i)?.[1]?.trim();
  const cleanLocation = scenarioLocationMatch || "Generic Detailed Background";
  const activeOutfit = (scenarioOutfitMatch && !/^(なし|キャラシート準拠|none|default)/i.test(scenarioOutfitMatch)) ? scenarioOutfitMatch : "";

  // マークダウンコードブロックや末尾の署名を削除
  let cleanScenario = scenario.replace(/```(?:json|markdown)?/gi, '').trim();
  cleanScenario = cleanScenario.replace(/Generated by.*?$/i, '').trim();

  // 各コマのテキスト分割
  const panel1Text = extractPanel(cleanScenario, "1コマ目", "2コマ目") || cleanScenario;
  const panel2Text = extractPanel(cleanScenario, "2コマ目", "3コマ目");
  const panel3Text = extractPanel(cleanScenario, "3コマ目", "4コマ目");
  const panel4Text = extractPanel(cleanScenario, "4コマ目", "UNKNOWN");

  // 重複のないカメラワークを設定するためのシャッフル処理
  const shuffledCameras = shuffleArray(cameraAngles).slice(0, 4);
  const cameraState = { index: 0 };

  // キャストリストの最適化とクリーンアップ
  const VAR_CAST_LIST = cleanCastList(castList, activeOutfit);
  const VAR_CAST_LIST_CHATGPT = isChatGPTFamily ? stripWeightTags(VAR_CAST_LIST) : VAR_CAST_LIST;

  const safeLocation = cleanLocation || "Detailed Background";
  const safeTopic = cleanTopic || "4-koma Manga";
  
  // ウォーターマークテキストの作成
  const watermarkEng = isChatGPTFamily
    ? `Generated by ChatGPT with Super FURU AI 4-koma ${systemVersion}`
    : `Generated by Gemini with Super FURU AI 4-koma ${systemVersion}`;

  let rawPrompt = "";
  const panels = [panel1Text, panel2Text, panel3Text, panel4Text];
  const scriptLock = buildStrictScriptLock({ safeTopic, panels, castList, activeOutfit });
  let panelSections = "";

  if (isChatGPTFamily) {
    // ChatGPT Image 2.0 向けプロンプトの構築
    panelSections = panels.map((pt, i) => {
      const num = i + 1;
      return `## Panel ${num}
${buildEmotionBlock(pt)}
${extractPlacementRule(pt, castList, { compact: true }).replace(/\\\\[/g, '').replace(/\\\\]/g, '')}
${extractCastLimitRule(pt, castList, { compact: true }).replace(/\\\\[/g, '').replace(/\\\\]/g, '')}
Camera: ${getCameraForChatGPT(pt, cameraState)}
Action (visual only): ${buildPanelActionText(pt, castList, activeOutfit)}
Dialogue (verbatim bubbles): ${extractDialogueOnly(pt, castList)}`;
    }).join('\n\n');

    rawPrompt = buildChatGPTMangaPrompt({
      safeTopic, watermarkEng, styleCore, safeLocation,
      bg360Image, bg360Analysis, bg360Enabled, bg360CroppedPanels,
      VAR_CAST_LIST_CHATGPT, identityMatrix: buildIdentityMatrix(castList), activeOutfit,
      scriptLock, panelSections
    });
  } else {
    // Gemini (Imagen 3/4) 向けプロンプトの構築
    panelSections = panels.map((pt, i) => {
      const num = i + 1;
      return `## Panel ${num}
${buildEmotionBlock(pt)}
${extractPlacementRule(pt, castList)}
${extractCastLimitRule(pt, castList)}
Camera: ${getCameraForPanel(pt, shuffledCameras, cameraState)}.
[LENS]: (ABOVE CAMERA DISTORTION MAX:2.9), (NEVER normal photograph:3.0), (extreme severe perspective warp:2.7), (violently tilted horizon:2.6). Break normal camera angle.
Action (Visual ONLY, non-dialogue; do NOT render quoted words as visible text unless this action explicitly says handwriting, signage, board text, label text, or screen text): ${buildPanelActionText(pt, castList, activeOutfit)}.
Dialogue (ONLY inside bubbles): ${extractDialogueOnly(pt, castList)}.`;
    }).join('\n\n');

    const antiCharSheetPrefix = ANTI_CHARSHEET_PREFIX;
    rawPrompt = antiCharSheetPrefix + buildGeminiMangaPrompt({
      safeTopic, watermarkEng, styleCore, safeLocation,
      bg360Image, bg360Analysis, bg360Enabled, bg360CroppedPanels,
      VAR_CAST_LIST, identityMatrix: buildIdentityMatrix(castList), activeOutfit,
      dynamicCamera, scriptLock, panelSections
    });
  }

  // 年齢セーフティフィルターの適用
  let safePrompt = applySafetyAgeUp(rawPrompt.trim());

  // ドキュメンタリーモード時の危険ワード言い換え
  if (punchlineType === 'Documentary') {
    safePrompt = sanitizeForDocumentary(safePrompt);
  }

  return safePrompt;
};
