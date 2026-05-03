import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        // semantic tokens — defined in globals.css
        paper: "rgb(var(--paper) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-2": "rgb(var(--surface-2) / <alpha-value>)",
        hairline: "rgb(var(--hairline) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        "muted-fg": "rgb(var(--muted-fg) / <alpha-value>)",
        ember: "rgb(var(--ember) / <alpha-value>)",
        "ember-soft": "rgb(var(--ember-soft) / <alpha-value>)",
        sage: "rgb(var(--sage) / <alpha-value>)",
        "sage-soft": "rgb(var(--sage-soft) / <alpha-value>)",
        ok: "rgb(var(--ok) / <alpha-value>)",
        warn: "rgb(var(--warn) / <alpha-value>)",
        danger: "rgb(var(--danger) / <alpha-value>)",
      },
      letterSpacing: {
        tightish: "-0.012em",
        tighter2: "-0.022em",
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem" }],
      },
      boxShadow: {
        "soft": "0 1px 0 rgb(0 0 0 / 0.02), 0 1px 3px rgb(0 0 0 / 0.04)",
        "lift": "0 1px 0 rgb(0 0 0 / 0.03), 0 8px 24px -8px rgb(0 0 0 / 0.10)",
        "press": "inset 0 1px 0 rgb(255 255 255 / 0.06), 0 1px 0 rgb(0 0 0 / 0.04)",
        "ring-ember": "0 0 0 4px rgb(var(--ember) / 0.18)",
      },
      transitionTimingFunction: {
        "out-back": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "spring": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "ink-pulse": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s cubic-bezier(0.22, 1, 0.36, 1) both",
        "shimmer": "shimmer 1.6s ease-in-out infinite",
        "ink-pulse": "ink-pulse 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
