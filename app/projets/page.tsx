import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProjectsGrid from "@/components/ProjectsGrid";
import SubCta from "@/components/SubCta";
import { LoopArt } from "@/components/illustrations/PageArt";

export const metadata: Metadata = {
  title: "Nos projets — Mundiis",
  description:
    "Des projets d'équipement informatique, de logiciels, d'IA, de conseil et d'énergie solaire menés pour de vrais clients au Bénin, à travers nos cinq métiers.",
};

export default function ProjetsPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos projets"
        title={[[{ text: "Des projets menés", muted: true }], [{ text: "pour de vrais clients" }]]}
        text="Équipements, logiciels, IA & data, conseil, énergie solaire — un aperçu des missions menées métier par métier."
        art={<LoopArt />}
      />

      <ProjectsGrid />

      <SubCta title="Un projet similaire à mener chez vous ?" note="Sur devis" />
    </>
  );
}
