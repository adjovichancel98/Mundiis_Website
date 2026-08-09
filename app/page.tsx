"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import KineticHeading from "@/components/KineticHeading";
import HeroMark from "@/components/HeroMark";
import { HeroTriangle } from "@/components/illustrations/PageArt";
import MagneticButton from "@/components/MagneticButton";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import { pillars } from "@/lib/pillars";
import { pillarIcons } from "@/components/icons/PillarIcons";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <header className="relative overflow-hidden bg-ink py-14 text-ivory sm:py-20 md:py-[116px]">
        <HeroTriangle className="pointer-events-none absolute -right-[6%] -top-[10%] w-[60%] max-w-[520px] rotate-[8deg] opacity-[0.14] max-md:w-[80%] max-md:-right-[20%] max-md:opacity-[0.08]" />
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-8 px-5 sm:px-8 md:grid-cols-[1.15fr_0.85fr] md:gap-14">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-coral">
              Mundiis — Entreprise technologique, Bénin
            </p>
            <KineticHeading
              text="Le matériel, le logiciel et l'énergie dont votre entreprise a besoin — reliés chez un seul partenaire."
              className="mt-4 max-w-[17ch] text-balance font-display text-[32px] font-extrabold leading-[1.1] tracking-tight text-ivory sm:text-[42px] md:text-[60px]"
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="mt-5 max-w-[52ch] text-[16px] leading-[1.65] text-ivory/72 sm:text-[18px]"
            >
              Mundiis fournit et livre les équipements informatiques dont les entreprises ont
              besoin, développe leurs logiciels, intègre l&rsquo;intelligence artificielle et la
              donnée, les conseille, et les équipe en énergie solaire.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.7 }}
              className="mt-7 flex flex-wrap gap-3.5"
            >
              <MagneticButton href="/contact" variant="primary">
                Discuter d&rsquo;un projet
              </MagneticButton>
              <MagneticButton href="/apropos" variant="ghost">
                Pourquoi Mundiis ↓
              </MagneticButton>
            </motion.div>
          </div>
          <HeroMark />
        </div>
      </header>

      {/* PILLARS */}
      <section className="border-y border-line bg-ivory py-14 sm:py-20 md:py-24" id="pillars">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal className="mb-9 max-w-[62ch] sm:mb-14">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-coral">
              Ce que nous faisons
            </p>
            <h2 className="mt-2.5 text-balance font-display text-[26px] font-extrabold tracking-tight sm:text-[32px]">
              Cinq métiers, une seule entreprise
            </h2>
            <p className="mt-3.5 text-[15.5px] leading-[1.65] text-muted">
              Cliquez une activité pour voir en détail ce qu&rsquo;elle couvre.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-[3px] overflow-hidden rounded-[14px] border border-line bg-line sm:grid-cols-6">
            {pillars.map((p, i) => {
              const Icon = pillarIcons[p.slug];
              const lead = i === 0;
              return (
                <Reveal
                  key={p.slug}
                  delay={i * 0.07}
                  className={lead || i === 1 ? "sm:col-span-3" : "sm:col-span-2"}
                >
                  <Link
                    href={`/${p.slug}`}
                    className={`group flex h-full cursor-pointer flex-col gap-3.5 p-6 transition-colors sm:p-8 ${
                      lead ? "bg-ink text-ivory hover:bg-[#1B1D22]" : "bg-paper hover:bg-white"
                    }`}
                  >
                    <span
                      className={`font-mono text-[10.5px] uppercase tracking-[0.1em] ${lead ? "text-coral" : "text-muted"}`}
                    >
                      {p.tag}
                    </span>
                    <Icon
                      className={`h-8 w-8 transition-transform duration-300 group-hover:scale-[1.12] group-hover:-rotate-[4deg] ${lead ? "text-coral" : "text-ink"}`}
                    />
                    <h3
                      className={`font-display text-[18.5px] font-extrabold tracking-tight ${lead ? "text-ivory" : ""}`}
                    >
                      {p.title}
                    </h3>
                    <p className={`text-[13.5px] leading-[1.6] ${lead ? "text-ivory/70" : "text-muted"}`}>
                      {p.intro}
                    </p>
                    <span className="mt-auto pt-1 font-mono text-[11px] tracking-[0.05em] text-coral">
                      Voir l&rsquo;activité →
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-line bg-paper py-14 sm:py-20 md:py-24">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal>
            <div className="grid grid-cols-1 gap-[3px] overflow-hidden rounded-[14px] border border-line bg-line sm:grid-cols-3">
              <div className="flex flex-col items-center gap-2 bg-ivory px-6 py-9 text-center sm:py-11">
                <Counter
                  target={5}
                  className="font-display text-[42px] font-extrabold tracking-tight tabular-nums sm:text-[56px]"
                />
                <span className="text-[13px] text-muted">Métiers réunis chez Mundiis</span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-ivory px-6 py-9 text-center sm:py-11">
                <Counter
                  target={1}
                  className="font-display text-[42px] font-extrabold tracking-tight tabular-nums sm:text-[56px]"
                />
                <span className="text-[13px] text-muted">Entreprise, un seul interlocuteur</span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-ivory px-6 py-9 text-center sm:py-11">
                <span className="font-display text-[42px] font-extrabold tracking-tight sm:text-[56px]">
                  Bénin
                </span>
                <span className="text-[13px] text-muted">Ancrage local</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-coral py-14 sm:py-20 md:py-24">
        <Reveal className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink">Parlons-en</p>
              <h2 className="mt-2.5 max-w-[16ch] text-balance font-display text-[26px] font-extrabold tracking-tight sm:text-[40px]">
                Un projet à équiper, à digitaliser, ou à alimenter ?
              </h2>
              <p className="mt-3 max-w-[42ch] text-[15px] text-ink/72">
                Décrivez votre besoin — matériel, logiciel, IA, conseil ou énergie solaire.
              </p>
            </div>
            <MagneticButton href="/contact" variant="ink">
              Contacter Mundiis
            </MagneticButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
