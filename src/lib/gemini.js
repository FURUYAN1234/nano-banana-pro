/**
 * Gemini API Client for Nano Banana Pro (Thinking Mode Edition)
 * v1.4.32 Alpha (Auto-Discovery Mode)
 * Implements "Account Model Diagnosis" to solve the mystery of "All Models 404".
 * If connection fails, it asks the API: "What models DOES this user have access to?"
 */
import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_IDS = [
    "gemini-2.5-pro",                     // Primary: Ultra-High Intelligence
    "gemini-2.5-flash",                   // Backup 1: Ultra-Fast
    "gemini-2.5-flash-lite",              // Backup 2: Lite (Correct ID) - Fixes 404
    "gemini-flash-latest",                // Backup 3: Latest Generic Flash
    "gemini-2.0-flash-lite-preview-02-05",// Backup 4: Specific Lite
    "gemini-pro-latest"                   // Final Resort
];

// Store API key in memory
let currentApiKey = "";

export const setApiKey = (key) => {
    currentApiKey = key;
};

export const getApiKey = () => currentApiKey;

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


    for (const modelId of MODEL_IDS) {
        try {
            console.log(`[Gemini] Attempting connection with ${modelId} (v1beta)...`);
            if (onThinkingUpdate) onThinkingUpdate(`Connecting to ${modelId} (v1beta)...`);

            // [v1.6.0 Fix] "One Big Prompt" Strategy
            // Some models (like 2.5 Flash) fail with "No response candidates" when using systemInstruction on v1beta.
            // We merge the system instruction into the user prompt to guarantee it gets processed.
            let finalPromptParts = [];

            if (systemInstruction) {
                finalPromptParts.push({ text: `[SYSTEM_INSTRUCTION_START]\n${systemInstruction}\n[SYSTEM_INSTRUCTION_END]\n\n` });
            }

            finalPromptParts.push({ text: prompt });

            if (images && Array.isArray(images)) {
                finalPromptParts.push(...images);
            }

            const modelParams = { model: modelId };
            // systemInstruction removed from modelParams to avoid API fragmentation

            // [v1.4.31] Keep v1beta
            const model = genAI.getGenerativeModel(modelParams, { apiVersion: "v1beta" });

            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error(`Timeout awaiting response from ${modelId} (60s limit)`)), 60000)
            );

            const result = await Promise.race([
                model.generateContent({
                    contents: [{ role: "user", parts: finalPromptParts }],
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

            const response = result.response;
            const candidates = response.candidates || [];

            if (!candidates.length) {
                // [v1.6.1 Debug] Check for Prompt Feedback (Safety Block at Request Level)
                if (response.promptFeedback) {
                    console.warn("Prompt Feedback:", response.promptFeedback);
                    if (response.promptFeedback.blockReason) {
                        throw new Error(`Blocked by Safety Filter: ${response.promptFeedback.blockReason}`);
                    }
                }
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
                throw new Error(`Empty response (FinishReason: ${reason}). Suggested: Check Safety/Prompt.`);
            }

            return {
                text: finalOutput,
                thought: thought || "Standard processing complete (Thinking trace unavailable).",
                model: modelId // [v1.7.0] Return the successful model ID for UI display
            };

        } catch (err) {
            console.warn(`Model ${modelId} failed:`, err.message);
            if (onThinkingUpdate) onThinkingUpdate(`[FAILED] ${modelId}: ${err.message}`);
        }
    }

    // --- ALL MODELS FAILED: RUN DIAGNOSIS ---
    if (onThinkingUpdate) onThinkingUpdate("[SYSTEM] Initiating Account Diagnosis...");
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
