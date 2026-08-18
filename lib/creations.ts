export type CreationStatus = "built" | "progress" | "concept" | "check";

export type Creation = {
  name: string;
  desc: string;
  stack: string;
  status: CreationStatus;
};

export type CreationCategory = {
  title: string;
  items: Creation[];
};

export const statusLabels: Record<CreationStatus, string> = {
  built: "Construit",
  progress: "En cours",
  concept: "Concept",
  check: "À vérifier",
};

export const creationCategories: CreationCategory[] = [
  {
    title: "Applications mobiles",
    items: [
      {
        name: "ÉpargneTché",
        desc: "App d'épargne avec vérification de dépôt par caméra, timeline et statistiques.",
        stack: "Flutter",
        status: "built",
      },
      {
        name: "ARISE",
        desc: "App anti-abandon de projets : check-in d'énergie, plan de tâches généré par IA.",
        stack: "React Native",
        status: "progress",
      },
      {
        name: "CLASSSIMPLE",
        desc: "Plateforme de gestion scolaire.",
        stack: "Flutter",
        status: "progress",
      },
      {
        name: "Vibefy",
        desc: "Application de streaming musical (intégration Spotify SDK).",
        stack: "Flutter",
        status: "progress",
      },
      {
        name: "App de rappel",
        desc: "App de rappels minimaliste : mode focus plein écran, timeline circulaire.",
        stack: "Flutter",
        status: "built",
      },
    ],
  },
  {
    title: "Data & intelligence artificielle",
    items: [
      {
        name: "DataPath AI",
        desc: "Chatbot d'accompagnement pour aspirants data analysts.",
        stack: "Python · NLP",
        status: "progress",
      },
      {
        name: "Job Search CLI",
        desc: "Gestion de recherche d'emploi en ligne de commande : collecte, scoring, suivi.",
        stack: "Python · SQLite",
        status: "built",
      },
      {
        name: "MeetingMaster",
        desc: "Transcription de réunions par IA.",
        stack: "Whisper · Claude",
        status: "progress",
      },
      {
        name: "Sika",
        desc: "Moteur de recherche documentaire par IA (RAG) pour professionnels.",
        stack: "RAG · LLM",
        status: "concept",
      },
    ],
  },
  {
    title: "Web",
    items: [
      {
        name: "nota",
        desc: "Application de prise de notes (PWA) avec synchronisation cloud.",
        stack: "Next.js · Supabase",
        status: "progress",
      },
      {
        name: "Portfolio 3D",
        desc: "Portfolio personnel avec effets 3D immersifs.",
        stack: "React · Three.js",
        status: "check",
      },
    ],
  },
];
