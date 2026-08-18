import Link from "next/link";
import BrandMark from "./BrandMark";

export default function Footer() {
  return (
    <footer className="bg-ink2 py-12 pb-8 text-ivory/62">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-8 border-b border-line-dark pb-8">
          <Link href="/" className="flex items-center gap-2.5 text-ivory">
            <BrandMark className="w-5" dotColor="#FF5C39" stemColor="#F3F1EC" />
            <span className="text-[17px] font-extrabold tracking-tight">Mundiis</span>
          </Link>

          <div className="flex flex-wrap gap-10">
            <div>
              <h4 className="mb-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.1em] text-ivory/40">
                Entreprise
              </h4>
              <Link href="/apropos" className="block py-1 text-[13.5px] text-ivory/70 transition-all hover:translate-x-[3px] hover:text-coral">
                Pourquoi Mundiis
              </Link>
              <Link href="/rejoindre" className="block py-1 text-[13.5px] text-ivory/70 transition-all hover:translate-x-[3px] hover:text-coral">
                Rejoindre
              </Link>
              <Link href="/actualites" className="block py-1 text-[13.5px] text-ivory/70 transition-all hover:translate-x-[3px] hover:text-coral">
                Actualités
              </Link>
              <Link href="/contact" className="block py-1 text-[13.5px] text-ivory/70 transition-all hover:translate-x-[3px] hover:text-coral">
                Contact
              </Link>
            </div>
            <div>
              <h4 className="mb-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.1em] text-ivory/40">
                Coordonnées
              </h4>
              <a
                href="mailto:chancel@mundiis.com"
                className="block py-1 text-[13.5px] text-ivory/70 transition-all hover:translate-x-[3px] hover:text-coral"
              >
                chancel@mundiis.com
              </a>
              <a
                href="tel:+2290164956484"
                className="block py-1 text-[13.5px] text-ivory/70 transition-all hover:translate-x-[3px] hover:text-coral"
              >
                01 64 95 64 84
              </a>
              <span className="block py-1 text-[13.5px] text-ivory/70">Agla, Lot 3950, Cotonou</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-6 font-mono text-[10.5px] tracking-[0.08em]">
          <span>MUNDIIS — ENTREPRISE TECHNOLOGIQUE — BÉNIN</span>
          <span>RCCM COTONOU RB/COT/26 B 43320 · IFU 3202684200701</span>
        </div>
      </div>
    </footer>
  );
}
