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
      screen.getByText(/carta en html con platos, bebidas y postres/i),
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

  it("renders faq route and first answer content", () => {
    renderApp(["/faq/"]);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /preguntas frecuentes antes de reservar/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /que tipo de cocina presenta malcriado/i,
      }),
    ).toHaveAttribute("aria-expanded", "true");
  });

  it("renders booking context copy when arriving with intent params", () => {
    renderApp([
      "/reservar/?context=featured-dish&item=pulpo-al-chimichurri&category=cat-hot-dishes",
    ]);

    expect(
      screen.getByText(/solicitud iniciada desde carta/i),
    ).toBeInTheDocument();
  });

  it("renders the richer reservation fields and clear context action", () => {
    renderApp(["/reservar/?context=home-hero&source=home"]);

    expect(screen.getByLabelText(/telefono/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correo electronico/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /limpiar contexto/i }),
    ).toHaveAttribute("href", "/reservar/");
  });

  it("opens and closes the mobile menu with escape and restores focus", async () => {
    window.innerWidth = 390;
    renderApp(["/"]);

    const button = screen.getByRole("button", { name: /abrir menu/i });
    fireEvent.click(button);

    expect(
      screen.getByRole("navigation", { name: /menu movil/i }),
    ).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });

    await waitFor(() =>
      expect(
        screen.queryByRole("navigation", { name: /menu movil/i }),
      ).not.toBeInTheDocument(),
    );
    expect(button).toHaveFocus();
  });

  it("shows consent banner by default and hides it after reject", () => {
    renderApp(["/"]);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /sin contenido externo no esencial hasta que decidas/i,
      }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /rechazar/i }));

    expect(
      screen.queryByRole("heading", {
        level: 2,
        name: /sin contenido externo no esencial hasta que decidas/i,
      }),
    ).not.toBeInTheDocument();
  });

  it("traps focus inside the consent dialog while it is open", async () => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    renderApp(["/"]);

    fireEvent.click(screen.getByRole("button", { name: /personalizar/i }));

    const dialog = screen.getByRole("dialog");
    const focusable = dialog.querySelectorAll<HTMLElement>(
      "button:not([disabled]), input:not([disabled])",
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    expect(first).toBeTruthy();
    expect(last).toBeTruthy();

    last?.focus();
    fireEvent.keyDown(window, { key: "Tab" });
    await waitFor(() => expect(first).toHaveFocus());

    first?.focus();
    fireEvent.keyDown(window, { key: "Tab", shiftKey: true });
    await waitFor(() => expect(last).toHaveFocus());
  });

  it("renders 404 fallback", () => {
    renderApp(["/inexistente/"]);

    expect(
      screen.getByRole("heading", { level: 1, name: "404" }),
    ).toBeInTheDocument();
  });
});
