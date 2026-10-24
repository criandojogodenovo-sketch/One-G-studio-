/**
 * ============================================================================
 *  CATÁLOGO DE PROJETOS — ONE G STUDIO
 * ============================================================================
 *  COMO ATIVAR OS DOWNLOADS (importante):
 *
 *  1. Publique o APK assinado no GitHub Releases do repositório do app
 *     (a URL abaixo é o link permanente que aponta sempre para a versão
 *     mais recente do arquivo).
 *
 *  2. No app desejado, altere:
 *        status: 'soon'       ->  status: 'available'
 *        downloadUrl: ''      ->  downloadUrl: 'https://github.com/criandojogodenovo-sketch/REPO/releases/latest/download/NOME-FIXO.apk'
 *
 *  SEGURANÇA (ver utils/download.ts):
 *  - O link de download SÓ fica ativo quando status === 'available' E a
 *    downloadUrl é um link HTTPS válido no padrão acima (GitHub Releases do
 *    próprio estúdio). Qualquer outro destino é bloqueado.
 *  - Enquanto status for 'soon', a página mostra apenas a linha discreta
 *    "Download · coming soon" e o estado "in development".
 *  - NUNCA faça commit de ficheiros .apk/.aab neste repositório do site —
 *    os binários vivem apenas nos GitHub Releases dos apps.
 *
 *  TEXTOS POR IDIOMA: cada campo descritivo é L10n ( { en, pt } ). Ao
 *  adicionar um novo idioma (ver README → "Languages"), o compilador aponta
 *  os campos que faltam preencher. Os factos são VERIFICADOS no repositório
 *  de cada app (build.gradle/README, out/2026); funcionalidades planeadas
 *  devem incluir a palavra "planned"/"planeado" (a página marca-as a cinza).
 * ============================================================================
 */
import type { AppCategory, AppInfo } from '../types'

/** Ordem dos filtros de categoria exibidos no catálogo. */
export const categoryOrder: AppCategory[] = ['games', 'tools', 'video']

