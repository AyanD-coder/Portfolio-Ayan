import Link from "next/link";
import { siteData } from "@/lib/site-data";
import { HeroVisual } from "@/components/HeroVisual";

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
          <h1>Full-stack software engineer building production web, API, and desktop products.</h1>
          <p className="hero-intro">
            I&apos;m Ayan Dutta, a Kolkata-based Software Engineer at YoForex. I work across React and TypeScript interfaces, Go and FastAPI services, PostgreSQL data, and Electron desktop workflows.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href="/projects">
              View Projects
            </Link>
            <a className="ghost-button" href={siteData.cvPath} download>
              Download CV
            </a>
            <Link className="text-link" href="/contact">
              Contact Me
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

        <HeroVisual scene="https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode" />
      </div>
    </section>
  );
}
