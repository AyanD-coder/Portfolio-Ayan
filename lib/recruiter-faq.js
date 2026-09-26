import { siteData } from "@/lib/site-data";
import { getSiteUrl } from "@/lib/site-url";

export function getRecruiterFaqJsonLd(pagePath = "/") {
  const siteUrl = getSiteUrl();
  const pageUrl = new URL(pagePath, `${siteUrl}/`).toString();

  return {
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
}
