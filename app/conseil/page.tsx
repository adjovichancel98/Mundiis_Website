import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CoverageGrid from "@/components/CoverageGrid";
import Spotlight from "@/components/Spotlight";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import RealisationsLink from "@/components/RealisationsLink";
import SubCta from "@/components/SubCta";
import { getPillar } from "@/lib/pillars";
import { ConseilArt, FormationArt } from "@/components/illustrations/PageArt";

const pillar = getPillar("conseil")!;

const formationPhases = [
  {
    wk: "Sem. 1-3",
    title: "Fondations",
    text: "Comprendre ce qu'est réellement l'IA, ses usages et ses limites.",
  },
  {
    wk: "Sem. 4-6",
    title: "Outils au quotidien",
    text: "Prise en main des assistants IA sur des tâches métier concrètes.",
  },
  {
    wk: "Sem. 7-9",
    title: "Cas d'usage métier",
    text: "Application aux processus réels de l'organisation.",
  },
  {
    wk: "Sem. 10-12",
    title: "Autonomie & déploiement",
    text: "Ancrer les pratiques et outiller les équipes dans la durée.",
  },
];

export const metadata: Metadata = {
  title: `${pillar.title} — Mundiis`,
  description: pillar.intro,
};

export default function Page() {
  return (
    <>
      <PageHero eyebrow={pillar.tag} title={pillar.title} text={pillar.intro} art={<ConseilArt />} />
      <CoverageGrid eyebrow="Ce que ça couvre" title="Avant d'acheter, comprendre" items={pillar.coverage} />
      <Spotlight title={pillar.spotlight.title} text={pillar.spotlight.text} art={<FormationArt />} />

      {/* FORMATION IA */}
      <section className="border-t border-line bg-paper py-14 sm:py-20 md:py-24">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-8 px-5 sm:px-8 md:grid-cols-2 md:gap-16">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-coral">Formation</p>
            <h2 className="mt-2.5 text-balance font-display text-[24px] font-extrabold tracking-tight sm:text-[30px]">
              Former vos équipes à l&rsquo;intelligence artificielle
            </h2>
            <p className="mt-3.5 max-w-[52ch] text-[14.5px] leading-[1.65] text-muted">
              Un programme structuré pour amener des équipes non techniques — banques,
              institutions, PME — à comprendre et utiliser l&rsquo;IA dans leur métier au
              quotidien. Progressif, concret, ancré dans vos cas réels.
            </p>
            <MagneticButton href="/contact" variant="ghost-ink" className="mt-7">
              Demander le programme
            </MagneticButton>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col">
            {formationPhases.map((phase) => (
              <div key={phase.wk} className="grid grid-cols-[86px_1fr] gap-4 border-t border-line py-4 last:border-b">
                <span className="pt-0.5 font-mono text-[12px] text-coral">{phase.wk}</span>
                <div>
                  <h3 className="text-[14.5px] font-semibold">{phase.title}</h3>
                  <p className="mt-0.5 text-[13px] leading-[1.55] text-muted">{phase.text}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <RealisationsLink />
      <SubCta title={pillar.subCta} />
    </>
  );
}
