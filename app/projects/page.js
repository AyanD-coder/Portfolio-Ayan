import { headers } from "next/headers";
import { ProjectGrid } from "@/components/ProjectGrid";
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

export const dynamic = "force-dynamic";

async function getProjects() {
  const headerStore = await headers();
  const forwardedProto = headerStore.get("x-forwarded-proto");
  const host = headerStore.get("host");
  const baseUrl = host
    ? `${forwardedProto || "http"}://${host}`
    : getSiteUrl();
  const response = await fetch(`${baseUrl}/api/projects`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to load project data.");
  }

  return response.json();
}

export default async function ProjectsPage() {
  const payload = await getProjects();
  const siteUrl = getSiteUrl();
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Projects by Ayan Dutta",
    description: "Production, full-stack, desktop, automation, and IoT projects built or contributed to by Ayan Dutta.",
    url: `${siteUrl}/projects`,
    numberOfItems: payload.projects.length,
    itemListElement: payload.projects.map((project, index) => {
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
            <span className="meta-chip">{payload.projects.length} projects</span>
            <span className="meta-chip">Web · APIs · AI · Desktop · IoT</span>
          </div>
        </div>
      </section>
      <ProjectGrid projects={payload.projects} showAll />
    </main>
  );
}
