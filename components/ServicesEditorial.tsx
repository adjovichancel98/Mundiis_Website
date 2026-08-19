import Link from "next/link";
import Reveal from "@/components/Reveal";
import { pillars } from "@/lib/pillars";
import { pillarIcons } from "@/components/icons/PillarIcons";

export default function ServicesEditorial() {
  return (
    <section className="bg-ink py-8 sm:py-12">
      <div className="mx-auto max-w-[860px] px-5 sm:px-8">
        {pillars.map((p, i) => {
          const Icon = pillarIcons[p.slug];
          return (
            <Reveal key={p.slug} delay={i * 0.05}>
              <Link
                href={`/${p.slug}`}
                className="group flex flex-col gap-5 border-t border-border-dark py-12 transition-colors duration-300 last:border-b sm:flex-row sm:items-start sm:gap-10 sm:py-16"
              >
                <Icon className="h-8 w-8 flex-none text-coral/40 transition-colors duration-300 group-hover:text-coral sm:mt-2 sm:h-10 sm:w-10" />
                <div>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ivory/55">
                    {p.tag}
                  </span>
                  <h3 className="mt-3 text-balance font-display text-[30px] font-extrabold tracking-tight text-ivory transition-colors duration-300 group-hover:text-coral sm:text-[42px]">
                    {p.title}
                  </h3>
                  <p className="mt-4 max-w-[62ch] text-[17px] leading-[1.8] text-ivory/60">
                    {p.intro}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.08em] text-coral opacity-0 transition-all duration-300 group-hover:translate-x-1.5 group-hover:opacity-100">
                    Découvrir →
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
