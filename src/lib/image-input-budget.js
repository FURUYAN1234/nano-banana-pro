// Official image-edit/reference limits, checked 2026-10-08:
// https://developers.openai.com/api/reference/resources/images/methods/edit
// https://ai.google.dev/gemini-api/docs/models/gemini-nano-banana-2.1
export const OPENAI_IMAGE_INPUT_LIMIT = 16;
export const GEMINI_IMAGE_INPUT_LIMIT = 14;
export const GEMINI_BACKGROUND_IMAGE_COUNT = 4;

export function getImageInputBudget({ characterImages = [], backgroundEnabled = false } = {}) {
  if (!Array.isArray(characterImages)) throw new Error('参照素材画像は配列で指定してください。');
  const characterImageCount = new Set(characterImages).size;
  // OpenAI repair adds its source; Gemini re-generates using the same references.
  const openAIReserved = 1 + (backgroundEnabled ? 1 : 0);
  const geminiReserved = backgroundEnabled ? GEMINI_BACKGROUND_IMAGE_COUNT : 0;
  const maxCharacterImages = Math.min(OPENAI_IMAGE_INPUT_LIMIT - openAIReserved,
    GEMINI_IMAGE_INPUT_LIMIT - geminiReserved);
  return {
    characterImageCount, maxCharacterImages,
    remaining: Math.max(0, maxCharacterImages - characterImageCount),
    fits: characterImageCount <= maxCharacterImages,
    backgroundEnabled: Boolean(backgroundEnabled),
  };
}

export function assertImageInputBudget(options) {
  const budget = getImageInputBudget(options);
  if (!budget.fits) {
    const error = new Error(`参照素材画像は${budget.maxCharacterImages}枚までです（今回の合計${budget.characterImageCount}枚）。`
      + (budget.backgroundEnabled ? '360°背景用に4枚分を確保しています。' : 'OpenAI・Gemini共通の上限です。')
      + '上限を超える追加・背景ON・生成開始は受け付けません。既存の画像・設定は保持します。不要な画像を減らしてください。');
    error.code = 'IMAGE_INPUT_LIMIT';
    throw error;
  }
  return budget;
}

export function planImageAddition({ existingImages = [], incomingImages = [], backgroundEnabled = false } = {}) {
  if (!Array.isArray(existingImages) || !Array.isArray(incomingImages)) throw new Error('キャラシート画像は配列で指定してください。');
  const images = [...new Set([...existingImages, ...incomingImages])];
  const seen = new Set(existingImages);
  const addedImages = images.filter(image => !seen.has(image));
  return { images, addedImages, budget: assertImageInputBudget({ characterImages: images, backgroundEnabled }) };
}

export function assertApiImageInputCount(provider, count) {
  const limit = provider === 'openai' ? OPENAI_IMAGE_INPUT_LIMIT : provider === 'gemini' ? GEMINI_IMAGE_INPUT_LIMIT : null;
  if (limit === null || !Number.isInteger(count) || count < 0) throw new Error('画像入力のプロバイダーまたは枚数が不正です。');
  if (count > limit) {
    const error = new Error(`${provider === 'openai' ? 'OpenAI' : 'Gemini'}画像入力は、背景・修正元も含めて最大${limit}枚です。参照画像を減らしてください。`);
    error.code = 'IMAGE_INPUT_LIMIT';
    throw error;
  }
}
