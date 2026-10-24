/**
 * i18n leve — sem bibliotecas externas.
 *
 * Como funciona:
 *  - dicionários tipados em src/i18n/en.ts e src/i18n/pt.ts (o tipo
 *    Dictionary garante que os dois têm exatamente as mesmas chaves);
 *  - <LanguageProvider> no topo da árvore; hook useT() devolve o
 *    dicionário do idioma ativo; useLanguage() devolve também o locale
 *    e o setLocale;
 *  - a escolha é guardada em localStorage (dentro de try/catch);
 *  - primeira visita: INGLÊS sempre, sem deteção automática do idioma
 *    do navegador;
 *  - as URLs são iguais nos dois idiomas (sem /pt nas rotas);
 *  - <html lang> é atualizado ao trocar; o <title> é reescrito pelas
 *    páginas (ver usePageMeta + dicionários seo.*).
 *
 * Como adicionar um idioma (ver README → "Languages"):
 *  1. criar src/i18n/xx.ts com `const xx: Dictionary = {...}`;
 *  2. adicionar o código ao tipo Locale, a DICTIONARIES e a locales;
 *  3. preencher os campos por idioma em src/data/apps.ts (L10n<T>) —
 *     o compilador aponta o que falta.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { en } from './en'
import { pt } from './pt'

export type { Dictionary } from './en'
import type { Dictionary } from './en'

export type Locale = 'en' | 'pt'

/** Idiomas disponíveis, pela ordem apresentada no seletor. */
export const locales: readonly Locale[] = ['en', 'pt']

/** Rótulo curto de cada idioma no seletor ("EN | PT"). */
export const LOCALE_LABELS: Record<Locale, string> = { en: 'EN', pt: 'PT' }

export const DEFAULT_LOCALE: Locale = 'en'

const DICTIONARIES: Record<Locale, Dictionary> = { en, pt }

const STORAGE_KEY = 'one-g-studio-locale'

/** Campo por idioma (usado nos dados dos apps em src/data/apps.ts). */
export type L10n<T> = { en: T; pt: T }

interface LanguageContextValue {
  locale: Locale
  t: Dictionary
  setLocale: (locale: Locale) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readStoredLocale(): Locale {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'pt') return stored
  } catch {
    // localStorage indisponível (modo privado etc.) — usar o idioma por defeito
  }
  return DEFAULT_LOCALE
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale)

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // localStorage indisponível — a escolha só dura a sessão
    }
  }, [])

  // <html lang> acompanha o idioma ativo (títulos: ver usePageMeta)
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo<LanguageContextValue>(
    () => ({ locale, t: DICTIONARIES[locale], setLocale }),
    [locale, setLocale],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage: falta o LanguageProvider na árvore')
  return context
}

/** Dicionário do idioma ativo. */
export function useT(): Dictionary {
  return useLanguage().t
}

/** Resolve um campo localizado (L10n) de src/data/apps.ts. */
export function useLocalizedValue<T>(field: L10n<T>): T {
  const { locale } = useLanguage()
  return field[locale]
}
