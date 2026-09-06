import { ContactSection } from "@/components/ContactSection";
import { JsonLd } from "@/components/JsonLd";
import { RecruiterFAQ } from "@/components/RecruiterFAQ";
import { createPageMetadata } from "@/lib/metadata";
import { siteData } from "@/lib/site-data";
import { getSiteUrl } from "@/lib/site-url";

export const metadata = createPageMetadata({
  title: "Contact",
  description: "Contact Ayan Dutta, a Kolkata-based full-stack Software Engineer, about frontend, full-stack, and software engineering opportunities.",
  path: "/contact",
});

export default function ContactPage() {
  const siteUrl = getSiteUrl();
  const contactPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${siteUrl}/contact#webpage`,
    url: `${siteUrl}/contact`,
    name: `Contact ${siteData.name}`,
    description:
      "Recruiter contact details and current role availability for Ayan Dutta.",
    inLanguage: "en-IN",
    dateModified: siteData.lastUpdated,
    isPartOf: {
      "@id": `${siteUrl}/#website`,
    },
    mainEntity: {
      "@id": `${siteUrl}/#person`,
    },
  };

  return (
    <main className="inner-page" id="main-content">
      <JsonLd data={contactPageJsonLd} />
      <section className="page-hero section page-hero-artwork page-hero-artwork-contact">
        <div className="container">
          <p className="eyebrow">Contact</p>
          <h1>Contact Ayan Dutta about software engineering opportunities.</h1>
          <p className="section-copy">
            Reach out for full-stack, frontend, or software engineering opportunities where thoughtful implementation and fast learning are valued.
          </p>
        </div>
      </section>
      <ContactSection detailed />
      <RecruiterFAQ pagePath="/contact" />
    </main>
  );
}
