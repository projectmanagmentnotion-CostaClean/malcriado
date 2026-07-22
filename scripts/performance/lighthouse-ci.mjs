/* eslint-disable no-undef */
import { spawn } from "node:child_process";
import { createWriteStream } from "node:fs";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:net";
import { resolve } from "node:path";

const port = 4174;
const baseUrl = `http://127.0.0.1:${port}`;
const outputDir = resolve(
  process.env.LIGHTHOUSE_OUTPUT_DIR ?? ".tmp-lighthouse",
);
const viteBin = resolve("node_modules/vite/bin/vite.js");
const npx = process.platform === "win32" ? "npx.cmd" : "npx";
const chromiumLogPath = resolve(outputDir, "chromium.log");
const chromeFlags = [
  "--headless",
  "--no-sandbox",
  "--disable-dev-shm-usage",
  "--disable-background-timer-throttling",
  "--disable-backgrounding-occluded-windows",
  "--disable-renderer-backgrounding",
  "--window-size=1350,940",
  "--enable-logging",
  `--log-file=${chromiumLogPath}`,
].join(" ");

async function assertPreviewPortAvailable() {
  await new Promise((resolvePort, reject) => {
    const probe = createServer();

    probe.unref();
    probe.once("error", (error) => {
      reject(
        new Error(
          `[preview-health] 127.0.0.1:${port} is unavailable (${error.code ?? error.message})`,
        ),
      );
    });
    probe.listen({ host: "127.0.0.1", port, exclusive: true }, () => {
      probe.close((error) => (error ? reject(error) : resolvePort()));
    });
  });
}

function spawnCommand(command, args, options = {}) {
  const isWindows = process.platform === "win32";
  const executable = isWindows ? (process.env.ComSpec ?? "cmd.exe") : command;
  const executableArgs = isWindows
    ? ["/d", "/s", "/c", command, ...args]
    : args;

  return spawn(executable, executableArgs, options);
}

function run(command, args, logName) {
  return new Promise((resolveRun, reject) => {
    const log = createWriteStream(resolve(outputDir, logName), { flags: "a" });
    const child = spawnCommand(command, args, {
      stdio: ["ignore", "pipe", "pipe"],
    });

    child.stdout?.pipe(process.stdout);
    child.stderr?.pipe(process.stderr);
    child.stdout?.pipe(log, { end: false });
    child.stderr?.pipe(log, { end: false });
    child.on("error", reject);
    child.on("exit", (code) => {
      log.end();
      resolveRun(code ?? 1);
    });
  });
}

async function getHealthyRoute(name, route) {
  const response = await fetch(`${baseUrl}${route}`, {
    headers: { Accept: "text/html" },
    redirect: "manual",
  });
  const html = await response.text();
  const contentType = response.headers.get("content-type") ?? "";

  await writeFile(resolve(outputDir, `${name}-response.html`), html, "utf8");
  await writeFile(
    resolve(outputDir, `${name}-headers.json`),
    JSON.stringify(
      {
        url: response.url,
        status: response.status,
        contentType,
        headers: Object.fromEntries(response.headers.entries()),
      },
      null,
      2,
    ),
    "utf8",
  );

  if (
    response.status !== 200 ||
    !contentType.includes("text/html") ||
    !html.includes('id="root"')
  ) {
    throw new Error(
      `Preview health check failed for ${route}: status=${response.status} content-type=${contentType}`,
    );
  }

  console.log(
    `[preview-health] route=${route} status=200 bytes=${Buffer.byteLength(html)}`,
  );
}

async function waitForPreview(preview) {
  let lastError = null;

  for (let attempt = 1; attempt <= 60; attempt += 1) {
    if (preview.exitCode !== null) {
      throw new Error(
        `Production preview exited before readiness with code ${preview.exitCode}.`,
      );
    }

    try {
      await getHealthyRoute("home", "/");
      await getHealthyRoute("reservar", "/reservar/");
      console.log(
        `[preview-health] host=127.0.0.1 port=${port} ready=true attempts=${attempt}`,
      );
      await writeFile(
        resolve(outputDir, "preview-status.json"),
        JSON.stringify(
          {
            host: "127.0.0.1",
            port,
            pid: preview.pid ?? null,
            ready: true,
            attempts: attempt,
            checkedRoutes: ["/", "/reservar/"],
          },
          null,
          2,
        ),
        "utf8",
      );
      return;
    } catch (error) {
      lastError = error;
    }

    await new Promise((resolveWait) => setTimeout(resolveWait, 500));
  }

  throw new Error(
    `Production preview did not become healthy: ${lastError instanceof Error ? lastError.message : "unknown error"}`,
  );
}

