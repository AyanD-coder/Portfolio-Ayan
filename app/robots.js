import { getSiteUrl } from "@/lib/site-url";

export default function robots() {
  const baseUrl = getSiteUrl();
  const isPreviewDeployment = process.env.VERCEL_ENV === "preview";

  if (isPreviewDeployment) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  const publicRules = {
    allow: "/",
    disallow: ["/api/"],
  };

  return {
    rules: [
      {
        userAgent: "*",
        ...publicRules,
      },
      {
        userAgent: [
          "OAI-SearchBot",
          "ChatGPT-User",
          "Claude-SearchBot",
          "Claude-User",
          "PerplexityBot",
        ],
        ...publicRules,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
