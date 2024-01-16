module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "terminalbg": "#1e1e1e",
        "primary": "#519975",
        "secondary": "#B89076",
        "tooltip": "#73ABAD",
      },
      keyframes: {
        "terminal-blink-dim": {
          "0%": {
            opacity: 0.2,
          },
          "50%": {
            opacity: 0,
          },
          "100%": {
            opacity: 0.2,
          }
        },
        "terminal-blink": {
          "0%": {
            opacity: 1,
          },
          "50%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          }
        }
      },
      animation: {
        "terminal-blink-dim": "terminal-blink-dim 1s infinite",
        "terminal-blink": "terminal-blink 1s infinite",
      }
    },
  },
  plugins: [],
}