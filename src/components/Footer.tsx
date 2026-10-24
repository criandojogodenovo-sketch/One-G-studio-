import { Link } from 'react-router-dom'
import { ExternalLink, Github } from 'lucide-react'
import { apps } from '../data/apps'
import { site } from '../data/site'
import { repoUrl } from '../utils/download'
import { Logo } from './Logo'

const footerHeading = 'text-xs font-semibold uppercase tracking-[0.18em] text-mist'
const footerLink =
  'inline-flex min-h-9 items-center gap-1.5 text-sm text-mist transition-colors hover:text-ink'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-auto border-t border-white/[0.07] bg-panel/50">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1.4fr]">
        <div>
          <Logo size={32} />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-mist">{site.description}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className={footerHeading}>Explore</h2>
          <ul className="mt-4 space-y-1">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className={footerLink}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={site.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className={footerLink}
              >
                <Github size={14} aria-hidden="true" />
                GitHub
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label="Apps">
          <h2 className={footerHeading}>Apps</h2>
          <ul className="mt-4 space-y-1">
            {apps.map((app) => (
              <li key={app.id}>
                <Link to={`/apps/${app.id}`} className={footerLink}>
                  {app.nome}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={footerHeading}>Open development</h2>
          <ul className="mt-4 space-y-1">
            {apps.map((app) => (
              <li key={app.repo}>
                <a
                  href={repoUrl(app)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={footerLink}
                >
                  {app.repo}
                  <ExternalLink size={12} aria-hidden="true" className="text-mist/60" />
                </a>
              </li>
            ))}
            <li>
              <a
                href={site.websiteRepoUrl}
                target="_blank"
                rel="noreferrer noopener"
                className={footerLink}
              >
                {site.websiteRepo}
                <ExternalLink size={12} aria-hidden="true" className="text-mist/60" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.07]">
        <div className="container-site flex flex-col items-center justify-between gap-2 py-6 text-xs text-mist sm:flex-row">
          <p>© {year} ONE G STUDIO. All applications are free.</p>
          <p>
            Built with React, Vite and Tailwind CSS ·{' '}
            <a
              href={site.websiteRepoUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="underline decoration-white/20 underline-offset-4 transition-colors hover:text-ink"
            >
              website source
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
