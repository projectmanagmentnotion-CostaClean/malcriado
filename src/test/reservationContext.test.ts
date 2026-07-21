import { parseReservationContext } from "@/features/reservation/context/reservationContext";

describe("reservation context parser", () => {
  it("keeps dish slugs distinct across categories", () => {
    const pizza = parseReservationContext(
      new URLSearchParams("dish=pizza-margarita"),
    );
    const cocktail = parseReservationContext(
      new URLSearchParams("dish=margarita"),
    );

    expect(pizza.summaryBody).toMatch(/margarita \/ pizzas/i);
    expect(cocktail.summaryBody).toMatch(/margarita \/ cocteles/i);
  });

  it("ignores invalid query values without echoing raw html", () => {
    const context = parseReservationContext(
      new URLSearchParams(
        "dish=%3Cscript%3Ealert(1)%3C/script%3E&source=%3Cimg%20src=x%20onerror=1%3E",
      ),
    );

    expect(context.ignoredParams).toContain("dish:<script>alert(1)</script>");
    expect(context.ignoredParams).toContain("source:<img src=x onerror=1>");
    expect(context.tags).toHaveLength(0);
  });
});
