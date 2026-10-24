/** Tipos centrais do site — modelo de dados do catálogo de aplicativos. */

/** Categoria do app. Valores internos em português; os rótulos exibidos no site (em inglês) vivem em data/apps.ts. */
export type AppCategory = 'Jogos' | 'Ferramentas' | 'Vídeo'

/** Situação de distribuição: 'available' = download ativo; 'soon' = em desenvolvimento. */
export type AppStatus = 'available' | 'soon'

export interface AppInfo {
  /** Identificador usado na rota /apps/:id (ex.: 'blone'). */
  id: string
  nome: string
  descricaoCurta: string
  /** Parágrafos separados por linha em branco ('\n\n'). */
  descricaoLonga: string
  categoria: AppCategory
  /** Caminho do ícone em public/ (ex.: '/icons/blone.png'). */
  icone: string
  /** Caminhos das screenshots em public/; vazio => o site exibe molduras placeholder. */
  screenshots: string[]
  versao: string
  requisitos: string
  funcionalidades: string[]
  /** Repositório no formato 'usuario/repo'. */
  repo: string
  /** URL permanente do APK nos GitHub Releases; '' enquanto não publicado. */
  downloadUrl: string
  status: AppStatus
}

/** Identificador do item de navegação — o rótulo vem do dicionário i18n. */
export type NavId = 'projects' | 'studio' | 'contact'

export interface NavItem {
  id: NavId
  /** Rótulo de recurso (o site usa os dicionários i18n; ver src/i18n). */
  label: string
  href: string
}

export interface ContactChannel {
  id: string
  label: string
  description: string
  value: string
  url: string
  /** false => canal ainda não existe; o site mostra "Coming soon" (não inventar contactos). */
  available: boolean
}
