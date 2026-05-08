import { SectionHeading } from "@/components/SectionHeading";

export function SkillsSection({ skills, compact = false }) {
  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHeading
          eyebrow="Skills"
          title="Technical depth across software, tools, and applied electronics."
          description="Full-spectrum technical skills spanning frontend, backend, tools, IoT and AI."
        />
        <div className={`skills-grid ${compact ? "compact" : ""}`}>
          {skills.map((group, index) => (
            <article className="skill-card fade-up" key={group.title} style={{ animationDelay: `${index * 0.08}s` }}>
              <h3>{group.title}</h3>
              <p>{group.items.join(" | ")}</p>
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
