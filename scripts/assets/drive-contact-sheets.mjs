/* global Buffer, console, process */
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const useThumbnails = process.argv.includes("--thumbnails");
const sourceDir = path.resolve(
  useThumbnails
    ? "external-assets/malcriado-drive-thumbnails"
    : "external-assets/malcriado-drive-originals",
);
const outputDir = path.resolve("docs/assets/contact-sheets");
const columns = 4;
const cardWidth = 320;
const imageHeight = 220;
const labelHeight = 68;

const escapeXml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const files = (await readdir(sourceDir))
  .filter((name) => /\.(jpe?g)$/i.test(name))
  .sort((a, b) => a.localeCompare(b, "es", { numeric: true }));

await mkdir(outputDir, { recursive: true });

const groups = new Map();
for (const name of files) {
  const group = name.startsWith("DSC")
    ? "dsc"
    : name.toLowerCase().startsWith("malcriado 2-")
      ? "malcriado-2"
      : "malcriado";
  groups.set(group, [...(groups.get(group) ?? []), name]);
}

for (const [group, names] of groups) {
  const cards = await Promise.all(
    names.map(async (name, index) => {
      const input = path.join(sourceDir, name);
      const metadata = await sharp(input).metadata();
      const stats = await sharp(input).stats();
      const width = metadata.width ?? 0;
      const height = metadata.height ?? 0;
      const ratio = height > 0 ? (width / height).toFixed(2) : "?";
      const image = await sharp(input)
        .rotate()
        .resize(cardWidth, imageHeight, { fit: "cover", position: "attention" })
        .jpeg({ quality: 76, progressive: true })
        .toBuffer();
      const label = Buffer.from(`
        <svg width="${cardWidth}" height="${labelHeight}" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#171111"/>
          <text x="14" y="24" fill="#f2e8da" font-family="Arial" font-size="15" font-weight="700">${escapeXml(name)}</text>
          <text x="14" y="48" fill="#c8b39d" font-family="Arial" font-size="12">${width}×${height} · ratio ${ratio} · luz ${Math.round(stats.channels[0]?.mean ?? 0)}</text>
        </svg>
      `);
      const card = await sharp({
        create: {
          width: cardWidth,
          height: imageHeight + labelHeight,
          channels: 3,
          background: "#171111",
        },
      })
        .composite([
          { input: image, top: 0, left: 0 },
          { input: label, top: imageHeight, left: 0 },
        ])
        .jpeg({ quality: 82, progressive: true })
        .toBuffer();
      return {
        input: card,
        left: (index % columns) * cardWidth,
        top: Math.floor(index / columns) * (imageHeight + labelHeight),
      };
    }),
  );

  const rows = Math.ceil(names.length / columns);
  await sharp({
    create: {
      width: columns * cardWidth,
      height: rows * (imageHeight + labelHeight),
      channels: 3,
      background: "#0e0a09",
    },
  })
    .composite(cards)
    .jpeg({ quality: 84, progressive: true })
    .toFile(
      path.join(
        outputDir,
        `drive-${group}${useThumbnails ? "-overview" : ""}.jpg`,
      ),
    );
}

console.log(
  `Generated ${groups.size} contact sheet(s) from ${files.length} images.`,
);
