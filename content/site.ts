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
export const brandName = "乐岚科技";

/**
 * 网站对外一句话描述（用于 metadata.description / OG）。
 * 简短、可对外发布；待产品文案最终定稿后由产品侧替换。
 */
export const siteDescription =
  "LELAN TECHNOLOGY (乐岚科技) — 智能光谱与机器视觉技术驱动的产品与方案。";

/**
 * TODO(configurable): 正式生产域名确认后，统一修改此处。
 * 临时使用占位常量，metadataBase 仅用于 SEO 元数据拼接。
 * 不得在此处编造未经确认的真实域名。
 */
export const siteUrl = "https://example.com";

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

/**
 * 公开路由清单。
 *
 * 用于 sitemap.ts / robots.ts / 后续导航组件。
 * 页面本身可能在后续 Phase 才创建；sitemap 已先行声明结构。
 */
export const publicRoutes = [
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

export type PublicRoute = (typeof publicRoutes)[number];
