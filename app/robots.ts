import type { MetadataRoute } from "next";
import { hasConfirmedSiteUrl, siteUrl } from "@/content/site";

/**
 * Next.js 原生 robots.txt。
 *
 * Next.js 16 + `output: "export"` 下必须保留 `dynamic = "force-static"`。
 *
 * 设计原则（Phase 1A 修复）：
 *
 * 1) **不**在源码中硬编码 placeholder domain。当域名未确认时，
 *    `sitemap` 与 `host` 字段必须整体省略，而不是输出 `"https://placeholder"`。
 *
 * 2) **不**将 robots.txt 用作访问控制。任何用户仍可访问站点；
 *    robots.txt 仅告知合规爬虫爬取偏好。
 *
 * 3) **公开预览** (domain unconfirmed but reachable)：
 *    - allow: "/" — 允许爬虫到达站点
 *    - 配合页面级 `noindex` 元数据，使爬虫能读取并遵循 noindex 指令
 *    - 不暴露 sitemap.xml URL（避免搜索引擎索引 placeholder 路径）
 *
 * 4) **正式生产** (domain confirmed)：
 *    - allow: "/"
 *    - 暴露 sitemap.xml 与 host 字段
 *    - sitemap 字段严格基于 siteUrl 构造，不引用任何 placeholder
 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (!hasConfirmedSiteUrl) {
    // 公开预览期：允许爬取，配合页面级 noindex。
    return {
      rules: [
        {
          userAgent: "*",
          allow: "/",
          disallow: ["/api/"],
        },
      ],
      // 故意省略 sitemap 与 host：未确认域名时不暴露 placeholder URL。
    };
  }

  // 正式生产：sitemap 与 host 均基于已确认 siteUrl。
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
    host: siteUrl,
  };
}
