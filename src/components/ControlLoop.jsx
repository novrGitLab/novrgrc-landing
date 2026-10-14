// Control Loop — the closed GRC loop drawn as a live operator board.
// DETECT → ASSESS → ACT → PROVE: a comet runs the forward track while a dashed
// arc carries the loop back, and the four stage cards beneath each run their own
// micro-visual — monitored controls, a residual-risk gauge, a remediation packet
// and an evidence stamp. The loop autoplays by default; stepping with the arrows
// or tapping a station hands control to the visitor for a few seconds, then the
// loop carries on from the stage they left it on.
// Two layouts share every card drawing: WIDE is 4-across, COMPACT is 2×2.
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const STAGES = [
  { n: '01', label: 'DETECT', title: 'Continuous monitoring' },
  { n: '02', label: 'ASSESS', title: 'Drift & risk scoring' },
  { n: '03', label: 'ACT', title: 'Automated remediation' },
  { n: '04', label: 'PROVE', title: 'Evidence & assurance' },
]

const CONTROLS = [
  { code: 'MFA', cov: 0.97 },
  { code: 'PATCH', cov: 0.86 },
  { code: 'BACKUP', cov: 0.93 },
  { code: 'INCIDENT', cov: 0.78 },
  { code: 'VENDOR', cov: 0.71 },
]

const FRAMEWORKS = ['CRF-NCS', 'CBN CSF', 'NDPA', 'ISO 27001', 'NIST CSF', 'PCI DSS']

// ASSESS is the only amber stage — risk is the one place the palette speaks up.
const ACCENT = ['#16A46B', '#E8A33D', '#0F7A50', '#16A46B']

const CARD_W = 212
const CARD_H = 200

const WIDE = {
  vb: '0 0 960 486',
  board: [16, 16, 928, 454], dividerY: 400,
  st: [145, 370, 595, 820], stY: 112, stR: 17, labelY: 86, arcDy: 51,
  arrow: { prevX: 104, nextX: 861, r: 15 },
  cards: [[32, 186], [260, 186], [488, 186], [716, 186]],
  chips: { x: 124, y: 418, w: 76, h: 24, gap: 10 },
  stats: { x: 928, y: 430, anchor: 'end' },
  covLabel: { x: 48, y: 430 },
  head: { clock: true },
  fs: { title: 13.5, eyebrow: 8, code: 7.5, micro: 6.5, tiny: 6, foot: 8, chip: 7, stat: 9, node: 9.5, head: 10 },
}
const COMPACT = {
  vb: '0 0 500 644',
  board: [8, 8, 484, 620], dividerY: 570,
  st: [80, 194, 307, 420], stY: 98, stR: 15, labelY: 74, arcDy: 32,
  arrow: { prevX: 44, nextX: 456, r: 14 },
  cards: [[24, 140], [264, 140], [24, 356], [264, 356]],
  chips: { x: 79, y: 592, w: 52, h: 20, gap: 6 },
  stats: { x: 250, y: 582, anchor: 'middle' },
  covLabel: null,
  head: { clock: false },
  fs: { title: 14, eyebrow: 8.5, code: 8.5, micro: 7.5, tiny: 7, foot: 9, chip: 8, stat: 8.5, node: 9, head: 9.5 },
}

const deg = (d) => (d * Math.PI) / 180
const polar = (cx, cy, r, a) => [cx + r * Math.cos(deg(a)), cy + r * Math.sin(deg(a))]

// Deterministic jitter (a hashed counter, not Math.random) so the numbers walk
// around between cycles without tripping the purity rules.
let seq = 0
const jitter = (n) => {
  seq += 1
  const h = Math.sin(seq * 12.9898) * 43758.5453
  return Math.floor((h - Math.floor(h)) * n)
}

// ── stage icons, drawn inside a 20×20 box ─────────────────────────────
function StageIcon({ kind, color }) {
  if (kind === 0) {
    return (
      <g fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round">
        <circle cx="10" cy="10" r="7.2" opacity=".5" />
        <path d="M10 10 L16.2 5.4" />
        <circle cx="10" cy="10" r="1.9" fill={color} stroke="none" />
      </g>
    )
  }
  if (kind === 1) {
    return (
      <g fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round">
        <path d="M4 13.6 A7.5 7.5 0 0 1 16 13.6" />
        <path d="M10 13.6 L14.4 8.6" />
      </g>
    )
  }
  if (kind === 2) {
    return (
      <path d="M12.2 3.2 L5.6 11.3 h3.3 l-1.1 5.5 6.6-8.3 h-3.4 z" fill={color} />
    )
  }
  return (
    <g fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="7.4" />
      <path d="M6.3 10.4 l2.7 2.7 4.9-5.4" />
    </g>
  )
}

