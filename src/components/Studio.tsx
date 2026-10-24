import { motion } from 'framer-motion'
import { useT } from '../i18n'
import { SectionHeading } from './SectionHeading'
import { fadeUp, staggerContainer, viewportOnce } from '../utils/animation'

/**
 * Studio — missão em 2 parágrafos + roadmap por fase.
 * Factos honestos: "The tools are free" é a ÚNICA menção a preço do site;
 * o item "Creators" está "under study", sem datas nem promessas.
 */
export function Studio() {
  const t = useT()

  return (
    <section
      id="studio"
      aria-labelledby="studio-title"
      className="scroll-mt-24 border-b border-line"
    >
      <div className="container-site py-16 sm:py-20">
        <SectionHeading index="02" title={t.studio.sectionTitle} id="studio-title" />

        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Missão */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="max-w-xl"
          >
            <motion.p variants={fadeUp} className="text-lg leading-relaxed text-ink">
              {t.studio.mission1}
            </motion.p>
            <motion.p variants={fadeUp} className="mt-5 text-[15px] leading-relaxed text-mist">
              {t.studio.mission2}
            </motion.p>
          </motion.div>

          {/* Roadmap */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <h3 className="label-mono">{t.studio.roadmapLabel}</h3>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {t.studio.roadmap.map((item) => (
                <li
                  key={item.name}
                  className="flex min-h-12 items-center justify-between gap-4 py-3"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-base font-medium tracking-tight text-ink">
                      {item.name}
                    </span>
                    <span className="mt-0.5 block text-sm text-mist">{item.desc}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2 font-mono text-[11px] text-meta">
                    <span aria-hidden="true" className="status-dot bg-faint" />
                    {item.status}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-xs text-faint">{t.studio.roadmapNote}</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
