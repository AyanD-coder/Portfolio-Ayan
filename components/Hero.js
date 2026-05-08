import Link from "next/link";
import Image from "next/image";
import { siteData } from "@/lib/site-data";
import { InteractiveRobotSpline } from "@/components/InteractiveRobotSpline";

export function Hero() {
  return (
    <section className="hero section" id="top">
      <div className="container hero-grid">
        <div className="hero-copy glass-panel fade-up" style={{ display: "flex", flexDirection: "column" }}>
          <p className="eyebrow">{siteData.role}</p>
          <h1>{siteData.name}</h1>
          <p>{siteData.tagline}</p>
          <div className="hero-actions">
            <a className="primary-button" href="/ayan-dutta-cv-2026.pdf" download>
              Download CV
            </a>
            <Link className="primary-button" href="/contact">
              Contact Me
            </Link>
          </div>
          <div className="hero-meta">
            <span className="meta-chip">{siteData.contact.location}</span>
            <span className="meta-chip">Open to entry-level roles</span>
            <span className="meta-chip">Software, Web, IoT</span>
          </div>
          <div style={{ marginTop: "2rem" }}>
            <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>Core Focus</p>
            <div className="tag-list">
              {siteData.skills.slice(0, 4).map((skill) => (
                <span className="tag" key={skill.title}>
                  {skill.title}
                </span>
              ))}
            </div>
          </div>
          <div style={{ 
            marginTop: "auto", 
            paddingTop: "2rem", 
            height: "clamp(280px, 60vw, 400px)", 
            position: "relative", 
            borderRadius: "12px", 
            opacity: 0.9, 
            overflow: "hidden" 
          }}>
            <div style={{ position: "absolute", top: "1rem", left: 0, right: 0, bottom: "-50px" }}>
              <InteractiveRobotSpline 
                scene="https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode" 
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
        <aside className="hero-side fade-up fade-delay-1">
          <div className="profile-image-wrapper">
            <Image
              src="/profile.jpg"
              alt="Ayan Dutta"
              width={400}
              height={500}
              priority
              quality={90}
              className="profile-image"
            />
          </div>
          <div className="about-panel">
            <p className="eyebrow">Snapshot</p>
            <p>B.Tech graduate in Electronics and Communication Engineering with hands-on experience in modern web development, DSA, SQL, and Arduino-based IoT systems. Currently working as a Software Engineer Intern at Yoforex, building responsive web applications, optimizing UI/UX, and exploring AI-assisted “vibe coding” workflows to accelerate development and creativity. Passionate about creating scalable digital experiences through clean code, modern technologies, and continuous learning.
            </p>
            <div className="tag-list" style={{ marginTop: "1rem" }}>
              {siteData.skills.slice(0, 4).map((skill) => (
                <span className="tag" key={skill.title}>
                  {skill.title}
                </span>
              ))}
            </div>
          </div>
          <div className="stat-grid">
            {siteData.stats.map((stat) => (
              <div className="stat-card" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
