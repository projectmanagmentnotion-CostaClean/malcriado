import {
  getActiveOffers,
  getExpiredOffers,
  getOfferEditorialSnapshot,
  getPrimaryOffer,
  getUpcomingOffers,
} from "@/content";
import type { Offer } from "@/types/content";

const baseOffer: Offer = {
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
    expect(getActiveOffers([baseOffer], now)).toHaveLength(1);
    expect(getPrimaryOffer([baseOffer], now)?.id).toBe("offer-weekend");
  });

  it("returns upcoming offers before the local start date", () => {
    const now = new Date("2026-03-27T12:00:00Z");
    expect(getUpcomingOffers([baseOffer], now)).toHaveLength(1);
  });

  it("treats the exact local start date as active when no time schedule is configured", () => {
    const now = new Date("2026-03-28T10:00:00Z");
    const openDateOffer: Offer = {
      ...baseOffer,
      schedule: {
        weekdays: null,
        startTime: null,
        endTime: null,
      },
    };

    expect(getActiveOffers([openDateOffer], now)).toHaveLength(1);
  });

  it("treats the first day after the local end date as expired", () => {
    const now = new Date("2026-03-31T10:00:00Z");
    expect(getExpiredOffers([baseOffer], now)).toHaveLength(1);
  });

  it("returns the active offer with the highest priority", () => {
    const now = new Date("2026-03-29T00:45:00Z");
    const lowerPriorityOffer: Offer = {
      ...baseOffer,
      id: "offer-priority-2",
      slug: "priority-2",
      title: "Priority 2",
      priority: 2,
    };
    const higherPriorityOffer: Offer = {
      ...baseOffer,
      id: "offer-priority-1",
      slug: "priority-1",
      title: "Priority 1",
      priority: 1,
    };

    expect(
      getPrimaryOffer([lowerPriorityOffer, higherPriorityOffer], now)?.id,
    ).toBe("offer-priority-1");
  });

  it("returns the next upcoming offer when none are active", () => {
    const now = new Date("2026-07-17T12:00:00Z");
    const futureOffer: Offer = {
      ...baseOffer,
      id: "offer-future",
      slug: "future-special",
      title: "Future special",
      validity: {
        startsAt: "2026-08-01",
        endsAt: "2026-08-31",
        timezone: "Europe/Madrid",
      },
      schedule: {
        weekdays: null,
        startTime: null,
        endTime: null,
      },
      priority: 3,
    };

    const snapshot = getOfferEditorialSnapshot([futureOffer], now);
    expect(snapshot.kind).toBe("upcoming");
    expect(snapshot.primaryOffer?.id).toBe("offer-future");
  });

  it("returns the latest expired offer when there is no active or upcoming offer", () => {
    const now = new Date("2026-07-17T12:00:00Z");
    const expiredOffer: Offer = {
      ...baseOffer,
      id: "offer-expired",
      slug: "expired-special",
      title: "Expired special",
      validity: {
        startsAt: "2026-06-01",
        endsAt: "2026-06-30",
        timezone: "Europe/Madrid",
      },
      schedule: {
        weekdays: null,
        startTime: null,
        endTime: null,
      },
      priority: 5,
    };

    const snapshot = getOfferEditorialSnapshot([expiredOffer], now);
    expect(snapshot.kind).toBe("expired");
    expect(snapshot.primaryOffer?.id).toBe("offer-expired");
  });

  it("returns an empty snapshot when there are no verified offers", () => {
    const now = new Date("2026-07-17T12:00:00Z");
    const pendingOffer: Offer = {
      ...baseOffer,
      id: "offer-pending",
      slug: "pending-special",
      editorialStatus: "PENDING_CONTENT",
      schedule: {
        weekdays: null,
        startTime: null,
        endTime: null,
      },
    };

    const snapshot = getOfferEditorialSnapshot([pendingOffer], now);
    expect(snapshot.kind).toBe("empty");
    expect(snapshot.primaryOffer).toBeNull();
  });
});
