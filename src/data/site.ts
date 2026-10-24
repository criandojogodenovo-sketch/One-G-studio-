/**
 * Informação centralizada do estúdio.
 * Os canais de contacto são PLACEHOLDERS: apenas o GitHub é real.
 * Preencha os restantes quando existirem — nunca inventar contactos.
 */
import type { ContactChannel, NavItem } from '../types'

export const site = {
  name: 'ONE G STUDIO',
  shortName: 'ONE G',
  tagline: 'One studio. Four apps. Zero cost.',
  description:
    'Independent studio building free, offline-first, native Android apps for creators — games, tools and video, developed in the open on GitHub.',

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

  nav: [
    { label: 'Apps', href: '/#apps' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ] as NavItem[],

  contact: {
    heading: 'Get in touch',
    intro:
      'The studio works in the open on GitHub. The fastest way to reach us is through the project repositories — open an issue, start a discussion or follow the development of each app.',
    channels: [
      {
        id: 'github',
        label: 'GitHub',
        description: 'Studio profile — all projects and releases.',
        value: 'criandojogodenovo-sketch',
        url: 'https://github.com/criandojogodenovo-sketch',
        available: true,
      },
      {
        // PREENCHER quando existir um e-mail público de contacto.
        id: 'email',
        label: 'Email',
        description: 'A direct email channel will be announced.',
        value: 'Coming soon',
        url: '',
        available: false,
      },
      {
        // PREENCHER quando existirem redes sociais oficiais.
        id: 'social',
        label: 'Social',
        description: 'Official social channels will be announced.',
        value: 'Coming soon',
        url: '',
        available: false,
      },
    ] as ContactChannel[],
  },

  seo: {
    defaultTitle: 'ONE G STUDIO — Free native Android apps for creators',
    titleSuffix: 'ONE G STUDIO',
  },
}
