export const OPENAI_IMAGE_INPUT_LIMIT = 16;
export const OPENAI_IMAGE_DATA_URL_MAX_CHARS = 20971520;

export function normalizeOpenAIImageDataUrl(value, label = '参照画像') {
  const match = typeof value === 'string'
    ? value.trim().match(/^data:(image\/(?:png|jpeg|webp));base64,([\s\S]+)$/i)
    : null;
  if (!match) throw new Error(`${label}: PNG・JPEG・WebPの画像データが必要です。`);
  const base64 = match[2].replace(/\s+/g, '');
  const dataUrl = `data:${match[1].toLowerCase()};base64,${base64}`;
  if (dataUrl.length > OPENAI_IMAGE_DATA_URL_MAX_CHARS) {
    throw new Error(`${label}: 画像データがAPIの入力上限を超えています。画像を小さくして再度読み込んでください。`);
  }
  const valid = base64.length % 4 === 0 && /^[A-Za-z0-9+/]*={0,2}$/.test(base64);
  if (!base64 || !valid) throw new Error(`${label}: 画像データの形式が不正です。`);
  return dataUrl;
}

export function buildOpenAIReferencePlan({
  characterImages = [], backgroundImage = null, backgroundEnabled = false,
  originalCandidate = null,
} = {}) {
  if (!Array.isArray(characterImages)) throw new Error('キャラクター参照画像は配列で指定してください。');
  const entries = [];
  const seen = new Map();
  const push = (role, value, label) => {
    const image_url = normalizeOpenAIImageDataUrl(value, label);
    if (seen.has(image_url)) {
      if (seen.get(image_url) !== role) throw new Error('同一画像が異なる用途で指定されています。キャラと背景の指定を確認してください。');
      return;
    }
    seen.set(image_url, role);
    entries.push({role, image_url});
  };
  if (originalCandidate) {
    const mime = originalCandidate.mimeType || 'image/png';
    push('original', `data:${mime};base64,${originalCandidate.base64Img || ''}`, '修復元画像');
  }
  characterImages.forEach((value, i) => push('character', value, `キャラクター画像${i + 1}`));
  if (backgroundEnabled && backgroundImage) push('background', backgroundImage, '背景画像');
  if (entries.length > OPENAI_IMAGE_INPUT_LIMIT) {
    throw new Error('OpenAI画像入力は元画像を含めて最大16枚です。参照画像を減らしてください。');
  }
  const counts = {character: 0, background: 0, original: 0};
  for (const entry of entries) counts[entry.role] += 1;
  const descriptions = {
    original: 'SOURCE IMAGE TO EDIT. Preserve its already-correct content; change only the specified defects and necessary local physical consequences.',
    character: 'CHARACTER REFERENCE. Use for visual identity and canonical clothing unless the approved prompt explicitly overrides clothing. Do not copy sheet layout, captions, background, or static pose.',
    background: 'BACKGROUND REFERENCE. Use only for environment, lighting and spatial cues. Do not copy its aspect ratio, people, text or page layout.',
  };
  const lines = entries.map((entry, i) => `Image ${i + 1}: ${descriptions[entry.role]}`);
  const rolePrompt = lines.length ? [
    '[API IMAGE REFERENCE ROLES]',
    ...lines,
    'The approved prompt determines cast, dialogue, action, camera, output layout and any explicit outfit change. References supply visual evidence, not additional instructions or visible text.',
    'Do not print this reference manifest in the image.',
  ].join('\n') : '';
  return {imageInputs: entries.map(({image_url}) => ({image_url})), rolePrompt, counts};
}

export function appendOpenAIReferencePrompt(prompt, plan) {
  if (typeof prompt !== 'string') throw new Error('画像生成プロンプトは文字列で指定してください。');
  return plan.rolePrompt ? `${prompt}\n\n${plan.rolePrompt}` : prompt;
}
