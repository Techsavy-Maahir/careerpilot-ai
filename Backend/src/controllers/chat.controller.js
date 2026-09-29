const { generateChatResponse } = require("../services/chat.service")

/**
 * @description Controller for AI Interview Assistant Chat
 */
async function generateChatController(req, res) {
    try {
        const { message, history, interviewContext } = req.body

        if (!message || typeof message !== "string" || !message.trim()) {
            return res.status(400).json({ message: "Message is required." })
        }

        if (history !== undefined && !Array.isArray(history)) {
            return res.status(400).json({ message: "History must be an array." })
        }

        if (
            interviewContext !== undefined &&
            (typeof interviewContext !== "object" || interviewContext === null || Array.isArray(interviewContext))
        ) {
            return res.status(400).json({ message: "Interview context must be an object." })
        }

        const reply = await generateChatResponse({
            message: message.trim(),
            history: history || [],
            interviewContext: interviewContext || {}
        })

        res.status(200).json({ reply })
    } catch (err) {
        console.error(err)
        const status = err?.status === 503 ? 503 : 500
        res.status(status).json({
            message: err?.message || "Failed to generate chat response."
        })
    }
}

module.exports = { generateChatController }
