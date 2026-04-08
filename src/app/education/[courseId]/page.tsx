import { auth } from '@clerk/nextjs/server'
import { redirect, notFound } from 'next/navigation'
import { PrismaClient } from '@prisma/client'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { getCourseById } from '@/lib/courses'
import InteractiveQuiz from '@/components/InteractiveQuiz'
import LessonContent from '@/components/LessonContent'
import CourseProgress from '@/components/CourseProgress'

const prisma = new PrismaClient()

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

type PageProps = {
  params: Promise<{ courseId: string }>
}

export default async function CoursePage(props: PageProps) {
  const params = await props.params
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!dbUser?.onboardingComplete) redirect('/onboarding')

  const course = getCourseById(params.courseId)
  if (!course) notFound()

  const levelColor = (level: string) => {
    if (level === 'beginner') return { bg: c.greenPale, text: c.green }
    if (level === 'intermediate') return { bg: '#e8eef5', text: '#1a3a5c' }
    return { bg: '#f0ece8', text: '#4a3020' }
  }

  const { bg, text } = levelColor(course.level)

  return (
    <div style={{ background: c.cream, color: c.ink, fontFamily: sans, fontWeight: 300, minHeight: '100vh' }}>

      {/* NAV */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.25rem 3rem',
        background: 'rgba(245,242,235,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: `0.5px solid ${c.border}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
          <Link href="/" style={{ fontFamily: serif, fontSize: '1.3rem', letterSpacing: '-0.02em', color: c.ink, textDecoration: 'none' }}>
            Allorca
          </Link>
          <nav style={{ display: 'flex', gap: '2rem' }}>
            {[
              { label: 'Dashboard', href: '/dashboard' },
              { label: 'Portfolio', href: '/portfolio' },
              { label: 'Learn', href: '/education', active: true },
            ].map(({ label, href, active }) => (
              <Link key={href} href={href} style={{
                fontFamily: mono, fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase',
                color: active ? c.green : c.inkSoft, textDecoration: 'none',
                borderBottom: active ? `1px solid ${c.green}` : 'none', paddingBottom: active ? '2px' : '0',
              }}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <UserButton afterSignOutUrl="/" />
      </header>

      {/* COURSE HEADER */}
      <div style={{ padding: '3rem 3rem 0', borderBottom: `0.5px solid ${c.border}` }}>
        <Link href="/education" style={{ fontFamily: mono, fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: c.inkMuted, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.5rem' }}>
          ← Back to courses
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <span style={{ fontFamily: mono, fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', background: bg, color: text, padding: '0.25rem 0.6rem', borderRadius: '2px' }}>
            {course.level}
          </span>
          <span style={{ fontFamily: mono, fontSize: '0.65rem', color: c.inkMuted }}>{course.duration}</span>
          <span style={{ fontFamily: mono, fontSize: '0.65rem', color: c.inkMuted }}>{course.lessons.length} lessons</span>
        </div>
        <h1 style={{ fontFamily: serif, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1rem' }}>
          {course.title}
        </h1>
        <p style={{ fontSize: '1rem', color: c.inkSoft, lineHeight: 1.7, maxWidth: '640px', paddingBottom: '2rem' }}>
          {course.description}
        </p>
      </div>

      {/* PROGRESS TRACKER */}
      <div style={{ padding: '2rem 3rem', borderBottom: `0.5px solid ${c.border}` }}>
        <CourseProgress courseId={course.id} courseName={course.title} lessons={course.lessons} />
      </div>

      {/* LESSONS */}
      <div style={{ padding: '2.5rem 3rem', borderBottom: `0.5px solid ${c.border}` }}>
        <p style={{ fontFamily: mono, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: c.inkMuted, marginBottom: '1.5rem' }}>Lessons</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: c.border }}>
          {course.lessons.map((lesson, index) => (
            <div key={lesson.id} id={`lesson-${index + 1}`} style={{ background: c.cream }}>

              {/* Lesson header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.75rem 2rem', borderBottom: `0.5px solid ${c.border}`, background: '#faf8f3' }}>
                <div style={{ width: '36px', height: '36px', background: c.green, borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: mono, fontSize: '0.75rem', color: c.cream, fontWeight: 500 }}>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: serif, fontSize: '1.2rem', fontWeight: 400, letterSpacing: '-0.02em', marginBottom: '0.2rem' }}>{lesson.title}</h3>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <span style={{ fontFamily: mono, fontSize: '0.65rem', color: c.inkMuted }}>{lesson.duration}</span>
                    {lesson.quiz && (
                      <span style={{ fontFamily: mono, fontSize: '0.65rem', color: c.green }}>Quiz included</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Lesson content */}
              <div style={{ padding: '2rem' }}>
                <LessonContent content={lesson.content} />
              </div>

              {/* Quiz */}
              {lesson.quiz && (
                <div style={{ borderTop: `0.5px solid ${c.border}` }}>
                  <InteractiveQuiz quiz={lesson.quiz} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* COURSE COMPLETE */}
      <div style={{ padding: '2.5rem 3rem' }}>
        <div style={{ background: c.green, padding: '3rem', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontFamily: mono, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,242,235,0.5)', marginBottom: '0.5rem' }}>Course complete</p>
            <h3 style={{ fontFamily: serif, fontSize: '1.75rem', color: c.cream, fontWeight: 400, letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>{course.title}</h3>
            <p style={{ fontFamily: mono, fontSize: '0.78rem', color: 'rgba(245,242,235,0.6)' }}>Keep building on what you've learned.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexShrink: 0 }}>
            <Link href="/education" style={{
              background: c.cream, color: c.green, padding: '0.85rem 1.75rem',
              fontFamily: mono, fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase',
              borderRadius: '2px', textDecoration: 'none',
            }}>
              More courses
            </Link>
            <Link href="/dashboard" style={{
              background: 'transparent', color: c.cream, padding: '0.85rem 1.75rem',
              fontFamily: mono, fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase',
              borderRadius: '2px', textDecoration: 'none', border: `0.5px solid rgba(245,242,235,0.3)`,
            }}>
              Dashboard
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}