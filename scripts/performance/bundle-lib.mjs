/* eslint-disable no-undef */
import fs from "node:fs/promises";
import path from "node:path";

const DIST_ASSETS_DIR = path.join(process.cwd(), "dist", "assets");

function roundKb(bytes) {
  return Number((bytes / 1024).toFixed(2));
}

function isInitialIndexChunk(fileName) {
  return /^index-.*\.js$/.test(fileName);
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
  const initialIndexChunk =
    jsAssets.find((asset) => isInitialIndexChunk(asset.fileName)) ?? null;
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
    gsapChunks,
    initialIndexChunk,
    jsAssets,
    routeChunks,
  };
}
