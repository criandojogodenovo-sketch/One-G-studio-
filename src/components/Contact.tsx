import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { site } from '../data/site'
import { useT } from '../i18n'
import { SectionHeading } from './SectionHeading'
import { fadeUp, viewportOnce } from '../utils/animation'

/**
 * Contact — apenas canais que existem de verdade (GitHub). Nada de cartões
 * vazios "Coming soon": uma frase honesta sobre abrir uma issue e um aviso
 * curto de que mais canais serão anunciados. Canais futuros entram em
 * src/data/site.ts quando existirem.
 */
export function Contact() {
  const t = useT()

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24">
      <div className="container-site py-16 sm:py-20">
        <SectionHeading index="03" title={t.contact.sectionTitle} id="contact-title" />

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="max-w-xl text-[15px] leading-relaxed text-mist"
          >
            {t.contact.lead}
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="crop-marks h-fit border border-line p-6"
          >
            <p className="label-mono">GitHub</p>
            <a
              href={site.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-3 inline-flex min-h-11 items-center gap-2.5 font-display text-xl font-medium tracking-tight text-ink transition-colors duration-200 hover:text-accent"
            >
              {site.githubUser}
              <ArrowUpRight size={18} aria-hidden="true" className="text-meta" />
            </a>
            <p className="mt-2 text-sm leading-relaxed text-mist">{t.contact.githubDesc}</p>
          </motion.div>
        </div>

        <p className="mt-10 font-mono text-xs text-faint">{t.contact.channelsNote}</p>
      </div>
    </section>
  )
}
