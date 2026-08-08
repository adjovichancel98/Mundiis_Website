import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CoverageGrid from "@/components/CoverageGrid";
import SubCta from "@/components/SubCta";
import RejoindreArt3D from "@/components/illustrations/RejoindreArt3D";

export const metadata: Metadata = {
  title: "Rejoindre Mundiis",
  description:
    "Mundiis regroupe des équipes techniques, des développeurs, des spécialistes IA & data, des consultants et des techniciens solaires.",
};

const roles = [
  {
    title: "Technique & matériel",
    text: "Installation, maintenance et logistique autour des équipements informatiques.",
  },
  {
    title: "Développement logiciel",
    text: "Construction des solutions digitales sur mesure de nos clients.",
  },
  {
    title: "IA & data",
    text: "Intégration d'intelligence artificielle et exploitation de la donnée.",
  },
  {
    title: "Conseil & énergie solaire",
    text: "Accompagnement client et déploiement d'équipements solaires.",
  },
];

export default function RejoindrePage() {
  return (
    <>
      <PageHero
        eyebrow="Rejoindre Mundiis"
        title="Cinq métiers, des profils très différents"
        text="Mundiis regroupe des équipes techniques (matériel, réseau), des développeurs, des spécialistes IA & data, des consultants et des techniciens solaires. Le recrutement suit la croissance de chaque métier, pas un plan figé."
        art={<RejoindreArt3D />}
      />
      <CoverageGrid eyebrow="Profils recherchés" title="Les métiers autour desquels Mundiis recrute" items={roles} tilt />
      <SubCta title="Envie de rejoindre l'équipe ?" />
    </>
  );
}
