"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ═══════════════════════════ DATA ═══════════════════════════ */

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Somos", href: "#somos" },
  { label: "Triángulo Vital", href: "#triangulo" },
  { label: "Humanismo Digital", href: "#humanismo" },
  { label: "Servicios", href: "#servicios" },
  { label: "Contacto", href: "#contacto" },
];

const TEAM = [
  { name: "PhD Felipe Jaramillo V.", role: "Creador de Aún Humanos", tag: "FOUNDER", initials: "FJ" },
  { name: "Mg Olga Zapata A.", role: "Corazón Aún Humanos", tag: "SOUL", initials: "OZ" },
  { name: "PhD Sergio Molina P.", role: "Ni Un Día Sin Amor", tag: "LOVE", initials: "SM" },
  { name: "PhD Santiago Jiménez L.", role: "Algoritmos Deshumanizantes", tag: "ETHICS", initials: "SJ" },
  { name: "MG Andrés Jaramillo V.", role: "La vacuidad creadora", tag: "CREATE", initials: "AJ" },
  { name: "PhD Orión Vargas V.", role: "Remagía", tag: "MAGIC", initials: "OV" },
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
  { title: "Talleres de Reflexión Profunda", desc: "Espacios de inmersión para reconectar con lo esencialmente humano a través del diálogo y la filosofía práctica.", id: "workshop" },
  { title: "Consultoría Empresarial", desc: "Acompañamiento estratégico para organizaciones que buscan integrar tecnología sin perder su esencia humana.", id: "consulting" },
  { title: "Coaching Personal y Ejecutivo", desc: "Procesos de transformación personal fundamentados en la reflexión filosófica y el autoconocimiento.", id: "coaching" },
  { title: "Eventos y Conferencias", desc: "Encuentros que provocan conversaciones profundas sobre el futuro de la humanidad frente a la tecnología.", id: "events" },
  { title: "Contenidos Educativos", desc: "Material filosófico y práctico para quienes buscan entender y actuar conscientemente en la era digital.", id: "education" },
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com", symbol: "IG" },
  { label: "Facebook", href: "https://facebook.com", symbol: "FB" },
  { label: "X", href: "https://x.com", symbol: "X" },
  { label: "YouTube", href: "https://youtube.com", symbol: "YT" },
];

/* ═══════════════════════ SVG ICONS ═══════════════════════ */

function ServiceIcon({ type, className = "" }: { type: string; className?: string }) {
  const c = "var(--gold)";
  const shared = `w-10 h-10 ${className}` as const;

  switch (type) {
    case "workshop":
      return (
        <svg viewBox="0 0 40 40" fill="none" className={shared} aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke={c} strokeWidth="0.8" opacity="0.3" />
          <circle cx="20" cy="20" r="12" stroke={c} strokeWidth="0.5" opacity="0.2" strokeDasharray="3 3" />
          <path d="M14 20h12M20 14v12" stroke={c} strokeWidth="1.2" opacity="0.8" />
          <circle cx="20" cy="20" r="3" fill={c} opacity="0.15" />
          <circle cx="20" cy="20" r="1.5" fill={c} opacity="0.6" />
        </svg>
      );
    case "consulting":
      return (
        <svg viewBox="0 0 40 40" fill="none" className={shared} aria-hidden="true">
          <rect x="6" y="6" width="28" height="28" rx="2" stroke={c} strokeWidth="0.8" opacity="0.3" />
          <line x1="6" y1="14" x2="34" y2="14" stroke={c} strokeWidth="0.5" opacity="0.2" />
          <rect x="10" y="18" width="8" height="4" rx="1" stroke={c} strokeWidth="0.8" opacity="0.5" />
          <rect x="22" y="18" width="8" height="4" rx="1" stroke={c} strokeWidth="0.8" opacity="0.5" />
          <rect x="10" y="26" width="20" height="4" rx="1" stroke={c} strokeWidth="0.8" opacity="0.5" />
          <circle cx="9" cy="10" r="1.5" fill={c} opacity="0.4" />
          <circle cx="14" cy="10" r="1.5" fill={c} opacity="0.4" />
        </svg>
      );
    case "coaching":
      return (
        <svg viewBox="0 0 40 40" fill="none" className={shared} aria-hidden="true">
          <path d="M20 6L34 34H6L20 6Z" stroke={c} strokeWidth="0.8" opacity="0.3" />
          <path d="M20 14L28 30H12L20 14Z" stroke={c} strokeWidth="0.5" opacity="0.2" strokeDasharray="2 2" />
          <circle cx="20" cy="22" r="3" fill={c} opacity="0.1" stroke={c} strokeWidth="0.5" />
          <circle cx="20" cy="22" r="1" fill={c} opacity="0.7" />
        </svg>
      );
    case "events":
      return (
        <svg viewBox="0 0 40 40" fill="none" className={shared} aria-hidden="true">
          <circle cx="20" cy="20" r="16" stroke={c} strokeWidth="0.8" opacity="0.3" />
          <circle cx="20" cy="20" r="10" stroke={c} strokeWidth="0.5" opacity="0.15" />
          <circle cx="20" cy="20" r="4" stroke={c} strokeWidth="0.5" opacity="0.2" />
          {[0, 60, 120, 180, 240, 300].map((angle) => {
            const r = 16;
            const x = 20 + r * Math.cos((angle * Math.PI) / 180);
            const y = 20 + r * Math.sin((angle * Math.PI) / 180);
            return <circle key={angle} cx={x} cy={y} r="1.5" fill={c} opacity="0.5" />;
          })}
          <circle cx="20" cy="20" r="2" fill={c} opacity="0.6" />
        </svg>
      );
    case "education":
      return (
        <svg viewBox="0 0 40 40" fill="none" className={shared} aria-hidden="true">
          <rect x="8" y="4" width="24" height="32" rx="2" stroke={c} strokeWidth="0.8" opacity="0.3" />
          <line x1="14" y1="12" x2="28" y2="12" stroke={c} strokeWidth="0.8" opacity="0.4" />
          <line x1="14" y1="17" x2="26" y2="17" stroke={c} strokeWidth="0.5" opacity="0.25" />
          <line x1="14" y1="22" x2="24" y2="22" stroke={c} strokeWidth="0.5" opacity="0.25" />
          <line x1="14" y1="27" x2="22" y2="27" stroke={c} strokeWidth="0.5" opacity="0.25" />
          <rect x="8" y="4" width="4" height="32" rx="1" fill={c} opacity="0.06" />
        </svg>
      );
    default:
      return null;
  }
}

