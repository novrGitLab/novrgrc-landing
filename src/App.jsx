import { useState, useEffect } from 'react'

const outcomes = [
  'Single source of truth across service provider and sector levels.',
  'Less time spent on compliance reporting.',
  'Better audit readiness across the year.',
  'Easier adoption of the sector framework (NCS-CRF).',
  'Return on investment within 12–18 months.',
  'Full visibility of sector-wide cyber resilience.',
]

const explore = [
  { title: 'Framework', desc: 'Built around five pillars of cyber resilience.', id: 'framework' },
  { title: 'Platform', desc: 'Seven modules working from one shared record.', id: 'platform' },
  { title: 'Solutions', desc: 'Two views of the same platform, by role.', id: 'solutions' },
  { title: 'Security', desc: 'Access control, encryption and open integrations.', id: 'security' },
  { title: 'Get started', desc: 'What you get, and how to request a demo.', id: 'start' },
]

const pillars = [
  { label: 'Governance,\nrisk & compliance', h: '62%' },
  { label: 'Risk\nmanagement', h: '78%' },
  { label: 'Cybersecurity\nposture', h: '96%' },
  { label: 'Incident response\n& resilience', h: '72%' },
  { label: 'Capacity\nbuilding', h: '58%' },
]

const modules = [
  { key: 'Risk', title: 'Risk Management', image: '/risk-register.png', bullets: ['Unified taxonomy: strategic, operational, IT, third-party', 'Qualitative and quantitative assessments', 'Treatment workflows and KRIs with alerts', 'Appetite framework and heatmaps', 'Scenario planning and stress testing'] },
  { key: 'Compliance', title: 'Compliance Management', image: '/control-library.png', bullets: ['Library of regulations and standards', 'Cross-framework control mapping', 'Regulatory change tracking', 'Automated assessments and attestations', 'Continuous control testing'] },
  { key: 'Audit', title: 'Audit Management', image: '/audit.png', bullets: ['Planning and scheduling', 'Automated evidence collection', 'Workpapers with version control', 'Findings and remediation tracking', 'Reports for boards and regulators'] },
  { key: 'Third-party', title: 'Third-Party Risk', image: '/license.png', bullets: ['Vendor onboarding and due diligence', 'Assessment questionnaires', 'External rating integration', 'Continuous supplier monitoring', 'Contract repository'] },
  { key: 'Incidents', title: 'Incident & Issue Management', image: '/governance.png', bullets: ['Central capture and categorisation', 'Root cause analysis & corrective actions', 'Links to risks, controls, requirements', 'Automated escalation'] },
  { key: 'Policy', title: 'Policy Management', image: '/reports.png', bullets: ['Draft-to-acknowledge lifecycle', 'Standard and custom templates', 'Archive of retired policies', 'Import from spreadsheets and APIs'] },
  { key: 'Reporting', title: 'Reporting & Analytics', image: '/dashboard.png', bullets: ['Real-time role-based dashboards', 'Risk and compliance heatmaps', 'Automated board and regulator reports', 'Predictive insights (add-on)'] },
]

const addOns = [
  { k: 'AI', title: 'AI risk prediction', sub: 'Anomaly detection and remediation suggestions.' },
  { k: 'Aa', title: 'NLP for regulatory text', sub: 'Automatic analysis of new regulatory language.' },
  { k: 'CC', title: 'Continuous control monitoring', sub: '' },
  { k: '⚙', title: 'Low-code workflow builder', sub: 'Customise workflows without engineering support.' },
]

const roles = [
  ['Risk owners', 'Register, KRIs with thresholds, appetite heatmaps, scenario testing.', 'Risk Management', ''],
  ['Compliance officers', 'Cross-framework control mapping, change tracking, automated attestations.', 'Compliance Management', ''],
  ['Auditors', 'Planning, automated evidence collection, workpapers, findings tracking.', 'Audit Management', ''],
  ['Vendor managers', 'Onboarding, due diligence, continuous supplier monitoring, contracts.', 'Third-Party Risk', 'Paid add-on'],
  ['Incident responders', 'Capture, root-cause analysis, links to risks and controls, escalation.', 'Incidents', ''],
  ['Policy owners', 'Draft-to-acknowledge lifecycle, templates, archive.', 'Policy Management', ''],
  ['Executives & board', 'Real-time dashboards, automated board and regulator reports.', 'Reporting', 'Paid add-on'],
]

