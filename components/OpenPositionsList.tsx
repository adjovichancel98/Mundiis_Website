import Link from "next/link";
import Reveal from "@/components/Reveal";
import { positions } from "@/lib/positions";

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

        <Reveal>
          <div className="flex flex-col border-t border-line">
            {positions.map((p) => (
              <Link
                key={p.slug}
                href={`/rejoindre/${p.slug}`}
                className="group flex flex-col gap-3 border-b border-line py-7 transition-colors hover:bg-white sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:py-8"
              >
                <div>
                  <h3 className="font-display text-[19px] font-extrabold tracking-tight text-ink transition-colors group-hover:text-coral sm:text-[21px]">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
                    {p.location}
                  </p>
                  <p className="mt-2.5 max-w-[58ch] text-[14px] leading-[1.6] text-muted">{p.summary}</p>
                </div>
                <span className="inline-flex flex-none items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.08em] text-coral transition-transform group-hover:translate-x-1.5">
                  Voir le poste →
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
