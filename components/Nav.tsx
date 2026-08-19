"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BrandMark from "./BrandMark";

const links = [
  { href: "/apropos", label: "Pourquoi Mundiis" },
  { href: "/services", label: "Nos services" },
  { href: "/projets", label: "Nos projets" },
  { href: "/creations", label: "Mundiis Labs" },
  { href: "/rejoindre", label: "Rejoindre" },
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
    <>
      <div className="fixed inset-x-0 top-3 z-50 px-3 sm:top-5 sm:px-5">
        <nav className="mx-auto flex max-w-225 items-center justify-between gap-6 rounded-full border border-border-dark bg-ink/70 px-4 py-2.5 shadow-[0_10px_34px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:px-6 sm:py-3">
          <Link href="/" className="flex flex-none items-center gap-2">
            <BrandMark className="w-4.75" dotColor="#ff5c39" stemColor="#f3f1ec" />
            <span className="text-[16px] font-extrabold tracking-tight text-ivory">Mundiis</span>
          </Link>

          <ul className="hidden items-center gap-0.5 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="rounded-full px-3.5 py-1.5 text-[13.5px] font-medium text-ivory/65 transition-colors duration-300 hover:bg-white/8 hover:text-ivory"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            data-cursor-plain
            className="flex h-8 flex-none items-center gap-2 rounded-full border border-border-dark pl-3.5 pr-3 text-ivory md:hidden"
          >
            <span className="text-[12.5px] font-medium">{open ? "Fermer" : "Menu"}</span>
            <span className="flex h-4 w-4 flex-none flex-col items-center justify-center gap-1.25">
              <motion.span
                animate={open ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
                className="h-[1.4px] w-4 bg-ivory"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
                className="h-[1.4px] w-4 bg-ivory"
              />
            </span>
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-20 z-40 overflow-y-auto bg-ink2 text-ivory md:hidden"
          >
            <div className="mx-auto flex max-w-[1180px] flex-col gap-10 px-5 py-10 sm:px-8 sm:py-16">
              <ul className="flex flex-col gap-1.5">
                {links.map((l, i) => (
                  <li key={l.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1], delay: i * 0.04 }}
                    >
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="block py-2 font-display text-[28px] font-extrabold tracking-tight text-ivory/85 transition-colors hover:text-coral"
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
    </>
  );
}
