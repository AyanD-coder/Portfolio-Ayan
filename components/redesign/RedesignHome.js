import Image from "next/image";
import Link from "next/link";
import { HeroVisual } from "@/components/HeroVisual";
import { ProfilePortrait } from "@/components/ProfilePortrait";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { JsonLd } from "@/components/JsonLd";
import { siteData } from "@/lib/site-data";
import { homepageContent as copy } from "@/lib/homepage-content";
import { getContactEmailHref } from "@/lib/contact";
import { getRecruiterFaqJsonLd } from "@/lib/recruiter-faq";
import { getProjectExternalLinks } from "@/lib/project-service";
import StoryMotion from "./StoryMotion";
import styles from "./RedesignHome.module.css";

const number = (index) => String(index + 1).padStart(2, "0");

function SectionHeading({ index, eyebrow, title, description }) {
  return (
    <header className={styles.sectionHeading}>
      <p className={styles.eyebrow}>
        <span className={styles.sectionIndex} aria-hidden="true">{index}</span>
        {eyebrow}
      </p>
      <h2>{title}</h2>
      {description ? <p className={styles.sectionDescription}>{description}</p> : null}
    </header>
  );
}

function Hero() {
  return (
    <section className={styles.hero} id="top" data-story-hero>
      <div className={styles.heroGrid} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.heroLayout}>
          <div className={styles.heroCopy}>
            <p className={styles.availability}>
              <span aria-hidden="true" />{siteData.availability.status}
            </p>
            <p className={styles.heroName}>{siteData.name}</p>
            <p className={styles.eyebrow}>{siteData.role}</p>
            <h1 className={styles.heroTitle}>{copy.hero.title}</h1>
            <p className={styles.heroIntro}>{copy.hero.intro}</p>
            <div className={styles.actions}>
              <Link className={styles.primaryAction} href="/projects">{copy.hero.projectsLabel}<span aria-hidden="true">↗</span></Link>
              <a className={styles.secondaryAction} href={siteData.cvPath} download>{copy.hero.cvLabel}<span aria-hidden="true">↓</span></a>
              <Link className={styles.textAction} href="/contact">{copy.hero.contactLabel}<span aria-hidden="true">↗</span></Link>
            </div>
            <ul className={styles.roleList} aria-label="Target roles">
              {siteData.targetRoles.map((role) => <li key={role}>{role}</li>)}
            </ul>
          </div>
          <div className={styles.robotFrame}>
            <div className={styles.robotOrbit} aria-hidden="true" />
            <p className={styles.frameLabel} aria-hidden="true"><span>01 / Product engineering</span><span>LIVE</span></p>
            <HeroVisual scene={copy.hero.scene} />
            <p className={styles.frameCaption} aria-hidden="true">From interface to infrastructure.</p>
          </div>
        </div>
        <div className={styles.proofStrip}>
          {siteData.stats.map((stat) => (
            <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>
          ))}
          <a className={styles.scrollCue} href="#projects">Explore the work<span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </section>
  );
}

