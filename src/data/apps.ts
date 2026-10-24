/**
 * ============================================================================
 *  CATÁLOGO DE APLICATIVOS — ONE G STUDIO
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
 *  - O botão de download SÓ é habilitado quando status === 'available' E a
 *    downloadUrl é um link HTTPS válido no padrão acima (GitHub Releases do
 *    próprio estúdio). Qualquer outro destino é bloqueado.
 *  - Enquanto status for 'soon', o site mostra o botão desativado
 *    "Coming soon" e o selo "In development".
 *  - NUNCA faça commit de ficheiros .apk/.aab neste repositório do site —
 *    os binários vivem apenas nos GitHub Releases dos apps.
 *
 *  DADOS VERIFICADOS: cada facto abaixo foi conferido no repositório do app
 *  (build.gradle/README) em out/2026. Não descreva funcionalidades planeadas
 *  como implementadas.
 * ============================================================================
 */
import type { AppCategory, AppInfo } from '../types'

/** Rótulos exibidos no site (inglês) por categoria interna. */
export const categoryLabels: Record<AppCategory, string> = {
  Jogos: 'Games',
  Ferramentas: 'Tools',
  Vídeo: 'Video',
}

/** Ordem dos filtros de categoria exibidos no catálogo. */
export const categoryOrder: AppCategory[] = ['Jogos', 'Ferramentas', 'Vídeo']

export const apps: AppInfo[] = [
  {
    id: 'blone',
    nome: 'Blone',
    descricaoCurta:
      'Free, offline 3D modeling for Android — real OpenGL ES 3.0 viewport and touch-first editing for low-resource phones.',
    descricaoLonga:
      "Blone is a free, offline, native Android application for 3D modeling, designed for touchscreens and phones with limited resources. Its viewport is a real-time OpenGL ES 3.0 renderer with grid, colored axes, flat shading and wireframe, and the interface is organized into four zones that keep the model visible and touchable in both orientations.\n\nThe editable core is a half-edge mesh engine: cube, sphere, cylinder and plane primitives work in Object mode — whole-object gizmo for moving, rotating and scaling, plus duplicate and delete — or in Edit mode with vertex, edge and face selection, extrusion, subdivision, loop cut and topologically validated deletion. Fase 3 adds sculpt and paint brushes directly on the mesh, where one gesture equals one undo step. Projects are saved and opened through the Android file picker (SAF) in the app's own BLONEPRJ format, with no storage permissions.",
    categoria: 'Ferramentas',
    icone: '/icons/blone.png',
    screenshots: [],
    versao: 'Fase 3',
    requisitos: 'Android 8.0 (API 26) or later',
    funcionalidades: [
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
    repo: 'criandojogodenovo-sketch/Blone',
    downloadUrl: '',
    status: 'soon',
  },
  {
    id: 'g-one-vv',
    nome: 'G.One VV',
    descricaoCurta:
      'Native mobile game engine and editor — build, play and export 3D scenes entirely on your phone.',
    descricaoLonga:
      'G.One VV is a native Android game engine and editor written in C++/Java on top of an OpenGL ES 3 renderer — a project built to be edited on a phone: its code is written and reviewed on a 6.5-inch screen, with continuous integration as the only compiler and an entry-level real device (Realme C33) as the measuring stick.\n\nScenes live in the engine\'s own .goni project format and are edited through a hierarchy panel and an inspector. Models import as OBJ, glTF and GLB; PNG textures generate mipmaps and are cached as ETC2/ASTC compressed textures for low-end GPUs. Physics supports sphere, box and capsule bodies with continuous collision, touch controls provide a virtual joystick and jump button, Play mode snapshots and restores the scene, scenes can be exported as OBJ, and an in-app console records the engine\'s activity.',
    categoria: 'Jogos',
    icone: '/icons/gone-vv.png',
    screenshots: [],
    versao: '0.9.6',
    requisitos: 'Android 7.0 (API 24) or later · arm64-v8a · landscape',
    funcionalidades: [
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
    repo: 'criandojogodenovo-sketch/g.oni.vv',
    downloadUrl: '',
    status: 'soon',
  },
  {
    id: 'one-video-g',
    nome: 'One Video G',
    descricaoCurta:
      'Free, offline Android video editor with real MP4 export and no watermark — layers, keyframes and animated text.',
    descricaoLonga:
      'One Video G is a mobile-first, offline-first Android video editor built with Kotlin, Jetpack Compose and Media3 — exporting real MP4 (H.264/AAC) with no watermark, no account, no network access and no telemetry.\n\nProjects support video, image, text and audio layers over a timeline with trim, split, reorder, zoom and 40 levels of undo/redo. Keyframes animate position, scale, rotation and opacity with linear or smooth interpolation, and animated text is previewed with the exact same math used by the exporter. A diagnostics system categorizes and logs errors during long exports, and the whole interface runs in Portuguese and English.',
    categoria: 'Vídeo',
    icone: '/icons/one-video-g.png',
    screenshots: [],
    versao: 'Beta',
    requisitos: 'Android 7.0 (API 24) or later',
    funcionalidades: [
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
    repo: 'criandojogodenovo-sketch/One-video-G-',
    downloadUrl: '',
    status: 'soon',
  },
  {
    id: 'pixel-one',
    nome: 'Pixel One',
    descricaoCurta:
      'Pixel art and 2D/3D texture studio for Android — paint textures and apply them to 3D models.',
    descricaoLonga:
      "Pixel One is a native Android studio for creating pixel art and 2D textures and applying them to 3D models — with a documented plan for assisted 2D-to-3D geometric construction that is not yet implemented. It is offline at its core: no backend, no accounts, no ads and no payments, carrying the app's own black, gray and orange identity.\n\nThe Texture Studio is a real pixel editor driven by a C++/JNI engine: pencil, eraser, tolerance fill, eyedropper, brushes, color palettes and a sparse undo history where one stroke is one entry, under a 32 MB budget. The 3D Texture Studio (Fase 3) adds an OpenGL ES viewer with orbit camera, glTF 2.0/GLB import with explicit validation, per-material UV texture application, a UV view with island selection and a split 3D/paint mode with partial GPU updates.",
    categoria: 'Ferramentas',
    icone: '/icons/pixel-one.svg',
    screenshots: [],
    versao: 'Fase 3',
    requisitos: 'Android 8.0 (API 26) or later',
    funcionalidades: [
      'Texture Studio: real pixel editor with C++/JNI engine',
      'Tools: pencil, eraser, tolerance fill, eyedropper, brushes, palettes',
      'Sparse undo history — one stroke = one entry (32 MB budget)',
      '3D Texture Studio: OpenGL ES viewer with orbit camera',
      'glTF 2.0/GLB import with explicit validation',
      'UV texture application per material, Nearest/Linear sampling',
      'UV view with island selection + split 3D/paint mode',
      '2D-to-3D Studio (planned — not yet implemented)',
    ],
    repo: 'criandojogodenovo-sketch/Pixelone',
    downloadUrl: '',
    status: 'soon',
  },
]
