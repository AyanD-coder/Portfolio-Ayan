import { getStaticProjects } from "@/lib/project-service";

export async function GET() {
  return Response.json({
    generatedAt: new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }),
    projects: getStaticProjects(),
  });
}
