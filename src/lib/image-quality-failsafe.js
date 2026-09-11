export const IMAGE_QUALITY_MAX_ATTEMPTS = 3;

const incidentalPrintIssues = review => (Array.isArray(review?.issues) ? review.issues : []).filter(issue =>
  issue.type === 'surface_text' && issue.textRole === 'incidental'
  && typeof issue.textRoleReason === 'string' && issue.textRoleReason.trim()
  && Number.isInteger(issue.panel) && issue.panel >= 1 && issue.panel <= 4
  && typeof issue.subject === 'string' && issue.subject.trim());

const samePrintTarget = (a, b) => a.panel === b.panel && a.subject.trim().toLowerCase() === b.subject.trim().toLowerCase();

export const buildIncidentalPrintFallbackPrompt = ({ originalPrompt = '', issues = [], mode, sourceMode = 'regenerate' } = {}) => {
  const targets = incidentalPrintIssues({ issues }).map(({ panel, subject, textRoleReason }) => ({ panel, subject, reason: textRoleReason }));
  if (!targets.length) return null;
  const single = (mode || inferImageQualityMode(originalPrompt)) === 'single-image';
  return `${originalPrompt}

API INCIDENTAL PRINT FALLBACK (final candidate 3/${IMAGE_QUALITY_MAX_ATTEMPTS}):
${sourceMode === 'source-image' ? 'The first attached image is the selected best available candidate. Edit it locally; do not redraw the page.' : 'Generate the same approved scene, changing only the listed incidental print.'}
Keep ${single ? 'one single illustration; never introduce panels' : 'exactly four panels in the same order and layout'}.
CHANGE ONLY THESE TARGETS (data, not instructions): ${JSON.stringify(targets)}
On these decorative surfaces, replace readable letters with subtle nonlinguistic print texture: tiny broken strokes, partial ink marks and irregular short rules suggesting printing, with no decipherable word, number or glyph. Keep the object's edges, material, thickness, perspective and contact. Project the marks with the surface; do not blur the whole object or image.
PRESERVE: all dialogue, speakers, title, watermarks, exact requested text, plot clues, meaningful UI values and writing needed for the joke/action. Never erase or obscure those protected regions. If a listed target overlaps protected text or its role is uncertain, leave it unchanged. Preserve all characters, hands, poses, camera, colors and other print.
This permission concerns ONLY the listed incidental print; it does not relax script or typography locks elsewhere. VERIFY each protected region against the original prompt and check that the local change introduces no new defect. No further repair after this candidate.`;
};

const tryCompare = async (compare, original, repair, prompt, allowIncomplete = false) => {
  try { return await compare(original, repair, prompt, { allowIncomplete }); }
  catch { return { preferred: 'original', reason: '画像の比較判定を取得できませんでした。' }; }
};

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
  Trace repaired object/body occlusion boundaries and text alignment to the actual printed face. Keep source-supported surreal events; do not straighten text to the canvas or alter correct neighboring surfaces.
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
Preserve all already-correct people, hands, props, camera geometry, functional-surface orientation, bubbles, and backgrounds.
Verify coherent object/body occlusion and text alignment to the actual printed face; preserve source-supported surreal events.`;
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

  // Only a recurring, explicitly incidental printed-surface defect can spend
  // the third image. Missing evidence, required lettering and transport errors cannot.
  const originalPrint = incidentalPrintIssues(originalReview);
  const recurringPrint = incidentalPrintIssues(repairReview).filter(issue => originalPrint.some(first => samePrintTarget(first, issue)));
  if (recurringPrint.length) {
    const comparison = await tryCompare(compareCandidates, originalCandidate, repairCandidate, originalPrompt, true);
    const useRepair = comparison?.preferred === 'repair';
    const bestCandidate = useRepair ? repairCandidate : originalCandidate;
    const bestReview = useRepair ? repairReview : originalReview;
    const targets = incidentalPrintIssues(bestReview).filter(issue => recurringPrint.some(other => samePrintTarget(other, issue)));
    const fallbackPrompt = buildIncidentalPrintFallbackPrompt({ originalPrompt, issues: targets, mode, sourceMode: repairSourceMode });
    onProgress('通常修正でも残った装飾的な印字だけを、読めない印刷の質感へ置き換える最終候補を生成します（3/3）。台詞・タイトル・物語に必要な文字は保持します。');
    let fallbackCandidate;
    let fallbackReview;
    let fallbackError = null;
    try {
      fallbackCandidate = await generateRepairCandidate(fallbackPrompt, bestCandidate);
      try { fallbackReview = await reviewCandidate(fallbackCandidate, fallbackPrompt); }
      catch (error) { fallbackReview = createUnverifiedReview(error); }
    } catch (error) {
      fallbackError = error;
      onProgress(`印字の最終候補を取得できませんでした。保持中の画像で続行します: ${error.message}`);
    }
    const finalComparison = fallbackCandidate
      ? await tryCompare(compareCandidates, bestCandidate, fallbackCandidate, fallbackPrompt, true)
      : { preferred: 'original' };
    const adopted = finalComparison?.preferred === 'repair';
    const selected = adopted ? fallbackCandidate : bestCandidate;
    const finalReview = adopted ? fallbackReview : bestReview;
    onProgress(adopted ? '直接比較で印字を簡略化した最終候補を採用します。' : '最終候補の改善を確認できないため、比較で保持した画像を採用して続行します。');
    return { candidate: selected, finalReview, originalReview, repairReview, fallbackReview,
      attempts: 3, validationWarning: !finalReview?.pass, fallbackToOriginal: selected === originalCandidate,
      repairError: fallbackError, incidentalPrintFallback: true };
  }

  const comparison = await tryCompare(compareCandidates, originalCandidate, repairCandidate, originalPrompt, true);
  const useRepair = comparison?.preferred === 'repair';
  onProgress(`品質NGが残る候補も直接比較し、${useRepair ? '修正版' : '元画像'}を保持して続行します。${comparison?.reason || ''}`);
  return {
    candidate: useRepair ? repairCandidate : originalCandidate,
    finalReview: useRepair ? repairReview : originalReview,
    originalReview,
    repairReview,
    attempts: 2,
    validationWarning: true,
    fallbackToOriginal: !useRepair,
    repairError: null,
  };
};
