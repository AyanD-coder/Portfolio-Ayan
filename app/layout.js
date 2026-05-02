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
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  keywords: [
    "Ayan Dutta",
    "portfolio",
    "Next.js portfolio",
    "Electronics and Communication Engineering",
    "JavaScript developer",
    "IoT projects",
  ],
  authors: [{ name: siteData.name }],
  creator: siteData.name,
  openGraph: {
    title: `${siteData.name} | Portfolio`,
    description: siteData.tagline,
    type: "website",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteData.name} | Portfolio`,
    description: siteData.tagline,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteData.name,
  jobTitle: siteData.role,
  description: siteData.summary,
  email: siteData.contact.email,
  telephone: siteData.contact.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteData.contact.location,
    addressCountry: "IN",
  },
  knowsAbout: siteData.skills.flatMap((group) => group.items),
  alumniOf: siteData.education[0]?.institution,
  url: siteUrl,
  sameAs: [siteData.contact.linkedin, siteData.contact.gitHub],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeInitializer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
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
