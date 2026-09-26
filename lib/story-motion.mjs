const clamp = (value) => Math.max(0, Math.min(1, value));
const progressValue = (value) => clamp(value).toFixed(4);
const attempt = (action) => {
  try {
    action();
  } catch {
    // Enhancement cleanup must never interrupt navigation or hide page content.
  }
};

/**
 * Enhance an already readable homepage. All DOM state belongs to this controller,
 * so teardown also works when React mounts an effect twice in development.
 * The optional browser argument allows lifecycle/failure tests without a browser.
 */
export function installStoryMotion(root, options = {}, browser = globalThis) {
  if (!root || root.dataset.design !== "redesign") return () => {};

  const doc = browser.document;
  const cleanups = [];
  let activeCleanups = [];
  let scenes = [];
  let hero = null;
  let heroBounds = null;
  let heroProgress = null;
  let frame = null;
  let needsMeasure = true;
  let active = false;
  let disposed = false;
  let storyFailed = false;
  let advancedFailed = false;
  let advanced = false;
  let viewportHeight = 0;
  const visibleScenes = new Set();

  function resetVisualState() {
    attempt(() => { root.dataset.story = "static"; });
    attempt(() => { root.dataset.motion = "static"; });
    attempt(() => root.style.removeProperty("--hero-progress"));
    for (const scene of scenes) {
      attempt(() => scene.element.style.removeProperty("--scene-progress"));
      for (const node of [...scene.chapters, ...scene.indicators]) {
        attempt(() => { delete node.dataset.active; });
        attempt(() => node.style.removeProperty("--chapter-progress"));
      }
    }
  }

  function cancelFrame() {
    if (frame !== null) attempt(() => browser.cancelAnimationFrame(frame));
    frame = null;
  }

  function deactivate() {
    active = false;
    advanced = false;
    cancelFrame();
    for (const cleanup of activeCleanups.splice(0).reverse()) attempt(cleanup);
    visibleScenes.clear();
    heroBounds = null;
    heroProgress = null;
    resetVisualState();
  }

  function failStory() {
    storyFailed = true;
    deactivate();
  }

  function failAdvanced() {
    advancedFailed = true;
    advanced = false;
    heroProgress = null;
    attempt(() => { root.dataset.motion = "static"; });
    attempt(() => root.style.removeProperty("--hero-progress"));
  }

  function listen(target, event, handler, config, bucket) {
    target.addEventListener(event, handler, config);
    bucket.push(() => target.removeEventListener(event, handler, config));
  }

  function watchMedia(query, handler) {
    if (typeof query.addEventListener === "function") {
      listen(query, "change", handler, undefined, cleanups);
    } else if (typeof query.addListener === "function") {
      query.addListener(handler);
      cleanups.push(() => query.removeListener(handler));
    }
  }

  function absoluteBounds(element, scrollY) {
    const rect = element.getBoundingClientRect();
    if (!Number.isFinite(rect.top) || !Number.isFinite(rect.height)) {
      throw new Error("Story layout is not measurable");
    }
    return { top: rect.top + scrollY, height: Math.max(1, rect.height) };
  }

  function measure(scrollY) {
    viewportHeight = browser.innerHeight;
    heroBounds = hero ? absoluteBounds(hero, scrollY) : null;
    for (const scene of scenes) {
      scene.bounds = absoluteBounds(scene.element, scrollY);
      scene.chapterBounds = scene.chapters.map((chapter) => absoluteBounds(chapter, scrollY));
      // Seed visibility before the observer's first asynchronous delivery.
      if (scene.bounds.top < scrollY + viewportHeight &&
          scene.bounds.top + scene.bounds.height > scrollY) {
        visibleScenes.add(scene);
      } else {
        visibleScenes.delete(scene);
      }
    }
    needsMeasure = false;
  }

  function heroNeedsUpdate(scrollY) {
    return advanced && heroBounds &&
      clamp((scrollY - heroBounds.top) / heroBounds.height) !== heroProgress;
  }

  function updateStory(scene, scrollY) {
    const focus = scrollY + viewportHeight * 0.5;
    let current = 0;
    scene.chapterBounds.forEach((bounds, index) => {
      if (focus >= bounds.top) current = index;
      scene.chapters[index].style.setProperty(
        "--chapter-progress", progressValue((focus - bounds.top) / bounds.height),
      );
    });
    scene.element.style.setProperty(
      "--scene-progress", progressValue((focus - scene.bounds.top) / scene.bounds.height),
    );
    scene.chapters.forEach((chapter, index) => {
      chapter.dataset.active = String(index === current);
    });
    scene.indicators.forEach((indicator, index) => {
      indicator.dataset.active = String(index === current);
    });
  }

  function updateAdvanced(scrollY) {
    if (!advanced || !heroBounds) return;
    try {
      const progress = clamp((scrollY - heroBounds.top) / heroBounds.height);
      root.style.setProperty(
        "--hero-progress", progressValue(progress),
      );
      heroProgress = progress;
    } catch {
      failAdvanced();
    }
  }

  function update() {
    frame = null;
    if (!active || disposed || doc.hidden) return;
    try {
      const scrollY = browser.scrollY || 0;
      const allScenes = needsMeasure;
      if (needsMeasure) measure(scrollY);
      for (const scene of allScenes ? scenes : visibleScenes) updateStory(scene, scrollY);
      updateAdvanced(scrollY);
    } catch {
      failStory();
    }
  }

  function schedule(force = false) {
    if (!active || disposed || doc.hidden || frame !== null) return;
    if (!force && !needsMeasure && !visibleScenes.size && !heroNeedsUpdate(browser.scrollY || 0)) return;
    try {
      frame = browser.requestAnimationFrame(update);
    } catch {
      failStory();
    }
  }

  function requestMeasure() {
    needsMeasure = true;
    schedule(true);
  }

  function activate() {
    try {
      const observer = new browser.IntersectionObserver((entries) => {
        if (!active || disposed) return;
        for (const entry of entries) {
          const scene = scenes.find((item) => item.element === entry.target);
          if (!scene) continue;
          if (entry.isIntersecting) visibleScenes.add(scene);
          else visibleScenes.delete(scene);
        }
        schedule(true);
      }, { threshold: 0 });
      activeCleanups.push(() => observer.disconnect());
      for (const scene of scenes) observer.observe(scene.element);

      if (typeof browser.ResizeObserver === "function") {
        const resizeObserver = new browser.ResizeObserver(requestMeasure);
        activeCleanups.push(() => resizeObserver.disconnect());
        resizeObserver.observe(root);
        for (const scene of scenes) resizeObserver.observe(scene.element);
      }

      listen(browser, "scroll", () => schedule(), { passive: true }, activeCleanups);
      listen(browser, "resize", requestMeasure, { passive: true }, activeCleanups);
      listen(root, "load", requestMeasure, true, activeCleanups);
      listen(doc, "visibilitychange", () => {
        if (doc.hidden) cancelFrame();
        else requestMeasure();
      }, undefined, activeCleanups);

      active = true;
      needsMeasure = true;
      root.dataset.story = "ready";
      advanced = Boolean(options.advancedAnimationEnabled) && !advancedFailed;
      if (advanced) {
        try {
          root.dataset.motion = "advanced";
        } catch {
          failAdvanced();
        }
      }
      schedule(true);
    } catch {
      failStory();
    }
  }

  try {
    scenes = Array.from(root.querySelectorAll("[data-story-scene]")).map((element) => ({
      element,
      chapters: Array.from(element.querySelectorAll("[data-story-chapter]")),
      indicators: Array.from(element.querySelectorAll("[data-story-indicator]")),
      chapterBounds: [],
      bounds: null,
    })).filter((scene) => scene.chapters.length);
    hero = root.querySelector("[data-story-hero]") || root.firstElementChild;
    resetVisualState();

    if (options.scrollStoryEnabled && doc &&
        typeof browser.matchMedia === "function" &&
        typeof browser.IntersectionObserver === "function" &&
        typeof browser.requestAnimationFrame === "function" &&
        typeof browser.cancelAnimationFrame === "function") {
      const desktop = browser.matchMedia("(min-width: 900px) and (min-height: 700px)");
      const reduced = browser.matchMedia("(prefers-reduced-motion: reduce)");
      const coarse = browser.matchMedia("(pointer: coarse)");
      const connection = browser.navigator?.connection || browser.navigator?.mozConnection ||
        browser.navigator?.webkitConnection;

      const reconcile = () => {
        if (disposed || storyFailed) return;
        const slowNetwork = connection?.saveData ||
          ["slow-2g", "2g"].includes(connection?.effectiveType);
        const eligible = desktop.matches && !reduced.matches && !coarse.matches && !slowNetwork;
        if (eligible && !active) activate();
        else if (!eligible && active) deactivate();
      };

      watchMedia(desktop, reconcile);
      watchMedia(reduced, reconcile);
      watchMedia(coarse, reconcile);
      if (typeof connection?.addEventListener === "function") {
        listen(connection, "change", reconcile, undefined, cleanups);
      }
      reconcile();
    }
  } catch {
    failStory();
  }

  return () => {
    disposed = true;
    deactivate();
    for (const cleanup of cleanups.splice(0).reverse()) attempt(cleanup);
  };
}
