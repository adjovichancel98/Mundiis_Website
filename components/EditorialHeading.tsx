export type Segment = { text: string; muted?: boolean };

type Props = {
  lines: Segment[][];
  as?: "h1" | "h2" | "h3";
  tone?: "dark" | "light";
  className?: string;
};

/** Large display heading mixing full-weight/opacity and muted/light segments across explicit lines, editorial-style. */
export default function EditorialHeading({ lines, as: Tag = "h1", tone = "dark", className = "" }: Props) {
  const strong = tone === "dark" ? "text-ivory" : "text-ink";
  const muted = tone === "dark" ? "text-ivory/35" : "text-ink/35";

  return (
    <Tag className={className}>
      {lines.map((segments, li) => (
        <span key={li} className="block">
          {segments.map((s, i) => (
            <span key={i} className={s.muted ? `font-normal ${muted}` : `font-extrabold ${strong}`}>
              {s.text}
              {i < segments.length - 1 ? " " : ""}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
