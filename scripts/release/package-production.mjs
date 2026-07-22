/* eslint-disable no-undef */
import { createHash } from "node:crypto";
import { createReadStream, createWriteStream } from "node:fs";
import {
  copyFile,
  mkdir,
  readFile,
  readdir,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import { dirname, relative, resolve, sep } from "node:path";
import { ZipArchive } from "archiver";

const projectRoot = resolve(process.cwd());
const distDir = resolve(projectRoot, "dist");
const releaseDir = resolve(projectRoot, "release");
const productionDir = resolve(releaseDir, "malcriado-production");
const zipPath = resolve(releaseDir, "malcriado-production.zip");
const checksumsPath = resolve(releaseDir, "malcriado-production.sha256");
const fixedDate = new Date("2000-01-01T00:00:00.000Z");

function assertInside(parent, target) {
  const pathFromParent = relative(parent, target);
  if (
    !pathFromParent ||
    pathFromParent.startsWith(`..${sep}`) ||
    pathFromParent === ".."
  ) {
    throw new Error(`Unsafe release target: ${target}`);
  }
}

async function listFiles(directory, base = directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries.sort((left, right) =>
    left.name.localeCompare(right.name, "en"),
  )) {
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

  return files;
}

async function copyPublishableFiles(files) {
  for (const file of files) {
    const destination = resolve(productionDir, file.relativePath);
    await mkdir(dirname(destination), { recursive: true });
    await copyFile(file.absolutePath, destination);
  }
}

async function sha256(path) {
  const hash = createHash("sha256");
  hash.update(await readFile(path));
  return hash.digest("hex");
}

async function createZip(files) {
  await new Promise((resolveArchive, rejectArchive) => {
    const output = createWriteStream(zipPath);
    const archive = new ZipArchive({ zlib: { level: 9 } });

    output.on("close", resolveArchive);
    output.on("error", rejectArchive);
    archive.on("error", rejectArchive);
    archive.pipe(output);

    for (const file of files) {
      archive.append(createReadStream(file.absolutePath), {
        name: file.relativePath,
        date: fixedDate,
        mode: 0o644,
      });
    }

    void archive.finalize();
  });
}

assertInside(projectRoot, productionDir);
assertInside(projectRoot, zipPath);
assertInside(projectRoot, checksumsPath);

if (!(await stat(distDir)).isDirectory()) {
  throw new Error("dist/ does not exist. Run the production build first.");
}

await mkdir(releaseDir, { recursive: true });
await rm(productionDir, { recursive: true, force: true });
await rm(zipPath, { force: true });
await mkdir(productionDir, { recursive: true });

const distFiles = await listFiles(distDir);
await copyPublishableFiles(distFiles);
const productionFiles = await listFiles(productionDir);
await createZip(productionFiles);

const checksumLines = [];
for (const file of productionFiles) {
  checksumLines.push(
    `${await sha256(file.absolutePath)}  ${file.relativePath}`,
  );
}
checksumLines.push(`${await sha256(zipPath)}  malcriado-production.zip`);
await writeFile(checksumsPath, `${checksumLines.join("\n")}\n`, "utf8");

console.log(
  JSON.stringify(
    {
      status: "pass",
      publishableFileCount: productionFiles.length,
      productionDir,
      zipPath,
      checksumsPath,
    },
    null,
    2,
  ),
);
