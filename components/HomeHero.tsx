"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import EditorialHeading from "@/components/EditorialHeading";
import { HeroTriangle } from "@/components/illustrations/PageArt";
import MagneticButton from "@/components/MagneticButton";
import Reveal from "@/components/Reveal";
import HeroFieldClient from "@/components/HeroFieldClient";
import EngineeringObjectClient from "@/components/EngineeringObjectClient";
import { useMediaQuery } from "@/lib/useMediaQuery";

export default function HomeHero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const fieldY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <header ref={heroRef} className="relative overflow-hidden bg-ink py-14 text-ivory sm:py-20 md:py-26">
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
              Contacter Mundiis ↗
            </MagneticButton>
            <p className="max-w-[34ch] text-[16px] leading-[1.65] text-ivory/65">
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
  );
}
