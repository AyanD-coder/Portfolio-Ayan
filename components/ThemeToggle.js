"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const rootTheme = document.documentElement.dataset.theme || "light";
    setTheme(rootTheme);
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    localStorage.setItem("theme", nextTheme);
  }

  const ariaLabel = theme
    ? `Switch to ${theme === "dark" ? "light" : "dark"} mode`
    : "Toggle theme";

  return (
    <button
      type="button"
      suppressHydrationWarning
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={ariaLabel}
      aria-pressed={theme === "dark" || false}
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
