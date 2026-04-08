'use client'

import { useState } from 'react'

const c = {
  cream: '#F5F2EB',
  ink: '#141410',
  inkSoft: '#4a4a44',
  inkMuted: '#8a8a80',
  green: '#1C3D2B',
  greenLight: '#2d6045',
  greenPale: '#e8f0eb',
  border: '#ddd9ce',
  red: '#8B3A3A',
  redPale: '#f5eeee',
}

const serif = 'var(--font-serif)'
const mono = 'var(--font-mono)'
const sans = 'var(--font-sans)'

type Quiz = {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export default function InteractiveQuiz({ quiz }: { quiz: Quiz }) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  function handleAnswerClick(index: number) {
    if (selectedAnswer !== null) return
    setSelectedAnswer(index)
    setShowExplanation(true)
  }

  const isCorrect = selectedAnswer === quiz.correctAnswer
  const hasAnswered = selectedAnswer !== null

  return (
    <div style={{ padding: '2rem', background: '#faf8f3', borderTop: `0.5px solid ${c.border}` }}>
      <p style={{ fontFamily: mono, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: c.inkMuted, marginBottom: '1rem' }}>
        Knowledge check
      </p>
      <p style={{ fontFamily: sans, fontSize: '1rem', color: c.ink, marginBottom: '1.25rem', lineHeight: 1.6 }}>
        {quiz.question}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: c.border, marginBottom: '1rem' }}>
        {quiz.options.map((option, index) => {
          const isSelected = selectedAnswer === index
          const isCorrectOption = index === quiz.correctAnswer

          let bg = c.cream
          let textColor = c.inkSoft
          let borderLeft = 'none'

          if (hasAnswered) {
            if (isCorrectOption) {
              bg = c.greenPale
              textColor = c.green
              borderLeft = `3px solid ${c.green}`
            } else if (isSelected && !isCorrect) {
              bg = c.redPale
              textColor = c.red
              borderLeft = `3px solid ${c.red}`
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
              disabled={hasAnswered}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '1rem 1.25rem', background: bg, border: 'none',
                borderLeft, cursor: hasAnswered ? 'default' : 'pointer', textAlign: 'left',
              }}
            >
              <span style={{ fontFamily: sans, fontSize: '0.9rem', color: textColor, lineHeight: 1.5 }}>{option}</span>
              {hasAnswered && isCorrectOption && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c.green} strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              )}
              {hasAnswered && isSelected && !isCorrect && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c.red} strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" /></svg>
              )}
            </button>
          )
        })}
      </div>

      {showExplanation && (
        <div style={{
          padding: '1.25rem', borderRadius: '2px',
          background: isCorrect ? c.greenPale : c.redPale,
          borderLeft: `3px solid ${isCorrect ? c.green : c.red}`,
        }}>
          <p style={{ fontFamily: mono, fontSize: '0.72rem', fontWeight: 500, color: isCorrect ? c.green : c.red, marginBottom: '0.4rem', letterSpacing: '0.04em' }}>
            {isCorrect ? 'Correct' : 'Not quite'}
          </p>
          <p style={{ fontFamily: sans, fontSize: '0.875rem', color: c.inkSoft, lineHeight: 1.7 }}>
            {quiz.explanation}
          </p>
        </div>
      )}
    </div>
  )
}