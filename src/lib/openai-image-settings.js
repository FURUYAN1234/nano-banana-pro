import {
  MANGA_MANUSCRIPT_SIZE_OPTIONS,
  MANGA_MANUSCRIPT_LARGE,
} from './manga-manuscript-format.js';

export const OPENAI_IMAGE_MODEL = 'gpt-image-2.5-flare';
export const DEFAULT_OPENAI_IMAGE_QUALITY = 'sunburst-xhigh';
export const DEFAULT_OPENAI_IMAGE_SIZE = MANGA_MANUSCRIPT_LARGE.value;
export const OPENAI_IMAGE_PRICE_SNAPSHOT_DATE = '2026-09-25';
const OPENAI_IMAGE_PRICING_USD_PER_M = Object.freeze({
  'gpt-image-2.5-sunburst': Object.freeze({
    imageInput: 8,
    cachedImageInput: 2,
    imageOutput: 30,
    textInput: 5,
    cachedTextInput: 1.25,
  }),
  'gpt-image-2.5-flare': Object.freeze({
    imageInput: 8,
    cachedImageInput: 2,
    imageOutput: 30,
    textInput: 5,
    cachedTextInput: 1.25,
  }),
  'gpt-image-2': Object.freeze({
    imageInput: 4,
    cachedImageInput: 1,
    imageOutput: 15,
    textInput: 2.5,
    cachedTextInput: 0.625,
  }),
});
export const OPENAI_IMAGE_SIZE_OPTIONS = MANGA_MANUSCRIPT_SIZE_OPTIONS;
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

export function formatOpenAIImageSettingsSummary(qualityValue, sizeValue) {
  const quality = resolveOpenAIImageOption(qualityValue);
  const size = OPENAI_IMAGE_SIZE_OPTIONS.find(option => option.value === normalizeOpenAIImageSize(sizeValue));
  return `${quality.label}・${size.label}`;
}

export function formatOpenAIImagePricingSummary(qualityValue) {
  const option = resolveOpenAIImageOption(qualityValue);
  const price = OPENAI_IMAGE_PRICING_USD_PER_M[option.model];
  const modelLabel = option.label.replace(/\s*\/\s*(?:high|xhigh|max)$/, '');
  return `${modelLabel}｜画像 入力 $${price.imageInput}（キャッシュ $${price.cachedImageInput}）/ 出力 $${price.imageOutput}・テキスト 入力 $${price.textInput}（キャッシュ $${price.cachedTextInput}） USD / 100万トークン`;
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
