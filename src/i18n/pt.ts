import type { Dictionary } from './en'

/**
 * Dicionário PORTUGUÊS — segunda língua do site (o inglês é o idioma por
 * defeito). Traduções escritas à mão (português de Angola/Portugal),
 * curtas e naturais — sem widgets de tradução automática.
 *
 * Tem de ter EXATAMENTE as mesmas chaves que en.ts — o tipo Dictionary
 * garante-o à compilação (falta ou sobra uma chave => erro de TypeScript).
 */
export const pt: Dictionary = {
  seo: {
    homeTitle: 'Software Android nativo, desenvolvido em público',
    homeDescription:
      'Estúdio independente a construir aplicações Android nativas offline: um modelador 3D, um motor de jogos, um editor de vídeo e um estúdio de pixel art.',
    notFoundTitle: 'Página não encontrada',
    notFoundDescription: 'Este endereço não corresponde a nenhuma rota do site.',
  },
  a11y: {
    skipToContent: 'Saltar para o conteúdo',
    mainNav: 'Principal',
    mobileNav: 'Móvel',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    loading: 'A carregar',
    language: 'Idioma',
    announceHome: 'ONE G STUDIO — início',
    announceApp: (name: string) => `${name} — detalhes do projeto`,
    announceNotFound: 'Página não encontrada',
  },
  nav: {
    projects: 'Projetos',
    studio: 'Estúdio',
    contact: 'Contacto',
  },
  hero: {
    title: 'Software Android nativo, desenvolvido em público.',
    lead: 'A ONE G STUDIO é um estúdio independente que constrói quatro projetos Android nativos — um modelador 3D, um motor de jogos, um editor de vídeo e um estúdio de pixel art. Offline em primeiro lugar, desenvolvido no GitHub.',
    viewProjects: 'Ver projetos',
    github: 'GitHub',
    indexLabel: 'Índice — estado das builds',
  },
  status: {
    inDevelopment: 'em desenvolvimento',
    available: 'disponível',
    comingSoon: 'em breve',
    underStudy: 'em estudo',
  },
  categories: {
    all: 'Todos',
    games: 'Jogos',
    tools: 'Ferramentas',
    video: 'Vídeo',
  },
  projects: {
    sectionTitle: 'Projetos',
    searchLabel: 'Pesquisar projetos por nome',
    searchPlaceholder: 'Pesquisar',
    clearSearch: 'Limpar pesquisa',
    filtersLabel: 'Filtrar por categoria',
    results: (shown: number, total: number) => `${shown} de ${total} projetos`,
    emptyTitle: 'Nenhum projeto corresponde',
    emptyText: 'Tente outra pesquisa ou categoria.',
    clearFilters: 'Limpar filtros',
    viewDetails: 'Ver detalhes',
  },
  studio: {
    sectionTitle: 'Estúdio',
    mission1:
      'A ONE G STUDIO é um estúdio de software independente que constrói aplicações Android nativas para trabalho criativo. Tudo funciona primeiro offline e é medido em hardware de entrada de gama. As ferramentas são gratuitas.',
    mission2:
      'O desenvolvimento acontece em público no GitHub — código, histórico e estado vivem em cada repositório. As funcionalidades planeadas estão documentadas como planeadas e os downloads só se ativam quando existe uma release.',
    roadmapLabel: 'Roadmap',
    roadmapNote: 'Sem datas — cada repositório mostra o estado atual.',
    roadmap: [
      { name: 'Blone', desc: 'modelação 3D', status: 'em desenvolvimento' },
      { name: 'G.One VV', desc: 'motor de jogos', status: 'em desenvolvimento' },
      { name: 'One Video G', desc: 'editor de vídeo', status: 'em desenvolvimento' },
      { name: 'Pixel One', desc: 'pixel art e texturas', status: 'em desenvolvimento' },
      { name: 'Creators', desc: 'modelos e templates feitos pela comunidade', status: 'em estudo' },
    ],
  },
  contact: {
    sectionTitle: 'Contacto',
    lead: 'A forma mais rápida de contactar o estúdio é uma issue no GitHub do projeto relevante — desenvolvimento, erros e ideias vivem todos no mesmo sítio.',
    githubDesc: 'Perfil do estúdio — todos os projetos, releases e histórico de desenvolvimento.',
    channelsNote: 'Os restantes canais serão anunciados aqui quando existirem.',
  },
  footer: {
    menuLabel: 'Menu',
    projectsLabel: 'Projetos',
    source: 'Código',
    rights: (year: number) => `© ${year} ONE G STUDIO`,
  },
  detail: {
    back: 'Voltar aos projetos',
    specVersion: 'Versão',
    specStatus: 'Estado',
    specCategory: 'Categoria',
    specMinAndroid: 'Android mínimo',
    specArchitecture: 'Arquitetura',
    specOrientation: 'Orientação',
    specSource: 'Código-fonte',
    downloadSoon: 'Download · em breve',
    downloadFile: 'Descarregar APK',
    downloadNote: 'O download ativa quando uma release assinada for publicada no GitHub.',
    viewOnGithub: 'Ver no GitHub',
    foundBug: 'Encontrou um erro ou tem uma sugestão?',
    openIssue: 'Abrir uma issue',
    featuresTitle: 'Funcionalidades',
    plannedTag: 'planeado',
    requirementsTitle: 'Requisitos',
    screenshotsTitle: 'Capturas de ecrã',
    screenshotsPending: 'Capturas em preparação',
    moreTitle: 'Mais projetos',
  },
  notFound: {
    code: 'Erro 404',
    title: 'Página não encontrada',
    lead: 'Este endereço não corresponde a nenhuma rota do site.',
    back: 'Voltar aos projetos',
  },
}
