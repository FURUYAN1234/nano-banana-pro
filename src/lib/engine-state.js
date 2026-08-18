/**
 * Resolves legacy provider flags to the single engine that the workflow must use.
 * An OpenAI signal takes precedence so a hot-update survivor cannot split text,
 * image, and STEP4 display behavior across different providers.
 */
export const getEffectiveEngine = (selectedEngine, enableOpenAIApi) => (
  selectedEngine === 'openai' || enableOpenAIApi ? 'openai' : 'gemini'
);
