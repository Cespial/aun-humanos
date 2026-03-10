import type { Metadata } from "next";
import { Geist_Mono, Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const sans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const serif = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Aún Humanos — Movimiento Filosófico",
  description:
    "Un movimiento filosófico y práctico que emerge como respuesta a los desafíos contemporáneos derivados de la acelerada evolución tecnológica.",
  keywords: ["filosofía", "humanismo digital", "tecnología", "Felipe Jaramillo"],
  openGraph: {
    title: "Aún Humanos — Movimiento Filosófico",
    description:
      "Reflexión profunda y acción consciente en torno a lo que significa ser humano en la era tecnológica.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${sans.variable} ${mono.variable} ${serif.variable} antialiased`}>
        <div className="crt-overlay" />
        {children}
      </body>
    </html>
  );
}
