import "./globals.css";
import "./editorial.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeInitializer } from "@/components/ThemeInitializer";
import { MotionInitializer } from "@/components/MotionInitializer";
import { siteData } from "@/lib/site-data";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();
const socialImageUrl = new URL("/og-v2.png", siteUrl).toString();

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteData.name} | Portfolio`,
    template: `%s | ${siteData.name}`,
  },
  description: siteData.tagline,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  keywords: [
    "Ayan Dutta",
    "full-stack developer",
    "frontend developer",
    "software engineer",
    "React developer",
    "Next.js developer",
    "FastAPI developer",
    "Electron developer",
    "AI content operations",
    "SEO AEO GEO",
    "grounded AI research",
    "multi-provider AI",
    "AI-assisted development",
    "OpenAI Codex",
    "portfolio",
    "Next.js portfolio",
    "Electronics and Communication Engineering",
    "IoT projects",
  ],
  authors: [{ name: siteData.name, url: siteData.contact.linkedin }],
  creator: siteData.name,
  publisher: siteData.name,
  category: "technology",
  openGraph: {
    title: `${siteData.name} | Portfolio`,
    description: siteData.tagline,
    type: "website",
    url: siteUrl,
    siteName: `${siteData.name} Portfolio`,
    locale: "en_IN",
    images: [
      {
        url: socialImageUrl,
        width: 1732,
        height: 908,
        alt: "Ayan Dutta full-stack developer portfolio featuring RTX5, EmpTrakr, Blog Forge, web, desktop, APIs, and AI-assisted engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteData.name} | Portfolio`,
    description: siteData.tagline,
    images: [socialImageUrl],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
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

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: siteData.name,
  givenName: "Ayan",
  familyName: "Dutta",
  jobTitle: siteData.role,
  description: siteData.summary,
  email: siteData.contact.email,
  telephone: siteData.contact.phone,
  image: `${siteUrl}/profile.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kolkata",
    addressRegion: "West Bengal",
    addressCountry: "IN",
  },
  knowsAbout: siteData.skills.flatMap((group) => group.items),
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: siteData.education[1]?.institution,
  },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "degree",
    name: "B.Tech. Electronics and Communication Engineering",
  },
  url: siteUrl,
  sameAs: [siteData.contact.linkedin, siteData.contact.gitHub],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: `${siteData.name} Portfolio`,
  description: siteData.tagline,
  url: siteUrl,
  author: {
    "@id": `${siteUrl}/#person`,
  },
  inLanguage: "en-IN",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta id="theme-color" name="theme-color" content="#ffffff" />
        <ThemeInitializer />
      </head>
      <body>
        <MotionInitializer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <div className="site-shell">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
