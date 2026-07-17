import { DevNavigation } from "@/components/layout/DevNavigation";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { PageSeo } from "@/components/seo/PageSeo";
import { assetManifest, seoPages } from "@/content";

export function DevAssetsPage() {
  const seoPage = seoPages.devAssets!;

  return (
    <>
      <PageSeo
        description={seoPage.metadata.description}
        path={seoPage.metadata.path}
        robots={seoPage.metadata.robots}
        title={seoPage.metadata.title}
      />
      <Section spacing="compact">
        <Container width="wide">
          <DevNavigation />
        </Container>
      </Section>
      <section className="container container--editorial editorial-intro">
        <p className="eyebrow">Dev only</p>
        <h1>Catalogo de assets</h1>
        <p>
          Ruta interna de desarrollo para revisar assets originales, derivados y
          decisiones de direccion artistica.
        </p>
      </section>
      <section className="asset-summary-grid container container--wide">
        <article className="panel">
          <h2>Originales</h2>
          <p>{assetManifest.sourceCount}</p>
        </article>
        <article className="panel">
          <h2>Derivados</h2>
          <p>{assetManifest.derivativesCount}</p>
        </article>
        <article className="panel">
          <h2>Peso original</h2>
          <p>{Math.round(assetManifest.originalTotalBytes / 1024)} KB</p>
        </article>
        <article className="panel">
          <h2>Peso optimizado</h2>
          <p>{Math.round(assetManifest.optimizedTotalBytes / 1024)} KB</p>
        </article>
      </section>
      <section className="asset-grid container container--wide">
        {assetManifest.assets.map((asset) => (
          <article className="asset-card panel" key={asset.id}>
            <ResponsiveImage
              asset={asset}
              crop="original"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
            <div className="asset-card__body">
              <h2>{asset.originalName}</h2>
              <p>{asset.roles.join(" · ")}</p>
              <dl>
                <div>
                  <dt>Estado</dt>
                  <dd>{asset.state}</dd>
                </div>
                <div>
                  <dt>Dimensiones</dt>
                  <dd>
                    {asset.width} x {asset.height}
                  </dd>
                </div>
                <div>
                  <dt>Orientacion</dt>
                  <dd>{asset.orientation}</dd>
                </div>
                <div>
                  <dt>Focal point</dt>
                  <dd>
                    {asset.focalPoint.x}% / {asset.focalPoint.y}%
                  </dd>
                </div>
                <div>
                  <dt>Variantes</dt>
                  <dd>{asset.variants.length}</dd>
                </div>
              </dl>
              <p>{asset.recommendedUsage}</p>
              {asset.quality === "low" ? (
                <p className="asset-card__warning">Alerta: baja calidad</p>
              ) : null}
              <p>Original: {asset.localPath}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
