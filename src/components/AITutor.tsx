'use client'

import { useState, useEffect, useRef } from 'react'

const c = {
  cream: '#F5F2EB',
  ink: '#141410',
  inkSoft: '#4a4a44',
  inkMuted: '#8a8a80',
  green: '#1C3D2B',
  greenLight: '#2d6045',
  greenPale: '#e8f0eb',
  border: '#ddd9ce',
}

const serif = 'var(--font-serif)'
const mono = 'var(--font-mono)'
const sans = 'var(--font-sans)'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface OutlineStep {
  step: number
  title: string
  description: string
  priority: 'start here' | 'recommended' | 'advanced'
}

const priorityColors: Record<string, { bg: string; text: string }> = {
  'start here':   { bg: '#e8f0eb', text: '#1C3D2B' },
  'recommended':  { bg: '#e8eef5', text: '#1a3a5c' },
  'advanced':     { bg: '#f0ece8', text: '#4a3020' },
}

export default function AITutor() {
  const [outline, setOutline] = useState<OutlineStep[]>([])
  const [outlineLoading, setOutlineLoading] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [chatLoading, setChatLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/ai-tutor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: 'outline', messages: [] }),
    })
      .then((r) => r.json())
      .then((data) => { if (data.outline) setOutline(data.outline) })
      .finally(() => setOutlineLoading(false))
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, chatLoading])

  async function sendMessage() {
    if (!input.trim() || chatLoading) return
    const userMsg: Message = { role: 'user', content: input.trim() }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setChatLoading(true)

    const res = await fetch('/api/ai-tutor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: 'chat', messages: updated }),
    })
    const data = await res.json()
    if (data.reply) setMessages([...updated, { role: 'assistant', content: data.reply }])
    setChatLoading(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: c.border }}>

      {/* ROADMAP */}
      <div style={{ background: c.cream, padding: '2rem' }}>
        <p style={{ fontFamily: mono, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: c.inkMuted, marginBottom: '1.25rem' }}>
          Your personalized roadmap
        </p>

        {outlineLoading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{ height: '60px', background: c.greenPale, borderRadius: '2px', opacity: 0.5 }} />
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: c.border }}>
            {outline.map((step) => {
              const colors = priorityColors[step.priority] ?? priorityColors['recommended']
              return (
                <div key={step.step} style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', background: c.cream, padding: '1.25rem' }}>
                  <div style={{ width: '28px', height: '28px', background: c.green, borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: mono, fontSize: '0.65rem', color: c.cream, fontWeight: 500 }}>{step.step}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: sans, fontSize: '0.9rem', fontWeight: 500, color: c.ink }}>{step.title}</span>
                      <span style={{ fontFamily: mono, fontSize: '0.6rem', letterSpacing: '0.08em', textTransform: 'uppercase', background: colors.bg, color: colors.text, padding: '0.2rem 0.5rem', borderRadius: '2px' }}>
                        {step.priority}
                      </span>
                    </div>
                    <p style={{ fontFamily: sans, fontSize: '0.82rem', color: c.inkSoft, lineHeight: 1.6 }}>{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* AI CHAT */}
      <div style={{ background: c.cream }}>
        <div style={{ padding: '1.5rem 2rem', borderBottom: `0.5px solid ${c.border}` }}>
          <p style={{ fontFamily: mono, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: c.inkMuted, marginBottom: '0.25rem' }}>AI tutor</p>
          <p style={{ fontFamily: sans, fontSize: '0.82rem', color: c.inkSoft }}>Knows your profile — ask anything about investing</p>
        </div>

        {/* Messages */}
        <div style={{ height: '320px', overflowY: 'auto', padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {messages.length === 0 && (
            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
              <p style={{ fontFamily: mono, fontSize: '0.75rem', color: c.inkMuted }}>Ask a question to get started. Your AI tutor already knows your profile.</p>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '80%', padding: '0.75rem 1rem', borderRadius: '2px',
                background: msg.role === 'user' ? c.green : '#f0ede6',
                color: msg.role === 'user' ? c.cream : c.ink,
                fontFamily: sans, fontSize: '0.875rem', lineHeight: 1.65,
              }}>
                <span dangerouslySetInnerHTML={{ __html: msg.content
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\n- /g, '<br>• ')
                  .replace(/\n/g, '<br>')
                }} />
              </div>
            </div>
          ))}
          {chatLoading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{ background: '#f0ede6', padding: '0.75rem 1rem', borderRadius: '2px', display: 'flex', gap: '4px', alignItems: 'center' }}>
                {[0, 150, 300].map((delay) => (
                  <span key={delay} style={{ width: '6px', height: '6px', background: c.inkMuted, borderRadius: '50%', display: 'block', animation: 'bounce 1s infinite', animationDelay: `${delay}ms` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{ borderTop: `0.5px solid ${c.border}`, padding: '1rem 2rem', display: 'flex', gap: '0.75rem' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="e.g. What's a good ETF for my risk profile?"
            style={{
              flex: 1, background: 'white', color: c.ink, fontFamily: mono, fontSize: '0.82rem',
              padding: '0.75rem 1rem', border: `0.5px solid ${c.border}`, borderRadius: '2px', outline: 'none',
            }}
          />
          <button
            onClick={sendMessage}
            disabled={chatLoading || !input.trim()}
            style={{
              background: c.green, color: c.cream, fontFamily: mono, fontSize: '0.72rem',
              letterSpacing: '0.06em', textTransform: 'uppercase', padding: '0.75rem 1.5rem',
              border: 'none', borderRadius: '2px', cursor: 'pointer',
              opacity: chatLoading || !input.trim() ? 0.4 : 1,
            }}
          >
            Send
          </button>
        </div>
      </div>

    </div>
  )
}