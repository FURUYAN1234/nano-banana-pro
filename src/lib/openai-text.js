/**
 * OpenAI Chat Completions API Client for Nano Banana Pro
 * v1.2.1 - Dual Engine テキスト生成モジュール
 *
 * callThinkingGemini と同一のインターフェースを提供し、
 * ai-provider.js 経由で透過的に切り替え可能にする。
 *
 * 対応モデル: GPT-4.1 / GPT-4o
 * 機能: テキスト生成、Vision（画像認識）
 */

import { getOpenAIApiKey } from './openai';

// テキストのみリクエスト用モデルリスト（Zenith Protocol相当のフォールバック）
const TEXT_MODEL_IDS = [
    "gpt-4.1",          // Primary: 高品質・1Mコンテキスト
    "gpt-4.1-mini",     // Backup 1: コスト効率・高速
    "gpt-4.1-nano",     // Backup 2: 最軽量・最速
    "gpt-4o",           // Fallback: 安定実績
];

// 画像付きリクエスト用モデルリスト（Vision対応モデル優先）
const IMAGE_MODEL_IDS = [
    "gpt-4.1",          // Primary: Vision対応・高品質
    "gpt-4o",           // Backup 1: Vision安定実績
    "gpt-4.1-mini",     // Backup 2: コスト効率
];

/**
 * OpenAI Chat Completions APIを呼び出す
 * callThinkingGemini と同一のシグネチャ:
 *   (prompt, images, systemInstruction, onThinkingUpdate) => { text, thought, model }
 */
export const callOpenAIText = async (prompt, images = null, systemInstruction = null, onThinkingUpdate) => {
    const apiKey = getOpenAIApiKey();
    if (!apiKey) throw new Error("OpenAI APIキーが設定されていません。");

    // 画像の有無に応じてモデルリストを動的に選択
    const MODEL_IDS = (images && images.length > 0) ? IMAGE_MODEL_IDS : TEXT_MODEL_IDS;

    let attemptIndex = 0;
    for (const modelId of MODEL_IDS) {
        attemptIndex++;
        try {
            console.log(`[OpenAI] Attempting connection with ${modelId}...`);
            if (onThinkingUpdate) {
                if (attemptIndex === 1) {
                    onThinkingUpdate(`> [API] OpenAI ${modelId} と交信を開始しました...`);
                } else {
                    onThinkingUpdate(`> [API] 代替モデル ${modelId} で再解析を開始します... (${attemptIndex}/${MODEL_IDS.length})`);
                }
            }

            // メッセージ構築
            const messages = [];

            // システムインストラクション
            if (systemInstruction) {
                messages.push({
                    role: "system",
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

            // タイムアウト設定（60秒）
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 60000);

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
                        temperature: 0.7,
                        max_tokens: 8192,
                    }),
                    signal: controller.signal
                });
            } catch (e) {
                if (e.name === 'AbortError') {
                    throw new Error(`Timeout awaiting response from ${modelId} (60s limit)`);
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
    throw new Error("OpenAI: 全モデル接続失敗。APIキーの有効性・残高・レート制限を確認してください。");
};
