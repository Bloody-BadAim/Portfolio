import type { MetadataRoute } from "next";

const baseUrl = "https://portfolio-etercx1n4-bloody-badaims-projects.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
