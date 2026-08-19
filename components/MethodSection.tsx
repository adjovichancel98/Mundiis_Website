import Image from "next/image";
import EditorialHeading from "@/components/EditorialHeading";
import Reveal from "@/components/Reveal";
import CursorSpotlight from "@/components/CursorSpotlight";

const steps = [
  {
    n: "01",
    title: "Cadrage",
    text: "On étudie le besoin réel — matériel, logiciel, IA, énergie — avant de proposer quoi que ce soit.",
    img: "/illustrations/3d/target.png",
  },
  {
    n: "02",
    title: "Conception",
    text: "Nos ingénieurs conçoivent la solution technique : architecture, matériel, ou intégration adaptée.",
    img: "/illustrations/3d/puzzle.png",
  },
  {
    n: "03",
    title: "Déploiement",
    text: "Livraison, installation, développement ou mise en service — exécuté par l'équipe, pas sous-traité à l'aveugle.",
    img: "/illustrations/3d/rocket.png",
  },
  {
    n: "04",
    title: "Suivi",
    text: "Accompagnement après mise en service : support, ajustements, montée en charge.",
    img: "/illustrations/3d/chat-bubble.png",
  },
];

export default function MethodSection() {
  return (
    <CursorSpotlight className="border-b border-border-dark bg-ink py-14 sm:py-20 md:py-24">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <Reveal className="mb-9 max-w-[62ch] sm:mb-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-coral">
            Notre méthode
          </p>
          <EditorialHeading
            as="h2"
            lines={[[{ text: "Une méthode", muted: true }, { text: "d'ingénieurs," }], [{ text: "pas une improvisation" }]]}
            className="mt-2.5 text-balance font-display text-[26px] leading-[1.15] tracking-tight sm:text-[36px]"
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-px overflow-hidden border border-border-dark bg-white/10 sm:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="h-full bg-ink px-6 py-8 transition-colors duration-300 hover:bg-ink2 sm:px-7 sm:py-9">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-mono text-[12px] text-ivory/55">{s.n}</span>
                  <Image
                    src={s.img}
                    alt=""
                    width={56}
                    height={56}
                    className="h-12 w-12 flex-none opacity-90 sm:h-14 sm:w-14"
                  />
                </div>
                <h3 className="mt-3 font-display text-[17px] font-extrabold tracking-tight text-ivory">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-[1.65] text-ivory/65">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </CursorSpotlight>
  );
}
