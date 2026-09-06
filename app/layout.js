import "./globals.css";
import "./editorial.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeInitializer } from "@/components/ThemeInitializer";
import { MotionInitializer } from "@/components/MotionInitializer";
import { JsonLd } from "@/components/JsonLd";
import { siteData } from "@/lib/site-data";
import { getSiteUrl } from "@/lib/site-url";
import { createPageMetadata, socialImage } from "@/lib/metadata";

const siteUrl = getSiteUrl();
const isPreviewDeployment = process.env.VERCEL_ENV === "preview";

export const metadata = {
  ...createPageMetadata({
    title: `${siteData.name} | Full-Stack Software Engineer in Kolkata`,
    description: siteData.tagline,
  }),
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteData.name} | Full-Stack Software Engineer in Kolkata`,
    template: `%s | ${siteData.name}`,
  },
  applicationName: `${siteData.name} Portfolio`,
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.png",
  },
  keywords: [
    "Ayan Dutta",
    "Ayan Dutta software engineer",
    "full-stack software engineer Kolkata",
    "React TypeScript developer",
    "Go FastAPI developer",
    "Next.js developer Kolkata",
    "Electron desktop developer",
    "frontend developer India",
    "full-stack developer portfolio",
  ],
  authors: [{ name: siteData.name, url: siteData.contact.linkedin }],
  creator: siteData.name,
  publisher: siteData.name,
  category: "technology",
  openGraph: {
    ...createPageMetadata({
      title: `${siteData.name} | Full-Stack Software Engineer in Kolkata`,
      description: siteData.tagline,
    }).openGraph,
    images: [{ ...socialImage, url: new URL(socialImage.url, siteUrl).toString() }],
  },
  twitter: {
    ...createPageMetadata({
      title: `${siteData.name} | Full-Stack Software Engineer in Kolkata`,
      description: siteData.tagline,
    }).twitter,
    images: [new URL(socialImage.url, siteUrl).toString()],
  },
  robots: {
    index: !isPreviewDeployment,
    follow: !isPreviewDeployment,
    googleBot: {
      index: !isPreviewDeployment,
      follow: !isPreviewDeployment,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

const skills = [...new Set(siteData.skills.flatMap((group) => group.items))];

const personJsonLd = {
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: siteData.name,
  givenName: "Ayan",
  familyName: "Dutta",
  jobTitle: siteData.currentTitle,
  description: siteData.summary,
  email: siteData.contact.email,
  image: `${siteUrl}/profile-optimized.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kolkata",
    addressRegion: "West Bengal",
    addressCountry: "IN",
  },
  knowsAbout: skills,
  knowsLanguage: ["English", "Hindi", "Bengali"],
  worksFor: {
    "@type": "Organization",
    name: siteData.employer,
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: siteData.contact.email,
    contactType: "recruitment",
    availableLanguage: ["English", "Hindi", "Bengali"],
  },
  hasOccupation: {
    "@type": "Occupation",
    name: siteData.currentTitle,
    skills: skills.join(", "),
    occupationLocation: {
      "@type": "Country",
      name: "India",
    },
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Techno International New Town",
  },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "degree",
    name: "B.Tech. Electronics and Communication Engineering",
  },
  url: `${siteUrl}/about`,
  mainEntityOfPage: {
    "@id": `${siteUrl}/about#profile-page`,
  },
  sameAs: [siteData.contact.linkedin, siteData.contact.gitHub],
};

const websiteJsonLd = {
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: `${siteData.name} Portfolio`,
  description: siteData.tagline,
  url: siteUrl,
  author: {
    "@id": `${siteUrl}/#person`,
  },
  publisher: {
    "@id": `${siteUrl}/#person`,
  },
  inLanguage: "en-IN",
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [personJsonLd, websiteJsonLd],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <meta id="theme-color" name="theme-color" content="#f8f3ed" />
        <ThemeInitializer />
      </head>
      <body>
        <MotionInitializer />
        <JsonLd data={siteJsonLd} />
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <div className="site-shell">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
