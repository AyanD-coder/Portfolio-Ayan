"use client";

import { useEffect } from "react";
import { installStoryMotion } from "@/lib/story-motion.mjs";

export default function StoryMotion({ scrollStoryEnabled, advancedAnimationEnabled }) {
  useEffect(() => installStoryMotion(document.getElementById("main-content"), {
    scrollStoryEnabled,
    advancedAnimationEnabled,
  }, window), [scrollStoryEnabled, advancedAnimationEnabled]);

  return null;
}
