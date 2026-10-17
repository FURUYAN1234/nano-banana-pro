import { getApiCredential } from './api-session.js';
import { readApiJson } from './api-errors.js';
import { postGeminiGenerateContent } from './gemini.js';

export const OPENAI_TRANSCRIPTION_MODEL = 'gpt-4o-mini-transcribe';
export const GEMINI_TRANSCRIPTION_MODEL = 'gemini-3.8-flash';
export const MAX_DICTATION_BYTES = 10 * 1024 * 1024;
const TRANSCRIPTION_TIMEOUT_MS = 90_000;
const AUDIO_EXTENSIONS = { 'audio/webm': 'webm', 'audio/mp4': 'mp4', 'audio/wav': 'wav' };

export const getDictationMimeType = blob => String(blob?.type || '').split(';')[0].toLowerCase();

export const appendDictatedText = (current, spoken) => {
  const text = String(spoken || '').trim();
  if (!text) return current;
  return `${current}${current && !/\s$/.test(current) ? '\n' : ''}${text}`;
};

const encodeBase64 = async blob => {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  let binary = '';
  for (let offset = 0; offset < bytes.length; offset += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
  }
  return btoa(binary);
};

export async function transcribeStep2Audio(blob, provider, signal) {
  if (provider !== 'openai' && provider !== 'gemini') throw new Error('音声入力のAPIプロバイダーが不正です。');
  const credential = getApiCredential(provider);
  if (!credential) throw new Error('選択中のAPIに接続してから音声入力を使用してください。');
  const mimeType = getDictationMimeType(blob);
  if (!AUDIO_EXTENSIONS[mimeType] || !blob.size || blob.size > MAX_DICTATION_BYTES) {
    throw new Error('音声を録音できませんでした。短く録音し直してください。');
  }
  if (signal?.aborted) throw new DOMException('音声入力を中断しました。', 'AbortError');

  let text;
  if (provider === 'openai') {
    const body = new FormData();
    body.append('model', OPENAI_TRANSCRIPTION_MODEL);
    body.append('file', blob, `step2-dictation.${AUDIO_EXTENSIONS[mimeType]}`);
    const timeout = AbortSignal.timeout(TRANSCRIPTION_TIMEOUT_MS);
    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${credential}` },
      body,
      signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
    });
    const data = await readApiJson(response, { provider: 'openai', model: OPENAI_TRANSCRIPTION_MODEL });
    text = data?.text;
  } else {
    const base64 = await encodeBase64(blob);
    if (signal?.aborted) throw new DOMException('音声入力を中断しました。', 'AbortError');
    const data = await postGeminiGenerateContent(GEMINI_TRANSCRIPTION_MODEL, {
      contents: [{ role: 'user', parts: [
        { text: '話された言語を保って、この音声の発話内容だけを文字起こししてください。説明や要約は追加しないでください。発話がなければ空文字を返してください。' },
        { inlineData: { mimeType, data: base64 } },
      ] }],
      generationConfig: { maxOutputTokens: 4096 },
    }, TRANSCRIPTION_TIMEOUT_MS, signal);
    text = data?.candidates?.[0]?.content?.parts
      ?.filter(part => typeof part.text === 'string' && !part.thought)
      .map(part => part.text).join('');
  }
  if (typeof text !== 'string' || !text.trim()) throw new Error('音声から文字を取得できませんでした。入力欄は変更していません。');
  return text.trim();
}
