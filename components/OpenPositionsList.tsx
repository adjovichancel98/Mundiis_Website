"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { MouseEvent as ReactMouseEvent } from "react";
import Reveal from "@/components/Reveal";
import { positions } from "@/lib/positions";
import type { Position } from "@/lib/positions";

function ApplyPill() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18 });
  const springY = useSpring(y, { stiffness: 260, damping: 18 });

  function handleMove(e: ReactMouseEvent<HTMLSpanElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.35);
    y.set((e.clientY - r.top - r.height / 2) * 0.45);
  }
  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="cursor-hover inline-flex flex-none items-center gap-2 rounded-full border border-line px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.06em] text-ink transition-colors group-hover:border-coral group-hover:bg-coral group-hover:text-ink"
    >
      Voir le poste →
    </motion.span>
  );
}

function PositionRow({ position, index }: { position: Position; index: number }) {
  return (
    <Reveal delay={index * 0.06}>
      <Link
        href={`/rejoindre/${position.slug}`}
        className="group relative flex flex-col gap-6 overflow-hidden border border-line bg-white px-7 py-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-[0_24px_60px_-28px_rgba(17,18,20,0.28)] sm:flex-row sm:items-center sm:justify-between sm:px-9 sm:py-8"
      >
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-coral transition-transform duration-300 ease-out group-hover:scale-y-100"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-3 top-1/2 hidden -translate-y-1/2 select-none font-display text-[200px] font-extrabold leading-none text-ink/[0.035] transition-colors duration-300 group-hover:text-coral/[0.07] sm:block"
        >
          0{index + 1}
        </span>

        <div className="relative">
          <span className="font-mono text-[11px] font-semibold text-coral">0{index + 1}</span>
          <h3 className="mt-1.5 font-display text-[21px] font-extrabold tracking-tight text-ink transition-colors group-hover:text-coral sm:text-[24px]">
            {position.title}
          </h3>
          <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
            {position.location}
          </p>
          <p className="mt-3 max-w-[58ch] text-[14px] leading-[1.6] text-muted">{position.summary}</p>
        </div>

        <div className="relative">
          <ApplyPill />
        </div>
      </Link>
    </Reveal>
  );
}

export default function OpenPositionsList() {
  return (
    <section className="border-b border-line bg-paper py-14 sm:py-20 md:py-24">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <Reveal className="mb-9 max-w-[62ch] sm:mb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-coral">Postes ouverts</p>
          <h2 className="mt-2.5 text-balance font-display text-[26px] font-extrabold tracking-tight sm:text-[32px]">
            {positions.length} poste{positions.length > 1 ? "s" : ""} à pourvoir en ce moment
          </h2>
        </Reveal>

        <div className="flex flex-col gap-4">
          {positions.map((p, i) => (
            <PositionRow key={p.slug} position={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