// ── card chrome: index, title, focus accent, footer ───────────────────
function CardFrame({ x, y, i, focus, dim, fs, foot, children }) {
  const s = STAGES[i]
  return (
    <g className={`cl-card${focus ? ' is-focus' : ''}${dim ? ' is-dim' : ''}`}>
      <rect x={x} y={y} width={CARD_W} height={CARD_H} rx={18} filter="url(#clCard)"
        fill={focus ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.86)'}
        stroke={focus ? 'var(--line-strong)' : 'var(--line)'} strokeWidth="1" />
      {focus && <rect x={x + 16} y={y + 10} width={46} height={3} rx={1.5} fill={ACCENT[i]} />}
      <text x={x + 18} y={y + 26} className="cl-mono" fontSize={fs.eyebrow} letterSpacing="0.14em"
        fill="var(--brand-deep)">{s.n} — {s.label}</text>
      {focus && <circle className="cl-blink" cx={x + 194} cy={y + 22} r={3} fill={ACCENT[i]} />}
      <text x={x + 18} y={y + 46} className="cl-sans" fontSize={fs.title} fill="var(--ink)">{s.title}</text>
      <line x1={x + 16} y1={y + 58} x2={x + CARD_W - 16} y2={y + 58} stroke="var(--line)" strokeWidth="1" />
      {children}
      <line x1={x + 16} y1={y + 164} x2={x + CARD_W - 16} y2={y + 164} stroke="var(--line)" strokeWidth="1" />
      <text x={x + 18} y={y + 182} className="cl-mono-m" fontSize={fs.foot} fill="var(--muted)">{foot}</text>
    </g>
  )
}

// ── 01 DETECT: five monitored controls with a scanner sweeping them ────
function DetectCard({ x, y, drift, fs }) {
  return (
    <CardFrame x={x} y={y} i={0} fs={fs} foot="1,284 checks · last 24h">
      {CONTROLS.map((c, ri) => {
        const bad = drift === ri
        const ry = y + 70 + ri * 20
        return (
          <g key={c.code}>
            <text x={x + 18} y={ry + 3} className="cl-mono" fontSize={fs.code}
              fill={bad ? 'var(--cl-warn-ink)' : 'var(--ink)'} letterSpacing="0.04em">{c.code}</text>
            <rect x={x + 64} y={ry - 4} width={94} height={8} rx={4} fill="var(--mint)" />
            <rect className="cl-cov" x={x + 64} y={ry - 4} width={94 * (bad ? 0.5 : c.cov)} height={8} rx={4}
              fill={bad ? 'var(--cl-warn)' : 'var(--brand)'} />
            <rect className="cl-pass" x={x + 64} y={ry - 4} width={94} height={8} rx={4}
              fill="var(--lime)" style={{ '--i': ri }} />
            <circle key={`d${ri}-${bad}`} className={`cl-dot${bad ? ' cl-dotpop' : ''}`} cx={x + 176} cy={ry} r={bad ? 4.8 : 3.6}
              fill={bad ? 'var(--cl-warn)' : 'var(--brand)'} />
          </g>
        )
      })}
      <g className="cl-scan">
        <rect x={x + 14} y={y + 62} width={184} height={14} rx={7} fill="url(#clScan)" />
        <line x1={x + 16} y1={y + 69} x2={x + 196} y2={y + 69} stroke="var(--brand)" strokeWidth="1" strokeOpacity=".45" />
      </g>
    </CardFrame>
  )
}

