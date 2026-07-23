/* global console, document, getComputedStyle, process */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";

const baseUrl = process.env.VISUAL_BASE_URL ?? "http://127.0.0.1:4174";
const label = process.env.VISUAL_LABEL ?? "candidate";
const outputDir = path.resolve("docs/qa/screenshots/mobile-ipad", label);
const resultsPath = path.resolve(`docs/qa/mobile-ipad-matrix-${label}.json`);

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

const viewports = [
  [320, 568],
  [360, 800],
  [375, 667],
  [375, 812],
  [390, 844],
  [393, 852],
  [412, 915],
  [430, 932],
  [744, 1133],
  [768, 1024],
  [810, 1080],
  [820, 1180],
  [834, 1194],
  [1024, 768],
  [1024, 1366],
  [1180, 820],
  [1194, 834],
  [1366, 1024],
  [1280, 720],
  [1440, 900],
  [1920, 1080],
  [2560, 1440],
];

const captureViewports = new Set([
  "390x844",
  "768x1024",
  "1024x768",
  "1440x900",
]);
const captureRoutes = new Set(["home", "menu", "nosotros", "reservar"]);

await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];

for (const [width, height] of viewports) {
  const viewport = `${width}x${height}`;
  const context = await browser.newContext({
    viewport: { width, height },
    reducedMotion: "reduce",
    colorScheme: "dark",
  });
  const page = await context.newPage();

  for (const [routeName, route] of routes) {
    const response = await page.goto(`${baseUrl}${route}`, {
      waitUntil: "networkidle",
    });
    const reject = page.getByRole("button", { name: "Rechazar", exact: true });
    if (await reject.isVisible().catch(() => false)) {
      await reject.click();
    }
    await page.evaluate(() => document.fonts.ready);

    const metrics = await page.evaluate(() => {
      const visibleTargets = Array.from(
        document.querySelectorAll(
          "button, .ui-button, .icon-button, .menu-navigation__chip, .faq-item__trigger",
        ),
      ).filter((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return (
          rect.width > 0 &&
          rect.height > 0 &&
          style.display !== "none" &&
          style.visibility !== "hidden"
        );
      });

      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        scrollHeight: document.documentElement.scrollHeight,
        h1Count: document.querySelectorAll("h1").length,
        brokenImages: Array.from(document.images).filter(
          (image) => image.complete && image.naturalWidth === 0,
        ).length,
        undersizedPrimaryTargets: visibleTargets.filter((element) => {
          const rect = element.getBoundingClientRect();
          return rect.width < 44 || rect.height < 44;
        }).length,
        desktopNavVisible:
          getComputedStyle(document.querySelector(".desktop-nav")).display !==
          "none",
        drawerToggleVisible:
          getComputedStyle(document.querySelector(".mobile-nav-toggle"))
            .display !== "none",
      };
    });

    results.push({
      route,
      routeName,
      viewport,
      status: response?.status() ?? null,
      horizontalOverflow: metrics.scrollWidth > metrics.clientWidth + 1,
      ...metrics,
    });

    if (captureViewports.has(viewport) && captureRoutes.has(routeName)) {
      await page.screenshot({
        path: path.join(outputDir, `${routeName}-${viewport}.jpg`),
        fullPage: true,
        type: "jpeg",
        quality: 72,
        animations: "disabled",
      });
    }
  }

  await context.close();
  console.log(`${label}: ${viewport} complete.`);
}

await browser.close();
await writeFile(resultsPath, `${JSON.stringify(results, null, 2)}\n`, "utf8");

const failures = results.filter(
  (result) =>
    result.horizontalOverflow ||
    result.brokenImages > 0 ||
    result.h1Count !== 1 ||
    (result.routeName !== "404" && result.status !== 200) ||
    (Number.parseInt(result.viewport, 10) < 1200 &&
      (result.desktopNavVisible || !result.drawerToggleVisible)) ||
    (Number.parseInt(result.viewport, 10) >= 1200 &&
      (!result.desktopNavVisible || result.drawerToggleVisible)),
);

console.log(
  JSON.stringify(
    {
      checks: results.length,
      failures: failures.length,
      failureDetails: failures,
    },
    null,
    2,
  ),
);
process.exitCode = failures.length > 0 ? 1 : 0;
