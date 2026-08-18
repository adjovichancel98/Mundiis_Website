type Props = {
  className?: string;
  dotColor?: string;
  stemColor?: string;
};

/** The Mundiis signature mark: two asymmetric points, linked. */
export default function BrandMark({
  className,
  dotColor = "#FF5C39",
  stemColor = "#111214",
}: Props) {
  return (
    <svg viewBox="0 0 40 60" className={className} aria-hidden="true">
      <circle cx="11.5" cy="20.5" r="4.2" fill={dotColor} />
      <circle cx="28.5" cy="17.5" r="3.3" fill={dotColor} />
      <path
        d="M11.5,20.5 Q20,25.5 28.5,17.5"
        fill="none"
        stroke={dotColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect x="8" y="24" width="7" height="32" rx="3.5" fill={stemColor} />
      <rect x="25" y="24" width="7" height="32" rx="3.5" fill={stemColor} />
    </svg>
  );
}
