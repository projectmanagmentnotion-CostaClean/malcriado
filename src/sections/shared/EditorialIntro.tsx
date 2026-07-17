import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Stack } from "@/components/layout/Stack";

interface EditorialIntroProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
}

export function EditorialIntro({ eyebrow, title, body }: EditorialIntroProps) {
  return (
    <Section spacing="spacious" tone="editorial">
      <Container width="editorial">
        <Stack className="editorial-intro" gap="md">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{body}</p>
        </Stack>
      </Container>
    </Section>
  );
}
