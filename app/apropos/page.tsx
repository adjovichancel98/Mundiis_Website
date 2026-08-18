import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import Faq from "@/components/Faq";
import LabsGrid from "@/components/LabsGrid";
import { HubArt } from "@/components/illustrations/PageArt";

export const metadata: Metadata = {
  title: "Pourquoi Mundiis",
  description:
    "Équiper une entreprise en technologie demande normalement de coordonner plusieurs prestataires. Mundiis réunit ces métiers au même endroit.",
};

const why = [
  {
    title: "Tout sous un même toit",
    text: "Équipement, logiciel, donnée, conseil et énergie — sans multiplier les interlocuteurs.",
    img: "/illustrations/3d/puzzle.png",
  },
  {
    title: "Ancrés au Bénin",
    text: "Une entreprise qui connaît le terrain et les besoins réels des entreprises locales.",
    img: "/illustrations/3d/map-pin.png",
  },
  {
    title: "Du matériel à la stratégie",
    text: "Nous accompagnons le choix, l'intégration et l'usage dans la durée.",
    img: "/illustrations/3d/target.png",
  },
];

export default function AproposPage() {
  return (
    <>
      <PageHero
        eyebrow="Pourquoi Mundiis"
        title={[[{ text: "Un seul partenaire,", muted: true }], [{ text: "pas cinq fournisseurs" }]]}
        text="Équiper une entreprise en technologie demande normalement de coordonner plusieurs prestataires. Mundiis réunit ces métiers au même endroit."
        art={<HubArt />}
      />

      {/* VISION */}
      <section className="py-14 sm:py-20 md:py-24">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal className="mb-9 max-w-[62ch] sm:mb-14">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-coral">
              Notre vision
            </p>
            <h2 className="mt-2.5 text-balance font-display text-[26px] font-extrabold tracking-tight sm:text-[32px]">
              Le socle technologique d&rsquo;un groupe qui grandit
            </h2>
            <p className="mt-3.5 max-w-[62ch] text-[15.5px] leading-[1.65] text-muted">
              Mundiis entre par la technologie, puis s&rsquo;étend méthodiquement vers les secteurs
              qui construisent une région. L&rsquo;ambition dépasse le seul numérique : sur quinze à
              vingt ans, devenir un groupe diversifié au service du développement de l&rsquo;Afrique
              de l&rsquo;Ouest.
            </p>
          </Reveal>
          <div className="flex flex-col">
            {[
              {
                yr: "Aujourd'hui",
                title: "Le socle technologique",
                text: "Équipements IT, logiciel, IA, data, conseil et formation.",
              },
              {
                yr: "Court terme",
                title: "Énergie & durable",
                text: "Montée en puissance du pôle solaire et des infrastructures énergétiques.",
              },
              {
                yr: "Moyen terme",
                title: "Nouveaux secteurs",
                text: "Extension vers l'agritech et l'immobilier, portée par les revenus du socle.",
              },
              {
                yr: "15 à 20 ans",
                title: "Groupe régional",
                text: "Un groupe diversifié présent dans plusieurs pays de la CEDEAO.",
              },
            ].map((phase, i) => (
              <Reveal key={phase.yr} delay={i * 0.08}>
                <div className="grid grid-cols-1 gap-2 border-t border-line py-6 last:border-b sm:grid-cols-[140px_1fr] sm:gap-6">
                  <span className="font-mono text-[12.5px] font-semibold text-coral">{phase.yr}</span>
                  <div>
                    <h3 className="mb-1.5 text-[16.5px] font-semibold">{phase.title}</h3>
                    <p className="max-w-[58ch] text-[14px] leading-[1.6] text-muted">{phase.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LABS */}
      <LabsGrid />

      {/* WHY */}
      <section className="py-14 sm:py-20 md:py-24">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal className="mb-9 max-w-[62ch] sm:mb-14">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-coral">
              Ce qui nous distingue
            </p>
            <h2 className="mt-2.5 text-balance font-display text-[26px] font-extrabold tracking-tight sm:text-[32px]">
              Trois raisons de passer par Mundiis
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3">
            {why.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.1} className="bg-paper px-7 py-7 transition-colors hover:bg-white sm:px-8">
                <Image src={w.img} alt="" width={56} height={56} className="h-12 w-12" />
                <h3 className="mb-1.5 mt-3.5 text-[17px] font-semibold">{w.title}</h3>
                <p className="text-[14px] leading-[1.6] text-muted">{w.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-20 md:py-24">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal className="mb-9 max-w-[62ch] sm:mb-14">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-coral">
              Questions fréquentes
            </p>
            <h2 className="mt-2.5 text-balance font-display text-[26px] font-extrabold tracking-tight sm:text-[32px]">
              Avant de nous contacter
            </h2>
          </Reveal>
          <Reveal>
            <Faq />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-coral py-14 sm:py-20 md:py-24">
        <Reveal className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink">Parlons-en</p>
              <h2 className="mt-2.5 max-w-[16ch] text-balance font-display text-[26px] font-extrabold tracking-tight sm:text-[40px]">
                Prêt à réunir vos besoins tech chez un seul partenaire ?
              </h2>
            </div>
            <MagneticButton href="/contact" variant="ink">
              Contacter Mundiis
            </MagneticButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
