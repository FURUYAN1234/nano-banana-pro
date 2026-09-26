import { stripSourceMetadata } from './sns-explanation.js';
import { OPENAI_IMAGE_PROMPT_MAX_CHARS, assertImagePromptBudget } from './image-prompt-budget.js';
import { assertPrintableDialogue, VERTICAL_DIALOGUE_GEOMETRY } from './bubble-text.js';
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
  getPanelHandRoleResolution,
  HAND_PROP_KINEMATICS_LOCK,
  HAND_PROP_KINEMATICS_LOCK_COMPACT
} from './hand-prop-kinematics';
import {
  BODY_ACTING_BASELINE_COMPACT,
  LIMB_OWNERSHIP_CHECK,
  LIMB_OWNERSHIP_CHECK_COMPACT,
  EXPRESSIVE_DIRECTION,
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
import { normalizeMangaColorMode, isMonochromePrompt, sanitizeMonochromeSourceDescription, MONOCHROME_RENDERING_LOCK, MONOCHROME_RENDERING_LOCK_COMPACT, MONOCHROME_BACKGROUND_LOCK, MONOCHROME_BACKGROUND_LOCK_COMPACT, MONOCHROME_FINAL_CHROMA_AUDIT, MONOCHROME_FINAL_CHROMA_AUDIT_COMPACT } from './manga-render-mode.js';
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

// Web attachments and API requests share the API ceiling; no 15,000-char paste cap.
// The caller reserves space for the reference-image manifest before assembly.
const FACIAL_ACTING_LOCK_COMPACT = 'FACIAL ACTING LOCK: bold or subtle brow/eyelid/gaze target/mouth shape/head-torso cues as scripted. Do not force a close-up/camera gaze; preserve Camera/Action/eye-line/hands/props. Acting notes are not visible text; never print.';
const FACIAL_ACTING_LOCK_MINIMAL = 'FACIAL ACTING LOCK: brow, eyelid, gaze target, mouth shape, head/torso; do not force close-up; preserve Camera/Action/eye-line; not visible text.';
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

const compactChatGPTConversationRules = (prompt, monochrome = isMonochromePrompt(prompt), preserveReferenceStyle = false, seriousTone = false, maxChars = OPENAI_IMAGE_PROMPT_MAX_CHARS) => {
  if (prompt.length <= maxChars) return prompt;
  // 圧縮対象は指示だけ。台詞内の制御語・引用符を置換しない。
  let tokenPrefix = '__DIALOGUE_LITERAL_';
  while (prompt.includes(tokenPrefix)) tokenPrefix += '_';
  const literals = [];
  const protectedPrompt = prompt.replace(/(\bB\d+\s*=\s*)("(?:\\.|[^"\\])*")/g, (_, label, value) => {
    const index = literals.push(value) - 1;
    return `${label}"${tokenPrefix}${index}__"`;
  });
  const restore = value => value.replace(new RegExp(`"${tokenPrefix}(\\d+)__"`, 'g'), (_, index) => literals[Number(index)]);
  const compactWardrobeLock = preserveReferenceStyle
    ? "REFERENCE-SHEET WARDROBE AND RENDERING LOCK: explicit outfit overrides setting era/culture; preserve mismatch. Keep garment items and rendering method across panels."
    : 'CROSS-PANEL WARDROBE COLOR LOCK: fix garment items/colors once; reuse in all panels; style and lighting never change canonical wardrobe. Explicit outfit overrides setting era/culture; preserve mismatch, no period substitution. No outfit: infer from setting.';
  const compacted = protectedPrompt
    .replace(/LIMB OWNERSHIP CHECK[^\n]*/g, LIMB_OWNERSHIP_CHECK_COMPACT)
    .replace(MANGA_READING_RHYTHM_LOCK, MANGA_READING_RHYTHM_LOCK_COMPACT)
    .replace(/CONVERSATIONAL DEPTH BASE:[^\n]*/g, 'CONVERSATIONAL DEPTH BASE: Action gaze first; varied depth.')
    .replace(/EYE-LINE LOCK:[^\n]*/g, compactConversationEyeLine)
    .replace(/MANGA FINISH ASSIST:[^\n]*/g, 'FINISH: bubbles, anatomy.')
    .replace(/\[ SHARED IMAGE QUALITY CONTRACT[\s\S]*?(?=\n- Clean finish:)/g, `SHARED IMAGE QUALITY CONTRACT: one primary focal path. Face/hand/prop gets strongest G-pen-like contour: visibly heavier pressure-taper and bold contact accents; support/BG thinner/lighter. If depth-of-field blur still merges the focal subject, lighten/desaturate BG and strengthen focal G-pen. Keep light/setting/mono/anatomy/props; rear head has no invented face.\n${BODY_ACTING_BASELINE_COMPACT}\n${EXPRESSIVE_DIRECTION}\n${PANEL_EDGE_CONTINUITY_LOCK_COMPACT}\n${FUNCTIONAL_SURFACE_ORIENTATION_LOCK_COMPACT}\n${OBJECT_GEOMETRY_LOCK_COMPACT}`)
    .replace(/FACIAL ACTING LOCK:[\s\S]*?(?=\n- CLEAN SURFACE PROTOCOL:)/g, FACIAL_ACTING_LOCK_COMPACT)
    .replace(/RICH PANEL COMPOSITION \/ CHARACTER CLARITY LOCK:[\s\S]*?(?=\n- CLOTHING FOLD SHADOW ASSIST:)/g, RICH_PANEL_COMPOSITION_LOCK_COMPACT)
    .replace(/CLEAN SURFACE PROTOCOL:[^\n]*/g, 'CLEAN: no noise except style exceptions.')
    .replace(/CLOTHING FOLD SHADOW ASSIST:[^\n]*/g, 'FOLD SHADOWS: crisp triangular overlap shadows; no geometric patterns.')
    .replace(/SAFE VISUAL CONTENT LOCK:[^\n]*/g, 'SAFE VISUAL: no gore/blood/organs/flesh/organic horror; ordinary architecture; preserve script/cast/dialogue/camera/layout.')
    .replace(/PANEL-BY-PANEL CLOTHING FOLD PRIORITY:[^\n]*/g, 'FOLD PRIORITY: 2-4 dark triangular crease shadows.')
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
    // Keep the per-dialogue spatial map; shared rhythm already carries routing.
    .replace(/BUBBLE SLOTS \(NEVER PRINT; x=0 left,100 right\): ([^.]+)\. B1 RIGHTMOST, last LEFTMOST regardless of speaker positions; reserve before art\. Never mirror Camera\/actors; route tails across panel if needed\./g,
      'BUBBLE SLOTS: $1.')
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
    .replace(/CHARACTER QA PASS:\n-[^\n]*/g, monochrome ? 'CHARACTER QA: shape/design and stable ink/tone only; white lit skin; no reference color.' : 'CHARACTER QA: preserve identity and outfit; redraw swaps or merged cast.')
    .replace(/\n{3,}/g, '\n\n');

  if (restore(compacted).length <= maxChars) return restore(compacted);

  const maximallyCompacted = compacted
    .replace(/\[ MONOCHROME (?:THREE-TONE MANUSCRIPT|TWO-VALUE RENDERING) LOCK \][\s\S]*?(?=\n\nOUTPUT: Single image)/, MONOCHROME_RENDERING_LOCK_COMPACT)
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
      /VISUAL STORY EVIDENCE LOCK: visibly preserve the event-specific evidence from the approved scenario: ([^\n]*?)\. Show at least two distinct evidence items[^\n]*/g,
      'VISUAL STORY EVIDENCE LOCK: show $1; >=2 distinct items across >=2 panels where Actions place them; physical scene elements, not extra captions.'
    )
    .replace(/\n?SETTING CONTINUITY \(LOW PRIORITY\):[^\n]*/g, '')
    .replace(/MANGA CAMERA \/ POSE VARIETY LOCK:[^\n]*/g, MANGA_COMPOSITION_VARIETY_LOCK_COMPACT)
    .replace(/FINAL-PANEL ACTIVE STAGING LOCK:[^\n]*/g, 'FINAL-PANEL ACTIVE STAGING LOCK: no straight-line lineup; distinct physical action; faces, silhouettes, and hands readable.')
    // Retain named gaze targets and rear-shoulder owners even under budget pressure.
    .replace(/FUNCTIONAL SURFACE PANEL CHECK:[^\n]*/g, 'FUNCTIONAL SURFACE PANEL CHECK: reader/camera side/front-back/text axes.')
    .replace(/SHARED IMAGE QUALITY CONTRACT:[^\n]*/g, 'SHARED IMAGE QUALITY CONTRACT: one primary focal subject; face/hand/prop gets strongest G-pen-like contour and heavier pressure-taper; support/BG thinner/lighter. If blur still merges it, pale/desaturate BG and strengthen focal G-pen. Keep anatomy/props; rear head has no invented face.')
    .replace(/FACIAL ACTING LOCK:[^\n]*/g, FACIAL_ACTING_LOCK_MINIMAL)
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

  if (restore(maximallyCompacted).length <= maxChars) return restore(maximallyCompacted);

  const finallyCompacted = maximallyCompacted.replace(
    /CROSS-PANEL WARDROBE COLOR LOCK:[^\n]*/g,
    preserveReferenceStyle
      ? 'REFERENCE-SHEET WARDROBE AND RENDERING LOCK: preserve garment and rendering method across all panels.'
      : 'CROSS-PANEL WARDROBE COLOR LOCK: fix garment items/colors once; reuse in all panels; style and lighting never change canonical wardrobe. Explicit outfit overrides setting era/culture; preserve mismatch, no period substitution. No outfit: infer from setting.'
  )
    .replace(/^WARDROBE \/ ENVIRONMENT CONTRAST LOCK:[^\n]*\n?/gm, '')
    // Keep the per-dialogue numeric slot map through the final compaction.
    // RIGHTMOST/LEFTMOST labels alone were still overridden by speaker proximity
    // in real API output; the coordinates are the executable body-layout contract.
    .replace(/Bodies fixed; bubbles independent: B1 rightmost; B2\/B3\+ strictly leftward; never reverse\./g, 'Bodies fixed.')
    .replace(/ \[(?:RIGHTMOST|LEFTMOST|LEFT OF B\d+)\]/g, '')
    .replace(/^EXPRESSIVE DIRECTION:[^\n]*/gm, 'EXPRESSIVE DIRECTION: height/tilt/foreshortening; full-body acting; panel contrast: scale/light/VFX. Keep quiet beats, Camera/Action, identity, verbatim dialogue, limbs, prop ownership/facing.')
    .replace(/^CONVERSATIONAL DEPTH BASE:[^\n]*/gm, 'CONVERSATIONAL DEPTH BASE: Action gaze first; free camera.')
    .replace(/^EYE-LINE LOCK: (.+?) address (?:their )?counterparts;[^\n]*VIEWPOINT FREEDOM:[^\n]*/gm, 'EYE-LINE LOCK: $1 address counterparts; reactors watch speaker; never lens/front. VIEWPOINT FREEDOM: three-quarter; height/tilt/perspective. Camera preserves scenario direction.')
    .replace(/^Style: follow the named PANEL STYLE LOCK\.\n?/gm, '')
    // 白黒の各コマにも、上位ロックと同じ保持条件が重複している。
    // 画風固有の描線指示は残し、同一の末尾だけを省く。
    .replace(/^(MONOCHROME PANEL STYLE LOCK:[^\n]*) Preserve script\/Camera\/Action, cast, glasses and wardrobe tone assignments\.$/gm, '$1')
    .replace(/CROSS-PANEL WARDROBE TONE LOCK:\n- Assign[^\n]*/g, 'CROSS-PANEL WARDROBE TONE LOCK: keep assigned items/tone regions across panels; outfit override beats setting.')
    .replace(/^MONOCHROME STYLE DIFFERENCE QA:[^\n]*/gm, 'MONOCHROME STYLE DIFFERENCE QA: selected ink; keep identity/layout/tones.')
    // Geometry/azimuth contracts are already global; reserve space for visible shot cues.
    .replace(/^VFX: style overlay only; preserve readable action\.\n/gm, '')
    .replace(/^- Reproduce reference geometry and design using black ink\/white paper:[^\n]*/gm, '- Reference geometry/design only; no feature swapping.')
    .replace(/^- Adults 20\+\. Same face\/hair\/glasses\/outfit shapes and ink\/tone assignments; lit skin always white\.$/gm, '- Adults 20+. Same shapes/ink tones; lit skin white.')
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
    .replace(/^PLACEMENT\/IDENTITY:[^\n]*/gm, line => line.replace(/ \(bare eyes, no frames\)/g, ''));

  if (restore(finallyCompacted).length <= maxChars) return restore(finallyCompacted);

  // 全コマ共有の衣装原文は上位に残し、機械注入した同一文だけを各Actionから除く。
  // 台本固有の着脱・状態変化・本文は触らない。各コマで衣装を再設計させない。
  const sharedOutfit = finallyCompacted.match(/^- IGNORE reference clothing\. Follow role-specific outfit assignments: (.*); unscoped categories apply to all\.$/m)?.[1];
  return restore(finallyCompacted
    .replace(/^Action \(visual only\):[^\n]*/gm, line => sharedOutfit
      ? line.replace(`Action (visual only): (Outfit assignment: ${sharedOutfit}) `, 'Action (visual only): ')
      : line)
    // Web長文でもコマ割り自体は省略しない。同じ契約を短い日本語で保持する。
    .replace(/^PANELS: 4 full-width horizontal strips stacked vertically in ONE column; no 2x2\/side-by-side\.$/gm,
      'PANELS:横長4コマ全幅・縦1列・上→下。2×2/横並び禁止。')
    .replace(
      `PAGE:A4 ${MANGA_MANUSCRIPT_RATIO_LABEL} (${MANGA_MANUSCRIPT_ASPECT_LABEL}); canvas ${MANGA_MANUSCRIPT_STANDARD.value} or ${MANGA_MANUSCRIPT_LARGE.value};`,
      `PAGE:A4 ${MANGA_MANUSCRIPT_RATIO_LABEL}; ${MANGA_MANUSCRIPT_STANDARD.value} or ${MANGA_MANUSCRIPT_LARGE.value};`
    )
    .replace('ABSOLUTE TASK: new 4-panel manga page; refs only for identity.', 'TASK: 4-panel manga; refs=cast identity.')
    .replace(/HAND \/ PROP KINEMATICS LOCK:[^\n]*/g, HAND_PROP_KINEMATICS_LOCK_COMPACT)
    .replace(/FACIAL ACTING LOCK:[^\n]*/g, FACIAL_ACTING_LOCK_MINIMAL)
    .replace(/LIMB OWNERSHIP CHECK:[^\n]*/g, LIMB_OWNERSHIP_CHECK_MINIMAL)
    .replace(/SHARED IMAGE QUALITY CONTRACT:[^\n]*/g, 'SHARED IMAGE QUALITY CONTRACT: one primary focal subject; face/hand/prop gets strongest G-pen-like contour and heavier pressure-taper; support/BG thinner/lighter. If blur still merges it, pale/desaturate BG and strengthen focal G-pen. Keep anatomy/props; rear head has no invented face.')
    .replace(/EXPRESSIVE DIRECTION:[^\n]*/g, 'EXPRESSIVE DIRECTION: height/tilt/foreshortening; full-body acting; panel contrast; quiet beats; keep Camera/Action/identity/dialogue/limbs/props.')
    .replace(/CROSS-PANEL WARDROBE COLOR LOCK:[^\n]*/g, compactWardrobeLock)
    .replace(/^- CLEAN FINISH:[^\n]*\n?/gm, '')
    .replace(/CAST COUNT: ([^\n]+?) each EXACTLY ONCE; no named-character duplicates\./g, 'CAST COUNT: $1 each EXACTLY ONCE.')
    .replace(/^- Panel (\d+) required story beat:[^\n]*$/gm, '- Panel $1: exact Action below.')
    .replace(/^- Panel \d+: exact Action below\.\n?/gm, '')
    .replace(/^CRITICAL PLACEMENT & IDENTITY:[^\n]*\n?/gm, '')
    .replace(/^CAST LIMIT: main focus /gm, 'CAST LIMIT: focus ')
    .replace(/^CAST INSTANCE LOCK:[^\n]*/gm, 'CAST INSTANCE LOCK: reuse same.')
    .replace(/^DIEGETIC REPLICA LAYER:\s*([^\n]*?)(?: may appear as one tiny replica each, fully inside the explicitly scripted container\/surface\.[^\n]*)$/gm, 'DIEGETIC REPLICA LAYER: $1 one tiny copy each inside scripted container only; never full-size/outside.')
    .replace(/CAST DEPTH: Camera\/Action layers win; no speaker-based FG slots or duplicates\./g, 'CAST DEPTH: Camera/Action; no duplicate.')
    .replace(/NO OTHER HUMANS: exactly (\d+) people\./g, 'TOTAL $1 people; no others.')
    .replace(/^NON-VISIBLE CASTING CONSTRAINT:[^\n]*/gm, 'NON-VISIBLE CASTING: adults 20+; no print.')
    .replace(/^TYPE: title[^\n]*/gm, `TYPE: title EXTRA-BOLD condensed Japanese Gothic. TITLE BAND: white; no box/border. BUBBLES: vertical tategaki, regular manga Mincho; never bold Gothic/sans. ${VERTICAL_DIALOGUE_GEOMETRY}`)
    .replace(/^FG only:/gm, 'FG:')
    .replace(/ BG only:/g, ' BG:')
    .replace(/^BLACK INK PLATE:[^\n]*/gm, 'BLACK INK PLATE: redraw; refs=identity, not palette.')
    .replace(/^SOURCE COLOR BOUNDARIES:[^\n]*/gm, 'SOURCE COLOR BOUNDARIES: black/white/screen.')
    .replace(/^SCENE COLOR PRIORITY:[^\n]*/gm, 'SCENE COLOR PRIORITY: story and verbatim text over source hues.')
    .replace(/^WHITE PAPER RESERVE:[^\n]*/gm, 'WHITE RESERVE: large unprinted/panel; light skin/wall/sky=white. Focal face: one bounded shadow plane; never whole-face/panel/BG screen.')
    .replace(/^DEPTH OF FIELD \/ DEFOCUS:[^\n]*/gm, 'DEPTH-OF-FIELD DEFOCUS: fewer far lines/wider white gaps; assigned screen.')
    .replace(/^G-PEN INK DIRECTION:[^\n]*/gm, 'G-PEN INK DIRECTION: pressure-taper; bold focal. BLACK-HAIR INK LOCK: darkest reference hair=solid black; white shine only, no screen.')
    .replace(/^BLACK-HAIR INK LOCK:[^\n]*\n?/gm, '')
    .replace(/^INK LIGHT \/ ACTING:[^\n]*/gm, 'INK LIGHT / ACTING: full-body action amplitude; directional solid-black cast shadows, white rim cutouts; keep depth/beats.')
    .replace(/^MONOCHROME BACKGROUND CLARITY LOCK:[^\n]*/gm, 'MONOCHROME BACKGROUND CLARITY LOCK: omit textures; keep setting/depth/story evidence/white.')
    .replace(/^MONOCHROME FINAL CHROMA AUDIT:[^\n]*/gm, 'MONOCHROME FINAL CHROMA AUDIT: white/black/screen only; no hue/grey.')
    // Identity Matrix and adult casting already cover these reminders. Keep the
    // functional-surface check local to every panel so projection is not lost.
    .replace(/^.*GLASSES CHECK:[^\n]*\n?/gm, '')
    .replace(/^CROSS-CHECK:[^\n]*\n?/gm, '')
    .replace(/^- Adults 20\+\.[^\n]*\n?/gm, '')
    .replace(/^- Identity Anchor:\s*\n【IDENTITY MATRIX[^\n]*\nCross-check EVERY[^\n]*\n/gm, 'IDENTITY MATRIX:\n')
    .replace(/^(?:ART \/ RENDERING QUALITY:|CHARACTER IDENTITY:|TEXT RULES:)\n/gm, '')
    .replace(/^- Only Dialogue becomes white bubbles:[^\n]*/gm, '- Only Dialogue becomes white bubbles: vertical Japanese tategaki, verbatim; no paraphrase/synonyms/softening/addition/omission/horizontal text.')
    .replace(/^- Explicit scripted handwriting[^\n]*/gm, '- Scripted surface text exact; unscripted never becomes bubble/narration/metadata.')
    .replace(/^SCENE LETTERING:[^\n]*/gm, 'SCENE LETTERING: scripted object text exact, repeated only if scripted. Other surfaces: natural artwork/pictograms/colors/borders/material/layout; context-appropriate readable/decorative lettering, short/long, any amount/density. Never suppress/simplify/blank/grey/blur/pixelate/mosaic/censor surfaces.')
    .replace(/^ART-STYLE DIFFERENCE QA LOCK:[^\n]*/gm, 'ART-STYLE DIFFERENCE QA LOCK: selected style visible in linework, not only expression/VFX; no numeric quota; keep script/identity/wardrobe/props/layout.')
    .replace(/\. Keep faces\/skin clean; do not add unrelated noise\./g, '. Faces/skin clean; no unrelated noise.')
    .replace(/^FUNCTIONAL SURFACE ORIENTATION LOCK:[^\n]*/gm, 'FUNCTIONAL SURFACE ORIENTATION LOCK: fronts face reader/operator/recipient; opposite=back, flat-page text inverted. Rear holder + chest object: occlude/show side/back/edge; never project front/hands through torso. Explicit Camera fixed. If unspecified, move camera, not object. Present to camera/viewer only if scripted.')
    // 同じ台本・人体保護はPROMPT PRIORITYに残す。読順・尻尾・演技条件は省略しない。
    .replace(/^PAGE READING RHYTHM:[^\n]*/gm, 'PAGE READING RHYTHM: one focal target/panel. PROFESSIONAL VISUAL FLOW PRIORITY: panel entry -> primary focal -> reaction/prop -> next bubble -> next panel; top-right, right-to-left. Guide gaze/head/torso/hands/diagonals/light/contrast/negative space; clear story/joke, peak/quiet, density. Scripted abstract BG: props stay. INTERACTION: reactions readable; support smaller/lower-contrast. ACTING: vary gaze/weight/hands. DEPTH OF FIELD: real shots keep setting/depth, far blur; no default blank. MULTIPLE BUBBLES: B1 rightmost regardless of speaker; later strictly left. DRAW BALLOON BODIES BEFORE ACTORS: x=0 left,100 right; freeze numeric slots. SINGLE BUBBLE: speaker-side space. TAIL GEOMETRY: lower speaker-facing root; shortest unobstructed route to mapped mouth/head; never cross head/face/hair/text.')
    .replace(/^PROMPT PRIORITY:[^\n]*/gm, 'PROMPT PRIORITY: protect cast/count/identity/glasses, wardrobe, exact script, Camera geometry, layout/style/medium. CAMERA FIRST: fixed projection; never relocate for legibility/chibi or mirror screen-left/right. Simplify only unspecified background texture and decorative VFX. Never print.')
    .replace(/^[\t ]+|[\t ]+$/gm, '')
    .replace(/[\t ]{2,}/g, ' ')
    .replace(/\n{2,}/g, '\n'));
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
  const lightSkinNames = namesFor('LIGHT-SKIN');
  const screenedSkinNames = namesFor('SCREENED-SKIN');
  const skinRules = [
    lightSkinNames.length
      ? `WHITE-SKIN[${lightSkinNames.join(',')}].`
      : '',
    screenedSkinNames.length
      ? `SCREEN-SKIN[${screenedSkinNames.join(',')}]:palms same; no patches.`
      : ''
  ].filter(Boolean).join(' ');
  return `PANEL INK:white/black;no veil. ${skinRules} ${cheekRule}`.replace(/\s+/g, ' ').trim();
};

