import type { ReactNode } from "react";
import { Section } from "@/components/layout/Section";
import { Split } from "@/components/layout/Split";
import { Stack } from "@/components/layout/Stack";
import { SectionHeading } from "@/sections/shared/SectionHeading";

interface SplitMediaSectionProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly media: ReactNode;
  readonly aside?: ReactNode;
}

export function SplitMediaSection({
  eyebrow,
  title,
  body,
  media,
  aside,
}: SplitMediaSectionProps) {
  return (
    <Section spacing="scene">
      <Split ratio="content-first">
        <Stack gap="lg">
          <SectionHeading eyebrow={eyebrow} title={title} body={body} />
          {aside}
        </Stack>
        {media}
      </Split>
    </Section>
  );
}
