import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE_SHARP } from '../utils/animation'

/**
 * Transição entre rotas — fade curto com deslocamento mínimo.
 * O respeito por prefers-reduced-motion vem do MotionConfig global.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.2, ease: EASE_SHARP }}
    >
      {children}
    </motion.div>
  )
}
