import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

export default function CoverageGrid({
  eyebrow,
  title,
  items,
  tilt = false,
}: {
  eyebrow: string;
  title: string;
  items: { title: string; text: string }[];
  tilt?: boolean;
}) {
  return (
    <section className="py-14 sm:py-20 md:py-24">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <Reveal className="mb-9 max-w-[62ch] sm:mb-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-coral">{eyebrow}</p>
          <h2 className="mt-2.5 text-balance font-serif text-[26px] font-medium tracking-tight sm:text-[32px]">
            {title}
          </h2>
        </Reveal>
        <Reveal>
          <div className="grid grid-cols-1 gap-[3px] overflow-hidden rounded-[14px] border border-line bg-line sm:grid-cols-2">
            {items.map((item, i) =>
              tilt ? (
                <TiltCard key={i} title={item.title} text={item.text} />
              ) : (
                <div
                  key={i}
                  className="flex items-start gap-3.5 bg-paper px-6 py-6 transition-colors hover:bg-white"
                >
                  <span className="mt-[7px] h-2 w-2 flex-none rounded-full bg-coral" />
                  <div>
                    <h3 className="mb-1 text-[15.5px] font-semibold">{item.title}</h3>
                    <p className="text-[13.5px] leading-[1.55] text-muted">{item.text}</p>
                  </div>
                </div>
              ),
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
