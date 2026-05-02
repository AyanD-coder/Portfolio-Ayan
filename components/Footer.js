import Link from "next/link";
import { siteData } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <p>{siteData.name}</p>
          <p>{siteData.role}</p>
        </div>
        <div className="footer-links">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
