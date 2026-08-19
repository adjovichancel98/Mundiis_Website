import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";

export default function SubCta({ title, note }: { title: string; note?: string }) {
  return (
    <section className="border-t border-line bg-paper py-14 sm:py-16">
      <Reveal className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="max-w-[20ch] text-balance font-display text-[22px] font-extrabold tracking-tight sm:text-[30px]">
              {title}
            </h2>
            {note ? (
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{note}</p>
            ) : null}
          </div>
          <MagneticButton href="/contact" variant="ghost-ink">
            Contacter Mundiis
          </MagneticButton>
        </div>
      </Reveal>
    </section>
  );
}
