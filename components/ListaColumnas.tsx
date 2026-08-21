"use client";

import { useMemo, useState } from "react";
import FilaColumna from "./FilaColumna";
import type { Columna } from "@/lib/tipos";
import { porAnio } from "@/lib/formato";

const TODOS = "Todos";

function Filtro({
  titulo,
  opciones,
  activo,
  onCambio,
}: {
  titulo: string;
  opciones: string[];
  activo: string;
  onCambio: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
      <span className="eyebrow w-14 shrink-0">{titulo}</span>
      {[TODOS, ...opciones].map((o) => {
        const on = activo === o;
        return (
          <button
            key={o}
            type="button"
            onClick={() => onCambio(o)}
            className={`mono text-[11px] tracking-[0.14em] uppercase transition-colors duration-300 ${
              on ? "text-ink" : "text-ink-3 hover:text-ink"
            }`}
            aria-pressed={on}
          >
            {o}
            <span
              className={`block h-px mt-1 bg-accent origin-left transition-transform duration-500 ${
                on ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

export default function ListaColumnas({
  columnas,
  medios,
  autores,
  medioInicial = TODOS,
  autorInicial = TODOS,
}: {
  columnas: Columna[];
  medios: string[];
  autores: string[];
  medioInicial?: string;
  autorInicial?: string;
}) {
  const [medio, setMedio] = useState(medioInicial);
  const [autor, setAutor] = useState(autorInicial);

  const filtradas = useMemo(
    () =>
      columnas.filter(
        (c) =>
          (medio === TODOS || c.medio === medio) &&
          (autor === TODOS || c.autor === autor),
      ),
    [columnas, medio, autor],
  );

  const grupos = porAnio(filtradas);

  return (
    <>
      <div className="flex flex-col gap-4 border-y border-line py-6 mb-10 md:mb-14">
        <Filtro
          titulo="Medio"
          opciones={medios}
          activo={medio}
          onCambio={setMedio}
        />
        <Filtro
          titulo="Firma"
          opciones={autores}
          activo={autor}
          onCambio={setAutor}
        />
      </div>

      <p className="mono text-[11px] tracking-[0.16em] uppercase text-ink-3 mb-8">
        {filtradas.length}{" "}
        {filtradas.length === 1 ? "columna" : "columnas"}
      </p>

      {grupos.length === 0 && (
        <p className="display text-3xl text-ink-3 py-16 border-t border-line">
          Todavía no hay columnas con ese cruce.
        </p>
      )}

      {grupos.map(([anio, lista]) => (
        <section key={anio} className="mb-16 md:mb-24">
          <div className="flex items-baseline gap-6 mb-2">
            <span className="mono text-[11px] tracking-[0.22em] text-ink-3">
              {anio}
            </span>
            <span className="flex-1 h-px bg-line-2" />
          </div>
          {lista.map((c) => (
            <FilaColumna key={c.slug + c.url} columna={c} />
          ))}
        </section>
      ))}
    </>
  );
}
