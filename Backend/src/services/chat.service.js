const { GoogleGenAI } = require("@google/genai")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const AI_MODELS = [ "gemini-3.5-flash-lite" ]

const SYSTEM_INSTRUCTION = `You are an expert AI Technical Interview Coach, helping candidates prepare for job interviews.

CRITICAL FORMATTING INSTRUCTIONS:
- NEVER return raw JSON objects, JSON strings, or schema structures like {"question": ...}.
- ALWAYS respond in clean, human-readable Markdown.
- Adapt response length appropriately: keep simple questions concise, and provide structured detail for project, system design, or architecture questions.

When answering interview questions, use clean Markdown headings (e.g. ## Title) and structure your answer using sections like:
## 🎯 Interview Question (if answering a specific interview prompt)
## 💬 Interview-Ready Answer (a polished response the candidate can say)
## 🧠 Simple Explanation (easy-to-understand breakdown)
## 🤔 Why Use This / Alternatives (when applicable)
## ⚖️ Trade-offs (pros and cons when applicable)
## 🔥 Likely Follow-Up Questions (bulleted list of 2-4 questions)
## 🎤 What I Should Actually Say (concise summary for the candidate)
## 🔑 Remember (takeaway summary)

For code requests (e.g., C++, JavaScript, Python), provide clean, well-commented code blocks with syntax block specifiers (e.g. \`\`\`cpp).
Never invent facts about the candidate's resume. Keep your tone encouraging, professional, and practical.`

async function generateChatResponse({ message, history = [], interviewContext = {} }) {
    let lastError = null

    // Format prompt text with optional context
    let promptText = ""
    if (interviewContext && (interviewContext.currentQuestion || interviewContext.category)) {
        promptText += `[Interview Context - Category: ${interviewContext.category || "General"}, Current Question: "${interviewContext.currentQuestion || "N/A"}"]\n\n`
    }
    promptText += message

    // Convert history format (assistant -> model)
    const contents = []
    
    if (Array.isArray(history)) {
        for (const item of history) {
            if (item && item.role && item.content) {
                const role = item.role === "assistant" ? "model" : item.role
                if (role === "user" || role === "model") {
                    contents.push({
                        role,
                        parts: [ { text: String(item.content) } ]
                    })
                }
            }
        }
    }

    // Append current user message
    contents.push({
        role: "user",
        parts: [ { text: promptText } ]
    })

    for (const model of AI_MODELS) {
        try {
            const response = await ai.models.generateContent({
                model,
                contents,
                config: {
                    systemInstruction: SYSTEM_INSTRUCTION
                }
            })

            return response.text
        } catch (err) {
            lastError = err
            const isRetryable = err?.status === 503 || err?.status === 429
            if (!isRetryable) {
                throw err
            }
        }
    }

    const error = new Error(lastError?.message || "AI chat service is temporarily unavailable. Please try again.")
    error.status = 503
    throw error
}

module.exports = { generateChatResponse }
