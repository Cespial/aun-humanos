"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  COLORES,
  GENEROS,
  PRODUCTOS,
  TALLAS,
  WHATSAPP,
  precioCOP,
} from "@/data/tienda";

/** Crema de la pieza original de la colección: los recortes se funden con este fondo. */
const CREMA = "#f5f0ec";

function Campo({
  etiqueta,
  nota,
  children,
}: {
  etiqueta: string;
  nota?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-line pt-6">
      <div className="flex items-baseline justify-between mb-5">
        <span className="eyebrow">{etiqueta}</span>
        {nota && (
          <span className="mono text-[10px] tracking-[0.14em] uppercase text-ink-3">
            {nota}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

export default function Configurador() {
  const [productoSlug, setProductoSlug] = useState(PRODUCTOS[0].slug);
  const [colorSlug, setColorSlug] = useState("negro");
  const [talla, setTalla] = useState<(typeof TALLAS)[number]>("M");
  const [genero, setGenero] = useState<(typeof GENEROS)[number]>("Hombre");
  const [cantidad, setCantidad] = useState(1);

  const producto = useMemo(
    () => PRODUCTOS.find((p) => p.slug === productoSlug)!,
    [productoSlug],
  );
  const color = useMemo(
    () => COLORES.find((c) => c.slug === colorSlug)!,
    [colorSlug],
  );

  const imagen = producto.imagenes[colorSlug];
  const hayFoto = Boolean(imagen);
  const total = producto.precio * cantidad;

  const mensaje = `Hola Aún Humanos 👋
Quiero pedir de la colección:

• Prenda: ${producto.nombre}
• Color: ${color.nombre}
• Talla: ${talla}
• Corte: ${genero}
• Cantidad: ${cantidad}

Total: ${precioCOP(total)}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-start">
      {/* La prenda */}
      <div className="lg:sticky lg:top-28">
        <div
          className="relative aspect-square overflow-hidden"
          style={{ background: CREMA }}
        >
          <Image
            key={imagen ?? producto.imagenPorDefecto}
            src={imagen ?? producto.imagenPorDefecto}
            alt={`${producto.nombre}${hayFoto ? ` en ${color.nombre}` : ""}`}
            fill
            sizes="(min-width: 1024px) 42vw, 90vw"
            className="object-contain p-10 entrada"
            priority
          />
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="mono text-[10px] tracking-[0.16em] uppercase text-ink-3">
            {hayFoto
              ? color.nombre
              : `Foto de referencia · se entrega en ${color.nombre}`}
          </span>
          <span
            className="w-4 h-4 rounded-full shrink-0"
            style={{
              background: color.hex,
              boxShadow: color.claro
                ? "inset 0 0 0 1px rgba(0,0,0,0.18)"
                : undefined,
            }}
            aria-hidden
          />
        </div>
      </div>

      {/* La decisión */}
      <div className="flex flex-col gap-9">
        <Campo etiqueta="Prenda">
          <div className="flex flex-col">
            {PRODUCTOS.map((p) => {
              const activo = p.slug === productoSlug;
              return (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => setProductoSlug(p.slug)}
                  aria-pressed={activo}
                  className="group text-left py-4 border-b border-line-2 flex items-baseline justify-between gap-6 transition-colors duration-300"
                >
                  <span
                    className={`display text-2xl md:text-[1.75rem] leading-none transition-colors duration-300 ${
                      activo ? "text-ink" : "text-ink-3 group-hover:text-ink"
                    }`}
                  >
                    {p.nombre}
                  </span>
                  <span
                    className={`mono text-[11px] tracking-[0.14em] shrink-0 transition-colors duration-300 ${
                      activo ? "text-accent" : "text-ink-3"
                    }`}
                  >
                    {precioCOP(p.precio)}
                  </span>
                </button>
              );
            })}
          </div>
        </Campo>

        <Campo etiqueta="Color" nota={color.nombre}>
          <div className="flex flex-wrap gap-3">
            {COLORES.map((c) => {
              const activo = c.slug === colorSlug;
              return (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => setColorSlug(c.slug)}
                  title={c.nombre}
                  aria-label={c.nombre}
                  aria-pressed={activo}
                  className={`w-10 h-10 rounded-full transition-transform duration-300 hover:scale-105 ${
                    activo ? "ring-1 ring-offset-4 ring-ink" : ""
                  }`}
                  style={{
                    background: c.hex,
                    boxShadow: c.claro
                      ? "inset 0 0 0 1px rgba(0,0,0,0.16)"
                      : undefined,
                  }}
                />
              );
            })}
          </div>
        </Campo>

        <Campo etiqueta="Talla" nota="XS a XXL">
          <div className="flex flex-wrap gap-2">
            {TALLAS.map((t) => {
              const activo = t === talla;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTalla(t)}
                  aria-pressed={activo}
                  className={`mono text-[11px] tracking-[0.14em] w-14 h-11 border transition-colors duration-300 ${
                    activo
                      ? "border-ink bg-ink text-paper"
                      : "border-line text-ink-2 hover:border-ink"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </Campo>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-9">
          <Campo etiqueta="Corte">
            <div className="flex gap-2">
              {GENEROS.map((g) => {
                const activo = g === genero;
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGenero(g)}
                    aria-pressed={activo}
                    className={`mono text-[11px] tracking-[0.16em] uppercase px-6 h-11 border transition-colors duration-300 ${
                      activo
                        ? "border-ink bg-ink text-paper"
                        : "border-line text-ink-2 hover:border-ink"
                    }`}
                  >
                    {g}
                  </button>
                );
              })}
            </div>
          </Campo>

          <Campo etiqueta="Cantidad">
            <div className="inline-flex items-center border border-line h-11">
              <button
                type="button"
                onClick={() => setCantidad((n) => Math.max(1, n - 1))}
                aria-label="Quitar una unidad"
                className="w-11 h-full text-ink-2 hover:text-accent transition-colors text-lg"
              >
                −
              </button>
              <span className="mono text-sm w-12 text-center tabular-nums">
                {cantidad}
              </span>
              <button
                type="button"
                onClick={() => setCantidad((n) => Math.min(20, n + 1))}
                aria-label="Agregar una unidad"
                className="w-11 h-full text-ink-2 hover:text-accent transition-colors text-lg"
              >
                +
              </button>
            </div>
          </Campo>
        </div>

        <p className="text-[0.95rem] leading-relaxed text-ink-2 max-w-[48ch]">
          {producto.descripcion}
        </p>

        {/* El pedido */}
        <div className="border-t border-ink pt-7">
          <div className="flex items-baseline justify-between gap-6">
            <div>
              <p className="eyebrow">Total</p>
              <p className="display text-[clamp(2.25rem,6vw,3.5rem)] mt-2 leading-none">
                {precioCOP(total)}
              </p>
            </div>
            <p className="mono text-[10.5px] tracking-[0.14em] uppercase text-ink-3 text-right leading-[1.9]">
              {producto.nombre}
              <br />
              {color.nombre} · {talla} · {genero}
              <br />
              {cantidad} {cantidad === 1 ? "unidad" : "unidades"}
            </p>
          </div>

          <a
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 w-full flex items-center justify-center gap-3 mono text-[11px] tracking-[0.2em] uppercase bg-ink text-paper px-6 py-5 hover:bg-accent transition-colors duration-500"
          >
            Pedir por WhatsApp ↗
          </a>
          <p className="mono text-[10px] tracking-[0.14em] uppercase text-ink-3 text-center mt-4">
            El mensaje llega escrito con su selección
          </p>
        </div>
      </div>
    </div>
  );
}
