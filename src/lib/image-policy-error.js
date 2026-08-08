const IMAGE_POLICY_ERROR_RE = /(?:sensitive|responsible ai|content_policy_violation|safety(?:\s+system)?|policy|violation)/i;

export const isImagePolicyError = (message = '') => IMAGE_POLICY_ERROR_RE.test(String(message));
