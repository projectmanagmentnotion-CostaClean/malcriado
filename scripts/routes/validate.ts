import {
  footerNavigation,
  legacyNavigation,
  legacyRedirects,
  legalNavigation,
  mainNavigation,
} from "../../src/content/navigation/navigation";
import { seoPages } from "../../src/content/seo/pages";

const seoEntries = Object.values(seoPages);
const seoByPath = new Map(seoEntries.map((page) => [page.metadata.path, page]));

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function assertUnique(values: readonly string[], label: string) {
  const duplicates = values.filter(
    (value, index) => values.indexOf(value) !== index,
  );

  assert(
    duplicates.length === 0,
    `Duplicate ${label}: ${duplicates.join(", ")}`,
  );
}

function validateSeoPages() {
  assertUnique(
    seoEntries.map((entry) => entry.metadata.path),
    "SEO paths",
  );
  assertUnique(
    seoEntries.map((entry) => entry.metadata.canonicalPath),
    "canonical paths",
  );

  const requiredPaths = [
    "/",
    "/menu/",
    "/especiales/",
    "/nosotros/",
    "/contacto/",
    "/reservar/",
    "/aviso-legal/",
    "/privacidad/",
    "/cookies/",
    "/declaracion-de-accesibilidad/",
    "/404",
    "/dev/assets/",
    "/dev/content/",
    "/dev/design-system/",
  ];

  requiredPaths.forEach((path) => {
    assert(seoByPath.has(path), `Missing SEO entry for route ${path}`);
  });

  seoEntries.forEach((page) => {
    if (
      page.metadata.path.startsWith("/dev/") ||
      page.metadata.path === "/404"
    ) {
      assert(
        page.metadata.robots === "noindex, nofollow",
        `Route ${page.metadata.path} must stay noindex, nofollow.`,
      );
    }
  });
}

function validateNavigation() {
  [...mainNavigation, ...footerNavigation, ...legalNavigation].forEach(
    (route) => {
      assert(
        seoByPath.has(route.path),
        `Navigation route ${route.path} is missing a SEO page entry.`,
      );
    },
  );

  legacyNavigation.forEach((route) => {
    assert(
      legacyRedirects.some((redirect) => redirect.from === route.path),
      `Legacy route ${route.path} is missing a redirect definition.`,
    );
  });

  legacyRedirects.forEach((redirect) => {
    assert(
      seoByPath.has(redirect.to),
      `Legacy redirect target ${redirect.to} has no SEO page entry.`,
    );
  });
}

function main() {
  validateSeoPages();
  validateNavigation();
  console.log("Routes and SEO definitions validated.");
}

main();
