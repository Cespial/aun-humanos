import Link from "next/link";
import FilaColumna from "@/components/FilaColumna";
import Reveal from "@/components/Reveal";
import { medios, obtenerColumnas } from "@/lib/columnas";
import { fechaLarga } from "@/lib/formato";

// Next exige un literal aquí; mantener igual a REVALIDAR en lib/fuentes.ts
export const revalidate = 3600;

export default async function Inicio() {
  const columnas = await obtenerColumnas();
  const ultimaColumna = columnas[0];
  const recientes = columnas.slice(0, 6);
  const listaMedios = medios(columnas);

  return (
    <>
      {/* ---------- Portada ---------- */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <div className="min-h-[82vh] md:min-h-[86vh] flex flex-col justify-center py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow entrada">Movimiento filosófico · Medellín</p>

              <h1 className="display mt-8 md:mt-10 text-[clamp(4.5rem,15vw,13rem)] entrada">
                Aún
                <br />
                humanos<span className="text-accent">.</span>
              </h1>

              <div className="h-px bg-line mt-10 md:mt-14 linea" />

              <p
                className="mt-8 text-lg md:text-xl leading-[1.65] text-ink-2 max-w-[46ch] entrada"
                style={{ animationDelay: "0.25s" }}
              >
                Pensamos en público la relación entre la técnica y lo humano.
                Cada columna que publicamos en un medio queda aquí, en un solo
                lugar.
              </p>
            </div>

            {/* Última columna: lo primero que cambia cada semana. */}
            <div
              className="lg:col-span-4 entrada"
              style={{ animationDelay: "0.45s" }}
            >
              <div className="border-t border-ink pt-5">
                <p className="eyebrow">Última columna</p>
                <p className="mono text-[11px] tracking-[0.16em] uppercase text-ink-3 mt-4">
                  {fechaLarga(ultimaColumna.fecha)}
                  <span className="mx-2 text-line">/</span>
                  {ultimaColumna.medio}
                </p>
                <a
                  href={ultimaColumna.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block mt-3"
                >
                  <h2 className="display text-[1.75rem] md:text-3xl leading-[1.08] group-hover:text-accent transition-colors duration-500">
                    {ultimaColumna.titulo}
                  </h2>
                  <span className="mono text-[10.5px] tracking-[0.18em] uppercase text-ink-3 mt-4 inline-block group-hover:text-accent transition-colors duration-500">
                    Leer en {ultimaColumna.medio} ↗
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- La convicción ---------- */}
      <section className="border-t border-line bg-paper-2">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16 py-24 md:py-40">
          <Reveal>
            <blockquote className="max-w-5xl mx-auto text-center">
              <p className="display text-[clamp(2rem,5.5vw,4.25rem)] leading-[1.06]">
                La tecnología debe estar
                <br className="hidden md:block" /> al servicio de lo humano
                <span className="italic">, no al revés</span>
                <span className="text-accent">.</span>
              </p>
              <footer className="eyebrow mt-10">
                Aún Humanos — colectivo de filosofía aplicada
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ---------- Columnas recientes ---------- */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16 py-24 md:py-32">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
            <div>
              <p className="eyebrow">Lo último</p>
              <h2 className="display text-[clamp(2.25rem,6vw,4.5rem)] mt-5">
                Columnas
              </h2>
            </div>
            <p className="mono text-[11px] tracking-[0.16em] uppercase text-ink-3 md:text-right md:pb-3">
              {columnas.length} publicadas
              <br className="hidden md:block" />
              <span className="md:hidden"> · </span>
              {listaMedios.join(" · ")}
            </p>
          </div>
        </Reveal>

        <div>
          {recientes.map((c, i) => (
            <Reveal key={c.slug} delay={Math.min(i * 60, 240)}>
              <FilaColumna columna={c} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="border-t border-line pt-10 mt-0">
            <Link
              href="/columnas"
              className="group inline-flex items-baseline gap-4"
            >
              <span className="display text-2xl md:text-4xl group-hover:text-accent transition-colors duration-500">
                Ver el archivo completo
              </span>
              <span
                aria-hidden
                className="text-ink-3 group-hover:text-accent group-hover:translate-x-1 transition-all duration-500"
              >
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ---------- Cierre ---------- */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16 py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <Reveal>
                <p className="eyebrow">Quiénes escriben</p>
                <h2 className="display text-[clamp(2rem,5vw,3.5rem)] mt-5 leading-[1.02]">
                  Somos
                  <br />
                  personas<span className="text-accent">,</span>
                  <br />
                  no una marca.
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-6 md:col-start-7 flex flex-col justify-end">
              <Reveal delay={120}>
                <p className="text-lg leading-[1.7] text-ink-2 max-w-[52ch]">
                  Un filósofo, una mujer que sostiene el día a día y un profesor
                  que escribe sobre algoritmos. Tres oficios distintos y una
                  misma pregunta: qué conservamos de lo humano mientras la
                  técnica avanza.
                </p>
                <Link
                  href="/somos"
                  className="group inline-flex items-baseline gap-3 mt-8 mono text-[11px] tracking-[0.2em] uppercase text-ink hover:text-accent transition-colors duration-500"
                >
                  Conocer al colectivo
                  <span
                    aria-hidden
                    className="group-hover:translate-x-1 transition-transform duration-500"
                  >
                    →
                  </span>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
