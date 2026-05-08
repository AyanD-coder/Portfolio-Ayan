import { SectionHeading } from "@/components/SectionHeading";

export function AchievementsSection({ achievements, certifications }) {
  const getIcon = (title) => {
    const t = title.toLowerCase();
    if (t.includes('chess')) return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 10l-1.5-1.5c-1.39-1.39-2.5-3.5-2.5-5.5H9c0 2-1.11 4.11-2.5 5.5L5 10c-1.1 1.1-1.1 2.9 0 4l2 2v3h10v-3l2-2c1.1-1.1 1.1-2.9 0-4z"/><path d="M7 21h10"/><path d="M12 12v3"/></svg>
    );
    if (t.includes('trilingual')) return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
    );
    if (t.includes('cross-domain')) return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
    );
    if (t.includes('career-ready')) return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15l-3.5 2 1-3.5L7 11l3.5-.5L12 7l1.5 3.5L17 11l-2.5 2.5 1 3.5L12 15z"/><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M12 22V12"/></svg>
    );
    return null;
  };

  return (
    <section className="section alt" id="achievements">
      <div className="container">
        <SectionHeading
          eyebrow="Achievements"
          title="A blend of technical excellence, leadership, and problem-solving capabilities."
          description="Combining technical expertise, strategic problem-solving, leadership, and practical development experience."
        />
        <div className="achievement-grid">
          {[...achievements, ...certifications].map((item, index) => (
            <article className="achievement-card fade-up" key={item.title} style={{ animationDelay: `${index * 0.08}s` }}>
              <div className="achievement-icon" style={{ color: 'var(--primary)', marginBottom: '1rem', opacity: 0.8 }}>
                {getIcon(item.title)}
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
