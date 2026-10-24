import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Gift, Github, Smartphone, WifiOff } from 'lucide-react'
import { site } from '../data/site'
import { fadeUp, staggerContainer } from '../utils/animation'

/**
 * Hero — primeira impressão do estúdio.
 * Movimento: gradientes ambientais lentos (CSS, sem blur de filtro),
 * grelha geométrica com máscara radial, anel orbital decorativo e entrada
 * em cascata do texto/botões (Framer Motion). Sem imagens pesadas.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="noise relative overflow-hidden">
      {/* Camadas ambientais (decorativas) */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="bg-grid-mask absolute inset-0" />
        <div className="ambient-primary animate-drift absolute -top-44 left-[-16%] h-[36rem] w-[36rem]" />
        <div className="ambient-secondary animate-drift-alt absolute -bottom-56 right-[-14%] h-[38rem] w-[38rem]" />

        {/* Anel orbital — o "O" da marca em escala monumental */}
        <svg
          className="animate-spin-slower absolute -right-28 top-1/2 hidden h-[36rem] w-[36rem] -translate-y-1/2 text-white/[0.05] lg:block"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="100" cy="100" r="86" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 9" />
          <circle cx="100" cy="100" r="56" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="186" cy="100" r="2.6" fill="#FF7A18" />
          <circle cx="100" cy="44" r="1.6" fill="#00D9FF" />
        </svg>

        {/* Marcas de coordenadas */}
        <svg className="absolute left-[12%] top-24 hidden text-white/10 md:block" width="17" height="17" viewBox="0 0 17 17" fill="none">
          <path d="M8.5 0v17M0 8.5h17" stroke="currentColor" strokeWidth="1" />
        </svg>
        <svg className="absolute bottom-20 right-[18%] hidden text-white/10 md:block" width="17" height="17" viewBox="0 0 17 17" fill="none">
          <path d="M8.5 0v17M0 8.5h17" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* Conteúdo */}
      <div className="container-site relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl pb-20 pt-28 text-center sm:pb-28 sm:pt-36"
        >
          <motion.p
            variants={fadeUp}
            className="badge mx-auto border-primary/30 bg-primary/[0.08] text-primary"
          >
            <span
              aria-hidden="true"
              className="animate-pulse-soft inline-block h-1.5 w-1.5 rounded-full bg-primary"
            />
            Independent Android studio
          </motion.p>

          <motion.h1
            id="hero-title"
            variants={fadeUp}
            className="mt-7 font-display text-4xl font-bold leading-[1.07] tracking-tight sm:text-6xl lg:text-7xl"
          >
            One studio.
            <br />
            Four apps.
            <br />
            <span className="text-brand-gradient">Zero cost.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-mist sm:text-lg"
          >
            ONE G STUDIO crafts native Android experiences — 3D modeling, a mobile game
            engine, video editing and pixel art. Offline-first, tuned for low-end phones,
            free for everyone.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link to="/#apps" className="btn btn-primary w-full sm:w-auto">
              Explore the apps
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a
              href={site.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-ghost w-full sm:w-auto"
            >
              <Github size={18} aria-hidden="true" />
              GitHub
            </a>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-mist"
          >
            <li className="inline-flex items-center gap-2">
              <WifiOff size={16} className="text-secondary" aria-hidden="true" />
              Offline-first
            </li>
            <li className="inline-flex items-center gap-2">
              <Smartphone size={16} className="text-primary" aria-hidden="true" />
              Low-end friendly
            </li>
            <li className="inline-flex items-center gap-2">
              <Gift size={16} className="text-primary" aria-hidden="true" />
              100% free
            </li>
          </motion.ul>
        </motion.div>
      </div>

      {/* Desvanecimento para a seção seguinte */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-canvas"
      />
    </section>
  )
}
