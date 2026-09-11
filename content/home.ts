/**
 * LELAN TECHNOLOGY · 首页内容模型
 *
 * Phase 1D-G3 — Guardian-first Homepage + LeLan AI Integration
 *
 * 产品叙事优先级：
 *   00 Hero
 *   01 乐懒守护（核心产品）
 *   02 五行生活守护（Guardian 同 section）
 *   03 乐懒成果小镇
 *   04 乐懒 AI · 论文智能助手
 *   05 工程能力 / 方法体系
 *   06 关于乐懒科技
 *
 * 产品关系：
 *   乐懒科技
 *   ├─ 乐懒守护（人生档案 + 坐标系统）
 *   └─ 乐懒成果小镇（空间服务入口）
 *   LeLan AI = 独立软件产品 / 体验入口
 *
 * 文案原则：克制、真实、不夸大、不造假数据。
 * AI 文案基于 lelan-shouhu 仓库审计确认的实际能力。
 */

export interface HomeSectionBase {
  id: string;
  number: string;
  title: string;
  intro: string;
}

export interface HomeHeroSection extends HomeSectionBase {
  kind: "hero";
  baseline: string;
  subBaseline: string;
  pillars: ReadonlyArray<{
    name: string;
    description: string;
    /** Explicit anchor href — keeps pillar lookup decoupled from display label. */
    href: string;
  }>;
  /**
   * Software product line (rendered separately from system pillars).
   * The two systems + one software relationship is structural.
   */
  software: {
    name: string;
    description: string;
    href: string;
    status: string;
  };
}

export interface HomeGuardianSection extends HomeSectionBase {
  kind: "guardian";
}

export interface HomeAiSection extends HomeSectionBase {
  kind: "ai";
  /** 基于 lelan-shouhu 仓库 READ-ONLY 审计确认的实际能力 */
  positioning: string;
  /**
   * Two main processing features.
   * Verified names from lelan-shouhu/src/app/process/page.tsx:
   *   - "AI 降重" (rewrite)        — 轻度 / 中度 / 深度
   *   - "AIGC 分析与降 AIGC" (aigc)
   */
  features: ReadonlyArray<{
    id: "rewrite" | "aigc";
    name: string;
    description: string;
  }>;
  /**
   * Three intensity levels verified from lelan-shouhu process page UI.
   * (No invented names like "Ultra" / "Expert" / "GPT Research".)
   */
  intensities: ReadonlyArray<{
    id: "light" | "medium" | "deep";
    name: string;
    hint: string;
  }>;
  /**
   * Seven Word (.docx) outputs verified from
   * lelan-shouhu/src/lib/output-options.ts. Stable IDs match repo.
   * These are EXACTLY the outputs the standalone product can produce.
   */
  wordOutputs: ReadonlyArray<{
    id:
      | "light_rewrite_word"
      | "medium_rewrite_word"
      | "deep_rewrite_word"
      | "aigc_report_word"
      | "aigc_analysis_summary_word"
      | "original_word_aigc_annotation"
      | "deai_word";
    name: string;
    /** Only "rewrite" or "aigc" — for the stack grouping */
    group: "rewrite" | "aigc";
    /** Default-selected in the standalone product */
    defaultSelected: boolean;
  }>;
  /** Soft limits from the standalone product */
  limits: {
    textCharRange: string;
    fileFormat: string;
    requiresLogin: boolean;
  };
  statusNote: string;
}

export interface HomeTownSection extends HomeSectionBase {
  kind: "town";
  capabilities: ReadonlyArray<{
    id: string;
    label: string;
    description: string;
  }>;
  statusNote: string;
}

export interface HomeTechnologySection extends HomeSectionBase {
  kind: "technology";
  pillars: ReadonlyArray<{
    id: string;
    name: string;
    oneLine: string;
  }>;
}

export interface HomeAboutSection extends HomeSectionBase {
  kind: "about";
  body: string;
}

export type HomeSection =
  | HomeHeroSection
  | HomeGuardianSection
  | HomeAiSection
  | HomeTownSection
  | HomeTechnologySection
  | HomeAboutSection;

/* -------------------------------------------------------------------------- */
/* Sections — 按优先级排序                                                  */
/* -------------------------------------------------------------------------- */

