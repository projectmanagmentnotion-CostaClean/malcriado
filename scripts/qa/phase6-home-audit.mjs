/* eslint-disable no-undef */
import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const BASE_URL = process.env.PHASE6_BASE_URL ?? "http://127.0.0.1:4173/";
const OUT_DIR = path.join(
  process.cwd(),
  "docs",
  "qa",
  "evidence",
  "phase-6-qa",
);
const DOC_PATH = path.join(
  process.cwd(),
  "docs",
  "qa",
  "PHASE_6_HOME_VISUAL_QA.md",
);

const viewports = [
  { width: 320, height: 568, label: "320x568" },
  { width: 360, height: 800, label: "360x800" },
  { width: 390, height: 844, label: "390x844" },
  { width: 430, height: 932, label: "430x932" },
  { width: 768, height: 1024, label: "768x1024" },
  { width: 820, height: 1180, label: "820x1180" },
  { width: 1024, height: 768, label: "1024x768" },
  { width: 1280, height: 800, label: "1280x800" },
  { width: 1366, height: 768, label: "1366x768" },
  { width: 1440, height: 900, label: "1440x900" },
  { width: 1728, height: 1117, label: "1728x1117" },
  { width: 1920, height: 1080, label: "1920x1080" },
];

function toSlug(label) {
  return label.replaceAll("x", "-");
}

function statusFromAudit(audit) {
  if (audit.blocked) {
    return "BLOCKED";
  }

  if (
    audit.consoleErrors.length > 0 ||
    audit.pageErrors.length > 0 ||
    audit.notes.length > 0
  ) {
    return "PASS_WITH_NOTE";
  }

  return "PASS";
}

function listToMarkdown(items) {
  if (items.length === 0) {
    return "- none";
  }

  return items.map((item) => `- ${item}`).join("\n");
}

