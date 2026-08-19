import Link from "next/link";
import { IaDataIcon } from "@/components/icons/PillarIcons";

export default function InfoStrip() {
  return (
    <div className="grid grid-cols-1 border-b border-line sm:grid-cols-[1.4fr_1fr_1fr]">
      <div className="flex flex-col justify-center gap-6 border-b border-line bg-ivory px-6 py-8 sm:border-b-0 sm:border-r sm:px-8 sm:py-10">
        <p className="max-w-[26ch] font-display text-[19px] font-extrabold leading-[1.25] tracking-tight text-ink sm:text-[22px]">
          Un accompagnement pensé pour votre entreprise, pas une vente ponctuelle.
        </p>
        <Link
          href="/contact"
          className="cursor-hover inline-flex w-fit items-center gap-1.5 border-b border-ink pb-0.5 text-[13.5px] font-semibold text-ink transition-colors hover:border-coral hover:text-coral-text"
        >
          Contacter Mundiis →
        </Link>
      </div>

      <div className="flex flex-col justify-center gap-6 border-b border-line bg-paper px-6 py-8 sm:border-b-0 sm:border-r sm:px-8 sm:py-10">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-ivory">
          <IaDataIcon className="h-4 w-4" />
        </div>
        <p className="text-[14px] leading-[1.55] text-ink/75">
          Découvrez notre méthode d&rsquo;ingénieurs, du cadrage au suivi.
        </p>
        <div className="flex gap-1.5">
          <span className="h-[3px] w-6 rounded-full bg-coral" />
          <span className="h-[3px] w-6 rounded-full bg-line" />
          <span className="h-[3px] w-6 rounded-full bg-line" />
          <span className="h-[3px] w-6 rounded-full bg-line" />
        </div>
      </div>

      <div className="flex flex-col justify-center gap-6 bg-ink px-6 py-8 sm:px-8 sm:py-10">
        <div className="flex -space-x-2.5">
          {["I", "N", "G"].map((letter, i) => (
            <span
              key={letter}
              className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-coral font-mono text-[12px] font-semibold text-ink"
              style={{ zIndex: 3 - i }}
            >
              {letter}
            </span>
          ))}
        </div>
        <div>
          <p className="font-display text-[30px] font-extrabold tracking-tight text-ivory">5</p>
          <p className="text-[13px] text-ivory/60">Métiers d&rsquo;ingénierie réunis chez Mundiis</p>
        </div>
      </div>
    </div>
  );
}
