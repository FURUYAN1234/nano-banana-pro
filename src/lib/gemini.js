/**
 * Gemini API Client for Nano Banana Pro (Thinking Mode Edition)
 * v1.4.32 Alpha (Auto-Discovery Mode)
 * Implements "Account Model Diagnosis" to solve the mystery of "All Models 404".
 * If connection fails, it asks the API: "What models DOES this user have access to?"
 */
import { GoogleGenerativeAI } from "@google/generative-ai";

// テキストのみリクエスト用 (シナリオ生成等): Next-Gen優先・無料枠優先
// ※ 2026年4月以降、Pro系は有料APIキー専用。Flash系は無料枠で利用可能。
const TEXT_MODEL_IDS = [
    "gemini-3-flash-preview",             // Primary: Next-Gen Flash (無料枠OK・Grounding対応)
    "gemini-3.1-flash-lite-preview",      // Backup 1: Next-Gen Lite (無料枠OK・最速)
    "gemini-2.5-flash",                   // Backup 2: 安定実績 (無料枠OK)
    "gemini-2.5-pro",                     // Fallback 1: 高品質 (有料APIキー専用 2026/04〜)
    "gemini-2.5-flash-lite"               // Fallback 2: 軽量レガシー (無料枠OK)
];

// 画像付きリクエスト用 (キャラクターシート認識等): フィルター寛容モデル優先
// gemini-3-flash-preview はアニメ画像で PROHIBITED_CONTENT を返すため後方に配置
// ※ gemini-2.5-pro は画像認識性能最高だが有料APIキー専用 (2026/04〜)
const IMAGE_MODEL_IDS = [
    "gemini-2.5-flash",                   // Primary: 画像認識実績・高速 (無料枠OK)
    "gemini-2.5-pro",                     // Backup 1: 最高品質 (有料APIキー専用)
    "gemini-3.1-flash-lite-preview",      // Backup 2: Next-Gen Lite (無料枠OK)
    "gemini-3-flash-preview",             // Fallback 1: Next-Gen (アニメ画像でフィルターリスクあり)
    "gemini-2.5-flash-lite"               // Fallback 2: 軽量レガシー
];

// Store API key in memory ONLY (Security Requirement: No persistence)
let currentApiKey = "";

export const setApiKey = (key) => {
    currentApiKey = key;
    // localStorage.setItem("gemini_api_key", key); // DISABLED by User Request
};

export const getApiKey = () => {
    return currentApiKey; // || localStorage.getItem("gemini_api_key"); // DISABLED by User Request
};

/**
 * Diagnostic Function: Fetches the ACTUAL list of models available to this API key.
 * This effectively "solves" the guessing game.
 */
