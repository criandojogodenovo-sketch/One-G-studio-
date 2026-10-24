import { motion } from 'framer-motion'
import { ExternalLink, Github, Mail, MessageCircle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { apps } from '../data/apps'
import { site } from '../data/site'
import { repoUrl } from '../utils/download'
import { SectionHeading } from './SectionHeading'
import { fadeUp, staggerContainer, viewportOnce } from '../utils/animation'

const channelIcon: Record<string, LucideIcon> = {
  github: Github,
  email: Mail,
  social: MessageCircle,
}

/**
 * Contacto — canais centralizados em data/site.ts.
 * Apenas o GitHub é real; os restantes aparecem como "Coming soon"
 * (o site nunca inventa informações de contacto).
 */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24 py-24 sm:py-28">
      <div className="container-site">
        <SectionHeading kicker="Contact" title="Get in touch" description={site.contact.intro} />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-10 grid gap-6 lg:grid-cols-3"
        >
          {site.contact.channels.map((channel) => {
            const Icon = channelIcon[channel.id] ?? Mail
            return (
              <motion.div
                key={channel.id}
                variants={fadeUp}
                className={`card-surface card-sheen flex flex-col p-6 ${channel.available ? '' : 'opacity-70'}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border ${
                      channel.available
                        ? 'border-primary/25 bg-primary/[0.08] text-primary'
                        : 'border-white/10 bg-white/[0.03] text-mist'
                    }`}
                  >
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-base font-semibold">{channel.label}</h3>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">
                  {channel.description}
                </p>
                {channel.available ? (
                  <a
                    href={channel.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="btn btn-ghost mt-5 self-start"
                  >
                    <Icon size={16} aria-hidden="true" />
                    {channel.value}
                    <ExternalLink size={13} aria-hidden="true" className="text-mist/60" />
                  </a>
                ) : (
                  <span className="chip mt-5 self-start">Coming soon</span>
                )}
              </motion.div>
            )
          })}
        </motion.div>

        {/* Repositórios dos projetos */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12"
        >
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-mist">
            Project repositories
          </h3>
          <ul className="mt-4 flex flex-wrap gap-3">
            {apps.map((app) => (
              <li key={app.repo}>
                <a
                  href={repoUrl(app)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="chip min-h-11 !px-4 transition-colors duration-200 hover:border-primary/40 hover:text-ink"
                >
                  {app.repo}
                  <ExternalLink size={13} aria-hidden="true" className="text-mist/60" />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
