import { SectionIntro } from "@/components/common/SectionIntro";
import { Container } from "@/components/layout/Container";
import { EditorialGrid } from "@/components/layout/EditorialGrid";
import { Frame } from "@/components/layout/Frame";
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
        description={seoPage.metadata.description}
        path={seoPage.metadata.path}
        robots={seoPage.metadata.robots}
        structuredData={getRestaurantStructuredData(seoPage)}
        title={seoPage.metadata.title}
      />
      <SectionIntro
        body="La narrativa publica ya sale del modelo tipado: autoria, fusion cultural y contexto frente al mar se trazan contra fuentes auditadas."
        eyebrow="Nosotros"
        title="Historia y propuesta editorial"
      />
      <Container width="wide">
        <EditorialGrid columns={2}>
          {peopleProfiles.map((person) => (
            <Frame key={person.id} tone="night">
              <p className="eyebrow">{person.role}</p>
              <h2>{person.name}</h2>
              <p>{person.biography}</p>
            </Frame>
          ))}
          {homeStoryContent.map((block) => (
            <Frame key={block.id}>
              <p className="eyebrow">{block.eyebrow}</p>
              <h2>{block.heading}</h2>
              <p>{block.body ?? block.status}</p>
            </Frame>
          ))}
        </EditorialGrid>
        <Frame className="panel" tone="warm">
          <p className="eyebrow">Linea editorial</p>
          <h2>Claims verificados</h2>
          <ul>
            {timelineItems.map((item) => (
              <li key={item.id}>
                <strong>{item.label}:</strong> {item.description}
              </li>
            ))}
          </ul>
        </Frame>
      </Container>
    </>
  );
}
