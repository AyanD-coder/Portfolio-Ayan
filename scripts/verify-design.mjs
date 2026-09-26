#!/usr/bin/env node
/**
 * Verify SSR preservation after `npm run build` (no server or dependencies needed).
 *   node scripts/verify-design.mjs
 *   node scripts/verify-design.mjs --mode=redesign --base-url=http://localhost:3000
 *   node scripts/verify-design.mjs --baseline=tmp/design-baseline
 *
 * This checks server-rendered content and contracts, not browser appearance or
 * client interactions. Baselines must be captured before implementation.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";

const options = { mode: "redesign", baseline: "tmp/design-baseline" };
for (const argument of process.argv.slice(2)) {
  const match = argument.match(/^--(mode|baseline|base-url)=(.+)$/);
  if (!match) throw new Error(`Unknown option ${argument}. Use --mode=original|redesign, --baseline=PATH, or --base-url=URL.`);
  options[match[1]] = match[2];
}
if (!["original", "redesign"].includes(options.mode)) throw new Error("--mode must be original or redesign.");

const routes = [
  ["/", "home"],
  ["/about", "about"],
  ["/projects", "projects"],
  ["/contact", "contact"],
  ["/projects/emptrakr", "projects-emptrakr"],
  ["/projects/blog-forge", "projects-blog-forge"],
  ["/projects/rtx5-multi-broker-trading-platform", "projects-rtx5-multi-broker-trading-platform"],
];
const voidTags = new Set("area base br col embed hr img input link meta param source track wbr".split(" "));
const namedEntities = { amp: "&", apos: "'", quot: '"', lt: "<", gt: ">", nbsp: "\u00a0" };
const decode = (value) => value.replace(/&(#x[\da-f]+|#\d+|amp|apos|quot|lt|gt|nbsp);/gi, (_, entity) => {
  if (entity[0] !== "#") return namedEntities[entity.toLowerCase()];
  const code = entity[1].toLowerCase() === "x" ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10);
  return code <= 0x10ffff ? String.fromCodePoint(code) : "\ufffd";
});
const whitespace = (value) => value.replace(/\s+/g, " ").trim();

// Purpose-specific tokenizer for generated SSR markup. Raw script bodies are
// consumed separately; their embedded HTML never becomes part of the DOM tree.
function parseHtml(html) {
  const root = { tag: "#document", attrs: {}, children: [] };
  const stack = [root];
  const tokens = /<!--[\s\S]*?-->|<![^>]*>|<\/?[a-z][^>"']*(?:(?:"[^"]*"|'[^']*')[^>"']*)*>|[^<]+|</gi;
  let token;
  while ((token = tokens.exec(html))) {
    const value = token[0];
    if (value.startsWith("<!")) continue;
    if (value.startsWith("</")) {
      const tag = value.match(/^<\/([^\s>]+)/)[1].toLowerCase();
      if (stack.at(-1).tag !== tag) throw new Error(`Unexpected closing </${tag}> inside <${stack.at(-1).tag}>.`);
      stack.pop();
      continue;
    }
    if (/^<[a-z]/i.test(value)) {
      const tag = value.match(/^<([^\s/>]+)/)[1].toLowerCase();
      const attrs = {};
      const attrSource = value.slice(tag.length + 1, value.endsWith("/>") ? -2 : -1);
      const attrPattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
      let attribute;
      while ((attribute = attrPattern.exec(attrSource))) {
        attrs[attribute[1].toLowerCase()] = decode(attribute[2] ?? attribute[3] ?? attribute[4] ?? "");
      }
      const node = { tag, attrs, children: [] };
      stack.at(-1).children.push(node);
      if (tag === "script" || tag === "style") {
        const end = html.toLowerCase().indexOf(`</${tag}>`, tokens.lastIndex);
        if (end < 0) throw new Error(`Unterminated <${tag}>.`);
        node.children.push({ text: html.slice(tokens.lastIndex, end) });
        tokens.lastIndex = end + tag.length + 3;
      } else if (!voidTags.has(tag) && !value.endsWith("/>")) {
        stack.push(node);
      }
    } else {
      const children = stack.at(-1).children;
      const text = decode(value);
      if (children.at(-1)?.text !== undefined) children.at(-1).text += text;
      else children.push({ text });
    }
  }
  if (stack.length !== 1) throw new Error(`Unclosed <${stack.at(-1).tag}>.`);
  return root;
}

function elements(node, predicate) {
  if (node.text !== undefined) return [];
  return [...(predicate(node) ? [node] : []), ...node.children.flatMap((child) => elements(child, predicate))];
}

function visibleText(node) {
  if (node.text !== undefined) return node.text;
  if (["script", "style", "template"].includes(node.tag) || node.attrs["aria-hidden"] === "true" || "hidden" in node.attrs) return "";
  return node.children.map(visibleText).join(" ");
}

function textFragments(node) {
  if (node.text !== undefined) {
    const fragment = whitespace(node.text);
    // Section/list ordinals become aria-hidden decorations in the redesign.
    // Keep content metrics such as 100+ and 30% in the meaningful-text checks.
    if (/^\d{2}$/.test(fragment)) return [];
    return /[\p{L}\p{N}]/u.test(fragment) ? [fragment] : [];
  }
  if (["script", "style", "template"].includes(node.tag) || node.attrs["aria-hidden"] === "true" || "hidden" in node.attrs) return [];
  return node.children.flatMap(textFragments);
}

function stableJson(value) {
  if (Array.isArray(value)) return value.map(stableJson);
  if (value && typeof value === "object") return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stableJson(value[key])]));
  return value;
}

function canonical(node) {
  if (node.text !== undefined) return whitespace(node.text) || null;
  // Framework scripts and resource hints can differ between development and
  // production. Preserve JSON-LD and every ordinary element/attribute.
  if (node.tag === "script") {
    if (node.attrs.type !== "application/ld+json") return null;
    return { tag: node.tag, attrs: stableJson(node.attrs), json: stableJson(JSON.parse(node.children[0].text)) };
  }
  if (node.tag === "link" && ["preload", "modulepreload"].includes(node.attrs.rel)) return null;
  return {
    tag: node.tag,
    attrs: stableJson(node.attrs),
    children: node.children.map(canonical).filter((child) => child !== null),
  };
}

function firstDifference(expected, actual, location = "main") {
  if (Object.is(expected, actual)) return null;
  if (!expected || !actual || typeof expected !== "object" || typeof actual !== "object") {
    return `${location}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`;
  }
  if (Array.isArray(expected) !== Array.isArray(actual)) return `${location}: node type differs`;
  if (Array.isArray(expected) && expected.length !== actual.length) {
    return `${location}: expected ${expected.length} entries, got ${actual.length}`;
  }
  for (const key of new Set([...Object.keys(expected), ...Object.keys(actual)])) {
    const difference = firstDifference(expected[key], actual[key], `${location}.${key}`);
    if (difference) return difference;
  }
  return null;
}

function linkSignature(node) {
  return JSON.stringify({
    text: whitespace(visibleText(node)),
    ...Object.fromEntries(["href", "target", "rel", "download", "aria-label"].filter((name) => name in node.attrs).map((name) => [name, node.attrs[name]])),
  });
}

function imageSignature(node) {
  const url = new URL(node.attrs.src, "https://verification.invalid");
  // Next image width can legitimately change with the redesigned project layout.
  const source = url.pathname === "/_next/image" ? url.searchParams.get("url") : node.attrs.src;
  const fields = ["alt", "width", "height", "loading", "decoding", "draggable"];
  if (!source.startsWith("/projects/") && !source.startsWith("/project-concepts/")) fields.push("sizes");
  return JSON.stringify({ source, quality: url.pathname === "/_next/image" ? url.searchParams.get("q") : null,
    ...Object.fromEntries(fields.filter((name) => name in node.attrs).map((name) => [name, node.attrs[name]])) });
}

function missingItems(expected, actual) {
  const available = new Map();
  for (const item of actual) available.set(item, (available.get(item) ?? 0) + 1);
  return expected.filter((item) => {
    if (!available.get(item)) return true;
    available.set(item, available.get(item) - 1);
    return false;
  });
}

function faqCount(document) {
  let count = 0;
  function visit(value) {
    if (!value || typeof value !== "object") return;
    const types = Array.isArray(value["@type"]) ? value["@type"] : [value["@type"]];
    if (types.includes("FAQPage")) count++;
    Object.values(value).forEach(visit);
  }
  for (const script of elements(document, (node) => node.tag === "script" && node.attrs.type === "application/ld+json")) {
    visit(JSON.parse(script.children[0].text));
  }
  return count;
}

const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
for (const [route, name] of routes) {
  const initialFailureCount = failures.length;
  try {
    const baselinePath = path.resolve(options.baseline, `${name}.html`);
    const expectedDocument = parseHtml(await readFile(baselinePath, "utf8"));
    let currentHtml;
    if (options["base-url"]) {
      const response = await fetch(new URL(route, options["base-url"]));
      if (!response.ok) throw new Error(`HTTP ${response.status} for ${route}`);
      currentHtml = await response.text();
    } else {
      currentHtml = await readFile(path.resolve(".next/server/app", route === "/" ? "index.html" : `${route.slice(1)}.html`), "utf8");
    }
    const actualDocument = parseHtml(currentHtml);
    const expectedMains = elements(expectedDocument, (node) => node.tag === "main");
    const actualMains = elements(actualDocument, (node) => node.tag === "main");
    check(actualMains.length === 1, `${route}: expected exactly one main, found ${actualMains.length}`);
    if (expectedMains.length !== 1 || actualMains.length !== 1) throw new Error("Cannot compare route without exactly one main in each document.");
    const [expectedMain] = expectedMains;
    const [actualMain] = actualMains;
    check(elements(actualDocument, (node) => node.tag === "h1").length === 1, `${route}: expected exactly one h1`);

    if (route !== "/" || options.mode === "original") {
      const difference = firstDifference(canonical(expectedMain), canonical(actualMain));
      check(!difference, `${route}: preserved markup changed: ${difference}`);
    } else {
      const actualText = whitespace(visibleText(actualMain));
      const missingText = [...new Set(textFragments(expectedMain))].filter((fragment) => !actualText.includes(fragment));
      for (const fragment of missingText) check(false, `${route}: missing visible text ${JSON.stringify(fragment)}`);
      const missingLinks = missingItems(elements(expectedMain, (node) => node.tag === "a").map(linkSignature), elements(actualMain, (node) => node.tag === "a").map(linkSignature));
      for (const signature of missingLinks) check(false, `${route}: missing or changed link ${signature}`);
      const expectedImages = elements(expectedMain, (node) => node.tag === "img").map(imageSignature);
      const actualImages = elements(actualMain, (node) => node.tag === "img").map(imageSignature);
      const missingImages = missingItems(expectedImages, actualImages);
      for (const signature of missingImages) check(false, `${route}: missing or changed image ${signature}`);
      check(actualImages.length === expectedImages.length, `${route}: expected ${expectedImages.length} shared images, found ${actualImages.length}`);
      if (!missingImages.length && actualImages.length === expectedImages.length) {
        check(expectedImages.every((signature, index) => signature === actualImages[index]), `${route}: shared image/project order changed`);
      }
      const expectedIds = elements(expectedMain, (node) => "id" in node.attrs).map((node) => node.attrs.id);
      const actualIds = elements(actualMain, (node) => "id" in node.attrs).map((node) => node.attrs.id);
      for (const id of expectedIds) check(actualIds.includes(id), `${route}: missing original anchor #${id}`);
      for (const id of new Set(actualIds)) check(actualIds.filter((value) => value === id).length === 1, `${route}: duplicate id #${id}`);
      check(actualMain.attrs["data-design"] === "redesign", `${route}: redesigned main must have data-design="redesign"`);
      check(actualMain.attrs["data-story"] === "static", `${route}: SSR must start with data-story="static"`);
      check(actualMain.attrs["data-motion"] === "static", `${route}: SSR must start with data-motion="static"`);
    }
    if (route === "/") check(faqCount(actualDocument) === 1, `${route}: expected exactly one FAQPage JSON-LD object`);
    console.log(`${failures.length === initialFailureCount ? "PASS" : "FAIL"} ${route}`);
  } catch (error) {
    failures.push(`${route}: ${error.message}`);
    console.log(`FAIL ${route}`);
  }
}

if (failures.length) {
  console.error(`\n${failures.length} preservation check(s) failed:\n${failures.map((failure) => `- ${failure}`).join("\n")}`);
  process.exitCode = 1;
} else {
  console.log(`\nVerified ${routes.length} routes in ${options.mode} mode against ${options.baseline}.`);
  console.log("SSR checks passed. Browser layout, motion, and interaction checks remain separate.");
}
