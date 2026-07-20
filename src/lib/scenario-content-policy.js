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

export const isSafeScenarioContent = (...values) => {
  const text = values.flatMap(flattenValues).join('\n').normalize('NFKC');
  return !UNSAFE_SCENARIO_PATTERNS.some((pattern) => pattern.test(text));
};

export const assertSafeScenarioContent = (scenario = {}) => {
  if (!isSafeScenarioContent(scenario)) {
    throw new Error('シナリオ本文の表現衛生ポリシーに違反する表現を検出しました。');
  }
  return true;
};

const SAFE_CONTENT_RETRY_INSTRUCTION = `SAFE SCENARIO CONTENT RETRY:
Rewrite the complete scenario from scratch for a general audience. Remove biological-horror, gore, weaponized-body, blood, viscera, organ, and secretion wording. Keep the topic, cast, four-panel structure, dialogue intent, and comedy intact. Use ordinary food, props, or playful non-biological metaphors instead.`;

export const requestSafeScenarioContent = async ({
  initialPrompt,
  requestScenario,
  onRetry = () => {},
  maxAttempts = 2
}) => {
  let lastError = null;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const prompt = attempt === 0
      ? initialPrompt
      : `${initialPrompt}\n\n${SAFE_CONTENT_RETRY_INSTRUCTION}`;
    const response = await requestScenario(prompt);

    try {
      assertSafeScenarioContent(response);
      return { response, parsed: response, attempts: attempt + 1 };
    } catch (error) {
      lastError = error;
      if (attempt + 1 < maxAttempts) onRetry(attempt + 1);
    }
  }

  throw lastError || new Error('シナリオ本文の表現衛生ポリシーに違反する表現を検出しました。');
};
