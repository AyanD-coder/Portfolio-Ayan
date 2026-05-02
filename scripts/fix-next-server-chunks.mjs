import fs from "node:fs/promises";
import path from "node:path";

const serverDir = path.join(process.cwd(), ".next", "server");
const chunkDir = path.join(serverDir, "chunks");
const vendorChunkDir = path.join(serverDir, "vendor-chunks");

async function fileExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  try {
    const entries = await fs.readdir(chunkDir, { withFileTypes: true });

    await Promise.all(
      entries
        .filter((entry) => entry.isFile() && entry.name.endsWith(".js"))
        .map(async (entry) => {
          const source = path.join(chunkDir, entry.name);
          const target = path.join(serverDir, entry.name);

          await fs.copyFile(source, target);
        }),
    );

    const vendorNextChunk = path.join(vendorChunkDir, "next.js");
    const vendorSwcChunk = path.join(vendorChunkDir, "@swc.js");

    if (await fileExists(vendorNextChunk) && !(await fileExists(vendorSwcChunk))) {
      await fs.copyFile(vendorNextChunk, vendorSwcChunk);
    }

    console.log("Normalized Next server chunk paths.");
  } catch (error) {
    if (error && error.code === "ENOENT") {
      console.warn("Skipped chunk normalization because the Next server output was not found.");
      return;
    }

    throw error;
  }
}

main();
