# ONE G STUDIO — Official Website

The official website of **ONE G STUDIO**, an independent studio building free,
offline-first, native Android apps for creators: 3D modeling, a mobile game
engine, video editing and pixel art.

This repository contains the complete source of the static site — built with
**Vite + React 18 + TypeScript (strict) + Tailwind CSS + Framer Motion** and
designed for **Cloudflare Pages**.

- **Apps catalogue** with live search and category filters (All / Games / Tools / Video)
- **App pages** (`/apps/:id`) with verified features, requirements and safe download policy
- Original **1+O+G brand identity**, dark futuristic design system, site-wide motion
- **Accessibility first**: keyboard navigation, focus management, reduced-motion support
- **Honest content**: no invented statistics, no fake contact info, downloads
  enabled only when a release actually exists

## Tech stack

| Layer | Choice |
| --- | --- |
| Build tool | Vite 5 |
| UI | React 18 + TypeScript 5 (`strict`, no `any`) |
| Styling | Tailwind CSS 3 (PostCSS + Autoprefixer) |
| Motion | Framer Motion 11 (interactions) + CSS (ambient effects) |
| Icons | lucide-react |
| Routing | React Router 6 (lazy-loaded routes) |
| Fonts | Inter + Space Grotesk, self-hosted via Fontsource (woff2, `font-display: swap`) |

## Getting started

**Prerequisites:** Node.js **20** (see `.nvmrc`) and npm 10+.

```bash
nvm use                 # lê o .nvmrc (Node 20)
npm ci                  # instala exatamente o package-lock.json
npm run dev             # servidor de desenvolvimento (http://localhost:5173)
```

Other scripts:

```bash
npm run typecheck       # tsc --noEmit
npm run build           # typecheck + build de produção -> dist/
npm run preview         # serve o build localmente (http://localhost:4173)
```

> `npm run build` always runs the TypeScript check first — a commit that does
> not build is not committed.

## Project structure

```
├── index.html                  # shell + metadados estáticos (OG/Twitter)
├── public/
│   ├── _redirects              # SPA fallback do Cloudflare Pages
│   ├── favicon.svg             # marca 1+O+G (vetorial)
│   ├── favicon-32.png          # gerado por scripts/generate-favicons.py
│   ├── apple-touch-icon.png
│   ├── og-image.png            # imagem de partilha (1200x630)
│   └── icons/                  # ícones REAIS dos apps (ver "Placeholder art")
├── scripts/
│   └── generate-favicons.py    # regenera os PNGs do favicon (Pillow)
└── src/
    ├── App.tsx                 # rotas, layout, MotionConfig global
    ├── main.tsx
    ├── index.css               # design system (tokens, utilitários, reduced-motion)
    ├── types.ts                # AppInfo, AppCategory, AppStatus, ...
    ├── data/
    │   ├── apps.ts             # CATÁLOGO — leia o comentário no topo
    │   └── site.ts             # marca, navegação, contacto (centralizado)
    ├── lib/
    │   └── seo.ts              # metadados por rota (SPA) — ver "SEO"
    ├── utils/
    │   ├── download.ts         # POLÍTICA DE DOWNLOAD SEGURO
    │   ├── animation.ts        # variantes de movimento partilhadas
    │   └── hooks.ts            # efeitos de rota, foco, scroll lock
    ├── components/             # Header, Hero, AppsGrid, AppCard, About,
    │                           # Contact, Footer, Logo, ScrollProgress, ...
    └── pages/                  # Home, AppDetail, NotFound (lazy)
```

## Content model

All site content about the apps lives in **`src/data/apps.ts`** (in Portuguese
comments, for the maintainer). Each app is a strictly typed `AppInfo`:

```ts
{
  id: 'blone',               // rota /apps/blone
  nome: 'Blone',
  descricaoCurta: '…',       // card do catálogo
  descricaoLonga: '…\n\n…',  // parágrafos da página de detalhe
  categoria: 'Ferramentas',  // Jogos | Ferramentas | Vídeo (rótulos EN no site)
  icone: '/icons/blone.png', // arte em public/icons/
  screenshots: [],           // vazio => molduras placeholder
  versao: 'Fase 3',
  requisitos: 'Android 8.0 (API 26) or later',
  funcionalidades: ['…'],
  repo: 'criandojogodenovo-sketch/Blone',
  downloadUrl: '',           // '' enquanto não há release
  status: 'soon',            // 'available' | 'soon'
}
```

Studio-wide information (name, navigation, contact channels, domain) is
centralized in **`src/data/site.ts`**.

### Adding a new app

1. Drop the icon at `public/icons/<id>.png` (512×512 recommended).
2. Add one `AppInfo` entry to `src/data/apps.ts` (follow the existing entries).
3. Keep facts **verifiable** — planned features must be marked as planned
   (the detail page styles any feature containing “planned” differently).

### Replacing placeholder art

