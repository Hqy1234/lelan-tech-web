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

export const townResearchShop: VisualAsset = {
  id: "townResearchShop",
  src: "/images/town/buildings/town-research-shop.webp",
  width: 1200,
  height: 900,
  alt: "课题小铺 · 成果小镇的科研课题立项支持小铺",
  status: "placeholder",
  reference: "assets/reference/town/buildings/town-research-shop.png",
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

export const townLingshu: VisualAsset = {
  id: "townLingshu",
  src: "/images/town/characters/town-lingshu.webp",
  width: 800,
  height: 800,
  alt: "灵枢子 · 课题小铺的服务人格形象",
  status: "placeholder",
  reference: "assets/reference/town/characters/town-lingshu.png",
};

/* -------------------------------------------------------------------------- */
/* Guardian · Lifecycle Stages (八卦·八阶段)                                    */
/* -------------------------------------------------------------------------- */

export const guardianStage01: VisualAsset = {
  id: "guardianStage01",
  src: "/images/guardian/stages/stage-01-zhen-infant.webp",
  width: 800, height: 800,
  alt: "震卦 · 婴儿期 — 人生档案第一阶段",
  status: "placeholder",
  reference: "assets/reference/guardian/stages/stage-01-zhen-infant.png",
};
export const guardianStage02: VisualAsset = {
  id: "guardianStage02",
  src: "/images/guardian/stages/stage-02-xun-child.webp",
  width: 800, height: 800,
  alt: "巽卦 · 少儿期 — 人生档案第二阶段",
  status: "placeholder",
  reference: "assets/reference/guardian/stages/stage-02-xun-child.png",
};
export const guardianStage03: VisualAsset = {
  id: "guardianStage03",
  src: "/images/guardian/stages/stage-03-li-adolescent.webp",
  width: 800, height: 800,
  alt: "离卦 · 青少年期 — 人生档案第三阶段",
  status: "placeholder",
  reference: "assets/reference/guardian/stages/stage-03-li-adolescent.png",
};
export const guardianStage04: VisualAsset = {
  id: "guardianStage04",
  src: "/images/guardian/stages/stage-04-dui-young-adult.webp",
  width: 800, height: 800,
  alt: "兑卦 · 青年期 — 人生档案第四阶段",
  status: "placeholder",
  reference: "assets/reference/guardian/stages/stage-04-dui-young-adult.png",
};
export const guardianStage05: VisualAsset = {
  id: "guardianStage05",
  src: "/images/guardian/stages/stage-05-qian-adult.webp",
  width: 800, height: 800,
  alt: "乾卦 · 壮年期 — 人生档案第五阶段",
  status: "placeholder",
  reference: "assets/reference/guardian/stages/stage-05-qian-adult.png",
};
export const guardianStage06: VisualAsset = {
  id: "guardianStage06",
  src: "/images/guardian/stages/stage-06-kan-middle-age.webp",
  width: 800, height: 800,
  alt: "坎卦 · 中年期 — 人生档案第六阶段",
  status: "placeholder",
  reference: "assets/reference/guardian/stages/stage-06-kan-middle-age.png",
};
export const guardianStage07: VisualAsset = {
  id: "guardianStage07",
  src: "/images/guardian/stages/stage-07-gen-later-life.webp",
  width: 800, height: 800,
  alt: "艮卦 · 中老年期 — 人生档案第七阶段",
  status: "placeholder",
  reference: "assets/reference/guardian/stages/stage-07-gen-later-life.png",
};
export const guardianStage08: VisualAsset = {
  id: "guardianStage08",
  src: "/images/guardian/stages/stage-08-kun-elder.webp",
  width: 800, height: 800,
  alt: "坤卦 · 老年期 — 人生档案第八阶段",
  status: "placeholder",
  reference: "assets/reference/guardian/stages/stage-08-kun-elder.png",
};

/* -------------------------------------------------------------------------- */
/* Guardian · Five Elements (五行生活维度)                                     */
/* -------------------------------------------------------------------------- */

export const guardianWealth: VisualAsset = {
  id: "guardianWealth",
  src: "/images/guardian/elements/guardian-wealth-workshop.webp",
  width: 600, height: 600,
  alt: "金 · 财富 — 五行生活维度之财富工坊",
  status: "placeholder",
  reference: "assets/reference/guardian/elements/guardian-wealth-workshop.png",
};
export const guardianLongevity: VisualAsset = {
  id: "guardianLongevity",
  src: "/images/guardian/elements/guardian-longevity-hall.webp",
  width: 600, height: 600,
  alt: "木 · 健康 — 五行生活维度之长生堂",
  status: "placeholder",
  reference: "assets/reference/guardian/elements/guardian-longevity-hall.png",
};
export const guardianCloud: VisualAsset = {
  id: "guardianCloud",
  src: "/images/guardian/elements/guardian-cloud-pavilion.webp",
  width: 600, height: 600,
  alt: "水 · 出行 — 五行生活维度之行云阁",
  status: "placeholder",
  reference: "assets/reference/guardian/elements/guardian-cloud-pavilion.png",
};
export const guardianHarmony: VisualAsset = {
  id: "guardianHarmony",
  src: "/images/guardian/elements/guardian-harmony-hall.webp",
  width: 600, height: 600,
  alt: "土 · 安居 — 五行生活维度之和居庐",
  status: "placeholder",
  reference: "assets/reference/guardian/elements/guardian-harmony-hall.png",
};
export const guardianCuisine: VisualAsset = {
  id: "guardianCuisine",
  src: "/images/guardian/elements/guardian-cuisine-hall.webp",
  width: 600, height: 600,
  alt: "火 · 饮食 — 五行生活维度之炊香斋",
  status: "placeholder",
  reference: "assets/reference/guardian/elements/guardian-cuisine-hall.png",
};

/* -------------------------------------------------------------------------- */
/* Guardian · Overview                                                         */
/* -------------------------------------------------------------------------- */

export const guardianNuwa: VisualAsset = {
  id: "guardianNuwa",
  src: "/images/guardian/overview/guardian-nuwa.webp",
  width: 400, height: 400,
  alt: "女娲 · 首席守护官 — 乐懒守护视觉锚点",
  status: "placeholder",
  reference: "assets/reference/guardian/overview/guardian-nuwa.png",
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
  townResearchShop,
  townLingshu,
  guardianStage01,
  guardianStage02,
  guardianStage03,
  guardianStage04,
  guardianStage05,
  guardianStage06,
  guardianStage07,
  guardianStage08,
  guardianWealth,
  guardianLongevity,
  guardianCloud,
  guardianHarmony,
  guardianCuisine,
  guardianNuwa,
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
  {
    reference: "assets/reference/town/buildings/town-research-shop.png",
    delivery: townResearchShop,
    note: "Phase 1C secondary pair — 已生成 webp derivative",
  },
  {
    reference: "assets/reference/town/characters/town-lingshu.png",
    delivery: townLingshu,
    note: "Phase 1C secondary pair — 已生成 webp derivative",
  },
  {
    reference: "assets/reference/guardian/stages/stage-04-dui-young-adult.png",
    delivery: guardianStage04,
    note: "Phase 2 Guardian — 八阶段·青年期 lifecycle stage",
  },
  {
    reference: "assets/reference/guardian/stages/stage-01-zhen-infant.png",
    delivery: guardianStage01,
    note: "Phase 2 Guardian — 八阶段·婴儿期",
  },
  {
    reference: "assets/reference/guardian/stages/stage-02-xun-child.png",
    delivery: guardianStage02,
    note: "Phase 2 Guardian — 八阶段·少儿期",
  },
  {
    reference: "assets/reference/guardian/stages/stage-03-li-adolescent.png",
    delivery: guardianStage03,
    note: "Phase 2 Guardian — 八阶段·青少年期",
  },
  {
    reference: "assets/reference/guardian/stages/stage-05-qian-adult.png",
    delivery: guardianStage05,
    note: "Phase 2 Guardian — 八阶段·壮年期",
  },
  {
    reference: "assets/reference/guardian/stages/stage-06-kan-middle-age.png",
    delivery: guardianStage06,
    note: "Phase 2 Guardian — 八阶段·中年期",
  },
  {
    reference: "assets/reference/guardian/stages/stage-07-gen-later-life.png",
    delivery: guardianStage07,
    note: "Phase 2 Guardian — 八阶段·中老年期",
  },
  {
    reference: "assets/reference/guardian/stages/stage-08-kun-elder.png",
    delivery: guardianStage08,
    note: "Phase 2 Guardian — 八阶段·老年期",
  },
  {
    reference: "assets/reference/guardian/elements/guardian-wealth-workshop.png",
    delivery: guardianWealth,
    note: "Phase 2 Guardian — 五行·金·财富工坊",
  },
  {
    reference: "assets/reference/guardian/elements/guardian-longevity-hall.png",
    delivery: guardianLongevity,
    note: "Phase 2 Guardian — 五行·木·长生堂",
  },
  {
    reference: "assets/reference/guardian/elements/guardian-cloud-pavilion.png",
    delivery: guardianCloud,
    note: "Phase 2 Guardian — 五行·水·行云阁",
  },
  {
    reference: "assets/reference/guardian/elements/guardian-harmony-hall.png",
    delivery: guardianHarmony,
    note: "Phase 2 Guardian — 五行·土·和居庐",
  },
  {
    reference: "assets/reference/guardian/elements/guardian-cuisine-hall.png",
    delivery: guardianCuisine,
    note: "Phase 2 Guardian — 五行·火·炊香斋",
  },
  {
    reference: "assets/reference/guardian/overview/guardian-nuwa.png",
    delivery: guardianNuwa,
    note: "Phase 2 Guardian — 首席守护官·女娲（水印/版权待确认）",
  },
  // 其余 28 张 reference 资产为未来升级 / Phase 1B 之后的 UI 单元预备，
  // 当前不进入 delivery，亦不向浏览器暴露 src。
];
