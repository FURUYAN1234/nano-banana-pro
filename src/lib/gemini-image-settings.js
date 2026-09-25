export const GEMINI_IMAGE_MODEL = 'gemini-3.1-flash-image';
export const GEMINI_IMAGE_PRICE_SNAPSHOT_DATE = '2026-09-25';
export const DEFAULT_GEMINI_IMAGE_OPTIONS = Object.freeze({
  aspectRatio: '3:4',
  imageSize: '1K',
});

const GEMINI_IMAGE_OUTPUT_PRICE_USD = 0.067;
const GEMINI_IMAGE_MAX_ATTEMPTS = 4;
const GEMINI_IMAGE_INPUT_PRICE_USD_PER_M = 0.5;

export function formatGeminiImageSettingsSummary() {
  return 'Gemini 3.1 Flash Image・1K / 3:4（API 896×1200 → A4 848×1200）・品質切替なし';
}

export function formatGeminiImagePricingSummary() {
  const maximumOutputPrice = (GEMINI_IMAGE_OUTPUT_PRICE_USD * GEMINI_IMAGE_MAX_ATTEMPTS).toFixed(3);
  return `Gemini 3.1 Flash Image｜画像出力 1K $${GEMINI_IMAGE_OUTPUT_PRICE_USD}/枚（最大4枚 $${maximumOutputPrice}）＋入力 $${GEMINI_IMAGE_INPUT_PRICE_USD_PER_M.toFixed(2)} / 100万トークン`;
}
