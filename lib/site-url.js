const FALLBACK_SITE_URL = "https://portfolio-ayan-five.vercel.app";

export function getSiteUrl() {
  const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined;
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    vercelProductionUrl ||
    FALLBACK_SITE_URL;

  return configuredUrl.replace(/\/$/, "");
}
