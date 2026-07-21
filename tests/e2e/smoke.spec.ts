import { expect, test } from "@playwright/test";

test("home renders without overflow and keeps booking CTA visible", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page
      .locator("#main-content")
      .getByRole("link", { name: "Reservar mesa", exact: true }),
  ).toBeVisible();

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(overflow).toBeFalsy();
});

test("keyboard starts on skip link before entering home content", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "Desktop keyboard assertion");
  await page.goto("/");
  await page.keyboard.press("Tab");

  const skipLink = page.getByRole("link", {
    name: "Saltar al contenido principal",
  });

  await expect(skipLink).toBeFocused();
  await expect(skipLink).toHaveAttribute("href", "#main-content");
});

test("menu and especiales routes render editorial content", async ({
  page,
}) => {
  await page.goto("/menu/");
  await expect(
    page.getByRole("heading", { name: /carta malcriado/i }),
  ).toBeVisible();
  await expect(page.getByText(/carta html/i)).toBeVisible();

  await page.goto("/especiales/");
  await expect(
    page.getByRole("heading", {
      name: /estado editorial de ofertas y vigencia/i,
    }),
  ).toBeVisible();
});

test("menu deep links land on the requested category chapter", async ({
  page,
}) => {
  await page.goto("/menu/#menu-category-pizzas");
  await expect(page).toHaveURL(/#menu-category-pizzas$/);
  await expect(
    page.getByRole("heading", { level: 2, name: /^pizzas$/i }),
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
    page.getByRole("navigation", { name: /menu movil/i }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("navigation", { name: /menu movil/i }),
  ).toHaveCount(0);
  await expect(menuButton).toBeFocused();
});

test("persistent CTA hides at footer and reappears when leaving footer", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "Mobile-only assertion");
  await page.goto("/");

  const cta = page.locator(".persistent-booking-cta");
  await expect(cta).toHaveAttribute("data-hidden", "false");

  await page.locator("footer").scrollIntoViewIfNeeded();
  await expect(cta).toHaveAttribute("data-hidden", "true");

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "auto" }));
  await expect(cta).toHaveAttribute("data-hidden", "false");
});

test("persistent CTA stays off on reservar and returns on home navigation", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "Mobile-only assertion");
  await page.goto("/");

  const cta = page.locator(".persistent-booking-cta");
  await expect(cta).toBeVisible();

  await page.goto("/reservar/");
  await expect(cta).toHaveCount(0);

  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(cta).toBeVisible();
  await expect(cta).toHaveAttribute("data-hidden", "false");
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

test("legacy privacy route redirects to the current legal URL", async ({
  page,
}) => {
  await page.goto("/declaracion-de-privacidad/");
  await expect(page).toHaveURL(/\/privacidad\/$/);
  await expect(
    page.getByRole("heading", { name: /privacidad/i }),
  ).toBeVisible();
});

test("booking route surfaces contextual entry copy", async ({ page }) => {
  await page.goto(
    "/reservar/?context=featured-dish&item=pulpo-al-chimichurri&category=cat-hot-dishes",
  );
  await expect(page.getByText(/solicitud iniciada desde carta/i)).toBeVisible();
});

test("booking context disambiguates identical dish names across categories", async ({
  page,
}) => {
  await page.goto("/reservar/?dish=pizza-margarita");
  await expect(page.getByText(/margarita \/ pizzas/i)).toBeVisible();

  await page.goto("/reservar/?dish=margarita");
  await expect(page.getByText(/margarita \/ cocteles/i)).toBeVisible();
});

test("not found route returns 404 content", async ({ page }) => {
  await page.goto("/ruta-inexistente/");
  await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
});

test("accessibility statement route renders public compliance copy", async ({
  page,
}) => {
  await page.goto("/declaracion-de-accesibilidad/");
  await expect(
    page.getByRole("heading", { name: /declaracion de accesibilidad/i }),
  ).toBeVisible();
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
