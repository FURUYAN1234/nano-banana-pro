import { GoogleGenerativeAI } from "@google/generative-ai";
import { getApiKey } from "./gemini";

// Adding legacy models and fast models for maximum coverage
const MODELS_TO_TRY = [
    "imagen-3.0-generate-001",
    "imagen-3.0-fast-generate-001",
    "image-generation-001" // Legacy Imagen 2 fallback
];

/**
 * Generates an image using Imagen 3 via Google AI SDK (if available/enabled for the key).
 * Returns the base64 image data.
 */
export const generateImageWithImagen = async (prompt) => {
    const currentApiKey = getApiKey();
    if (!currentApiKey) throw new Error("API Key is not set.");

    let lastError = null;
    let attemptedModels = [];

    for (const modelId of MODELS_TO_TRY) {
        try {
            console.log(`[Imagen] Attempting generation with model: ${modelId}`);
            attemptedModels.push(modelId);

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s hard timeout

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelId}:predict?key=${currentApiKey}`, {
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
                        aspectRatio: "9:16", // Taller aspect ratio for 4-koma stack to reduce side margins
                        personGeneration: "allow_adult" // Sometimes needed for older models, harmless if ignored
                    }
                }),
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            const data = await response.json();

            if (data.error) {
                // If 404 or other error, throw to catch block but keep custom message
                throw new Error(`${data.error.message} (Code: ${data.error.code})`);
            }

            // Success check
            if (data.predictions && data.predictions[0] && data.predictions[0].bytesBase64Encoded) {
                return data.predictions[0].bytesBase64Encoded;
            }
            // Fallback for older/different formats
            if (data.predictions && data.predictions[0] && typeof data.predictions[0] === 'string') {
                // specific case where prediction IS the base64 string
                return data.predictions[0];
            }

            throw new Error(`Unexpected response format from ${modelId}`);

        } catch (e) {
            console.warn(`[Imagen] Model ${modelId} failed:`, e.message);
            lastError = e;
            // Continue to next model
        }
    }

    throw lastError || new Error(`All image generation models failed (${attemptedModels.join(", ")}). Please check API Key/Region.`);
};
