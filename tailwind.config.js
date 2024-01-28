/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/views/*", "public/scripts/**/*", "public/styles/**/*"],
  theme: {
    extend: {
      keyframes: {
        menu_mobile: {
          "0%": {
            transform: "translateX(-100%)"
          },
          "100%": {
            transform: "translateX(0%)"
        },
        },
      },
      animation: {
        menu_mobile: "menu_mobile 0.5s ease-in-out forwards"
      }
    },
    screens : {
      "tablet": "768px",
      "portatil": "1024px",
    },
    plugins: [],
  }
}

