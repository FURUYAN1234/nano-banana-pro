// test_nano_banana_2.mjs
// Usage: node test_nano_banana_2.mjs "YOUR_API_KEY"

const apiKey = process.argv[2];

if (!apiKey) {
    console.error("Please provide your Gemini API key as an argument.");
    console.error("Usage: node test_nano_banana_2.mjs \"YOUR_API_KEY\"");
    process.exit(1);
}

async function listAvailableModels() {
    console.log("==================================================");
    console.log("[Diagnostic] Fetching available models for this API Key...");
    console.log("==================================================");

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.error) {
            console.error(`❌ [FAILED] API Error:`);
            console.error(JSON.stringify(data.error, null, 2));
            return;
        }

        if (!data.models || data.models.length === 0) {
            console.warn("⚠️ No models returned by the API.");
            return;
        }

        // Search for anything related to "imagen", "image", or "banana"
        const relevantModels = data.models.filter(m =>
            m.name.toLowerCase().includes("image") ||
            m.name.toLowerCase().includes("banana")
        );

        console.log(`\n✅ Successfully retrieved ${data.models.length} total models.`);
        console.log(`\n--- Potential Image Generation Models ---`);

        if (relevantModels.length > 0) {
            relevantModels.forEach(m => {
                console.log(`- Name: ${m.name}`);
                console.log(`  Display: ${m.displayName}`);
                console.log(`  Methods: ${m.supportedGenerationMethods.join(", ")}`);
                console.log("");
            });
        } else {
            console.log("No image-related models found in the filtered list. Here are some of the available models:");
            data.models.slice(0, 10).forEach(m => console.log(`- ${m.name}`));
            console.log("... (truncated)");
        }

        console.log("\nDiagnostic complete.");

    } catch (e) {
        console.error(`❌ [ERROR] Request failed: ${e.message}`);
    }
}

listAvailableModels();
