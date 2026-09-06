"use client";

import { InteractiveRobotSpline } from "@/components/InteractiveRobotSpline";

export function HeroVisual({ scene }) {
  return (
    <div className="hero-visual fade-up fade-delay-1">
      <div className="hero-canvas-positioner">
        <div className="hero-canvas-shell">
          <div className="hero-canvas-stage">
            <InteractiveRobotSpline
              scene={scene}
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
  );
}
