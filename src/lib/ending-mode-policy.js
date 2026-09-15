const DEFAULT_ENDING_POLICY = Object.freeze({
  documentary: false,
  endingTone: 'gag',
  preserveReferenceStyle: false,
  label: null
});

const ENDING_MODE_POLICIES = Object.freeze({
  SeriousDocumentary: Object.freeze({
    documentary: true,
    endingTone: 'serious',
    preserveReferenceStyle: true,
    label: 'シリアス・ドキュメンタリー（原文忠実＋オチだけシリアス漫画化・絵柄変更無し）'
  }),
  Documentary: Object.freeze({
    documentary: true,
    endingTone: 'gag',
    preserveReferenceStyle: false,
    label: 'ギャグ・ドキュメンタリー（原文忠実＋オチだけギャグ漫画化）'
  })
});

export const DOCUMENTARY_ENDING_OPTIONS = Object.freeze([
  Object.freeze({ value: 'SeriousDocumentary', menuLabel: ENDING_MODE_POLICIES.SeriousDocumentary.label }),
  Object.freeze({ value: 'Documentary', menuLabel: ENDING_MODE_POLICIES.Documentary.label })
]);

export const getEndingModePolicy = (type) => ENDING_MODE_POLICIES[type] || DEFAULT_ENDING_POLICY;

export const isDocumentaryEnding = (type) => getEndingModePolicy(type).documentary;

const SERIOUS_PROMPT_CHECKS = Object.freeze([
  Object.freeze({ issue: 'comedy-intent', pattern: /^\s*-?\s*COMEDY INTENT:/im }),
  Object.freeze({ issue: 'chibi-style', pattern: /^\s*(?:MONOCHROME )?PANEL STYLE LOCK:\s*CHIBI(?:\\?_)?GAG\b/im }),
  Object.freeze({ issue: 'proportion-override', pattern: /^\s*PROPORTION OVERRIDE:/im }),
  Object.freeze({ issue: 'panel-style-switch', pattern: /^\s*(?:MONOCHROME )?PANEL STYLE LOCK:/im }),
  Object.freeze({ issue: 'gag-overlay', pattern: /^\s*GAG INTENT OVERLAY:/im }),
  Object.freeze({ issue: 'style-difference-qa', pattern: /^\s*(?:MONOCHROME )?ART-STYLE DIFFERENCE QA LOCK:/im })
]);

export const validatePromptEndingModeConsistency = ({ prompt, punchlineType } = {}) => {
  if (!getEndingModePolicy(punchlineType).preserveReferenceStyle) {
    return { ok: true, issues: [] };
  }

  const text = String(prompt || '');
  const issues = [];
  if (!/REFERENCE-SHEET ART-STYLE LOCK \(ABSOLUTE[^\n]*ALL FOUR PANELS\)/i.test(text)) {
    issues.push('missing-reference-style-lock');
  }
  for (const { issue, pattern } of SERIOUS_PROMPT_CHECKS) {
    if (pattern.test(text)) issues.push(issue);
  }
  return { ok: issues.length === 0, issues };
};

export const assertPromptEndingModeConsistency = (options = {}) => {
  const result = validatePromptEndingModeConsistency(options);
  if (result.ok) return result;

  const error = new Error(`シリアス・ドキュメンタリーの絵柄固定と最終プロンプトが一致しません（${result.issues.join(', ')}）。STEP2からシナリオを作り直し、STEP3で最終プロンプトを再生成してください。`);
  error.code = 'SERIOUS_DOCUMENTARY_PROMPT_MODE_MISMATCH';
  error.issues = result.issues;
  throw error;
};

export const buildReferenceSheetArtStyleLock = ({ monochrome = false } = {}) => `REFERENCE-SHEET ART-STYLE LOCK (ABSOLUTE — ALL FOUR PANELS):
- Use every attached character sheet as the authoritative art-style reference. Across all four panels preserve its ${monochrome ? 'linework, facial construction, eye design, body proportions and degree of stylization; translate shading into the selected ink medium' : 'linework, coloring method, shading design, facial construction, eye design, body proportions and degree of stylization'}.
- Emotion tags describe expression and acting only. They MUST NOT trigger chibi, gekiga, watercolor, painterly, retro, pop-art, sketch, photorealistic or any other panel-specific art-style transformation.
- Keep serious intensity through expression, gaze, body acting, camera, composition and lighting while the drawing style remains unchanged.
- Do not reproduce character-sheet layouts, labels, explanatory text, expression grids, sample poses, duplicate views or white reference backgrounds as story content.
- ${monochrome
  ? 'For monochrome output, change only the color medium to pure white paper, solid black ink and regular black-on-white halftone. Retain the reference linework, facial construction, body proportions and shading design as bounded ink shapes; the white-paper reserves override source fills and gradients.'
  : 'For color output, retain the reference sheet\'s color-rendering method and character palette; scene lighting may change illumination, not the underlying art style.'}`;
