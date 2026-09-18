const DEFAULT_ENDING_POLICY = Object.freeze({
  documentary: false,
  endingTone: 'gag',
  preserveReferenceStyle: false,
  label: null
});

const ENDING_MODE_POLICIES = Object.freeze({
  Auto: Object.freeze({
    documentary: false,
    endingTone: 'auto',
    preserveReferenceStyle: false,
    label: '自動（題材に合わせてギャグ／シリアス）'
  }),
  GagAuto: Object.freeze({ documentary: false, endingTone: 'gag', preserveReferenceStyle: false, label: 'ギャグ内でおまかせ（ギャグの結末から自動選択）' }),
  SeriousAuto: Object.freeze({
    documentary: false,
    endingTone: 'serious',
    preserveReferenceStyle: false,
    label: 'シリアス内でおまかせ'
  }),
  QuietAftermath: Object.freeze({
    documentary: false,
    endingTone: 'serious',
    preserveReferenceStyle: false,
    label: '静かな余韻'
  }),
  Resolve: Object.freeze({
    documentary: false,
    endingTone: 'serious',
    preserveReferenceStyle: false,
    label: '決意・再出発'
  }),
  Warning: Object.freeze({
    documentary: false,
    endingTone: 'serious',
    preserveReferenceStyle: false,
    label: '警告'
  }),
  OpenQuestion: Object.freeze({
    documentary: false,
    endingTone: 'serious',
    preserveReferenceStyle: false,
    label: '問題提起'
  }),
  EmotionalClosure: Object.freeze({
    documentary: false,
    endingTone: 'serious',
    preserveReferenceStyle: false,
    label: '感動・救い'
  }),
  TragicClosure: Object.freeze({
    documentary: false,
    endingTone: 'serious',
    preserveReferenceStyle: false,
    label: '悲劇・喪失'
  }),
  Surreal: Object.freeze({ documentary: false, endingTone: 'gag', preserveReferenceStyle: false, label: '静寂型 (シュール)' }),
  Explosion: Object.freeze({ documentary: false, endingTone: 'gag', preserveReferenceStyle: false, label: '爆発型 (カオス)' }),
  FakeEmotion: Object.freeze({ documentary: false, endingTone: 'gag', preserveReferenceStyle: false, label: '感動詐欺' }),
  Metafiction: Object.freeze({ documentary: false, endingTone: 'gag', preserveReferenceStyle: false, label: 'メタフィクション' }),
  Unreasonable: Object.freeze({ documentary: false, endingTone: 'gag', preserveReferenceStyle: false, label: '理不尽な制裁' }),
  RunningGag: Object.freeze({ documentary: false, endingTone: 'gag', preserveReferenceStyle: false, label: '天丼' }),
  Dream: Object.freeze({ documentary: false, endingTone: 'gag', preserveReferenceStyle: false, label: '夢オチ (ループ)' }),
  Misunderstanding: Object.freeze({ documentary: false, endingTone: 'gag', preserveReferenceStyle: false, label: '盛大な勘違い (すれ違い)' }),
  CanceledEnding: Object.freeze({ documentary: false, endingTone: 'gag', preserveReferenceStyle: false, label: '打ち切りエンド (俺たちの戦いはこれからだ)' }),
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

export const SERIOUS_ENDING_OPTIONS = Object.freeze([
  Object.freeze({ value: 'SeriousAuto', icon: '🤖', menuLabel: 'シリアス内でおまかせ（シリアスの結末から自動選択）' }),
  Object.freeze({ value: 'QuietAftermath', icon: '🌙', menuLabel: '静かな余韻（言葉を抑え、感情を残す）' }),
  Object.freeze({ value: 'Resolve', icon: '🌅', menuLabel: '決意・再出発（困難を受け止め、次へ進む）' }),
  Object.freeze({ value: 'Warning', icon: '⚠️', menuLabel: '警告（危機や代償を示す）' }),
  Object.freeze({ value: 'OpenQuestion', icon: '❓', menuLabel: '問題提起（答えを急がず、問いを残す）' }),
  Object.freeze({ value: 'EmotionalClosure', icon: '🕯️', menuLabel: '感動・救い（理解や支えで心を結ぶ）' }),
  Object.freeze({ value: 'TragicClosure', icon: '🌧️', menuLabel: '悲劇・喪失（取り戻せないものと向き合う）' })
]);

export const GAG_ENDING_OPTIONS = Object.freeze([
  Object.freeze({ value: 'Surreal', icon: '❄️', menuLabel: '静寂型 (シュール/無言)' }),
  Object.freeze({ value: 'Explosion', icon: '🔥', menuLabel: '爆発型 (カオス/叫び)' }),
  Object.freeze({ value: 'FakeEmotion', icon: '😢', menuLabel: '感動詐欺 (いい話風の狂気)' }),
  Object.freeze({ value: 'Metafiction', icon: '📖', menuLabel: 'メタフィクション (枠を越える)' }),
  Object.freeze({ value: 'Unreasonable', icon: '🔨', menuLabel: '理不尽な制裁 (突然の暴力)' }),
  Object.freeze({ value: 'RunningGag', icon: '🔁', menuLabel: '天丼 (同じボケの最終形態)' }),
  Object.freeze({ value: 'Dream', icon: '🛏️', menuLabel: '夢オチ (ループの恐怖)' }),
  Object.freeze({ value: 'Misunderstanding', icon: '🤷', menuLabel: '盛大な勘違い (すれ違いの頂点)' }),
  Object.freeze({ value: 'CanceledEnding', icon: '🏃', menuLabel: '打ち切りエンド (俺たちの戦いはこれからだ)' })
]);

export const DOCUMENTARY_ENDING_OPTIONS = Object.freeze([
  Object.freeze({ value: 'SeriousDocumentary', menuLabel: ENDING_MODE_POLICIES.SeriousDocumentary.label }),
  Object.freeze({ value: 'Documentary', menuLabel: ENDING_MODE_POLICIES.Documentary.label })
]);

export const getEndingModePolicy = (type) => ENDING_MODE_POLICIES[type] || DEFAULT_ENDING_POLICY;

export const resolveScenarioEndingType = (scenario, fallback) => {
  const label = String(scenario || '').match(/^Punchline:\s*([^\r\n]+)/mi)?.[1]?.trim();
  return Object.entries(ENDING_MODE_POLICIES).find(([key, policy]) => key === label || policy.label === label)?.[0] || fallback;
};

export const isDocumentaryEnding = (type) => getEndingModePolicy(type).documentary;

export const isSeriousEnding = (type) => getEndingModePolicy(type).endingTone === 'serious';

const GENERAL_SERIOUS_PROMPT_CHECKS = Object.freeze([
  Object.freeze({ issue: 'comedy-intent', pattern: /^\s*-?\s*COMEDY INTENT:/im }),
  Object.freeze({ issue: 'chibi-style', pattern: /^\s*(?:MONOCHROME )?PANEL STYLE LOCK:\s*CHIBI(?:\\?_)?GAG\b/im }),
  Object.freeze({ issue: 'gag-overlay', pattern: /^\s*GAG INTENT OVERLAY:/im })
]);

const DOCUMENTARY_STYLE_PROMPT_CHECKS = Object.freeze([
  Object.freeze({ issue: 'proportion-override', pattern: /^\s*PROPORTION OVERRIDE:/im }),
  Object.freeze({ issue: 'panel-style-switch', pattern: /^\s*(?:MONOCHROME )?PANEL STYLE LOCK:/im }),
  Object.freeze({ issue: 'style-difference-qa', pattern: /^\s*(?:MONOCHROME )?ART-STYLE DIFFERENCE QA LOCK:/im })
]);

export const validatePromptEndingModeConsistency = ({ prompt, punchlineType } = {}) => {
  const policy = getEndingModePolicy(punchlineType);
  if (policy.endingTone !== 'serious') {
    return { ok: true, issues: [] };
  }

  const text = String(prompt || '');
  const issues = [];
  if (!/SERIOUS(?: DOCUMENTARY)? INTENT:/i.test(text)) {
    issues.push('missing-serious-intent');
  }
  if (policy.preserveReferenceStyle && !/REFERENCE-SHEET ART-STYLE LOCK \(ABSOLUTE[^\n]*ALL FOUR PANELS\)/i.test(text)) {
    issues.push('missing-reference-style-lock');
  }
  for (const { issue, pattern } of GENERAL_SERIOUS_PROMPT_CHECKS) {
    if (pattern.test(text)) issues.push(issue);
  }
  for (const { issue, pattern } of policy.preserveReferenceStyle ? DOCUMENTARY_STYLE_PROMPT_CHECKS : []) {
    if (pattern.test(text)) issues.push(issue);
  }
  return { ok: issues.length === 0, issues };
};

export const assertPromptEndingModeConsistency = (options = {}) => {
  const result = validatePromptEndingModeConsistency(options);
  if (result.ok) return result;

  const error = new Error(`選択したシリアス結末と最終プロンプトが一致しません（${result.issues.join(', ')}）。STEP2からシナリオを作り直し、STEP3で最終プロンプトを再生成してください。`);
  error.code = 'SERIOUS_PROMPT_MODE_MISMATCH';
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
