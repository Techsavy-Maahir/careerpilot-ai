/**
 * Safely parses and transforms structured JSON AI responses into human-readable Markdown.
 * If the content is already Markdown or standard text, it returns it unchanged.
 */
export function processChatContent(rawContent) {
    if (!rawContent || typeof rawContent !== 'string') return ''

    const trimmed = rawContent.trim()

    // Check if response is formatted as raw JSON or enclosed in ```json ``` code block
    if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('```json') && trimmed.endsWith('```'))) {
        try {
            let jsonString = trimmed
            if (trimmed.startsWith('```json')) {
                jsonString = trimmed.replace(/^```json\s*/i, '').replace(/\s*```$/, '')
            }

            const parsed = JSON.parse(jsonString)

            if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
                let md = ''

                if (parsed.question) {
                    md += `## 🎯 Interview Question\n\n**${parsed.question}**\n\n`
                }
                if (parsed.interview_answer || parsed.answer) {
                    const ans = parsed.interview_answer || parsed.answer
                    md += `## 💬 Interview-Ready Answer\n\n> "${ans}"\n\n`
                }
                if (parsed.simple_explanation || parsed.explanation) {
                    md += `## 🧠 Simple Explanation\n\n${parsed.simple_explanation || parsed.explanation}\n\n`
                }
                if (parsed.why_this || parsed.why) {
                    md += `## 🤔 Why Use This / Alternatives\n\n${parsed.why_this || parsed.why}\n\n`
                }
                if (parsed.tradeoffs) {
                    const t = parsed.tradeoffs
                    md += `## ⚖️ Trade-offs\n\n${Array.isArray(t) ? t.map(item => `- ${item}`).join('\n') : t}\n\n`
                }
                if (parsed.followups || parsed.follow_up_questions) {
                    const list = parsed.followups || parsed.follow_up_questions
                    if (Array.isArray(list)) {
                        md += `## 🔥 Likely Follow-Up Questions\n\n${list.map((q, i) => `${i + 1}. ${q}`).join('\n')}\n\n`
                    } else {
                        md += `## 🔥 Likely Follow-Up Questions\n\n${list}\n\n`
                    }
                }
                if (parsed.what_to_say || parsed.summary) {
                    md += `## 🎤 What I Should Actually Say\n\n> "${parsed.what_to_say || parsed.summary}"\n\n`
                }
                if (parsed.remember || parsed.key_takeaways) {
                    md += `## 🔑 Remember\n\n${parsed.remember || parsed.key_takeaways}\n\n`
                }

                if (md.trim()) {
                    return md.trim()
                }
            }
        } catch (err) {
            // Invalid JSON, return rawContent
        }
    }

    return rawContent
}
