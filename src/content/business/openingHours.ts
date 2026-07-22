import type { BusinessHoursDay } from "@/types/content";

export const proposedOpeningHours: readonly BusinessHoursDay[] = [
  {
    day: "monday",
    label: "Lunes",
    intervals: [],
    status: "PENDING_VALIDATION",
  },
  {
    day: "tuesday",
    label: "Martes",
    intervals: [
      { opensAt: "13:00", closesAt: "16:00" },
      { opensAt: "19:30", closesAt: "23:30" },
    ],
    status: "PENDING_VALIDATION",
  },
  {
    day: "wednesday",
    label: "Miercoles",
    intervals: [
      { opensAt: "13:00", closesAt: "16:00" },
      { opensAt: "19:30", closesAt: "23:30" },
    ],
    status: "PENDING_VALIDATION",
  },
  {
    day: "thursday",
    label: "Jueves",
    intervals: [
      { opensAt: "13:00", closesAt: "16:00" },
      { opensAt: "19:30", closesAt: "23:30" },
    ],
    status: "PENDING_VALIDATION",
  },
  {
    day: "friday",
    label: "Viernes",
    intervals: [
      { opensAt: "13:00", closesAt: "16:00" },
      { opensAt: "19:30", closesAt: "00:00" },
    ],
    status: "PENDING_VALIDATION",
  },
  {
    day: "saturday",
    label: "Sabado",
    intervals: [{ opensAt: "13:00", closesAt: "00:00" }],
    status: "PENDING_VALIDATION",
  },
  {
    day: "sunday",
    label: "Domingo",
    intervals: [{ opensAt: "13:00", closesAt: "23:00" }],
    status: "PENDING_VALIDATION",
  },
];

export const openingHoursSummary =
  "Lunes cerrado · Mar–Jue 13:00–16:00 y 19:30–23:30 · Vie 13:00–16:00 y 19:30–00:00 · Sab 13:00–00:00 · Dom 13:00–23:00";

export function formatOpeningHoursDay(day: BusinessHoursDay) {
  const services = day.intervals.map(
    ({ opensAt, closesAt }) => `${opensAt}–${closesAt}`,
  );
  return `${day.label}: ${services.length > 0 ? services.join(" / ") : "cerrado"}`;
}

export function getOpeningHoursSpecification() {
  return proposedOpeningHours.flatMap((day) =>
    day.intervals.map((interval) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${day.day[0]!.toUpperCase()}${day.day.slice(1)}`,
      opens: interval.opensAt,
      closes: interval.closesAt,
    })),
  );
}

export function getServiceHoursByWeekday() {
  return Object.fromEntries(
    proposedOpeningHours.map((day) => [
      day.day,
      day.intervals.map(({ opensAt, closesAt }) => `${opensAt}-${closesAt}`),
    ]),
  ) as Readonly<Record<string, readonly string[]>>;
}

export function isWithinProposedOpeningHours(dateIso: string, time: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateIso) || !/^\d{2}:\d{2}$/.test(time)) {
    return false;
  }

  const weekdayIndex = new Date(`${dateIso}T12:00:00Z`).getUTCDay();
  const dayOrder: readonly BusinessHoursDay["day"][] = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const day = proposedOpeningHours.find(
    (entry) => entry.day === dayOrder[weekdayIndex],
  );

  return Boolean(
    day?.intervals.some(({ opensAt, closesAt }) =>
      closesAt === "00:00"
        ? time >= opensAt
        : time >= opensAt && time <= closesAt,
    ),
  );
}
