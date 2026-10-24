import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from '../utils/animation'

interface SectionHeadingProps {
  /** Número da secção em mono (ex.: '01'). */
  index: string
  title: string
  /** id para aria-labelledby da <section> envolvente. */
  id?: string
}

/** Cabeçalho de secção numerada — "01 — Projects" (índice mono em laranja). */
export function SectionHeading({ index, title, id }: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="flex items-baseline gap-4"
    >
      <span aria-hidden="true" className="font-mono text-sm text-accent">
        {index}
      </span>
      <span aria-hidden="true" className="font-mono text-sm text-faint">
        —
      </span>
      <h2 id={id} className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        {title}
      </h2>
    </motion.div>
  )
}
