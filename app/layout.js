import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeInitializer } from "@/components/ThemeInitializer";
import { siteData } from "@/lib/site-data";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

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
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  keywords: [
    "Ayan Dutta",
    "portfolio",
    "Next.js developer portfolio",
    "Software Engineer",
    "Electronics and Communication Engineering",
    "JavaScript developer",
    "React developer",
    "Node.js developer",
    "IoT projects",
    "full-stack developer",
    "web developer Kolkata",
    "HRMS developer",
    "frontend developer",
  ],
  authors: [{ name: siteData.name, url: siteData.contact.linkedin }],
  creator: siteData.name,
  publisher: siteData.name,
  category: "technology",
  openGraph: {
    title: `${siteData.name} | Portfolio`,
    description: siteData.tagline,
    type: "profile",
    url: siteUrl,
    siteName: `${siteData.name} Portfolio`,
    locale: "en_IN",
    images: [
      {
        url: "/profile.jpg",
        width: 400,
        height: 500,
        alt: `${siteData.name} – Software Developer`,
      },
    ],
    firstName: "Ayan",
    lastName: "Dutta",
    username: "AyanD-coder",
    gender: "male",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteData.name} | Portfolio`,
    description: siteData.tagline,
    creator: "@AyanD_coder",
    images: ["/profile.jpg"],
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
  verification: {
    // Add your Google Search Console verification token here when available:
    // google: "YOUR_GOOGLE_VERIFICATION_TOKEN",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
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
  email: `mailto:${siteData.contact.email}`,
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
    name: "Techno International New Town",
  },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "degree",
    name: "B.Tech. Electronics and Communication Engineering",
  },
  url: siteUrl,
  sameAs: [
    siteData.contact.linkedin,
    siteData.contact.gitHub,
  ],
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
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/projects?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

import { Component as SilkBackground } from "@/components/ui/silk-background-animation";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" data-theme="dark" suppressHydrationWarning>
      <head>
        {/* Preload LCP profile image — fires before React renders */}
        <link
          rel="preload"
          as="image"
          href="/_next/image?url=%2Fprofile.jpg&w=640&q=75"
          imageSrcSet="/_next/image?url=%2Fprofile.jpg&w=390&q=75 390w, /_next/image?url=%2Fprofile.jpg&w=640&q=75 640w, /_next/image?url=%2Fprofile.jpg&w=768&q=75 768w"
          imageSizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 380px"
          fetchPriority="high"
        />
      </head>
      <body>
        <ThemeInitializer />
        <SilkBackground />
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
