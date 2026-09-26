function isEnabled(value) {
  return value === undefined || value === "true";
}

export function resolveDesignConfig(env = {}) {
  const mode = env.DESIGN_MODE === "redesign" ? "redesign" : "original";
  const scrollStoryEnabled = mode === "redesign" && isEnabled(env.SCROLL_STORY_ENABLED);
  const advancedAnimationEnabled = scrollStoryEnabled && isEnabled(env.ADVANCED_ANIMATION_ENABLED);

  return { mode, scrollStoryEnabled, advancedAnimationEnabled };
}
