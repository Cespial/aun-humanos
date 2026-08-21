"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PESTANAS } from "./enlaces";

export default function Nav() {
  const pathname = usePathname();
  const [scrolleado, setScrolleado] = useState(false);
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    const alScroll = () => setScrolleado(window.scrollY > 8);
    alScroll();
    window.addEventListener("scroll", alScroll, { passive: true });
    return () => window.removeEventListener("scroll", alScroll);
  }, []);

  // El menú móvil no debe dejar el fondo desplazándose detrás.
  useEffect(() => {
    document.body.style.overflow = abierto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [abierto]);

  useEffect(() => {
    setAbierto(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-paper/90 backdrop-blur-md transition-[border-color] duration-500 border-b ${
          scrolleado ? "border-line" : "border-transparent"
        }`}
      >
        <nav className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16 h-16 md:h-20 flex items-center justify-between">
          <Link
            href="/"
            className="mono text-[11px] md:text-xs tracking-[0.28em] uppercase hover:text-accent transition-colors duration-300"
            aria-label="Aún Humanos — inicio"
          >
            Aún Humanos
          </Link>

          <div className="hidden md:flex items-center gap-9">
            {PESTANAS.map((p) => {
              const activa = pathname.startsWith(p.href);
              return (
                <Link
                  key={p.href}
                  href={p.href}
                  className={`mono text-[11px] tracking-[0.22em] uppercase transition-colors duration-300 ${
                    activa ? "text-ink" : "text-ink-3 hover:text-ink"
                  }`}
                >
                  {p.label}
                  <span
                    className={`block h-px mt-1.5 bg-accent origin-left transition-transform duration-500 ${
                      activa ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            className="md:hidden mono text-[11px] tracking-[0.22em] uppercase text-ink-2"
            aria-expanded={abierto}
            aria-controls="menu-movil"
          >
            {abierto ? "Cerrar" : "Menú"}
          </button>
        </nav>
      </header>

      {abierto && (
        <div
          id="menu-movil"
          className="md:hidden fixed inset-0 z-30 bg-paper pt-24 px-6 entrada"
        >
          <ul className="flex flex-col">
            {PESTANAS.map((p) => (
              <li key={p.href} className="border-t border-line">
                <Link
                  href={p.href}
                  className="display text-5xl py-6 block hover:text-accent transition-colors"
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
