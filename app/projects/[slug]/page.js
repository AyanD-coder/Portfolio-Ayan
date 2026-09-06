import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/ContactSection";
import { JsonLd } from "@/components/JsonLd";
import { createPageMetadata } from "@/lib/metadata";
import {
  getProjectExternalLinks,
  getStaticProjectBySlug,
  getStaticProjects,
} from "@/lib/project-service";
import { siteData } from "@/lib/site-data";
import { getSiteUrl } from "@/lib/site-url";

export const dynamicParams = false;

export function generateStaticParams() {
  return getStaticProjects().map((project) => ({ slug: project.slug }));
}

function getSeoDescription(description) {
  if (description.length <= 158) return description;

  return `${description.slice(0, 155).replace(/\s+\S*$/, "")}…`;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getStaticProjectBySlug(slug);

  if (!project) {
    return {};
  }

  const metadata = createPageMetadata({
    title: `${project.title} Case Study`,
    description: getSeoDescription(project.description),
    path: `/projects/${project.slug}`,
  });

  if (!project.image?.src) return metadata;

  const projectImage = {
    url: project.image.src,
    width: project.image.width,
    height: project.image.height,
    alt: project.image.alt,
  };

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      images: [projectImage],
    },
    twitter: {
      ...metadata.twitter,
      images: [project.image.src],
    },
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = getStaticProjectBySlug(slug);

  if (!project) notFound();

  const siteUrl = getSiteUrl();
  const projectUrl = `${siteUrl}/projects/${project.slug}`;
  const externalLinks = getProjectExternalLinks(project);
  const projectImageUrl = project.image?.src
    ? new URL(project.image.src, `${siteUrl}/`).toString()
    : undefined;
  const contactHref = `mailto:${siteData.contact.email}?subject=${encodeURIComponent(
    `Project discussion: ${project.title}`,
  )}`;
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${projectUrl}#project`,
        name: project.title,
        headline: `${project.title} case study`,
        description: project.description,
        url: projectUrl,
        image: projectImageUrl,
        genre: project.category,
        keywords: project.techStack.join(", "),
        ...(project.role
          ? { contributor: { "@id": `${siteUrl}/#person` } }
          : { creator: { "@id": `${siteUrl}/#person` } }),
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        mainEntityOfPage: {
          "@id": `${projectUrl}#webpage`,
        },
        sameAs: externalLinks.length
          ? externalLinks.map((link) => link.url)
          : undefined,
      },
      {
        "@type": "WebPage",
        "@id": `${projectUrl}#webpage`,
        url: projectUrl,
        name: `${project.title} Case Study`,
        description: project.description,
        dateModified: siteData.lastUpdated,
        inLanguage: "en-IN",
        author: {
          "@id": `${siteUrl}/#person`,
        },
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        breadcrumb: {
          "@id": `${projectUrl}#breadcrumb`,
        },
        mainEntity: {
          "@id": `${projectUrl}#project`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${projectUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: `${siteUrl}/projects`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: projectUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="inner-page project-detail-page" id="main-content">
      <JsonLd data={projectJsonLd} />
      <section className="section project-detail-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/projects">Projects</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{project.title}</span>
          </nav>
          <div className="project-detail-heading">
            <div>
              <p className="eyebrow">{project.category}</p>
              <h1>{project.title}</h1>
              <p className="project-detail-intro">{project.description}</p>
            </div>
            <dl className="project-detail-meta" aria-label="Project details">
              <div>
                <dt>Timeline</dt>
                <dd>{project.year}</dd>
              </div>
              <div>
                <dt>Role</dt>
                <dd>{project.role || "Developer"}</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>{project.category}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {project.image?.src ? (
        <section className="project-detail-media" aria-label={`${project.title} visual`}>
          <div className="container">
            <div className="project-detail-image-shell">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                width={project.image.width}
                height={project.image.height}
                sizes="(min-width: 1180px) 1180px, calc(100vw - 2rem)"
                priority
                className="project-detail-image"
              />
              {project.image.kind === "concept" ? (
                <p className="project-detail-image-note">
                  Concept visual representing the project; not a production interface screenshot.
                </p>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section project-detail-content">
        <div className="container project-detail-layout">
          <article className="project-detail-story">
            <section>
              <p className="eyebrow">Overview</p>
              <h2>What the work covers</h2>
              <p>{project.description}</p>
              {project.role ? (
                <p>
                  <strong>Contribution context:</strong> {project.role}.
                </p>
              ) : null}
              {project.evidenceNote ? (
                <p className="project-evidence-note">{project.evidenceNote}</p>
              ) : null}
            </section>

            {project.impact?.length ? (
              <section>
                <p className="eyebrow">Outcome</p>
                <h2>Project signals</h2>
                <div className="project-detail-impact">
                  {project.impact.map((item) => (
                    <div key={item.label}>
                      <strong>{item.value}</strong>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            <section>
              <p className="eyebrow">Implementation</p>
              <h2>
                {project.capabilities?.length
                  ? "Selected platform capabilities"
                  : "Selected engineering highlights"}
              </h2>
              {project.capabilities?.length ? (
                <div className="project-detail-capabilities">
                  {project.capabilities.map((capability) => (
                    <article key={capability.title}>
                      <h3>{capability.title}</h3>
                      <p>{capability.summary}</p>
                    </article>
                  ))}
                </div>
              ) : (
                <ul className="project-detail-highlights">
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              )}
            </section>

            <section>
              <p className="eyebrow">Technology</p>
              <h2>Tools and systems used</h2>
              <ul className="project-detail-stack" aria-label={`${project.title} technologies`}>
                {project.techStack.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </section>
          </article>

          <aside className="project-detail-sidebar" aria-label="Project actions">
            <p className="eyebrow">Explore</p>
            <h2>Review the work</h2>
            <div className="project-detail-actions">
              {externalLinks.map((link) => (
                <a
                  className="ghost-button"
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={`${link.label}-${link.url}`}
                >
                  {link.label}
                </a>
              ))}
              <a className="primary-button" href={contactHref}>
                Ask about this project
              </a>
              <Link className="text-link" href="/projects">
                View all case studies
              </Link>
            </div>
            <p className="project-detail-updated">
              Last reviewed {siteData.lastUpdatedLabel}.
            </p>
          </aside>
        </div>
      </section>

      <ContactSection />
    </main>
  );
}
