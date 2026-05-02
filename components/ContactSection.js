"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { siteData } from "@/lib/site-data";

export function ContactSection({ detailed = false }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="section" id="contact" suppressHydrationWarning>
      <div className="container">
        <SectionHeading
          eyebrow="Contact"
          title="Interested in software, web, or IoT opportunities?"
          description="Use the direct contact details below or the quick form UI to start a conversation."
        />
        <div className="contact-grid">
          <div className="contact-card fade-up fade-delay-1">
            <h3>Direct details</h3>
            <p>Email: <a href={`mailto:${siteData.contact.email}`}>{siteData.contact.email}</a></p>
            <p>Phone: <a href={`tel:${siteData.contact.phone}`}>{siteData.contact.phone}</a></p>
            <p>Location: {siteData.contact.location}</p>
            <div className="contact-actions">
              <a className="chip-link" href={`mailto:${siteData.contact.email}`}>
                Send Email
              </a>
              <a className="chip-link" href="/ayan-dutta-cv-2026.pdf" download>
                Download CV
              </a>
              <a className="chip-link" href={siteData.contact.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
            <div className="contact-actions">
              <a className="meta-chip" href={siteData.contact.linkedin} target="_blank" rel="noreferrer">
                LinkedIn Profile
              </a>
              <a className="meta-chip" href={siteData.contact.gitHub} target="_blank" rel="noreferrer">
                GitHub Profile
              </a>
            </div>
            {detailed ? (
              <p style={{ marginTop: "1rem" }}>
                LinkedIn and GitHub are both available here, showing professional networking and code work.
              </p>
            ) : null}
          </div>
          <form className="contact-form fade-up fade-delay-2" suppressHydrationWarning onSubmit={handleSubmit}>
            <h3>Quick message</h3>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input suppressHydrationWarning id="name" name="name" type="text" placeholder="Your name" autoComplete="name" required />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input suppressHydrationWarning id="email" name="email" type="email" placeholder="your@email.com" autoComplete="email" required />
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea suppressHydrationWarning id="message" name="message" rows="5" placeholder="Tell me about the role or project." required></textarea>
            </div>
            <button suppressHydrationWarning type="submit" className="primary-button">
              {submitted ? "Message Prepared" : "Send Message"}
            </button>
            <p className="form-note">
              {submitted
                ? "This demo form is wired for UI feedback only. You can connect it to an email service or API endpoint later."
                : "Form submission is intentionally UI-only for now, which keeps the static pages lightweight and fast."}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
