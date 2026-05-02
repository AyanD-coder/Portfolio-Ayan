import fs from "node:fs/promises";
import path from "node:path";

const nextDir = path.join(process.cwd(), ".next");

try {
  await fs.rm(nextDir, { recursive: true, force: true });
  console.log("Cleared .next build cache.");
} catch (error) {
  console.error("Failed to clear .next build cache.");
  throw error;
}
