import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { siteData } from "@/lib/site-data";
import { getSiteUrl } from "@/lib/site-url";

export function RecruiterFAQ({ pagePath = "/" }) {
  const siteUrl = getSiteUrl();
  const pageUrl = new URL(pagePath, `${siteUrl}/`).toString();
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#recruiter-faq`,
    url: `${pageUrl}#recruiter-faq`,
    mainEntity: siteData.recruiterFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="section recruiter-faq" id="recruiter-faq">
      <JsonLd data={faqJsonLd} />
      <div className="container">
        <SectionHeading
          eyebrow="Recruiter FAQ"
          title="Quick answers for hiring teams."
          description="Role fit, production experience, technical strengths, availability, and the fastest way to get in touch."
        />
        <div className="recruiter-faq-grid">
          {siteData.recruiterFaq.map((item, index) => (
            <article className="recruiter-faq-item fade-up" key={item.question}>
              <span className="faq-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
