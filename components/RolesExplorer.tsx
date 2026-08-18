"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import {
  EquipementsIcon,
  LogicielsIcon,
  IaDataIcon,
  ConseilIcon,
} from "@/components/icons/PillarIcons";

const roles = [
  {
    title: "Technique & matériel",
    text: "Installation, maintenance et logistique autour des équipements informatiques.",
    Icon: EquipementsIcon,
  },
  {
    title: "Développement logiciel",
    text: "Construction des solutions digitales sur mesure de nos clients.",
    Icon: LogicielsIcon,
  },
  {
    title: "IA & data",
    text: "Intégration d'intelligence artificielle et exploitation de la donnée.",
    Icon: IaDataIcon,
  },
  {
    title: "Conseil & énergie solaire",
    text: "Accompagnement client et déploiement d'équipements solaires.",
    Icon: ConseilIcon,
  },
];

export default function RolesExplorer() {
  const [active, setActive] = useState(0);
  const role = roles[active];

  return (
    <section className="border-b border-line bg-ivory py-14 sm:py-20 md:py-24">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <Reveal className="mb-9 max-w-[62ch] sm:mb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-coral">
            Profils recherchés
          </p>
          <h2 className="mt-2.5 text-balance font-display text-[26px] font-extrabold tracking-tight sm:text-[32px]">
            Les métiers autour desquels Mundiis recrute
          </h2>
        </Reveal>

        <Reveal>
          <div className="flex flex-wrap gap-px border border-line bg-line">
            {roles.map((r, i) => {
              const isActive = i === active;
              return (
                <button
                  key={r.title}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className={`flex min-w-[150px] flex-1 flex-col items-center gap-2.5 px-4 py-6 text-center transition-colors ${
                    isActive ? "bg-white" : "bg-paper hover:bg-white"
                  }`}
                >
                  <r.Icon className={`h-6 w-6 transition-colors ${isActive ? "text-coral" : "text-ink/35"}`} />
                  <span
                    className={`text-[12.5px] font-semibold transition-colors ${
                      isActive ? "text-ink" : "text-ink/50"
                    }`}
                  >
                    {r.title}
                  </span>
                  {isActive && (
                    <motion.span layoutId="role-tab-underline" className="h-[2px] w-8 bg-coral" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="relative overflow-hidden border-x border-b border-line bg-white px-7 py-10 sm:px-10 sm:py-14">
            <AnimatePresence>
              <motion.div
                key={role.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="grid grid-cols-1 gap-7 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-10"
              >
                <div className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-paper">
                  <role.Icon className="h-7 w-7 text-coral" />
                </div>

                <div>
                  <h3 className="text-balance font-display text-[22px] font-extrabold tracking-tight text-ink sm:text-[26px]">
                    {role.title}
                  </h3>
                  <p className="mt-3 max-w-[62ch] text-[14.5px] leading-[1.65] text-muted">{role.text}</p>
                </div>

                <Link
                  href="/contact"
                  className="cursor-hover inline-flex flex-none items-center justify-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-ivory transition-colors hover:bg-[#24262c]"
                >
                  Postuler →
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
