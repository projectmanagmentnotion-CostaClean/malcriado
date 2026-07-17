import type { Offer } from "../../types/content";

function getMadridDateParts(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    weekday: "long",
  });

  const parts = Object.fromEntries(
    formatter
      .formatToParts(date)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  ) as Record<string, string>;

  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    time: `${parts.hour}:${parts.minute}`,
    weekday: (parts.weekday ?? "").toLowerCase(),
  };
}

function isWithinDateRange(offer: Offer, now: Date) {
  const today = getMadridDateParts(now).date;

  if (offer.validity.startsAt && today < offer.validity.startsAt) {
    return false;
  }

  if (offer.validity.endsAt && today > offer.validity.endsAt) {
    return false;
  }

  return true;
}

function isWithinSchedule(offer: Offer, now: Date) {
  const madrid = getMadridDateParts(now);

  if (
    offer.schedule.weekdays &&
    !offer.schedule.weekdays.includes(madrid.weekday as never)
  ) {
    return false;
  }

  if (offer.schedule.startTime && madrid.time < offer.schedule.startTime) {
    return false;
  }

  if (offer.schedule.endTime && madrid.time > offer.schedule.endTime) {
    return false;
  }

  return true;
}

export function getActiveOffers(offers: readonly Offer[], now = new Date()) {
  return offers
    .filter((offer) => offer.editorialStatus === "VERIFIED")
    .filter((offer) => isWithinDateRange(offer, now))
    .filter((offer) => isWithinSchedule(offer, now))
    .sort((left, right) => left.priority - right.priority);
}

export function getUpcomingOffers(offers: readonly Offer[], now = new Date()) {
  const today = getMadridDateParts(now).date;
  return offers
    .filter((offer) => offer.editorialStatus === "VERIFIED")
    .filter(
      (offer) => offer.validity.startsAt && offer.validity.startsAt > today,
    )
    .sort((left, right) =>
      (left.validity.startsAt ?? "").localeCompare(
        right.validity.startsAt ?? "",
      ),
    );
}

export function getExpiredOffers(offers: readonly Offer[], now = new Date()) {
  const today = getMadridDateParts(now).date;
  return offers
    .filter((offer) => offer.editorialStatus === "VERIFIED")
    .filter((offer) =>
      Boolean(offer.validity.endsAt && offer.validity.endsAt < today),
    )
    .sort((left, right) =>
      (right.validity.endsAt ?? "").localeCompare(left.validity.endsAt ?? ""),
    );
}

export function getPrimaryOffer(offers: readonly Offer[], now = new Date()) {
  return getActiveOffers(offers, now)[0] ?? null;
}

export function getOfferEditorialSnapshot(
  offers: readonly Offer[],
  now = new Date(),
) {
  const activeOffers = getActiveOffers(offers, now);
  if (activeOffers.length > 0) {
    return {
      kind: "active" as const,
      primaryOffer: activeOffers[0] ?? null,
      activeOffers,
      upcomingOffers: [],
      expiredOffers: [],
    };
  }

  const upcomingOffers = getUpcomingOffers(offers, now);
  if (upcomingOffers.length > 0) {
    return {
      kind: "upcoming" as const,
      primaryOffer: upcomingOffers[0] ?? null,
      activeOffers: [],
      upcomingOffers,
      expiredOffers: [],
    };
  }

  const expiredOffers = getExpiredOffers(offers, now);
  if (expiredOffers.length > 0) {
    return {
      kind: "expired" as const,
      primaryOffer: expiredOffers[0] ?? null,
      activeOffers: [],
      upcomingOffers: [],
      expiredOffers,
    };
  }

  return {
    kind: "empty" as const,
    primaryOffer: null,
    activeOffers: [],
    upcomingOffers: [],
    expiredOffers: [],
  };
}
