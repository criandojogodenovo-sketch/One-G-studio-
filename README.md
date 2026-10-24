# ONE G STUDIO — Official Website

The official website of **ONE G STUDIO**, an independent studio building
offline-first, native Android apps for creators: 3D modeling, a mobile game
engine, video editing and pixel art.

This repository contains the complete source of the static site — built with
**Vite + React 18 + TypeScript (strict) + Tailwind CSS + Framer Motion** and
deployed to **Cloudflare Workers** (static assets).

- **Editorial, engineering-spec design system**: near-black background,
  1px hairlines, numbered sections, JetBrains Mono for labels and metadata,
  a single orange accent
- **Two languages**: English (default) and Portuguese, with typed
  dictionaries — no translation libraries (see "Languages")
- **Apps catalogue** as an editorial list with live search and category
  filters
- **App pages** (`/apps/:id`) as a technical spec sheet — verified features,
  requirements table and a safe download policy
- **Accessibility first**: keyboard navigation, focus management, reduced-motion
  support
- **Honest content**: no invented statistics, no fake contact info, downloads
  enabled only when a release actually exists

## Tech stack

| Layer | Choice |
| --- | --- |
| Build tool | Vite 5 |
| UI | React 18 + TypeScript 5 (`strict`, no `any`) |
| Styling | Tailwind CSS 3 (PostCSS + Autoprefixer) |
| Motion | Framer Motion 11 (short, functional) + CSS |
| Icons | lucide-react |
| Routing | React Router 6 (lazy-loaded routes) |
| Fonts | Space Grotesk + Inter (Fontsource, woff2) · **JetBrains Mono self-hosted in `public/fonts/`** — no new npm dependency |

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
├── wrangler.jsonc              # config do Cloudflare Workers (assets + SPA)
├── index.html                  # shell + metadados estáticos (OG/Twitter)
├── public/
│   ├── fonts/                  # JetBrains Mono (woff2 latin + licença OFL)
│   ├── favicon.svg             # marca 1+O+G (vetorial)
│   ├── favicon-32.png          # gerado por scripts/generate-favicons.py
│   ├── apple-touch-icon.png
│   ├── og-image.png            # imagem de partilha (1200x630, scripts/og/)
│   ├── screenshots/            # capturas reais por app (opcional — ver abaixo)
│   └── icons/                  # ícones REAIS dos apps (ver "Placeholder art")
├── scripts/
│   ├── generate-favicons.py    # regenera os PNGs do favicon (Pillow)
│   └── og/og.html              # fonte da og-image (captura via browser)
└── src/
    ├── App.tsx                 # rotas, layout, MotionConfig, LanguageProvider
    ├── main.tsx
    ├── index.css               # design system (tokens, @font-face, utilities)
    ├── types.ts                # AppInfo, AppCategory, AppStatus, ...
    ├── i18n/
    │   ├── index.tsx           # LanguageProvider, useT, L10n — sem bibliotecas
    │   ├── en.ts               # dicionário inglês (idioma por defeito)
    │   └── pt.ts               # dicionário português (mesmas chaves, tipado)
    ├── data/
    │   ├── apps.ts             # CATÁLOGO — leia o comentário no topo
    │   └── site.ts             # marca, navegação, URLs (textos no i18n)
    ├── lib/
    │   └── seo.ts              # metadados por rota (SPA) — ver "SEO"
    ├── utils/
    │   ├── download.ts         # POLÍTICA DE DOWNLOAD SEGURO
    │   ├── animation.ts        # variantes de movimento partilhadas
    │   └── hooks.ts            # efeitos de rota, foco, scroll lock
    ├── components/             # Header, Hero, Projects, AppIcon, Studio,
    │                           # Contact, Footer, Logo, LanguageToggle, ...
    └── pages/                  # Home, AppDetail, NotFound (lazy)
