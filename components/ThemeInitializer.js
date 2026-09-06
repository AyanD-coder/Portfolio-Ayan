const themeScript = `
  (function () {
    try {
      var storedTheme = window.localStorage.getItem("theme");
      var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      var theme = storedTheme === "light" || storedTheme === "dark"
        ? storedTheme
        : prefersDark
          ? "dark"
          : "light";
      var root = document.documentElement;
      root.dataset.theme = theme;
      root.classList.toggle("dark", theme === "dark");
      root.style.colorScheme = theme;
    } catch (error) {
      document.documentElement.dataset.theme = "dark";
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    }
  })();
`;

export function ThemeInitializer() {
  return (
    <script
      id="theme-initializer"
      dangerouslySetInnerHTML={{ __html: themeScript }}
    />
  );
}
