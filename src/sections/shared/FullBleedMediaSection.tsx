import type { ReactNode } from "react";
import { Section } from "@/components/layout/Section";
import { Bleed } from "@/components/layout/Bleed";
import { Container } from "@/components/layout/Container";
import { Stack } from "@/components/layout/Stack";

interface FullBleedMediaSectionProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly media: ReactNode;
}

export function FullBleedMediaSection({
  eyebrow,
  title,
  body,
  media,
}: FullBleedMediaSectionProps) {
  return (
    <Section spacing="scene" contained={false}>
      <Container width="wide">
        <Bleed>{media}</Bleed>
        <Stack className="full-bleed-copy" gap="sm">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{body}</p>
        </Stack>
      </Container>
    </Section>
  );
}
