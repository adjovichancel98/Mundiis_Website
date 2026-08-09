import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import BrandMark from "@/components/BrandMark";
import ContactForm from "@/components/ContactForm";
import { pillars } from "@/lib/pillars";

export const metadata: Metadata = {
  title: "Contact — Mundiis",
  description:
    "Matériel, logiciel, IA, conseil ou énergie solaire — décrivez votre besoin, l'équipe Mundiis revient vers vous.",
};

export default function ContactPage() {
  return (
    <>
      <header className="bg-ink py-14 text-ivory sm:py-16 md:py-[84px]">
        <Reveal className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-coral">Contact</p>
          <h1 className="mt-3.5 max-w-[15ch] text-balance font-display text-[30px] font-extrabold leading-[1.1] tracking-tight text-ivory sm:text-[38px] md:text-[56px]">
            Parlons de votre projet
          </h1>
          <p className="mt-4 max-w-[50ch] text-[15.5px] leading-[1.65] text-ivory/70">
            Matériel, logiciel, IA, conseil ou énergie solaire — décrivez votre besoin, l&rsquo;équipe
            Mundiis revient vers vous.
          </p>
        </Reveal>
      </header>

      <section className="py-14 sm:py-20 md:py-24">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-8 px-5 sm:px-8 md:grid-cols-2 md:gap-16">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-5 rounded-[14px] bg-ink p-7 text-ivory sm:p-10">
              <BrandMark className="w-10" />
              <h3 className="font-display text-[20px] font-extrabold text-ivory">Mundiis</h3>
              <p className="text-[14px] leading-[1.6] text-ivory/68">
                Entreprise technologique basée au Bénin — équipements, logiciels, IA &amp; data,
                conseil et énergie solaire.
              </p>
              <div className="flex flex-col gap-2.5">
                {pillars.map((p) => (
                  <span key={p.slug} className="flex items-center gap-2.5 text-[13.5px]">
                    <span className="h-1.5 w-1.5 flex-none rounded-full bg-coral" />
                    {p.title}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
