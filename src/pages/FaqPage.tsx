import { useState } from "react";
import { PageSeo } from "@/components/seo/PageSeo";
import { LinkButton } from "@/components/ui/LinkButton";
import { faqEntries, seoPages } from "@/content";
import { buildPageSeoProps } from "@/lib/seo/pageSeoProps";

const faqCategoryOrder = [
  "general",
  "booking",
  "menu",
  "location",
  "legal",
] as const;

const faqCategoryLabels: Record<(typeof faqCategoryOrder)[number], string> = {
  general: "General",
  booking: "Reserva",
  menu: "Carta",
  location: "Ubicacion",
  legal: "Privacidad y consentimiento",
};

export function FaqPage() {
  const seoPage = seoPages.faq!;
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    [faqEntries[0]?.id ?? ""]: true,
  });

  const groupedFaqs = faqCategoryOrder
    .map((category) => ({
      category,
      items: faqEntries.filter((entry) => entry.category === category),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <>
      <PageSeo {...buildPageSeoProps(seoPage)} />
      <div className="faq-page">
        <section className="faq-hero">
          <div className="container container--wide">
            <div className="faq-hero__grid">
              <header className="faq-hero__content">
                <p className="eyebrow">FAQ</p>
                <h1 data-route-heading="true" id="page-heading-faq">
                  Preguntas frecuentes visibles y verificables
                </h1>
                <p className="faq-hero__lede">
                  Esta pagina resume dudas recurrentes sin inventar horarios,
                  disponibilidad, politicas comerciales ni datos legales que
                  siguen pendientes del titular.
                </p>
              </header>
              <div className="faq-hero__actions">
                <LinkButton to="/reservar/" variant="editorial">
                  Ir a reserva
                </LinkButton>
                <LinkButton to="/contacto/" variant="secondary">
                  Ver contacto
                </LinkButton>
              </div>
            </div>
          </div>
        </section>

        <section className="faq-groups">
          <div className="container container--wide">
            {groupedFaqs.map((group) => (
              <div className="faq-group" key={group.category}>
                <div className="faq-group__intro">
                  <p className="eyebrow">{faqCategoryLabels[group.category]}</p>
                  <h2>{faqCategoryLabels[group.category]}</h2>
                </div>
                <div className="faq-list">
                  {group.items.map((entry) => {
                    const expanded = Boolean(openItems[entry.id]);
                    const panelId = `${entry.id}-panel`;
                    const buttonId = `${entry.id}-button`;

                    return (
                      <article
                        className="faq-item"
                        data-faq-item="true"
                        key={entry.id}
                      >
                        <h3>
                          <button
                            aria-controls={panelId}
                            aria-expanded={expanded}
                            className="faq-item__trigger"
                            id={buttonId}
                            onClick={() =>
                              setOpenItems((current) => ({
                                ...current,
                                [entry.id]: !current[entry.id],
                              }))
                            }
                            type="button"
                          >
                            <span>{entry.question}</span>
                            <span aria-hidden="true">
                              {expanded ? "-" : "+"}
                            </span>
                          </button>
                        </h3>
                        <div
                          aria-labelledby={buttonId}
                          className="faq-item__panel"
                          hidden={!expanded}
                          id={panelId}
                          role="region"
                        >
                          <p>{entry.answer}</p>
                          <p className="faq-item__status">
                            Estado: {entry.status}
                          </p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
