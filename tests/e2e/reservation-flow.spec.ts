import { expect, test } from "@playwright/test";

function getNextServiceDateIso() {
  const date = new Date();
  do {
    date.setDate(date.getDate() + 1);
  } while (date.getDay() === 1);
  return date.toISOString().slice(0, 10);
}

async function fillReservationForm(page: import("@playwright/test").Page) {
  await page.getByLabel("Fecha").fill(getNextServiceDateIso());
  await page.getByLabel("Hora").fill("20:30");
  await page.locator("#booking-guests").fill("2");
  await page.getByLabel("Nombre").fill("Ada Lovelace");
  await page.getByLabel("Telefono").fill("+34 600 000 000");
  await page.getByLabel(/He leido la informacion de privacidad/i).check();
  await page.waitForTimeout(3100);
}

test("reservation flow prepares explicit fallback actions without false persistence", async ({
  page,
}) => {
  await page.goto("/reservar/");
  await fillReservationForm(page);

  await page.getByRole("button", { name: /preparar solicitud/i }).click();
  await expect(
    page.getByRole("heading", { name: "Solicitud preparada" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /enviar por whatsapp/i }),
  ).toBeVisible();
  await expect(
    page.locator('[data-status="prepared_for_contact"]'),
  ).not.toContainText("Reserva confirmada");
  await expect(page.getByText(/revisa el mensaje antes/i)).toBeVisible();
});

test("reservation contact URLs contain only approved message fields", async ({
  page,
}) => {
  await page.goto("/reservar/");
  await fillReservationForm(page);
  await page.getByLabel("Correo electronico").fill("ada@example.com");
  await page.locator("#booking-allergies").fill("Frutos secos");

  await page.getByRole("button", { name: /preparar solicitud/i }).click();
  const href = await page
    .getByRole("link", { name: /enviar por whatsapp/i })
    .getAttribute("href");
  expect(href).not.toContain("Frutos%20secos");
  expect(href).toContain("Ada");
  expect(href).not.toContain("600%20000");
  expect(href).not.toContain("ada%40example");
  expect(href).toContain("Referencia");
});

test("allergy details require explicit message consent", async ({ page }) => {
  await page.goto("/reservar/");
  await fillReservationForm(page);
  await page.locator("#booking-allergies").fill("Frutos secos");
  await page.getByRole("checkbox", { name: /incluir en el mensaje/i }).check();
  await page.getByRole("button", { name: /preparar solicitud/i }).click();

  const whatsappHref = await page
    .getByRole("link", { name: /enviar por whatsapp/i })
    .getAttribute("href");
  const emailHref = await page
    .getByRole("link", { name: /enviar por correo/i })
    .getAttribute("href");
  expect(decodeURIComponent(whatsappHref ?? "")).toContain("Frutos secos");
  expect(decodeURIComponent(emailHref ?? "")).toContain("Frutos secos");
  expect(decodeURIComponent(emailHref ?? "")).toContain(
    "Solicitud de reserva ·",
  );
});

test("reservation honeypot does not produce channel actions", async ({
  page,
}) => {
  await page.goto("/reservar/");
  await fillReservationForm(page);
  await page.locator("#booking-website").fill("bot.example");

  await page.getByRole("button", { name: /preparar solicitud/i }).click();
  await expect(
    page.getByText(/no se ha podido validar el envio/i),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /enviar por whatsapp/i }),
  ).toHaveCount(0);
});

test("reservation route remains readable with reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/reservar/");

  await expect(
    page.getByRole("heading", { level: 1, name: /solicita tu mesa/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /preparar solicitud/i }),
  ).toBeVisible();
});

test("reservation route stays operable at emulated 200 percent zoom", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "Desktop-only zoom assertion");
  await page.goto("/reservar/");
  await page.evaluate(() => {
    document.documentElement.style.zoom = "2";
  });

  await page
    .getByRole("button", { name: /preparar solicitud/i })
    .scrollIntoViewIfNeeded();
  await expect(
    page.getByRole("button", { name: /preparar solicitud/i }),
  ).toBeVisible();
});
