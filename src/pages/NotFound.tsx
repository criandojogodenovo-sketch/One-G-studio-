import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { usePageMeta } from '../lib/seo'
import { LogoMark } from '../components/Logo'
import { fadeUp, staggerContainer } from '../utils/animation'

/** 404 — rota inexistente. Marcada como noindex. */
export default function NotFound() {
  usePageMeta({
    title: 'Page not found',
    description: 'The page you are looking for does not exist or has moved.',
    noIndex: true,
  })

  return (
    <section className="noise relative grid min-h-[82vh] place-items-center overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="bg-grid-mask absolute inset-0" />
        <div className="ambient-primary absolute -top-32 left-1/4 h-96 w-96 opacity-70" />
        <div className="ambient-secondary absolute -bottom-32 right-1/4 h-96 w-96 opacity-70" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="container-site relative py-32 text-center"
      >
        <motion.div variants={fadeUp} className="relative mx-auto h-28 w-28">
          <LogoMark size={112} className="absolute inset-0 opacity-30" />
          <span
            aria-hidden="true"
            className="animate-spin-slower absolute inset-0 rounded-full border border-dashed border-secondary/30"
          />
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-primary"
        >
          Error 404
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-6xl"
        >
          Lost in <span className="text-brand-gradient">orbit</span>
        </motion.h1>
        <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-md leading-relaxed text-mist">
          The page you are looking for doesn't exist or has moved. Let's get you back to a
          known orbit.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-9 flex justify-center">
          <Link to="/" className="btn btn-primary">
            <ArrowLeft size={16} aria-hidden="true" />
            Back to home
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