async function captureBrowserDiagnostics() {
  const { chromium } = await import("@playwright/test");
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.CHROME_PATH
      ? { executablePath: process.env.CHROME_PATH }
      : {}),
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  const diagnostics = [];

  try {
    for (const [name, route] of [
      ["home", "/"],
      ["reservar", "/reservar/"],
    ]) {
      const page = await browser.newPage({
        viewport: { width: 412, height: 915 },
        reducedMotion: "no-preference",
      });
      const pageMessages = [];
      page.on("console", (message) => {
        pageMessages.push(`console:${message.type()}:${message.text()}`);
      });
      page.on("pageerror", (error) => {
        pageMessages.push(`pageerror:${error.message}`);
      });

      const response = await page.goto(`${baseUrl}${route}`, {
        waitUntil: "networkidle",
        timeout: 30_000,
      });
      await page.locator("[data-route-heading='true']").waitFor({
        state: "visible",
        timeout: 10_000,
      });
      await page.screenshot({
        path: resolve(outputDir, `${name}-render.png`),
        fullPage: false,
      });
      await writeFile(
        resolve(outputDir, `${name}-hydrated.html`),
        await page.content(),
        "utf8",
      );
      diagnostics.push({
        route,
        status: response?.status() ?? null,
        title: await page.title(),
        headingVisible: await page
          .locator("[data-route-heading='true']")
          .isVisible(),
        messages: pageMessages,
      });
      await page.close();
    }
  } finally {
    const browserVersion = browser.version();
    await browser.close();
    await writeFile(
      resolve(outputDir, "browser-diagnostics.json"),
      JSON.stringify({ browserVersion, diagnostics }, null, 2),
      "utf8",
    );
  }
}

function assertReport(route, report) {
  const scores = Object.fromEntries(
    Object.entries(report.categories).map(([key, value]) => [key, value.score]),
  );
  const lcp = report.audits["largest-contentful-paint"].numericValue;
  const cls = report.audits["cumulative-layout-shift"].numericValue;

  if (
    scores.performance < 0.75 ||
    scores.accessibility < 1 ||
    scores["best-practices"] < 1 ||
    scores.seo < 1 ||
    lcp > 4500 ||
    cls > 0.11
  ) {
    throw new Error(
      `Lighthouse budget failed for ${route}: ${JSON.stringify({ scores, lcp, cls })}`,
    );
  }

  console.log(JSON.stringify({ route, scores, lcp, cls }));
}

async function runLighthouse(name, route) {
  const outputBase = resolve(outputDir, name);
  const jsonPath = `${outputBase}.report.json`;

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    await rm(jsonPath, { force: true });
    const exitCode = await run(
      npx,
      [
        "--yes",
        "lighthouse@13.4.1",
        `${baseUrl}${route}`,
        "--quiet",
        `--chrome-flags=${chromeFlags}`,
        "--max-wait-for-load=45000",
        "--output=json",
        "--output=html",
        `--output-path=${outputBase}`,
      ],
      `${name}-lighthouse.log`,
    );

    const report = JSON.parse(await readFile(jsonPath, "utf8"));
    if (!report.runtimeError) {
      assertReport(route, report);
      return;
    }

    if (attempt === 2) {
      throw new Error(
        `Lighthouse runtime failed for ${route}: ${JSON.stringify(report.runtimeError)}`,
      );
    }

    console.warn(
      `Lighthouse runtime failed for ${route} (${report.runtimeError.code}, exit ${exitCode}); retrying once.`,
    );
  }
}

await rm(outputDir, { force: true, recursive: true });
await mkdir(outputDir, { recursive: true });
await assertPreviewPortAvailable();
const previewLog = createWriteStream(resolve(outputDir, "preview.log"), {
  flags: "a",
});
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
  {
    stdio: ["ignore", "pipe", "pipe"],
  },
);
preview.stdout?.pipe(previewLog, { end: false });
preview.stderr?.pipe(previewLog, { end: false });
preview.stdout?.pipe(process.stdout);
preview.stderr?.pipe(process.stderr);

try {
  await waitForPreview(preview);
  await captureBrowserDiagnostics();
  for (const [name, route] of [
    ["home", "/"],
    ["reservar", "/reservar/"],
  ]) {
    await runLighthouse(name, route);
  }
} finally {
  preview.kill("SIGTERM");
  previewLog.end();
}
