import { expect, test } from "@playwright/test";

const coreRoutes = [
  "/",
  "/menu/",
  "/especiales/",
  "/nosotros/",
  "/reservar/",
  "/contacto/",
  "/faq/",
  "/aviso-legal/",
  "/privacidad/",
  "/cookies/",
  "/declaracion-de-accesibilidad/",
  "/ruta-inexistente/",
];

test.describe("mobile and iPad art direction v2", () => {
  test("keeps every public route free from horizontal overflow at 320px", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "chromium",
      "One deterministic responsive pass is sufficient",
    );
    test.setTimeout(60_000);
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto("/");
    const reject = page.getByRole("button", {
      name: "Rechazar",
      exact: true,
    });
    if (await reject.isVisible().catch(() => false)) {
      await reject.click();
    }

    for (const route of coreRoutes) {
      await page.goto(route);
      await expect(page.locator("h1")).toHaveCount(1);
      const overflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth + 1,
      );
      expect(overflow, `Unexpected horizontal overflow on ${route}`).toBe(
        false,
      );
    }
  });

  test("uses the drawer on tablet and desktop navigation from 1200px", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "chromium",
      "One deterministic responsive pass is sufficient",
    );
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto("/");

    await expect(
      page.getByRole("button", { name: /abrir menu/i }),
    ).toBeVisible();
    await expect(page.locator(".desktop-nav")).toBeHidden();

    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator(".desktop-nav")).toBeVisible();
    await expect(
      page.getByRole("button", { name: /abrir menu/i }),
    ).toBeHidden();
  });

  test("mobile menu fills the viewport and exposes a dedicated close action", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "chromium",
      "One deterministic responsive pass is sufficient",
    );
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.getByRole("button", { name: /abrir menu/i }).click();

    const navigation = page.getByRole("navigation", { name: /menu movil/i });
    const panel = page.locator(".mobile-nav-panel");
    await expect(navigation).toBeVisible();
    await expect(panel).toBeVisible();
    await expect(
      page.getByRole("button", { name: /cerrar menu movil/i }),
    ).toBeVisible();

    const panelBox = await panel.boundingBox();
    expect(panelBox?.width).toBeGreaterThanOrEqual(389);
    expect(panelBox?.height).toBeGreaterThanOrEqual(843);

    await page.getByRole("button", { name: /cerrar menu movil/i }).click();
    await expect(navigation).toHaveCount(0);
    await expect(
      page.getByRole("button", { name: /abrir menu/i }),
    ).toBeFocused();
  });

  test("mobile editorial photography is full bleed and frameless", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "chromium",
      "One deterministic responsive pass is sufficient",
    );
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const media = page.locator(".home-featured-card__media").first();
    await media.scrollIntoViewIfNeeded();
    const mediaBox = await media.boundingBox();
    const frameStyle = await media
      .locator(".media-frame__media")
      .evaluate((element) => {
        const style = getComputedStyle(element);
        return {
          borderRadius: style.borderRadius,
          borderWidth: style.borderWidth,
          boxShadow: style.boxShadow,
        };
      });

    expect(
      Math.abs(mediaBox?.x ?? Number.POSITIVE_INFINITY),
    ).toBeLessThanOrEqual(1);
    expect(mediaBox?.width).toBeGreaterThanOrEqual(389);
    expect(frameStyle).toEqual({
      borderRadius: "0px",
      borderWidth: "0px",
      boxShadow: "none",
    });
  });

  test("mobile night chips and navigation actions never overlap", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "chromium",
      "One deterministic responsive pass is sufficient",
    );
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/#scene-night");

    const chips = page.locator(".home-night__chips");
    const nightMedia = page.locator(".home-night__media");
    await chips.scrollIntoViewIfNeeded();
    const chipsBox = await chips.boundingBox();
    const mediaBox = await nightMedia.boundingBox();

    expect(chipsBox?.x).toBeGreaterThanOrEqual(0);
    expect((chipsBox?.x ?? 0) + (chipsBox?.width ?? 0)).toBeLessThanOrEqual(
      390,
    );
    expect(chipsBox?.y ?? 0).toBeLessThan(mediaBox?.y ?? 0);
    expect((chipsBox?.y ?? 0) + (chipsBox?.height ?? 0)).toBeLessThanOrEqual(
      (mediaBox?.y ?? 0) + 1,
    );

    await page.getByRole("button", { name: /abrir menu/i }).click();
    const actions = page.locator(".mobile-nav-panel__actions");
    const buttons = actions.locator(".ui-button");
    await expect(buttons).toHaveCount(2);
    const firstBox = await buttons.nth(0).boundingBox();
    const secondBox = await buttons.nth(1).boundingBox();
    expect(firstBox?.width).toBeGreaterThanOrEqual(300);
    expect(secondBox?.y ?? 0).toBeGreaterThan(
      (firstBox?.y ?? 0) + (firstBox?.height ?? 0),
    );
  });

  test("home image scroll motion is scrubbed and reversible", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "chromium",
      "One deterministic responsive pass is sufficient",
    );
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const media = page.locator(".home-special__media");
    const image = media.locator("img");
    await media.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const middleTransform = await image.evaluate(
      (element) => getComputedStyle(element).transform,
    );

    await page.evaluate(() => window.scrollBy(0, 420));
    await page.waitForTimeout(500);
    const forwardTransform = await image.evaluate(
      (element) => getComputedStyle(element).transform,
    );

    await page.evaluate(() => window.scrollBy(0, -420));
    await page.waitForTimeout(500);
    const reverseTransform = await image.evaluate(
      (element) => getComputedStyle(element).transform,
    );

    expect(forwardTransform).not.toBe(middleTransform);
    expect(reverseTransform).not.toBe(forwardTransform);
  });
});
