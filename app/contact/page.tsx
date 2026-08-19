import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import EditorialHeading from "@/components/EditorialHeading";
import MagneticButton from "@/components/MagneticButton";
import BrandMark from "@/components/BrandMark";
import ContactForm from "@/components/ContactForm";
import CursorSpotlight from "@/components/CursorSpotlight";

export const metadata: Metadata = {
  title: "Contact — Mundiis",
  description:
    "Contactez Mundiis à Cotonou, au Bénin, pour un projet d'équipement informatique, logiciel, IA, conseil ou énergie solaire — l'équipe revient vers vous rapidement.",
};

const channels: { label: string; value: string; href?: string }[] = [
  { label: "Email", value: "contact@mundiis.com", href: "mailto:contact@mundiis.com" },
  { label: "Téléphone", value: "01 64 95 64 84", href: "tel:+2290164956484" },
  { label: "Téléphone", value: "01 59 44 44 98", href: "tel:+2290159444498" },
  { label: "Adresse", value: "Agla, Lot 3950, Cotonou" },
];

const nextSteps = [
  "Vous décrivez votre besoin en quelques lignes.",
  "L'équipe revient vers vous pour cadrer le contexte.",
  "On propose une solution adaptée, pas un catalogue figé.",
];

export default function ContactPage() {
  return (
    <>
      <header className="relative overflow-hidden bg-ink pb-16 pt-36 text-ivory sm:pb-20 sm:pt-44 md:pb-24 md:pt-52">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(243,241,236,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(243,241,236,0.5) 1px, transparent 1px)",
            backgroundSize: "90px 90px",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(255,92,57,0.12),transparent_60%)]"
        />
        <Reveal className="relative mx-auto max-w-[1180px] px-5 sm:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-coral">Contact</p>
          <EditorialHeading
            lines={[[{ text: "Parlons de", muted: true }], [{ text: "votre projet" }]]}
            className="mt-4 max-w-[16ch] text-balance font-display text-[38px] leading-[1.05] tracking-tight sm:text-[52px] md:text-[68px]"
          />
          <p className="mt-5 max-w-[52ch] text-[16px] leading-[1.65] text-ivory/70 sm:text-[18px]">
            Matériel, logiciel, IA, conseil ou énergie solaire — décrivez votre besoin,
            l&rsquo;équipe Mundiis revient vers vous rapidement.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticButton href="mailto:contact@mundiis.com" variant="pill-light">
              contact@mundiis.com ↗
            </MagneticButton>
            <MagneticButton href="tel:+2290164956484" variant="ghost">
              01 64 95 64 84
            </MagneticButton>
          </div>
        </Reveal>
      </header>

      <section className="bg-ivory py-14 sm:py-20 md:py-24">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-10 px-5 sm:px-8 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
          <Reveal>
            <div className="border border-line bg-paper p-7 sm:p-10">
              <h2 className="mb-6 font-display text-[19px] font-extrabold tracking-tight text-ink">
                Décrivez votre besoin
              </h2>
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <CursorSpotlight className="h-full border border-border-dark bg-ink p-7 text-ivory sm:p-9">
              <div className="flex h-full flex-col justify-between gap-8">
                <div>
                  <BrandMark className="w-9" dotColor="#ff5c39" stemColor="#f3f1ec" />
                  <h3 className="mt-5 font-display text-[19px] font-extrabold text-ivory">Mundiis</h3>
                  <p className="mt-2.5 text-[13.5px] leading-[1.6] text-ivory/65">
                    Entreprise technologique basée au Bénin — équipements, logiciels, IA &amp; data,
                    conseil et énergie solaire.
                  </p>
                </div>

                <div className="flex flex-col border-t border-border-dark">
                  {channels.map((c, i) =>
                    c.href ? (
                      <a
                        key={i}
                        href={c.href}
                        className="group flex items-center justify-between gap-4 border-b border-border-dark py-3 text-[13.5px] transition-colors"
                      >
                        <span className="text-ivory/50">{c.label}</span>
                        <span className="text-ivory transition-colors group-hover:text-coral">
                          {c.value}
                        </span>
                      </a>
                    ) : (
                      <div
                        key={i}
                        className="flex items-center justify-between gap-4 border-b border-border-dark py-3 text-[13.5px]"
                      >
                        <span className="text-ivory/50">{c.label}</span>
                        <span className="text-ivory">{c.value}</span>
                      </div>
                    ),
                  )}
                </div>

                <div>
                  <p className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ivory/50">
                    Comment ça se passe
                  </p>
                  <div className="flex flex-col gap-3">
                    {nextSteps.map((step, i) => (
                      <div key={step} className="flex items-start gap-3">
                        <span className="flex h-5 w-5 flex-none items-center justify-center border border-coral font-mono text-[10px] text-coral">
                          {i + 1}
                        </span>
                        <span className="pt-px text-[13px] leading-normal text-ivory/70">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="font-mono text-[10px] tracking-[0.06em] text-ivory/55">
                  RCCM Cotonou RB/COT/26 B 43320 — IFU 3202684200701
                </p>
              </div>
            </CursorSpotlight>
          </Reveal>
        </div>
      </section>
    </>
  );
}
