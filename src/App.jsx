import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

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
  const _hookReduce = useReducedMotion()
  const shouldReduceMotion = false // FIX: force animations visible in incognito (was hiding due to hook)

  // faster — subtle premium, ~35% quicker
  const ease = [0.22, 1, 0.36, 1]
  const vFadeUp = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.36, ease } } }
  const vFade = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.28, ease } } }
  const vStagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } } }
  const vStaggerTight = { hidden: {}, visible: { transition: { staggerChildren: 0.04, delayChildren: 0.03 } } }
  const vCard = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease } } }
  const vScale = { hidden: { opacity: 0, scale: 0.97, y: 10 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.38, ease } } }

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
      <motion.header className="site-header" initial={shouldReduceMotion ? false : { y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3, ease }}>
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
          <AnimatePresence>
            {mobileOpen && (
              <motion.div className="mob-menu open" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18, ease }} style={{ display: 'flex' }}>
                {nav.map(n => <a key={n.id} onClick={() => { scrollTo(n.id); setMobileOpen(false) }}>{n.label}</a>)}
                <button className="btn btn-blue" onClick={() => { scrollTo('start'); setMobileOpen(false) }}>Request a demo</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* HERO — FIX: animate on mount, not whileInView (was invisible on large screens) */}
      <motion.section id="home" className="section" style={{ paddingTop: 72, textAlign: 'center' }} initial="hidden" animate="visible" variants={vStagger}>
        <div className="wrap" style={{ maxWidth: 760 }}>
          <motion.div variants={vFadeUp} className="eyebrow">Governance, risk & compliance</motion.div>
          <motion.h1 variants={vFadeUp} className="hero-title" style={{ transitionDelay: '0.06s' }}>See cyber resilience across the whole sector.</motion.h1>
          <motion.p variants={vFadeUp} className="hero-sub" style={{ transitionDelay: '0.12s' }}>
            A multi-tenant GRC platform for monitoring and reporting compliance. Service providers automate risk, compliance and audit — and the regulator sees the result across the sector.
          </motion.p>
          <motion.div variants={vFadeUp} style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', transitionDelay: '0.18s' }}>
            <motion.button whileHover={shouldReduceMotion ? {} : { y: -2 }} whileTap={shouldReduceMotion ? {} : { scale: 0.98 }} className="btn btn-blue" onClick={() => scrollTo('start')}>Request a demo</motion.button>
            <motion.button whileHover={shouldReduceMotion ? {} : { y: -2 }} whileTap={shouldReduceMotion ? {} : { scale: 0.98 }} className="btn btn-outline" onClick={() => scrollTo('framework')}>See the framework</motion.button>
          </motion.div>
        </div>

        <motion.div className="wrap" style={{ marginTop: 40 }} variants={vScale} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }}>
          <div className="browser" style={{ maxWidth: 860, margin: '0 auto', boxShadow: '0 28px 64px -20px rgba(16,24,40,.24), 0 10px 24px -12px rgba(16,24,40,.18)', border: '1px solid #DDE1E8' }}>
            <div className="browser-bar" style={{ background: '#F1F3F6', borderBottom: '1px solid #DDE1E8' }}><span className="dot" style={{ background: '#FF5F57' }} /><span className="dot" style={{ background: '#FFBD2E' }} /><span className="dot" style={{ background: '#28CA42' }} /><span style={{ marginLeft: 12, fontSize: 11, color: '#8A94A6', fontWeight: 600 }}>app.novrgrc.com/dashboard — Sector overview</span></div>
            <div onClick={() => setLightbox('/dashboard.png')} style={{ position: 'relative', cursor: 'zoom-in', overflow: 'hidden', background: '#F8FAFC' }}>
              <img src="/dashboard.png" alt="NovrGRC dashboard — sector resilience overview" style={{ width: '100%', height: 'auto', display: 'block', imageRendering: '-webkit-optimize-contrast' }} loading="eager" />
              <span style={{ position: 'absolute', right: 12, bottom: 12, background: 'rgba(14,21,38,.82)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '6px 10px', borderRadius: 999, backdropFilter: 'blur(6px)' }}>Click to expand ↗</span>
            </div>
          </div>
        </motion.div>
      </motion.section>

      <motion.section className="section" style={{ padding: '36px 0' }} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={vStagger}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <motion.div variants={vFade} className="muted" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 28 }}>Trusted by — regulator, operators & interconnect</motion.div>
          <motion.div variants={vStagger} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 56, flexWrap: 'wrap' }}>
            <motion.a variants={vCard} href="https://ncc.gov.ng" target="_blank" rel="noopener noreferrer" aria-label="NCC — Nigerian Communications Commission" whileHover={shouldReduceMotion ? {} : { y: -2 }}>
              <img src="https://ngfrepository.org.ng:8443/retrieve/02b0087e-4b32-4d71-9a2a-d1e1601d3452" alt="NCC — Nigerian Communications Commission" style={{ height: 72, width: 'auto', maxWidth: 260, objectFit: 'contain', display: 'block' }} loading="lazy" onError={e => { e.currentTarget.src = '/logos/ncc-repository.png' }} />
            </motion.a>
            <motion.a variants={vCard} href="https://www.gloworld.com" target="_blank" rel="noopener noreferrer" aria-label="Glo — Globacom" whileHover={shouldReduceMotion ? {} : { y: -2 }}>
              <img src="https://www.gloworld.com/logo.png" alt="Glo — Globacom" style={{ height: 64, width: 'auto', maxWidth: 220, objectFit: 'contain', display: 'block' }} loading="lazy" onError={e => { e.currentTarget.src = '/logos/glo.png'; e.currentTarget.style.height = '64px' }} />
            </motion.a>
            <motion.a variants={vCard} href="https://www.routelinkgroup.com" target="_blank" rel="noopener noreferrer" aria-label="Routelink Group" whileHover={shouldReduceMotion ? {} : { y: -2 }}>
              <img src="https://www.routelinkgroup.com/routelink-group-image.png" alt="Routelink Group" style={{ height: 68, width: 'auto', maxWidth: 320, objectFit: 'contain', display: 'block' }} loading="lazy" onError={e => { e.currentTarget.src = '/logos/routelink.png' }} />
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="section soft" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={vStagger}>
        <div className="wrap">
          <motion.div variants={vFadeUp} style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 40px' }}>
            <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-.02em', margin: 0 }}>Two levels, one platform.</h2>
            <p className="muted" style={{ marginTop: 10, fontSize: 15 }}>Entity-level automation, sector-level insight — without duplicate work.</p>
          </motion.div>
          <motion.div variants={vStagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
            {[
              { n: '01', t: 'Sector level', d: 'Real-time dashboards on the maturity and resilience of service providers and the sector as a whole.' },
              { n: '02', t: 'Service provider level', d: 'Automated workflows for day-to-day risk, compliance and audit work.' },
              { n: '03', t: 'Regulator CSIRT', d: 'The regulator’s own CSIRT can run its GRC programme on the same platform.' },
            ].map(c => (
              <motion.div key={c.t} variants={vCard} className="card" whileHover={shouldReduceMotion ? {} : { y: -3, transition: { duration: 0.22 } }}>
                <div className="icon">{c.n}</div>
                <h3 style={{ fontSize: 16, margin: '0 0 8px', fontWeight: 800 }}>{c.t}</h3>
                <p className="muted" style={{ fontSize: 14, lineHeight: 1.6 }}>{c.d}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="section" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={vStagger}>
        <div className="wrap">
          <motion.div variants={vFadeUp} style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 36px' }}>
            <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-.02em', margin: 0 }}>Outcomes that matter.</h2>
          </motion.div>
          <motion.div variants={vStagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
            {outcomes.map(t => (
              <motion.div key={t} variants={vCard} className="card" style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '18px 18px' }} whileHover={shouldReduceMotion ? {} : { y: -2 }}>
                <span className="check solid">✓</span>
                <span style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.5 }}>{t}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="section soft" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={vStagger}>
        <div className="wrap">
          <motion.div variants={vFadeUp} style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 36px' }}>
            <h2 style={{ fontSize: 30, fontWeight: 800, margin: 0 }}>Explore NovrGRC.</h2>
          </motion.div>
          <motion.div variants={vStagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
            {explore.map(e => (
              <motion.div key={e.title} variants={vCard} className="card" style={{ cursor: 'pointer' }} onClick={() => scrollTo(e.id)} whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.01 }} whileTap={shouldReduceMotion ? {} : { scale: 0.99 }}>
                <h3 style={{ fontSize: 18, margin: '0 0 8px', fontWeight: 800 }}>{e.title}</h3>
                <p className="muted" style={{ fontSize: 13, marginBottom: 14, lineHeight: 1.5 }}>{e.desc}</p>
                <span style={{ color: 'var(--blue)', fontWeight: 700, fontSize: 13 }}>Learn more →</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="section blueband" style={{ textAlign: 'center', padding: '56px 0' }} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={vStagger}>
        <div className="wrap">
          <motion.h2 variants={vFadeUp} style={{ fontSize: 34, color: '#fff', margin: '0 0 20px', fontWeight: 800, letterSpacing: '-.02em' }}>See NovrGRC in action.</motion.h2>
          <motion.p variants={vFade} style={{ color: 'rgba(255,255,255,.85)', margin: '0 0 22px', fontSize: 15 }}>A 20-minute walkthrough tailored to your role — regulator or provider.</motion.p>
          <motion.div variants={vFadeUp}><motion.button whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -1 }} whileTap={shouldReduceMotion ? {} : { scale: 0.98 }} className="btn btn-white" onClick={() => scrollTo('start')}>Request a demo</motion.button></motion.div>
        </div>
      </motion.section>

      {/* FRAMEWORK */}
      <motion.section id="framework" className="section" style={{ textAlign: 'center' }} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={vStagger}>
        <div className="wrap" style={{ maxWidth: 700 }}>
          <motion.div variants={vFadeUp} className="eyebrow">Framework</motion.div>
          <motion.h2 variants={vFadeUp} style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-.03em', margin: '0 0 10px', lineHeight: 1.15 }}>Built around five pillars of resilience.</motion.h2>
          <motion.p variants={vFade} className="muted" style={{ fontSize: 15, lineHeight: 1.6 }}>A process-based model that runs through governance, risk management, security posture, incident response and capability building.</motion.p>
        </div>
      </motion.section>

      <motion.section className="section" style={{ paddingTop: 0 }} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={vFade}>
        <div className="wrap">
          <motion.div className="browser" style={{ padding: 28 }} variants={vScale}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 14, height: 190, alignItems: 'end', marginBottom: 18 }}>
              {pillars.map((p, i) => (
                <motion.div key={p.label} initial={shouldReduceMotion ? { height: p.h } : { height: 0 }} whileInView={shouldReduceMotion ? {} : { height: p.h }} viewport={{ once: false }} transition={{ duration: 0.42, delay: i * 0.04, ease }} style={{ background: 'linear-gradient(180deg,#8FDCB8,var(--blue))', borderRadius: '10px 10px 0 0', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.4)' }} />
              ))}
            </div>
            <motion.div variants={vStaggerTight} initial="hidden" whileInView="visible" viewport={{ once: false }} style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 14, textAlign: 'center', fontSize: 11, fontWeight: 700, color: 'var(--muted)', marginBottom: 18, lineHeight: 1.35 }}>
              {pillars.map(p => <motion.div key={p.label} variants={vFade} style={{ whiteSpace: 'pre-line' }}>{p.label}</motion.div>)}
            </motion.div>
            <motion.div variants={vStaggerTight} initial="hidden" whileInView="visible" viewport={{ once: false }} style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 520, margin: '0 auto' }}>
              <motion.div variants={vCard} style={{ background: 'var(--soft)', padding: 10, textAlign: 'center', fontSize: 12, fontWeight: 700, borderRadius: 8, border: '1px solid var(--line)' }}>Resilience objectives</motion.div>
              <motion.div variants={vCard} style={{ background: 'var(--soft)', padding: 10, textAlign: 'center', fontSize: 12, fontWeight: 700, borderRadius: 8, width: '85%', margin: '0 auto', border: '1px solid var(--line)' }}>Resilience standards</motion.div>
              <motion.div variants={vCard} style={{ background: 'var(--soft)', padding: 10, textAlign: 'center', fontSize: 12, fontWeight: 700, borderRadius: 8, width: '70%', margin: '0 auto', border: '1px solid var(--line)' }}>Resilience guidelines</motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="section soft" style={{ padding: '36px 0' }} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={vStagger}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
          <motion.div variants={vCard} className="card"><p style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}>Workflows for risk, compliance and audit follow the framework structure directly.</p></motion.div>
          <motion.div variants={vCard} className="card"><p style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}>Assessment and adoption is built to be straightforward for service providers.</p></motion.div>
          <motion.div variants={vCard} className="card"><p style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}>Regulators get a live read on maturity across every regulated entity.</p></motion.div>
        </div>
      </motion.section>

      <motion.section className="section" style={{ textAlign: 'center', padding: '40px 0 20px' }} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={vStagger}>
        <div className="wrap" style={{ maxWidth: 740 }}>
          <motion.h2 variants={vFadeUp} style={{ fontSize: 22, lineHeight: 1.6, fontWeight: 600, margin: 0 }}>
            Built around the sector’s own <strong>NCS-CRF</strong> framework. Also used to report against <span style={{ color: 'var(--blue)', fontWeight: 800 }}>the national standard</span>, ISO 27001, NIST Cybersecurity Framework, PCI DSS, other international standards, and custom frameworks.
          </motion.h2>
          <motion.div variants={vStaggerTight} style={{ marginTop: 18, display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['NCS-CRF', 'NDPA', 'NCPS', 'ISO 27001', 'NIST CSF', 'PCI DSS', 'Custom'].map(s => (
              <motion.span key={s} variants={vFade} className="chip">{s}</motion.span>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="section blueband" style={{ textAlign: 'center', padding: '48px 0' }} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={vStagger}>
        <div className="wrap">
          <motion.h2 variants={vFadeUp} style={{ fontSize: 28, color: '#fff', margin: '0 0 18px', fontWeight: 800 }}>See the framework mapped to your controls.</motion.h2>
          <motion.div variants={vFadeUp}><motion.button whileHover={shouldReduceMotion ? {} : { scale: 1.03 }} whileTap={shouldReduceMotion ? {} : { scale: 0.98 }} className="btn btn-white" onClick={() => scrollTo('start')}>Request a demo</motion.button></motion.div>
        </div>
      </motion.section>

      {/* PLATFORM */}
      <motion.section id="platform" className="section" style={{ textAlign: 'center', paddingBottom: 24 }} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={vStagger}>
        <div className="wrap" style={{ maxWidth: 700 }}>
          <motion.div variants={vFadeUp} className="eyebrow">Platform</motion.div>
          <motion.h2 variants={vFadeUp} style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-.02em', margin: '0 0 10px' }}>Seven modules. One platform.</motion.h2>
          <motion.p variants={vFade} className="muted" style={{ fontSize: 15 }}>Risk, compliance, audit, third-party risk, incidents, policy and reporting — all working from the same underlying data.</motion.p>
        </div>
      </motion.section>

      <motion.section className="section" style={{ paddingTop: 0 }} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.15 }} variants={vFade}>
        <div className="wrap">
          <motion.div variants={vFadeUp} style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 28 }}>
            {modules.map((m, i) => (
              <motion.button key={m.key} whileHover={shouldReduceMotion ? {} : { y: -1 }} whileTap={shouldReduceMotion ? {} : { scale: 0.98 }} className={`tabbtn ${i === tab ? 'active' : ''}`} onClick={() => setTab(i)}>{m.key}</motion.button>
            ))}
          </motion.div>
          <div style={{ position: 'relative', minHeight: 360 }}>
            <AnimatePresence mode="wait">
              {modules.map((m, i) => i === tab && (
                <motion.div key={m.key} className="tabpanel active" initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }} transition={{ duration: 0.22, ease }} style={{ display: 'grid' }}>
                  <motion.div variants={vStaggerTight} initial="hidden" animate="visible">
                    <h3 style={{ fontSize: 22, margin: '0 0 14px', fontWeight: 800 }}>{m.title}</h3>
                    {m.bullets.map(b => (
                      <motion.div key={b} variants={vFadeUp} style={{ fontSize: 13, padding: '7px 0', display: 'flex', gap: 10, lineHeight: 1.5 }}>
                        <span className="check">✓</span>{b}
                      </motion.div>
                    ))}
                  </motion.div>
                  <motion.div className="browser" style={{ overflow: 'hidden', boxShadow: '0 22px 48px -18px rgba(16,24,40,.22), 0 8px 20px -12px rgba(16,24,40,.14)', border: '1px solid #DDE1E8', borderRadius: 16 }} initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.24, delay: 0.04, ease }}>
                    <div className="browser-bar" style={{ background: '#F1F3F6', borderBottom: '1px solid #DDE1E8' }}><span className="dot" style={{ background: '#FF5F57' }} /><span className="dot" style={{ background: '#FFBD2E' }} /><span className="dot" style={{ background: '#28CA42' }} /><span style={{ marginLeft: 12, fontSize: 11, color: '#6B7688', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{`app.novrgrc.com/${m.key.toLowerCase().replace(' ', '-')}`}</span></div>
                    <div onClick={() => setLightbox(m.image)} style={{ position: 'relative', cursor: 'zoom-in', overflow: 'hidden', background: '#F8FAFC', aspectRatio: '16/10' }}>
                      <img src={m.image} alt={`${m.title} — NovrGRC`} style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', objectPosition: 'top left', imageRendering: '-webkit-optimize-contrast', transition: 'transform .45s ease' }} loading="lazy" onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                      <span style={{ position: 'absolute', right: 10, bottom: 10, background: 'rgba(14,21,38,.78)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '5px 9px', borderRadius: 999, backdropFilter: 'blur(6px)', pointerEvents: 'none' }}>Expand ↗</span>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      <motion.section className="section soft" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={vStagger}>
        <div className="wrap">
          <motion.div variants={vFadeUp} style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 24px' }}><h2 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>Optional add-ons.</h2><p className="muted" style={{ fontSize: 13, marginTop: 6 }}>Paid capabilities you can switch on when you need them.</p></motion.div>
          <motion.div variants={vScale} className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {addOns.map(a => (
              <motion.div key={a.title} variants={vCard} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} style={{ display: 'grid', gridTemplateColumns: '56px 1fr 80px', gap: 12, padding: '16px 14px', borderBottom: '1px solid var(--line)', alignItems: 'center' }}>
                <div className="icon icon-sm" style={{ margin: 0 }}>{a.k}</div>
                <div><strong style={{ fontSize: 14 }}>{a.title}</strong>{a.sub && <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>{a.sub}</div>}</div>
                <div style={{ textAlign: 'right' }}><span className="chip">Paid</span></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="section blueband" style={{ textAlign: 'center', padding: '48px 0' }} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={vStagger}>
        <div className="wrap">
          <motion.h2 variants={vFadeUp} style={{ fontSize: 28, color: '#fff', margin: '0 0 18px', fontWeight: 800 }}>See the modules in a live demo.</motion.h2>
          <motion.div variants={vFadeUp}><motion.button whileHover={shouldReduceMotion ? {} : { scale: 1.03 }} whileTap={shouldReduceMotion ? {} : { scale: 0.98 }} className="btn btn-white" onClick={() => scrollTo('start')}>Request a demo</motion.button></motion.div>
        </div>
      </motion.section>

      {/* SOLUTIONS */}
      <motion.section id="solutions" className="section" style={{ textAlign: 'center', paddingBottom: 20 }} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={vStagger}>
        <div className="wrap" style={{ maxWidth: 700 }}>
          <motion.div variants={vFadeUp} className="eyebrow">Solutions</motion.div>
          <motion.h2 variants={vFadeUp} style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-.02em', margin: '0 0 10px' }}>Two views of the same platform.</motion.h2>
          <motion.p variants={vFade} className="muted" style={{ fontSize: 15 }}>Regulatory, legal and operational requirements, managed at entity level and sector level, in one system.</motion.p>
        </div>
      </motion.section>

      <motion.section className="section" style={{ paddingTop: 0, textAlign: 'center' }} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.15 }} variants={vFade}>
        <div className="wrap">
          <motion.div variants={vFadeUp} className="seg" role="tablist" style={{ position: 'relative' }}>
            <button className={`segbtn ${seg === 'reg' ? 'active' : ''}`} onClick={() => setSeg('reg')} style={{ position: 'relative', zIndex: 1 }}>For regulators</button>
            <button className={`segbtn ${seg === 'sp' ? 'active' : ''}`} onClick={() => setSeg('sp')} style={{ position: 'relative', zIndex: 1 }}>For service providers</button>
            {!shouldReduceMotion && (
              <motion.div layoutId="seg-active" style={{ position: 'absolute', top: 4, bottom: 4, borderRadius: 999, background: '#fff', boxShadow: '0 4px 16px -8px rgba(20,30,60,.22)', border: '1px solid var(--line)' }} animate={{ left: seg === 'reg' ? 4 : '50%', right: seg === 'reg' ? '50%' : 4 }} transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
            )}
          </motion.div>

          <div style={{ marginTop: 28, minHeight: 380, position: 'relative' }}>
            <AnimatePresence mode="wait">
              {seg === 'reg' ? (
                <motion.div key="reg" initial={shouldReduceMotion ? false : { opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 12 }} transition={{ duration: 0.2, ease }} className="solview active" style={{ display: 'grid', textAlign: 'left' }}>
                  <motion.div variants={vStaggerTight} initial="hidden" animate="visible" className="numlist">
                    {[
                      'Complete visibility of cyber resilience across the sector.',
                      'Real-time dashboards on service-provider maturity.',
                      'Higher confidence in oversight decisions.',
                      'Less time spent collating reports from entities.',
                      'The regulator’s own CSIRT can run its GRC work here too.',
                    ].map(t => (
                      <motion.div key={t} variants={vFadeUp} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '9px 0', fontSize: 14 }}><span className="check solid">✓</span>{t}</motion.div>
                    ))}
                  </motion.div>
                  <motion.div variants={vScale} initial="hidden" animate="visible" className="browser" style={{ overflow: 'hidden', boxShadow: '0 22px 48px -18px rgba(16,24,40,.22), 0 8px 20px -12px rgba(16,24,40,.14)', border: '1px solid #DDE1E8', borderRadius: 16 }}>
                    <div className="browser-bar" style={{ background: '#F1F3F6', borderBottom: '1px solid #DDE1E8' }}><span className="dot" style={{ background: '#FF5F57' }} /><span className="dot" style={{ background: '#FFBD2E' }} /><span className="dot" style={{ background: '#28CA42' }} /><span style={{ marginLeft: 12, fontSize: 11, color: '#6B7688', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>app.novrgrc.com/sector-overview — NCC regulator view</span></div>
                    <div onClick={() => setLightbox('/ncc-dashboard.png')} style={{ position: 'relative', cursor: 'zoom-in', overflow: 'hidden', background: '#F8FAFC', aspectRatio: '16/10.2' }}>
                      <img src="/ncc-dashboard.png" alt="NCC Sector overview — regulator view (Image 1)" style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', objectPosition: 'top left', imageRendering: '-webkit-optimize-contrast', transition: 'transform .45s ease' }} loading="lazy" onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                      <span style={{ position: 'absolute', right: 10, bottom: 10, background: 'rgba(14,21,38,.78)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '5px 9px', borderRadius: 999, backdropFilter: 'blur(6px)', pointerEvents: 'none' }}>Expand ↗</span>
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div key="sp" initial={shouldReduceMotion ? false : { opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -12 }} transition={{ duration: 0.2, ease }} className="solview active" style={{ display: 'grid', textAlign: 'left' }}>
                  <motion.div variants={vStaggerTight} initial="hidden" animate="visible" className="numlist">
                    {[
                      'Automated workflows for risk, compliance and audit.',
                      'One shared record instead of scattered spreadsheets.',
                      'Less time spent on compliance reporting.',
                      'Better audit readiness, year round.',
                      'Return on investment within 12–18 months',
                    ].map((t, idx) => (
                      <motion.div key={t} variants={vFadeUp} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '9px 0', fontSize: 14 }}><span className="check solid">✓</span><span>{t} {idx === 4 && <span className="chip green" style={{ marginLeft: 6 }}>Target</span>}</span></motion.div>
                    ))}
                  </motion.div>
                  <motion.div variants={vScale} initial="hidden" animate="visible" className="browser" style={{ overflow: 'hidden', boxShadow: '0 22px 48px -18px rgba(16,24,40,.22), 0 8px 20px -12px rgba(16,24,40,.14)', border: '1px solid #DDE1E8', borderRadius: 16 }}>
                    <div className="browser-bar" style={{ background: '#F1F3F6', borderBottom: '1px solid #DDE1E8' }}><span className="dot" style={{ background: '#FF5F57' }} /><span className="dot" style={{ background: '#FFBD2E' }} /><span className="dot" style={{ background: '#28CA42' }} /><span style={{ marginLeft: 12, fontSize: 11, color: '#6B7688', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>app.novrgrc.com/dashboard — Service provider view</span></div>
                    <div onClick={() => setLightbox('/dashboard.png')} style={{ position: 'relative', cursor: 'zoom-in', overflow: 'hidden', background: '#F8FAFC', aspectRatio: '16/10.2' }}>
                      <img src="/dashboard.png" alt="Service provider dashboard" style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', objectPosition: 'top left', imageRendering: '-webkit-optimize-contrast', transition: 'transform .45s ease' }} loading="lazy" onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                      <span style={{ position: 'absolute', right: 10, bottom: 10, background: 'rgba(14,21,38,.78)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '5px 9px', borderRadius: 999, backdropFilter: 'blur(6px)', pointerEvents: 'none' }}>Expand ↗</span>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      <motion.section className="section soft" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={vStagger}>
        <div className="wrap">
          <motion.div variants={vFadeUp} style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 24px' }}><h2 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>What each team does.</h2></motion.div>
          <motion.div variants={vScale} className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {roles.map(([r, d, m, chip], i) => (
              <motion.div key={r} variants={vCard} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} style={{ display: 'grid', gridTemplateColumns: '170px 1fr 140px', gap: 12, padding: '16px 14px', borderBottom: i === roles.length - 1 ? 'none' : '1px solid var(--line)', alignItems: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{r}</div>
                <div className="muted" style={{ fontSize: 13 }}>{d}</div>
                <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>{m}</div>
                  {chip && <span className="chip" style={{ marginTop: 4 }}>{chip}</span>}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="section blueband" style={{ textAlign: 'center', padding: '48px 0' }} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={vStagger}>
        <div className="wrap">
          <motion.h2 variants={vFadeUp} style={{ fontSize: 28, color: '#fff', margin: '0 0 18px', fontWeight: 800 }}>See NovrGRC in action.</motion.h2>
          <motion.div variants={vFadeUp}><motion.button whileHover={shouldReduceMotion ? {} : { scale: 1.03 }} whileTap={shouldReduceMotion ? {} : { scale: 0.98 }} className="btn btn-white" onClick={() => scrollTo('start')}>Request a demo</motion.button></motion.div>
        </div>
      </motion.section>

      {/* SECURITY */}
      <motion.section id="security" className="section" style={{ textAlign: 'center', paddingBottom: 24 }} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={vStagger}>
        <div className="wrap" style={{ maxWidth: 700 }}>
          <motion.div variants={vFadeUp} className="eyebrow">Security & integrations</motion.div>
          <motion.h2 variants={vFadeUp} style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-.02em', margin: '0 0 10px' }}>Built for regulated environments.</motion.h2>
          <motion.p variants={vFade} className="muted" style={{ fontSize: 14 }}>Hardened for the realities of telecoms, finance and critical infrastructure oversight.</motion.p>
        </div>
      </motion.section>

      <motion.section className="section soft" style={{ paddingTop: 24 }} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={vStagger}>
        <motion.div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }} variants={vStagger}>
          {secCards.map(([k, v]) => (
            <motion.div key={k} variants={vCard} className="card" whileHover={shouldReduceMotion ? {} : { y: -2 }}>
              <h3 style={{ fontSize: 15, margin: '0 0 8px', fontWeight: 800 }}>{k}</h3>
              <p className="muted" style={{ fontSize: 13, lineHeight: 1.6, margin: 0 }}>{v}</p>
            </motion.div>
          ))}
        </motion.div>

      </motion.section>

      <motion.section className="section" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={vStagger}>
        <div className="wrap">
          <motion.div variants={vFadeUp} style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 24px' }}><h2 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>Integrations.</h2></motion.div>
          <motion.div variants={vStagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14, maxWidth: 640, margin: '0 auto' }}>
            {[
              ['Open APIs', 'For third-party integrations'],
              ['SSO', 'Enterprise identity providers'],
              ['System connectors', 'ERP, HR, ITSM, SIEM, IAM'],
              ['Threat intelligence feeds', 'Regulatory data sharing'],
            ].map(([t, s]) => (
              <motion.div key={t} variants={vCard} className="card" whileHover={shouldReduceMotion ? {} : { y: -2 }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{t}</div>
                <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>{s}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="section blueband" style={{ textAlign: 'center', padding: '48px 0' }} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={vStagger}>
        <div className="wrap">
          <motion.h2 variants={vFadeUp} style={{ fontSize: 28, color: '#fff', margin: '0 0 18px', fontWeight: 800 }}>See how it fits your stack.</motion.h2>
          <motion.div variants={vFadeUp}><motion.button whileHover={shouldReduceMotion ? {} : { scale: 1.03 }} whileTap={shouldReduceMotion ? {} : { scale: 0.98 }} className="btn btn-white" onClick={() => scrollTo('start')}>Request a demo</motion.button></motion.div>
        </div>
      </motion.section>

      {/* GET STARTED */}
      <motion.section id="start" className="section" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={vStagger}>
        <div className="wrap" style={{ textAlign: 'center', marginBottom: 36 }}>
          <motion.div variants={vFadeUp} className="eyebrow">Get started</motion.div>
          <motion.h2 variants={vFadeUp} style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-.02em', margin: '0 0 10px' }}>Request a demo.</motion.h2>
          <motion.p variants={vFade} className="muted" style={{ fontSize: 14 }}>Tell us about your organisation and we’ll shape the walkthrough to your framework.</motion.p>
        </div>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
          <motion.div variants={vFadeUp}>
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
          </motion.div>
          <motion.form variants={vScale} className="card" onSubmit={handleDemoSubmit} noValidate>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input placeholder="Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} />
              <input placeholder="Work email *" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} />
              <input placeholder="Organisation" value={form.org} onChange={e => setForm({ ...form, org: e.target.value })} style={inputStyle} />
              <input placeholder="Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} style={inputStyle} />
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} style={{ ...inputStyle, color: form.type === 'Organisation type' ? 'var(--muted)' : 'var(--ink)' }}>
                <option>Organisation type</option><option>Regulator</option><option>Service provider</option><option>Consulting Partner</option><option>Other</option>
              </select>
              <textarea placeholder="Message — what are you looking to solve?" rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} />
              <motion.button whileHover={shouldReduceMotion ? {} : { y: -1 }} whileTap={shouldReduceMotion ? {} : { scale: 0.98 }} type="submit" className="btn btn-blue" style={{ width: '100%', marginTop: 4 }}>Request a demo</motion.button>
              <div style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'center', lineHeight: 1.5 }}>By submitting, you agree to our data processing for demo scheduling. We don’t share your details.</div>
            </div>
          </motion.form>
        </div>
      </motion.section>

      <motion.footer initial="hidden" whileInView="visible" viewport={{ once: false }} variants={vFade}>
        <div className="wrap">
          <div className="fcols">
            <motion.div variants={vFadeUp}>
              <h3>NovrGRC</h3>
              <div>By CyberNovr Limited</div>
              <a href="https://cybernovr.com/isms" target="_blank" rel="noopener noreferrer" aria-label="ISO 27001 Certified — cybernovr.com/isms" style={{ display: 'block', marginTop: 16 }}>
                <img src="/iso/iso-27001.webp" alt="ISO 27001 Certified" style={{ width: '100%', maxWidth: 168, height: 'auto', display: 'block', background: 'transparent' }} loading="lazy" />
              </a>
            </motion.div>
            <motion.div variants={vFadeUp}>
              <h3>Pages</h3>
              <a onClick={() => scrollTo('home')}>Home</a>
              <a onClick={() => scrollTo('framework')}>Framework</a>
              <a onClick={() => scrollTo('platform')}>Platform</a>
              <a onClick={() => scrollTo('solutions')}>Solutions</a>
              <a onClick={() => scrollTo('security')}>Security</a>
            </motion.div>
            <motion.div variants={vFadeUp}>
              <h3>Get started</h3>
              <a onClick={() => scrollTo('start')}>Request a demo</a>
            </motion.div>
          </div>
          <div style={{ fontSize: 12, borderTop: '1px solid #2A3040', paddingTop: 20, color: '#7A8190', textAlign: 'left' }}>© CyberNovr Limited</div>
        </div>
      </motion.footer>

      <AnimatePresence>
        {lightbox && (
          <motion.div onClick={() => setLightbox(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.16 }} style={{ position: 'fixed', inset: 0, background: 'rgba(8,12,24,.72)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', zIndex: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, cursor: 'zoom-out' }} role="dialog" aria-modal="true">
            <motion.div onClick={e => e.stopPropagation()} initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.98, opacity: 0 }} transition={{ duration: 0.2, ease }} style={{ position: 'relative', maxWidth: 'min(1240px, 96vw)', maxHeight: '92vh', background: '#fff', borderRadius: 18, overflow: 'hidden', boxShadow: '0 28px 80px rgba(0,0,0,.45)', border: '1px solid rgba(255,255,255,.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#0E1526', color: '#fff', fontSize: 12, fontWeight: 700 }}>
                <span>NovrGRC preview</span>
                <button onClick={() => setLightbox(null)} style={{ background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.2)', color: '#fff', borderRadius: 999, padding: '6px 12px', fontWeight: 700, cursor: 'pointer', fontSize: 12 }}>Close ✕</button>
              </div>
              <img src={lightbox} alt="NovrGRC expanded preview" style={{ display: 'block', width: '100%', height: 'auto', maxHeight: '86vh', objectFit: 'contain', background: '#F8FAFC' }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 10, x: '-50%' }} animate={{ opacity: 1, y: 0, x: '-50%' }} exit={{ opacity: 0, y: 8, x: '-50%' }} transition={{ duration: 0.18, ease }} style={{ position: 'fixed', bottom: 24, left: '50%', background: 'var(--ink)', color: '#fff', padding: '12px 18px', borderRadius: 999, fontSize: 13, fontWeight: 600, boxShadow: '0 12px 30px rgba(0,0,0,.25)', zIndex: 90 }}>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

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
