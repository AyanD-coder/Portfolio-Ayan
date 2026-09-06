import { Hero } from "@/components/Hero";
import { AboutPreview } from "@/components/AboutPreview";
import { SkillsSection } from "@/components/SkillsSection";
import { AIWorkflowSection } from "@/components/AIWorkflowSection";
import { ProjectsPreview } from "@/components/ProjectsPreview";
import { TimelineSection } from "@/components/TimelineSection";
import { ContactSection } from "@/components/ContactSection";
import { RecruiterFAQ } from "@/components/RecruiterFAQ";
import { getStaticProjects } from "@/lib/project-service";
import { siteData } from "@/lib/site-data";

export default async function HomePage() {
  const projects = getStaticProjects().slice(0, 3);

  return (
    <main id="main-content">
      <Hero />
      <ProjectsPreview projects={projects} />
      <SkillsSection skills={siteData.skills} compact />
      <TimelineSection education={siteData.education} />
      <AIWorkflowSection workflow={siteData.aiWorkflow} />
      <AboutPreview summary={siteData.summary} strengths={siteData.strengths} showImage />
      <RecruiterFAQ />
      <ContactSection />
    </main>
  );
}