```

## Languages (EN default, PT optional)

The site is **English by default** and offers **Portuguese** as a second
language. The implementation is deliberately light — no i18n libraries:

- Dictionaries live in `src/i18n/en.ts` and `src/i18n/pt.ts`. The Portuguese
  dictionary is typed as `Dictionary` (= `typeof en`), so **the compiler
  guarantees both languages have exactly the same keys** — a missing or
  extra key is a build error.
- `LanguageProvider` (in `src/i18n/index.tsx`) exposes `useT()` (dictionary)
  and `useLanguage()` (`locale`, `setLocale`). All visible text comes from
  the dictionaries.
- The choice is stored in `localStorage` (inside `try/catch`). On a first
  visit the site always starts in English — **no automatic browser-language
  detection**.
- Switching languages updates `<html lang>` and the `<title>`/meta tags,
  and keeps the **same URLs** (no `/pt` routes).
- App content is localized per field in `src/data/apps.ts` using `L10n<T>`
  (`{ en: T, pt: T }`) — see the content model below.
- App names, technical terms (keyframes, loop cut, glTF…) and the studio
  tagline **stay in English in both languages**.
- The Portuguese copy is handwritten (Angola/Portugal Portuguese) — do not
  machine-translate; keep it short and natural.

### Adding a new language

1. Create `src/i18n/xx.ts` with `const xx: Dictionary = { … }` — the compiler
   will list every key you still need to translate.
2. In `src/i18n/index.tsx`: extend the `Locale` union, add the dictionary to
   `DICTIONARIES`, the code to `locales` and a label to `LOCALE_LABELS`.
3. Fill the new language in every `L10n` field of `src/data/apps.ts` —
   TypeScript points out anything missing.
4. Translations for the language selector appear automatically in the header
   and mobile menu.

## Content model

All site content about the apps lives in **`src/data/apps.ts`** (in Portuguese
comments, for the maintainer). Each app is a strictly typed `AppInfo` with
per-language text (`L10n`):

```ts
{
  id: 'blone',                    // rota /apps/blone
  nome: 'Blone',                  // fica em inglês nos dois idiomas
  role: { en: '3D modeling', pt: 'Modelação 3D' },
  descricaoCurta: { en: '…', pt: '…' },
  descricaoLonga: { en: '…\n\n…', pt: '…\n\n…' },
  categoria: 'tools',             // 'games' | 'tools' | 'video' (rótulos no i18n)
  icone: '/icons/blone.png',      // arte em public/icons/
  screenshots: [],                // vazio => "Screenshots in preparation"
  versao: 'v0.4.0-fase3',         // tag exata do build.gradle do app
  requisitos: { en: 'Android 8.0 (API 26)+', pt: 'Android 8.0 (API 26)+' },
  arquitetura: 'arm64-v8a',       // opcional — só quando verificado
  orientacao: { en: 'Landscape', pt: 'Horizontal' },  // opcional
  funcionalidades: { en: ['…'], pt: ['…'] },
  repo: 'criandojogodenovo-sketch/Blone',
  downloadUrl: '',                // '' enquanto não há release
  status: 'soon',                 // 'available' | 'soon'
}
```

Studio-wide information (name, tagline, navigation, URLs, site version) is
centralized in **`src/data/site.ts`** — visible text lives in the i18n
dictionaries.

### Adding a new app

1. Drop the icon at `public/icons/<id>.png` (512×512 recommended).
2. Add one `AppInfo` entry to `src/data/apps.ts`, filling **both languages**
   of every `L10n` field (the compiler enforces it).
3. Keep facts **verifiable** — planned features must include the word
   "planned" (EN) or "planeado" (PT): the detail page renders them in gray
   with a "planned" tag.

### Replacing placeholder art

- **Icons** in `public/icons/` are the *real* assets from each project
  (Blone and G.One VV launcher art, One Video G brand icon, and a faithful
  SVG recreation of Pixel One's adaptive icon). Replace any of them freely —
  the `icone` field is just a path.
- **Screenshots**: while `screenshots` is empty, app pages show a single
  "Screenshots in preparation" line — no fake frames. To publish real
  captures, add files to `public/screenshots/<app-id>/` and list the paths
  in `screenshots` (e.g. `['/screenshots/blone/01.png']`).
  Never publish images that imply features the apps do not have.

## Enabling downloads (safety policy)

Downloads are **disabled by default**. Every app ships with
`status: 'soon'` and `downloadUrl: ''`, which renders a discreet status line
**"Download · coming soon"** plus an "in development" state.

To enable an app's download:

1. Publish the **signed APK** on that app's GitHub Releases with a stable
   file name, e.g. `Blone-release.apk`.
2. In `src/data/apps.ts`, set:

```ts
status: 'available',
downloadUrl:
  'https://github.com/criandojogodenovo-sketch/REPO/releases/latest/download/NOME-FIXO.apk',
