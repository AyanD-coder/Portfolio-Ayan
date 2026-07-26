import { AboutPreview } from "@/components/AboutPreview";
import { SkillsSection } from "@/components/SkillsSection";
import { AIWorkflowSection } from "@/components/AIWorkflowSection";
import { TimelineSection } from "@/components/TimelineSection";
import { AchievementsSection } from "@/components/AchievementsSection";
import { siteData } from "@/lib/site-data";

export const metadata = {
  title: "About",
  description: "Learn how Ayan Dutta combines full-stack development, product thinking, AI content operations, and AI-assisted engineering.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | Ayan Dutta",
    description: "Learn how Ayan Dutta combines full-stack development, product thinking, AI content operations, and AI-assisted engineering.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="inner-page">
      <section className="page-hero section">
        <div className="container">
          <p className="eyebrow">About</p>
          <h1>Full-stack execution shaped by systems thinking.</h1>
          <p className="section-copy">
            {siteData.summary}
          </p>
        </div>
      </section>
      <AboutPreview summary={siteData.summary} strengths={siteData.strengths} detailed showImage={true} />
      <TimelineSection education={siteData.education} />
      <SkillsSection skills={siteData.skills} />
      <AIWorkflowSection workflow={siteData.aiWorkflow} />
      <AchievementsSection achievements={siteData.achievements} />
    </main>
  );
}
