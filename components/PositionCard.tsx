import Reveal from "@/components/Reveal";
import EditorialHeading from "@/components/EditorialHeading";
import MagneticButton from "@/components/MagneticButton";
import type { Position } from "@/lib/positions";

const APPLY_EMAIL = "contact@mundiis.com";

export default function PositionCard({ position }: { position: Position }) {
  const applyHref = `mailto:${APPLY_EMAIL}?subject=${encodeURIComponent(`Candidature — ${position.title}`)}`;

  return (
    <Reveal delay={0.05}>
      <div className="relative overflow-hidden border border-line bg-white shadow-[0_40px_90px_-30px_rgba(17,18,20,0.18)]">
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-coral" />

        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px]">
          <div className="p-7 pt-10 sm:p-12 sm:pt-14 md:p-14">
            <EditorialHeading
              tone="light"
              as="h1"
              lines={[[{ text: position.title }]]}
              className="text-balance font-display text-[32px] leading-[1.05] tracking-tight sm:text-[46px] md:text-[54px]"
            />
            <p className="mt-3.5 font-mono text-[12px] uppercase tracking-[0.1em] text-muted">
              {position.location}
            </p>

            <div className="mt-10 flex flex-col divide-y divide-line border-t border-line">
              {position.sections.map((s, i) => (
                <div key={s.title} className="py-8 sm:py-10">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[12px] font-semibold text-coral-text">0{i + 1}</span>
                    <h2 className="font-display text-[18px] font-extrabold tracking-tight text-ink sm:text-[20px]">
                      {s.title}
                    </h2>
                  </div>
                  <ul className="mt-4 flex flex-col gap-2.5 pl-[30px]">
                    {s.items.map((item) => (
                      <li key={item} className="flex gap-3 text-[16px] leading-[1.7] text-muted">
                        <span className="mt-[9px] h-[3px] w-[3px] flex-none rounded-full bg-coral" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-line bg-ink p-7 text-ivory sm:p-10 md:border-l md:border-t-0">
            <div className="flex flex-col gap-8 md:sticky md:top-28">
              <div>
                <h3 className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ivory/50">
                  Candidature
                </h3>
                <p className="mt-3 max-w-[26ch] text-[15.5px] leading-[1.65] text-ivory/70">
                  CV et lettre de motivation à envoyer à
                </p>
                <a
                  href={applyHref}
                  className="cursor-hover mt-2 inline-block break-all text-[14.5px] font-semibold text-ivory underline decoration-white/25 underline-offset-4 transition-colors hover:text-coral hover:decoration-coral"
                >
                  {APPLY_EMAIL}
                </a>
              </div>
              <MagneticButton href={applyHref} variant="pill-light" className="w-fit">
                Postuler →
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
