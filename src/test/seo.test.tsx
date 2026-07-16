import { waitFor } from "@testing-library/react";
import { renderApp } from "@/test/testRouter";

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
});
