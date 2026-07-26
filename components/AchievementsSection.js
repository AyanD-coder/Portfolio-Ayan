import { SectionHeading } from "@/components/SectionHeading";

export function AchievementsSection({ achievements }) {
  return (
    <section className="section alt" id="achievements">
      <div className="container">
        <SectionHeading
          eyebrow="Working Style"
          title="How I contribute beyond the technology stack."
          description="Product thinking, cross-platform perspective, and communication that support dependable delivery."
        />
        <div className="achievement-grid">
          {achievements.map((item, index) => (
            <article className="achievement-card fade-up" key={item.title} style={{ animationDelay: `${index * 0.08}s` }}>
              <span className="achievement-index">{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
