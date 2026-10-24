/**
 * Marca original do ONE G STUDIO — o monograma "1+O+G":
 * anel "G" branco com o "1" laranja ao centro (o único acento da marca).
 * Desenho próprio em SVG, leve e escalável. Cores sólidas, sem gradientes.
 */

interface LogoMarkProps {
  size?: number
  className?: string
  /** Título acessível; sem título, a marca é decorativa (aria-hidden). */
  title?: string
}

export function LogoMark({ size = 36, className, title }: LogoMarkProps) {
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
      {/* Anel "G" com abertura à direita e barra para o centro — branco */}
      <path
        d="M32.9 11.3A15.5 15.5 0 1 0 39.5 24H31"
        stroke="#F5F5F7"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* O "1" ao centro — laranja, o acento único */}
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

/** Marca + nome do estúdio (grotesk, tracking apertado). */
export function Logo({ size = 30, withWordmark = true }: LogoProps) {
  return (
    <span className="inline-flex items-center gap-3">
      <LogoMark size={size} />
      {withWordmark && (
        <span className="font-display text-[13px] font-semibold uppercase leading-none tracking-[0.06em] text-ink">
          One&nbsp;G&nbsp;Studio
        </span>
      )}
    </span>
  )
}
