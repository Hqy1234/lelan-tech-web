import type { MetadataRoute } from "next";
import { hasConfirmedSiteUrl } from "@/content/site";

/**
 * Next.js 原生 robots.txt。
 *
 * 在 `output: "export"` 下，`.txt` 路由必须显式声明 `force-static`。
 * Codex review 确认：保留。
 *
 * Domain Safety：
 * 域名未确认时仅 disallow 全站 + API，避免搜索引擎将 placeholder 构建当作正式站点索引。
 * 域名确认后恢复允许索引 + sitemap URL。
 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (!hasConfirmedSiteUrl) {
    // Noindex stage: block all crawlers from indexing until domain is confirmed.
    return {
      rules: [
        {
          userAgent: "*",
          disallow: ["/", "/api/"],
        },
      ],
      // No sitemap URL when domain is not confirmed — avoids pointing to placeholder
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: new URL("/sitemap.xml", "https://placeholder").toString(),
    host: "https://placeholder",
  };
}
