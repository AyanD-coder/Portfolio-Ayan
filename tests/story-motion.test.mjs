import assert from "node:assert/strict";
import test from "node:test";
import { installStoryMotion } from "../lib/story-motion.mjs";

class Events {
  listeners = new Map();
  addEventListener(type, callback) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type).add(callback);
  }
  removeEventListener(type, callback) { this.listeners.get(type)?.delete(callback); }
  emit(type) { for (const callback of this.listeners.get(type) || []) callback(); }
  count(type) { return this.listeners.get(type)?.size || 0; }
}

class Style {
  values = new Map();
  failProperty = null;
  failures = 0;
  setProperty(name, value) {
    if (name === this.failProperty) {
      this.failures += 1;
      throw new Error("Simulated unsupported enhancement");
    }
    this.values.set(name, value);
  }
  removeProperty(name) { this.values.delete(name); }
  getPropertyValue(name) { return this.values.get(name) || ""; }
}

class Element extends Events {
  dataset = {};
  style = new Style();
  children = [];
  constructor(browser, top = 0, height = 1) {
    super();
    this.browser = browser;
    this.top = top;
    this.height = height;
  }
  get firstElementChild() { return this.children[0]; }
  getBoundingClientRect() { return { top: this.top - this.browser.scrollY, height: this.height }; }
  querySelectorAll(selector) {
    const property = {
      "[data-story-scene]": "storyScene",
      "[data-story-chapter]": "storyChapter",
      "[data-story-indicator]": "storyIndicator",
      "[data-story-hero]": "storyHero",
    }[selector];
    return this.children.flatMap((child) => [
      ...(property in child.dataset ? [child] : []), ...child.querySelectorAll(selector),
    ]);
  }
  querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
}

function fixture() {
  const browser = new Events();
  browser.scrollY = 0;
  browser.innerHeight = 800;
  browser.document = new Events();
  browser.document.hidden = false;
  const connection = new Events();
  connection.saveData = false;
  connection.effectiveType = "4g";
  browser.navigator = { connection };
  const desktop = Object.assign(new Events(), { matches: true });
  const reduced = Object.assign(new Events(), { matches: false });
  const coarse = Object.assign(new Events(), { matches: false });
  browser.matchMedia = (query) => query.includes("min-width") ? desktop :
    query.includes("reduced-motion") ? reduced : coarse;

  const frames = new Map();
  let nextFrame = 0;
  browser.requestAnimationFrame = (callback) => {
    frames.set(++nextFrame, callback);
    return nextFrame;
  };
  browser.cancelAnimationFrame = (id) => frames.delete(id);
  const flush = () => {
    const pending = [...frames.values()];
    frames.clear();
    for (const callback of pending) callback();
  };
  const observers = [];
  browser.IntersectionObserver = class {
    targets = [];
    disconnected = false;
    constructor(callback) { this.callback = callback; observers.push(this); }
    observe(element) { this.targets.push(element); }
    disconnect() { this.disconnected = true; }
    emit(element, isIntersecting) { this.callback([{ target: element, isIntersecting }]); }
  };
  const resizers = [];
  browser.ResizeObserver = class {
    disconnected = false;
    constructor(callback) { this.callback = callback; resizers.push(this); }
    observe() {}
    disconnect() { this.disconnected = true; }
  };

  const root = new Element(browser, 0, 4000);
  root.dataset.design = "redesign";
  const hero = new Element(browser, 0, 800);
  hero.dataset.storyHero = "";
  const scene = new Element(browser, 800, 2400);
  scene.dataset.storyScene = "projects";
  const chapters = [800, 1600, 2400].map((top) => {
    const chapter = new Element(browser, top, 800);
    chapter.dataset.storyChapter = "";
    return chapter;
  });
  const indicators = chapters.map(() => {
    const indicator = new Element(browser);
    indicator.dataset.storyIndicator = "";
    return indicator;
  });
  scene.children = [...indicators, ...chapters];
  root.children = [hero, scene];
  return { browser, root, hero, scene, chapters, indicators, frames, flush,
    desktop, reduced, coarse, connection, observers, resizers };
}

const full = { scrollStoryEnabled: true, advancedAnimationEnabled: true };

