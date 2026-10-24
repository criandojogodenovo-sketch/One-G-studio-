import { motion } from 'framer-motion'
import { Gift, Smartphone, WifiOff } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { Counter } from './Counter'
import { fadeUp, staggerContainer, viewportOnce } from '../utils/animation'

const values = [
  {
    icon: WifiOff,
    title: 'Offline-first',
    text: 'No accounts and no network requirements — the apps work where you are, and your files stay on your device.',
  },
  {
    icon: Smartphone,
    title: 'Low-end friendly',
    text: 'Built and continuously verified on entry-level real hardware, because a modest phone also deserves good tools.',
  },
  {
    icon: Gift,
    title: 'Free, forever',
    text: 'Every app is free of charge, without ads or paywalls. Development happens in the open on GitHub.',
  },
] as const

/**
 * Sobre o estúdio — missão, contadores animados (4 apps · 100% grátis ·
 * 100% Android nativo) e valores. Factos honestos: sem estatísticas
 * inventadas (ver data/apps.ts).
 */
export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative scroll-mt-24 overflow-hidden border-t border-white/[0.07] bg-panel/40 py-24 sm:py-28"
    >
      <div aria-hidden="true" className="ambient-primary absolute -left-44 top-0 h-96 w-96 opacity-60" />

      <div className="container-site relative grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <div>
          <SectionHeading kicker="About" title="Small studio, honest software" />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-6 space-y-5 text-base leading-relaxed text-mist"
          >
            <motion.p variants={fadeUp}>
              ONE G STUDIO is an independent development studio focused on native Android
              applications for creative work — 3D modeling, game creation, video editing
              and pixel art.
            </motion.p>
            <motion.p variants={fadeUp}>
              The studio's approach is written into every project: offline-first products,
              interfaces designed for touchscreens first, performance tuned for low-end
              phones, and development in the open — each project's source and history live
              on GitHub, with continuous integration as the compiler and real devices as
              the measuring stick.
            </motion.p>
            <motion.p variants={fadeUp}>
              What is not finished is not promised: planned features are documented as
              planned, and downloads activate only when a release is actually published.
            </motion.p>
          </motion.div>
        </div>

        {/* Contadores */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="glass card-sheen rounded-2xl p-8"
        >
          <dl className="grid grid-cols-3 gap-4 text-center sm:gap-6">
            <div className="flex flex-col">
              <dt className="order-2 mt-3 text-[11px] font-medium uppercase tracking-wider text-mist">
                Apps
              </dt>
              <dd className="order-1 font-display text-4xl font-bold sm:text-5xl">
                <span className="text-brand-gradient">
                  <Counter value={4} />
                </span>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="order-2 mt-3 text-[11px] font-medium uppercase tracking-wider text-mist">
                Free
              </dt>
              <dd className="order-1 font-display text-4xl font-bold sm:text-5xl">
                <span className="text-brand-gradient">
                  <Counter value={100} suffix="%" />
                </span>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="order-2 mt-3 text-[11px] font-medium uppercase tracking-wider text-mist">
                Android native
              </dt>
              <dd className="order-1 font-display text-4xl font-bold sm:text-5xl">
                <span className="text-brand-gradient">
                  <Counter value={100} suffix="%" />
                </span>
              </dd>
            </div>
          </dl>
          <p className="mt-7 border-t border-white/10 pt-5 text-xs leading-relaxed text-mist">
            All apps are in active development — each project page shows its verified
            current state.
          </p>
        </motion.div>
      </div>

      {/* Valores */}
      <div className="container-site relative mt-16">
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-6 sm:grid-cols-3"
        >
          {values.map(({ icon: Icon, title, text }) => (
            <motion.li key={title} variants={fadeUp} className="card-surface card-sheen p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/25 bg-primary/[0.08] text-primary">
                <Icon size={20} aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{text}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
