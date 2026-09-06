export default function manifest() {
  return {
    name: "Ayan Dutta | Full-Stack Software Engineer",
    short_name: "Ayan Dutta",
    description:
      "Portfolio of Ayan Dutta, a Kolkata-based full-stack Software Engineer building web, API, desktop, and AI content products.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f8f3ed",
    theme_color: "#a34232",
    lang: "en-IN",
    categories: ["portfolio", "technology", "software development"],
    icons: [
      {
        src: "/icon.png",
        sizes: "600x600",
        type: "image/png",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