test("static content remains the default when disabled, ineligible, or APIs are missing", async (t) => {
  const variants = [
    ["storytelling disabled", (f) => {}, { ...full, scrollStoryEnabled: false }],
    ["small viewport", (f) => { f.desktop.matches = false; }, full],
    ["reduced motion", (f) => { f.reduced.matches = true; }, full],
    ["coarse input", (f) => { f.coarse.matches = true; }, full],
    ["data saver", (f) => { f.connection.saveData = true; }, full],
    ["slow connection", (f) => { f.connection.effectiveType = "2g"; }, full],
    ["missing observer", (f) => { delete f.browser.IntersectionObserver; }, full],
    ["missing animation frames", (f) => { delete f.browser.requestAnimationFrame; }, full],
  ];
  for (const [name, prepare, options] of variants) {
    await t.test(name, () => {
      const f = fixture();
      prepare(f);
      const cleanup = installStoryMotion(f.root, options, f.browser);
      f.flush();
      assert.equal(f.root.dataset.story, "static");
      assert.equal(f.root.dataset.motion, "static");
      assert.equal(f.browser.count("scroll"), 0);
      assert.equal(f.observers.length, 0);
      assert.ok(f.chapters.every((chapter) => chapter.dataset.active === undefined));
      cleanup();
    });
  }
});

test("native scroll updates chapters and progress without changing content order", () => {
  const f = fixture();
  const originalChildren = [...f.scene.children];
  const cleanup = installStoryMotion(f.root, full, f.browser);
  f.flush();
  assert.equal(f.root.dataset.story, "ready");
  assert.equal(f.root.dataset.motion, "advanced");
  f.browser.scrollY = 1500;
  f.observers[0].emit(f.scene, true);
  f.browser.emit("scroll");
  assert.equal(f.frames.size, 1, "scroll events share one pending frame");
  f.flush();
  assert.deepEqual(f.chapters.map((node) => node.dataset.active), ["false", "true", "false"]);
  assert.deepEqual(f.indicators.map((node) => node.dataset.active), ["false", "true", "false"]);
  assert.ok(Number(f.scene.style.getPropertyValue("--scene-progress")) > 0);
  assert.equal(f.chapters[0].style.getPropertyValue("--chapter-progress"), "1.0000");
  assert.equal(f.chapters[2].style.getPropertyValue("--chapter-progress"), "0.0000");
  assert.deepEqual(f.scene.children, originalChildren);
  cleanup();
});

test("live eligibility changes remove effects and unmount cleans observers, frames, and listeners", () => {
  const f = fixture();
  const cleanup = installStoryMotion(f.root, full, f.browser);
  f.flush();
  f.reduced.matches = true;
  f.reduced.emit("change");
  assert.equal(f.root.dataset.story, "static");
  assert.equal(f.root.dataset.motion, "static");
  assert.equal(f.root.style.getPropertyValue("--hero-progress"), "");
  assert.ok(f.chapters.every((chapter) => chapter.dataset.active === undefined));
  assert.equal(f.scene.style.getPropertyValue("--scene-progress"), "");
  assert.equal(f.browser.count("scroll"), 0);
  assert.equal(f.observers[0].disconnected, true);

  f.reduced.matches = false;
  f.reduced.emit("change");
  assert.equal(f.root.dataset.story, "ready");
  assert.equal(f.frames.size, 1);
  cleanup();
  cleanup();
  assert.equal(f.frames.size, 0);
  assert.ok(f.observers.every((observer) => observer.disconnected));
  assert.ok(f.resizers.every((observer) => observer.disconnected));
  for (const [target, event] of [[f.browser, "scroll"], [f.browser, "resize"],
    [f.root, "load"], [f.browser.document, "visibilitychange"], [f.desktop, "change"],
    [f.reduced, "change"], [f.coarse, "change"], [f.connection, "change"]]) {
    assert.equal(target.count(event), 0, `${event} listener cleaned up`);
  }
  const remountCleanup = installStoryMotion(f.root, full, f.browser);
  f.flush();
  assert.equal(f.root.dataset.story, "ready", "effect supports a strict-mode remount");
  assert.equal(f.browser.count("scroll"), 1);
  remountCleanup();
});

