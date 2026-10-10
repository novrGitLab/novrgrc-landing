import { useState } from 'react'
import { PageHero } from '../components/PageBits'
import { Reveal } from '../components/fx'
import { Link } from 'react-router-dom'

const offices = [
  { city: 'Lagos, Nigeria', addr: '17 Sunday Adigun Street, Alausa, Ikeja, Lagos', tz: 'WAT (UTC+1)' },
  { city: 'Calgary, Canada', addr: '4625 Varsity Drive NW, Calgary, AB T3A 0Z9', tz: 'MT (UTC−7)' },
]

const inputStyle = { border: '1px solid var(--line)', padding: '12px 14px', borderRadius: 10, fontFamily: 'inherit', fontSize: 14, outline: 'none', background: '#fff', color: 'var(--ink)', width: '100%' }

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', org: '', message: '' })
  const [toast, setToast] = useState('')
  const [done, setDone] = useState(false)
  const [sending, setSending] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (sending) return
    if (!form.name || !form.email) return setToast('Please enter your name and email.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setToast('Please enter a valid email.')
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY
    if (!accessKey) return setToast('Form is not connected yet — please try again later.')
    setSending(true)
    setToast('')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Contact — ${form.org || form.name}`,
          from_name: 'NovrGRC website',
          botcheck: '',
          name: form.name,
          email: form.email,
          organisation: form.org,
          message: form.message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setDone(true)
      } else {
        setToast('Something went wrong sending your message — please try again.')
      }
    } catch {
      setToast('Network error — please check your connection and try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s talk."
        sub="Questions about NovrGRC, partnerships or compliance — reach us in Lagos or Calgary, or send a message below. For a platform walkthrough, request a demo instead."
      />

      <section style={{ padding: '12px 0 84px' }}>
        <div className="wrap">
          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 20, alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Reveal>
                <div className="glass" style={{ padding: 24 }}>
                  <div className="eyebrow-mono" style={{ marginBottom: 14 }}>Direct lines</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5 }}>
                    <a href="tel:+2348098120000" style={{ fontWeight: 600 }}>+234-809-812-0000</a>
                    <a href="tel:+14439853735" style={{ fontWeight: 600 }}>+1-443-985-3735</a>
                    <a href="mailto:grc@cybernovr.com" style={{ fontWeight: 600, color: 'var(--brand-deep)' }}>grc@cybernovr.com</a>
                    <a href="https://wa.me/2348098120000" target="_blank" rel="noreferrer" style={{ fontWeight: 600 }}>WhatsApp →</a>
                  </div>
                </div>
              </Reveal>
              {offices.map((o, i) => (
                <Reveal key={o.city} delay={0.06 * (i + 1)}>
                  <div className="glass" style={{ padding: 24 }}>
                    <div className="eyebrow-mono" style={{ marginBottom: 10 }}>{o.city}</div>
                    <div style={{ fontSize: 14.5, lineHeight: 1.6 }}>{o.addr}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8, fontFamily: 'var(--font-mono)' }}>{o.tz}</div>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={0.2}>
                <div className="glass" style={{ padding: 20, background: 'var(--mint)', borderColor: 'var(--line-strong)' }}>
                  <div style={{ fontSize: 14, lineHeight: 1.6 }}>
                    <strong>Looking for a demo?</strong> A 20-minute walkthrough shaped to your frameworks —{' '}
                    <Link to="/demo" style={{ color: 'var(--brand-deep)', fontWeight: 700 }}>request one here →</Link>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="glass" style={{ padding: 32 }}>
                {!done ? (
                  <form onSubmit={submit} noValidate>
                    <div className="eyebrow-mono" style={{ marginBottom: 18 }}>Send a message</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <label>Full name *<input placeholder="Adaeze Okonkwo" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={{ ...inputStyle, marginTop: 4 }} /></label>
                      <label>Email *<input placeholder="you@organisation.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ ...inputStyle, marginTop: 4 }} /></label>
                      <label>Organisation<input placeholder="Organisation" value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} style={{ ...inputStyle, marginTop: 4 }} /></label>
                      <label>Message<textarea placeholder="How can we help?" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, marginTop: 4, resize: 'vertical' }} /></label>
                      <button type="submit" className="btn-primary" disabled={sending} style={{ border: 'none', width: '100%', marginTop: 4, opacity: sending ? 0.6 : 1 }}>{sending ? 'Sending…' : 'Send message'}</button>
                      {toast && <div style={{ fontSize: 13, color: '#B33737', fontWeight: 600 }}>{toast}</div>}
                      <div style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'center' }}>We use your details only to respond to your enquiry. We don’t share them.</div>
                    </div>
                  </form>
                ) : (
                  <div style={{ textAlign: 'center', padding: '32px 0' }}>
                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--brand)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 800, margin: '0 auto 16px' }}>✓</div>
                    <h2 style={{ margin: '0 0 8px' }}>Message sent.</h2>
                    <p className="muted" style={{ margin: 0 }}>Thanks {form.name.split(' ')[0] || 'there'} — we’ll get back to you within 1 business day.</p>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
          <style>{`@media(max-width:860px){ .contact-grid{ grid-template-columns:1fr !important } }`}</style>
        </div>
      </section>
    </>
  )
}
