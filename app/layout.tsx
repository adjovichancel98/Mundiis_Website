import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mundiis — Entreprise technologique",
  description:
    "Mundiis fournit et livre les équipements informatiques dont les entreprises ont besoin, développe leurs logiciels, intègre l'intelligence artificielle et la donnée, les conseille, et les équipe en énergie solaire.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`h-full ${bricolageGrotesque.variable}`}>
      <body className="flex min-h-full flex-col overflow-x-hidden bg-ivory text-ink antialiased">
        <ScrollProgress />
        <CustomCursor />
        <Nav />
        <Marquee />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
