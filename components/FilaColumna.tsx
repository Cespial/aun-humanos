import type { Columna } from "@/lib/tipos";
import { fechaLarga } from "@/lib/formato";

/**
 * La unidad mínima del sitio: una columna es una fecha, un título y una firma.
 * Nada de tarjetas ni sombras: una línea fina y aire.
 */
export default function FilaColumna({
  columna,
  conDek = true,
}: {
  columna: Columna;
  conDek?: boolean;
}) {
  return (
    <a
      href={columna.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border-t border-line py-7 md:py-9 transition-colors duration-500 hover:border-ink"
    >
      <div className="grid grid-cols-1 md:grid-cols-[8.5rem_1fr_1.5rem] gap-x-8 gap-y-3 items-baseline">
        <time
          dateTime={columna.fecha}
          className="mono text-[11px] tracking-[0.16em] uppercase text-ink-3 group-hover:text-accent transition-colors duration-500"
        >
          {fechaLarga(columna.fecha)}
        </time>

        <div className="max-w-3xl">
          <h3 className="display text-2xl md:text-[2rem] leading-[1.08] transition-transform duration-500 md:group-hover:translate-x-1">
            {columna.titulo}
          </h3>

          {conDek && columna.dek && (
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2 line-clamp-2">
              {columna.dek}
            </p>
          )}

          <p className="mt-3 mono text-[10.5px] tracking-[0.16em] uppercase text-ink-3">
            {columna.autor}
            <span className="mx-2 text-line">/</span>
            {columna.medio}
          </p>
        </div>

        <span
          aria-hidden
          className="hidden md:block text-ink-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-accent transition-all duration-500 text-lg leading-none"
        >
          ↗
        </span>
      </div>
    </a>
  );
}
