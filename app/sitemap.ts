import type { MetadataRoute } from "next";

const baseUrl = "https://portfolio-etercx1n4-bloody-badaims-projects.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
