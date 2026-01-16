const Groq = require('groq-sdk');
const dotenv = require('dotenv');

// Load env vars
const result = dotenv.config();

console.log("📂 .env Load Result:", result.error ? "FAILED" : "SUCCESS");
console.log("🔑 GROQ_API_KEY from env:", process.env.GROQ_API_KEY ? "Found (Starts with " + process.env.GROQ_API_KEY.substring(0, 5) + "...)" : "MISSING");

async function main() {
    try {
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

        console.log("🚀 Sending test request to Groq...");
        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "user", content: "Say 'Hello User' in Hindi" }],
            model: "llama-3.1-8b-instant",
        });

        console.log("✅ API Response:", chatCompletion.choices[0]?.message?.content || "");
    } catch (error) {
        console.error("❌ Groq Error:", error.message);
    }
}

main();
