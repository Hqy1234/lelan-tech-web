/**
 * LELAN TECHNOLOGY · 成果小镇 Shop 数据模型
 *
 * 用于：
 * - 首页"成果小镇"区段（铺设 8 个铺子入口）
 * - 未来的 `/town` 详情页（如已上线）
 *
 * 字段约束：
 * - `plainLanguageService` 必须用通俗中文描述业务，**不可只用铺子名/Agent 名**。
 * - `availability` 决定首页是否呈现可点击行为：
 *     "preview"   — 当前阶段可点击，但目标页尚未实现（占位说明）
 *     "concept"   — 仅作为小镇图谱展示，**不**绑定可点击行为
 *     "ready"     — 目标路由已发布（未来阶段确认）
 * - 当前 Phase 1A **不**为任何店铺生成 `href`，避免破坏路由真相。
 */

import type { VisualAssetId } from "./assets";

export type ShopAvailability = "preview" | "concept" | "ready";

export type TownShopAgentRole = "concept" | "persona";

export const AGENT_ROLE_LABELS: Record<TownShopAgentRole, string> = {
  concept: "服务人格 · 未来 Agent 形象",
  persona: "服务角色",
};

/**
 * Default selected shop for Town homepage section and hash fallback.
 * Locked: `paper-teahouse` (01) is the showcase shop with real building
 * and character assets.
 */
export const DEFAULT_SHOP_ID = "paper-teahouse" as const;

/**
 * Town plot position in the map's normalized coordinate system (0–100).
 *
 * Phase 1E.3-B — positions form a deliberate east-west axis of research flow:
 *
 *   west plot column (input / upstream)        east plot column (output / downstream)
 *   ┌─────────┬─────────┬─────────┐           ┌─────────┬─────────┬─────────┐
 *   │ 03 专利 │ 01 论文 │ 02 课题 │  ─ main road ─  │ 04 软著 │ 06 转化 │ 08 AI  │
 *   │  专利   │  论文   │  课题   │                │  软著   │  转化   │  工具  │
 *   ├─────────┼─────────┼─────────┤                ├─────────┼─────────┼─────────┤
 *   │         │ 05 申报 │ 07 产学研               │         │         │         │
 *   └─────────┴─────────┴─────────┘                └─────────┴─────────┴─────────┘
 *
 * Roads are: 1 main east-west axis + 2 cross branches (one mid, one south).
 * Coordinate range is 0–100 (independent of viewport). MapStage renders in 100%
 * of its container with preserveAspectRatio="none".
 */
export interface TownShopPlotPosition {
  /** x in 0–100 (left → right) */
  x: number;
  /** y in 0–100 (top → bottom) */
  y: number;
}

/**
 * Phase 1E.4-B — Town Globe position (spherical), used by the WebGL renderer.
 *
 * `plot {x, y}` above remains the source of truth for the 2D fallback map.
 * This is the globe equivalent, kept explicit rather than hardcoded as eight
 * JSX positions.
 *
 * Convention (right-handed, +Y is the town's local "north pole"):
 *   latitude  0  = equator      +90 = pole
 *   longitude 0  = prime meridian, increasing eastward (0–360)
 *
 * Distribution intent — a TOWN SETTLEMENT, not eight evenly-spaced satellites:
 *   01 论文茶寮 is the civic centre (faces the camera first, longitude 0).
 *   02–04 form an upstream research cluster hugging the centre.
 *   05–07 form a second cluster (funding / transformation) to the south-east.
 *   08 AI 工具坊 sits slightly separated and raised, like a hill workshop.
 *
 * All 8 must stay reachable by rotating the world.
 */
export interface TownShopGlobePosition {
  /** Latitude in degrees. Positive = toward the local north pole. */
  latitude: number;
  /** Longitude in degrees, 0–360. */
  longitude: number;
  /**
   * Visual elevation above the terrain surface (in globe radii).
   * Only 08 uses a raised value — it reads as a hill workshop.
   */
  elevation?: number;
}

export interface TownShop {
  /** 锁定映射使用的语义 id */
  id:
    | "paper-teahouse"
    | "research-shop"
    | "patent-shop"
    | "software-shop"
    | "funding-shop"
    | "transfer-shop"
    | "industry-research-shop"
    | "ai-workshop";

  /** 锁定的铺位编号，"01"–"08"，用于编辑排序与编号展示 */
  number: "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08";

  /** 文化铺子名（如"论文茶寮"） */
  name: string;

  /** 服务人格名（如"文曲茶娘"） */
  agent: string;

  /** 服务人格的当前定位：用于诚实表达此人格当前是品牌概念还是已上线 Agent */
  agentRole: "concept" | "persona";

  /** 通俗业务能力描述（强制字段，避免仅以文化名词表达） */
  plainLanguageService: string;

  /** 一句话补充（不夸大、无市场数据、无商业承诺） */
  shortDescription: string;

  /** 服务维度定位（一句话，出现在 shop 详情里） */
  dimension: string;

  /** 语义化的视觉资产 id（仅在 `assets.ts` 已注册时使用） */
  buildingAssetId?: VisualAssetId;
  characterAssetId?: VisualAssetId;

  /**
   * 当前是否已注册到 delivery 资产 registry。
   * 只对有真实素材的 shop 使用真建筑渲染；其他 shop 在 MapStage 显示为
   * "architectural plot placeholder"（未来建筑位）。
   */
  hasBuildingAsset: boolean;
  hasCharacterAsset: boolean;

  /**
   * Plot 坐标（normalized 0–100）。必须与 TownMapStage 的路面网格对齐。
   * Phase 1E.3-B 锁定位置，未来调整需要双轴同步。
   * Phase 1E.4-B：保留给 2D fallback renderer 使用，**不得删除**。
   */
  plot: TownShopPlotPosition;

