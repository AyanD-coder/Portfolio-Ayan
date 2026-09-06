import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { getProjectExternalLinks } from "@/lib/project-service";

function ProjectLinks({ project }) {
  const links = getProjectExternalLinks(project);

  return (
    <div className="project-links">
      <Link
        className={project.spotlight ? "primary-button" : "chip-link"}
        href={`/projects/${project.slug}`}
        aria-label={`Read the ${project.title} case study`}
      >
        Read case study
      </Link>
      {links.map((link) => (
        <a
          className="chip-link"
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
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
          width={project.image.width}
          height={project.image.height}
          sizes="(min-width: 1024px) 52vw, 100vw"
          className="project-spotlight-image"
        />
        {project.image.kind === "concept" ? (
          <span className="project-row-media-label">Concept visual</span>
        ) : null}
      </div>
      <div className="project-spotlight-content">
        <div className="project-top">
          <div>
            <div className="project-top-row">
              <p className="eyebrow">{project.category}</p>
              {badge ? <span className="featured-pill">{badge}</span> : null}
            </div>
            <h3>
              <Link href={`/projects/${project.slug}`}>{project.title}</Link>
            </h3>
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
  const badge = project.badge || (project.featured ? "Featured project" : null);
  const hasMedia = Boolean(project.image?.src);

  return (
    <article
      className={`project-card fade-up${project.featured ? " featured" : ""}${hasMedia ? " project-card-with-media" : ""}`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {hasMedia ? (
        <div className="project-row-media">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            sizes="(min-width: 900px) 18vw, calc(100vw - 3rem)"
            className="project-row-media-image"
          />
          {project.image.kind === "concept" ? (
            <span className="project-row-media-label">Concept visual</span>
          ) : null}
        </div>
      ) : null}
      <div className="project-top">
        <div>
            <div className="project-top-row">
              <p className="eyebrow">{project.category}</p>
              {badge ? <span className="featured-pill">{badge}</span> : null}
          </div>
          <h3>
            <Link href={`/projects/${project.slug}`}>{project.title}</Link>
          </h3>
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