export const apps: AppInfo[] = [
  {
    id: 'blone',
    nome: 'Blone',
    role: { en: '3D modeling', pt: 'Modelação 3D' },
    descricaoCurta: {
      en: 'Offline 3D modeling for Android — real OpenGL ES 3.0 viewport and touch-first editing for low-resource phones.',
      pt: 'Modelação 3D offline para Android — viewport OpenGL ES 3.0 real e edição pensada para o toque em telemóveis de poucos recursos.',
    },
    descricaoLonga: {
      en: "Blone is an offline, native Android application for 3D modeling, designed for touchscreens and phones with limited resources. Its viewport is a real-time OpenGL ES 3.0 renderer with grid, colored axes, flat shading and wireframe, and the interface is organized into four zones that keep the model visible and touchable in both orientations.\n\nThe editable core is a half-edge mesh engine: cube, sphere, cylinder and plane primitives work in Object mode — whole-object gizmo for moving, rotating and scaling, plus duplicate and delete — or in Edit mode with vertex, edge and face selection, extrusion, subdivision, loop cut and topologically validated deletion. Fase 3 adds sculpt and paint brushes directly on the mesh, where one gesture equals one undo step. Projects are saved and opened through the Android file picker (SAF) in the app's own BLONEPRJ format, with no storage permissions.",
      pt: "O Blone é uma aplicação Android nativa e offline de modelação 3D, desenhada para ecrãs táteis e telemóveis com recursos limitados. O viewport é um renderizador OpenGL ES 3.0 em tempo real, com grelha, eixos coloridos, sombreado plano e wireframe; a interface está organizada em quatro zonas que mantêm o modelo visível e tocável nas duas orientações.\n\nO núcleo editável é um motor de malhas half-edge: cubo, esfera, cilindro e plano trabalham em modo Object — gizmo de objeto inteiro para mover, rodar e escalar, além de duplicar e apagar — ou em modo Edit, com seleção de vértices, arestas e faces, extrusão, subdivisão, loop cut e eliminação validada topologicamente. A Fase 3 acrescenta pincéis de escultura e pintura diretamente na malha, onde um gesto equivale a um passo de desfazer. Os projetos gravam-se e abrem-se através do seletor de ficheiros do Android (SAF) no formato próprio BLONEPRJ, sem permissões de armazenamento.",
    },
    categoria: 'tools',
    icone: '/icons/blone.png',
    screenshots: [],
    versao: 'v0.4.0-fase3',
    requisitos: { en: 'Android 8.0 (API 26)+', pt: 'Android 8.0 (API 26)+' },
    funcionalidades: {
      en: [
        'OpenGL ES 3.0 real viewport — grid, axes, flat shading, wireframe',
        'Editable cube, sphere, cylinder and plane primitives',
        'Object mode: whole-object gizmo (move/rotate/scale) and duplicate',
        'Edit mode: vertex, edge and face selection',
        'Extrusion, subdivision and loop cut',
        'Topologically validated deletion',
        'Sculpt and paint brushes on the mesh (Fase 3)',
        'Gesture-based undo/redo — one gesture, one step',
        'Project save/open (BLONEPRJ via SAF, no permissions)',
        'Collapsible properties panel with counts and transforms',
      ],
      pt: [
        'Viewport OpenGL ES 3.0 real — grelha, eixos, sombreado plano, wireframe',
        'Primitivas editáveis: cubo, esfera, cilindro e plano',
        'Modo Object: gizmo de objeto (mover/rodar/escalar) e duplicar',
        'Modo Edit: seleção de vértices, arestas e faces',
        'Extrusão, subdivisão e loop cut',
        'Eliminação validada topologicamente',
        'Pincéis de escultura e pintura na malha (Fase 3)',
        'Desfazer/refazer por gestos — um gesto, um passo',
        'Gravar/abrir projetos (BLONEPRJ via SAF, sem permissões)',
        'Painel de propriedades dobrável com contagens e transformações',
      ],
    },
    repo: 'criandojogodenovo-sketch/Blone',
    downloadUrl: '',
    status: 'soon',
  },
  {
    id: 'g-one-vv',
    nome: 'G.One VV',
    role: { en: 'Mobile game engine', pt: 'Motor de jogos' },
    descricaoCurta: {
      en: 'Native mobile game engine and editor — build, play and export 3D scenes entirely on your phone.',
      pt: 'Motor e editor de jogos nativo para telemóvel — crie, jogue e exporte cenas 3D inteiramente no telefone.',
    },
    descricaoLonga: {
      en: 'G.One VV is a native Android game engine and editor written in C++/Java on top of an OpenGL ES 3 renderer — a project built to be edited on a phone: its code is written and reviewed on a 6.5-inch screen, with continuous integration as the only compiler and an entry-level real device (Realme C33) as the measuring stick.\n\nScenes live in the engine\'s own .goni project format and are edited through a hierarchy panel and an inspector. Models import as OBJ, glTF and GLB; PNG textures generate mipmaps and are cached as ETC2/ASTC compressed textures for low-end GPUs. Physics supports sphere, box and capsule bodies with continuous collision, touch controls provide a virtual joystick and jump button, Play mode snapshots and restores the scene, scenes can be exported as OBJ, and an in-app console records the engine\'s activity.',
      pt: "O G.One VV é um motor e editor de jogos Android nativo, escrito em C++/Java sobre um renderizador OpenGL ES 3 — um projeto pensado para ser editado num telemóvel: o código é escrito e revisto num ecrã de 6,5 polegadas, com a integração contínua como único compilador e um dispositivo real de entrada de gama (Realme C33) como régua de medição.\n\nAs cenas vivem no formato próprio .goni e são editadas através de um painel de hierarquia e um inspetor. Os modelos importam-se como OBJ, glTF e GLB; as texturas PNG geram mipmaps e ficam em cache como texturas comprimidas ETC2/ASTC para GPUs de entrada de gama. A física suporta corpos esfera, caixa e cápsula com colisão contínua, os comandos táteis oferecem joystick virtual e botão de salto, o modo Play guarda um instantâneo da cena e restaura-o, as cenas podem ser exportadas como OBJ e uma consola interna regista a atividade do motor.",
    },
    categoria: 'games',
    icone: '/icons/gone-vv.png',
    screenshots: [],
    versao: 'v0.9.6',
    requisitos: { en: 'Android 7.0 (API 24)+', pt: 'Android 7.0 (API 24)+' },
    arquitetura: 'arm64-v8a',
    orientacao: { en: 'Landscape', pt: 'Horizontal' },
    funcionalidades: {
      en: [
        'Hierarchy panel and inspector',
        'Native .goni project format',
        'OBJ, glTF and GLB model import',
        'PNG textures with mipmaps and ETC2/ASTC cache',
        'Sphere, box and capsule physics with continuous collision',
        'Virtual joystick and jump touch controls',
        'Play mode with scene snapshot and restoration',
        'OBJ export',
        'In-app console with engine logs',
      ],
      pt: [
        'Painel de hierarquia e inspetor',
        'Formato nativo de projeto .goni',
        'Importação de modelos OBJ, glTF e GLB',
        'Texturas PNG com mipmaps e cache ETC2/ASTC',
        'Física de esfera, caixa e cápsula com colisão contínua',
        'Joystick virtual e botão de salto táteis',
        'Modo Play com instantâneo e restauro da cena',
        'Exportação OBJ',
        'Consola interna com registos do motor',
      ],
    },
    repo: 'criandojogodenovo-sketch/g.oni.vv',
    downloadUrl: '',
    status: 'soon',
  },
  {
    id: 'one-video-g',
    nome: 'One Video G',
    role: { en: 'Video editor', pt: 'Editor de vídeo' },
    descricaoCurta: {
      en: 'Offline Android video editor with real MP4 export and no watermark — layers, keyframes and animated text.',
      pt: 'Editor de vídeo Android offline com exportação MP4 real e sem marca de água — camadas, keyframes e texto animado.',
    },
    descricaoLonga: {
      en: 'One Video G is a mobile-first, offline-first Android video editor built with Kotlin, Jetpack Compose and Media3 — exporting real MP4 (H.264/AAC) with no watermark, no account, no network access and no telemetry.\n\nProjects support video, image, text and audio layers over a timeline with trim, split, reorder, zoom and 40 levels of undo/redo. Keyframes animate position, scale, rotation and opacity with linear or smooth interpolation, and animated text is previewed with the exact same math used by the exporter. A diagnostics system categorizes and logs errors during long exports, and the whole interface runs in Portuguese and English.',
      pt: 'O One Video G é um editor de vídeo Android pensado primeiro para o telemóvel e para o offline, construído com Kotlin, Jetpack Compose e Media3 — exporta MP4 real (H.264/AAC) sem marca de água, sem conta, sem acesso à rede e sem telemetria.\n\nOs projetos suportam camadas de vídeo, imagem, texto e áudio sobre uma timeline com aparar, dividir, reordenar, zoom e 40 níveis de desfazer/refazer. Os keyframes animam posição, escala, rotação e opacidade com interpolação linear ou suave, e o texto animado é pré-visualizado com exatamente a mesma matemática usada pelo exportador. Um sistema de diagnóstico categoriza e regista erros durante exportações longas, e toda a interface existe em português e inglês.',
    },
    categoria: 'video',
    icone: '/icons/one-video-g.png',
    screenshots: [],
    versao: 'v0.8.0',
    requisitos: { en: 'Android 7.0 (API 24)+', pt: 'Android 7.0 (API 24)+' },
    funcionalidades: {
      en: [
        'Video, image, text and audio layers',
        'Projects with atomic autosave and recovery',
        'Timeline: trim, split, reorder, zoom, undo/redo',
        'Keyframes for position, scale, rotation and opacity',
        'Animated text overlays (preview = export math)',
        'Real MP4 export (H.264/AAC, 720p/1080p)',
        'Diagnostics with categorized error logging',
        'Portuguese and English interface',
        '100% offline — no account, no watermark',
      ],
      pt: [
        'Camadas de vídeo, imagem, texto e áudio',
        'Projetos com gravação automática atómica e recuperação',
        'Timeline: aparar, dividir, reordenar, zoom, desfazer/refazer',
        'Keyframes para posição, escala, rotação e opacidade',
        'Texto animado (pré-visualização = matemática de exportação)',
        'Exportação MP4 real (H.264/AAC, 720p/1080p)',
        'Diagnóstico com registo de erros categorizado',
        'Interface em português e inglês',
        '100% offline — sem conta, sem marca de água',
      ],
    },
    repo: 'criandojogodenovo-sketch/One-video-G-',
    downloadUrl: '',
    status: 'soon',
  },
  {
    id: 'pixel-one',
    nome: 'Pixel One',
    role: { en: 'Pixel art and textures', pt: 'Pixel art e texturas' },
    descricaoCurta: {
      en: 'Pixel art and 2D/3D texture studio for Android — paint textures and apply them to 3D models.',
      pt: 'Estúdio de pixel art e texturas 2D/3D para Android — pinte texturas e aplique-as a modelos 3D.',
    },
    descricaoLonga: {
      en: "Pixel One is a native Android studio for creating pixel art and 2D textures and applying them to 3D models — with a documented plan for assisted 2D-to-3D geometric construction that is not yet implemented. It is offline at its core: no backend, no accounts, no ads and no payments, carrying the app's own black, gray and orange identity.\n\nThe Texture Studio is a real pixel editor driven by a C++/JNI engine: pencil, eraser, tolerance fill, eyedropper, brushes, color palettes and a sparse undo history where one stroke is one entry, under a 32 MB budget. The 3D Texture Studio (Fase 3) adds an OpenGL ES viewer with orbit camera, glTF 2.0/GLB import with explicit validation, per-material UV texture application, a UV view with island selection and a split 3D/paint mode with partial GPU updates.",
      pt: "O Pixel One é um estúdio Android nativo para criar pixel art e texturas 2D e aplicá-las a modelos 3D — com um plano documentado de construção geométrica assistida 2D-para-3D que ainda não está implementado. É offline no núcleo: sem backend, sem contas, sem anúncios e sem pagamentos, carregando a identidade própria de preto, cinzento e laranja.\n\nO Texture Studio é um editor de píxeis real movido por um motor C++/JNI: lápis, borracha, preenchimento por tolerância, conta-gotas, pincéis, paletas de cores e um histórico de desfazer esparso em que um traço é um registo, sob um orçamento de 32 MB. O 3D Texture Studio (Fase 3) acrescenta um visualizador OpenGL ES com câmara em órbita, importação glTF 2.0/GLB com validação explícita, aplicação de texturas UV por material, uma vista UV com seleção de ilhas e um modo dividido 3D/pintura com atualizações parciais na GPU.",
    },
    categoria: 'tools',
    icone: '/icons/pixel-one.svg',
    screenshots: [],
    versao: 'v0.4.0-fase-3d',
    requisitos: { en: 'Android 8.0 (API 26)+', pt: 'Android 8.0 (API 26)+' },
    funcionalidades: {
      en: [
        'Texture Studio: real pixel editor with C++/JNI engine',
        'Tools: pencil, eraser, tolerance fill, eyedropper, brushes, palettes',
        'Sparse undo history — one stroke = one entry (32 MB budget)',
        '3D Texture Studio: OpenGL ES viewer with orbit camera',
        'glTF 2.0/GLB import with explicit validation',
        'UV texture application per material, Nearest/Linear sampling',
        'UV view with island selection + split 3D/paint mode',
        '2D-to-3D Studio (planned — not yet implemented)',
      ],
      pt: [
        'Texture Studio: editor de píxeis real com motor C++/JNI',
        'Ferramentas: lápis, borracha, preenchimento por tolerância, conta-gotas, pincéis, paletas',
        'Histórico de desfazer esparso — um traço = um registo (32 MB)',
        '3D Texture Studio: visualizador OpenGL ES com câmara em órbita',
        'Importação glTF 2.0/GLB com validação explícita',
        'Aplicação de texturas UV por material, amostragem Nearest/Linear',
        'Vista UV com seleção de ilhas + modo dividido 3D/pintura',
        '2D-to-3D Studio (planeado — ainda não implementado)',
      ],
    },
    repo: 'criandojogodenovo-sketch/Pixelone',
    downloadUrl: '',
    status: 'soon',
  },
]
