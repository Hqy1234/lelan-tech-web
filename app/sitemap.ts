import type { MetadataRoute } from "next";
import { publicRoutes, siteUrl } from "@/content/site";

/**
 * Next.js 原生 sitemap。
 * 公开路由清单来源于 content/site.ts，与未来页面创建保持单一来源。
 *
 * 在 `output: "export"` 下，`.xml` 路由必须显式声明 `force-static`。
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return publicRoutes.map((path) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
