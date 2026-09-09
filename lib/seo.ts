import type { Metadata } from "next";
import {
  brandName,
  locale,
  siteDescription,
  siteName,
  siteUrl,
} from "@/content/site";

/**
 * SEO 公共 metadata 构建工具。
 *
 * 设计原则：
 * - 不引入第三方 SEO 包；
 * - 不生成未经验证的结构化数据（如虚构的 SearchAction / 公司融资数据）；
 * - 所有内容均来源于已确认的站点信息常量。
 */

interface BuildMetadataOptions {
  title?: string;
  description?: string;
  /** 规范路径，必须以 "/" 开头 */
  path?: string;
}

/**
 * 构建单个页面的 Metadata。
 * - title 默认沿用 siteName；
 * - path 用于拼接 canonical 与 og:url。
 */
export function buildMetadata({
  title,
  description = siteDescription,
  path = "/",
}: BuildMetadataOptions = {}): Metadata {
  const fullTitle = title ? `${title} — ${siteName}` : siteName;
  const canonical = new URL(path, siteUrl).toString();

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      locale,
      siteName,
      title: fullTitle,
      description,
      url: canonical,
    },
    twitter: {
      card: "summary",
      title: fullTitle,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/** 暴露品牌常量，方便其他模块复用，避免重复 import */
export { brandName, siteName, siteUrl, siteDescription, locale };
