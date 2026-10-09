import { Link } from 'react-router-dom'
import { Reveal } from './fx'

export function PageHero({ eyebrow, title, sub }) {
  return (
    <section className="dotgrid" style={{ padding: 'clamp(48px,8vw,72px) 0 32px', position: 'relative', overflow: 'hidden' }}>
      <div className="wrap" style={{ maxWidth: 820 }}>
        <Reveal><span className="eyebrow-mono">{eyebrow}</span></Reveal>
        <Reveal delay={0.06}>
          <h1 className="display" style={{ fontSize: 'clamp(40px,6vw,72px)', margin: '14px 0 0' }}>{title}</h1>
        </Reveal>
        {sub && (
          <Reveal delay={0.12}>
            <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.65, maxWidth: '60ch', margin: '18px 0 0' }}>{sub}</p>
          </Reveal>
        )}
      </div>
    </section>
  )
}

export function CtaBand({ title = 'See NovrGRC in action.', sub = 'A 20-minute walkthrough tailored to your organisation — provider or regulator, CRF-NCS, CBN, NDPA, NCPS or international.' }) {
  return (
    <section className="grain" style={{ position: 'relative', background: 'linear-gradient(135deg,var(--dark-band),var(--dark-band-2))', color: '#fff', textAlign: 'center', padding: '72px 0' }}>
      <div className="wrap">
        <Reveal>
          <h2 className="display" style={{ fontSize: 'clamp(32px,5vw,60px)', margin: '0 0 12px' }}>{title}</h2>
          <p style={{ color: 'rgba(255,255,255,.82)', margin: '0 0 24px' }}>{sub}</p>
          <Link to="/demo" className="btn-ghost" style={{ background: 'var(--lime)', borderColor: 'var(--lime)', fontWeight: 800 }}>Request a demo →</Link>
        </Reveal>
      </div>
    </section>
  )
}
