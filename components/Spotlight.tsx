import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function Spotlight({
  title,
  text,
  art,
}: {
  title: string;
  text: string;
  art: ReactNode;
}) {
  return (
    <section className="border-t border-line bg-paper py-14 sm:py-20 md:py-24">
      <Reveal className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-8 sm:grid-cols-[0.6fr_1fr] sm:gap-14">
          <div className="mx-auto w-full max-w-[220px] sm:max-w-none sm:w-3/5">{art}</div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-coral-text">Zoom sur un point</p>
            <h2 className="mt-2.5 text-balance font-display text-[22px] font-extrabold tracking-tight sm:text-[30px]">
              {title}
            </h2>
            <p className="mt-3.5 max-w-[58ch] text-[14.5px] leading-[1.65] text-muted">{text}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