function SealSVG() {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="w-40 h-40 md:w-48 md:h-48 svg-glow" role="img" aria-label="Sello de Humanismo Digital">
      <circle cx="100" cy="100" r="90" stroke="var(--accent)" strokeWidth="0.5" opacity="0.2" />
      <circle cx="100" cy="100" r="80" stroke="var(--accent)" strokeWidth="1" opacity="0.35" />
      <circle cx="100" cy="100" r="70" stroke="var(--accent)" strokeWidth="0.3" opacity="0.15" strokeDasharray="4 6" />
      {/* Outer notches */}
      {Array.from({ length: 36 }).map((_, i) => {
        const angle = (i * 10 * Math.PI) / 180;
        const x1 = 100 + 82 * Math.cos(angle);
        const y1 = 100 + 82 * Math.sin(angle);
        const x2 = 100 + 88 * Math.cos(angle);
        const y2 = 100 + 88 * Math.sin(angle);
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--accent)" strokeWidth="0.5" opacity="0.25" />
        );
      })}
      {/* Inner diamond */}
      <path d="M100 55 L135 100 L100 145 L65 100 Z" stroke="var(--accent)" strokeWidth="0.8" opacity="0.3" fill="var(--accent)" fillOpacity="0.03" />
      {/* Center H */}
      <text x="100" y="95" textAnchor="middle" fill="var(--accent)" fontSize="22" fontFamily="serif" opacity="0.7" dominantBaseline="middle">
        H
      </text>
      {/* Circular text top */}
      <defs>
        <path id="topArc" d="M30,100 a70,70 0 0,1 140,0" />
        <path id="bottomArc" d="M30,100 a70,70 0 0,0 140,0" />
      </defs>
      <text fill="var(--accent)" fontSize="7" fontFamily="monospace" letterSpacing="0.3em" opacity="0.5">
        <textPath href="#topArc" startOffset="50%" textAnchor="middle">
          SELLO DE HUMANISMO
        </textPath>
      </text>
      <text fill="var(--accent)" fontSize="7" fontFamily="monospace" letterSpacing="0.3em" opacity="0.5">
        <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
          DIGITAL CERTIFICADO
        </textPath>
      </text>
      {/* 4 corner dots */}
      <circle cx="100" cy="55" r="2" fill="var(--accent)" opacity="0.5" />
      <circle cx="135" cy="100" r="2" fill="var(--accent)" opacity="0.5" />
      <circle cx="100" cy="145" r="2" fill="var(--accent)" opacity="0.5" />
      <circle cx="65" cy="100" r="2" fill="var(--accent)" opacity="0.5" />
    </svg>
  );
}

