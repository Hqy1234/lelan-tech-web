/**
 * LELAN TECHNOLOGY — 站点信息
 *
 * 集中存放网站基础信息，供 layout / sitemap / seo 等模块引用。
 *
 * 注意：
 * - 联系邮箱、Beta 邮箱、生产域名尚未由用户正式确认。
 * - 禁止在此处编造未经确认的邮箱或域名。
 * - 正式生产域名确认后，统一在下方 `siteUrl` 处修改。
 */

export const siteName = "LELAN TECHNOLOGY";
export const brandName = "乐懒科技";

/**
 * 网站对外一句话描述。
 * 简洁、真实、不夸大。
 */
export const siteDescription =
  "乐懒科技 — 一家将科研能力、数据与 AI 转化为真实可用产品与服务的科技公司。";

/**
 * 正式生产域名。
 *
 * 未确认前为空字符串，触发 SEO 安全降级：
 * - noindex / nofollow
 * - 不输出 canonical
 * - 不输出 OG URL
 * - sitemap 返回空 entries
 *
 * 确认后填入，例如："https://lelan.tech"。
 */
export const siteUrl = "";

/** 域名是否已正式确认。供 SEO / sitemap / robots 模块使用。 */
export const hasConfirmedSiteUrl: boolean = siteUrl.length > 0;

/**
 * 规划路由清单（Planned IA）。
 * 未来页面不一定全部上线；此处仅记录规划意图。
 */
export const plannedRoutes = [
  "/",
  "/products",
  "/ai",
  "/town",
  "/guardian",
  "/team",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
] as const;

/**
 * 已上线且可被搜索引擎索引的路由。
 * 在 siteUrl 确认 + 页面实际发布之前，本数组应保持为空。
 */
export const publishedRoutes: string[] = [];

export type PlannedRoute = (typeof plannedRoutes)[number];

/**
 * TODO(configurable): 联系邮箱 — 待用户确认。
 * 禁止写入此前计划中未经确认的地址（如 lelan-tech@lelan.com）。
 * 此处保留为空字符串以便在引用时显式触发 fallback 文案。
 */
export const contactEmail: string = "";

/**
 * TODO(configurable): Beta / 内测邮箱 — 待用户确认。
 * 同样不得自行生成或猜测邮箱地址。
 */
export const betaEmail: string = "";

/** 默认语言 */
export const locale = "zh-CN";
