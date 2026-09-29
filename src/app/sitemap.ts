import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://planoevents.site",
      lastModified: "2026-09-29",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://planoevents.site/privacy",
      lastModified: "2026-09-29",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://planoevents.site/terms",
      lastModified: "2026-09-29",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://planoevents.site/data-deletion",
      lastModified: "2026-09-29",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://planoevents.site/supplier-data-notice",
      lastModified: "2026-09-29",
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
