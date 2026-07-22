import axe from "axe-core";
import { renderApp } from "@/test/testRouter";

async function runAxe() {
  const result = await axe.run(document.body, {
    rules: {
      "color-contrast": { enabled: false },
    },
  });
  return result.violations.filter((violation) =>
    ["serious", "critical"].includes(violation.impact ?? ""),
  );
}

describe("accessibility smoke", () => {
  it("has no serious or critical axe violations on home", async () => {
    renderApp(["/"]);

    const violations = await runAxe();
    expect(violations).toHaveLength(0);
  });

  it("has no serious or critical axe violations on reservar", async () => {
    renderApp(["/reservar/"]);

    const violations = await runAxe();
    expect(violations).toHaveLength(0);
  });

  it("has no serious or critical axe violations on contacto", async () => {
    renderApp(["/contacto/"]);

    const violations = await runAxe();
    expect(violations).toHaveLength(0);
  });

  it("has no serious or critical axe violations on nosotros", async () => {
    renderApp(["/nosotros/"]);

    const violations = await runAxe();
    expect(violations).toHaveLength(0);
  });

  it("has no serious or critical axe violations on faq", async () => {
    renderApp(["/faq/"]);

    const violations = await runAxe();
    expect(violations).toHaveLength(0);
  });

  it("has no serious or critical axe violations on dev design system", async () => {
    renderApp(["/dev/design-system/"]);

    const violations = await runAxe();
    expect(violations).toHaveLength(0);
  });
});
