import Link from "next/link";
import Reveal from "./Reveal";

export default function RealisationsLink() {
  return (
    <section className="border-t border-line bg-paper py-10 sm:py-12">
      <Reveal className="mx-auto flex max-w-[1180px] flex-col items-start gap-3 px-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-8">
        <p className="text-[14.5px] text-muted">Envie de voir des exemples concrets ?</p>
        <Link
          href="/projets"
          className="cursor-hover inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.08em] text-ink transition-colors hover:text-coral"
        >
          Voir nos réalisations →
        </Link>
      </Reveal>
    </section>
  );
}
