import Link from "next/link";
import { ProjectGrid } from "@/components/ProjectGrid";
import { homepageContent } from "@/lib/homepage-content";

export function ProjectsPreview({ projects }) {
  return (
    <>
      <ProjectGrid projects={projects} />
      <div className="container projects-preview-action">
        <Link href="/projects" className="ghost-button">
          {homepageContent.projects.allProjectsLabel}
        </Link>
      </div>
    </>
  );
}
