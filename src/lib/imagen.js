import { getApiKey } from "./gemini";

const isLocalGeminiHost = typeof window !== 'undefined'
    && ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname);
const GEMINI_BASE_URL = isLocalGeminiHost
    ? '/gemini-api'
    : 'https://generativelanguage.googleapis.com';

// 画像生成モデル優先順位 (Geminiネイティブ優先)
// ※ Imagen全系列は完全廃止予定のため、Geminiネイティブのみを指定。
// ※ 4コマ漫画生成は Nano Banana 2 API に固定する。
//    Nano Banana Pro は高品質単枚絵寄りで、漫画レイアウトの再現性が落ちるため使わない。
const MODELS_TO_TRY = [
    "gemini-3.1-flash-image"    // Nano Banana 2: 4コマ漫画生成用
];

const buildGeminiImageGenerationConfig = () => {
    return {
        responseModalities: ["TEXT", "IMAGE"]
    };
};

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
        let timeoutId = null;
        try {
            console.log(`[ImageGen] Attempting generation with model: ${modelId}`);
            attemptedModels.push(modelId);

            const controller = new AbortController();
            timeoutId = setTimeout(() => controller.abort(), 180000); // 180s max timeout for heavy processing (Gemini models might take longer)

            let response;
            let data;

            // Use the correct API endpoint and payload structure for Gemini vs Imagen models
            if (modelId.startsWith("gemini")) {
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

                response = await fetch(`${GEMINI_BASE_URL}/v1beta/models/${modelId}:generateContent`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-goog-api-key": currentApiKey
                    },
                    body: JSON.stringify({
                        contents: [{
                            role: "user",
                            parts: [{ text: prompt }, ...imageParts]
                        }],
                        generationConfig: buildGeminiImageGenerationConfig(modelId)
                    }),
                    signal: controller.signal
                });
                data = await response.json();

                if (data.error) {
                    throw new Error(`${data.error.message} (Code: ${data.error.code})`);
                }

                if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts) {
                    const parts = data.candidates.flatMap(candidate => candidate.content?.parts || []);
                    const responseImageParts = parts
                        .filter(part => part.inlineData && part.inlineData.data)
                        .sort((a, b) => (b.inlineData.data?.length || 0) - (a.inlineData.data?.length || 0));
                    if (responseImageParts.length > 0) {
                        if (onStatusUpdate) {
                            const sizes = responseImageParts
                                .map(part => `${part.inlineData.mimeType || 'image'}:${part.inlineData.data.length}`)
                                .join(', ');
                            onStatusUpdate(`[INFO] Gemini returned ${responseImageParts.length} image part(s). Selected largest: ${sizes}`);
                        }
                        const imagePart = responseImageParts[0];
                        return {
                            base64Img: imagePart.inlineData.data,
                            mimeType: imagePart.inlineData.mimeType || 'image/png',
                            usedModel: modelId
                        };
                    }
                    const textResponse = parts
                        .map(part => part.text)
                        .filter(Boolean)
                        .join(' ')
                        .slice(0, 500);
                    if (textResponse) {
                        throw new Error(`Unexpected formats from Gemini model ${modelId}: missing inlineData. Text response: ${textResponse}`);
                    }
                }
                throw new Error(`Unexpected formats from Gemini model ${modelId}: missing inlineData`);

            } else {
                // Classic Imagen Model Logic
                response = await fetch(`${GEMINI_BASE_URL}/v1beta/models/${modelId}:predict`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-goog-api-key": currentApiKey
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
                data = await response.json();

                if (data.error) {
                    // If 404 or other error, throw to catch block but keep custom message
                    throw new Error(`${data.error.message} (Code: ${data.error.code})`);
                }

                // Success check
                if (data.predictions && data.predictions[0] && data.predictions[0].bytesBase64Encoded) {
                    return { base64Img: data.predictions[0].bytesBase64Encoded, mimeType: 'image/png', usedModel: modelId };
                }
                // Fallback for older/different formats
                if (data.predictions && data.predictions[0] && typeof data.predictions[0] === 'string') {
                    // specific case where prediction IS the base64 string
                    return { base64Img: data.predictions[0], mimeType: 'image/png', usedModel: modelId };
                }

                throw new Error(`Unexpected response format from Imagen model ${modelId}`);
            }

        } catch (e) {
            let errorMsg = e.message;
            if (e.name === 'AbortError' || errorMsg.includes('aborted')) {
                errorMsg = "API Time out (180秒経過による強制切断)";
            }
            console.warn(`[ImageGen] Model ${modelId} failed:`, errorMsg);
            lastError = new Error(errorMsg);
            if (onStatusUpdate) onStatusUpdate(`[FAILED] ${modelId}: ${errorMsg}`);
        } finally {
            if (timeoutId) clearTimeout(timeoutId);
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
