import { buildRenderOptionsContract, buildProtectedCastContract } from './render-options.js';
import { stripSourceMetadata } from './sns-explanation.js';
import { MANGA_FACIAL_ACTING_LOCK_COMPACT } from './facial-acting.js';
import { formatGeneratedMangaTitle } from './manga-title.js';
import { OPENAI_IMAGE_PROMPT_MAX_CHARS, assertImagePromptBudget } from './image-prompt-budget.js';
import { assertPrintableDialogue, VERTICAL_DIALOGUE_GEOMETRY } from './bubble-text.js';
import { 
  buildChatGPTMangaPrompt, 
  buildGeminiMangaPrompt,
  RICH_PANEL_COMPOSITION_LOCK_COMPACT,
  ART_STYLE_DIFFERENCE_QA_LOCK,
  OPENAI_COLOR_STYLE_QA,
  OPENAI_COLOR_FOCAL_READABILITY,
  OPENAI_COLOR_FOLD_PRIORITY
} from './prompts';
import { 
  cleanCastList, 
  collectCastNameEntries,
  buildIdentityMatrix, 
  buildEmotionBlock, 
  OPENAI_COLOR_GEKIGA_STYLE,
  extractPlacementRule, 
  extractCastLimitRule, 
  getCameraForChatGPT, 
  getCameraForPanel, 
  injectOutfitReminder, 
  extractActionOnly, 
  extractDialogueOnly, 
  extractActingIdentityNotes,
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
  COMPACT_EMOTION_STYLES,
  cameraAngles 
} from './constants';
import {
  formatMangaScenarioValidationIssue,
  getScenarioPanelBlocks,
  validateMangaScenario
} from './scenario-validation';
import {
  MANGA_MANUSCRIPT_ASPECT_LABEL,
  MANGA_MANUSCRIPT_LARGE,
  MANGA_MANUSCRIPT_RATIO_LABEL,
  MANGA_MANUSCRIPT_STANDARD,
} from './manga-manuscript-format.js';
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
  LIMB_OWNERSHIP_CHECK,
  LIMB_OWNERSHIP_CHECK_COMPACT,
  EXPRESSIVE_DIRECTION,
  FOCAL_READABILITY,
  SKIN_LIGHTING,
  SHARED_IMAGE_QUALITY_CONTRACT_COMPACT,
  PANEL_EDGE_CONTINUITY_LOCK_COMPACT,
  OBJECT_GEOMETRY_LOCK_COMPACT,
  FUNCTIONAL_SURFACE_ORIENTATION_LOCK_COMPACT,
  FUNCTIONAL_SURFACE_PANEL_CHECK
} from './shared-image-quality';
import {
  formatCinematicTechniqueSlot,
  replaceCinematicSlotWithinBudget,
  selectPageCinematicTechniques
} from './cinematic-techniques';
import { MONOCHROME_FOCAL_READABILITY, MONOCHROME_SKIN_LIGHTING, normalizeMangaColorMode, isMonochromePrompt, sanitizeMonochromeSourceDescription, resolveMonochromeRenderIntent, MONOCHROME_RENDERING_LOCK, MONOCHROME_RENDERING_LOCK_COMPACT, MONOCHROME_BACKGROUND_LOCK, MONOCHROME_BACKGROUND_LOCK_COMPACT, MONOCHROME_FINAL_CHROMA_AUDIT, MONOCHROME_FINAL_CHROMA_AUDIT_COMPACT } from './manga-render-mode.js';
import { buildReferenceSheetArtStyleLock, getEndingModePolicy, isDocumentaryEnding, resolveScenarioEndingType } from './ending-mode-policy.js';

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

const DOCUMENTARY_SOURCE_FACT_RE = /^\[SOURCE FACT - INTERNAL, DO NOT PRINT\]:\s*(.+)$/gim;

const extractDocumentarySourceFacts = (panelText = '') => [...String(panelText).matchAll(DOCUMENTARY_SOURCE_FACT_RE)]
  .map((match) => stripSourceMetadata(match[1]).trim())
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

// The observed Web paste target is a compaction preference, not a hard cap.
// The caller reserves room for reference instructions against the API ceiling.
const CHATGPT_WEB_COPY_SOFT_TARGET_CHARS = 15000;
const FACIAL_ACTING_LOCK_COMPACT = MANGA_FACIAL_ACTING_LOCK_COMPACT;
const FACIAL_ACTING_LOCK_MINIMAL = MANGA_FACIAL_ACTING_LOCK_COMPACT;
const LIMB_OWNERSHIP_CHECK_MINIMAL = 'LIMB OWNERSHIP CHECK: connect each L/R hand-arm-shoulder and foot-leg-hip, or natural occlusion/crop; no stray/extra/missing/merged/detached/mirrored/malformed limbs, even near furniture; keep Action/foreshortening.';
const CHATGPT_CINEMATIC_SLOTS = Object.freeze([
  'CAMERA: vary angles; preserve anatomy and the script lock.',
  'CAMERA: vary; preserve anatomy/script.'
]);
const GEMINI_CINEMATIC_SLOT = '(Dramatic anime cinematic lighting, high-budget VFX, NO excessive speedlines).';

const getEndingSafePanelShotExecution = (camera, seriousTone) => {
  const execution = getPanelShotExecution(camera);
  if (!seriousTone) return execution;
  return execution
    .replace(/;\s*chibi too;/gi, '; keep normal adult proportions;')
    .replace(/Preserve scripted surreal gags, not unrelated defects\./g, 'Preserve scripted serious events and consequences, not unrelated defects.');
};

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
  // Explicit Camera staging is source truth. The compact role template cannot
  // infer an OTS owner from speaker order, so never reinterpret it here.
  if (/EXPLICIT REAR CAMERA:/i.test(line)) return line;
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

