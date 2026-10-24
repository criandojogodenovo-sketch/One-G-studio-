/**
 * Hooks utilitários de navegação e acessibilidade.
 */
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'
import { apps } from '../data/apps'
import { useT } from '../i18n'
import type { Dictionary } from '../i18n/en'

/** Texto de anúncio de rota para leitores de ecrã, no idioma ativo. */
function routeAnnouncementText(pathname: string, t: Dictionary): string {
  if (pathname === '/') return t.a11y.announceHome
  const match = /^\/apps\/([^/]+)$/.exec(pathname)
  if (match) {
    const app = apps.find((candidate) => candidate.id === match[1])
    return app ? t.a11y.announceApp(app.nome) : t.a11y.announceNotFound
  }
  return t.a11y.announceNotFound
}

/** Anuncia numa região aria-live (elemento #sr-announcer criado no App). */
export function announce(message: string): void {
  const node = document.getElementById('sr-announcer')
  if (!node) return
  node.textContent = ''
  window.setTimeout(() => {
    node.textContent = message
  }, 60)
}

/**
 * Efeitos de navegação:
 *  - com âncora (#projects…): rola suavemente até à secção, com novas
 *    tentativas porque as páginas são lazy-loaded;
 *  - sem âncora: rola para o topo e move o foco para o conteúdo principal
 *    (navegação por teclado previsível em SPA);
 *  - anuncia a rota em aria-live, no idioma ativo.
 */
export function useRouteEffects(): void {
  const location = useLocation()
  const reduced = useReducedMotion()
  const t = useT()
  const isFirstRun = useRef(true)

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      if (location.hash) {
        // Se o primeiro carregamento já traz âncora, ainda assim rola.
        const id = location.hash.slice(1)
        window.setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({
            behavior: reduced ? 'auto' : 'smooth',
          })
        }, 120)
      }
      return
    }

    announce(routeAnnouncementText(location.pathname, t))

    if (location.hash) {
      const id = location.hash.slice(1)
      let attempts = 0
      const timer = window.setInterval(() => {
        const target = document.getElementById(id)
        if (target) {
          window.clearInterval(timer)
          target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
        } else if (++attempts > 24) {
          window.clearInterval(timer)
        }
      }, 50)
      return () => window.clearInterval(timer)
    }

    window.scrollTo({ top: 0, behavior: 'auto' })
    document.getElementById('main')?.focus({ preventScroll: true })
    // t muda de identidade quando o idioma muda — reanuncia se necessário
  }, [location.pathname, location.hash, reduced, t])
}

/**
 * Bloqueia o scroll do documento (menu mobile aberto), compensando a largura
 * da scrollbar para evitar salto de layout.
 */
export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    const previousOverflow = document.body.style.overflow
    const previousPadding = document.body.style.paddingRight
    document.body.style.overflow = 'hidden'
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`
    return () => {
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPadding
    }
  }, [locked])
}
