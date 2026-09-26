// Shared Web/Work and GPT Image API ceiling, including reference instructions.
// This is the API limit, not a claim about ChatGPT's composer or file size limit.
export const OPENAI_IMAGE_PROMPT_MAX_CHARS = 32000;

export function assertImagePromptBudget(prompt, maxChars = OPENAI_IMAGE_PROMPT_MAX_CHARS) {
  if (!Number.isInteger(maxChars) || maxChars < 1 || maxChars > OPENAI_IMAGE_PROMPT_MAX_CHARS) {
    throw new Error('画像生成プロンプトの文字数上限が不正です。');
  }
  if (typeof prompt !== 'string') throw new Error('画像生成プロンプトは文字列で指定してください。');
  if (prompt.length > maxChars) {
    throw new Error(`画像生成プロンプトが上限を超えています（${prompt.length.toLocaleString()}文字 / ${maxChars.toLocaleString()}文字）。台詞や指示は自動で切り捨てません。内容を整理して再構築してください。`);
  }
  return prompt;
}
