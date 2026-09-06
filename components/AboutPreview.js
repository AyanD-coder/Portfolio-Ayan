import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { siteData } from "@/lib/site-data";

export function AboutPreview({ summary, strengths, detailed = false, showImage = false }) {
  return (
    <section className="section alt" id="about">
      <div className="container">
        <SectionHeading
          eyebrow="About"
          title="Engineering fundamentals with a product builder’s mindset."
          description="A practical path from electronics and systems thinking to production-minded software development."
        />
        <div className={`about-grid${showImage ? " about-grid-with-image" : ""}`}>
          {showImage ? (
            <div className="about-profile-card fade-up">
              <div className="about-image-wrapper">
                <Image
                  src="/profile-optimized.jpg"
                  alt="Portrait of Ayan Dutta, full-stack software engineer in Kolkata"
                  width={500}
                  height={625}
                  quality={90}
                  className="about-image"
                />
              </div>
              <div className="about-profile-meta">
                <strong>{siteData.name}</strong>
                <span>{siteData.role} · Kolkata</span>
              </div>
            </div>
          ) : null}
          <div className="about-panel about-story fade-up fade-delay-1">
            <p className="eyebrow">My approach</p>
            <h3>Build clearly. Validate carefully. Keep improving.</h3>
            <p>{summary}</p>
            {detailed ? (
              <p className="about-detail">
                My electronics background adds systems thinking to software work: understanding constraints, tracing behavior, and turning technical decisions into dependable user experiences.
              </p>
            ) : null}
          </div>
          <div className="about-panel about-strengths fade-up fade-delay-2">
            <p className="eyebrow">What I bring</p>
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
