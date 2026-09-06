import { SectionHeading } from "@/components/SectionHeading";

export function TimelineSection({ education }) {
  return (
    <section className="section" id="experience-and-education">
      <div className="container">
        <SectionHeading
          eyebrow="Experience"
          title="Production experience backed by engineering foundations."
          description="A concise timeline of production delivery, professional experience, and technical education."
        />
        <ol className="timeline-grid">
          {education.map((item, index) => (
            <li className="timeline-card fade-up" key={item.title} style={{ animationDelay: `${index * 0.08}s` }}>
              <h3>{item.title}</h3>
              <p>{item.institution}</p>
              <p className="timeline-meta">{item.meta}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
