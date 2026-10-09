import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

const links = [
  { to: '/framework', label: 'Framework' },
  { to: '/platform', label: 'Platform' },
  { to: '/solutions', label: 'Solutions' },
  { to: '/security', label: 'Security' },
]

export default function Shell({ onDemoSubmit }) {
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [firstVisit, setFirstVisit] = useState(false)
  const loc = useLocation()

  useEffect(() => {
    setOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
    const titles = {
      '/': 'NovrGRC — Governance, Risk & Compliance, Powered by NovrGRC',
      '/framework': 'Frameworks — NovrGRC',
      '/platform': 'Platform — NovrGRC',
      '/solutions': 'Solutions — NovrGRC',
      '/security': 'Security — NovrGRC',
      '/demo': 'Request a demo — NovrGRC',
    }
    document.title = titles[loc.pathname] || 'NovrGRC'
  }, [loc.pathname])

  useEffect(() => {
    try {
      if (!sessionStorage.getItem('novr-seen')) {
        setFirstVisit(true)
        const t = setTimeout(() => {
          setFirstVisit(false)
          sessionStorage.setItem('novr-seen', '1')
        }, 1200)
        return () => clearTimeout(t)
      }
    } catch { setFirstVisit(false) }
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setProgress(max > 0 ? h.scrollTop / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lenis (optional, desktop only, degrades gracefully)
  useEffect(() => {
    if (window.innerWidth < 768) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let lenis
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({ lerp: 0.12 })
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf) }
      requestAnimationFrame(raf)
    }).catch(() => {})
    return () => { try { lenis?.destroy() } catch {} }
  }, [])

  return (
    <>
      <AnimatePresence>
        {firstVisit && (
          <motion.div
            initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
            style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'var(--dark-band)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.2em' }}>GOVERNANCE · RISK · COMPLIANCE</div>
            <div className="display" style={{ fontSize: 'clamp(40px,8vw,96px)' }}>NovrGRC</div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, zIndex: 60, background: 'transparent' }}>
        <div style={{ height: '100%', width: `${progress * 100}%`, background: 'linear-gradient(90deg,var(--brand),var(--soft-green))' }} />
      </div>

      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(243,251,246,.88)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, paddingTop: 12, paddingBottom: 12 }}>
          <Link to="/" style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-.02em' }}>Novr<span style={{ color: 'var(--brand)' }}>GRC</span></Link>
          <nav style={{ display: 'flex', gap: 22, fontSize: 14, fontWeight: 600 }} className="hide-m-nav">
            {links.map(l => (
              <NavLink key={l.to} to={l.to} style={({ isActive }) => ({ color: isActive ? 'var(--brand-deep)' : 'var(--muted)', textDecoration: 'none', borderBottom: isActive ? '2px solid var(--brand)' : '2px solid transparent', paddingBottom: 2 })}>{l.label}</NavLink>
            ))}
          </nav>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Link to="/demo" className="btn-primary nav-cta-demo">Request a demo</Link>
            <button className="hamburger" aria-label="Menu" onClick={() => setOpen(v => !v)}>{open ? '✕' : '☰'}</button>
          </div>
        </div>
        {open && (
          <div style={{ padding: '12px 24px 20px', display: 'flex', flexDirection: 'column', gap: 12, background: '#fff', borderTop: '1px solid var(--line)' }}>
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            {links.map(l => <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>{l.label}</Link>)}
            <Link to="/demo" onClick={() => setOpen(false)} className="btn-primary" style={{ textAlign: 'center' }}>Request a demo</Link>
          </div>
        )}
      </header>

      <AnimatePresence mode="wait">
        <motion.main key={loc.pathname} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}>
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <footer style={{ background: 'var(--dark-band)', color: '#C9D8D0', marginTop: 0 }}>
        <div className="wrap" style={{ paddingTop: 48, paddingBottom: 24, display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 28 }}>
          <div>
            <div style={{ color: '#fff', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>NovrGRC</div>
            <div style={{ fontSize: 13 }}>By CyberNovr Limited — AI-driven GRC for service providers and regulators. Proudly Nigerian.</div>
            <div style={{ fontSize: 13, marginTop: 10 }}>+234-809-812-0000 · grc@cybernovr.com · www.novrgrc.com</div>
            <img src="/iso/iso-27001.webp" alt="ISO 27001 Certified" style={{ width: '100%', maxWidth: 168, height: 'auto', display: 'block', marginTop: 16 }} loading="lazy" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
            <Link to="/">Home</Link><Link to="/framework">Framework</Link><Link to="/platform">Platform</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
            <Link to="/solutions">Solutions</Link><Link to="/security">Security</Link><Link to="/demo">Request a demo</Link>
          </div>
        </div>
        <div className="wrap" style={{ fontSize: 12, borderTop: '1px solid rgba(255,255,255,.14)', paddingTop: 16, paddingBottom: 20, color: '#8AA79A' }}>CyberNovr Limited</div>
      </footer>
      <style>{`
        .btn-primary{ display:inline-flex; align-items:center; justify-content:center; padding:11px 22px; border-radius:999px; background:var(--brand); color:#fff; font-weight:700; font-size:14px; text-decoration:none; box-shadow:0 10px 22px -10px rgba(22,164,107,.55); border:1px solid transparent; cursor:pointer }
        .btn-primary:hover{ background:var(--brand-deep) }
        .btn-ghost{ display:inline-flex; align-items:center; justify-content:center; padding:11px 22px; border-radius:999px; background:#fff; color:var(--ink); font-weight:700; font-size:14px; text-decoration:none; border:1px solid var(--line); cursor:pointer }
        .hamburger{ display:none; width:40px; height:40px; border:1px solid var(--line); border-radius:10px; background:#fff; cursor:pointer }
        @media(max-width:860px){ .hide-m-nav{ display:none !important } .hamburger{ display:flex; align-items:center; justify-content:center } }
        @media(max-width:640px){ footer .wrap{ grid-template-columns:1fr !important } }
        @media(max-width:560px){ header .nav-cta-demo{ display:none } }
      `}</style>
    </>
  )
}
