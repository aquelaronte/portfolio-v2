import dayventCover from "@/assets/projects/dayvent/cover.png";
import iceWearCover from "@/assets/projects/ice-wear/cover.png";

export const articles = [
  {
    title: "Dayvent: Cómo estructuré un sistema POS/ERP desde cero",
    cover: {
      alt: "Dayvent cover image",
      url: dayventCover,
    },
    date: new Date(),
    description:
      "¿A cuales retos técnicos me enfrento al crear un sistema de ventas? ¿Cómo hago que mi software sea más competitivo? Son preguntas que están en nuestra cabeza siempre que pensamos en construir un software de gestión empresarial, especialmente en un mercado tan agresivamente competitivo.",
    tags: ["Software Engineering", "Dayvent", "Infrastructure"],
    estimatedReadingTime: 10,
  },
  {
    title: "¿Cómo integro AI en un negocio?",
    cover: {
      alt: "Ice Wear Store cover image",
      url: iceWearCover,
    },
    date: new Date(),
    description:
      "Los desarrolladores de backend actuales aún trabajan diseñando APIs, modelando bases de datos, construyendo arquitecturas robustas e integrando servicios externos. Pero a todas estas disciplinas se les ha sumado la que hoy marca la diferencia y que pronto será el estándar de la industria: la integración de IA. En este artículo, tomaremos un negocio real como ejemplo y construiremos un asistente inteligente desde cero.",
    tags: ["Software Engineering", "Infrastructure", "RAG", "AI"],
    estimatedReadingTime: 10,
  },
];