export const diagnoseConnection = async () => {
    if (!currentApiKey) return "API Key not set.";
    try {
        console.log("[Diagnostic] Fetching available models...");
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${currentApiKey}`);
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
export const callThinkingGemini = async (prompt, images = null, systemInstruction = null, onThinkingUpdate) => {
    if (!currentApiKey) throw new Error("API Key is initialized.");

    const genAI = new GoogleGenerativeAI(currentApiKey);

    // 画像の有無に応じてモデルリストを動的に選択
    const MODEL_IDS = (images && images.length > 0) ? IMAGE_MODEL_IDS : TEXT_MODEL_IDS;

    let attemptIndex = 0;
    for (const modelId of MODEL_IDS) {
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

            const modelParams = { model: modelId };
            // systemInstruction removed from modelParams to avoid API fragmentation

            // [v1.4.31] Keep v1beta
            const model = genAI.getGenerativeModel(modelParams, { apiVersion: "v1beta" });

            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error(`Timeout awaiting response from ${modelId} (60s limit)`)), 60000)
            );

            // [Fix] Enforce search tools ONLY if NO images are present. Grounding + Multimodal often throws 400 errors.
            const finalTools = (images && images.length > 0) ? [] : [{ googleSearch: {} }];

            let result;
            try {
                result = await Promise.race([
                    model.generateContent({
                        contents: [{ role: "user", parts: finalPromptParts }],
                        tools: finalTools,
                        generationConfig: { temperature: 0.7, maxOutputTokens: 8192 },
                        safetySettings: [
                            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
                            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
                            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
                            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
                        ]
                    }),
                    timeoutPromise
                ]);
            } catch (err) {
                // [v2.20] Failover: If Grounding fails for ANY reason, retry WITHOUT tools
                // ローカル環境ではCORS/リファラ制限等でgrounding固有のエラーが発生するため、
                // エラー内容に関わらずツールなしで再試行する
                if (finalTools.length > 0) {
                    console.warn(`[API] Grounding failed for ${modelId} (${err.message}), retrying without tools...`);
                    if (onThinkingUpdate) onThinkingUpdate(`> [API] Grounding失敗。ツールなしで同一モデルを再試行します...`);
                    result = await model.generateContent({
                        contents: [{ role: "user", parts: finalPromptParts }],
                        generationConfig: { temperature: 0.7, maxOutputTokens: 8192 },
                        safetySettings: [
                            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
                            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
                            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
                            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
                        ]
                    });
                } else {
                    throw err;
                }
            }

            const response = result.response;
            const candidates = response.candidates || [];

            if (!candidates.length) {
                // [v1.6.1 Debug] Check for Prompt Feedback (Safety Block at Request Level)
                if (response.promptFeedback) {
                    console.warn("Prompt Feedback:", response.promptFeedback);
                    if (response.promptFeedback.blockReason) {
                        if (onThinkingUpdate) onThinkingUpdate(`> [API] フィルター検知。基準を調整し、別モデルで生成を続行します。`);
                        throw new Error(`Blocked by Safety Filter: ${response.promptFeedback.blockReason}`);
                    }
                }
                if (onThinkingUpdate) onThinkingUpdate(`> [API] モデル応答なし。最新モデルへバイパスします。`);
                throw new Error("No response candidates (Unknown Model Refusal)");
            }

            const candidate = candidates[0];
            let finalOutput = "";
            try { finalOutput = response.text(); } catch (e) { console.warn(e); }

            const responseParts = candidate.content?.parts || [];
            let thought = "";
            responseParts.forEach(part => {
                if (part.thought) thought += part.thought;
            });

            if (!finalOutput) {
                // [v1.7.1 Fix] If text is empty, it means the model refused or filtered the content.
                // We MUST throw an error here to trigger the fallback loop (try next model).
                const reason = candidate.finishReason || "UNKNOWN";
                console.warn(`[Gemini] Empty Response. FinishReason: ${reason}`);
                if (onThinkingUpdate) onThinkingUpdate(`> [API] フィルター検知。基準を調整し、別モデルで生成を続行します。(${reason})`);
                throw new Error(`Empty response (FinishReason: ${reason}). Suggested: Check Safety/Prompt.`);
            }

            if (onThinkingUpdate) onThinkingUpdate(`> [API] 生成完了：高品質な日本語成果物を構築しました。`);

            return {
                text: finalOutput,
                thought: thought || "Standard processing complete (Thinking trace unavailable).",
                model: modelId // [v1.7.0] Return the successful model ID for UI display
            };

        } catch (err) {
            console.warn(`Model ${modelId} failed:`, err.message);
            if (err.message.includes("429") || err.message.includes("Quota")) {
                if (onThinkingUpdate) onThinkingUpdate(`> [API] 回数制限。自動待機し、リトライします。`);
            } else if (!err.message.includes("フィルター検知") && !err.message.includes("モデル応答なし")) {
                // 既に細かく指定したエラー以外の汎用エラー（バイパス用）
                if (onThinkingUpdate) onThinkingUpdate(`> [API] モデル応答なし。最新モデルへバイパスします。(${err.message})`);
            }
        }
    }

    // --- ALL MODELS FAILED: RUN DIAGNOSIS ---
    if (onThinkingUpdate) onThinkingUpdate("> [API] 全モデルとの通信に失敗。アカウント状態を診断します...");
    const diagnosis = await diagnoseConnection();
    console.error("DIAGNOSIS RESULT:", diagnosis);

    // [v1.7.6 Fix] Construct a user-friendly error message based on the diagnosis
    let errorMsg = `全モデル接続失敗: ${diagnosis}`;
    if (diagnosis.includes("Quota exceeded") || diagnosis.includes("429")) {
        errorMsg = "【API制限】割り当てられた使用回数の上限に達しました。(429 Quota Exceeded)\nしばらく時間を置いてから再試行するか、課金プランを確認してください。";
    } else if (diagnosis.includes("SAFETY") || diagnosis.includes("PROHIBITED")) {
        errorMsg = "【コンテンツ制限】安全フィルターによりブロックされました。言い回しを変更してください。";
    } else if (diagnosis.includes("404")) {
        errorMsg = "【モデル未検出】使用可能なモデルが見つかりませんでした。診断ログを確認してください。";
    }

    throw new Error(errorMsg);
};
