import { SectionHeading } from "@/components/SectionHeading";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { siteData } from "@/lib/site-data";

export function ContactSection({ detailed = false }) {
  const emailHref = `mailto:${siteData.contact.email}?subject=${encodeURIComponent(
    "Software engineering opportunity",
  )}&body=${encodeURIComponent(
    "Hi Ayan,\n\nI found your portfolio and would like to discuss a software engineering opportunity.\n\nRole / company:\nWork arrangement:\nUseful details:\n",
  )}`;

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
            <h3>Ready to discuss the right product engineering role.</h3>
            <p>
              I&apos;m currently a Software Engineer at YoForex and open to discussing {siteData.availability.workMode.toLowerCase()} roles. I bring production full-stack experience across React, Go, FastAPI, PostgreSQL, and Electron.
            </p>
            <div className="contact-role-list">
              {siteData.targetRoles.map((role) => (
                <span className="meta-chip" key={role}>{role}</span>
              ))}
            </div>
            <div className="contact-primary-actions">
              <a className="primary-button" href={emailHref}>Email me about a role</a>
              <a className="ghost-button" href={siteData.cvPath} target="_blank" rel="noopener noreferrer">
                View resume
              </a>
            </div>
            <p className="contact-response-note">
              {siteData.availability.response}{detailed ? " · Email or LinkedIn both work." : ""}
            </p>
          </div>
          <address className="contact-link-card fade-up fade-delay-1">
            <a className="contact-link-row" href={emailHref}>
              <span>Email</span>
              <strong>{siteData.contact.email}</strong>
            </a>
            <div className="contact-copy-row">
              <span>Prefer to paste it?</span>
              <CopyEmailButton email={siteData.contact.email} />
            </div>
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
              <strong>Download PDF</strong>
            </a>
            <div className="contact-location">
              <span>Based in</span>
              <strong>{siteData.availability.location}</strong>
            </div>
          </address>
        </div>
      </div>
    </section>
  );
}
