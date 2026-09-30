/**
 * OpenAI Chat Completions API Client for Nano Banana Pro
 * v1.2.1 - Dual Engine テキスト生成モジュール
 *
 * callThinkingGemini と同一のインターフェースを提供し、
 * ai-provider.js 経由で透過的に切り替え可能にする。
 *
 * 対応モデル: STEP2専用のGPT-6・GPT-5.6系 / GPT-4.1 / GPT-4o
 * 機能: テキスト生成、Vision（画像認識）
 */

import { getOpenAIApiKey } from './openai';
import { openAISources } from './sns-explanation.js';
import {createApiError, readApiJson, aggregateApiErrors, formatApiErrorDetails, shouldStopApiFallback, sanitizeErrorMessage} from './api-errors.js';
import {
    OPENAI_TEXT_MODEL_IDS,
    OPENAI_VISION_MODEL_IDS,
    getOpenAIScenarioCostEstimate,
    getOpenAIScenarioModelRoute,
} from './openai-model-routes.js';

const OPENAI_TEXT_TIMEOUT_MS = 600_000;
const usesReasoningModel = modelId => modelId.startsWith('gpt-6-') || modelId.startsWith('gpt-5.6-');
// 推論と本文は同じ上限を消費する。旧モデルの本文用8K枠を推論モデルへ流用しない。
// https://developers.openai.com/api/docs/guides/reasoning#allocating-space-for-reasoning
const getTextOutputTokenLimit = modelId => usesReasoningModel(modelId) ? 32768 : 8192;

const extractResponsesOutputText = (response) => (
    (response.output || [])
        .filter((item) => item.type === 'message')
        .flatMap((item) => item.content || [])
        .filter((part) => part.type === 'output_text' && typeof part.text === 'string')
        .map((part) => part.text)
        .join('')
        .trim()
);

const readCompleteOpenAIText = (data, modelId, webSearch, onThinkingUpdate) => {
    const choice = data.choices?.[0];
    const finish = webSearch ? data.status : choice?.finish_reason;
    const reason = webSearch ? data.incomplete_details?.reason : null;
    const usage = data.usage;
    const tokenCount = value => Number.isInteger(value) && value >= 0 ? value : 'unknown';
    const outputTokens = tokenCount(usage?.output_tokens ?? usage?.completion_tokens);
    const reasoningTokens = tokenCount(usage?.output_tokens_details?.reasoning_tokens ?? usage?.completion_tokens_details?.reasoning_tokens);
    const diagnostics = sanitizeErrorMessage(`finish=${finish || 'unknown'}${reason ? `; reason=${reason}` : ''}; output_tokens=${outputTokens}; reasoning_tokens=${reasoningTokens}; limit=${getTextOutputTokenLimit(modelId)}`);
    onThinkingUpdate?.(`> [RESPONSE] ${modelId}: ${diagnostics}`);

    const refusal = webSearch
        ? (data.output || []).flatMap(item => item.content || []).find(part => part.type === 'refusal')?.refusal
        : choice?.message?.refusal;
    const fail = (code, message) => { throw createApiError(`${message} (${diagnostics})`, {provider:'openai', model:modelId, code}); };
    if (refusal || finish === 'content_filter' || reason === 'content_filter') {
        fail('content_policy_violation', refusal || 'モデルが安全基準により生成を拒否しました。');
    }
    if (finish === 'length' || reason === 'max_output_tokens') {
        fail('OUTPUT_TOKEN_LIMIT', '推論・本文の生成が出力トークン上限で途中終了しました。未完成の本文は採用しません。');
    }
    if (webSearch && finish && finish !== 'completed') {
        fail('INCOMPLETE_RESPONSE', 'OpenAIの応答が完了していません。');
    }
    const content = webSearch ? data.output_text || extractResponsesOutputText(data) : choice?.message?.content;
    if (content != null && typeof content !== 'string') {
        fail('INVALID_RESPONSE', 'OpenAIの応答本文がテキストではありません。');
    }
    const text = (content || '').trim();
    if (!text) fail('EMPTY_RESPONSE', 'OpenAI returned no text output.');
    return text;
};

