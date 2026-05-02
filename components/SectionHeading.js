export function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-header fade-up">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
