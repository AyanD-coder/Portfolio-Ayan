import { getSiteUrl } from "@/lib/site-url";
import { siteData } from "@/lib/site-data";
import { getStaticProjects } from "@/lib/project-service";

export default async function sitemap() {
  const baseUrl = getSiteUrl();
  const lastModified = new Date(siteData.lastUpdated);
  const corePages = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  const projectPages = getStaticProjects().map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: project.spotlight ? 0.8 : 0.7,
    images: project.image?.src
      ? [new URL(project.image.src, `${baseUrl}/`).toString()]
      : undefined,
  }));

  return [...corePages, ...projectPages];
}
