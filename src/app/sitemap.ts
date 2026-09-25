import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://planoevents.site",
      lastModified: "2026-09-25",
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
