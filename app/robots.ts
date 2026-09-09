import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

/**
 * Next.js 原生 robots.txt。
 * 标准配置：允许全部抓取，明确指向 sitemap.xml。
 *
 * 在 `output: "export"` 下，`.txt` 路由必须显式声明 `force-static`，
 * 否则 build 阶段会报：
 *   "export const dynamic = \"force-static\"/export const revalidate not configured on route"
 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
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
