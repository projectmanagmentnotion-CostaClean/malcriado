/* global console, document, process */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";

const baseUrl = process.env.VISUAL_BASE_URL ?? "http://127.0.0.1:5173";
const outputDir = path.resolve("docs/qa/screenshots/pure-visual-design");
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
  [375, 812],
  [390, 844],
  [412, 915],
  [430, 932],
  [768, 1024],
  [820, 1180],
  [1024, 768],
  [1280, 720],
  [1366, 768],
  [1440, 900],
  [1536, 864],
  [1920, 1080],
  [2560, 1440],
];
const captureAll = new Set(["390x844", "1440x900"]);
const capturePrimary = new Set(["320x568", "2560x1440"]);
const primaryRoutes = new Set(["home", "menu", "nosotros", "reservar"]);

await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];

for (const [width, height] of viewports) {
  const viewportName = `${width}x${height}`;
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

    const metrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      scrollHeight: document.documentElement.scrollHeight,
      h1Count: document.querySelectorAll("h1").length,
      brokenImages: Array.from(document.images).filter(
        (image) => image.complete && image.naturalWidth === 0,
      ).length,
      emptyMediaFrames: document.querySelectorAll(".media-frame__media:empty")
        .length,
    }));
    results.push({
      route,
      routeName,
      viewport: viewportName,
      status: response?.status() ?? null,
      horizontalOverflow: metrics.scrollWidth > metrics.clientWidth + 1,
      ...metrics,
    });

    if (
      captureAll.has(viewportName) ||
      (capturePrimary.has(viewportName) && primaryRoutes.has(routeName))
    ) {
      await page.screenshot({
        path: path.join(outputDir, `${routeName}-${viewportName}.jpg`),
        fullPage: true,
        type: "jpeg",
        quality: 70,
        animations: "disabled",
      });
    }
  }

  await context.close();
  console.log(`Visual matrix ${viewportName} complete.`);
}

await browser.close();
await writeFile(
  path.resolve("docs/qa/visual-matrix-results.json"),
  `${JSON.stringify(results, null, 2)}\n`,
  "utf8",
);

const failures = results.filter(
  (result) =>
    result.horizontalOverflow ||
    result.brokenImages > 0 ||
    result.emptyMediaFrames > 0 ||
    result.h1Count !== 1 ||
    (result.routeName !== "404" && result.status !== 200),
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
