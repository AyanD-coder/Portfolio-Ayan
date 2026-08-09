import { ProjectGrid } from "@/components/ProjectGrid";
import { getStaticProjects } from "@/lib/project-service";
import { getSiteUrl } from "@/lib/site-url";

export const metadata = {
  title: "Projects",
  description: "Explore production, full-stack, AI content operations, desktop, automation, and IoT projects by Ayan Dutta.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | Ayan Dutta",
    description: "Explore production products, full-stack AI platforms, desktop tooling, automation, and IoT projects by Ayan Dutta.",
    url: "/projects",
  },
};

export default function ProjectsPage() {
  const projects = getStaticProjects();
  const siteUrl = getSiteUrl();
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Projects by Ayan Dutta",
    description: "Production, full-stack, desktop, automation, and IoT projects built or contributed to by Ayan Dutta.",
    url: `${siteUrl}/projects`,
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => {
      const projectUrl =
        project.links?.[0]?.url ||
        project.demoUrl ||
        project.repoUrl ||
        `${siteUrl}/projects`;

      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          url: projectUrl,
          keywords: project.techStack?.join(", "),
          dateCreated: project.year,
          author: {
            "@type": "Person",
            name: "Ayan Dutta",
            url: siteUrl,
          },
        },
      };
    }),
  };

  return (
    <main className="inner-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <section className="page-hero section page-hero-artwork page-hero-artwork-projects">
        <div className="container">
          <p className="eyebrow">Projects</p>
          <h1>Selected work built around real users and technical constraints.</h1>
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
    </main>
  );
}
