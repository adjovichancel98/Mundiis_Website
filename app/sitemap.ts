import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { positions } from "@/lib/positions";

const routes = [
  "",
  "/services",
  "/equipements",
  "/logiciels",
  "/ia-data",
  "/conseil",
  "/energie",
  "/projets",
  "/creations",
  "/apropos",
  "/rejoindre",
  "/actualites",
  "/contact",
  "/confidentialite",
  ...positions.map((p) => `/rejoindre/${p.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