const requestOpenAIWebSearch = async ({ modelId, prompt, systemInstruction, timeoutMs, apiKey, signal, onThinkingUpdate }) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const input = [];
        if (systemInstruction) {
            input.push({ role: 'developer', content: systemInstruction });
        }
        input.push({ role: 'user', content: prompt });

        const response = await fetch('https://api.openai.com/v1/responses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: modelId,
                input,
                tools: [{ type: 'web_search' }],
                max_output_tokens: getTextOutputTokenLimit(modelId)
            }),
            signal: signal ? AbortSignal.any([signal, controller.signal]) : controller.signal
        });
        const data = await readApiJson(response, {provider:'openai', model:modelId});

        const text = readCompleteOpenAIText(data, modelId, true, onThinkingUpdate);
        return { text, sources: openAISources(data), usage: data.usage };
    } catch (error) {
        if (signal?.aborted) throw createApiError('処理を中断しました。', {provider:'openai', model:modelId, code:'CANCELLED'});
        if (controller.signal.aborted || error.name === 'AbortError') {
            throw createApiError(`Timeout awaiting web search from ${modelId} (${timeoutMs / 1000}s limit)`, {provider:'openai', model:modelId, code:'TIMEOUT'});
        }
        throw error;
    } finally {
        clearTimeout(timeoutId);
    }
};