// ── 02 ASSESS: residual-risk gauge that swings with the score ──────────
function AssessCard({ x, y, drift, risk, fs }) {
  const cx = x + 106, cy = y + 140, r = 52
  const a = polar(cx, cy, r, 190)
  const b = polar(cx, cy, r, 350)
  const arc = `M${a[0].toFixed(1)},${a[1].toFixed(1)} A${r},${r} 0 0 1 ${b[0].toFixed(1)},${b[1].toFixed(1)}`
  const hot = risk > 65
  const series = [0.18, 0.24, 0.2, 0.34, 0.5, 0.66, risk / 100]
  const tY = (p) => y + 80 - p * 15
  const tPts = series.map((p, i) => `${x + 118 + i * 13},${tY(p).toFixed(1)}`)

  return (
    <CardFrame x={x} y={y} i={1} fs={fs} foot="re-scored from live signals · 40ms">
      <g className={`cl-drift${drift >= 0 ? ' is-on' : ''}`}>
        <rect x={x + 16} y={y + 63} width={88} height={17} rx={8.5} fill="var(--cl-warn-bg)"
          stroke="var(--cl-warn)" strokeWidth="1" />
        <text x={x + 60} y={y + 75} className="cl-mono" fontSize={fs.tiny} letterSpacing="0.08em"
          textAnchor="middle" fill="var(--cl-warn-ink)">DRIFT DETECTED</text>
      </g>

      <polyline points={tPts.join(' ')} fill="none" stroke={hot ? 'var(--cl-warn)' : 'var(--brand)'}
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={x + 196} cy={tY(series[6])} r={2.4} fill={hot ? 'var(--cl-warn)' : 'var(--brand)'} />

      <path d={arc} fill="none" stroke="var(--line)" strokeWidth="9" strokeLinecap="round" />
      <path className="cl-gauge" d={arc} pathLength="100" fill="none" stroke="url(#clGauge)"
        strokeWidth="9" strokeLinecap="round" strokeDasharray="100" strokeDashoffset={100 - risk} />
      <g className="cl-needle" style={{ transform: `rotate(${((risk - 50) * 1.6).toFixed(1)}deg)`, transformOrigin: `${cx}px ${cy}px` }}>
        <line x1={cx} y1={cy} x2={cx} y2={cy - 40} stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round" />
      </g>
      <circle cx={cx} cy={cy} r={4.2} fill="var(--ink)" />
      <text x={cx} y={y + 114} className="cl-mono-m" fontSize={fs.tiny} letterSpacing="0.1em"
        textAnchor="middle" fill="var(--muted)">RESIDUAL RISK</text>
      <text x={cx} y={y + 136} className="cl-num" fontSize={22} textAnchor="middle" fill="var(--ink)">{risk}</text>
      <text x={cx} y={y + 152} className="cl-mono-m" fontSize={fs.tiny} letterSpacing="0.06em"
        textAnchor="middle" fill={hot ? 'var(--cl-warn-ink)' : 'var(--muted)'}>
        {hot ? 'ELEVATED · ACTING' : 'WITHIN APPETITE'}
      </text>
    </CardFrame>
  )
}

// ── 03 ACT: a gap travelling the wire and closing on the far node ──────
function ActCard({ x, y, drift, fs }) {
  return (
    <CardFrame x={x} y={y} i={2} fs={fs} foot="median close · 4.2 min">
      <rect x={x + 16} y={280} width={66} height={32} rx={9} fill="var(--cl-warn-bg)" stroke="var(--cl-warn)" strokeWidth="1" />
      <text x={x + 49} y={293} className="cl-mono" fontSize={fs.micro} textAnchor="middle" fill="var(--cl-warn-ink)">OPEN GAP</text>
      <text x={x + 49} y={305} className="cl-mono-m" fontSize={fs.tiny} textAnchor="middle" fill="var(--cl-warn-ink)" opacity=".75">
        {drift >= 0 ? 'detected' : 'monitoring'}
      </text>

      <line x1={x + 82} y1={296} x2={x + 130} y2={296} stroke="var(--line-strong)" strokeWidth="1.4" strokeDasharray="3 4" />
      <path d={`M${x + 124},292 l6,4 -6,4`} fill="none" stroke="var(--line-strong)" strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round" />
      <g className="cl-packet">
        <rect x={x + 64} y={294.5} width={20} height={3} rx={1.5} fill="var(--brand)" opacity=".28" />
        <circle cx={x + 86} cy={296} r={7.5} fill="var(--brand)" opacity=".16" />
        <circle cx={x + 86} cy={296} r={3.6} fill="var(--brand)" />
      </g>
      <circle className="cl-pulse" cx={x + 163} cy={296} r={20} fill="none" stroke="var(--brand)" strokeWidth="1.6" />

      <rect x={x + 130} y={280} width={66} height={32} rx={9} fill="rgba(22,164,107,0.13)" stroke="var(--brand)" strokeWidth="1" />
      <text x={x + 163} y={293} className="cl-mono" fontSize={fs.micro} textAnchor="middle" fill="var(--brand-deep)">CLOSED</text>
      <text x={x + 163} y={305} className="cl-mono-m" fontSize={fs.tiny} textAnchor="middle" fill="var(--brand-deep)" opacity=".75">
        {drift >= 0 ? 'approving' : 'verified'}
      </text>

      <text x={x + 106} y={330} className="cl-mono-m" fontSize={fs.micro} textAnchor="middle" fill="var(--muted)">
        You approve · NovrGRC executes
      </text>
      <text x={x + 106} y={344} className="cl-mono-m" fontSize={fs.micro} textAnchor="middle" fill="var(--brand-deep)">
        3 gaps → 0 · auto-closed
      </text>
    </CardFrame>
  )
}

