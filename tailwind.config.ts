import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-terminal)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        mono: ["var(--font-terminal)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        background: {
          950: "#050507",
          900: "#08090c",
          800: "#0d1016",
        },
        surface: {
          900: "#10141c",
          800: "#151a25",
          700: "#1b2130",
        },
        primary: {
          50: "#f6ffe7",
          100: "#e4ffc2",
          200: "#d1ff9c",
          300: "#b9ff66",
          400: "#a5ff3b",
          500: "#8bff1f",
          600: "#6ed11a",
          700: "#4d9e12",
          800: "#326b0d",
          900: "#1d3c08",
        },
        accent: {
          400: "#8d73ff",
          500: "#7042ff",
          600: "#5a32d8",
        },
        status: {
          shipped: "#9eff3f",
          beta: "#ffe066",
          exploration: "#ff8bff",
        },
      },
      boxShadow: {
        glow: "0 0 30px rgba(165, 255, 59, 0.28)",
        "glow-soft": "0 25px 70px -35px rgba(112, 66, 255, 0.35)",
        panel: "0 35px 80px -45px rgba(0, 0, 0, 0.85)",
      },
      backgroundImage: {
        "terminal-grid": "linear-gradient(rgba(159, 255, 63, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(159, 255, 63, 0.04) 1px, transparent 1px)",
        "terminal-scan": "radial-gradient(circle at 15% 20%, rgba(112, 66, 255, 0.18), transparent 55%), radial-gradient(circle at 80% 15%, rgba(159, 255, 63, 0.1), transparent 60%)",
      },
      backgroundSize: {
        grid: "36px 36px",
      },
      transitionTimingFunction: {
        terminal: "cubic-bezier(0.19, 1, 0.22, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
