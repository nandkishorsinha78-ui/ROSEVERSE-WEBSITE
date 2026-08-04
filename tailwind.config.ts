import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        obsidian: "#030305",
        surface: "#08070c",
        gold: {
          accent: "#f4d38c",
          glow: "rgba(244, 211, 140, 0.35)",
        },
        crimson: {
          rose: "#ff1a40",
          glow: "rgba(255, 26, 64, 0.45)",
          dark: "#aa0022",
        },
        emerald: {
          accent: "#00e5a3",
        },
      },
      fontFamily: {
        heading: ["Cinzel Decorative", "Cinzel", "serif"],
        display: ["Outfit", "sans-serif"],
        body: ["Plus Jakarta Sans", "sans-serif"],
      },
      borderRadius: {
        sm: "8px",
        md: "16px",
        lg: "28px",
        pill: "999px",
      },
    },
  },
  plugins: [],
};

export default config;