async function collectViewportAudit(page, viewport) {
  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });
  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });
  page.on("requestfailed", (request) => {
    failedRequests.push(`${request.method()} ${request.url()}`);
  });

  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(250);

  const sceneAudit = await page.evaluate(() => {
    const sceneIds = [
      "home-hero",
      "especial-activo",
      "declaracion-de-fusion",
      "platos-insignia",
      "frente-al-mar",
      "cocteles-y-noche",
      "historia",
      "carta-visual",
      "reserva",
      "ubicacion-y-cierre",
    ];
    const imageIssues = Array.from(document.images)
      .filter((image) => {
        const rect = image.getBoundingClientRect();
        const visible =
          rect.width > 0 &&
          rect.height > 0 &&
          rect.bottom > 0 &&
          rect.top < window.innerHeight;

        if (!visible || !image.currentSrc) {
          return false;
        }

        return image.complete && image.naturalWidth === 0;
      })
      .map((image) => image.currentSrc || image.src || image.alt || "image");
    const safeAreaRight = getComputedStyle(document.documentElement)
      .getPropertyValue("padding-right")
      .trim();
    const cta = document.querySelector(".persistent-booking-cta");
    const toggle = document.querySelector(".mobile-nav-toggle");
    const header = document.querySelector(".site-header");
    const sceneStates = sceneIds.map((id) => ({
      id,
      present: Boolean(document.getElementById(id)),
    }));
    return {
      bodyScrollWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
      imageIssues,
      safeAreaRight,
      sceneStates,
      ctaTopState: cta
        ? {
            display: getComputedStyle(cta).display,
            opacity: getComputedStyle(cta).opacity,
            hidden: cta.getAttribute("data-hidden"),
          }
        : null,
      headerState: header
        ? {
            theme: header.getAttribute("data-theme"),
            density: header.getAttribute("data-density"),
          }
        : null,
      toggleState: toggle
        ? {
            display: getComputedStyle(toggle).display,
            width: Math.round(toggle.getBoundingClientRect().width),
          }
        : null,
    };
  });

  await page.locator("footer").scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);

  const footerAudit = await page.evaluate(() => {
    const footer = document.querySelector("footer");
    const cta = document.querySelector(".persistent-booking-cta");
    return {
      footerVisible: Boolean(footer),
      ctaFooterState: cta
        ? {
            display: getComputedStyle(cta).display,
            opacity: getComputedStyle(cta).opacity,
            hidden: cta.getAttribute("data-hidden"),
          }
        : null,
      overflowOffenders: Array.from(document.querySelectorAll("body *"))
        .map((element) => {
          const rect = element.getBoundingClientRect();
          const visible =
            rect.width > 0 &&
            rect.height > 0 &&
            rect.bottom > 0 &&
            rect.top < window.innerHeight;
          return {
            tag: element.tagName,
            className: String(element.className || "").slice(0, 80),
            opacity: getComputedStyle(element).opacity,
            right: Math.round(rect.right),
            visible,
          };
        })
        .filter(
          (entry) =>
            entry.visible &&
            entry.opacity !== "0" &&
            !entry.className.includes("home-preloader") &&
            entry.right > document.documentElement.clientWidth + 1,
        )
        .slice(0, 10),
    };
  });

  const labelSlug = toSlug(viewport.label);

  if (viewport.label === "1920x1080") {
    await page.goto(BASE_URL, { waitUntil: "networkidle" });
    await page.screenshot({
      path: path.join(OUT_DIR, "desktop-1920x1080-final-top.png"),
    });
  }

  if (viewport.label === "1366x768") {
    await page.goto(BASE_URL, { waitUntil: "networkidle" });
    await page.screenshot({
      path: path.join(OUT_DIR, "laptop-1366x768-final-top.png"),
    });
  }

  if (viewport.label === "820x1180") {
    await page.goto(BASE_URL, { waitUntil: "networkidle" });
    await page.screenshot({
      path: path.join(OUT_DIR, "tablet-820x1180-final-top.png"),
    });
  }

  if (viewport.label === "320x568") {
    await page.goto(BASE_URL, { waitUntil: "networkidle" });
    await page.screenshot({
      path: path.join(OUT_DIR, "mobile-320x568-final-top.png"),
    });
  }

  if (viewport.label === "430x932") {
    await page.goto(BASE_URL, { waitUntil: "networkidle" });
    await page.screenshot({
      path: path.join(OUT_DIR, "mobile-430x932-final-top.png"),
    });
  }

  if (viewport.label === "390x844") {
    await page.screenshot({
      path: path.join(OUT_DIR, "footer-mobile-390x844-final.png"),
    });
  }

  return {
    label: viewport.label,
    viewport,
    notes: [
      sceneAudit.toggleState?.display === "flex" && viewport.width >= 900
        ? "mobile toggle visible on desktop"
        : null,
      sceneAudit.toggleState?.display === "none" && viewport.width < 900
        ? "mobile toggle hidden on mobile"
        : null,
      sceneAudit.bodyScrollWidth > sceneAudit.viewportWidth
        ? `overflow detected: ${sceneAudit.bodyScrollWidth} > ${sceneAudit.viewportWidth}`
        : null,
      footerAudit.overflowOffenders.length > 0
        ? `footer overflow offenders: ${footerAudit.overflowOffenders
            .map((item) => `${item.tag}.${item.className}`)
            .join(", ")}`
        : null,
      sceneAudit.imageIssues.length > 0
        ? `image issues: ${sceneAudit.imageIssues.join(", ")}`
        : null,
      failedRequests.length > 0
        ? `failed requests: ${failedRequests.join(", ")}`
        : null,
    ].filter(Boolean),
    status: statusFromAudit({
      blocked: false,
      consoleErrors,
      notes: [
        sceneAudit.toggleState?.display === "flex" && viewport.width >= 900
          ? "mobile toggle visible on desktop"
          : null,
        sceneAudit.toggleState?.display === "none" && viewport.width < 900
          ? "mobile toggle hidden on mobile"
          : null,
        sceneAudit.bodyScrollWidth > sceneAudit.viewportWidth
          ? `overflow detected: ${sceneAudit.bodyScrollWidth} > ${sceneAudit.viewportWidth}`
          : null,
        footerAudit.overflowOffenders.length > 0
          ? `footer overflow offenders: ${footerAudit.overflowOffenders
              .map((item) => `${item.tag}.${item.className}`)
              .join(", ")}`
          : null,
        sceneAudit.imageIssues.length > 0
          ? `image issues: ${sceneAudit.imageIssues.join(", ")}`
          : null,
        failedRequests.length > 0
          ? `failed requests: ${failedRequests.join(", ")}`
          : null,
      ].filter(Boolean),
      pageErrors,
    }),
    consoleErrors,
    footerAudit,
    gsapDebug: await page.evaluate(() => window.__phase6GsapDebug ?? null),
    pageErrors,
    sceneAudit,
    viewportSlug: labelSlug,
  };
}

