"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import EditorialHeading from "@/components/EditorialHeading";
import { HeroTriangle } from "@/components/illustrations/PageArt";
import BrandMark from "@/components/BrandMark";
import MagneticButton from "@/components/MagneticButton";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import HeroFieldClient from "@/components/HeroFieldClient";
import EngineeringObjectClient from "@/components/EngineeringObjectClient";
import FloatingShapesClient from "@/components/FloatingShapesClient";
import InfoStrip from "@/components/InfoStrip";
import MethodSection from "@/components/MethodSection";
import { useMediaQuery } from "@/lib/useMediaQuery";

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const fieldY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <>
      {/* HERO */}
      <header
        ref={heroRef}
        className="relative overflow-hidden bg-ink py-14 text-ivory sm:py-20 md:py-26"
      >
        <motion.div style={reduceMotion ? undefined : { y: fieldY }} className="absolute inset-0">
          <HeroFieldClient />
        </motion.div>
        <HeroTriangle className="pointer-events-none absolute -right-[6%] -top-[10%] w-[60%] max-w-[520px] rotate-[8deg] opacity-[0.14] max-md:w-[80%] max-md:-right-[20%] max-md:opacity-[0.08]" />

        <motion.div
          style={reduceMotion ? undefined : { y: copyY }}
          className="relative z-10 mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-10 px-5 sm:px-8 md:grid-cols-[1.15fr_0.85fr] md:gap-14"
        >
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-coral">
              Mundiis — Ingénierie informatique, Bénin
            </p>
            <Reveal delay={0.1}>
              <EditorialHeading
                lines={[
                  [{ text: "Vous entrez dans", muted: true }],
                  [{ text: "un empire" }],
                  [{ text: "d'ingénieurs en informatique." }],
                ]}
                className="mt-4 max-w-[15ch] text-balance font-display text-[34px] leading-[1.05] tracking-tight sm:text-[46px] md:text-[64px]"
              />
            </Reveal>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="mt-8 flex flex-wrap items-center gap-6"
            >
              <MagneticButton href="/contact" variant="pill-light">
                Discuter d&rsquo;un projet ↗
              </MagneticButton>
              <p className="max-w-[34ch] text-[14.5px] leading-[1.6] text-ivory/65">
                Matériel, logiciels, IA, conseil et énergie — une seule entreprise d&rsquo;ingénieurs
                pour équiper et faire tourner votre infrastructure.
              </p>
            </motion.div>
          </div>

          <div className="mx-auto w-full max-w-85 md:max-w-none">
            <EngineeringObjectClient />
          </div>
        </motion.div>
      </header>

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
