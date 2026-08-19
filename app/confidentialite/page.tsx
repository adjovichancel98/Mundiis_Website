import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Mundiis",
  description:
    "Comment Mundiis collecte, utilise et protège les données transmises via le formulaire de contact du site.",
};

const sections = [
  {
    title: "Qui sommes-nous",
    body: `${siteConfig.name}, entreprise technologique basée à ${siteConfig.address.addressLocality} (Bénin) — ${siteConfig.address.streetAddress}. RCCM ${siteConfig.rccm} · IFU ${siteConfig.ifu}. Pour toute question relative à cette politique, contactez ${siteConfig.email}.`,
  },
  {
    title: "Données collectées",
    body: "Le seul formulaire présent sur ce site est le formulaire de contact. Il collecte votre nom, votre adresse email, l'activité sélectionnée et le message que vous rédigez. Aucune autre donnée personnelle n'est demandée ailleurs sur le site.",
  },
  {
    title: "Pourquoi ces données sont collectées",
    body: "Ces informations servent uniquement à répondre à votre demande de contact. Elles ne sont ni revendues, ni utilisées à des fins de prospection commerciale non sollicitée, ni partagées avec des tiers autres que le prestataire technique nécessaire à l'envoi de l'email (voir ci-dessous).",
  },
  {
    title: "Comment elles sont transmises",
    body: "Lorsque vous soumettez le formulaire, son contenu est envoyé par email à l'équipe Mundiis via Resend, un service tiers d'envoi d'emails transactionnels. Resend traite ces données uniquement pour acheminer le message et n'est pas utilisé à d'autres fins sur ce site.",
  },
  {
    title: "Durée de conservation",
    body: "Les messages reçus sont conservés le temps nécessaire au traitement de votre demande et à la relation qui peut en découler. Vous pouvez demander leur suppression à tout moment.",
  },
  {
    title: "Cookies et suivi",
    body: "Ce site n'utilise aucun cookie de suivi, outil d'analyse d'audience ou technologie de tracking publicitaire. Aucune donnée de navigation n'est collectée.",
  },
  {
    title: "Vos droits",
    body: `Vous pouvez demander l'accès, la rectification ou la suppression des données vous concernant en écrivant à ${siteConfig.email}.`,
  },
];

export default function ConfidentialitePage() {
  return (
    <>
      <header className="bg-ink py-14 text-ivory sm:py-16 md:py-20">
        <Reveal className="mx-auto max-w-[900px] px-5 sm:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-coral">Confidentialité</p>
          <h1 className="mt-3.5 text-balance font-display text-[28px] font-extrabold leading-[1.1] tracking-tight sm:text-[38px]">
            Politique de confidentialité
          </h1>
        </Reveal>
      </header>

      <section className="py-14 sm:py-20 md:py-24">
        <div className="mx-auto flex max-w-[900px] flex-col gap-8 px-5 sm:px-8">
          {sections.map((s) => (
            <Reveal key={s.title}>
              <h2 className="mb-2 text-[16.5px] font-semibold">{s.title}</h2>
              <p className="max-w-[68ch] text-[16px] leading-[1.75] text-muted">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
