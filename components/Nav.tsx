"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BrandMark from "./BrandMark";
import MagneticButton from "./MagneticButton";
import { pillars } from "@/lib/pillars";

const links = [
  { href: "/apropos", label: "Pourquoi Mundiis" },
  { href: "/rejoindre", label: "Rejoindre" },
  { href: "/actualites", label: "Actualités" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-ivory/86 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5" data-cursor-label="Accueil">
          <BrandMark className="w-[22px]" />
          <span className="text-[19px] font-extrabold tracking-tight">Mundiis</span>
        </Link>

        <div className="flex items-center gap-5">
          <div className="hidden sm:block">
            <MagneticButton href="/contact" variant="ghost-ink">
              Contact
            </MagneticButton>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="cursor-hover flex h-10 w-10 flex-none flex-col items-center justify-center gap-[5px] rounded-full border border-line"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
              className="h-[1.4px] w-4 bg-ink"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
              className="h-[1.4px] w-4 bg-ink"
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[65px] z-40 overflow-y-auto bg-ink text-ivory"
          >
            <div className="mx-auto flex max-w-[1180px] flex-col gap-10 px-5 py-10 sm:px-8 sm:py-16 md:flex-row md:justify-between">
              <ul className="flex flex-col gap-1.5">
                {pillars.map((p, i) => (
                  <li key={p.slug} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1], delay: i * 0.04 }}
                    >
                      <Link
                        href={`/${p.slug}`}
                        data-cursor-label="Voir"
                        onClick={() => setOpen(false)}
                        className="group flex items-baseline gap-4 py-2 font-display text-[32px] font-extrabold tracking-tight text-ivory/85 transition-colors hover:text-coral sm:text-[46px]"
                      >
                        <span className="font-mono text-[13px] font-normal text-ivory/40 group-hover:text-coral">
                          0{i + 1}
                        </span>
                        {p.title}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>

              <ul className="flex flex-col gap-1.5 md:items-end">
                {links.map((l, i) => (
                  <li key={l.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1], delay: 0.15 + i * 0.04 }}
                    >
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="font-mono text-[13px] uppercase tracking-[0.1em] text-ivory/60 transition-colors hover:text-coral"
                      >
                        {l.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
