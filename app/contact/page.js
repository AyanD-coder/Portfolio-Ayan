import { ContactSection } from "@/components/ContactSection";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Ayan Dutta for software, web, or IoT opportunities.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Ayan Dutta",
    description: "Reach out to Ayan Dutta for software roles, frontend work, web development, and UI design collaborations.",
    url: "/contact",
    images: ["/profile.jpg"],
  },
};

export default function ContactPage() {
  return (
    <main className="inner-page">
      <section className="page-hero section">
        <div className="container">
          <p className="eyebrow">Contact</p>
          <h1>Let&apos;s build something practical and thoughtful together.</h1>
          <p className="section-copy">
            Reach out for software roles, frontend work or Web development and Ui design.
          </p>
        </div>
      </section>
      <ContactSection detailed />
    </main>
  );
}
