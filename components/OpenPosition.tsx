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
      "Connaissance de base des solutions IT — formation possible en interne sur les spécificités Mundiis",
      "Aisance avec les outils bureautiques et un CRM",
      "Français courant, l'anglais est un plus",
    ],
  },
];

export default function OpenPosition() {
  return (
    <section className="border-b border-line bg-ivory py-16 sm:py-24 md:py-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-coral">Poste ouvert</p>
          <EditorialHeading
            tone="light"
            as="h2"
            lines={[[{ text: "Technico-commercial" }]]}
            className="mt-3 text-balance font-display text-[36px] leading-[1.05] tracking-tight sm:text-[52px] md:text-[62px]"
          />
          <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.1em] text-muted">
            Cotonou, Bénin
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 border-t border-line pt-12 md:grid-cols-[260px_1fr] md:gap-16 md:pt-14">
          <Reveal className="md:sticky md:top-28 md:self-start">
            <div className="flex flex-col gap-8">
              <div>
                <h3 className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink/40">Candidature</h3>
                <p className="mt-2.5 max-w-[28ch] text-[14px] leading-[1.6] text-muted">
                  CV et lettre de motivation à envoyer à
                </p>
                <a
                  href={applyHref}
                  className="cursor-hover mt-1.5 inline-block break-all text-[14.5px] font-semibold text-ink underline decoration-line underline-offset-4 transition-colors hover:text-coral hover:decoration-coral"
                >
                  {APPLY_EMAIL}
                </a>
              </div>
              <MagneticButton href={applyHref} variant="ink" className="w-fit">
                Postuler →
              </MagneticButton>
            </div>
          </Reveal>

          <div>
            {sections.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <div className="border-b border-line py-9 first:pt-0 sm:py-11">
                  <h3 className="font-display text-[19px] font-extrabold tracking-tight text-ink sm:text-[21px]">
                    {s.title}
                  </h3>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {s.items.map((item) => (
                      <li key={item} className="flex gap-3 text-[14.5px] leading-[1.65] text-muted">
                        <span className="mt-[9px] h-[3px] w-[3px] flex-none rounded-full bg-coral" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
