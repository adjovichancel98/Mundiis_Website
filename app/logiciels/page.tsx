import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CoverageGrid from "@/components/CoverageGrid";
import TechStack from "@/components/TechStack";
import RealisationsLink from "@/components/RealisationsLink";
import SubCta from "@/components/SubCta";
import { getPillar } from "@/lib/pillars";
import { LogicielsArt } from "@/components/illustrations/PageArt";

const pillar = getPillar("logiciels")!;

export const metadata: Metadata = {
  title: `${pillar.title} — Mundiis`,
  description: pillar.intro,
};

export default function Page() {
  return (
    <>
      <PageHero eyebrow={pillar.tag} title={pillar.title} text={pillar.intro} art={<LogicielsArt />} />
      <CoverageGrid eyebrow="Ce que ça couvre" title="Des outils construits pour votre usage" items={pillar.coverage} />
      <TechStack />
      <RealisationsLink />
      <SubCta title={pillar.subCta} />
    </>
  );
}
