/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque Variable"', 'system-ui', '-apple-system', 'sans-serif'],
        sans: ['"Geist Variable"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      colors: {
        canvas: '#0b0c0e',
        surface: '#121418',
        raised: '#1a1d23',
        subtle: '#232730',
        chalk: '#f2f0eb',
        stone: '#a7aab2',
        muted: '#858a96',
        amber: {
          signal: '#e8a444'
        },
        ok: '#4cc38a',
        err: '#f06469'
      }
    }
  },
  plugins: []
};
