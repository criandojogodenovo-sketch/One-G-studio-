import { Fragment } from 'react'
import { LOCALE_LABELS, locales, useLanguage, useT } from '../i18n'

/**
 * Seletor de idioma "EN | PT" — mono, minúsculo footprint.
 * O idioma ativo fica em laranja com aria-current; o inativo em cinza.
 * Alvos de toque >= 44px (min-h-11).
 */
export function LanguageToggle() {
  const { locale, setLocale } = useLanguage()
  const t = useT()

  return (
    <nav
      aria-label={t.a11y.language}
      className="flex items-center font-mono text-xs uppercase tracking-[0.1em]"
    >
      {locales.map((code, index) => {
        const active = locale === code
        return (
          <Fragment key={code}>
            {index > 0 && (
              <span aria-hidden="true" className="px-0.5 text-faint">
                |
              </span>
            )}
            <button
              type="button"
              onClick={() => setLocale(code)}
              aria-current={active ? 'true' : undefined}
              className={`inline-flex min-h-11 items-center px-2.5 transition-colors duration-200 ${
                active ? 'font-medium text-accent' : 'text-meta hover:text-ink'
              }`}
            >
              {LOCALE_LABELS[code]}
            </button>
          </Fragment>
        )
      })}
    </nav>
  )
}
