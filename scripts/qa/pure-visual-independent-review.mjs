/* global console, document, getComputedStyle, process, URL, window */
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";

const require = createRequire(import.meta.url);
const axePath = require.resolve("axe-core/axe.min.js");
const baseUrl = process.env.VISUAL_BASE_URL ?? "http://127.0.0.1:5173";
const outputPath = path.resolve("docs/qa/pure-visual-independent-results.json");
const screenshotDir = path.resolve(
  "docs/qa/screenshots/pure-visual-independent",
);

const routes = [
  ["home", "/"],
  ["menu", "/menu/"],
  ["especiales", "/especiales/"],
  ["nosotros", "/nosotros/"],
  ["contacto", "/contacto/"],
  ["faq", "/faq/"],
  ["reservar", "/reservar/"],
  ["aviso-legal", "/aviso-legal/"],
  ["privacidad", "/privacidad/"],
  ["cookies", "/cookies/"],
  ["accesibilidad", "/declaracion-de-accesibilidad/"],
  ["404", "/ruta-inexistente/"],
];

const primaryRoutes = routes.filter(([id]) =>
  ["home", "menu", "nosotros", "reservar"].includes(id),
);

const extendedScenarios = [
  { id: "mobile-landscape", width: 844, height: 390 },
  { id: "tablet-landscape", width: 1180, height: 820 },
  { id: "low-viewport", width: 1280, height: 560 },
  { id: "zoom-125", width: 1152, height: 720, zoom: 1.25 },
  { id: "zoom-150", width: 960, height: 600, zoom: 1.5 },
  { id: "zoom-200", width: 720, height: 450, zoom: 2 },
  {
    id: "reduced-motion",
    width: 390,
    height: 844,
    reducedMotion: "reduce",
  },
];

function isLocalRequest(url) {
  return url.startsWith(baseUrl) || url.startsWith("data:");
}

function isGoogleMapRequest(url) {
  return /(^|\.)google\.[^/]+\/maps|googleusercontent\.com|gstatic\.com/i.test(
    url,
  );
}

function hasPossiblePii(url) {
  if (isLocalRequest(url)) return false;
  const parsed = new URL(url);
  const sensitiveNames =
    /^(name|nombre|email|correo|phone|telefono|allerg|alerg|message|mensaje)$/i;
  return [...parsed.searchParams.keys()].some((key) =>
    sensitiveNames.test(key),
  );
}

async function rejectConsentIfVisible(page) {
  const reject = page.getByRole("button", { name: "Rechazar", exact: true });
  if (await reject.isVisible().catch(() => false)) await reject.click();
}

async function inspectSurface(page, routeName, route, scenario) {
  const consoleErrors = [];
  const pageErrors = [];
  const externalRequests = [];

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("request", (request) => {
    const url = request.url();
    if (/^https?:/i.test(url) && !isLocalRequest(url)) {
      externalRequests.push(url);
    }
  });

  const response = await page.goto(`${baseUrl}${route}`, {
    waitUntil: "networkidle",
    timeout: 30_000,
  });
  await rejectConsentIfVisible(page);
  await page.evaluate(() => document.fonts.ready);

  const metrics = await page.evaluate(() => {
    const viewportHeight = window.innerHeight;
    const hiddenMotionContent = Array.from(
      document.querySelectorAll(
        "[data-home-reveal], [data-menu-reveal], [data-story-reveal], [data-booking-reveal]",
      ),
    ).filter((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return (
        rect.bottom > 0 &&
        rect.top < viewportHeight &&
        (style.visibility === "hidden" || Number(style.opacity) < 0.05)
      );
    }).length;

    return {
      brokenImages: Array.from(document.images).filter(
        (image) => image.complete && image.naturalWidth === 0,
      ).length,
      clientWidth: document.documentElement.clientWidth,
      h1Count: document.querySelectorAll("h1").length,
      hiddenMotionContent,
      horizontalOverflow:
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth + 1,
      scrollHeight: document.documentElement.scrollHeight,
      scrollWidth: document.documentElement.scrollWidth,
    };
  });

  return {
    ...scenario,
    route,
    routeName,
    status: response?.status() ?? null,
    consoleErrors,
    externalRequests,
    pageErrors,
    possiblePiiRequests: externalRequests.filter(hasPossiblePii),
    ...metrics,
  };
}

