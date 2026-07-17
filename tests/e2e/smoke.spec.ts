import { expect, test } from "@playwright/test";

test("home renders without overflow and keeps booking CTA visible", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.locator("#main-content").getByRole("link", { name: "Reservar" }),
  ).toBeVisible();

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(overflow).toBeFalsy();
});

test("menu and especiales routes render provisional content", async ({
  page,
}) => {
  await page.goto("/menu/");
  await expect(
    page.getByRole("heading", { name: /carta malcriado/i }),
  ).toBeVisible();

  await page.goto("/especiales/");
  await expect(
    page.getByText(/no se han recuperado ofertas publicas vigentes/i),
  ).toBeVisible();
});

test("mobile menu opens, closes and keyboard returns focus", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "Mobile-only assertion");
  await page.goto("/");

  const menuButton = page.getByRole("button", { name: /abrir menu/i });
  await menuButton.click();
  await expect(
    page.getByRole("navigation", { name: /principal movil/i }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("navigation", { name: /principal movil/i }),
  ).toHaveCount(0);
  await expect(menuButton).toBeFocused();
});

test("reservation form reports pending confirmation", async ({ page }) => {
  await page.goto("/reservar/");
  await page.getByLabel("Fecha").fill("2026-07-20");
  await page.getByLabel("Hora").fill("20:00");
  await page.getByLabel("Comensales").fill("2");
  await page.getByLabel("Nombre").fill("Ada Lovelace");
  await page.getByLabel("Contacto").fill("ada@example.com");
  await page
    .getByLabel(/He leido la informacion provisional de privacidad/i)
    .check();
  await page.getByRole("button", { name: /enviar solicitud/i }).click();
  await expect(
    page.getByText(/no queda confirmada hasta respuesta del equipo/i),
  ).toBeVisible();
});

test("not found route returns 404 content", async ({ page }) => {
  await page.goto("/ruta-inexistente/");
  await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
});

test("dev assets route exposes the internal asset catalog", async ({
  page,
}) => {
  await page.goto("/dev/assets/");
  await expect(
    page.getByRole("heading", { name: /catalogo de assets/i }),
  ).toBeVisible();
  await expect(page.getByText(/Dev only/i)).toBeVisible();
});

test("dev content route exposes the editorial audit panel", async ({
  page,
}) => {
  await page.goto("/dev/content/");
  await expect(
    page.getByRole("heading", { name: /auditoria editorial/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /estados pendientes/i }),
  ).toBeVisible();
});

test("dev design system route exposes the internal component catalog", async ({
  page,
}) => {
  await page.goto("/dev/design-system/");
  await expect(
    page.getByRole("heading", {
      name: /catalogo interno del sistema de diseno/i,
    }),
  ).toBeVisible();

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(overflow).toBeFalsy();
});
