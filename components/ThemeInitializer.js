"use client";

import { useEffect } from "react";

export function ThemeInitializer() {
  useEffect(() => {
    try {
      localStorage.setItem("theme", "dark");
      document.documentElement.dataset.theme = "dark";
      document.documentElement.classList.add("dark");
    } catch (error) {
      document.documentElement.dataset.theme = "dark";
      document.documentElement.classList.add("dark");
    }
  }, []);

  return null;
}
