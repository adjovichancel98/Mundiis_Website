import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CoverageGrid from "@/components/CoverageGrid";
import Spotlight from "@/components/Spotlight";
import Realisations from "@/components/Realisations";
import SubCta from "@/components/SubCta";
import { getPillar } from "@/lib/pillars";
import { ConseilArt, FormationArt } from "@/components/illustrations/PageArt";

const pillar = getPillar("conseil")!;

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
      <Realisations items={pillar.caseStudies} />
      <SubCta title={pillar.subCta} />
    </>
  );
}
