import Reveal from "./Reveal";

const groups: { title: string; items: string[] }[] = [
  { title: "CMS & sites web", items: ["WordPress", "Elementor", "Elementor Pro", "Hello Elementor"] },
  { title: "Back-end & langages", items: ["PHP", "Bases de données", "API & intégrations"] },
  { title: "Front-end & interactions", items: ["JavaScript", "jQuery", "jQuery UI"] },
  {
    title: "Formulaires & contenu",
    items: ["Contact Form 7", "ElementsKit", "Essential Addons", "The Post Grid"],
  },
  {
    title: "Animation & expérience",
    items: ["Royal Elementor Addons", "Particles.js", "Parallax", "Lottie"],
  },
  { title: "Référencement", items: ["Yoast SEO", "Bonnes pratiques SEO technique"] },
];

export default function TechStack() {
  return (
    <section className="border-t border-line bg-ivory py-14 sm:py-20 md:py-24">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <Reveal className="mb-9 max-w-[62ch] sm:mb-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-coral-text">
            Notre expertise technique
          </p>
          <h2 className="mt-2.5 text-balance font-display text-[26px] font-extrabold tracking-tight sm:text-[32px]">
            Les technologies que nous savons assembler
          </h2>
          <p className="mt-3.5 text-[17px] leading-[1.7] text-muted">
            Le bon outil dépend du projet : un site vitrine ne se construit pas comme un logiciel
            métier. Voici les briques que nos équipes maîtrisent pour composer la solution adaptée
            à chaque client.
          </p>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2 md:grid-cols-3">
            {groups.map((g) => (
              <div key={g.title}>
                <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
                  {g.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <span
                      key={item}
                      className="cursor-hover rounded-[7px] border border-line bg-paper px-3 py-1.5 text-[13px] transition-colors hover:border-coral hover:text-coral-text"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <p className="mt-9 max-w-[68ch] border-t border-line pt-7 text-[15px] leading-[1.7] text-muted">
            Ce site Mundiis, lui, a été codé à la main en React / Next.js — sans CMS — pour rester
            le plus rapide et le plus maintenable possible. Pour un client qui a besoin de gérer
            son contenu au quotidien, WordPress et Elementor restent souvent le choix le plus
            pertinent : c&rsquo;est justement le genre d&rsquo;arbitrage que Mundiis fait avec
            chaque client.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
