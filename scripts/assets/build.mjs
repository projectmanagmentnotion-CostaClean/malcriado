/* global console, process */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import {
  MANIFEST_PATH,
  OPTIMIZED_DIR,
  ROOT_DIR,
  SOURCE_DIR,
  productionProfiles,
} from "./config.mjs";

function relativeFromRoot(targetPath) {
  return path.relative(ROOT_DIR, targetPath).replaceAll("\\", "/");
}

function publicUrl(targetPath) {
  return `/${relativeFromRoot(targetPath).replace(/^public\//, "")}`;
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function removeDir(dirPath) {
  await fs.rm(dirPath, { recursive: true, force: true });
}

async function readJson(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function computeCropRegion(width, height, ratio, focalPoint) {
  if (!ratio) {
    return { left: 0, top: 0, width, height };
  }

  const sourceRatio = width / height;
  let cropWidth = width;
  let cropHeight = height;

  if (sourceRatio > ratio) {
    cropHeight = height;
    cropWidth = Math.round(height * ratio);
  } else {
    cropWidth = width;
    cropHeight = Math.round(width / ratio);
  }

  const focalX = Math.round((focalPoint.x / 100) * width);
  const focalY = Math.round((focalPoint.y / 100) * height);
  const left = clamp(Math.round(focalX - cropWidth / 2), 0, width - cropWidth);
  const top = clamp(
    Math.round(focalY - cropHeight / 2),
    0,
    height - cropHeight,
  );

  return { left, top, width: cropWidth, height: cropHeight };
}

async function createVariant(asset, crop, width, format) {
  const sourcePath = path.join(
    ROOT_DIR,
    "public",
    asset.localPath.replace(/^\//, "").replaceAll("/", path.sep),
  );
  const outputDir = path.join(OPTIMIZED_DIR, asset.id);
  const extension = format === "png" ? "png" : format;
  const outputPath = path.join(outputDir, `${crop.id}-${width}.${extension}`);
  await ensureDir(outputDir);

  const image = sharp(sourcePath, { animated: false });
  const sourceMeta = await image.metadata();
  const region = computeCropRegion(
    sourceMeta.width ?? asset.width,
    sourceMeta.height ?? asset.height,
    crop.ratio,
    asset.focalPoint,
  );
  let pipeline = sharp(sourcePath, { animated: false }).extract(region).resize({
    width,
    fit: "cover",
    withoutEnlargement: true,
  });

  if (format === "avif") {
    pipeline = pipeline.avif({
      quality: asset.productionProfile === "hero" ? 58 : 52,
    });
  } else if (format === "webp") {
    pipeline = pipeline.webp({
      quality: asset.productionProfile === "hero" ? 76 : 72,
    });
  } else {
    pipeline = pipeline.png({ compressionLevel: 9 });
  }

  await pipeline.toFile(outputPath);
  const meta = await sharp(outputPath).metadata();
  const stats = await fs.stat(outputPath);

  return {
    id: `${asset.id}-${crop.id}-${width}-${format}`,
    path: publicUrl(outputPath),
    format,
    width: meta.width ?? width,
    height:
      meta.height ??
      Math.round(
        width /
          (crop.ratio ??
            (sourceMeta.width ?? width) / (sourceMeta.height ?? width)),
      ),
    bytes: stats.size,
    crop: crop.id,
  };
}

async function main() {
  const manifest = await readJson(MANIFEST_PATH);
  await removeDir(OPTIMIZED_DIR);
  await ensureDir(OPTIMIZED_DIR);

  const updatedAssets = [];
  let optimizedTotalBytes = 0;
  let generatedDerivativeBytes = 0;
  let derivativesCount = 0;

  for (const asset of manifest.assets) {
    const profile =
      productionProfiles[asset.productionProfile] ??
      productionProfiles.excluded;
    const variants = [];

    if (asset.productionProfile !== "excluded") {
      for (const crop of profile.crops) {
        for (const targetWidth of crop.widths) {
          for (const format of profile.formats) {
            const variant = await createVariant(
              asset,
              crop,
              targetWidth,
              format,
            );
            variants.push(variant);
            generatedDerivativeBytes += variant.bytes;
            derivativesCount += 1;
          }
        }
      }
    }

    optimizedTotalBytes += variants[0]?.bytes ?? 0;

    updatedAssets.push({
      ...asset,
      productionPath: variants[0]?.path ?? null,
      variants,
    });
  }

  const duplicateGroups = manifest.duplicateGroups.map((group) => {
    const master = updatedAssets.find(
      (asset) => asset.id === group.masterAssetId,
    );
    return {
      ...group,
      productionPath: master?.productionPath ?? null,
    };
  });

  const updatedManifest = {
    ...manifest,
    optimizedTotalBytes,
    derivativesCount,
    duplicateGroups,
    assets: updatedAssets,
  };

  await fs.writeFile(
    MANIFEST_PATH,
    `${JSON.stringify(updatedManifest, null, 2)}\n`,
    "utf8",
  );

  const optimizationDoc = `# Image Optimization

Generated on ${new Date().toISOString()}.

## Pipeline

- Source directory: ${relativeFromRoot(SOURCE_DIR)}
- Output directory: ${relativeFromRoot(OPTIMIZED_DIR)}
- Manifest: ${relativeFromRoot(MANIFEST_PATH)}
- Derivatives generated: ${derivativesCount}
- Primary production bytes: ${optimizedTotalBytes}
- Generated derivative bytes: ${generatedDerivativeBytes}

## Profiles

- brand: PNG only, transparency preserved.
- hero: AVIF and WebP variants for original, landscape, mobile and editorial crops.
- featured-dish: AVIF and WebP variants for original, square, portrait and editorial crops.
- menu-support: AVIF and WebP variants for original and square crops.
- cocktail: AVIF and WebP variants for original, square and portrait crops.

## Asset output summary

| Asset | Profile | Variants | First output |
|---|---|---|---|
${updatedAssets
  .map(
    (asset) =>
      `| ${asset.originalName} | ${asset.productionProfile} | ${asset.variants.length} | ${asset.productionPath ?? "-"} |`,
  )
  .join("\n")}
`;

  await fs.writeFile(
    path.join(ROOT_DIR, "docs", "assets", "IMAGE_OPTIMIZATION.md"),
    optimizationDoc,
    "utf8",
  );

  console.log(
    JSON.stringify(
      {
        optimizedDir: relativeFromRoot(OPTIMIZED_DIR),
        derivativesCount,
        generatedDerivativeBytes,
        optimizedTotalBytes,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