function ScrollChevron() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 animate-scroll-bounce" aria-hidden="true">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BrandMark() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-24 h-24 md:w-32 md:h-32 opacity-[0.12]" aria-hidden="true">
      <circle cx="60" cy="60" r="55" stroke="var(--accent)" strokeWidth="0.5" />
      <circle cx="60" cy="60" r="45" stroke="var(--accent)" strokeWidth="0.3" strokeDasharray="3 5" />
      <text x="60" y="55" textAnchor="middle" fill="var(--accent)" fontSize="14" fontFamily="monospace" letterSpacing="0.15em" dominantBaseline="middle">
        AÚN
      </text>
      <text x="60" y="72" textAnchor="middle" fill="var(--accent)" fontSize="10" fontFamily="monospace" letterSpacing="0.25em" dominantBaseline="middle">
        HUMANOS
      </text>
    </svg>
  );
}

/* ═══════════════════════ HOOKS ═══════════════════════ */

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

function useActiveSection() {
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return active;
}

/* ═══════════════════ SHARED COMPONENTS ═══════════════════ */

function SectionHeader({ children }: { children: string }) {
  return (
    <h2 className="font-[family-name:var(--font-geist-mono)] text-sm tracking-[0.3em] uppercase text-[var(--accent)] mb-2">
      <span className="opacity-50">{">"} </span>
      {children}
      <span className="cursor-blink ml-1 text-[var(--accent)]">_</span>
    </h2>
  );
}

function TerminalDivider({ variant = 0 }: { variant?: number }) {
  const symbols = ["◆ ◆ ◆", "— · —", "═══", "▸ ▸ ▸", "◇ ◈ ◇"];
  return (
    <div className="my-16 md:my-24 flex items-center gap-4 opacity-20 px-6 md:px-16 lg:px-24">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      <span className="font-[family-name:var(--font-geist-mono)] text-[10px] text-[var(--accent)] tracking-[0.5em]">
        {symbols[variant % symbols.length]}
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
    </div>
  );
}

function AsciiFrame({ children, className = "", highlight = false }: { children: React.ReactNode; className?: string; highlight?: boolean }) {
  return (
    <div className={`relative ${className}`}>
      <span className={`absolute -top-1 -left-1 font-[family-name:var(--font-geist-mono)] text-xs ${highlight ? "text-[var(--accent)] opacity-60" : "text-[var(--gray)] opacity-40"}`}>┌</span>
      <span className={`absolute -top-1 -right-1 font-[family-name:var(--font-geist-mono)] text-xs ${highlight ? "text-[var(--accent)] opacity-60" : "text-[var(--gray)] opacity-40"}`}>┐</span>
      <span className={`absolute -bottom-1 -left-1 font-[family-name:var(--font-geist-mono)] text-xs ${highlight ? "text-[var(--accent)] opacity-60" : "text-[var(--gray)] opacity-40"}`}>└</span>
      <span className={`absolute -bottom-1 -right-1 font-[family-name:var(--font-geist-mono)] text-xs ${highlight ? "text-[var(--accent)] opacity-60" : "text-[var(--gray)] opacity-40"}`}>┘</span>
      <div className={`absolute top-0 left-3 right-3 h-px ${highlight ? "bg-[var(--accent)] opacity-30" : "bg-[var(--border)] opacity-15"}`} />
      <div className={`absolute bottom-0 left-3 right-3 h-px ${highlight ? "bg-[var(--accent)] opacity-30" : "bg-[var(--border)] opacity-15"}`} />
      <div className={`absolute left-0 top-3 bottom-3 w-px ${highlight ? "bg-[var(--accent)] opacity-30" : "bg-[var(--border)] opacity-15"}`} />
      <div className={`absolute right-0 top-3 bottom-3 w-px ${highlight ? "bg-[var(--accent)] opacity-30" : "bg-[var(--border)] opacity-15"}`} />
      {children}
    </div>
  );
}

