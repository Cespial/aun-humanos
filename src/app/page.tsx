"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ───────────────────────── DATA ───────────────────────── */

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Somos", href: "#somos" },
  { label: "Triángulo Vital", href: "#triangulo" },
  { label: "Humanismo Digital", href: "#humanismo" },
  { label: "Servicios", href: "#servicios" },
  { label: "Contacto", href: "#contacto" },
];

const TEAM = [
  { name: "PhD Felipe Jaramillo V.", role: "Creador de Aún Humanos", tag: "FOUNDER" },
  { name: "Mg Olga Zapata A.", role: "Corazón Aún Humanos", tag: "SOUL" },
  { name: "PhD Sergio Molina P.", role: "Ni Un Día Sin Amor", tag: "LOVE" },
  { name: "PhD Santiago Jiménez L.", role: "Algoritmos Deshumanizantes", tag: "ETHICS" },
  { name: "MG Andrés Jaramillo V.", role: "La vacuidad creadora", tag: "CREATE" },
  { name: "PhD Orión Vargas V.", role: "Remagía", tag: "MAGIC" },
];

const PRINCIPLES = [
  "Ninguno de nuestros colaboradores está subordinado por una máquina o inteligencia artificial.",
  "Toda adopción de máquina o inteligencia artificial surte una socialización general con todos los colaboradores, y una rigurosa reflexión a través de un tribunal de ética.",
  "Las máquinas son entendidas como herramientas que utiliza el hombre para facilitar su trabajo; no como agentes que toman decisiones.",
  "Todos nuestros clientes siempre tienen la posibilidad de relacionarse con un ser Humano.",
  "Todo aquello realizado con máquinas está tácitamente declarado con una advertencia de No Humano.",
  "Una máquina o inteligencia artificial no tiene asiento en ningún cargo directivo.",
  "Todos los datos personales se rigen por políticas y procedimientos dispuestos por la ley.",
  "Ninguna máquina obrará por fuera de la ley.",
  "Ninguna máquina limita la intimidad y libertad de las personas.",
  "Se motiva la reflexión permanente acerca de cómo funcionan las máquinas.",
];

const SERVICES = [
  {
    title: "Talleres de Reflexión Profunda",
    desc: "Espacios de inmersión para reconectar con lo esencialmente humano a través del diálogo y la filosofía práctica.",
    icon: "◈",
  },
  {
    title: "Consultoría Empresarial",
    desc: "Acompañamiento estratégico para organizaciones que buscan integrar tecnología sin perder su esencia humana.",
    icon: "◇",
  },
  {
    title: "Coaching Personal y Ejecutivo",
    desc: "Procesos de transformación personal fundamentados en la reflexión filosófica y el autoconocimiento.",
    icon: "△",
  },
  {
    title: "Eventos y Conferencias",
    desc: "Encuentros que provocan conversaciones profundas sobre el futuro de la humanidad frente a la tecnología.",
    icon: "○",
  },
  {
    title: "Contenidos Educativos",
    desc: "Material filosófico y práctico para quienes buscan entender y actuar conscientemente en la era digital.",
    icon: "□",
  },
];

const SOCIALS = [
  { label: "Instagram", href: "#", symbol: "IG" },
  { label: "Facebook", href: "#", symbol: "FB" },
  { label: "X", href: "#", symbol: "X" },
  { label: "YouTube", href: "#", symbol: "YT" },
];

/* ──────────────────── INTERSECTION OBSERVER HOOK ──────────────────── */

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ──────────────────── COMPONENTS ──────────────────── */

function SectionHeader({ children }: { children: string }) {
  return (
    <h2 className="font-[family-name:var(--font-geist-mono)] text-sm tracking-[0.3em] uppercase text-[var(--gold)] mb-2">
      <span className="opacity-50">{">"} </span>
      {children}
      <span className="cursor-blink ml-1 text-[var(--gold)]">_</span>
    </h2>
  );
}

function TerminalDivider() {
  return (
    <div className="my-16 md:my-24 flex items-center gap-4 opacity-20 px-6 md:px-16 lg:px-24">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
      <span className="font-[family-name:var(--font-geist-mono)] text-[10px] text-[var(--gold)] tracking-[0.5em]">
        ◆◆◆
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
    </div>
  );
}

function AsciiFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <span className="absolute -top-1 -left-1 text-[var(--gold-dim)] font-[family-name:var(--font-geist-mono)] text-xs opacity-40">
        ┌
      </span>
      <span className="absolute -top-1 -right-1 text-[var(--gold-dim)] font-[family-name:var(--font-geist-mono)] text-xs opacity-40">
        ┐
      </span>
      <span className="absolute -bottom-1 -left-1 text-[var(--gold-dim)] font-[family-name:var(--font-geist-mono)] text-xs opacity-40">
        └
      </span>
      <span className="absolute -bottom-1 -right-1 text-[var(--gold-dim)] font-[family-name:var(--font-geist-mono)] text-xs opacity-40">
        ┘
      </span>
      <div className="absolute top-0 left-3 right-3 h-px bg-[var(--gold-dim)] opacity-15" />
      <div className="absolute bottom-0 left-3 right-3 h-px bg-[var(--gold-dim)] opacity-15" />
      <div className="absolute left-0 top-3 bottom-3 w-px bg-[var(--gold-dim)] opacity-15" />
      <div className="absolute right-0 top-3 bottom-3 w-px bg-[var(--gold-dim)] opacity-15" />
      {children}
    </div>
  );
}

/* ──────────────────── NAVBAR ──────────────────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#050505]/90 backdrop-blur-md border-b border-[var(--gold-dim)]/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
        <a
          href="#inicio"
          className="font-[family-name:var(--font-geist-mono)] text-sm md:text-base tracking-[0.2em] text-[var(--gold)] hover:text-[var(--foreground)] transition-colors text-glow"
        >
          AÚN_HUMANOS
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-[family-name:var(--font-geist-mono)] text-[11px] tracking-[0.15em] uppercase text-[var(--gray-light)] hover:text-[var(--gold)] transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-[5px] group"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-px bg-[var(--gold)] transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[6px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-[var(--gold)] transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-[var(--gold)] transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[6px]" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-8 pt-2 bg-[#050505]/95 backdrop-blur-lg border-t border-[var(--gold-dim)]/10 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-[family-name:var(--font-geist-mono)] text-sm tracking-[0.15em] uppercase text-[var(--gray-light)] hover:text-[var(--gold)] transition-colors"
            >
              <span className="text-[var(--gold-dim)] mr-2">{">"}</span>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ──────────────────── HERO ──────────────────── */

function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="inicio" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ filter: "brightness(0.55) contrast(1.15) grayscale(0.2)" }}
        src="/hero-video.mp4"
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.05) 30%, rgba(5,5,5,0.4) 65%, rgba(5,5,5,1) 100%)",
        }}
      />

      <div className="relative z-[2] h-full flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-16 lg:px-24">
        <div
          className={`font-[family-name:var(--font-geist-mono)] text-[10px] md:text-xs tracking-[0.4em] text-[var(--gold-dim)] mb-6 transition-all duration-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="text-[var(--phosphor)] mr-2">●</span>
          SISTEMA ACTIVO — TRANSMISIÓN EN CURSO
        </div>

        <h1
          className={`font-[family-name:var(--font-serif)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-[var(--gold)] leading-[0.9] tracking-tight mb-8 text-glow transition-all duration-1000 delay-200 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          AÚN
          <br />
          <span className="text-[var(--foreground)]">HUMANOS</span>
        </h1>

        <p
          className={`font-[family-name:var(--font-geist-mono)] text-xs md:text-sm leading-relaxed text-[var(--gray-light)] max-w-2xl transition-all duration-1000 delay-500 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Un movimiento filosófico y práctico que emerge como respuesta a los
          desafíos contemporáneos derivados de la acelerada evolución
          tecnológica y la creciente complejidad de la sociedad moderna.
          <span className="cursor-blink ml-1 text-[var(--gold)]">▊</span>
        </p>

        <div
          className={`mt-12 flex items-center gap-3 transition-all duration-1000 delay-700 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-px h-12 bg-gradient-to-b from-[var(--gold)] to-transparent" />
          <span className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.3em] text-[var(--gold-dim)] uppercase">
            Scroll
          </span>
        </div>
      </div>

      <div className="absolute top-24 right-6 md:right-16 font-[family-name:var(--font-geist-mono)] text-[10px] text-[var(--gold-dim)]/30 leading-tight text-right z-[2]">
        <div>LAT 6.2518</div>
        <div>LON -75.5636</div>
        <div className="mt-1">MEDELLÍN.CO</div>
      </div>
    </section>
  );
}

/* ──────────────────── SOMOS ──────────────────── */

