/**
 * LELAN TECHNOLOGY — 视觉资产映射
 *
 * 设计原则：
 * - 组件层只引用"语义资产 id"，不直接硬编码 `public/` 路径。
 * - 原始 reference 资产位于 `assets/reference/`，**不**对外暴露浏览器 URL。
 * - 网页 delivery 资产位于 `public/images/`，仅含经过精选 / 转换的 derivatives。
 * - 路径 / 扩展名可能演进；id 与语义保持稳定。
 *
 * status 含义：
 * - "placeholder" — 当前为客户素材 / PPT 截图 / 草稿转换图，**非最终商用定稿**
 * - "approved"    — 通过版权与艺术方向审核，正式可用
 * - "future"      — 仅占位 / 路由占位 / 远期升级目标，尚未在 UI 中渲染
 */

export type AssetStatus = "placeholder" | "approved" | "future";

export interface VisualAsset {
  /** 语义唯一 id（如 `townPaperTeahouse`，供组件直接引用） */
  id: string;

  /** 对外（浏览器）可访问的 src，相对网站根目录，已含 Next.js trailingSlash 兼容前缀 */
  src: string;

  /** 渲染所需固有像素比，避免 CLS */
  width: number;
  height: number;

  /** 无障碍替代文本；若为复杂图层可补充详细描述 */
  alt: string;

  /** 当前可用阶段，用于区分 placeholder / approved / future */
  status: AssetStatus;

  /** 内部溯源用：对应的 reference 资源相对路径（如 `assets/reference/town/buildings/...`），仅用于工程追踪，不暴露浏览器 */
  reference?: string;
}

/* -------------------------------------------------------------------------- */
/* Town · Buildings                                                           */
/* -------------------------------------------------------------------------- */

export const townPaperTeahouse: VisualAsset = {
  id: "townPaperTeahouse",
  src: "/images/town/buildings/town-paper-teahouse.webp",
  width: 1200,
  height: 900,
  alt: "论文茶寮 · 成果小镇的论文写作服务小铺",
  status: "placeholder",
  reference: "assets/reference/town/buildings/town-paper-teahouse.png",
};

/* -------------------------------------------------------------------------- */
/* Town · Characters                                                          */
/* -------------------------------------------------------------------------- */

export const townWenqu: VisualAsset = {
  id: "townWenqu",
  src: "/images/town/characters/town-wenqu.webp",
  width: 800,
  height: 800,
  alt: "文曲茶娘 · 论文茶寮的服务人格形象",
  status: "placeholder",
  reference: "assets/reference/town/characters/town-wenqu.png",
};

/* -------------------------------------------------------------------------- */
/* Asset registry                                                             */
/* -------------------------------------------------------------------------- */

/**
 * 当前可在 UI 中被引用的资产注册表。
 * 只有真正进入 delivery / 与代码耦合的资产才注册。
 *
 * 未注册的 reference 资源不暴露给浏览器，亦不参与 SEO / sitemap。
 */
export const visualAssets = {
  townPaperTeahouse,
  townWenqu,
} as const satisfies Record<string, VisualAsset>;

export type VisualAssetId = keyof typeof visualAssets;

/**
 * 仅供编辑 / 文档查阅：列出全部 reference 资产与对应 delivery 资产的对应关系。
 * 当前 Phase 1A 仅映射 2 张代表资产；其他 reference 资源进入 `reference` 字段预留位。
 */
export const assetReferenceIndex: ReadonlyArray<{
  reference: string;
  delivery?: VisualAsset;
  note?: string;
}> = [
  {
    reference: "assets/reference/town/buildings/town-paper-teahouse.png",
    delivery: townPaperTeahouse,
    note: "Phase 1A representative — 已生成 webp derivative",
  },
  {
    reference: "assets/reference/town/characters/town-wenqu.png",
    delivery: townWenqu,
    note: "Phase 1A representative — 已生成 webp derivative",
  },
  // 其余 28 张 reference 资产为未来升级 / Phase 1B 之后的 UI 单元预备，
  // 当前不进入 delivery，亦不向浏览器暴露 src。
];
