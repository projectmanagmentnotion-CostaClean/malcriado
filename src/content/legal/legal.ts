import type { LegalPageContent } from "../../types/content";
import { contentSources } from "../shared/sources";

export const legalPages: readonly LegalPageContent[] = [
  {
    id: "legal-aviso",
    title: "Aviso legal",
    path: "/aviso-legal/",
    summary:
      "Base legal pendiente de completar con razon social, NIF/CIF y domicilio legal.",
    body: "Informacion legal publicada en estado provisional y pendiente de validacion final por el titular.",
    intro:
      "Esta pagina ordena la informacion legal visible del proyecto sin inventar datos societarios, fiscales o registrales que no hayan sido confirmados por el titular.",
    sections: [
      {
        id: "legal-aviso-alcance",
        title: "Alcance actual",
        paragraphs: [
          "Malcriado se presenta publicamente como nombre comercial visible del proyecto y restaurante en Pineda de Mar.",
          "La titularidad juridica completa, el NIF o CIF, el domicilio legal y cualquier dato registral siguen pendientes de validacion directa.",
        ],
      },
      {
        id: "legal-aviso-uso",
        title: "Uso de la web",
        paragraphs: [
          "La web tiene una finalidad informativa y comercial para carta, contacto, especiales y solicitudes de reserva.",
          "El contenido puede actualizarse cuando se confirmen datos editoriales, operativos o legales del titular.",
        ],
        items: [
          "No se garantiza disponibilidad inmediata de mesas desde la propia web.",
          "Las solicitudes enviadas requieren confirmacion manual posterior.",
          "Los textos legales no sustituyen revision juridica profesional final.",
        ],
      },
      {
        id: "legal-aviso-contacto",
        title: "Datos pendientes del titular",
        paragraphs: [
          "Antes de produccion deben completarse razon social o nombre del titular, NIF o CIF, domicilio legal, correo juridico y cualquier dato registral aplicable.",
        ],
      },
    ],
    disclaimer:
      "Estado: PENDING_VALIDATION. No publicar como version juridica definitiva sin checklist del titular cerrado.",
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
    summary:
      "La politica actual es generica y debe rehacerse sobre tratamientos reales.",
    body: "Politica de privacidad provisional basada en tratamientos visibles y en deudas documentadas del proyecto.",
    intro:
      "La web minimiza datos y evita exponer informacion personal en URLs o analytics de cliente, pero esta politica requiere validacion final del titular y del proveedor real de gestion.",
    sections: [
      {
        id: "legal-privacidad-datos",
        title: "Datos tratados hoy por la web",
        paragraphs: [
          "La funcionalidad visible de reserva solicita nombre, telefono, correo electronico cuando procede, fecha, hora, numero de comensales, notas y consentimiento de privacidad.",
          "La finalidad visible es gestionar solicitudes de reserva y responder por los canales operativos publicados.",
        ],
      },
      {
        id: "legal-privacidad-limitaciones",
        title: "Limitaciones actuales",
        paragraphs: [
          "La integracion definitiva de reserva, el responsable juridico exacto del tratamiento, los plazos de conservacion y los encargados reales siguen pendientes de validacion.",
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
          "Responsable juridico pendiente de confirmar.",
          "Correo especifico de privacidad pendiente de confirmar.",
          "Plazo de conservacion pendiente de confirmar.",
        ],
      },
    ],
    disclaimer:
      "Estado: PENDING_VALIDATION. El contenido orienta sobre el flujo tecnico actual, no sobre la redaccion juridica definitiva.",
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
      "No existe inventario final de cookies ni de terceros verificados.",
    body: "Politica de cookies y almacenamiento local en estado provisional, ajustada al comportamiento tecnico actual de la web.",
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
        title: "Inventario pendiente",
        paragraphs: [
          "Antes de produccion debe cerrarse un inventario real de cookies, storage, terceros, duracion y bases de consentimiento aplicables.",
        ],
        items: [
          "Proveedor final de analitica: PENDING_VALIDATION.",
          "Proveedor final de mapa o medios embebidos: PENDING_VALIDATION.",
          "Duraciones legales definitivas: PENDING_VALIDATION.",
        ],
      },
    ],
    disclaimer:
      "Estado: PENDING_VALIDATION. Esta politica refleja la implementacion tecnica actual y debe revisarse con inventario real de terceros.",
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
