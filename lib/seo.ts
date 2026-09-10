import type { Metadata } from "next";
import {
  brandName,
  locale,
  siteDescription,
  siteName,
  siteUrl,
  hasConfirmedSiteUrl,
} from "@/content/site";

/**
 * SEO 公共 metadata 构建工具。
 *
 * 设计原则：
 * - 不引入第三方 SEO 包；
 * - 不生成未经验证的结构化数据（如虚构的 SearchAction / 公司融资数据）；
 * - 所有内容均来源于已确认的站点信息常量。
 *
 * Domain Safety：
 * 正式域名未确认时（siteUrl 为空），本函数自动降级：
 * - 不输出 canonical URL（避免生成 placeholder domain）
 * - 不输出 Open Graph URL
 * - robots 设为 noindex / nofollow
 * - title / description 仍然正常输出
 */

interface BuildMetadataOptions {
  title?: string;
  description?: string;
  /** 规范路径，必须以 "/" 开头，与 trailingSlash: true 兼容（如 "/ai/"） */
  path?: string;
}

/**
 * 构建单个页面的 Metadata。
 *
 * 重要：每个正式页面必须自行传入自己的 `path`，
 * 不得继承 homepage 的 "/" canonical。
 * 例如 /ai 页应传 `path="/ai/"`。
 *
 * 未配置正式域名时，所有 URL 相关字段自动省略，避免污染搜索引擎索引。
 */
export function buildMetadata({
  title,
  description = siteDescription,
  path = "/",
}: BuildMetadataOptions = {}): Metadata {
  const fullTitle = title ? `${title} — ${siteName}` : siteName;

  // Domain confirmed → emit full URLs; otherwise omit to avoid placeholder indexing
  const canonical = hasConfirmedSiteUrl
    ? new URL(path, siteUrl).toString()
    : undefined;

  const ogUrl = hasConfirmedSiteUrl
    ? new URL(path, siteUrl).toString()
    : undefined;

  return {
    title: fullTitle,
    description,
    ...(canonical && { metadataBase: new URL(siteUrl) }),
    alternates: canonical
      ? { canonical }
      : undefined,
    openGraph: {
      type: "website",
      locale: "zh_CN", // Open Graph locale uses underscore, not hyphen
      siteName,
      title: fullTitle,
      description,
      ...(ogUrl && { url: ogUrl }),
    },
    twitter: {
      card: "summary",
      title: fullTitle,
      description,
    },
    robots: hasConfirmedSiteUrl
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        }
      : {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        },
  };
}

/** 暴露品牌常量，方便其他模块复用，避免重复 import */
export {
  brandName,
  siteName,
  siteUrl,
  siteDescription,
  locale,
  hasConfirmedSiteUrl,
};
