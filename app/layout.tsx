import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grupo Roma | Innovación, Tecnología y Impacto Social",
  description: "Tres visiones, un propósito: transformar el mundo a través de la innovación, tecnología y impacto social.",
  keywords: ["Grupo Roma", "Vortex Studios", "Nexora", "Civitas Humanis", "innovación", "tecnología", "impacto social"],
  authors: [{ name: "Grupo Roma" }],
  openGraph: {
    title: "Grupo Roma | Innovación, Tecnología y Impacto Social",
    description: "Tres visiones, un propósito: transformar el mundo a través de la innovación, tecnología y impacto social.",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grupo Roma | Innovación, Tecnología y Impacto Social",
    description: "Tres visiones, un propósito: transformar el mundo a través de la innovación, tecnología y impacto social.",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black-900 text-white`}
      >
        {children}
      </body>
    </html>
  );
}