import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import CreationsShowcase from "@/components/CreationsShowcase";
import SubCta from "@/components/SubCta";

export const metadata: Metadata = {
  title: "Mundiis Labs — Mundiis",
  description:
    "Les applications, outils IA et produits web que l'équipe Mundiis conçoit et développe, au-delà des projets menés pour ses clients.",
};

export default function CreationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Mundiis Labs"
        title={[[{ text: "Les produits que", muted: true }], [{ text: "Mundiis construit" }]]}
        text="Au-delà des projets menés pour nos clients, une partie de l'équipe invente ses propres outils — applications mobiles, outils IA et produits web."
        art={
          <Image
            src="/illustrations/3d/lab.png"
            alt=""
            width={340}
            height={340}
            className="w-full max-w-65"
            priority
          />
        }
      />

      <CreationsShowcase />

      <SubCta title="Une idée de produit à explorer ensemble ?" />
    </>
  );
}
