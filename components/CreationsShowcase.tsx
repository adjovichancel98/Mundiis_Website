"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import { creationCategories, statusLabels, type CreationStatus } from "@/lib/creations";

const statusStyles: Record<CreationStatus, string> = {
  built: "border-coral bg-coral text-ink",
  progress: "border-coral/50 text-coral",
  concept: "border-border-dark text-ivory/55",
  check: "border-border-dark text-ivory/55",
};

const statusFilters: { key: CreationStatus | "all"; label: string }[] = [
  { key: "all", label: "Tout statut" },
  { key: "built", label: "Construit" },
  { key: "progress", label: "En cours" },
  { key: "concept", label: "Concept" },
  { key: "check", label: "À vérifier" },
];

const allItems = creationCategories.flatMap((category) =>
  category.items.map((item) => ({ ...item, category: category.title })),
);

const categoryFilters = ["Toutes", ...creationCategories.map((c) => c.title)];

export default function CreationsShowcase() {
  const [status, setStatus] = useState<CreationStatus | "all">("all");
  const [category, setCategory] = useState("Toutes");
  const [openName, setOpenName] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      allItems.filter(
        (item) =>
          (status === "all" || item.status === status) &&
          (category === "Toutes" || item.category === category),
      ),
    [status, category],
  );

  const open = allItems.find((i) => i.name === openName) ?? null;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section className="bg-ink py-14 sm:py-20 md:py-24">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <Reveal className="mb-10 flex flex-col gap-4 sm:mb-14">
          <div className="flex flex-wrap gap-2">
            {categoryFilters.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={`cursor-hover border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                  category === c
                    ? "border-ivory bg-ivory text-ink"
                    : "border-border-dark text-ivory/60 hover:border-ivory/50 hover:text-ivory"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {statusFilters.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setStatus(f.key)}
                aria-pressed={status === f.key}
                className={`cursor-hover border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.06em] transition-colors ${
                  status === f.key
                    ? "border-coral bg-coral text-ink"
                    : "border-border-dark text-ivory/50 hover:border-coral hover:text-coral"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ivory/55">
          {filtered.length} produit{filtered.length > 1 ? "s" : ""} — cliquez-en un pour l&rsquo;essayer
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.button
                key={item.name}
                type="button"
                onClick={() => setOpenName(item.name)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="group flex h-full flex-col border border-border-dark p-6 text-left transition-colors duration-300 hover:border-coral/40 hover:bg-ink2 sm:p-7"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-[18px] font-extrabold tracking-tight text-ivory transition-colors group-hover:text-coral sm:text-[20px]">
                    {item.name}
                  </h3>
                  <span
                    className={`flex-none whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.06em] ${statusStyles[item.status]}`}
                  >
                    {statusLabels[item.status]}
                  </span>
                </div>
                <p className="mt-2.5 flex-1 text-[13.5px] leading-[1.6] text-ivory/65">{item.desc}</p>
                <div className="mt-5 flex items-center justify-between border-t border-border-dark pt-3.5">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.06em] text-ivory/55">
                    {item.category}
                  </span>
                  <span className="font-mono text-[11px] text-ivory/55">{item.stack}</span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-5 backdrop-blur-sm"
            onClick={() => setOpenName(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-140 border border-border-dark bg-ink2 p-8 sm:p-10"
            >
              <button
                type="button"
                onClick={() => setOpenName(null)}
                aria-label="Fermer"
                className="cursor-hover absolute right-5 top-5 flex h-8 w-8 items-center justify-center border border-border-dark text-ivory/60 transition-colors hover:border-coral hover:text-coral"
              >
                ✕
              </button>

              <span
                className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.06em] ${statusStyles[open.status]}`}
              >
                {statusLabels[open.status]}
              </span>
              <h3 className="mt-4 font-display text-[28px] font-extrabold tracking-tight text-ivory sm:text-[32px]">
                {open.name}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.7] text-ivory/70">{open.desc}</p>

              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 border-t border-border-dark pt-5 font-mono text-[11px] uppercase tracking-[0.06em] text-ivory/50">
                <span>{open.category}</span>
                <span>{open.stack}</span>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Link
                  href={`/contact?produit=${encodeURIComponent(open.name)}`}
                  className="cursor-hover inline-flex items-center gap-1.5 rounded-full bg-ivory px-5 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-white"
                >
                  Demander une démo →
                </Link>
                <p className="max-w-[32ch] text-[12px] leading-normal text-ivory/50">
                  Pas encore de démo publique en ligne — on vous montre le produit en direct.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
