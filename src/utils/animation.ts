/**
 * Sistema de movimento partilhado (Framer Motion).
 *
 * Princípios: apenas `transform` e `opacity`; revelações ao rolar acontecem
 * UMA vez; a cascata é curta. O respeito por prefers-reduced-motion é global
 * via <MotionConfig reducedMotion="user"> no App — o Framer desativa as
 * transformações automaticamente para quem pede menos movimento.
 */
import type { Variants } from 'framer-motion'

export const EASE_SHARP: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_SHARP } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE_SHARP } },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
}

/** Configuração padrão das revelações ao rolar (uma única vez). */
export const viewportOnce = { once: true, margin: '-64px' } as const
