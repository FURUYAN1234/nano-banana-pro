import {
  MANGA_MANUSCRIPT_SIZE_OPTIONS,
  MANGA_MANUSCRIPT_LARGE,
} from './manga-manuscript-format.js';

export const OPENAI_IMAGE_MODEL = 'gpt-image-2.5-flare';
const OPENAI_IMAGE_26_SUNBURST = 'gpt-image-2.6-sunburst';
const OPENAI_IMAGE_25_SUNBURST = 'gpt-image-2.5-sunburst';
const LEGACY_SUNBURST_QUALITY = 'sunburst-max';
export const DEFAULT_OPENAI_IMAGE_QUALITY = 'sunburst-26-max';
export const DEFAULT_OPENAI_IMAGE_SIZE = MANGA_MANUSCRIPT_LARGE.value;
export const OPENAI_IMAGE_PRICE_SNAPSHOT_DATE = '2026-11-05';
const OPENAI_IMAGE_PRICING_USD_PER_M = Object.freeze({
  [OPENAI_IMAGE_26_SUNBURST]: Object.freeze({
    imageInput: 8,
    cachedImageInput: 2,
    imageOutput: 30,
    textInput: 5,
    cachedTextInput: 1.25,
  }),
  [OPENAI_IMAGE_25_SUNBURST]: Object.freeze({
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
    imageInput: 8,
    cachedImageInput: 2,
    imageOutput: 30,
    textInput: 5,
    cachedTextInput: 1.25,
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
  { value: 'sunburst-high', label: 'GPT Image 2.5 Sunburst / high', model: OPENAI_IMAGE_25_SUNBURST, quality: 'high' },
  { value: 'sunburst-xhigh', label: 'GPT Image 2.5 Sunburst / xhigh', model: OPENAI_IMAGE_25_SUNBURST, quality: 'xhigh' },
  { value: LEGACY_SUNBURST_QUALITY, label: 'GPT Image 2.5 Sunburst / max', model: OPENAI_IMAGE_25_SUNBURST, quality: 'max' },
  { value: 'sunburst-26-high', label: 'GPT Image 2.6 Sunburst / high', model: OPENAI_IMAGE_26_SUNBURST, quality: 'high' },
  { value: 'sunburst-26-xhigh', label: 'GPT Image 2.6 Sunburst / xhigh', model: OPENAI_IMAGE_26_SUNBURST, quality: 'xhigh' },
  { value: DEFAULT_OPENAI_IMAGE_QUALITY, label: 'GPT Image 2.6 Sunburst / max', model: OPENAI_IMAGE_26_SUNBURST, quality: 'max' },
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
  if (!Array.isArray(availableModelIds)) return FALLBACK_OPENAI_IMAGE_QUALITY;
  if (availableModelIds.includes(OPENAI_IMAGE_26_SUNBURST)) return DEFAULT_OPENAI_IMAGE_QUALITY;
  if (availableModelIds.includes(OPENAI_IMAGE_25_SUNBURST)) return LEGACY_SUNBURST_QUALITY;
  return FALLBACK_OPENAI_IMAGE_QUALITY;
}

export const OPENAI_IMAGE_VERIFICATION_MESSAGE = '選択したGPT Imageモデルを使うにはOpenAIの組織認証が必要です。組織設定を確認し、承認済みなら反映を待ってください。プルダウンから利用可能な別モデルも選べます。';

export function isOpenAIImageVerificationError(message, selection) {
  const { model } = resolveOpenAIImageOption(selection);
  return [OPENAI_IMAGE_26_SUNBURST, OPENAI_IMAGE_25_SUNBURST, OPENAI_IMAGE_MODEL].includes(model)
    && /organization must be verified/i.test(String(message));
}


export function formatOpenAIImageEngineName(qualityValue) {
  const option = resolveOpenAIImageOption(qualityValue);
  const version = option.model.match(/^gpt-image-(\d+)(?:\.(\d+))?/);
  return version ? `ChatGPT Images ${version[1]}.${version[2] || '0'}` : option.model;
}

// Only the app-authored footer is synchronized; dialogue and scenario attribution stay literal.
export function applyOpenAIImageEngineWatermark(prompt, qualityValue) {
  if (typeof prompt !== 'string') throw new Error('画像生成プロンプトは文字列で指定してください。');
  const engine = formatOpenAIImageEngineName(qualityValue);
  return prompt.replace(/^(\s*- Bottom-right(?: 4th-panel)? watermark EXACTLY "(?:Generated by )?)ChatGPT(?: Images \d+(?:\.\d+)?)?(?= \/| with Super FURU AI)/gm, (_, prefix) => prefix + engine);
}
