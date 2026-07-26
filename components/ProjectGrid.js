import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";

function getProjectLinks(project) {
  if (project.links?.length) {
    return project.links;
  }

  const links = [];

  if (project.demoUrl) {
    links.push({ label: "Live / Demo", url: project.demoUrl, kind: "secondary" });
  }

  if (project.repoUrl) {
    links.push({ label: "GitHub Repo", url: project.repoUrl, kind: "secondary" });
  }

  return links;
}

function ProjectLinks({ project }) {
  const links = getProjectLinks(project);

  if (!links.length) {
    return (
      <div className="project-links">
        <span className="chip-link" aria-disabled="true">
          Demo link available on request
        </span>
      </div>
    );
  }

  return (
    <div className="project-links">
      {links.map((link) => (
        <a
          className={link.kind === "primary" ? "primary-button" : "chip-link"}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          key={`${link.label}-${link.url}`}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

function SpotlightProjectCard({ project, index }) {
  const badge = project.badge || (project.featured ? "Featured project" : null);

  return (
    <article
      className={`project-card project-card-spotlight featured fade-up${project.highlighted ? " project-card-highlighted" : ""}`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="project-spotlight-media">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={1600}
          height={1000}
          sizes="(min-width: 1024px) 52vw, 100vw"
          priority={index === 0}
          className="project-spotlight-image"
        />
      </div>
      <div className="project-spotlight-content">
        <div className="project-top">
          <div>
            <div className="project-top-row">
              <p className="eyebrow">{project.category}</p>
              {badge ? <span className="featured-pill">{badge}</span> : null}
            </div>
            <h3>{project.title}</h3>
          </div>
          <span className="meta-chip">{project.year}</span>
        </div>
        <p className="project-role">{project.role}</p>
        <p>{project.description}</p>
        {project.impact?.length ? (
          <div className="project-impact" aria-label={`${project.title} project impact`}>
            {project.impact.map((item) => (
              <div className="project-impact-item" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        ) : null}
        {project.capabilities?.length ? (
          <div className="project-capabilities" aria-label={`${project.title} platform capabilities`}>
            {project.capabilities.map((capability) => (
              <div className="project-capability" key={capability.title}>
                <strong>{capability.title}</strong>
                <p>{capability.summary}</p>
              </div>
            ))}
          </div>
        ) : null}
        <p className="project-stack">{project.techStack.join(" | ")}</p>
        <div className="tag-list">
          {project.highlights.map((highlight) => (
            <span className="tag" key={highlight}>
              {highlight}
            </span>
          ))}
        </div>
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}

function StandardProjectCard({ project, index }) {
  const badge = project.badge || (project.featured ? "Featured internship" : null);

  return (
    <article className={`project-card fade-up${project.featured ? " featured" : ""}`} style={{ animationDelay: `${index * 0.08}s` }}>
      <div className="project-top">
        <div>
            <div className="project-top-row">
              <p className="eyebrow">{project.category}</p>
              {badge ? <span className="featured-pill">{badge}</span> : null}
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
      <ProjectLinks project={project} />
    </article>
  );
}

function ProjectCard({ project, index }) {
  if (project.spotlight) {
    return <SpotlightProjectCard project={project} index={index} />;
  }

  return <StandardProjectCard project={project} index={index} />;
}

export function ProjectGrid({ projects, showAll = false }) {
  return (
    <section className="section alt" id="projects">
      <div className="container">
        <SectionHeading
          eyebrow="Selected Work"
          title={showAll ? "Projects across product, platform, and systems work." : "Proof of work, not just a list of technologies."}
          description="Each project connects the implementation choices to a real workflow, technical challenge, or product outcome."
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
