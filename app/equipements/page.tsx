import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CoverageGrid from "@/components/CoverageGrid";
import Spotlight from "@/components/Spotlight";
import RealisationsLink from "@/components/RealisationsLink";
import SubCta from "@/components/SubCta";
import { getPillar } from "@/lib/pillars";
import { EquipementsArt, DeliveryArt } from "@/components/illustrations/PageArt";

const pillar = getPillar("equipements")!;

export const metadata: Metadata = {
  title: `${pillar.title} — Mundiis`,
  description: pillar.metaDescription,
};

export default function Page() {
  return (
    <>
      <PageHero eyebrow={pillar.tag} title={pillar.title} text={pillar.intro} art={<EquipementsArt />} />
      <CoverageGrid eyebrow="Ce que ça couvre" title="Du poste de travail à l'infrastructure" items={pillar.coverage} />
      <Spotlight title={pillar.spotlight.title} text={pillar.spotlight.text} art={<DeliveryArt />} />
      <RealisationsLink />
      <SubCta title={pillar.subCta} note="Sur devis" />
    </>
  );
}
