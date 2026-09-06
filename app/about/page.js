import { AboutPreview } from "@/components/AboutPreview";
import { SkillsSection } from "@/components/SkillsSection";
import { AIWorkflowSection } from "@/components/AIWorkflowSection";
import { TimelineSection } from "@/components/TimelineSection";
import { AchievementsSection } from "@/components/AchievementsSection";
import { ContactSection } from "@/components/ContactSection";
import { JsonLd } from "@/components/JsonLd";
import { siteData } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/metadata";
import { getSiteUrl } from "@/lib/site-url";

export const metadata = createPageMetadata({
  title: "About",
  description: "About Ayan Dutta, a Kolkata-based full-stack Software Engineer at YoForex working with React, TypeScript, Go, FastAPI, PostgreSQL, and Electron.",
  path: "/about",
});

export default function AboutPage() {
  const siteUrl = getSiteUrl();
  const profilePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteUrl}/about#profile-page`,
    url: `${siteUrl}/about`,
    name: `About ${siteData.name}`,
    description: siteData.summary,
    dateModified: siteData.lastUpdated,
    mainEntity: {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: siteData.name,
    },
    isPartOf: {
      "@id": `${siteUrl}/#website`,
    },
  };

  return (
    <main className="inner-page" id="main-content">
      <JsonLd data={profilePageJsonLd} />
      <section className="page-hero section page-hero-artwork page-hero-artwork-about">
        <div className="container">
          <p className="eyebrow">About</p>
          <h1>About Ayan Dutta, full-stack software engineer.</h1>
          <p className="section-copy">
            {siteData.summary}
          </p>
          <div className="page-hero-meta">
            <span className="meta-chip">Kolkata, India</span>
            <span className="meta-chip">Profile updated {siteData.lastUpdatedLabel}</span>
          </div>
        </div>
      </section>
      <AboutPreview summary={siteData.summary} strengths={siteData.strengths} detailed showImage={true} />
      <TimelineSection education={siteData.education} />
      <SkillsSection skills={siteData.skills} />
      <AIWorkflowSection workflow={siteData.aiWorkflow} />
      <AchievementsSection achievements={siteData.achievements} />
      <ContactSection />
    </main>
  );
}
