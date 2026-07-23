import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#0D0D0D",
          secondary: "#1A1A1A",
          tertiary: "#1E1E1E",
        },
        surface: {
          DEFAULT: "#252525",
          hover: "#2D2D2D",
        },
        border: {
          DEFAULT: "#2A2A2A",
          light: "#3A3A3A",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#A0A0A0",
          muted: "#6B6B6B",
        },
        accent: {
          DEFAULT: "#9B59B6",
          hover: "#8E44AD",
          light: "#BB8FCE",
        },
        status: {
          new: "#00E676",
          hot: "#FF5252",
          updated: "#448AFF",
        },
        rating: "#FFD700",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Montserrat", "Inter", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(155, 89, 182, 0.3)" },
          "50%": { boxShadow: "0 0 20px rgba(155, 89, 182, 0.6)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
