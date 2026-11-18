import scenarioModelConfig from '../config/openai-scenario-models.json' with { type: 'json' };

export const OPENAI_SCENARIO_MODEL_OPTIONS = scenarioModelConfig.models;
export const OPENAI_SCENARIO_TEXT_MODEL_IDS = OPENAI_SCENARIO_MODEL_OPTIONS.map(({ id }) => id);
export const OPENAI_SCENARIO_PRICE_SNAPSHOT_DATE = scenarioModelConfig.priceSnapshotDate;
export const OPENAI_VISION_MODEL_IDS = OPENAI_SCENARIO_TEXT_MODEL_IDS.filter(id => id !== 'gpt-6-astra');
const manualModelIds = new Set(OPENAI_SCENARIO_MODEL_OPTIONS.filter(m => m.manualSelection).map(m => m.id));
export const OPENAI_TEXT_MODEL_IDS = OPENAI_VISION_MODEL_IDS.filter(id => !manualModelIds.has(id));

export const DEFAULT_OPENAI_STEP1_MODEL_ID = 'gpt-6-luna';
export const DEFAULT_OPENAI_STEP3_MODEL_ID = 'gpt-6-luna';
export const resolveDefaultOpenAIScenarioModelId = () => 'gpt-6-luna';

export const DEFAULT_OPENAI_SCENARIO_MODEL_ID = resolveDefaultOpenAIScenarioModelId();

export const getOpenAIScenarioCostEstimate = (modelId, usage = {}) => {
  const option = OPENAI_SCENARIO_MODEL_OPTIONS.find(({ id }) => id === modelId);
  if (!option) return null;

  const inputTokens = usage?.input_tokens ?? usage?.prompt_tokens;
  const outputTokens = usage?.output_tokens ?? usage?.completion_tokens;
  if (!Number.isInteger(inputTokens) || inputTokens < 0
    || !Number.isInteger(outputTokens) || outputTokens < 0) return null;

  const details = usage.input_tokens_details ?? usage.prompt_tokens_details;
  const cached = details?.cached_tokens ?? 0;
  const written = details?.cache_write_tokens ?? 0;
  if (!Number.isSafeInteger(cached) || cached < 0 || !Number.isSafeInteger(written) || written < 0
    || cached + written > inputTokens) return null;
  // FURU uses the Standard tier with the default 30-minute cache. The API's
  // input and output totals already include cache tokens and reasoning, respectively.
  const ordinary = inputTokens - cached - written;
  const longContext = inputTokens > 272_000;
  const inputCost = (ordinary + written * 1.25) * option.inputPriceUsdPerM + cached * option.cachedInputPriceUsdPerM;
  const outputCost = outputTokens * option.outputPriceUsdPerM;
  const estimatedUsd = Number(((inputCost * (longContext ? 2 : 1)
    + outputCost * (longContext ? 1.5 : 1)) / 1_000_000).toFixed(6));
  return { inputTokens, outputTokens, estimatedUsd };
};

// Local verification includes a production build served by `vite preview`.
// Production-hosted app routing remains unchanged.
export const isLocalModelVerification = ({ development = import.meta.env?.DEV === true,
  hostname = globalThis.location?.hostname || '' } = {}) => development
  || ['localhost', '127.0.0.1', '[::1]', '::1'].includes(hostname);

const selectedModelRoute = (models, selectedModelId, isDevelopment) => {
  if (isDevelopment && selectedModelId === 'gpt-6-luna') return ['gpt-6-luna'];
  const available = manualModelIds.has(selectedModelId) ? models : models.filter(id => !manualModelIds.has(id));
  return available.slice(Math.max(0, available.indexOf(selectedModelId)));
};

export const getOpenAIScenarioModelRoute = (selectedModelId = 'auto', isDevelopment = isLocalModelVerification()) =>
  selectedModelRoute(OPENAI_SCENARIO_TEXT_MODEL_IDS, selectedModelId, isDevelopment);

export const getOpenAIVisionModelRoute = (selectedModelId = 'auto', isDevelopment = isLocalModelVerification()) =>
  selectedModelRoute(OPENAI_VISION_MODEL_IDS, selectedModelId, isDevelopment);
