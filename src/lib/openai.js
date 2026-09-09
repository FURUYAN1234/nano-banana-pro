// ※ OpenAIの画像生成はフォールバック配列を持たず、最高品質の単一モデルを直接指定します。
import { clearApiSession, getApiCredential, setApiSession } from './api-session.js';

import { resolveOpenAIImageOption } from './openai-image-settings.js';
import {OPENAI_IMAGE_INPUT_LIMIT, normalizeOpenAIImageDataUrl} from './openai-image-references.js';
const OPENAI_IMAGE_TIMEOUT_MS = 600000;
const OPENAI_IMAGE_TIMEOUT_SECONDS = OPENAI_IMAGE_TIMEOUT_MS / 1000;
const OPENAI_IMAGE_PROMPT_MAX_CHARS = 32000;

export const buildOpenAIImageRequestBody = (prompt, { stream = true, quality } = {}) => ({
  model: resolveOpenAIImageOption(quality).model,
  prompt,
  n: 1,
  size: "1024x1536",
  quality: resolveOpenAIImageOption(quality).quality,
  output_format: "png",
  moderation: "low",
  ...(stream ? { stream: true, partial_images: 1 } : {}),
});

export function buildOpenAIImageRequest(prompt, {quality, stream = true, imageInputs = []} = {}) {
  if (typeof prompt !== 'string' || !prompt.trim()) throw new Error('画像生成プロンプトが空です。');
  if (prompt.length > OPENAI_IMAGE_PROMPT_MAX_CHARS) throw new Error('参照説明を含む画像生成プロンプトが32,000文字を超えています。本文を確認してください。');
  if (!Array.isArray(imageInputs)) throw new Error('OpenAI参照画像は配列で指定してください。');
  if (imageInputs.length > OPENAI_IMAGE_INPUT_LIMIT) throw new Error('OpenAI画像入力は元画像を含めて最大16枚です。');
  const images = imageInputs.map((item, i) => ({
    image_url: normalizeOpenAIImageDataUrl(item?.image_url, `送信画像${i + 1}`),
  }));
  const isEdit = images.length > 0;
  return {
    url: `https://api.openai.com/v1/images/${isEdit ? 'edits' : 'generations'}`,
    body: {...buildOpenAIImageRequestBody(prompt, {quality, stream}), ...(isEdit ? {images} : {})},
    isEdit,
  };
}

