"use client";

import * as React from "react";
import { MotionConfig } from "framer-motion";
import { useStore } from "@/lib/store";

// Applies the user's theme + a11y prefs to <html>, and provides a Framer Motion
// MotionConfig so motion can be globally reduced. Renders children unmodified.
export function ThemeBootstrap({ children }: { children?: React.ReactNode }) {
  const theme = useStore((s) => s.theme);
  const largeText = useStore((s) => s.largeText);
  const highContrast = useStore((s) => s.highContrast);
  const reducedMotion = useStore((s) => s.reducedMotion);

  React.useEffect(() => {
    const root = document.documentElement;
    const apply = () => {
      const sys = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const dark = theme === "dark" || (theme === "system" && sys);
      root.classList.toggle("dark", dark);
    };
    apply();
    if (theme === "system") {
      const m = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => apply();
      m.addEventListener("change", handler);
      return () => m.removeEventListener("change", handler);
    }
  }, [theme]);

  React.useEffect(() => {
    document.documentElement.classList.toggle("a11y-large", largeText);
  }, [largeText]);

  React.useEffect(() => {
    document.documentElement.classList.toggle("contrast-more", highContrast);
  }, [highContrast]);

  return (
    <MotionConfig reducedMotion={reducedMotion ? "always" : "user"}>
      {children}
    </MotionConfig>
  );
}
