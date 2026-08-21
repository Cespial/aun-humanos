import type { Metadata } from "next";
import { DM_Sans, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const EN_DOMINIO_REAL = (process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "").includes("aunhumanos.com");

export const metadata: Metadata = {
  title: {
    default: "Aún Humanos",
    template: "%s — Aún Humanos",
  },
  description:
    "Movimiento filosófico. Pensamos en público la relación entre la técnica y lo humano: aquí vive todo lo que escribimos.",
  // Mientras viva solo en *.vercel.app es una propuesta y no debe indexarse.
  // Cuando el dominio aunhumanos.com quede atado al proyecto (y se redespliegue),
  // Vercel expone VERCEL_PROJECT_PRODUCTION_URL=aunhumanos.com y el sitio pasa a indexarse.
  robots: EN_DOMINIO_REAL ? { index: true, follow: true } : { index: false, follow: false },
  metadataBase: new URL(EN_DOMINIO_REAL ? "https://www.aunhumanos.com" : "https://aunhumanos-v2.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${dmSans.variable} ${geistMono.variable} ${instrument.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-ink focus:text-paper focus:px-4 focus:py-2 focus:mono focus:text-xs"
        >
          Saltar al contenido
        </a>
        <Nav />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