async function generateOpenAIImageEdit(request, selectedOption, apiKey, statCallback) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), OPENAI_IMAGE_TIMEOUT_MS);
  try {
    const response = await fetch(request.url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}`},
      body: JSON.stringify(request.body),
      signal: controller.signal,
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      const message = String(data.error?.message || response.statusText)
        .replace(/data:image\/[^\s"']+/g, '[image data omitted]');
      throw new Error(`OpenAI API Error: ${response.status} ${message}`);
    }
    const contentType = response.headers?.get?.('content-type') || '';
    let base64Img;
    if (contentType.includes('text/event-stream')) {
      base64Img = await readOpenAIImageStream(response, statCallback, {eventPrefix: 'image_edit', requireFinal: true});
    } else {
      const data = await response.json();
      base64Img = data.data?.[0]?.b64_json;
    }
    if (typeof base64Img !== 'string' || !base64Img.trim()) throw new Error('OpenAI画像編集の応答に完成画像データが含まれていませんでした。');
    statCallback('[OpenAI] 参照画像を使った画像生成が完了しました。');
    return {base64Img, mimeType: 'image/png', usedModel: selectedOption.model};
  } catch (error) {
    if (controller.signal.aborted || error?.name === 'AbortError') {
      throw new Error(`API Time out (${OPENAI_IMAGE_TIMEOUT_SECONDS}秒経過)。画像編集の完了を確認できませんでした。`);
    }
    // Provider errors may echo input data. Never return credentials or image data to UI logs.
    const message = String(error?.message || 'OpenAI画像編集でエラーが発生しました。')
      .split(apiKey).join('[credential omitted]')
      .replace(/data:image\/[^\s"'<>]+/gi, '[image data omitted]')
      .replace(/\bsk-[A-Za-z0-9_-]+/g, '[credential omitted]');
    const safeError = new Error(message);
    if (error?.name === 'TypeError' || error?.name === 'SyntaxError') safeError.name = error.name;
    throw safeError;
  } finally {
    clearTimeout(timer);
  }
}

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

export const readOpenAIImageStream = async (
  response,
  statCallback = () => {},
  {eventPrefix = 'image_generation', requireFinal = false} = {},
) => {
  if (!response.body || typeof response.body.getReader !== 'function') {
    throw new Error('OpenAI画像ストリームを読み取れませんでした。');
  }
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let finalImage = '';
  let latestPartialImage = '';
  let readFailed = false;

  const processEvent = rawEvent => {
    const data = rawEvent.split(/\r?\n/)
      .filter(line => line.startsWith('data:'))
      .map(line => line.slice(5).trimStart()).join('\n').trim();
    if (!data || data === '[DONE]') return;
    let event;
    try {
      event = JSON.parse(data);
    } catch {
      throw new Error('OpenAI画像ストリームの応答形式が不正です。');
    }
    if (event?.type === 'error' || event?.error) {
      const message = String(event.error?.message || event.message || 'OpenAI画像生成ストリームでエラーが発生しました。');
      throw new Error(requireFinal ? message.replace(/data:image\/[^\s"']+/g, '[image data omitted]') : message);
    }
    if (event?.type === `${eventPrefix}.partial_image`) {
      if (event.b64_json) latestPartialImage = event.b64_json;
      statCallback(`[OpenAI] 途中画像を受信しました (${Number(event.partial_image_index || 0) + 1})。最終画像を待機中...`);
    }
    if (event?.type === `${eventPrefix}.completed` && event.b64_json) {
      if (requireFinal && (typeof event.b64_json !== 'string' || !event.b64_json.trim())) {
        throw new Error('OpenAI画像編集の完成画像データが不正です。');
      }
      finalImage = event.b64_json;
    }
  };

  try {
    while (true) {
      let chunk;
      try {
        chunk = await reader.read();
      } catch (error) {
        readFailed = true;
        throw error;
      }
      buffer += decoder.decode(chunk.value || new Uint8Array(), {stream: !chunk.done});
      let boundary = buffer.match(/\r?\n\r?\n/);
      while (boundary) {
        processEvent(buffer.slice(0, boundary.index));
        buffer = buffer.slice(boundary.index + boundary[0].length);
        boundary = buffer.match(/\r?\n\r?\n/);
      }
      if (chunk.done) break;
    }
  } catch (error) {
    if (requireFinal) {
      if (readFailed && finalImage) return finalImage;
      throw error;
    }
    if (latestPartialImage) {
      statCallback('[OpenAI] 最終イベントの受信前に接続が切れたため、受信済みの途中画像を採用します。');
      return latestPartialImage;
    }
    throw error;
  }
  if (buffer.trim()) processEvent(buffer);
  if (!finalImage) throw new Error('OpenAI画像ストリームに最終画像データが含まれていませんでした。');
  return finalImage;
};

export const generateImageWithOpenAI = async (prompt, statCallback, options = {}) => {
  const selectedOption = resolveOpenAIImageOption(options.quality);
  const quality = selectedOption.value;
  statCallback(`[OpenAI] ${selectedOption.label} にリクエストを送信中...`);
  
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

  const request = buildOpenAIImageRequest(prompt, {
    quality,
    imageInputs: options.imageInputs ?? [],
  });
  if (request.isEdit) {
    return generateOpenAIImageEdit(request, selectedOption, apiKey, statCallback);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), OPENAI_IMAGE_TIMEOUT_MS); // gpt-image-2 high quality can exceed 6 minutes when congested.

  const fetchImage = (stream) => fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify(buildOpenAIImageRequestBody(prompt, { stream, quality })),
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
      usedModel: selectedOption.model
    };
  }

  const data = await response.json();
  statCallback("[OpenAI] 画像の生成に成功しました。");
  
  if (data.data && data.data.length > 0) {
    return {
      base64Img: data.data[0].b64_json,
      mimeType: "image/png",
      usedModel: selectedOption.model
    };
  } else {
    throw new Error("APIレスポンスに画像データが含まれていませんでした。");
  }
};
