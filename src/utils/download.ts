/**
 * Política de DOWNLOAD SEGURO.
 *
 * O botão de download de um app só é habilitado quando:
 *   1. app.status === 'available'; E
 *   2. app.downloadUrl é um link HTTPS válido no padrão permanente dos
 *      GitHub Releases OFICIAIS do estúdio:
 *      https://github.com/criandojogodenovo-sketch/<repo>/releases/latest/download/<arquivo>.apk
 *
 * Qualquer outro destino (HTTP, outros domínios, outros caminhos) é
 * bloqueado — o botão permanece desativado ("Coming soon").
 */
import type { AppInfo } from '../types'
import { site } from '../data/site'

// Escapar o nome de utilizador para uso seguro na expressão regular.
const escapedUser = site.githubUser.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const githubReleaseApk = new RegExp(
  `^https://github\\.com/${escapedUser}/[A-Za-z0-9_.\\-]+/releases/latest/download/[A-Za-z0-9_.\\-]+\\.apk$`,
)

export function isDownloadEnabled(app: AppInfo): boolean {
  return app.status === 'available' && githubReleaseApk.test(app.downloadUrl)
}

/** URL da página do repositório do app no GitHub. */
export function repoUrl(app: AppInfo): string {
  return `https://github.com/${app.repo}`
}

/** URL da página de issues do repositório do app. */
export function issuesUrl(app: AppInfo): string {
  return `https://github.com/${app.repo}/issues`
}
