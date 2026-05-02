# Ayan Dutta Portfolio

Next.js portfolio website with:

- Static generation for `/`, `/about`, and `/contact`
- Server-side rendering for `/projects`
- Local mock API at `/api/projects`
- Dark/light theme toggle
- SEO metadata and JSON-LD

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build for production

```bash
npm run build
npm run start
```

## Folder structure

```text
app/
  about/page.js
  api/projects/route.js
  contact/page.js
  projects/page.js
  globals.css
  layout.js
  page.js
components/
  AboutPreview.js
  AchievementsSection.js
  ContactSection.js
  Footer.js
  Hero.js
  Navbar.js
  ProjectGrid.js
  ProjectsPreview.js
  SectionHeading.js
  SkillsSection.js
  ThemeToggle.js
  TimelineSection.js
lib/
  project-service.js
  site-data.js
public/
  ayan-dutta-cv-2026.pdf
```
