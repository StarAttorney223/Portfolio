import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080808",
        surface: {
          DEFAULT: "#151515",
          primary: "#151515",
          secondary: "#1D1D1D",
          tertiary: "#252525",
        },
        content: {
          DEFAULT: "#E5E2DA",
          primary: "#E5E2DA",
          muted: "#89857D",
          subtle: "#504E4A",
        },
        accent: {
          DEFAULT: "#F26A21",
          primary: "#F26A21",
          bright: "#FF7A2F",
          dark: "#B94712",
          dim: "rgba(242, 106, 33, 0.12)",
        },
        border: {
          DEFAULT: "#30302D",
          muted: "#242422",
          bright: "#484844",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Segoe UI", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "Consolas", "Courier New", "monospace"],
      },
      boxShadow: {
        solid: "0 0 0 1px #30302D",
        "solid-orange": "0 0 0 1px #F26A21",
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
