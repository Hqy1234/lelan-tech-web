/**
 * LELAN TECHNOLOGY · 首页内容模型
 *
 * 仅提供 Phase 1A/1B 所需的最小文案与结构骨架。
 * 文案原则：克制、真实、不夸大、不造假数据。
 *
 * 重要约束：
 * - 不得在首页对 Guardian 展示五行 / 八阶段的探索式内容；
 *   Guardian 首页仅展示四步法。
 * - 不得把 Town / Guardian / AI 描述为等权的三业务并列；
 *   AI 是 LeLan 体系中一项软件产品，而非业务并列项。
 * - 内部 anchor 使用 /# + sectionId；external link 仅引用已存在路由。
 */

import { townShops } from "./town";

export interface HomeSectionBase {
  /** 语义化 sectionId（用于 anchor / analytics） */
  id: string;
  /** 排版编号，例如 01–08，使用 editorial numbered sections 风格 */
  number: string;
  /** 标题 */
  title: string;
  /** 一段不超过两句的简介 */
  intro: string;
}

export interface HomeHeroSection extends HomeSectionBase {
  kind: "hero";
  /** 单句核心立场（baseline） */
  baseline: string;
  /** 一句话补充描述 */
  subBaseline: string;
}

export interface HomeArchitectureSection extends HomeSectionBase {
  kind: "architecture";
  /** 顶层并置的两个系统（town / guardian） */
  systems: ReadonlyArray<{
    id: "town" | "guardian";
    name: string;
    oneLine: string;
  }>;
  /** 联系 AI 的一句桥接：AI 是 LeLan 的软件产品表达 */
  aiBridge: string;
}

export interface HomeAiSection extends HomeSectionBase {
  kind: "ai";
  /** AI 在 LeLan 体系中的定位：产品能力，非业务并列项 */
  positioning: string;
  /** 体验版入口（当前阶段：占位锚点，提醒正式子域/接口尚未上线） */
  previewEntry: {
    label: string;
    /** 不指向任何虚构 URL：留 null 表示当前不存在外链 */
    href: string | null;
    disclaimer: string;
  };
}

export interface HomeTownSection extends HomeSectionBase {
  kind: "town";
  /** 8 个铺子直接引用 town.ts 的同一真相源 */
  shopIds: ReadonlyArray<(typeof townShops)[number]["id"]>;
  /** 6 个能力维度（与 town.ts 一致） */
  capabilities: ReadonlyArray<{
    id: string;
    label: string;
    description: string;
  }>;
  /** 当前阶段对外说明（避免虚假上线承诺） */
  statusNote: string;
}

export interface HomeGuardianSection extends HomeSectionBase {
  kind: "guardian";
  /** Guardian 首页只展示四步法 */
  steps: ReadonlyArray<{
    id: "archive" | "cohort" | "calibration" | "risk";
    name: string;
    oneLine: string;
  }>;
  /** 当前阶段对外说明（避免临床/科研合规表述） */
  statusNote: string;
  /** 未来首个 MVP 场景（仅作为内容备注，不实现 UI） */
  futureFocusNote: string;
}

export interface HomeTechnologySection extends HomeSectionBase {
  kind: "technology";
  /** 不堆砌技术名词；保留可信、克制的措辞 */
  pillars: ReadonlyArray<{
    id: string;
    name: string;
    oneLine: string;
  }>;
}

export interface HomeAboutSection extends HomeSectionBase {
  kind: "about";
  /** 简短关于我们摘要 */
  body: string;
}

export type HomeSection =
  | HomeHeroSection
  | HomeArchitectureSection
  | HomeAiSection
  | HomeTownSection
  | HomeGuardianSection
  | HomeTechnologySection
  | HomeAboutSection;

/* -------------------------------------------------------------------------- */
/* Sections                                                                   */
/* -------------------------------------------------------------------------- */

