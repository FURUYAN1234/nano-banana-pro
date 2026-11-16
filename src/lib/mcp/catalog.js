import { OPENAI_SCENARIO_MODEL_OPTIONS, OPENAI_VISION_MODEL_IDS } from '../openai-model-routes.js';
import { OPENAI_IMAGE_OPTIONS, OPENAI_IMAGE_SIZE_OPTIONS } from '../openai-image-settings.js';
import { GAG_ENDING_OPTIONS, SERIOUS_ENDING_OPTIONS, DOCUMENTARY_ENDING_OPTIONS } from '../ending-mode-policy.js';
import { DEFAULT_CATEGORIES } from '../constants.js';
export function getMcpSettingCatalog() {
  return {
    analysisModelId: OPENAI_VISION_MODEL_IDS,
    scenarioModelId: OPENAI_SCENARIO_MODEL_OPTIONS.map(x => x.id),
    promptModelId: OPENAI_SCENARIO_MODEL_OPTIONS.map(x => x.id),
    openAIImageQuality: OPENAI_IMAGE_OPTIONS.map(x => x.value),
    openAIImageSize: OPENAI_IMAGE_SIZE_OPTIONS.map(x => x.value),
    newsCategories:DEFAULT_CATEGORIES.map(category=>category.id),
    punchlineType: [...new Set(['Auto', 'GagAuto', 'SeriousAuto', ...GAG_ENDING_OPTIONS.map(x => x.value), ...SERIOUS_ENDING_OPTIONS.map(x => x.value), ...DOCUMENTARY_ENDING_OPTIONS.map(x => x.value)])],
  };
}
