import { waitFor } from "@testing-library/react";
import { renderApp } from "@/test/testRouter";

interface StructuredDataEntry {
  readonly "@type"?: string;
  readonly hasMenuSection?: Array<{
    readonly name: string;
  }>;
}

function readStructuredData() {
  return [
    ...document.querySelectorAll('script[type="application/ld+json"]'),
  ].map((node) => JSON.parse(node.textContent ?? "{}") as StructuredDataEntry);
}

describe("seo metadata", () => {
  it("sets canonical and title for menu page", async () => {
    renderApp(["/menu/"]);

    await waitFor(() => {
      expect(document.title).toBe("Carta | Malcriado");
    });

    expect(
      document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
    ).toBe("http://127.0.0.1:4317/menu/");
  });

  it("publishes menu structured data with sections and items", async () => {
    renderApp(["/menu/"]);

    await waitFor(() => {
      expect(document.title).toBe("Carta | Malcriado");
    });

    const entries = readStructuredData();
    const menuEntry = entries.find((entry) => entry["@type"] === "Menu");

    expect(menuEntry).toBeTruthy();
    expect(menuEntry?.hasMenuSection?.length ?? 0).toBeGreaterThan(0);
    expect(
      menuEntry?.hasMenuSection?.some((section) => section.name === "Pizzas") ??
        false,
    ).toBe(true);
  });

  it("does not publish offer structured data when there is no verified active offer", async () => {
    renderApp(["/especiales/"]);

    await waitFor(() => {
      expect(document.title).toBe("Especiales | Malcriado");
    });

    const entries = readStructuredData();
    expect(entries.some((entry) => entry["@type"] === "Offer")).toBe(false);
  });
});
