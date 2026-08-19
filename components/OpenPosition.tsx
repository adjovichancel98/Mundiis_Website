import Link from "next/link";
import Reveal from "@/components/Reveal";

const missions = [
  "Identifier et prospecter des entreprises clientes à Cotonou et dans les autres villes du Bénin",
  "Présenter l'offre Mundiis (équipements informatiques, logiciels, IA & data, conseil, énergie solaire) et qualifier les besoins",
  "Élaborer les devis et propositions commerciales en lien avec les équipes techniques",
  "Négocier et suivre les contrats jusqu'à la signature",
  "Assurer le suivi de la relation client après la vente",
];

const profile = [
  "Formation commerciale, technique ou informatique",
  "Première expérience en vente B2B, idéalement dans l'informatique ou les équipements techniques",
  "À l'aise pour échanger aussi bien avec des dirigeants qu'avec des équipes techniques",
  "Autonome, organisé, orienté résultats",
  "Mobile à Cotonou",
];

const skills = [
  "Techniques de vente et de négociation B2B",
  "Connaissance de base des solutions IT — formation possible en interne sur les spécificités Mundiis",
  "Aisance avec les outils bureautiques et un CRM",
  "Français courant, l'anglais est un plus",
];

export default function OpenPosition() {
  return (
    <section className="border-b border-line bg-ivory py-14 sm:py-20 md:py-24">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <Reveal className="mb-9 max-w-[62ch] sm:mb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-coral">Poste ouvert</p>
          <h2 className="mt-2.5 text-balance font-display text-[26px] font-extrabold tracking-tight sm:text-[32px]">
            Technico-commercial
          </h2>
          <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.08em] text-muted">
            Cotonou, Bénin
          </p>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3">
            <div className="bg-white px-7 py-8 sm:px-8">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/40">Missions</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {missions.map((m) => (
                  <li key={m} className="text-[13.5px] leading-[1.6] text-muted">
                    {m}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white px-7 py-8 sm:px-8">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/40">Profil recherché</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {profile.map((p) => (
                  <li key={p} className="text-[13.5px] leading-[1.6] text-muted">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white px-7 py-8 sm:px-8">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/40">Compétences</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {skills.map((s) => (
                  <li key={s} className="text-[13.5px] leading-[1.6] text-muted">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-6 border-x border-b border-line bg-paper px-7 py-6 sm:px-8">
            <p className="text-[13.5px] text-muted">Envoyez votre candidature à l&rsquo;équipe Mundiis.</p>
            <Link
              href="/contact"
              className="cursor-hover inline-flex flex-none items-center justify-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-ivory transition-colors hover:bg-[#24262c]"
            >
              Postuler →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
