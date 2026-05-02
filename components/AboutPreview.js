import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";

export function AboutPreview({ summary, strengths, detailed = false, showImage = false }) {
  return (
    <section className="section alt" id="about">
      <div className="container">
        <SectionHeading
          eyebrow="About Me"
          title="Strong fundamentals, practical execution, and a habit of building useful things."
          description="A portfolio shaped by hands-on projects across web interfaces, Python automation, and embedded systems."
        />
        <div className="about-grid">
          <div className="about-panel fade-up fade-delay-1">
            <p>{summary}</p>
            {detailed ? (
              <p style={{ marginTop: "1rem" }}>
                The strongest thread across these projects is problem-solving with constraints: making interfaces responsive, making automation practical, and making hardware systems safe and readable.
              </p>
            ) : null}
          </div>
         
          <div className="about-panel fade-up fade-delay-2">
            <p className="eyebrow">Strengths</p>
            <div className="strength-list">
              {strengths.map((strength) => (
                <span className="strength-item" key={strength}>
                  {strength}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
