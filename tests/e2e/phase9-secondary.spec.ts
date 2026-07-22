import { expect, test } from "@playwright/test";

test("faq route is indexable and exposes accordion answers", async ({
  page,
}) => {
  await page.goto("/faq/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /preguntas frecuentes antes de reservar/i,
    }),
  ).toBeVisible();

  const firstQuestion = page.getByRole("button", {
    name: /que tipo de cocina presenta malcriado/i,
  });
  await expect(firstQuestion).toHaveAttribute("aria-expanded", "true");
});

test("contact route blocks map until consent and allows reversal", async ({
  page,
}) => {
  await page.goto("/contacto/");

  await expect(
    page.getByRole("heading", {
      name: /el mapa interactivo no se carga antes del consentimiento/i,
    }),
  ).toBeVisible();
  await expect(page.getByTitle("Mapa interactivo de Malcriado")).toHaveCount(0);

  await page.getByRole("button", { name: /personalizar/i }).click();
  await page.getByRole("checkbox", { name: /contenido externo/i }).check();
  await page.getByRole("button", { name: /guardar preferencias/i }).click();

  await expect(page.getByTitle("Mapa interactivo de Malcriado")).toBeVisible();

  await page.getByRole("button", { name: /preferencias de cookies/i }).click();
  await page.getByRole("checkbox", { name: /contenido externo/i }).uncheck();
  await page.getByRole("button", { name: /guardar preferencias/i }).click();

  await expect(
    page.getByRole("heading", {
      name: /el mapa interactivo no se carga antes del consentimiento/i,
    }),
  ).toBeVisible();
  await expect(page.getByTitle("Mapa interactivo de Malcriado")).toHaveCount(0);
});