export const homeSections: ReadonlyArray<HomeSection> = [
  {
    id: "hero",
    number: "00",
    kind: "hero",
    title: "乐懒科技 · LELAN TECHNOLOGY",
    intro:
      "一家将科研能力、数据与 AI 转化为真实可用产品与服务的科技公司。",
    baseline: "把科研能力，变成可被使用的产品。",
    subBaseline:
      "面向科研工作者与科研服务方，构建可解释、可管理、可长期协作的数字系统。",
  },
  {
    id: "architecture",
    number: "01",
    kind: "architecture",
    title: "两大系统，一个体系",
    intro:
      "乐懒科技当前由两个主要系统组成，分别承载不同的服务方式。",
    systems: [
      {
        id: "town",
        name: "乐懒成果小镇",
        oneLine:
          "围绕论文、课题、专利、软著、申报、转化、产学研、AI 工具等八条核心服务的科研服务入口集合。",
      },
      {
        id: "guardian",
        name: "乐懒守护",
        oneLine:
          "以人生档案 + 队列建模 + 横断面校准 + 风险预警为方法论的长期生活 / 生命档案系统。",
      },
    ],
    aiBridge:
      "乐懒 AI 是乐懒科技在两个系统之中，以软件产品形式沉淀下来的通用 AI 能力。",
  },
  {
    id: "ai",
    number: "02",
    kind: "ai",
    title: "乐懒 AI · 论文智能助手",
    intro:
      "AI 不是独立第三业务，而是贯穿乐懒两个系统的软件能力。",
    positioning:
      "以通用大模型 + 科研垂直知识 + 可追溯编辑流为产品骨架的论文写作辅助能力。",
    previewEntry: {
      // 当前阶段：Beta 申请通道尚未开放；不引用任何虚构 URL。
      label: "Beta 即将开放",
      href: null,
      disclaimer:
        "Beta 申请通道即将开放；当前阶段不接收任何形式的体验申请。",
    },
  },
  {
    id: "town",
    number: "03",
    kind: "town",
    title: "乐懒成果小镇",
    intro:
      "八条核心服务，一条可被走通的研究工作流。",
    shopIds: [
      "paper-teahouse",
      "research-shop",
      "patent-shop",
      "software-shop",
      "funding-shop",
      "transfer-shop",
      "industry-research-shop",
      "ai-workshop",
    ],
    capabilities: [
      { id: "Research", label: "Research", description: "课题立项与文献研究" },
      { id: "Writing", label: "Writing", description: "论文与申报书写作" },
      { id: "IP", label: "IP", description: "专利与软著" },
      { id: "Funding", label: "Funding", description: "基金与项目申报" },
      { id: "Transformation", label: "Transformation", description: "成果转化对接" },
      { id: "AI Tools", label: "AI Tools", description: "AI 工具辅助" },
    ],
    statusNote:
      "当前为小镇图谱展示阶段；各铺子的实际功能入口将随版本逐步开放。",
  },
  {
    id: "guardian",
    number: "04",
    kind: "guardian",
    title: "乐懒守护",
    intro:
      "以四步法作为可解释的长期守护方法，不依赖神秘化符号。",
    steps: [
      {
        id: "archive",
        name: "人生档案",
        oneLine:
          "把分散的身份 / 健康 / 生活 / 工作信息组织成可追溯的长期记录。",
      },
      {
        id: "cohort",
        name: "队列建模",
        oneLine:
          "将个体数据放入对照群体，构建可比较的参照系。",
      },
      {
        id: "calibration",
        name: "横断面校准",
        oneLine:
          "对当前状态做多维度横断面评估，并参照群体基线做校准。",
      },
      {
        id: "risk",
        name: "风险预警",
        oneLine:
          "基于校准结果，向用户提示值得关注的变化方向；由用户决定如何跟进。",
      },
    ],
    statusNote:
      "当前为 MVP 早期；不展开临床、科研或医疗合规表述；本页呈现的是方法论框架，相关能力尚未上线。",
    futureFocusNote:
      "未来首个聚焦场景可能围绕饮食 / 营养等日常生活维度（暂未上线）。",
  },
  {
    id: "technology",
    number: "05",
    kind: "technology",
    title: "工程与能力",
    intro: "克制的工程原则，透明的能力组合。",
    pillars: [
      {
        id: "data-trace",
        name: "可追溯",
        oneLine:
          "目标：所有生成内容可回溯到来源与编辑过程，避免黑盒结论。",
      },
      {
        id: "human-loop",
        name: "人在回路",
        oneLine:
          "关键判断保留人类复核环节，AI 不替代最终决策。",
      },
      {
        id: "privacy-min",
        name: "最小数据",
        oneLine:
          "面向最小数据原则设计：仅在必要环节收集与存储必要的数据；用户控制权作为产品目标持续推进。",
      },
    ],
  },
  {
    id: "about",
    number: "06",
    kind: "about",
    title: "关于乐懒科技",
    intro: "一家认真做研究服务的小型科技团队。",
    body:
      "乐懒科技以让科研成果更可被使用为出发点，长期投入于科研工作流与生命档案两条主线。团队当前专注工程化与产品化，团队详情将在未来版本公开。",
  },
] as const;
