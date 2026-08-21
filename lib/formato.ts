import type { Columna } from "./tipos";

const MESES = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
];

/** 2026-07-28 → "28 jul 2026". Sin `new Date()`: evita el corrimiento por zona horaria. */
export function fechaLarga(iso: string): string {
  const [a, m, d] = iso.split("-");
  if (!a || !m || !d) return iso;
  return `${Number(d)} ${MESES[Number(m) - 1]} ${a}`;
}

export function anio(iso: string): string {
  return iso.slice(0, 4);
}

/** Agrupa por año conservando el orden cronológico inverso. */
export function porAnio(lista: Columna[]): [string, Columna[]][] {
  const grupos = new Map<string, Columna[]>();
  for (const c of lista) {
    const a = anio(c.fecha);
    if (!grupos.has(a)) grupos.set(a, []);
    grupos.get(a)!.push(c);
  }
  return [...grupos.entries()];
}
