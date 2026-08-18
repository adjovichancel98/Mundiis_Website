export type LabProduct = {
  status: string;
  title: string;
  text: string;
};

export const labs: LabProduct[] = [
  {
    status: "En développement",
    title: "Sika",
    text: "Un moteur de recherche documentaire par IA pour les professionnels : retrouver l'information juste dans vos documents, en langage naturel.",
  },
  {
    status: "Prototype",
    title: "Scan Santé",
    text: "Une application d'analyse d'ordonnances à partir d'une simple photo, pour rendre l'information médicale plus lisible.",
  },
  {
    status: "En conception",
    title: "Devis inclusif",
    text: "Un outil de génération de devis pensé pour le contexte local, intégrant la langue fon pour l'accessibilité.",
  },
];
