import { memo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Clock, Download, Github } from 'lucide-react'
import type { AppInfo } from '../types'
import { categoryLabels } from '../data/apps'
import { isDownloadEnabled, repoUrl } from '../utils/download'
import { AppIcon } from './AppIcon'
import { EASE_SHARP } from '../utils/animation'

/** Ponto colorido por categoria (identidade dentro do sistema partilhado). */
const categoryDot: Record<AppInfo['categoria'], string> = {
  Jogos: 'bg-secondary',
  Ferramentas: 'bg-primary',
  Vídeo: 'bg-gradient-to-r from-primary to-secondary',
}

/**
 * Card do app — layout animado (entra/sai/gruda na grelha), elevação ao
 * hover e botões: detalhes, GitHub (repositório exato) e download.
 * O download SÓ fica ativo pela política segura (utils/download.ts);
 * enquanto 'soon': botão desativado "Coming soon" + selo "In development".
 */
export const AppCard = memo(function AppCard({ app }: { app: AppInfo }) {
  const downloadEnabled = isDownloadEnabled(app)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: EASE_SHARP }}
      className="card-surface card-sheen group relative flex flex-col p-6 transition-[transform,border-color,box-shadow] duration-300 ease-sharp hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-hover"
    >
      <div className="flex items-start gap-4">
        <AppIcon app={app} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <h3 className="font-display text-lg font-bold tracking-tight">{app.nome}</h3>
            <span className="chip !py-0.5">v {app.versao}</span>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="chip !py-0.5">
              <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${categoryDot[app.categoria]}`} />
              {categoryLabels[app.categoria]}
            </span>
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
      </div>

      <p className="mt-4 line-clamp-3 flex-1 text-sm leading-relaxed text-mist">
        {app.descricaoCurta}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-5">
        <Link
          to={`/apps/${app.id}`}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-lg text-sm font-semibold text-primary transition-colors hover:text-ink"
        >
          Details
          <ArrowRight
            size={16}
            aria-hidden="true"
            className="transition-transform duration-300 ease-sharp group-hover:translate-x-1"
          />
        </Link>
        <div className="flex items-center gap-2">
          <a
            href={repoUrl(app)}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${app.nome} on GitHub`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-mist transition-all duration-300 ease-sharp hover:-translate-y-0.5 hover:border-primary/50 hover:text-ink"
          >
            <Github size={17} aria-hidden="true" />
          </a>
          {downloadEnabled ? (
            <a href={app.downloadUrl} className="btn btn-primary px-4" download>
              <Download size={16} aria-hidden="true" />
              Download
            </a>
          ) : (
            <button
              type="button"
              disabled
              aria-describedby={`dl-note-${app.id}`}
              title="Downloads are enabled when the app's release is published on GitHub."
              className="btn btn-primary px-4"
            >
              <Clock size={16} aria-hidden="true" />
              Coming soon
            </button>
          )}
        </div>
      </div>

      <span id={`dl-note-${app.id}`} className="sr-only">
        Downloads are enabled when the app's release is published on GitHub.
      </span>
    </motion.article>
  )
})
