import { ProjectGrid } from "@/components/ProjectGrid";
import { ContactSection } from "@/components/ContactSection";
import { JsonLd } from "@/components/JsonLd";
import { getStaticProjects } from "@/lib/project-service";
import { getSiteUrl } from "@/lib/site-url";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Projects",
  description: "Explore full-stack software engineering projects and case studies by Ayan Dutta across React, Go, FastAPI, Electron, AI content platforms, and IoT.",
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getStaticProjects();
  const siteUrl = getSiteUrl();
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteUrl}/projects#project-list`,
    name: "Projects by Ayan Dutta",
    description: "Production, full-stack, desktop, automation, and IoT projects built or contributed to by Ayan Dutta.",
    url: `${siteUrl}/projects`,
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => {
      const projectUrl = `${siteUrl}/projects/${project.slug}`;
      const externalUrls = [
        ...(project.links?.map((link) => link.url) || []),
        project.demoUrl,
        project.repoUrl,
      ].filter(Boolean);

      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          "@id": `${projectUrl}#project`,
          name: project.title,
          description: project.description,
          url: projectUrl,
          image: project.image?.src
            ? new URL(project.image.src, `${siteUrl}/`).toString()
            : undefined,
          keywords: project.techStack?.join(", "),
          sameAs: externalUrls.length ? externalUrls : undefined,
          ...(project.role
            ? { contributor: { "@id": `${siteUrl}/#person` } }
            : { creator: { "@id": `${siteUrl}/#person` } }),
        },
      };
    }),
  };

  return (
    <main className="inner-page" id="main-content">
      <JsonLd data={itemListJsonLd} />
      <section className="page-hero section page-hero-artwork page-hero-artwork-projects">
        <div className="container">
          <p className="eyebrow">Projects</p>
          <h1>Full-stack software engineering projects and case studies.</h1>
          <p className="section-copy">
            Production product contributions, full-stack AI platforms, desktop tooling, automation, and IoT systems—each presented with the implementation details that matter.
          </p>
          <div className="page-hero-meta">
            <span className="meta-chip">{projects.length} projects</span>
            <span className="meta-chip">Web · APIs · AI · Desktop · IoT</span>
          </div>
        </div>
      </section>
      <ProjectGrid projects={projects} showAll />
      <ContactSection />
    </main>
  );
}
