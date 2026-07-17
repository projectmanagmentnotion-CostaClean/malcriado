import { EditorialIntro } from "@/sections/shared/EditorialIntro";

interface SectionIntroProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly headingId?: string;
}

export function SectionIntro({
  eyebrow,
  title,
  body,
  headingId,
}: SectionIntroProps) {
  return (
    <EditorialIntro
      body={body}
      eyebrow={eyebrow}
      title={title}
      {...(headingId ? { headingId } : {})}
    />
  );
}
