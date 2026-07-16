interface SectionIntroProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
}

export function SectionIntro({ eyebrow, title, body }: SectionIntroProps) {
  return (
    <header className="section-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{body}</p>
    </header>
  );
}
