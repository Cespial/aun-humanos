import type { Metadata } from "next";
import ListaColumnas from "@/components/ListaColumnas";
import { autores, medios, obtenerColumnas } from "@/lib/columnas";
import { FUENTES } from "@/lib/fuentes";

// Next exige un literal aquí; mantener igual a REVALIDAR en lib/fuentes.ts
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Columnas",
  description:
    "Archivo de las columnas del colectivo Aún Humanos, publicadas en La República, El Colombiano, Al Poniente, Ethic y otros medios.",
};

export default async function Columnas({
  searchParams,
}: {
  searchParams: Promise<{ medio?: string; autor?: string }>;
}) {
  const { medio, autor } = await searchParams;
  const columnas = await obtenerColumnas();
  const listaMedios = medios(columnas);
  const listaAutores = autores(columnas);

  return (
    <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
      <header className="pt-20 md:pt-32 pb-14 md:pb-20">
        <p className="eyebrow entrada">Archivo</p>
        <h1 className="display text-[clamp(3rem,10vw,8rem)] mt-6 entrada">
          Columnas
        </h1>
        <p
          className="mt-8 text-lg md:text-xl leading-[1.65] text-ink-2 max-w-[52ch] entrada"
          style={{ animationDelay: "0.2s" }}
        >
          Todo lo que hemos escrito en medios, reunido. Cada título abre la
          columna en el periódico donde salió.
        </p>

        {/* El motor: nadie sube nada, el sitio va y lo busca. */}
        <p
          className="mt-8 mono text-[10.5px] tracking-[0.16em] uppercase text-ink-3 max-w-[60ch] leading-[1.9] entrada"
          style={{ animationDelay: "0.3s" }}
        >
          Se actualiza solo · Lee cada hora a{" "}
          {[...new Set(FUENTES.map((f) => f.medio))].join(" · ")}
        </p>
      </header>

      <ListaColumnas
        columnas={columnas}
        medios={listaMedios}
        autores={listaAutores}
        medioInicial={medio && listaMedios.includes(medio) ? medio : undefined}
        autorInicial={autor && listaAutores.includes(autor) ? autor : undefined}
      />
    </div>
  );
}
