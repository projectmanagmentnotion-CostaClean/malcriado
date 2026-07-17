/* eslint-disable no-undef */
import { readBundleReport } from "./bundle-lib.mjs";

const report = await readBundleReport();

console.log(
  JSON.stringify(
    {
      initialIndexChunk: report.initialIndexChunk,
      gsapChunks: report.gsapChunks,
      routeChunks: report.routeChunks,
      cssAssets: report.cssAssets,
      topJsAssets: report.jsAssets.slice(0, 10),
    },
    null,
    2,
  ),
);
