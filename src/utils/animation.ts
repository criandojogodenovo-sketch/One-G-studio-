/**
 * Sistema de movimento partilhado (Framer Motion).
 *
 * Princípios: movimento discreto e funcional — fades de 200-400 ms,
 * deslocamentos de poucos px, nada em loop. Apenas `transform` e
 * `opacity`. O respeito por prefers-reduced-motion é global via
 * <MotionConfig reducedMotion="user"> no App.
 */
import type { Variants } from 'framer-motion'

export const EASE_SHARP: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: EASE_SHARP } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.28, ease: 'easeOut' } },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
}

/** Configuração padrão das revelações ao rolar (uma única vez). */
export const viewportOnce = { once: true, margin: '-48px' } as const
