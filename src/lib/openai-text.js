/**
 * OpenAI Chat Completions API Client for Nano Banana Pro
 * v1.2.1 - Dual Engine テキスト生成モジュール
 *
 * callThinkingGemini と同一のインターフェースを提供し、
 * ai-provider.js 経由で透過的に切り替え可能にする。
 *
 * 対応モデル: GPT-6 Astra（STEP2のみ）/ GPT-5.6 Sol（STEP2フォールバック）/ GPT-4.1 / GPT-4o
 * 機能: テキスト生成、Vision（画像認識）
 */

import { getOpenAIApiKey } from './openai';
import {
    OPENAI_TEXT_MODEL_IDS,
    OPENAI_SCENARIO_TEXT_MODEL_IDS,
    OPENAI_VISION_MODEL_IDS,
} from './openai-model-routes.js';

const OPENAI_TEXT_TIMEOUT_MS = 120000;

const extractResponsesOutputText = (response) => (
    (response.output || [])
        .filter((item) => item.type === 'message')
        .flatMap((item) => item.content || [])
        .filter((part) => part.type === 'output_text' && typeof part.text === 'string')
        .map((part) => part.text)
        .join('')
        .trim()
);

const requestOpenAIWebSearch = async ({ modelId, prompt, systemInstruction, timeoutMs, apiKey }) => {
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
                max_output_tokens: 8192
            }),
            signal: controller.signal
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
            throw new Error(data.error?.message || response.statusText || `HTTP ${response.status}`);
        }

        const text = data.output_text || extractResponsesOutputText(data);
        if (!text) {
            throw new Error('OpenAI Web Search returned no text output.');
        }
        return text;
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error(`Timeout awaiting web search from ${modelId} (${timeoutMs / 1000}s limit)`);
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
    if (!apiKey) throw new Error("OpenAI APIキーが設定されていません。");
    const timeoutMs = options.timeoutMs ?? OPENAI_TEXT_TIMEOUT_MS;

    // Vision、STEP2専用のシナリオ、その他テキストを明確に分離する。
    const MODEL_IDS = (images && images.length > 0)
        ? OPENAI_VISION_MODEL_IDS
        : options.modelRoute === 'scenario'
            ? OPENAI_SCENARIO_TEXT_MODEL_IDS
            : OPENAI_TEXT_MODEL_IDS;
    const useWebSearch = options.useWebSearch === true && (!images || images.length === 0);

    let attemptIndex = 0;
    for (const modelId of MODEL_IDS) {
        attemptIndex++;
        try {
            const usesModernChatParameters = modelId === "gpt-6-astra" || modelId === "gpt-5.6-sol";
            console.log(`[OpenAI] Attempting connection with ${modelId}...`);
            if (onThinkingUpdate) {
                if (attemptIndex === 1) {
                    onThinkingUpdate(`> [API] OpenAI ${modelId}${useWebSearch ? ' Web Search' : ''} と交信を開始しました...`);
                } else {
                    onThinkingUpdate(`> [API] 代替モデル ${modelId} で再解析を開始します... (${attemptIndex}/${MODEL_IDS.length})`);
                }
            }

            if (useWebSearch) {
                const finalOutput = await requestOpenAIWebSearch({
                    modelId,
                    prompt,
                    systemInstruction,
                    timeoutMs,
                    apiKey
                });
                if (onThinkingUpdate) onThinkingUpdate('> [API] OpenAI Web Searchでニュースを確認し、シナリオを生成しました。');
                return {
                    text: finalOutput,
                    thought: `OpenAI ${modelId} Web Search による処理が完了しました。`,
                    model: modelId
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

            // 呼び出し元ごとのテキストAPI待機上限
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
            let response;
            try {
                response = await fetch("https://api.openai.com/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        model: modelId,
                        messages: messages,
                        ...(usesModernChatParameters
                            ? { max_completion_tokens: 8192 }
                            : { temperature: 0.7, max_tokens: 8192 }),
                    }),
                    signal: controller.signal
                });
            } catch (e) {
                if (e.name === 'AbortError') {
                    throw new Error(`Timeout awaiting response from ${modelId} (${timeoutMs / 1000}s limit)`);
                }
                throw e;
            } finally {
                clearTimeout(timeoutId);
            }

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const errorMsg = errorData.error?.message || response.statusText;
                console.warn(`[OpenAI] ${modelId} failed: ${response.status} ${errorMsg}`);

                // レート制限 or モデル未対応の場合は次のモデルへ
                if (response.status === 429) {
                    if (onThinkingUpdate) onThinkingUpdate(`> [API] レート制限(429)。次のモデルを試行します...`);
                    continue;
                }
                if (response.status === 404) {
                    if (onThinkingUpdate) onThinkingUpdate(`> [API] モデル未対応(404)。次のモデルを試行します...`);
                    continue;
                }
                // 400系/500系エラーも次のモデルへフォールバック
                if (onThinkingUpdate) onThinkingUpdate(`> [API] エラー(${response.status})。次のモデルを試行します...`);
                continue;
            }

            const data = await response.json();
            const choice = data.choices?.[0];

            if (!choice || !choice.message?.content) {
                console.warn(`[OpenAI] Empty response from ${modelId}`);
                if (onThinkingUpdate) onThinkingUpdate(`> [API] モデル応答なし。次のモデルへフォールバックします。`);
                continue;
            }

            const finalOutput = choice.message.content;

            // [Safety Refusal Check]
            if (finalOutput.includes("I'm sorry") || finalOutput.includes("cannot assist") || finalOutput.includes("can't assist")) {
                console.warn(`[OpenAI] ${modelId} returned safety refusal: "${finalOutput.trim()}"`);
                if (onThinkingUpdate) onThinkingUpdate(`> [API] セーフティ拒否反応を検出。次のモデルへフォールバックします...`);
                continue;
            }

            if (onThinkingUpdate) onThinkingUpdate(`> [API] 生成完了：高品質な成果物を構築しました。`);

            return {
                text: finalOutput,
                thought: `OpenAI ${modelId} による処理が完了しました。`,
                model: modelId
            };

        } catch (err) {
            console.warn(`Model ${modelId} failed:`, err.message);
            if (err.message.includes("429") || err.message.includes("Quota")) {
                if (onThinkingUpdate) onThinkingUpdate(`> [API] 回数制限。次のモデルを試行します。`);
            } else if (err.message.includes("Timeout")) {
                if (onThinkingUpdate) onThinkingUpdate(`> [API] タイムアウト。次のモデルを試行します。`);
            } else {
                if (onThinkingUpdate) onThinkingUpdate(`> [API] エラー発生。次のモデルへバイパスします。(${err.message})`);
            }
        }
    }

    // 全モデル失敗
    if (onThinkingUpdate) onThinkingUpdate("> [API] 全モデルとの通信に失敗しました。");
    throw new Error(useWebSearch
        ? "OpenAI Web Search: 全モデル接続失敗。APIキーの有効性・残高・Web Search利用可否を確認してください。"
        : "OpenAI: 全モデル接続失敗。APIキーの有効性・残高・レート制限を確認してください。");
};
