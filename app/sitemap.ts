import type { MetadataRoute } from "next";
import { publishedRoutes, siteUrl, hasConfirmedSiteUrl } from "@/content/site";

// Next.js native sitemap.
// Phase 1A: route availability is decoupled from sitemap indexability.
// Only emit entries when domain is confirmed AND there are published routes.
// Skip domain placeholder URLs entirely.

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!hasConfirmedSiteUrl) {
    return [];
  }

  if (publishedRoutes.length === 0) {
    return [];
  }

  const result: MetadataRoute.Sitemap = publishedRoutes.map((path) => {
    return {
      url: new URL(path, siteUrl).toString(),
      changeFrequency: "weekly",
      priority: path === "/" ? 1 : 0.7,
    };
  });
  return result;
}
