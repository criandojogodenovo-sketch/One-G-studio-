#!/usr/bin/env python3
"""Gera os PNGs de favicon do ONE G STUDIO a partir da marca 1+O+G.

Saídas (em public/):
  - favicon-32.png       (32x32, fundo transparente)
  - apple-touch-icon.png (180x180, fundo #0B0D10)

Requisitos: Pillow  ->  pip install Pillow
Uso:                python3 scripts/generate-favicons.py

A marca vetorial canónica vive em public/favicon.svg; este script reproduz
a mesma geometria em raster para navegadores/Disney-launchers que não usam SVG.
"""
from PIL import Image, ImageDraw

ORANGE = (255, 122, 24, 255)
BG = (11, 13, 16, 255)
SS = 4  # supersampling para anti-aliasing suave


def round_line(draw: ImageDraw.ImageDraw, a, b, color, width):
    """Linha com pontas arredondadas (PIL desenha pontas retas)."""
    draw.line([a, b], fill=color, width=width)
    r = width / 2
    for x, y in (a, b):
        draw.ellipse([x - r, y - r, x + r, y + r], fill=color)


def draw_mark(draw: ImageDraw.ImageDraw, p: int, scale: float):
    """Desenha a marca em coordenadas do viewBox 48x48, escalada por `scale`."""
    c = p / 2
    f = scale  # 1 unidade do viewBox -> f px
    ring_w = max(2, int(3.4 * f))

    # Anel "G": tudo exceto a abertura a direita (entre -55° e 0°)
    r = 15.5 * f
    bbox = [c - r, c - r, c + r, c + r]
    draw.arc(bbox, start=0, end=305, fill=ORANGE, width=ring_w)

    # Barra do G: do fim do arco (direita) para o centro
    round_line(draw, (c + r, c), (c + 7 * f, c), ORANGE, ring_w)

    # O "1": bandeira + haste
    one_w = max(2, int(3.4 * f))
    flag = ((c + (16.2 - 24) * f, c + (19.8 - 24) * f), (c + (21 - 24) * f, c + (15.4 - 24) * f))
    stem = (flag[1], (c + (21 - 24) * f, c + (33 - 24) * f))
    round_line(draw, *flag, ORANGE, one_w)
    round_line(draw, *stem, ORANGE, one_w)


def render(size: int, opaque_bg: bool) -> Image.Image:
    p = size * SS
    img = Image.new('RGBA', (p, p), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    if opaque_bg:
        draw.rectangle([0, 0, p, p], fill=BG)
        draw_mark(draw, p, scale=(p / 48) * 0.68)  # marca menor, centrada
    else:
        draw_mark(draw, p, scale=p / 48)
    return img.resize((size, size), Image.LANCZOS)


if __name__ == '__main__':
    render(32, opaque_bg=False).save('public/favicon-32.png')
    render(180, opaque_bg=True).save('public/apple-touch-icon.png')
    print('OK: public/favicon-32.png e public/apple-touch-icon.png gerados')
