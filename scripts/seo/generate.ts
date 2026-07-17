import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { buildRedirectsFile, buildRobotsTxt, buildSitemapXml } from "./shared";

const publicDir = resolve(process.cwd(), "public");

async function main() {
  await mkdir(publicDir, { recursive: true });

  await Promise.all([
    writeFile(resolve(publicDir, "robots.txt"), buildRobotsTxt(), "utf8"),
    writeFile(resolve(publicDir, "sitemap.xml"), buildSitemapXml(), "utf8"),
    writeFile(resolve(publicDir, "_redirects"), buildRedirectsFile(), "utf8"),
  ]);

  console.log("Generated robots.txt, sitemap.xml and _redirects in public/.");
}

void main();
