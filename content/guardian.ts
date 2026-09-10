/**
 * LELAN TECHNOLOGY · Guardian Content Model
 *
 * Phase 2 — Guardian Life Coordinate System
 *
 * Product hierarchy:
 *   1. 人生档案（Life Archive）
 *   2. 乐懒守护符 · 人生坐标（Life Coordinate System）
 *   3. 坐标化闯关（Coordinate Quest）— Y: 八阶段 × X: 当前任务
 *   4. 五行生活维度 teaser（金/木/水/火/土）
 *   5. 科学方法论（建档/队列/校准/提示/落地）
 *
 * Visual language:
 *   - 80% restrained editorial UI
 *   - 20% oriental lifecycle / archive aesthetics
 *   - Guardian ≠ Town (档案 vs 空间)
 *
 * Asset semantics:
 *   - stages/  = lifecycle stage visual (八卦·八阶段)
 *   - elements/ = five-element building (五行生活维度)
 *   - overview/  = chief guardian anchor (女娲 · 首席守护官)
 *
 * Watermark notice: guardian-nuwa.png has watermark/copyright pending confirmation.
 * Do not remove watermark. Mark as placeholder in production.
 */

import type { VisualAssetId } from "./assets";

/* -------------------------------------------------------------------------- */
/* Lifecycle Stages — 八卦·八阶段                                               */
/* -------------------------------------------------------------------------- */

export interface GuardianStage {
  /** Semantic id */
  id: string;
  /** Sequential order 01–08 */
  order: "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08";
  /** Trigram name in Chinese */
  trigram: string;
  /** Stage name in Chinese */
  name: string;
  /** Age range string (display only — not medical/actuarial data) */
  ageRange: string;
  /** Visual asset id from assets.ts */
  stageAssetId: VisualAssetId;
  /** Example tasks for this stage (display purpose only) */
  exampleTasks: ReadonlyArray<{
    label: string;
    done?: boolean;
  }>;
  /** How many example tasks are "done" in demo */
  demoDoneCount: number;
  /** Scene description for this example task set */
  sceneLabel: string;
}

export const guardianStages: ReadonlyArray<GuardianStage> = [
  {
    id: "zhen-infant",
    order: "01",
    trigram: "震",
    name: "婴儿期",
    ageRange: "0–9",
    stageAssetId: "guardianStage01",
    sceneLabel: "婴儿期 · 人生起点",
    demoDoneCount: 0,
    exampleTasks: [
      { label: "出生一件事", done: true },
      { label: "上户口", done: false },
      { label: "办医保", done: false },
      { label: "打疫苗", done: false },
      { label: "入学准备", done: false },
    ],
  },
  {
    id: "xun-child",
    order: "02",
    trigram: "巽",
    name: "少儿期",
    ageRange: "10–19",
    stageAssetId: "guardianStage02",
    sceneLabel: "少儿期 · 成长奠基",
    demoDoneCount: 0,
    exampleTasks: [
      { label: "入学报名", done: false },
      { label: "学籍建档", done: false },
      { label: "医保缴费", done: false },
      { label: "疫苗补种", done: false },
      { label: "成长记录", done: false },
    ],
  },
  {
    id: "li-adolescent",
    order: "03",
    trigram: "离",
    name: "青少年期",
    ageRange: "20–29",
    stageAssetId: "guardianStage03",
    sceneLabel: "青少年期 · 求学探索",
    demoDoneCount: 0,
    exampleTasks: [
      { label: "学业规划", done: false },
      { label: "心理辅导", done: false },
      { label: "升学填报", done: false },
      { label: "解压用品", done: false },
      { label: "职业探索", done: false },
    ],
  },
  {
    id: "dui-young-adult",
    order: "04",
    trigram: "兑",
    name: "青年期",
    ageRange: "30–39",
    stageAssetId: "guardianStage04",
    sceneLabel: "青年期 · 创业场景示例",
    demoDoneCount: 4,
    exampleTasks: [
      { label: "公司核名", done: true },
      { label: "工商注册", done: true },
      { label: "公章刻印", done: true },
      { label: "银行开户", done: true },
      { label: "税务登记", done: false },
      { label: "社保开户", done: false },
      { label: "域名注册", done: false },
      { label: "云服务器", done: false },
    ],
  },
  {
    id: "qian-adult",
    order: "05",
    trigram: "乾",
    name: "壮年期",
    ageRange: "40–49",
    stageAssetId: "guardianStage05",
    sceneLabel: "壮年期 · 事业稳健",
    demoDoneCount: 0,
    exampleTasks: [
      { label: "企业年报", done: false },
      { label: "税务申报", done: false },
      { label: "融资贷款", done: false },
      { label: "资源对接", done: false },
      { label: "资产配置", done: false },
    ],
  },
  {
    id: "kan-middle-age",
    order: "06",
    trigram: "坎",
    name: "中年期",
    ageRange: "50–59",
    stageAssetId: "guardianStage06",
    sceneLabel: "中年期 · 承上启下",
    demoDoneCount: 0,
    exampleTasks: [
      { label: "资产登记", done: false },
      { label: "保险配置", done: false },
      { label: "个税申报", done: false },
      { label: "理财规划", done: false },
      { label: "传承准备", done: false },
    ],
  },
  {
    id: "gen-later-life",
    order: "07",
    trigram: "艮",
    name: "中老年期",
    ageRange: "60–69",
    stageAssetId: "guardianStage07",
    sceneLabel: "中老年期 · 颐养过渡",
    demoDoneCount: 0,
    exampleTasks: [
      { label: "体检预约", done: false },
      { label: "慢病管理", done: false },
      { label: "社保查询", done: false },
      { label: "适老改造", done: false },
      { label: "兴趣规划", done: false },
    ],
  },
  {
    id: "kun-elder",
    order: "08",
    trigram: "坤",
    name: "老年期",
    ageRange: "70+",
    stageAssetId: "guardianStage08",
    sceneLabel: "老年期 · 安享晚年",
    demoDoneCount: 0,
    exampleTasks: [
      { label: "养老认证", done: false },
      { label: "异地医保", done: false },
      { label: "长期护理", done: false },
      { label: "财产传承", done: false },
      { label: "社会参与", done: false },
    ],
  },
] as const;

