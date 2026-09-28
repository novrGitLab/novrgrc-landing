// Seamless infinite ticker: the track holds an EVEN number of identical
// copies, so translateX(-50%) lands on a pixel-identical frame — no jump.
// Copies scale with item count so half the track always overflows wide
// viewports (no blank gap on ultrawide).
export default function Marquee({ items, copies }) {
  const n = copies ?? Math.max(4, Math.ceil(8 / items.length) * 2)
  const even = n % 2 === 0 ? n : n + 1
  const row = Array.from({ length: even }, (_, c) =>
    items.map((t, i) => ({ t, copy: c > 0, key: `${c}-${i}` }))
  ).flat()
  return (
    <div className="marquee" aria-label="Highlights">
      <div className="marquee-track" style={{ padding: '14px 0' }}>
        {row.map(({ t, copy, key }) => (
          <span
            key={key}
            aria-hidden={copy || undefined}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '0 28px', whiteSpace: 'nowrap', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.08em', color: 'var(--brand-deep)', fontWeight: 700 }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--brand)', flexShrink: 0 }} />
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
