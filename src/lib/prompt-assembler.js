import { 
  buildChatGPTMangaPrompt, 
  buildGeminiMangaPrompt,
  RICH_PANEL_COMPOSITION_LOCK_COMPACT
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
  getPanelShotExecution,
  MANGA_COMPOSITION_VARIETY_LOCK,
  MANGA_COMPOSITION_VARIETY_LOCK_COMPACT,
  MANGA_GESTURE_VARIETY_LOCK,
  MANGA_GESTURE_VARIETY_LOCK_COMPACT,
  MANGA_READING_RHYTHM_LOCK,
  MANGA_READING_RHYTHM_LOCK_COMPACT,
  MANGA_PROMPT_PRIORITY
} from './composition-variety';
import {
  HAND_PROP_KINEMATICS_LOCK,
  HAND_PROP_KINEMATICS_LOCK_COMPACT
} from './hand-prop-kinematics';
import {
  BODY_ACTING_BASELINE_COMPACT,
  EXPRESSIVE_DIRECTION,
  OBJECT_GEOMETRY_LOCK_COMPACT,
  FUNCTIONAL_SURFACE_ORIENTATION_LOCK_COMPACT,
  FUNCTIONAL_SURFACE_PANEL_CHECK
} from './shared-image-quality';
import {
  formatCinematicTechniqueSlot,
  replaceCinematicSlotWithinBudget,
  selectPageCinematicTechniques
} from './cinematic-techniques';
import { normalizeMangaColorMode, isMonochromePrompt, sanitizeMonochromeSourceDescription, MONOCHROME_RENDERING_LOCK, MONOCHROME_RENDERING_LOCK_COMPACT, MONOCHROME_BACKGROUND_LOCK, MONOCHROME_BACKGROUND_LOCK_COMPACT, MONOCHROME_FINAL_CHROMA_AUDIT, MONOCHROME_FINAL_CHROMA_AUDIT_COMPACT, MONOCHROME_PANEL_INK_CHECK } from './manga-render-mode.js';
import { buildReferenceSheetArtStyleLock, getEndingModePolicy, isDocumentaryEnding } from './ending-mode-policy.js';

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

const DOCUMENTARY_SOURCE_FACT_RE = /^\[SOURCE FACT - INTERNAL, DO NOT PRINT\]:\s*(.+)$/gim;

const extractDocumentarySourceFacts = (panelText = '') => [...String(panelText).matchAll(DOCUMENTARY_SOURCE_FACT_RE)]
  .map((match) => match[1].trim())
  .filter(Boolean);

const stripDocumentarySourceFacts = (panelText = '') => String(panelText)
  .replace(DOCUMENTARY_SOURCE_FACT_RE, '')
  .replace(/\n{3,}/g, '\n\n')
  .trim();

