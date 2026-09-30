import { clearApiSession, getApiCredential, setApiSession } from './api-session.js';
import { geminiSources } from './sns-explanation.js';
import { GEMINI_TEXT_MODEL_IDS, GEMINI_VISION_MODEL_IDS } from './gemini-model-routes.js';
import {createApiError, readApiJson, aggregateApiErrors, formatApiErrorDetails, shouldStopApiFallback} from './api-errors.js';

/**
 * Gemini API Client for Nano Banana Pro (Thinking Mode Edition)
 * (自動モデル探索機能は廃止され、指定された静的フォールバックリストを厳密に遵守します。)
 * 接続エラー時の「Account Model Diagnosis」は、エラーログ出力のための診断専用です。
 */

// ローカル開発時はViteプロキシ経由でAPIを呼ぶ（ブラウザのOriginヘッダーによるキー拒否を回避）
// 本番ビルド（GitHub Pages等）では直接Google APIを叩く
const isLocalGeminiHost = typeof window !== 'undefined'
    && ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname);
const GEMINI_BASE_URL = isLocalGeminiHost
    ? '/gemini-api'
    : 'https://generativelanguage.googleapis.com';
const GEMINI_TEXT_TIMEOUT_MS = 600_000;

export const setApiKey = (key) => {
    if (key) setApiSession('gemini', key);
    else clearApiSession('gemini');
};

export const getApiKey = () => {
    return getApiCredential('gemini');
};

