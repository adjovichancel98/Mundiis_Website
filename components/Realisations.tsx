import Reveal from "./Reveal";
import type { CaseStudy } from "@/lib/pillars";

export default function Realisations({ items }: { items: CaseStudy[] }) {
  return (
    <section className="border-t border-line bg-ink py-14 text-ivory sm:py-20 md:py-24">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <Reveal className="mb-9 max-w-[62ch] sm:mb-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-coral">Réalisations</p>
          <h2 className="mt-2.5 text-balance font-display text-[26px] font-extrabold tracking-tight sm:text-[32px]">
            Des projets menés pour de vrais clients
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-[3px] overflow-hidden rounded-[14px] border border-line-dark bg-line-dark sm:grid-cols-2">
          {items.map((item, i) => (
            <Reveal key={i} delay={i * 0.08} className="bg-ink2 px-6 py-7 sm:p-8">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-coral">
                {item.client}
              </span>
              <p className="mt-2 text-balance font-display text-[18px] font-extrabold tracking-tight sm:text-[21px]">
                {item.result}
              </p>
              <p className="mt-2.5 text-[13.5px] leading-[1.6] text-ivory/70">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
