import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { apps } from '../data/apps'
import { site } from '../data/site'
import { isDownloadEnabled } from '../utils/download'
import { useT } from '../i18n'
import { fadeUp, staggerContainer } from '../utils/animation'

/**
 * Hero — título grande alinhado à esquerda (frase direta sobre o que o
 * estúdio faz) e, ao lado, o "índice de build" em mono com os 4 projetos
 * e o estado de cada um. Fundo limpo: sem brilhos, sem glow, sem grelhas.
 * Um botão principal ("View projects") e um link secundário para o GitHub.
 */
export function Hero() {
  const t = useT()

  return (
    <section aria-labelledby="hero-title" className="border-b border-line">
      <div className="container-site grid gap-14 pb-16 pt-28 sm:pt-32 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pb-24 lg:pt-40">
        {/* Coluna esquerda — título direto, sem gradiente */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.p variants={fadeUp} className="label-mono">
            {site.tagline}
          </motion.p>

          <motion.h1
            id="hero-title"
            variants={fadeUp}
            className="mt-7 max-w-2xl font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold leading-[1.03] tracking-[-0.03em] text-ink"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-7 max-w-xl text-[15px] leading-relaxed text-mist">
            {t.hero.lead}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link to="/#projects" className="btn-primary">
              {t.hero.viewProjects}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <a
              href={site.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="link-quiet"
            >
              {t.hero.github}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>

        {/* Coluna direita — índice de build em mono */}
        <motion.nav
          aria-label={t.hero.indexLabel}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="crop-marks lg:border-l lg:border-line lg:pl-12"
        >
          <h2 className="label-mono">{t.hero.indexLabel}</h2>
          <ul className="mt-5 divide-y divide-line border-y border-line">
            {apps.map((app, index) => {
              const available = isDownloadEnabled(app)
              return (
                <li key={app.id}>
                  <Link
                    to={`/apps/${app.id}`}
                    className="group flex min-h-14 items-center gap-3 py-3 transition-colors duration-200 hover:bg-raised sm:gap-4"
                  >
                    <span aria-hidden="true" className="w-7 shrink-0 font-mono text-xs text-faint">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0 flex-1 font-display text-base font-medium tracking-tight text-ink">
                      {app.nome}
                    </span>
                    <span
                      aria-hidden="true"
                      className="hidden font-mono text-xs text-meta sm:block"
                    >
                      {app.versao}
                    </span>
                    <span className="flex shrink-0 items-center gap-2 font-mono text-[11px] text-meta">
                      <span
                        aria-hidden="true"
                        className={`status-dot ${available ? 'bg-accent' : 'bg-faint'}`}
                      />
                      <span className="hidden sm:inline">
                        {available ? t.status.available : t.status.inDevelopment}
                      </span>
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </motion.nav>
      </div>
    </section>
  )
}
