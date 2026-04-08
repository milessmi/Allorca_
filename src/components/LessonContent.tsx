'use client'

import ReactMarkdown from 'react-markdown'

const c = {
  ink: '#141410',
  inkSoft: '#4a4a44',
  inkMuted: '#8a8a80',
  green: '#1C3D2B',
  greenPale: '#e8f0eb',
  border: '#ddd9ce',
}

const serif = 'var(--font-serif)'
const mono = 'var(--font-mono)'
const sans = 'var(--font-sans)'

export default function LessonContent({ content }: { content: string }) {
  return (
    <div style={{ fontFamily: sans, fontWeight: 300, color: c.inkSoft, lineHeight: 1.75 }}>
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 style={{ fontFamily: serif, fontSize: '1.75rem', fontWeight: 400, color: c.ink, marginBottom: '1rem', marginTop: '0.5rem', letterSpacing: '-0.02em' }}>{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 style={{ fontFamily: serif, fontSize: '1.35rem', fontWeight: 400, color: c.ink, marginBottom: '0.75rem', marginTop: '2rem', paddingBottom: '0.5rem', borderBottom: `0.5px solid ${c.border}`, letterSpacing: '-0.02em' }}>{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 style={{ fontFamily: sans, fontSize: '1rem', fontWeight: 500, color: c.green, marginBottom: '0.5rem', marginTop: '1.5rem' }}>{children}</h3>
          ),
          p: ({ children }) => (
            <p style={{ fontSize: '0.95rem', color: c.inkSoft, lineHeight: 1.8, marginBottom: '1rem' }}>{children}</p>
          ),
          strong: ({ children }) => (
            <strong style={{ color: c.ink, fontWeight: 500 }}>{children}</strong>
          ),
          ul: ({ children }) => (
            <ul style={{ marginBottom: '1rem', marginLeft: '0', paddingLeft: '0', listStyle: 'none' }}>{children}</ul>
          ),
          ol: ({ children }) => (
            <ol style={{ marginBottom: '1rem', marginLeft: '1.25rem', listStyleType: 'decimal' }}>{children}</ol>
          ),
          li: ({ children }) => (
            <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '0.5rem', fontSize: '0.92rem', color: c.inkSoft }}>
              <span style={{ color: c.green, marginTop: '0.55rem', flexShrink: 0, fontSize: '0.5rem' }}>■</span>
              <span>{children}</span>
            </li>
          ),
          hr: () => <hr style={{ border: 'none', borderTop: `0.5px solid ${c.border}`, margin: '1.5rem 0' }} />,
          code: ({ children }) => (
            <code style={{ background: c.greenPale, color: c.green, padding: '0.15rem 0.4rem', borderRadius: '2px', fontFamily: mono, fontSize: '0.82rem' }}>{children}</code>
          ),
          blockquote: ({ children }) => (
            <blockquote style={{ borderLeft: `2px solid ${c.green}`, paddingLeft: '1rem', fontStyle: 'italic', color: c.inkMuted, margin: '1rem 0' }}>{children}</blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}