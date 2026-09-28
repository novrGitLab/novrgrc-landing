import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { PageHero, CtaBand } from '../components/PageBits'
import { Reveal } from '../components/fx'

const roles = [
  ['Risk owners', 'Register, KRIs with thresholds, appetite heatmaps, scenario testing.', 'Risk Management'],
  ['Compliance officers', 'Cross-framework control mapping, change tracking, automated attestations.', 'Compliance Management'],
  ['Auditors', 'Planning, automated evidence collection, workpapers, findings tracking.', 'Audit Management'],
  ['Vendor managers', 'Onboarding, due diligence, continuous supplier monitoring, contracts.', 'Third-Party Risk'],
  ['Incident responders', 'Capture, root-cause analysis, links to risks and controls, escalation.', 'Incidents'],
  ['Policy owners', 'Draft-to-acknowledge lifecycle, templates, archive.', 'Policy Management'],
  ['Executives & board', 'Real-time dashboards, automated board and regulator reports.', 'Reporting'],
]

export default function Solutions() {
  const [side, setSide] = useState(null) // 'reg' | 'sp' | null
  const [open, setOpen] = useState(0)
  const [split, setSplit] = useState(50)
  const [touched, setTouched] = useState(false)
  const sliderRef = useRef(null)
  const sliderInView = useInView(sliderRef, { once: true, amount: 0.5 })
  const reduceMotion = useReducedMotion()

  // cinematic intro: sweep the divider once to invite a drag
  useEffect(() => {
    if (!sliderInView || touched || reduceMotion) return
    let raf = 0
    const t0 = performance.now()
    const dur = 2400
    const ease = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2)
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / dur)
      setSplit(k < 0.5 ? 50 + ease(k * 2) * 32 : 82 - ease((k - 0.5) * 2) * 32)
      if (k < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [sliderInView, touched, reduceMotion])

  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Two views. Same platform."
        sub="Regulatory, legal and operational requirements — managed at entity level and sector level, in one system. Hover a side to expand it."
      />
      <section style={{ padding: '12px 0 84px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', gap: 12, minHeight: 380, flexDirection: 'row' }} className="splitwrap">
            {[
              {
                id: 'reg', tag: 'FOR REGULATORS', title: 'Oversight without the chase.',
                bg: 'linear-gradient(135deg,var(--dark-band),var(--dark-band-2))', fg: '#fff',
                points: ['Complete visibility of cyber resilience across the sector.', 'Real-time dashboards on provider maturity.', 'Less time collating reports from entities.', 'The regulator’s own CSIRT runs here too.'],
                img: '/ncc-dashboard.png', cap: 'app.novrgrc.com/sector-overview — regulator view',
              },
              {
                id: 'sp', tag: 'FOR SERVICE PROVIDERS', title: 'Automation without the chaos.',
                bg: 'var(--mint)', fg: 'var(--ink)',
                points: ['Automated workflows for risk, compliance and audit.', 'One shared record instead of scattered spreadsheets.', 'Better audit readiness, year round.', 'Return on investment within 12–18 months.'],
                img: '/dashboard.png', cap: 'app.novrgrc.com/dashboard — provider view',
              },
            ].map((s) => {
              const grow = side === null ? 1 : side === s.id ? 2.2 : 0.7
              return (
                <div
                  key={s.id}
                  onMouseEnter={() => setSide(s.id)}
                  onMouseLeave={() => setSide(null)}
                  onClick={() => setSide(side === s.id ? null : s.id)}
                  style={{
                    flex: grow, transition: 'flex .5s var(--ease)', background: s.bg, color: s.fg,
                    borderRadius: 22, padding: 32, cursor: 'pointer', overflow: 'hidden', border: '1px solid var(--line)',
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.14em', opacity: 0.8 }}>{s.tag}</div>
                  <h2 className="display" style={{ fontSize: 'clamp(26px,3vw,38px)', margin: '10px 0 16px' }}>{s.title}</h2>
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 1.9, opacity: side === null || side === s.id ? 1 : 0, transition: 'opacity .3s', whiteSpace: side === s.id || side === null ? 'normal' : 'nowrap' }}>
                    {s.points.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                </div>
              )
            })}
          </div>
          <style>{`@media(max-width:760px){ .splitwrap{ flex-direction:column !important } }`}</style>
        </div>
      </section>

      <section style={{ padding: '0 0 84px' }}>
        <div className="wrap" style={{ maxWidth: 900 }}>
          <Reveal><span className="eyebrow-mono">Regulator view vs provider view</span></Reveal>
          <Reveal delay={0.05}>
            <p className="muted" style={{ margin: '10px 0 20px' }}>Drag the slider to compare the two dashboards.</p>
          </Reveal>
          <Reveal>
            <div style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', border: '1px solid var(--line)', userSelect: 'none' }}>
              <img src="/dashboard.png" alt="Service provider dashboard" style={{ width: '100%', display: 'block' }} draggable={false} />
              <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${100 - split}% 0 0)` }}>
                <img src="/ncc-dashboard.png" alt="Regulator sector overview" style={{ width: '100%', display: 'block' }} draggable={false} />
              </div>
              <div aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, left: `${split}%`, width: 3, background: 'var(--lime)', boxShadow: '0 0 12px rgba(0,0,0,.35)' }} />
              <input
                type="range" min={5} max={95} value={split} onChange={(e) => setSplit(Number(e.target.value))}
                aria-label="Compare regulator and provider views"
                style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'ew-resize', margin: 0 }}
              />
              <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(10,46,34,.85)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '6px 12px', borderRadius: 999 }}>REGULATOR</div>
              <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,.9)', color: 'var(--ink)', fontSize: 11, fontWeight: 700, padding: '6px 12px', borderRadius: 999 }}>PROVIDER</div>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: '0 0 84px' }}>
        <div className="wrap" style={{ maxWidth: 900 }}>
          <Reveal><span className="eyebrow-mono">What each team does</span></Reveal>
          <div className="glass" style={{ marginTop: 18, padding: 8, overflow: 'hidden' }}>
            {roles.map(([r, d, m], i) => {
              const isOpen = open === i
              return (
                <div key={r} style={{ borderBottom: i === roles.length - 1 ? 'none' : '1px solid var(--line)' }}>
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 140px 32px', gap: 12, padding: '16px 14px', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', color: 'inherit' }}
                  >
                    <strong style={{ fontSize: 15 }}>{r}</strong>
                    <span style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'right' }}>{m}</span>
                    <span style={{ fontSize: 18, color: 'var(--brand-deep)', transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform .2s' }}>+</span>
                  </button>
                  <div style={{ maxHeight: isOpen ? 120 : 0, overflow: 'hidden', transition: 'max-height .3s var(--ease)' }}>
                    <p className="muted" style={{ margin: '0 14px 16px', fontSize: 14, lineHeight: 1.6 }}>{d}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <CtaBand title="See NovrGRC in action." />
    </>
  )
}