const clarifyBubbleCountPlacement = (prompt) => String(prompt)
  .replace(
    'For Japanese right-to-left reading, the first scripted line must be physically nearest the panel right border even when its speaker stands on the left; the second line must be physically left of it. For two bubbles B1 is far right (about 67%) and B2 far left (about 33%). B1 is rightmost, B2 is strictly left of B1, and every later body is strictly left of its predecessor. Freeze balloon bodies at those slots before drawing characters; never move a body toward its speaker. Only afterward route each mapped tail across the panel to its speaker, even when the tail must be long.',
    'MULTIPLE BUBBLES: for Japanese right-to-left reading, B1 is rightmost regardless of speaker and every later body is strictly left; freeze those slots before actors, then route each mapped tail even when long. SINGLE BUBBLE: no rightmost constraint; place its body in clear negative space on the assigned speaker side for the shortest unobstructed tail, without covering faces, hands, props, or action.'
  );

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
    const storyBeat = compactScriptLockOrReference(
      buildPanelActionText(panelText, castList, activeOutfit, isMonochrome ? 'monochrome' : 'color'),
      80,
      `EXACT Panel ${panelNumber} Action below`
    );
    const dialogue = extractDialogueOnly(panelText, castList, {forImagePrompt: true, forScriptLock: true})
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
  : seriousTone
    ? '- SERIOUS INTENT: Preserve the scripted emotional causality, restraint, consequences and selected serious ending. Build intensity through camera, composition, lighting, gaze and body acting. Do not add a gag, chibi transformation, absurd event, punchline reversal or comic release.'
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
  const endingPolicy = getEndingModePolicy(punchlineType);
  const preserveReferenceStyle = endingPolicy.preserveReferenceStyle;
  const seriousTone = endingPolicy.endingTone === 'serious';

  // Only explicit selection changes the medium; legacy/unknown values default to color.
  const isMonochrome = normalizeMangaColorMode(colorMode) === 'monochrome';

  // アートスタイルの基本プロンプトの決定
  const styleCore = preserveReferenceStyle
    ? buildReferenceSheetArtStyleLock({ monochrome: isMonochrome })
    : isMonochrome
    ? 'Draw a finished Japanese three-tone manga manuscript: white paper, solid black ink and one bounded screentone; hatching is black linework, not another tonal class; expressive camera and acting.'
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
  const sceneLocks = [scriptLock, documentarySourceFactLock, compositionVarietyLock, gestureVarietyLock, actingIdentityNotes, `${HAND_PROP_KINEMATICS_LOCK}\n${LIMB_OWNERSHIP_CHECK}`, visualStoryEvidenceLock, settingContinuityLock, finalPanelStagingLock, MANGA_READING_RHYTHM_LOCK]
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
Camera: ${camera}
${getEndingSafePanelShotExecution(camera, seriousTone)}
${isMonochrome ? buildMonochromePanelInkLock(pt, identityMatrix) : ''}
${buildEmotionBlock(pt, colorMode, { preserveReferenceStyle, seriousTone })}
${extractPlacementRule(pt, castList, { compact: true, colorMode }).replace(/\\\\[/g, '').replace(/\\\\]/g, '')}
${extractCastLimitRule(pt, castList, { compact: true }).replace(/\\\\[/g, '').replace(/\\\\]/g, '')}
COMPOSITION STAGING: ${getPanelCompositionAssist(pt, num, { compact: true })}
${FUNCTIONAL_SURFACE_PANEL_CHECK}
${eyeLineRule}
${getPanelHandRoleResolution(pt)}
Action (visual only): ${buildPanelActionText(pt, castList, promptActiveOutfit, colorMode)}
Dialogue (verbatim bubbles): ${extractDialogueOnly(pt, castList, { forImagePrompt: true })}`;
    }).join('\n\n');
    panelSections = eyeLineBase ? `${eyeLineBase}\n\n${panelSections}` : panelSections;

    rawPrompt = buildChatGPTMangaPrompt({
      safeTopic, watermarkEng, styleCore, safeLocation, isMonochrome,
      bg360Image, bg360Analysis, bg360Enabled, bg360CroppedPanels,
      VAR_CAST_LIST_CHATGPT, identityMatrix, activeOutfit: promptActiveOutfit,
      scriptLock: sceneLocks, panelSections, preserveReferenceStyle, seriousTone
    });
    rawPrompt = compactChatGPTConversationRules(rawPrompt, isMonochrome, preserveReferenceStyle, seriousTone, promptMaxChars);
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
Camera: ${camera}.
${getEndingSafePanelShotExecution(camera, seriousTone)}
${isMonochrome ? buildMonochromePanelInkLock(pt, identityMatrix) : ''}
${buildEmotionBlock(pt, colorMode, { preserveReferenceStyle, seriousTone })}
${extractPlacementRule(pt, castList, { colorMode })}
${extractCastLimitRule(pt, castList)}
COMPOSITION STAGING: ${getPanelCompositionAssist(pt, num)}
${FUNCTIONAL_SURFACE_PANEL_CHECK}
${lensRule}
${eyeLineRule}
${getPanelHandRoleResolution(pt)}
Action (Visual ONLY, non-dialogue; do NOT render quoted words as visible text unless this action explicitly says handwriting, signage, board text, label text, or screen text): ${buildPanelActionText(pt, castList, promptActiveOutfit, colorMode)}.
Dialogue (ONLY inside bubbles): ${extractDialogueOnly(pt, castList, { forImagePrompt: true })}.
${geminiRearForegroundLock}`;
    }).join('\n\n');
    panelSections = eyeLineBase ? `${eyeLineBase}\n\n${panelSections}` : panelSections;

    const antiCharSheetPrefix = ANTI_CHARSHEET_PREFIX;
    rawPrompt = antiCharSheetPrefix + buildGeminiMangaPrompt({
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
  if (isMonochrome) safePrompt = `${MONOCHROME_RENDERING_LOCK}\n\n${safePrompt}`;

  // ドキュメンタリーモード時の危険ワード言い換え
  if (isDocumentaryEnding(punchlineType)) {
    safePrompt = sanitizeForDocumentary(safePrompt);
  }

  const clarifiedPrompt = clarifyBubbleCountPlacement(isChatGPTFamily
    ? compactChatGPTConversationRules(safePrompt, isMonochrome, preserveReferenceStyle, seriousTone, promptMaxChars)
    : safePrompt);
  const baselinePrompt = isChatGPTFamily && clarifiedPrompt.length > promptMaxChars
    ? compactChatGPTConversationRules(clarifiedPrompt, isMonochrome, preserveReferenceStyle, seriousTone, promptMaxChars)
    : clarifiedPrompt;
  if (isChatGPTFamily) assertImagePromptBudget(baselinePrompt, promptMaxChars);
  if (cinematicAssignments.length === 0) return assertPrintableDialogue(baselinePrompt);

  const candidatePrompt = applyCinematicTechniqueSlot(
    baselinePrompt,
    cinematicAssignments,
    effectiveProviderFamily
  );
  return assertPrintableDialogue(candidatePrompt.length <= baselinePrompt.length ? candidatePrompt : baselinePrompt);
};