function MemberAvatar({ initials, isFounder }: { initials: string; isFounder: boolean }) {
  return (
    <svg viewBox="0 0 56 56" fill="none" className="w-14 h-14 mb-4" aria-hidden="true">
      {isFounder ? (
        <>
          <circle cx="28" cy="28" r="26" stroke="var(--accent)" strokeWidth="1" opacity="0.4" />
          <circle cx="28" cy="28" r="22" stroke="var(--accent)" strokeWidth="0.5" opacity="0.2" strokeDasharray="3 3" />
          <circle cx="28" cy="28" r="18" fill="var(--accent)" fillOpacity="0.08" />
        </>
      ) : (
        <>
          <circle cx="28" cy="28" r="26" stroke="var(--gray)" strokeWidth="0.6" opacity="0.25" />
          <circle cx="28" cy="28" r="18" fill="var(--accent)" fillOpacity="0.04" />
        </>
      )}
      <text
        x="28" y="28"
        textAnchor="middle"
        dominantBaseline="central"
        fill={isFounder ? "var(--gold)" : "var(--gray-light)"}
        fontSize="14"
        fontFamily="serif"
        opacity={isFounder ? 0.8 : 0.5}
      >
        {initials}
      </text>
    </svg>
  );
}

/* ═══════════════════════ SCROLL PROGRESS ═══════════════════════ */

function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return <div ref={barRef} className="scroll-progress" style={{ width: 0 }} />;
}

/* ═══════════════════════ NAVBAR ═══════════════════════ */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuOpenRef = useRef(false);
  const activeSection = useActiveSection();

  useEffect(() => { menuOpenRef.current = menuOpen; }, [menuOpen]);

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 60);
      if (menuOpenRef.current && window.scrollY > 100) setMenuOpen(false);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--background)]/90 backdrop-blur-md border-b border-[var(--border)]/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
        <a
          href="#inicio"
          className="font-[family-name:var(--font-geist-mono)] text-sm md:text-base tracking-[0.2em] text-[var(--accent)] hover:text-[var(--foreground)] transition-colors text-glow"
        >
          AÚN_HUMANOS
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`font-[family-name:var(--font-geist-mono)] text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 relative ${
                  isActive ? "text-[var(--accent)]" : "text-[var(--gray-light)] hover:text-[var(--accent)]"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-[var(--accent)] opacity-60" />
                )}
              </a>
            );
          })}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-[5px] group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--gold)] focus-visible:outline-offset-4 rounded-sm"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`block w-6 h-px bg-[var(--accent)] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
          <span className={`block w-6 h-px bg-[var(--accent)] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-[var(--accent)] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
        </button>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-500 ${menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-6 pb-8 pt-2 bg-[var(--background)]/95 backdrop-blur-lg border-t border-[var(--border)]/10 flex flex-col gap-5">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`font-[family-name:var(--font-geist-mono)] text-sm tracking-[0.15em] uppercase transition-colors ${
                  isActive ? "text-[var(--accent)]" : "text-[var(--gray-light)] hover:text-[var(--accent)]"
                }`}
              >
                <span className="text-[var(--gray)] mr-2">{">"}</span>
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════ HERO ═══════════════════════ */

function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="inicio" className="relative h-screen w-full overflow-hidden bg-[#111]">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ filter: "brightness(0.5) contrast(1.15) grayscale(0.3)" }}
        src="/hero-video.mp4"
      />
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(17,17,17,0.3) 0%, rgba(17,17,17,0.05) 30%, rgba(17,17,17,0.5) 65%, var(--background) 100%)",
        }}
      />

      <div className="relative z-[2] h-full flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-16 lg:px-24">
        {/* Status line */}
        <div
          className={`font-[family-name:var(--font-geist-mono)] text-[10px] md:text-xs tracking-[0.4em] text-white/40 mb-6 transition-all duration-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="text-green-400 mr-2">●</span>
          SISTEMA ACTIVO — TRANSMISIÓN EN CURSO
        </div>

        {/* Heading */}
        <h1
          className={`font-[family-name:var(--font-serif)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[0.9] tracking-tight mb-8 transition-all duration-1000 delay-200 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          AÚN
          <br />
          <span className="text-white/70">HUMANOS</span>
        </h1>

        {/* Subtitle */}
        <p
          className={`font-[family-name:var(--font-geist-mono)] text-xs md:text-sm leading-relaxed text-white/60 max-w-2xl mb-10 transition-all duration-1000 delay-500 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Un movimiento filosófico y práctico que emerge como respuesta a los
          desafíos contemporáneos derivados de la acelerada evolución
          tecnológica y la creciente complejidad de la sociedad moderna.
          <span className="cursor-blink ml-1 text-white/50">▊</span>
        </p>

        {/* CTA */}
        <div
          className={`flex flex-wrap items-center gap-6 transition-all duration-1000 delay-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <a
            href="#somos"
            className="group font-[family-name:var(--font-geist-mono)] text-xs tracking-[0.2em] uppercase border border-white/30 hover:border-white text-white hover:bg-white hover:text-[#111] px-8 py-4 transition-all duration-500"
          >
            <span className="mr-2 group-hover:mr-3 transition-all">{">"}</span>
            EXPLORAR_MOVIMIENTO
          </a>
          <a
            href="#contacto"
            className="font-[family-name:var(--font-geist-mono)] text-xs tracking-[0.15em] uppercase text-white/50 hover:text-white transition-colors"
          >
            Contactar →
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          className={`mt-12 flex items-center gap-3 transition-all duration-1000 delay-1000 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-white/30"><ScrollChevron /></span>
          <span className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.3em] text-white/30 uppercase">
            Scroll
          </span>
        </div>
      </div>

      {/* Corner decoration */}
      <div className="absolute top-24 right-6 md:right-16 font-[family-name:var(--font-geist-mono)] text-[10px] text-white/20 leading-tight text-right z-[2]">
        <div>LAT 6.2518</div>
        <div>LON -75.5636</div>
        <div className="mt-1">MEDELLÍN.CO</div>
      </div>
    </section>
  );
}

