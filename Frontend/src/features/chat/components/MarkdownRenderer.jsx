import React from 'react'

/**
 * Parses inline Markdown formatting (bold, italic, inline code).
 */
function renderInlineContent(text) {
    if (!text) return null

    // Pattern for inline code, bold, italic
    const regex = /(`[^`]+`|\*\*[^*]+\*\*|_[^_]+_|\*[^*]+\*)/g
    const parts = text.split(regex)

    return parts.map((part, index) => {
        if (!part) return null

        if (part.startsWith('`') && part.endsWith('`')) {
            return (
                <code key={index} className="md-inline-code">
                    {part.slice(1, -1)}
                </code>
            )
        }
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index}>{part.slice(2, -2)}</strong>
        }
        if ((part.startsWith('*') && part.endsWith('*')) || (part.startsWith('_') && part.endsWith('_'))) {
            return <em key={index}>{part.slice(1, -1)}</em>
        }
        return part
    })
}

/**
 * Component to parse and render Markdown string into styled HTML elements.
 */
export default function MarkdownRenderer({ content }) {
    if (!content) return null

    const lines = content.split('\n')
    const elements = []
    let i = 0

    while (i < lines.length) {
        const line = lines[i]
        const trimmed = line.trim()

        // 1. Code Block (```lang)
        if (trimmed.startsWith('```')) {
            const lang = trimmed.slice(3).trim()
            const codeLines = []
            i++
            while (i < lines.length && !lines[i].trim().startsWith('```')) {
                codeLines.push(lines[i])
                i++
            }
            elements.push(
                <div key={i} className="md-code-block">
                    {lang && <div className="md-code-lang">{lang}</div>}
                    <pre>
                        <code>{codeLines.join('\n')}</code>
                    </pre>
                </div>
            )
            i++
            continue
        }

        // 2. Headings (##, ###, #)
        if (trimmed.startsWith('#')) {
            const match = trimmed.match(/^(#{1,6})\s+(.*)$/)
            if (match) {
                const level = match[1].length
                const headingText = match[2]
                const inlineRendered = renderInlineContent(headingText)

                if (level === 1) elements.push(<h1 key={i} className="md-h1">{inlineRendered}</h1>)
                else if (level === 2) elements.push(<h2 key={i} className="md-h2">{inlineRendered}</h2>)
                else if (level === 3) elements.push(<h3 key={i} className="md-h3">{inlineRendered}</h3>)
                else elements.push(<h4 key={i} className="md-h4">{inlineRendered}</h4>)

                i++
                continue
            }
        }

        // 3. Blockquote (> text)
        if (trimmed.startsWith('>')) {
            const quoteLines = []
            while (i < lines.length && lines[i].trim().startsWith('>')) {
                quoteLines.push(lines[i].trim().replace(/^>\s?/, ''))
                i++
            }
            elements.push(
                <blockquote key={i} className="md-blockquote">
                    {renderInlineContent(quoteLines.join(' '))}
                </blockquote>
            )
            continue
        }

        // 4. Horizontal Separator (--- or ***)
        if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
            elements.push(<hr key={i} className="md-hr" />)
            i++
            continue
        }

        // 5. Unordered List (- item or * item)
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            const listItems = []
            while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))) {
                const itemText = lines[i].trim().replace(/^[-*]\s+/, '')
                listItems.push(itemText)
                i++
            }
            elements.push(
                <ul key={i} className="md-ul">
                    {listItems.map((item, idx) => (
                        <li key={idx}>{renderInlineContent(item)}</li>
                    ))}
                </ul>
            )
            continue
        }

        // 6. Numbered List (1. item)
        if (/^\d+\.\s+/.test(trimmed)) {
            const listItems = []
            while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
                const itemText = lines[i].trim().replace(/^\d+\.\s+/, '')
                listItems.push(itemText)
                i++
            }
            elements.push(
                <ol key={i} className="md-ol">
                    {listItems.map((item, idx) => (
                        <li key={idx}>{renderInlineContent(item)}</li>
                    ))}
                </ol>
            )
            continue
        }

        // 7. Table (| col | col |)
        if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
            const tableRows = []
            while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
                const rowLine = lines[i].trim()
                // Check separator row like |---|---|
                if (!/^\|[\s:-|-]+\|$/.test(rowLine)) {
                    const cells = rowLine.split('|').slice(1, -1).map(c => c.trim())
                    tableRows.push(cells)
                }
                i++
            }
            if (tableRows.length > 0) {
                const headerRow = tableRows[0]
                const bodyRows = tableRows.slice(1)
                elements.push(
                    <div key={i} className="md-table-wrapper">
                        <table className="md-table">
                            <thead>
                                <tr>
                                    {headerRow.map((cell, idx) => (
                                        <th key={idx}>{renderInlineContent(cell)}</th>
                                    ))}
                                </tr>
                            </thead>
                            {bodyRows.length > 0 && (
                                <tbody>
                                    {bodyRows.map((row, rIdx) => (
                                        <tr key={rIdx}>
                                            {row.map((cell, cIdx) => (
                                                <td key={cIdx}>{renderInlineContent(cell)}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            )}
                        </table>
                    </div>
                )
            }
            continue
        }

        // 8. Paragraph / Plain Line
        if (trimmed !== '') {
            elements.push(
                <p key={i} className="md-p">
                    {renderInlineContent(line)}
                </p>
            )
        }

        i++
    }

    return <div className="markdown-container">{elements}</div>
}
