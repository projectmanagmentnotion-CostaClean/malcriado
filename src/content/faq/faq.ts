import type { FaqEntry } from "@/types/content";
import { contentSources } from "../shared/sources";

export const faqEntries: readonly FaqEntry[] = [
  {
    id: "faq-cocina",
    question: "Que tipo de cocina presenta Malcriado?",
    answer:
      "La propuesta publica auditada presenta a Malcriado como restaurante de cocina fusion latinoamericana y mediterranea frente al mar en Pineda de Mar.",
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
      "Si. La carta publica del proyecto se reconstruye en HTML semantico para mantener indexabilidad y accesibilidad sin depender solo de PDF o imagen.",
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
      "La direccion publica auditada es Passeig Maritim, 14, 08397 Pineda de Mar, Barcelona. El mapa interactivo solo se activa tras consentimiento valido para contenido externo.",
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
      "No todavia. El sitio auditado solo expone un resumen global y el detalle diario sigue en estado PENDING_VALIDATION hasta confirmacion del titular.",
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
      "No. La implementacion de Fase 9 bloquea contenido externo no esencial antes del consentimiento y permite aceptar, rechazar o personalizar preferencias de forma reversible.",
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
