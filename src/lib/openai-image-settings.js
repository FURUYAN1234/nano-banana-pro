export const OPENAI_IMAGE_MODEL = 'gpt-image-2.5-flare';
export const DEFAULT_OPENAI_IMAGE_QUALITY = 'sunburst-xhigh';
export const DEFAULT_OPENAI_IMAGE_SIZE = '1024x1536';
export const OPENAI_IMAGE_SIZE_OPTIONS = [
  { value: '1024x1536', label: '標準：1024×1536' },
  { value: '1536x2304', label: '大きめ：1536×2304' },
];
export function normalizeOpenAIImageSize(value) {
  return OPENAI_IMAGE_SIZE_OPTIONS.some(option => option.value === value) ? value : DEFAULT_OPENAI_IMAGE_SIZE;
}
export const FALLBACK_OPENAI_IMAGE_QUALITY = 'gpt-image-2-high';
export const OPENAI_IMAGE_OPTIONS = [
  { value: 'gpt-image-2-high', label: 'GPT Image 2.0 / high', model: 'gpt-image-2', quality: 'high' },
  { value: 'high', label: 'GPT Image 2.5 Flare / high', model: OPENAI_IMAGE_MODEL, quality: 'high' },
  { value: 'xhigh', label: 'GPT Image 2.5 Flare / xhigh', model: OPENAI_IMAGE_MODEL, quality: 'xhigh' },
  { value: 'sunburst-high', label: 'GPT Image 2.5 Sunburst / high', model: 'gpt-image-2.5-sunburst', quality: 'high' },
  { value: 'sunburst-xhigh', label: 'GPT Image 2.5 Sunburst / xhigh', model: 'gpt-image-2.5-sunburst', quality: 'xhigh' },
  { value: 'sunburst-max', label: 'GPT Image 2.5 Sunburst / max', model: 'gpt-image-2.5-sunburst', quality: 'max' },
];
export function resolveOpenAIImageOption(value) {
  return OPENAI_IMAGE_OPTIONS.find(option => option.value === value)
    || OPENAI_IMAGE_OPTIONS.find(option => option.value === DEFAULT_OPENAI_IMAGE_QUALITY);
}

export function normalizeOpenAIImageQuality(value) {
  return resolveOpenAIImageOption(value).value;
}

export function selectInitialOpenAIImageQuality(availableModelIds) {
  return Array.isArray(availableModelIds) && availableModelIds.includes('gpt-image-2.5-sunburst')
    ? DEFAULT_OPENAI_IMAGE_QUALITY
    : FALLBACK_OPENAI_IMAGE_QUALITY;
}

export const OPENAI_IMAGE_VERIFICATION_MESSAGE = 'GPT Image 2.5の組織認証（個人認証）が未承認、または承認がAPIに未反映です。組織設定を確認するか、プルダウンでGPT Image 2.0を選択してください。';

export function isOpenAIImageVerificationError(message, selection) {
  return resolveOpenAIImageOption(selection).model.startsWith('gpt-image-2.5-')
    && /organization must be verified/i.test(String(message));
}
