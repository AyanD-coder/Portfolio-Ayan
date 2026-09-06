# Ayan Dutta — Full-Stack Software Engineer Portfolio

Portfolio of Ayan Dutta, a Kolkata-based Software Engineer at YoForex working across React, TypeScript, Next.js, Go, FastAPI, PostgreSQL, and Electron.

**Live site:** [portfolio-ayan-five.vercel.app](https://portfolio-ayan-five.vercel.app/)

Next.js portfolio website with:

- Static generation for the main pages and eight project case studies
- Local mock API at `/api/projects`
- Dark/light theme toggle
- Canonical metadata, social previews, sitemap, robots rules, and JSON-LD
- Recruiter FAQ and AI-readable `/llms.txt`

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

Set the canonical production origin when deploying:

```bash
NEXT_PUBLIC_SITE_URL=https://portfolio-ayan-five.vercel.app
```

The code also uses Vercel's production URL automatically and falls back to the live portfolio URL, preventing production canonicals from pointing to localhost.

## Discoverability routes

- `/sitemap.xml` — canonical page and project URLs
- `/robots.txt` — search and answer-engine crawler access
- `/llms.txt` — concise, factual profile and project index for compatible tools; supplemental, not a Google ranking signal
- `/manifest.webmanifest` — site identity and application metadata

After deployment, submit `/sitemap.xml` in Google Search Console and Bing Webmaster Tools, then request indexing for the homepage, About page, Projects page, and strongest case studies.

## Contact

- Email: [ad.ayandutta@gmail.com](mailto:ad.ayandutta@gmail.com)
- LinkedIn: [linkedin.com/in/ayand-coder](https://www.linkedin.com/in/ayand-coder/)
- GitHub: [github.com/AyanD-coder](https://github.com/AyanD-coder)

## Folder structure

```text
app/
  about/page.js
  api/projects/route.js
  contact/page.js
  projects/page.js
  projects/[slug]/page.js
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
