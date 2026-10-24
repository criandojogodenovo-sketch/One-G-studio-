import { useDeferredValue, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Search, X } from 'lucide-react'
import type { AppCategory, AppInfo } from '../types'
import { apps, categoryOrder } from '../data/apps'
import { isDownloadEnabled } from '../utils/download'
import { useT, useLocalizedValue } from '../i18n'
import type { Dictionary } from '../i18n/en'
import { AppIcon } from './AppIcon'
import { EASE_SHARP, fadeUp, viewportOnce } from '../utils/animation'

type Filter = 'all' | AppCategory

const FILTERS: Filter[] = ['all', ...categoryOrder]

/**
 * Projects — lista editorial em linhas (não cartões): número, ícone pequeno
 * real, nome, categoria, versão (mono), estado (ponto + texto) e seta.
 * Pesquisa e filtros mantidos, discretos. A linha inteira leva ao detalhe;
 * a ação de download desapareceu da lista (linha de estado só na página de
 * detalhe) — o estado segue a POLÍTICA de download (utils/download.ts).
 */
export function Projects() {
  const t = useT()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const deferredQuery = useDeferredValue(query)

  const counts = useMemo(() => {
    const base: Record<Filter, number> = { all: apps.length, games: 0, tools: 0, video: 0 }
    for (const app of apps) base[app.categoria] += 1
    return base
  }, [])

  const results = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase()
    return apps.filter((app) => {
      if (filter !== 'all' && app.categoria !== filter) return false
      if (!q) return true
      const haystack =
        `${app.nome} ${app.id} ${app.role.en} ${app.role.pt} ${app.descricaoCurta.en} ${app.descricaoCurta.pt}`.toLowerCase()
      return haystack.includes(q)
    })
  }, [deferredQuery, filter])

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="scroll-mt-24 border-b border-line"
    >
      <div className="container-site py-16 sm:py-20">
        {/* Cabeçalho de secção numerado — '01 — Projects' */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex items-baseline gap-4"
        >
          <span aria-hidden="true" className="font-mono text-sm text-accent">
            01
          </span>
          <span aria-hidden="true" className="font-mono text-sm text-faint">
            —
          </span>
          <h2
            id="projects-title"
            className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
          >
            {t.projects.sectionTitle}
          </h2>
        </motion.div>

        {/* Controlos: pesquisa com sublinhado + filtros em texto mono */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
        >
          <div className="relative w-full max-w-xs">
            <label htmlFor="project-search" className="sr-only">
              {t.projects.searchLabel}
            </label>
            <Search
              size={14}
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-faint"
            />
            <input
              id="project-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.projects.searchPlaceholder}
              autoComplete="off"
              spellCheck={false}
              className="h-11 w-full border-b border-line bg-transparent pl-6 pr-9 font-mono text-sm text-ink transition-colors duration-200 placeholder:text-faint focus:border-accent focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label={t.projects.clearSearch}
                className="absolute right-0 top-1/2 flex h-11 w-8 -translate-y-1/2 items-center justify-center text-meta transition-colors duration-200 hover:text-ink"
              >
                <X size={14} aria-hidden="true" />
              </button>
            )}
          </div>

          <div
            role="group"
            aria-label={t.projects.filtersLabel}
            className="flex flex-wrap items-center gap-x-5 gap-y-1"
          >
            {FILTERS.map((value) => {
              const active = filter === value
              const label = value === 'all' ? t.categories.all : t.categories[value]
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(value)}
                  className={`flex min-h-11 items-center gap-1.5 font-mono text-xs uppercase tracking-[0.1em] transition-colors duration-200 ${
                    active ? 'text-accent' : 'text-meta hover:text-ink'
                  }`}
                >
                  {label}
                  <span className="text-faint">{String(counts[value]).padStart(2, '0')}</span>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Contagem de resultados — visível e anunciada */}
        <p aria-live="polite" className="mt-6 font-mono text-xs text-meta">
          {t.projects.results(results.length, apps.length)}
        </p>

        {/* Lista editorial */}
        <motion.ul layout className="mt-3 border-t border-line">
          <AnimatePresence mode="popLayout" initial={false}>
            {results.map((app, index) => (
              <ProjectRow key={app.id} app={app} index={index} t={t} />
            ))}
          </AnimatePresence>
        </motion.ul>

        {results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: EASE_SHARP }}
            role="status"
            className="mt-4 border border-line px-6 py-12 text-center"
          >
            <p className="font-display text-lg font-medium tracking-tight text-ink">
              {t.projects.emptyTitle}
            </p>
            <p className="mt-1.5 text-sm text-mist">{t.projects.emptyText}</p>
            <button
              type="button"
              className="btn-primary mt-7"
              onClick={() => {
                setQuery('')
                setFilter('all')
              }}
            >
              {t.projects.clearFilters}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

/** Uma linha do índice de projetos. A linha inteira é o link para o detalhe. */
function ProjectRow({ app, index, t }: { app: AppInfo; index: number; t: Dictionary }) {
  const role = useLocalizedValue(app.role)
  const available = isDownloadEnabled(app)

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: EASE_SHARP }}
      className="border-b border-line"
    >
      <Link
        to={`/apps/${app.id}`}
        className="group flex min-h-[72px] items-center gap-3 py-4 transition-colors duration-200 hover:bg-raised sm:gap-5"
      >
        <span aria-hidden="true" className="w-7 shrink-0 font-mono text-xs text-faint">
          {String(index + 1).padStart(2, '0')}
        </span>
        <AppIcon app={app} size="sm" />
        <span className="min-w-0 flex-1">
          <span className="block truncate font-display text-lg font-medium tracking-tight text-ink">
            {app.nome}
          </span>
          <span className="mt-0.5 block truncate text-sm text-mist">{role}</span>
        </span>
        <span aria-hidden="true" className="hidden w-24 shrink-0 font-mono text-xs text-meta md:block">
          {t.categories[app.categoria]}
        </span>
        <span aria-hidden="true" className="hidden w-28 shrink-0 font-mono text-xs text-meta sm:block">
          {app.versao}
        </span>
        <span className="hidden w-44 shrink-0 items-center gap-2 font-mono text-[11px] text-meta lg:flex">
          <span aria-hidden="true" className={`status-dot ${available ? 'bg-accent' : 'bg-faint'}`} />
          {available ? t.status.available : t.status.inDevelopment}
        </span>
        <ArrowRight
          size={16}
          aria-hidden="true"
          className="shrink-0 text-faint transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent"
        />
        <span className="sr-only">{t.projects.viewDetails}</span>
      </Link>
    </motion.li>
  )
}