const compactChatGPTConversationRules = (prompt, monochrome = isMonochromePrompt(prompt), preserveReferenceStyle = false, seriousTone = false, maxChars = OPENAI_IMAGE_PROMPT_MAX_CHARS, preservePanelRecipes = false, sourceBlocks = []) => {
  if (prompt.length <= maxChars) return prompt;
  const panelColorMedia = !monochrome && !preserveReferenceStyle;
  const focalReadability = monochrome ? MONOCHROME_FOCAL_READABILITY : panelColorMedia ? OPENAI_COLOR_FOCAL_READABILITY : FOCAL_READABILITY;
  const artStyleQa = panelColorMedia ? OPENAI_COLOR_STYLE_QA : ART_STYLE_DIFFERENCE_QA_LOCK;
  // 圧縮対象は指示だけ。台詞内の制御語・引用符を置換しない。
  let tokenPrefix = '__DIALOGUE_LITERAL_';
  while (prompt.includes(tokenPrefix)) tokenPrefix += '_';
  const literals = [];
  const sourceLiterals = [...new Set(sourceBlocks)].filter(value => value && (preservePanelRecipes || !value.startsWith('Style:'))).sort((a, b) => b.length - a.length);
  const sourceProtected = sourceLiterals.reduce((text, value, index) =>
    text.split(value).join(`${tokenPrefix}SOURCE_${index}__`), prompt);
  const protectedPrompt = sourceProtected.replace(/(\bB\d+\s*=\s*)("(?:\\.|[^"\\])*")/g, (_, label, value) => {
    const index = literals.push(value) - 1;
    return `${label}"${tokenPrefix}${index}__"`;
  });
  const restore = value => value
    .replace(new RegExp(`"${tokenPrefix}(\\d+)__"`, 'g'), (_, index) => literals[Number(index)])
    .replace(new RegExp(`${tokenPrefix}SOURCE_(\\d+)__`, 'g'), (_, index) => sourceLiterals[Number(index)]);
  const sourceToken = new RegExp(`(${tokenPrefix}SOURCE_\\d+__)`, 'g');
  const mapAuthored = (text, transform) => text.split(sourceToken)
    .map(part => part.startsWith(`${tokenPrefix}SOURCE_`) ? part : transform(part)).join('');
  const compactWardrobeLock = preserveReferenceStyle
    ? "REFERENCE-SHEET WARDROBE AND RENDERING LOCK: explicit outfit overrides setting era/culture; preserve mismatch. Keep garment items and rendering method across panels."
      : 'CROSS-PANEL WARDROBE COLOR LOCK: fix garment items/colors once; reuse in all panels; style and lighting never change canonical wardrobe. Explicit outfit overrides setting era/culture; no period substitution. No outfit: infer from setting.';
  const compacted = mapAuthored(protectedPrompt, part => part
    // Identity Matrix and per-dialogue tail mapping already carry the identities
    // and reading order. Keep only the distinct body-staging constraint here.
    .replace(/^PLACEMENT\/IDENTITY:[^\n]*/gm, 'PLACEMENT: Keep Camera/Action bodies/depth/contacts; never derive body positions from dialogue order.')
    .replace(/LIMB OWNERSHIP CHECK[^\n]*/g, LIMB_OWNERSHIP_CHECK_COMPACT)
    .replace(MANGA_READING_RHYTHM_LOCK, MANGA_READING_RHYTHM_LOCK_COMPACT)
    .replace(/CONVERSATIONAL DEPTH BASE:[^\n]*/g, 'CONVERSATIONAL DEPTH BASE: Action gaze first; varied depth.')
    .replace(/EYE-LINE LOCK:[^\n]*/g, compactConversationEyeLine)
    .replace(/MANGA FINISH ASSIST:[^\n]*/g, 'FINISH: bubbles, anatomy.')
    .replace(/\[ SHARED IMAGE QUALITY CONTRACT[\s\S]*?(?=\n- Clean finish:)/g, `${SHARED_IMAGE_QUALITY_CONTRACT_COMPACT}\n${focalReadability}\n${monochrome ? MONOCHROME_SKIN_LIGHTING : SKIN_LIGHTING}\n${BODY_ACTING_BASELINE_COMPACT}\n${EXPRESSIVE_DIRECTION}\n${PANEL_EDGE_CONTINUITY_LOCK_COMPACT}\n${FUNCTIONAL_SURFACE_ORIENTATION_LOCK_COMPACT}\n${OBJECT_GEOMETRY_LOCK_COMPACT}`)
    .replace(/PANEL EDGE CONTINUITY LOCK:[^\n]*/g, PANEL_EDGE_CONTINUITY_LOCK_COMPACT)
    .replace(/FACIAL ACTING LOCK:[\s\S]*?(?=\n- CLEAN SURFACE PROTOCOL:)/g, FACIAL_ACTING_LOCK_COMPACT)
    .replace(/RICH PANEL COMPOSITION \/ CHARACTER CLARITY LOCK:[\s\S]*?(?=\n- CLOTHING FOLD SHADOW ASSIST:)/g, RICH_PANEL_COMPOSITION_LOCK_COMPACT)
    .replace(/CLEAN SURFACE PROTOCOL:[^\n]*/g, 'CLEAN: no noise except style exceptions.')
    .replace(/CLOTHING FOLD SHADOW ASSIST:[^\n]*/g, panelColorMedia ? 'FOLD SHADOWS: follow panel medium and FOLD PRIORITY.' : 'FOLD SHADOWS: crisp triangular overlap shadows; no geometric patterns.')
    .replace(/SAFE VISUAL CONTENT LOCK:[^\n]*/g, 'SAFE VISUAL: no gore/blood/organs/flesh/organic horror; ordinary architecture; preserve script/cast/dialogue/camera/layout.')
    .replace(/PANEL-BY-PANEL CLOTHING FOLD PRIORITY:[^\n]*/g, panelColorMedia ? OPENAI_COLOR_FOLD_PRIORITY : 'FOLD PRIORITY: 2-4 dark triangular crease shadows.')
    .replace(/FINAL-PANEL ACTIVE STAGING LOCK:[^\n]*/g, 'FINAL-PANEL ACTIVE STAGING LOCK: no lineup; distinct actions; readable faces, silhouettes, hands.')
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
    // Preserve per-bubble endpoint ownership even after Web/API compaction.
    // A global rule alone is too easy for image models to detach from a
    // single-bubble panel, especially when the speaker is rear/OTS.
    .replace(/TAIL TIP LOCK \(NEVER PRINT; proximity never reassigns\): ([^\n]+)/g, (_, targets) => {
      const endpointTargets = targets.replace(/\.$/, '');
      const isSingleBubble = !/;\s*B\d+=>/.test(endpointTargets);
      return `TAIL TIP LOCK: ${endpointTargets}${isSingleBubble ? '; proximity never reassigns.' : '.'}`;
    })
    .replace(/- Treat every quoted TEXT value[^\n]*/g, '- BUBBLE QA: immutable TEXT; compare every glyph; redraw mismatch; mapped tails; no extras.')
    .replace(/- Action is visual only:[^\n]*/g, '- ACTION: visual only; no labels/narration/SFX if unscripted.')
    .replace(/CHARACTER QA PASS:\n-[^\n]*/g, monochrome ? 'CHARACTER QA: identity; skin bases in light: light=paper, dark/tanned=screen; no source hue.' : 'CHARACTER QA: preserve identity and outfit; redraw swaps or merged cast.')
    .replace(/\n{3,}/g, '\n\n'));

  if (restore(compacted).length <= maxChars) return restore(compacted);

  const maximallyCompacted = mapAuthored(compacted, part => part
    .replace(MONOCHROME_RENDERING_LOCK, MONOCHROME_RENDERING_LOCK_COMPACT)
    .replace(MONOCHROME_BACKGROUND_LOCK, MONOCHROME_BACKGROUND_LOCK_COMPACT)
    .replace(MONOCHROME_FINAL_CHROMA_AUDIT, MONOCHROME_FINAL_CHROMA_AUDIT_COMPACT)
    .replace(/- (?:COMEDY INTENT|SERIOUS DOCUMENTARY INTENT|SERIOUS INTENT):[^\n]*/g, preserveReferenceStyle
      ? '- SERIOUS DOCUMENTARY INTENT: preserve source facts and serious ending; no gag conversion or invented event.'
      : seriousTone
        ? '- SERIOUS INTENT: preserve scripted emotional causality, restraint and consequences; no gag, chibi transformation or comic release.'
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
    .replace(/- (?:A4 portrait (?:210:297 \(1:1\.414\)|1:1\.414)|2:3 portrait);[^\n]*/gi, `- A4 ${MANGA_MANUSCRIPT_RATIO_LABEL}; four horizontal panels; white gutters; tight page.`)
    .replace(/- Top title EXACTLY ("[^"]+")[^\n]*/g, '- Top title EXACTLY $1.')
    .replace(/- Bottom-right 4th-panel watermark EXACTLY ("[^"]+")[^\n]*/g, '- Bottom-right watermark EXACTLY $1.')
    .replace(/- Bottom-left 4th-panel watermark EXACTLY ("[^"]+")[^\n]*/g, '- Bottom-left watermark EXACTLY $1.')
    .replace(/- Clean finish:[^\n]*/g, monochrome ? '- CLEAN FINISH: crisp focal ink; fewer distant lines; white light planes.' : '- CLEAN FINISH: crisp FG, soft BG, coherent light.')
    .replace(/HAND \/ PROP KINEMATICS LOCK:[^\n]*/g, HAND_PROP_KINEMATICS_LOCK_COMPACT)
    .replace(
      /VISUAL STORY EVIDENCE LOCK:[^\n]*/g,
      'VISUAL STORY EVIDENCE LOCK: keep scenario evidence only where panel Actions place it; no extra captions.'
    )
    .replace(/\n?SETTING CONTINUITY \(LOW PRIORITY\):[^\n]*/g, '')
    .replace(/MANGA CAMERA \/ POSE VARIETY LOCK:[^\n]*/g, MANGA_COMPOSITION_VARIETY_LOCK_COMPACT)
    .replace(/FINAL-PANEL ACTIVE STAGING LOCK:[^\n]*/g, 'FINAL-PANEL ACTIVE STAGING LOCK: no straight-line lineup; distinct physical action; faces, silhouettes, and hands readable.')
    // Retain named gaze targets and rear-shoulder owners even under budget pressure.
    .replace(/FUNCTIONAL SURFACE PANEL CHECK:[^\n]*/g, 'FUNCTIONAL SURFACE PANEL CHECK: reader/camera side/front-back/text axes.')
    .replace(/SHARED IMAGE QUALITY CONTRACT:[^\n]*/g, SHARED_IMAGE_QUALITY_CONTRACT_COMPACT)
    .replace(/FACIAL ACTING LOCK:[^\n]*/g, FACIAL_ACTING_LOCK_MINIMAL)
    .replace(
      /RICH PANEL COMPOSITION \/ CHARACTER CLARITY LOCK:[^\n]*/g,
      RICH_PANEL_COMPOSITION_LOCK_COMPACT
    )
    .replace(/SAFE VISUAL:[^\n]*/g, 'SAFE VISUAL: no gore/blood/organs/flesh/organic horror; preserve script/cast/dialogue/camera/layout.')
    .replace(/FOLD PRIORITY:[^\n]*/g, panelColorMedia ? OPENAI_COLOR_FOLD_PRIORITY : 'FOLD PRIORITY: 2-4 dark triangular crease shadows.')
    .replace(/CROSS-PANEL WARDROBE COLOR LOCK:[^\n]*/g, compactWardrobeLock)
    .replace(/^ART-STYLE DIFFERENCE QA LOCK:[^\n]*/gm, artStyleQa)
    .replace(/^(PANEL STYLE LOCK: ([^;\n]+);[^\n]*\n)Style: [^\n]*/gm,
      (block, lock, style) => !preservePanelRecipes && COMPACT_EMOTION_STYLES[style] ? `${lock}Style: ${panelColorMedia && style === 'GEKIGA' ? OPENAI_COLOR_GEKIGA_STYLE : COMPACT_EMOTION_STYLES[style]}` : block)
    .replace(/^PANEL STYLE LOCK: ([^;\n]+);[^\n]*/gm, 'PANEL STYLE LOCK: $1;')
    .replace(/^GAG INTENT OVERLAY:[^\n]*/gm, 'GAG INTENT OVERLAY: keep dramatic rendering; express humor through acting/timing, never flatten into plain chibi.')
    .replace(/^PROPORTION OVERRIDE: Explicit user proportions win\.[^\n]*/gm, 'PROPORTION OVERRIDE: Explicit user proportions win; otherwise camera/acting/expression before chibi degree.')
    // A style name is not an executable drawing recipe. Keep the actual line,
    // face/shadow/material treatment even in the deepest budget tier.
    .replace(/^VFX: [^\n]*/gm, 'VFX: style overlay only; preserve readable action.')
    .replace(/CHARACTER QA:[^\n]*/g, monochrome ? 'CHARACTER QA: identity; skin bases in light: light=paper, dark/tanned=screen; no hue.' : 'CHARACTER QA: preserve identity and outfit.'));

  if (restore(maximallyCompacted).length <= maxChars) return restore(maximallyCompacted);

  const finallyCompacted = mapAuthored(maximallyCompacted, part => part.replace(
    /CROSS-PANEL WARDROBE COLOR LOCK:[^\n]*/g,
    preserveReferenceStyle
      ? 'REFERENCE-SHEET WARDROBE AND RENDERING LOCK: preserve garment and rendering method across all panels.'
      : 'CROSS-PANEL WARDROBE COLOR LOCK: fix garment items/colors once; reuse in all panels; style and lighting never change canonical wardrobe. Explicit outfit overrides setting era/culture; no period substitution. No outfit: infer from setting.'
  )
    .replace(/^WARDROBE \/ ENVIRONMENT CONTRAST LOCK:[^\n]*\n?/gm, '')
    // Keep each dialogue's relative position and speaker mapping at every budget.
    // These constrain balloons, not actor positions or numeric layout slots.
    .replace(/^EXPRESSIVE DIRECTION:[^\n]*/gm, EXPRESSIVE_DIRECTION)
    .replace(/^CONVERSATIONAL DEPTH BASE:[^\n]*/gm, 'CONVERSATIONAL DEPTH BASE: Action gaze first; free camera.')
    .replace(/^EYE-LINE LOCK: (.+?) address (?:their )?counterparts;[^\n]*VIEWPOINT FREEDOM:[^\n]*/gm, 'EYE-LINE LOCK: $1 address counterparts; reactors watch speaker; never lens/front. VIEWPOINT FREEDOM: three-quarter; height/tilt/perspective. Camera preserves scenario direction.')
    // 白黒の各コマにも、上位ロックと同じ保持条件が重複している。
    // 画風固有の描線指示は残し、同一の末尾だけを省く。
    .replace(/^(MONOCHROME PANEL STYLE LOCK:[^\n]*) Preserve script\/Camera\/Action, cast, glasses and wardrobe tone assignments\.$/gm, '$1')
    .replace(/CROSS-PANEL WARDROBE TONE LOCK:\n- Assign[^\n]*/g, 'CROSS-PANEL WARDROBE TONE LOCK: keep assigned items/tone regions across panels; outfit override beats setting.')
    .replace(/^MONOCHROME STYLE DIFFERENCE QA:[^\n]*/gm, 'MONOCHROME STYLE DIFFERENCE QA: Panel recipes override default strokes/faces; keep identity/layout/tones.')
    // Geometry/azimuth contracts are already global; reserve space for visible shot cues.
    .replace(/^VFX: style overlay only; preserve readable action\.\n/gm, '')
    .replace(/^- Reproduce reference geometry and design using black ink\/white paper:[^\n]*/gm, '- Reference geometry/design only; no feature swapping.')
    .replace(/^- REFERENCE ROLE: shape\/design only; no source color or sheet labels\/layout\/poses\.$/gm, '- REFERENCE ROLE: shape/design; no hue, sheet labels/layout/poses.')
    .replace(/^FUNCTIONAL SURFACE PANEL CHECK:[^\n]*/gm, 'FUNCTIONAL SURFACE PANEL CHECK: target/side/axes.')
    .replace(/^COMPOSITION STAGING: PRESERVE EXPLICIT AZIMUTH[^\n]*/gmi, 'COMPOSITION STAGING: PRESERVE EXPLICIT AZIMUTH.')
    .replace(/^COMPOSITION STAGING: (LEFT-FRONT OBLIQUE|RIGHT-FRONT OBLIQUE|REAR THREE-QUARTER|DIAGONAL LEFT-FRONT)[^\n]*/gm, 'COMPOSITION STAGING: $1.')
    .replace(/^BODY ACTING \/ GESTURE VARIETY LOCK:[^\n]*/gm, MANGA_GESTURE_VARIETY_LOCK_COMPACT)
    .replace(/^- Draw in a high-budget, chic and cinematic full-color TV anime style\.[^\n]*/gm, '- Chic cinematic full-color TV anime style; polished Japanese animation finish.')
    .replace(/; pose, expression, saturation, glow, or speed lines alone are insufficient; reject/g, '; reject')
    .replace(/RICH PANEL COMPOSITION \/ CHARACTER CLARITY LOCK:[^\n]*/g, RICH_PANEL_COMPOSITION_LOCK_COMPACT)
    // Story beats already remain verbatim in each Action; retain a short exact reference.
    .replace(/^- Panel (\d+) required story beat: EXACT Panel \1 Action below$/gm, '- Panel $1: exact Action below.')
    .replace(/^EYE-LINE LOCK:[^\n]*VIEWPOINT FREEDOM:[^\n]*/gm, line => line.replace(/VIEWPOINT FREEDOM:.*$/, 'VIEWPOINT FREEDOM: exact Camera projection.'))
    .replace(/^EYE-LINE LOCK:[^\n]*/gm, compactBudgetEyeLine)
    // The stronger PAGE READING RHYTHM bubble lock already preserves this contract.
    .replace(/^Reading order: RIGHT-TO-LEFT\.[^\n]*\n?/gm, '')
    .replace(/^- Tails point to actual speakers; right-to-left manga order\.\n?/gm, '')
    .replace(/^PLACEMENT\/IDENTITY:[^\n]*/gm, line => line.replace(/ \(bare eyes, no frames\)/g, '')));

  if (restore(finallyCompacted).length <= maxChars) return restore(finallyCompacted);

  // 全コマ共有の衣装原文は上位に残し、機械注入した同一文だけを各Actionから除く。
  // 台本固有の着脱・状態変化・本文は触らない。各コマで衣装を再設計させない。
  const sharedOutfit = finallyCompacted.match(/^- IGNORE reference clothing\. Follow role-specific outfit assignments: (.*); unscoped categories apply to all\.$/m)?.[1];
  return restore(mapAuthored(finallyCompacted, part => part
    // Keep medium/cheek intent in the last budget tier without repeating prose.
    .replace(/^SKIN LIGHT:[^\n]*/gm, line => preservePanelRecipes ? line : 'SKIN LIGHT: base hue, small soft highlights; no white face blobs. Key/fill/rim, depth, eye/hair glints; explicit glossy/stylized light or mono wins. CHEEK RENDERING: story/canonical makeup; watercolor skin wash. No default stamps/stripes/copied sheet blush. Preserve expressive blush and ink shadows.')
    .replace(/^BODY VOLUME:[^\n]*/gm, 'BODY VOLUME: body form shadows; hair/jaw/clothing cast shadows. Light direction, no quota. Bounded screen/black; lit=canonical base. FACE INK: eyes/nose/mouth, white gaps; no feature merging or disappearing hairlines.')
    .replace(/^(MONOCHROME PANEL STYLE LOCK: GEKIGA; )Fully redraw GEKIGA faces with /gm, '$1Redraw ')
    .replace(/^- Keep reference identity\/ink assignments; panel recipe redraws facial construction\. No source hue\. No feature swapping\./gm, '- Identity/ink: match refs; panel recipe redraws facial construction; no hue/swaps.')
    // Shared generated instructions stay global rather than repeating per panel.
    .replace(/^CAST DEPTH: Action contact wins over depth;[^\n]*\n?/gm, '')
    // PROMPT PRIORITY keeps Camera/Action and the same body-order rule globally.
    .replace(/^PLACEMENT: (?:Keep Camera\/Action bodies\/depth\/contacts; never derive body positions from dialogue order\.|never derive body positions from dialogue order; exact Camera\/Action\.)\n?/gm, '')
    .replace(/^Action \(visual only\):[^\n]*/gm, line => sharedOutfit
      ? line.replace(`Action (visual only): (Outfit assignment: ${sharedOutfit}) `, 'Action (visual only): ')
      : line)
    // Web長文でもコマ割り自体は省略しない。同じ契約を短い日本語で保持する。
    .replace(/^PANELS: 4 full-width horizontal strips stacked vertically in ONE column; no 2x2\/side-by-side\./gm,
      'PANELS:横長4コマ全幅・縦1列・上→下。2×2/横並び禁止。')
    .replace(
      `PAGE:A4 ${MANGA_MANUSCRIPT_RATIO_LABEL} (${MANGA_MANUSCRIPT_ASPECT_LABEL}); canvas ${MANGA_MANUSCRIPT_STANDARD.value} or ${MANGA_MANUSCRIPT_LARGE.value};`,
      `PAGE:A4 ${MANGA_MANUSCRIPT_RATIO_LABEL}; ${MANGA_MANUSCRIPT_STANDARD.value} or ${MANGA_MANUSCRIPT_LARGE.value};`
    )
    .replace('ABSOLUTE TASK: new 4-panel manga page; refs only for identity.', 'TASK: 4-panel manga; refs=cast identity.')
    .replace(/HAND \/ PROP KINEMATICS LOCK:[^\n]*/g, HAND_PROP_KINEMATICS_LOCK_COMPACT)
    .replace(/FACIAL ACTING LOCK:[^\n]*/g, FACIAL_ACTING_LOCK_MINIMAL)
    .replace(/LIMB OWNERSHIP CHECK:[^\n]*/g, LIMB_OWNERSHIP_CHECK_MINIMAL)
    .replace(/SHARED IMAGE QUALITY CONTRACT:[^\n]*/g, SHARED_IMAGE_QUALITY_CONTRACT_COMPACT)
    .replace(/MANGA CAMERA \/ POSE VARIETY LOCK:[^\n]*/g, 'MANGA CAMERA / POSE VARIETY LOCK: preserve scripted front/back/left/right, elevation, crop and lens; vary unspecified shots only. Overhead shows upper planes; low shows undersides/convergence; rear/side shows body planes. Telephoto compresses depth; wide expands near/far; fisheye edge distortion if requested. One projection for cast/setting; story-relevant focal form, no stock foot thrust. Eye-line is gaze, not camera height. Preserve Action/contact and scripted frontal/repeats.')
    .replace(/RICH PANEL COMPOSITION \/ CHARACTER CLARITY LOCK:[^\n]*/g, 'RICH PANEL COMPOSITION / CHARACTER CLARITY LOCK: layered foreground/midground/background, selective material detail and motivated key, fill and rim light with shadow/color depth; background lower contrast without making it blank or washed out. Keep setting or scripted abstraction; story evidence, acting faces, hands and props stay clear.')
    .replace(/FOCAL READABILITY:[^\n]*/g, focalReadability)
    .replace(/EXPRESSIVE DIRECTION:[^\n]*/g, EXPRESSIVE_DIRECTION)
    // The global gesture and expressive contracts already retain motion,
    // support/contact and exact Camera/Action. Avoid repeating them at the cap.
    .replace(/^BODY ACTING BASELINE:[^\n]*/gm, BODY_ACTING_BASELINE_COMPACT)
    .replace(/^FINAL-PANEL STORY STAGING:[^\n]*/gm, 'FINAL-PANEL STORY STAGING: vivid scripted payoff; individual reactions; depth/silhouette/scale contrast. Keep intentional stillness and silence/deadpan amid action; Do not invent extra hand actions or crowding to occupy cast.')
    .replace(/CROSS-PANEL WARDROBE COLOR LOCK:[^\n]*/g, compactWardrobeLock)
    .replace(/^- CLEAN FINISH:[^\n]*\n?/gm, '')
    .replace(/CAST COUNT: ([^\n]+?) each EXACTLY ONCE; no named-character duplicates\./g, 'CAST COUNT: $1 each EXACTLY ONCE.')
    .replace(/^- Panel (\d+) required story beat:[^\n]*$/gm, '- Panel $1: exact Action below.')
    .replace(/^- Panel \d+: exact Action below\.\n?/gm, '')
    .replace(/^CRITICAL PLACEMENT & IDENTITY:[^\n]*\n?/gm, '')
    .replace(/^CAST LIMIT: main focus /gm, 'CAST LIMIT: focus ')
    .replace(/^CAST INSTANCE LOCK:[^\n]*/gm, 'CAST INSTANCE LOCK: 各人物は背景も実体1人。紙/画面の像で代替不可。')
    // Shorten generated projection prose only; source Camera/Action stays protected.
    .replaceAll('low camera below faces including crouched/chibi; look up: chin/jaw undersides, prop undersides from below; forehead recedes, horizon below faces, upward convergence; facial planes, body and setting share projection, not frontal faces on a tilted background; preserve scripted height/pitch/proportions', 'below all faces (crouched/chibi too); look up: chin/jaw/prop undersides, forehead recedes, low horizon, upward convergence. Face/body/setting share projection, no frontal face on tilted BG; keep scripted height/pitch/proportions')
    .replace(/^DIEGETIC REPLICA LAYER:\s*([^\n]*?)(?: may appear as one tiny replica each, fully inside the explicitly scripted container\/surface\.[^\n]*)$/gm, 'DIEGETIC REPLICA LAYER: $1 one tiny copy each inside scripted container only; never full-size/outside.')
    .replace(/^CAST DEPTH:[^\n]*/gm, "CAST DEPTH: Action contact wins over depth; place that actor's sole body within prop reach; never borrow another actor's hand; keep shot/other layers.")
    .replace(/NO OTHER HUMANS: exactly (\d+) people\./g, 'TOTAL $1 people; no others.')
    .replace(/^NON-VISIBLE CASTING CONSTRAINT:[^\n]*/gm, 'NON-VISIBLE CASTING: adults 20+; no print.')
    .replace(/^TYPE: title[^\n]*/gm, `TYPE: title EXTRA-BOLD condensed Japanese Gothic. TITLE BAND: white; no box/border. BUBBLES: vertical tategaki, regular manga Mincho; never bold Gothic/sans. ${VERTICAL_DIALOGUE_GEOMETRY}`)
    .replace(/^FG only:/gm, 'FG:')
    .replace(/ BG only:/g, ' BG:')
    .replace(/^BLACK INK PLATE:[^\n]*/gm, 'BLACK INK PLATE: redraw; refs=identity, not palette.')
    .replace(/^SOURCE COLOR BOUNDARIES:[^\n]*/gm, 'SOURCE COLOR BOUNDARIES: black/white/screen.')
    .replace(/^SCENE COLOR PRIORITY:[^\n]*/gm, 'SCENE COLOR PRIORITY: story and verbatim text over source hues.')
    .replace(/^WHITE PAPER RESERVE:[^\n]*/gm, 'WHITE RESERVE: unassigned=white; screen only for assigned bases or bounded shadows; area alone is not a defect.')
    .replace(/^DEPTH OF FIELD \/ DEFOCUS:[^\n]*/gm, 'DEPTH-OF-FIELD DEFOCUS: fewer far lines/wider white gaps; never add screentone for distance or blur.')
    .replace(/^G-PEN INK DIRECTION:[^\n]*/gm, 'G-PEN INK DIRECTION: NORMAL default; panel recipe wins. BLACK-HAIR INK LOCK: darkest reference hair=solid black; white shine only, no screen.')
    .replace(/^BLACK-HAIR INK LOCK:[^\n]*\n?/gm, '')
    .replace(/^INK LIGHT \/ ACTING:[^\n]*/gm, 'INK LIGHT / ACTING: full-body action amplitude; directional solid-black cast shadows, white rim cutouts; keep depth/beats.')
    .replace(/^MONOCHROME BACKGROUND CLARITY LOCK:[^\n]*/gm, 'MONOCHROME BACKGROUND CLARITY LOCK: omit textures; keep setting/depth/story evidence/white.')
    .replace(/^MONOCHROME FINAL CHROMA AUDIT:[^\n]*/gm, MONOCHROME_FINAL_CHROMA_AUDIT_COMPACT)
    // Identity Matrix and adult casting already cover these reminders. Keep the
    // functional-surface check local to every panel so projection is not lost.
    .replace(/^.*GLASSES CHECK:[^\n]*\n?/gm, '')
    .replace(/^CROSS-CHECK:[^\n]*\n?/gm, '')
    .replace(/^- Adults 20\+\.[^\n]*\n?/gm, '')
    .replace(/^- Identity Anchor:\s*\n【IDENTITY MATRIX[^\n]*\nCross-check EVERY[^\n]*\n/gm, 'IDENTITY MATRIX:\n')
    .replace(/^(?:ART \/ RENDERING QUALITY:|CHARACTER IDENTITY:|TEXT RULES:)\n/gm, '')
    .replace(/^- Only Dialogue becomes white bubbles:[^\n]*/gm, '- Only Dialogue becomes white bubbles: verbatim・言換/軟化/追加/省略禁止。TYPE準拠。')
    .replace(/^- Explicit scripted handwriting[^\n]*/gm, '- Scripted surface text exact; unscripted never becomes bubble/narration/metadata.')
    .replace(/^SCENE LETTERING:[^\n]*/gm, 'SCENE LETTERING: scripted object text exact, repeated only if scripted. Other surfaces: natural artwork/pictograms/colors/borders/material/layout; freely render context-appropriate readable/decorative lettering, short/long, any amount/density. Never suppress/simplify/blank/grey/blur/pixelate/mosaic/censor surfaces for unscripted text.')
    .replace(/^ART-STYLE DIFFERENCE QA LOCK:[^\n]*/gm, artStyleQa)
    // The finish, fold-shadow and identity contracts above already cover these
    // short reminders when a caller explicitly requests a tighter hard budget.
    .replace(/^- CLEAN:[^\n]*/gm, '- CLEAN: no noise except style exceptions.')
    .replace(/^FOLD PRIORITY:[^\n]*/gm, panelColorMedia ? OPENAI_COLOR_FOLD_PRIORITY : 'FOLD PRIORITY: 2-4 dark triangular crease shadows at overlap/pinch only.')
    .replace(/^CHARACTER QA:[^\n]*/gm, monochrome ? 'CHARACTER QA: identity/wardrobe/ink/tone.' : 'CHARACTER QA: preserve identity/wardrobe.')
    .replace(/\. Keep faces\/skin clean; do not add unrelated noise\./g, '. Faces/skin clean; no unrelated noise.')
    .replace(/\. Intentional style marks may model faces and skin; no unrelated noise\./g, '. Style marks on faces/skin allowed.')
    // Dialogue text already appears verbatim with its speaker/tail in each
    // panel. Remove this second global copy, never the executable panel text.
    .replace(/^- Panel \d+ required dialogue:[^\n]*\n/gm, '')
    .replace(/^- Panel \d+: exact Action below\.\n/gm, '')
    // The global orientation lock carries the full rule; repeating the same
    // three-word reminder in every panel adds no geometry information.
    .replace(/^FUNCTIONAL SURFACE PANEL CHECK: target\/side\/axes\.\n/gm,
      '')
    .replace(/^FUNCTIONAL SURFACE ORIENTATION LOCK:[^\n]*/gm, FUNCTIONAL_SURFACE_ORIENTATION_LOCK_COMPACT)
    // 同じ台本・人体保護はPROMPT PRIORITYに残す。読順・尻尾・演技条件は省略しない。
    .replace(/^PAGE READING RHYTHM:[^\n]*/gm, 'PAGE READING RHYTHM: one primary focal target/panel. PROFESSIONAL VISUAL FLOW PRIORITY: panel entry -> primary focal -> reaction/prop -> next bubble -> next panel; top-right, right-to-left. Gaze/head/torso/hands/diagonals/light/contrast guide negative space; clear story/joke, peak/quiet, density. Scripted abstract BG: props stay. INTERACTION: reactions readable; 脇役縮小禁止。遠近・遮蔽・接地に整合。指定体格差・ちび保持。 ACTING: vary gaze/weight/hands. DEPTH: real shots retain setting/depth; far blur; no default blank backdrop. MULTIPLE BUBBLES: B1 rightmost regardless of speaker; later bubbles strictly left. BALLOON OWNERSHIP: move/reflow balloon bodies near mapped speakers preserving order and Camera/Action; never end at non-speakers. SINGLE BUBBLE: speaker-side space. TAIL GEOMETRY: lower speaker-facing root; shortest unobstructed route to mapped mouth/head; never cross face/hair/text.')
    .replace(/^PROMPT PRIORITY:[^\n]*/gm, "PROMPT PRIORITY: cast/count/identity/glasses/wardrobe, exact script/Camera/panel medium/layout. 人数のため顔出し/横並び/画風・投影変更不可。 CAMERA FIRST: fixed view; Action contact wins if Camera depth conflicts: move that actor's sole body within reach; never borrow another actor's hand; never relocate for legibility/chibi or mirror screen-left/right. Never derive body positions from dialogue order. Simplify only unspecified background texture and decorative VFX. Never print.")
    .replace(/^[\t ]+|[\t ]+$/gm, '')
    .replace(/[\t ]{2,}/g, ' ')
    .replace(/\n{2,}/g, '\n')));
};

const buildMonochromePanelInkLock = (panelText = '', identityMatrix = '') => {
  const text = String(panelText);
  const subjects = [...text.matchAll(/([^\s、。；「」:：()]+?)(?:は|が)/gu)]
    .map(match => ({ name: match[1], index: match.index ?? 0 }));
  const explicitCheekNames = [...text.matchAll(/(?:頬を赤く|頬を染め|赤面|blush|flush|red cheeks)/giu)]
    .map(cue => subjects.filter(subject => subject.index < (cue.index ?? 0)).at(-1)?.name || '')
    .filter((name, index, names) => name && names.indexOf(name) === index);
  const cheekRule = explicitCheekNames.length
    ? `CHEEK: [${explicitCheekNames.join('], [')}] small screen only.`
    : 'CHEEKS: none.';
  const namesFor = (label) => {
    const names = String(identityMatrix).match(new RegExp(`${label} \\[([^\\]]+)\\]`, 'i'))?.[1]
      ?.split(',')
      .map(name => name.trim())
      .filter(name => name && text.includes(name)) || [];
    return names;
  };
  const intent = resolveMonochromeRenderIntent({ skinBases: [
    ...namesFor('LIGHT-SKIN').map(subject => ({ subject, base: 'paper' })),
    ...namesFor('SCREENED-SKIN').map(subject => ({ subject, base: 'screen' })),
  ] });
  const lightSkinNames = intent.skinBases.filter(item => item.base === 'paper').map(item => item.subject);
  const screenedSkinNames = intent.skinBases.filter(item => item.base === 'screen').map(item => item.subject);
  const skinRules = [
    lightSkinNames.length
      ? `WHITE-SKIN[${lightSkinNames.join(',')}]:lit=unprinted; shade=screen/black.`
      : '',
    screenedSkinNames.length
      ? `SCREEN-SKIN[${screenedSkinNames.join(',')}]:base stays in light; no broad patches.`
      : ''
  ].filter(Boolean).join(' ');
  return `PANEL INK:white/black;no veil. ${skinRules} ${cheekRule}`.replace(/\s+/g, ' ').trim();
};

const buildVisualStoryEvidenceLock = (scenario) => {
  const rawEvidence = String(scenario || '').match(/VisualEvidence:\s*(.*?)(?:\n|$)/i)?.[1] || '';
  const evidence = [...new Set(rawEvidence
    .replace(/^[\[【]|[\]】]$/g, '')
    .split(/[、,，／/|]/)
    .map((item) => item.trim())
    .filter((item) => item.length >= 2))];
  if (evidence.length === 0) return '';

  return `VISUAL STORY EVIDENCE LOCK: preserve relevant scenario evidence (${evidence.map((item) => `"${item}"`).join(' / ')}) where the panel Actions place it. These are physical scene elements or participants, not extra captions or labels unless the Action explicitly requires readable signage. Do not replace story-relevant evidence with a generic attractive background.`;
};

const buildPanelActionText = (panelText, castList, activeOutfit, colorMode = 'color') => {
  const placementRule = extractPlacementRule(panelText, castList, { colorMode });
  const action = injectOutfitReminder(extractActionOnly(panelText, castList, placementRule), activeOutfit);
  if (colorMode !== 'monochrome') return action;
  return action
    .replace(/全編(?:フル)?カラー/gu, '全編白黒（純白・純黒・網点）')
    .replace(/(?:フルカラー|full[- ]?color)漫画/giu, '白黒漫画');
};

const compactScriptLockOrReference = (text, maxLength, referenceText) => {
  const compact = String(text || '').replace(/\s+/g, ' ').trim();
  if (!compact) return referenceText;
  return compact.length <= maxLength ? compact : referenceText;
};

const buildStrictScriptLock = ({ safeTopic, panels, castList, activeOutfit, isMonochrome = false, preserveReferenceStyle = false, seriousTone = false }) => {
  const panelLocks = panels.map((panelText, index) => {
    const panelNumber = index + 1;
    try {
      const storyBeat = compactScriptLockOrReference(
        buildPanelActionText(panelText, castList, activeOutfit, isMonochrome ? 'monochrome' : 'color'),
        80,
        `EXACT Panel ${panelNumber} Action below`
      );
      const dialogue = extractDialogueOnly(panelText, castList, {forImagePrompt: true, forScriptLock: true})
        || `EXACT Panel ${panelNumber} Dialogue below`;
      return `- Panel ${panelNumber} required story beat: ${storyBeat}
- Panel ${panelNumber} required dialogue: ${dialogue}`;
    } catch (error) {
      if (error?.code === 'BALLOON_LAYOUT_INVALID') error.panelNumber = panelNumber;
      throw error;
    }
  }).join('\n');

  return `STRICT SCRIPT LOCK:
- Title: ${safeTopic}
- Scenario is source truth. A different story is a failed output.${isMonochrome ? ' This locks story and verbatim text, not source colors: render all source color/paint descriptions using the MONOCHROME THREE-TONE MANUSCRIPT LOCK.' : ''}
- Do not replace conflict, setting, sequence, ending, or punchline.
- Do not replace, rewrite, paraphrase, omit, or add dialogue.
- Explicitly silent panels have NO speech bubbles and no invented dialogue. The no-dialogue placeholder is an instruction, never printable text.
${MANGA_PROMPT_PRIORITY}
${preserveReferenceStyle
  ? '- SERIOUS DOCUMENTARY INTENT: Preserve source facts, chronology and the serious final reaction. Do not convert any panel into a gag or invent an event for dramatic effect.'
  : seriousTone
    ? '- SERIOUS INTENT: Preserve the scripted emotional causality, restraint, consequences and selected serious ending. Build intensity through camera, composition, lighting, gaze and body acting. Do not add a gag, chibi transformation, absurd event, punchline reversal or comic release.'
  : '- COMEDY INTENT: Preserve scripted surreal events, impossible changes, emotional mismatch and absent reactions. Do not normalize them, explain them or add a tsukkomi. Ambiguous intent stays unchanged; continuity rules must not erase a scripted gag.'}
- SINGLE INSTANT: Draw one script-consistent instant per panel. For sequential actions, select the moment that supports that panel's dialogue or silent beat; never combine before/after poses or duplicate a character to show motion.
- REVEAL ORDER: Show only information available in that panel's Action. Later outcomes and punchline states must not appear early, including background props or reaction faces. VisualEvidence is an inventory, not an instruction to show every state together.
- REACTION TARGET: Preserve stated gaze and actions. Where acting is unspecified, develop its expressive silhouette, full-body amplitude, head angle and hand pose toward the scripted person or object; do not invent a new event, contact or reaction target. Preserve explicit quiet beats. Keep the key action and its reaction readable within the assigned camera.
- PROP STATE: Preserve object identity, but allow changes in contents, condition and holder exactly when the script requires them, including deliberate surreal changes. Unless explicitly scripted, do not restore consumed contents or combine pre-transfer and post-transfer ownership.
- REFERENCE ROLE: Character sheets supply ${preserveReferenceStyle ? 'appearance, identity and the authoritative drawing style for all four panels' : isMonochrome ? 'shape/design and canonical skin-base assignments, never source hues or painted shading' : 'appearance and identity'}; approved outfit instructions take precedence for clothing. Do not reproduce sheet layouts, labels, sample poses or duplicate views as story content.
${panelLocks}`;
};

const extractScenarioTitle = (scenarioText = '') => {
  const explicitTitleLine = scenarioText.match(/^\s*(?:#{1,6}\s*)?(?:タイトル|Title|Topic)\s*[:：]\s*([^\r\n]+)/im)?.[1];
  const rawTitle = explicitTitleLine || scenarioText.trim().split(/\r?\n/)[0].substring(0, 20);
  return formatGeneratedMangaTitle(rawTitle)
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

const editableReviewLine = /^(?:FG only:|BG only:|EYE-LINE LOCK:|COMPOSITION STAGING:|FUNCTIONAL SURFACE PANEL CHECK:|BEAT REVIEW:|DEPTH:)/;

const panelScopes = (prompt) => {
  const text = String(prompt);
  const headings = [...text.matchAll(/^## Panel (\d+)[ \t]*$/gm)];
  const scopes = new Map([[null, text.slice(0, headings[0]?.index ?? text.length)]]);
  headings.forEach((heading, index) => scopes.set(Number(heading[1]),
    text.slice(heading.index, headings[index + 1]?.index ?? text.length)));
  return { scopes, panelLayoutValid: headings.map(heading => heading[1]).join(',') === '1,2,3,4' };
};

const captureMangaPromptArtifact = (prompt, colorMode) => {
  const { scopes } = panelScopes(prompt);
  const protectedBlocks = [];
  for (const [panel, section] of scopes) {
    const lines = section.split('\n');
    for (const line of lines) {
      if (line.trim() && !editableReviewLine.test(line)) {
        protectedBlocks.push(Object.freeze({ panel, text: line }));
      }
    }
  }
  return Object.freeze({ prompt, mode: normalizeMangaColorMode(colorMode), protectedBlocks: Object.freeze(protectedBlocks) });
};

export const validateMangaPromptArtifact = (candidate, artifact) => {
  const { scopes, panelLayoutValid } = panelScopes(candidate);
  const originalScopes = panelScopes(artifact.prompt).scopes;
  const missingBlockIndexes = artifact.protectedBlocks.flatMap((block, index) => {
    const count = section => String(section || '').split('\n').filter(line => line === block.text).length;
    return count(scopes.get(block.panel)) === count(originalScopes.get(block.panel)) ? [] : [index];
  });
  return { valid: panelLayoutValid && missingBlockIndexes.length === 0, panelLayoutValid, missingBlockIndexes };
};

export const buildMangaPrompt = options => buildMangaPromptArtifact(options).prompt;

/**
 * ** [v3.82-alpha] ** 4コマ漫画プロンプトを構築する純粋なロジック関数
 * App.jsx からプロンプト組み立て処理を切り離し、再利用性を向上
 * 
 * @param {Object} params - プロンプトビルドに必要なパラメータ
 * @returns {string} 構築された最終プロンプト
 */
export const buildMangaPromptArtifact = ({
  mosaicCopyrightedCharacters = true,
  showWatermarks = true,
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
  scenarioModelLabel,
  allowScenarioQualityWarning = false,
  cinematicTechniques = true,
  promptMaxChars = OPENAI_IMAGE_PROMPT_MAX_CHARS
}) => {
  // Native forms and Windows text files use CRLF; metadata and panels share LF parsing.
  scenario = stripSourceMetadata(scenario);
  punchlineType = resolveScenarioEndingType(scenario, punchlineType);
  const scenarioValidation = validateMangaScenario(scenario, castList);
  if (scenarioValidation.invalidDialogue.length) {
    throw new Error(formatMangaScenarioValidationIssue(scenarioValidation));
  }
  if (!scenarioValidation.ok && !allowScenarioQualityWarning) {
    throw new Error(`Incomplete 4-koma scenario: ${formatMangaScenarioValidationIssue(scenarioValidation)}`);
  }
  const effectiveProviderFamily = normalizePromptProviderFamily(providerFamily);
  const isChatGPTFamily = effectiveProviderFamily === PROMPT_PROVIDER_FAMILIES.CHATGPT;
  const promptTargetChars = isChatGPTFamily
    ? Math.min(promptMaxChars, CHATGPT_WEB_COPY_SOFT_TARGET_CHARS)
    : promptMaxChars;
  const endingPolicy = getEndingModePolicy(punchlineType);
  const preserveReferenceStyle = endingPolicy.preserveReferenceStyle;
  const seriousTone = endingPolicy.endingTone === 'serious';

  // Only explicit selection changes the medium; legacy/unknown values default to color.
  const isMonochrome = normalizeMangaColorMode(colorMode) === 'monochrome';
  const sourceBlocks = [];
  const source = (text) => {
    const safeText = applySafetyAgeUp(text, { includeCastingConstraint: false });
    const actionPrefix = safeText.match(/^Action(?: \([^\n]*?\))?: /)?.[0];
    const outfitReminder = promptActiveOutfit ? injectOutfitReminder('', promptActiveOutfit) : '';
    if (actionPrefix && outfitReminder && safeText.startsWith(actionPrefix + outfitReminder)) {
      // Repeated app-owned outfit reminder may compact; the source action cannot.
      sourceBlocks.push(safeText.slice(actionPrefix.length + outfitReminder.length));
    } else if (!isMonochrome && /PANEL STYLE LOCK:/.test(safeText)) {
      sourceBlocks.push(...safeText.split('\n').filter(line => /^Style:/.test(line)));
    } else sourceBlocks.push(safeText);
    return safeText;
  };
  const compactForSoftTarget = (prompt) => compactChatGPTConversationRules(
    prompt, isMonochrome, preserveReferenceStyle, seriousTone,
    promptTargetChars, promptMaxChars > promptTargetChars, sourceBlocks
  );

  // アートスタイルの基本プロンプトの決定
  const styleCore = preserveReferenceStyle
    ? buildReferenceSheetArtStyleLock({ monochrome: isMonochrome })
    : isMonochrome
    ? 'Draw a finished Japanese manga manuscript with expressive ink, paper reserves, assigned skin/material tones and motivated shadows; preserve camera and acting.'
    : "Chic cinematic full-color TV anime style; polished Japanese animation finish. NORMAL/unmarked only; panel styles override.";

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

  // 検証と同じ見出し解析を使い、全角・漢数字・空白表記でもコマを混在させない。
  const rawPanels = getScenarioPanelBlocks(cleanScenario).map((panel) =>
    panel.found ? panel.text.slice(panel.header.length).trim() : ''
  );
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
  const actingIdentityNotes = extractActingIdentityNotes(castList);
  
  // ウォーターマークテキストの作成
  const watermarkEng = isChatGPTFamily
    ? (scenarioModelLabel
      ? `ChatGPT / ${scenarioModelLabel} / FURU AI 4-koma ${systemVersion}`
      : `Generated by ChatGPT with Super FURU AI 4-koma ${systemVersion}`)
    : `Generated by Gemini with Super FURU AI 4-koma ${systemVersion}`;

  let rawPrompt = "";
  const identityMatrix = buildIdentityMatrix(castList, { monochrome: isMonochrome });
  const scriptLock = buildStrictScriptLock({ safeTopic, panels, castList, activeOutfit: promptActiveOutfit, providerFamily, isMonochrome, preserveReferenceStyle, seriousTone });
  const finalPanelStagingLock = punchlineType === 'Surreal' ? '' : FINAL_PANEL_ACTIVE_STAGING_IMAGE_LOCK;
  const identityContinuityLock = 'IDENTITY CONTINUITY: keep each character recognizable through hairstyle, wardrobe, glasses and other identity anchors; facial expression and drawing style may vary with the scene without creating a new person.';
  const sceneLocks = [scriptLock, identityContinuityLock, documentarySourceFactLock, compositionVarietyLock, gestureVarietyLock, actingIdentityNotes, `${HAND_PROP_KINEMATICS_LOCK}\n${LIMB_OWNERSHIP_CHECK}`, visualStoryEvidenceLock, settingContinuityLock, finalPanelStagingLock, MANGA_READING_RHYTHM_LOCK]
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
${source(`Camera: ${camera}`)}
${getEndingSafePanelShotExecution(camera, seriousTone)}
${isMonochrome ? source(buildMonochromePanelInkLock(pt, identityMatrix)) : ''}
${source(buildEmotionBlock(pt, colorMode, { preserveReferenceStyle, seriousTone, providerFamily: 'chatgpt' }))}
${extractPlacementRule(pt, castList, { compact: true, colorMode }).replace(/\\\\[/g, '').replace(/\\\\]/g, '')}
${extractCastLimitRule(pt, castList, { compact: true }).replace(/\\\\[/g, '').replace(/\\\\]/g, '')}
COMPOSITION STAGING: ${getPanelCompositionAssist(pt, num, { compact: true })}
${FUNCTIONAL_SURFACE_PANEL_CHECK}
${eyeLineRule}

${source(`Action (visual only): ${buildPanelActionText(pt, castList, promptActiveOutfit, colorMode)}`)}
Dialogue (verbatim bubbles): ${extractDialogueOnly(pt, castList, { forImagePrompt: true })}`;
    }).join('\n\n');
    panelSections = eyeLineBase ? `${eyeLineBase}\n\n${panelSections}` : panelSections;

    rawPrompt = buildChatGPTMangaPrompt({
      showWatermarks,
      safeTopic, watermarkEng, styleCore, safeLocation, isMonochrome,
      bg360Image, bg360Analysis, bg360Enabled, bg360CroppedPanels,
      VAR_CAST_LIST_CHATGPT, identityMatrix, activeOutfit: promptActiveOutfit,
      scriptLock: sceneLocks, panelSections, preserveReferenceStyle, seriousTone
    });
    rawPrompt = compactForSoftTarget(rawPrompt);
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
${source(`Camera: ${camera}.`)}
${getEndingSafePanelShotExecution(camera, seriousTone)}
${isMonochrome ? source(buildMonochromePanelInkLock(pt, identityMatrix)) : ''}
${source(buildEmotionBlock(pt, colorMode, { preserveReferenceStyle, seriousTone }))}
${extractPlacementRule(pt, castList, { colorMode })}
${extractCastLimitRule(pt, castList)}
COMPOSITION STAGING: ${getPanelCompositionAssist(pt, num)}
${FUNCTIONAL_SURFACE_PANEL_CHECK}
${lensRule}
${eyeLineRule}

${source(`Action (Visual ONLY, non-dialogue; do NOT render quoted words as visible text unless this action explicitly says handwriting, signage, board text, label text, or screen text): ${buildPanelActionText(pt, castList, promptActiveOutfit, colorMode)}.`)}
Dialogue (ONLY inside bubbles): ${extractDialogueOnly(pt, castList, { forImagePrompt: true })}.
${geminiRearForegroundLock}`;
    }).join('\n\n');
    panelSections = eyeLineBase ? `${eyeLineBase}\n\n${panelSections}` : panelSections;

    const antiCharSheetPrefix = ANTI_CHARSHEET_PREFIX;
    rawPrompt = antiCharSheetPrefix + buildGeminiMangaPrompt({
      showWatermarks,
      safeTopic, watermarkEng, styleCore, safeLocation, isMonochrome,
      bg360Image, bg360Analysis, bg360Enabled, bg360CroppedPanels,
      VAR_CAST_LIST: promptCastList, identityMatrix, activeOutfit: promptActiveOutfit,
      dynamicCamera, scriptLock: sceneLocks, panelSections, preserveReferenceStyle, seriousTone
    });
  }

  if (seriousTone) {
    rawPrompt = rawPrompt
      .replace(/Preserve scripted surreal gags, not unrelated defects\./g, 'Preserve scripted serious events and consequences, not unrelated defects.')
      .replace(/Preserve source-supported surreal gags and transformations/gi, 'Preserve source-supported serious events and consequences')
      .replace(/Comedy does not excuse unrelated drawing defects\./g, 'Drama does not excuse unrelated drawing defects.');
  }

  // 年齢セーフティフィルターの適用
  let safePrompt = applySafetyAgeUp(rawPrompt.trim());
  if (isMonochrome) {
    safePrompt = `${MONOCHROME_RENDERING_LOCK}\n\n${safePrompt}`;
  }
  safePrompt = `${buildRenderOptionsContract({ mosaicCopyrightedCharacters, showWatermarks })}\n\n${safePrompt}`;
  if (mosaicCopyrightedCharacters) {
    const protectedCast = buildProtectedCastContract(collectCastNameEntries(castList).map(entry => entry.displayName));
    if (protectedCast) safePrompt = `${protectedCast}\n${safePrompt}`;
  }
  if (!isChatGPTFamily && mosaicCopyrightedCharacters) {
    safePrompt += '\n\nFINAL MOSAIC OVERRIDE (never print): Opaque coarse mosaic OVERLAY only under MOSAIC TARGET SCOPE; protected cast excluded. Cover ENTIRE figure, head/ears through hands/feet, just beyond silhouette; not face-only. Flat opaque squares, 4–6 across face; no eyes/mouth/artwork over blocks. Preserve the scripted subject category, overall silhouette, dominant colors and story role; obscure fine identity details, no redesign. Never replace the masked subject with another person, species or object. Printed figures stay printed across panels. Mask overrides sharpness/natural artwork only inside it. Keep other cast/text clear; preserve explicit subject/region masks. Opaque overlay, not pixel-art styling.';
  }

  // ドキュメンタリーモード時の危険ワード言い換え
  if (isDocumentaryEnding(punchlineType)) {
    safePrompt = sanitizeForDocumentary(safePrompt);
  }

  const clarifiedPrompt = isChatGPTFamily
    ? compactForSoftTarget(safePrompt)
    : safePrompt;
  const baselinePrompt = isChatGPTFamily && clarifiedPrompt.length > promptTargetChars
    ? compactForSoftTarget(clarifiedPrompt)
    : clarifiedPrompt;
  const budgetedPrompt = isChatGPTFamily && baselinePrompt.length > promptMaxChars
    ? compactChatGPTConversationRules(baselinePrompt, isMonochrome, preserveReferenceStyle, seriousTone, promptMaxChars, false, sourceBlocks)
    : baselinePrompt;
  if (isChatGPTFamily) assertImagePromptBudget(budgetedPrompt, promptMaxChars);
  if (cinematicAssignments.length === 0) return captureMangaPromptArtifact(assertPrintableDialogue(budgetedPrompt), colorMode);

  const candidatePrompt = applyCinematicTechniqueSlot(
    budgetedPrompt,
    cinematicAssignments,
    effectiveProviderFamily
  );
  return captureMangaPromptArtifact(assertPrintableDialogue(candidatePrompt.length <= budgetedPrompt.length ? candidatePrompt : budgetedPrompt), colorMode);
};
