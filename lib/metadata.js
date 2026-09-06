import { siteData } from "@/lib/site-data";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();
const socialImage = {
  url: "/og-v3.png",
  width: 1200,
  height: 630,
  alt: "Ayan Dutta, a full-stack software engineer in Kolkata, with featured work across React, Go, FastAPI, Electron, APIs, and AI content platforms",
};

export function createPageMetadata({ title, description, path = "/" }) {
  const absoluteUrl = new URL(path, `${siteUrl}/`).toString();
  const socialTitle = title.includes(siteData.name)
    ? title
    : `${title} | ${siteData.name}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        "en-IN": path,
      },
    },
    openGraph: {
      title: socialTitle,
      description,
      type: "website",
      url: absoluteUrl,
      siteName: `${siteData.name} Portfolio`,
      locale: "en_IN",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [socialImage.url],
    },
  };
}

export { socialImage };
