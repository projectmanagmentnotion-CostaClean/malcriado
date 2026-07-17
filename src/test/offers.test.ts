import { getActiveOffers, getPrimaryOffer, getUpcomingOffers } from "@/content";
import type { Offer } from "@/types/content";

const offer: Offer = {
  id: "offer-weekend",
  slug: "weekend-special",
  title: "Weekend special",
  description: null,
  label: null,
  type: "weekly",
  validity: {
    startsAt: "2026-03-28",
    endsAt: "2026-03-30",
    timezone: "Europe/Madrid",
  },
  schedule: {
    weekdays: ["sunday"],
    startTime: "01:30",
    endTime: "03:30",
  },
  assetId: null,
  cta: null,
  priority: 1,
  editorialStatus: "VERIFIED",
  computedStatus: "ACTIVE",
  audience: "ALL",
  fallbackContent: null,
  references: {
    sourceIds: ["test"],
  },
};

describe("offer selectors", () => {
  it("keeps an offer active across DST-sensitive Madrid local time", () => {
    const now = new Date("2026-03-29T00:45:00Z");
    expect(getActiveOffers([offer], now)).toHaveLength(1);
    expect(getPrimaryOffer([offer], now)?.id).toBe("offer-weekend");
  });

  it("returns upcoming offers before the local start date", () => {
    const now = new Date("2026-03-27T12:00:00Z");
    expect(getUpcomingOffers([offer], now)).toHaveLength(1);
  });
});
