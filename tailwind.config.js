/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta oficial do ONE G STUDIO (ver README → Design system)
        canvas: '#0B0D10', // fundo principal
        panel: '#10141A', // fundo secundário / seções alternadas
        surface: '#141820', // superfícies (cards)
        primary: '#FF7A18', // laranja — cor primária
        secondary: '#00D9FF', // ciano — cor secundária
        ink: '#E8EDF4', // texto principal
        mist: '#9AA6B5', // texto secundário
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
      },
      boxShadow: {
        card:
          'inset 0 1px 0 0 rgba(232, 237, 244, 0.04), 0 16px 40px -24px rgba(0, 0, 0, 0.7)',
        'card-hover':
          'inset 0 1px 0 0 rgba(232, 237, 244, 0.06), 0 28px 60px -24px rgba(0, 0, 0, 0.8)',
        'glow-primary':
          '0 0 0 1px rgba(255, 122, 24, 0.25), 0 8px 32px -8px rgba(255, 122, 24, 0.45)',
        'glow-secondary':
          '0 0 0 1px rgba(0, 217, 255, 0.22), 0 8px 32px -8px rgba(0, 217, 255, 0.35)',
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(rgba(232, 237, 244, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(232, 237, 244, 0.05) 1px, transparent 1px)',
        'brand-gradient': 'linear-gradient(120deg, #FF7A18 0%, #FF9A3D 45%, #00D9FF 100%)',
      },
      backgroundSize: {
        grid: '56px 56px',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(4%, -3%, 0) scale(1.08)' },
        },
        'drift-alt': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1.05)' },
          '50%': { transform: 'translate3d(-4%, 3%, 0) scale(1)' },
        },
        'spin-slower': {
          to: { transform: 'rotate(360deg)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
      },
      animation: {
        drift: 'drift 22s ease-in-out infinite',
        'drift-alt': 'drift-alt 26s ease-in-out infinite',
        'spin-slower': 'spin-slower 90s linear infinite',
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite',
      },
      transitionTimingFunction: {
        sharp: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
