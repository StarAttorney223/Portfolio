const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#121212",
        surface: {
          DEFAULT: "#242424",
          primary: "#242424",
          secondary: "#303030",
          tertiary: "#252525",
        },
        content: {
          DEFAULT: "#F5F3EE",
          primary: "#F5F3EE",
          muted: "#B8B5AE",
          subtle: "#96928B",
        },
        accent: {
          DEFAULT: "#FF852E",
          primary: "#FF852E",
          bright: "#FFA04D",
          dark: "#D9631C",
          dim: "rgba(255, 133, 46, 0.12)",
        },
        border: {
          DEFAULT: "#484844",
          muted: "#363633",
          bright: "#66665F",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Segoe UI", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "Consolas", "Courier New", "monospace"],
      },
      boxShadow: {
        solid: "0 0 0 1px #484844",
        "solid-orange": "0 0 0 1px #FF852E",
        panel: "0 4px 20px -2px rgba(0, 0, 0, 0.7)",
      },
      letterSpacing: {
        widest: "0.2em",
        tighter: "-0.04em",
      },
    },
  },
  plugins: [],
};

export default config;
