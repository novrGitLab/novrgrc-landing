import { useRef, useState } from 'react'
import { PageHero, CtaBand } from '../components/PageBits'
import { Reveal } from '../components/fx'

const roles = [
  ['Risk owners', 'Risk register and taxonomy, qual & quant assessments, KRIs, heatmaps and stress testing.', 'Risk Management'],
  ['Compliance officers', 'Framework repository, Smart Mapping, change tracking and continuous control tests.', 'Compliance Management'],
  ['Auditors', 'Planning and scheduling, automated evidence (AWS, GCP, Azure, endpoints), workpapers and findings.', 'Audit Management'],
  ['Vendor managers', 'Onboarding and due diligence, agentic-AI questionnaires, ratings and contract repository.', 'Third-Party Risk'],
  ['Incident responders', 'Centralised capture, RCA and corrective actions, linked to risks and controls.', 'Incidents'],
  ['Policy owners', 'Lifecycle from draft to acknowledge, templates and automated asset collection.', 'Policy Management'],
  ['Executives & board', 'Real-time dashboards, heatmaps and automated board and regulator reports.', 'Reporting'],
  ['Regulators', 'Sector-wide visibility and reporting on governance, risk and compliance.', 'Oversight'],
]

export default function Solutions() {
  const [side, setSide] = useState(null) // 'reg' | 'sp' | null
  const [open, setOpen] = useState(0)
  const collapseTimer = useRef(null)

  // hover intent: expand immediately, collapse after a beat so the moving
  // boundary can't oscillate under a stationary cursor (flicker)
  const enterSide = (id) => {
    if (collapseTimer.current) clearTimeout(collapseTimer.current)
    setSide(id)
  }
  const leaveSide = () => {
    if (collapseTimer.current) clearTimeout(collapseTimer.current)
    collapseTimer.current = setTimeout(() => setSide(null), 280)
  }

  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Two views. Same platform."
        sub="For service providers — telecoms, banks, fintechs, insurers — and the regulators who oversee them. Managed at organisation level and sector level, in one system. Hover a side to expand it."
      />
      <section style={{ padding: '12px 0 84px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', gap: 12, minHeight: 380, flexDirection: 'row' }} className="splitwrap">
            {[
              {
                id: 'reg', tag: 'FOR REGULATORS', title: 'Oversight without the chase.',
                bg: 'linear-gradient(135deg,var(--dark-band),var(--dark-band-2))', fg: '#fff',
                points: ['Sector-wide visibility of governance, risk and compliance.', 'Real-time dashboards on resilience maturity.', 'Less time collating reports from supervised entities.', 'Strengthens resilience of critical information infrastructure.'],
              },
              {
                id: 'sp', tag: 'FOR SERVICE PROVIDERS', title: 'Automation without the chaos.',
                bg: 'var(--mint)', fg: 'var(--ink)',
                points: ['For telecoms, banks, fintechs and insurers.', 'Automated risk, compliance, audit and policy workflows.', 'Single source of truth with Smart Mapping across frameworks.', 'Improved audit readiness and regulator confidence.'],
              },
            ].map((s) => {
              const grow = side === null ? 1 : side === s.id ? 2.2 : 0.7
              return (
                <div
                  key={s.id}
                  onMouseEnter={() => enterSide(s.id)}
                  onMouseLeave={leaveSide}
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
          <style>{`@media(max-width:900px){ .splitwrap{ flex-direction:column !important } .splitwrap > div{ min-height:300px !important } }`}</style>
        </div>
      </section>

      <section style={{ padding: '0 0 84px' }}>
        <div className="wrap" style={{ maxWidth: 900 }}>
          <Reveal><span className="eyebrow-mono">Inside the platform</span></Reveal>
          <Reveal delay={0.05}>
            <p className="muted" style={{ margin: '10px 0 20px' }}>Risk, compliance, audit and policy — live in one workspace.</p>
          </Reveal>
          <Reveal>
            <div style={{ borderRadius: 18, overflow: 'hidden', border: '1px solid var(--line)', boxShadow: 'var(--shadow)' }}>
              <img src="/dashboard.png" alt="NovrGRC dashboard" style={{ width: '100%', display: 'block' }} draggable={false} />
            </div>
          </Reveal>
          <div className="compare-caps" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 14 }}>
            <div className="glass" style={{ padding: '14px 18px', fontSize: 13, lineHeight: 1.6 }}><strong>Organisation workspace.</strong> <span className="muted">Day-to-day risk, compliance, audit and policy automation.</span></div>
            <div className="glass" style={{ padding: '14px 18px', fontSize: 13, lineHeight: 1.6 }}><strong>Regulator-ready.</strong> <span className="muted">The same record rolls up into sector-wide reporting.</span></div>
          </div>
          <style>{`@media(max-width:640px){ .compare-caps{ grid-template-columns:1fr !important } }`}</style>
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
                    className="role-row"
                    style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 140px 32px', gap: 12, padding: '16px 14px', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', color: 'inherit' }}
                  >
                    <strong style={{ fontSize: 15 }}>{r}</strong>
                    <span className="role-module" style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'right' }}>{m}</span>
                    <span style={{ fontSize: 18, color: 'var(--brand-deep)', transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform .2s' }}>+</span>
                  </button>
                  <div style={{ maxHeight: isOpen ? 140 : 0, overflow: 'hidden', transition: 'max-height .3s var(--ease)' }}>
                    <p className="muted" style={{ margin: '0 14px 16px', fontSize: 14, lineHeight: 1.6 }}><span className="role-module-inline">{m} · </span>{d}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <style>{`.role-module-inline{ display:none } @media(max-width:560px){ .role-row{ grid-template-columns:1fr 32px !important } .role-module{ display:none !important } .role-module-inline{ display:inline } }`}</style>
        </div>
      </section>
      <CtaBand title="See NovrGRC in action." />
    </>
  )
}
