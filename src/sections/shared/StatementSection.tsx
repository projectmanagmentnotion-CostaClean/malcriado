import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";

interface StatementSectionProps {
  readonly eyebrow: string;
  readonly statement: string;
}

export function StatementSection({
  eyebrow,
  statement,
}: StatementSectionProps) {
  return (
    <Section spacing="scene" tone="night">
      <Container width="editorial">
        <div className="statement-section">
          <p className="eyebrow">{eyebrow}</p>
          <p className="statement-section__copy">{statement}</p>
        </div>
      </Container>
    </Section>
  );
}
