/* eslint-disable no-undef */
import { mkdir, readFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { resolve } from "node:path";

const port = 4174;
const baseUrl = `http://127.0.0.1:${port}`;
const outputDir = resolve(".tmp-lighthouse");
const viteBin = resolve("node_modules/vite/bin/vite.js");
const npx = process.platform === "win32" ? "npx.cmd" : "npx";

function run(command, args) {
  return new Promise((resolveRun, reject) => {
    const isWindows = process.platform === "win32";
    const executable = isWindows ? (process.env.ComSpec ?? "cmd.exe") : command;
    const executableArgs = isWindows
      ? ["/d", "/s", "/c", command, ...args]
      : args;
    const child = spawn(executable, executableArgs, { stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code !== 0) {
        console.warn(
          `${command} exited with ${code}; validating the generated report.`,
        );
      }
      resolveRun();
    });
  });
}

async function waitForPreview() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      // Preview is still starting.
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 250));
  }
  throw new Error("Production preview did not become ready.");
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

await mkdir(outputDir, { recursive: true });
const preview = spawn(
  process.execPath,
  [viteBin, "preview", "--host", "127.0.0.1", "--port", String(port)],
  {
    stdio: "ignore",
  },
);

try {
  await waitForPreview();
  for (const [name, route] of [
    ["home", "/"],
    ["reservar", "/reservar/"],
  ]) {
    const outputPath = resolve(outputDir, `${name}.json`);
    await run(npx, [
      "--yes",
      "lighthouse@13.4.1",
      `${baseUrl}${route}`,
      "--quiet",
      "--chrome-flags=--headless --no-sandbox",
      "--output=json",
      `--output-path=${outputPath}`,
    ]);
    assertReport(route, JSON.parse(await readFile(outputPath, "utf8")));
  }
} finally {
  preview.kill();
}
