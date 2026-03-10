"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ═══════════════════════════ DATA ═══════════════════════════ */

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Somos", href: "#somos" },
  { label: "Triángulo Vital", href: "#triangulo" },
  { label: "Humanismo Digital", href: "#humanismo" },
  { label: "Servicios", href: "#servicios" },
  { label: "Publicaciones", href: "#publicaciones" },
  { label: "Contacto", href: "#contacto" },
];

const TEAM = [
  { name: "PhD Felipe Jaramillo V.", role: "Creador de Aún Humanos", tag: "FOUNDER", photo: "/team/felipe.png" },
  { name: "Mg Olga Zapata A.", role: "Corazón Aún Humanos", tag: "SOUL", photo: "/team/olga.png" },
  { name: "PhD Sergio Molina P.", role: "Ni Un Día Sin Amor", tag: "LOVE", photo: "/team/sergio.png" },
  { name: "PhD Santiago Jiménez L.", role: "Algoritmos Deshumanizantes", tag: "ETHICS", photo: "/team/santiago.png" },
  { name: "MG Andrés Jaramillo V.", role: "La vacuidad creadora", tag: "CREATE", photo: "/team/andres.png" },
  { name: "PhD Orión Vargas V.", role: "Remagía", tag: "MAGIC", photo: "/team/orion.png" },
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
  { title: "Talleres de Reflexión Profunda", desc: "Sesiones grupales donde exploramos dilemas éticos de la tecnología a través del diálogo socrático y la filosofía práctica.", id: "workshop", format: "Presencial · 4 horas", audience: "Equipos de 10-25 personas" },
  { title: "Consultoría en Humanismo Digital", desc: "Diagnóstico y acompañamiento para implementar los 10 principios éticos en tu organización. Incluye evaluación, plan de acción y seguimiento.", id: "consulting", format: "Presencial + Virtual · 3 meses", audience: "Empresas y organizaciones" },
  { title: "Coaching Filosófico", desc: "Procesos individuales de 8 sesiones para líderes que buscan tomar decisiones más conscientes frente a los retos de la inteligencia artificial.", id: "coaching", format: "Virtual · 8 sesiones", audience: "Líderes y ejecutivos" },
  { title: "Conferencias y Keynotes", desc: "Charlas de alto impacto sobre humanismo digital, ética tecnológica y el futuro del trabajo humano. Para eventos corporativos y universidades.", id: "events", format: "Presencial · 60-90 min", audience: "Eventos y congresos" },
  { title: "Programa Educativo Aún Humanos", desc: "Curso de 6 módulos sobre pensamiento crítico en la era digital. Material filosófico y práctico con certificación de participación.", id: "education", format: "Virtual o presencial · 6 módulos", audience: "Profesionales y estudiantes" },
];

const PUBLICATIONS = [
  {
    title: "Un mundo digital sin reglas; de regreso al \"todo vale\"",
    author: "Felipe Jaramillo Vélez",
    excerpt: "Vivir sin normas es algo a lo que los seres humanos no estamos del todo habituados, y hoy los hombres enfrentan uno de los mayores retos de su historia, adaptarse a una realidad digital con leyes y límites imprecisos...",
    image: "/publicaciones/mundo-digital.png",
    href: "https://alponiente.com/un-mundo-digital-sin-reglas-de-regreso-al-todo-vale/",
    source: "Al Poniente",
  },
  {
    title: "¿Exceso de 'Blackout'?",
    author: "Sergio Molina Pérez",
    excerpt: "Vivimos en tiempos tentadores de usar el enrollable en la habitación antes que apreciar la luz natural. Meter la cabeza debajo de la almohada para evitar lo incómodo, perturbador o injusto...",
    image: "/publicaciones/blackout.png",
    href: "https://ethic.es/2024/07/exceso-de-blackout/",
    source: "Ethic",
  },
  {
    title: "¿Puede la matemática ayudarnos a conocer mejor el universo?",
    author: "Santiago Jiménez Londoño",
    excerpt: "Una reflexión sobre cómo la búsqueda matemática, al igual que la filosófica, nos acerca a una comprensión más profunda del universo y sus misterios.",
    image: "/publicaciones/matematica.png",
    href: "https://alponiente.com/puede-la-matematica-ayudarnos-a-conocer-mejor-el-universo/",
    source: "Al Poniente",
  },
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com", symbol: "IG" },
  { label: "Facebook", href: "https://facebook.com", symbol: "FB" },
  { label: "X", href: "https://x.com", symbol: "X" },
  { label: "YouTube", href: "https://youtube.com", symbol: "YT" },
];

const METRICS = [
  { value: "03+", label: "Años de reflexión activa" },
  { value: "50+", label: "Talleres realizados" },
  { value: "500+", label: "Personas impactadas" },
  { value: "12+", label: "Empresas acompañadas" },
];

