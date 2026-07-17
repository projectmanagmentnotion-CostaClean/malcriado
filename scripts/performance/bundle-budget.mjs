/* eslint-disable no-undef */
import { readBundleReport } from "./bundle-lib.mjs";

const MAIN_BUDGET_BYTES = 500 * 1024;

const report = await readBundleReport();

if (!report.initialIndexChunk) {
  throw new Error("No se encontro el chunk inicial index-*.js en dist/assets.");
}

const failures = [];

if (report.initialIndexChunk.bytes > MAIN_BUDGET_BYTES) {
  failures.push(
    `Chunk principal fuera de presupuesto: ${report.initialIndexChunk.fileName} (${report.initialIndexChunk.kb} kB > ${(MAIN_BUDGET_BYTES / 1024).toFixed(2)} kB).`,
  );
}

if (report.routeChunks.length === 0) {
  failures.push("No se detectaron chunks de rutas lazy en dist/assets.");
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    JSON.stringify(
      {
        status: "pass",
        budgetKb: Number((MAIN_BUDGET_BYTES / 1024).toFixed(2)),
        initialIndexChunk: report.initialIndexChunk,
        routeChunkCount: report.routeChunks.length,
        gsapChunkCount: report.gsapChunks.length,
      },
      null,
      2,
    ),
  );
}
