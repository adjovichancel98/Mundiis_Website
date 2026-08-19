import Reveal from "./Reveal";
import { labs } from "@/lib/labs";

export default function LabsGrid() {
  return (
    <section className="border-t border-line bg-ink py-14 text-ivory sm:py-20 md:py-24">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <Reveal className="mb-9 max-w-[62ch] sm:mb-14">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-line-dark px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ivory/60">
            <span className="h-1.5 w-1.5 rounded-full bg-coral" />
            En développement — non commercialisés
          </span>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-coral">
            Mundiis Labs
          </p>
          <h2 className="mt-2.5 text-balance font-display text-[26px] font-extrabold tracking-tight text-ivory sm:text-[32px]">
            Nos produits en construction
          </h2>
          <p className="mt-3.5 max-w-[62ch] text-[17px] leading-[1.7] text-ivory/70">
            Une partie de Mundiis invente ses propres outils. Voici sur quoi l&rsquo;équipe
            travaille en ce moment.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-px border border-line-dark bg-line-dark sm:grid-cols-3">
          {labs.map((lab, i) => (
            <Reveal key={lab.title} delay={i * 0.08} className="bg-ink2 px-6 py-7 sm:p-8">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-coral">
                {lab.status}
              </span>
              <h3 className="mb-1.5 mt-3.5 font-display text-[19px] font-extrabold tracking-tight text-ivory">
                {lab.title}
              </h3>
              <p className="text-[15px] leading-[1.65] text-ivory/68">{lab.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