const TESTIMONIALS = [
  {
    quote: "El retiro Triángulo Vital me dio herramientas que ningún curso de liderazgo me había dado. Reconectarse con lo humano es el verdadero diferencial.",
    name: "Carolina Mejía R.",
    role: "Directora de Innovación, Grupo Argos",
  },
  {
    quote: "Implementar los principios de Humanismo Digital transformó nuestra cultura organizacional. Nuestros colaboradores entienden la tecnología como herramienta, no como reemplazo.",
    name: "Andrés Gómez L.",
    role: "CEO, TechVerde Colombia",
  },
  {
    quote: "Felipe Jaramillo tiene la capacidad única de hacer que la filosofía sea urgente y práctica. Cada taller deja una huella profunda en los asistentes.",
    name: "Dra. María Isabel Puerta",
    role: "Profesora, Universidad EAFIT",
  },
];

/* ═══════════════════════ SVG ICONS ═══════════════════════ */

function ServiceIcon({ type, className = "" }: { type: string; className?: string }) {
  const c = "var(--accent)";
  const shared = `w-10 h-10 ${className}` as const;

  switch (type) {
    case "workshop":
      return (
        <svg viewBox="0 0 40 40" fill="none" className={shared} aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke={c} strokeWidth="0.8" opacity="0.5" />
          <circle cx="20" cy="20" r="12" stroke={c} strokeWidth="0.5" opacity="0.35" strokeDasharray="3 3" />
          <path d="M14 20h12M20 14v12" stroke={c} strokeWidth="1.2" opacity="0.9" />
          <circle cx="20" cy="20" r="3" fill={c} opacity="0.25" />
          <circle cx="20" cy="20" r="1.5" fill={c} opacity="0.7" />
        </svg>
      );
    case "consulting":
      return (
        <svg viewBox="0 0 40 40" fill="none" className={shared} aria-hidden="true">
          <rect x="6" y="6" width="28" height="28" rx="2" stroke={c} strokeWidth="0.8" opacity="0.5" />
          <line x1="6" y1="14" x2="34" y2="14" stroke={c} strokeWidth="0.5" opacity="0.35" />
          <rect x="10" y="18" width="8" height="4" rx="1" stroke={c} strokeWidth="0.8" opacity="0.65" />
          <rect x="22" y="18" width="8" height="4" rx="1" stroke={c} strokeWidth="0.8" opacity="0.65" />
          <rect x="10" y="26" width="20" height="4" rx="1" stroke={c} strokeWidth="0.8" opacity="0.65" />
          <circle cx="9" cy="10" r="1.5" fill={c} opacity="0.55" />
          <circle cx="14" cy="10" r="1.5" fill={c} opacity="0.55" />
        </svg>
      );
    case "coaching":
      return (
        <svg viewBox="0 0 40 40" fill="none" className={shared} aria-hidden="true">
          <path d="M20 6L34 34H6L20 6Z" stroke={c} strokeWidth="0.8" opacity="0.5" />
          <path d="M20 14L28 30H12L20 14Z" stroke={c} strokeWidth="0.5" opacity="0.35" strokeDasharray="2 2" />
          <circle cx="20" cy="22" r="3" fill={c} opacity="0.2" stroke={c} strokeWidth="0.5" />
          <circle cx="20" cy="22" r="1" fill={c} opacity="0.8" />
        </svg>
      );
    case "events":
      return (
        <svg viewBox="0 0 40 40" fill="none" className={shared} aria-hidden="true">
          <circle cx="20" cy="20" r="16" stroke={c} strokeWidth="0.8" opacity="0.5" />
          <circle cx="20" cy="20" r="10" stroke={c} strokeWidth="0.5" opacity="0.3" />
          <circle cx="20" cy="20" r="4" stroke={c} strokeWidth="0.5" opacity="0.35" />
          {[0, 60, 120, 180, 240, 300].map((angle) => {
            const r = 16;
            const x = 20 + r * Math.cos((angle * Math.PI) / 180);
            const y = 20 + r * Math.sin((angle * Math.PI) / 180);
            return <circle key={angle} cx={x} cy={y} r="1.5" fill={c} opacity="0.6" />;
          })}
          <circle cx="20" cy="20" r="2" fill={c} opacity="0.7" />
        </svg>
      );
    case "education":
      return (
        <svg viewBox="0 0 40 40" fill="none" className={shared} aria-hidden="true">
          <rect x="8" y="4" width="24" height="32" rx="2" stroke={c} strokeWidth="0.8" opacity="0.5" />
          <line x1="14" y1="12" x2="28" y2="12" stroke={c} strokeWidth="0.8" opacity="0.55" />
          <line x1="14" y1="17" x2="26" y2="17" stroke={c} strokeWidth="0.5" opacity="0.4" />
          <line x1="14" y1="22" x2="24" y2="22" stroke={c} strokeWidth="0.5" opacity="0.4" />
          <line x1="14" y1="27" x2="22" y2="27" stroke={c} strokeWidth="0.5" opacity="0.4" />
          <rect x="8" y="4" width="4" height="32" rx="1" fill={c} opacity="0.1" />
        </svg>
      );
    default:
      return null;
  }
}

