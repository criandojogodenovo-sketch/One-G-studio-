import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { usePageMeta } from '../lib/seo'
import { useT } from '../i18n'
import { fadeUp, staggerContainer } from '../utils/animation'

/** 404 — rota inexistente. Sóbria, no idioma ativo. Marcada como noindex. */
export default function NotFound() {
  const t = useT()

  usePageMeta({
    title: t.seo.notFoundTitle,
    description: t.seo.notFoundDescription,
    noIndex: true,
  })

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="container-site pb-28 pt-16 sm:pt-20"
    >
      <motion.p variants={fadeUp} className="label-mono">
        {t.notFound.code}
      </motion.p>
      <motion.h1
        variants={fadeUp}
        className="mt-5 font-display text-5xl font-semibold tracking-tight text-ink sm:text-6xl"
      >
        {t.notFound.title}
      </motion.h1>
      <motion.p variants={fadeUp} className="mt-5 max-w-md text-[15px] leading-relaxed text-mist">
        {t.notFound.lead}
      </motion.p>
      <motion.div variants={fadeUp} className="mt-10">
        <Link to="/" className="btn-primary">
          <ArrowLeft size={14} aria-hidden="true" />
          {t.notFound.back}
        </Link>
      </motion.div>
    </motion.section>
  )
}
