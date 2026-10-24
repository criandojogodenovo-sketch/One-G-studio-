import { motion, useScroll, useSpring } from 'framer-motion'

/** Linha de progresso de leitura no topo — 2px, laranja sólido. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 })
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-accent"
      style={{ scaleX }}
    />
  )
}
