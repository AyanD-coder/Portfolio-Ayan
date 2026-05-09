"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";

const skillIcons = {
  Frontend: (
    <>
      <path d="m8 8-4 4 4 4" />
      <path d="m16 8 4 4-4 4" />
      <path d="m14 4-4 16" />
    </>
  ),
  "Backend & Logic": (
    <>
      <rect width="16" height="10" x="4" y="4" rx="2" />
      <path d="M8 20h8" />
      <path d="M12 14v6" />
      <path d="M8 8h.01" />
      <path d="M12 8h.01" />
      <path d="M16 8h.01" />
    </>
  ),
  Tools: (
    <>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-3 3-3-3z" />
    </>
  ),
  "IoT & Hardware": (
    <>
      <rect width="14" height="14" x="5" y="5" rx="2" />
      <path d="M9 2v3" />
      <path d="M15 2v3" />
      <path d="M9 19v3" />
      <path d="M15 19v3" />
      <path d="M2 9h3" />
      <path d="M2 15h3" />
      <path d="M19 9h3" />
      <path d="M19 15h3" />
    </>
  ),
  "Soft Skills": (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M2 20c1.2-3.2 3.5-5 7-5s5.8 1.8 7 5" />
      <path d="M16 11.5a3 3 0 0 0 0-5.5" />
      <path d="M20 20c-.5-1.7-1.5-3-3-3.8" />
    </>
  ),
  Languages: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15 15 0 0 1 0 20" />
      <path d="M12 2a15 15 0 0 0 0 20" />
    </>
  ),
};

export function SkillsSection({ skills, compact = false }) {
  const gridRef = useRef(null);
  const [isOpen, setIsOpen] = useState(!compact);

  useEffect(() => {
    if (!compact || !gridRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOpen(entry.isIntersecting);
      },
      { threshold: 0.35 }
    );

    observer.observe(gridRef.current);

    return () => observer.disconnect();
  }, [compact]);

  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHeading
          eyebrow="Skills"
          title="Technical depth across software, tools, and applied electronics."
          description="Full-spectrum technical skills spanning frontend, backend, tools, IoT and AI."
        />
        <div ref={gridRef} className={`skills-grid ${compact ? "compact" : ""} ${isOpen ? "is-open" : ""}`}>
          {skills.map((group, index) => (
            <article className="skill-card fade-up" key={group.title} style={{ animationDelay: `${index * 0.08}s` }}>
              <span className="skill-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {skillIcons[group.title] ?? skillIcons.Frontend}
                </svg>
              </span>
              <h3>{group.title}</h3>
              <p className="skill-list">
                {group.items.map((item) => (
                  <span className="skill-tag-item" key={item}>
                    {item}
                  </span>
                ))}
              </p>
              <div className="skill-meter" aria-hidden="true">
                <span style={{ width: `${group.level}%` }} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
