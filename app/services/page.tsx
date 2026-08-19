import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SubCta from "@/components/SubCta";
import ServicesEditorial from "@/components/ServicesEditorial";

export const metadata: Metadata = {
  title: "Nos services — Mundiis",
  description:
    "Cinq métiers d'ingénierie réunis chez un seul partenaire technologique à Cotonou, au Bénin : équipements informatiques, logiciels & digital, IA & data, conseil, énergie solaire.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos services"
        title={[[{ text: "Cinq métiers,", muted: true }], [{ text: "un seul partenaire" }]]}
        text="Équipement, logiciel, donnée, conseil et énergie — chaque métier peut être mobilisé seul ou combiné, selon le besoin réel de l'entreprise."
      />

      <ServicesEditorial />

      <SubCta title="Un besoin qui touche plusieurs de ces métiers ?" note="Sur devis" />
    </>
  );
}
