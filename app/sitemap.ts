import type { MetadataRoute } from "next";
import { publishedRoutes, siteUrl, hasConfirmedSiteUrl } from "@/content/site";

/**
 * Next.js 原生 sitemap。
 *
 * 安全策略：
 * - 仅发布已确认上线且域名已确认的路由；
 * - 域名未确认时返回空 entries，不输出 placeholder sitemap；
 * - 不使用 lastModified: new Date() 制造虚假更新信息。
 *
 * 在 `output: "export"` 下，`.xml` 路由必须显式声明 `force-static`。
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Only emit entries when both domain and routes are confirmed
  if (!hasConfirmedSiteUrl || publishedRoutes.length === 0) {
    return [];
  }

  return publishedRoutes.map((path) => ({
    url: new URL(path, siteUrl).toString(),
    // No lastModified — avoids fabricating content update timestamps
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));
}
