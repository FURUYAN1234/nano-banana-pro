import scenarioModelConfig from '../config/openai-scenario-models.json' with { type: 'json' };

// OpenAIテキスト処理の実行順。表示用のModel Chainもこの定義を参照する。
export const OPENAI_TEXT_MODEL_IDS = [
  'gpt-4.1',
  'gpt-4.1-mini',
  'gpt-4.1-nano',
  'gpt-4o',
];

export const OPENAI_SCENARIO_MODEL_OPTIONS = scenarioModelConfig.models;
export const OPENAI_SCENARIO_TEXT_MODEL_IDS = OPENAI_SCENARIO_MODEL_OPTIONS.map(({ id }) => id);
export const OPENAI_SCENARIO_PRICE_SNAPSHOT_DATE = scenarioModelConfig.priceSnapshotDate;

const IS_DEVELOPMENT_BUILD = typeof import.meta.env === 'object' && import.meta.env.DEV === true;

export const resolveDefaultOpenAIScenarioModelId = (isDevelopment = IS_DEVELOPMENT_BUILD) => (
  isDevelopment ? 'gpt-6-luna' : 'gpt-6-astra'
);

export const DEFAULT_OPENAI_SCENARIO_MODEL_ID = resolveDefaultOpenAIScenarioModelId();

export const getOpenAIScenarioCostEstimate = (modelId, usage = {}) => {
  const option = OPENAI_SCENARIO_MODEL_OPTIONS.find(({ id }) => id === modelId);
  if (!option) return null;

  const inputTokens = usage?.input_tokens ?? usage?.prompt_tokens;
  const outputTokens = usage?.output_tokens ?? usage?.completion_tokens;
  if (!Number.isInteger(inputTokens) || inputTokens < 0
    || !Number.isInteger(outputTokens) || outputTokens < 0) return null;

  const estimatedUsd = Number((
    (inputTokens * option.inputPriceUsdPerM + outputTokens * option.outputPriceUsdPerM) / 1_000_000
  ).toFixed(6));
  return { inputTokens, outputTokens, estimatedUsd };
};

export const getOpenAIScenarioModelRoute = (selectedModelId = 'auto') => {
  const selectedIndex = OPENAI_SCENARIO_TEXT_MODEL_IDS.indexOf(selectedModelId);
  return selectedIndex >= 0
    ? OPENAI_SCENARIO_TEXT_MODEL_IDS.slice(selectedIndex)
    : OPENAI_SCENARIO_TEXT_MODEL_IDS;
};

export const OPENAI_VISION_MODEL_IDS = [
  'gpt-4.1',
  'gpt-4o',
  'gpt-4.1-mini',
];
