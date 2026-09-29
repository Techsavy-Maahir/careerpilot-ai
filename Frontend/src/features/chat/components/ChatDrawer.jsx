import React, { useState, useRef, useEffect } from 'react'
import '../style/chat.scss'
import { sendChatMessage } from '../services/chat.api'
import { processChatContent } from '../utils/formatResponse'
import MarkdownRenderer from './MarkdownRenderer'

const ChatDrawer = ({ isOpen, onClose, interviewContext, onClearContext }) => {
    const [ messages, setMessages ] = useState([])
    const [ input, setInput ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState('')
    const messagesEndRef = useRef(null)
    const textareaRef = useRef(null)

    // Auto-scroll to bottom whenever messages update or loading state changes
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        if (isOpen) {
            scrollToBottom()
        }
    }, [ messages, loading, isOpen ])

    if (!isOpen) return null

    const handleSend = async () => {
        const trimmed = input.trim()
        if (!trimmed || loading) return

        setError('')
        const userMsg = { role: 'user', content: trimmed }
        const newMessages = [ ...messages, userMsg ]
        setMessages(newMessages)
        setInput('')
        setLoading(true)

        try {
            // Map history for backend API (user/assistant)
            const historyPayload = messages.map(m => ({
                role: m.role,
                content: m.content
            }))

            const data = await sendChatMessage({
                message: trimmed,
                history: historyPayload,
                interviewContext: interviewContext || undefined
            })

            setMessages(prev => [ ...prev, { role: 'assistant', content: data.reply } ])
        } catch (err) {
            console.error('Chat error:', err)
            const errorMsg = err?.response?.data?.message || 'Failed to get a response from AI Assistant.'
            setError(errorMsg)
        } finally {
            setLoading(false)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className='chat-drawer-backdrop' onClick={onClose}>
            <div className='chat-drawer' onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div className='chat-drawer__header'>
                    <div className='header-title'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff2d78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        <h3>AI Interview Assistant</h3>
                    </div>
                    <button className='close-btn' onClick={onClose} title="Close Assistant">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Optional Interview Context Bar */}
                {interviewContext?.currentQuestion && (
                    <div className='chat-drawer__context-bar'>
                        <div className='context-text'>
                            Targeting: <strong>"{interviewContext.currentQuestion}"</strong>
                        </div>
                        {onClearContext && (
                            <button className='clear-context-btn' onClick={onClearContext}>Clear Context</button>
                        )}
                    </div>
                )}

                {/* Messages Body */}
                <div className='chat-drawer__messages'>
                    {messages.length === 0 ? (
                        <div className='chat-drawer__empty'>
                            <div className='empty-icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                </svg>
                            </div>
                            <p>Ask me anything about your interview.</p>
                            <span>Get tips on technical concepts, behavioral answers, salary negotiation, or advice for your current question.</span>
                        </div>
                    ) : (
                        messages.map((msg, index) => (
                            <div key={index} className={`chat-msg chat-msg--${msg.role}`}>
                                <span className='chat-msg__sender'>
                                    {msg.role === 'user' ? 'You' : 'AI Assistant'}
                                </span>
                                <div className='chat-msg__bubble'>
                                    {msg.role === 'user' ? (
                                        msg.content
                                    ) : (
                                        <MarkdownRenderer content={processChatContent(msg.content)} />
                                    )}
                                </div>
                            </div>
                        ))
                    )}

                    {/* Loading Indicator */}
                    {loading && (
                        <div className='chat-msg chat-msg--assistant'>
                            <span className='chat-msg__sender'>AI Assistant</span>
                            <div className='chat-loading'>
                                <span className='dot' />
                                <span className='dot' />
                                <span className='dot' />
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className='chat-drawer__input-area'>
                    {error && <div className='error-banner'>{error}</div>}
                    <div className='input-form'>
                        <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask a question... (Enter to send, Shift+Enter for newline)"
                            rows={1}
                        />
                        <button
                            className='send-btn'
                            onClick={handleSend}
                            disabled={!input.trim() || loading}
                            title="Send message"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13" />
                                <polygon points="22 2 15 22 11 13 2 9 22 2" />
                            </svg>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ChatDrawer
