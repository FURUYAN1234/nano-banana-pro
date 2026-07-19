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
  buildPanelEyeLineRule,
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
const TWO_HAND_OCCUPATION_RE = /\u4e21\u624b\u3067/;
const escapeRegExp = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const extractCastNamesForAction = (castList) => {
  const names = [];
  for (const rawLine of String(castList || '').split('\n')) {
    const line = rawLine.replace(/\*\*/g, '').trim();
    const heading = line.match(/^##\s*(?:Character\s*)?\[?([^\]]+?)\]?\s*$/i);
    const characterLine = line.match(/^-\s*Character\s*\[([^\]]+)\]\s*:/i);
    const name = (heading?.[1] || characterLine?.[1] || '')
      .trim()
      .replace(/^(?:\d+|[０-９]+)[.)．、]\s*/, '');
    if (name && !names.includes(name)) names.push(name);
  }
  return names;
};

const normalizeCompetingHandActions = (actionText, castList) => {
  let normalized = String(actionText || '');
  const names = extractCastNamesForAction(castList);
  if (!names.length || !TWO_HAND_OCCUPATION_RE.test(normalized) || !POINTING_GESTURE_RE.test(normalized)) {
    return { text: normalized, resolvedConflict: false };
  }

  const subjectRe = new RegExp(`(?:\\[)?(?:${names.map(escapeRegExp).join('|')})(?:\\])?(?:\u306f|\u304c)`, 'g');
  const subjectStarts = [...normalized.matchAll(subjectRe)].map((match) => match.index);
  let resolvedConflict = false;

  for (let index = subjectStarts.length - 1; index >= 0; index--) {
    const start = subjectStarts[index];
    const end = subjectStarts[index + 1] ?? normalized.length;
    const segment = normalized.slice(start, end);
    if (!TWO_HAND_OCCUPATION_RE.test(segment) || !POINTING_GESTURE_RE.test(segment)) continue;

    const resolvedSegment = segment.replace(/\u4e21\u624b\u3067/, '\u7247\u624b\u3067');
    if (resolvedSegment === segment) continue;

    normalized = `${normalized.slice(0, start)}${resolvedSegment}${normalized.slice(end)}`;
    resolvedConflict = true;
  }

  return { text: normalized, resolvedConflict };
};
const sanitizeConversationCamera = (camera) => {
  const withoutEnglishLensTarget = String(camera || '')
    .replace(/\s*,?\s*\([^)]*(?:viewer|reader|audience|camera|lens)[^)]*\)/gi, '')
    .replace(/(?:\s*[,;]\s*|\s+)(?:looking|look)(?:\s+(?:up|down))?\s+(?:at|into|toward)?\s*(?:the\s+)?(?:viewer|reader|audience|camera|lens)\b[^,;]*/gi, '')
    .replace(/(?:\s*[,;]\s*|\s+)(?:facing|face|gazing|gaze|staring|stare)\s+(?:at|into|toward)?\s*(?:the\s+)?(?:viewer|reader|audience|camera|lens)\b[^,;]*/gi, '')
    .replace(/(?:読者|観客|視聴者|カメラ|レンズ)(?:目線|に向け|へ向け|を見|を見る|を向け)/g, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s*[,;]\s*$/, '')
    .trim();
  return withoutEnglishLensTarget || 'Dynamic three-quarter conversation shot with layered foreground and background';
};

const CHATGPT_WEB_COPY_SOFT_BUDGET = 15000;
const compactChatGPTConversationRules = (prompt) => {
  if (prompt.length <= CHATGPT_WEB_COPY_SOFT_BUDGET) return prompt;
  return prompt
    .replace(/CONVERSATIONAL DEPTH BASE:[^\n]*/g, 'CONVERSATIONAL DEPTH: counterpart gaze; varied 3/4 and OTS depth.')
    .replace(/EYE-LINE LOCK:[^\n]*(?=\nAction \(visual only\):)/g, 'EYE-LINE: counterpart gaze, never lens; 3/4 speaker + visible OTS partner depth.')
    .replace(/MANGA FINISH ASSIST:[^\n]*/g, 'FINISH: bubbles, light, anatomy, depth.');
};

const appendPointingHandLock = (actionText, resolvedConflict = false) => {
  if (!POINTING_GESTURE_RE.test(actionText)) return actionText;
  const allocationLock = resolvedConflict
    ? '\nHAND ALLOCATION LOCK: the same character uses one hand for the non-pointing gesture and the other hand for pointing; exactly two hands total. Never add a third hand to satisfy both actions.'
    : '';
  return `${actionText}
HAND POSE LOCK: pointing hand must be anatomically correct, connected to same-side shoulder, natural index/thumb/palm/wrist/forearm; no mirrored, inverted, or extra pointing hand.${allocationLock}`;
};

const appendTwoHandPropOwnershipLock = (actionText) => {
  if (!TWO_HAND_OCCUPATION_RE.test(actionText)) return actionText;
  return `${actionText}
PROP-HAND OWNERSHIP LOCK: when a character uses both hands to hold, close, open, or handle a prop, show exactly two arms and two hands, both continuously connected to that character's shoulders. Keep the prop in front of or beside that character's torso; hands, arms, and the prop never emerge from behind their back, cross into another character's body, or become an extra limb.`;
};

