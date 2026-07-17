/* eslint-disable no-undef */
import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { chromium } from "playwright";

const require = createRequire(import.meta.url);

const BASE_URL = process.env.PHASE6_BASE_URL ?? "http://127.0.0.1:4173/";
const DOC_PATH = path.join(
  process.cwd(),
  "docs",
  "home",
  "HOME_ACCESSIBILITY_AUDIT.md",
);
const axePath = require.resolve("axe-core/axe.min.js");

const audits = [
  {
    id: "home",
    label: "Home",
    prepare: async (page) => {
      await page.goto(BASE_URL, { waitUntil: "networkidle" });
    },
  },
  {
    id: "mobile-menu",
    label: "Home mobile menu abierto",
    prepare: async (page) => {
      await page.goto(BASE_URL, { waitUntil: "networkidle" });
      await page.setViewportSize({ width: 390, height: 844 });
      await page.getByRole("button", { name: /abrir menu/i }).click();
      await page.waitForTimeout(150);
    },
  },
  {
    id: "reduced-motion",
    label: "Home reduced motion",
    prepare: async (page) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(BASE_URL, { waitUntil: "networkidle" });
    },
  },
  {
    id: "reservar",
    label: "Reservar",
    prepare: async (page) => {
      await page.goto(`${BASE_URL}reservar/`, { waitUntil: "networkidle" });
    },
  },
  {
    id: "footer",
    label: "Footer home",
    prepare: async (page) => {
      await page.goto(BASE_URL, { waitUntil: "networkidle" });
      await page.locator("footer").scrollIntoViewIfNeeded();
      await page.waitForTimeout(150);
    },
  },
  {
    id: "dev-design-system",
    label: "Dev design system",
    prepare: async (page) => {
      await page.goto(`${BASE_URL}dev/design-system/`, {
        waitUntil: "networkidle",
      });
    },
  },
];

function summarizeViolations(violations) {
  return violations.map((violation) => ({
    id: violation.id,
    impact: violation.impact,
    nodes: violation.nodes.length,
  }));
}

async function runAudit(page) {
  await page.addScriptTag({ path: axePath });
  return page.evaluate(async () => {
    const result = await window.axe.run(document, {
      resultTypes: ["violations"],
      runOnly: {
        type: "tag",
        values: ["wcag2a", "wcag2aa"],
      },
    });

    return {
      seriousOrCritical: result.violations.filter((violation) =>
        ["serious", "critical"].includes(violation.impact ?? ""),
      ),
      totalViolations: result.violations.length,
    };
  });
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const results = [];

for (const audit of audits) {
  await audit.prepare(page);
  const result = await runAudit(page);
  results.push({
    id: audit.id,
    label: audit.label,
    seriousOrCritical: summarizeViolations(result.seriousOrCritical),
    totalViolations: result.totalViolations,
  });
}

await browser.close();

const markdown = `# Home Accessibility Audit

Fecha: 2026-07-17
Base URL: \`${BASE_URL}\`
Metodo: \`Playwright + axe-core\`

## Resumen

| Superficie | Violaciones Axe | Violaciones serias o criticas |
| --- | --- | --- |
${results
  .map(
    (result) =>
      `| ${result.label} | ${result.totalViolations} | ${result.seriousOrCritical.length} |`,
  )
  .join("\n")}

## Detalle serio o critico

${results
  .map((result) => {
    if (result.seriousOrCritical.length === 0) {
      return `### ${result.label}\n\n- ninguna violacion seria o critica detectada`;
    }

    return `### ${result.label}\n\n${result.seriousOrCritical
      .map(
        (violation) =>
          `- ${violation.id} | impacto: ${violation.impact} | nodos: ${violation.nodes}`,
      )
      .join("\n")}`;
  })
  .join("\n\n")}

## Notas manuales pendientes

- este documento no declara cumplimiento AA por si solo
- la navegacion por teclado, reduced motion y CTA persistente se contrastan tambien en \`docs/qa/PHASE_6_HOME_VISUAL_QA.md\`
- sigue faltando una pasada humana con lector de pantalla real
`;

await fs.writeFile(DOC_PATH, markdown);
console.log(JSON.stringify(results, null, 2));