  /**
   * Phase 1E.4-B — Town Globe 球面坐标（WebGL renderer 使用）。
   * 与 `plot` 双轨并存：Globe 用 `globe`，2D fallback 用 `plot`。
   */
  globe: TownShopGlobePosition;

  /** 该店铺当前是否可被点击跳转到真实目的地 */
  availability: ShopAvailability;
}

export const townShops: ReadonlyArray<TownShop> = [
  {
    id: "paper-teahouse",
    number: "01",
    name: "论文茶寮",
    agent: "文曲茶娘",
    agentRole: "concept",
    plainLanguageService: "学术论文写作辅助",
    shortDescription:
      "围绕论文选题、文献组织、正文写作与回应评审意见提供支持。",
    dimension: "Writing",
    buildingAssetId: "townPaperTeahouse",
    characterAssetId: "townWenqu",
    hasBuildingAsset: true,
    hasCharacterAsset: true,
    plot: { x: 35, y: 28 },
    globe: { latitude: 42, longitude: 0 },
    availability: "preview",
  },
  {
    id: "research-shop",
    number: "02",
    name: "课题小铺",
    agent: "灵枢子",
    agentRole: "concept",
    plainLanguageService: "科研课题立项支持",
    shortDescription: "协助梳理研究问题、框架与立项材料。",
    dimension: "Research",
    buildingAssetId: "townResearchShop",
    characterAssetId: "townLingshu",
    hasBuildingAsset: true,
    hasCharacterAsset: true,
    plot: { x: 50, y: 28 },
    globe: { latitude: 24, longitude: 300 },
    availability: "concept",
  },
  {
    id: "patent-shop",
    number: "03",
    name: "专利小铺",
    agent: "机枢生",
    agentRole: "persona",
    plainLanguageService: "专利申请与撰写支持",
    shortDescription: "围绕专利交底、撰写与申请材料组织。",
    dimension: "IP",
    buildingAssetId: "townPatentShop",
    hasBuildingAsset: true,
    hasCharacterAsset: false,
    plot: { x: 20, y: 28 },
    globe: { latitude: 32, longitude: 330 },
    availability: "concept",
  },
  {
    id: "software-shop",
    number: "04",
    name: "软著小铺",
    agent: "珠玑客",
    agentRole: "persona",
    plainLanguageService: "软件著作权登记支持",
    shortDescription: "协助软件著作权登记材料的整理与撰写。",
    dimension: "IP",
    buildingAssetId: "townSoftwareShop",
    hasBuildingAsset: true,
    hasCharacterAsset: false,
    plot: { x: 65, y: 28 },
    globe: { latitude: 30, longitude: 26 },
    availability: "concept",
  },
  {
    id: "funding-shop",
    number: "05",
    name: "申报辅导",
    agent: "奏章生",
    agentRole: "persona",
    plainLanguageService: "科研项目与基金申报辅导",
    shortDescription: "协助基金 / 项目申报书的撰写与回应专家意见。",
    dimension: "Funding",
    buildingAssetId: "townFundingShop",
    hasBuildingAsset: true,
    hasCharacterAsset: false,
    plot: { x: 35, y: 62 },
    globe: { latitude: 14, longitude: 348 },
    availability: "concept",
  },
  {
    id: "transfer-shop",
    number: "06",
    name: "成果转化",
    agent: "通宝掌柜",
    agentRole: "persona",
    plainLanguageService: "科研成果转化支持",
    shortDescription: "围绕成果评估、对接与落地的辅助支持。",
    dimension: "Transformation",
    buildingAssetId: "townTransferShop",
    hasBuildingAsset: true,
    hasCharacterAsset: false,
    plot: { x: 65, y: 62 },
    globe: { latitude: 8, longitude: 62 },
    availability: "concept",
  },
  {
    id: "industry-research-shop",
    number: "07",
    name: "产学研对接",
    agent: "连横子",
    agentRole: "persona",
    plainLanguageService: "产学研资源对接支持",
    shortDescription: "协助高校、科研机构与产业方建立合作桥梁。",
    dimension: "Transformation",
    buildingAssetId: "townIndustryResearchShop",
    hasBuildingAsset: true,
    hasCharacterAsset: false,
    plot: { x: 50, y: 62 },
    globe: { latitude: 16, longitude: 40 },
    availability: "concept",
  },
  {
    id: "ai-workshop",
    number: "08",
    name: "AI 工具坊",
    agent: "丹青客",
    agentRole: "persona",
    plainLanguageService: "科研与写作场景的 AI 工具集合",
    shortDescription: "围绕论文与课题常用场景整合 AI 辅助能力。",
    dimension: "AI Tools",
    buildingAssetId: "townAiWorkshop",
    hasBuildingAsset: true,
    hasCharacterAsset: false,
    plot: { x: 80, y: 28 },
    globe: { latitude: 48, longitude: 88, elevation: 0.03 },
    availability: "concept",
  },
] as const;

/** 锁定映射服务的最多 6 个能力维度（与 PROJECT.md §3.2 一致） */
export const townCapabilities: ReadonlyArray<{
  id: string;
  label: string;
  description: string;
}> = [
  { id: "Research", label: "Research", description: "课题立项与文献研究" },
  { id: "Writing", label: "Writing", description: "论文与申报书写作" },
  { id: "IP", label: "IP", description: "专利与软著" },
  { id: "Funding", label: "Funding", description: "基金与项目申报" },
  { id: "Transformation", label: "Transformation", description: "成果转化对接" },
  { id: "AI Tools", label: "AI Tools", description: "AI 工具辅助" },
] as const;

export type TownCapability = (typeof townCapabilities)[number];
