/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Paleta "ficha técnica": preto quase puro, degraus de cinzento neutro,
      // branco para texto e UM acento laranja. Sem ciano, sem gradientes.
      colors: {
        canvas: '#0A0A0B', // fundo quase preto
        raised: '#101013', // fundo elevado (hover, painéis)
        surface: '#16161A', // superfície de tabelas
        line: '#1F1F23', // linhas de 1px e bordas
        ink: '#F5F5F7', // texto principal
        mist: '#A8A8B2', // texto secundário
        meta: '#8B8B95', // rótulos mono / metadados
        faint: '#6F6F78', // decorativo (números fantasma, notas)
        accent: '#FF7A18', // o único acento — laranja
      },
      fontFamily: {
        sans: [
          '"Inter Variable"',
          'Inter',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        display: [
          '"Space Grotesk Variable"',
          'Space Grotesk',
          'Inter',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Consolas',
          'monospace',
        ],
      },
    },
  },
  plugins: [],
}
