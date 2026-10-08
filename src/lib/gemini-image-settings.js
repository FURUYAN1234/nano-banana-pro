export const GEMINI_IMAGE_MODEL = 'gemini-nano-banana-2.1';
export const GEMINI_IMAGE_PRICE_SNAPSHOT_DATE = '2026-10-08';
export const DEFAULT_GEMINI_IMAGE_OPTIONS = Object.freeze({
  aspectRatio: '3:4',
  imageSize: '1K',
});

const GEMINI_IMAGE_OUTPUT_PRICE_USD = 0.0336;
const GEMINI_IMAGE_MAX_ATTEMPTS = 4;
const GEMINI_IMAGE_INPUT_PRICE_USD_PER_M = 1.5;

export function formatGeminiImageSettingsSummary() {
  return 'Nano Banana 2.1・1K / 3:4（A4へ正規化）・品質切替なし';
}

export function formatGeminiImagePricingSummary() {
  const maximumOutputPrice = (GEMINI_IMAGE_OUTPUT_PRICE_USD * GEMINI_IMAGE_MAX_ATTEMPTS).toFixed(4);
  return `Nano Banana 2.1｜画像出力 1K $${GEMINI_IMAGE_OUTPUT_PRICE_USD}/枚（最大4枚 $${maximumOutputPrice}）＋入力 $${GEMINI_IMAGE_INPUT_PRICE_USD_PER_M.toFixed(2)}・テキスト/思考出力 $7.50 / 100万トークン`;
}
