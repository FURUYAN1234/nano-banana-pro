import { GoogleGenerativeAI } from "@google/generative-ai";
import { getApiKey } from "./gemini";

// 画像生成モデル優先順位 (Geminiネイティブ優先)
// ※ Imagen全系列は2026/06/24に完全廃止予定。Geminiネイティブへの移行が必須。
const MODELS_TO_TRY = [
    "gemini-3.1-flash-image-preview", // Primary: Nano Banana 2 NEXT GEN (最高品質)
    "gemini-2.5-flash-image",         // Backup: Google公式推奨移行先 (安定・高速)
    "imagen-4.0-generate-001",        // Legacy 1: 有料APIキー専用 (廃止予定 2026/06/24)
    "imagen-4.0-fast-generate-001"    // Legacy 2: 有料・高速版 (廃止予定 2026/06/24)
];

/**
 * Generates an image using Gemini multimodality or Imagen 3 via Google AI SDK (if available/enabled for the key).
 * Returns the base64 image data.
 * @param {string} prompt プロンプト
 * @param {function} onStatusUpdate UI更新用コールバック(文言)
 * @param {Array<string>} referenceImages [v3.53 Phase3] 参照画像のbase64配列（data:プレフィックス付きまたはrawBase64）。Geminiモデル使用時にマルチモーダル入力として添付。
 */
export const generateImageWithImagen = async (prompt, onStatusUpdate, referenceImages = []) => {
    const currentApiKey = getApiKey();
    if (!currentApiKey) throw new Error("API Key is not set.");

    let lastError = null;
    let attemptedModels = [];

    for (const modelId of MODELS_TO_TRY) {
        try {
            console.log(`[ImageGen] Attempting generation with model: ${modelId}`);
            attemptedModels.push(modelId);

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 120000); // 120s max timeout for heavy processing (Gemini models might take longer)

            let response;
            let data;

            // Use the correct API endpoint and payload structure for Gemini vs Imagen models
            if (modelId.startsWith("gemini")) {
                // gemini-2.5-flash-image は responseModalities に ["TEXT", "IMAGE"] が必要
                const modalities = modelId.includes("2.5-flash-image")
                    ? ["TEXT", "IMAGE"]
                    : ["IMAGE"];

                // [v3.53 Phase3] 参照画像パーツを構築（360°クロップ画像等）
                const imageParts = referenceImages.map(img => {
                    // data:image/png;base64,XXXX 形式から rawBase64 を抽出
                    const rawBase64 = img.includes(',') ? img.split(',')[1] : img;
                    const mimeMatch = img.match(/^data:(image\/[a-zA-Z+]+);base64,/);
                    const mimeType = mimeMatch ? mimeMatch[1] : 'image/png';
                    return { inlineData: { mimeType, data: rawBase64 } };
                });
                if (imageParts.length > 0 && onStatusUpdate) {
                    onStatusUpdate(`[REF] ${imageParts.length}枚の参照画像を添付してマルチモーダル生成を実行`);
                }

                response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${currentApiKey}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        contents: [{
                            role: "user",
                            parts: [{ text: prompt }, ...imageParts]
                        }],
                        generationConfig: {
                            responseModalities: modalities
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
                        return { base64Img: imagePart.inlineData.data, usedModel: modelId };
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
                errorMsg = "API Time out (120秒経過による強制切断)";
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
