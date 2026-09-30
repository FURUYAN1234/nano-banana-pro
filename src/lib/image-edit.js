import { normalizeOpenAIImageDataUrl } from './openai-image-references.js';
import { assertImagePromptBudget, OPENAI_IMAGE_PROMPT_MAX_CHARS } from './image-prompt-budget.js';

const EDIT_PROMPT_PREFIX = [
  'Edit the supplied image (Image 1) according to the user instruction below.',
  'Use Image 1 as the source to edit, not as a style example for a new scene.',
  'Preserve the existing characters, composition, panel order, dialogue, clothing, art style, color mode and layout except where the user explicitly requests a change and its necessary local consequences.',
  'Keep all already-correct details. Do not invent additional changes or print editing instructions in the image.',
  'The current user instruction takes priority over conflicting details in the source image.',
  'Return one complete edited image.',
  '', 'USER EDIT INSTRUCTION:', '',
].join('\n');
export const IMAGE_EDIT_INSTRUCTION_MAX_CHARS = OPENAI_IMAGE_PROMPT_MAX_CHARS - EDIT_PROMPT_PREFIX.length;

// 元の長い生成指示を再投入せず、表示中の画像と今回の変更を正本にする。
export function buildImageEditRequest(sourceImage, instruction) {
  const source = normalizeOpenAIImageDataUrl(sourceImage, '修正元画像');
  const change = String(instruction || '').trim();
  if (!change) throw new Error('修正したい内容を入力してください。');
  const prompt = assertImagePromptBudget(EDIT_PROMPT_PREFIX + change);
  return { prompt, imageInputs: [{ image_url: source }], referenceImages: [source] };
}
