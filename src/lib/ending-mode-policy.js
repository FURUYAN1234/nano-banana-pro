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

export const buildReferenceSheetArtStyleLock = ({ monochrome = false } = {}) => `REFERENCE-SHEET ART-STYLE LOCK (ABSOLUTE — ALL FOUR PANELS):
- Use every attached character sheet as the authoritative art-style reference. Across all four panels preserve its linework, coloring method, shading design, facial construction, eye design, body proportions and degree of stylization.
- Emotion tags describe expression and acting only. They MUST NOT trigger chibi, gekiga, watercolor, painterly, retro, pop-art, sketch, photorealistic or any other panel-specific art-style transformation.
- Keep serious intensity through expression, gaze, body acting, camera, composition and lighting while the drawing style remains unchanged.
- Do not reproduce character-sheet layouts, labels, explanatory text, expression grids, sample poses, duplicate views or white reference backgrounds as story content.
- ${monochrome
  ? 'For monochrome output, change only the color medium to pure white paper, solid black ink and regular black-on-white halftone. Retain the reference linework, facial construction, body proportions and shading design.'
  : 'For color output, retain the reference sheet\'s color-rendering method and character palette; scene lighting may change illumination, not the underlying art style.'}`;
