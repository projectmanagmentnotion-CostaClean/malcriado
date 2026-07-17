import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderApp } from "@/test/testRouter";

describe("app shell", () => {
  it("renders the home route and main landmarks", () => {
    renderApp(["/"]);

    expect(
      screen.getByRole("link", { name: /saltar al contenido principal/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /cocina fusion latinoamericana y mediterranea frente al mar/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders menu route content", () => {
    renderApp(["/menu/"]);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /carta malcriado/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/precios, alergenos y descripciones finales/i),
    ).toBeInTheDocument();
  });

  it("renders accessibility statement route", () => {
    renderApp(["/declaracion-de-accesibilidad/"]);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /declaracion de accesibilidad/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders booking context copy when arriving with intent params", () => {
    renderApp([
      "/reservar/?context=featured-dish&item=pulpo-al-chimichurri&category=cat-hot-dishes",
    ]);

    expect(
      screen.getByText(/solicitud iniciada desde carta/i),
    ).toBeInTheDocument();
  });

  it("opens and closes the mobile menu with escape and restores focus", async () => {
    window.innerWidth = 390;
    renderApp(["/"]);

    const button = screen.getByRole("button", { name: /abrir menu/i });
    fireEvent.click(button);

    expect(
      screen.getByRole("navigation", { name: /principal movil/i }),
    ).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });

    await waitFor(() =>
      expect(
        screen.queryByRole("navigation", { name: /principal movil/i }),
      ).not.toBeInTheDocument(),
    );
    expect(button).toHaveFocus();
  });

  it("renders 404 fallback", () => {
    renderApp(["/inexistente/"]);

    expect(
      screen.getByRole("heading", { level: 1, name: "404" }),
    ).toBeInTheDocument();
  });
});
