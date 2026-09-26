import { OriginalHome } from "@/components/OriginalHome";
import { RedesignHome } from "@/components/redesign/RedesignHome";
import { getDesignConfig } from "@/lib/design-config";
import { getStaticProjects } from "@/lib/project-service";

export default async function HomePage() {
  const projects = getStaticProjects().slice(0, 3);
  const config = getDesignConfig();

  return config.mode === "redesign"
    ? <RedesignHome projects={projects} config={config} />
    : <OriginalHome projects={projects} />;
}
