import { ARCHIVO } from "@/data/columnas";
import { FUENTES, REVALIDAR, type Fuente } from "./fuentes";
import type { Columna } from "./tipos";

/* ------------------------------------------------------------------ *
 * Lectura de los canales de los medios
 * ------------------------------------------------------------------ */

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

function limpiar(texto: string): string {
  return texto
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;|&#x27;/gi, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&hellip;/g, "…")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/[“”]/g, "«")
    .replace(/\s+/g, " ")
    .trim();
}

function etiqueta(item: string, nombre: string): string {
  const m = item.match(
    new RegExp(`<${nombre}(?:\\s[^>]*)?>([\\s\\S]*?)</${nombre}>`, "i"),
  );
  return m ? limpiar(m[1]) : "";
}

/** La bajada: la primera idea de la columna, no el texto entero. */
function bajada(texto: string, tope = 190): string {
  const limpio = limpiar(texto);
  if (limpio.length <= tope) return limpio;
  const corte = limpio.slice(0, tope);
  const espacio = corte.lastIndexOf(" ");
  return `${corte.slice(0, espacio > 120 ? espacio : tope).replace(/[.,;:\s]+$/, "")}…`;
}

/** "Tue, 28 Jul 2026 05:01:43 +0000" → "2026-07-28" */
function aIso(pubDate: string): string {
  const t = Date.parse(pubDate);
  if (Number.isNaN(t)) return "";
  return new Date(t).toISOString().slice(0, 10);
}

function slugificar(t: string): string {
  return t
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
    .slice(0, 70)
    .replace(/-+$/g, "");
}

/** Para no repetir una columna que ya está en el archivo. */
function clave(url: string): string {
  try {
    const u = new URL(url);
    return `${u.hostname.replace(/^www\./, "")}${u.pathname.replace(/\/+$/, "")}`.toLowerCase();
  } catch {
    return url.toLowerCase();
  }
}

async function leerFuente(fuente: Fuente): Promise<Columna[]> {
  try {
    const respuesta = await fetch(fuente.url, {
      headers: { "user-agent": UA, accept: "application/rss+xml, text/xml, */*" },
      next: { revalidate: REVALIDAR },
      signal: AbortSignal.timeout(12_000),
    });

    if (!respuesta.ok) return [];

    const xml = await respuesta.text();
    const items = xml.match(/<item>[\s\S]*?<\/item>/gi) ?? [];

    return items.flatMap((item) => {
      const titulo = etiqueta(item, "title");
      const url = etiqueta(item, "link");
      const fecha = aIso(etiqueta(item, "pubDate"));
      if (!titulo || !url || !fecha) return [];

      return [
        {
          slug: slugificar(titulo),
          titulo,
          dek: bajada(
            etiqueta(item, "description") || etiqueta(item, "content:encoded"),
          ),
          // La firma la manda el medio; si no viene, la del canal.
          autor: etiqueta(item, "dc:creator") || fuente.autor,
          medio: fuente.medio,
          fecha,
          url,
        },
      ];
    });
  } catch {
    // Si un medio se cae, el sitio sigue mostrando lo que ya tiene.
    return [];
  }
}

/* ------------------------------------------------------------------ *
 * API del sitio
 * ------------------------------------------------------------------ */

/**
 * Todas las columnas: lo que traen los medios ahora mismo, más el archivo
 * histórico (los canales solo devuelven las últimas). Sin repetidos y de la
 * más reciente a la más antigua.
 */
export async function obtenerColumnas(): Promise<Columna[]> {
  const tandas = await Promise.all(FUENTES.map(leerFuente));

  const porUrl = new Map<string, Columna>();
  for (const c of [...tandas.flat(), ...ARCHIVO]) {
    const k = clave(c.url);
    const previa = porUrl.get(k);
    // Gana la versión del canal (más fresca), pero conserva lo que ella no trae.
    porUrl.set(k, previa ? { ...c, ...previa, dek: previa.dek || c.dek } : c);
  }

  return [...porUrl.values()].sort((a, b) => b.fecha.localeCompare(a.fecha));
}

/** Medios ordenados por cantidad de columnas. */
export function medios(lista: Columna[]): string[] {
  const conteo = new Map<string, number>();
  for (const c of lista) conteo.set(c.medio, (conteo.get(c.medio) ?? 0) + 1);
  return [...conteo.entries()].sort((a, b) => b[1] - a[1]).map(([m]) => m);
}

/** Autores ordenados por cantidad de columnas. */
export function autores(lista: Columna[]): string[] {
  const conteo = new Map<string, number>();
  for (const c of lista) conteo.set(c.autor, (conteo.get(c.autor) ?? 0) + 1);
  return [...conteo.entries()].sort((a, b) => b[1] - a[1]).map(([a]) => a);
}
