import { expect, test } from "@playwright/test";

function getFutureServiceDateIso() {
  const date = new Date();
  do {
    date.setDate(date.getDate() + 1);
  } while (date.getDay() === 1);
  return date.toISOString().slice(0, 10);
}

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
  await expect(
    page.getByText(/carta en html con platos, bebidas y postres/i),
  ).toBeVisible();

  await page.goto("/especiales/");
  await expect(
    page.getByRole("heading", {
      name: /especiales y promociones de malcriado/i,
    }),
  ).toBeVisible();

  await page.goto("/faq/");
  await expect(
    page.getByRole("heading", {
      name: /preguntas frecuentes antes de reservar/i,
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

test("reservation form requires an explicit delivery channel", async ({
  page,
}) => {
  await page.goto("/reservar/");
  await page.getByLabel("Fecha").fill(getFutureServiceDateIso());
  await page.getByLabel("Hora").fill("20:00");
  await page.locator("#booking-guests").fill("2");
  await page.getByLabel("Nombre").fill("Ada Lovelace");
  await page.getByLabel("Telefono").fill("+34 600 000 000");
  await page.getByLabel(/He leido la informacion de privacidad/i).check();
  await page.waitForTimeout(3100);
  await page.getByRole("button", { name: /preparar solicitud/i }).click();
  await expect(page.getByText(/tu solicitud está lista/i)).toBeVisible();
  await expect(
    page.getByRole("link", { name: /enviar por whatsapp/i }),
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
  await expect(
    page.getByText("Margarita / Pizzas", { exact: true }),
  ).toBeVisible();

  await page.goto("/reservar/?dish=margarita");
  await expect(
    page.getByText("Margarita / Cocteles", { exact: true }),
  ).toBeVisible();
});

test("home hero booking CTA survives navigation, reload and history", async ({
  page,
}) => {
  await page.goto("/");

  await page
    .locator("#home-hero")
    .getByRole("link", { name: "Reservar mesa" })
    .click();

  await expect(page).toHaveURL(/\/reservar\/\?context=home-hero$/);
  await expect(
    page.getByRole("heading", { level: 1, name: /solicita tu mesa/i }),
  ).toBeVisible();

  await page.reload();
  await expect(page).toHaveURL(/\/reservar\/\?context=home-hero$/);
  await expect(
    page.getByRole("heading", { level: 1, name: /solicita tu mesa/i }),
  ).toBeVisible();

  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /cocina fusion latinoamericana y mediterranea frente al mar/i,
    }),
  ).toBeVisible();

  await page.goForward();
  await expect(page).toHaveURL(/\/reservar\/\?context=home-hero$/);
  await expect(
    page.getByRole("heading", { level: 1, name: /solicita tu mesa/i }),
  ).toBeVisible();
});

test("rapid route navigation keeps shell stable without console errors", async ({
  page,
}) => {
  const severeConsoleErrors: string[] = [];

  page.on("console", (message) => {
    if (
      message.type() === "error" &&
      !message.text().includes("Failed to load resource")
    ) {
      severeConsoleErrors.push(message.text());
    }
  });

  await page.goto("/");
  await page.goto("/menu/", { waitUntil: "domcontentloaded" });
  await expect(
    page.getByRole("heading", { name: /carta malcriado/i }),
  ).toBeVisible();

  await page.goto("/contacto/", { waitUntil: "domcontentloaded" });
  await expect(
    page.getByRole("heading", {
      name: /contacto y como llegar a malcriado en pineda de mar/i,
    }),
  ).toBeVisible();

  await page.goto("/reservar/", { waitUntil: "domcontentloaded" });
  await expect(
    page.getByRole("heading", { level: 1, name: /solicita tu mesa/i }),
  ).toBeVisible();

  await page.goBack({ waitUntil: "domcontentloaded" });
  await expect(page).toHaveURL(/\/contacto\/$/);

  await page.goBack({ waitUntil: "domcontentloaded" });
  await expect(page).toHaveURL(/\/menu\/$/);

  await page.goForward({ waitUntil: "domcontentloaded" });
  await expect(page).toHaveURL(/\/contacto\/$/);

  await page.goto("/faq/", { waitUntil: "domcontentloaded" });

  await expect(
    page.getByRole("heading", {
      name: /preguntas frecuentes antes de reservar/i,
    }),
  ).toBeVisible();
  expect(severeConsoleErrors).toEqual([]);
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

test("production build blocks all internal development routes", async ({
  page,
}) => {
  for (const path of [
    "/dev/assets/",
    "/dev/content/",
    "/dev/design-system/",
    "/dev/reservations/",
  ]) {
    await page.goto(path);
    await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
    await expect(page.getByText(/recorrido publico/i)).toBeVisible();
  }
});
