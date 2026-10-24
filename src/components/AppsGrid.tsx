import { useDeferredValue, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, SearchX, X } from 'lucide-react'
import type { AppCategory } from '../types'
import { apps, categoryLabels, categoryOrder } from '../data/apps'
import { AppCard } from './AppCard'
import { SectionHeading } from './SectionHeading'
import { fadeUp, viewportOnce } from '../utils/animation'

type Filter = 'todas' | AppCategory

const FILTERS: Filter[] = ['todas', ...categoryOrder]

/**
 * Catálogo com busca e filtros (All / Games / Tools / Video).
 * Feedback: contagem de resultados em aria-live, chips com contagem,
 * estado vazio com reposição e cards com layout animado.
 */
export function AppsGrid() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('todas')
  const deferredQuery = useDeferredValue(query)

  const counts = useMemo(() => {
    const base: Record<Filter, number> = { todas: apps.length, Jogos: 0, Ferramentas: 0, Vídeo: 0 }
    for (const app of apps) base[app.categoria] += 1
    return base
  }, [])

  const results = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase()
    return apps.filter((app) => {
      if (filter !== 'todas' && app.categoria !== filter) return false
      if (!q) return true
      const haystack =
        `${app.nome} ${app.descricaoCurta} ${categoryLabels[app.categoria]} ${app.id}`.toLowerCase()
      return haystack.includes(q)
    })
  }, [deferredQuery, filter])

  const queryTrimmed = deferredQuery.trim()

  return (
    <section id="apps" aria-labelledby="apps-title" className="scroll-mt-24 py-24 sm:py-28">
      <div className="container-site">
        <SectionHeading
          kicker="Applications"
          title="The catalogue"
          description="Search by name or filter by category. Every app is native, offline-first and free — downloads activate as each release is published."
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
        >
          {/* Busca */}
          <div className="relative w-full max-w-sm">
            <label htmlFor="app-search" className="sr-only">
              Search apps by name
            </label>
            <Search
              size={18}
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mist"
            />
            <input
              id="app-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search apps…"
              autoComplete="off"
              spellCheck={false}
              className="h-12 w-full rounded-xl border border-white/10 bg-surface/70 pl-11 pr-12 text-sm text-ink transition-colors placeholder:text-mist/70 focus:border-secondary/50 focus:outline-none focus:ring-2 focus:ring-secondary/30"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-mist transition-colors hover:text-ink"
              >
                <X size={16} aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Filtros por categoria */}
          <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
            {FILTERS.map((value) => {
              const active = filter === value
              const label = value === 'todas' ? 'All' : categoryLabels[value]
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(value)}
                  className={`min-h-11 rounded-xl border px-4 text-sm font-medium transition-all duration-200 ease-sharp active:scale-95 ${
                    active
                      ? 'border-primary/50 bg-primary/[0.12] text-primary'
                      : 'border-white/10 bg-white/[0.03] text-mist hover:border-white/25 hover:text-ink'
                  }`}
                >
                  {label}
                  <span className="ml-1.5 text-xs opacity-70">{counts[value]}</span>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Contagem de resultados — feedback visível e anunciado */}
        <p aria-live="polite" className="mt-5 text-sm text-mist">
          {results.length} {results.length === 1 ? 'app' : 'apps'} shown
          {queryTrimmed && (
            <>
              {' '}
              for “<span className="text-ink">{queryTrimmed}</span>”
            </>
          )}
        </p>

        {/* Grelha com layout animado */}
        <motion.div layout className="mt-6 grid gap-6 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {results.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </AnimatePresence>
        </motion.div>

        {results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            role="status"
            className="card-surface mt-6 flex flex-col items-center gap-4 p-12 text-center"
          >
            <SearchX size={32} className="text-mist" aria-hidden="true" />
            <div>
              <p className="font-display text-lg font-semibold">No apps found</p>
              <p className="mt-1 text-sm text-mist">Try a different search or category.</p>
            </div>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setQuery('')
                setFilter('todas')
              }}
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
