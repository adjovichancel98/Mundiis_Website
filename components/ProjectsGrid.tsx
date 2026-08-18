"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { pillars } from "@/lib/pillars";
import { pillarIcons } from "@/components/icons/PillarIcons";

const allProjects = pillars.flatMap((p) =>
  p.caseStudies.map((cs) => ({ ...cs, pillarSlug: p.slug, pillarTitle: p.title })),
);

const categories = ["Tous", ...pillars.map((p) => p.title)];

export default function ProjectsGrid() {
  const [category, setCategory] = useState("Tous");

  const filtered = useMemo(
    () => (category === "Tous" ? allProjects : allProjects.filter((p) => p.pillarTitle === category)),
    [category],
  );

  return (
    <section className="py-14 sm:py-20 md:py-24">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <Reveal className="mb-8 flex flex-wrap gap-2 sm:mb-12">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`cursor-hover border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                category === c
                  ? "border-ink bg-ink text-ivory"
                  : "border-line text-ink/60 hover:border-ink/50 hover:text-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </Reveal>

        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          {filtered.length} projet{filtered.length > 1 ? "s" : ""}
        </p>

        <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
          <AnimatePresence>
            {filtered.map((item) => {
              const Icon = pillarIcons[item.pillarSlug];
              return (
                <motion.div
                  key={`${item.pillarSlug}-${item.client}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="bg-paper px-6 py-7 transition-colors hover:bg-white sm:p-8"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 flex-none text-coral" />
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-coral">
                      {item.pillarTitle}
                    </span>
                  </div>
                  <p className="mt-3.5 text-[13px] font-semibold text-ink/60">{item.client}</p>
                  <p className="mt-1 text-balance font-display text-[19px] font-extrabold tracking-tight sm:text-[21px]">
                    {item.result}
                  </p>
                  <p className="mt-2.5 text-[14px] leading-[1.6] text-muted">{item.text}</p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
