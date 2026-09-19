export const MAX_IMAGE_POLICY_RETRIES = 5;

export async function retryImagePolicyGeneration({
  initialPrompt,
  initialPolicyError,
  repairPrompt,
  generateImage,
  onAttempt = () => {},
  maxRetries = MAX_IMAGE_POLICY_RETRIES,
}) {
  let prompt = String(initialPrompt || '');
  let policyError = String(initialPolicyError || '');
  const promptHistory = [prompt];

  for (let attempt = 1; attempt <= maxRetries; attempt += 1) {
    onAttempt({ phase: 'repair', attempt, maxRetries, prompt, policyError });
    const repairResult = await repairPrompt({ prompt, policyError, attempt, maxRetries });
    if (!repairResult?.success || !repairResult.modifiedPrompt) {
      return {
        success: false,
        reason: 'repair_failed',
        attempts: attempt - 1,
        prompt,
        policyError,
        promptHistory,
      };
    }

    prompt = repairResult.modifiedPrompt;
    promptHistory.push(prompt);
    onAttempt({ phase: 'generate', attempt, maxRetries, prompt, policyError });

    const generationResult = await generateImage({ prompt, attempt, maxRetries });
    if (generationResult?.success) {
      return {
        success: true,
        reason: 'success',
        attempts: attempt,
        prompt,
        policyError: '',
        promptHistory,
      };
    }

    policyError = String(generationResult?.policyError || '');
    if (!policyError) {
      return {
        success: false,
        reason: 'generation_failed',
        attempts: attempt,
        prompt,
        policyError: '',
        promptHistory,
      };
    }
  }

  return {
    success: false,
    reason: 'policy_retry_exhausted',
    attempts: maxRetries,
    prompt,
    policyError,
    promptHistory,
  };
}
