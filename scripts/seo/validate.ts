import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { buildRedirectsFile, buildRobotsTxt, buildSitemapXml } from "./shared";

async function assertFileContent(filePath: string, expected: string) {
  const actual = await readFile(filePath, "utf8");

  if (actual !== expected) {
    throw new Error(
      `Outdated SEO artifact: ${filePath}. Regenerate with npm run seo:generate.`,
    );
  }
}

async function main() {
  const publicDir = resolve(process.cwd(), "public");

  await Promise.all([
    assertFileContent(resolve(publicDir, "robots.txt"), buildRobotsTxt()),
    assertFileContent(resolve(publicDir, "sitemap.xml"), buildSitemapXml()),
    assertFileContent(resolve(publicDir, "_redirects"), buildRedirectsFile()),
  ]);

  console.log("SEO artifacts validated.");
}

void main();
