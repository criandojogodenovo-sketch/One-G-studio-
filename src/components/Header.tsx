import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { site } from '../data/site'
import { useT } from '../i18n'
import { Logo } from './Logo'
import { LanguageToggle } from './LanguageToggle'
import { useLockBodyScroll } from '../utils/hooks'

/**
 * Header fixo — fundo sólido (#0A0A0B) e linha inferior de 1px, sem blur.
 * Links em mono; seletor de idioma "EN | PT" (o ativo em laranja).
 * No telemóvel: menu simples em painel com foco preso, Esc para fechar e
 * bloqueio de scroll. Alvos de toque >= 44px.
 */
export function Header() {
  const t = useT()
  const [open, setOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useLockBodyScroll(open)

  // Esc fecha; Tab fica preso dentro do painel; foco inicial no primeiro controlo.
  useEffect(() => {
    if (!open) return
    panelRef.current?.querySelector<HTMLElement>('a, button')?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButtonRef.current?.focus()
        return
      }
      if (event.key === 'Tab' && panelRef.current) {
        const focusables = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>('a[href], button'),
        )
        if (focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last?.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first?.focus()
        }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  const closeMenu = () => setOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-[60] border-b border-line bg-canvas">
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          aria-label="ONE G STUDIO — home"
          className="flex min-h-11 items-center py-2"
          onClick={closeMenu}
        >
          <Logo size={26} />
        </Link>

        {/* Navegação em ecrãs médios/grandes — links em mono */}
        <nav aria-label={t.a11y.mainNav} className="hidden items-center gap-7 md:flex">
          {site.nav.map((item) => (
            <Link key={item.href} to={item.href} className="link-quiet">
              {t.nav[item.id]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <div className="hidden md:block">
            <LanguageToggle />
          </div>

          {/* Hamburguer simples (mobile) */}
          <button
            ref={menuButtonRef}
            type="button"
            className="relative flex h-11 w-11 flex-col items-center justify-center gap-[6px] md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
            onClick={() => setOpen((value) => !value)}
          >
            <span
              aria-hidden="true"
              className={`block h-px w-5 bg-ink transition-transform duration-200 ${
                open ? 'translate-y-[3.5px] rotate-45' : ''
              }`}
            />
            <span
              aria-hidden="true"
              className={`block h-px w-5 bg-ink transition-transform duration-200 ${
                open ? '-translate-y-[3.5px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Menu mobile — painel simples por baixo do header */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-x-0 bottom-0 top-16 z-[55] overflow-y-auto border-b border-line bg-canvas md:hidden"
          >
            <nav aria-label={t.a11y.mobileNav} className="container-site flex flex-col py-4">
              {site.nav.map((item, index) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={closeMenu}
                  className="flex min-h-14 items-center justify-between gap-4 border-b border-line py-2"
                >
                  <span className="font-display text-xl font-medium tracking-tight text-ink">
                    {t.nav[item.id]}
                  </span>
                  <span aria-hidden="true" className="font-mono text-xs text-faint">
                    0{index + 1}
                  </span>
                </Link>
              ))}

              <div className="mt-6 flex items-center justify-between gap-4">
                <LanguageToggle />
                <a
                  href={site.githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-quiet"
                  onClick={closeMenu}
                >
                  {t.hero.github}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