const GEMINI_SAFETY_SETTINGS = [
    { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
    { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
];

const postGeminiGenerateContent = async (modelId, requestBody, timeoutMs = GEMINI_TEXT_TIMEOUT_MS, signal) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const response = await fetch(`${GEMINI_BASE_URL}/v1beta/models/${modelId}:generateContent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": getApiKey()
            },
            body: JSON.stringify({
                ...requestBody,
                safetySettings: GEMINI_SAFETY_SETTINGS
            }),
            signal: signal ? AbortSignal.any([signal, controller.signal]) : controller.signal
        });
        return await readApiJson(response, {provider:'gemini', model:modelId});
    } catch (e) {
        if (signal?.aborted) throw createApiError('処理を中断しました。', {provider:'gemini', model:modelId, code:'CANCELLED'});
        if (controller.signal.aborted || e.name === 'AbortError') {
            throw createApiError(`Timeout awaiting response from ${modelId} (${timeoutMs / 1000}s limit)`, {provider:'gemini', model:modelId, code:'TIMEOUT'});
        }
        throw e;
    } finally {
        clearTimeout(timeoutId);
    }
};

const extractTextParts = (parts, includeThought = false) => parts
    .filter(part => typeof part.text === 'string' && (includeThought ? part.thought : !part.thought))
    .map(part => part.text)
    .join('');

/**
 * Diagnostic Function: Fetches the ACTUAL list of models available to this API key.
 * This effectively "solves" the guessing game.
 */
export const diagnoseConnection = async () => {
    if (!getApiKey()) return "API Key not set.";
    try {
        console.log("[Diagnostic] Fetching available models...");
        const response = await fetch(`${GEMINI_BASE_URL}/v1beta/models`, {
            headers: { "x-goog-api-key": getApiKey() }
        });
        const data = await response.json();

        if (data.error) {
            return `API Error: ${data.error.message}`;
        }

        if (!data.models) {
            return "No models returned by API.";
        }

        // Filter for relevant models to keep log clean
        const relevantModels = data.models
            .map(m => m.name.replace("models/", ""))
            .filter(name => name.includes("gemini"));

        return `Available Models: ${relevantModels.join(", ")}`;
    } catch (e) {
        return `Diagnostic Failed: ${e.message}`;
    }
};

/**
 * Robustly calls the Gemini API with Auto-Discovery on failure.
 */
export const callThinkingGemini = async (prompt, images = null, systemInstruction = null, onThinkingUpdate, options = {}) => {
    if (!getApiKey()) throw createApiError("API Key is not set.", {provider:'gemini', code:'KEY_NOT_CONFIGURED'});
    const timeoutMs = options.timeoutMs ?? GEMINI_TEXT_TIMEOUT_MS;
    const searchRequired = options.useWebSearch === true;
    if (searchRequired && images?.length) {
        throw new Error('Web Search が必要な処理では画像入力を同時に送信できません。');
    }

    // 画像の有無に応じてモデルリストを動的に選択
    const MODEL_IDS = (images && images.length > 0) ? GEMINI_VISION_MODEL_IDS : GEMINI_TEXT_MODEL_IDS;

    const failures = [];
    let attemptIndex = 0;
    for (const modelId of MODEL_IDS) {
        if (options.signal?.aborted) throw createApiError('処理を中断しました。', {provider:'gemini', model:modelId, code:'CANCELLED'});
        attemptIndex++;
        try {
            console.log(`[Gemini] Attempting connection with ${modelId} (v1beta)...`);
            if (onThinkingUpdate) {
                if (attemptIndex === 1) {
                    onThinkingUpdate(`> [API] ${modelId} と交信を開始しました...`);
                } else {
                    onThinkingUpdate(`> [API] 代替モデル ${modelId} で再解析を開始します... (${attemptIndex}/${MODEL_IDS.length})`);
                    if (images && images.length > 0) {
                        onThinkingUpdate(`> [API] ${images.length}枚の画像データを再送信中...`);
                    }
                }
                onThinkingUpdate(`> [API] このモデルの応答待ち上限: ${timeoutMs / 1000}秒`);
            }

            // [v1.6.0 Fix] "One Big Prompt" Strategy
            // Some models (like 2.5 Flash) fail with "No response candidates" when using systemInstruction on v1beta.
            // We merge the system instruction into the user prompt to guarantee it gets processed.
            let finalPromptParts = [];

            if (systemInstruction) {
                finalPromptParts.push({ text: `[SYSTEM_INSTRUCTION_START]\n${systemInstruction}\n[SYSTEM_INSTRUCTION_END]\n\n` });
            }

            if (images && Array.isArray(images)) {
                finalPromptParts.push(...images);
            }

            finalPromptParts.push({ text: prompt });

            const result = await postGeminiGenerateContent(modelId, {
                contents: [{ role: "user", parts: finalPromptParts }],
                ...(searchRequired ? { tools: [{ googleSearch: {} }] } : {}),
                generationConfig: { maxOutputTokens: 8192 }
            }, timeoutMs, options.signal);

            const response = result;
            const candidates = response.candidates || [];

            if (!candidates.length) {
                // [v1.6.1 Debug] Check for Prompt Feedback (Safety Block at Request Level)
                if (response.promptFeedback) {
                    if (response.promptFeedback.blockReason) {
                        throw createApiError(`Blocked by Safety Filter: ${response.promptFeedback.blockReason}`, {code:'content_policy_violation'});
                    }
                }
                throw createApiError('No response candidates.', {code:'EMPTY_RESPONSE'});
            }

            const candidate = candidates[0];
            const sources = geminiSources(candidate);
            if (searchRequired && sources.length === 0) {
                throw new Error('Grounding の出典を確認できませんでした。');
            }
            const responseParts = candidate.content?.parts || [];
            const finalOutput = extractTextParts(responseParts, false);
            const thought = extractTextParts(responseParts, true);

            if (!finalOutput) {
                const reason = candidate.finishReason || "UNKNOWN";
                throw createApiError(`Empty response (FinishReason: ${reason}).`, {code:/SAFETY|PROHIBITED|BLOCKLIST/.test(reason) ? 'content_policy_violation' : 'EMPTY_RESPONSE'});
            }

            if (onThinkingUpdate) onThinkingUpdate(`> [API] 生成完了：高品質な日本語成果物を構築しました。`);

            return {
                text: finalOutput,
                sources,
                thought: thought || "通常処理が完了しました。",
                model: modelId // [v1.7.0] Return the successful model ID for UI display
            };

        } catch (err) {
            const failure = createApiError(err.message, {provider:'gemini', model:modelId, status:err.status, code:err.code, name:err.name});
            failures.push(failure);
            console.warn(formatApiErrorDetails(failure));
            if (onThinkingUpdate) onThinkingUpdate(`> [API] 試行失敗: ${formatApiErrorDetails(failure)}`);
            if (shouldStopApiFallback(failure)) throw failure;
        }
    }

    // A model-list response cannot diagnose a failed generation request.
    // Preserve the actual failures instead of replacing them with that response.
    throw aggregateApiErrors('gemini', failures);
};
