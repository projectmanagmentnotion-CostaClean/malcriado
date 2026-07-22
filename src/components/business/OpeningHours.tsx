import { businessContent } from "@/content";
import { formatOpeningHoursDay } from "@/content/business/openingHours";

interface OpeningHoursProps {
  readonly compact?: boolean;
}

export function OpeningHours({ compact = false }: OpeningHoursProps) {
  if (compact) {
    return <p>{businessContent.hours.summary.value}</p>;
  }

  return (
    <dl className="opening-hours">
      {businessContent.hours.byDay.map((day) => (
        <div key={day.day}>
          <dt>{day.label}</dt>
          <dd>{formatOpeningHoursDay(day).replace(`${day.label}: `, "")}</dd>
        </div>
      ))}
    </dl>
  );
}