function SealSVG() {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="w-40 h-40 md:w-48 md:h-48" role="img" aria-label="Sello de Humanismo Digital">
      <circle cx="100" cy="100" r="90" stroke="var(--foreground)" strokeWidth="0.5" opacity="0.2" />
      <circle cx="100" cy="100" r="80" stroke="var(--foreground)" strokeWidth="1" opacity="0.35" />
      <circle cx="100" cy="100" r="70" stroke="var(--foreground)" strokeWidth="0.3" opacity="0.25" strokeDasharray="4 6" />
      {/* Outer notches */}
      {Array.from({ length: 36 }).map((_, i) => {
        const angle = (i * 10 * Math.PI) / 180;
        const x1 = 100 + 82 * Math.cos(angle);
        const y1 = 100 + 82 * Math.sin(angle);
        const x2 = 100 + 88 * Math.cos(angle);
        const y2 = 100 + 88 * Math.sin(angle);
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--foreground)" strokeWidth="0.5" opacity="0.35" />
        );
      })}
      {/* Inner diamond */}
      <path d="M100 55 L135 100 L100 145 L65 100 Z" stroke="var(--foreground)" strokeWidth="0.8" opacity="0.4" fill="var(--accent)" fillOpacity="0.06" />
      {/* Center H */}
      <text x="100" y="95" textAnchor="middle" fill="var(--foreground)" fontSize="22" fontFamily="serif" opacity="0.7" dominantBaseline="middle">
        H
      </text>
      {/* Circular text top */}
      <defs>
        <path id="topArc" d="M30,100 a70,70 0 0,1 140,0" />
        <path id="bottomArc" d="M30,100 a70,70 0 0,0 140,0" />
      </defs>
      <text fill="var(--foreground)" fontSize="7" fontFamily="monospace" letterSpacing="0.3em" opacity="0.5">
        <textPath href="#topArc" startOffset="50%" textAnchor="middle">
          SELLO DE HUMANISMO
        </textPath>
      </text>
      <text fill="var(--foreground)" fontSize="7" fontFamily="monospace" letterSpacing="0.3em" opacity="0.5">
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
      <circle cx="60" cy="60" r="55" stroke="var(--foreground)" strokeWidth="0.5" />
      <circle cx="60" cy="60" r="45" stroke="var(--foreground)" strokeWidth="0.3" strokeDasharray="3 5" />
      <text x="60" y="55" textAnchor="middle" fill="var(--foreground)" fontSize="14" fontFamily="monospace" letterSpacing="0.15em" dominantBaseline="middle">
        AÚN
      </text>
      <text x="60" y="72" textAnchor="middle" fill="var(--foreground)" fontSize="10" fontFamily="monospace" letterSpacing="0.25em" dominantBaseline="middle">
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
    <div className="font-[family-name:var(--font-geist-mono)] text-xs tracking-[0.15em] uppercase text-[var(--accent)] mb-2">
      {children}
    </div>
  );
}

function SectionDivider() {
  return (
    <div className="my-16 md:my-24 px-6 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto h-px bg-[var(--border)]" />
    </div>
  );
}

