import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
      },
      boxShadow: {
        glow: "0 24px 80px rgba(68, 111, 255, 0.22)",
        "card-light": "0 18px 60px rgba(24, 36, 66, 0.10)",
        "card-dark": "0 18px 70px rgba(0, 0, 0, 0.35)",
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(to right, rgba(120,120,120,.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(120,120,120,.12) 1px, transparent 1px)",
      },
    },
  },
  plugins: [animate],
};

export default config;