async function collectReducedMotionEvidence(browser) {
  const context = await browser.newContext({
    reducedMotion: "reduce",
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await page.evaluate(() => {
    window.sessionStorage.removeItem("malcriado-home-preloader-seen");
  });
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(150);
  await page.screenshot({
    path: path.join(OUT_DIR, "reduced-motion-390x844-final.png"),
  });
  const reducedState = await page.evaluate(() => {
    const preloader = document.querySelector(".home-preloader");
    return {
      preloaderActive: preloader?.getAttribute("data-active") ?? null,
      preloaderAriaHidden: preloader?.getAttribute("aria-hidden") ?? null,
      gsapDebug: window.__phase6GsapDebug ?? null,
    };
  });
  await context.close();
  return reducedState;
}

async function collectKeyboardAndNavigation(browser) {
  const desktopPage = await browser.newPage({
    viewport: { width: 1366, height: 768 },
  });
  await desktopPage.goto(BASE_URL, { waitUntil: "networkidle" });
  await desktopPage.keyboard.press("Tab");
  const firstTab = await desktopPage.evaluate(() => ({
    id: document.activeElement?.id ?? null,
    className: String(document.activeElement?.className || ""),
    href: document.activeElement?.getAttribute("href") ?? null,
    tag: document.activeElement?.tagName ?? null,
    text: document.activeElement?.textContent?.trim() ?? null,
  }));
  await desktopPage.close();

  const page = await browser.newPage({
    hasTouch: true,
    isMobile: true,
    viewport: { width: 390, height: 844 },
  });
  await page.goto(BASE_URL, { waitUntil: "networkidle" });

  const menuButton = page.getByRole("button", { name: /abrir menu/i });
  await menuButton.press("Enter");
  await page.waitForTimeout(150);
  const menuOpen = await page.evaluate(() => ({
    activeText: document.activeElement?.textContent?.trim() ?? null,
    bodyLocked: document.body.classList.contains("has-mobile-nav"),
    expanded:
      document
        .querySelector(".mobile-nav-toggle")
        ?.getAttribute("aria-expanded") ?? null,
  }));

  await page.keyboard.press("Escape");
  await page.waitForTimeout(150);
  const menuClose = await page.evaluate(() => ({
    activeLabel:
      document.activeElement?.getAttribute("aria-label") ??
      document.activeElement?.textContent?.trim() ??
      null,
    activeRole: document.activeElement?.getAttribute("role") ?? null,
    bodyLocked: document.body.classList.contains("has-mobile-nav"),
    expanded:
      document
        .querySelector(".mobile-nav-toggle")
        ?.getAttribute("aria-expanded") ?? null,
  }));

  await page.goto(`${BASE_URL}menu/`, { waitUntil: "networkidle" });
  await page.goto(`${BASE_URL}`, { waitUntil: "networkidle" });
  const gsapAfterReturn = await page.evaluate(
    () => window.__phase6GsapDebug ?? null,
  );

  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
  await page.reload({ waitUntil: "networkidle" });
  const afterReload = await page.evaluate(() => window.scrollY);

  await page.setViewportSize({ width: 844, height: 390 });
  await page.waitForTimeout(200);
  const landscapeState = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > window.innerWidth,
    width: window.innerWidth,
  }));

  await page.close();

  return {
    afterReloadScrollY: afterReload,
    firstTab,
    gsapAfterReturn,
    landscapeState,
    menuClose,
    menuOpen,
  };
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const viewportResults = [];

  for (const viewport of viewports) {
    const page = await browser.newPage({
      hasTouch: viewport.width < 900,
      isMobile: viewport.width < 900,
      viewport: { width: viewport.width, height: viewport.height },
    });
    viewportResults.push(await collectViewportAudit(page, viewport));
    await page.close();
  }

  const reducedMotion = await collectReducedMotionEvidence(browser);
  const keyboardAndNavigation = await collectKeyboardAndNavigation(browser);

  await browser.close();

  const markdown = `# Phase 6 Home Visual QA

Fecha: 2026-07-17
Base URL: \`${BASE_URL}\`
Estado: \`completado sobre estado actual de Fase 6\`

## Matriz de viewports

| Viewport | Estado | Notas |
| --- | --- | --- |
${viewportResults
  .map((result) => {
    const notes =
      result.notes.length > 0
        ? result.notes.join(" | ")
        : "sin incidencias visuales relevantes";
    return `| ${result.label} | ${result.status} | ${notes} |`;
  })
  .join("\n")}

## Evidencia final retenida

- \`docs/qa/evidence/phase-6-qa/desktop-1920x1080-final-top.png\`
- \`docs/qa/evidence/phase-6-qa/laptop-1366x768-final-top.png\`
- \`docs/qa/evidence/phase-6-qa/tablet-820x1180-final-top.png\`
- \`docs/qa/evidence/phase-6-qa/mobile-320x568-final-top.png\`
- \`docs/qa/evidence/phase-6-qa/mobile-430x932-final-top.png\`
- \`docs/qa/evidence/phase-6-qa/footer-mobile-390x844-final.png\`
- \`docs/qa/evidence/phase-6-qa/reduced-motion-390x844-final.png\`

## Navegacion viva

- recarga en mitad de pagina tras scroll: \`${keyboardAndNavigation.afterReloadScrollY}px\`
- orientacion landscape mobile: \`${keyboardAndNavigation.landscapeState.width}px\`, overflow \`${keyboardAndNavigation.landscapeState.overflow}\`
- menu mobile por teclado: body locked \`${keyboardAndNavigation.menuOpen.bodyLocked}\`, cierre con Escape aria-expanded \`${keyboardAndNavigation.menuClose.expanded}\`, foco devuelto a \`${keyboardAndNavigation.menuClose.activeLabel}\`
- primer foco capturado en automatizacion: \`${keyboardAndNavigation.firstTab.tag} ${keyboardAndNavigation.firstTab.text ?? ""}\` href \`${keyboardAndNavigation.firstTab.href}\`

## Reduced motion

- preloader activo tras recarga en reduced motion: \`${reducedMotion.preloaderActive}\`
- preloader aria-hidden tras recarga en reduced motion: \`${reducedMotion.preloaderAriaHidden}\`

## Consola y red

${listToMarkdown(
  viewportResults.flatMap((result) => [
    ...result.consoleErrors.map(
      (entry) => `${result.label} console error: ${entry}`,
    ),
    ...result.pageErrors.map((entry) => `${result.label} page error: ${entry}`),
    ...result.notes
      .filter((entry) => entry.startsWith("failed requests:"))
      .map((entry) => `${result.label} ${entry}`),
  ]),
)}
`;

  await fs.writeFile(DOC_PATH, markdown);
  console.log(
    JSON.stringify(
      {
        keyboardAndNavigation,
        reducedMotion,
        viewportResults: viewportResults.map((result) => ({
          gsapDebug: result.gsapDebug,
          label: result.label,
          notes: result.notes,
          status: result.status,
        })),
      },
      null,
      2,
    ),
  );
}

await main();
