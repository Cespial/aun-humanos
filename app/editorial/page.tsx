import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { LIBROS } from "@/data/libros";

export const metadata: Metadata = {
  title: "Editorial",
  description:
    "El sello editorial Aún Humanos: siete títulos sobre técnica, humanidad e inteligencia artificial.",
};

/** Crema de la pieza original del sello: las portadas recortadas se funden con este fondo. */
const CREMA = "#f5f0ec";

const WHATSAPP =
  "https://wa.me/573105330111?text=Hola%2C%20quiero%20un%20libro%20del%20sello%20A%C3%BAn%20Humanos";

export default function Editorial() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
      <header className="pt-20 md:pt-32 pb-14 md:pb-24">
        <p className="eyebrow entrada">Sello editorial</p>
        <h1 className="display text-[clamp(3rem,10vw,8rem)] mt-6 entrada">
          Editorial
        </h1>
        <p
          className="mt-8 text-lg md:text-xl leading-[1.65] text-ink-2 max-w-[52ch] entrada"
          style={{ animationDelay: "0.2s" }}
        >
          Publicamos a quienes piensan la técnica desde lo humano. Siete títulos
          hasta hoy, entre el ensayo, el pensamiento y la narrativa.
        </p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-14 md:gap-x-10 md:gap-y-20 border-t border-line pt-14 md:pt-20">
        {LIBROS.map((libro, i) => (
          <Reveal key={libro.slug} delay={Math.min(i * 60, 300)}>
            <article className="group">
              <div
                className="aspect-[3/4] flex items-center justify-center p-5 md:p-7 overflow-hidden"
                style={{ background: CREMA }}
              >
                <Image
                  src={libro.portada}
                  alt={`Portada de ${libro.titulo}`}
                  width={360}
                  height={500}
                  sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 44vw"
                  className="max-h-full w-auto object-contain transition-transform duration-700 ease-out group-hover:-translate-y-1.5"
                />
              </div>

              <p className="eyebrow mt-5">{libro.coleccion}</p>
              <h2 className="display text-xl md:text-2xl mt-2 leading-[1.12]">
                {libro.titulo}
              </h2>
              <p className="mono text-[10.5px] tracking-[0.16em] uppercase text-ink-3 mt-3">
                {libro.autor}
              </p>
              {libro.subtitulo && (
                <p className="text-sm leading-relaxed text-ink-2 mt-3 max-w-[34ch]">
                  {libro.subtitulo}
                </p>
              )}
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="border-t border-line mt-20 md:mt-28 pt-10 pb-24 md:pb-32 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <p className="display text-2xl md:text-4xl max-w-[22ch] leading-[1.08]">
            ¿Quiere un ejemplar?
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-baseline gap-3 mono text-[11px] tracking-[0.2em] uppercase text-ink hover:text-accent transition-colors duration-500"
          >
            Pedidos por WhatsApp
            <span
              aria-hidden
              className="group-hover:translate-x-1 transition-transform duration-500"
            >
              ↗
            </span>
          </a>
        </div>
      </Reveal>
    </div>
  );
}
