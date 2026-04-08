'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

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

interface Lesson {
  id: string
  title: string
  duration: string
}

interface Props {
  courseId: string
  courseName: string
  lessons: Lesson[]
}

const TIERS = [
  { name: 'Beginner', min: 0 },
  { name: 'Student', min: 20 },
  { name: 'Investor', min: 40 },
  { name: 'Veteran', min: 60 },
  { name: 'Expert', min: 80 },
]

function getTier(score: number) {
  return [...TIERS].reverse().find((t) => score >= t.min) ?? TIERS[0]
}

function getNextTier(score: number) {
  return TIERS.find((t) => t.min > score) ?? null
}

export default function CourseProgress({ courseId, courseName, lessons }: Props) {
  const [started, setStarted] = useState(false)
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set())
  const [courseCompleted, setCourseCompleted] = useState(false)
  const [disciplineScore, setDisciplineScore] = useState(0)
  const [awardedPoints, setAwardedPoints] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/api/progress')
      .then((r) => r.json())
      .then((data) => {
        const record = data.progress?.find((p: { courseId: string; progress: number; completed: boolean }) => p.courseId === courseId)
        if (record) {
          setStarted(true)
          setCourseCompleted(record.completed)
          const count = Math.round((record.progress / 100) * lessons.length)
          setCompletedLessons(new Set(Array.from({ length: count }, (_, i) => i)))
        }
        setDisciplineScore(data.disciplineScore ?? 0)
      })
      .finally(() => setLoading(false))
  }, [courseId, lessons.length])

  async function saveProgress(newCompleted: Set<number>, finished: boolean) {
    setSaving(true)
    const progress = Math.round((newCompleted.size / lessons.length) * 100)
    const res = await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId, courseName, progress, completed: finished }),
    })
    const data = await res.json()
    setDisciplineScore(data.disciplineScore)
    if (data.awardedPoints > 0) {
      setAwardedPoints(data.awardedPoints)
      setShowCelebration(true)
    }
    setSaving(false)
  }

  function toggleLesson(index: number) {
    if (!started || courseCompleted) return
    const next = new Set(completedLessons)
    next.has(index) ? next.delete(index) : next.add(index)
    setCompletedLessons(next)
    const finished = next.size === lessons.length
    if (finished) setCourseCompleted(true)
    saveProgress(next, finished)
  }

  function handleStart() {
    setStarted(true)
    saveProgress(new Set(), false)
  }

  const tier = getTier(disciplineScore)
  const nextTier = getNextTier(disciplineScore)
  const progressPct = Math.round((completedLessons.size / lessons.length) * 100)

  if (loading) {
    return <div style={{ height: '80px', background: c.greenPale, borderRadius: '2px', opacity: 0.5 }} />
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: c.border }}>

      {/* Score + start/progress */}
      <div style={{ background: c.cream, padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <span style={{ fontFamily: mono, fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', background: c.greenPale, color: c.green, padding: '0.2rem 0.6rem', borderRadius: '2px' }}>
              {tier.name}
            </span>
            {saving && <span style={{ fontFamily: mono, fontSize: '0.62rem', color: c.inkMuted }}>Saving...</span>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ fontFamily: mono, fontSize: '0.72rem', color: c.inkMuted }}>Discipline score</span>
            <span style={{ fontFamily: mono, fontSize: '0.72rem', color: c.ink, fontWeight: 500 }}>{disciplineScore}/100</span>
          </div>
          <div style={{ width: '200px', height: '3px', background: c.border, borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ width: `${disciplineScore}%`, height: '100%', background: c.green, borderRadius: '2px', transition: 'width 0.7s ease' }} />
          </div>
          {nextTier && (
            <p style={{ fontFamily: mono, fontSize: '0.62rem', color: c.inkMuted, marginTop: '0.3rem' }}>
              {nextTier.min - disciplineScore} points to {nextTier.name}
            </p>
          )}
        </div>

        {!started ? (
          <button onClick={handleStart} style={{
            background: c.green, color: c.cream, fontFamily: mono, fontSize: '0.75rem',
            letterSpacing: '0.06em', textTransform: 'uppercase', padding: '0.85rem 1.75rem',
            border: 'none', borderRadius: '2px', cursor: 'pointer', flexShrink: 0,
          }}>
            Start course
          </button>
        ) : courseCompleted ? (
          <span style={{ fontFamily: mono, fontSize: '0.72rem', color: c.green, letterSpacing: '0.04em' }}>Course complete</span>
        ) : (
          <span style={{ fontFamily: mono, fontSize: '0.72rem', color: c.inkMuted }}>{progressPct}% complete</span>
        )}
      </div>

      {/* Lesson checklist */}
      {started && (
        <div style={{ background: c.cream, padding: '1.5rem 2rem' }}>
          <p style={{ fontFamily: mono, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: c.inkMuted, marginBottom: '1rem' }}>Lesson progress</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: c.border }}>
            {lessons.map((lesson, index) => {
              const done = completedLessons.has(index)
              return (
                <button
                  key={lesson.id}
                  onClick={() => toggleLesson(index)}
                  disabled={courseCompleted}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem',
                    background: done ? c.greenPale : c.cream,
                    border: 'none', cursor: courseCompleted ? 'default' : 'pointer', textAlign: 'left',
                  }}
                >
                  <div style={{
                    width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
                    border: `1.5px solid ${done ? c.green : c.border}`,
                    background: done ? c.green : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {done && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={c.cream} strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span style={{ flex: 1, fontFamily: sans, fontSize: '0.875rem', color: done ? c.green : c.inkSoft, fontWeight: done ? 400 : 300 }}>
                    {lesson.title}
                  </span>
                  <span style={{ fontFamily: mono, fontSize: '0.65rem', color: c.inkMuted }}>{lesson.duration}</span>
                </button>
              )
            })}
          </div>
          <div style={{ marginTop: '1rem' }}>
            <div style={{ width: '100%', height: '2px', background: c.border, borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: `${progressPct}%`, height: '100%', background: c.green, transition: 'width 0.5s ease' }} />
            </div>
            <p style={{ fontFamily: mono, fontSize: '0.62rem', color: c.inkMuted, marginTop: '0.4rem' }}>
              {completedLessons.size} of {lessons.length} lessons complete
            </p>
          </div>
        </div>
      )}

      {/* Celebration */}
      {showCelebration && (
        <div style={{ background: c.greenPale, padding: '2rem', textAlign: 'center' }}>
          <p style={{ fontFamily: serif, fontSize: '1.5rem', fontWeight: 400, color: c.green, letterSpacing: '-0.02em', marginBottom: '0.4rem' }}>Course complete</p>
          <p style={{ fontFamily: mono, fontSize: '0.75rem', color: c.greenLight, marginBottom: '0.25rem' }}>+{awardedPoints} discipline points earned</p>
          <p style={{ fontFamily: mono, fontSize: '0.72rem', color: c.inkMuted, marginBottom: '1.5rem' }}>You are now a {tier.name}</p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <Link href="/education" style={{
              background: c.green, color: c.cream, fontFamily: mono, fontSize: '0.72rem',
              letterSpacing: '0.06em', textTransform: 'uppercase', padding: '0.75rem 1.5rem',
              borderRadius: '2px', textDecoration: 'none',
            }}>
              More courses
            </Link>
            <button onClick={() => setShowCelebration(false)} style={{
              background: 'white', color: c.inkSoft, fontFamily: mono, fontSize: '0.72rem',
              letterSpacing: '0.06em', textTransform: 'uppercase', padding: '0.75rem 1.5rem',
              border: `0.5px solid ${c.border}`, borderRadius: '2px', cursor: 'pointer',
            }}>
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  )
}