/** Default active stage = 兑 · 青年期 (04) */
export const DEFAULT_STAGE_ID = "dui-young-adult";

/* -------------------------------------------------------------------------- */
/* Five Elements — 五行生活维度                                               */
/* -------------------------------------------------------------------------- */

export interface GuardianElement {
  id: string;
  /** Chinese element name */
  element: string;
  /** Dimension label */
  dimension: string;
  /** Short description */
  description: string;
  /** Visual asset id from assets.ts */
  assetId: VisualAssetId;
}

export const guardianElements: ReadonlyArray<GuardianElement> = [
  {
    id: "wealth",
    element: "金",
    dimension: "财富",
    description: "财务与资产规划",
    assetId: "guardianWealth",
  },
  {
    id: "health",
    element: "木",
    dimension: "健康",
    description: "健康与长期状态管理",
    assetId: "guardianLongevity",
  },
  {
    id: "travel",
    element: "水",
    dimension: "出行",
    description: "出行与旅途安排",
    assetId: "guardianCloud",
  },
  {
    id: "diet",
    element: "火",
    dimension: "饮食",
    description: "饮食与营养场景",
    assetId: "guardianCuisine",
  },
  {
    id: "home",
    element: "土",
    dimension: "安居",
    description: "居住与家庭环境",
    assetId: "guardianHarmony",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Methodology — 科学方法论 (降级为第二层说明)                               */
/* -------------------------------------------------------------------------- */

export interface GuardianMethodStep {
  id: string;
  order: string;
  name: string;
  description: string;
  /** Phase label used in UI */
  phase: string;
}

export const guardianMethodSteps: ReadonlyArray<GuardianMethodStep> = [
  {
    id: "archive",
    order: "01",
    name: "建档归集",
    phase: "Record",
    description:
      "整合个人授权提供的学习、职业、健康、资产等信息，构建可追溯的人生档案。",
  },
  {
    id: "cohort",
    order: "02",
    name: "队列建模",
    phase: "Cohort",
    description:
      "将个体放入同类人群的纵向参照中定位，理解在群体坐标中的相对位置。",
  },
  {
    id: "calibration",
    order: "03",
    name: "横断面校准",
    phase: "Calibrate",
    description:
      "结合阶段性时点信息，校准当前坐标，确保档案与当下状态一致。",
  },
  {
    id: "signal",
    order: "04",
    name: "分级提示",
    phase: "Signal",
    description:
      "形成阶段性的关注事项与提示，由用户决定如何响应与跟进。",
  },
  {
    id: "path",
    order: "05",
    name: "方案落地",
    phase: "Path",
    description:
      "连接可执行的信息入口、专业服务与办理路径，支持从提示到行动。",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Page-level content                                                          */
/* -------------------------------------------------------------------------- */

/** Homepage Guardian section content */
export const guardianHomeContent = {
  eyebrow: "04 · LELAN GUARDIAN",
  title: "乐懒守护",
  headline:
    "把一生，变成一张持续更新的人生坐标。",
  body: "从碎片化信息归档开始，以生命周期阶段定位当下，将每个阶段的重要事项与生活维度组织进同一套坐标系统。",
  /** Whether /guardian route is implemented */
  hasDetailPage: false,
  ctaLabel: "了解乐懒守护",
  ctaHref: "#guardian",
} as const;

/** Archive UI caption */
export const guardianArchiveCaption =
  "产品界面示意，并非识别用户真实年龄阶段。";
