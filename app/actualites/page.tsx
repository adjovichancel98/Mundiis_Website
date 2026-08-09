import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SubCta from "@/components/SubCta";

export const metadata: Metadata = {
  title: "Actualités — Mundiis",
  description: "Les annonces, projets et actualités de Mundiis.",
};

export default function ActualitesPage() {
  return (
    <>
      <header className="bg-ink py-14 text-ivory sm:py-16 md:py-[84px]">
        <Reveal className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-coral">Actualités</p>
          <h1 className="mt-3.5 max-w-[15ch] text-balance font-display text-[30px] font-extrabold leading-[1.1] tracking-tight text-ivory sm:text-[38px] md:text-[56px]">
            Les nouvelles de Mundiis
          </h1>
          <p className="mt-4 max-w-[50ch] text-[15.5px] leading-[1.65] text-ivory/70">
            Cette rubrique accueillera les annonces, projets et actualités de l&rsquo;entreprise au
            fil de leur publication.
          </p>
        </Reveal>
      </header>

      <section className="py-14 sm:py-20 md:py-24">
        <Reveal className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <div className="flex items-start gap-3.5 rounded-[14px] border border-line bg-paper px-6 py-6">
            <span className="mt-[7px] h-2 w-2 flex-none rounded-full bg-coral" />
            <div>
              <h3 className="mb-1 text-[15.5px] font-semibold">Bientôt disponible</h3>
              <p className="text-[13.5px] leading-[1.55] text-muted">
                Aucune actualité publiée pour le moment — revenez prochainement, ou suivez Mundiis
                pour être informé dès la première publication.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <SubCta title="Une actualité à nous transmettre ?" />
    </>
  );
}
