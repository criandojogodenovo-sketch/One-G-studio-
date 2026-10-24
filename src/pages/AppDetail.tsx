import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, Download } from 'lucide-react'
import type { AppInfo } from '../types'
import { apps } from '../data/apps'
import { isDownloadEnabled, issuesUrl, repoUrl } from '../utils/download'
import { usePageMeta } from '../lib/seo'
import { AppIcon } from '../components/AppIcon'
import { useT, useLocalizedValue } from '../i18n'
import NotFound from './NotFound'
import { fadeUp, staggerContainer } from '../utils/animation'

/** Página de detalhe do projeto: /apps/:id — id inválido cai em 404. */
export default function AppDetail() {
  const { id } = useParams<{ id: string }>()
  const app = apps.find((candidate) => candidate.id === id)

  if (!app) {
    return <NotFound />
  }
  return <AppDetailContent app={app} />
}

function AppDetailContent({ app }: { app: AppInfo }) {
  const t = useT()
  const role = useLocalizedValue(app.role)
  const curta = useLocalizedValue(app.descricaoCurta)
  const longa = useLocalizedValue(app.descricaoLonga)
  const requisitos = useLocalizedValue(app.requisitos)
  const funcionalidades = useLocalizedValue(app.funcionalidades)
  // hook incondicional; o valor só é usado quando app.orientacao existe
  const orientacao = useLocalizedValue(app.orientacao ?? { en: '', pt: '' })

  usePageMeta({
    title: `${app.nome} — ${t.categories[app.categoria]}`,
    description: curta,
    path: `/apps/${app.id}`,
  })

  const downloadEnabled = isDownloadEnabled(app)
  const others = apps.filter((candidate) => candidate.id !== app.id)
  const paragraphs = longa.split('\n\n')

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="container-site pb-24 pt-8 sm:pt-10"
    >
      <motion.div variants={fadeUp}>
        <Link to="/#projects" className="link-quiet">
          <ArrowLeft size={14} aria-hidden="true" />
          {t.detail.back}
        </Link>
      </motion.div>

      {/* Cabeçalho: ícone real + nome || ficha técnica em mono */}
      <div className="mt-10 grid gap-10 border-b border-line pb-12 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
        <motion.header variants={fadeUp} className="flex items-start gap-5 sm:gap-6">
          <AppIcon app={app} size="lg" eager />
          <div className="min-w-0">
            <p className="label-mono">
              {role} — {t.categories[app.categoria]}
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              {app.nome}
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-mist">{curta}</p>
          </div>
        </motion.header>

        {/* Ficha técnica — o download segue a POLÍTICA (utils/download.ts) */}
        <motion.aside
          variants={fadeUp}
          aria-label={`${app.nome} — spec`}
          className="crop-marks h-fit border border-line p-6"
        >
          <dl className="space-y-3.5 font-mono text-xs">
            <SpecRow label={t.detail.specVersion} value={app.versao} />
            <SpecRow
              label={t.detail.specStatus}
              value={downloadEnabled ? t.status.available : t.status.inDevelopment}
              dot={downloadEnabled ? 'accent' : 'faint'}
            />
            <SpecRow label={t.detail.specCategory} value={t.categories[app.categoria]} />
            <div className="flex items-baseline justify-between gap-4">
              <dt className="shrink-0 uppercase tracking-[0.14em] text-faint">
                {t.detail.specSource}
              </dt>
              <dd className="min-w-0 text-right">
                <a
                  href={repoUrl(app)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="break-all text-meta underline-offset-4 transition-colors duration-200 hover:text-ink hover:underline"
                >
                  {app.repo}
                </a>
              </dd>
            </div>
          </dl>

          <div className="mt-6 space-y-3.5 border-t border-line pt-5">
            {downloadEnabled ? (
              <a href={app.downloadUrl} className="btn-primary w-full" download>
                <Download size={14} aria-hidden="true" />
                {t.detail.downloadFile}
              </a>
            ) : (
              <p className="flex min-h-11 items-center gap-2.5 font-mono text-xs text-meta">
                <span aria-hidden="true" className="status-dot bg-faint" />
                {t.detail.downloadSoon}
              </p>
            )}
            <a
              href={repoUrl(app)}
              target="_blank"
              rel="noreferrer noopener"
              className="link-quiet"
            >
              {t.detail.viewOnGithub}
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
            {!downloadEnabled && (
              <p className="text-xs leading-relaxed text-faint">{t.detail.downloadNote}</p>
            )}
            <p className="border-t border-line pt-4 text-xs leading-relaxed text-mist">
              {t.detail.foundBug}{' '}
              <a
                href={issuesUrl(app)}
                target="_blank"
                rel="noreferrer noopener"
                className="underline underline-offset-4 transition-colors duration-200 hover:text-ink"
              >
                {t.detail.openIssue}
              </a>
            </p>
          </div>
        </motion.aside>
      </div>

      {/* Descrição longa */}
      <motion.div
        variants={fadeUp}
        className="mt-12 max-w-2xl space-y-5 text-[15px] leading-relaxed text-mist"
      >
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </motion.div>

      {/* Funcionalidades — lista numerada; planeadas marcadas a cinza */}
      <motion.section variants={fadeUp} aria-labelledby="features-title" className="mt-14">
        <h2
          id="features-title"
          className="font-display text-2xl font-semibold tracking-tight text-ink"
        >
          {t.detail.featuresTitle}
        </h2>
        <ol className="mt-6 border-t border-line">
          {funcionalidades.map((feature, index) => {
            const lower = feature.toLowerCase()
            const planned = lower.includes('planned') || lower.includes('planeado')
            return (
              <li key={feature} className="flex items-baseline gap-4 border-b border-line py-3.5 sm:gap-5">
                <span aria-hidden="true" className="w-7 shrink-0 font-mono text-xs text-faint">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className={`text-sm leading-relaxed ${planned ? 'text-mist' : 'text-ink/90'}`}>
                  {feature}
                  {planned && (
                    <span className="ml-2 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
                      — {t.detail.plannedTag}
                    </span>
                  )}
                </span>
              </li>
            )
          })}
        </ol>
      </motion.section>

      {/* Requisitos — tabela 1px */}
      <motion.section variants={fadeUp} aria-labelledby="requirements-title" className="mt-14">
        <h2
          id="requirements-title"
          className="font-display text-2xl font-semibold tracking-tight text-ink"
        >
          {t.detail.requirementsTitle}
        </h2>
        <table className="mt-6 w-full max-w-xl border-collapse border border-line text-sm">
          <tbody>
            <ReqRow label={t.detail.specMinAndroid} value={requisitos} />
            {app.arquitetura && <ReqRow label={t.detail.specArchitecture} value={app.arquitetura} />}
            {app.orientacao && <ReqRow label={t.detail.specOrientation} value={orientacao} />}
          </tbody>
        </table>
      </motion.section>

      {/* Capturas — suporte pronto (public/screenshots/<id>/), sem placeholders falsos */}
      <motion.section variants={fadeUp} aria-labelledby="screenshots-title" className="mt-14">
        <h2
          id="screenshots-title"
          className="font-display text-2xl font-semibold tracking-tight text-ink"
        >
          {t.detail.screenshotsTitle}
        </h2>
        {app.screenshots.length > 0 ? (
          <ul className="mt-6 grid gap-5 sm:grid-cols-2">
            {app.screenshots.map((screenshot, index) => (
              <li key={screenshot}>
                <img
                  src={screenshot}
                  alt={`${app.nome} — ${t.detail.screenshotsTitle} ${index + 1}`}
                  width={960}
                  height={540}
                  loading="lazy"
                  decoding="async"
                  className="aspect-video w-full rounded-[2px] border border-line object-cover"
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 inline-block border border-dashed border-line px-5 py-4 font-mono text-xs text-meta">
            {t.detail.screenshotsPending}
          </p>
        )}
      </motion.section>

      {/* Mais projetos — mesma linguagem do índice do hero */}
      <motion.section variants={fadeUp} aria-labelledby="more-projects-title" className="mt-16">
        <h2
          id="more-projects-title"
          className="font-display text-2xl font-semibold tracking-tight text-ink"
        >
          {t.detail.moreTitle}
        </h2>
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {others.map((other, index) => (
            <li key={other.id}>
              <Link
                to={`/apps/${other.id}`}
                className="group flex min-h-14 items-center gap-4 py-3 transition-colors duration-200 hover:bg-raised"
              >
                <span aria-hidden="true" className="w-7 shrink-0 font-mono text-xs text-faint">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0 flex-1 font-display text-base font-medium tracking-tight text-ink">
                  {other.nome}
                </span>
                <span aria-hidden="true" className="hidden font-mono text-xs text-meta sm:block">
                  {other.versao}
                </span>
                <ArrowRight
                  size={15}
                  aria-hidden="true"
                  className="shrink-0 text-faint transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent"
                />
              </Link>
            </li>
          ))}
        </ul>
      </motion.section>
    </motion.div>
  )
}

/** Linha da ficha técnica (dl > div). */
function SpecRow({
  label,
  value,
  dot,
}: {
  label: string
  value: string
  dot?: 'accent' | 'faint'
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="shrink-0 uppercase tracking-[0.14em] text-faint">{label}</dt>
      <dd className="flex min-w-0 items-center gap-2 text-right text-ink/90">
        {dot && (
          <span aria-hidden="true" className={`status-dot ${dot === 'accent' ? 'bg-accent' : 'bg-faint'}`} />
        )}
        {value}
      </dd>
    </div>
  )
}

/** Linha da tabela de requisitos. */
function ReqRow({ label, value }: { label: string; value: string }) {
  return (
    <tr className="border-b border-line last:border-b-0">
      <th
        scope="row"
        className="w-32 whitespace-nowrap border-r border-line px-4 py-3 text-left align-top font-mono text-xs font-normal uppercase tracking-[0.12em] text-meta sm:w-48"
      >
        {label}
      </th>
      <td className="px-4 py-3 text-ink/90">{value}</td>
    </tr>
  )
}
