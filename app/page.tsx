import type { Metadata } from "next";
import BrandMark from "@/components/BrandMark";
import EditorialHeading from "@/components/EditorialHeading";
import MagneticButton from "@/components/MagneticButton";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import FloatingShapesClient from "@/components/FloatingShapesClient";
import InfoStrip from "@/components/InfoStrip";
import MethodSection from "@/components/MethodSection";
import HomeHero from "@/components/HomeHero";

export const metadata: Metadata = {
  title: "Mundiis — Équipements informatiques, logiciels, IA & énergie solaire au Bénin",
  description:
    "Mundiis fournit et installe des équipements informatiques, développe des logiciels, intègre l'intelligence artificielle et l'énergie solaire pour les entreprises à Cotonou et dans tout le Bénin. Un seul partenaire technologique.",
};

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <InfoStrip />

      <MethodSection />

      {/* STATS */}
      <section className="relative overflow-hidden border-b border-border-dark bg-ink2 py-14 sm:py-20 md:py-24">
        <FloatingShapesClient />
        <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <div className="grid grid-cols-1 gap-px overflow-hidden border border-border-dark bg-white/10 sm:grid-cols-3">
              <div className="flex flex-col items-center gap-2 bg-ink px-6 py-9 text-center sm:py-11">
                <Counter
                  target={5}
                  className="font-display text-[42px] font-extrabold tracking-tight tabular-nums text-ivory sm:text-[56px]"
                />
                <span className="text-[13px] text-ivory/60">Métiers réunis chez Mundiis</span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-ink px-6 py-9 text-center sm:py-11">
                <Counter
                  target={1}
                  className="font-display text-[42px] font-extrabold tracking-tight tabular-nums text-ivory sm:text-[56px]"
                />
                <span className="text-[13px] text-ivory/60">Entreprise, un seul interlocuteur</span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-ink px-6 py-9 text-center sm:py-11">
                <span className="font-display text-[42px] font-extrabold tracking-tight text-ivory sm:text-[56px]">
                  Bénin
                </span>
                <span className="text-[13px] text-ivory/60">Ancrage local</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-coral py-14 sm:py-20 md:py-24">
        <BrandMark
          dotColor="#111214"
          stemColor="#111214"
          className="pointer-events-none absolute -bottom-10 -right-8 w-[160px] rotate-[10deg] opacity-[0.08] sm:w-[220px]"
        />
        <Reveal className="relative mx-auto max-w-[1180px] px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink">Parlons-en</p>
              <EditorialHeading
                tone="light"
                as="h2"
                lines={[[{ text: "Un projet à équiper," }], [{ text: "à digitaliser, ou à alimenter ?" }]]}
                className="mt-2.5 max-w-[18ch] text-balance font-display text-[26px] leading-[1.15] tracking-tight sm:text-[40px]"
              />
              <p className="mt-3 max-w-[42ch] text-[15px] text-ink/72">
                Décrivez votre besoin — matériel, logiciel, IA, conseil ou énergie solaire.
              </p>
            </div>
            <MagneticButton href="/contact" variant="pill-dark">
              Contacter Mundiis ↗
            </MagneticButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
