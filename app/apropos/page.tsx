import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import Faq from "@/components/Faq";
import LabsGrid from "@/components/LabsGrid";
import EditorialHeading from "@/components/EditorialHeading";
import CursorSpotlight from "@/components/CursorSpotlight";
import { HubArt } from "@/components/illustrations/PageArt";

const credentials = [
  { k: "Formation", v: "Master IA & Data Science — Epitech Bénin" },
  { k: "Certification", v: "RNCP Niveau 7, Architecture logicielle — ETNA" },
  { k: "Expérience", v: "Conseil en transformation digitale — SENS Bénin, GIZ Bénin" },
];

export const metadata: Metadata = {
  title: "Pourquoi Mundiis — Bénin",
  description:
    "Équiper une entreprise en technologie demande normalement de coordonner plusieurs prestataires. Mundiis réunit ces métiers au même endroit, à Cotonou et dans tout le Bénin.",
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

      {/* TEAM */}
      <section className="border-y border-border-dark bg-ink py-16 text-ivory sm:py-24 md:py-28">
        <CursorSpotlight className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[380px_1fr] md:items-center md:gap-16">
            <Reveal>
              <div className="relative aspect-[4/5] w-full max-w-[380px] overflow-hidden border border-border-dark">
                <Image
                  src="/team/chancel-adjovi.jpg"
                  alt="Chancel Adjovi Agbogbo, fondateur de Mundiis"
                  fill
                  sizes="(min-width: 768px) 380px, 100vw"
                  className="object-cover"
                />
                <span className="absolute left-0 top-0 h-1.5 w-16 bg-coral" />
              </div>
            </Reveal>

            <div>
              <Reveal>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-coral">Qui sommes-nous</p>
                <EditorialHeading
                  tone="dark"
                  as="h2"
                  lines={[[{ text: "Chancel Adjovi Agbogbo,", muted: true }], [{ text: "fondateur de Mundiis." }]]}
                  className="mt-3 max-w-[16ch] text-balance font-display text-[28px] leading-[1.1] tracking-tight sm:text-[38px] md:text-[46px]"
                />
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-5 max-w-[58ch] text-[15px] leading-[1.75] text-ivory/65">
                  Ingénieur en intelligence artificielle et data science, Chancel a fondé Mundiis pour
                  réunir sous un même toit les métiers techniques qu&rsquo;il a pratiqués sur le terrain —
                  équipement, logiciel, donnée et conseil.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <dl className="mt-8 flex flex-col border-t border-border-dark">
                  {credentials.map((row) => (
                    <div
                      key={row.k}
                      className="grid grid-cols-1 gap-1 border-b border-border-dark py-4 sm:grid-cols-[140px_1fr] sm:gap-6"
                    >
                      <dt className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ivory/50">
                        {row.k}
                      </dt>
                      <dd className="text-[13.5px] text-ivory/75">{row.v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </CursorSpotlight>
      </section>

      {/* VISION */}
      <section className="py-14 sm:py-20 md:py-24">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal className="mb-9 max-w-[62ch] sm:mb-14">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-coral-text">
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
                  <span className="font-mono text-[12.5px] font-semibold text-coral-text">{phase.yr}</span>
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
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-coral-text">
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
      <section id="faq" className="py-14 sm:py-20 md:py-24">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal className="mb-9 max-w-[62ch] sm:mb-14">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-coral-text">
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
