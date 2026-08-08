"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const revealSelector = "main .section:not(.hero) .fade-up";

export function MotionInitializer() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll(revealSelector));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || !elements.length || !("IntersectionObserver" in window)) {
      root.classList.remove("motion-ready");
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const revealBoundary = window.innerHeight * 0.94;
    const positions = elements.map((element) => element.getBoundingClientRect().top);

    elements.forEach((element, index) => {
      const inlineDelay = element.style.animationDelay;
      if (inlineDelay) element.style.setProperty("--reveal-delay", inlineDelay);
      element.classList.toggle("is-visible", positions[index] <= revealBoundary);
    });

    root.classList.add("motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );

    elements.forEach((element) => {
      if (!element.classList.contains("is-visible")) observer.observe(element);
    });

    return () => {
      observer.disconnect();
      root.classList.remove("motion-ready");
    };
  }, [pathname]);

  return null;
}
