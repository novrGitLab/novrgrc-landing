import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import NetworkCanvas from '../components/NetworkCanvas'
import Marquee from '../components/Marquee'
import { Reveal, MagneticButton } from '../components/fx'
import { outcomes, grcTrio } from '../data/content'

function CountUp({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? value : 0)
  useEffect(() => {
    if (!inView || reduce) { if (inView) setN(value); return }
    let raf = 0
    const t0 = performance.now(), dur = 1100
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / dur)
      const e = 1 - Math.pow(1 - k, 3)
      setN(Math.round(value * e))
      if (k < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, reduce])
  return <span ref={ref} className="ticker-num">{n}{suffix}</span>
}

export default function Home() {
  const reduce = useReducedMotion()
  const [canvasOn, setCanvasOn] = useState(true)
  useEffect(() => {
    // animation runs on all screen sizes now (loop is light: no particle
    // system, dots pre-rendered offscreen); only reduced-motion disables it
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setCanvasOn(!mq.matches)
    const onChange = () => setCanvasOn(!mq.matches)
    mq.addEventListener?.('change', onChange)
    return () => { mq.removeEventListener?.('change', onChange) }
  }, [])

  return (
    <>
      {/* HERO — split: text column left, live map pinned to viewport right */}
      <section className="dotgrid grain hero-section" style={{ position: 'relative', overflow: 'hidden', padding: '72px 0 40px', minHeight: 620, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="hero-map" style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: 'clamp(520px,54vw,880px)', height: 'min(88%,640px)' }}>
          <NetworkCanvas animated={canvasOn && !reduce} anchor="right" />
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(90deg, var(--canvas) 0%, transparent 30%)' }} />
        </div>
        <div className="wrap hero-copy" style={{ position: 'relative', zIndex: 1, pointerEvents: 'none' }}>
          <div style={{ maxWidth: 560, padding: '24px 0', pointerEvents: 'none' }}>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              <span className="eyebrow-mono"><span className="live-dot" /> AI-driven GRC — multi-tenant · cloud-native</span>
            </motion.div>
            <motion.h1
              className="display"
              initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: 'clamp(44px,5.5vw,84px)', margin: '18px 0 0' }}
            >
              See risk &<br />compliance clearly.
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} style={{ color: 'var(--muted)', fontSize: 'clamp(15px,1.6vw,17px)', maxWidth: '48ch', margin: '20px 0 28px', lineHeight: 1.65 }}>
              NovrGRC is an AI-driven, multi-tenant GRC platform for telecoms, banks, fintechs and insurers — and the regulators who oversee them. Automate risk, compliance and audit end-to-end, with real-time dashboards on cyber resilience maturity.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.28 }} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <MagneticButton style={{ pointerEvents: 'auto' }}>
                <Link to="/demo" className="btn-primary" style={{ fontSize: 15, padding: '14px 30px' }}>Request a demo →</Link>
              </MagneticButton>
              <Link to="/framework" className="btn-ghost" style={{ pointerEvents: 'auto' }}>See the framework</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY — static logo row */}
      <section style={{ padding: '52px 0 44px', textAlign: 'center' }}>
        <div className="wrap">
          <div className="eyebrow-mono" style={{ justifyContent: 'center' }}>Deployed for national regulators & service providers</div>
          <p className="muted" style={{ fontSize: 13, margin: '10px auto 0', maxWidth: '62ch' }}>
            CyberNovr's flagship GRC platform is live with the Nigerian Communications Commission (NCC) and several service providers. Proudly Nigerian.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 56, flexWrap: 'wrap', marginTop: 28 }}>
            <a href="https://ncc.gov.ng" target="_blank" rel="noopener noreferrer" aria-label="NCC — Nigerian Communications Commission">
              <img src="/logos/ncc-hd.png" alt="NCC — Nigerian Communications Commission" style={{ height: 72, width: 'auto', maxWidth: 260, objectFit: 'contain', display: 'block' }} loading="lazy" />
            </a>
            <a href="https://www.gloworld.com" target="_blank" rel="noopener noreferrer" aria-label="Glo — Globacom">
              <img src="/logos/glo.png" alt="Glo — Globacom" style={{ height: 64, width: 'auto', maxWidth: 220, objectFit: 'contain', display: 'block' }} loading="lazy" />
            </a>
            <a href="https://www.routelinkgroup.com" target="_blank" rel="noopener noreferrer" aria-label="Routelink Group">
              <img src="/logos/routelink.png" alt="Routelink Group" style={{ height: 68, width: 'auto', maxWidth: 320, objectFit: 'contain', display: 'block' }} loading="lazy" />
            </a>
            <span aria-label="Rapidlink" style={{ fontWeight: 800, fontSize: 22, letterSpacing: '-.02em', color: 'var(--ink)' }}>Rapidlink</span>
          </div>
        </div>
      </section>
      <style>{`@media(max-width:1024px){ section.hero-section{ padding:48px 0 32px !important; min-height:0 !important } section .hero-map{ position:relative !important; right:auto !important; top:auto !important; transform:none !important; width:100% !important; height:380px !important; margin-top:12px; order:2 } section .hero-copy{ order:1 } }`}</style>

      <Marquee items={['CRF-NCS · CBN · NDPA · NCPS READY', 'ISO 27001 · NIST CSF · PCI DSS · CUSTOM', 'AI-DRIVEN · MULTI-TENANT · CLOUD-NATIVE']} />

      {/* WHAT GRC MEANS */}
      <section style={{ padding: '84px 0 0' }}>
        <div className="wrap">
          <Reveal><span className="eyebrow-mono">GRC, interwoven</span></Reveal>
          <Reveal delay={0.06}>
            <h2 className="display" style={{ fontSize: 'clamp(34px,5vw,64px)', margin: '14px 0 12px', maxWidth: 800 }}>One posture, three disciplines.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.65, maxWidth: '68ch', margin: '0 0 34px' }}>
              Governance, Risk Management and Compliance collectively underpin a robust cybersecurity posture — aligning
              initiatives with business objectives, legal obligations and risk tolerance.
            </p>
          </Reveal>
          <div className="story-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {grcTrio.map((c, i) => (
              <Reveal key={c.t} delay={i * 0.06}>
                <div className="glass" style={{ padding: 24 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--brand-deep)' }}>0{i + 1}</div>
                  <h3 style={{ margin: '8px 0', fontSize: 19 }}>{c.t}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PINNED STORY */}
      <section style={{ padding: '84px 0' }}>
        <div className="wrap">
          <Reveal><span className="eyebrow-mono">Governance, Risk & Compliance, Powered by NovrGRC</span></Reveal>
          <Reveal delay={0.06}>
            <h2 className="display" style={{ fontSize: 'clamp(34px,5vw,64px)', margin: '14px 0 34px', maxWidth: 800 }}>Organisation work in. Resilience insight out.</h2>
          </Reveal>
          <div className="story-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {[
              { n: '01', t: 'For service providers', d: 'Telecoms, banks, fintechs, insurers — automated risk, compliance, audit and policy workflows end-to-end.' },
              { n: '02', t: 'For regulators', d: 'Sector-wide visibility and reporting to measure and manage governance, risk and compliance.' },
              { n: '03', t: 'For the whole ecosystem', d: 'Smart Mapping across frameworks, regulator-ready templates, and dashboards boards actually read.' },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 0.06}>
                <div className="glass" style={{ padding: 24 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--brand-deep)' }}>{c.n}</div>
                  <h3 style={{ margin: '8px 0', fontSize: 19 }}>{c.t}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENTO OUTCOMES */}
      <section style={{ padding: '20px 0 84px' }}>
        <div className="wrap">
          <Reveal><span className="eyebrow-mono">Success criteria</span></Reveal>
          <Reveal delay={0.06}>
            <h2 className="display" style={{ fontSize: 'clamp(34px,5vw,64px)', margin: '14px 0 10px', maxWidth: 800 }}>Outcomes that matter.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.65, maxWidth: '64ch', margin: '0 0 26px' }}>
              The tests the platform is built to pass — for service providers and regulators alike.
            </p>
          </Reveal>
          <div className="bento-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginTop: 20 }}>
            {outcomes.map((o, i) => (
              <Reveal key={o.label} delay={(i % 3) * 0.06}>
                <div className="glass vault-scan bento-card" style={{ padding: 24, minHeight: 170 }}>
                  <div className="display" style={{ fontSize: 44, color: 'var(--brand-deep)' }}>
                    <CountUp value={o.value} suffix={o.suffix} />
                  </div>
                  <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink)', margin: '10px 0 0' }}>{o.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DARK BAND */}
      <section className="grain" style={{ position: 'relative', background: 'linear-gradient(135deg,var(--dark-band),var(--dark-band-2))', color: '#fff', textAlign: 'center', padding: '72px 0' }}>
        <div className="wrap">
          <Reveal>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.18em', color: 'var(--lime)' }}>● LIVE WALKTHROUGH — 20 MIN</div>
            <h2 className="display" style={{ fontSize: 'clamp(36px,6vw,72px)', margin: '14px 0 20px' }}>See NovrGRC in action.</h2>
            <Link to="/demo" className="btn-ghost" style={{ background: 'var(--lime)', borderColor: 'var(--lime)', fontWeight: 800 }}>Request a demo →</Link>
          </Reveal>
        </div>
      </section>
      <style>{`@media(max-width:860px){ .story-grid,.bento-grid{ grid-template-columns:1fr !important } .bento-card{ height:200px !important } }`}</style>
    </>
  )
}
