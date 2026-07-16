import { PENDING_CONTENT } from "@/types/content";

export interface HomeScene {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly accent: string;
}

export const homeScenes: readonly HomeScene[] = [
  {
    id: "especial-activo",
    eyebrow: "Escena 3",
    title: "Especial activo preparado para entrar primero en la narrativa.",
    body: `Sin precio ni condiciones hasta validacion. Estado actual: ${PENDING_CONTENT}.`,
    accent: "terracotta",
  },
  {
    id: "fusion",
    eyebrow: "Escena 4",
    title: "Latinoamerica y Mediterraneo en la misma frase visual.",
    body: "La futura escena mezclara tipografia masiva, ingredientes, fuego y costa sin convertir el texto en un obstaculo para leer.",
    accent: "sand",
  },
  {
    id: "mar",
    eyebrow: "Escena 6",
    title: "La costa no como postal, sino como atmosfera emocional.",
    body: "La escena del mar debe bajar pulsaciones, abrir espacio negativo y conectar mesa, atardecer y ubicacion real del negocio.",
    accent: "sea",
  },
  {
    id: "noche",
    eyebrow: "Escena 7",
    title: "Cocteles, brillo controlado y energia nocturna.",
    body: "La version definitiva puede usar capas translúcidas y cambios de luz, evitando blur pesado y animacion permanente.",
    accent: "night",
  },
];