function Somos() {
  const reveal = useReveal();
  const gridReveal = useReveal(0.1);

  return (
    <section id="somos" className="relative px-6 md:px-16 lg:px-24 py-24 md:py-36 noise-bg">
      <div className="max-w-6xl mx-auto">
        <div
          ref={reveal.ref}
          className={`transition-all duration-1000 ${
            reveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionHeader>SOMOS</SectionHeader>

          <div className="mt-12 grid md:grid-cols-2 gap-12 md:gap-20">
            <div>
              <h3 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl lg:text-5xl text-[var(--foreground)] leading-tight mb-8">
                Reflexión profunda.
                <br />
                <span className="text-[var(--gold)]">Acción consciente.</span>
              </h3>
              <div className="w-16 h-px bg-[var(--gold)] mb-8 opacity-40" />
            </div>

            <div className="flex flex-col justify-center">
              <p className="font-[family-name:var(--font-geist-mono)] text-sm leading-[1.9] text-[var(--gray-light)]">
                Fundado por el filósofo y pensador{" "}
                <span className="text-[var(--foreground)]">Felipe Jaramillo Vélez</span>,
                Aún Humanos se concibe como una plataforma destinada a fomentar
                la reflexión profunda y la acción consciente en torno a lo que
                significa ser humano en una era de tecnologías que cambian
                exponencialmente.
              </p>
              <p className="font-[family-name:var(--font-geist-mono)] text-sm leading-[1.9] text-[var(--gray-light)] mt-6">
                Somos un colectivo de pensadores, académicos y profesionales
                unidos por una convicción:{" "}
                <span className="text-[var(--gold)]">
                  la tecnología debe estar al servicio de lo humano, no al revés.
                </span>
              </p>
            </div>
          </div>
        </div>

        <div
          ref={gridReveal.ref}
          className={`mt-20 md:mt-28 transition-all duration-1000 ${
            gridReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.3em] text-[var(--gold-dim)] mb-8 uppercase">
            // Equipo fundador
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEAM.map((member, i) => (
              <AsciiFrame key={member.name}>
                <div className="p-6 md:p-8 group hover:bg-[var(--gold)]/[0.03] transition-colors duration-500">
                  <div className="flex items-start justify-between mb-4">
                    <span className="font-[family-name:var(--font-geist-mono)] text-[9px] tracking-[0.3em] text-[var(--gold-dim)] bg-[var(--gold)]/[0.06] px-2 py-1">
                      {member.tag}
                    </span>
                    <span className="font-[family-name:var(--font-geist-mono)] text-[10px] text-[var(--gold-dim)]/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h4 className="font-[family-name:var(--font-serif)] text-lg text-[var(--foreground)] mb-2 group-hover:text-[var(--gold)] transition-colors duration-300">
                    {member.name}
                  </h4>
                  <p className="font-[family-name:var(--font-geist-mono)] text-xs text-[var(--gray-light)]">
                    {member.role}
                  </p>
                </div>
              </AsciiFrame>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────── TRIÁNGULO VITAL ──────────────────── */

function TrianguloVital() {
  const reveal = useReveal();

  return (
    <section id="triangulo" className="relative px-6 md:px-16 lg:px-24 py-24 md:py-36">
      <div className="max-w-6xl mx-auto">
        <div
          ref={reveal.ref}
          className={`transition-all duration-1000 ${
            reveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionHeader>TRIÁNGULO_VITAL</SectionHeader>

          <div className="mt-12 grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="flex justify-center">
              <div className="relative w-full max-w-md aspect-square">
                <svg viewBox="0 0 400 380" className="w-full h-full" fill="none">
                  <path
                    d="M200 40 L370 340 L30 340 Z"
                    stroke="var(--gold)"
                    strokeWidth="1"
                    opacity="0.4"
                    fill="none"
                  />
                  <path
                    d="M200 40 L370 340 L30 340 Z"
                    stroke="var(--gold)"
                    strokeWidth="0.5"
                    opacity="0.15"
                    fill="var(--gold)"
                    fillOpacity="0.02"
                  />

                  <line x1="200" y1="40" x2="200" y2="220" stroke="var(--gold)" strokeWidth="0.5" opacity="0.2" strokeDasharray="4 4" />
                  <line x1="370" y1="340" x2="200" y2="220" stroke="var(--gold)" strokeWidth="0.5" opacity="0.2" strokeDasharray="4 4" />
                  <line x1="30" y1="340" x2="200" y2="220" stroke="var(--gold)" strokeWidth="0.5" opacity="0.2" strokeDasharray="4 4" />

                  <circle cx="200" cy="220" r="28" stroke="var(--gold)" strokeWidth="0.8" opacity="0.3" fill="var(--gold)" fillOpacity="0.05" />
                  <circle cx="200" cy="220" r="4" fill="var(--gold)" opacity="0.6" />

                  <circle cx="200" cy="40" r="5" fill="var(--gold)" opacity="0.7" />
                  <circle cx="370" cy="340" r="5" fill="var(--gold)" opacity="0.7" />
                  <circle cx="30" cy="340" r="5" fill="var(--gold)" opacity="0.7" />

                  <text x="200" y="20" textAnchor="middle" fill="var(--gold)" fontSize="12" fontFamily="monospace" letterSpacing="0.2em">
                    YO
                  </text>
                  <text x="395" y="365" textAnchor="end" fill="var(--gold)" fontSize="12" fontFamily="monospace" letterSpacing="0.2em">
                    LAS COSAS
                  </text>
                  <text x="5" y="365" textAnchor="start" fill="var(--gold)" fontSize="12" fontFamily="monospace" letterSpacing="0.2em">
                    LOS OTROS
                  </text>

                  <text x="200" y="275" textAnchor="middle" fill="var(--foreground)" fontSize="10" fontFamily="monospace" letterSpacing="0.25em" opacity="0.7">
                    ESPIRITUAL
                  </text>
                </svg>
              </div>
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl text-[var(--foreground)] leading-tight mb-8">
                Equilibrio y armonía
                <br />
                <span className="text-[var(--gold)]">del ser Humano.</span>
              </h3>

              <p className="font-[family-name:var(--font-geist-mono)] text-sm leading-[1.9] text-[var(--gray-light)] mb-8">
                Triángulo Vital es una filosofía de vida que busca el equilibrio
                y la armonía del ser Humano a través de una reconfiguración
                permanente que permita hacer consciente la relación con el yo,
                con los otros y con las cosas — y transversal a estos tres
                elementos, la relación fundamental con lo espiritual.
              </p>

              <AsciiFrame>
                <div className="p-6">
                  <div className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.3em] text-[var(--gold)] mb-3 uppercase">
                    // Retiro inmersión
                  </div>
                  <p className="font-[family-name:var(--font-geist-mono)] text-xs leading-[1.8] text-[var(--gray-light)]">
                    Triángulo Vital es un retiro de inmersión Humana, un día
                    completo de desconexión. Su desarrollo apropia una
                    metodología que parte de la reflexión y la casuística para
                    llegar a un reconocerse, reafirmando con ello lo que está
                    bien, pero además potenciando aquello que requiere de
                    nuestra atención.
                  </p>
                </div>
              </AsciiFrame>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────── HUMANISMO DIGITAL ──────────────────── */

function HumanismoDigital() {
  const reveal = useReveal();
  const listReveal = useReveal(0.05);

  return (
    <section id="humanismo" className="relative px-6 md:px-16 lg:px-24 py-24 md:py-36 noise-bg">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden xl:block">
        <div
          className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.5em] text-[var(--gold-dim)]/15 uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          HUMANISMO · DIGITAL · ÉTICO · CONSCIENTE
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <div
          ref={reveal.ref}
          className={`transition-all duration-1000 ${
            reveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionHeader>HUMANISMO_DIGITAL</SectionHeader>

          <div className="mt-12 mb-16 text-center">
            <h3 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl lg:text-6xl text-[var(--foreground)] mb-4">
              Entender{" "}
              <span className="text-[var(--gold)] text-glow">para actuar.</span>
            </h3>
            <p className="font-[family-name:var(--font-geist-mono)] text-xs tracking-[0.2em] text-[var(--gray-light)] mt-6 uppercase">
              Ideario Ético hacia un Humanismo Digital
            </p>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--gold-dim)] to-transparent opacity-20 mb-12" />

          <p className="font-[family-name:var(--font-geist-mono)] text-sm leading-[1.9] text-[var(--gray-light)] mb-16 max-w-3xl mx-auto text-center">
            Aceptar que la tecnología está ya entre nosotros y que viene
            transformando nuestra vida, no quiere decir que no se deba tener una
            reflexión permanente frente a los riesgos de deshumanización.
          </p>
        </div>

        <div
          ref={listReveal.ref}
          className={`transition-all duration-1000 ${
            listReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="space-y-0">
            {PRINCIPLES.map((principle, i) => (
              <div
                key={i}
                className="group flex gap-4 md:gap-6 py-5 md:py-6 border-b border-[var(--gold-dim)]/10 hover:bg-[var(--gold)]/[0.02] hover:pl-2 transition-all duration-300"
              >
                <span className="font-[family-name:var(--font-geist-mono)] text-sm md:text-base text-[var(--gold)] font-bold min-w-[2.5rem] text-right tabular-nums text-glow">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-[family-name:var(--font-geist-mono)] text-xs md:text-sm leading-[1.8] text-[var(--gray-light)] group-hover:text-[var(--foreground)] transition-colors duration-300">
                  {principle}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <AsciiFrame className="inline-block">
              <div className="px-8 py-5 text-center">
                <div className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.4em] text-[var(--gold)] uppercase">
                  Sello de Humanismo Digital
                </div>
                <div className="font-[family-name:var(--font-geist-mono)] text-[9px] tracking-[0.2em] text-[var(--gray)] mt-2">
                  Para empresas con conciencia tecnológica
                </div>
              </div>
            </AsciiFrame>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────── SERVICIOS ──────────────────── */

function Servicios() {
  const reveal = useReveal();

  return (
    <section id="servicios" className="relative px-6 md:px-16 lg:px-24 py-24 md:py-36">
      <div className="max-w-6xl mx-auto">
        <div
          ref={reveal.ref}
          className={`transition-all duration-1000 ${
            reveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionHeader>SERVICIOS</SectionHeader>

          <div className="mt-12 grid md:grid-cols-2 gap-12 md:gap-20 items-start mb-16">
            <h3 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl lg:text-5xl text-[var(--foreground)] leading-tight">
              Herramientas para
              <br />
              <span className="text-[var(--gold)]">seguir siendo humanos.</span>
            </h3>
            <p className="font-[family-name:var(--font-geist-mono)] text-sm leading-[1.9] text-[var(--gray-light)] md:mt-3">
              Ofrecemos espacios y metodologías para que personas y
              organizaciones enfrenten los retos de la era tecnológica sin
              perder su esencia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((service, i) => (
              <div key={service.title} className="group relative">
                <AsciiFrame>
                  <div className="p-6 md:p-8 h-full hover:bg-[var(--gold)]/[0.03] transition-all duration-500">
                    <div className="flex items-start justify-between mb-6">
                      <span className="text-2xl text-[var(--gold)] opacity-60 group-hover:opacity-100 transition-opacity">
                        {service.icon}
                      </span>
                      <span className="font-[family-name:var(--font-geist-mono)] text-[10px] text-[var(--gold-dim)]/40">
                        SRV.{String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h4 className="font-[family-name:var(--font-serif)] text-lg text-[var(--foreground)] mb-4 group-hover:text-[var(--gold)] transition-colors duration-300">
                      {service.title}
                    </h4>

                    <p className="font-[family-name:var(--font-geist-mono)] text-xs leading-[1.8] text-[var(--gray-light)]">
                      {service.desc}
                    </p>

                    <div className="mt-6 font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.2em] text-[var(--gold-dim)] group-hover:text-[var(--gold)] transition-colors uppercase">
                      {">"} Explorar
                      <span className="cursor-blink ml-1">_</span>
                    </div>
                  </div>
                </AsciiFrame>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────── CONTACTO ──────────────────── */

function Contacto() {
  const reveal = useReveal();
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
  }, []);

  return (
    <section id="contacto" className="relative px-6 md:px-16 lg:px-24 py-24 md:py-36 noise-bg">
      <div className="max-w-4xl mx-auto">
        <div
          ref={reveal.ref}
          className={`transition-all duration-1000 ${
            reveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionHeader>CONTACTO</SectionHeader>

          <div className="mt-12 grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl text-[var(--foreground)] mb-4">
                Iniciemos una
                <br />
                <span className="text-[var(--gold)]">conversación.</span>
              </h3>

              <p className="font-[family-name:var(--font-geist-mono)] text-xs text-[var(--gray-light)] leading-[1.8] mb-10">
                Escribe tu mensaje y conectaremos contigo para explorar cómo
                podemos acompañarte.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { id: "nombre", label: "nombre", type: "text" },
                  { id: "email", label: "email", type: "email" },
                ].map((field) => (
                  <div key={field.id} className="relative">
                    <div className="flex items-center gap-2 font-[family-name:var(--font-geist-mono)] text-xs text-[var(--gold-dim)] mb-2">
                      <span className={`transition-colors ${focusedField === field.id ? "text-[var(--gold)]" : ""}`}>
                        {">"}
                      </span>
                      <span>{field.label}:</span>
                    </div>
                    <input
                      type={field.type}
                      id={field.id}
                      onFocus={() => setFocusedField(field.id)}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-transparent border-b border-[var(--gold-dim)]/20 focus:border-[var(--gold)] text-[var(--foreground)] font-[family-name:var(--font-geist-mono)] text-sm py-3 outline-none transition-colors placeholder:text-[var(--gray)]/30"
                      placeholder={`Ingresa tu ${field.label}...`}
                    />
                  </div>
                ))}

                <div className="relative">
                  <div className="flex items-center gap-2 font-[family-name:var(--font-geist-mono)] text-xs text-[var(--gold-dim)] mb-2">
                    <span className={`transition-colors ${focusedField === "mensaje" ? "text-[var(--gold)]" : ""}`}>
                      {">"}
                    </span>
                    <span>mensaje:</span>
                  </div>
                  <textarea
                    id="mensaje"
                    rows={4}
                    onFocus={() => setFocusedField("mensaje")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-transparent border-b border-[var(--gold-dim)]/20 focus:border-[var(--gold)] text-[var(--foreground)] font-[family-name:var(--font-geist-mono)] text-sm py-3 outline-none transition-colors resize-none placeholder:text-[var(--gray)]/30"
                    placeholder="Escribe tu mensaje..."
                  />
                </div>

                <button
                  type="submit"
                  className="group mt-4 font-[family-name:var(--font-geist-mono)] text-xs tracking-[0.2em] uppercase border border-[var(--gold-dim)]/30 hover:border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[#050505] px-8 py-4 transition-all duration-500"
                >
                  <span className="mr-2 group-hover:mr-3 transition-all">{">"}</span>
                  ENVIAR_MENSAJE
                  <span className="cursor-blink ml-1">_</span>
                </button>
              </form>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <div className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.3em] text-[var(--gold-dim)] mb-6 uppercase">
                  // Redes
                </div>

                <div className="space-y-3">
                  {SOCIALS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="group flex items-center gap-4 py-3 border-b border-[var(--gold-dim)]/10 hover:border-[var(--gold)]/20 transition-colors"
                    >
                      <span className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.3em] text-[var(--gold-dim)] w-8">
                        {social.symbol}
                      </span>
                      <span className="font-[family-name:var(--font-geist-mono)] text-sm text-[var(--gray-light)] group-hover:text-[var(--gold)] transition-colors">
                        {social.label}
                      </span>
                      <span className="ml-auto font-[family-name:var(--font-geist-mono)] text-xs text-[var(--gold-dim)] opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-12 md:mt-0">
                <pre className="font-[family-name:var(--font-geist-mono)] text-[8px] md:text-[10px] text-[var(--gold-dim)]/20 leading-tight select-none">
{`
  ╔══════════════════════╗
  ║                      ║
  ║   AÚN   HUMANOS     ║
  ║                      ║
  ║   Movimiento         ║
  ║   Filosófico         ║
  ║   & Práctico         ║
  ║                      ║
  ║   ◈ Medellín, CO     ║
  ║                      ║
  ╚══════════════════════╝
`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────── FOOTER ──────────────────── */

function Footer() {
  return (
    <footer className="px-6 md:px-16 lg:px-24 py-8 border-t border-[var(--gold-dim)]/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.2em] text-[var(--gray)]/60">
          © Todos los derechos reservados — Aún Humanos
          <span className="cursor-blink ml-1 text-[var(--gold-dim)]">_</span>
        </div>

        <div className="flex items-center gap-6">
          {NAV_LINKS.slice(1, 5).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-[family-name:var(--font-geist-mono)] text-[9px] tracking-[0.15em] uppercase text-[var(--gray)]/40 hover:text-[var(--gold)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ──────────────────── MAIN PAGE ──────────────────── */

export default function Home() {
  return (
    <main className="crt-flicker">
      <Navbar />
      <Hero />
      <TerminalDivider />
      <Somos />
      <TerminalDivider />
      <TrianguloVital />
      <TerminalDivider />
      <HumanismoDigital />
      <TerminalDivider />
      <Servicios />
      <TerminalDivider />
      <Contacto />
      <Footer />
    </main>
  );
}
