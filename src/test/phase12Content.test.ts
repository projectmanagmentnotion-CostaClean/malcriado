import {
  businessContent,
  menuContent,
  offers,
  peopleProfiles,
} from "@/content";
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

  it("maps the owner-supplied beverage photography to its intended categories", () => {
    const expectedAssetByCategory = {
      "cat-cocktails": "asset-028",
      "cat-soft-drinks": "asset-029",
      "cat-sangrias": "asset-030",
      "cat-wines": "asset-031",
      "cat-desserts": "asset-032",
    };

    for (const [categoryId, assetId] of Object.entries(
      expectedAssetByCategory,
    )) {
      expect(
        menuContent.items.find(
          (item) =>
            item.categoryId === categoryId && item.media?.assetId === assetId,
        ),
      ).toBeDefined();
    }
  });

  it("keeps the chicharron special visible without inventing commercial details", () => {
    const offer = offers.find(
      (candidate) => candidate.id === "offer-chicharron",
    );

    expect(offer?.assetId).toBe("asset-034");
    expect(offer?.editorialStatus).toBe("PENDING_CONTENT");
    expect(offer?.validity.startsAt).toBeNull();
    expect(offer?.validity.endsAt).toBeNull();
  });

  it("identifies Hector with the owner-supplied portrait", () => {
    const hector = peopleProfiles.find(
      (candidate) => candidate.id === "person-hector",
    );

    expect(hector?.mediaAssetId).toBe("asset-035");
  });
});
