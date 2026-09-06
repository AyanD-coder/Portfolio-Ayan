import Link from "next/link";
import { siteData } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <p>{siteData.name}</p>
          <p>{siteData.role} · {siteData.availability.location}</p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation and contact links">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/contact">Contact</Link>
          <a href={`mailto:${siteData.contact.email}`}>Email</a>
          <a href={siteData.contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={siteData.contact.gitHub} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={siteData.cvPath} target="_blank" rel="noopener noreferrer">Resume</a>
        </nav>
      </div>
    </footer>
  );
}
