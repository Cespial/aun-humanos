import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { EQUIPO, IDEARIO } from "@/data/equipo";
import { obtenerColumnas } from "@/lib/columnas";

// Next exige un literal aquí; mantener igual a REVALIDAR en lib/fuentes.ts
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Somos",
  description:
    "Aún Humanos es un movimiento filosófico creado por Felipe Jaramillo Vélez. Quiénes lo sostienen y quiénes firman.",
};

export default async function Somos() {
  const columnas = await obtenerColumnas();

  return (
    <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
      <header className="pt-20 md:pt-32 pb-14 md:pb-24">
        <p className="eyebrow entrada">Somos</p>
        <h1 className="display text-[clamp(3rem,9vw,7.5rem)] mt-6 entrada leading-[0.94]">
          Tres personas
          <br />y una pregunta<span className="text-accent">.</span>
        </h1>
        <p
          className="mt-10 text-lg md:text-xl leading-[1.65] text-ink-2 max-w-[54ch] entrada"
          style={{ animationDelay: "0.2s" }}
        >
          Aún Humanos nació como una escuela de pensamiento sobre el ascenso de
          la técnica sin reflexión. No damos respuestas cerradas: escribimos,
          publicamos y volvemos a preguntar qué conservamos de lo humano
          mientras la tecnología avanza.
        </p>
      </header>

      <div className="border-t border-line">
        {EQUIPO.map((p, i) => {
          const cuantas = p.firma
            ? columnas.filter((c) => c.autor === p.firma).length
            : 0;

          return (
            <Reveal key={p.slug} delay={i * 80}>
              <article className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 py-14 md:py-20 border-b border-line items-start">
                <div className="md:col-span-3">
                  <div className="relative w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden bg-paper-2">
                    <Image
                      src={p.retrato}
                      alt={p.nombre}
                      fill
                      sizes="(min-width: 768px) 176px, 128px"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="md:col-span-6">
                  <p className="eyebrow">{p.grado}</p>
                  <h2 className="display text-[clamp(2rem,4.5vw,3.25rem)] mt-4 leading-[1.02]">
                    {p.nombre}
                  </h2>
                  <p className="mono text-[11px] tracking-[0.18em] uppercase text-accent mt-4">
                    {p.papel}
                  </p>
                  <p className="mt-6 text-lg leading-[1.7] text-ink-2 max-w-[50ch]">
                    {p.bio}
                  </p>
                </div>

                <div className="md:col-span-3 md:text-right">
                  {cuantas > 0 && (
                    <Link
                      href={`/columnas?autor=${encodeURIComponent(p.firma!)}`}
                      className="group inline-flex items-baseline gap-3 mono text-[11px] tracking-[0.18em] uppercase text-ink hover:text-accent transition-colors duration-500"
                    >
                      {cuantas} columnas
                      <span
                        aria-hidden
                        className="group-hover:translate-x-1 transition-transform duration-500"
                      >
                        →
                      </span>
                    </Link>
                  )}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      {/* ---------- Ideario ---------- */}
      <section className="py-24 md:py-36">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <Reveal>
              <p className="eyebrow">Ideario</p>
              <h2 className="display text-[clamp(2rem,5vw,3.5rem)] mt-5 leading-[1.02]">
                Lo que no
                <br />
                negociamos<span className="text-accent">.</span>
              </h2>
            </Reveal>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <ol className="border-t border-line">
              {IDEARIO.map((linea, i) => (
                <Reveal key={linea} delay={i * 70}>
                  <li className="border-b border-line py-7 flex gap-6 md:gap-10 items-baseline">
                    <span className="mono text-[11px] text-ink-3 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="display text-xl md:text-[1.6rem] leading-[1.25]">
                      {linea}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
