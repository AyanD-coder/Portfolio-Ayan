import { SectionHeading } from "@/components/SectionHeading";
import { siteData } from "@/lib/site-data";

export function ContactSection({ detailed = false }) {
  return (
    <section className="section recruiter-contact" id="contact">
      <div className="container">
        <SectionHeading
          eyebrow="Let’s Work Together"
          title="Looking for a developer who can move from idea to implementation?"
          description="I’m open to full-stack, frontend, and software engineering opportunities where practical execution matters."
        />
        <div className="contact-editorial-grid">
          <div className="contact-pitch fade-up">
            <div className="availability-pill">
              <span aria-hidden="true" />
              {siteData.availability.status}
            </div>
            <h3>Ready to contribute to a product-focused engineering team.</h3>
            <p>
              Available for {siteData.availability.workMode.toLowerCase()} roles. I bring production internship experience, full-stack project work, and an AI-assisted workflow grounded in validation.
            </p>
            <div className="contact-role-list">
              {siteData.targetRoles.map((role) => (
                <span className="meta-chip" key={role}>{role}</span>
              ))}
            </div>
            {detailed ? (
              <p className="contact-response-note">{siteData.availability.response}</p>
            ) : null}
          </div>
          <div className="contact-link-card fade-up fade-delay-1">
            <a className="contact-link-row" href={`mailto:${siteData.contact.email}`}>
              <span>Email</span>
              <strong>{siteData.contact.email}</strong>
            </a>
            <a className="contact-link-row" href={siteData.contact.linkedin} target="_blank" rel="noreferrer">
              <span>LinkedIn</span>
              <strong>Professional profile</strong>
            </a>
            <a className="contact-link-row" href={siteData.contact.gitHub} target="_blank" rel="noreferrer">
              <span>GitHub</span>
              <strong>Code and repositories</strong>
            </a>
            <a className="contact-link-row" href={siteData.cvPath} download>
              <span>Resume</span>
              <strong>Download CV</strong>
            </a>
            <div className="contact-location">
              <span>Based in</span>
              <strong>{siteData.availability.location}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
