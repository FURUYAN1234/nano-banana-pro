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

export const buildImageQualityRepairPrompt = ({ originalPrompt = '', issues = [], mode } = {}) => {
  const concreteIssues = issues
    .filter((issue) => issue?.type !== 'unverified')
    .slice(0, 8)
    .map(formatRepairIssue)
    .join('\n');

  const effectiveMode = mode || inferImageQualityMode(originalPrompt);
  const preservationLock = effectiveMode === 'single-image'
    ? `Create a corrected replacement for the same single illustration.
Do not introduce panels, panel borders, a comic page, a collage, additional scenes, new characters, or a new setting.
Do not change the approved subject count, action, setting, camera, crop, or story beat.`
    : `Create a corrected replacement for the same four-panel manga page.
Do not change the approved dialogue, cast, panel order, or story action.`;

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

  if (!hasConcreteIssues(originalReview)) {
    onProgress('品質レビューを確認できないため、追加の画像API呼び出しは行わず元画像を保持します。');
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
