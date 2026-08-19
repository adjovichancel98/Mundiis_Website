import { ImageResponse } from "next/og";

export const alt = "Mundiis — Équipements informatiques, logiciels, IA & énergie solaire au Bénin";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFont(weight: 400 | 700) {
  const res = await fetch(
    `https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-${weight}-normal.ttf`,
  );
  return res.arrayBuffer();
}

export default async function Image() {
  const [regular, bold] = await Promise.all([loadFont(400), loadFont(700)]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          backgroundColor: "#111214",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
          <svg width="52" height="78" viewBox="0 0 40 60">
            <circle cx="11.5" cy="20.5" r="4.2" fill="#FF5C39" />
            <circle cx="28.5" cy="17.5" r="3.3" fill="#FF5C39" />
            <path
              d="M11.5,20.5 Q20,25.5 28.5,17.5"
              fill="none"
              stroke="#FF5C39"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <rect x="8" y="24" width="7" height="32" rx="3.5" fill="#F3F1EC" />
            <rect x="25" y="24" width="7" height="32" rx="3.5" fill="#F3F1EC" />
          </svg>
          <span style={{ fontSize: 84, fontWeight: 700, color: "#F3F1EC", letterSpacing: -2 }}>
            Mundiis
          </span>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 34,
            maxWidth: 860,
            fontSize: 30,
            lineHeight: 1.4,
            fontWeight: 400,
            color: "rgba(243,241,236,0.7)",
          }}
        >
          Équipements informatiques, logiciels, IA &amp; data, conseil, énergie solaire.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 56,
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#FF5C39",
          }}
        >
          Cotonou, Bénin
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: regular, weight: 400, style: "normal" },
        { name: "Inter", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
