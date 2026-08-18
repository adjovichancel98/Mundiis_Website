import type { ReactNode } from "react";
import Reveal from "./Reveal";
import { StaticHeroField } from "./HeroFieldClient";
import EditorialHeading, { type Segment } from "./EditorialHeading";

export default function PageHero({
  eyebrow,
  title,
  text,
  art,
}: {
  eyebrow: string;
  title: string | Segment[][];
  text: string;
  art?: ReactNode;
}) {
  const lines = typeof title === "string" ? [[{ text: title }]] : title;

  return (
    <header className="relative overflow-hidden bg-ink px-0 py-12 text-ivory sm:py-16 md:py-21">
      <div className="absolute inset-0">
        <StaticHeroField />
      </div>
      <div className="relative z-10 mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-8 px-5 sm:px-8 md:grid-cols-[1.1fr_0.9fr] md:gap-14">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-coral">{eyebrow}</p>
          <EditorialHeading
            lines={lines}
            className="mt-3.5 max-w-[15ch] text-balance font-display text-[34px] leading-[1.05] tracking-tight sm:text-[46px] md:text-[64px]"
          />
          <p className="mt-4 max-w-[50ch] text-[15.5px] leading-[1.65] text-ivory/70">{text}</p>
        </Reveal>
        {art && (
          <Reveal delay={0.1} className="flex items-center justify-center">
            <div className="w-full max-w-[340px]">{art}</div>
          </Reveal>
        )}
      </div>
    </header>
  );
}
