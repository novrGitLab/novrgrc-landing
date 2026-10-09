// Sector Pulse hero canvas — driven entirely by src/data/nigeria-dots.json
// (precomputed from geoBoundaries ADM1 via scripts/build-dots.mjs).
// No polygon math at runtime: dots/cities are plain points in a 1000x800
// space, scaled once to fit. Static dot map is pre-rendered offscreen;
// per frame we blit + draw the living overlay:
//   idle: regulator pulse, packets streaming hub->regulator, twinkling dots
//   hover: nearest state lights up + tooltip (city nodes get their own card)
//   click: shockwave ripple
import { useEffect, useRef } from 'react'
import mapData from '../data/nigeria-dots.json'

const FCT = mapData.states.findIndex((s) => s.name.includes('Abuja'))

const quad = (p0, c, p1, t) => {
  const u = 1 - t
  return [u * u * p0[0] + 2 * u * t * c[0] + t * t * p1[0], u * u * p0[1] + 2 * u * t * c[1] + t * t * p1[1]]
}

export default function NetworkCanvas({ animated = true, anchor = 'center' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    // mobile trims: lower pixel-ratio cap + fewer twinkles (battery/CPU)
    const isMobile = window.innerWidth < 768
    const DPR = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2)
    let w = 0, h = 0, scale = 1, ox = 0, oy = 0
    let raf = 0
    let visible = true
    const hover = { state: -1, city: null }
    const cursor = { x: 0, y: 0, inside: false }
    const ripples = []

    const toScreen = (x, y) => [ox + x * scale, oy + y * scale]
    const reg = mapData.cities.find((c) => c.role === 'regulator')
    const hubs = mapData.cities.filter((c) => c.role !== 'regulator')

    // packets streaming along each hub link
    const packets = hubs.flatMap((c, i) => [
      { hub: c, t: (i * 0.37) % 1, speed: 0.00022 + (i % 3) * 0.00006 },
      { hub: c, t: (i * 0.53 + 0.5) % 1, speed: 0.00018 + (i % 2) * 0.00007 },
    ])

    // twinkling dots (fixed subset, sine phase; fewer on mobile)
    const twinkles = Array.from({ length: isMobile ? 36 : 70 }, () => ({
      d: mapData.dots[(Math.random() * mapData.dots.length) | 0],
      phase: Math.random() * Math.PI * 2,
      speed: 1 + Math.random() * 2.2,
    }))

    // ---- static dot-map layer (rebuilt on resize only) ----
    const layer = document.createElement('canvas')
    const paintLayer = () => {
      layer.width = Math.max(1, Math.round(w * DPR))
      layer.height = Math.max(1, Math.round(h * DPR))
      const g = layer.getContext('2d')
      g.setTransform(DPR, 0, 0, DPR, 0, 0)
      g.clearRect(0, 0, w, h)
      const r = Math.max(1.4, 2 * scale)
      for (const dot of mapData.dots) {
        const [x, y] = toScreen(dot.x, dot.y)
        g.beginPath()
        g.arc(x, y, dot.s === FCT ? r * 1.25 : r, 0, Math.PI * 2)
        g.fillStyle = dot.s === FCT ? 'rgba(22,164,107,0.85)' : 'rgba(22,164,107,0.38)'
        g.fill()
      }
      // hub halos + cores
      for (const c of mapData.cities) {
        const [x, y] = toScreen(c.x, c.y)
        if (c.role === 'regulator') {
          g.beginPath(); g.arc(x, y, 15 * scale + 6, 0, Math.PI * 2)
          g.fillStyle = 'rgba(168,230,195,0.55)'; g.fill()
          g.beginPath(); g.arc(x, y, 7, 0, Math.PI * 2)
          g.fillStyle = '#0A2E22'; g.fill()
          g.beginPath(); g.arc(x, y, 3.2, 0, Math.PI * 2)
          g.fillStyle = '#C6FF4D'; g.fill()
        } else {
          g.beginPath(); g.arc(x, y, 8 * scale + 3, 0, Math.PI * 2)
          g.fillStyle = 'rgba(168,230,195,0.5)'; g.fill()
          g.beginPath(); g.arc(x, y, 3.4, 0, Math.PI * 2)
          g.fillStyle = '#16A46B'; g.fill()
          g.beginPath(); g.arc(x, y, 1.2, 0, Math.PI * 2)
          g.fillStyle = '#F3FBF6'; g.fill()
        }
      }
      // labels (wide containers only)
      if (w > 480) {
        g.font = '700 11px "JetBrains Mono", monospace'
        for (const c of mapData.cities) {
          const [x, y] = toScreen(c.x, c.y)
          g.fillStyle = c.role === 'regulator' ? '#0A2E22' : 'rgba(15,122,80,0.9)'
          g.fillText(c.role === 'regulator' ? 'ABUJA • REGULATOR' : c.name.toUpperCase(), x + 12, y + 4)
        }
      }
    }

    const linkGeom = (c) => {
      const r = toScreen(reg.x, reg.y)
      const p = toScreen(c.x, c.y)
      const mx = (r[0] + p[0]) / 2, my = (r[1] + p[1]) / 2
      return { r, p, c: [mx - (p[1] - r[1]) * 0.12, my + (p[0] - r[0]) * 0.12] }
    }

    function drawLinks(g, dashOffset) {
      g.save()
      g.strokeStyle = 'rgba(15,122,80,0.4)'
      g.lineWidth = 1.2
      g.setLineDash([5, 6])
      g.lineDashOffset = dashOffset
      for (const c of hubs) {
        const { r, p, c: ctrl } = linkGeom(c)
        g.beginPath()
        g.moveTo(r[0], r[1])
        g.quadraticCurveTo(ctrl[0], ctrl[1], p[0], p[1])
        g.stroke()
      }
      g.restore()
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width; h = rect.height
      canvas.width = Math.max(1, Math.round(w * DPR))
      canvas.height = Math.max(1, Math.round(h * DPR))
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      if (anchor === 'right' && w > 640) {
        scale = (h * 0.94) / mapData.height
        ox = w * 0.4 - 394.4 * scale + 60
        oy = (h - mapData.height * scale) / 2
      } else {
        scale = Math.min(w / mapData.width, h / mapData.height)
        ox = (w - mapData.width * scale) / 2
        oy = (h - mapData.height * scale) / 2
      }
      paintLayer()
      if (!animated) {
        ctx.clearRect(0, 0, w, h)
        ctx.drawImage(layer, 0, 0, w, h)
        drawLinks(ctx, 0)
      }
    }

    const pickHover = (mx, my) => {
      // cities first (generous hit radius)
      for (const c of mapData.cities) {
        const [x, y] = toScreen(c.x, c.y)
        if (Math.hypot(x - mx, y - my) < 26) return { city: c, state: -1 }
      }
      // nearest dot within ~22px highlights its state
      let best = null, bd = 22 * 22
      for (const d of mapData.dots) {
        const [x, y] = toScreen(d.x, d.y)
        const dd = (x - mx) * (x - mx) + (y - my) * (y - my)
        if (dd < bd) { bd = dd; best = d }
      }
      return { city: null, state: best ? best.s : -1 }
    }

    let last = performance.now()
    const step = (now) => {
      raf = requestAnimationFrame(step)
      if (!visible || document.hidden) { last = now; return }
      const dt = Math.min(64, now - last)
      last = now
      ctx.clearRect(0, 0, w, h)
      ctx.drawImage(layer, 0, 0, w, h)
      const tSec = now / 1000

      // cursor glow: nearby dots brighten + swell as you sweep through
      if (cursor.inside) {
        const R = 95
        const baseR = Math.max(1.4, 2 * scale)
        for (const d of mapData.dots) {
          const [x, y] = toScreen(d.x, d.y)
          const dx = x - cursor.x, dy = y - cursor.y
          if (dx > R || dx < -R || dy > R || dy < -R) continue
          const dist = Math.hypot(dx, dy)
          if (dist > R) continue
          const k = 1 - dist / R
          ctx.beginPath()
          ctx.arc(x, y, baseR * (1 + k * 1.1), 0, Math.PI * 2)
          ctx.fillStyle = `rgba(22,164,107,${(0.3 + k * 0.65).toFixed(3)})`
          ctx.fill()
        }
      }
      // hovered city ring
      if (hover.city) {
        const [x, y] = toScreen(hover.city.x, hover.city.y)
        ctx.beginPath(); ctx.arc(x, y, 13, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(198,255,77,0.95)'; ctx.lineWidth = 2; ctx.stroke()
      }

      // regulator pulse
      const [rx, ry] = toScreen(reg.x, reg.y)
      const pt = (tSec % 1.8) / 1.8
      ctx.beginPath()
      ctx.arc(rx, ry, 8 + pt * 30, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(22,164,107,${(0.5 * (1 - pt)).toFixed(3)})`
      ctx.lineWidth = 2
      ctx.stroke()

      drawLinks(ctx, -(now / 40) % 11)

      // packets streaming into the regulator
      for (const k of packets) {
        k.t += (k.speed * dt) % 1
        if (k.t > 1) k.t -= 1
        const { r, p, c: ctrl } = linkGeom(k.hub)
        const [x, y] = quad(r, ctrl, p, k.t)
        ctx.beginPath(); ctx.arc(x, y, 5.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(198,255,77,0.35)'; ctx.fill()
        ctx.beginPath(); ctx.arc(x, y, 2.4, 0, Math.PI * 2)
        ctx.fillStyle = '#0F7A50'; ctx.fill()
      }

      // twinkles
      for (const tw of twinkles) {
        const a = 0.12 + 0.5 * (0.5 + 0.5 * Math.sin(tSec * tw.speed + tw.phase))
        if (a < 0.2) continue
        const [x, y] = toScreen(tw.d.x, tw.d.y)
        ctx.beginPath(); ctx.arc(x, y, Math.max(1.4, 1.8 * scale), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(198,255,77,${a.toFixed(3)})`; ctx.fill()
      }

      // click ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i]
        rp.r += dt * 0.09 * scale + 1.2
        rp.a -= dt * 0.0009
        if (rp.a <= 0) { ripples.splice(i, 1); continue }
        const [x, y] = toScreen(rp.x, rp.y)
        ctx.beginPath(); ctx.arc(x, y, rp.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(22,164,107,${rp.a.toFixed(3)})`
        ctx.lineWidth = 2; ctx.stroke()
      }
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left, my = e.clientY - rect.top
      if (!animated) return
      const hit = pickHover(mx, my)
      hover.state = hit.state; hover.city = hit.city
      cursor.x = mx; cursor.y = my; cursor.inside = true
      // unmissable cursor feedback: pointer = locked onto something
      canvas.style.cursor = hit.city || hit.state >= 0 ? 'pointer' : 'crosshair'
    }
    const onLeave = () => {
      hover.state = -1; hover.city = null
      cursor.inside = false
      canvas.style.cursor = 'crosshair'
    }
    const onDown = (e) => {
      if (!animated) return
      const rect = canvas.getBoundingClientRect()
      const dx = (e.clientX - rect.left - ox) / scale
      const dy = (e.clientY - rect.top - oy) / scale
      ripples.push({ x: dx, y: dy, r: 4, a: 0.7 })
      if (ripples.length > 5) ripples.shift()
    }
    // listeners live on the canvas itself (it fills its container, and both
    // overlays above it are pointer-transparent) — no ambiguity about target
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)
    canvas.addEventListener('pointerdown', onDown)
    window.addEventListener('resize', resize)
    // container size also shifts without a window resize (webfonts loading,
    // images settling, content changes) — without this the backing store
    // desyncs from CSS size and drawing + mouse mapping drift apart
    let ro = null
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => resize())
      ro.observe(canvas)
    }
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { threshold: 0 })
    io.observe(canvas)

    resize()
    if (animated) raf = requestAnimationFrame(step)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      ro?.disconnect()
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
      canvas.removeEventListener('pointerdown', onDown)
      io.disconnect()
    }
  }, [animated, anchor])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: animated ? 'crosshair' : 'default' }}
    />
  )
}
