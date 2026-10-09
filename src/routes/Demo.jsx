import { useState } from 'react'
import { PageHero } from '../components/PageBits'
import { Reveal } from '../components/fx'

const roles = [
  { t: 'Regulator', d: 'Sector-wide visibility, maturity dashboards, supervisory reporting.' },
  { t: 'Service provider', d: 'Telecom, bank, fintech or insurer — risk, compliance and audit automation.' },
  { t: 'Consulting partner', d: 'Multi-client delivery on one platform.' },
  { t: 'Other', d: 'Something else — tell us in the message.' },
]

const timeline = [
  { w: 'Week 0–1', t: 'Tailored demo', d: 'A 20-minute walkthrough shaped to your frameworks (NCC, CBN, NDPA or international).' },
  { w: 'Week 1–4', t: 'Configured platform', d: 'Your framework, controls and users loaded.' },
  { w: 'Week 4–8', t: 'Training', d: 'Role-based enablement for every team.' },
  { w: 'Week 12', t: 'Go-live', d: 'Live reporting, with an annual maintenance contract.' },
]

const inputStyle = { border: '1px solid var(--line)', padding: '12px 14px', borderRadius: 10, fontFamily: 'inherit', fontSize: 14, outline: 'none', background: '#fff', color: 'var(--ink)', width: '100%' }

export default function Demo() {
  const [step, setStep] = useState(1)
  const [role, setRole] = useState('')
  const [form, setForm] = useState({ name: '', email: '', org: '', message: '' })
  const [toast, setToast] = useState('')
  const [done, setDone] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email) return setToast('Please enter your name and work email.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setToast('Please enter a valid email.')
    setDone(true)
  }

  return (
    <>
      <PageHero
        eyebrow="Get started"
        title="Request access."
        sub="Two quick steps. Tell us who you are, then where to reach you — we'll shape the walkthrough to your frameworks."
      />
      <section style={{ padding: '12px 0 84px' }}>
        <div className="wrap" style={{ maxWidth: 760 }}>
          <Reveal>
            <div className="glass" style={{ padding: 32 }}>
              {!done ? (
                <>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 24, fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                    <span style={{ fontWeight: 700, color: step === 1 ? 'var(--brand-deep)' : 'var(--muted)' }}>01 — ROLE</span>
                    <span style={{ color: 'var(--muted)' }}>→</span>
                    <span style={{ fontWeight: 700, color: step === 2 ? 'var(--brand-deep)' : 'var(--muted)' }}>02 — DETAILS</span>
                  </div>
                  {step === 1 ? (
                    <div>
                      <div className="role-grid2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
                        {roles.map((r) => (
                          <button
                            key={r.t}
                            onClick={() => setRole(r.t)}
                            aria-pressed={role === r.t}
                            style={{
                              padding: 18, borderRadius: 14, textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
                              border: role === r.t ? '2px solid var(--brand)' : '1px solid var(--line)',
                              background: role === r.t ? 'var(--mint)' : '#fff',
                              boxShadow: role === r.t ? 'var(--shadow-glow)' : 'none', color: 'inherit',
                            }}
                          >
                            <strong style={{ fontSize: 15 }}>{r.t}</strong>
                            <span className="muted" style={{ display: 'block', fontSize: 13, marginTop: 4 }}>{r.d}</span>
                          </button>
                        ))}
                      </div>
                      <button className="btn-primary" disabled={!role} onClick={() => role && setStep(2)} style={{ marginTop: 20, opacity: role ? 1 : 0.45, border: 'none', width: '100%' }}>
                        Continue →
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={submit} noValidate>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div style={{ fontSize: 13, color: 'var(--muted)' }}>Requesting as: <strong style={{ color: 'var(--ink)' }}>{role}</strong> <button type="button" onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: 'var(--brand-deep)', cursor: 'pointer', fontWeight: 700 }}>change</button></div>
                        <label>Full name *<input placeholder="Adaeze Okonkwo" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={{ ...inputStyle, marginTop: 4 }} /></label>
                        <label>Work email *<input placeholder="you@organisation.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ ...inputStyle, marginTop: 4 }} /></label>
                        <label>Organisation<input placeholder="Organisation" value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} style={{ ...inputStyle, marginTop: 4 }} /></label>
                        <label>What are you looking to solve?<textarea placeholder="Message" rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, marginTop: 4, resize: 'vertical' }} /></label>
                        <button type="submit" className="btn-primary" style={{ border: 'none', width: '100%', marginTop: 4 }}>Request a demo</button>
                        {toast && <div style={{ fontSize: 13, color: '#B33737', fontWeight: 600 }}>{toast}</div>}
                        <div style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'center' }}>By submitting, you agree to our data processing for demo scheduling. We don't share your details.</div>
                      </div>
                    </form>
                  )}
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '24px 0', animation: 'pulse-soft 2s ease infinite' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--brand)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 800, margin: '0 auto 16px' }}>✓</div>
                  <h2 style={{ margin: '0 0 8px' }}>Request received.</h2>
                  <p className="muted" style={{ margin: 0 }}>Thanks {form.name.split(' ')[0] || 'there'} — we'll be in touch within 1 business day.</p>
                </div>
              )}
            </div>
          </Reveal>
          <style>{`@keyframes pulse-soft{0%,100%{transform:scale(1)}50%{transform:scale(1.015)}} @media(max-width:640px){ .role-grid2{ grid-template-columns:1fr !important } }`}</style>
        </div>
      </section>

      <section style={{ padding: '0 0 84px' }}>
        <div className="wrap" style={{ maxWidth: 760 }}>
          <Reveal><span className="eyebrow-mono">12 weeks to go-live</span></Reveal>
          <div style={{ marginTop: 20, display: 'grid', gap: 0 }}>
            {timeline.map((t, i) => (
              <Reveal key={t.t} delay={i * 0.05}>
                <div style={{ display: 'grid', gridTemplateColumns: '96px 1fr', gap: 16, padding: '18px 0', borderBottom: i === timeline.length - 1 ? 'none' : '1px solid var(--line)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--brand-deep)', fontWeight: 700 }}>{t.w}</div>
                  <div>
                    <strong>{t.t}</strong>
                    <div className="muted" style={{ fontSize: 14, marginTop: 2 }}>{t.d}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div style={{ marginTop: 18, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <span className="chip">SaaS or on-prem</span><span className="chip">99.9% SLA</span><span className="chip">NCC · CBN · NDPA + internationals</span>
          </div>
        </div>
      </section>
    </>
  )
}
