import { Stack } from "@/components/layout/Stack";

interface SectionHeadingProps {
  readonly eyebrow?: string;
  readonly title: string;
  readonly body?: string;
}

export function SectionHeading({ eyebrow, title, body }: SectionHeadingProps) {
  return (
    <Stack as="header" className="section-heading" gap="sm">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
    </Stack>
  );
}
