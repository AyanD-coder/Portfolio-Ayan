import { ContactSection } from "@/components/ContactSection";

export const metadata = {
  title: "Contact",
  description: "Contact Ayan Dutta about full-stack, frontend, and software engineering opportunities.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Ayan Dutta",
    description: "Contact Ayan Dutta about full-stack, frontend, and software engineering opportunities.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="inner-page">
      <section className="page-hero section page-hero-artwork page-hero-artwork-contact">
        <div className="container">
          <p className="eyebrow">Contact</p>
          <h1>Let&apos;s turn the next product challenge into working software.</h1>
          <p className="section-copy">
            Reach out for full-stack, frontend, or software engineering opportunities where thoughtful implementation and fast learning are valued.
          </p>
        </div>
      </section>
      <ContactSection detailed />
    </main>
  );
}
