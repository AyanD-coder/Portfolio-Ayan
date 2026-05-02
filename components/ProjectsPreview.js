import Link from "next/link";
import { ProjectGrid } from "@/components/ProjectGrid";

export function ProjectsPreview({ projects }) {
  return (
    <ProjectGrid projects={projects}>
      <div style={{ marginTop: "3.5rem", display: "flex", justifyContent: "center" }}>
        <Link href="/projects" className="ghost-button">
          View all projects
        </Link>
      </div>
    </ProjectGrid>
  );
}
