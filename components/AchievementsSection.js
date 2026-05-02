import { SectionHeading } from "@/components/SectionHeading";

export function AchievementsSection({ achievements, certifications }) {
  return (
    <section className="section alt" id="achievements">
      <div className="container">
        <SectionHeading
          eyebrow="Achievements"
          title="Professional strengths and career-ready capabilities."
          description="The CV did not list formal certifications, so this section focuses on language proficiency and practical strengths from the resume."
        />
        <div className="achievement-grid">
          {achievements.map((item, index) => (
            <article className="achievement-card fade-up" key={item.title} style={{ animationDelay: `${index * 0.08}s` }}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
          {certifications.map((item, index) => (
            <article className="achievement-card fade-up" key={item.title} style={{ animationDelay: `${(achievements.length + index) * 0.08}s` }}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
