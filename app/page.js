import { Hero } from "@/components/Hero";
import { AboutPreview } from "@/components/AboutPreview";
import { SkillsSection } from "@/components/SkillsSection";
import { AIWorkflowSection } from "@/components/AIWorkflowSection";
import { ProjectsPreview } from "@/components/ProjectsPreview";
import { TimelineSection } from "@/components/TimelineSection";
import { ContactSection } from "@/components/ContactSection";
import { getStaticProjects } from "@/lib/project-service";
import { siteData } from "@/lib/site-data";

export default async function HomePage() {
  const projects = getStaticProjects().slice(0, 3);

  return (
    <main>
      <Hero />
      <ProjectsPreview projects={projects} />
      <SkillsSection skills={siteData.skills} compact />
      <AIWorkflowSection workflow={siteData.aiWorkflow} />
      <TimelineSection education={siteData.education} />
      <AboutPreview summary={siteData.summary} strengths={siteData.strengths} showImage />
      <ContactSection />
    </main>
  );
}
