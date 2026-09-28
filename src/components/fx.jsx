import { motion } from 'framer-motion'

export function Reveal({ children, delay = 0, y = 22, ...rest }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export function MagneticButton({ children, style, ...props }) {
  const onMove = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    el.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`
  }
  const onLeave = (e) => { e.currentTarget.style.transform = '' }
  return (
    <motion.div
      className="magnetic"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ display: 'inline-flex', ...style }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
