import { SectionHeading } from "@/components/SectionHeading";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { siteData } from "@/lib/site-data";
import { getContactEmailHref } from "@/lib/contact";
import { homepageContent } from "@/lib/homepage-content";

export function ContactSection({ detailed = false }) {
  const emailHref = getContactEmailHref();

  return (
    <section className="section recruiter-contact" id="contact">
      <div className="container">
        <SectionHeading
          eyebrow={homepageContent.contact.eyebrow}
          title={homepageContent.contact.title}
          description={homepageContent.contact.description}
        />
        <div className="contact-editorial-grid">
          <div className="contact-pitch fade-up">
            <div className="availability-pill">
              <span aria-hidden="true" />
              {siteData.availability.status}
            </div>
            <h3>{homepageContent.contact.pitchTitle}</h3>
            <p>
              {homepageContent.contact.pitchIntro}{siteData.availability.workMode.toLowerCase()}{homepageContent.contact.pitchOutro}
            </p>
            <div className="contact-role-list">
              {siteData.targetRoles.map((role) => (
                <span className="meta-chip" key={role}>{role}</span>
              ))}
            </div>
            <div className="contact-primary-actions">
              <a className="primary-button" href={emailHref}>{homepageContent.contact.emailLabel}</a>
              <a className="ghost-button" href={siteData.cvPath} target="_blank" rel="noopener noreferrer">
                {homepageContent.contact.resumeLabel}
              </a>
            </div>
            <p className="contact-response-note">
              {siteData.availability.response}{detailed ? homepageContent.contact.responseSuffix : ""}
            </p>
          </div>
          <address className="contact-link-card fade-up fade-delay-1">
            <a className="contact-link-row" href={emailHref}>
              <span>{homepageContent.contact.emailDetailLabel}</span>
              <strong>{siteData.contact.email}</strong>
            </a>
            <div className="contact-copy-row">
              <span>{homepageContent.contact.copyPrompt}</span>
              <CopyEmailButton email={siteData.contact.email} />
            </div>
            <a className="contact-link-row" href={siteData.contact.linkedin} target="_blank" rel="noreferrer">
              <span>{homepageContent.contact.linkedInLabel}</span>
              <strong>{homepageContent.contact.linkedInDescription}</strong>
            </a>
            <a className="contact-link-row" href={siteData.contact.gitHub} target="_blank" rel="noreferrer">
              <span>{homepageContent.contact.gitHubLabel}</span>
              <strong>{homepageContent.contact.gitHubDescription}</strong>
            </a>
            <a className="contact-link-row" href={siteData.cvPath} download>
              <span>{homepageContent.contact.resumeDetailLabel}</span>
              <strong>{homepageContent.contact.downloadLabel}</strong>
            </a>
            <div className="contact-location">
              <span>{homepageContent.contact.locationLabel}</span>
              <strong>{siteData.availability.location}</strong>
            </div>
          </address>
        </div>
      </div>
    </section>
  );
}
