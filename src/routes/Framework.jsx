import { useState } from 'react'
import { PageHero, CtaBand } from '../components/PageBits'
import { Reveal } from '../components/fx'
import { pillars, frameworksSpec, frameworksIntlExamples } from '../data/content'

const pillarCopy = [
  'Strategic direction and overarching policies — governance traced to every control.',
  'Identify, assess, treat and monitor risk with appetite heatmaps, KRIs and stress testing.',
  'Assess once, comply many times — Smart Mapping across every framework in the library.',
  'Centralised capture, root-cause analysis and corrective actions linked to risks and controls.',
  'CISO dashboards, board packs and regulator-defined reports with AI-driven insights.',
]

export default function Framework() {
  const [active, setActive] = useState(2)
  const [std, setStd] = useState('CRF-NCS')

  const goTo = (i) => setActive((i + pillars.length) % pillars.length)

  const p = pillars[active]
  const max = Math.max(...pillars.map((x) => x.h))

  return (
    <>
      <PageHero
        eyebrow="Frameworks"
        title="One platform. Every framework you answer to."
        sub="From CRF-NCS, the CBN Cybersecurity Framework and NDPA to ISO 27001, NIST CSF and PCI DSS — assess once, map everywhere with Smart Mapping. Custom frameworks included."
      />
      <section style={{ padding: '12px 0 48px' }}>
        <div className="wrap pillar-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 32, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {pillars.map((x, i) => (
              <button
                key={x.n}
                onClick={() => goTo(i)}
                aria-current={i === active}
                style={{
                  display: 'grid', gridTemplateColumns: '52px 1fr 32px', gap: 12, alignItems: 'center',
                  padding: '18px 20px', borderRadius: 16, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
                  border: i === active ? '2px solid var(--brand)' : '1px solid var(--line)',
                  background: i === active ? 'var(--mint)' : '#fff', color: 'inherit',
                  boxShadow: i === active ? 'var(--shadow-glow)' : 'var(--shadow-soft)',
                  transition: 'all .25s var(--ease)',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: 'var(--brand-deep)' }}>{x.n}</span>
                <span style={{ fontWeight: 800, fontSize: 16, whiteSpace: 'pre-line', lineHeight: 1.35 }}>{x.label}</span>
                <span aria-hidden="true" style={{
                  width: 30, height: 30, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: i === active ? 'var(--brand)' : 'var(--soft)', color: i === active ? '#fff' : 'var(--muted)',
                  fontWeight: 800, transition: 'all .25s',
                }}>→</span>
              </button>
            ))}
          </div>
          <div style={{ position: 'sticky', top: 100 }}>
            <div className="glass" style={{ padding: 36, textAlign: 'center', minHeight: 480 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--brand-deep)' }}>AREA {p.n} / 05</div>
              <h2 className="display" style={{ fontSize: 'clamp(30px,3.4vw,44px)', margin: '10px 0 14px', whiteSpace: 'pre-line' }}>{p.label}</h2>
              <p className="muted" style={{ lineHeight: 1.65, maxWidth: '46ch', margin: '0 auto 22px' }}>{pillarCopy[active]}</p>
              <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'center', gap: 10, height: 150 }}>
                {pillars.map((x, i) => (
                  <button
                    key={x.n}
                    onClick={() => goTo(i)}
                    aria-label={`Go to area ${x.n}: ${x.label.replace(/\n/g, ' ')}`}
                    aria-current={i === active}
                    title={x.label.replace(/\n/g, ' ')}
                    style={{
                      width: 40, border: 'none', cursor: 'pointer', padding: 0,
                      borderRadius: '8px 8px 0 0', transition: 'all .4s var(--ease)',
                      height: `${(x.h / max) * 100}%`, alignSelf: 'end',
                      background: i === active ? 'linear-gradient(180deg,#8FDCB8,var(--brand))' : 'var(--mint)',
                      boxShadow: i === active ? 'var(--shadow-glow)' : 'none',
                      opacity: i === active ? 1 : 0.55,
                    }}
                  />
                ))}
              </div>
              <div style={{ marginTop: 18, fontSize: 26, fontWeight: 800, color: 'var(--brand-deep)' }} className="ticker-num">{p.h}%</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>
                maturity signal · Mapped to <strong style={{ color: 'var(--brand-deep)' }}>{std}</strong>
              </div>
              <div style={{ marginTop: 12, height: 4, borderRadius: 999, background: 'var(--line)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${((active + 1) / pillars.length) * 100}%`, background: 'var(--brand)', transition: 'width .4s var(--ease)' }} />
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @media(max-width:860px){
            .pillar-grid{ grid-template-columns:1fr !important }
            .pillar-grid > div:last-child{ position:static !important }
          }
        `}</style>
      </section>

      <section style={{ padding: '0 0 84px', textAlign: 'center' }}>
        <div className="wrap" style={{ maxWidth: 860 }}>
          <Reveal>
            <h2 style={{ fontSize: 22, lineHeight: 1.6, fontWeight: 600, margin: 0 }}>
              Aligned to <strong>CRF-NCS</strong>, the <strong>CBN Cybersecurity Framework</strong> (commercial and
              MFBs), <strong>NDPA</strong> and <strong>NCPS</strong> — plus{' '}
              <span style={{ color: 'var(--brand-deep)', fontWeight: 800 }}>international standards and your own custom frameworks</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div style={{ marginTop: 20, display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
              {frameworksSpec.map((s) => (
                <button
                  key={s}
                  onClick={() => setStd(s)}
                  className="chip"
                  style={{ cursor: 'pointer', background: std === s ? 'var(--brand)' : undefined, color: std === s ? '#fff' : undefined, borderColor: std === s ? 'var(--brand)' : undefined }}
                >
                  {s}
                </button>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="muted" style={{ marginTop: 18, fontSize: 14 }}>
              Repository of regulations and standards · Smart Mapping across frameworks · change tracking and impact
              assessment · automated and customised assessments. Also covers {frameworksIntlExamples.join(' · ')}.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div style={{ marginTop: 22, display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'var(--brand-deep)' }}>
              {['Obligations', 'Map controls', 'Test continuously', 'Collect evidence', 'Remediate', 'Report'].map((s, i, a) => (
                <span key={s} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  {s}{i < a.length - 1 && <span aria-hidden="true" style={{ color: 'var(--brand)' }}>→</span>}
                </span>
              ))}
            </div>
            <p className="muted" style={{ marginTop: 10, fontSize: 13 }}>The evidence chain — from regulatory obligation to report.</p>
          </Reveal>
        </div>
      </section>
      <CtaBand title="See the frameworks mapped to your controls." />
    </>
  )
}
