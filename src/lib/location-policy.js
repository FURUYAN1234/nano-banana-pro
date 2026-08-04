const UNSAFE_LOCATION_PATTERNS = [
  /(?:ホラー|グロテスク|グロ描写|猟奇)/i,
  /(?:脳漿|脳みそ|脳のしわ|脳のシワ)/i,
  /(?:内臓|臓器|腸内|胃(?:袋)?の中|人体内部|体内(?:空間|世界|背景|内部|の中))/i,
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

export const createDynamicLocationPlan = ({
  customLocation = '',
  backgroundLocation = '',
  backgroundDetails = null
} = {}) => {
  const normalizedBackground = String(backgroundLocation || '').trim();
  const normalizedCustom = String(customLocation || '').trim();
  const explicitLocation = normalizedBackground || normalizedCustom;

  if (explicitLocation) {
    const explicitDetails = normalizedBackground ? backgroundDetails : null;
    if (!isSafeLocationContent(explicitLocation, explicitDetails)) {
      throw new Error('指定された場所は安全ポリシーにより使用できません。通常の非生体ロケーションを指定してください。');
    }
    return buildExplicitPlan(normalizedBackground ? 'background' : 'custom', explicitLocation, explicitDetails);
  }

  return {
    mode: 'adaptive',
    anchorName: '',
    anchorDetails: null,
    anchors: [],
    guidance: 'ニュース本文またはユーザー入力と、4コマで実際に行う行動を先に読み、出来事が最も自然に起きる安全で具体的な舞台を1つ自由に設計すること。既定候補や一般的な日常・夜・屋内という弱い一致に寄せず、シナリオとの因果関係を優先すること。最終的な舞台は非生体・非グロテスクで、一般向けの場所にすること。'
  };
};

export const createHybridLocationPlan = createDynamicLocationPlan;

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
  validateScenario = null,
  retryInstruction = '',
  onRetry = () => {},
  maxAttempts = 2
}) => {
  let lastSafetyError = null;
  let retryContext = null;
  let bestQualityCandidate = null;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const retryText = typeof retryInstruction === 'function'
      ? retryInstruction(retryContext || {})
      : retryInstruction;
    const prompt = attempt === 0
      ? initialPrompt
      : retryContext?.kind === 'safety'
        ? `${initialPrompt}\n\n${SAFE_LOCATION_RETRY_INSTRUCTION}${retryText ? `\n\n${retryText}` : ''}`
        : `${initialPrompt}\n\n${retryText || 'QUALITY RETRY: Rewrite the complete scenario and correct the failed quality requirement while preserving the topic, cast, dialogue intent, and four-panel structure.'}`;
    const response = await requestScenario(prompt);
    const parsed = parseScenario(response);

    try {
      assertSafeScenarioOutput(parsed);
    } catch (error) {
      lastSafetyError = error;
      retryContext = {
        kind: 'safety',
        code: typeof error?.code === 'string' ? error.code : 'SAFE_LOCATION',
        message: error?.message || ''
      };
      if (attempt + 1 < maxAttempts) {
        onRetry({
          attempt: attempt + 1,
          ...retryContext
        });
      }
      continue;
    }

    try {
      validateScenario?.(parsed);
      return { response, parsed, attempts: attempt + 1, validationWarning: null };
    } catch (error) {
      const qualityScore = Number.isFinite(error?.qualityScore) ? error.qualityScore : 0;
      if (
        !bestQualityCandidate
        || qualityScore > bestQualityCandidate.qualityScore
        || (qualityScore === bestQualityCandidate.qualityScore && attempt > bestQualityCandidate.attempt)
      ) {
        bestQualityCandidate = {
          response,
          parsed,
          error,
          attempt,
          qualityScore
        };
      }
      if (attempt + 1 >= maxAttempts) {
        const selectedCandidate = bestQualityCandidate;
        return {
          response: selectedCandidate.response,
          parsed: selectedCandidate.parsed,
          attempts: attempt + 1,
          validationWarning: {
            code: typeof selectedCandidate.error?.code === 'string' ? selectedCandidate.error.code : 'SCENARIO_QUALITY',
            message: selectedCandidate.error?.message || 'シナリオ品質検証に通りませんでした。',
            qualityScore: selectedCandidate.qualityScore
          }
        };
      }
      lastSafetyError = error;
      retryContext = {
        kind: 'quality',
        code: typeof error?.code === 'string' ? error.code : 'SCENARIO_QUALITY',
        message: error?.message || ''
      };
      onRetry({
        attempt: attempt + 1,
        ...retryContext
      });
    }
  }

  throw lastSafetyError || new Error('AIのシナリオ出力が安全ポリシーに違反しました。');
};
