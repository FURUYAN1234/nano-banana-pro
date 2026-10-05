export const MAX_IMAGE_POLICY_RETRIES = 5;

function summarizeChange(before, after) {
  let start = 0;
  while (start < before.length && start < after.length && before[start] === after[start]) start++;
  let endBefore = before.length, endAfter = after.length;
  while (endBefore > start && endAfter > start && before[endBefore - 1] === after[endAfter - 1]) {
    endBefore--; endAfter--;
  }
  return { from: before.slice(start, endBefore).slice(0, 300), to: after.slice(start, endAfter).slice(0, 300) };
}

export async function retryImagePolicyGeneration({
  initialPrompt,
  initialPolicyError,
  repairPrompt,
  generateImage,
  validatePrompt = () => {},
  onAttempt = () => {},
  shouldStop = () => false,
  maxRetries = MAX_IMAGE_POLICY_RETRIES,
}) {
  let prompt = String(initialPrompt || '');
  let policyError = String(initialPolicyError || '');
  const promptHistory = [prompt];
  const normalizePrompt = (value) => String(value).replace(/\s+/g, ' ').trim();
  const attemptedPrompts = new Set([normalizePrompt(prompt)]);
  const rejectionHistory = [];
  let attempts = 0, repairAttempts = 0, lastRepairReason = '', repairError = '';
  const outcome = (reason, success = false) => ({
    success, reason, attempts, repairAttempts, prompt, policyError, promptHistory,
    lastRepairReason, ...(repairError ? { repairError } : {}),
  });
  const rejectProposal = (reason, candidate, message = '') => {
    lastRepairReason = reason;
    repairError = message;
    rejectionHistory.push({ attempt: repairAttempts, reason, message, change: summarizeChange(prompt, candidate) });
    onAttempt({ phase: 'replan', attempt: repairAttempts, maxRetries, reason, repairError: message, prompt });
  };

  for (let attempt = 1; attempt <= maxRetries; attempt += 1) {
    if (shouldStop()) return outcome('cancelled');
    repairAttempts = attempt;
    onAttempt({ phase: 'repair', attempt, maxRetries, prompt, policyError });
    const repairFeedback = rejectionHistory.map(entry => JSON.stringify(entry)).join('\n');
    const repairResult = await repairPrompt({ prompt, policyError, attempt, maxRetries, repairFeedback });
    if (shouldStop()) return outcome('cancelled');
    if (!repairResult?.success || typeof repairResult.modifiedPrompt !== 'string' || !repairResult.modifiedPrompt.trim()) {
      rejectProposal(repairResult?.reason || 'repair_failed', prompt, repairResult?.message || '修正案を取得できませんでした。');
      continue;
    }

    const candidate = repairResult.modifiedPrompt;
    const normalizedCandidate = normalizePrompt(candidate);
    if (normalizedCandidate === normalizePrompt(prompt)) {
      rejectProposal('no_prompt_change', candidate, '実質的な変更がありません。無関係な変更で埋めず、拒否原因に対応する別案を検討してください。');
      continue;
    }
    if (attemptedPrompts.has(normalizedCandidate)) {
      rejectProposal('repeated_prompt', candidate, '既に拒否された指示文への逆戻りです。失敗履歴を踏まえて別案を検討してください。');
      continue;
    }
    try {
      validatePrompt(candidate);
    } catch (error) {
      rejectProposal('invalid_repair', candidate, error?.message || String(error));
      continue;
    }

    const change = summarizeChange(prompt, candidate);
    prompt = candidate;
    promptHistory.push(prompt);
    attemptedPrompts.add(normalizedCandidate);
    attempts++;
    lastRepairReason = '';
    repairError = '';
    onAttempt({ phase: 'generate', attempt: attempts, maxRetries, prompt, policyError });

    const generationResult = await generateImage({ prompt, attempt: attempts, maxRetries });
    if (shouldStop()) return outcome('cancelled');
    if (generationResult?.success) {
      policyError = '';
      return outcome('success', true);
    }

    policyError = String(generationResult?.policyError || '');
    if (!policyError) {
      return outcome('generation_failed');
    }
    lastRepairReason = 'policy_rejected';
    rejectionHistory.push({ attempt, reason: lastRepairReason, message: policyError.slice(0, 400), change });
  }

  return outcome('policy_retry_exhausted');
}
