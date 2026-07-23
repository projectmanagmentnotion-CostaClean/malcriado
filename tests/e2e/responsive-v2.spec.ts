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
});
