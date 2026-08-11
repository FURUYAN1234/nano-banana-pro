// ※ OpenAIの画像生成はフォールバック配列を持たず、最高品質の単一モデルを直接指定します。
import { clearApiSession, getApiCredential, setApiSession } from './api-session.js';

const OPENAI_IMAGE_MODEL = "gpt-image-2";
const OPENAI_IMAGE_TIMEOUT_MS = 600000;
const OPENAI_IMAGE_TIMEOUT_SECONDS = OPENAI_IMAGE_TIMEOUT_MS / 1000;
const OPENAI_IMAGE_PROMPT_MAX_CHARS = 32000;

export const buildOpenAIImageRequestBody = (prompt, { stream = true } = {}) => ({
  model: OPENAI_IMAGE_MODEL,
  prompt,
  n: 1,
  size: "1024x1536",
  quality: "high",
  output_format: "png",
  moderation: "low",
  ...(stream ? { stream: true, partial_images: 1 } : {}),
});

const isBrowserStreamFetchFailure = (error) => (
  error?.name === 'TypeError'
  && /failed to fetch|networkerror|load failed/i.test(error?.message || '')
);

export const setOpenAIApiKey = (key) => {
    if (key) setApiSession('openai', key);
    else clearApiSession('openai');
};

export const getOpenAIApiKey = () => {
    return getApiCredential('openai');
};

export const readOpenAIImageStream = async (response, statCallback = () => {}) => {
  if (!response.body || typeof response.body.getReader !== 'function') {
    throw new Error('OpenAI画像ストリームを読み取れませんでした。');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let finalImage = '';
  let latestPartialImage = '';

  const processEvent = (rawEvent) => {
    const data = rawEvent
      .split(/\r?\n/)
      .filter((line) => line.startsWith('data:'))
      .map((line) => line.slice(5).trimStart())
      .join('\n')
      .trim();

    if (!data || data === '[DONE]') return;

    let event;
    try {
      event = JSON.parse(data);
    } catch {
      throw new Error('OpenAI画像ストリームの応答形式が不正です。');
    }

    if (event.type === 'error' || event.error) {
      throw new Error(event.error?.message || event.message || 'OpenAI画像生成ストリームでエラーが発生しました。');
    }

    if (event.type === 'image_generation.partial_image') {
      if (event.b64_json) {
        latestPartialImage = event.b64_json;
      }
      statCallback(`[OpenAI] 途中画像を受信しました (${Number(event.partial_image_index || 0) + 1})。最終画像を待機中...`);
    }

    if (event.type === 'image_generation.completed' && event.b64_json) {
      finalImage = event.b64_json;
    }
  };

  try {
    while (true) {
      const { value, done } = await reader.read();
      buffer += decoder.decode(value || new Uint8Array(), { stream: !done });

      let boundary = buffer.match(/\r?\n\r?\n/);
      while (boundary) {
        processEvent(buffer.slice(0, boundary.index));
        buffer = buffer.slice(boundary.index + boundary[0].length);
        boundary = buffer.match(/\r?\n\r?\n/);
      }

      if (done) break;
    }
  } catch (error) {
    if (latestPartialImage) {
      statCallback('[OpenAI] 最終イベントの受信前に接続が切れたため、受信済みの途中画像を採用します。');
      return latestPartialImage;
    }
    throw error;
  }

  if (buffer.trim()) processEvent(buffer);
  if (!finalImage) {
    throw new Error('OpenAI画像ストリームに最終画像データが含まれていませんでした。');
  }

  return finalImage;
};

export const generateImageWithOpenAI = async (prompt, statCallback) => {
  statCallback("[OpenAI] ChatGPT Images 2.0 にリクエストを送信中...");
  
  const apiKey = getOpenAIApiKey();
  if (!apiKey) {
    throw new Error("OpenAI APIキーが設定されていません。");
  }

  const promptLength = prompt?.length || 0;
  if (promptLength > OPENAI_IMAGE_PROMPT_MAX_CHARS) {
    throw new Error(`OpenAI画像生成プロンプトが長すぎます（${promptLength.toLocaleString()}文字 / 上限${OPENAI_IMAGE_PROMPT_MAX_CHARS.toLocaleString()}文字）。プロンプトを短くしてから再実行してください。`);
  }
  if (promptLength > OPENAI_IMAGE_PROMPT_MAX_CHARS * 0.9) {
    statCallback(`[WARN] OpenAI画像生成プロンプトが上限に近づいています（${promptLength.toLocaleString()} / ${OPENAI_IMAGE_PROMPT_MAX_CHARS.toLocaleString()}文字）`);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), OPENAI_IMAGE_TIMEOUT_MS); // gpt-image-2 high quality can exceed 6 minutes when congested.

  const fetchImage = (stream) => fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify(buildOpenAIImageRequestBody(prompt, { stream })),
    signal: controller.signal
  });

  let response;
  try {
    try {
      response = await fetchImage(true);
    } catch (error) {
      if (!isBrowserStreamFetchFailure(error)) throw error;
      statCallback('[WARN] 画像ストリーム接続に失敗したため、通常応答で1回再試行します...');
      response = await fetchImage(false);
    }
  } catch (e) {
    if (e.name === 'AbortError' || e.message.includes('aborted')) {
      throw new Error(`API Time out (${OPENAI_IMAGE_TIMEOUT_SECONDS}秒経過による強制切断)。サーバーが混雑しているか、応答がありません。`);
    }
    throw e;
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`OpenAI API Error: ${response.status} ${errorData.error?.message || response.statusText}`);
  }

  const contentType = response.headers?.get?.('content-type') || '';
  if (contentType.includes('text/event-stream')) {
    const base64Img = await readOpenAIImageStream(response, statCallback);
    statCallback("[OpenAI] 画像の生成に成功しました。");
    return {
      base64Img,
      mimeType: "image/png",
      usedModel: OPENAI_IMAGE_MODEL
    };
  }

  const data = await response.json();
  statCallback("[OpenAI] 画像の生成に成功しました。");
  
  if (data.data && data.data.length > 0) {
    return {
      base64Img: data.data[0].b64_json,
      mimeType: "image/png",
      usedModel: OPENAI_IMAGE_MODEL
    };
  } else {
    throw new Error("APIレスポンスに画像データが含まれていませんでした。");
  }
};
