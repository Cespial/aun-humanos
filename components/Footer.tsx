import Link from "next/link";
import { PESTANAS } from "./enlaces";

export default function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16 py-14 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
          <div>
            <div className="display text-4xl md:text-5xl leading-[0.9]">
              Aún
              <br />
              humanos<span className="text-accent">.</span>
            </div>
            <p className="mono text-[11px] tracking-[0.22em] uppercase text-ink-3 mt-6">
              Movimiento filosófico · Medellín
            </p>
          </div>

          <nav className="flex flex-col gap-3">
            {PESTANAS.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="mono text-[11px] tracking-[0.22em] uppercase text-ink-3 hover:text-ink transition-colors duration-300"
              >
                {p.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-14 pt-6 border-t border-line-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="mono text-[10px] tracking-[0.18em] uppercase text-ink-3">
            © {new Date().getFullYear()} Aún Humanos
          </p>
          <p className="mono text-[10px] tracking-[0.18em] uppercase text-ink-3">
            contacto@aunhumanos.com
          </p>
        </div>
      </div>
    </footer>
  );
}
