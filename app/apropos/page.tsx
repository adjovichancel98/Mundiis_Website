import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import Faq from "@/components/Faq";
import { HubArt, LoopArt } from "@/components/illustrations/PageArt";
import { LinkNode } from "@/components/icons/PillarIcons";

export const metadata: Metadata = {
  title: "Pourquoi Mundiis",
  description:
    "Équiper une entreprise en technologie demande normalement de coordonner plusieurs prestataires. Mundiis réunit ces métiers au même endroit.",
};

const steps = [
  {
    n: "01",
    title: "On écoute le besoin réel",
    text: "Avant de proposer du matériel ou un logiciel, on comprend ce que l'entreprise essaie de résoudre.",
  },
  {
    n: "02",
    title: "On assemble la bonne combinaison de métiers",
    text: "Équipement seul, ou équipement plus logiciel plus conseil : la réponse dépend du besoin, pas d'un catalogue figé.",
  },
  {
    n: "03",
    title: "On livre, on installe, on reste disponible",
    text: "La relation ne s'arrête pas à la livraison — c'est là que le conseil et l'accompagnement prennent le relais, jusqu'au prochain besoin.",
  },
];

const why = [
  {
    title: "Tout sous un même toit",
    text: "Équipement, logiciel, donnée, conseil et énergie — sans multiplier les interlocuteurs.",
  },
  {
    title: "Ancrés au Bénin",
    text: "Une entreprise qui connaît le terrain et les besoins réels des entreprises locales.",
  },
  {
    title: "Du matériel à la stratégie",
    text: "Nous accompagnons le choix, l'intégration et l'usage dans la durée.",
  },
];

export default function AproposPage() {
  return (
    <>
      <PageHero
        eyebrow="Pourquoi Mundiis"
        title="Un seul partenaire, pas cinq fournisseurs"
        text="Équiper une entreprise en technologie demande normalement de coordonner plusieurs prestataires. Mundiis réunit ces métiers au même endroit."
        art={<HubArt />}
      />

      {/* APPROACH + LOOP */}
      <section className="bg-ink py-14 text-ivory sm:py-20 md:py-24">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-8 px-5 sm:px-8 md:grid-cols-[1.3fr_0.9fr] md:gap-14">
          <div>
            <Reveal className="mb-9 max-w-[62ch] sm:mb-14">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-coral">
                Notre approche
              </p>
              <h2 className="mt-2.5 text-balance font-display text-[26px] font-extrabold tracking-tight text-ivory sm:text-[32px]">
                Comment on travaille avec vous
              </h2>
              <p className="mt-3.5 text-[15.5px] leading-[1.65] text-ivory/70">
                Trois étapes, dans cet ordre — et à la fin, ça reboucle : rester disponible fait
                aussi partie de la relation.
              </p>
            </Reveal>
            <div className="flex flex-col">
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.1}>
                  <div className="grid grid-cols-[90px_1fr] gap-6 border-t border-line-dark py-6 last:border-b">
                    <span className="pt-1 font-mono text-[13px] text-ivory/40">{s.n}</span>
                    <div>
                      <h3 className="mb-2 font-display text-[18px] font-extrabold tracking-tight text-ivory sm:text-[23px]">
                        {s.title}
                      </h3>
                      <p className="max-w-[62ch] text-[14.5px] leading-[1.6] text-ivory/66">
                        {s.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.15} className="flex flex-col items-center gap-3.5">
            <div className="w-full max-w-[280px]">
              <LoopArt />
            </div>
            <span className="max-w-[22ch] text-center font-mono text-[11px] text-ivory/50">
              La boucle recommence à chaque nouveau besoin
            </span>
          </Reveal>
        </div>
      </section>

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
          <div className="grid grid-cols-1 gap-[3px] overflow-hidden rounded-[14px] border border-line bg-line sm:grid-cols-3">
            {why.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.1} className="bg-paper px-7 py-7 transition-colors hover:bg-white sm:px-8">
                <LinkNode />
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
