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
        name: /cocina fusion frente al mar/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders menu route content", () => {
    renderApp(["/menu/"]);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /carta html provisional/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/precios, alergenos y descripciones finales/i),
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
