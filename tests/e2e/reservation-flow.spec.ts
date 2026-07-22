import { expect, test } from "@playwright/test";

function getFutureDateIso(daysAhead: number) {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  return date.toISOString().slice(0, 10);
}

async function fillReservationForm(page: import("@playwright/test").Page) {
  await page.getByLabel("Fecha").fill(getFutureDateIso(2));
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

  await page.getByRole("button", { name: /enviar solicitud/i }).click();
  await expect(
    page.getByRole("heading", { name: "Elige cómo enviar la solicitud" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /enviar por whatsapp/i }),
  ).toBeVisible();
  await expect(
    page.locator('[data-status="action_required"]'),
  ).not.toContainText("Reserva confirmada");
});

test("reservation flow includes allergies in the encoded WhatsApp action", async ({
  page,
}) => {
  await page.goto("/reservar/");
  await fillReservationForm(page);
  await page.getByLabel("Alergias o intolerancias").fill("Frutos secos");

  await page.getByRole("button", { name: /enviar solicitud/i }).click();
  const href = await page
    .getByRole("link", { name: /enviar por whatsapp/i })
    .getAttribute("href");
  expect(href).toContain("Frutos%20secos");
  expect(href).toContain("Referencia");
});

test("reservation honeypot does not produce channel actions", async ({
  page,
}) => {
  await page.goto("/reservar/");
  await fillReservationForm(page);
  await page.locator("#booking-website").fill("bot.example");

  await page.getByRole("button", { name: /enviar solicitud/i }).click();
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
    page.getByRole("heading", { level: 1, name: /solicitud de reserva/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /enviar solicitud/i }),
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
    .getByRole("button", { name: /enviar solicitud/i })
    .scrollIntoViewIfNeeded();
  await expect(
    page.getByRole("button", { name: /enviar solicitud/i }),
  ).toBeVisible();
});