const buildDocumentarySourceFactLock = (panels = []) => {
  const facts = panels.flatMap((panel, index) => extractDocumentarySourceFacts(panel)
    .map((fact) => `- Panel ${index + 1} source fact: ${fact}`));
  if (facts.length === 0) return '';
  return `DOCUMENTARY SOURCE FACT LOCK (ABSOLUTE): These are internal planning facts; never print the label or source sentences as captions, signs, UI, or extra bubbles. Depict every assigned fact through the approved panel action and preserve every date, time, quantity, cause, measure, affected party, and outcome.\n${facts.join('\n')}`;
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
const FACIAL_ACTING_LOCK_COMPACT = 'FACIAL ACTING LOCK: bold or subtle brow/eyelid/gaze target/mouth shape/head-torso cues as scripted. Do not force a close-up/camera gaze; preserve Camera/Action/eye-line/hands/props. Acting notes are not visible text; never print.';
const CHATGPT_CINEMATIC_SLOTS = Object.freeze([
  'CAMERA: vary angles; preserve anatomy and the script lock.',
  'CAMERA: vary; preserve anatomy/script.'
]);
const GEMINI_CINEMATIC_SLOT = '(Dramatic anime cinematic lighting, high-budget VFX, NO excessive speedlines).';

const applyCinematicTechniqueSlot = (baselinePrompt, assignments, providerFamily) => {
  const availableSlots = providerFamily === PROMPT_PROVIDER_FAMILIES.CHATGPT
    ? CHATGPT_CINEMATIC_SLOTS
    : [GEMINI_CINEMATIC_SLOT];
  const slot = availableSlots.find((candidate) => baselinePrompt.includes(candidate));
  if (!slot) return baselinePrompt;

  const replacement = formatCinematicTechniqueSlot(assignments, slot.length);
  if (!replacement) return baselinePrompt;
  return replaceCinematicSlotWithinBudget(baselinePrompt, slot, replacement);
};

const compactConversationEyeLine = (line) => {
  if (line.includes('VIEWPOINT FREEDOM:')) {
    return line
      .replace('address their counterparts; reactors watch the active speaker.', 'address counterparts; reactors watch speaker.')
      .replace('VIEWPOINT FREEDOM: three-quarter/profile; bold height/tilt/foreshortening; no forced rear shoulder.', 'VIEWPOINT FREEDOM: three-quarter/profile; keep tilt/perspective; no forced rear shoulder.');
  }
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

const compactBudgetEyeLine = (line) => {
  // Never replace named relationships with a generic "counterpart" under size pressure.
  if (/EXPLICIT DETAIL CAMERA LOCK|EXPLICIT REAR CAMERA|SIDES>/i.test(line)) return line;
  const roles = line.match(/(\[[^\]]+\]) PRIMARY THREE-QUARTER; (\[[^\]]+\]) BACK-THREE-QUARTER OR OVER-THE-SHOULDER PARTNER/);
  const genericConsequence = /OTS FUNCTIONAL FACE CONSEQUENCE: (?:derive target from Action, not holder—read\/operate=self; submit\/present\/show=recipient\.|Action target—read\/operate=self; submit\/present\/show=recipient; visibility follows target side\.)/;
  const participants = line.match(/^EYE-LINE LOCK:\s*(\[[^\n]+?)\s+address their counterparts;/)?.[1];
  if (!roles || !participants || !genericConsequence.test(line)) return line;
  const [, primary, rear] = roles;
  return `EYE-LINE LOCK: ${participants} mutual gaze; reactors watch speaker; never lens/front. ${primary} 3/4; camera behind ${rear}; ${rear} rear head/shoulder FG, no front-on face. Script camera wins.`;
};

const compactChatGPTConversationRules = (prompt, monochrome = isMonochromePrompt(prompt), preserveReferenceStyle = false) => {
  if (prompt.length <= CHATGPT_WEB_COPY_SOFT_BUDGET) return prompt;
  const compactWardrobeLock = preserveReferenceStyle
    ? "REFERENCE-SHEET WARDROBE AND RENDERING LOCK: preserve garment items, colors or tone regions, materials, patterns, fold lines, shading and rendering method across all four panels; serious lighting may vary without changing the drawing method."
    : "CROSS-PANEL WARDROBE COLOR LOCK: choose each named character's garment items, base colors, accent colors, material, and pattern once; reuse that exact wardrobe assignment in every later panel. PANEL STYLE LOCK changes background/environment palette, VFX, and rendering treatment only; keep every garment item and its colors unchanged. Lighting may change highlights and shadows, but the garment's canonical base and accent colors remain recognizable.";
  const compacted = prompt
    .replace(MANGA_READING_RHYTHM_LOCK, MANGA_READING_RHYTHM_LOCK_COMPACT)
    .replace(/CONVERSATIONAL DEPTH BASE:[^\n]*/g, 'CONVERSATIONAL DEPTH BASE: Action gaze first; varied depth.')
    .replace(/EYE-LINE LOCK:[^\n]*/g, compactConversationEyeLine)
    .replace(/MANGA FINISH ASSIST:[^\n]*/g, 'FINISH: bubbles, anatomy.')
    .replace(/\[ SHARED IMAGE QUALITY CONTRACT[\s\S]*?(?=\n- Clean finish:)/g, `SHARED IMAGE QUALITY CONTRACT: preserve cast/action/setting/camera; necessary setting cues/depth; quiet negative space; coherent anatomy/prop ownership; localized fold shadows; no invented/duplicate cast; clean surfaces.\n${BODY_ACTING_BASELINE_COMPACT}\n${EXPRESSIVE_DIRECTION}\n${FUNCTIONAL_SURFACE_ORIENTATION_LOCK_COMPACT}\n${OBJECT_GEOMETRY_LOCK_COMPACT}`)
    .replace(/FACIAL ACTING LOCK:[\s\S]*?(?=\n- CLEAN SURFACE PROTOCOL:)/g, FACIAL_ACTING_LOCK_COMPACT)
    .replace(/RICH PANEL COMPOSITION \/ CHARACTER CLARITY LOCK:[\s\S]*?(?=\n- CLOTHING FOLD SHADOW ASSIST:)/g, RICH_PANEL_COMPOSITION_LOCK_COMPACT)
    .replace(/CLEAN SURFACE PROTOCOL:[^\n]*/g, 'CLEAN: no noise except style exceptions.')
    .replace(/CLOTHING FOLD SHADOW ASSIST:[^\n]*/g, 'FOLD SHADOWS: crisp triangular overlap shadows; no geometric patterns.')
    .replace(/SAFE VISUAL CONTENT LOCK:[^\n]*/g, 'SAFE VISUAL: no gore/blood/organs/flesh/organic horror; ordinary architecture; preserve script/cast/dialogue/camera/layout.')
    .replace(/PANEL-BY-PANEL CLOTHING FOLD PRIORITY:[^\n]*/g, 'FOLD PRIORITY: 2-4 dark triangular crease shadows.')
    .replace(/FINAL-PANEL ACTIVE STAGING LOCK:[^\n]*/g, 'FINAL-PANEL ACTIVE STAGING LOCK: no straight-line lineup; distinct physical action; faces, silhouettes, and hands readable.')
    .replace(
      /MANGA CAMERA \/ POSE VARIETY LOCK:[\s\S]*?(?=\n+(?:BODY ACTING \/ GESTURE VARIETY LOCK|HAND \/ PROP KINEMATICS LOCK|VISUAL STORY EVIDENCE LOCK|SETTING CONTINUITY \(LOW PRIORITY\)|FINAL-PANEL ACTIVE STAGING LOCK|ART \/ RENDERING QUALITY:))/g,
      MANGA_COMPOSITION_VARIETY_LOCK_COMPACT
    )
    .replace(/COMPOSITION STAGING: PRESERVE EXPLICIT AZIMUTH:[^\n]*/g, 'COMPOSITION STAGING: PRESERVE EXPLICIT AZIMUTH; keep scripted body orientation and symmetry.')
    .replace(/COMPOSITION STAGING: LEFT-FRONT OBLIQUE:[^\n]*/g, 'COMPOSITION STAGING: LEFT-FRONT OBLIQUE 35-55 degrees; unequal shoulder depth.')
    .replace(/COMPOSITION STAGING: RIGHT-FRONT OBLIQUE:[^\n]*/g, 'COMPOSITION STAGING: RIGHT-FRONT OBLIQUE 35-55 degrees; near hand larger.')
    .replace(/COMPOSITION STAGING: REAR THREE-QUARTER:[^\n]*/g, 'COMPOSITION STAGING: REAR THREE-QUARTER 30-50 degrees; layered depth.')
    .replace(/COMPOSITION STAGING: DIAGONAL LEFT-FRONT:[^\n]*/g, 'COMPOSITION STAGING: DIAGONAL LEFT-FRONT 30-50 degrees; keep scripted tilt.')
    .replace(
      /CROSS-PANEL WARDROBE COLOR LOCK:[\s\S]*?(?=\n- Adults)/g,
      compactWardrobeLock
    )
    .replace(/- In each Dialogue block,[^\n]*/g, '- TEXT MAP: print quoted TEXT only; no TAILS metadata.')
    .replace(/- If one character, punctuation mark,[^\n]*/g, '- BUBBLE QA: copy TEXT exactly; tails touch speaker mouth/head; no extra bubbles/names.')
    .replace(/- Action is visual only:[^\n]*/g, '- ACTION: visual only; no labels/narration/SFX if unscripted.')
    .replace(/CHARACTER QA PASS:\n-[^\n]*/g, monochrome ? 'CHARACTER QA: shape/design and stable ink/tone only; white lit skin; no reference color.' : 'CHARACTER QA: preserve identity and outfit; redraw swaps or merged cast.')
    .replace(/\n{3,}/g, '\n\n');

  if (compacted.length <= CHATGPT_WEB_COPY_SOFT_BUDGET) return compacted;

  const maximallyCompacted = compacted
    .replace(/\[ MONOCHROME TWO-VALUE RENDERING LOCK \][\s\S]*?(?=\n\nOUTPUT: Single image)/, MONOCHROME_RENDERING_LOCK_COMPACT)
    .replace(MONOCHROME_BACKGROUND_LOCK, MONOCHROME_BACKGROUND_LOCK_COMPACT)
    .replace(MONOCHROME_FINAL_CHROMA_AUDIT, MONOCHROME_FINAL_CHROMA_AUDIT_COMPACT)
    .replace(/- (?:COMEDY INTENT|SERIOUS DOCUMENTARY INTENT):[^\n]*/g, preserveReferenceStyle
      ? '- SERIOUS DOCUMENTARY INTENT: preserve source facts and serious ending; no gag conversion or invented event.'
      : '- COMEDY INTENT: preserve scripted surreal changes/emotional mismatch/silence; no explanations.')
    .replace(/- SINGLE INSTANT:[^\n]*/g, '- SINGLE INSTANT: one scripted moment.')
    .replace(/- REVEAL ORDER:[^\n]*/g, '- REVEAL ORDER: current Action only; no later states/reactions.')
    .replace(/- REACTION TARGET:[^\n]*/g, '- REACTION TARGET: scripted gaze/pose target; no new events.')
    .replace(/- PROP STATE:[^\n]*/g, '- PROP STATE: identity fixed; state/holder follow script.')
    .replace(/- REFERENCE ROLE:[^\n]*/g, preserveReferenceStyle
      ? '- REFERENCE ROLE: identity and art style across all four panels; no sheet labels/layout/poses.'
      : monochrome ? '- REFERENCE ROLE: shape/design only; no source color or sheet labels/layout/poses.' : '- REFERENCE ROLE: appearance; no sheet labels/layout/poses.')
    .replace(/- Scenario is source truth\.[^\n]*/g, monochrome ? '- Scenario locks story/text; source hues yield to the ink medium.' : '- Scenario is source of truth.')
    .replace(/- Explicitly silent panels[^\n]*/g, '- Silent panels: NO speech bubbles or invented dialogue; never print silence placeholders.')
    .replace(/- Match key object EXACTLY[^\n]*/g, '- Props: preserve identity; scripted state/holder changes only.')
    .replace(/- Do not replace conflict,[^\n]*\n- Do not replace, rewrite,[^\n]*/g, '- Preserve conflict/setting/sequence/ending/punchline and verbatim dialogue; no additions/omissions.')
    .replace(/ABSOLUTE TASK:[^\n]*/g, 'ABSOLUTE TASK: new 4-panel manga page; refs only for identity.')
    .replace(/- A4 portrait 1:1\.414;[^\n]*/g, '- A4 portrait 1:1.414; four equal horizontal panels; tight page.')
    .replace(/- Top title EXACTLY ("[^"]+")[^\n]*/g, '- Top title EXACTLY $1.')
    .replace(/- Bottom-right 4th-panel watermark EXACTLY ("[^"]+")[^\n]*/g, '- Bottom-right watermark EXACTLY $1.')
    .replace(/- Bottom-left 4th-panel watermark EXACTLY ("[^"]+")[^\n]*/g, '- Bottom-left watermark EXACTLY $1.')
    .replace(/- Clean finish:[^\n]*/g, monochrome ? '- CLEAN FINISH: crisp focal ink; fewer distant lines; white light planes.' : '- CLEAN FINISH: crisp FG, soft BG, coherent light.')
    .replace(/HAND \/ PROP KINEMATICS LOCK:[^\n]*/g, HAND_PROP_KINEMATICS_LOCK_COMPACT)
    .replace(
      /VISUAL STORY EVIDENCE LOCK: visibly preserve the event-specific evidence from the approved scenario: ([^\n]*?)\. Show at least two distinct evidence items[^\n]*/g,
      'VISUAL STORY EVIDENCE LOCK: show $1; >=2 distinct items across >=2 panels where Actions place them; physical scene elements, not extra captions.'
    )
    .replace(/\n?SETTING CONTINUITY \(LOW PRIORITY\):[^\n]*/g, '')
    .replace(/MANGA CAMERA \/ POSE VARIETY LOCK:[^\n]*/g, MANGA_COMPOSITION_VARIETY_LOCK_COMPACT)
    .replace(/FINAL-PANEL ACTIVE STAGING LOCK:[^\n]*/g, 'FINAL-PANEL ACTIVE STAGING LOCK: no straight-line lineup; distinct physical action; faces, silhouettes, and hands readable.')
    // Retain named gaze targets and rear-shoulder owners even under budget pressure.
    .replace(/FUNCTIONAL SURFACE PANEL CHECK:[^\n]*/g, 'FUNCTIONAL SURFACE PANEL CHECK: reader/camera side/front-back/text axes.')
    .replace(/SHARED IMAGE QUALITY CONTRACT:[^\n]*/g, 'SHARED QUALITY: direction; setting; anatomy/props; no duplicate cast.')
    .replace(/FACIAL ACTING LOCK:[^\n]*/g, 'FACIAL ACTING LOCK: brow/eyelid/gaze target/mouth shape/head-torso; do not force close-up; preserve Camera/Action/eye-line; not visible text.')
    .replace(
      /RICH PANEL COMPOSITION \/ CHARACTER CLARITY LOCK:[^\n]*/g,
      RICH_PANEL_COMPOSITION_LOCK_COMPACT
    )
    .replace(/SAFE VISUAL:[^\n]*/g, 'SAFE VISUAL: no gore/blood/organs/flesh/organic horror; preserve script/cast/dialogue/camera/layout.')
    .replace(/FOLD PRIORITY:[^\n]*/g, 'FOLD PRIORITY: 2-4 dark triangular crease shadows.')
    .replace(/CROSS-PANEL WARDROBE COLOR LOCK:[^\n]*/g, compactWardrobeLock)
    .replace(/^ART-STYLE DIFFERENCE QA LOCK:[^\n]*/gm, 'ART-STYLE DIFFERENCE QA LOCK: selected style visible in linework/shading/palette/texture, not only expression/VFX; no numeric quota. Preserve script/identity/wardrobe/props/layout.')
    .replace(/^PANEL STYLE LOCK: ([^;\n]+);[^\n]*/gm, 'PANEL STYLE LOCK: $1; apply global style QA.')
    .replace(/^Style: In THIS PANEL ONLY,[^\n]*/gm, 'Style: follow the named PANEL STYLE LOCK.')
    .replace(/^VFX: [^\n]*/gm, 'VFX: style overlay only; preserve readable action.')
    .replace(/CHARACTER QA:[^\n]*/g, monochrome ? 'CHARACTER QA: shape/design, stable ink/tone, white lit skin; no color.' : 'CHARACTER QA: preserve identity and outfit.');

  if (maximallyCompacted.length <= CHATGPT_WEB_COPY_SOFT_BUDGET) return maximallyCompacted;

  return maximallyCompacted.replace(
    /CROSS-PANEL WARDROBE COLOR LOCK:[^\n]*/g,
    preserveReferenceStyle
      ? 'REFERENCE-SHEET WARDROBE AND RENDERING LOCK: preserve garment and rendering method across all panels.'
      : 'CROSS-PANEL WARDROBE COLOR LOCK: fix garment items/colors once; reuse in all panels; style and lighting never change canonical wardrobe.'
  )
    .replace(/^EXPRESSIVE DIRECTION:[^\n]*/gm, 'EXPRESSIVE DIRECTION: height/tilt/foreshortening; full-body acting; panel contrast: scale/light/VFX. Keep quiet beats, Camera/Action, identity, verbatim dialogue, limbs, prop ownership/facing.')
    // 身体演技の契約は BODY ACTING / GESTURE VARIETY LOCK に保持済み。
    .replace(/^BODY ACTING BASELINE:[^\n]*\n?/gm, '')
    .replace(/^CONVERSATIONAL DEPTH BASE:[^\n]*/gm, 'CONVERSATIONAL DEPTH BASE: Action gaze first; free camera.')
    .replace(/^EYE-LINE LOCK: (.+?) address (?:their )?counterparts;[^\n]*VIEWPOINT FREEDOM:[^\n]*/gm, 'EYE-LINE LOCK: $1 address counterparts; reactors watch speaker; never lens/front. VIEWPOINT FREEDOM: three-quarter; height/tilt/perspective. Camera preserves scenario direction.')
    .replace(/^Style: follow the named PANEL STYLE LOCK\.\n?/gm, '')
    // 白黒の各コマにも、上位ロックと同じ保持条件が重複している。
    // 画風固有の描線指示は残し、同一の末尾だけを省く。
    .replace(/^(MONOCHROME PANEL STYLE LOCK:[^\n]*) Preserve script\/Camera\/Action, cast, glasses and wardrobe tone assignments\.$/gm, '$1')
    .replace(/CROSS-PANEL WARDROBE TONE LOCK:\n- Assign[^\n]*/g, 'CROSS-PANEL WARDROBE TONE LOCK: fix garment items/patterns and white/black/halftone regions once across panels; styles change ink treatment only.')
    .replace(/^MONOCHROME STYLE DIFFERENCE QA:[^\n]*/gm, 'MONOCHROME STYLE DIFFERENCE QA: selected ink style; no numeric quota; keep script/identity/wardrobe/layout/camera/acting/fixed tones.')
    // Geometry/azimuth contracts are already global; reserve space for visible shot cues.
    .replace(/^- Reproduce reference geometry and design using black ink\/white paper:[^\n]*/gm, '- Reference geometry/design only; no feature swapping.')
    .replace(/^- Adults 20\+\. Same face\/hair\/glasses\/outfit shapes and ink\/tone assignments; lit skin always white\.$/gm, '- Adults 20+. Same shapes/ink tones; lit skin white.')
    .replace(/^- REFERENCE ROLE: shape\/design only; no source color or sheet labels\/layout\/poses\.$/gm, '- REFERENCE ROLE: shape/design; no hue, sheet labels/layout/poses.')
    .replace(/^FUNCTIONAL SURFACE PANEL CHECK:[^\n]*/gm, 'FUNCTIONAL SURFACE PANEL CHECK: target/side/axes.')
    .replace(/^COMPOSITION STAGING: PRESERVE EXPLICIT AZIMUTH[^\n]*/gmi, 'COMPOSITION STAGING: PRESERVE EXPLICIT AZIMUTH.')
    .replace(/^BODY ACTING \/ GESTURE VARIETY LOCK:[^\n]*/gm, MANGA_GESTURE_VARIETY_LOCK_COMPACT)
    .replace(/^- Draw in a high-budget, chic and cinematic full-color TV anime style\.[^\n]*/gm, '- Chic cinematic full-color TV anime: delicate detailed faces/eyes, dramatic light, deep color grading, sharp clean ink; polished Japanese animation finish.')
    .replace(/; pose, expression, saturation, glow, or speed lines alone are insufficient; reject/g, '; reject')
    .replace(/RICH PANEL COMPOSITION \/ CHARACTER CLARITY LOCK:[^\n]*/g, RICH_PANEL_COMPOSITION_LOCK_COMPACT)
    // Story beats already remain verbatim in each Action; retain a short exact reference.
    .replace(/^- Panel (\d+) required story beat: EXACT Panel \1 Action below$/gm, '- Panel $1: exact Action below.')
    .replace(/^EYE-LINE LOCK:[^\n]*VIEWPOINT FREEDOM:[^\n]*/gm, line => line.replace('Camera preserves scenario direction.', 'Script camera wins.'))
    .replace(/^EYE-LINE LOCK:[^\n]*/gm, compactBudgetEyeLine)
    .replace(/^PLACEMENT\/IDENTITY:[^\n]*/gm, line => line.replace(/ \(bare eyes, no frames\)/g, ''));
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

const buildPanelActionText = (panelText, castList, activeOutfit, colorMode = 'color') => {
  const placementRule = extractPlacementRule(panelText, castList, { colorMode });
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

const buildStrictScriptLock = ({ safeTopic, panels, castList, activeOutfit, providerFamily, isMonochrome = false, preserveReferenceStyle = false }) => {
  const panelLocks = panels.map((panelText, index) => {
    const panelNumber = index + 1;
    const storyBeat = compactScriptLockOrReference(
      buildPanelActionText(panelText, castList, activeOutfit, isMonochrome ? 'monochrome' : 'color'),
      80,
      `EXACT Panel ${panelNumber} Action below`
    );
    const dialogue = (providerFamily === 'gemini'
      ? extractDialogueOnly(panelText, castList, {forImagePrompt: true})
      : formatScriptLockDialogue(extractDialogueOnly(panelText, castList)))
      || `EXACT Panel ${panelNumber} Dialogue below`;
    return `- Panel ${panelNumber} required story beat: ${storyBeat}
- Panel ${panelNumber} required dialogue: ${dialogue}`;
  }).join('\n');

  return `STRICT SCRIPT LOCK:
- Title: ${safeTopic}
- Scenario is source truth. A different story is a failed output.${isMonochrome ? ' This locks story and verbatim text, not source colors: render all source color/paint descriptions using the MONOCHROME TWO-VALUE RENDERING LOCK.' : ''}
- Do not replace conflict, setting, sequence, ending, or punchline.
- Do not replace, rewrite, paraphrase, omit, or add dialogue.
- Explicitly silent panels have NO speech bubbles and no invented dialogue. The no-dialogue placeholder is an instruction, never printable text.
${MANGA_PROMPT_PRIORITY}
${preserveReferenceStyle
  ? '- SERIOUS DOCUMENTARY INTENT: Preserve source facts, chronology and the serious final reaction. Do not convert any panel into a gag or invent an event for dramatic effect.'
  : '- COMEDY INTENT: Preserve scripted surreal events, impossible changes, emotional mismatch and absent reactions. Do not normalize them, explain them or add a tsukkomi. Ambiguous intent stays unchanged; continuity rules must not erase a scripted gag.'}
- SINGLE INSTANT: Draw one script-consistent instant per panel. For sequential actions, select the moment that supports that panel's dialogue or silent beat; never combine before/after poses or duplicate a character to show motion.
- REVEAL ORDER: Show only information available in that panel's Action. Later outcomes and punchline states must not appear early, including background props or reaction faces. VisualEvidence is an inventory, not an instruction to show every state together.
- REACTION TARGET: Preserve stated gaze and actions. Where acting is unspecified, develop its expressive silhouette, full-body amplitude, head angle and hand pose toward the scripted person or object; do not invent a new event, contact or reaction target. Preserve explicit quiet beats. Keep the key action and its reaction readable within the assigned camera.
- PROP STATE: Preserve object identity, but allow changes in contents, condition and holder exactly when the script requires them, including deliberate surreal changes. Unless explicitly scripted, do not restore consumed contents or combine pre-transfer and post-transfer ownership.
- REFERENCE ROLE: Character sheets supply ${preserveReferenceStyle ? 'appearance, identity and the authoritative drawing style for all four panels' : isMonochrome ? 'shape/design only, never source hues or skin tone; the ink medium controls every reference region' : 'appearance and identity'}; approved outfit instructions take precedence for clothing. Do not reproduce sheet layouts, labels, sample poses or duplicate views as story content.
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
  allowScenarioQualityWarning = false,
  cinematicTechniques = true
}) => {
  // Native forms and Windows text files use CRLF; metadata and panels share LF parsing.
  scenario = scenario.replace(/\r\n?/g, '\n');
  const scenarioValidation = validateMangaScenario(scenario, castList);
  if (!scenarioValidation.ok && !allowScenarioQualityWarning) {
    throw new Error(`Incomplete 4-koma scenario: ${formatMangaScenarioValidationIssue(scenarioValidation)}`);
  }
  const effectiveProviderFamily = normalizePromptProviderFamily(providerFamily);
  const isChatGPTFamily = effectiveProviderFamily === PROMPT_PROVIDER_FAMILIES.CHATGPT;
  const endingPolicy = getEndingModePolicy(punchlineType);
  const preserveReferenceStyle = endingPolicy.preserveReferenceStyle;

  // Only explicit selection changes the medium; legacy/unknown values default to color.
  const isMonochrome = normalizeMangaColorMode(colorMode) === 'monochrome';

  // アートスタイルの基本プロンプトの決定
  const styleCore = preserveReferenceStyle
    ? buildReferenceSheetArtStyleLock({ monochrome: isMonochrome })
    : isMonochrome
    ? 'Draw finished Japanese binary-ink manga: pure white paper, solid black ink, regular black-on-white screentone and deliberate hatching; expressive camera and acting.'
    : "Draw in a high-budget, chic and cinematic full-color TV anime style. The characters should have delicate and detailed anime features with beautiful eyes, dramatic cinematic lighting, rich deep color grading, and sharp clean ink contours. Ensure the artwork looks like an official Japanese animation illustration.";

  const dynamicCamera = DYNAMIC_CAMERA_PROTOCOL;

  // タイトル抽出とサニタイズ
  const cleanTopic = extractScenarioTitle(scenario);

  // シナリオテキストから場所・服装設定の読み取り
  const scenarioLocationMatch = scenario.match(/Location:\s*(.*?)(\n|$)/i)?.[1]?.trim();
  const scenarioOutfitMatch = scenario.match(/Outfit:\s*(.*?)(\n|$)/i)?.[1]?.trim();
  const cleanLocation = scenarioLocationMatch || "Generic Detailed Background";
  const activeOutfit = (scenarioOutfitMatch && !/^(なし|キャラシート準拠|none|default)/i.test(scenarioOutfitMatch)) ? scenarioOutfitMatch : "";
  const promptActiveOutfit = isMonochrome
    ? sanitizeMonochromeSourceDescription(activeOutfit)
    : activeOutfit;

  // マークダウンコードブロックや末尾の署名を削除
  let cleanScenario = scenario.replace(/```(?:json|markdown)?/gi, '').trim();
  cleanScenario = cleanScenario.replace(/Generated by.*?$/i, '').trim();

  // 各コマのテキスト分割
  const rawPanels = [
    extractPanel(cleanScenario, "1コマ目", "2コマ目") || cleanScenario,
    extractPanel(cleanScenario, "2コマ目", "3コマ目"),
    extractPanel(cleanScenario, "3コマ目", "4コマ目"),
    extractPanel(cleanScenario, "4コマ目", "UNKNOWN")
  ];
  const documentarySourceFactLock = isDocumentaryEnding(punchlineType)
    ? buildDocumentarySourceFactLock(rawPanels)
    : '';
  const panels = rawPanels.map(stripDocumentarySourceFacts);
  const cinematicAssignments = cinematicTechniques
    ? selectPageCinematicTechniques(panels, { location: cleanLocation })
    : [];

  // 重複のないカメラワークを設定するためのシャッフル処理
  const shuffledCameras = shuffleArray(cameraAngles).slice(0, 4);
  const cameraState = { index: 0 };

  // キャストリストの最適化とクリーンアップ
  const VAR_CAST_LIST = cleanCastList(castList, activeOutfit);
  const promptCastList = isMonochrome
    ? sanitizeMonochromeSourceDescription(VAR_CAST_LIST)
    : VAR_CAST_LIST;
  const VAR_CAST_LIST_CHATGPT = isChatGPTFamily ? stripWeightTags(promptCastList) : promptCastList;

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
  const scriptLock = buildStrictScriptLock({ safeTopic, panels, castList, activeOutfit: promptActiveOutfit, providerFamily, isMonochrome, preserveReferenceStyle });
  const finalPanelStagingLock = punchlineType === 'Surreal' ? '' : FINAL_PANEL_ACTIVE_STAGING_IMAGE_LOCK;
  const sceneLocks = [scriptLock, documentarySourceFactLock, compositionVarietyLock, gestureVarietyLock, HAND_PROP_KINEMATICS_LOCK, visualStoryEvidenceLock, settingContinuityLock, finalPanelStagingLock, MANGA_READING_RHYTHM_LOCK]
    .filter(Boolean)
    .join('\n');
  const panelEyeLineRules = panels.map((panel) => buildPanelEyeLineRule(panel, castList));
  const eyeLineBase = panelEyeLineRules.some((rule) => rule.startsWith('EYE-LINE LOCK'))
    ? 'CONVERSATIONAL DEPTH BASE: explicit Action gaze targets take priority. Otherwise speakers and listeners address one another, never the lens/front unless the script explicitly says they address an in-story camera or audience. Preserve natural depth with mixed three-quarter, back-three-quarter, and over-the-shoulder views plus foreground/midground/background layers. Do not force every participant into a pure side profile; vary the valid staging and camera position across panels.'
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
${isMonochrome ? MONOCHROME_PANEL_INK_CHECK : ''}
${buildEmotionBlock(pt, colorMode, { preserveReferenceStyle })}
${extractPlacementRule(pt, castList, { compact: true, colorMode }).replace(/\\\\[/g, '').replace(/\\\\]/g, '')}
${extractCastLimitRule(pt, castList, { compact: true }).replace(/\\\\[/g, '').replace(/\\\\]/g, '')}
Camera: ${camera}
${getPanelShotExecution(camera)}
COMPOSITION STAGING: ${getPanelCompositionAssist(pt, num, { compact: true })}
${FUNCTIONAL_SURFACE_PANEL_CHECK}
${eyeLineRule}
Action (visual only): ${buildPanelActionText(pt, castList, promptActiveOutfit, colorMode)}
Dialogue (verbatim bubbles): ${extractDialogueOnly(pt, castList, { forImagePrompt: true })}`;
    }).join('\n\n');
    panelSections = eyeLineBase ? `${eyeLineBase}\n\n${panelSections}` : panelSections;

    rawPrompt = buildChatGPTMangaPrompt({
      safeTopic, watermarkEng, styleCore, safeLocation, isMonochrome,
      bg360Image, bg360Analysis, bg360Enabled, bg360CroppedPanels,
      VAR_CAST_LIST_CHATGPT, identityMatrix: buildIdentityMatrix(castList, { monochrome: isMonochrome }), activeOutfit: promptActiveOutfit,
      scriptLock: sceneLocks, panelSections, preserveReferenceStyle
    });
    rawPrompt = compactChatGPTConversationRules(rawPrompt, isMonochrome, preserveReferenceStyle);
  } else {
    // Gemini (Imagen 3/4) 向けプロンプトの構築
    panelSections = panels.map((pt, i) => {
      const num = i + 1;
      const eyeLineRule = panelEyeLineRules[i];
      const isConversation = eyeLineRule.startsWith('EYE-LINE LOCK');
      const rawCamera = getCameraForPanel(pt, shuffledCameras, cameraState);
      const camera = isConversation ? sanitizeConversationCamera(rawCamera) : rawCamera;
      const lensRule = isConversation
        ? '[LENS]: preserve the scenario camera direction, dramatic height, tilt and strong perspective; build foreground/midground/background depth without forcing an over-the-shoulder view. Gaze follows the named counterpart, not the lens.'
        : '[LENS]: execute the scripted camera distance, height, tilt and perspective at its specified intensity. Keep bold shots bold and quiet shots quiet; do not add lens distortion or tilt absent from Camera.';
      const geminiRearForegroundLock = isConversation
        ? (() => {
          const speakers = eyeLineRule.match(/DEPTH ASSIGNMENT \(REQUIRED\): \[([^\]]+)\] PRIMARY THREE-QUARTER toward \[([^\]]+)\]/);
          if (!speakers) return '';
          const [, primarySpeaker, rearPartner] = speakers;
          return `GEMINI REAR-FOREGROUND LOCK (ABSOLUTE): Render this exchange from physically behind [${rearPartner}]. The back of [${rearPartner}]'s head or shoulder MUST occupy the foreground and face [${primarySpeaker}]. Do NOT show [${rearPartner}]'s face front-on. [${primarySpeaker}] remains the three-quarter speaking subject beyond that foreground shoulder. This is mandatory; do not replace it with two reader-facing portraits.`;
        })()
        : '';
      return `## Panel ${num}
${isMonochrome ? MONOCHROME_PANEL_INK_CHECK : ''}
${buildEmotionBlock(pt, colorMode, { preserveReferenceStyle })}
${extractPlacementRule(pt, castList, { colorMode })}
${extractCastLimitRule(pt, castList)}
Camera: ${camera}.
${getPanelShotExecution(camera)}
COMPOSITION STAGING: ${getPanelCompositionAssist(pt, num)}
${FUNCTIONAL_SURFACE_PANEL_CHECK}
${lensRule}
${eyeLineRule}
Action (Visual ONLY, non-dialogue; do NOT render quoted words as visible text unless this action explicitly says handwriting, signage, board text, label text, or screen text): ${buildPanelActionText(pt, castList, promptActiveOutfit, colorMode)}.
Dialogue (ONLY inside bubbles): ${extractDialogueOnly(pt, castList, { forImagePrompt: true })}.
${geminiRearForegroundLock}`;
    }).join('\n\n');
    panelSections = eyeLineBase ? `${eyeLineBase}\n\n${panelSections}` : panelSections;

    const antiCharSheetPrefix = ANTI_CHARSHEET_PREFIX;
    rawPrompt = antiCharSheetPrefix + buildGeminiMangaPrompt({
      safeTopic, watermarkEng, styleCore, safeLocation, isMonochrome,
      bg360Image, bg360Analysis, bg360Enabled, bg360CroppedPanels,
      VAR_CAST_LIST: promptCastList, identityMatrix: buildIdentityMatrix(castList, { monochrome: isMonochrome }), activeOutfit: promptActiveOutfit,
      dynamicCamera, scriptLock: sceneLocks, panelSections, preserveReferenceStyle
    });
  }

  // 年齢セーフティフィルターの適用
  let safePrompt = applySafetyAgeUp(rawPrompt.trim());
  if (isMonochrome) safePrompt = `${MONOCHROME_RENDERING_LOCK}\n\n${safePrompt}`;

  // ドキュメンタリーモード時の危険ワード言い換え
  if (isDocumentaryEnding(punchlineType)) {
    safePrompt = sanitizeForDocumentary(safePrompt);
  }

  const baselinePrompt = isChatGPTFamily ? compactChatGPTConversationRules(safePrompt, isMonochrome, preserveReferenceStyle) : safePrompt;
  if (cinematicAssignments.length === 0) return baselinePrompt;

  const candidatePrompt = applyCinematicTechniqueSlot(
    baselinePrompt,
    cinematicAssignments,
    effectiveProviderFamily
  );
  return candidatePrompt.length <= baselinePrompt.length ? candidatePrompt : baselinePrompt;
};