// ── 04 PROVE: evidence pack, stamped and hashed ────────────────────────
function ProveCard({ x, y, fs }) {
  const sx = x + 150, sy = 320
  const lines = [74, 56, 66]
  return (
    <CardFrame x={x} y={y} i={3} fs={fs} foot="board & regulator ready · all year">
      <rect x={x + 62} y={250} width={92} height={84} rx={8} fill="#fff" stroke="var(--line)" strokeWidth="1" />
      <rect x={x + 70} y={258} width={24} height={4} rx={2} fill="var(--brand)" />
      <text x={x + 70} y={274} className="cl-mono" fontSize={fs.micro} fill="var(--brand-deep)">EVIDENCE #128</text>
      {lines.map((w, i) => (
        <rect key={i} x={x + 70} y={282 + i * 8} width={w} height={3} rx={1.5} fill="var(--mint)" />
      ))}
      <text x={x + 70} y={318} className="cl-mono-m" fontSize={fs.tiny} fill="var(--muted)">sha256 a91f…c3</text>

      <g transform={`rotate(-8 ${sx} ${sy})`}>
        <circle cx={sx} cy={sy} r={15} fill="rgba(198,255,77,0.35)" stroke="var(--brand)" strokeWidth="1.4" />
        <path d={`M${sx - 6.5},${sy + 0.5} l3.6,3.8 6.4,-7.4`} fill="none" stroke="var(--brand-deep)"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle className="cl-burst" cx={sx} cy={sy} r={15} fill="none" stroke="var(--brand)" strokeWidth="1.4" />
      </g>
      <text x={x + 106} y={346} className="cl-mono-m" fontSize={fs.tiny} textAnchor="middle" fill="var(--muted)">
        stamped · 4 frameworks
      </text>
    </CardFrame>
  )
}

