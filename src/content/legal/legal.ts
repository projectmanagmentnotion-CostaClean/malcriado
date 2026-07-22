import type { LegalPageContent } from "../../types/content";
import { contentSources } from "../shared/sources";

export const legalPages: readonly LegalPageContent[] = [
  {
    id: "legal-aviso",
    title: "Aviso legal",
    path: "/aviso-legal/",
    summary:
      "Informacion legal informativa mientras se completa la revision final con el titular.",
    body: "Este aviso resume la informacion legal visible hoy en la web y se completara cuando el titular confirme los datos societarios y registrales.",
    intro:
      "Esta pagina ordena la informacion legal visible del proyecto sin inventar datos societarios, fiscales o registrales que no hayan sido confirmados por el titular.",
    sections: [
      {
        id: "legal-aviso-alcance",
        title: "Alcance actual",
        paragraphs: [
          "Malcriado se presenta publicamente como nombre comercial visible del proyecto y restaurante en Pineda de Mar.",
          "La titularidad juridica completa, el NIF o CIF, el domicilio legal y cualquier dato registral siguen pendientes de confirmacion directa.",
        ],
      },
      {
        id: "legal-aviso-uso",
        title: "Uso de la web",
        paragraphs: [
          "La web tiene una finalidad informativa y comercial para carta, contacto, especiales y solicitudes de reserva.",
          "El contenido puede actualizarse cuando se confirmen los datos operativos y legales pendientes.",
        ],
        items: [
          "No se garantiza disponibilidad inmediata de mesas desde la propia web.",
          "Las solicitudes enviadas requieren confirmacion manual posterior.",
          "Los textos legales no sustituyen revision juridica profesional final.",
        ],
      },
      {
        id: "legal-aviso-contacto",
        title: "Datos que faltan por confirmar",
        paragraphs: [
          "Antes de produccion deben completarse razon social o nombre del titular, NIF o CIF, domicilio legal, correo juridico y cualquier dato registral aplicable.",
        ],
      },
    ],
    disclaimer:
      "Revision final pendiente con el titular. No tomar este texto como version juridica definitiva.",
    status: "PENDING_VALIDATION",
    references: {
      sourceIds: [
        contentSources.siteAvisoLegal.id,
        contentSources.ownerChecklist.id,
      ],
    },
  },
  {
    id: "legal-privacidad",
    title: "Privacidad",
    path: "/privacidad/",
    summary: "Politica informativa sobre los datos que trata hoy la web.",
    body: "Esta politica explica el funcionamiento actual de la web mientras se completa la revision final de responsables, plazos y encargados reales.",
    intro:
      "La web minimiza datos y evita exponer informacion personal en URLs o analytics de cliente, pero esta politica requiere validacion final del titular y del proveedor real de gestion.",
    sections: [
      {
        id: "legal-privacidad-datos",
        title: "Datos tratados hoy por la web",
        paragraphs: [
          "La funcionalidad visible de reserva solicita nombre, telefono, correo electronico cuando procede, fecha, hora, numero de comensales, zona preferida, ocasion, alergias o intolerancias, notas y consentimiento de privacidad.",
          "La finalidad visible es gestionar solicitudes de reserva y responder por los canales operativos publicados.",
        ],
      },
      {
        id: "legal-privacidad-limitaciones",
        title: "Limitaciones actuales",
        paragraphs: [
          "La integracion definitiva de reserva, el responsable juridico exacto del tratamiento, los plazos de conservacion y los encargados reales siguen pendientes de confirmacion.",
          "La web no activa analitica ni terceros no esenciales antes del consentimiento correspondiente.",
        ],
      },
      {
        id: "legal-privacidad-derechos",
        title: "Derechos y contacto",
        paragraphs: [
          "El texto definitivo debe incluir derechos, base juridica, destinatarios, transferencias y canal formal de ejercicio una vez el titular confirme esos datos.",
        ],
        items: [
          "Responsable juridico todavia por confirmar.",
          "Correo especifico de privacidad todavia por confirmar.",
          "Plazo de conservacion todavia por confirmar.",
        ],
      },
    ],
    disclaimer:
      "Revision final pendiente con el titular. Este texto explica el flujo tecnico actual, no la redaccion juridica definitiva.",
    status: "PENDING_VALIDATION",
    references: {
      sourceIds: [
        contentSources.sitePrivacidad.id,
        contentSources.ownerChecklist.id,
      ],
    },
  },
  {
    id: "legal-cookies",
    title: "Cookies",
    path: "/cookies/",
    summary:
      "Politica informativa sobre cookies, almacenamiento local y contenido externo.",
    body: "Esta politica describe el comportamiento tecnico actual de la web mientras se completa el inventario final de terceros y duraciones.",
    intro:
      "La implementacion actual prioriza bloqueo preventivo de terceros no esenciales y registro versionado de preferencias de consentimiento sin casillas premarcadas.",
    sections: [
      {
        id: "legal-cookies-esenciales",
        title: "Almacenamiento necesario",
        paragraphs: [
          "La web puede usar almacenamiento local de primera parte para recordar preferencias tecnicas como el estado del preloader de la home y las preferencias de consentimiento.",
          "Estas claves no activan analitica ni marketing por si mismas.",
        ],
      },
      {
        id: "legal-cookies-no-esenciales",
        title: "Contenido externo no esencial",
        paragraphs: [
          "El mapa interactivo se considera contenido externo no esencial y permanece bloqueado hasta consentimiento valido para esa categoria.",
          "No se activa analitica, marketing ni pixeles antes de una decision explicita del usuario.",
        ],
      },
      {
        id: "legal-cookies-pendientes",
        title: "Inventario en revision",
        paragraphs: [
          "Antes de produccion debe cerrarse un inventario real de cookies, storage, terceros, duracion y bases de consentimiento aplicables.",
        ],
        items: [
          "Proveedor final de analitica todavia sin confirmar.",
          "Proveedor final de mapa o medios embebidos todavia sin confirmar.",
          "Duraciones legales definitivas todavia en revision.",
        ],
      },
    ],
    disclaimer:
      "Revision final pendiente con el titular. Esta politica refleja la implementacion tecnica actual y debe cerrarse con el inventario real de terceros.",
    status: "PENDING_VALIDATION",
    references: {
      sourceIds: [
        contentSources.siteCookies.id,
        contentSources.ownerChecklist.id,
      ],
    },
  },
];

export function getLegalPageByPath(path: string) {
  return legalPages.find((page) => page.path === path) ?? null;
}
