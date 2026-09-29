import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.grofi.in";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    // add your other pages, e.g.:
    // { url: `${base}/loans`, changeFrequency: "weekly", priority: 0.8 },
  ];
}