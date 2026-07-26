import Link from "next/link";
import { ProjectGrid } from "@/components/ProjectGrid";

export function ProjectsPreview({ projects }) {
  return (
    <>
      <ProjectGrid projects={projects} />
      <div className="container projects-preview-action">
        <Link href="/projects" className="ghost-button">
          View all projects
        </Link>
      </div>
    </>
  );
}
