/**
 * Informação centralizada do estúdio.
 * OS TEXTOS VISÍVEIS vivem nos dicionários i18n (src/i18n/en.ts e pt.ts);
 * aqui ficam apenas URLs e dados estruturais. Nada de inventar contactos —
 * preencha os canais quando existirem (ver secção contact abaixo).
 */
import type { NavItem } from '../types'

export const site = {
  name: 'ONE G STUDIO',
  shortName: 'ONE G',

  /** Tagline da marca — fica em inglês nos dois idiomas. */
  tagline: 'GAMES • SOFTWARE • FREE TOOLS',

  /** Descrição do estúdio (inglês — fallback de metadados estáticos). */
  description:
    'Independent studio building offline-first, native Android apps — games, tools and video, developed in the open on GitHub.',

  /** Versão do site (mostrada no rodapé). */
  siteVersion: 'v2.0',

  /**
   * DOMÍNIO DE PRODUÇÃO (placeholder).
   * Quando o site estiver publicado (ex.: Cloudflare Workers), preencha aqui:
   *   siteUrl: 'https://o-seu-dominio.com'
   * Isso ativa URLs canónicas e og:url/og:image absolutas (ver lib/seo.ts).
   * Enquanto vazio, o site não emite domínios inventados.
   */
  siteUrl: '',

  /** Conta GitHub do estúdio (real). */
  githubUser: 'criandojogodenovo-sketch',
  githubUrl: 'https://github.com/criandojogodenovo-sketch',

  /** Repositório do próprio site. */
  websiteRepo: 'criandojogodenovo-sketch/One-G-studio-',
  websiteRepoUrl: 'https://github.com/criandojogodenovo-sketch/One-G-studio-',

  /** Navegação principal — rótulos vêm do dicionário (t.nav[item.id]). */
  nav: [
    { id: 'projects', label: 'Projects', href: '/#projects' },
    { id: 'studio', label: 'Studio', href: '/#studio' },
    { id: 'contact', label: 'Contact', href: '/#contact' },
  ] as NavItem[],

  /**
   * Canais de contacto — apenas o GitHub existe; o Contact novo lê o
   * githubUrl acima e os textos do dicionário. Canais futuros (email,
   * redes) entram AQUI quando existirem de verdade — nunca antes.
   */

  seo: {
    /** Título por defeito (inglês); em runtime o título vem do dicionário. */
    defaultTitle: 'ONE G STUDIO — Native Android software, built in the open',
    titleSuffix: 'ONE G STUDIO',
  },
}
