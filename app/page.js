import { Hero } from "@/components/Hero";
import { AboutPreview } from "@/components/AboutPreview";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsPreview } from "@/components/ProjectsPreview";
import { TimelineSection } from "@/components/TimelineSection";
import { AchievementsSection } from "@/components/AchievementsSection";
import { ContactSection } from "@/components/ContactSection";
import { getStaticProjects } from "@/lib/project-service";
import { siteData } from "@/lib/site-data";

export default async function HomePage() {
  const projects = getStaticProjects().slice(0, 5);

  return (
    <main>
      <Hero />
      <AboutPreview summary={siteData.summary} strengths={siteData.strengths} />
      <SkillsSection skills={siteData.skills} compact />
      <ProjectsPreview projects={projects} />
      <TimelineSection education={siteData.education} />
      <AchievementsSection achievements={siteData.achievements} certifications={siteData.certifications} />
      <ContactSection />
    </main>
  );
}
