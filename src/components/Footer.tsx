import { Link } from 'react-router-dom'
import { apps } from '../data/apps'
import { site } from '../data/site'
import { repoUrl } from '../utils/download'
import { useT } from '../i18n'
import { Logo } from './Logo'

/**
 * Rodapé sóbrio: navegação, nomes dos projetos (ligam aos repositórios),
 * versão do site e ano. Sem caminhos de repositório repetidos.
 */
export function Footer() {
  const t = useT()
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-line">
      <div className="container-site flex flex-col gap-8 py-10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <Link to="/" aria-label="ONE G STUDIO — home" className="flex min-h-11 items-center">
            <Logo size={24} />
          </Link>
          <nav
            aria-label={t.footer.menuLabel}
            className="flex flex-wrap items-center gap-x-6 gap-y-1"
          >
            {site.nav.map((item) => (
              <Link key={item.href} to={item.href} className="link-quiet">
                {t.nav[item.id]}
              </Link>
            ))}
            <a
              href={site.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="link-quiet"
            >
              {t.hero.github}
            </a>
          </nav>
        </div>

        {/* Projetos — só o nome, a ligar ao repositório de cada um */}
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-line pt-6">
          <li aria-hidden="true" className="label-mono">
            {t.footer.projectsLabel}
          </li>
          {apps.map((app) => (
            <li key={app.id}>
              <a
                href={repoUrl(app)}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex min-h-11 items-center font-mono text-xs text-meta transition-colors duration-200 hover:text-ink"
              >
                {app.nome}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line pt-6 font-mono text-xs text-faint">
          <p>{t.footer.rights(year)}</p>
          <p className="flex items-center gap-5">
            <span aria-hidden="true">{site.siteVersion}</span>
            <a
              href={site.websiteRepoUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="underline underline-offset-4 transition-colors duration-200 hover:text-ink"
            >
              {t.footer.source}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
