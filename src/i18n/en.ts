/**
 * Dicionário INGLÊS — idioma por defeito do site.
 *
 * Regras:
 *  - TODOS os textos visíveis do site vivem aqui (ou em pt.ts);
 *  - o pt.ts tem de ter EXATAMENTE as mesmas chaves — o tipo Dictionary
 *    (typeof en) garante-o à compilação;
 *  - nomes de apps, termos técnicos e a tagline (site.tagline) ficam em
 *    inglês nos dois idiomas;
 *  - sem promessas de preço: "free" aparece UMA vez, sóbria, no Studio.
 */
export const en = {
  seo: {
    homeTitle: 'Native Android software, built in the open',
    homeDescription:
      'Independent studio building offline-first, native Android apps: a 3D modeler, a mobile game engine, a video editor and a pixel-art studio.',
    notFoundTitle: 'Page not found',
    notFoundDescription: 'This address does not match any route on the site.',
  },
  a11y: {
    skipToContent: 'Skip to content',
    mainNav: 'Main',
    mobileNav: 'Mobile',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    loading: 'Loading',
    language: 'Language',
    announceHome: 'ONE G STUDIO — home',
    announceApp: (name: string) => `${name} — project details`,
    announceNotFound: 'Page not found',
  },
  nav: {
    projects: 'Projects',
    studio: 'Studio',
    contact: 'Contact',
  },
  hero: {
    title: 'Native Android software, built in the open.',
    lead: 'ONE G STUDIO is an independent studio building four native Android projects — a 3D modeler, a mobile game engine, a video editor and a pixel-art studio. Offline-first, developed on GitHub.',
    viewProjects: 'View projects',
    github: 'GitHub',
    indexLabel: 'Index — build status',
  },
  status: {
    inDevelopment: 'in development',
    available: 'available',
    comingSoon: 'coming soon',
    underStudy: 'under study',
  },
  categories: {
    all: 'All',
    games: 'Games',
    tools: 'Tools',
    video: 'Video',
  },
  projects: {
    sectionTitle: 'Projects',
    searchLabel: 'Search projects by name',
    searchPlaceholder: 'Search',
    clearSearch: 'Clear search',
    filtersLabel: 'Filter by category',
    results: (shown: number, total: number) => `${shown} of ${total} projects`,
    emptyTitle: 'No projects match',
    emptyText: 'Try a different search or category.',
    clearFilters: 'Clear filters',
    viewDetails: 'View details',
  },
  studio: {
    sectionTitle: 'Studio',
    mission1:
      'ONE G STUDIO is an independent software studio building native Android applications for creative work. Everything works offline first and is measured on entry-level hardware. The tools are free.',
    mission2:
      'Development happens in public on GitHub — source, history and status live in each repository. Planned features are documented as planned, and downloads only activate when a release actually exists.',
    roadmapLabel: 'Roadmap',
    roadmapNote: 'No dates — each repository shows the current state.',
    roadmap: [
      { name: 'Blone', desc: '3D modeling', status: 'in development' },
      { name: 'G.One VV', desc: 'mobile game engine', status: 'in development' },
      { name: 'One Video G', desc: 'video editor', status: 'in development' },
      { name: 'Pixel One', desc: 'pixel art and textures', status: 'in development' },
      { name: 'Creators', desc: 'community-made models and templates', status: 'under study' },
    ],
  },
  contact: {
    sectionTitle: 'Contact',
    lead: 'The fastest way to reach the studio is a GitHub issue on the relevant project — development, bugs and ideas all live in the same place.',
    githubDesc: 'Studio profile — all projects, releases and development history.',
    channelsNote: 'Additional channels will be listed here when they exist.',
  },
  footer: {
    menuLabel: 'Menu',
    projectsLabel: 'Projects',
    source: 'Source',
    rights: (year: number) => `© ${year} ONE G STUDIO`,
  },
  detail: {
    back: 'Back to projects',
    specVersion: 'Version',
    specStatus: 'Status',
    specCategory: 'Category',
    specMinAndroid: 'Minimum Android',
    specArchitecture: 'Architecture',
    specOrientation: 'Orientation',
    specSource: 'Source',
    downloadSoon: 'Download · coming soon',
    downloadFile: 'Download APK',
    downloadNote: 'The download activates when a signed release is published on GitHub.',
    viewOnGithub: 'View on GitHub',
    foundBug: 'Found a bug or have a suggestion?',
    openIssue: 'Open an issue',
    featuresTitle: 'Features',
    plannedTag: 'planned',
    requirementsTitle: 'Requirements',
    screenshotsTitle: 'Screenshots',
    screenshotsPending: 'Screenshots in preparation',
    moreTitle: 'More projects',
  },
  notFound: {
    code: 'Error 404',
    title: 'Page not found',
    lead: 'This address does not match any route on the site.',
    back: 'Back to projects',
  },
}

export type Dictionary = typeof en
