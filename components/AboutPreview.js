import { ProfilePortrait } from "@/components/ProfilePortrait";
import { SectionHeading } from "@/components/SectionHeading";
import { siteData } from "@/lib/site-data";
import { homepageContent } from "@/lib/homepage-content";

export function AboutPreview({ summary, strengths, detailed = false, showImage = false }) {
  return (
    <section className="section alt" id="about">
      <div className="container">
        <SectionHeading
          eyebrow={homepageContent.about.eyebrow}
          title={homepageContent.about.title}
          description={homepageContent.about.description}
        />
        <div className={`about-grid${showImage ? " about-grid-with-image" : ""}`}>
          {showImage ? (
            <div className="about-profile-card fade-up">
              <div className="about-image-wrapper">
                <ProfilePortrait />
              </div>
              <div className="about-profile-meta">
                <strong>{siteData.name}</strong>
                <span>{siteData.role}{homepageContent.about.locationSuffix}</span>
              </div>
            </div>
          ) : null}
          <div className="about-panel about-story fade-up fade-delay-1">
            <p className="eyebrow">{homepageContent.about.approachLabel}</p>
            <h3>{homepageContent.about.approachTitle}</h3>
            <p>{summary}</p>
            {detailed ? (
              <p className="about-detail">
                {homepageContent.about.detail}
              </p>
            ) : null}
          </div>
          <div className="about-panel about-strengths fade-up fade-delay-2">
            <p className="eyebrow">{homepageContent.about.strengthsLabel}</p>
            <div className="strength-list">
              {strengths.map((strength, index) => (
                <div className="strength-item" key={strength}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{strength}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
