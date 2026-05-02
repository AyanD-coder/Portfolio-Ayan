import Link from "next/link";
import { ProjectGrid } from "@/components/ProjectGrid";

export function ProjectsPreview({ projects }) {
  return (
    <>
      <ProjectGrid projects={projects} />
      <div className="container" style={{ paddingBottom: "4.5rem", marginTop: "-2.5rem", position: "relative", zIndex: 10 }}>
        <Link href="/projects" className="ghost-button">
          View all projects
        </Link>
      </div>
    </>
  );
}
