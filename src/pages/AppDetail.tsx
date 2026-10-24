import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Check,
  ChevronRight,
  Clock,
  Download,
  ExternalLink,
  Github,
  Info,
} from 'lucide-react'
import type { AppInfo } from '../types'
import { apps, categoryLabels } from '../data/apps'
import { isDownloadEnabled, issuesUrl, repoUrl } from '../utils/download'
import { usePageMeta } from '../lib/seo'
import { AppIcon } from '../components/AppIcon'
import { ScreenshotFrame } from '../components/ScreenshotFrame'
import NotFound from './NotFound'
import { fadeUp, staggerContainer } from '../utils/animation'

/** Página de detalhe do app: /apps/:id — id inválido cai em 404. */
export default function AppDetail() {
  const { id } = useParams<{ id: string }>()
  const app = apps.find((candidate) => candidate.id === id)

  if (!app) {
    return <NotFound />
  }
  return <AppDetailContent app={app} />
}

function AppDetailContent({ app }: { app: AppInfo }) {
  usePageMeta({
    title: `${app.nome} — ${categoryLabels[app.categoria]}`,
    description: app.descricaoCurta,
    path: `/apps/${app.id}`,
  })

  const downloadEnabled = isDownloadEnabled(app)
  const others = apps.filter((candidate) => candidate.id !== app.id)
  const paragraphs = app.descricaoLonga.split('\n\n')

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="container-site pb-24 pt-10 sm:pt-14"
    >
      {/* Breadcrumb */}
      <motion.nav variants={fadeUp} aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm text-mist">
          <li>
            <Link to="/" className="transition-colors hover:text-ink">
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight size={14} />
          </li>
          <li>
            <Link to="/#apps" className="transition-colors hover:text-ink">
              Apps
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight size={14} />
          </li>
          <li>
            <span aria-current="page" className="text-ink">
              {app.nome}
            </span>
          </li>
        </ol>
      </motion.nav>

      {/* Cabeçalho */}
      <motion.header variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-5">
        <AppIcon app={app} size="lg" eager />
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {app.nome}
            </h1>
            <span className="chip">v {app.versao}</span>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="chip">{categoryLabels[app.categoria]}</span>
            {app.status === 'soon' ? (
              <span className="badge border-secondary/30 bg-secondary/[0.08] text-secondary">
                <span
                  aria-hidden="true"
                  className="animate-pulse-soft h-1.5 w-1.5 rounded-full bg-secondary"
                />
                In development
              </span>
            ) : (
              <span className="badge border-primary/40 bg-primary/10 text-primary">
                <Check size={11} aria-hidden="true" />
                Available
              </span>
            )}
          </div>
        </div>
      </motion.header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:items-start">
        {/* Coluna principal */}
        <div className="min-w-0">
          <motion.div variants={fadeUp} className="space-y-5 text-base leading-relaxed text-mist">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </motion.div>

          {/* Funcionalidades */}
          <motion.section variants={fadeUp} aria-labelledby="features-title" className="mt-14">
            <h2 id="features-title" className="font-display text-2xl font-bold tracking-tight">
              Features
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {app.funcionalidades.map((feature) => {
                const planned = feature.toLowerCase().includes('planned')
                return (
                  <li
                    key={feature}
                    className={`card-surface flex items-start gap-3 p-4 text-sm leading-relaxed ${
                      planned ? 'border-dashed text-mist' : 'text-ink/90'
                    }`}
                  >
                    <span
                      className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ${
                        planned
                          ? 'bg-secondary/10 text-secondary'
                          : 'bg-primary/[0.12] text-primary'
                      }`}
                    >
                      {planned ? (
                        <Info size={13} aria-hidden="true" />
                      ) : (
                        <Check size={13} aria-hidden="true" />
                      )}
                    </span>
                    {feature}
                  </li>
                )
              })}
            </ul>
          </motion.section>

          {/* Screenshots */}
          <motion.section variants={fadeUp} aria-labelledby="screenshots-title" className="mt-14">
            <h2 id="screenshots-title" className="font-display text-2xl font-bold tracking-tight">
              Screenshots
            </h2>
            {app.screenshots.length > 0 ? (
              <ul className="mt-6 grid gap-5 sm:grid-cols-2">
                {app.screenshots.map((screenshot, index) => (
                  <li key={screenshot}>
                    <img
                      src={screenshot}
                      alt={`${app.nome} screenshot ${index + 1}`}
                      width={960}
                      height={540}
                      loading="lazy"
                      decoding="async"
                      className="aspect-video w-full rounded-xl border border-white/10 object-cover"
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <ul className="mt-6 grid gap-5 sm:grid-cols-2">
                  {[0, 1, 2].map((index) => (
                    <li key={index}>
                      <ScreenshotFrame app={app} index={index} />
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-mist">
                  Placeholder frames — real screenshots will be published with each app's
                  release.
                </p>
              </>
            )}
          </motion.section>
        </div>

        {/* Coluna lateral fixa */}
        <motion.aside
          variants={fadeUp}
          aria-label={`${app.nome} download and repository`}
          className="card-surface card-sheen p-6 lg:sticky lg:top-24"
        >
          <h2 className="font-display text-lg font-bold">Get {app.nome}</h2>
          <p className="mt-1 text-sm text-mist">
            Free · Native Android · {categoryLabels[app.categoria]}
          </p>

          <div className="mt-6 space-y-3">
            {downloadEnabled ? (
              <a href={app.downloadUrl} className="btn btn-primary w-full" download>
                <Download size={17} aria-hidden="true" />
                Download APK
              </a>
            ) : (
              <button type="button" disabled className="btn btn-primary w-full">
                <Clock size={17} aria-hidden="true" />
                Coming soon
              </button>
            )}
            <a
              href={repoUrl(app)}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-ghost w-full"
            >
              <Github size={17} aria-hidden="true" />
              View on GitHub
              <ExternalLink size={13} aria-hidden="true" className="text-mist/60" />
            </a>
          </div>

          {!downloadEnabled && (
            <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-mist">
              <Info size={14} aria-hidden="true" className="mt-0.5 shrink-0 text-secondary" />
              No public release yet. The download activates automatically when a signed APK
              is published on the app's GitHub Releases.
            </p>
          )}

          <dl className="mt-6 space-y-4 border-t border-white/[0.07] pt-5 text-sm">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-mist">
                Version
              </dt>
              <dd className="mt-1 font-medium">{app.versao}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-mist">
                Requirements
              </dt>
              <dd className="mt-1">
                <ul className="space-y-1.5 text-mist">
                  {app.requisitos.split('·').map((requirement) => (
                    <li key={requirement} className="flex items-start gap-2">
                      <Check size={13} aria-hidden="true" className="mt-1 shrink-0 text-primary" />
                      {requirement.trim()}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-mist">
                Repository
              </dt>
              <dd className="mt-1">
                <a
                  href={repoUrl(app)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-secondary transition-colors hover:text-ink"
                >
                  {app.repo}
                  <ExternalLink size={11} aria-hidden="true" />
                </a>
              </dd>
            </div>
          </dl>

          <p className="mt-5 border-t border-white/[0.07] pt-4 text-xs text-mist">
            Found a bug or have a suggestion?{' '}
            <a
              href={issuesUrl(app)}
              target="_blank"
              rel="noreferrer noopener"
              className="text-secondary underline decoration-secondary/40 underline-offset-4 transition-colors hover:text-ink"
            >
              Open an issue
            </a>
            .
          </p>
        </motion.aside>
      </div>

      {/* Outros apps */}
      <motion.section variants={fadeUp} aria-labelledby="more-apps-title" className="mt-20">
        <h2 id="more-apps-title" className="font-display text-2xl font-bold tracking-tight">
          More from the studio
        </h2>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((other) => (
            <li key={other.id}>
              <Link
                to={`/apps/${other.id}`}
                className="card-surface group flex h-full flex-col gap-3 p-5 transition-[transform,border-color,box-shadow] duration-300 ease-sharp hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-hover"
              >
                <div className="flex items-center gap-3">
                  <AppIcon app={other} />
                  <div>
                    <h3 className="font-display text-base font-bold">{other.nome}</h3>
                    <p className="text-xs text-mist">
                      {categoryLabels[other.categoria]} · v {other.versao}
                    </p>
                  </div>
                </div>
                <p className="line-clamp-2 text-sm leading-relaxed text-mist">
                  {other.descricaoCurta}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </motion.section>
    </motion.div>
  )
}
