import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { siteData } from "@/lib/site-data";
import { getRecruiterFaqJsonLd } from "@/lib/recruiter-faq";
import { homepageContent } from "@/lib/homepage-content";

export function RecruiterFAQ({ pagePath = "/" }) {
  const faqJsonLd = getRecruiterFaqJsonLd(pagePath);

  return (
    <section className="section recruiter-faq" id="recruiter-faq">
      <JsonLd data={faqJsonLd} />
      <div className="container">
        <SectionHeading
          eyebrow={homepageContent.faq.eyebrow}
          title={homepageContent.faq.title}
          description={homepageContent.faq.description}
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
