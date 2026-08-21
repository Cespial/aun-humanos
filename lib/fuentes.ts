/**
 * EL MOTOR — de aquí sale solo el sitio.
 *
 * Cada fuente es el canal que el propio medio publica para un columnista.
 * Cuando Felipe o Santiago sacan una columna, el medio la mete en su canal y
 * el sitio la recoge en la siguiente revalidación. Nadie tiene que subir nada.
 *
 * Para sumar un medio nuevo (El Colombiano, The New York Times…), basta con
 * agregar aquí su canal de columnista.
 */
export type Fuente = {
  id: string;
  medio: string;
  autor: string;
  /** Canal RSS del columnista en el medio */
  url: string;
  /** Página del columnista, por si el lector quiere ir al medio */
  perfil: string;
};

export const FUENTES: Fuente[] = [
  {
    id: "lr-santiago",
    medio: "La República",
    autor: "Santiago Jiménez Londoño",
    url: "https://www.larepublica.co/analisis/santiago-jimenez-londono-4353436/rss",
    perfil:
      "https://www.larepublica.co/analisis/santiago-jimenez-londono-4353436",
  },
  {
    id: "ap-santiago",
    medio: "Al Poniente",
    autor: "Santiago Jiménez Londoño",
    url: "https://alponiente.com/author/sjimenezlon/feed/",
    perfil: "https://alponiente.com/author/sjimenezlon/",
  },
  {
    id: "ap-felipe",
    medio: "Al Poniente",
    autor: "Felipe Jaramillo Vélez",
    url: "https://alponiente.com/author/fejaramillo/feed/",
    perfil: "https://alponiente.com/author/fejaramillo/",
  },
];

/** Cada cuántos segundos vuelve a mirar los medios. */
export const REVALIDAR = 3600;
