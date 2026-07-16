/* global console, process */
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import {
  SOURCE_DIR,
  MANIFEST_PATH,
  ROOT_DIR,
  assetOverrides,
  defaultAssetOverride,
  pendingVideos,
} from "./config.mjs";

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);
const MIME_BY_EXTENSION = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
};

async function readJson(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

async function walkFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkFiles(fullPath)));
      continue;
    }
    files.push(fullPath);
  }
  return files;
}

function orientationFromDimensions(width, height) {
  if (width === height) {
    return "square";
  }
  return width > height ? "landscape" : "portrait";
}

function formatObjectPosition(point) {
  return `${point.x}% ${point.y}%`;
}

function deriveUsageFromRole(roles) {
  if (roles.includes("BRAND")) {
    return {
      recommendedUsage: "Brand system asset for identity surfaces.",
      suggestedScene: "Site identity",
    };
  }
  if (roles.includes("HERO_CANDIDATE")) {
    return {
      recommendedUsage: "Hero candidate for immersive opening scenes.",
      suggestedScene: "Hero scene",
    };
  }
  if (roles.includes("COCKTAIL")) {
    return {
      recommendedUsage: "Cocktail-led asset for drinks storytelling.",
      suggestedScene: "Cocktail spotlight",
    };
  }
  if (roles.includes("FEATURED_DISH")) {
    return {
      recommendedUsage: "Primary dish asset for editorial presentation.",
      suggestedScene: "Featured dishes",
    };
  }
  return {
    recommendedUsage: "Supporting visual asset.",
    suggestedScene: "Menu support grid",
  };
}

