import type { Metadata } from "next";
import Image from "next/image";
import Configurador from "@/components/Configurador";
import Reveal from "@/components/Reveal";
import { PRODUCTOS, WHATSAPP_VISIBLE, precioCOP } from "@/data/tienda";

export const metadata: Metadata = {
  title: "Tienda",
  description:
    "La colección Aún Humanos: camisetas, busos y hoodies en siete colores. Pedidos por WhatsApp.",
};

const CREMA = "#f5f0ec";

export default function Tienda() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
      <header className="pt-20 md:pt-32 pb-14 md:pb-20">
        <p className="eyebrow entrada">La colección</p>
        <h1 className="display text-[clamp(3rem,10vw,8rem)] mt-6 entrada">
          Tienda
        </h1>
        <p
          className="mt-8 text-lg md:text-xl leading-[1.65] text-ink-2 max-w-[50ch] entrada"
          style={{ animationDelay: "0.2s" }}
        >
          Camisetas, busos y hoodies con el sello del movimiento. Siete colores,
          tallas de XS a XXL, corte hombre y mujer.
        </p>
      </header>

      {/* Las tres prendas */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 border-t border-line pt-14 md:pt-16 pb-20 md:pb-28">
        {PRODUCTOS.map((p, i) => (
          <Reveal key={p.slug} delay={i * 80}>
            <article className="group">
              <div
                className="aspect-[4/5] flex items-center justify-center overflow-hidden"
                style={{ background: CREMA }}
              >
                <Image
                  src={p.imagenPorDefecto}
                  alt={p.nombre}
                  width={520}
                  height={650}
                  sizes="(min-width: 768px) 30vw, 90vw"
                  className="max-h-full w-auto object-contain p-8 transition-transform duration-700 ease-out group-hover:-translate-y-2"
                />
              </div>
              <div className="flex items-baseline justify-between gap-4 mt-5 border-t border-line pt-4">
                <h2 className="display text-2xl leading-none">{p.nombre}</h2>
                <span className="mono text-[11px] tracking-[0.14em] text-ink-3">
                  {precioCOP(p.precio)}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-ink-2 mt-3 max-w-[36ch]">
                {p.descripcion}
              </p>
            </article>
          </Reveal>
        ))}
      </section>

      {/* Arma el pedido */}
      <section id="pedido" className="border-t border-line pt-16 md:pt-24">
        <Reveal>
          <div className="mb-14 md:mb-20">
            <p className="eyebrow">Arma tu pedido</p>
            <h2 className="display text-[clamp(2.25rem,6vw,4.5rem)] mt-5 leading-[1.02]">
              Escoja prenda, color
              <br />y talla<span className="text-accent">.</span>
            </h2>
          </div>
        </Reveal>

        <Configurador />
      </section>

      <section className="border-t border-line mt-20 md:mt-28 pt-10 pb-24 md:pb-32 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <p className="text-[0.95rem] leading-relaxed text-ink-2 max-w-[46ch]">
          Producción por encargo, entrega en Medellín y envíos al resto del
          país. Cualquier duda, escríbanos al {WHATSAPP_VISIBLE}.
        </p>
        <p className="mono text-[10.5px] tracking-[0.16em] uppercase text-ink-3">
          Precios en pesos colombianos
        </p>
      </section>
    </div>
  );
}
