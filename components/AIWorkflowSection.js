import { SectionHeading } from "@/components/SectionHeading";

export function AIWorkflowSection({ workflow }) {
  return (
    <section className="section ai-workflow-section" id="ai-workflow">
      <div className="container">
        <SectionHeading
          eyebrow="AI Workflow"
          title={workflow.title}
          description={workflow.description}
        />
        <div className="ai-tools-grid">
          {workflow.toolGroups.map((group, index) => (
            <article
              className="ai-tool-card fade-up gentle-section-reveal"
              key={group.title}
              style={{ "--reveal-delay": `${index * 0.075}s` }}
            >
              <span className="ai-card-index">{String(index + 1).padStart(2, "0")}</span>
              <h3>{group.title}</h3>
              <div className="ai-tool-list">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="ai-practice-grid">
          {workflow.practices.map((practice, index) => (
            <article className="ai-practice-card fade-up" key={practice.step} style={{ animationDelay: `${index * 0.08}s` }}>
              <span>{practice.step}</span>
              <h3>{practice.title}</h3>
              <p>{practice.description}</p>
            </article>
          ))}
        </div>
        {workflow.productEvidence ? (
          <p className="ai-product-evidence">{workflow.productEvidence}</p>
        ) : null}
        <p className="ai-workflow-note">
          AI can accelerate a first implementation; code ownership, review, testing, and refinement make it ready to ship.
        </p>
      </div>
    </section>
  );
}
