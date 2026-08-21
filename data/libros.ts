export type Libro = {
  slug: string;
  titulo: string;
  autor: string;
  subtitulo?: string;
  coleccion: "Pensamiento" | "Narrativa" | "Ensayo";
  portada: string;
  /** Color dominante de la portada, para el degradado de la ficha */
  tono: string;
  sinopsis: string;
};

/**
 * Los 7 títulos del catálogo tal como aparecen en la pieza
 * "Sello Editorial Aún Humanos". Las portadas están recortadas de esa misma pieza.
 */
export const LIBROS: Libro[] = [
  {
    slug: "algoritmos-deshumanizantes",
    titulo: "Algoritmos Deshumanizantes",
    autor: "Santiago Jiménez Londoño",
    subtitulo: "IA y la pérdida de la noción de individuo",
    coleccion: "Pensamiento",
    portada: "/libros/algoritmos-deshumanizantes.jpg",
    tono: "#5b2a63",
    sinopsis:
      "Una interrogación sobre lo que ocurre con la noción de individuo cuando los sistemas algorítmicos median cada vez más decisiones sobre nuestra vida.",
  },
  {
    slug: "humanos-a-maquinas",
    titulo: "Humanos a Máquinas",
    autor: "Felipe Jaramillo Vélez",
    subtitulo: "Tránsito hacia lo posthumano",
    coleccion: "Pensamiento",
    portada: "/libros/humanos-a-maquinas.jpg",
    tono: "#6d1f2c",
    sinopsis:
      "El recorrido del tránsito humano hacia lo posthumano: qué cedemos, qué conservamos y qué decidimos ser en medio de la aceleración técnica.",
  },
  {
    slug: "maquinas-organicas",
    titulo: "Máquinas orgánicas y humanos con engranajes",
    autor: "Stiven Arteaga",
    subtitulo:
      "El Tercer Ente: ontología de la instantaneidad del humano-máquina y el surgimiento del órgano externo",
    coleccion: "Ensayo",
    portada: "/libros/maquinas-organicas.jpg",
    tono: "#1c1917",
    sinopsis:
      "Una ontología del Tercer Ente: la figura que emerge cuando el órgano externo deja de ser herramienta y pasa a ser parte del cuerpo.",
  },
  {
    slug: "la-desnudez-de-los-dias",
    titulo: "La desnudez de los días",
    autor: "Juan David Gelacio Panesso",
    coleccion: "Narrativa",
    portada: "/libros/desnudez-de-los-dias.jpg",
    tono: "#5d1a24",
    sinopsis:
      "Una escritura que despoja los días de su ropaje y los deja a la intemperie, en el punto exacto donde la vida cotidiana se vuelve materia poética.",
  },
  {
    slug: "2048-ano-de-la-singularidad",
    titulo: "2048, año de la singularidad",
    autor: "Felipe Jaramillo Vélez",
    subtitulo: "Ocho cuentos premonitorios de mundos distópicos",
    coleccion: "Narrativa",
    portada: "/libros/2048-singularidad.jpg",
    tono: "#c96a1e",
    sinopsis:
      "Relatos de mundos que todavía no existen y que, sin embargo, ya se parecen demasiado al nuestro.",
  },
  {
    slug: "la-estructura-invisible",
    titulo: "La estructura invisible",
    autor: "Andrés Raigoza",
    subtitulo:
      "Estructuras de negocio para las industrias creativas y culturales",
    coleccion: "Ensayo",
    portada: "/libros/estructura-invisible.jpg",
    tono: "#8a8f98",
    sinopsis:
      "Lo que sostiene a las industrias creativas y culturales rara vez se ve: este libro dibuja esa estructura y la vuelve utilizable.",
  },
  {
    slug: "perdido-en-praha",
    titulo: "Perdido en Praha",
    autor: "Felipe Jaramillo Vélez",
    coleccion: "Narrativa",
    portada: "/libros/perdido-en-praha.jpg",
    tono: "#6b5540",
    sinopsis:
      "Un extravío en una ciudad de piedra y niebla, donde perderse es la única forma honesta de encontrarse.",
  },
];

export const COLECCIONES = ["Todos", "Pensamiento", "Narrativa", "Ensayo"] as const;
