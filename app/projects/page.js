import { headers } from "next/headers";
import { ProjectGrid } from "@/components/ProjectGrid";
import { getSiteUrl } from "@/lib/site-url";

export const metadata = {
  title: "Projects",
  description:
    "Explore web, Python, and IoT projects by Ayan Dutta – including a full-stack HRMS, FinTech websites, IoT systems, and more.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | Ayan Dutta",
    description:
      "Browse Ayan Dutta's portfolio of projects: full-stack web apps, internship SaaS products, IoT systems, and Python automation tools.",
    url: "/projects",
    images: ["/profile.jpg"],
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
    description:
      "A curated list of software and engineering projects built by Ayan Dutta.",
    url: `${siteUrl}/projects`,
    numberOfItems: payload.projects.length,
    itemListElement: payload.projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        description: project.description,
        url: project.demoUrl || project.repoUrl || `${siteUrl}/projects`,
        ...(project.demoUrl ? { sameAs: project.demoUrl } : {}),
        keywords: project.techStack?.join(", "),
        dateCreated: project.year,
        author: {
          "@type": "Person",
          name: "Ayan Dutta",
          url: siteUrl,
        },
      },
    })),
  };

  return (
    <main className="inner-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <section className="page-hero section">
        <div className="container">
          <p className="eyebrow">Projects</p>
          <h1>Projects that blend software fundamentals with hands-on systems thinking.</h1>
          <p className="section-copy">
            Exploring modern web development through responsive design, clean architecture, and real-world implementation.
          </p>
          <p className="meta-chip">Last server refresh: {payload.generatedAt}</p>
        </div>
      </section>
      <ProjectGrid projects={payload.projects} showAll />
    </main>
  );
}

