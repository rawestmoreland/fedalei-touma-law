// See https://tailwindcss.com/docs/configuration for details
module.exports = {
  purge: ["./src/**/*.js"],
  variants: {
    margin: ["responsive", "first"],
  },
  // https://github.com/tailwindlabs/tailwindcss-forms
  plugins: [require("@tailwindcss/forms")],
  theme: {
    extend: {
      colors: {
        "mine-shaft": "#272727",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui"],
        serif: ["ui-serif", "Georgia"],
        mono: ["ui-monospace", "SFMono-Regular"],
        display: ["Oswald"],
        body: ["Open Sans"],
        cinzel: ["Cinzel", "ui-serif", "Georgia"],
        roboto: ["Roboto", "ui-sans-serif"],
        poppins: ["Poppins", "open-sans"],
      },
      backgroundImage: theme => ({
        "main-hero": "url('/img/hero-pattern.svg')",
        "footer-texture": "url('/img/footer-texture.png')",
      }),
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "900px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      "lg60": "1060px",

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
}
