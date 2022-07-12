/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{svelte,ts,js}"],
  theme: {
    fontFamily: {
      sans: ["Kumbh Sans", "sans-serif"],
      mono: ["Space Mono", "monospace"],
      serif: ["Roboto Slab", "serif"],
    },
    colors: {
      transparent: "transparent",
      white: "hsl(0, 0%, 100%)",
      prose: "hsl(227, 100%, 92%)",
      background: "hsl(235, 35%, 18%)",
      ui: {
        dark: "hsl(234, 39%, 14%)",
        light: "hsl(229, 52%, 96%)",
        red: "hsl(0, 91%, 71%)",
        "dull-red": "hsl(0, 5%, 89%)",
        blue: "hsl(182, 91%, 71%)",
        magenta: "hsl(284, 89%, 74%)",
      },
    },
    borderRadius: {
      sm: "0.625rem",
      md: "0.9375rem",
      lg: "1.5625rem",
      pill: "100vw",
      full: "50%",
    },
    extend: {
      fontSize: {
        "11p": "0.6875rem",
        "12p": "0.75rem",
        "13p": "0.75rem",
        "14p": "0.875rem",
        "15p": "0.9375rem",
        4: "1rem", // 16px
        5: "1.25rem", // 20px
        6: "1.5rem", // 24px
        7: "1.75rem", // 28px
        8: "2rem", // 32px
      },
      letterSpacing: {
        15: "0.9375em",
        10: "0.625em",
        5: "0.3125em",
        4: "0.25em",
      },
    },
  },
  plugins: [],
};