- **Icons** in `public/icons/` are the *real* assets from each project
  (Blone and G.One VV launcher art, One Video G brand icon, and a faithful
  SVG recreation of Pixel One's adaptive icon). Replace any of them freely —
  the `icone` field is just a path.
- **Screenshots**: while `screenshots` is empty, app pages show clearly
  labeled placeholder frames. To publish real captures, add files to
  `public/screenshots/` and list the paths in `screenshots`.
  Never publish images that imply features the apps do not have.

## Enabling downloads (safety policy)

Downloads are **disabled by default**. Every app ships with
`status: 'soon'` and `downloadUrl: ''`, which renders a disabled
**“Coming soon”** button plus an **“In development”** badge.

To enable an app's download:

1. Publish the **signed APK** on that app's GitHub Releases with a stable
   file name, e.g. `Blone-release.apk`.
2. In `src/data/apps.ts`, set:

```ts
status: 'available',
downloadUrl:
  'https://github.com/criandojogodenovo-sketch/REPO/releases/latest/download/NOME-FIXO.apk',
```

`src/utils/download.ts` only enables the button when **both** conditions
hold: `status === 'available'` **and** the URL is an HTTPS permalink in the
`releases/latest/download/*.apk` format **on the studio's own GitHub
account**. Anything else (HTTP, other domains, other paths) is blocked and
the button stays disabled.

> **Never commit `.apk` / `.aab` files to this repository.** Binaries live
> only in GitHub Releases. The `.gitignore` already excludes them.

## Deploying to Cloudflare Pages

1. Fork/push this repository to GitHub.
2. In Cloudflare → **Workers & Pages → Create → Pages → Connect to Git**,
   select this repository.
3. Build settings:
   - **Framework preset:** None (or Vite)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variable:** `NODE_VERSION = 20` (`.nvmrc` is also committed)
4. Deploy. SPA routing (deep links like `/apps/blone`) is handled by
   `public/_redirects` → `/* /index.html 200`, copied into `dist/` on build.

Project limits (well below Cloudflare Pages maximums): every file is far
under the 25 MiB per-file limit, the build produces ~30 files (limit 20,000)
in a few seconds (limit 20 minutes).

After the site has a real domain, set `siteUrl` in `src/data/site.ts` —
this activates absolute canonical/OG URLs (see `src/lib/seo.ts`).

## Accessibility

- Semantic landmarks (`header`/`nav`/`main`/`footer`), one `h1` per page,
  labelled sections and forms
- Skip-to-content link; focus moves to `main` on route changes; route
  changes announced via `aria-live`
- Keyboard support everywhere: Esc closes the mobile menu, focus is trapped
  inside it and returned to the hamburger button; filter chips use
  `aria-pressed`; search has a visible label (screen-reader only) and clear
  button; results count is announced politely
- Touch targets are at least 44×44 px; visible focus ring on all interactive
  elements (`:focus-visible`, cyan)
- `prefers-reduced-motion` respected twice: CSS kills ambient
  animations/transitions, and `<MotionConfig reducedMotion="user">` disables
  transform animations in Framer Motion; the site remains fully usable
  without any animation
- Color contrast: body text ≥ 7:1, secondary text ≥ 7:1, brand colors ≥ 7:1
  on the dark background

Verify with: keyboard-only navigation (Tab/Shift+Tab/Esc), a screen reader
(NVDA/VoiceOver), and your OS "reduce motion" setting.

## SEO considerations (SPA limitations — read this)

This is a **client-rendered SPA**: what crawlers fetch first is the static
`index.html` (title, description, Open Graph/Twitter tags) and the app
updates `document.title`, description and OG tags **per route at runtime**
(`src/lib/seo.ts`).

Practical consequences:

- Social previews (Facebook/X/WhatsApp) read the **static** `index.html`
  tags — accurate for the site as a whole, not per-app.
- Search engines that run JavaScript (Google) see per-route metadata after
  hydration.
- `og:image` is referenced as a relative path until `siteUrl` is set in
  `src/data/site.ts`; some platforms require absolute URLs for previews —
  fill `siteUrl` after deploy.
- If per-app SEO becomes critical, the recommended next step is
  **prerendering** (e.g. `vite-plugin-ssr`/`vite-react-ssg` or moving to a
  framework with static generation). No domain is invented in this
  repository, so nothing is announced that does not exist.

## Security & secrets

- **Never commit secrets**: no tokens, no `.env` files (`.gitignore` covers
  `.env`, `.env.*`), no signing keystores, no APK/AAB binaries.
- The website is 100% static — no server, no database, no user data.
- If you cloned using a personal access token, rotate it after use and make
  sure it never ends up in remotes, logs or screenshots:
  `git remote set-url origin https://github.com/<user>/<repo>.git`.

## Design system

| Token | Value | Use |
| --- | --- | --- |
| `canvas` | `#0B0D10` | page background |
| `panel` | `#10141A` | secondary background |
| `surface` | `#141820` | cards |
| `primary` | `#FF7A18` | brand orange — primary actions, accents |
| `secondary` | `#00D9FF` | cyan — secondary accents, focus ring |
| `ink` / `mist` | `#E8EDF4` / `#9AA6B5` | primary / secondary text |

Typography: **Space Grotesk** (display), **Inter** (body). Motion: short,
orchestrated reveals (`transform`/`opacity` only) via shared variants in
`src/utils/animation.ts`; slow ambient gradients in pure CSS. Glass surfaces
(`.glass`) are reserved for floating elements — never applied to every
section.

The brand mark (the “1+O+G” monogram) is an original SVG
(`src/components/Logo.tsx`, `public/favicon.svg`); favicon PNGs can be
regenerated with `python3 scripts/generate-favicons.py` (requires Pillow).

## License & credits

Website code and brand assets: © ONE G STUDIO. All rights reserved.
App names, icons and facts belong to their respective projects:
[Blone](https://github.com/criandojogodenovo-sketch/Blone) ·
[G.One VV](https://github.com/criandojogodenovo-sketch/g.oni.vv) ·
[One Video G](https://github.com/criandojogodenovo-sketch/One-video-G-) ·
[Pixel One](https://github.com/criandojogodenovo-sketch/Pixelone).
Fonts: Inter and Space Grotesk (SIL Open Font License), served via Fontsource.
