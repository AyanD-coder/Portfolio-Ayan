"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";

function getShuffledProjects(projects) {
  if (projects.length < 2) {
    return projects;
  }

  const shuffled = [...projects];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  const hasSameOrder = shuffled.every((project, index) => project.slug === projects[index].slug);

  if (hasSameOrder) {
    shuffled.push(shuffled.shift());
  }

  return shuffled;
}

function ProjectCard({ project, index, setCardRef }) {
  return (
    <article
      ref={(node) => setCardRef(project.slug, node)}
      className={`project-card fade-up${project.featured ? " featured" : ""}`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
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

export function ProjectGrid({ projects, showAll = false, shuffle = false, children }) {
  const [orderedProjects, setOrderedProjects] = useState(projects);
  const cardRefs = useRef(new Map());
  const firstRects = useRef(null);

  useEffect(() => {
    setOrderedProjects(projects);
  }, [projects]);

  useEffect(() => {
    if (!shuffle || projects.length < 2) {
      return;
    }

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const interval = window.setInterval(() => {
      if (reduceMotionQuery.matches) {
        setOrderedProjects((currentProjects) => getShuffledProjects(currentProjects));
        return;
      }

      firstRects.current = new Map(
        [...cardRefs.current.entries()]
          .filter(([, node]) => node)
          .map(([slug, node]) => [slug, node.getBoundingClientRect()])
      );

      setOrderedProjects((currentProjects) => getShuffledProjects(currentProjects));
    }, 4200);

    return () => window.clearInterval(interval);
  }, [projects.length, shuffle]);

  useLayoutEffect(() => {
    if (!firstRects.current) {
      return;
    }

    cardRefs.current.forEach((node, slug) => {
      const firstRect = firstRects.current.get(slug);

      if (!node || !firstRect) {
        return;
      }

      const lastRect = node.getBoundingClientRect();
      const deltaX = firstRect.left - lastRect.left;
      const deltaY = firstRect.top - lastRect.top;

      if (deltaX === 0 && deltaY === 0) {
        return;
      }

      node.animate(
        [
          { transform: `translate(${deltaX}px, ${deltaY}px)` },
          { transform: "translate(0, 0)" },
        ],
        {
          duration: 950,
          easing: "cubic-bezier(.16, 1, .3, 1)",
        }
      );
    });

    firstRects.current = null;
  }, [orderedProjects]);

  const setCardRef = (slug, node) => {
    if (node) {
      cardRefs.current.set(slug, node);
    } else {
      cardRefs.current.delete(slug);
    }
  };

  const grid = (
    <div className={`projects-grid${shuffle ? " projects-grid-shuffle" : ""}`}>
      {orderedProjects.map((project, index) => (
        <ProjectCard project={project} index={index} key={project.slug} setCardRef={setCardRef} />
      ))}
    </div>
  );

  return (
    <section className="section alt" id="projects">
      <div className="container">
        <SectionHeading
          eyebrow="Projects"
          title={showAll ? "A broader look at recent work." : "Building modern digital experiences through code, creativity, and problem-solving."}
          description="Each project emphasizes implementation details, not just visuals."
        />
        {shuffle ? <div className="projects-shuffle-viewport">{grid}</div> : grid}
        {children}
      </div>
    </section>
  );
}
