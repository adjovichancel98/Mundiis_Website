import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function PageHero({
  eyebrow,
  title,
  text,
  art,
}: {
  eyebrow: string;
  title: string;
  text: string;
  art?: ReactNode;
}) {
  return (
    <header className="bg-ink px-0 py-12 text-ivory sm:py-16 md:py-[84px]">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-8 px-5 sm:px-8 md:grid-cols-[1.1fr_0.9fr] md:gap-14">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-coral">{eyebrow}</p>
          <h1 className="mt-3.5 max-w-[15ch] text-balance font-display text-[30px] font-extrabold leading-[1.1] tracking-tight text-ivory sm:text-[38px] md:text-[56px]">
            {title}
          </h1>
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
