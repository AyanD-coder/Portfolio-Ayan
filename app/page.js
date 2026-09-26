import { RedesignHome } from "@/components/redesign/RedesignHome";
import { getStaticProjects } from "@/lib/project-service";

export default async function HomePage() {
  const projects = getStaticProjects().slice(0, 3);
  return <RedesignHome projects={projects} />;
}
