const GEMINI_KEY_PATTERN = /^AIza[A-Za-z0-9_-]{35}$/;
const OPENAI_KEY_PATTERN = /^sk-(?:proj-|ant-)?[A-Za-z0-9_-]{20,}$/;
const PREFLIGHT_TIMEOUT_MS = 15000;

const isLocalGeminiHost = () => typeof window !== 'undefined'
  && ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname);

const getGeminiBaseUrl = () => isLocalGeminiHost()
  ? '/gemini-api'
  : 'https://generativelanguage.googleapis.com';

export const sanitizeApiKeyInput = (key) => String(key || '')
  .replace(/[^\u0000-\u007F]/g, '')
  .trim();

export const validateApiKeyInput = (key) => {
  const sanitizedKey = sanitizeApiKeyInput(key);

  if (!sanitizedKey) {
    return {
      ok: false,
      provider: null,
      sanitizedKey,
      message: 'APIキーが空です。',
    };
  }

  if (OPENAI_KEY_PATTERN.test(sanitizedKey)) {
    return {
      ok: true,
      provider: 'openai',
      sanitizedKey,
      message: '',
    };
  }

  if (GEMINI_KEY_PATTERN.test(sanitizedKey)) {
    return {
      ok: true,
      provider: 'gemini',
      sanitizedKey,
      message: '',
    };
  }

  return {
    ok: false,
    provider: null,
    sanitizedKey,
    message: 'APIキーの形式が正しくありません。Geminiキー（AIza...）またはOpenAIキー（sk-...）を入力してください。',
  };
};

const readErrorMessage = async (response) => {
  const data = await response.json().catch(() => ({}));
  return data?.error?.message || response.statusText || `HTTP ${response.status}`;
};

const sanitizeProviderError = (message, provider) => {
  const normalized = String(message || '').toLowerCase();
  if (
    normalized.includes('api key') ||
    normalized.includes('unauthorized') ||
    normalized.includes('forbidden') ||
    normalized.includes('permission') ||
    normalized.includes('401') ||
    normalized.includes('403')
  ) {
    return provider === 'openai'
      ? 'OpenAI APIキーの検証に失敗しました。OpenAIダッシュボードでキーを確認してから再入力してください。'
      : 'Gemini APIキーの検証に失敗しました。Google AI Studioでキーを確認してから再入力してください。';
  }
  return provider === 'openai'
    ? 'OpenAI APIへの事前接続確認に失敗しました。アカウント権限やネットワークを確認してから再試行してください。'
    : 'Gemini APIへの事前接続確認に失敗しました。アカウント権限やネットワークを確認してから再試行してください。';
};

const withTimeout = async (task, timeoutMs = PREFLIGHT_TIMEOUT_MS) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await task(controller.signal);
  } finally {
    clearTimeout(timeoutId);
  }
};

const verifyGeminiKey = async (key, fetchImpl, timeoutMs) => withTimeout(async (signal) => {
  const response = await fetchImpl(`${getGeminiBaseUrl()}/v1beta/models`, {
    method: 'GET',
    headers: { 'x-goog-api-key': key },
    signal,
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }

  const data = await response.json().catch(() => ({}));
  if (!Array.isArray(data.models)) {
    throw new Error('Gemini models endpoint returned an unexpected response.');
  }
}, timeoutMs);

const verifyOpenAIKey = async (key, fetchImpl, timeoutMs) => withTimeout(async (signal) => {
  const response = await fetchImpl('https://api.openai.com/v1/models', {
    method: 'GET',
    headers: { Authorization: `Bearer ${key}` },
    signal,
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }

  const data = await response.json().catch(() => ({}));
  if (!Array.isArray(data.data)) {
    throw new Error('OpenAI models endpoint returned an unexpected response.');
  }
}, timeoutMs);

export const verifyApiKeyConnection = async (key, options = {}) => {
  const validation = validateApiKeyInput(key);
  if (!validation.ok) {
    return validation;
  }

  const fetchImpl = options.fetchImpl || globalThis.fetch;
  if (typeof fetchImpl !== 'function') {
    return {
      ...validation,
      ok: false,
      message: 'ブラウザの通信機能を利用できません。ページを再読み込みして再試行してください。',
    };
  }

  try {
    if (validation.provider === 'openai') {
      await verifyOpenAIKey(validation.sanitizedKey, fetchImpl, options.timeoutMs);
    } else {
      await verifyGeminiKey(validation.sanitizedKey, fetchImpl, options.timeoutMs);
    }
    return {
      ...validation,
      ok: true,
      message: '',
    };
  } catch (error) {
    return {
      ...validation,
      ok: false,
      message: error?.name === 'AbortError'
        ? 'APIキー検証がタイムアウトしました。通信状況を確認して再試行してください。'
        : sanitizeProviderError(error?.message, validation.provider),
    };
  }
};
