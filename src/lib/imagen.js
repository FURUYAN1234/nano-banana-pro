import { GoogleGenerativeAI } from "@google/generative-ai";
import { getApiKey } from "./gemini";

// Adding legacy models and fast models for maximum coverage
const MODELS_TO_TRY = [
    "gemini-3.1-flash-image-preview", // Nano Banana 2 NEXT GEN (Native Visual/Text Rendering)
    "imagen-4.0-generate-001",      // Nano Banana 2 Primary
    "imagen-4.0-fast-generate-001", // Nano Banana 2 Fast
    "imagen-3.0-generate-001",      // Fallback
    "imagen-3.0-fast-generate-001", // Fallback
    "image-generation-001"          // Legacy Imagen 2 fallback
];

/**
 * Generates an image using Gemini multimodality or Imagen 3 via Google AI SDK (if available/enabled for the key).
 * Returns the base64 image data.
 * @param {string} prompt プロンプト
 * @param {function} onStatusUpdate UI更新用コールバック(文言)
 */
export const generateImageWithImagen = async (prompt, onStatusUpdate) => {
    const currentApiKey = getApiKey();
    if (!currentApiKey) throw new Error("API Key is not set.");

    let lastError = null;
    let attemptedModels = [];

    for (const modelId of MODELS_TO_TRY) {
        try {
            console.log(`[ImageGen] Attempting generation with model: ${modelId}`);
            attemptedModels.push(modelId);

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s hard timeout (Gemini models might take longer)

            let response;
            let data;

            // Use the correct API endpoint and payload structure for Gemini vs Imagen models
            if (modelId.startsWith("gemini")) {
                response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${currentApiKey}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        contents: [{
                            role: "user",
                            parts: [{ text: prompt }]
                        }],
                        generationConfig: {
                            responseModalities: ["IMAGE"]
                        }
                    }),
                    signal: controller.signal
                });
                clearTimeout(timeoutId);
                data = await response.json();

                if (data.error) {
                    throw new Error(`${data.error.message} (Code: ${data.error.code})`);
                }

                if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts) {
                    // Find the image part in the response
                    const imagePart = data.candidates[0].content.parts.find(p => p.inlineData);
                    if (imagePart && imagePart.inlineData && imagePart.inlineData.data) {
                        return { base64: imagePart.inlineData.data, model: modelId };
                    }
                }
                throw new Error(`Unexpected formats from Gemini model ${modelId}: missing inlineData`);

            } else {
                // Classic Imagen Model Logic
                response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelId}:predict?key=${currentApiKey}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        instances: [
                            { prompt: prompt }
                        ],
                        parameters: {
                            sampleCount: 1,
                            aspectRatio: "3:4", // Standard vertical manga aspect ratio
                            personGeneration: "allow_adult" // Sometimes needed for older models, harmless if ignored
                        }
                    }),
                    signal: controller.signal
                });
                clearTimeout(timeoutId);
                data = await response.json();

                if (data.error) {
                    // If 404 or other error, throw to catch block but keep custom message
                    throw new Error(`${data.error.message} (Code: ${data.error.code})`);
                }

                // Success check
                if (data.predictions && data.predictions[0] && data.predictions[0].bytesBase64Encoded) {
                    return { base64Img: data.predictions[0].bytesBase64Encoded, usedModel: modelId };
                }
                // Fallback for older/different formats
                if (data.predictions && data.predictions[0] && typeof data.predictions[0] === 'string') {
                    // specific case where prediction IS the base64 string
                    return { base64Img: data.predictions[0], usedModel: modelId };
                }

                throw new Error(`Unexpected response format from Imagen model ${modelId}`);
            }

        } catch (e) {
            let errorMsg = e.message;
            if (e.name === 'AbortError' || errorMsg.includes('aborted')) {
                errorMsg = "API Time out (30秒経過による強制切断)";
            }
            console.warn(`[ImageGen] Model ${modelId} failed:`, errorMsg);
            lastError = new Error(errorMsg);
            if (onStatusUpdate) onStatusUpdate(`[FAILED] ${modelId}: ${errorMsg}`);
        }
    }

    if (onStatusUpdate) onStatusUpdate("[SYSTEM] 画像生成エラー。アカウント状態を診断中...");

    // Auto-Discovery Diagnostics integration
    try {
        const { diagnoseConnection } = await import("./gemini");
        const diagnosis = await diagnoseConnection();
        console.error("IMAGE GEN DIAGNOSIS RESULT:", diagnosis);

        let errorMsg = `画像生成API(全モデル)エラー。\n${diagnosis}`;
        if (diagnosis.includes("Quota exceeded") || diagnosis.includes("429")) {
            errorMsg = "【API制限】割り当てられた使用回数の上限に達したため画像生成できません。";
        } else if (diagnosis.includes("SAFETY") || diagnosis.includes("PROHIBITED")) {
            errorMsg = "【コンテンツ制限】安全フィルターにより画像生成がブロックされました。";
        } else if (diagnosis.includes("404")) {
            errorMsg = "【モデル未検出】画像生成可能なモデルが利用できません。";
        }
        throw new Error(errorMsg);
    } catch (diagErr) {
        if (diagErr.message.includes("API制限") || diagErr.message.includes("コンテンツ制限") || diagErr.message.includes("モデル未検出")) {
            throw diagErr; // throw custom diag error
        }
        throw lastError || new Error(`All image generation models failed (${attemptedModels.join(", ")}).`);
    }
};
