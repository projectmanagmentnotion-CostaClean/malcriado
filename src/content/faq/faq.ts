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
      "No. El formulario prepara el mensaje en tu navegador. La solicitud solo llega al equipo cuando eliges WhatsApp o correo y completas el envío; la reserva queda pendiente de confirmación personal.",
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
      "Puedes preparar la solicitud en el formulario y continuar de forma explícita por WhatsApp o correo. También puedes llamar al teléfono público del restaurante. No se comunica disponibilidad en tiempo real.",
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
    id: "faq-alergenos",
    question: "Donde puedo consultar la informacion sobre alergenos?",
    answer:
      "La carta muestra los 14 grupos de alergenos como informacion general, sin asignarlos a platos concretos. ¿Tienes alguna alergia o intolerancia? Consulta con nuestro equipo antes de realizar tu pedido.",
    category: "menu",
    status: "VERIFIED",
    references: {
      sourceIds: [contentSources.siteMenu.id, contentSources.ownerChecklist.id],
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
      "Consulta el horario publicado en la web. Las fechas especiales pueden variar, así que el equipo revisará la franja solicitada antes de confirmar la reserva.",
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
