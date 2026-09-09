export const IMAGE_QUALITY_MAX_ATTEMPTS = 2;

const SINGLE_IMAGE_PROMPT_RE = /\[\s*ANTIGRAVITY EMOTIONAL CINEMA ENGINE\b|Create a SINGLE breathtaking illustration/i;

export const inferImageQualityMode = (prompt = '') => (
  SINGLE_IMAGE_PROMPT_RE.test(String(prompt)) ? 'single-image' : 'four-panel'
);

const createUnverifiedReview = (reason) => ({
  pass: false,
  issues: [{
    type: 'unverified',
    panel: null,
    subject: 'image quality review',
    reason: reason?.message || String(reason || 'Quality review could not be completed.'),
  }],
});

const hasConcreteIssues = (review) => (
  Array.isArray(review?.issues) && review.issues.some((issue) => issue?.type !== 'unverified')
);

const formatRepairIssue = (issue = {}) => (
  `- panel ${issue.panel ?? 'unknown'} / ${issue.type || 'unverified'} / ${issue.subject || 'unspecified'}: ${issue.reason || 'visible issue'}`
);

export const buildImageQualityRepairPrompt = ({ originalPrompt = '', issues = [], mode, sourceMode = 'regenerate' } = {}) => {
  const concreteIssues = issues
    .filter((issue) => issue?.type !== 'unverified')
    .slice(0, 8)
    .map(formatRepairIssue)
    .join('\n');

  const effectiveMode = mode || inferImageQualityMode(originalPrompt);
  if (sourceMode === 'source-image') {
    const sourceLayout = effectiveMode === 'single-image'
      ? 'Edit the same single illustration. Do not introduce panels, a comic page, a collage, additional scenes, new characters, or a new setting.'
      : 'Edit the same four-panel manga page. Preserve exactly four separate visible panels and the original page geometry. Do not merge, omit, duplicate, or reorder panels.';
    return `${String(originalPrompt)}

  IMAGE QUALITY CORRECTION ATTEMPT (bounded retry 2/${IMAGE_QUALITY_MAX_ATTEMPTS}):
  SOURCE IMAGE TO EDIT: the first attached image is the actual completed original, not a character sheet.
  ${sourceLayout}
  CHANGE:
  Correct only the concrete visible defects listed below, using the smallest coherent edit:
  ${concreteIssues || '- No concrete issue was supplied; do not introduce any change.'}
  PRESERVE:
  Do not change the approved dialogue, cast, story action, identities, canonical clothing, reading order, camera, crop, typography, colors, or already-correct content outside the defects.
  Keep the original as the visual baseline. Never redraw the page from scratch or copy the reference-sheet layout.
  Allow only necessary local contact and shadow changes caused by fixing the listed defect; do not freeze the defective geometry itself.
  VERIFY:
  Check the corrected defect against the approved prompt and reference sheets. Check every dialogue line, its speaker, cast identity, hand and prop ownership, camera and unchanged regions for regressions.
  Do not add speaker names, metadata, translations, annotations, extra text or new characters.`;
  }

  const preservationLock = effectiveMode === 'single-image'
    ? `Create a corrected replacement for the same single illustration.
Do not introduce panels, panel borders, a comic page, a collage, additional scenes, new characters, or a new setting.
Do not change the approved subject count, action, setting, camera, crop, or story beat.`
    : `Create a corrected replacement for the same four-panel manga page.
Preserve exactly four separate visible panels and the original page geometry.
Do not merge, omit, duplicate, or reorder panels. Do not change the approved dialogue, cast, panel order, or story action.`;

  return `${String(originalPrompt).trim()}

IMAGE QUALITY CORRECTION ATTEMPT (bounded retry 2/${IMAGE_QUALITY_MAX_ATTEMPTS}):
${preservationLock}
Correct only these concrete visible issues:
${concreteIssues || '- No concrete issue was supplied; preserve the approved page without adding content.'}
Do not add speaker names, metadata, translations, annotations, or extra text.
Preserve all already-correct people, hands, props, camera geometry, functional-surface orientation, bubbles, and backgrounds.`;
};

export const runImageQualityFailsafe = async ({
  originalCandidate,
  originalPrompt,
  reviewCandidate,
  generateRepairCandidate,
  onProgress = () => {},
  mode,
  allowRepair = true,
  repairSourceMode = 'regenerate',
  compareCandidates = async () => ({ preferred: 'original', reason: 'Direct comparison unavailable.' }),
} = {}) => {
  let originalReview;
  try {
    originalReview = await reviewCandidate(originalCandidate, originalPrompt);
  } catch (error) {
    originalReview = createUnverifiedReview(error);
  }

  if (originalReview?.pass) {
    return {
      candidate: originalCandidate,
      finalReview: originalReview,
      originalReview,
      attempts: 1,
      validationWarning: false,
      fallbackToOriginal: false,
      repairError: null,
    };
  }

  if (!allowRepair || !hasConcreteIssues(originalReview)) {
    onProgress(!allowRepair
      ? '自動修正OFFのため、追加の画像API呼び出しは行わず元画像と品質警告を保持します。'
      : '品質レビューを確認できないため、追加の画像API呼び出しは行わず元画像を保持します。');
    return {
      candidate: originalCandidate,
      finalReview: originalReview,
      originalReview,
      attempts: 1,
      validationWarning: true,
      fallbackToOriginal: true,
      repairError: null,
    };
  }

  const repairPrompt = buildImageQualityRepairPrompt({
    originalPrompt,
    issues: originalReview.issues,
    mode,
    sourceMode: repairSourceMode,
  });
  onProgress(`具体的な品質NGを限定修正する画像候補を再生成します（2/${IMAGE_QUALITY_MAX_ATTEMPTS}）。`);

  let repairCandidate;
  try {
    repairCandidate = await generateRepairCandidate(repairPrompt);
  } catch (repairError) {
    onProgress(`修正版画像を取得できないため、保存済みの元画像を採用して続行します: ${repairError.message}`);
    return {
      candidate: originalCandidate,
      finalReview: originalReview,
      originalReview,
      attempts: 2,
      validationWarning: true,
      fallbackToOriginal: true,
      repairError,
    };
  }

  let repairReview;
  try {
    repairReview = await reviewCandidate(repairCandidate, repairPrompt);
  } catch (error) {
    repairReview = createUnverifiedReview(error);
  }

  if (repairReview?.pass) {
    let comparison;
    try {
      comparison = await compareCandidates(originalCandidate, repairCandidate, originalPrompt);
    } catch {
      comparison = { preferred: 'original', reason: '画像の比較判定を取得できませんでした。' };
    }
    if (comparison?.preferred !== 'repair') {
      onProgress(`直接比較で修正版の優位を確認できないため、元画像を保持します。${comparison?.reason || ''}`);
      return {
        candidate: originalCandidate, finalReview: originalReview, originalReview, repairReview,
        attempts: 2, validationWarning: true, fallbackToOriginal: true, repairError: null,
      };
    }
    onProgress(`直接比較で修正版を採用します。${comparison.reason || ''}`);
    onProgress('修正版画像が品質ゲートを通過したため、元画像と置き換えて採用します。');
    return {
      candidate: repairCandidate,
      finalReview: repairReview,
      originalReview,
      repairReview,
      attempts: 2,
      validationWarning: false,
      fallbackToOriginal: false,
      repairError: null,
    };
  }

  onProgress('修正版画像も品質ゲートを通過しなかったため、保存済みの元画像を採用して続行します。');
  return {
    candidate: originalCandidate,
    finalReview: originalReview,
    originalReview,
    repairReview,
    attempts: 2,
    validationWarning: true,
    fallbackToOriginal: true,
    repairError: null,
  };
};
