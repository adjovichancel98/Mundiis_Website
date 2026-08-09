const words = [
  "Équipements",
  "Logiciels & digital",
  "IA & data",
  "Conseil",
  "Énergie solaire",
  "Bénin",
];

export default function Marquee() {
  const items = [...words, ...words];
  return (
    <div className="marquee overflow-hidden border-b border-line-dark bg-ink2 py-3.5">
      <div className="marquee-track flex w-max items-center gap-[26px]">
        {items.map((w, i) => (
          <span key={i} className="flex items-center gap-[26px]">
            <span className="whitespace-nowrap font-display text-[15px] text-ivory/50">{w}</span>
            <span className="h-[5px] w-[5px] flex-none rounded-full bg-coral" />
          </span>
        ))}
      </div>
    </div>
  );
}
