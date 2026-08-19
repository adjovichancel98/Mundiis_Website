import Reveal from "@/components/Reveal";
import EditorialHeading from "@/components/EditorialHeading";
import MagneticButton from "@/components/MagneticButton";

const APPLY_EMAIL = "contact@mundiis.com";
const APPLY_SUBJECT = "Candidature — Technico-commercial";
const applyHref = `mailto:${APPLY_EMAIL}?subject=${encodeURIComponent(APPLY_SUBJECT)}`;

const sections = [
  {
    title: "Missions",
    items: [
      "Identifier et prospecter des entreprises clientes à Cotonou et dans les autres villes du Bénin",
      "Présenter l'offre Mundiis (équipements informatiques, logiciels, IA & data, conseil, énergie solaire) et qualifier les besoins",
      "Élaborer les devis et propositions commerciales en lien avec les équipes techniques",
      "Monter les dossiers de soumission aux marchés publics (appels d'offres) et en assurer le suivi",
      "Négocier et suivre les contrats jusqu'à la signature",
      "Assurer le suivi de la relation client après la vente",
    ],
  },
  {
    title: "Profil recherché",
    items: [
      "Formation commerciale, technique ou informatique",
      "Première expérience en vente B2B, idéalement dans l'informatique ou les équipements techniques",
      "À l'aise pour échanger aussi bien avec des dirigeants qu'avec des équipes techniques",
      "Autonome, organisé, orienté résultats",
      "Mobile à Cotonou",
    ],
  },
  {
    title: "Compétences",
    items: [
      "Techniques de vente et de négociation B2B",
      "Maîtrise du montage de dossiers de soumission aux marchés publics",
      "Connaissance de base des solutions IT — formation possible en interne sur les spécificités Mundiis",
      "Aisance avec les outils bureautiques et un CRM",
      "Français courant, l'anglais est un plus",
    ],
  },
];

export default function OpenPosition() {
  return (
    <section className="border-b border-line bg-paper py-16 sm:py-24 md:py-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-coral">Poste ouvert</p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="relative mt-6 overflow-hidden border border-line bg-white shadow-[0_40px_90px_-30px_rgba(17,18,20,0.18)]">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-coral" />

            <div className="grid grid-cols-1 md:grid-cols-[1fr_320px]">
              <div className="p-7 pt-10 sm:p-12 sm:pt-14 md:p-14">
                <EditorialHeading
                  tone="light"
                  as="h2"
                  lines={[[{ text: "Technico-commercial" }]]}
                  className="text-balance font-display text-[32px] leading-[1.05] tracking-tight sm:text-[46px] md:text-[54px]"
                />
                <p className="mt-3.5 font-mono text-[12px] uppercase tracking-[0.1em] text-muted">
                  Cotonou, Bénin
                </p>

                <div className="mt-10 flex flex-col divide-y divide-line border-t border-line">
                  {sections.map((s, i) => (
                    <div key={s.title} className="py-8 sm:py-10">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-[12px] font-semibold text-coral">0{i + 1}</span>
                        <h3 className="font-display text-[18px] font-extrabold tracking-tight text-ink sm:text-[20px]">
                          {s.title}
                        </h3>
                      </div>
                      <ul className="mt-4 flex flex-col gap-2.5 pl-[30px]">
                        {s.items.map((item) => (
                          <li key={item} className="flex gap-3 text-[14.5px] leading-[1.65] text-muted">
                            <span className="mt-[9px] h-[3px] w-[3px] flex-none rounded-full bg-coral" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-between gap-10 border-t border-line bg-ink p-7 text-ivory sm:p-10 md:border-l md:border-t-0">
                <div>
                  <h3 className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ivory/40">
                    Candidature
                  </h3>
                  <p className="mt-3 max-w-[26ch] text-[14px] leading-[1.6] text-ivory/70">
                    CV et lettre de motivation à envoyer à
                  </p>
                  <a
                    href={applyHref}
                    className="cursor-hover mt-2 inline-block break-all text-[14.5px] font-semibold text-ivory underline decoration-white/25 underline-offset-4 transition-colors hover:text-coral hover:decoration-coral"
                  >
                    {APPLY_EMAIL}
                  </a>
                </div>
                <MagneticButton href={applyHref} variant="pill-light" className="w-fit">
                  Postuler →
                </MagneticButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
