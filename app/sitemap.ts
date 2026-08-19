import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

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
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
