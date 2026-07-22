import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { DishCard } from "@/components/food/DishCard";
import { FormField } from "@/components/forms/FormField";
import { TextInput } from "@/components/forms/TextInput";
import { LinkButton } from "@/components/ui/LinkButton";
import { renderApp } from "@/test/testRouter";
import { getFeaturedMenuItems } from "@/content";

describe("design system route", () => {
  it("renders the dev design system catalog", () => {
    renderApp(["/dev/design-system/"]);

    expect(
      screen.getByRole("heading", {
        name: /catalogo interno del sistema de diseno/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /design system/i }),
    ).toHaveAttribute("aria-current", "page");
  });
});

describe("ui components", () => {
  it("renders buttons and loading state accessibly", () => {
    render(<Button loading>Enviar</Button>);

    expect(screen.getByRole("button", { name: /enviar/i })).toBeDisabled();
    expect(screen.getByText(/cargando/i)).toHaveClass("sr-only");
  });

  it("renders internal link buttons", () => {
    render(
      <MemoryRouter>
        <LinkButton to="/menu/" variant="secondary">
          Ver carta
        </LinkButton>
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: /ver carta/i })).toHaveAttribute(
      "href",
      "/menu/",
    );
  });
});

describe("food and forms", () => {
  it("shows an editorial price on a real menu item", () => {
    render(<DishCard item={getFeaturedMenuItems()[0]!} />);

    expect(screen.getByText(/18,50/)).toBeInTheDocument();
  });

  it("associates form labels with inputs", () => {
    render(
      <FormField htmlFor="field-name" label="Nombre" required>
        <TextInput id="field-name" name="name" />
      </FormField>,
    );

    expect(screen.getByLabelText(/nombre/i)).toHaveAttribute(
      "id",
      "field-name",
    );
  });
});
