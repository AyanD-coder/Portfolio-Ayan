import "server-only";
import { resolveDesignConfig } from "./design-config.mjs";

export function getDesignConfig() {
  return resolveDesignConfig({
    DESIGN_MODE: process.env.DESIGN_MODE,
    SCROLL_STORY_ENABLED: process.env.SCROLL_STORY_ENABLED,
    ADVANCED_ANIMATION_ENABLED: process.env.ADVANCED_ANIMATION_ENABLED,
  });
}
