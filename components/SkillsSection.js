import { SectionHeading } from "@/components/SectionHeading";
import { homepageContent } from "@/lib/homepage-content";

export function SkillsSection({ skills, compact = false }) {
  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHeading
          eyebrow={homepageContent.skills.eyebrow}
          title={homepageContent.skills.title}
          description={homepageContent.skills.description}
        />
        <div className={`skills-grid ${compact ? "compact" : ""}`}>
          {skills.map((group, index) => (
            <article
              className="skill-card fade-up gentle-section-reveal"
              key={group.title}
              style={{ "--reveal-delay": `${index * 0.055}s` }}
            >
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
