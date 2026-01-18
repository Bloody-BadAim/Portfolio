import type { MetadataRoute } from "next";
import { getProjectSlug, projects } from "@/content/projects";

const baseUrl = "https://portfolio-etercx1n4-bloody-badaims-projects.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries = projects.map((project) => ({
    url: `${baseUrl}/projects/${getProjectSlug(project)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectEntries,
  ];
}
