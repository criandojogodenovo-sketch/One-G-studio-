import type { AppInfo } from '../types'
import { ImagePlus } from 'lucide-react'

interface ScreenshotFrameProps {
  app: AppInfo
  index: number
}

/**
 * Moldura PLACEHOLDER de screenshot — usada enquanto não existem capturas
 * reais publicadas. Nunca simula a interface real da app; é claramente
 * marcada como placeholder. Para usar capturas reais, preencha
 * `screenshots` em src/data/apps.ts (ver README).
 */
export function ScreenshotFrame({ app, index }: ScreenshotFrameProps) {
  return (
    <figure className="group">
      <div
        role="img"
        aria-label={`Placeholder for a ${app.nome} screenshot`}
        className="card-sheen relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-dashed border-white/15 bg-surface/60 transition-transform duration-500 ease-sharp group-hover:scale-[1.02]"
      >
        <div aria-hidden="true" className="bg-grid-mask absolute inset-0 opacity-60" />
        <div aria-hidden="true" className="ambient-primary absolute -left-16 -top-16 h-56 w-56 opacity-50" />
        <img
          src={app.icone}
          alt=""
          aria-hidden="true"
          width={88}
          height={88}
          loading="lazy"
          decoding="async"
          className="relative h-[88px] w-[88px] rounded-2xl object-cover opacity-40"
        />
        <span aria-hidden="true" className="chip absolute bottom-3 right-3 !py-0.5">
          Placeholder
        </span>
      </div>
      <figcaption className="mt-2 flex items-center justify-between gap-2 text-xs text-mist">
        <span>
          <span className="sr-only">Screenshot </span>#{index + 1}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <ImagePlus size={12} aria-hidden="true" />
          Real capture coming with the release
        </span>
      </figcaption>
    </figure>
  )
}
