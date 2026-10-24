import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { EASE_SHARP } from '../utils/animation'

interface CounterProps {
  value: number
  suffix?: string
  duration?: number
}

/**
 * Contador animado — conta de 0 até `value` quando entra no viewport.
 * Com prefers-reduced-motion o valor final aparece imediatamente.
 */
export function Counter({ value, suffix = '', duration = 1.4 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, {
      duration,
      ease: EASE_SHARP,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    })
    return () => controls.stop()
  }, [inView, value, reduced, duration])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}
