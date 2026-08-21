import type { Persona } from "@/lib/tipos";

/**
 * El colectivo, reducido a quienes sostienen el movimiento y firman lo que sale.
 * `firma` debe coincidir exactamente con el campo `autor` de las columnas.
 */
export const EQUIPO: Persona[] = [
  {
    slug: "felipe",
    nombre: "Felipe Jaramillo Vélez",
    papel: "Creador de Aún Humanos",
    grado: "PhD en Filosofía",
    bio: "Filósofo, conferencista y consultor. Más de veinte años en ética aplicada y desarrollo humano. Autor de «Humanos a Máquinas: tránsito hacia lo posthumano». Escribe sobre el ascenso de la técnica sin reflexión.",
    retrato: "/equipo/felipe.jpg",
    firma: "Felipe Jaramillo Vélez",
  },
  {
    slug: "olga",
    nombre: "Olga Zapata A.",
    papel: "Corazón de Aún Humanos",
    grado: "Magíster",
    bio: "Sostiene lo que no se ve: los encuentros, las personas, el cuidado del detalle. Sin ese trabajo, un movimiento filosófico se queda en idea.",
    retrato: "/equipo/olga.jpg",
  },
  {
    slug: "santiago",
    nombre: "Santiago Jiménez Londoño",
    papel: "Algoritmos deshumanizantes",
    grado: "PhD en Filosofía",
    bio: "Economista, magíster en ciencias naturales y matemáticas y doctor en filosofía. Profesor en la Universidad EAFIT. Autor de «Algoritmos Deshumanizantes». Columnista de La República y Al Poniente.",
    retrato: "/equipo/santiago.jpg",
    firma: "Santiago Jiménez Londoño",
  },
];

/** Cuatro líneas del ideario ético: lo que queda del decálogo cuando se recorta. */
export const IDEARIO = [
  "Ninguna persona del colectivo está subordinada a una máquina.",
  "Las máquinas son herramientas de trabajo, no agentes que deciden.",
  "Quien nos escribe siempre encuentra a un ser humano del otro lado.",
  "Todo lo hecho con máquina se declara como no humano.",
];
