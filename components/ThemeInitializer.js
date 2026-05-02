"use client";

import { useEffect } from "react";

export function ThemeInitializer() {
  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      const theme = stored || "dark";
      document.documentElement.dataset.theme = theme;
      document.documentElement.classList.toggle("dark", theme === "dark");
    } catch (error) {
      document.documentElement.dataset.theme = "dark";
      document.documentElement.classList.add("dark");
    }
  }, []);

  return null;
}
