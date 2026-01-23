/**
 * Gemini API Client for Nano Banana Pro (Thinking Mode Edition)
 * Uses gemini-2.0-flash-thinking-exp with v1beta API to enable thought process visibility.
 */
import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_IDS = [
    "gemini-2.0-flash-thinking-exp-01-21",
    "gemini-2.0-flash-thinking-exp", // The best thinking model
    "gemini-2.0-flash",              // [NEW] Standard 2.0 Flash
    "gemini-2.0-flash-exp",          // [Legacy] Experimental Flash 2.0
    "gemini-1.5-flash-latest",       // [NEW] Latest aliased 1.5
    "gemini-1.5-flash-002",          // [NEW] Stable 1.5 Flash 002
    "gemini-1.5-flash"               // [Legacy] Original alias
];

// Store API key in memory
let currentApiKey = "";

export const setApiKey = (key) => {
    currentApiKey = key;
};

export const getApiKey = () => currentApiKey;

/**
 * Robustly calls the Gemini API, cycling through experimental models if 404s occur.
 */
/**
 * Robustly calls the Gemini API, cycling through experimental models if 404s occur.
 * @param {string} prompt - The user prompt
 * @param {Array} images - Optional array of image parts [{ inlineData: {...} }]
 * @param {string} systemInstruction - Optional system instruction
 */
export const callThinkingGemini = async (prompt, images = null, systemInstruction = null, onThinkingUpdate) => {
    if (!currentApiKey) throw new Error("API Key is initialized.");

    const genAI = new GoogleGenerativeAI(currentApiKey);
    let lastError = null;

    for (const modelId of MODEL_IDS) {
        try {
            console.log(`Attempting connection with model: ${modelId}`);
            if (onThinkingUpdate) onThinkingUpdate(`Connecting to ${modelId}...`);

            const modelParams = { model: modelId };
            // Note: v1beta models support systemInstruction.
            if (systemInstruction) {
                modelParams.systemInstruction = systemInstruction;
            }

            const model = genAI.getGenerativeModel(modelParams, { apiVersion: "v1beta" });

            // Construct parts: Text + Images (if any)
            const parts = [{ text: prompt }];
            if (images && Array.isArray(images)) {
                parts.push(...images);
            }

            const result = await model.generateContent({
                contents: [{ role: "user", parts: parts }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 8192,
                },
                safetySettings: [
                    { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
                    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
                    { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
                    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
                ]
            });

            // If we get here, it worked!
            const response = result.response;
            const candidates = response.candidates || [];
            if (!candidates.length) throw new Error("No response candidates");

            const candidate = candidates[0];

            // 1. Robust Text Extraction
            let finalOutput = "";
            try {
                finalOutput = response.text();
            } catch (e) {
                // Ignore text() error (happens if blocked), we handle it below
            }

            // 2. Thought Extraction (Experimental)
            const responseParts = candidate.content?.parts || [];
            let thought = "";
            responseParts.forEach(part => {
                if (part.thought) thought += part.thought;
            });

            // 3. Check for Safety/Finish Reason if empty
            if (!finalOutput && candidate.finishReason !== "STOP") {
                console.warn("Generation stopped. Reason:", candidate.finishReason);
                finalOutput = `[GENERATION BLOCKED] Finish Reason: ${candidate.finishReason}\n(The image or prompt may have triggered safety filters. Please try a different image.)`;
            }

            // If absolutely nothing came back but no error
            if (!finalOutput) {
                finalOutput = "[ERROR] Empty response from API.";
            }

            return {
                text: finalOutput,
                thought: thought || "Standard processing complete (No thought trace available)."
            };

        } catch (err) {
            console.warn(`Model ${modelId} failed:`, err.message);
            lastError = err;
            // Continue to next model if it's a 404 or availability issue
            if (!err.message.includes("404") && !err.message.includes("not found")) {
                // If it's a legitimate error (like billing or safety), break? 
                // For now, let's try all experimental variants as they are flaky.
            }
        }
    }

    throw lastError || new Error("All experimental models failed to connect.");
};

// End of file
