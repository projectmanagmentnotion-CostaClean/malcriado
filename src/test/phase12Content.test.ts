import { businessContent, menuContent } from "@/content";
import { getOpeningHoursSpecification } from "@/content/business/openingHours";

describe("Phase 12A commercial content", () => {
  it("uses seven centrally configured days and schema hours", () => {
    expect(businessContent.hours.byDay).toHaveLength(7);
    expect(businessContent.hours.byDay[0]?.intervals).toEqual([]);
    expect(getOpeningHoursSpecification()).toHaveLength(10);
  });

  it("publishes EUR prices within the approved category ranges", () => {
    expect(
      menuContent.items.every(
        (item) => item.price.currency === "EUR" && item.price.amount !== null,
      ),
    ).toBe(true);
    expect(
      menuContent.items
        .filter((item) => item.categoryId === "cat-cocktails")
        .every((item) => item.price.amount! >= 9 && item.price.amount! <= 13),
    ).toBe(true);
    expect(
      menuContent.items
        .filter((item) => item.categoryId === "cat-desserts")
        .every((item) => item.price.amount! >= 6 && item.price.amount! <= 9),
    ).toBe(true);
  });

  it("keeps every dish allergen matrix pending and empty", () => {
    expect(
      menuContent.items.every(
        (item) =>
          item.allergenStatus === "PENDING_VALIDATION" &&
          item.allergens.length === 0,
      ),
    ).toBe(true);
  });
});