/* ═══════════════════════ SOMOS ═══════════════════════ */

function Somos() {
  const reveal = useReveal();
  const gridReveal = useReveal(0.1);

  return (
    <section id="somos" className="relative px-6 md:px-16 lg:px-24 py-24 md:py-36 noise-bg bg-[var(--surface-alt)]">
      <div className="max-w-6xl mx-auto relative z-[1]">
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
                <span className="text-[var(--accent)]">Acción consciente.</span>
              </h3>
              <div className="w-16 h-px bg-[var(--accent)] mb-8 opacity-40" />
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
                <span className="text-[var(--accent)]">
                  la tecnología debe estar al servicio de lo humano, no al revés.
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Team grid with stagger */}
        <div
          ref={gridReveal.ref}
          className="mt-20 md:mt-28"
        >
          <div className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.3em] text-[var(--gray)] mb-8 uppercase">
            // Equipo fundador
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children ${gridReveal.visible ? "is-visible" : ""}`}>
            {TEAM.map((member, i) => (
              <AsciiFrame key={member.name} highlight={i === 0}>
                <div className="p-6 md:p-8 group hover:bg-[var(--accent)]/[0.03] transition-colors duration-500">
                  <MemberAvatar initials={member.initials} isFounder={i === 0} />
                  <div className="flex items-start justify-between mb-3">
                    <span className="font-[family-name:var(--font-geist-mono)] text-[9px] tracking-[0.3em] text-[var(--gray)] bg-[var(--accent)]/[0.06] px-2 py-1">
                      {member.tag}
                    </span>
                    <span className="font-[family-name:var(--font-geist-mono)] text-[10px] text-[var(--gray)]/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h4 className="font-[family-name:var(--font-serif)] text-lg text-[var(--foreground)] mb-2 group-hover:text-[var(--accent)] transition-colors duration-300">
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

/* ═══════════════════════ TRIÁNGULO VITAL ═══════════════════════ */

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
            {/* Enhanced SVG Triangle */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md aspect-square">
                <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <radialGradient id="centerGlow" cx="50%" cy="55%" r="30%">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Background glow */}
                  <circle cx="200" cy="230" r="120" fill="url(#centerGlow)" />

                  {/* Outer circle frame */}
                  <circle cx="200" cy="220" r="170" stroke="var(--accent)" strokeWidth="0.3" opacity="0.08" strokeDasharray="2 8" />

                  {/* Main triangle */}
                  <path
                    d="M200 50 L375 350 L25 350 Z"
                    stroke="var(--accent)"
                    strokeWidth="1.2"
                    opacity="0.5"
                    fill="var(--accent)"
                    fillOpacity="0.02"
                    filter="url(#glow)"
                  />

                  {/* Inner triangle */}
                  <path
                    d="M200 120 L310 310 L90 310 Z"
                    stroke="var(--accent)"
                    strokeWidth="0.4"
                    opacity="0.15"
                    strokeDasharray="6 4"
                    fill="none"
                  />

                  {/* Connecting lines to center */}
                  <line x1="200" y1="50" x2="200" y2="230" stroke="var(--accent)" strokeWidth="0.5" opacity="0.15" strokeDasharray="3 5" />
                  <line x1="375" y1="350" x2="200" y2="230" stroke="var(--accent)" strokeWidth="0.5" opacity="0.15" strokeDasharray="3 5" />
                  <line x1="25" y1="350" x2="200" y2="230" stroke="var(--accent)" strokeWidth="0.5" opacity="0.15" strokeDasharray="3 5" />

                  {/* Center rings */}
                  <circle cx="200" cy="230" r="32" stroke="var(--accent)" strokeWidth="0.6" opacity="0.25" />
                  <circle cx="200" cy="230" r="22" stroke="var(--accent)" strokeWidth="0.3" opacity="0.15" strokeDasharray="2 3" />
                  <circle cx="200" cy="230" r="5" fill="var(--accent)" opacity="0.5" filter="url(#glow)" />

                  {/* Vertex nodes — animated via CSS */}
                  <circle cx="200" cy="50" r="6" fill="var(--accent)" opacity="0.7" filter="url(#glow)" />
                  <circle cx="375" cy="350" r="6" fill="var(--accent)" opacity="0.7" filter="url(#glow)" />
                  <circle cx="25" cy="350" r="6" fill="var(--accent)" opacity="0.7" filter="url(#glow)" />

                  {/* Outer rings on vertices */}
                  <circle cx="200" cy="50" r="12" stroke="var(--accent)" strokeWidth="0.4" opacity="0.2" />
                  <circle cx="375" cy="350" r="12" stroke="var(--accent)" strokeWidth="0.4" opacity="0.2" />
                  <circle cx="25" cy="350" r="12" stroke="var(--accent)" strokeWidth="0.4" opacity="0.2" />

                  {/* Labels */}
                  <text x="200" y="25" textAnchor="middle" fill="var(--accent)" fontSize="13" fontFamily="monospace" letterSpacing="0.25em" opacity="0.8">
                    YO
                  </text>
                  <text x="398" y="378" textAnchor="end" fill="var(--accent)" fontSize="11" fontFamily="monospace" letterSpacing="0.2em" opacity="0.8">
                    LAS COSAS
                  </text>
                  <text x="2" y="378" textAnchor="start" fill="var(--accent)" fontSize="11" fontFamily="monospace" letterSpacing="0.2em" opacity="0.8">
                    LOS OTROS
                  </text>

                  {/* Center label */}
                  <text x="200" y="290" textAnchor="middle" fill="var(--foreground)" fontSize="9" fontFamily="monospace" letterSpacing="0.3em" opacity="0.5">
                    ESPIRITUAL
                  </text>
                </svg>
              </div>
            </div>

            {/* Text content */}
            <div>
              <h3 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl text-[var(--foreground)] leading-tight mb-8">
                Equilibrio y armonía
                <br />
                <span className="text-[var(--accent)]">del ser Humano.</span>
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
                  <div className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.3em] text-[var(--accent)] mb-3 uppercase">
                    // Retiro inmersión
                  </div>
                  <p className="font-[family-name:var(--font-geist-mono)] text-xs leading-[1.8] text-[var(--gray-light)] mb-5">
                    Triángulo Vital es un retiro de inmersión Humana, un día
                    completo de desconexión. Su desarrollo apropia una
                    metodología que parte de la reflexión y la casuística para
                    llegar a un reconocerse, reafirmando con ello lo que está
                    bien, pero además potenciando aquello que requiere de
                    nuestra atención.
                  </p>
                  <a
                    href="#contacto"
                    className="inline-block font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.2em] text-[var(--gray)] hover:text-[var(--accent)] transition-colors uppercase"
                  >
                    {">"} Reservar retiro_
                  </a>
                </div>
              </AsciiFrame>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ HUMANISMO DIGITAL ═══════════════════════ */

function HumanismoDigital() {
  const reveal = useReveal();
  const listReveal = useReveal(0.05);

  return (
    <section id="humanismo" className="relative px-6 md:px-16 lg:px-24 py-24 md:py-36 noise-bg bg-[var(--surface-alt)]">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden xl:block">
        <div
          className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.5em] text-[var(--gray)]/15 uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          HUMANISMO · DIGITAL · ÉTICO · CONSCIENTE
        </div>
      </div>

      <div className="max-w-5xl mx-auto relative z-[1]">
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
              <span className="text-[var(--accent)] text-glow">para actuar.</span>
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

        {/* 10 Principles with stagger */}
        <div ref={listReveal.ref}>
          <div className={`stagger-children ${listReveal.visible ? "is-visible" : ""}`}>
            {PRINCIPLES.map((principle, i) => (
              <div
                key={i}
                className="group flex gap-4 md:gap-6 py-5 md:py-6 border-b border-[var(--border)]/10 hover:bg-[var(--accent)]/[0.02] hover:pl-2 transition-all duration-300"
              >
                <span className="font-[family-name:var(--font-geist-mono)] text-sm md:text-base text-[var(--accent)] font-bold min-w-[2.5rem] text-right tabular-nums text-glow">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-[family-name:var(--font-geist-mono)] text-xs md:text-sm leading-[1.8] text-[var(--gray-light)] group-hover:text-[var(--foreground)] transition-colors duration-300">
                  {principle}
                </p>
              </div>
            ))}
          </div>

          {/* SVG Seal */}
          <div className="mt-20 flex flex-col items-center gap-6">
            <SealSVG />
            <div className="text-center">
              <div className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.4em] text-[var(--accent)] uppercase">
                Sello de Humanismo Digital
              </div>
              <div className="font-[family-name:var(--font-geist-mono)] text-[9px] tracking-[0.2em] text-[var(--gray)] mt-2">
                Para empresas con conciencia tecnológica
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ SERVICIOS ═══════════════════════ */

function Servicios() {
  const reveal = useReveal();
  const gridReveal = useReveal(0.1);

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
              <span className="text-[var(--accent)]">seguir siendo humanos.</span>
            </h3>
            <p className="font-[family-name:var(--font-geist-mono)] text-sm leading-[1.9] text-[var(--gray-light)] md:mt-3">
              Ofrecemos espacios y metodologías para que personas y
              organizaciones enfrenten los retos de la era tecnológica sin
              perder su esencia.
            </p>
          </div>
        </div>

        {/* Service cards with stagger */}
        <div
          ref={gridReveal.ref}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children ${gridReveal.visible ? "is-visible" : ""}`}
        >
          {SERVICES.map((service, i) => (
            <div key={service.title} className="group relative">
              <AsciiFrame>
                <div className="p-6 md:p-8 h-full hover:bg-[var(--accent)]/[0.03] transition-all duration-500">
                  <div className="flex items-start justify-between mb-6">
                    <ServiceIcon type={service.id} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span className="font-[family-name:var(--font-geist-mono)] text-[10px] text-[var(--gray)]/40">
                      SRV.{String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h4 className="font-[family-name:var(--font-serif)] text-lg text-[var(--foreground)] mb-4 group-hover:text-[var(--accent)] transition-colors duration-300">
                    {service.title}
                  </h4>

                  <p className="font-[family-name:var(--font-geist-mono)] text-xs leading-[1.8] text-[var(--gray-light)]">
                    {service.desc}
                  </p>

                  <a
                    href="#contacto"
                    className="inline-block mt-6 font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.2em] text-[var(--gray)] group-hover:text-[var(--accent)] transition-colors uppercase"
                  >
                    {">"} Consultar
                    <span className="cursor-blink ml-1">_</span>
                  </a>
                </div>
              </AsciiFrame>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ CONTACTO ═══════════════════════ */

function Contacto() {
  const reveal = useReveal();
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  }, []);

  return (
    <section id="contacto" className="relative px-6 md:px-16 lg:px-24 py-24 md:py-36 noise-bg bg-[var(--surface-alt)]">
      <div className="max-w-4xl mx-auto relative z-[1]">
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
                <span className="text-[var(--accent)]">conversación.</span>
              </h3>

              <p className="font-[family-name:var(--font-geist-mono)] text-xs text-[var(--gray-light)] leading-[1.8] mb-10">
                Escribe tu mensaje y conectaremos contigo para explorar cómo
                podemos acompañarte.
              </p>

              {submitted ? (
                <div className="py-12">
                  <div className="font-[family-name:var(--font-geist-mono)] text-sm text-[var(--accent)] text-glow mb-2">
                    {">"} Mensaje enviado correctamente.
                  </div>
                  <div className="font-[family-name:var(--font-geist-mono)] text-xs text-[var(--gray-light)]">
                    Nos pondremos en contacto contigo pronto.
                    <span className="cursor-blink ml-1 text-[var(--accent)]">_</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    { id: "nombre", label: "nombre", type: "text" },
                    { id: "email", label: "email", type: "email" },
                  ].map((field) => (
                    <div key={field.id} className="relative">
                      <div className="flex items-center gap-2 font-[family-name:var(--font-geist-mono)] text-xs text-[var(--gray)] mb-2">
                        <span className={`transition-colors ${focusedField === field.id ? "text-[var(--accent)]" : ""}`}>{">"}</span>
                        <span>{field.label}:</span>
                      </div>
                      <input
                        type={field.type}
                        id={field.id}
                        required
                        onFocus={() => setFocusedField(field.id)}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-transparent border-b border-[var(--border)]/20 focus:border-[var(--accent)] text-[var(--foreground)] font-[family-name:var(--font-geist-mono)] text-sm py-3 outline-none transition-colors placeholder:text-[var(--gray)]/30"
                        placeholder={`Ingresa tu ${field.label}...`}
                      />
                    </div>
                  ))}

                  <div className="relative">
                    <div className="flex items-center gap-2 font-[family-name:var(--font-geist-mono)] text-xs text-[var(--gray)] mb-2">
                      <span className={`transition-colors ${focusedField === "mensaje" ? "text-[var(--accent)]" : ""}`}>{">"}</span>
                      <span>mensaje:</span>
                    </div>
                    <textarea
                      id="mensaje"
                      rows={4}
                      required
                      onFocus={() => setFocusedField("mensaje")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-transparent border-b border-[var(--border)]/20 focus:border-[var(--accent)] text-[var(--foreground)] font-[family-name:var(--font-geist-mono)] text-sm py-3 outline-none transition-colors resize-none placeholder:text-[var(--gray)]/30"
                      placeholder="Escribe tu mensaje..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="group mt-4 font-[family-name:var(--font-geist-mono)] text-xs tracking-[0.2em] uppercase border border-[var(--border)]/30 hover:border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white px-8 py-4 transition-all duration-500"
                  >
                    <span className="mr-2 group-hover:mr-3 transition-all">{">"}</span>
                    ENVIAR_MENSAJE
                    <span className="cursor-blink ml-1">_</span>
                  </button>
                </form>
              )}
            </div>

            {/* Social + brand SVG */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.3em] text-[var(--gray)] mb-6 uppercase">
                  // Redes
                </div>

                <div className="space-y-3">
                  {SOCIALS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 py-3 border-b border-[var(--border)]/10 hover:border-[var(--accent)]/20 transition-colors"
                    >
                      <span className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.3em] text-[var(--gray)] w-8">
                        {social.symbol}
                      </span>
                      <span className="font-[family-name:var(--font-geist-mono)] text-sm text-[var(--gray-light)] group-hover:text-[var(--accent)] transition-colors">
                        {social.label}
                      </span>
                      <span className="ml-auto font-[family-name:var(--font-geist-mono)] text-xs text-[var(--gray)] opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Brand SVG instead of ASCII text */}
              <div className="mt-12 md:mt-0 flex justify-center md:justify-end">
                <BrandMark />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ FOOTER ═══════════════════════ */

function Footer() {
  return (
    <footer className="relative px-6 md:px-16 lg:px-24 py-10 border-t border-[var(--border)]/10">
      {/* Decorative SVG line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <svg viewBox="0 0 80 16" fill="none" className="w-20 h-4">
          <line x1="0" y1="8" x2="30" y2="8" stroke="var(--accent)" strokeWidth="0.5" opacity="0.2" />
          <circle cx="40" cy="8" r="3" stroke="var(--accent)" strokeWidth="0.5" opacity="0.3" />
          <circle cx="40" cy="8" r="1" fill="var(--accent)" opacity="0.4" />
          <line x1="50" y1="8" x2="80" y2="8" stroke="var(--accent)" strokeWidth="0.5" opacity="0.2" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.2em] text-[var(--gray)]/60">
          © {new Date().getFullYear()} Todos los derechos reservados — Aún Humanos
          <span className="cursor-blink ml-1 text-[var(--gray)]">_</span>
        </div>

        <div className="flex items-center gap-6">
          {NAV_LINKS.slice(1, 5).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-[family-name:var(--font-geist-mono)] text-[9px] tracking-[0.15em] uppercase text-[var(--gray)]/40 hover:text-[var(--accent)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Back to top */}
        <a
          href="#inicio"
          className="font-[family-name:var(--font-geist-mono)] text-[9px] tracking-[0.15em] uppercase text-[var(--gray)]/40 hover:text-[var(--accent)] transition-colors"
          aria-label="Back to top"
        >
          ↑ INICIO
        </a>
      </div>
    </footer>
  );
}

/* ═══════════════════════ MAIN PAGE ═══════════════════════ */

export default function Home() {
  return (
    <main className="crt-flicker">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <TerminalDivider variant={0} />
      <Somos />
      <TerminalDivider variant={1} />
      <TrianguloVital />
      <TerminalDivider variant={2} />
      <HumanismoDigital />
      <TerminalDivider variant={3} />
      <Servicios />
      <TerminalDivider variant={4} />
      <Contacto />
      <Footer />
    </main>
  );
}