export default function ControlLoop({ static: isStatic = false }) {
  const reduce = useReducedMotion()
  const settled = isStatic || !!reduce

  const [beat, setBeat] = useState(settled ? 3 : 0)
  const [drift, setDrift] = useState(-1)
  const [risk, setRisk] = useState(settled ? 44 : 58)
  const [stats, setStats] = useState({ checks: 1284, closed: 12, evidence: 4.2 })
  const [hold, setHold] = useState(false)
  const [now, setNow] = useState('')
  const [offscreen, setOffscreen] = useState(false)
  const [compact, setCompact] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 1000px)').matches)

  const rootRef = useRef(null)
  const pausedRef = useRef(false)
  const beatRef = useRef(beat)
  const resumeRef = useRef(null)
  const L = compact ? COMPACT : WIDE
  const focus = beat

  useEffect(() => { beatRef.current = beat }, [beat])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1000px)')
    const onChange = (e) => setCompact(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Wall clock — only while the board claims to be live.
  useEffect(() => {
    if (settled) return
    const tick = () => setNow(new Date().toLocaleTimeString('en-GB'))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [settled])

  useEffect(() => {
    if (settled) return
    const io = new IntersectionObserver(([e]) => {
      pausedRef.current = !e.isIntersecting
      setOffscreen(!e.isIntersecting)
    }, { threshold: 0.12 })
    if (rootRef.current) io.observe(rootRef.current)
    return () => io.disconnect()
  }, [settled])

  // Autoplay runs the loop by default. Any interaction hands control to the
  // visitor and holds it for HOLD_MS, then the loop picks up from the stage
  // they left it on rather than restarting from the top.
  const HOLD_MS = 9000
  const grab = (i) => {
    applyStage(i)
    setHold(true)
    clearTimeout(resumeRef.current)
    resumeRef.current = setTimeout(() => setHold(false), HOLD_MS)
  }

  useEffect(() => {
    if (settled) return
    const io = new IntersectionObserver(([e]) => {
      pausedRef.current = !e.isIntersecting
      setOffscreen(!e.isIntersecting)
    }, { threshold: 0.12 })
    if (rootRef.current) io.observe(rootRef.current)
    return () => io.disconnect()
  }, [settled])

  // One stage's worth of consequences — shared by autoplay and manual stepping.
  const applyStage = (i) => {
    setBeat(i)
    if (i === 0) { setDrift(-1); setRisk(52 + jitter(9)) }
    if (i === 1) { setDrift(2); setRisk(72 + jitter(11)) }
    if (i === 2) { setDrift(-1); setRisk(46 + jitter(9)) }
    if (i === 3) setStats((s) => ({ ...s, closed: s.closed + 1, evidence: Math.min(9.9, +(s.evidence + 0.1).toFixed(1)) }))
  }

  useEffect(() => {
    if (settled || hold) return
    let dead = false
    const timers = []
    const wait = (ms, fn) => {
      const id = setTimeout(() => { if (!dead) fn() }, ms)
      timers.push(id)
    }
    const later = (ms, fn) => {
      const tick = () => {
        if (dead) return
        if (pausedRef.current || document.hidden) { wait(300, tick); return }
        fn()
      }
      wait(ms, tick)
    }
    const cycle = (step) => {
      applyStage(step)
      later(step === 3 ? 2500 : 2150, () => cycle((step + 1) % 4))
    }
    later(700, () => cycle(beatRef.current))
    return () => { dead = true; timers.forEach(clearTimeout) }
  }, [settled, hold])

  useEffect(() => () => clearTimeout(resumeRef.current), [])

  const step = (d) => grab((beat + d + 4) % 4)
  const pick = (i) => grab(i)

  const [bx, by, bw, bh] = L.board
  const [x1, x2, x3, x4] = L.st
  const proving = beat === 3
  const driftClosed = stats.closed

  return (
    <svg ref={rootRef} viewBox={L.vb} xmlns="http://www.w3.org/2000/svg" role="group"
      aria-label="NovrGRC control loop"
      className="cl-root"
      style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
      data-off={offscreen ? '1' : '0'} data-static={settled ? '1' : '0'}
    >
      <title>NovrGRC control loop</title>
      <desc>
        A live board showing the closed GRC loop — detect, assess, act, prove — with monitored
        controls, a residual-risk gauge, automated remediation and stamped evidence.
      </desc>

      <defs>
        <style>{`
          .cl-mono   { font-family:var(--font-mono); font-weight:700 }
          .cl-mono-m { font-family:var(--font-mono); font-weight:500 }
          .cl-sans   { font-family:var(--font-body); font-weight:700; letter-spacing:-0.01em }
          .cl-num    { font-family:var(--font-body); font-weight:800; font-variant-numeric:tabular-nums;
                       letter-spacing:-0.03em }
          .cl-root { --cl-warn:#E8A33D; --cl-warn-bg:rgba(232,163,61,0.13); --cl-warn-ink:#8A5A00 }

          @keyframes cl-in    { from{opacity:0; transform:translateY(14px)} to{opacity:1; transform:none} }
          @keyframes cl-beam  { 0%{transform:translateX(0); opacity:0}
                                6%{opacity:1} 90%{opacity:1}
                                100%{transform:translateX(var(--run)); opacity:0} }
          @keyframes cl-flow  { to { stroke-dashoffset:-11 } }
          @keyframes cl-scan  { 0%{transform:translateY(0); opacity:0} 10%{opacity:.9}
                                72%{opacity:.9} 86%,100%{transform:translateY(84px); opacity:0} }
          @keyframes cl-pass  { 0%{opacity:0} 14%{opacity:.55} 46%{opacity:0} 100%{opacity:0} }
          @keyframes cl-packet{ 0%{transform:translateX(0); opacity:0} 8%{opacity:1}
                                60%{transform:translateX(44px); opacity:1}
                                72%,100%{transform:translateX(52px); opacity:0} }
          @keyframes cl-pulse { 0%{transform:scale(.85); opacity:.6} 75%{transform:scale(1.45); opacity:0}
                                100%{transform:scale(1.45); opacity:0} }
          @keyframes cl-burst { 0%{transform:scale(1); opacity:.75} 100%{transform:scale(2.1); opacity:0} }
          @keyframes cl-blink { 0%,100%{opacity:1} 50%{opacity:.25} }
          @keyframes cl-halo  { 0%,100%{opacity:.35} 50%{opacity:.9} }
          @keyframes cl-twin   { 0%,100%{opacity:.25} 50%{opacity:1} }
          @keyframes cl-dotpop { 0%{transform:scale(.3)} 60%{transform:scale(1.45)} 100%{transform:scale(1)} }

          .cl-in { animation:cl-in .7s var(--ease) both }
          .cl-beam   { animation:cl-beam 4.6s linear infinite; will-change:transform }
          .cl-return { animation:cl-flow 1.5s linear infinite }
          .cl-scan   { animation:cl-scan 2.9s ease-in-out infinite; will-change:transform }
          .cl-pass   { opacity:0; animation:cl-pass 2.9s ease-out infinite;
                       animation-delay:calc(var(--i) * 0.49s) }
          .cl-packet { opacity:0; animation:cl-packet 2.2s var(--ease) infinite }
          .cl-pulse  { opacity:0; animation:cl-pulse 2.2s ease-out infinite;
                       transform-box:fill-box; transform-origin:center }
          .cl-burst  { opacity:0; animation:cl-burst 2.4s ease-out infinite;
                       transform-box:fill-box; transform-origin:center }
          .cl-blink  { animation:cl-blink 1.6s ease-in-out infinite }
          .cl-halo   { animation:cl-halo 1.6s ease-in-out infinite }
          .cl-twin   { animation:cl-twin 3.2s ease-in-out infinite }
          .cl-dot    { transition:fill .3s var(--ease) }
          .cl-dotpop { transform-box:fill-box; transform-origin:center;
                       animation:cl-dotpop .5s var(--ease) }
          .cl-cov    { transition:width .55s var(--ease), fill .35s var(--ease) }
          .cl-gauge  { transition:stroke-dashoffset .9s var(--ease) }
          .cl-needle { transition:transform .9s var(--ease) }
          .cl-drift  { opacity:0; transform:scale(.9); transform-box:fill-box; transform-origin:center;
                       transition:opacity .35s var(--ease), transform .35s var(--ease) }
          .cl-drift.is-on { opacity:1; transform:none }

          .cl-card { opacity:1; transition:transform .4s var(--ease), opacity .4s var(--ease) }
          .cl-card:hover { transform:translateY(-4px) }
          .cl-card.is-dim { opacity:.55 }
          .cl-chip rect { transition:fill .45s var(--ease), stroke .45s var(--ease) }
          .cl-chip text { transition:fill .45s var(--ease) }
          .cl-stn { cursor:pointer }
          .cl-stn:focus { outline:none }
          .cl-stn .cl-focusring { stroke:transparent; stroke-width:2 }
          .cl-stn:focus-visible .cl-focusring { stroke:var(--brand) }
          .cl-arrow { cursor:pointer }
          .cl-arrow:focus { outline:none }
          .cl-arrowbg { transition:fill .25s var(--ease), stroke .25s var(--ease) }
          .cl-chev { transition:stroke .25s var(--ease) }
          .cl-arrow:hover .cl-arrowbg,
          .cl-arrow:focus-visible .cl-arrowbg { fill:var(--brand); stroke:var(--brand); stroke-width:1.4 }
          .cl-arrow:hover .cl-chev,
          .cl-arrow:focus-visible .cl-chev { stroke:#fff }

          .cl-root[data-off="1"] *, .cl-root[data-static="1"] * { animation:none !important }
          @media (prefers-reduced-motion: reduce) { .cl-card:hover { transform:none } }
        `}</style>

        <pattern id="clDots" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" fill="#0F7A50" fillOpacity="0.14" />
        </pattern>
        <linearGradient id="clScan" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#16A46B" stopOpacity="0" />
          <stop offset="50%" stopColor="#16A46B" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#16A46B" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="clTrack" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#DFF5E8" />
          <stop offset="50%" stopColor="#A8E6C3" />
          <stop offset="100%" stopColor="#DFF5E8" />
        </linearGradient>
        <linearGradient id="clTrail" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#16A46B" stopOpacity="0" />
          <stop offset="100%" stopColor="#16A46B" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="clGauge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#16A46B" />
          <stop offset="42%" stopColor="#16A46B" />
          <stop offset="76%" stopColor="#E8A33D" />
          <stop offset="100%" stopColor="#E8A33D" />
        </linearGradient>
        <filter id="clCard" x="-12%" y="-12%" width="124%" height="132%">
          <feDropShadow dx="0" dy="3" stdDeviation="7" floodColor="#0A2E22" floodOpacity="0.08" />
        </filter>
        <clipPath id="clClip"><rect x={bx} y={by} width={bw} height={bh} rx={26} /></clipPath>
      </defs>

      <g className="cl-in">
        {/* ── board ── */}
        <rect x={bx} y={by} width={bw} height={bh} rx={26} fill="rgba(255,255,255,0.82)"
          stroke="var(--line)" strokeWidth="1" />
        <g clipPath="url(#clClip)">
          <rect x={bx} y={by} width={bw} height={bh} fill="url(#clDots)" opacity=".6" />
          <ellipse cx={bx + 150} cy={by - 40} rx={400} ry={210} fill="#DFF5E8" opacity=".55" />
          <ellipse cx={bx + bw - 60} cy={by + 90} rx={280} ry={180} fill="#E9F9F0" opacity=".7" />
        </g>

        {/* ── header ── */}
        <circle cx={bx + 32} cy={by + 25} r={4} fill="var(--brand)" />
        <circle className="cl-halo" cx={bx + 32} cy={by + 25} r={9} fill="none" stroke="var(--brand)" strokeWidth="1.2" />
        <text x={bx + 46} y={by + 29} className="cl-mono" fontSize={L.fs.head} letterSpacing="0.14em"
          fill="var(--brand-deep)">{L.head.clock ? 'LIVE CONTROL MONITORING' : 'CONTROL MONITORING'}</text>

        {L.head.clock && (
          <text x={bx + bw - 16} y={by + 29} textAnchor="end" className="cl-mono-m" fontSize={L.fs.stat}
            fill="var(--muted)" style={{ fontVariantNumeric: 'tabular-nums' }}>{now}</text>
        )}

        <line x1={bx + 16} y1={by + 42} x2={bx + bw - 16} y2={by + 42} stroke="var(--line)" strokeWidth="1" />

        {/* ── the loop: forward track, returning arc, four stations ── */}
        <text x={x1} y={L.labelY} className="cl-mono" fontSize={L.fs.node} letterSpacing="0.12em" textAnchor="middle"
          fill={focus === 0 ? 'var(--ink)' : 'var(--muted)'}>DETECT</text>
        <text x={x2} y={L.labelY} className="cl-mono" fontSize={L.fs.node} letterSpacing="0.12em" textAnchor="middle"
          fill={focus === 1 ? 'var(--ink)' : 'var(--muted)'}>ASSESS</text>
        <text x={x3} y={L.labelY} className="cl-mono" fontSize={L.fs.node} letterSpacing="0.12em" textAnchor="middle"
          fill={focus === 2 ? 'var(--ink)' : 'var(--muted)'}>ACT</text>
        <text x={x4} y={L.labelY} className="cl-mono" fontSize={L.fs.node} letterSpacing="0.12em" textAnchor="middle"
          fill={focus === 3 ? 'var(--ink)' : 'var(--muted)'}>PROVE</text>

        <path className="cl-return"
          d={`M${x4},${L.stY} C${x4 - 60},${L.stY + L.arcDy} ${x1 + 60},${L.stY + L.arcDy} ${x1},${L.stY}`}
          fill="none" stroke="var(--soft-green)" strokeWidth="2" strokeDasharray="2 9" strokeLinecap="round" opacity=".85" />
        <rect x={x1} y={L.stY - 2} width={x4 - x1} height={4} rx={2} fill="url(#clTrack)" />

        {L.st.map((sx, i) => (
          <g key={STAGES[i].label} className="cl-stn" role="button" tabIndex={0}
            aria-label={`${STAGES[i].label} — ${STAGES[i].title}${focus === i ? ' (selected)' : ''}`}
            aria-pressed={focus === i}
            onClick={() => pick(i)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(i) } }}>
            {focus === i && <circle className="cl-halo" cx={sx} cy={L.stY} r={L.stR + 10} fill={ACCENT[i]} opacity=".14" />}
            <circle cx={sx} cy={L.stY} r={L.stR} fill={focus === i ? ACCENT[i] : '#fff'}
              stroke={focus === i ? 'none' : 'var(--line-strong)'} strokeWidth="1.2" />
            {focus === i && (
              <circle className="cl-halo" cx={sx} cy={L.stY} r={L.stR + 6} fill="none"
                stroke={ACCENT[i]} strokeWidth="1.4" />
            )}
            <g transform={`translate(${sx - 10} ${L.stY - 10})`}>
              <StageIcon kind={i} color={focus === i ? '#fff' : 'var(--brand)'} />
            </g>
            <rect className="cl-focusring" x={sx - L.stR - 8} y={L.stY - L.stR - 8}
              width={(L.stR + 8) * 2} height={(L.stR + 8) * 2} rx={L.stR + 8} fill="none" />
          </g>
        ))}

        <g className="cl-beam" style={{ '--run': `${x4 - x1}px` }}>
          <rect x={x1 - 42} y={L.stY - 1.5} width={42} height={3} rx={1.5} fill="url(#clTrail)" />
          <circle cx={x1 - 6} cy={L.stY} r={9} fill="var(--brand)" opacity=".16" />
          <circle cx={x1} cy={L.stY} r={4.2} fill="var(--brand)" />
        </g>

        {/* ── stepper: previous / next stage, either end of the track ── */}
        {[-1, 1].map((d) => {
          const target = (beat + d + 4) % 4
          const ax = d < 0 ? L.arrow.prevX : L.arrow.nextX
          const chev = d < 0 ? `M${ax + 4},${L.stY - 5} l-6,5 6,5` : `M${ax - 4},${L.stY - 5} l6,5 -6,5`
          return (
            <g key={d} className="cl-arrow" role="button" tabIndex={0}
              aria-label={`${d < 0 ? 'Previous' : 'Next'} stage — ${STAGES[target].label}: ${STAGES[target].title}`}
              onClick={() => step(d)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); step(d) } }}>
              <circle className="cl-arrowbg" cx={ax} cy={L.stY} r={L.arrow.r} fill="#fff"
                stroke="var(--line-strong)" strokeWidth="1" />
              <path className="cl-chev" d={chev} fill="none" stroke="var(--brand-deep)" strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round" />
              <circle cx={ax} cy={L.stY} r={L.arrow.r + 7} fill="transparent" />
            </g>
          )
        })}

        {/* ── the four stage cards ── */}
        {L.cards.map(([cx0, cy0], i) => {
          const dim = hold && focus !== i
          const props = { x: cx0, y: cy0, focus: focus === i, dim, fs: L.fs }
          if (i === 0) return <DetectCard key="c0" {...props} drift={drift} />
          if (i === 1) return <AssessCard key="c1" {...props} drift={drift} risk={risk} />
          if (i === 2) return <ActCard key="c2" {...props} drift={drift} />
          return <ProveCard key="c3" {...props} />
        })}

        {/* ── footer: framework coverage + live counters ── */}
        <line x1={bx + 16} y1={L.dividerY} x2={bx + bw - 16} y2={L.dividerY} stroke="var(--line)" strokeWidth="1" />
        {L.covLabel && (
          <text x={L.covLabel.x} y={L.covLabel.y} className="cl-mono" fontSize={L.fs.foot} letterSpacing="0.12em"
            fill="var(--muted)">COVERS</text>
        )}
        <text x={L.stats.x} y={L.stats.y} textAnchor={L.stats.anchor} className="cl-mono-m" fontSize={L.fs.stat}
          fill="var(--muted)" style={{ fontVariantNumeric: 'tabular-nums' }}>
          {`CHECKS ${stats.checks.toLocaleString('en-GB')} · DRIFT CLOSED ${driftClosed}${compact ? '' : ` · EVIDENCE ${stats.evidence.toFixed(1)}k`}`}
        </text>

        {FRAMEWORKS.map((fw, i) => (
          <g key={fw} className={`cl-chip${proving ? ' is-on' : ''}`}
            style={{ transitionDelay: `${i * 90}ms` }}>
            <rect x={L.chips.x + i * (L.chips.w + L.chips.gap)} y={L.chips.y} width={L.chips.w} height={L.chips.h}
              rx={L.chips.h / 2} fill={proving ? 'var(--brand-deep)' : '#fff'}
              stroke={proving ? 'var(--brand-deep)' : 'var(--line)'} strokeWidth="1" />
            <text x={L.chips.x + i * (L.chips.w + L.chips.gap) + L.chips.w / 2} y={L.chips.y + L.chips.h / 2 + 2.6}
              textAnchor="middle" className="cl-mono" fontSize={L.fs.chip} letterSpacing="0.04em"
              fill={proving ? 'var(--lime)' : 'var(--muted)'}>{fw}</text>
          </g>
        ))}
      </g>

      {/* corner dots — the site's brand motif */}
      <circle className="cl-twin" cx={bx + 14} cy={by + 14} r={2.5} fill="#16A46B" fillOpacity=".3" />
      <circle className="cl-twin" cx={bx + bw - 14} cy={by + 14} r={2.5} fill="#16A46B" fillOpacity=".3" />
      <circle className="cl-twin" cx={bx + 14} cy={by + bh - 14} r={2.5} fill="#0F7A50" fillOpacity=".3" />
      <circle className="cl-twin" cx={bx + bw - 14} cy={by + bh - 14} r={2.5} fill="#0F7A50" fillOpacity=".3" />
    </svg>
  )
}
