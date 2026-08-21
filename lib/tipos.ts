export type Columna = {
  /** Identificador estable, derivado del título */
  slug: string;
  titulo: string;
  /** Bajada: la primera frase, el resumen que da el medio */
  dek: string;
  autor: string;
  /** El medio donde salió: La República, El Colombiano, Al Poniente, Ethic… */
  medio: string;
  /** ISO corto: 2026-07-28 */
  fecha: string;
  /** Enlace al medio. La columna vive allá; aquí vive el rastro. */
  url: string;
  /** og:image del medio, opcional */
  imagen?: string;
};

export type Persona = {
  slug: string;
  nombre: string;
  papel: string;
  grado: string;
  bio: string;
  retrato: string;
  /** Nombre exacto con el que firma sus columnas, para cruzarlo con el archivo */
  firma?: string;
};
