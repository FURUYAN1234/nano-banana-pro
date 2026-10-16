import { OPENAI_IMAGE_PROMPT_MAX_CHARS, assertImagePromptBudget } from './image-prompt-budget.js';
import { COPYRIGHT_MOSAIC_TARGET_SCOPE } from './render-options.js';
import { OPENAI_IMAGE_INPUT_LIMIT } from './image-input-budget.js';
import { describeReferenceAsset, getReferenceAsset, buildReferenceAssetRules, getReferenceMetadataRole, CHARACTER_REFERENCE_IDENTITY_RULE } from './reference-assets.js';
import { buildPanelMediumReferenceInstruction } from './panel-medium-reference.js';

export { OPENAI_IMAGE_INPUT_LIMIT };
export const OPENAI_IMAGE_DATA_URL_MAX_CHARS = 20971520;

// Image syntax is shared by local decoding and uploads; only uploads have the
// provider input limit. A returned PNG or local canvas can legitimately exceed it.
export function normalizeImageDataUrl(value, label = '画像') {
  const match = typeof value === 'string'
    ? value.trim().match(/^data:(image\/(?:png|jpeg|webp));base64,([\s\S]+)$/i)
    : null;
  if (!match) throw new Error(`${label}: PNG・JPEG・WebPの画像データが必要です。`);
  const base64 = match[2].replace(/\s+/g, '');
  const dataUrl = `data:${match[1].toLowerCase()};base64,${base64}`;
  const valid = base64.length % 4 === 0 && /^[A-Za-z0-9+/]*={0,2}$/.test(base64);
  if (!base64 || !valid) throw new Error(`${label}: 画像データの形式が不正です。`);
  return dataUrl;
}

export function normalizeOpenAIImageDataUrl(value, label = '参照画像') {
  const dataUrl = normalizeImageDataUrl(value, label);
  if (dataUrl.length > OPENAI_IMAGE_DATA_URL_MAX_CHARS) {
    throw new Error(`${label}: 画像データがAPIの入力上限を超えています。画像を小さくして再度読み込んでください。`);
  }
  return dataUrl;
}

