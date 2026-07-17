import { SectionIntro } from "@/components/common/SectionIntro";
import { PageSeo } from "@/components/seo/PageSeo";
import {
  getRestaurantStructuredData,
  homeStoryContent,
  peopleProfiles,
  seoPages,
  timelineItems,
} from "@/content";

export function NosotrosPage() {
  const seoPage = seoPages.story!;

  return (
    <>
      <PageSeo
        title={seoPage.metadata.title}
        description={seoPage.metadata.description}
        path={seoPage.metadata.path}
        robots={seoPage.metadata.robots}
        structuredData={getRestaurantStructuredData(seoPage)}
      />
      <SectionIntro
        eyebrow="Nosotros"
        title="Historia y propuesta editorial"
        body="La narrativa publica ya sale del modelo tipado: autoria, fusion cultural y contexto frente al mar se trazan contra fuentes auditadas."
      />
      <section className="cards-grid">
        {peopleProfiles.map((person) => (
          <article className="panel" key={person.id}>
            <p className="eyebrow">{person.role}</p>
            <h2>{person.name}</h2>
            <p>{person.biography}</p>
          </article>
        ))}
        {homeStoryContent.map((block) => (
          <article className="panel" key={block.id}>
            <p className="eyebrow">{block.eyebrow}</p>
            <h2>{block.heading}</h2>
            <p>{block.body ?? block.status}</p>
          </article>
        ))}
      </section>
      <section className="panel">
        <p className="eyebrow">Linea editorial</p>
        <h2>Claims verificados</h2>
        <ul>
          {timelineItems.map((item) => (
            <li key={item.id}>
              <strong>{item.label}:</strong> {item.description}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
