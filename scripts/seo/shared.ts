import { businessContent } from "../../src/content/business/business";
import { legacyRedirects } from "../../src/content/navigation/navigation";
import { seoPages } from "../../src/content/seo/pages";

function getSiteUrl() {
  const canonicalUrl = businessContent.contact.canonicalUrl.value;

  if (!canonicalUrl) {
    throw new Error("Missing canonical URL in business content.");
  }

  return canonicalUrl.endsWith("/") ? canonicalUrl : `${canonicalUrl}/`;
}

export const siteUrl = getSiteUrl();
export const seoEntries = Object.values(seoPages);
export const indexableSeoEntries = seoEntries.filter((page) =>
  page.metadata.robots.startsWith("index"),
);

function getCanonicalUrl(path: string) {
  return new URL(path.replace(/^\//, ""), siteUrl).toString();
}

export function buildSitemapXml() {
  const urls = indexableSeoEntries
    .map((page) => {
      const lastmod = page.metadata.updatedAt
        ? `\n    <lastmod>${page.metadata.updatedAt}</lastmod>`
        : "";

      return `  <url>\n    <loc>${getCanonicalUrl(page.metadata.canonicalPath)}</loc>${lastmod}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function buildRobotsTxt() {
  return `User-agent: *\nAllow: /\nDisallow: /dev/\n\nSitemap: ${getCanonicalUrl("/sitemap.xml")}\n`;
}

export function buildRedirectsFile() {
  const redirectLines = legacyRedirects.map(
    (redirect) => `${redirect.from} ${redirect.to} ${redirect.statusCode}`,
  );

  return `${redirectLines.join("\n")}\n/* /index.html 200\n`;
}
