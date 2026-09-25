// Geminiの実行順。表示用のModel Chainもこの定義を参照する。
export const GEMINI_TEXT_MODEL_IDS = [
  'gemini-3.8-flash',
  'gemini-3.7-flash',
  'gemini-3.6-flash',
  'gemini-3.5-flash',
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite',
];

export const GEMINI_SCENARIO_PRICE_SNAPSHOT_DATE = '2026-09-25';
export const GEMINI_SCENARIO_MODEL_INFO = Object.freeze({
  id: GEMINI_TEXT_MODEL_IDS[0],
  label: 'Gemini 3.8 Flash',
  description: '最新GA・複雑なシナリオ構成向けの固定開始モデル',
  inputPriceUsdPerM: 0.75,
  outputPriceUsdPerM: 3.75,
});

export const GEMINI_VISION_MODEL_IDS = [
  'gemini-3.8-flash',
  'gemini-3.7-flash',
  'gemini-3.6-flash',
  'gemini-3.5-flash',
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite',
];

export const GEMINI_IMAGE_MODEL_IDS = [
  'gemini-3.1-flash-image',
];
