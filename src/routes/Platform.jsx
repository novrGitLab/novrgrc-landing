import { useState } from 'react'
import { PageHero, CtaBand } from '../components/PageBits'
import { Reveal } from '../components/fx'
import { modules } from '../data/content'

const addOns = [
  { k: 'AI', title: 'AI risk prediction', sub: 'Anomaly detection and remediation suggestions.', preview: ['Flags controls drifting toward failure before they breach', 'Remediations ranked by impact on your risk score', 'Weekly risk forecast per entity (sample data)'] },
  { k: 'Aa', title: 'NLP for regulatory text', sub: 'Automatic analysis of new regulatory language.', preview: ['New amendments auto-summarised in plain language', 'Affected controls mapped in one click', 'Change alerts routed straight to control owners'] },
  { k: 'CC', title: 'Continuous control monitoring', sub: 'Always-on testing of key controls.', preview: ['24/7 control testing across your estate', 'Exceptions open findings automatically', 'Evidence attached without chasing owners'] },
  { k: '⚙', title: 'Low-code / no-code workflows', sub: 'Customise workflows without engineering support.', preview: ['Drag-and-drop approval chains', 'Auto-escalations and reminders', 'Shipped by ops teams — no engineers required'] },
]

export default function Platform() {
  const [on, setOn] = useState({})
  return (
    <>
      <PageHero
        eyebrow="Platform"
        title="Seven modules. One record."
        sub="Risk, compliance, audit, third-party risk, incidents, policy and reporting — all working from the same data. Real-time insights on resilience capability and maturity, at entity and sector level."
      />
      <section style={{ padding: '12px 0 84px' }}>
        <div className="wrap" style={{ maxWidth: 980 }}>
          {modules.map((m, i) => (
            <div key={m.key} className="stack-card" style={{ position: 'sticky', top: 84 + i * 14, marginBottom: 20, zIndex: i + 1 }}>
              <Reveal>
                <div className="glass" style={{ padding: 28, display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 28, alignItems: 'center' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--brand-deep)' }}>
                      0{i + 1} — {m.key.toUpperCase()}
                    </div>
                    <h2 style={{ margin: '8px 0 12px', fontSize: 26 }}>{m.title}</h2>
                    <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--muted)', fontSize: 14, lineHeight: 1.8 }}>
                      {m.bullets.map((b) => <li key={b}>{b}</li>)}
                    </ul>
                  </div>
                  <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid var(--line)', background: '#F8FAFC' }}>
                    <img src={m.image} alt={`${m.title} — NovrGRC`} style={{ width: '100%', height: 'auto', display: 'block', aspectRatio: '16/10', objectFit: 'cover', objectPosition: 'top left' }} loading="lazy" />
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:860px){ .glass[style*="grid-template-columns"]{ grid-template-columns:1fr !important } .stack-card{ position:static !important } }`}</style>
      </section>

      <section style={{ padding: '0 0 84px' }}>
        <div className="wrap" style={{ maxWidth: 980 }}>
          <Reveal><span className="eyebrow-mono">Optional add-ons</span></Reveal>
          <Reveal delay={0.05}>
            <h2 className="display" style={{ fontSize: 'clamp(28px,4vw,44px)', margin: '12px 0 6px' }}>Switch on superpowers.</h2>
            <p style={{ color: 'var(--muted)', margin: '0 0 22px' }}>Paid capabilities. Toggle to preview what each unlocks.</p>
          </Reveal>
          <div className="glass" style={{ padding: 8, overflow: 'hidden' }}>
            {addOns.map((a) => {
              const active = !!on[a.title]
              return (
                <div key={a.title} style={{ borderBottom: '1px solid var(--line)', borderRadius: 12, background: active ? 'var(--mint)' : 'transparent', boxShadow: active ? 'var(--shadow-glow)' : 'none', transition: 'background .25s', marginBottom: 4 }}>
                  <button
                    onClick={() => setOn((s) => ({ ...s, [a.title]: !s[a.title] }))}
                    aria-pressed={active}
                    aria-expanded={active}
                    className="addon-row"
                    style={{
                      width: '100%', display: 'grid', gridTemplateColumns: '56px 1fr 64px', gap: 12,
                      padding: '16px 14px', alignItems: 'center',
                      background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
                      fontFamily: 'inherit', color: 'inherit',
                    }}
                  >
                    <span className="icon icon-sm" style={{ margin: 0 }}>{a.k}</span>
                    <span>
                      <strong style={{ fontSize: 15 }}>{a.title}</strong>
                      <span className="muted" style={{ display: 'block', fontSize: 13, marginTop: 2 }}>{a.sub}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      style={{
                        width: 48, height: 27, borderRadius: 999, position: 'relative', justifySelf: 'end',
                        background: active ? 'var(--brand)' : '#D3DCE2', transition: 'background .25s',
                      }}
                    >
                      <span style={{
                        position: 'absolute', top: 3, left: active ? 24 : 3, width: 21, height: 21,
                        borderRadius: '50%', background: '#fff', transition: 'left .25s',
                        boxShadow: '0 2px 6px rgba(0,0,0,.25)',
                      }} />
                    </span>
                  </button>
                  <div style={{ maxHeight: active ? 260 : 0, overflow: 'hidden', transition: 'max-height .35s var(--ease), opacity .25s', opacity: active ? 1 : 0 }}>
                    <div className="addon-preview" style={{ padding: '0 14px 18px 82px' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.1em', color: 'var(--brand-deep)', marginBottom: 8 }}>UNLOCKS ↓</div>
                      {a.preview.map((p) => (
                        <div key={p} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, padding: '5px 0', lineHeight: 1.5 }}>
                          <span className="check solid" style={{ width: 18, height: 18, fontSize: 10 }}>✓</span>{p}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <style>{`
            @media(max-width:640px){
              .addon-row{ grid-template-columns:40px 1fr 52px !important; gap:10px !important; padding:14px 10px !important; }
              .addon-row .icon-sm{ width:28px !important; height:28px !important; font-size:12px !important; }
              .addon-row strong{ font-size:14px !important; }
              .addon-preview{ padding:0 10px 16px 0 !important; }
            }
          `}</style>
        </div>
      </section>
      <section style={{ padding: '0 0 84px' }}>
        <div className="wrap" style={{ maxWidth: 980 }}>
          <Reveal><span className="eyebrow-mono">Subscription model</span></Reveal>
          <Reveal delay={0.05}>
            <h2 className="display" style={{ fontSize: 'clamp(28px,4vw,44px)', margin: '12px 0 6px' }}>A license that scales with you.</h2>
            <p style={{ color: 'var(--muted)', margin: '0 0 22px' }}>License or subscription — three ways to buy, one platform.</p>
          </Reveal>
          <div className="sub-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {[
              { t: 'User-based', d: 'Fees scale with your seat count — start small, add users as adoption grows.' },
              { t: 'Module-based', d: 'License only the modules you need today — switch on the rest when ready.' },
              { t: 'Enterprise-wide', d: 'Full-platform coverage across every business unit and geography.' },
            ].map((s, i) => (
              <Reveal key={s.t} delay={i * 0.06}>
                <div className="glass" style={{ padding: 24, height: '100%' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--brand-deep)' }}>0{i + 1}</div>
                  <h3 style={{ margin: '8px 0', fontSize: 18 }}>{s.t}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <style>{`@media(max-width:860px){ .sub-grid{ grid-template-columns:1fr !important } }`}</style>
        </div>
      </section>
      <CtaBand title="See the modules in a live demo." />
    </>
  )
}
