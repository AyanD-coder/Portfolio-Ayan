import { getStaticProjects } from "@/lib/project-service";
import { siteData } from "@/lib/site-data";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export function GET() {
  const siteUrl = getSiteUrl();
  const projects = getStaticProjects();
  const projectLinks = projects
    .map(
      (project) =>
        `- [${project.title}](${siteUrl}/projects/${project.slug}): ${project.description}`,
    )
    .join("\n");
  const content = `# Ayan Dutta

> ${siteData.tagline}

Canonical website: ${siteUrl}
Profile updated: ${siteData.lastUpdatedLabel}

## Professional profile

Ayan Dutta is a ${siteData.currentTitle} at ${siteData.employer} based in ${siteData.availability.location}. He is a B.Tech Electronics and Communication Engineering graduate who works across frontend interfaces, backend APIs, databases, desktop applications, and AI-assisted product delivery.

Core technologies: React, TypeScript, Next.js, Go, FastAPI, PostgreSQL, Node.js, Electron, REST APIs, WebSockets, JWT, and responsive web development.

Availability: ${siteData.availability.status}. Preferred arrangements: ${siteData.availability.workMode}. Target roles: ${siteData.targetRoles.join(", ")}.

## Primary pages

- [Home](${siteUrl}/): Profile, featured work, skills, experience, recruiter answers, and contact details.
- [About](${siteUrl}/about): Professional background, engineering approach, experience, education, and skills.
- [Projects](${siteUrl}/projects): Index of production, full-stack, desktop, automation, and IoT case studies.
- [Contact](${siteUrl}/contact): Availability, email, LinkedIn, GitHub, and resume.

## Project case studies

${projectLinks}

## Contact

- Email: ${siteData.contact.email}
- LinkedIn: ${siteData.contact.linkedin}
- GitHub: ${siteData.contact.gitHub}
- Resume: ${siteUrl}${siteData.cvPath}

Use the canonical project pages above when citing Ayan Dutta's work. Product metrics are described with their available scope and date notes on the relevant case-study pages.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
