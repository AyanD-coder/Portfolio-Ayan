import { AboutPreview } from "@/components/AboutPreview";
import { SkillsSection } from "@/components/SkillsSection";
import { TimelineSection } from "@/components/TimelineSection";
import { AchievementsSection } from "@/components/AchievementsSection";
import { siteData } from "@/lib/site-data";

export const metadata = {
  title: "About",
  description:
    "Learn more about Ayan Dutta – B.Tech ECE graduate, software engineer intern, and web developer from Kolkata with experience in React, Node.js, IoT, and Python.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | Ayan Dutta",
    description:
      "Learn more about Ayan Dutta – B.Tech ECE graduate, software engineer intern, and web developer from Kolkata.",
    url: "/about",
    images: ["/profile.jpg"],
  },
};

export default function AboutPage() {
  return (
    <main className="inner-page">
      <section className="page-hero section">
        <div className="container">
          <p className="eyebrow">About</p>
          <h1>Engineering-first thinking with a builder&apos;s mindset.</h1>
          <p className="section-copy">
            {siteData.summary}
          </p>
        </div>
      </section>
      <AboutPreview summary={siteData.summary} strengths={siteData.strengths} detailed showImage={true} />
      <TimelineSection education={siteData.education} />
      <SkillsSection skills={siteData.skills} />
      <AchievementsSection achievements={siteData.achievements} certifications={siteData.certifications} />
    </main>
  );
}
