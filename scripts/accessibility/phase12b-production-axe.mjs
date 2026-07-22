/* eslint-disable no-undef */
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { chromium } from "playwright";

const require = createRequire(import.meta.url);
const axePath = require.resolve("axe-core/axe.min.js");
const port = 4175;
const baseUrl = `http://127.0.0.1:${port}`;
const viteBin = resolve("node_modules/vite/bin/vite.js");
const surfaces = [
  { id: "home-desktop", route: "/", width: 1440, height: 900 },
  { id: "reservar-desktop", route: "/reservar/", width: 1440, height: 900 },
  { id: "home-mobile", route: "/", width: 390, height: 844 },
  { id: "reservar-mobile", route: "/reservar/", width: 390, height: 844 },
  {
    id: "home-reduced-motion",
    route: "/",
    width: 1440,
    height: 900,
    reducedMotion: "reduce",
  },
  {
    id: "reservar-reduced-motion",
    route: "/reservar/",
    width: 1440,
    height: 900,
    reducedMotion: "reduce",
  },
];

async function waitForPreview(preview) {
  for (let attempt = 1; attempt <= 60; attempt += 1) {
    if (preview.exitCode !== null) {
      throw new Error(`Preview exited with code ${preview.exitCode}.`);
    }

    try {
      const response = await fetch(`${baseUrl}/reservar/`);
      const html = await response.text();
      if (response.status === 200 && html.includes('id="root"')) {
        return;
      }
    } catch {
      // The real HTTP readiness check below is retried for at most 30 seconds.
    }

    await new Promise((resolveWait) => setTimeout(resolveWait, 500));
  }

  throw new Error("Production preview did not become healthy.");
}

const preview = spawn(
  process.execPath,
  [
    viteBin,
    "preview",
    "--strictPort",
    "--host",
    "127.0.0.1",
    "--port",
    String(port),
  ],
  { stdio: "ignore" },
);
const browser = await chromium.launch({ headless: true });
const results = [];

try {
  await waitForPreview(preview);

  for (const surface of surfaces) {
    const page = await browser.newPage({
      viewport: { width: surface.width, height: surface.height },
      reducedMotion: surface.reducedMotion ?? "no-preference",
    });
    const consoleErrors = [];
    const pageErrors = [];
    const unexpectedExternalRequests = [];

    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));
    page.on("request", (request) => {
      const url = request.url();
      if (/^https?:/i.test(url) && !url.startsWith(baseUrl)) {
        unexpectedExternalRequests.push(url);
      }
    });

    const response = await page.goto(`${baseUrl}${surface.route}`, {
      waitUntil: "networkidle",
      timeout: 30_000,
    });
    await page.addScriptTag({ path: axePath });
    const axe = await page.evaluate(async () => {
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
    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");

    results.push({
      id: surface.id,
      route: surface.route,
      status: response?.status() ?? null,
      canonical,
      axeViolations: axe,
      consoleErrors,
      pageErrors,
      unexpectedExternalRequests,
    });
    await page.close();
  }
} finally {
  await browser.close();
  preview.kill("SIGTERM");
}

const failures = results.flatMap((result) => {
  const issues = [];
  if (result.status !== 200) issues.push(`${result.id}: HTTP ${result.status}`);
  const expectedCanonical = `https://malcriadobcn.com${result.route}`;
  if (result.canonical !== expectedCanonical) {
    issues.push(`${result.id}: invalid canonical ${result.canonical}`);
  }
  if (result.axeViolations.length > 0) {
    issues.push(`${result.id}: ${result.axeViolations.length} Axe violations`);
  }
  if (result.consoleErrors.length > 0 || result.pageErrors.length > 0) {
    issues.push(`${result.id}: browser errors detected`);
  }
  if (result.unexpectedExternalRequests.length > 0) {
    issues.push(`${result.id}: unexpected external requests detected`);
  }
  return issues;
});

console.log(
  JSON.stringify(
    { status: failures.length ? "fail" : "pass", results },
    null,
    2,
  ),
);
if (failures.length > 0) throw new Error(failures.join("\n"));
