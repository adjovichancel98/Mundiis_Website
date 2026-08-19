import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SubCta from "@/components/SubCta";
import Reveal from "@/components/Reveal";
import CursorSpotlight from "@/components/CursorSpotlight";
import OpenPositionsList from "@/components/OpenPositionsList";

export const metadata: Metadata = {
  title: "Rejoindre Mundiis",
  description:
    "Recrutement chez Mundiis à Cotonou, au Bénin : développeurs, spécialistes IA & data, consultants et techniciens solaires rejoignent une équipe d'ingénierie technologique.",
};

const reasons = [
  {
    title: "De vrais métiers, pas des cases",
    text: "Chaque recrutement suit un besoin réel — vous rejoignez une équipe qui grandit, pas un poste créé pour combler un organigramme.",
  },
  {
    title: "Cinq métiers sous un même toit",
    text: "Voir comment le matériel, le logiciel, l'IA, le conseil et l'énergie se répondent — rare dans une seule entreprise.",
  },
  {
    title: "Un ancrage local, une ambition régionale",
    text: "Basés à Cotonou, avec l'objectif de devenir un groupe technologique de référence en Afrique de l'Ouest.",
  },
];

const steps = [
  { n: "01", title: "Candidature", text: "Écrivez-nous en décrivant votre profil et le métier qui vous intéresse." },
  { n: "02", title: "Échange", text: "Un premier échange pour comprendre vos attentes et présenter l'équipe." },
  { n: "03", title: "Mise en situation", text: "Un cas concret lié au métier, pour se projeter dans le travail réel." },
  { n: "04", title: "Décision", text: "Une réponse claire, rapide — dans un sens comme dans l'autre." },
];

export default function RejoindrePage() {
  return (
    <>
      <PageHero
        eyebrow="Rejoindre Mundiis"
        title={[[{ text: "Cinq métiers,", muted: true }], [{ text: "des profils très différents" }]]}
        text="Mundiis regroupe des équipes techniques (matériel, réseau), des développeurs, des spécialistes IA & data, des consultants et des techniciens solaires. Le recrutement suit la croissance de chaque métier, pas un plan figé."
      />

      {/* OPEN POSITIONS */}
      <OpenPositionsList />

      {/* WHY */}
      <CursorSpotlight className="border-b border-border-dark bg-ink py-14 sm:py-20 md:py-24">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal className="mb-9 max-w-[62ch] sm:mb-14">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-coral">
              Pourquoi Mundiis
            </p>
            <h2 className="mt-2.5 text-balance font-display text-[26px] font-extrabold tracking-tight text-ivory sm:text-[32px]">
              Ce que ça change de travailler ici
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-px border border-border-dark bg-white/10 sm:grid-cols-3">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.08}>
                <div className="h-full bg-ink px-6 py-7 transition-colors duration-300 hover:bg-ink2 sm:px-7 sm:py-8">
                  <span className="font-mono text-[12px] text-ivory/55">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-[17px] font-extrabold tracking-tight text-ivory">
                    {r.title}
                  </h3>
                  <p className="mt-2.5 text-[13.5px] leading-[1.6] text-ivory/65">{r.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </CursorSpotlight>

      {/* PROCESS */}
      <section className="py-14 sm:py-20 md:py-24">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Reveal className="mb-9 max-w-[62ch] sm:mb-14">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-coral-text">
              Comment postuler
            </p>
            <h2 className="mt-2.5 text-balance font-display text-[26px] font-extrabold tracking-tight sm:text-[32px]">
              Le process, sans mystère
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06} className="h-full bg-ivory px-6 py-7 transition-colors hover:bg-paper">
                <span className="font-mono text-[12px] text-coral-text">{s.n}</span>
                <h3 className="mt-3 font-display text-[16.5px] font-extrabold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-[13.5px] leading-[1.55] text-muted">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SubCta title="Envie de rejoindre l'équipe ?" />
    </>
  );
}