const secCards = [
  ['Access', 'Role-based access control. Granular permissions. Segregation of duties.'],
  ['Data protection', 'Encryption in transit and at rest. Aligned with GDPR and NDPA.'],
  ['Records', 'Full activity logging. Tamper-proof records for verification.'],
  ['Deployment', 'Cloud SaaS, with an on-prem option. 99.9% uptime SLA.'],
  ['Interface', 'Modern interface. Configurable dashboards by role.'],
  ['Access anywhere', 'Mobile-friendly access.'],
]

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function App() {
  const [active, setActive] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [tab, setTab] = useState(0)
  const [seg, setSeg] = useState('reg')
  const [toast, setToast] = useState('')
  const [lightbox, setLightbox] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', org: '', role: '', type: 'Organisation type', message: '' })

  const nav = [
    { id: 'framework', label: 'Framework' },
    { id: 'platform', label: 'Platform' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'security', label: 'Security' },
  ]

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 })
    ;['home', 'framework', 'platform', 'solutions', 'security', 'start'].forEach(id => {
      const el = document.getElementById(id); if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e) => { if (e.key === 'Escape') setLightbox(null) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [lightbox])

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2600) }

  const handleDemoSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email) return showToast('Please enter your name and work email.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return showToast('Please enter a valid email.')
    showToast('Thanks — we’ll be in touch within 1 business day.')
    setForm({ name: '', email: '', org: '', role: '', type: 'Organisation type', message: '' })
  }

  return (
    <>
      <header className="site-header">
        <div className="navrow" style={{ position: 'relative' }}>
          <div className="wordmark" onClick={() => scrollTo('home')}>Novr<span>GRC</span></div>
          <nav className="navlinks">
            {nav.map(n => (
              <a key={n.id} className={active === n.id ? 'active' : ''} onClick={() => scrollTo(n.id)}>{n.label}</a>
            ))}
          </nav>
          <div className="nav-cta">
            <button className="btn btn-blue hide-m" onClick={() => scrollTo('start')}>Request a demo</button>
            <button className="hamburger" aria-label="Menu" onClick={() => setMobileOpen(v => !v)}>
              <span style={{ fontSize: 18, lineHeight: 1 }}>{mobileOpen ? '✕' : '☰'}</span>
            </button>
          </div>
          <div className={`mob-menu ${mobileOpen ? 'open' : ''}`}>
            {nav.map(n => <a key={n.id} onClick={() => { scrollTo(n.id); setMobileOpen(false) }}>{n.label}</a>)}
            <button className="btn btn-blue" onClick={() => { scrollTo('start'); setMobileOpen(false) }}>Request a demo</button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="section" style={{ paddingTop: 72, textAlign: 'center' }}>
        <div className="wrap" style={{ maxWidth: 760 }}>
          <div className="eyebrow">Governance, risk & compliance</div>
          <h1 className="hero-title">See cyber resilience across the whole sector.</h1>
          <p className="hero-sub">
            A multi-tenant GRC platform for monitoring and reporting compliance. Service providers automate risk, compliance and audit — and the regulator sees the result across the sector.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-blue" onClick={() => scrollTo('start')}>Request a demo</button>
            <button className="btn btn-outline" onClick={() => scrollTo('framework')}>See the framework</button>
          </div>
        </div>

        <div className="wrap" style={{ marginTop: 40 }}>
          <div className="browser reveal" style={{ maxWidth: 860, margin: '0 auto', boxShadow: '0 28px 64px -20px rgba(16,24,40,.24), 0 10px 24px -12px rgba(16,24,40,.18)', border: '1px solid #DDE1E8' }}>
            <div className="browser-bar" style={{ background: '#F1F3F6', borderBottom: '1px solid #DDE1E8' }}><span className="dot" style={{ background: '#FF5F57' }} /><span className="dot" style={{ background: '#FFBD2E' }} /><span className="dot" style={{ background: '#28CA42' }} /><span style={{ marginLeft: 12, fontSize: 11, color: '#8A94A6', fontWeight: 600 }}>app.novrgrc.com/dashboard — Sector overview</span></div>
            <div onClick={() => setLightbox('/dashboard.png')} style={{ position: 'relative', cursor: 'zoom-in', overflow: 'hidden', background: '#F8FAFC' }}>
              <img src="/dashboard.png" alt="NovrGRC dashboard — sector resilience overview" style={{ width: '100%', height: 'auto', display: 'block', imageRendering: '-webkit-optimize-contrast' }} loading="eager" />
              <span style={{ position: 'absolute', right: 12, bottom: 12, background: 'rgba(14,21,38,.82)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '6px 10px', borderRadius: 999, backdropFilter: 'blur(6px)' }}>Click to expand ↗</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ padding: '36px 0' }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <div className="muted" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 28 }}>Trusted by — regulator, operators & interconnect</div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 56, flexWrap: 'wrap' }}>
            <a href="https://ncc.gov.ng" target="_blank" rel="noopener noreferrer" aria-label="NCC — Nigerian Communications Commission">
              <img src="https://ngfrepository.org.ng:8443/retrieve/02b0087e-4b32-4d71-9a2a-d1e1601d3452" alt="NCC — Nigerian Communications Commission" style={{ height: 72, width: 'auto', maxWidth: 260, objectFit: 'contain', display: 'block' }} loading="lazy" onError={e => { e.currentTarget.src = '/logos/ncc-repository.png' }} />
            </a>
            <a href="https://www.gloworld.com" target="_blank" rel="noopener noreferrer" aria-label="Glo — Globacom">
              <img src="https://www.gloworld.com/logo.png" alt="Glo — Globacom" style={{ height: 64, width: 'auto', maxWidth: 220, objectFit: 'contain', display: 'block' }} loading="lazy" onError={e => { e.currentTarget.src = '/logos/glo.png'; e.currentTarget.style.height = '64px' }} />
            </a>
            <a href="https://www.routelinkgroup.com" target="_blank" rel="noopener noreferrer" aria-label="Routelink Group">
              <img src="https://www.routelinkgroup.com/routelink-group-image.png" alt="Routelink Group" style={{ height: 68, width: 'auto', maxWidth: 320, objectFit: 'contain', display: 'block' }} loading="lazy" onError={e => { e.currentTarget.src = '/logos/routelink.png' }} />
            </a>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="wrap">
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 40px' }}>
            <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-.02em', margin: 0 }}>Two levels, one platform.</h2>
            <p className="muted" style={{ marginTop: 10, fontSize: 15 }}>Entity-level automation, sector-level insight — without duplicate work.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
            {[
              { n: '01', t: 'Sector level', d: 'Real-time dashboards on the maturity and resilience of service providers and the sector as a whole.' },
              { n: '02', t: 'Service provider level', d: 'Automated workflows for day-to-day risk, compliance and audit work.' },
              { n: '03', t: 'Regulator CSIRT', d: 'The regulator’s own CSIRT can run its GRC programme on the same platform.' },
            ].map(c => (
              <div key={c.t} className="card">
                <div className="icon">{c.n}</div>
                <h3 style={{ fontSize: 16, margin: '0 0 8px', fontWeight: 800 }}>{c.t}</h3>
                <p className="muted" style={{ fontSize: 14, lineHeight: 1.6 }}>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 36px' }}>
            <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-.02em', margin: 0 }}>Outcomes that matter.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
            {outcomes.map(t => (
              <div key={t} className="card" style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '18px 18px' }}>
                <span className="check solid">✓</span>
                <span style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.5 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="wrap">
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 36px' }}>
            <h2 style={{ fontSize: 30, fontWeight: 800, margin: 0 }}>Explore NovrGRC.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
            {explore.map(e => (
              <div key={e.title} className="card" style={{ cursor: 'pointer' }} onClick={() => scrollTo(e.id)}>
                <h3 style={{ fontSize: 18, margin: '0 0 8px', fontWeight: 800 }}>{e.title}</h3>
                <p className="muted" style={{ fontSize: 13, marginBottom: 14, lineHeight: 1.5 }}>{e.desc}</p>
                <span style={{ color: 'var(--blue)', fontWeight: 700, fontSize: 13 }}>Learn more →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section blueband" style={{ textAlign: 'center', padding: '56px 0' }}>
        <div className="wrap">
          <h2 style={{ fontSize: 34, color: '#fff', margin: '0 0 20px', fontWeight: 800, letterSpacing: '-.02em' }}>See NovrGRC in action.</h2>
          <p style={{ color: 'rgba(255,255,255,.85)', margin: '0 0 22px', fontSize: 15 }}>A 20-minute walkthrough tailored to your role — regulator or provider.</p>
          <button className="btn btn-white" onClick={() => scrollTo('start')}>Request a demo</button>
        </div>
      </section>

      {/* FRAMEWORK */}
      <section id="framework" className="section" style={{ textAlign: 'center' }}>
        <div className="wrap" style={{ maxWidth: 700 }}>
          <div className="eyebrow">Framework</div>
          <h2 style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-.03em', margin: '0 0 10px', lineHeight: 1.15 }}>Built around five pillars of resilience.</h2>
          <p className="muted" style={{ fontSize: 15, lineHeight: 1.6 }}>A process-based model that runs through governance, risk management, security posture, incident response and capability building.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="browser" style={{ padding: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 14, height: 190, alignItems: 'end', marginBottom: 18 }}>
              {pillars.map(p => (
                <div key={p.label} style={{ background: 'linear-gradient(180deg,#8FDCB8,var(--blue))', height: p.h, borderRadius: '10px 10px 0 0', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.4)' }} />
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 14, textAlign: 'center', fontSize: 11, fontWeight: 700, color: 'var(--muted)', marginBottom: 18, lineHeight: 1.35 }}>
              {pillars.map(p => <div key={p.label} style={{ whiteSpace: 'pre-line' }}>{p.label}</div>)}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 520, margin: '0 auto' }}>
              <div style={{ background: 'var(--soft)', padding: 10, textAlign: 'center', fontSize: 12, fontWeight: 700, borderRadius: 8, border: '1px solid var(--line)' }}>Resilience objectives</div>
              <div style={{ background: 'var(--soft)', padding: 10, textAlign: 'center', fontSize: 12, fontWeight: 700, borderRadius: 8, width: '85%', margin: '0 auto', border: '1px solid var(--line)' }}>Resilience standards</div>
              <div style={{ background: 'var(--soft)', padding: 10, textAlign: 'center', fontSize: 12, fontWeight: 700, borderRadius: 8, width: '70%', margin: '0 auto', border: '1px solid var(--line)' }}>Resilience guidelines</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section soft" style={{ padding: '36px 0' }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
          <div className="card"><p style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}>Workflows for risk, compliance and audit follow the framework structure directly.</p></div>
          <div className="card"><p style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}>Assessment and adoption is built to be straightforward for service providers.</p></div>
          <div className="card"><p style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}>Regulators get a live read on maturity across every regulated entity.</p></div>
        </div>
      </section>

      <section className="section" style={{ textAlign: 'center', padding: '40px 0 20px' }}>
        <div className="wrap" style={{ maxWidth: 740 }}>
          <h2 style={{ fontSize: 22, lineHeight: 1.6, fontWeight: 600, margin: 0 }}>
            Built around the sector’s own <strong>NCS-CRF</strong> framework. Also used to report against <span style={{ color: 'var(--blue)', fontWeight: 800 }}>the national standard</span>, ISO 27001, NIST Cybersecurity Framework, PCI DSS, other international standards, and custom frameworks.
          </h2>
          <div style={{ marginTop: 18, display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['NCS-CRF', 'NDPA', 'NCPS', 'ISO 27001', 'NIST CSF', 'PCI DSS', 'Custom'].map(s => (
              <span key={s} className="chip">{s}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section blueband" style={{ textAlign: 'center', padding: '48px 0' }}>
        <div className="wrap">
          <h2 style={{ fontSize: 28, color: '#fff', margin: '0 0 18px', fontWeight: 800 }}>See the framework mapped to your controls.</h2>
          <button className="btn btn-white" onClick={() => scrollTo('start')}>Request a demo</button>
        </div>
      </section>

      {/* PLATFORM */}
      <section id="platform" className="section" style={{ textAlign: 'center', paddingBottom: 24 }}>
        <div className="wrap" style={{ maxWidth: 700 }}>
          <div className="eyebrow">Platform</div>
          <h2 style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-.02em', margin: '0 0 10px' }}>Seven modules. One platform.</h2>
          <p className="muted" style={{ fontSize: 15 }}>Risk, compliance, audit, third-party risk, incidents, policy and reporting — all working from the same underlying data.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 28 }}>
            {modules.map((m, i) => (
              <button key={m.key} className={`tabbtn ${i === tab ? 'active' : ''}`} onClick={() => setTab(i)}>{m.key}</button>
            ))}
          </div>
          <div>
            {modules.map((m, i) => (
              <div key={m.key} className={`tabpanel ${i === tab ? 'active' : ''}`}>
                <div>
                  <h3 style={{ fontSize: 22, margin: '0 0 14px', fontWeight: 800 }}>{m.title}</h3>
                  {m.bullets.map(b => (
                    <div key={b} style={{ fontSize: 13, padding: '7px 0', display: 'flex', gap: 10, lineHeight: 1.5 }}>
                      <span className="check">✓</span>{b}
                    </div>
                  ))}
                </div>
                <div className="browser" style={{ overflow: 'hidden', boxShadow: '0 22px 48px -18px rgba(16,24,40,.22), 0 8px 20px -12px rgba(16,24,40,.14)', border: '1px solid #DDE1E8', borderRadius: 16 }}>
                  <div className="browser-bar" style={{ background: '#F1F3F6', borderBottom: '1px solid #DDE1E8' }}><span className="dot" style={{ background: '#FF5F57' }} /><span className="dot" style={{ background: '#FFBD2E' }} /><span className="dot" style={{ background: '#28CA42' }} /><span style={{ marginLeft: 12, fontSize: 11, color: '#6B7688', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{`app.novrgrc.com/${m.key.toLowerCase().replace(' ', '-')}`}</span></div>
                  <div onClick={() => setLightbox(m.image)} style={{ position: 'relative', cursor: 'zoom-in', overflow: 'hidden', background: '#F8FAFC', aspectRatio: '16/10' }}>
                    <img src={m.image} alt={`${m.title} — NovrGRC`} style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', objectPosition: 'top left', imageRendering: '-webkit-optimize-contrast', transition: 'transform .45s ease' }} loading="lazy" onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                    <span style={{ position: 'absolute', right: 10, bottom: 10, background: 'rgba(14,21,38,.78)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '5px 9px', borderRadius: 999, backdropFilter: 'blur(6px)', pointerEvents: 'none' }}>Expand ↗</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="wrap">
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 24px' }}><h2 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>Optional add-ons.</h2><p className="muted" style={{ fontSize: 13, marginTop: 6 }}>Paid capabilities you can switch on when you need them.</p></div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <table>
              <tbody>
                {addOns.map(a => (
                  <tr key={a.title}>
                    <td style={{ width: 56 }}><div className="icon icon-sm" style={{ margin: 0 }}>{a.k}</div></td>
                    <td><strong style={{ fontSize: 14 }}>{a.title}</strong>{a.sub && <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>{a.sub}</div>}</td>
                    <td style={{ textAlign: 'right' }}><span className="chip">Paid</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section blueband" style={{ textAlign: 'center', padding: '48px 0' }}>
        <div className="wrap">
          <h2 style={{ fontSize: 28, color: '#fff', margin: '0 0 18px', fontWeight: 800 }}>See the modules in a live demo.</h2>
          <button className="btn btn-white" onClick={() => scrollTo('start')}>Request a demo</button>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section id="solutions" className="section" style={{ textAlign: 'center', paddingBottom: 20 }}>
        <div className="wrap" style={{ maxWidth: 700 }}>
          <div className="eyebrow">Solutions</div>
          <h2 style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-.02em', margin: '0 0 10px' }}>Two views of the same platform.</h2>
          <p className="muted" style={{ fontSize: 15 }}>Regulatory, legal and operational requirements, managed at entity level and sector level, in one system.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0, textAlign: 'center' }}>
        <div className="wrap">
          <div className="seg" role="tablist">
            <button className={`segbtn ${seg === 'reg' ? 'active' : ''}`} onClick={() => setSeg('reg')}>For regulators</button>
            <button className={`segbtn ${seg === 'sp' ? 'active' : ''}`} onClick={() => setSeg('sp')}>For service providers</button>
          </div>

          <div className={`solview ${seg === 'reg' ? 'active' : ''}`} style={{ textAlign: 'left', marginTop: 28 }}>
            <div className="numlist">
              <div><span className="check solid">✓</span>Complete visibility of cyber resilience across the sector.</div>
              <div><span className="check solid">✓</span>Real-time dashboards on service-provider maturity.</div>
              <div><span className="check solid">✓</span>Higher confidence in oversight decisions.</div>
              <div><span className="check solid">✓</span>Less time spent collating reports from entities.</div>
              <div><span className="check solid">✓</span>The regulator’s own CSIRT can run its GRC work here too.</div>
            </div>
            <div className="browser" style={{ overflow: 'hidden', boxShadow: '0 22px 48px -18px rgba(16,24,40,.22), 0 8px 20px -12px rgba(16,24,40,.14)', border: '1px solid #DDE1E8', borderRadius: 16 }}>
              <div className="browser-bar" style={{ background: '#F1F3F6', borderBottom: '1px solid #DDE1E8' }}><span className="dot" style={{ background: '#FF5F57' }} /><span className="dot" style={{ background: '#FFBD2E' }} /><span className="dot" style={{ background: '#28CA42' }} /><span style={{ marginLeft: 12, fontSize: 11, color: '#6B7688', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>app.novrgrc.com/sector-overview — NCC regulator view</span></div>
              <div onClick={() => setLightbox('/ncc-dashboard.png')} style={{ position: 'relative', cursor: 'zoom-in', overflow: 'hidden', background: '#F8FAFC', aspectRatio: '16/10.2' }}>
                <img src="/ncc-dashboard.png" alt="NCC Sector overview — regulator view (Image 1)" style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', objectPosition: 'top left', imageRendering: '-webkit-optimize-contrast', transition: 'transform .45s ease' }} loading="lazy" onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                <span style={{ position: 'absolute', right: 10, bottom: 10, background: 'rgba(14,21,38,.78)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '5px 9px', borderRadius: 999, backdropFilter: 'blur(6px)', pointerEvents: 'none' }}>Expand ↗</span>
              </div>
            </div>
          </div>

          <div className={`solview ${seg === 'sp' ? 'active' : ''}`} style={{ textAlign: 'left', marginTop: 28 }}>
            <div className="numlist">
              <div><span className="check solid">✓</span>Automated workflows for risk, compliance and audit.</div>
              <div><span className="check solid">✓</span>One shared record instead of scattered spreadsheets.</div>
              <div><span className="check solid">✓</span>Less time spent on compliance reporting.</div>
              <div><span className="check solid">✓</span>Better audit readiness, year round.</div>
              <div><span className="check solid">✓</span>Return on investment within 12–18 months <span className="chip green" style={{ marginLeft: 6 }}>Target</span></div>
            </div>
            <div className="browser" style={{ overflow: 'hidden', boxShadow: '0 22px 48px -18px rgba(16,24,40,.22), 0 8px 20px -12px rgba(16,24,40,.14)', border: '1px solid #DDE1E8', borderRadius: 16 }}>
              <div className="browser-bar" style={{ background: '#F1F3F6', borderBottom: '1px solid #DDE1E8' }}><span className="dot" style={{ background: '#FF5F57' }} /><span className="dot" style={{ background: '#FFBD2E' }} /><span className="dot" style={{ background: '#28CA42' }} /><span style={{ marginLeft: 12, fontSize: 11, color: '#6B7688', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>app.novrgrc.com/dashboard — Service provider view</span></div>
              <div onClick={() => setLightbox('/dashboard.png')} style={{ position: 'relative', cursor: 'zoom-in', overflow: 'hidden', background: '#F8FAFC', aspectRatio: '16/10.2' }}>
                <img src="/dashboard.png" alt="Service provider dashboard" style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', objectPosition: 'top left', imageRendering: '-webkit-optimize-contrast', transition: 'transform .45s ease' }} loading="lazy" onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                <span style={{ position: 'absolute', right: 10, bottom: 10, background: 'rgba(14,21,38,.78)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '5px 9px', borderRadius: 999, backdropFilter: 'blur(6px)', pointerEvents: 'none' }}>Expand ↗</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="wrap">
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 24px' }}><h2 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>What each team does.</h2></div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <table>
              <tbody>
                {roles.map(([r, d, m, chip], i) => (
                  <tr key={r}>
                    <td style={{ width: 170, fontWeight: 700, fontSize: 13, borderBottom: i === roles.length - 1 ? 'none' : undefined }}>{r}</td>
                    <td className="muted" style={{ fontSize: 13, borderBottom: i === roles.length - 1 ? 'none' : undefined }}>{d}</td>
                    <td style={{ textAlign: 'right', whiteSpace: 'nowrap', borderBottom: i === roles.length - 1 ? 'none' : undefined }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>{m}</div>
                      {chip && <span className="chip" style={{ marginTop: 4 }}>{chip}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section blueband" style={{ textAlign: 'center', padding: '48px 0' }}>
        <div className="wrap">
          <h2 style={{ fontSize: 28, color: '#fff', margin: '0 0 18px', fontWeight: 800 }}>See NovrGRC in action.</h2>
          <button className="btn btn-white" onClick={() => scrollTo('start')}>Request a demo</button>
        </div>
      </section>

      {/* SECURITY */}
      <section id="security" className="section" style={{ textAlign: 'center', paddingBottom: 24 }}>
        <div className="wrap" style={{ maxWidth: 700 }}>
          <div className="eyebrow">Security & integrations</div>
          <h2 style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-.02em', margin: '0 0 10px' }}>Built for regulated environments.</h2>
          <p className="muted" style={{ fontSize: 14 }}>Hardened for the realities of telecoms, finance and critical infrastructure oversight.</p>
        </div>
      </section>

      <section className="section soft" style={{ paddingTop: 24 }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {secCards.map(([k, v]) => (
            <div key={k} className="card">
              <h3 style={{ fontSize: 15, margin: '0 0 8px', fontWeight: 800 }}>{k}</h3>
              <p className="muted" style={{ fontSize: 13, lineHeight: 1.6, margin: 0 }}>{v}</p>
            </div>
          ))}
        </div>

      </section>

      <section className="section">
        <div className="wrap">
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 24px' }}><h2 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>Integrations.</h2></div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14, maxWidth: 640, margin: '0 auto' }}>
            {[
              ['Open APIs', 'For third-party integrations'],
              ['SSO', 'Enterprise identity providers'],
              ['System connectors', 'ERP, HR, ITSM, SIEM, IAM'],
              ['Threat intelligence feeds', 'Regulatory data sharing'],
            ].map(([t, s]) => (
              <div key={t} className="card">
                <div style={{ fontSize: 14, fontWeight: 700 }}>{t}</div>
                <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section blueband" style={{ textAlign: 'center', padding: '48px 0' }}>
        <div className="wrap">
          <h2 style={{ fontSize: 28, color: '#fff', margin: '0 0 18px', fontWeight: 800 }}>See how it fits your stack.</h2>
          <button className="btn btn-white" onClick={() => scrollTo('start')}>Request a demo</button>
        </div>
      </section>

      {/* GET STARTED */}
      <section id="start" className="section">
        <div className="wrap" style={{ textAlign: 'center', marginBottom: 36 }}>
          <div className="eyebrow">Get started</div>
          <h2 style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-.02em', margin: '0 0 10px' }}>Request a demo.</h2>
          <p className="muted" style={{ fontSize: 14 }}>Tell us about your organisation and we’ll shape the walkthrough to your framework.</p>
        </div>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
          <div>
            <h3 style={{ fontSize: 12, letterSpacing: '.08em', color: 'var(--muted)', margin: '0 0 12px', textTransform: 'uppercase' }}>Delivered</h3>
            <div style={{ fontSize: 14, lineHeight: 1.9, marginBottom: 24, color: 'var(--ink)' }}>
              Platform configured to your framework<br />Implementation plan<br />Training plan<br />Annual maintenance contract
            </div>
            <h3 style={{ fontSize: 12, letterSpacing: '.08em', color: 'var(--muted)', margin: '0 0 12px', textTransform: 'uppercase' }}>Supported</h3>
            <div style={{ fontSize: 14, lineHeight: 1.9, color: 'var(--ink)' }}>
              Deployment, migration and training services<br />Best-practice templates and accelerators<br />Ongoing regulatory and product updates<br />12 weeks to go-live from contract execution
            </div>
            <div style={{ marginTop: 24, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <span className="chip">SaaS or on-prem</span><span className="chip">99.9% SLA</span><span className="chip">Sponsored Tiers 2 & 3</span>
            </div>
          </div>
          <form className="card" onSubmit={handleDemoSubmit} noValidate>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input placeholder="Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} />
              <input placeholder="Work email *" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} />
              <input placeholder="Organisation" value={form.org} onChange={e => setForm({ ...form, org: e.target.value })} style={inputStyle} />
              <input placeholder="Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} style={inputStyle} />
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} style={{ ...inputStyle, color: form.type === 'Organisation type' ? 'var(--muted)' : 'var(--ink)' }}>
                <option>Organisation type</option><option>Regulator</option><option>Service provider</option><option>Consulting Partner</option><option>Other</option>
              </select>
              <textarea placeholder="Message — what are you looking to solve?" rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} />
              <button type="submit" className="btn btn-blue" style={{ width: '100%', marginTop: 4 }}>Request a demo</button>
              <div style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'center', lineHeight: 1.5 }}>By submitting, you agree to our data processing for demo scheduling. We don’t share your details.</div>
            </div>
          </form>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="fcols">
            <div>
              <h3>NovrGRC</h3>
              <div>By CyberNovr Limited</div>
              <a href="https://cybernovr.com/isms" target="_blank" rel="noopener noreferrer" aria-label="ISO 27001 Certified — cybernovr.com/isms" style={{ display: 'block', marginTop: 16 }}>
                <img src="/iso/iso-27001.webp" alt="ISO 27001 Certified" style={{ width: '100%', maxWidth: 168, height: 'auto', display: 'block', background: 'transparent' }} loading="lazy" />
              </a>
            </div>
            <div>
              <h3>Pages</h3>
              <a onClick={() => scrollTo('home')}>Home</a>
              <a onClick={() => scrollTo('framework')}>Framework</a>
              <a onClick={() => scrollTo('platform')}>Platform</a>
              <a onClick={() => scrollTo('solutions')}>Solutions</a>
              <a onClick={() => scrollTo('security')}>Security</a>
            </div>
            <div>
              <h3>Get started</h3>
              <a onClick={() => scrollTo('start')}>Request a demo</a>
            </div>
          </div>
          <div style={{ fontSize: 12, borderTop: '1px solid #2A3040', paddingTop: 20, color: '#7A8190', textAlign: 'left' }}>© CyberNovr Limited</div>
        </div>
      </footer>

      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(8,12,24,.72)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', zIndex: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, cursor: 'zoom-out' }} role="dialog" aria-modal="true">
          <div onClick={e => e.stopPropagation()} style={{ position: 'relative', maxWidth: 'min(1240px, 96vw)', maxHeight: '92vh', background: '#fff', borderRadius: 18, overflow: 'hidden', boxShadow: '0 28px 80px rgba(0,0,0,.45)', border: '1px solid rgba(255,255,255,.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#0E1526', color: '#fff', fontSize: 12, fontWeight: 700 }}>
              <span>NovrGRC preview</span>
              <button onClick={() => setLightbox(null)} style={{ background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.2)', color: '#fff', borderRadius: 999, padding: '6px 12px', fontWeight: 700, cursor: 'pointer', fontSize: 12 }}>Close ✕</button>
            </div>
            <img src={lightbox} alt="NovrGRC expanded preview" style={{ display: 'block', width: '100%', height: 'auto', maxHeight: '86vh', objectFit: 'contain', background: '#F8FAFC' }} />
          </div>
        </div>
      )}

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: 'var(--ink)', color: '#fff', padding: '12px 18px', borderRadius: 999, fontSize: 13, fontWeight: 600, boxShadow: '0 12px 30px rgba(0,0,0,.25)', zIndex: 90 }}>
          {toast}
        </div>
      )}

      <style>{`
        @media(max-width:1024px){ .wrap[style*="grid-template-columns:1fr 1fr"]{grid-template-columns:1fr !important; gap:24px !important} }
        @media(max-width:900px){ .tabpanel.active .browser{order:-1} }
        @media(max-width:768px){
          .wrap > div[style*="grid-template-columns:repeat(3"]{grid-template-columns:1fr !important}
          .wrap > div[style*="grid-template-columns:repeat(2"]{grid-template-columns:1fr !important}
          .fcols{grid-template-columns:1fr !important}
          div[style*="display:flex"][style*="gap:40"]{gap:20px !important}
        }
        @media(max-width:640px){
          .wrap > div[style*="grid-template-columns:repeat(3"]{grid-template-columns:1fr !important; gap:14px !important}
          .wrap > div[style*="grid-template-columns:repeat(2"]{grid-template-columns:1fr !important; gap:14px !important}
          div[style*="grid-template-columns:1fr 1fr"]{grid-template-columns:1fr !important}
          table{font-size:12px}
        }
        @media(max-width:480px){
          .browser[style*="maxWidth:860"]{max-width:100% !important}
          div[style*="gap:56"]{gap:32px !important}
          div[style*="gap:56"] img{height:52px !important; max-width:180px !important}
        }
        @media(min-width:1920px){
          .wrap[style*="maxWidth:760"]{max-width:860px !important}
          .wrap[style*="maxWidth:700"]{max-width:800px !important}
        }
        @media(min-width:2560px){
          .wrap[style*="maxWidth:760"]{max-width:920px !important}
          .wrap[style*="maxWidth:700"], .wrap[style*="maxWidth:740"], .wrap[style*="maxWidth:640"]{max-width:900px !important}
        }
      `}</style>
    </>
  )
}

const inputStyle = { border: '1px solid var(--line)', padding: '12px 14px', borderRadius: 10, fontFamily: 'inherit', fontSize: 13, outline: 'none', background: '#fff', color: 'var(--ink)', width: '100%' }
