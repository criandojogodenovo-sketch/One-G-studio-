import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE_SHARP } from '../utils/animation'

/**
 * Transição suave entre rotas (fade + deslize curto).
 * O respeito por prefers-reduced-motion vem do MotionConfig global.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.26, ease: EASE_SHARP }}
    >
      {children}
    </motion.div>
  )
}
