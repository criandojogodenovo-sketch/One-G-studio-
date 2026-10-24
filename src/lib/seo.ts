/**
 * Auxiliares de SEO por rota (SPA).
 *
 * LIMITAÇÃO HONESTA: este site é uma SPA renderizada no cliente. Estes
 * metadados são atualizados em runtime pelo JavaScript — crawlers que não
 * executam JS (alguns previews de partilha) veem as tags estáticas do
 * index.html. Ver README → "SEO considerations".
 *
 * URLs absolutas (canonical/og:url/og:image) só são emitidas quando
 * site.siteUrl estiver preenchido — o site nunca inventa um domínio.
 */
import { useEffect } from 'react'
import { site } from '../data/site'

export interface PageMetaInput {
  title: string
  description: string
  /** Caminho da rota (ex.: '/apps/blone'). */
  path?: string
  image?: string
  noIndex?: boolean
}

function setMeta(attr: 'name' | 'property', key: string, content: string): void {
  const selector = `meta[${attr}="${key}"]`
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href: string | null): void {
  const selector = 'link[rel="canonical"]'
  const el = document.head.querySelector<HTMLLinkElement>(selector)
  if (!href) {
    el?.remove()
    return
  }
  if (!el) {
    const link = document.createElement('link')
    link.rel = 'canonical'
    document.head.appendChild(link)
    link.href = href
    return
  }
  el.href = href
}

export function setPageMeta(input: PageMetaInput): void {
  const isDefault = input.title === site.seo.defaultTitle
  const title = isDefault ? input.title : `${input.title} · ${site.seo.titleSuffix}`
  document.title = title

  setMeta('name', 'description', input.description)
  setMeta('property', 'og:title', title)
  setMeta('property', 'og:description', input.description)
  setMeta('name', 'twitter:title', title)
  setMeta('name', 'twitter:description', input.description)
  setMeta('name', 'robots', input.noIndex === true ? 'noindex' : 'index')

  // og:image: absoluta quando o domínio existe; relativa caso contrário.
  const image = input.image ?? '/og-image.png'
  setMeta('property', 'og:image', site.siteUrl ? `${site.siteUrl}${image}` : image)

  // canonical/og:url apenas com domínio real configurado.
  if (site.siteUrl && input.path) {
    setCanonical(`${site.siteUrl}${input.path}`)
    setMeta('property', 'og:url', `${site.siteUrl}${input.path}`)
  } else {
    setCanonical(null)
  }
}

/** Aplica os metadados da rota atual (ver páginas em src/pages). */
export function usePageMeta(input: PageMetaInput): void {
  const { title, description, path, image, noIndex } = input
  useEffect(() => {
    setPageMeta({ title, description, path, image, noIndex })
  }, [title, description, path, image, noIndex])
}
