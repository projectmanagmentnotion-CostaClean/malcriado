/* eslint-disable no-undef */
import fs from "node:fs/promises";
import path from "node:path";

const DIST_ASSETS_DIR = path.join(process.cwd(), "dist", "assets");
const DIST_INDEX_HTML = path.join(process.cwd(), "dist", "index.html");

function roundKb(bytes) {
  return Number((bytes / 1024).toFixed(2));
}

async function getEntryChunkFileName() {
  const html = await fs.readFile(DIST_INDEX_HTML, "utf8");
  const match = html.match(
    /<script type="module" crossorigin src="\/assets\/([^"]+)"><\/script>/,
  );
  return match?.[1] ?? null;
}

export async function readBundleReport() {
  const entries = await fs.readdir(DIST_ASSETS_DIR, { withFileTypes: true });
  const assetFiles = [];

  for (const entry of entries) {
    if (!entry.isFile()) {
      continue;
    }

    const fullPath = path.join(DIST_ASSETS_DIR, entry.name);
    const stats = await fs.stat(fullPath);
    assetFiles.push({
      fileName: entry.name,
      bytes: stats.size,
      kb: roundKb(stats.size),
      kind: path.extname(entry.name).replace(".", ""),
    });
  }

  const jsAssets = assetFiles
    .filter((asset) => asset.kind === "js")
    .sort((left, right) => right.bytes - left.bytes);
  const cssAssets = assetFiles
    .filter((asset) => asset.kind === "css")
    .sort((left, right) => right.bytes - left.bytes);
  const entryChunkFileName = await getEntryChunkFileName();
  const initialIndexChunk =
    jsAssets.find((asset) => asset.fileName === entryChunkFileName) ?? null;
  const gsapChunks = jsAssets.filter((asset) =>
    /ScrollTrigger|gsap/i.test(asset.fileName),
  );
  const routeChunks = jsAssets.filter((asset) =>
    /(Page|Dev|Menu|Contacto|Reservar|Nosotros|Especiales|Declaracion)/.test(
      asset.fileName,
    ),
  );

  return {
    assetFiles,
    cssAssets,
    entryChunkFileName,
    gsapChunks,
    initialIndexChunk,
    jsAssets,
    routeChunks,
  };
}
