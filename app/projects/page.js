import { headers } from "next/headers";
import { ProjectGrid } from "@/components/ProjectGrid";
import { getSiteUrl } from "@/lib/site-url";

export const metadata = {
  title: "Projects",
  description: "Explore web, Python, and IoT projects by Ayan Dutta.",
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

  return (
    <main className="inner-page">
      <section className="page-hero section">
        <div className="container">
          <p className="eyebrow">Projects</p>
          <h1>Projects that blend software fundamentals with hands-on systems thinking.</h1>
          <p className="section-copy">
            This page is server-rendered on each request and pulls its content from a local mock API to match the requested SSR setup.
          </p>
          <p className="meta-chip">Last server refresh: {payload.generatedAt}</p>
        </div>
      </section>
      <ProjectGrid projects={payload.projects} showAll />
    </main>
  );
}
