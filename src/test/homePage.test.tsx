import { screen } from "@testing-library/react";
import { renderApp } from "@/test/testRouter";

describe("home page", () => {
  it("renders the immersive hero and honest booking message", async () => {
    renderApp(["/"]);

    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: /cocina fusion latinoamericana y mediterranea frente al mar/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getAllByRole("link", { name: /reservar mesa/i }).length,
    ).toBeGreaterThanOrEqual(2);

    expect(
      screen.getByText(/solicitud manual con confirmacion del equipo/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/no hay una promocion vigente con fechas verificables/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/cocina fusion frente al mar/i).closest("[data-active]"),
    ).toHaveAttribute("data-active", "false");
  });
});
