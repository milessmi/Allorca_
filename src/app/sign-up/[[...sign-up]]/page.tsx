import Link from 'next/link'

const c = { cream: '#F5F2EB', ink: '#141410', inkSoft: '#4a4a44', inkMuted: '#8a8a80', green: '#1C3D2B', border: '#ddd9ce' }
const serif = 'var(--font-serif)'
const mono = 'var(--font-mono)'
const sans = 'var(--font-sans)'

/**
 * Sign-ups are closed: Allorca is archived and nobody should be creating an
 * account (or handing over financial survey answers) for a product that no
 * longer exists. The whole app is browsable without one, so point there.
 */
export default function SignUpPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: c.cream, fontFamily: sans, fontWeight: 300, padding: '2rem 1.5rem' }}>
      <div style={{ maxWidth: '460px', textAlign: 'center' }}>
        <Link href="/" style={{ fontFamily: serif, fontSize: '1.4rem', letterSpacing: '-0.02em', color: c.ink, textDecoration: 'none' }}>Allorca</Link>

        <h1 style={{ fontFamily: serif, fontSize: '2rem', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.15, margin: '2rem 0 1rem', color: c.ink }}>
          Sign-ups are closed
        </h1>
        <p style={{ fontSize: '0.95rem', color: c.inkSoft, lineHeight: 1.75, marginBottom: '2rem' }}>
          Allorca is archived and no longer takes new accounts. You do not need one:
          the survey, the dashboard, the courses and the paper trading are all open
          to look through as a demo.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/onboarding" style={{ padding: '0.9rem 1.75rem', fontFamily: mono, fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase', background: c.green, color: c.cream, borderRadius: '2px', textDecoration: 'none' }}>Take the survey</Link>
          <Link href="/dashboard" style={{ padding: '0.9rem 1.75rem', fontFamily: mono, fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase', background: 'white', color: c.inkSoft, border: `0.5px solid ${c.border}`, borderRadius: '2px', textDecoration: 'none' }}>Open the demo</Link>
        </div>

        <p style={{ fontFamily: mono, fontSize: '0.7rem', color: c.inkMuted, lineHeight: 1.7, marginTop: '2.5rem' }}>
          Built by Miles Smith in 2026. Paper trading only, nothing here is investment advice.
        </p>
      </div>
    </div>
  )
}
