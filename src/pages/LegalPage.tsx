import { PageSeo } from "@/components/seo/PageSeo";
import { getRestaurantStructuredData } from "@/content/structuredData";

interface LegalPageProps {
  readonly title: string;
  readonly path: string;
  readonly body: string;
}

export function LegalPage({ title, path, body }: LegalPageProps) {
  return (
    <>
      <PageSeo
        title={`${title} | Malcriado`}
        description={`${title} provisional en espera de validacion juridica final.`}
        path={path}
        structuredData={getRestaurantStructuredData(path)}
      />
      <section className="legal-page">
        <h1>{title}</h1>
        <p>{body}</p>
      </section>
    </>
  );
}
