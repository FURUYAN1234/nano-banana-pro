const UNSAFE_LOCATION_PATTERNS = [
  /(?:ホラー|グロテスク|グロ描写|猟奇)/i,
  /(?:脳漿|脳みそ|脳のしわ|脳のシワ)/i,
  /(?:内臓|臓器|腸内|胃の中|人体内部|体内(?:空間|世界|背景|内部|の中))/i,
  /(?:肉壁|肉の壁|生体組織|有機組織|生体背景|生物的背景|有機的な背景|皮膚の壁|血まみれ|血しぶき|出血)/i,
  /\b(?:horror|body[ -]?horror|gore|gory|viscera|entrails|brain matter)\b/i,
  /\b(?:blood[ -]?(?:soaked|splattered|covered)|flesh wall|body cavity|internal organs?|intestines?)\b/i,
  /\b(?:inside|interior of) (?:a |the )?(?:human )?body\b/i,
  /\b(?:living|pulsating|organic) (?:flesh|tissue|membrane|wall)\b/i
];

const flattenLocationDetails = (value) => {
  if (Array.isArray(value)) return value.flatMap(flattenLocationDetails);
  if (value && typeof value === 'object') {
    return Object.values(value).flatMap(flattenLocationDetails);
  }
  return [String(value ?? '')];
};

import { rankBackgroundPresets } from './background-rag.js';

export const SAFE_VISUAL_CONTENT_LOCK = `SAFE VISUAL CONTENT LOCK: No horror/gore/blood, body interiors, organs/viscera/brain/flesh/living tissue, or creepy organic backgrounds. Use external, non-organic settings; replace biological scenery with ordinary architecture without changing script/cast/dialogue/camera/layout.`;

export const isSafeLocationContent = (...values) => {
  const text = values
    .flatMap(flattenLocationDetails)
    .join('\n')
    .normalize('NFKC');

  return !UNSAFE_LOCATION_PATTERNS.some((pattern) => pattern.test(text));
};

export const getSafeCuratedLocationNames = (locationDetails = {}) => (
  Object.entries(locationDetails)
    .filter(([name, details]) => isSafeLocationContent(name, details))
    .map(([name]) => name)
);

const buildExplicitPlan = (mode, name, details) => ({
  mode,
  anchorName: name,
  anchorDetails: details || null,
  guidance: `指定場所「${name}」を使用すること。ホラー、グロ、人体内部、不気味な生体背景は禁止。`
});

export const createHybridLocationPlan = ({
  locationDetails = {},
  customLocation = '',
  backgroundLocation = '',
  backgroundDetails = null,
  topicText = '',
  moodText = '',
  random = Math.random
} = {}) => {
  const normalizedBackground = String(backgroundLocation || '').trim();
  const normalizedCustom = String(customLocation || '').trim();
  const explicitLocation = normalizedBackground || normalizedCustom;

  if (explicitLocation) {
    const explicitDetails = normalizedBackground ? backgroundDetails : null;
    if (!isSafeLocationContent(explicitLocation, explicitDetails)) {
      throw new Error('指定された場所は安全ポリシーにより使用できません。通常の非生体ロケーションを指定してください。');
    }
    return buildExplicitPlan(normalizedBackground ? 'background' : 'custom', explicitLocation, locationDetails[explicitLocation]);
  }

  const safeNames = getSafeCuratedLocationNames(locationDetails);
  if (safeNames.length === 0) {
    throw new Error('安全ポリシーを満たすロケーション候補がありません。');
  }

  const ranked = rankBackgroundPresets({ locationDetails, topicText, moodText })
    .filter(({ name }) => safeNames.includes(name));
  const semanticWinner = ranked.find(({ score }) => score > 0);
  const randomValue = Number(random());
  const safeRandom = Number.isFinite(randomValue) ? Math.min(Math.max(randomValue, 0), 0.999999999) : 0;
  const anchorName = semanticWinner?.name || safeNames[Math.floor(safeRandom * safeNames.length)];
  const anchors = semanticWinner?.anchors || (locationDetails[anchorName]?.props || []).slice(0, 2);

  return {
    mode: 'hybrid',
    anchorName,
    anchorDetails: locationDetails[anchorName],
    anchors,
    guidance: `安全な参考候補は「${anchorName}」。この候補を採用してもよいが、ニュース内容により適した別の安全な場所を新規に考案してもよい。最終的な舞台は非生体・非グロテスクで、一般向けの場所にすること。${anchors.length ? ` 4コマを通して「${anchors.join('」「')}」を背景アンカーとして維持すること。` : ''}`
  };
};

export const assertSafeScenarioOutput = ({ location = '', scenario = '' } = {}) => {
  if (!isSafeLocationContent(location, scenario)) {
    throw new Error('AIのシナリオ出力が安全ポリシーに違反しました。');
  }
  return true;
};

const SAFE_LOCATION_RETRY_INSTRUCTION = `SAFE LOCATION RETRY:
The previous response was rejected by the local safety gate. Generate the complete scenario again from scratch.
Use only an external, non-organic, non-grotesque, general-audience setting. Do not mention or depict horror, gore, blood-soaked scenery, body interiors, internal organs, viscera, brain matter, flesh walls, living tissue, or creepy biological environments.
Keep the requested topic, cast, four-panel structure, dialogue requirements, and output format.`;

export const requestSafeScenario = async ({
  initialPrompt,
  requestScenario,
  parseScenario,
  onRetry = () => {},
  maxAttempts = 2
}) => {
  let lastSafetyError = null;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const prompt = attempt === 0
      ? initialPrompt
      : `${initialPrompt}\n\n${SAFE_LOCATION_RETRY_INSTRUCTION}`;
    const response = await requestScenario(prompt);
    const parsed = parseScenario(response);

    try {
      assertSafeScenarioOutput(parsed);
      return { response, parsed, attempts: attempt + 1 };
    } catch (error) {
      lastSafetyError = error;
      if (attempt + 1 < maxAttempts) onRetry(attempt + 1);
    }
  }

  throw lastSafetyError || new Error('AIのシナリオ出力が安全ポリシーに違反しました。');
};