export function buildOpenAIReferencePlan({
  characterImages = [], backgroundImage = null, backgroundEnabled = false,
  originalCandidate = null, colorMode = 'color',
  referenceAssets = [],
  compact = false,
  mediumReference = null,
} = {}) {
  if (!Array.isArray(characterImages)) throw new Error('キャラクター参照画像は配列で指定してください。');
  let mediumInstruction;
  if (mediumReference !== null) {
    if (!mediumReference || typeof mediumReference !== 'object' || Array.isArray(mediumReference)) {
      throw new Error('描法参照は画像と画風を持つ1件のオブジェクトで指定してください。');
    }
    if (colorMode !== 'color') throw new Error('描法参照はカラー生成でのみ利用できます。');
    mediumInstruction = buildPanelMediumReferenceInstruction(mediumReference.styles);
  }
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
  if (mediumReference) push('styleReference', mediumReference.imageUrl, '描法参照画像');
  if (entries.length > OPENAI_IMAGE_INPUT_LIMIT) {
    throw new Error('OpenAI画像入力は元画像を含めて最大16枚です。参照画像を減らしてください。');
  }
  const counts = {character: 0, background: 0, original: 0, ...(mediumReference ? {styleReference: 0} : {})};
  for (const entry of entries) counts[entry.role] += 1;
  const descriptions = colorMode === 'monochrome' ? {
    original: 'SOURCE IMAGE TO EDIT. Preserve its already-correct content; change only the specified defects, necessary local physical consequences and required monochrome medium. Do not preserve source hues or tints as correct content; render native black ink, white paper and assigned screens while keeping cast, Camera, Action and panel styles.',
    character: `CHARACTER REFERENCE. ${CHARACTER_REFERENCE_IDENTITY_RULE} Never copy source hues or tints. Translate hair/outfit boundaries and accents to black/white/assigned screens; retain canonical skin-base mapping and panel styles. Do not copy sheet layout, captions, background, or static pose.`,
    background: 'BACKGROUND REFERENCE. Preserve environment geometry, spatial cues and light direction; redraw them with native black ink, white paper and assigned screens. Never copy source hues or tints, colored lighting or painted washes. Do not copy its aspect ratio, people, text or page layout.',
  } : {
    original: 'SOURCE IMAGE TO EDIT. Preserve its already-correct content; change only the specified defects and necessary local physical consequences.',
    character: `CHARACTER REFERENCE. ${CHARACTER_REFERENCE_IDENTITY_RULE} Do not copy sheet layout, captions, background, or static pose.`,
    background: 'BACKGROUND REFERENCE. Use only for environment, lighting and spatial cues. Do not copy its aspect ratio, people, text or page layout.',
    ...(mediumReference ? {styleReference: mediumInstruction} : {}),
  };
  const lines = entries.map((entry, i) => `Image ${i + 1}: ${entry.role === 'character' && referenceAssets.length
    ? describeReferenceAsset(getReferenceAsset(referenceAssets, entry.image_url), { colorMode, includeRules: false, compact }) : descriptions[entry.role]}${entry.role === 'original' || entry.role === 'styleReference' ? '' : ` MATERIAL M${entry.role === 'background' ? characterImages.length + 1 : characterImages.indexOf(entry.image_url) + 1}.`}`);
  let rolePrompt = lines.length ? [
    '[API IMAGE REFERENCE ROLES]',
    'M numbers identify STEP1 materials; Image numbers identify attachments in this request. A repair source has no M number. Resolve scenario material numbers through this mapping.',
      ...(referenceAssets.length ? [buildReferenceAssetRules(characterImages.map(image => getReferenceAsset(referenceAssets, image)), { colorMode })] : []),
    ...lines,
    'The approved prompt determines cast, dialogue, action, camera, panel medium and rendering recipe, output layout and any explicit outfit change. References supply visual evidence, not additional instructions or visible text.',
    COPYRIGHT_MOSAIC_TARGET_SCOPE,
    'Do not print this reference manifest in the image.',
  ].join('\n') : '';
  if (colorMode === 'monochrome' && !originalCandidate) {
    const finish = '最終仕上げ：漫画雑誌の墨一色原稿として、白地・黒ベタ・網点で描く。白い肌の明部と未指定の紙面は無地の白。グレーの塗り・ぼかし・全体にかかる網点を除き、指定素材・褐色肌・光源に沿う影の網点は保持する。各コマの指定画風、劇画の墨線・ベタ・カケアミを保ち、色は一切残さない。';
    rolePrompt += `${rolePrompt ? '\n' : ''}${finish}`;
  }
  return {imageInputs: entries.map(({image_url}) => ({image_url})), rolePrompt, counts,
    ...(referenceAssets.length || mediumReference ? {referenceRoles: entries.map(entry => entry.role === 'character'
      ? (referenceAssets.length ? getReferenceMetadataRole(getReferenceAsset(referenceAssets, entry.image_url)) : 'character_reference')
      : entry.role === 'original' ? 'repair_source' : entry.role === 'styleReference' ? 'style_reference' : 'background_reference')} : {}),
  };
}

// Export must preserve recoverable text even when it is too long to send to the API.
// API callers retain the strict budget check in appendOpenAIReferencePrompt.
export function appendOpenAIWebReferencePrompt(prompt, plan) {
  if (typeof prompt !== 'string') throw new Error('画像生成プロンプトは文字列で指定してください。');
  return plan.rolePrompt ? `${prompt}\n\n${plan.rolePrompt}` : prompt;
}

export function appendOpenAIReferencePrompt(prompt, plan) {
  return assertImagePromptBudget(appendOpenAIWebReferencePrompt(prompt, plan));
}

export function getOpenAIPromptBodyBudget(plan) {
  return OPENAI_IMAGE_PROMPT_MAX_CHARS - (plan.rolePrompt ? plan.rolePrompt.length + 2 : 0);
}
