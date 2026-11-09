const UNSAFE_SCENARIO_PATTERNS = [
  /\b(?:horror|body[ -]?horror|gore|gory|viscera|entrails|brain matter)\b/i,
  /\b(?:biological weapon|bio weapon|blood[ -]?(?:soaked|splattered|covered)|flesh wall|body cavity|internal organs?|intestines?)\b/i,
  /(?:生物兵器|牛の分泌液|分泌液|内臓|脳漿|肉壁|血まみれ|血塗れ|流血|臓器)/i
];

const flattenValues = (value) => {
  if (Array.isArray(value)) return value.flatMap(flattenValues);
  if (value && typeof value === 'object') return Object.values(value).flatMap(flattenValues);
  return [String(value ?? '')];
};

// Only a complete negative clause is exempt. Keep scanning all other clauses,
// including double negations and affirmative depictions of the same term.
const HARM_STATE = '(?:怪我|けが|負傷|出血|傷)';
const NO_BLOOD_DEPICTION = new RegExp(
  `流血(?:も${HARM_STATE}も(?:ない|無し|なし)|(?:[・、/やと]${HARM_STATE})*(?:(?:は|が)?(?:ない|無し|なし)|(?:は|を)?(?:描かない|描写しない|見せない|描写禁止)))(?=\\s*(?:[。．.!！?？、,;；」』）)]|$))`,
  'gu'
);

export const isSafeScenarioContent = (...values) => {
  const text = values.flatMap(flattenValues).map(value =>
    value.normalize('NFKC').split('\n').map(line => line.replace(NO_BLOOD_DEPICTION, ' ')).join('\n')
  ).join('\n');
  return !UNSAFE_SCENARIO_PATTERNS.some((pattern) => pattern.test(text));
};

export const assertSafeScenarioContent = (scenario = {}) => {
  if (!isSafeScenarioContent(scenario)) {
    throw new Error('シナリオ本文の表現衛生ポリシーに違反する表現を検出しました。');
  }
  return true;
};

export const SAFE_CONTENT_RETRY_INSTRUCTION = `SAFE SCENARIO CONTENT RETRY:
Rewrite the complete scenario from scratch for a general audience. Remove actual biological-horror, gore, weaponized-body, blood, viscera, organ, and secretion depictions. Preserve the requested panel count, topic, cast, tone, action, Camera and dialogue intent. Keep safe action, and replace unsuitable details with ordinary props or safe visual equivalents.`;

export const requestSafeScenarioContent = async ({
  initialPrompt,
  requestScenario,
  onRetry = () => {},
  maxAttempts = 1
}) => {
  let lastError = null;
  let lastResponse = null;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const prompt = attempt === 0
      ? initialPrompt
      : `${initialPrompt}\n\n${SAFE_CONTENT_RETRY_INSTRUCTION}`;
    const response = await requestScenario(prompt);
    lastResponse = response;

    try {
      assertSafeScenarioContent(response);
      return { response, parsed: response, attempts: attempt + 1 };
    } catch (error) {
      lastError = error;
      if (attempt + 1 < maxAttempts) {
        onRetry({
          attempt: attempt + 2,
          maxAttempts
        });
      }
    }
  }

  return {
    response: lastResponse,
    parsed: lastResponse,
    attempts: maxAttempts,
    validationWarning: {
      code: 'SCENARIO_CONTENT',
      message: lastError?.message || 'シナリオ本文の表現衛生ポリシーに違反する表現を検出しました。'
    }
  };
};
