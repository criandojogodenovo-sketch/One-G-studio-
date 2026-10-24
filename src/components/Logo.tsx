import { useId } from 'react'

/**
 * Marca original do ONE G STUDIO — o monograma "1+O+G":
 * um anel em "G" (gradiente laranja→ciano) com o "1" ao centro.
 * Desenho próprio em SVG, leve e escalável.
 */

interface LogoMarkProps {
  size?: number
  className?: string
  /** Título acessível; sem título, a marca é decorativa (aria-hidden). */
  title?: string
}

export function LogoMark({ size = 36, className, title }: LogoMarkProps) {
  // id único por instância — evita colisão de gradientes quando há várias marcas na página
  const gradientId = useId()
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FF7A18" />
          <stop offset="0.55" stopColor="#FF7A18" />
          <stop offset="1" stopColor="#00D9FF" />
        </linearGradient>
      </defs>
      {/* Anel "G" com abertura à direita e barra para o centro */}
      <path
        d="M32.9 11.3A15.5 15.5 0 1 0 39.5 24H31"
        stroke={`url(#${gradientId})`}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* O "1" ao centro */}
      <path
        d="M16.2 19.8 21 15.4V33"
        stroke="#FF7A18"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

interface LogoProps {
  size?: number
  withWordmark?: boolean
}

/** Marca + nome do estúdio. */
export function Logo({ size = 36, withWordmark = true }: LogoProps) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark size={size} />
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[15px] font-bold tracking-[0.08em]">ONE&nbsp;G</span>
          <span className="mt-1 font-display text-[10px] font-medium tracking-[0.42em] text-mist">
            STUDIO
          </span>
        </span>
      )}
    </span>
  )
}
