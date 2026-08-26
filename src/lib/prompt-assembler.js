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
import { buildSettingContinuityLock } from './setting-continuity';
import { FINAL_PANEL_ACTIVE_STAGING_IMAGE_LOCK } from './final-panel-staging';
import {
  getPanelCompositionAssist,
  MANGA_COMPOSITION_VARIETY_LOCK,
  MANGA_COMPOSITION_VARIETY_LOCK_COMPACT,
  MANGA_GESTURE_VARIETY_LOCK,
  MANGA_GESTURE_VARIETY_LOCK_COMPACT
} from './composition-variety';
import {
  HAND_PROP_KINEMATICS_LOCK,
  HAND_PROP_KINEMATICS_LOCK_COMPACT
} from './hand-prop-kinematics';
import {
  BODY_ACTING_BASELINE_COMPACT,
  FUNCTIONAL_SURFACE_ORIENTATION_LOCK_COMPACT,
  FUNCTIONAL_SURFACE_PANEL_CHECK
} from './shared-image-quality';

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
const compactConversationEyeLine = (line) => {
  const depth = String(line).match(/DEPTH ASSIGNMENT \(REQUIRED\): (\[[^\]]+\]) PRIMARY THREE-QUARTER toward (\[[^\]]+\]); \[[^\]]+\] BACK-THREE-QUARTER OR OVER-THE-SHOULDER PARTNER toward \[[^\]]+\]/);
  if (!depth) return line;
  const [, primary, partner] = depth;
  const staging = String(line).match(/^EYE-LINE LOCK:\s*(.*?)\s*DEPTH ASSIGNMENT \(REQUIRED\):/)?.[1]?.trim()
    || `${primary} address counterpart ${partner}; never lens/front.`;
  const consequence = String(line).match(/OTS FUNCTIONAL FACE CONSEQUENCE:.*?(?=\s+Camera preserves)/)?.[0]
    || 'OTS FUNCTIONAL FACE CONSEQUENCE: derive target from Action, not holder—read/operate=self; submit/present/show=recipient.';
  const explicitRearMarker = /EXPLICIT REAR CAMERA/i.test(line) ? ' EXPLICIT REAR CAMERA:' : '';
  return `EYE-LINE LOCK: ${staging} ${primary} PRIMARY THREE-QUARTER; ${partner} BACK-THREE-QUARTER OR OVER-THE-SHOULDER PARTNER.${explicitRearMarker} VISIBLE REAR DEPTH CHECK: camera is physically behind ${partner}'s shoulder; back of ${partner}'s head or shoulder foreground. Do NOT show ${partner}'s face front-on. ${consequence} Camera preserves scenario direction.`;
};

