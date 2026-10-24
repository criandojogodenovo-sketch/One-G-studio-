import type { AppInfo } from '../types'

interface AppIconProps {
  app: AppInfo
  size?: 'xs' | 'sm' | 'lg'
  /** true para o ícone principal de uma página (nunca lazy). */
  eager?: boolean
  className?: string
}

const DIMS = {
  xs: { tile: 'h-7 w-7', img: 'h-[22px] w-[22px]', px: 22 },
  sm: { tile: 'h-10 w-10', img: 'h-8 w-8', px: 32 },
  lg: { tile: 'h-16 w-16', img: 'h-[52px] w-[52px]', px: 52 },
} as const

/**
 * Tile do ícone do app — quadrado, 1px de borda, raio 2px.
 * Usa o artefacto REAL de cada projeto (public/icons). Decorativo:
 * o nome fica sempre adjacente ao ícone.
 */
export function AppIcon({ app, size = 'sm', eager = false, className = '' }: AppIconProps) {
  const { tile, img, px } = DIMS[size]
  return (
    <span
      aria-hidden="true"
      className={`inline-flex ${tile} shrink-0 items-center justify-center rounded-[2px] border border-line bg-raised p-[3px] ${className}`}
    >
      <img
        src={app.icone}
        alt=""
        width={px}
        height={px}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={`${img} rounded-[1px] object-cover`}
      />
    </span>
  )
}
