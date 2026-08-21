import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escríbanos: conferencias, columnas, publicaciones del sello y conversaciones con el colectivo Aún Humanos.",
};

const CONTACTOS = [
  {
    etiqueta: "Correo",
    valor: "contacto@aunhumanos.com",
    href: "mailto:contacto@aunhumanos.com",
  },
  {
    etiqueta: "WhatsApp",
    valor: "+57 310 533 0111",
    href: "https://wa.me/573105330111?text=Hola%2C%20escribo%20desde%20aunhumanos.com",
  },
  { etiqueta: "Dónde", valor: "Medellín, Colombia" },
];

export default function Contacto() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
      <header className="pt-20 md:pt-32 pb-14 md:pb-20">
        <p className="eyebrow entrada">Contacto</p>
        <h1 className="display text-[clamp(3rem,10vw,8rem)] mt-6 entrada leading-[0.94]">
          Hablemos<span className="text-accent">.</span>
        </h1>
        <p
          className="mt-8 text-lg md:text-xl leading-[1.65] text-ink-2 max-w-[46ch] entrada"
          style={{ animationDelay: "0.2s" }}
        >
          Conferencias, columnas, libros del sello o una conversación sin
          agenda. Del otro lado siempre responde una persona.
        </p>
      </header>

      <div className="border-t border-line pb-28 md:pb-40">
        {CONTACTOS.map((c, i) => (
          <Reveal key={c.etiqueta} delay={i * 80}>
            <div className="grid grid-cols-1 md:grid-cols-[8.5rem_1fr] gap-x-8 gap-y-2 items-baseline border-b border-line py-8 md:py-10">
              <span className="eyebrow">{c.etiqueta}</span>
              {c.href ? (
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    c.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="display text-[clamp(1.75rem,5vw,3.5rem)] leading-[1.05] hover:text-accent transition-colors duration-500 break-words"
                >
                  {c.valor}
                </a>
              ) : (
                <span className="display text-[clamp(1.75rem,5vw,3.5rem)] leading-[1.05] text-ink-2">
                  {c.valor}
                </span>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