export const homeSections: ReadonlyArray<HomeSection> = [
  /* ── 00 Hero ─────────────────────────────────────────────────────────────── */
  {
    id: "hero",
    number: "00",
    kind: "hero",
    title: "乐懒科技 · LELAN TECHNOLOGY",
    intro: "一家将科研能力、数据与 AI 转化为真实可用产品与服务的科技公司。",
    baseline: "把科研能力，变成可被使用的产品。",
    subBaseline:
      "围绕人生档案系统、科研成果服务与通用 AI 软件三条主线，构建长期可信赖的数字产品。",
    pillars: [
      {
        name: "乐懒守护",
        description: "人生档案 · 人生坐标 · 八阶段 · 五行生活维度",
        href: "#guardian",
      },
      {
        name: "成果小镇",
        description: "科研服务空间入口 · 八条服务链路",
        href: "#town",
      },
      {
        name: "乐懒 AI",
        description: "论文智能助手 · 已上线体验版",
        href: "#ai",
      },
    ],
    software: {
      name: "乐懒 AI · 论文智能助手",
      description: "独立软件产品 · 已上线体验版 · 三档降重 / AIGC 改写",
      href: "#ai",
      status: "体验版可用",
    },
  },

  /* ── 01 乐懒守护 ──────────────────────────────────────────────────────── */
  {
    id: "guardian",
    number: "01",
    kind: "guardian",
    title: "乐懒守护",
    intro: "把一生，变成一张持续更新的人生坐标。",
  },

  /* ── 03 乐懒成果小镇 ─────────────────────────────────────────────────── */
  {
    id: "town",
    number: "03",
    kind: "town",
    title: "乐懒成果小镇",
    intro: "八条核心服务，一条可被走通的研究工作流。",
    capabilities: [
      {
        id: "Research",
        label: "Research",
        description: "课题立项与文献研究",
      },
      {
        id: "Writing",
        label: "Writing",
        description: "论文与申报书写作",
      },
      {
        id: "IP",
        label: "IP",
        description: "专利与软著",
      },
      {
        id: "Funding",
        label: "Funding",
        description: "基金与项目申报",
      },
      {
        id: "Transformation",
        label: "Transformation",
        description: "成果转化对接",
      },
      {
        id: "AI Tools",
        label: "AI Tools",
        description: "AI 工具辅助",
      },
    ],
    statusNote: "当前为小镇图谱展示阶段；各铺子的实际功能入口将随版本逐步开放。",
  },

  /* ── 04 乐懒 AI · 论文智能助手 ──────────────────────────────────────── */
  {
    id: "ai",
    number: "04",
    kind: "ai",
    title: "乐懒 AI · 论文智能助手",
    intro: "乐懒 AI 已作为独立软件产品提供体验。",
    positioning:
      "基于 DeepSeek 大模型，支持文本输入或 .docx 上传，提供 AI 降重、AIGC 分析与自然化改写，可生成多份 Word 成品，无需登录即可体验。",
    features: [
      {
        id: "rewrite",
        name: "AI 降重",
        description:
          "基于选定强度对原文进行表达重构；轻度 / 中度 / 深度三档独立调模型。",
      },
      {
        id: "aigc",
        name: "AIGC 分析与降 AIGC",
        description:
          "结构化输出 AI 文本特征分数与位置，并基于分析结果做自然化改写。",
      },
    ],
    intensities: [
      { id: "light", name: "轻度", hint: "尽量保持原文表达" },
      { id: "medium", name: "中度", hint: "在保持原意基础上优化句式与词汇" },
      { id: "deep", name: "深度", hint: "更大幅度的表达重构" },
    ],
    wordOutputs: [
      {
        id: "light_rewrite_word",
        name: "轻度降重后的Word",
        group: "rewrite",
        defaultSelected: false,
      },
      {
        id: "medium_rewrite_word",
        name: "中度降重后的Word",
        group: "rewrite",
        defaultSelected: true,
      },
      {
        id: "deep_rewrite_word",
        name: "深度降重后的Word",
        group: "rewrite",
        defaultSelected: false,
      },
      {
        id: "aigc_report_word",
        name: "AIGC检测报告-Word标红版",
        group: "aigc",
        defaultSelected: false,
      },
      {
        id: "aigc_analysis_summary_word",
        name: "AIGC特征分析摘要Word",
        group: "aigc",
        defaultSelected: false,
      },
      {
        id: "original_word_aigc_annotation",
        name: "原Word降AIGC批注版",
        group: "aigc",
        defaultSelected: false,
      },
      {
        id: "deai_word",
        name: "降AIGC后的Word",
        group: "aigc",
        defaultSelected: true,
      },
    ],
    limits: {
      textCharRange: "约 20,000 – 30,000 字 / 次",
      fileFormat: ".docx（≤ 10 MB）",
      requiresLogin: false,
    },
    statusNote:
      "独立产品体验版已上线；与乐懒科技官网的账号和深度集成规划中。",
  },

  /* ── 05 工程能力 ──────────────────────────────────────────────────────── */
  {
    id: "technology",
    number: "05",
    kind: "technology",
    title: "工程与能力",
    intro: "克制的工程原则，诚实的能力描述。",
    pillars: [
      {
        id: "trace",
        name: "可追溯",
        oneLine:
          "工程目标：所有生成内容可被回溯到来源、模型与编辑过程。",
      },
      {
        id: "human-loop",
        name: "人在回路",
        oneLine:
          "设计原则：关键判断保留人类复核环节，AI 不替代最终决策。",
      },
      {
        id: "data-min",
        name: "最小数据",
        oneLine:
          "设计原则：面向最小数据原则设计；用户控制权作为产品目标持续推进。",
      },
    ],
  },

  /* ── 06 关于 ─────────────────────────────────────────────────────────── */
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
