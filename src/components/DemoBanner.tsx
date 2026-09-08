import Link from 'next/link'

/** Shown on every app page when nobody is signed in. */
export default function DemoBanner({ note }: { note?: string }) {
  return (
    <div style={{
      background: '#141410', color: '#F5F2EB', padding: '0.7rem 1.5rem',
      fontFamily: 'var(--font-mono)', fontSize: '0.72rem', lineHeight: 1.6, letterSpacing: '0.02em',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: '0.5rem', flexWrap: 'wrap', textAlign: 'center',
    }}>
      <span>{note ?? 'Demo data. Allorca is archived and no longer accepts users.'}</span>
      <Link href="/onboarding" style={{ color: '#F5F2EB', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
        Take the survey
      </Link>
    </div>
  )
}
