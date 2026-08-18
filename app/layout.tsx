import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import PageTransition from "@/components/PageTransition";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mundiis — Entreprise technologique",
  description:
    "Mundiis fournit et livre les équipements informatiques dont les entreprises ont besoin, développe leurs logiciels, intègre l'intelligence artificielle et la donnée, les conseille, et les équipe en énergie solaire.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`h-full ${geistSans.variable} ${geistMono.variable}`}>
      <body className="flex min-h-full flex-col overflow-x-hidden bg-ivory text-ink antialiased">
        <ScrollProgress />
        <CustomCursor />
        <Nav />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
