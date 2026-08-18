type IconProps = { className?: string };

export function EquipementsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 34 34" fill="none" className={className} aria-hidden="true">
      <rect x="4" y="6" width="26" height="17" rx="2.5" stroke="currentColor" strokeWidth="2" />
      <path d="M12 27h10M17 23v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function LogicielsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 34 34" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 10 5 17l7 7M22 10l7 7-7 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IaDataIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 34 34" fill="none" className={className} aria-hidden="true">
      <circle cx="8" cy="9" r="3" fill="currentColor" />
      <circle cx="26" cy="9" r="3" fill="currentColor" />
      <circle cx="17" cy="25" r="3" fill="currentColor" />
      <path d="M10.5 10.5 15 22.5M23.5 10.5 19 22.5M11 9h15" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function ConseilIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 34 34" fill="none" className={className} aria-hidden="true">
      <path
        d="M5 8h24v14H14l-6 6v-6H5z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EnergieIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 34 34" fill="none" className={className} aria-hidden="true">
      <circle cx="17" cy="17" r="7" stroke="currentColor" strokeWidth="2" />
      <path
        d="M17 2v5M17 27v5M2 17h5M27 17h5M6.5 6.5l3.5 3.5M24 24l3.5 3.5M6.5 27.5 10 24M24 10l3.5-3.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const pillarIcons: Record<string, (p: IconProps) => React.JSX.Element> = {
  equipements: EquipementsIcon,
  logiciels: LogicielsIcon,
  "ia-data": IaDataIcon,
  conseil: ConseilIcon,
  energie: EnergieIcon,
};

export function LinkNode({ className }: IconProps) {
  return (
    <svg viewBox="0 0 30 30" width="30" className={className} aria-hidden="true">
      <circle cx="9" cy="15" r="4" fill="#FF5C39" />
      <circle cx="21" cy="12" r="3" fill="#FF5C39" />
      <path d="M12 14 18 12.5" stroke="#FF5C39" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
