import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from '../utils/animation'

interface SectionHeadingProps {
  kicker: string
  title: string
  description?: string
}

/** Cabeçalho de seção com revelação ao rolar (kicker + título + descrição). */
export function SectionHeading({ kicker, title, description }: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="max-w-2xl"
    >
      <p className="kicker">{kicker}</p>
      <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-mist">{description}</p>}
    </motion.div>
  )
}
