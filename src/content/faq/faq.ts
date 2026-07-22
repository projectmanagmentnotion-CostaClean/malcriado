import type { FaqEntry } from "@/types/content";
import { contentSources } from "../shared/sources";

export const faqEntries: readonly FaqEntry[] = [
  {
    id: "faq-cocina",
    question: "Que tipo de cocina presenta Malcriado?",
    answer:
      "Malcriado se presenta como restaurante de cocina fusion latinoamericana y mediterranea frente al mar en Pineda de Mar.",
    category: "general",
    status: "VERIFIED",
    references: {
      sourceIds: [contentSources.siteHome.id, contentSources.siteNosotros.id],
    },
  },
  {
    id: "faq-reserva",
    question: "La reserva queda confirmada al enviar el formulario?",
    answer:
      "No. La web solo comunica solicitud enviada. La disponibilidad y la confirmacion siguen siendo manuales hasta que el equipo responda por sus canales operativos.",
    category: "booking",
    status: "VERIFIED",
    references: {
      sourceIds: [
        contentSources.currentSiteAudit.id,
        contentSources.ownerChecklist.id,
      ],
    },
  },
  {
    id: "faq-canal-reserva",
    question: "Que canales de reserva publica Malcriado hoy?",
    answer:
      "El proyecto publica formulario web y WhatsApp como vias visibles de solicitud. No se comunica ningun motor externo de disponibilidad en tiempo real.",
    category: "booking",
    status: "VERIFIED",
    references: {
      sourceIds: [
        contentSources.siteContacto.id,
        contentSources.currentSiteAudit.id,
      ],
    },
  },
  {
    id: "faq-menu-html",
    question: "La carta existe en HTML indexable?",
    answer:
      "Si. La carta esta publicada en HTML para que puedas consultarla con facilidad desde movil, buscadores y lectores de pantalla.",
    category: "menu",
    status: "VERIFIED",
    references: {
      sourceIds: [
        contentSources.siteMenu.id,
        contentSources.currentSiteAudit.id,
      ],
    },
  },
  {
    id: "faq-ubicacion",
    question: "Donde esta Malcriado?",
    answer:
      "La direccion publica es Passeig Maritim, 14, 08397 Pineda de Mar, Barcelona. El mapa interactivo solo se activa si aceptas contenido externo.",
    category: "location",
    status: "VERIFIED",
    references: {
      sourceIds: [contentSources.siteContacto.id, contentSources.siteHome.id],
    },
  },
  {
    id: "faq-horario",
    question: "El horario diario esta confirmado?",
    answer:
      "Todavia no. Ahora mismo se muestra un horario general y el detalle por dia se esta terminando de confirmar con el equipo.",
    category: "location",
    status: "PENDING_VALIDATION",
    references: {
      sourceIds: [contentSources.siteHome.id, contentSources.ownerChecklist.id],
    },
  },
  {
    id: "faq-cookies",
    question: "Se cargan mapas, analitica o terceros antes del consentimiento?",
    answer:
      "No. El contenido externo no esencial permanece bloqueado hasta que aceptas, rechazas o personalizas tus preferencias.",
    category: "legal",
    status: "VERIFIED",
    references: {
      sourceIds: [
        contentSources.ownerChecklist.id,
        contentSources.currentSiteAudit.id,
      ],
    },
  },
];