function Card({ children, className = "", highlight = false }: { children: React.ReactNode; className?: string; highlight?: boolean }) {
  return (
    <div className={`border ${highlight ? "border-[var(--accent)]/30" : "border-[var(--border)]"} rounded-lg overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

function MemberPhoto({ src, name, isFounder }: { src: string; name: string; isFounder: boolean }) {
  return (
    <div className={`relative w-20 h-20 mb-4 rounded-full overflow-hidden border-2 ${isFounder ? "border-[var(--accent)]" : "border-[var(--border)]"}`}>
      <img
        src={src}
        alt={name}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
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
          ? "bg-[var(--background)]/90 backdrop-blur-md border-b border-[var(--border)]/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
        <a
          href="#inicio"
          className="font-[family-name:var(--font-geist-mono)] text-sm md:text-base tracking-[0.2em] text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
        >
          AÚN HUMANOS
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`font-[family-name:var(--font-geist-mono)] text-xs tracking-[0.15em] uppercase transition-colors duration-300 relative ${
                  isActive ? "text-[var(--accent)]" : "text-[var(--gray-light)] hover:text-[var(--accent)]"
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 right-0 h-px bg-[var(--accent)] transition-all duration-300 ${
                  isActive ? "opacity-60 scale-x-100" : "opacity-0 scale-x-0"
                }`} />
              </a>
            );
          })}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-[5px] group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-4 rounded-sm"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          <span className={`block w-6 h-[2px] bg-[var(--foreground)] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
          <span className={`block w-6 h-[2px] bg-[var(--foreground)] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-[2px] bg-[var(--foreground)] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}
        aria-hidden={!menuOpen}
      >
        <div className="px-6 pb-8 pt-2 bg-[var(--background)]/95 backdrop-blur-lg border-t border-[var(--border)]/30 flex flex-col gap-5">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                tabIndex={menuOpen ? 0 : -1}
                className={`font-[family-name:var(--font-geist-mono)] text-sm tracking-[0.15em] uppercase transition-colors ${
                  isActive ? "text-[var(--accent)]" : "text-[var(--gray-light)] hover:text-[var(--accent)]"
                }`}
              >
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
        preload="metadata"
        aria-hidden="true"
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
          className={`text-sm md:text-base leading-relaxed text-white/60 max-w-2xl mb-10 transition-all duration-1000 delay-500 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Acompañamos a personas y organizaciones a navegar la era
          tecnológica sin perder lo esencialmente humano. Talleres, retiros,
          consultoría y certificación en humanismo digital.
          <span className="cursor-blink ml-1 text-white/50">▊</span>
        </p>

        {/* Services tagline */}
        <div
          className={`flex flex-wrap gap-4 mb-10 font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.15em] text-white/30 uppercase transition-all duration-1000 delay-500 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {["Talleres", "Retiros", "Consultoría", "Certificación"].map((s) => (
            <span key={s} className="border border-white/15 px-3 py-1 rounded">{s}</span>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`flex flex-wrap items-center gap-6 transition-all duration-1000 delay-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <a
            href="#somos"
            className="group font-[family-name:var(--font-geist-mono)] text-xs tracking-[0.2em] uppercase border border-white/30 hover:border-white text-white hover:bg-white hover:text-[#111] px-8 py-4 rounded-lg transition-all duration-500"
          >
            Explorar movimiento
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
          <span className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.15em] text-white/30 uppercase">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ SOMOS ═══════════════════════ */

function Somos() {
  const reveal = useReveal();
  const gridReveal = useReveal(0.1);

  return (
    <section id="somos" className="relative px-6 md:px-16 lg:px-24 py-24 md:py-36 bg-[var(--surface-alt)]">
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
              <p className="text-sm leading-[1.9] text-[var(--gray-light)]">
                Fundado por{" "}
                <span className="text-[var(--foreground)]">Felipe Jaramillo Vélez</span>
                , filósofo, conferencista y consultor con más de 20 años de
                experiencia en ética aplicada y desarrollo humano. Autor y
                docente universitario, ha acompañado a organizaciones en
                Colombia y Latinoamérica en la integración consciente de la
                tecnología.
              </p>
              <p className="text-sm leading-[1.9] text-[var(--gray-light)] mt-6">
                Somos un colectivo de doctores, magísteres y profesionales
                de diversas disciplinas — filosofía, ingeniería, psicología,
                educación — unidos por una convicción:{" "}
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
          <div className="font-[family-name:var(--font-geist-mono)] text-xs tracking-[0.15em] text-[var(--gray)] mb-8 uppercase">
            Equipo fundador
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children ${gridReveal.visible ? "is-visible" : ""}`}>
            {TEAM.map((member, i) => (
              <Card key={member.name} highlight={i === 0}>
                <div className="p-6 md:p-8 group hover:bg-[var(--accent)]/[0.03] transition-colors duration-500">
                  <MemberPhoto src={member.photo} name={member.name} isFounder={i === 0} />
                  <div className="flex items-start justify-between mb-3">
                    <span className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.15em] text-[var(--gray)] bg-[var(--accent)]/[0.06] px-2 py-1 rounded">
                      {member.tag}
                    </span>
                    <span className="font-[family-name:var(--font-geist-mono)] text-xs text-[var(--gray)] opacity-40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h4 className="font-[family-name:var(--font-serif)] text-lg text-[var(--foreground)] mb-2 group-hover:text-[var(--accent)] transition-colors duration-300">
                    {member.name}
                  </h4>
                  <p className="text-xs text-[var(--gray-light)]">
                    {member.role}
                  </p>
                </div>
              </Card>
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
          <SectionHeader>TRIÁNGULO VITAL</SectionHeader>

          <div className="mt-12 grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            {/* Enhanced SVG Triangle */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md aspect-square">
                <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" aria-hidden="true">
                  <defs>
                    <radialGradient id="centerGlow" cx="50%" cy="55%" r="30%">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.06" />
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
                  />

                  {/* Inner triangle */}
                  <path
                    d="M200 120 L310 310 L90 310 Z"
                    stroke="var(--accent)"
                    strokeWidth="0.4"
                    opacity="0.25"
                    strokeDasharray="6 4"
                    fill="none"
                  />

                  {/* Connecting lines to center */}
                  <line x1="200" y1="50" x2="200" y2="230" stroke="var(--accent)" strokeWidth="0.5" opacity="0.25" strokeDasharray="3 5" />
                  <line x1="375" y1="350" x2="200" y2="230" stroke="var(--accent)" strokeWidth="0.5" opacity="0.25" strokeDasharray="3 5" />
                  <line x1="25" y1="350" x2="200" y2="230" stroke="var(--accent)" strokeWidth="0.5" opacity="0.25" strokeDasharray="3 5" />

                  {/* Center rings */}
                  <circle cx="200" cy="230" r="32" stroke="var(--accent)" strokeWidth="0.6" opacity="0.25" />
                  <circle cx="200" cy="230" r="22" stroke="var(--accent)" strokeWidth="0.3" opacity="0.25" strokeDasharray="2 3" />
                  <circle cx="200" cy="230" r="5" fill="var(--accent)" opacity="0.5" />

                  {/* Vertex nodes */}
                  <circle cx="200" cy="50" r="6" fill="var(--accent)" opacity="0.7" />
                  <circle cx="375" cy="350" r="6" fill="var(--accent)" opacity="0.7" />
                  <circle cx="25" cy="350" r="6" fill="var(--accent)" opacity="0.7" />

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

              <p className="text-sm leading-[1.9] text-[var(--gray-light)] mb-8">
                Triángulo Vital es una filosofía de vida que busca el equilibrio
                y la armonía del ser Humano a través de una reconfiguración
                permanente que permita hacer consciente la relación con el yo,
                con los otros y con las cosas — y transversal a estos tres
                elementos, la relación fundamental con lo espiritual.
              </p>

              <Card highlight>
                <div className="p-6 md:p-8">
                  <div className="font-[family-name:var(--font-geist-mono)] text-xs tracking-[0.15em] text-[var(--accent)] mb-4 uppercase">
                    Retiro de inmersión humana
                  </div>
                  <p className="text-xs leading-[1.8] text-[var(--gray-light)] mb-6">
                    Un día completo de desconexión tecnológica y reconexión
                    humana. Metodología que parte de la reflexión y la
                    casuística para llegar a reconocerse, reafirmando lo que
                    está bien y potenciando lo que requiere atención.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      { label: "Duración", value: "8 horas (día completo)" },
                      { label: "Lugar", value: "Medellín, Colombia" },
                      { label: "Grupo", value: "Máx. 15 personas" },
                      { label: "Incluye", value: "Material, alimentación, certificado" },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.15em] text-[var(--gray)] uppercase mb-1">
                          {item.label}
                        </div>
                        <div className="text-xs text-[var(--foreground)]">
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <a
                    href="https://wa.me/573001234567?text=Quiero%20información%20sobre%20el%20retiro%20Triángulo%20Vital"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.15em] text-[var(--accent)] hover:text-[var(--foreground)] transition-colors uppercase border border-[var(--accent)]/30 hover:border-[var(--accent)] px-4 py-2 rounded-lg"
                  >
                    Reservar cupo por WhatsApp
                  </a>
                </div>
              </Card>
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
    <section id="humanismo" className="relative px-6 md:px-16 lg:px-24 py-24 md:py-36 bg-[var(--surface-alt)]">
      <div className="max-w-5xl mx-auto relative z-[1]">
        <div
          ref={reveal.ref}
          className={`transition-all duration-1000 ${
            reveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionHeader>HUMANISMO DIGITAL</SectionHeader>

          <div className="mt-12 mb-16 text-center">
            <h3 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl lg:text-6xl text-[var(--foreground)] mb-4">
              Entender{" "}
              <span className="text-[var(--accent)]">para actuar.</span>
            </h3>
            <p className="font-[family-name:var(--font-geist-mono)] text-xs tracking-[0.15em] text-[var(--gray-light)] mt-6 uppercase">
              Ideario Ético hacia un Humanismo Digital
            </p>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent opacity-40 mb-12" />

          <p className="text-sm leading-[1.9] text-[var(--gray-light)] mb-16 max-w-3xl mx-auto text-center">
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
                className="group flex gap-4 md:gap-6 py-5 md:py-6 border-b border-[var(--border)]/30 hover:bg-[var(--accent)]/[0.02] hover:pl-2 transition-all duration-300"
              >
                <span className="font-[family-name:var(--font-geist-mono)] text-sm md:text-base text-[var(--accent)] font-bold min-w-[2.5rem] text-right tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-xs md:text-sm leading-[1.8] text-[var(--gray-light)] group-hover:text-[var(--foreground)] transition-colors duration-300">
                  {principle}
                </p>
              </div>
            ))}
          </div>

          {/* SVG Seal + Certification explanation */}
          <div className="mt-20 grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col items-center gap-6">
              <SealSVG />
              <div className="text-center">
                <div className="font-[family-name:var(--font-geist-mono)] text-xs tracking-[0.15em] text-[var(--accent)] uppercase">
                  Sello de Humanismo Digital
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-[family-name:var(--font-serif)] text-2xl md:text-3xl text-[var(--foreground)] mb-4">
                Certifica tu compromiso
                <br />
                <span className="text-[var(--accent)]">con lo humano.</span>
              </h4>
              <p className="text-xs leading-[1.8] text-[var(--gray-light)] mb-6">
                El Sello de Humanismo Digital certifica que tu organización
                opera bajo principios éticos frente a la tecnología. Es un
                compromiso público con tus colaboradores y clientes.
              </p>
              <div className="space-y-3 mb-6">
                {[
                  { step: "01", text: "Diagnóstico ético de tu relación con la tecnología" },
                  { step: "02", text: "Implementación de los 10 principios en tu operación" },
                  { step: "03", text: "Auditoría y certificación por Aún Humanos" },
                ].map((s) => (
                  <div key={s.step} className="flex gap-3 items-start">
                    <span className="font-[family-name:var(--font-geist-mono)] text-xs text-[var(--accent)] font-bold min-w-[1.5rem]">
                      {s.step}
                    </span>
                    <span className="text-xs text-[var(--gray-light)]">
                      {s.text}
                    </span>
                  </div>
                ))}
              </div>
              <a
                href="#contacto"
                className="inline-block font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.15em] text-[var(--accent)] hover:text-[var(--foreground)] transition-colors uppercase"
              >
                Solicitar certificación →
              </a>
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
            <p className="text-sm leading-[1.9] text-[var(--gray-light)] md:mt-3">
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
          {SERVICES.map((service) => (
            <div key={service.title} className="group relative">
              <Card>
                <div className="p-6 md:p-8 h-full hover:bg-[var(--accent)]/[0.03] transition-all duration-500">
                  <div className="flex items-start justify-between mb-6">
                    <ServiceIcon type={service.id} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <h4 className="font-[family-name:var(--font-serif)] text-lg text-[var(--foreground)] mb-4 group-hover:text-[var(--accent)] transition-colors duration-300">
                    {service.title}
                  </h4>

                  <p className="text-xs leading-[1.8] text-[var(--gray-light)] mb-4">
                    {service.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.1em] text-[var(--accent)] bg-[var(--accent)]/[0.06] px-2 py-0.5 rounded">
                      {service.format}
                    </span>
                    <span className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.1em] text-[var(--gray)] bg-[var(--border)]/30 px-2 py-0.5 rounded">
                      {service.audience}
                    </span>
                  </div>

                  <a
                    href="#contacto"
                    aria-label={`Consultar sobre ${service.title}`}
                    className="inline-block mt-6 font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.15em] text-[var(--gray)] group-hover:text-[var(--accent)] transition-colors uppercase"
                  >
                    Consultar →
                  </a>
                </div>
              </Card>
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
    <section id="contacto" className="relative px-6 md:px-16 lg:px-24 py-24 md:py-36 bg-[var(--surface-alt)]">
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

              <p className="text-xs text-[var(--gray-light)] leading-[1.8] mb-10">
                Escribe tu mensaje y conectaremos contigo para explorar cómo
                podemos acompañarte.
              </p>

              {submitted ? (
                <div className="py-12" role="status" aria-live="polite">
                  <div className="font-[family-name:var(--font-geist-mono)] text-sm text-[var(--accent)] mb-2">
                    Mensaje enviado correctamente.
                  </div>
                  <div className="text-xs text-[var(--gray-light)]">
                    Nos pondremos en contacto contigo pronto.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    { id: "nombre", label: "Nombre", type: "text" },
                    { id: "email", label: "Email", type: "email" },
                  ].map((field) => (
                    <div key={field.id} className="relative">
                      <label htmlFor={field.id} className="block font-[family-name:var(--font-geist-mono)] text-xs text-[var(--gray)] mb-2 cursor-pointer">
                        <span className={`transition-colors ${focusedField === field.id ? "text-[var(--accent)]" : ""}`}>{field.label}</span>
                      </label>
                      <input
                        type={field.type}
                        id={field.id}
                        name={field.id}
                        required
                        onFocus={() => setFocusedField(field.id)}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-transparent border-b border-[var(--border)]/20 focus:border-[var(--accent)] text-[var(--foreground)] text-sm py-3 outline-none transition-colors placeholder:text-[var(--border)]"
                        placeholder={`Ingresa tu ${field.label.toLowerCase()}...`}
                      />
                    </div>
                  ))}

                  <div className="relative">
                    <label htmlFor="mensaje" className="block font-[family-name:var(--font-geist-mono)] text-xs text-[var(--gray)] mb-2 cursor-pointer">
                      <span className={`transition-colors ${focusedField === "mensaje" ? "text-[var(--accent)]" : ""}`}>Mensaje</span>
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows={4}
                      required
                      onFocus={() => setFocusedField("mensaje")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-transparent border-b border-[var(--border)]/20 focus:border-[var(--accent)] text-[var(--foreground)] text-sm py-3 outline-none transition-colors resize-none placeholder:text-[var(--border)]"
                      placeholder="Escribe tu mensaje..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="group mt-4 font-[family-name:var(--font-geist-mono)] text-xs tracking-[0.15em] uppercase border border-[var(--border)]/30 hover:border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white px-8 py-4 rounded-lg transition-all duration-500"
                  >
                    Enviar mensaje
                  </button>
                </form>
              )}
            </div>

            {/* Contact info + Social */}
            <div className="flex flex-col gap-10">
              {/* Direct contact */}
              <div>
                <div className="font-[family-name:var(--font-geist-mono)] text-xs tracking-[0.15em] text-[var(--gray)] mb-6 uppercase">
                  Contacto directo
                </div>

                <div className="space-y-4">
                  <a
                    href="https://wa.me/573001234567?text=Hola,%20quiero%20información%20sobre%20Aún%20Humanos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 py-3 border-b border-[var(--border)]/30 hover:border-[var(--accent)] transition-colors"
                  >
                    <span className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.15em] text-[#25D366] w-8">WA</span>
                    <span className="text-sm text-[var(--gray-light)] group-hover:text-[var(--accent)] transition-colors">
                      +57 300 123 4567
                    </span>
                  </a>
                  <a
                    href="mailto:contacto@aunhumanos.com"
                    className="group flex items-center gap-4 py-3 border-b border-[var(--border)]/30 hover:border-[var(--accent)] transition-colors"
                  >
                    <span className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.15em] text-[var(--gray)] w-8">@</span>
                    <span className="text-sm text-[var(--gray-light)] group-hover:text-[var(--accent)] transition-colors">
                      contacto@aunhumanos.com
                    </span>
                  </a>
                  <div className="flex items-center gap-4 py-3 border-b border-[var(--border)]/30">
                    <span className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.15em] text-[var(--gray)] w-8">LOC</span>
                    <span className="text-sm text-[var(--gray-light)]">
                      Medellín, Colombia
                    </span>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div>
                <div className="font-[family-name:var(--font-geist-mono)] text-xs tracking-[0.15em] text-[var(--gray)] mb-4 uppercase">
                  Redes
                </div>
                <div className="flex items-center gap-6">
                  {SOCIALS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${social.label} (abre en nueva pestaña)`}
                      className="font-[family-name:var(--font-geist-mono)] text-xs tracking-[0.15em] text-[var(--gray)] hover:text-[var(--accent)] transition-colors"
                    >
                      {social.symbol}
                    </a>
                  ))}
                </div>
              </div>

              {/* Brand mark */}
              <div className="flex justify-center md:justify-end">
                <BrandMark />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ METRICS BAR ═══════════════════════ */

function MetricsBar() {
  const reveal = useReveal(0.3);
  return (
    <div
      ref={reveal.ref}
      className={`relative py-12 md:py-16 px-6 md:px-16 lg:px-24 bg-[var(--surface)] border-y border-[var(--border)]/30 transition-all duration-1000 ${
        reveal.visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {METRICS.map((m) => (
          <div key={m.label} className="text-center">
            <div className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl lg:text-5xl text-[var(--accent)] font-bold mb-2">
              {m.value}
            </div>
            <div className="font-[family-name:var(--font-geist-mono)] text-xs tracking-[0.15em] text-[var(--gray-light)] uppercase">
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════ PUBLICACIONES ═══════════════════════ */

function Publicaciones() {
  const reveal = useReveal();

  return (
    <section id="publicaciones" className="py-24 md:py-36 px-6">
      <div ref={reveal.ref} className={`max-w-6xl mx-auto transition-all duration-700 ${reveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <SectionHeader>PUBLICACIONES</SectionHeader>

        <p className="text-sm text-[var(--gray-light)] max-w-2xl mt-6 mb-16 leading-relaxed">
          Reflexiones y ensayos de nuestro equipo publicados en medios reconocidos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PUBLICATIONS.map((pub) => (
            <a
              key={pub.title}
              href={pub.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <Card>
                <div className="overflow-hidden">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={pub.image}
                      alt={pub.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.15em] text-[var(--gray)] uppercase">
                        {pub.source}
                      </span>
                      <span className="font-[family-name:var(--font-geist-mono)] text-xs text-[var(--gray)] opacity-40">
                        ↗
                      </span>
                    </div>
                    <h4 className="font-[family-name:var(--font-serif)] text-base text-[var(--foreground)] mb-2 group-hover:text-[var(--accent)] transition-colors duration-300 leading-snug">
                      {pub.title}
                    </h4>
                    <p className="text-xs text-[var(--gray-light)] leading-relaxed mb-3 line-clamp-3">
                      {pub.excerpt}
                    </p>
                    <span className="font-[family-name:var(--font-geist-mono)] text-xs text-[var(--gray)] italic">
                      — {pub.author}
                    </span>
                  </div>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ TESTIMONIOS ═══════════════════════ */

function Testimonios() {
  const reveal = useReveal();

  return (
    <section className="relative px-6 md:px-16 lg:px-24 py-24 md:py-36 bg-[var(--surface)]">
      <div className="max-w-6xl mx-auto">
        <div
          ref={reveal.ref}
          className={`transition-all duration-1000 ${
            reveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionHeader>TESTIMONIOS</SectionHeader>

          <h3 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl text-[var(--foreground)] leading-tight mt-8 mb-16">
            Lo que dicen quienes
            <br />
            <span className="text-[var(--accent)]">han vivido la experiencia.</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <Card key={i}>
                <div className="p-6 md:p-8">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 mb-4 opacity-20" aria-hidden="true">
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.166 11 15c0 1.933-1.567 3.5-3.5 3.5-1.288 0-2.46-.7-2.917-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.69 21 13.166 21 15c0 1.933-1.567 3.5-3.5 3.5-1.288 0-2.46-.7-2.917-1.179z" fill="var(--accent)" />
                  </svg>
                  <p className="text-xs leading-[1.9] text-[var(--gray-light)] mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="border-t border-[var(--border)]/30 pt-4">
                    <div className="font-[family-name:var(--font-serif)] text-sm text-[var(--foreground)]">
                      {t.name}
                    </div>
                    <div className="font-[family-name:var(--font-geist-mono)] text-xs text-[var(--gray)] mt-1">
                      {t.role}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ PRÓXIMO EVENTO ═══════════════════════ */

function ProximoEvento() {
  const reveal = useReveal();

  return (
    <div
      ref={reveal.ref}
      className={`relative px-6 md:px-16 lg:px-24 py-16 md:py-20 bg-[var(--foreground)] text-white transition-all duration-1000 ${
        reveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_auto] gap-10 items-center">
        <div>
          <div className="font-[family-name:var(--font-geist-mono)] text-xs tracking-[0.15em] text-white/50 uppercase mb-4">
            Próximo evento
          </div>
          <h3 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl font-bold mb-3">
            Retiro Triángulo Vital
          </h3>
          <div className="text-sm text-white/70 leading-relaxed mb-6">
            Un día completo de inmersión humana. Reconéctate con tu esencia.
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 font-[family-name:var(--font-geist-mono)] text-xs text-white/50">
            <span>LOC: Medellín, Colombia</span>
            <span>FECHA: Abril 2026</span>
            <span>CUPOS: 15 personas</span>
          </div>
        </div>
        <a
          href="https://wa.me/573001234567?text=Quiero%20reservar%20cupo%20para%20el%20retiro%20Triángulo%20Vital"
          target="_blank"
          rel="noopener noreferrer"
          className="font-[family-name:var(--font-geist-mono)] text-xs tracking-[0.15em] uppercase border border-white/40 hover:bg-white hover:text-[var(--foreground)] px-8 py-4 rounded-lg transition-all duration-500 whitespace-nowrap text-center"
        >
          Reservar cupo
        </a>
      </div>
    </div>
  );
}

/* ═══════════════════════ NEWSLETTER ═══════════════════════ */

function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="px-6 md:px-16 lg:px-24 py-16 bg-[var(--surface-alt)] border-y border-[var(--border)]/30">
      <div className="max-w-2xl mx-auto text-center">
        <div className="font-[family-name:var(--font-geist-mono)] text-xs tracking-[0.15em] text-[var(--gray)] mb-4 uppercase">
          Mantente conectado
        </div>
        <h3 className="font-[family-name:var(--font-serif)] text-2xl md:text-3xl text-[var(--foreground)] mb-3">
          Reflexiones en tu bandeja.
        </h3>
        <p className="text-xs text-[var(--gray-light)] mb-8">
          Recibe artículos, invitaciones a eventos y reflexiones sobre humanismo digital.
        </p>
        {subscribed ? (
          <div className="font-[family-name:var(--font-geist-mono)] text-sm text-[var(--accent)]" role="status" aria-live="polite">
            Suscripción confirmada. Bienvenido al movimiento.
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <label htmlFor="newsletter-email" className="sr-only">Email</label>
            <input
              type="email"
              id="newsletter-email"
              name="newsletter-email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="flex-1 bg-transparent border border-[var(--border)]/30 focus:border-[var(--accent)] text-[var(--foreground)] text-sm px-4 py-3 rounded-lg outline-none transition-colors placeholder:text-[var(--border)]"
            />
            <button
              type="submit"
              className="font-[family-name:var(--font-geist-mono)] text-xs tracking-[0.15em] uppercase border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white px-6 py-3 rounded-lg transition-all duration-500"
            >
              Suscribir
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════ WHATSAPP FLOAT ═══════════════════════ */

function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/573001234567?text=Hola,%20quiero%20información%20sobre%20Aún%20Humanos"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
    >
      <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

/* ═══════════════════════ FOOTER ═══════════════════════ */

function Footer() {
  return (
    <footer className="relative px-6 md:px-16 lg:px-24 py-10 border-t border-[var(--border)]/30">
      {/* Decorative SVG line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <svg viewBox="0 0 80 16" fill="none" className="w-20 h-4" aria-hidden="true">
          <line x1="0" y1="8" x2="30" y2="8" stroke="var(--accent)" strokeWidth="0.5" opacity="0.2" />
          <circle cx="40" cy="8" r="3" stroke="var(--accent)" strokeWidth="0.5" opacity="0.3" />
          <circle cx="40" cy="8" r="1" fill="var(--accent)" opacity="0.4" />
          <line x1="50" y1="8" x2="80" y2="8" stroke="var(--accent)" strokeWidth="0.5" opacity="0.2" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-[family-name:var(--font-geist-mono)] text-xs tracking-[0.15em] text-[var(--gray-light)]">
          © {new Date().getFullYear()} Todos los derechos reservados — Aún Humanos
        </div>

        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.slice(1, 5).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.15em] uppercase text-[var(--gray)] hover:text-[var(--accent)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Back to top */}
        <a
          href="#inicio"
          className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.15em] uppercase text-[var(--gray)] hover:text-[var(--accent)] transition-colors"
          aria-label="Volver al inicio"
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
    <main>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <MetricsBar />
      <SectionDivider />
      <Somos />
      <SectionDivider />
      <TrianguloVital />
      <SectionDivider />
      <HumanismoDigital />
      <SectionDivider />
      <Servicios />
      <SectionDivider />
      <Publicaciones />
      <SectionDivider />
      <Testimonios />
      <ProximoEvento />
      <Newsletter />
      <Contacto />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
