import type { AppInfo } from '../types'

interface AppIconProps {
  app: AppInfo
  size?: 'sm' | 'lg'
  /** true para o ícone principal de uma página (nunca lazy). */
  eager?: boolean
  className?: string
}

/**
 * Tile do ícone do app. Usa o artefacto REAL de cada projeto
 * (public/icons — ver README "Replacing placeholder art") sobre um tile
 * com gradiente subtil da marca. Decorativo: o nome fica adjacente.
 */
export function AppIcon({ app, size = 'sm', eager = false, className = '' }: AppIconProps) {
  const tile = size === 'lg' ? 'h-24 w-24' : 'h-14 w-14'
  const img = size === 'lg' ? 'h-[4.5rem] w-[4.5rem]' : 'h-10 w-10'
  const px = size === 'lg' ? 72 : 40

  return (
    <span
      aria-hidden="true"
      className={`card-sheen relative inline-flex ${tile} shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-primary/[0.14] via-surface to-secondary/[0.08] shadow-card ${className}`}
    >
      <img
        src={app.icone}
        alt=""
        width={px}
        height={px}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={`${img} rounded-xl object-cover`}
      />
    </span>
  )
}
