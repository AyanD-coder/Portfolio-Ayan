"use client";

import { useEffect, useState } from "react";

function applyTheme(theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  document
    .getElementById("theme-color")
    ?.setAttribute("content", theme === "dark" ? "#181315" : "#f8f3ed");
}

export function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const rootTheme = document.documentElement.dataset.theme || "light";
    applyTheme(rootTheme);
    setTheme(rootTheme);

    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (event) => {
      let storedTheme = null;

      try {
        storedTheme = localStorage.getItem("theme");
      } catch (error) {
        storedTheme = null;
      }

      if (storedTheme !== "light" && storedTheme !== "dark") {
        const nextTheme = event.matches ? "dark" : "light";
        applyTheme(nextTheme);
        setTheme(nextTheme);
      }
    };

    systemTheme.addEventListener("change", handleSystemThemeChange);
    return () => systemTheme.removeEventListener("change", handleSystemThemeChange);
  }, []);

  function toggleTheme() {
    const activeTheme = document.documentElement.dataset.theme || theme;
    const nextTheme = activeTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);

    try {
      localStorage.setItem("theme", nextTheme);
    } catch (error) {
      // The theme still applies for this session when storage is unavailable.
    }
  }

  const ariaLabel = theme
    ? `Switch to ${theme === "dark" ? "light" : "dark"} mode`
    : "Toggle theme";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={ariaLabel}
      aria-pressed={theme === "dark"}
      suppressHydrationWarning
    >
      <span className="theme-toggle-track" aria-hidden="true">
        <span className="theme-toggle-icon theme-toggle-icon-sun">
          <svg viewBox="0 0 24 24" role="presentation">
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 1.75v2.5M12 19.75v2.5M1.75 12h2.5M19.75 12h2.5M4.05 4.05l1.77 1.77M18.18 18.18l1.77 1.77M19.95 4.05l-1.77 1.77M5.82 18.18l-1.77 1.77" />
          </svg>
        </span>
        <span className="theme-toggle-icon theme-toggle-icon-moon">
          <svg viewBox="0 0 24 24" role="presentation">
            <path d="M15.2 2.7a8.9 8.9 0 1 0 6.1 15.3 9.4 9.4 0 0 1-2.8.4 9.1 9.1 0 0 1-9.1-9.1 9 9 0 0 1 5.8-8.6Z" />
          </svg>
        </span>
        <span className="theme-toggle-thumb" />
      </span>
    </button>
  );
}