function ProjectChapter({ project, index, total }) {
  const links = getProjectExternalLinks(project);
  const badge = project.badge || (project.featured ? copy.projects.featuredLabel : null);

  return (
    <article className={styles.projectChapter} data-story-chapter>
      <div className={styles.projectMediaColumn}>
        <div className={styles.projectMedia}>
          <div className={styles.mediaToolbar}>
            <span><span className={styles.statusDot} aria-hidden="true" />{project.category}</span>
            <span aria-hidden="true">{number(index)} / {String(total).padStart(2, "0")}</span>
          </div>
          {project.image ? (
            <div className={styles.projectImageFrame}>
              <Image
                src={project.image.src}
                alt={project.image.alt}
                width={project.image.width}
                height={project.image.height}
                sizes="(min-width: 1280px) 620px, (min-width: 900px) 50vw, calc(100vw - 2rem)"
                className={styles.projectImage}
              />
            </div>
          ) : null}
          <div className={styles.mediaCaption}>
            <span>{project.image?.kind === "concept" ? copy.projects.conceptLabel : project.title}</span>
            <span>{project.year}</span>
          </div>
          <div className={styles.chapterProgress} aria-hidden="true"><span /></div>
        </div>
      </div>
      <div className={styles.projectCopy}>
        <div className={styles.projectMeta}>
          <span className={styles.chapterNumber} aria-hidden="true">{number(index)}</span>
          {badge ? <span className={styles.badge}>{badge}</span> : null}
        </div>
        <h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3>
        {project.role ? <p className={styles.projectRole}>{project.role}</p> : null}
        <p className={styles.projectDescription}>{project.description}</p>
        {project.impact?.length ? (
          <dl className={styles.projectImpact} aria-label={`${project.title} project impact`}>
            {project.impact.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
          </dl>
        ) : null}
        {project.capabilities?.length ? (
          <div className={styles.projectCapabilities} aria-label={`${project.title} platform capabilities`}>
            {project.capabilities.map((capability) => <div key={capability.title}><h4>{capability.title}</h4><p>{capability.summary}</p></div>)}
          </div>
        ) : null}
        <p className={styles.projectStack}>{project.techStack.join(" | ")}</p>
        <ul className={styles.highlights}>
          {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>
        <div className={styles.actions}>
          <Link className={styles.primaryAction} href={`/projects/${project.slug}`} aria-label={`Read the ${project.title} case study`}>{copy.projects.caseStudyLabel}<span aria-hidden="true">↗</span></Link>
          {links.map((link) => <a className={styles.textAction} href={link.url} target="_blank" rel="noopener noreferrer" key={`${link.label}-${link.url}`}>{link.label}<span aria-hidden="true">↗</span></a>)}
        </div>
      </div>
    </article>
  );
}

function Projects({ projects }) {
  return (
    <section className={`${styles.section} ${styles.projects}`} id="projects" data-story-scene="projects">
      <div className={styles.container}>
        <SectionHeading index="01" {...copy.projects} />
        <div className={styles.projectIndex} aria-hidden="true">
          {projects.map((project, index) => <span data-story-indicator key={project.slug}><b>{number(index)}</b>{project.title}</span>)}
        </div>
        <div className={styles.projectChapters}>
          {projects.map((project, index) => <ProjectChapter project={project} index={index} total={projects.length} key={project.slug} />)}
        </div>
        <Link className={styles.secondaryAction} href="/projects">{copy.projects.allProjectsLabel}<span aria-hidden="true">↗</span></Link>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section className={`${styles.section} ${styles.capabilities}`} id="skills">
      <div className={styles.container}>
        <SectionHeading index="02" {...copy.skills} />
        <div className={styles.skillsGrid}>
          {siteData.skills.map((group, index) => (
            <article className={styles.skillCard} key={group.title}>
              <span className={styles.itemIndex} aria-hidden="true">{number(index)}</span>
              <h3>{group.title}</h3><p>{group.summary}</p>
              <ul className={styles.tags}>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
              <p className={styles.evidence}>{group.evidence}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className={`${styles.section} ${styles.experience}`} id="experience-and-education">
      <div className={`${styles.container} ${styles.splitSection}`}>
        <SectionHeading index="03" {...copy.experience} />
        <ol className={styles.timeline}>
          {siteData.education.map((item, index) => (
            <li key={item.title}><span className={styles.timelineDot} aria-hidden="true" /><span className={styles.itemIndex} aria-hidden="true">{number(index)}</span><h3>{item.title}</h3><p className={styles.institution}>{item.institution}</p><p>{item.meta}</p></li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Workflow() {
  const workflow = siteData.aiWorkflow;
  return (
    <section className={`${styles.section} ${styles.workflow}`} id="ai-workflow" data-story-scene="workflow">
      <div className={styles.container}>
        <SectionHeading index="04" eyebrow={copy.workflow.eyebrow} title={workflow.title} description={workflow.description} />
        <div className={styles.workflowLayout}>
          <div className={styles.workflowConsole}>
            <p className={styles.consoleLabel}><span className={styles.statusDot} aria-hidden="true" />Engineering process</p>
            <div className={styles.workflowIndicatorList} aria-hidden="true">
              {workflow.practices.map((practice) => <div data-story-indicator key={practice.step}><span>{practice.step}</span><strong>{practice.title}</strong><span className={styles.indicatorMark}>↗</span></div>)}
            </div>
            <div className={styles.workflowProgress} aria-hidden="true"><span /></div>
            <p className={styles.consoleNote}>Human judgment. AI-assisted execution.</p>
          </div>
          <div className={styles.workflowSteps}>
            {workflow.practices.map((practice) => (
              <article className={styles.workflowStep} data-story-chapter key={practice.step}><span className={styles.stepNumber} aria-hidden="true">{practice.step}</span><div><h3>{practice.title}</h3><p>{practice.description}</p></div></article>
            ))}
          </div>
        </div>
        <div className={styles.toolGroups}>
          {workflow.toolGroups.map((group) => <div key={group.title}><h3>{group.title}</h3><ul className={styles.tags}>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></div>)}
        </div>
        {workflow.productEvidence ? <p className={styles.workflowEvidence}>{workflow.productEvidence}</p> : null}
        <p className={styles.workflowNote}>{copy.workflow.note}</p>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className={`${styles.section} ${styles.about}`} id="about">
      <div className={styles.container}>
        <SectionHeading index="05" {...copy.about} />
        <div className={styles.aboutLayout}>
          <figure className={styles.portrait}>
            <div className={styles.portraitImage}><ProfilePortrait /></div>
            <figcaption><strong>{siteData.name}</strong><span>{siteData.role}{copy.about.locationSuffix}</span></figcaption>
          </figure>
          <div className={styles.aboutCopy}>
            <p className={styles.eyebrow}>{copy.about.approachLabel}</p>
            <h3>{copy.about.approachTitle}</h3>
            <p className={styles.aboutSummary}>{siteData.summary}</p>
            <p className={styles.eyebrow}>{copy.about.strengthsLabel}</p>
            <ol className={styles.strengths}>
              {siteData.strengths.map((strength, index) => <li key={strength}><span aria-hidden="true">{number(index)}</span><strong>{strength}</strong></li>)}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className={`${styles.section} ${styles.faq}`} id="recruiter-faq">
      <JsonLd data={getRecruiterFaqJsonLd()} />
      <div className={`${styles.container} ${styles.splitSection}`}>
        <SectionHeading index="06" {...copy.faq} />
        <div className={styles.faqList}>
          {siteData.recruiterFaq.map((item, index) => <article key={item.question}><span className={styles.itemIndex} aria-hidden="true">{number(index)}</span><div><h3>{item.question}</h3><p>{item.answer}</p></div></article>)}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const emailHref = getContactEmailHref();
  return (
    <section className={`${styles.section} ${styles.contact}`} id="contact">
      <div className={styles.container}>
        <SectionHeading index="07" {...copy.contact} />
        <div className={styles.contactLayout}>
          <div className={styles.contactPitch}>
            <p className={styles.availability}><span aria-hidden="true" />{siteData.availability.status}</p>
            <h3>{copy.contact.pitchTitle}</h3>
            <p>{copy.contact.pitchIntro}{siteData.availability.workMode.toLowerCase()}{copy.contact.pitchOutro}</p>
            <ul className={styles.roleList}>{siteData.targetRoles.map((role) => <li key={role}>{role}</li>)}</ul>
            <div className={styles.actions}>
              <a className={styles.primaryAction} href={emailHref}>{copy.contact.emailLabel}<span aria-hidden="true">↗</span></a>
              <a className={styles.secondaryAction} href={siteData.cvPath} target="_blank" rel="noopener noreferrer">{copy.contact.resumeLabel}<span aria-hidden="true">↗</span></a>
            </div>
            <p className={styles.responseNote}>{siteData.availability.response}</p>
          </div>
          <address className={styles.contactCard}>
            <a className={styles.contactRow} href={emailHref}><span>{copy.contact.emailDetailLabel}</span><strong>{siteData.contact.email}</strong><b aria-hidden="true">↗</b></a>
            <div className={styles.copyRow}><span>{copy.contact.copyPrompt}</span><CopyEmailButton email={siteData.contact.email} /></div>
            <a className={styles.contactRow} href={siteData.contact.linkedin} target="_blank" rel="noreferrer"><span>{copy.contact.linkedInLabel}</span><strong>{copy.contact.linkedInDescription}</strong><b aria-hidden="true">↗</b></a>
            <a className={styles.contactRow} href={siteData.contact.gitHub} target="_blank" rel="noreferrer"><span>{copy.contact.gitHubLabel}</span><strong>{copy.contact.gitHubDescription}</strong><b aria-hidden="true">↗</b></a>
            <a className={styles.contactRow} href={siteData.cvPath} download><span>{copy.contact.resumeDetailLabel}</span><strong>{copy.contact.downloadLabel}</strong><b aria-hidden="true">↓</b></a>
            <div className={styles.contactRow}><span>{copy.contact.locationLabel}</span><strong>{siteData.availability.location}</strong></div>
          </address>
        </div>
      </div>
    </section>
  );
}

export function RedesignHome({ projects, config }) {
  return (
    <main id="main-content" className={styles.root} data-design="redesign" data-story="static" data-motion="static">
      <Hero />
      <Projects projects={projects} />
      <Capabilities />
      <Experience />
      <Workflow />
      <About />
      <FAQ />
      <Contact />
      {config.scrollStoryEnabled ? <StoryMotion scrollStoryEnabled={config.scrollStoryEnabled} advancedAnimationEnabled={config.advancedAnimationEnabled} /> : null}
    </main>
  );
}
