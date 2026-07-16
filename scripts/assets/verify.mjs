/* global console, process */
import fs from "node:fs/promises";
import path from "node:path";
import { MANIFEST_PATH, ROOT_DIR } from "./config.mjs";

async function readJson(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

async function main() {
  const manifest = await readJson(MANIFEST_PATH);
  const missing = [];
  let variantCount = 0;

  for (const asset of manifest.assets) {
    for (const variant of asset.variants) {
      variantCount += 1;
      const absolutePath = path.join(
        ROOT_DIR,
        "public",
        variant.path.replace(/^\//, "").replaceAll("/", path.sep),
      );
      try {
        await fs.access(absolutePath);
      } catch {
        missing.push({
          assetId: asset.id,
          variantId: variant.id,
          path: variant.path,
        });
      }
    }
  }

  const summary = {
    assetCount: manifest.assets.length,
    variantCount,
    missingCount: missing.length,
    missing,
  };

  console.log(JSON.stringify(summary, null, 2));

  if (missing.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
