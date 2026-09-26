import test from "node:test";
import assert from "node:assert/strict";
import { resolveDesignConfig } from "../lib/design-config.mjs";

const originalConfig = {
  mode: "original",
  scrollStoryEnabled: false,
  advancedAnimationEnabled: false,
};

test("missing and invalid design modes safely select the original presentation", () => {
  assert.deepEqual(resolveDesignConfig(), originalConfig);
  for (const mode of ["original", "", "new", "REDESIGN", " redesign "]) {
    assert.deepEqual(resolveDesignConfig({
      DESIGN_MODE: mode,
      SCROLL_STORY_ENABLED: "true",
      ADVANCED_ANIMATION_ENABLED: "true",
    }), originalConfig);
  }
});

test("redesign enables its two enhancement layers by default", () => {
  assert.deepEqual(resolveDesignConfig({ DESIGN_MODE: "redesign" }), {
    mode: "redesign",
    scrollStoryEnabled: true,
    advancedAnimationEnabled: true,
  });
});

test("disabling storytelling also disables advanced animation", () => {
  for (const advanced of [undefined, "true", "false"]) {
    assert.deepEqual(resolveDesignConfig({
      DESIGN_MODE: "redesign",
      SCROLL_STORY_ENABLED: "false",
      ADVANCED_ANIMATION_ENABLED: advanced,
    }), {
      mode: "redesign",
      scrollStoryEnabled: false,
      advancedAnimationEnabled: false,
    });
  }
});

test("advanced animation can be disabled while keeping storytelling", () => {
  assert.deepEqual(resolveDesignConfig({
    DESIGN_MODE: "redesign",
    SCROLL_STORY_ENABLED: "true",
    ADVANCED_ANIMATION_ENABLED: "false",
  }), {
    mode: "redesign",
    scrollStoryEnabled: true,
    advancedAnimationEnabled: false,
  });
});

test("invalid flags disable the affected layer instead of enabling it", () => {
  for (const invalid of ["", "yes", "1", "TRUE", " true ", null, true]) {
    assert.deepEqual(resolveDesignConfig({
      DESIGN_MODE: "redesign",
      SCROLL_STORY_ENABLED: invalid,
    }), {
      mode: "redesign",
      scrollStoryEnabled: false,
      advancedAnimationEnabled: false,
    });
    assert.deepEqual(resolveDesignConfig({
      DESIGN_MODE: "redesign",
      ADVANCED_ANIMATION_ENABLED: invalid,
    }), {
      mode: "redesign",
      scrollStoryEnabled: true,
      advancedAnimationEnabled: false,
    });
  }
});
