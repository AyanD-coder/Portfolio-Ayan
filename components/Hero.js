import Link from "next/link";
import { siteData } from "@/lib/site-data";
import { InteractiveRobotSpline } from "@/components/InteractiveRobotSpline";

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
          <h1>Building practical products from interface to implementation.</h1>
          <p className="hero-intro">{siteData.tagline}</p>
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
          <div className="hero-role-list" aria-label="Target roles">
            {siteData.targetRoles.map((role) => (
              <span className="meta-chip" key={role}>
                {role}
              </span>
            ))}
          </div>
          <div className="hero-proof-grid">
            {siteData.stats.map((stat) => (
              <div className="hero-proof-item" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual fade-up fade-delay-1">
          <div className="hero-canvas-positioner">
            <div style={{ marginTop: "auto", paddingTop: "2rem", height: "400px", position: "relative", borderRadius: "12px", opacity: 0.9, overflow: "hidden" }}>
              <div style={{ position: "absolute", top: "2rem", left: 0, right: 0, bottom: "-75px" }}>
                <InteractiveRobotSpline
                  scene="https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </div>
          <div className="hero-visual-note">
            <span className="visual-note-index">01</span>
            <div>
              <strong>Product builder</strong>
              <p>Web, APIs, desktop workflows, and AI-assisted delivery.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