const compactChatGPTConversationRules = (prompt) => {
  if (prompt.length <= CHATGPT_WEB_COPY_SOFT_BUDGET) return prompt;
  const compacted = prompt
    .replace(/CONVERSATIONAL DEPTH BASE:[^\n]*/g, 'CONVERSATIONAL DEPTH BASE: counterpart gaze; varied three-quarter and OTS depth.')
    .replace(/EYE-LINE LOCK:[^\n]*/g, compactConversationEyeLine)
    .replace(/MANGA FINISH ASSIST:[^\n]*/g, 'FINISH: bubbles, anatomy.')
    .replace(/\[ SHARED IMAGE QUALITY CONTRACT[\s\S]*?(?=\n- Clean finish:)/g, `SHARED IMAGE QUALITY CONTRACT: preserve cast/action/setting/camera; rich setting/depth; coherent anatomy/prop ownership; localized fold shadows; no invented/duplicate cast; clean surfaces.\n${BODY_ACTING_BASELINE_COMPACT}\n${FUNCTIONAL_SURFACE_ORIENTATION_LOCK_COMPACT}`)
    .replace(/RICH PANEL COMPOSITION \/ CHARACTER CLARITY LOCK:[\s\S]*?(?=\n- CLOTHING FOLD SHADOW ASSIST:)/g, 'RICH PANEL COMPOSITION / CHARACTER CLARITY LOCK: 1 fixed anchor + 2 physical setting cues/panel; VFX overlay, never replace setting; face, eyes, silhouette, hands and action stay crisp; background rich but softer/lower contrast; no blank walls, flat gradients or black voids.')
    .replace(/CLEAN SURFACE PROTOCOL:[^\n]*/g, 'CLEAN: no noise except style exceptions.')
    .replace(/CLOTHING FOLD SHADOW ASSIST:[^\n]*/g, 'FOLD SHADOWS: crisp triangular overlap shadows; no geometric patterns.')
    .replace(/SAFE VISUAL CONTENT LOCK:[^\n]*/g, 'SAFE VISUAL: no gore/blood/organs/flesh/organic horror; ordinary architecture; preserve script/cast/dialogue/camera/layout.')
    .replace(/PANEL-BY-PANEL CLOTHING FOLD PRIORITY:[^\n]*/g, 'FOLD PRIORITY: 2-4 dark triangular crease shadows.')
    .replace(/FINAL-PANEL ACTIVE STAGING LOCK:[^\n]*/g, 'FINAL-PANEL ACTIVE STAGING LOCK: no straight-line lineup; distinct physical action; faces, silhouettes, and hands readable.')
    .replace(
      /MANGA CAMERA \/ POSE VARIETY LOCK:[\s\S]*?(?=\n+(?:BODY ACTING \/ GESTURE VARIETY LOCK|HAND \/ PROP KINEMATICS LOCK|VISUAL STORY EVIDENCE LOCK|SETTING CONTINUITY \(LOW PRIORITY\)|FINAL-PANEL ACTIVE STAGING LOCK|ART \/ RENDERING QUALITY:))/g,
      'MANGA CAMERA / POSE VARIETY LOCK: >=3 azimuths; NO default eye-level shot; max 1 front-on; preserve script/camera/action/limbs; turn torso; stagger hands in depth; VFX follows angle.'
    )
    .replace(/COMPOSITION STAGING: PRESERVE EXPLICIT AZIMUTH:[^\n]*/g, 'COMPOSITION STAGING: preserve explicit azimuth; diagonal asymmetric body.')
    .replace(/COMPOSITION STAGING: LEFT-FRONT OBLIQUE:[^\n]*/g, 'COMPOSITION STAGING: LEFT-FRONT OBLIQUE 35-55 degrees; unequal shoulder depth.')
    .replace(/COMPOSITION STAGING: RIGHT-FRONT OBLIQUE:[^\n]*/g, 'COMPOSITION STAGING: RIGHT-FRONT OBLIQUE 35-55 degrees; near hand larger.')
    .replace(/COMPOSITION STAGING: REAR THREE-QUARTER:[^\n]*/g, 'COMPOSITION STAGING: REAR THREE-QUARTER 30-50 degrees; layered depth.')
    .replace(/COMPOSITION STAGING: DIAGONAL LEFT-FRONT:[^\n]*/g, 'COMPOSITION STAGING: DIAGONAL LEFT-FRONT 30-50 degrees; keep scripted tilt.')
    .replace(
      /CROSS-PANEL WARDROBE COLOR LOCK:[\s\S]*?(?=\n- Adults)/g,
      "CROSS-PANEL WARDROBE COLOR LOCK: choose each named character's garment items, base colors, accent colors, material, and pattern once; reuse that exact wardrobe assignment in every later panel. PANEL STYLE LOCK changes background/environment palette, VFX, and rendering treatment only; keep every garment item and its colors unchanged. Lighting may change highlights and shadows, but the garment's canonical base and accent colors remain recognizable."
    )
    .replace(/- In each Dialogue block,[^\n]*/g, '- TEXT MAP: print quoted TEXT only; no TAILS metadata.')
    .replace(/- If one character, punctuation mark,[^\n]*/g, '- BUBBLE QA: copy TEXT exactly; tails touch speaker mouth/head; no extra bubbles/names.')
    .replace(/- Action is visual only:[^\n]*/g, '- ACTION: visual only; no labels/narration/SFX if unscripted.')
    .replace(/CHARACTER QA PASS:\n-[^\n]*/g, 'CHARACTER QA: preserve identity and outfit; redraw swaps or merged cast.')
    .replace(/\n{3,}/g, '\n\n');

  if (compacted.length <= CHATGPT_WEB_COPY_SOFT_BUDGET) return compacted;

  const maximallyCompacted = compacted
    .replace(/ABSOLUTE TASK:[^\n]*/g, 'ABSOLUTE TASK: new 4-panel manga page; refs only for identity.')
    .replace(/- A4 portrait 1:1\.414;[^\n]*/g, '- A4 portrait 1:1.414; four equal horizontal panels; tight page.')
    .replace(/- Top title EXACTLY ("[^"]+")[^\n]*/g, '- Top title EXACTLY $1.')
    .replace(/- Bottom-right 4th-panel watermark EXACTLY ("[^"]+")[^\n]*/g, '- Bottom-right watermark EXACTLY $1.')
    .replace(/- Bottom-left 4th-panel watermark EXACTLY ("[^"]+")[^\n]*/g, '- Bottom-left watermark EXACTLY $1.')
    .replace(/- Clean finish:[^\n]*/g, '- CLEAN FINISH: crisp FG, soft BG, coherent light.')
    .replace(/CAMERA: vary angles;[^\n]*/g, 'CAMERA: vary; preserve anatomy/script.')
    .replace(/HAND \/ PROP KINEMATICS LOCK:[^\n]*/g, HAND_PROP_KINEMATICS_LOCK_COMPACT)
    .replace(
      /VISUAL STORY EVIDENCE LOCK: visibly preserve the event-specific evidence from the approved scenario: ([^\n]*?)\. Show at least two distinct evidence items[^\n]*/g,
      'VISUAL STORY EVIDENCE LOCK: show $1; >=2 distinct items across >=2 panels where Actions place them; physical scene elements, not extra captions.'
    )
    .replace(/\n?SETTING CONTINUITY \(LOW PRIORITY\):[^\n]*/g, '')
    .replace(/MANGA CAMERA \/ POSE VARIETY LOCK:[^\n]*/g, 'MANGA CAMERA / POSE VARIETY LOCK: >=3 azimuths; NO default eye-level shot; max 1 front-on; preserve Action/limbs; stagger hands in depth.')
    .replace(/FINAL-PANEL ACTIVE STAGING LOCK:[^\n]*/g, 'FINAL-PANEL ACTIVE STAGING LOCK: varied actions/depth; faces and hands readable.')
    .replace(/EYE-LINE LOCK:[^\n]*/g, (line) => (
      /EXPLICIT DETAIL CAMERA LOCK|EXPLICIT REAR CAMERA/i.test(line)
        ? line
        : 'EYE-LINE LOCK: counterpart gaze; mixed three-quarter/rear-OTS depth; never lens/front; preserve scenario direction.'
    ))
    .replace(/FUNCTIONAL SURFACE PANEL CHECK:[^\n]*/g, 'FUNCTIONAL SURFACE PANEL CHECK: Action target; solve target-to-front/back geometry before projection.')
    .replace(/SHARED IMAGE QUALITY CONTRACT:[^\n]*/g, 'SHARED QUALITY: preserve direction; rich setting; anatomy/props; folds; no duplicate cast; clean surfaces.')
    .replace(
      /RICH PANEL COMPOSITION \/ CHARACTER CLARITY LOCK:[^\n]*/g,
      'RICH PANEL COMPOSITION / CHARACTER CLARITY LOCK: 1 fixed anchor + 2 physical setting cues/panel; VFX overlay, never replace physical setting; face, eyes, silhouette, hands and action stay crisp; background rich but softer/lower contrast; no blank walls, flat gradients or black voids.'
    )
    .replace(/SAFE VISUAL:[^\n]*/g, 'SAFE VISUAL: no gore/blood/organs/flesh/organic horror; preserve script/cast/dialogue/camera/layout.')
    .replace(/FOLD PRIORITY:[^\n]*/g, 'FOLD PRIORITY: 2-4 dark triangular crease shadows.')
    .replace(/CROSS-PANEL WARDROBE COLOR LOCK:[^\n]*/g, "CROSS-PANEL WARDROBE COLOR LOCK: choose each named character's garment items, base colors, accent colors, material, and pattern once; reuse that exact wardrobe assignment in every later panel. PANEL STYLE LOCK changes background/environment palette, VFX, and rendering treatment only; keep every garment item and its colors unchanged. Lighting may change highlights and shadows, but the garment's canonical base and accent colors remain recognizable.")
    .replace(/ART-STYLE DIFFERENCE QA LOCK:\n-[^\n]*/g, 'ART-STYLE DIFFERENCE QA LOCK:\n- Vary at least three of linework, environmental palette, shading, background/VFX, texture/surface treatment; reject the same clean anime style with only pose, expression, saturation, glow, or speed lines changed; wardrobe colors stay fixed; preserve script/identity/layout.')
    .replace(/^Style: In THIS PANEL ONLY,[^\n]*/gm, 'Style: follow the named PANEL STYLE LOCK.')
    .replace(/^VFX: [^\n]*/gm, 'VFX: style overlay only; preserve readable action.')
    .replace(/CHARACTER QA:[^\n]*/g, 'CHARACTER QA: preserve identity and outfit.');

  if (maximallyCompacted.length <= CHATGPT_WEB_COPY_SOFT_BUDGET) return maximallyCompacted;

  return maximallyCompacted.replace(
    /CROSS-PANEL WARDROBE COLOR LOCK:[^\n]*/g,
    'CROSS-PANEL WARDROBE COLOR LOCK: fix garment items/colors once; reuse in all panels; style and lighting never change canonical wardrobe.'
  );
};

const buildVisualStoryEvidenceLock = (scenario) => {
  const rawEvidence = String(scenario || '').match(/VisualEvidence:\s*(.*?)(?:\n|$)/i)?.[1] || '';
  const evidence = [...new Set(rawEvidence
    .replace(/^[\[【]|[\]】]$/g, '')
    .split(/[、,，／/|]/)
    .map((item) => item.trim())
    .filter((item) => item.length >= 2))];
  if (evidence.length < 2) return '';

  return `VISUAL STORY EVIDENCE LOCK: visibly preserve the event-specific evidence from the approved scenario: ${evidence.map((item) => `"${item}"`).join(' / ')}. Show at least two distinct evidence items across at least two panels, exactly where the panel Actions place them. These are physical scene elements or participants, not extra captions or labels unless the Action explicitly requires readable signage. Never replace them with a generic attractive background.`;
};

const buildPanelActionText = (panelText, castList, activeOutfit) => {
  const placementRule = extractPlacementRule(panelText, castList);
  return injectOutfitReminder(extractActionOnly(panelText, castList, placementRule), activeOutfit);
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
    const dialogue = formatScriptLockDialogue(extractDialogueOnly(panelText, castList))
      || `EXACT Panel ${panelNumber} Dialogue below`;
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
  systemVersion,
  allowScenarioQualityWarning = false
}) => {
  const scenarioValidation = validateMangaScenario(scenario, castList);
  const hasBlockingDialogueContractError =
    scenarioValidation.panelsMissingDialogue.length > 0 || scenarioValidation.silentPanels.length > 0;
  if (!scenarioValidation.ok && (!allowScenarioQualityWarning || hasBlockingDialogueContractError)) {
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
  const settingContinuityLock = buildSettingContinuityLock(scenario);
  const visualStoryEvidenceLock = buildVisualStoryEvidenceLock(scenario);
  const compositionVarietyLock = isChatGPTFamily
    ? MANGA_COMPOSITION_VARIETY_LOCK_COMPACT
    : MANGA_COMPOSITION_VARIETY_LOCK;
  const gestureVarietyLock = isChatGPTFamily
    ? MANGA_GESTURE_VARIETY_LOCK_COMPACT
    : MANGA_GESTURE_VARIETY_LOCK;
  
  // ウォーターマークテキストの作成
  const watermarkEng = isChatGPTFamily
    ? `Generated by ChatGPT with Super FURU AI 4-koma ${systemVersion}`
    : `Generated by Gemini with Super FURU AI 4-koma ${systemVersion}`;

  let rawPrompt = "";
  const panels = [panel1Text, panel2Text, panel3Text, panel4Text];
  const scriptLock = buildStrictScriptLock({ safeTopic, panels, castList, activeOutfit });
  const finalPanelStagingLock = punchlineType === 'Surreal' ? '' : FINAL_PANEL_ACTIVE_STAGING_IMAGE_LOCK;
  const sceneLocks = [scriptLock, compositionVarietyLock, gestureVarietyLock, HAND_PROP_KINEMATICS_LOCK, visualStoryEvidenceLock, settingContinuityLock, finalPanelStagingLock]
    .filter(Boolean)
    .join('\n');
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
COMPOSITION STAGING: ${getPanelCompositionAssist(pt, num, { compact: true })}
${FUNCTIONAL_SURFACE_PANEL_CHECK}
${eyeLineRule}
Action (visual only): ${buildPanelActionText(pt, castList, activeOutfit)}
Dialogue (verbatim bubbles): ${extractDialogueOnly(pt, castList, { forImagePrompt: true })}`;
    }).join('\n\n');
    panelSections = eyeLineBase ? `${eyeLineBase}\n\n${panelSections}` : panelSections;

    rawPrompt = buildChatGPTMangaPrompt({
      safeTopic, watermarkEng, styleCore, safeLocation,
      bg360Image, bg360Analysis, bg360Enabled, bg360CroppedPanels,
      VAR_CAST_LIST_CHATGPT, identityMatrix: buildIdentityMatrix(castList), activeOutfit,
      scriptLock: sceneLocks, panelSections
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
          const speakers = eyeLineRule.match(/DEPTH ASSIGNMENT \(REQUIRED\): \[([^\]]+)\] PRIMARY THREE-QUARTER toward \[([^\]]+)\]/);
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
COMPOSITION STAGING: ${getPanelCompositionAssist(pt, num)}
${FUNCTIONAL_SURFACE_PANEL_CHECK}
${lensRule}
${eyeLineRule}
Action (Visual ONLY, non-dialogue; do NOT render quoted words as visible text unless this action explicitly says handwriting, signage, board text, label text, or screen text): ${buildPanelActionText(pt, castList, activeOutfit)}.
Dialogue (ONLY inside bubbles): ${extractDialogueOnly(pt, castList, { forImagePrompt: true })}.
${geminiRearForegroundLock}`;
    }).join('\n\n');
    panelSections = eyeLineBase ? `${eyeLineBase}\n\n${panelSections}` : panelSections;

    const antiCharSheetPrefix = ANTI_CHARSHEET_PREFIX;
    rawPrompt = antiCharSheetPrefix + buildGeminiMangaPrompt({
      safeTopic, watermarkEng, styleCore, safeLocation,
      bg360Image, bg360Analysis, bg360Enabled, bg360CroppedPanels,
      VAR_CAST_LIST, identityMatrix: buildIdentityMatrix(castList), activeOutfit,
      dynamicCamera, scriptLock: sceneLocks, panelSections
    });
  }

  // 年齢セーフティフィルターの適用
  let safePrompt = applySafetyAgeUp(rawPrompt.trim());

  // ドキュメンタリーモード時の危険ワード言い換え
  if (punchlineType === 'Documentary') {
    safePrompt = sanitizeForDocumentary(safePrompt);
  }

  return isChatGPTFamily ? compactChatGPTConversationRules(safePrompt) : safePrompt;
};