function buildDuplicateGroups(assets) {
  const groupsByHash = new Map();
  for (const asset of assets) {
    const bucket = groupsByHash.get(asset.sha256) ?? [];
    bucket.push(asset);
    groupsByHash.set(asset.sha256, bucket);
  }

  const duplicateGroups = [];
  let index = 1;

  for (const groupAssets of groupsByHash.values()) {
    if (groupAssets.length < 2) {
      continue;
    }

    const preferredMaster =
      groupAssets.find(
        (asset) =>
          asset.state === "ACCEPTED" && asset.productionProfile !== "excluded",
      ) ??
      groupAssets.find(
        (asset) => asset.state !== "DUPLICATE" && !asset.duplicateOf,
      ) ??
      groupAssets[0];
    const duplicates = groupAssets
      .filter((asset) => asset.id !== preferredMaster.id)
      .map((asset) => asset.id);

    duplicateGroups.push({
      id: `dup-${String(index).padStart(3, "0")}`,
      masterAssetId: preferredMaster.id,
      duplicateAssetIds: duplicates,
      criterion: "SHA-256 exact match",
      action: "Retain master asset only for production derivatives.",
      productionPath: null,
    });
    index += 1;
  }

  return duplicateGroups;
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

function relativeFromRoot(targetPath) {
  return path.relative(ROOT_DIR, targetPath).replaceAll("\\", "/");
}

function relativeAssetUrl(targetPath) {
  return `/${relativeFromRoot(targetPath).replace(/^public\//, "")}`;
}

async function main() {
  const previous = await readJson(MANIFEST_PATH);
  const previousAssets = new Map(
    (previous.assets ?? []).map((asset) => [
      asset.local_path ?? asset.localPath,
      asset,
    ]),
  );

  const sourceFiles = (await walkFiles(SOURCE_DIR))
    .filter((filePath) =>
      IMAGE_EXTENSIONS.has(path.extname(filePath).toLowerCase()),
    )
    .sort((left, right) => left.localeCompare(right));

  const assets = [];
  let originalTotalBytes = 0;

  for (const filePath of sourceFiles) {
    const buffer = await fs.readFile(filePath);
    const hash = crypto.createHash("sha256").update(buffer).digest("hex");
    const relativeFile = relativeFromRoot(filePath);
    const metadata = await sharp(buffer).metadata();
    const stats = await sharp(buffer).stats();
    const width = metadata.width ?? 0;
    const height = metadata.height ?? 0;
    const orientation = orientationFromDimensions(width, height);
    const extension = path.extname(filePath).toLowerCase();
    const originalName = path.basename(filePath);
    const legacy =
      previousAssets.get(relativeFile) ??
      previousAssets.get(filePath.replaceAll("\\", "/")) ??
      null;
    const override = assetOverrides[originalName] ?? {};
    const merged = {
      ...defaultAssetOverride,
      ...deriveUsageFromRole(override.roles ?? defaultAssetOverride.roles),
      ...override,
    };

    originalTotalBytes += buffer.byteLength;

    assets.push({
      id: legacy?.id ?? `asset-${String(assets.length + 1).padStart(3, "0")}`,
      originalName,
      localPath: relativeAssetUrl(filePath),
      sourceUrl: legacy?.source_url ?? legacy?.sourceUrl ?? "",
      pageUrls: legacy?.page_urls ?? legacy?.pageUrls ?? [],
      mimeType:
        MIME_BY_EXTENSION[extension] ??
        metadata.format ??
        "application/octet-stream",
      extension,
      sizeBytes: buffer.byteLength,
      sha256: hash,
      width,
      height,
      orientation,
      hasTransparency:
        override.hasTransparency ??
        (extension === ".png" ? (metadata.hasAlpha ?? !stats.isOpaque) : false),
      containsEmbeddedText: merged.containsEmbeddedText,
      colorSpace: metadata.space ?? null,
      quality: merged.quality,
      qualityNotes: merged.qualityNotes,
      cropSafety: merged.cropSafety,
      focalPoint: merged.focalPoint,
      recommendedObjectPosition: formatObjectPosition(merged.focalPoint),
      roles: merged.roles,
      state: merged.state,
      deviceSupport: merged.deviceSupport,
      heroCandidate: merged.heroCandidate,
      backgroundCandidate: merged.backgroundCandidate,
      productionProfile: merged.productionProfile,
      productionPath: merged.productionProfile === "excluded" ? null : null,
      duplicateGroup: null,
      duplicateOf:
        merged.duplicateOf ??
        legacy?.duplicate_of ??
        legacy?.duplicateOf ??
        null,
      rightsStatus:
        merged.rightsStatus ??
        legacy?.rights_status ??
        legacy?.rightsStatus ??
        "",
      currentAltText: legacy?.current_alt_text ?? legacy?.currentAltText ?? "",
      provisionalAltText:
        legacy?.provisional_alt_text ??
        legacy?.provisionalAltText ??
        legacy?.current_alt_text ??
        "",
      recommendedUsage: merged.recommendedUsage,
      suggestedScene: merged.suggestedScene,
      variants: [],
    });
  }

  const duplicateGroups = buildDuplicateGroups(assets);
  const groupByAssetId = new Map();
  for (const group of duplicateGroups) {
    groupByAssetId.set(group.masterAssetId, group.id);
    for (const assetId of group.duplicateAssetIds) {
      groupByAssetId.set(assetId, group.id);
    }
  }

  const masterByGroupId = new Map(
    duplicateGroups.map((group) => [group.id, group.masterAssetId]),
  );
  const assetsWithDuplicates = assets.map((asset) => {
    const duplicateGroup = groupByAssetId.get(asset.id) ?? null;
    const masterAssetId = duplicateGroup
      ? masterByGroupId.get(duplicateGroup)
      : null;
    return {
      ...asset,
      duplicateGroup,
      duplicateOf: masterAssetId === asset.id ? null : asset.duplicateOf,
    };
  });

  const manifest = {
    generatedAt: new Date().toISOString(),
    sourceCount: assetsWithDuplicates.length,
    originalTotalBytes,
    optimizedTotalBytes: 0,
    derivativesCount: 0,
    duplicateGroups,
    pendingVideos,
    assets: assetsWithDuplicates,
  };

  await fs.writeFile(
    MANIFEST_PATH,
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8",
  );

  const acceptedAssets = assetsWithDuplicates.filter(
    (asset) => asset.state === "ACCEPTED",
  );
  const excludedAssets = assetsWithDuplicates.filter(
    (asset) => asset.productionProfile === "excluded",
  );
  const heroAssets = assetsWithDuplicates.filter(
    (asset) => asset.heroCandidate,
  );
  const cocktailAssets = assetsWithDuplicates.filter((asset) =>
    asset.roles.includes("COCKTAIL"),
  );
  const brandAssets = assetsWithDuplicates.filter((asset) =>
    asset.roles.includes("BRAND"),
  );

  await ensureDir(path.join(ROOT_DIR, "docs", "assets"));
  await ensureDir(path.join(ROOT_DIR, "docs", "creative"));
  await ensureDir(path.join(ROOT_DIR, "docs", "content"));

  const manifestDoc = `# Asset Manifest

Generated on ${manifest.generatedAt}.

## Summary

- Source assets: ${manifest.sourceCount}
- Accepted assets: ${acceptedAssets.length}
- Excluded assets: ${excludedAssets.length}
- Duplicate groups: ${duplicateGroups.length}
- Pending videos: ${pendingVideos.length}
- Original bytes: ${originalTotalBytes}

## Accepted assets

| Asset | Roles | Profile | Scene | Notes |
|---|---|---|---|---|
${acceptedAssets
  .map(
    (asset) =>
      `| ${asset.id} ${asset.originalName} | ${asset.roles.join(", ")} | ${asset.productionProfile} | ${asset.suggestedScene ?? "-"} | ${asset.qualityNotes || "-"} |`,
  )
  .join("\n")}
`;

  const duplicateDoc = `# Duplicate Report

${duplicateGroups.length === 0 ? "No duplicate groups detected." : ""}
${duplicateGroups
  .map(
    (group) => `
## ${group.id}

- Master asset: ${group.masterAssetId}
- Duplicates: ${group.duplicateAssetIds.join(", ")}
- Criterion: ${group.criterion}
- Action: ${group.action}
`,
  )
  .join("\n")}
`;

  const videoDoc = `# Video Recovery Status

The current public MP4 URLs are not recoverable automatically because they return SG-Captcha responses.

| Video | Status | Role | Notes |
|---|---|---|---|
${pendingVideos
  .map(
    (video) =>
      `| ${video.url} | ${video.status} | ${video.probableRole} | ${video.notes} |`,
  )
  .join("\n")}
`;

  const brandDoc = `# Brand Asset Guide

## Approved brand files

| Asset | Dimensions | Transparency | Usage |
|---|---|---|---|
${brandAssets
  .map(
    (asset) =>
      `| ${asset.originalName} | ${asset.width}x${asset.height} | ${asset.hasTransparency ? "yes" : "no"} | ${asset.recommendedUsage} |`,
  )
  .join("\n")}

## Rules

- Keep brand assets in PNG to preserve transparency.
- Do not crop the horizontal wordmark tighter than its native bounding box.
- Use the favicon asset only for square identity surfaces.
`;

  const cropsDoc = `# Art Direction Crops

| Asset | Profile | Focal point | Crop safety | Notes |
|---|---|---|---|---|
${heroAssets
  .concat(
    cocktailAssets.filter(
      (asset) => !heroAssets.some((hero) => hero.id === asset.id),
    ),
  )
  .map(
    (asset) =>
      `| ${asset.originalName} | ${asset.productionProfile} | ${asset.focalPoint.x}% ${asset.focalPoint.y}% | ${asset.cropSafety} | ${asset.qualityNotes || "-"} |`,
  )
  .join("\n")}
`;

  const sceneMappingDoc = `# Asset Scene Mapping

| Scene | Assets | Rationale |
|---|---|---|
${[
  [
    "Hero - signature plate",
    assetsWithDuplicates.filter(
      (asset) => asset.suggestedScene === "Hero - signature plate",
    ),
  ],
  [
    "Hero - sea and neon energy",
    assetsWithDuplicates.filter(
      (asset) => asset.suggestedScene === "Hero - sea and neon energy",
    ),
  ],
  [
    "Featured dishes",
    assetsWithDuplicates.filter(
      (asset) => asset.suggestedScene === "Featured dishes",
    ),
  ],
  [
    "Cocktail spotlight",
    assetsWithDuplicates.filter(
      (asset) => asset.suggestedScene === "Cocktail spotlight",
    ),
  ],
  [
    "Site identity",
    assetsWithDuplicates.filter(
      (asset) => asset.suggestedScene === "Site identity",
    ),
  ],
]
  .filter(([, items]) => items.length > 0)
  .map(
    ([scene, items]) =>
      `| ${scene} | ${items.map((item) => item.originalName).join(", ")} | ${items[0]?.recommendedUsage ?? "-"} |`,
  )
  .join("\n")}
`;

  const shotListDoc = `# Photo Video Shot List

## Reuse now

${acceptedAssets
  .filter((asset) => asset.quality === "high")
  .map((asset) => `- ${asset.originalName}: ${asset.recommendedUsage}`)
  .join("\n")}

## Reshoot or replace

${excludedAssets.map((asset) => `- ${asset.originalName}: ${asset.qualityNotes || asset.state}`).join("\n")}

## Missing video source

${pendingVideos.map((video) => `- ${video.id}: request original for ${video.probableRole}`).join("\n")}
`;

  const perfDoc = `# Asset Performance Budget

## Targets

- Hero stills: prefer AVIF/WebP under 250 KB per delivered variant.
- Supporting dishes: prefer AVIF/WebP under 180 KB per delivered variant.
- Brand PNG: preserve transparency; keep favicon under 100 KB and horizontal mark under 300 KB where possible.
- Home videos remain blocked until source files can be optimized directly.

## Current source baseline

- Original assets total: ${Math.round(originalTotalBytes / 1024)} KB
- Source count: ${manifest.sourceCount}
- Accepted for optimization: ${acceptedAssets.length}
- Excluded from production pipeline: ${excludedAssets.length}
`;

  await fs.writeFile(
    path.join(ROOT_DIR, "docs", "assets", "ASSET_MANIFEST.md"),
    manifestDoc,
    "utf8",
  );
  await fs.writeFile(
    path.join(ROOT_DIR, "docs", "assets", "DUPLICATE_REPORT.md"),
    duplicateDoc,
    "utf8",
  );
  await fs.writeFile(
    path.join(ROOT_DIR, "docs", "assets", "VIDEO_RECOVERY_STATUS.md"),
    videoDoc,
    "utf8",
  );
  await fs.writeFile(
    path.join(ROOT_DIR, "docs", "assets", "BRAND_ASSET_GUIDE.md"),
    brandDoc,
    "utf8",
  );
  await fs.writeFile(
    path.join(ROOT_DIR, "docs", "assets", "ART_DIRECTION_CROPS.md"),
    cropsDoc,
    "utf8",
  );
  await fs.writeFile(
    path.join(ROOT_DIR, "docs", "creative", "ASSET_SCENE_MAPPING.md"),
    sceneMappingDoc,
    "utf8",
  );
  await fs.writeFile(
    path.join(ROOT_DIR, "docs", "content", "PHOTO_VIDEO_SHOT_LIST.md"),
    shotListDoc,
    "utf8",
  );
  await fs.writeFile(
    path.join(ROOT_DIR, "docs", "assets", "ASSET_PERFORMANCE_BUDGET.md"),
    perfDoc,
    "utf8",
  );

  console.log(
    JSON.stringify(
      {
        manifestPath: relativeFromRoot(MANIFEST_PATH),
        sourceCount: manifest.sourceCount,
        duplicateGroups: duplicateGroups.length,
        acceptedAssets: acceptedAssets.length,
        excludedAssets: excludedAssets.length,
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
