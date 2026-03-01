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
        navy: "#1A1A2E",
        "navy-light": "#252547",
        orange: "#FF6B35",
        "orange-hover": "#FF8555",
        gold: "#FFD700",
        aqua: "#00C2CB",
        cream: "#FFF8F0",
        "cream-dark": "#F5EDE3",
      },
      fontFamily: {
        nunito: ["var(--font-nunito)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        lato: ["var(--font-lato)", "sans-serif"],
        bebas: ["var(--font-bebas)", "sans-serif"],
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-medium": "float 6s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "wave": "wave 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "bounce-soft": "bounceSoft 2s ease-in-out infinite",
        "spin-slow": "spin 10s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(5deg)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(255, 107, 53, 0.4)" },
          "50%": { boxShadow: "0 0 25px rgba(255, 107, 53, 0.8)" },
        },
        wave: {
          "0%": { transform: "translateX(0) translateZ(0) scaleY(1)" },
          "50%": { transform: "translateX(-25%) translateZ(0) scaleY(0.55)" },
          "100%": { transform: "translateX(-50%) translateZ(0) scaleY(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