export const requestOpenAIChatCompletion = async ({modelId, messages, apiKey, timeoutMs, signal}) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const usesModernChatParameters = usesReasoningModel(modelId);
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}`},
            body: JSON.stringify({
                model: modelId,
                messages,
                ...(usesModernChatParameters
                    ? {max_completion_tokens: getTextOutputTokenLimit(modelId)}
                    : {temperature: 0.7, max_tokens: getTextOutputTokenLimit(modelId)}),
            }),
            signal: signal ? AbortSignal.any([signal, controller.signal]) : controller.signal,
        });
        return {response, data: await readApiJson(response, {provider:'openai', model:modelId})};
    } catch (error) {
        if (signal?.aborted) throw createApiError('処理を中断しました。', {provider:'openai', model:modelId, code:'CANCELLED'});
        if (controller.signal.aborted || error?.name === 'AbortError') {
            throw createApiError(`Timeout awaiting response from ${modelId} (${timeoutMs / 1000}s limit)`, {provider:'openai', model:modelId, code:'TIMEOUT'});
        }
        throw error;
    } finally {
        clearTimeout(timeoutId);
    }
};

/**
 * OpenAI Chat Completions APIを呼び出す
 * callThinkingGemini と同一のシグネチャ:
 *   (prompt, images, systemInstruction, onThinkingUpdate) => { text, thought, model }
 */
export const callOpenAIText = async (prompt, images = null, systemInstruction = null, onThinkingUpdate, options = {}) => {
    const apiKey = getOpenAIApiKey();
    if (!apiKey) throw createApiError("OpenAI APIキーが設定されていません。", {provider:'openai', code:'KEY_NOT_CONFIGURED'});
    const timeoutMs = options.timeoutMs ?? OPENAI_TEXT_TIMEOUT_MS;

    // Vision、STEP2専用のシナリオ、その他テキストを明確に分離する。
    const MODEL_IDS = (images && images.length > 0)
        ? OPENAI_VISION_MODEL_IDS
        : options.modelRoute === 'scenario'
            ? getOpenAIScenarioModelRoute(options.scenarioModelId)
            : OPENAI_TEXT_MODEL_IDS;
    const useWebSearch = options.useWebSearch === true && (!images || images.length === 0);
    const isFixedScenarioRoute = options.modelRoute === 'scenario'
        && MODEL_IDS[0] === options.scenarioModelId;
    const reportScenarioUsage = (modelId, usage) => {
        if (options.modelRoute !== 'scenario') return null;
        const costEstimate = getOpenAIScenarioCostEstimate(modelId, usage);
        if (costEstimate && onThinkingUpdate) {
            onThinkingUpdate(`> [COST] 実績: 入力 ${costEstimate.inputTokens.toLocaleString()} / 出力 ${costEstimate.outputTokens.toLocaleString()} tokens、参考 ${costEstimate.estimatedUsd.toFixed(6)} USD`);
        }
        return costEstimate;
    };

    if (isFixedScenarioRoute && onThinkingUpdate) {
        onThinkingUpdate(`> [MODEL] 固定開始モデル: ${MODEL_IDS[0]}（失敗時は下位モデルへフォールバック）`);
    }

    const failures = [];
    let attemptIndex = 0;
    for (const modelId of MODEL_IDS) {
        if (options.signal?.aborted) throw createApiError('処理を中断しました。', {provider:'openai', model:modelId, code:'CANCELLED'});
        attemptIndex++;
        try {
            const usesModernChatParameters = usesReasoningModel(modelId);
            console.log(`[OpenAI] Attempting connection with ${modelId}...`);
            if (onThinkingUpdate) {
                if (attemptIndex === 1) {
                    onThinkingUpdate(`> [API] OpenAI ${modelId}${useWebSearch ? ' Web Search' : ''} と交信を開始しました...`);
                } else {
                    onThinkingUpdate(`> [API] 代替モデル ${modelId} で再解析を開始します... (${attemptIndex}/${MODEL_IDS.length})`);
                }
                onThinkingUpdate(`> [API] このモデルの応答待ち上限: ${timeoutMs / 1000}秒`);
                onThinkingUpdate(`> [API] 出力上限: ${getTextOutputTokenLimit(modelId).toLocaleString()} tokens${usesModernChatParameters ? '（推論と本文の合計）' : ''}`);
            }

            if (useWebSearch) {
                const finalOutput = await requestOpenAIWebSearch({
                    modelId,
                    prompt,
                    systemInstruction,
                    timeoutMs,
                    apiKey,
                    signal: options.signal,
                    onThinkingUpdate
                });
                if (onThinkingUpdate) onThinkingUpdate('> [API] OpenAI Web Searchでニュースを確認し、シナリオを生成しました。');
                if (onThinkingUpdate) onThinkingUpdate(`> [MODEL] 最終採用モデル: ${modelId}`);
                const costEstimate = reportScenarioUsage(modelId, finalOutput.usage);
                return {
                    text: finalOutput.text,
                    sources: finalOutput.sources,
                    thought: `OpenAI ${modelId} Web Search による処理が完了しました。`,
                    model: modelId,
                    usage: finalOutput.usage,
                    costEstimate
                };
            }

            // メッセージ構築
            const messages = [];

            // システムインストラクション
            if (systemInstruction) {
                messages.push({
                    role: usesModernChatParameters ? "developer" : "system",
                    content: systemInstruction + "\n\n【システムレベルの絶対遵守フォーマット（System Formatting Constraints）】\n全ての「セリフ」の末尾には、必ず終止記号（。、！、？、！？、♪、♡など）をつけてください。「…」や「～」のみで終わるセリフはシステムエラーを引き起こすため、いかなる場合も絶対に禁止します（正しい例: 「……。」「～！」）。"
                });
            }

            // ユーザーメッセージ（テキスト + 画像）
            const userContent = [];

            // 画像パーツの変換: Gemini形式 → OpenAI形式
            if (images && Array.isArray(images) && images.length > 0) {
                for (const img of images) {
                    if (img.inlineData) {
                        // Gemini形式: { inlineData: { data: base64, mimeType: "image/jpeg" } }
                        userContent.push({
                            type: "image_url",
                            image_url: {
                                url: `data:${img.inlineData.mimeType};base64,${img.inlineData.data}`,
                                detail: "high"
                            }
                        });
                    } else if (typeof img === 'string' && img.startsWith('data:image/')) {
                        // 直接Base64文字列が渡された場合
                        userContent.push({
                            type: "image_url",
                            image_url: {
                                url: img,
                                detail: "high"
                            }
                        });
                    }
                }
                if (userContent.length > 0 && onThinkingUpdate) {
                    onThinkingUpdate(`> [API] 画像データを OpenAI Vision 形式に変換して送信中...`);
                }
            }

            // テキストプロンプト
            userContent.push({
                type: "text",
                text: prompt
            });

            messages.push({
                role: "user",
                content: userContent.length === 1 ? prompt : userContent
            });

            const {data} = await requestOpenAIChatCompletion({modelId, messages, apiKey, timeoutMs, signal:options.signal});

            const choice = data.choices?.[0];

            const finalOutput = readCompleteOpenAIText(data, modelId, false, onThinkingUpdate);

            if (onThinkingUpdate) onThinkingUpdate(`> [API] 応答の受信が完了しました。`);
            if (onThinkingUpdate) onThinkingUpdate(`> [MODEL] 最終採用モデル: ${modelId}`);
            const costEstimate = reportScenarioUsage(modelId, data.usage);

            return {
                text: finalOutput,
                thought: `OpenAI ${modelId} による処理が完了しました。`,
                model: modelId,
                usage: data.usage,
                finishReason: choice.finish_reason,
                costEstimate
            };

        } catch (err) {
            const failure = createApiError(err.message, {provider:'openai', model:modelId, status:err.status, code:err.code, name:err.name});
            failures.push(failure);
            console.warn(formatApiErrorDetails(failure));
            if (onThinkingUpdate) onThinkingUpdate(`> [API] 試行失敗: ${formatApiErrorDetails(failure)}`);
            if (shouldStopApiFallback(failure)) throw failure;
        }
    }

    // 全モデル失敗
    if (onThinkingUpdate) onThinkingUpdate("> [API] 全モデルとの通信に失敗しました。");
    throw aggregateApiErrors('openai', failures);
};
