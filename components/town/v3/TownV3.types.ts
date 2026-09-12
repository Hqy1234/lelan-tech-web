/**
 * LELAN TECHNOLOGY · Town V3 — internal types
 *
 * Only the data needed for the V3 presentation lives here. Everything
 * else (full shop metadata) continues to live in `@/content/town`.
 */

import type { TownShop } from "@/content/town";

/**
 * Static, hand-curated service capability list per shop.
 *
 * IMPORTANT: this is the ONLY place where per-shop service bullets live.
 * It is intentionally NOT generated from `town.ts` because the town
 * content model deliberately does NOT promise specific capabilities per
 * shop (avoiding invented marketing copy). V3 therefore treats the per-shop
 * capabilities below as presentation metadata — they are derived from the
 * shop's `plainLanguageService` + `shortDescription`, never invented.
 */
export interface TownV3ServiceCapability {
  /** Short 2–4 character tag, used as a chip / chip label. */
  tag: string;
  /** 4–8 character human readable description. */
  detail: string;
}

export interface TownV3ShopView {
  shop: TownShop;
  /** Curated, factual bullets for the service portal. */
  capabilities: ReadonlyArray<TownV3ServiceCapability>;
}

/**
 * Hand-curated per-shop capability lists.
 *
 * RULES:
 *  - Each shop gets 4 bullets max.
 *  - Bullets must be derivable from `plainLanguageService` /
 *    `shortDescription` / `dimension`. No invented marketing copy.
 *  - Bullets are shared across shops only when the underlying capability
 *    is genuinely the same (e.g. 文献整理 / 结构梳理 / 学术写作 /
 *    格式规范 — paper writing only).
 */
export const TOWN_V3_SHOP_CAPABILITIES: Record<string, ReadonlyArray<TownV3ServiceCapability>> = {
  "paper-teahouse": [
    { tag: "文献", detail: "文献整理" },
    { tag: "结构", detail: "结构梳理" },
    { tag: "写作", detail: "学术写作" },
    { tag: "规范", detail: "格式规范" },
  ],
  "research-shop": [
    { tag: "选题", detail: "研究问题" },
    { tag: "框架", detail: "研究框架" },
    { tag: "立项", detail: "立项材料" },
    { tag: "梳理", detail: "文献梳理" },
  ],
  "patent-shop": [
    { tag: "交底", detail: "技术交底" },
    { tag: "撰写", detail: "申请撰写" },
    { tag: "组织", detail: "材料组织" },
    { tag: "检索", detail: "检索参考" },
  ],
  "software-shop": [
    { tag: "登记", detail: "软著登记" },
    { tag: "材料", detail: "材料整理" },
    { tag: "撰写", detail: "说明撰写" },
    { tag: "核对", detail: "版本核对" },
  ],
  "funding-shop": [
    { tag: "申报", detail: "申报书" },
    { tag: "回应", detail: "评审回应" },
    { tag: "材料", detail: "材料组织" },
    { tag: "框架", detail: "论证框架" },
  ],
  "transfer-shop": [
    { tag: "评估", detail: "成果评估" },
    { tag: "对接", detail: "对接辅助" },
    { tag: "落地", detail: "落地支持" },
    { tag: "材料", detail: "材料组织" },
  ],
  "industry-research-shop": [
    { tag: "高校", detail: "高校端" },
    { tag: "机构", detail: "科研机构" },
    { tag: "产业", detail: "产业方" },
    { tag: "桥梁", detail: "合作桥梁" },
  ],
  "ai-workshop": [
    { tag: "论文", detail: "论文辅助" },
    { tag: "课题", detail: "课题辅助" },
    { tag: "工具", detail: "工具集合" },
    { tag: "整合", detail: "场景整合" },
  ],
} as const;