async function runExtendedMatrix(browser) {
  const results = [];

  for (const scenario of extendedScenarios) {
    const context = await browser.newContext({
      viewport: { width: scenario.width, height: scenario.height },
      reducedMotion: scenario.reducedMotion ?? "no-preference",
    });
    const page = await context.newPage();

    for (const [routeName, route] of primaryRoutes) {
      const result = await inspectSurface(page, routeName, route, scenario);
      results.push(result);

      if (
        (scenario.id === "mobile-landscape" ||
          scenario.id === "zoom-200" ||
          scenario.id === "reduced-motion") &&
        (routeName === "menu" || routeName === "reservar")
      ) {
        await page.screenshot({
          animations: "disabled",
          fullPage: true,
          path: path.join(screenshotDir, `${routeName}-${scenario.id}.jpg`),
          quality: 72,
          type: "jpeg",
        });
      }
    }

    await context.close();
  }

  return results;
}

async function runAxeMatrix(browser) {
  const results = [];
  const surfaces = [
    { id: "mobile", width: 390, height: 844 },
    { id: "desktop", width: 1440, height: 900 },
  ];

  for (const surface of surfaces) {
    const context = await browser.newContext({
      viewport: { width: surface.width, height: surface.height },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();

    for (const [routeName, route] of routes) {
      await page.goto(`${baseUrl}${route}`, {
        waitUntil: "networkidle",
        timeout: 30_000,
      });
      await rejectConsentIfVisible(page);
      await page.addScriptTag({ path: axePath });
      const violations = await page.evaluate(async () => {
        const audit = await window.axe.run(document, {
          runOnly: {
            type: "tag",
            values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"],
          },
        });
        return audit.violations.map((violation) => ({
          id: violation.id,
          impact: violation.impact,
          nodes: violation.nodes.length,
        }));
      });
      results.push({ route, routeName, surface: surface.id, violations });
    }

    await context.close();
  }

  return results;
}

async function runMenuStickyAudit(browser) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/menu/`, {
    waitUntil: "networkidle",
    timeout: 30_000,
  });
  await rejectConsentIfVisible(page);

  const target = page.locator('a[href="#menu-category-pizzas"]');
  await target.click();
  await page.waitForURL(/#menu-category-pizzas$/);
  await page.waitForFunction(() =>
    Boolean(
      document.querySelector(
        'a[href="#menu-category-pizzas"][aria-current="location"]',
      ),
    ),
  );

  const result = await page.evaluate(() => {
    const navigation = document.querySelector(".menu-navigation");
    const section = document.querySelector("#menu-category-pizzas");
    const heading = section?.querySelector("h2");
    const rail = document.querySelector(".menu-navigation__rail");
    const current = document.querySelector(
      '.menu-navigation__chip[aria-current="location"]',
    );
    if (!navigation || !section || !heading || !rail || !current) return null;

    const navigationRect = navigation.getBoundingClientRect();
    const sectionRect = section.getBoundingClientRect();
    const headingRect = heading.getBoundingClientRect();
    const railStyle = getComputedStyle(rail);
    return {
      activeHref: current.getAttribute("href"),
      headingClearsStickyNavigation:
        headingRect.top > navigationRect.bottom + 1,
      navigationPosition: getComputedStyle(navigation).position,
      navigationTop: navigationRect.top,
      railOverflowX: railStyle.overflowX,
      sectionClearsStickyNavigation:
        sectionRect.top > navigationRect.bottom + 1,
    };
  });

  await context.close();
  return result;
}

async function runMapConsentAudit(browser) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  const requests = [];
  page.on("request", (request) => requests.push(request.url()));

  await page.goto(`${baseUrl}/reservar/`, {
    waitUntil: "networkidle",
    timeout: 30_000,
  });
  await page.getByRole("button", { name: "Rechazar", exact: true }).click();

  const beforeConsent = {
    googleRequests: requests.filter(isGoogleMapRequest),
    iframes: await page.locator(".consent-map iframe").count(),
    placeholderVisible: await page
      .getByRole("heading", {
        name: "El mapa interactivo no se carga antes del consentimiento",
      })
      .isVisible(),
  };

  const adjust = page.getByRole("button", {
    name: "Ajustar preferencias",
    exact: true,
  });
  await adjust.click();
  await page.locator("#consent-external_media").check();
  const googleRequest = page.waitForRequest(
    (request) => isGoogleMapRequest(request.url()),
    { timeout: 15_000 },
  );
  await page
    .getByRole("button", { name: "Guardar preferencias", exact: true })
    .click();
  const mapFrame = page.locator(
    '.consent-map iframe[title="Mapa interactivo de Malcriado"]',
  );
  await mapFrame.waitFor({ state: "visible" });
  await mapFrame.scrollIntoViewIfNeeded();
  await googleRequest;
  await page
    .frameLocator('.consent-map iframe[title="Mapa interactivo de Malcriado"]')
    .locator("body")
    .waitFor({ state: "visible", timeout: 15_000 });

  const afterConsent = {
    googleRequests: requests.filter(isGoogleMapRequest),
    iframes: await page.locator(".consent-map iframe").count(),
  };
  await page.screenshot({
    animations: "disabled",
    fullPage: false,
    path: path.join(screenshotDir, "reservar-map-consented.jpg"),
    quality: 76,
    type: "jpeg",
  });

  await page
    .getByRole("button", { name: "Preferencias de cookies", exact: true })
    .click();
  await page.locator("#consent-external_media").uncheck();
  await page
    .getByRole("button", { name: "Guardar preferencias", exact: true })
    .click();
  await page
    .getByRole("heading", {
      name: "El mapa interactivo no se carga antes del consentimiento",
    })
    .waitFor({ state: "visible" });

  const afterRevocation = {
    externalLinkCount: await page
      .getByRole("link", { name: "Abrir Google Maps", exact: true })
      .count(),
    iframes: await page.locator(".consent-map iframe").count(),
    placeholderVisible: await page
      .getByRole("heading", {
        name: "El mapa interactivo no se carga antes del consentimiento",
      })
      .isVisible(),
  };

  await context.close();
  return { afterConsent, afterRevocation, beforeConsent };
}

await mkdir(screenshotDir, { recursive: true });
const browser = await chromium.launch({ headless: true });

try {
  const [extendedMatrix, axe, menuSticky, mapConsent] = await Promise.all([
    runExtendedMatrix(browser),
    runAxeMatrix(browser),
    runMenuStickyAudit(browser),
    runMapConsentAudit(browser),
  ]);

  const failures = [];
  for (const result of extendedMatrix) {
    if (result.status !== 200 && result.routeName !== "404") {
      failures.push(`${result.routeName}/${result.id}: HTTP ${result.status}`);
    }
    if (
      result.horizontalOverflow ||
      result.brokenImages ||
      result.h1Count !== 1 ||
      result.hiddenMotionContent ||
      result.consoleErrors.length ||
      result.pageErrors.length ||
      result.externalRequests.length ||
      result.possiblePiiRequests.length
    ) {
      failures.push(`${result.routeName}/${result.id}: surface regression`);
    }
  }
  for (const result of axe) {
    if (result.violations.length) {
      failures.push(
        `${result.routeName}/${result.surface}: ${result.violations.length} Axe violations`,
      );
    }
  }
  if (
    !menuSticky ||
    menuSticky.activeHref !== "#menu-category-pizzas" ||
    menuSticky.navigationPosition !== "sticky" ||
    !menuSticky.headingClearsStickyNavigation ||
    !["auto", "scroll"].includes(menuSticky.railOverflowX)
  ) {
    failures.push("menu: sticky navigation contract failed");
  }
  if (
    mapConsent.beforeConsent.iframes !== 0 ||
    mapConsent.beforeConsent.googleRequests.length !== 0 ||
    !mapConsent.beforeConsent.placeholderVisible ||
    mapConsent.afterConsent.iframes !== 1 ||
    mapConsent.afterConsent.googleRequests.length === 0 ||
    mapConsent.afterRevocation.iframes !== 0 ||
    mapConsent.afterRevocation.externalLinkCount !== 1 ||
    !mapConsent.afterRevocation.placeholderVisible
  ) {
    failures.push("reservation: map consent lifecycle failed");
  }

  const report = {
    axe,
    baseUrl,
    extendedMatrix,
    failures,
    mapConsent,
    menuSticky,
    status: failures.length ? "fail" : "pass",
  };
  await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(
    JSON.stringify(
      {
        axeChecks: axe.length,
        extendedChecks: extendedMatrix.length,
        failures,
        mapConsent,
        menuSticky,
        status: report.status,
      },
      null,
      2,
    ),
  );
  if (failures.length) process.exitCode = 1;
} finally {
  await browser.close();
}
