import { expect, test } from "@playwright/test";

async function fillReservationForm(page: import("@playwright/test").Page) {
  await page.getByLabel("Fecha").fill("2026-07-22");
  await page.getByLabel("Hora").fill("20:30");
  await page.locator("#booking-guests").fill("2");
  await page.getByLabel("Nombre").fill("Ada Lovelace");
  await page.getByLabel("Telefono").fill("+34 600 000 000");
  await page
    .getByLabel(/He leido la informacion provisional de privacidad/i)
    .check();
  await page.waitForTimeout(3100);
}

test("reservation flow shows duplicate protection after a successful send", async ({
  page,
}) => {
  await page.goto("/reservar/");
  await fillReservationForm(page);

  await page.getByRole("button", { name: /enviar solicitud/i }).click();
  await expect(
    page.getByRole("heading", { name: "Solicitud enviada" }),
  ).toBeVisible();

  await page.getByRole("button", { name: /enviar solicitud/i }).click();
  await expect(
    page.getByText(/evitamos un segundo envio duplicado/i),
  ).toBeVisible();
});

test("reservation flow surfaces timeout and allows retry", async ({ page }) => {
  await page.addInitScript(() => {
    window.sessionStorage.setItem("malcriado:reservation:mock-mode", "timeout");
  });
  await page.goto("/reservar/");
  await fillReservationForm(page);

  await page.getByRole("button", { name: /enviar solicitud/i }).click();
  await expect(page.getByText(/ha tardado demasiado/i)).toBeVisible();
  await expect(
    page.getByRole("button", { name: /reintentar envio/i }),
  ).toBeVisible();
});

test("reservation flow surfaces rate limit state", async ({ page }) => {
  await page.addInitScript(() => {
    window.sessionStorage.setItem(
      "malcriado:reservation:mock-mode",
      "rate_limited",
    );
  });
  await page.goto("/reservar/");
  await fillReservationForm(page);

  await page.getByRole("button", { name: /enviar solicitud/i }).click();
  await expect(page.getByText(/demasiados intentos/i)).toBeVisible();
});

test("reservation flow surfaces offline state", async ({ page }) => {
  await page.goto("/reservar/");
  await fillReservationForm(page);
  await page.context().setOffline(true);

  await page.getByRole("button", { name: /enviar solicitud/i }).click();
  await expect(page.getByText(/sin conexion/i)).toBeVisible();
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
