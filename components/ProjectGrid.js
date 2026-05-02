import { SectionHeading } from "@/components/SectionHeading";

function ProjectCard({ project, index }) {
  return (
    <article className={`project-card fade-up${project.featured ? " featured" : ""}`} style={{ animationDelay: `${index * 0.08}s` }}>
      <div className="project-top">
        <div>
          <div className="project-top-row">
            <p className="eyebrow">{project.category}</p>
            {project.featured ? <span className="featured-pill">Featured internship</span> : null}
          </div>
          <h3>{project.title}</h3>
        </div>
        <span className="meta-chip">{project.year}</span>
      </div>
      <p>{project.description}</p>
      <p className="project-stack">{project.techStack.join(" | ")}</p>
      <div className="tag-list">
        {project.highlights.map((highlight) => (
          <span className="tag" key={highlight}>
            {highlight}
          </span>
        ))}
      </div>
      <div className="project-links">
        {project.demoUrl ? (
          <a className="chip-link" href={project.demoUrl} target="_blank" rel="noreferrer">
            Live / Demo
          </a>
        ) : null}
        {project.repoUrl ? (
          <a className="chip-link" href={project.repoUrl} target="_blank" rel="noreferrer">
            GitHub Repo
          </a>
        ) : null}
        {!project.demoUrl && !project.repoUrl ? (
          <span className="chip-link" aria-disabled="true">
            Demo link available on request
          </span>
        ) : null}
      </div>
    </article>
  );
}

export function ProjectGrid({ projects, showAll = false }) {
  return (
    <section className="section alt" id="projects">
      <div className="container">
        <SectionHeading
          eyebrow="Projects"
          title={showAll ? "A broader look at recent work." : "Selected work with measurable technical scope."}
          description="Each project emphasizes implementation details, not just visuals."
        />
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard project={project} index={index} key={project.slug} />
          ))}
        </div>
      </div>
    </section>
  );
}
