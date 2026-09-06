import fs from "node:fs/promises";
import path from "node:path";

const targetNames = process.argv.includes("--all")
  ? [".next", ".next-dev"]
  : process.argv.includes("--dev")
    ? [".next-dev"]
    : [".next"];

try {
  for (const targetName of targetNames) {
    const targetPath = path.join(process.cwd(), targetName);
    await fs.rm(targetPath, { recursive: true, force: true });
  }
  console.log(`Cleared ${targetNames.join(" and ")} build cache.`);
} catch (error) {
  console.error("Failed to clear Next.js build cache.");
  throw error;
}
