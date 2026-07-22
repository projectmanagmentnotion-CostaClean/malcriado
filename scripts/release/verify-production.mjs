/* eslint-disable no-undef */
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import { relative, resolve, sep } from "node:path";
import yauzl from "yauzl";

const projectRoot = resolve(process.cwd());
const releaseDir = resolve(projectRoot, "release");
const productionDir = resolve(releaseDir, "malcriado-production");
const zipPath = resolve(releaseDir, "malcriado-production.zip");
const manifestPath = resolve(releaseDir, "malcriado-production.sha256");
const expectedZipHash = process.env.EXPECTED_RELEASE_SHA256?.toLowerCase();

const forbiddenPath =
  /(^|\/)(src|node_modules|\.git|tests?|docs?|screenshots?|playwright-report|test-results|lighthouse)(\/|$)|\.map$|(^|\/)\.env($|\.)|(^|\/)dev(\/|$)/i;
const forbiddenRuntimeMarker =
  /__MALCRIADO_MOCK|MockReservationAdapter|Ada Lovelace|ada@example\.com|600 000 000|BEGIN (?:RSA |EC )?PRIVATE KEY|sk_(?:live|test)_/i;
const textExtensions =
  /(?:\.html?|\.css|\.js|\.json|\.xml|\.txt|\.webmanifest|\.htaccess|_redirects|robots\.txt)$/i;

async function listFiles(directory, base = directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(absolutePath, base)));
    } else if (entry.isFile()) {
      files.push({
        absolutePath,
        relativePath: relative(base, absolutePath).split(sep).join("/"),
      });
    }
  }

  return files.sort((left, right) =>
    left.relativePath.localeCompare(right.relativePath, "en"),
  );
}

async function sha256(path) {
  const hash = createHash("sha256");
  hash.update(await readFile(path));
  return hash.digest("hex");
}

async function readZipEntries(path) {
  return new Promise((resolveEntries, rejectEntries) => {
    yauzl.open(path, { lazyEntries: true }, (openError, archive) => {
      if (openError || !archive) {
        rejectEntries(openError ?? new Error("Unable to open ZIP."));
        return;
      }

      const entries = new Map();
      archive.on("entry", (entry) => {
        if (entry.fileName.endsWith("/")) {
          archive.readEntry();
          return;
        }

        if (entries.has(entry.fileName)) {
          rejectEntries(new Error(`Duplicate ZIP entry: ${entry.fileName}`));
          archive.close();
          return;
        }

        archive.openReadStream(entry, (streamError, stream) => {
          if (streamError || !stream) {
            rejectEntries(
              streamError ?? new Error(`Unable to read ${entry.fileName}.`),
            );
            archive.close();
            return;
          }

          const hash = createHash("sha256");
          stream.on("data", (chunk) => hash.update(chunk));
          stream.on("error", rejectEntries);
          stream.on("end", () => {
            entries.set(entry.fileName, hash.digest("hex"));
            archive.readEntry();
          });
        });
      });
      archive.on("end", () => resolveEntries(entries));
      archive.on("error", rejectEntries);
      archive.readEntry();
    });
  });
}

function parseManifest(contents) {
  return new Map(
    contents
      .trim()
      .split(/\r?\n/)
      .map((line) => {
        const match = /^([a-f0-9]{64}) {2}(.+)$/i.exec(line);
        if (!match) {
          throw new Error(`Invalid checksum line: ${line}`);
        }
        return [match[2], match[1].toLowerCase()];
      }),
  );
}

const productionFiles = await listFiles(productionDir);
const productionPaths = productionFiles.map((file) => file.relativePath);
const zipEntryHashes = await readZipEntries(zipPath);
const zipEntries = [...zipEntryHashes.keys()].sort((left, right) =>
  left.localeCompare(right, "en"),
);
const manifest = parseManifest(await readFile(manifestPath, "utf8"));
const failures = [];

if (JSON.stringify(zipEntries) !== JSON.stringify(productionPaths)) {
  failures.push("ZIP entries differ from release/malcriado-production/.");
}

for (const file of productionFiles) {
  if (forbiddenPath.test(file.relativePath)) {
    failures.push(`Forbidden path: ${file.relativePath}`);
  }

  const actualHash = await sha256(file.absolutePath);
  if (manifest.get(file.relativePath) !== actualHash) {
    failures.push(`Checksum mismatch: ${file.relativePath}`);
  }
  if (zipEntryHashes.get(file.relativePath) !== actualHash) {
    failures.push(`ZIP content mismatch: ${file.relativePath}`);
  }

  if (textExtensions.test(file.relativePath)) {
    const contents = await readFile(file.absolutePath, "utf8");
    if (forbiddenRuntimeMarker.test(contents)) {
      failures.push(`Forbidden runtime marker: ${file.relativePath}`);
    }
  }
}

const zipHash = await sha256(zipPath);
if (manifest.get("malcriado-production.zip") !== zipHash) {
  failures.push("ZIP checksum differs from the manifest.");
}
if (expectedZipHash && expectedZipHash !== zipHash) {
  failures.push(`ZIP checksum differs from EXPECTED_RELEASE_SHA256.`);
}
if (manifest.size !== productionFiles.length + 1) {
  failures.push("Checksum manifest contains missing or unexpected entries.");
}

if (failures.length > 0) {
  throw new Error(failures.join("\n"));
}

console.log(
  JSON.stringify(
    {
      status: "pass",
      fileCount: productionFiles.length,
      zipEntryCount: zipEntries.length,
      zipSha256: zipHash,
      sourceMaps: productionPaths.filter((path) => path.endsWith(".map"))
        .length,
      forbiddenPaths: 0,
      forbiddenRuntimeMarkers: 0,
    },
    null,
    2,
  ),
);
