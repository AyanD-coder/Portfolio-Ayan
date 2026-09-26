import Link from "next/link";
import { siteData } from "@/lib/site-data";
import { HeroVisual } from "@/components/HeroVisual";
import { homepageContent } from "@/lib/homepage-content";

export function Hero() {
  return (
    <section className="hero section" id="top">
      <div className="container hero-editorial-grid">
        <div className="hero-copy fade-up">
          <div className="availability-pill">
            <span aria-hidden="true" />
            {siteData.availability.status}
          </div>
          <p className="hero-name">{siteData.name}</p>
          <p className="eyebrow">{siteData.role}</p>
          <h1>{homepageContent.hero.title}</h1>
          <p className="hero-intro">
            {homepageContent.hero.intro}
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href="/projects">
              {homepageContent.hero.projectsLabel}
            </Link>
            <a className="ghost-button" href={siteData.cvPath} download>
              {homepageContent.hero.cvLabel}
            </a>
            <Link className="text-link" href="/contact">
              {homepageContent.hero.contactLabel}
            </Link>
          </div>
          <ul className="hero-role-list" aria-label="Target roles">
            {siteData.targetRoles.map((role) => (
              <li className="meta-chip" key={role}>
                {role}
              </li>
            ))}
          </ul>
          <div className="hero-proof-grid">
            {siteData.stats.map((stat) => (
              <div className="hero-proof-item" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <HeroVisual scene={homepageContent.hero.scene} />
      </div>
    </section>
  );
}
