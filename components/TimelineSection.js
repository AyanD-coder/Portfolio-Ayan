import { SectionHeading } from "@/components/SectionHeading";

export function TimelineSection({ education }) {
  return (
    <section className="section" id="education">
      <div className="container">
        <SectionHeading
          eyebrow="Experience"
          title="Professional experience and academic milestones in one timeline."
          description="Latest internships, roles, and education are presented clearly for quick review."
        />
        <div className="timeline-grid">
          {education.map((item, index) => (
            <article className="timeline-card fade-up" key={item.title} style={{ animationDelay: `${index * 0.08}s` }}>
              <h3>{item.title}</h3>
              <p>{item.institution}</p>
              <p className="timeline-meta">{item.meta}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