test("offscreen and hidden documents do no continuous animation work", () => {
  const f = fixture();
  const cleanup = installStoryMotion(f.root, full, f.browser);
  f.flush();
  f.browser.scrollY = 3900;
  f.observers[0].emit(f.scene, false);
  f.flush();
  f.browser.emit("scroll");
  assert.equal(f.frames.size, 0);

  f.browser.scrollY = 1000;
  f.observers[0].emit(f.scene, true);
  assert.equal(f.frames.size, 1);
  f.browser.document.hidden = true;
  f.browser.document.emit("visibilitychange");
  assert.equal(f.frames.size, 0);
  f.browser.emit("scroll");
  assert.equal(f.frames.size, 0);
  f.browser.document.hidden = false;
  f.browser.document.emit("visibilitychange");
  assert.equal(f.frames.size, 1);
  f.flush();
  assert.equal(f.chapters[0].dataset.active, "true");
  cleanup();
});

test("jumping past the hero finishes its effect before offscreen work stops", () => {
  const f = fixture();
  const cleanup = installStoryMotion(f.root, full, f.browser);
  f.flush();
  f.browser.scrollY = 3900;
  f.browser.emit("scroll");
  assert.equal(f.frames.size, 1);
  f.flush();
  assert.equal(f.root.style.getPropertyValue("--hero-progress"), "1.0000");
  f.browser.emit("scroll");
  assert.equal(f.frames.size, 0);
  f.connection.saveData = true;
  f.connection.emit("change");
  assert.equal(f.root.dataset.story, "static");
  f.connection.saveData = false;
  f.connection.emit("change");
  assert.equal(f.root.dataset.story, "ready");
  cleanup();
});

test("advanced failures retain basic storytelling and are not retried", () => {
  const f = fixture();
  f.root.style.failProperty = "--hero-progress";
  const cleanup = installStoryMotion(f.root, full, f.browser);
  f.flush();
  assert.equal(f.root.dataset.story, "ready");
  assert.equal(f.root.dataset.motion, "static");
  assert.equal(f.root.style.failures, 1);
  f.desktop.matches = false;
  f.desktop.emit("change");
  f.desktop.matches = true;
  f.desktop.emit("change");
  f.flush();
  assert.equal(f.root.dataset.story, "ready");
  assert.equal(f.root.style.failures, 1, "a failed effect is not retried on resize");
  cleanup();
});

test("a failed story update restores static flow and stops attempting enhancement", () => {
  const f = fixture();
  f.chapters[1].style.failProperty = "--chapter-progress";
  const cleanup = installStoryMotion(f.root, full, f.browser);
  assert.doesNotThrow(f.flush);
  assert.equal(f.root.dataset.story, "static");
  assert.equal(f.root.dataset.motion, "static");
  assert.equal(f.browser.count("scroll"), 0);
  assert.ok(f.observers.every((observer) => observer.disconnected));
  assert.ok(f.chapters.every((chapter) => chapter.dataset.active === undefined));
  f.reduced.matches = true;
  f.reduced.emit("change");
  f.reduced.matches = false;
  f.reduced.emit("change");
  assert.equal(f.root.dataset.story, "static");
  assert.equal(f.frames.size, 0);
  assert.equal(f.chapters[1].style.failures, 1);
  cleanup();
});

test("observer setup errors leave a usable static page", () => {
  const f = fixture();
  f.browser.ResizeObserver = class { constructor() { throw new Error("API failed"); } };
  let cleanup;
  assert.doesNotThrow(() => { cleanup = installStoryMotion(f.root, full, f.browser); });
  assert.equal(f.root.dataset.story, "static");
  assert.equal(f.observers[0].disconnected, true);
  assert.equal(f.browser.count("scroll"), 0);
  assert.equal(f.frames.size, 0);
  cleanup();
});

test("basic storytelling works without advanced effects or optional ResizeObserver", () => {
  const f = fixture();
  delete f.browser.ResizeObserver;
  const cleanup = installStoryMotion(f.root, { ...full, advancedAnimationEnabled: false }, f.browser);
  f.flush();
  assert.equal(f.root.dataset.story, "ready");
  assert.equal(f.root.dataset.motion, "static");
  assert.equal(f.root.style.getPropertyValue("--hero-progress"), "");
  f.scene.top = 1000;
  f.chapters[0].top = 1000;
  f.browser.scrollY = 1000;
  f.browser.emit("resize");
  f.flush();
  assert.equal(f.chapters[0].dataset.active, "true");
  assert.ok(Number(f.scene.style.getPropertyValue("--scene-progress")) > 0);
  cleanup();
});
