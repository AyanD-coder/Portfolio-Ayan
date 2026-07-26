import { SectionHeading } from "@/components/SectionHeading";

export function SkillsSection({ skills, compact = false }) {
  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHeading
          eyebrow="Capabilities"
          title="A full-stack toolkit organized around shipping useful products."
          description="Core technologies, delivery practices, and evidence from the work behind this portfolio."
        />
        <div className={`skills-grid ${compact ? "compact" : ""}`}>
          {skills.map((group, index) => (
            <article className="skill-card fade-up" key={group.title} style={{ animationDelay: `${index * 0.08}s` }}>
              <span className="skill-index">{String(index + 1).padStart(2, "0")}</span>
              <h3>{group.title}</h3>
              <p>{group.summary}</p>
              <div className="skill-tags">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <p className="skill-evidence">{group.evidence}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