const buildPanelActionText = (panelText, castList, activeOutfit) => {
  const placementRule = extractPlacementRule(panelText, castList);
  const actionText = injectOutfitReminder(extractActionOnly(panelText, castList, placementRule), activeOutfit);
  const normalizedAction = normalizeCompetingHandActions(actionText, castList);
  return appendTwoHandPropOwnershipLock(
    appendPointingHandLock(normalizedAction.text, normalizedAction.resolvedConflict)
  );
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
  const panelEyeLineRules = panels.map((panel) => buildPanelEyeLineRule(panel, castList));
  const eyeLineBase = panelEyeLineRules.some((rule) => rule.startsWith('EYE-LINE LOCK'))
    ? 'CONVERSATIONAL DEPTH BASE: speakers and listeners address one another, never the lens/front unless the script explicitly says they address an in-story camera or audience. Preserve natural depth with mixed three-quarter, back-three-quarter, and over-the-shoulder views plus foreground/midground/background layers. Do not force every participant into a pure side profile; vary the valid staging and camera position across panels.'
    : '';
  let panelSections = "";

  if (isChatGPTFamily) {
    // ChatGPT Image 2.0 向けプロンプトの構築
    panelSections = panels.map((pt, i) => {
      const num = i + 1;
      const eyeLineRule = panelEyeLineRules[i];
      const isConversation = eyeLineRule.startsWith('EYE-LINE LOCK');
      const rawCamera = getCameraForChatGPT(pt, cameraState);
      const camera = isConversation ? sanitizeConversationCamera(rawCamera) : rawCamera;
      return `## Panel ${num}
${buildEmotionBlock(pt)}
${extractPlacementRule(pt, castList, { compact: true }).replace(/\\\\[/g, '').replace(/\\\\]/g, '')}
${extractCastLimitRule(pt, castList, { compact: true }).replace(/\\\\[/g, '').replace(/\\\\]/g, '')}
Camera: ${camera}
${eyeLineRule}
Action (visual only): ${buildPanelActionText(pt, castList, activeOutfit)}
Dialogue (verbatim bubbles): ${extractDialogueOnly(pt, castList)}`;
    }).join('\n\n');
    panelSections = eyeLineBase ? `${eyeLineBase}\n\n${panelSections}` : panelSections;

    rawPrompt = buildChatGPTMangaPrompt({
      safeTopic, watermarkEng, styleCore, safeLocation,
      bg360Image, bg360Analysis, bg360Enabled, bg360CroppedPanels,
      VAR_CAST_LIST_CHATGPT, identityMatrix: buildIdentityMatrix(castList), activeOutfit,
      scriptLock, panelSections
    });
    rawPrompt = compactChatGPTConversationRules(rawPrompt);
  } else {
    // Gemini (Imagen 3/4) 向けプロンプトの構築
    panelSections = panels.map((pt, i) => {
      const num = i + 1;
      const eyeLineRule = panelEyeLineRules[i];
      const isConversation = eyeLineRule.startsWith('EYE-LINE LOCK');
      const rawCamera = getCameraForPanel(pt, shuffledCameras, cameraState);
      const camera = isConversation ? sanitizeConversationCamera(rawCamera) : rawCamera;
      const lensRule = isConversation
        ? '[LENS]: preserve the scenario camera direction; build foreground/midground/background depth with a three-quarter speaker and a rear or over-the-shoulder counterpart/reactor.'
        : '[LENS]: (ABOVE CAMERA DISTORTION MAX:2.9), (NEVER normal photograph:3.0), (extreme severe perspective warp:2.7), (violently tilted horizon:2.6). Break normal camera angle.';
      const geminiRearForegroundLock = isConversation
        ? (() => {
          const speakers = eyeLineRule.match(/EYE-LINE LOCK: \[([^\]]+)\][\s\S]*?\[([^\]]+)\]/);
          if (!speakers) return '';
          const [, primarySpeaker, rearPartner] = speakers;
          return `GEMINI REAR-FOREGROUND LOCK (ABSOLUTE): Render this exchange from physically behind [${rearPartner}]. The back of [${rearPartner}]'s head or shoulder MUST occupy the foreground and face [${primarySpeaker}]. Do NOT show [${rearPartner}]'s face front-on. [${primarySpeaker}] remains the three-quarter speaking subject beyond that foreground shoulder. This is mandatory; do not replace it with two reader-facing portraits.`;
        })()
        : '';
      return `## Panel ${num}
${buildEmotionBlock(pt)}
${extractPlacementRule(pt, castList)}
${extractCastLimitRule(pt, castList)}
Camera: ${camera}.
${lensRule}
${eyeLineRule}
Action (Visual ONLY, non-dialogue; do NOT render quoted words as visible text unless this action explicitly says handwriting, signage, board text, label text, or screen text): ${buildPanelActionText(pt, castList, activeOutfit)}.
Dialogue (ONLY inside bubbles): ${extractDialogueOnly(pt, castList)}.
${geminiRearForegroundLock}`;
    }).join('\n\n');
    panelSections = eyeLineBase ? `${eyeLineBase}\n\n${panelSections}` : panelSections;

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
