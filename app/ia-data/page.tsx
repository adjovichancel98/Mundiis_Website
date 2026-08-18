import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CoverageGrid from "@/components/CoverageGrid";
import Spotlight from "@/components/Spotlight";
import RealisationsLink from "@/components/RealisationsLink";
import SubCta from "@/components/SubCta";
import { getPillar } from "@/lib/pillars";
import { IaDataArt, PilotArt } from "@/components/illustrations/PageArt";

const pillar = getPillar("ia-data")!;

export const metadata: Metadata = {
  title: `${pillar.title} — Mundiis`,
  description: pillar.intro,
};

export default function Page() {
  return (
    <>
      <PageHero eyebrow={pillar.tag} title={pillar.title} text={pillar.intro} art={<IaDataArt />} />
      <CoverageGrid
        eyebrow="Ce que ça couvre"
        title="Rendre l'IA et la donnée utiles, pas juste présentes"
        items={pillar.coverage}
      />
      <Spotlight title={pillar.spotlight.title} text={pillar.spotlight.text} art={<PilotArt />} />
      <RealisationsLink />
      <SubCta title={pillar.subCta} />
    </>
  );
}
