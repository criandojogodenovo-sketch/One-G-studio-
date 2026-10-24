import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Github } from 'lucide-react'
import { site } from '../data/site'
import { Logo } from './Logo'
import { useLockBodyScroll } from '../utils/hooks'
import { staggerContainer, fadeUp } from '../utils/animation'

/**
 * Header fixo e acessível:
 *  - superfície de vidro apenas quando há scroll (ou menu aberto);
 *  - menu mobile em ecrã cheio com animação, foco preso, Esc para fechar
 *    e bloqueio de scroll;
 *  - alvos de toque >= 44px.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 8))
  useLockBodyScroll(open)

  // Esc fecha; Tab fica preso dentro do painel; foco inicial no primeiro link.
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[60] transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open ? 'glass border-b' : 'border-b border-transparent'
      }`}
    >
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          aria-label="ONE G STUDIO — home"
          className="rounded-lg py-2"
          onClick={() => setOpen(false)}
        >
          <Logo size={34} />
        </Link>

        {/* Navegação em ecrãs médios/grandes */}
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-mist transition-colors duration-200 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.githubUrl}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="ONE G STUDIO on GitHub"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] text-mist transition-all duration-300 ease-sharp hover:-translate-y-0.5 hover:border-primary/50 hover:text-ink"
          >
            <Github size={20} aria-hidden="true" />
          </a>

          {/* Hamburguer animado */}
          <button
            ref={menuButtonRef}
            type="button"
            className="relative inline-flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-xl border border-white/15 bg-white/[0.03] md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              aria-hidden="true"
              className={`block h-0.5 w-5 rounded-full bg-ink transition-all duration-300 ease-sharp ${
                open ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              aria-hidden="true"
              className={`block h-0.5 w-5 rounded-full bg-ink transition-all duration-200 ${
                open ? 'translate-x-2 opacity-0' : ''
              }`}
            />
            <span
              aria-hidden="true"
              className={`block h-0.5 w-5 rounded-full bg-ink transition-all duration-300 ease-sharp ${
                open ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Menu mobile em ecrã cheio */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="glass fixed inset-0 top-16 z-[55] md:hidden"
          >
            <motion.nav
              aria-label="Mobile"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="container-site flex flex-col gap-1 pt-8"
            >
              {site.nav.map((item) => (
                <motion.div key={item.href} variants={fadeUp}>
                  <Link
                    to={item.href}
                    className="flex min-h-14 items-center rounded-xl px-4 font-display text-2xl font-semibold text-ink transition-colors hover:text-primary"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={fadeUp}
                className="mt-6 border-t border-white/10 pt-6"
              >
                <a
                  href={site.githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn btn-ghost w-full"
                  onClick={() => setOpen(false)}
                >
                  <Github size={18} aria-hidden="true" />
                  Follow on GitHub
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
