import Link from 'next/link'

const c = {
  cream: '#F5F2EB', ink: '#141410', inkSoft: '#4a4a44', inkMuted: '#8a8a80',
  green: '#1C3D2B', greenPale: '#e8f0eb', border: '#ddd9ce',
}
const serif = 'var(--font-serif)'
const mono = 'var(--font-mono)'
const sans = 'var(--font-sans)'

/**
 * Interstitial. Everyone lands here before the app, however they arrive, so
 * nobody meets the old product copy without knowing what they are looking at.
 * The site itself lives at /home.
 */
export default function NoticePage() {
  return (
    <div style={{ minHeight: '100vh', background: c.cream, color: c.ink, fontFamily: sans, fontWeight: 300, display: 'flex', flexDirection: 'column' }}>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: '620px', width: '100%' }}>

          <p style={{ fontFamily: mono, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: c.green, marginBottom: '1.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ display: 'block', width: '24px', height: '1px', background: c.green }} />
            Before you go in
          </p>

          <h1 style={{ fontFamily: serif, fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '2rem' }}>
            This isn&rsquo;t a live product. It&rsquo;s a <em style={{ fontStyle: 'italic', color: c.green }}>preview of my work.</em>
          </h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem', fontSize: '1rem', color: c.inkSoft, lineHeight: 1.8, marginBottom: '2.5rem' }}>
            <p>
              Allorca was an investing-education platform I designed and built in 2026. I have since
              moved on from it, and the name belongs to the people who carried it forward. What you are
              about to open is the version I shipped, kept online so the work can be looked at.
            </p>
            <p>
              Nothing here is running as a business. There are no accounts, no sign-ups and no way to
              become a user. Everything is paper trading against simulated data, and none of it is
              investment advice.
            </p>
            <p style={{ color: c.ink }}>
              Go in and click around. The survey scores your real answers, the dashboard and courses are
              open, and you can place a trade.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <Link href="/home" style={{ flex: 1, minWidth: '200px', textAlign: 'center', padding: '1rem 2rem', fontFamily: mono, fontSize: '0.78rem', letterSpacing: '0.06em', textTransform: 'uppercase', background: c.green, color: c.cream, borderRadius: '2px', textDecoration: 'none' }}>
              Continue to the site
            </Link>
            <Link href="/onboarding" style={{ flex: 1, minWidth: '200px', textAlign: 'center', padding: '1rem 2rem', fontFamily: mono, fontSize: '0.78rem', letterSpacing: '0.06em', textTransform: 'uppercase', background: 'white', color: c.inkSoft, border: `0.5px solid ${c.border}`, borderRadius: '2px', textDecoration: 'none' }}>
              Skip to the survey
            </Link>
          </div>

          <div style={{ borderTop: `0.5px solid ${c.border}`, paddingTop: '1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <p style={{ fontFamily: mono, fontSize: '0.72rem', color: c.inkMuted, letterSpacing: '0.02em', lineHeight: 1.7 }}>
              Built by Miles Smith &middot; Next.js, TypeScript, Prisma, Claude API
            </p>
            <a href="https://github.com/milessmi/Allorca_" target="_blank" rel="noopener noreferrer" style={{ fontFamily: mono, fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: c.green, textDecoration: 'none', borderBottom: `1px solid ${c.greenPale}`, paddingBottom: '2px' }}>
              Read the source &rarr;
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}
