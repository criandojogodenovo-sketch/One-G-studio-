/** Tipos centrais do site — modelo de dados do catálogo de projetos. */
import type { L10n } from './i18n'

/**
 * Categoria do app (chave interna). Os rótulos exibidos no site vivem nos
 * dicionários i18n (t.categories), por idioma.
 */
export type AppCategory = 'games' | 'tools' | 'video'

/** Situação de distribuição: 'available' = download ativo; 'soon' = em desenvolvimento. */
export type AppStatus = 'available' | 'soon'

export interface AppInfo {
  /** Identificador usado na rota /apps/:id (ex.: 'blone'). */
  id: string
  /** Nome do app — fica em inglês nos dois idiomas. */
  nome: string
  /** Papel curto (ex.: '3D modeling') — índice do hero e linhas da lista. */
  role: L10n<string>
  descricaoCurta: L10n<string>
  /** Parágrafos separados por linha em branco ('\n\n'). */
  descricaoLonga: L10n<string>
  categoria: AppCategory
  /** Caminho do ícone em public/ (ex.: '/icons/blone.png'). */
  icone: string
  /**
   * Caminhos das capturas em public/screenshots/<id>/; vazio => a página
   * mostra "Screenshots in preparation" (sem placeholders falsos).
   */
  screenshots: string[]
  /** Tag de versão exata (versionName do build.gradle de cada app). */
  versao: string
  /** Requisito mínimo de Android (ex.: 'Android 8.0 (API 26)+'). */
  requisitos: L10n<string>
  /** ABI suportada, quando verificada (ex.: 'arm64-v8a'). */
  arquitetura?: string
  /** Orientação, quando verificada (ex.: 'Landscape' / 'Horizontal'). */
  orientacao?: L10n<string>
  funcionalidades: L10n<string[]>
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
  /** false => canal ainda não existe (o site não inventa contactos). */
  available: boolean
}
