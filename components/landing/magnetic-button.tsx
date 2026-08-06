'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function MagneticButton({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 12, mass: 0.2 })
  const springY = useSpring(y, { stiffness: 150, damping: 12, mass: 0.2 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - rect.left - rect.width / 2
    const relY = e.clientY - rect.top - rect.height / 2
    x.set(relX * 0.35)
    y.set(relY * 0.4)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`group relative inline-block ${className ?? ''}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"
        style={{ background: 'oklch(0.76 0.15 75 / 0.5)' }}
      />
      <span className="relative z-10">{children}</span>
    </motion.div>
  )
}