```

`src/utils/download.ts` only enables the download link when **both**
conditions hold: `status === 'available'` **and** the URL is an HTTPS
permalink in the `releases/latest/download/*.apk` format **on the studio's
own GitHub account**. Anything else (HTTP, other domains, other paths) is
blocked and the status line stays "coming soon".

> **Never commit `.apk` / `.aab` files to this repository.** Binaries live
> only in GitHub Releases. The `.gitignore` already excludes them.

## Deploying to Cloudflare Workers

The site ships as a **Cloudflare Worker with static assets**, configured in
`wrangler.jsonc` (project name `one-g-studio`, assets from `./dist`).

1. **Build** the production bundle:

   ```bash
   npm run build      # typecheck + vite build -> dist/
   ```

2. **Deploy** the Worker:

   ```bash
   npx wrangler deploy
   ```

   On the first machine you use, authenticate first with
   `npx wrangler login` (opens the browser); afterwards `npx wrangler deploy`
   is all it takes. CI/CD can use a `CLOUDFLARE_API_TOKEN` secret instead of
   interactive login.

**How SPA routing works now:** deep links like `/apps/blone` are handled by
`assets.not_found_handling = "single-page-application"` in `wrangler.jsonc` —
any path without a matching asset is served `index.html` (this replaces the
old `public/_redirects` file from the Cloudflare Pages setup). Note that real
files (JS/CSS/icons) are still served with their exact paths and correct
cache headers by the Workers assets layer.

Other notes:

- `compatibility_date` is pinned to `2026-10-01`; bump it when you want to
  adopt newer Workers runtime behavior.
- Local check of the production bundle: `npm run preview` (serves `dist/`)
  or `npx wrangler dev` (replicates the Worker + assets setup locally).
- Project size stays far below the Workers static-assets limits: every file
  is well under the 25 MiB per-file limit, and the build produces ~30 files
  in a few seconds.

After the site has a real domain, set `siteUrl` in `src/data/site.ts` —
this activates absolute canonical/OG URLs (see `src/lib/seo.ts`).

## Accessibility

- Semantic landmarks (`header`/`nav`/`main`/`footer`), one `h1` per page,
  labelled sections and forms
- Skip-to-content link; focus moves to `main` on route changes; route
  changes announced via `aria-live` in the active language
- Keyboard support everywhere: Esc closes the mobile menu, focus is trapped
  inside it and returned to the hamburger button; filter chips use
  `aria-pressed`; search has a visible label (screen-reader only) and clear
  button; results count is announced politely
- Touch targets are at least 44×44 px; visible focus ring on all interactive
  elements (`:focus-visible`, solid orange)
- `prefers-reduced-motion` respected twice: CSS kills transitions, and
  `<MotionConfig reducedMotion="user">` disables transform animations in
  Framer Motion; the site remains fully usable without any animation
- Color contrast: body text ≥ 7:1, mono labels ≥ 4.5:1, brand orange ≥ 7:1
  on the near-black background

Verify with: keyboard-only navigation (Tab/Shift+Tab/Esc), a screen reader
(NVDA/VoiceOver), and your OS "reduce motion" setting.

## SEO considerations (SPA limitations — read this)

This is a **client-rendered SPA**: what crawlers fetch first is the static
`index.html` (title, description, Open Graph/Twitter tags) and the app
updates `document.title`, description and OG tags **per route at runtime**
(`src/lib/seo.ts`), in the active language.

Practical consequences:

- Social previews (Facebook/X/WhatsApp) read the **static** `index.html`
  tags — accurate for the site as a whole (English), not per-app.
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

Concept: **engineering spec sheet** — editorial interface, precise,
grid-based, like premium technical documentation.

| Token | Value | Use |
| --- | --- | --- |
| `canvas` | `#0A0A0B` | page background (near-black) |
| `raised` | `#101013` | hover background |
| `surface` | `#16161A` | table surfaces |
| `line` | `#1F1F23` | 1px hairlines and borders |
| `ink` | `#F5F5F7` | primary text |
| `mist` | `#A8A8B2` | secondary text |
| `meta` | `#8B8B95` | mono labels, metadata (≥ 4.5:1) |
| `faint` | `#6F6F78` | decorative only (ghost numbers, notes) |
| `accent` | `#FF7A18` | the ONLY accent — active states, status dots, one detail per section |

Typography: **Space Grotesk** 500-600 (display, tight tracking) · **Inter**
(body) · **JetBrains Mono** (labels, versions, indexes, spec sheets). Corners
are straight or 2-4 px. Sections are numbered ("01 — Projects"). Motion is
short and functional (200-400 ms fades, small offsets) via shared variants in
`src/utils/animation.ts`; nothing loops. No gradients, no glow, no glass.

The brand mark (the "1+O+G" monogram, white ring + orange 1) is an original
SVG (`src/components/Logo.tsx`, `public/favicon.svg`); favicon PNGs can be
regenerated with `python3 scripts/generate-favicons.py` (requires Pillow).
The share image (`public/og-image.png`) is captured from
`scripts/og/og.html` at 1200×630.

## License & credits

Website code and brand assets: © ONE G STUDIO. All rights reserved.
App names, icons and facts belong to their respective projects:
[Blone](https://github.com/criandojogodenovo-sketch/Blone) ·
[G.One VV](https://github.com/criandojogodenovo-sketch/g.oni.vv) ·
[One Video G](https://github.com/criandojogodenovo-sketch/One-video-G-) ·
[Pixel One](https://github.com/criandojogodenovo-sketch/Pixelone).
Fonts: Inter and Space Grotesk (SIL Open Font License, via Fontsource);
JetBrains Mono (SIL Open Font License, self-hosted in `public/fonts/` —
license file included).
