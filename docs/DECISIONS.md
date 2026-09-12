# LELAN TECHNOLOGY · Decisions Log

> 单一来源：所有"已经确认"的工程 / 产品 / 流程决定。
> 后续若与本文冲突，以本文为准。
> 编号自增，时间倒序追加；不改历史条目。

---

## D-ENGINE · 工程与运行时

- **D-ENGINE-001** — 使用 Next.js `16.3.x` App Router（当前 `16.3.4`）。
- **D-ENGINE-002** — 使用 React `19`。
- **D-ENGINE-003** — TypeScript strict。
- **D-ENGINE-004** — Tailwind CSS v4，**CSS-first** 配置（`@import "tailwindcss"` + `@theme inline`）。
- **D-ENGINE-005** — `output: "export"`，纯静态导出，无 API Routes / Server Actions。
- **D-ENGINE-006** — `images.unoptimized: true`，适配静态导出。
- **D-ENGINE-007** — `trailingSlash: true`，保证静态托管路径稳定。
- **D-ENGINE-008** — 使用原生 `app/sitemap.ts`，不引入 `next-sitemap` 等第三方包。
- **D-ENGINE-009** — 使用原生 `app/robots.ts`，不手写静态 `robots.txt`。
- **D-ENGINE-010** — 单 Light Editorial 主题，**不提供 theme toggle**。
- **D-ENGINE-011** — 目标 WCAG 2.2 AA / Lighthouse 最低 90（目标 95+） / SEO 100 / axe critical 0。

## D-CONTENT · 内容与文案

- **D-CONTENT-001** — 不生成 SearchAction（搜索框结构化数据）。
- **D-CONTENT-002** — 不展示伪造成功率、市场占比、融资数据等假数据指标。
- **D-CONTENT-003** — 不将模拟 / 内部验证当作真实市场验证呈现。
- **D-CONTENT-004** — Beta CTA 文案 = "立即使用" → 即将上线 / 申请加入 Beta。
- **D-CONTENT-005** — Beta / Contact 表单不得伪造"提交成功"反馈态。
- **D-CONTENT-006** — `betaEmail` / `contactEmail` 保持为空字符串直至用户正式确认；
  引用处需用 fallback 文案，禁止编造邮箱地址。
- **D-CONTENT-007** — Team 页当前**不发布具体成员**；仅展示团队定位与招募意图。
- **D-CONTENT-008** — Logo 方向为 wordmark（非图形标志）。
- **D-CONTENT-009** — AI 产品截图均为独立 mock，**必须**标注：
  > "产品界面示意，实际界面以体验版为准。"
- **D-CONTENT-010** — 成果小镇首页展示完整 8 个铺子。
- **D-CONTENT-011** — Guardian 首页只展示四步法：
  人生档案 → 队列建模 → 横断面校准 → 风险预警。
- **D-CONTENT-012** — 五行 × 八阶段仅在 `/guardian` 详细页展开。

## D-VISUAL · 视觉与品牌资产

- **D-VISUAL-001** — 不引入紫蓝 AI 渐变 / glassmorphism / 发光球 / 神经网络 cliché。
- **D-VISUAL-002** — 不引入 emoji 图标；icon 必须为可访问、可语义化的真实 SVG 或文字。
- **D-VISUAL-003** — PPT 中的建筑 / 店铺 / 人物 / 东方叙事形象被视为**期望品牌视觉素材**，
  但**不得**直接贴图使用，必须经过统一 art direction 后正式生成。
- **D-VISUAL-004** — Town 优先 V1（image + CSS）→ V2（layered pseudo-3D）；
  V3（real WebGL 3D）属后续阶段，**非 MVP 依赖**。
- **D-VISUAL-005** — 第一阶段不引入 Three.js / React Three Fiber / 重 WebGL 库。
- **D-VISUAL-006** — 移动端**不得依赖 hover**；
  所有视觉入口必须保留真实 HTML navigation / semantic links。

## D-ASSET · Placeholder Visual Assets（追加于 2026-09-10）

- **D-ASSET-001** — 当前 `public/images/` 内的视觉素材
  （Town 建筑 8 / Town 人物 8 / Guardian overview 1 /
  Guardian 五行 5 / Guardian 八阶段 8）均为
  **客户现有 PPT / 素材库导入的 placeholder / reference assets**，
  **不是最终视觉定稿**。

- **D-ASSET-002** — 最终视觉定稿为统一的
  **2.5D Oriental Visual System**，将逐项替换现有 placeholder。

- **D-ASSET-003** — 正式重绘时**优先保持现有 `public/images/` 路径与文件名**，
  以尽量避免修改页面代码。

- **D-ASSET-004** — `Town` 中
  `building = service / navigation entry`，
  `character = future Agent personality / interface`，
  二者必须保持独立目录语义（`buildings/` 与 `characters/`）。

- **D-ASSET-005** — 官网整体视觉方向 =
  **restrained editorial UI + expressive oriental spatial visuals**：
  文字编辑型 UI、克制色彩、东方空间图像叙事。

- **D-ASSET-006** — 当前 MVP **不引入** heavy real-time 3D / WebGL；
  Town V1 = image + CSS；后续 V2/V3 为后续阶段。

- **D-ASSET-007** — PPT / 客户素材即使已复制进入 `public/`，**不得**自动视为最终可公开商用素材；
  发布前需做版权 / 授权复核。

- **D-ASSET-008** — 含水印或版权来源不明的素材，
  正式生产发布前必须重新确认或替换。

- **D-ASSET-009** — Guardian 八大神兽（含坎 / 艮两次出现的"毕方"）
  关系**未锁定**，暂不进入 active asset set。

- **D-ASSET-010** — 当前未导入 `public/` 的素材（鬼谷子 528×701、
  伊尹 1024×1024、其他 Guardian 人物）因分辨率或规格与当前主集不匹配，
  不作为 placeholder 导入；后续以正式重绘版本纳入。

## D-PRODUCT · 产品边界

- **D-PRODUCT-001** — 现有体验版属于独立项目 `lelan-shouhu`，本仓库不得包含其代码。
- **D-PRODUCT-002** — `lelan-shouhu` 与官网未来通过以下方式建立关系：
  子域跳转（`ai.lelan.tech`） / 官方 API / 统一 account architecture。
- **D-PRODUCT-003** — Guardian 当前定位为 MVP；不展开完整临床 / 科研合规表述。

## D-WORKFLOW · Agent Workflow

- **D-WORKFLOW-001** — **ChatGPT**：
  planning / product / design direction / task orchestration。
- **D-WORKFLOW-002** — **Cursor**：**主要实施 agent**（实现 / 脚手架 / 调试）。
- **D-WORKFLOW-003** — **Codex**：
  architecture review / difficult problems / QA / code review。
- **D-WORKFLOW-004** — **禁止 Cursor 与 Codex 各自独立重设同一功能**；
  一项功能的设计方向一旦在 ChatGPT 确认，仅由 Cursor 实施，
  Codex 仅在事后进行 review。
- **D-WORKFLOW-005** — **GitHub 是 Cursor 与 Codex 之间的同步 Source of Truth**。
  任何决策落定后必须 commit + push 至 `feat/*` 分支。

## D-DOCS · 文档关系

- **D-DOCS-001** — `docs/PROJECT.md` 为业务身份来源。
- **D-DOCS-002** — `docs/DESIGN-SYSTEM.md` 为视觉系统来源。
- **D-DOCS-003** — `docs/ROADMAP.md` 为阶段计划来源。
- **D-DOCS-004** — 本文件 `docs/DECISIONS.md` 为冲突仲裁来源。

## D-PHASE0 · Phase 0 工程修复

- **D-PHASE0-001** — `robots.ts` / `sitemap.ts` 在 Next.js 16 + `output: "export"` 下
  必须保留 `export const dynamic = "force-static"`。
- **D-PHASE0-002** — 正式域名未确认前（`siteUrl` 为空字符串）：
  - SEO `index: false, follow: false`
  - 不输出 `canonical` URL
  - 不输出 Open Graph URL
  - sitemap 返回空 entries
  - robots.txt 不输出 sitemap URL
- **D-PHASE0-003** — `plannedRoutes`（规划 IA）与 `publishedRoutes`（已上线）分离；
  sitemap / nav 等模块应使用 `publishedRoutes`。
- **D-PHASE0-004** — 每个正式页面负责自行传入 `buildMetadata` 的 `path` 参数，
  **不得继承 homepage 的 "/" canonical**。
- **D-PHASE0-005** — 静态导出（`output: "export"`）不使用 `next start`；
  `package.json` 移除 `"start"` script。
- **D-PHASE0-006** — Node engine 声明 `">=20.9.0"`。
- **D-PHASE0-007** — Open Graph `locale` 使用 `zh_CN`（下划线），
  与 HTML `lang="zh-CN"`（连字符）保持正确区分。

---

## D-PHASE1C · Homepage Town V1.5 + Approval Fixes（追加于 2026-09-10）

### Beta Journey Truthfulness

- **D-PHASE1C-001** — "申请 Beta" CTA 全部替换为"Beta 即将开放"；不指向任何虚构 URL。
  - Header Beta 按钮 → static text "Beta 即将开放"
  - Hero 副 CTA → `<span>` static text "Beta 即将开放"
  - AI 区块 CTA → static text + disclaimer
  - Footer Beta 入口 → 指向 #ai，标注 pending
- **D-PHASE1C-002** — Beta journey 在 Phase 1C **无** form、email、external URL、submission backend。
  未来上线时由产品侧确认后引入。

### Unsupported Claims Fixed

- **D-PHASE1C-003** — Technology "可追溯" 从"所有生成内容可回溯"改为
  "目标：所有生成内容可回溯"（qualifies as future goal, not current guarantee）。
- **D-PHASE1C-004** — Technology "最小数据" 从"用户对自身数据有明确控制权"改为
  "用户控制权作为产品目标持续推进"（design principle, not current universal guarantee）。
- **D-PHASE1C-005** — Guardian "风险预警" 从"提早发现值得关注的风险"改为
  "向用户提示值得关注的变化方向；由用户决定如何跟进"（removes implied judgment service）。
- **D-PHASE1C-006** — Guardian statusNote 移除"所有判定仅供用户参考"，
  改为"本页呈现的是方法论框架，相关能力尚未上线"。
- **D-PHASE1C-007** — AI Workflow "下载 · 本地导出 · 不留数据" 步骤移除；
  替换为"人工修订 · 关键段落人工确认"。

### Town V1.5 Architecture

- **D-PHASE1C-008** — Town V1.5 = 紧凑 8-service index（左侧/顶部）+ selected-shop stage（右侧/下方）。
  所有 8 个铺子的名称、编号、通俗业务描述在初始 HTML 中全部可见。
- **D-PHASE1C-009** — Town 交互使用原生 `<input type="radio">` radio group，
  默认选中 01（论文茶寮）；zero-JS 可用，JS 增强 URL hash 书签。
- **D-PHASE1C-010** — Town Client Component island (`HomeTownClient.tsx`)
  **仅**负责：selected 状态 + URL hash 同步；不重新渲染店铺内容。
- **D-PHASE1C-011** — Stage 显示顺序：店铺建筑（如有）+ 角色（如有）；
  均无时显示"视觉资产整理中"占位；按需逐铺解锁。
- **D-PHASE1C-012** — `agentRole` 字段区分：
  `concept` = "服务人格 · 未来 Agent 形象"（论文茶寮/课题小铺）；
  `persona` = "服务角色"（其余 6 铺）。

### Visual Delivery Assets

- **D-PHASE1C-013** — Phase 1C 新增 2 个 derivative WebP：
  `public/images/town/buildings/town-research-shop.webp`（~104KB）+
  `public/images/town/characters/town-lingshu.webp`（~37KB）。
- **D-PHASE1C-014** — 生成脚本 `scripts/derive-town-pair.cjs` 使用 sharp
  （已有 transitive 依赖）；resize 到合理尺寸 + WebP quality 82。
- **D-PHASE1C-015** — `content/assets.ts` 更新 registry 和 reference index；
  `content/town.ts` 更新 02 课题小铺的 `buildingAssetId` / `characterAssetId`。

### Hero Refinement

- **D-PHASE1C-016** — Hero right-side "Editorial Mark" 替换为
  紧凑 LeLan 产品关系图：乐懒科技 → [成果小镇 · 守护] · AI 桥接。
  纯排版 + thin rules，无插画、无游戏美术。
- **D-PHASE1C-017** — Hero 标题保持"乐懒科技 · LELAN TECHNOLOGY"；
  中文身份不弱化，LELAN TECHNOLOGY 英文作为 secondary。

### Section Layout Refinements

- **D-PHASE1C-018** — Architecture 两系统从 bordered card 改为 open layout
  （无 bg-paper-pure 卡片容器），减少边框重复感。
- **D-PHASE1C-019** — Guardian 四步法：从 4 张独立 border-card 改为
  连续 process 布局（垂直轴线连接），KeyframeDivider 移除。
- **D-PHASE1C-020** — Guardian 两张 status note card 合并为一行两列。
- **D-PHASE1C-021** — Technology 从 `<div>` grid 改为 open `<dl>` list；
  语义修正：number 为装饰（`<span aria-hidden>`），pillar name 为 `<dt>`，description 为 `<dd>`。
- **D-PHASE1C-022** — About section 移除 "联系与团队详情" card，
  缩短节律；About 不做多余信息展示。
- **D-PHASE1C-023** — Technology 使用 `density="tight"` 减少多余垂直空间。

### Accessibility / UX Fixes

- **D-PHASE1C-024** — `html { scroll-padding-top: 72px }` 修复 sticky header
  锚点导航遮挡问题。
- **D-PHASE1C-025** — Mobile Header nav touch target 增大（`px-2 py-1.5`），
  避免 12px 小文本；nav items 从 5 项（2 项为 dummy）改为实际 5 项。
- **D-PHASE1C-026** — `SectionHeading` systemLabel soft-green
  `text-green-soft` 替换为 `text-muted`（对比度修复）。
- **D-PHASE1C-027** — Town capabilities strip 从 `text-[0.65rem]` 提升
  至 `text-xs`（12px 可读范围）；cap.label 使用 light green pill background。
- **D-PHASE1C-028** — Town index `plainLanguageService` 从 `text-xs`
  提升至 `sm:text-sm`（桌面 14px 可读范围）。
- **D-PHASE1C-029** — Header / Footer Beta 状态对齐：均显示
  "Beta 即将开放"，不提供误导性 CTA。

### Header / Footer Alignment

- **D-PHASE1C-030** — Header nav 与 Footer nav 保持一致：
  首页 / 产品 / 成果小镇 / 乐懒守护 / 关于；团队 / 联系从 Header 移除
  （对应页面未上线）。
- **D-PHASE1C-031** — Footer "Beta" section 独立一行，
  链接指向 #ai 并标注 pending。

---

## D-PHASE2 · Guardian Life Coordinate System（追加于 2026-09-10）

### Product Hierarchy

- **D-PHASE2-001** — Guardian 首页产品层级调整为：
  ① 人生档案（主视觉） ② 乐懒守护符·人生坐标 ③ 坐标化闯关（Y八阶段 × X任务）④ 五行生活维度 teaser ⑤ 科学方法论（底层说明）。
- **D-PHASE2-002** — 四步 pipeline（建档/队列/校准/提示/落地）不删除，
  但从"Guardian 主视觉"降级为"坐标背后的方法"（底层说明模块）。
- **D-PHASE2-003** — 八卦/五行是产品的信息组织与品牌记忆语言，
  **不是**玄学预测依据。科学逻辑负责可信，东方文化系统负责记忆。
- **D-PHASE2-004** — Guardian 首页不再仅呈现四步 pipeline，
  改为以"乐懒守护符·人生坐标"为核心产品 UI。

### Component Architecture

- **D-PHASE2-005** — `HomeGuardian` 改为 Server Component（壳层），
  包含：section header、archive frame、五行 teaser、方法说明。
- **D-PHASE2-006** — `GuardianArchive` 为最小 Client island，
  负责 selected stage 状态管理；不渲染全部 stage content。
- **D-PHASE2-007** — `GuardianLifecycle`（Server）：八阶段纵轴 rail，
  使用 `<button>` + `aria-pressed`，键盘可达，无 JS 时可 tab。
- **D-PHASE2-008** — `GuardianTaskFlow`（Server）：当前阶段任务链，
  desktop 横向节点链 + mobile 垂直步骤列表。
- **D-PHASE2-009** — `GuardianElements`（Server）：五行 teaser，
  紧凑 5 项 grid，建筑缩略图；**不是** Town 风格的铺子地图。
- **D-PHASE2-010** — `content/guardian.ts` 为 Guardian 内容唯一真相源：
  `guardianStages`（8 阶段）、`guardianElements`（5 维度）、`guardianMethodSteps`（5 方法）。

### Visual Design

- **D-PHASE2-011** — Guardian visual language：warm ivory + ink +
  muted jade + ochre + thin rules + archive labels + coordinate lines +
  editorial typography + paper/document metaphor。
- **D-PHASE2-012** — Guardian **不等于** Town：Town = 空间/建筑/服务世界；
  Guardian = 档案/坐标/生命周期/数据/研究。
- **D-PHASE2-013** — "守护符"视觉化为 Digital Life Talisman：
  细线边框 + 坐标轴 + 阶段节点 + 档案编号 + 印章式标识 + 进度轨迹。
  不能画成真正的符咒。
- **D-PHASE2-014** — 禁止 Guardian 出现：满屏红金 / 龙纹背景 / 发光法阵 /
  粒子特效 / 魔法阵 / 玄幻 HUD / neon cyberpunk / 蓝紫 AI gradient /
  glassmorphism / glowing AI orb / AI brain。
- **D-PHASE2-015** — 八阶段默认选中：04 兑·青年期（demo 演示用），
  由 `DEFAULT_STAGE_ID = "dui-young-adult"` 锁定。
- **D-PHASE2-016** — 女娲形象作为 Guardian section 角落视觉锚点
  （右上角小型缩略图），不得作为主 Hero。
- **D-PHASE2-017** — 女娲素材含水印，production 前必须确认或替换；
  代码注释已标注 watermark/copyright pending。

### Assets

- **D-PHASE2-018** — Phase 2 新增 delivery derivatives：
  8 张八阶段 WebP（每张 ~60–92KB，800px）+ 5 张五行建筑 WebP
  （每张 ~31–53KB，600px）+ 1 张女娲 WebP（34.5KB，400px）。
- **D-PHASE2-019** — 生成脚本 `scripts/derive-guardian.cjs` 使用 sharp
  （transitive 依赖）；resize 到 display 尺寸 + WebP quality 80。
- **D-PHASE2-020** — `content/assets.ts` 更新 registry，15 个 Guardian asset
  注册入 `visualAssets` + `assetReferenceIndex`。
- **D-PHASE2-021** — 当前 NOT active assets：八大神兽（毕方关系未锁定）/
  鬼谷子（分辨率不足）/ 伊尹人物（分辨率不足）/ 伏羲/神农/徐霞客/鲁班。

### Accessibility / Motion

- **D-PHASE2-022** — 八阶段节点使用 `<button>`，`aria-pressed` 状态，
  `aria-label` 含阶段全名（震·婴儿期）；`focus-visible` outline。
- **D-PHASE2-023** — 移动端使用 CSS `scroll-snap`，`prefers-reduced-motion`
  时禁用 snap animation。
- **D-PHASE2-024** — 任务进度条使用 CSS `width` transition，
  reduced-motion 时无动画。

---

## D-PHASE1D-G2 · Guardian Demo Login + Personal Life Archive（追加于 2026-09-10）

### Demo Architecture

- **D-PHASE1D-G2-001** — Demo auth 使用 `sessionStorage`，key=`lelan_demo_session`，
  内容为 `{ profileId: string }`。密码**不**存储在 sessionStorage。
- **D-PHASE1D-G2-002** — `lib/demo.ts` 提供 `demoLogin` / `demoLogout` /
  `getDemoProfile` / `getDemoSession` / `isDemoLoggedIn`。
  代码注释标注：DEMO ONLY, NOT AUTHENTICATION。
- **D-PHASE1D-G2-003** — Demo credentials（m123/12345, n123/12345）
  公开写在 `content/guardian.ts` 中。标注 DEMO ONLY。
- **D-PHASE1D-G2-004** — `/login` 和 `/profile` 使用 `"use client"` +
  `dynamic = "force-dynamic"`（依赖 sessionStorage，不做 SSR）。
- **D-PHASE1D-G2-005** — `DemoAccountNav` 为最小 client island，
  仅管理 Header 右上角登录/档案状态。mounted guard 防止 hydration mismatch。
- **D-PHASE1D-G2-006** — 退出时 `demoLogout()` 清空 sessionStorage 并 `router.push("/")`。
- **D-PHASE1D-G2-007** — `/profile` 无 session 时展示"请先选择演示账号"界面。

### GuardianProfile Contract

- **D-PHASE1D-G2-008** — `GuardianProfile` 接口定义在 `content/guardian.ts`：
  id / demo / archiveRef / identity / stage / scenario / progress / tasks /
  elements / timeline / methodSteps。
- **D-PHASE1D-G2-009** — 未来 Dify/API adapter 返回同 GuardianProfile contract，
  Profile 页面 UI 无需重写即可切换数据源。
- **D-PHASE1D-G2-010** — Demo profile 数据（m123/n123）完整写入
  `content/guardian.ts`，不硬编码在组件中。

### Demo Personas

- **D-PHASE1D-G2-011** — m123（demo-m28）：28岁男性，离·青少年期（20–29），
  任务：职业方向/DONE、社保/DONE、体检/CURRENT等5项，2/5进度。
  五行：木·健康=持续关注，金·财富=待完善。
- **D-PHASE1D-G2-012** — n123（demo-f36）：36岁女性，兑·青年期（30–39），
  创业场景，8项任务链（公司核名→注册→公章→开户 DONE，税务 CURRENT），
  4/8进度。五行：金=当前事项，木=持续关注，火=持续关注。
- **D-PHASE1D-G2-013** — m123 timeline：2026体检计划(计划中)/职业记录(已归档)/
  社保(已归档)/学业(已归档)。
- **D-PHASE1D-G2-014** — n123 timeline：2026税务(进行中)/开户(已归档)/
  公司注册(已归档)/居住信息(已归档)。

### UI / Safety

- **D-PHASE1D-G2-015** — 所有 Demo 页面底部加 disclaimer：
  "本页面展示内容均为虚构演示数据，不代表真实用户、医学判断、
  投资建议或法律意见。"
- **D-PHASE1D-G2-016** — `/login` 登录失败显示 aria-live 错误提示，
  不使用 alert()。表单含 label/for/type=password/aria-required。
- **D-PHASE1D-G2-017** — 五行状态词汇：已记录/持续关注/当前事项/待完善。
  **不使用** low/medium/high risk 词汇。

---

## D-PHASE1E.4-A · Visual De-noising + Guardian Subject Restoration + AI Simplification（追加于 2026-09-11）

### Layout Defect Fixes (P0)

- **D-PHASE1E.4-A-001** — 修复 1440 viewport 横向 overflow（此前 `document.scrollWidth = 1608` vs viewport 1440，溢出 168px）。
  **根因（两个，均已修 root cause，未使用 `overflow-x: hidden` 掩盖）：**
  1. `components/ai/AiWorkflowPreview.tsx` 的 `.ai-glass-center` 同时使用
     `lg:absolute; left:25%; right:25%` **和** `margin-left/-right: -8%`。
     绝对定位元素的百分比 margin 以**包含块**宽度解析，因此实际宽度变成
     100% + 16% = 116%（1241px 落在 1072px 容器内）→ 超出 1440 viewport 168px。
     这是最大单一贡献者。
  2. `.lelan-town-drawer-float` 使用 `position:absolute; right:-8%; top:-5%`，
     把 30% 宽的面板推出 map 容器。
  **结果（实测）**：1440 / 1024 / 768 / 375 全部
  `document.documentElement.scrollWidth === viewport width`，AI section overflow = 0。

- **D-PHASE1E.4-A-002** — 确认 `document.scrollWidth === viewport` **不是**
  "所有元素都必须在 viewport 内"。Guardian 八阶段 rail 是**有意的**
  `overflow-x-auto` 内部滚动容器（D-PHASE2-023），在 1024/375 下其子节点
  超出 viewport 属于设计行为，不产生 page-level 横向滚动。
  判定标准是 document 级 scrollWidth，而非元素级 bounding rect。

### Guardian Subject Restoration

- **D-PHASE1E.4-A-003** — Guardian 恢复**单一视觉主体**：
  ONE LARGE STAGE SUBJECT（`GuardianArchive` 左栏），默认
  `stage-04-dui-young-adult`（兑 · 青年期 30–39，DEFAULT_STAGE_ID 保持不变）。
  切换 stage 时该大图跟随切换。
- **D-PHASE1E.4-A-004** — **继续禁止**恢复 8 张 40–56px 阶段小缩略图。
  Phase 1E.3-A 判定其为视觉噪声的结论不变（见 D-PHASE1E.3-A-020）。
  主体由"一张大图跟随选择"承担，而非"八张小图并列"。
- **D-PHASE1E.4-A-005** — 五行走廊恢复 **5 张真实视觉资产**
  （金财富 / 木健康 / 水出行 / 火饮食 / 土安居），
  形态为 CONTINUOUS LIFE DIMENSION ARCHIVE BAND（连续档案带），
  **不是** 5 张巨大独立卡片，**也不是** 30–40px 缩略条。
  Desktop ≥1024 五列 / Tablet 3 列 / Mobile 2 列；
  实测 plate ≈189×142px（desktop）/ ≈133×100px（mobile）。
  仍禁止：五行转盘、相生相克箭头、宝石/球/神兽、风险色阶。
- **D-PHASE1E.4-A-006** — `.lelan-stage-subject-media` 采用 **5:4** 比例
  （非 1:1）。交付阶段图为 800×800 方形；1:1 plate 在 1120px 展板上会单独
  撑出 588px 高度，使 archive 高度失控。5:4 保持主体够大，同时让坐标栏
  （rail + 任务链）决定 archive 高度。
- **D-PHASE1E.4-A-007** — `.lelan-element-plate` 采用 **4:3**，与交付文件
  600×450 完全一致，图片**不裁切、不拉伸**。
- **D-PHASE1E.4-A-008** — **女娲（guardianNuwa）保持 BLOCKED，明确不恢复。**
  水印 / 版权未清（D-PHASE2-017、D-ASSET-008）。禁止：显示 / 裁切 / 遮水印 /
  去水印 / 重绘 / AI 修复。资产文件未做任何改动；
  `content/assets.ts` 与 `content/guardian.ts` 注释已标注
  "⛔ BLOCKED pending copyright clearance"。

### Asset Metadata Fix

- **D-PHASE1E.4-A-009** — 修正 `content/assets.ts` 中错误的固有尺寸声明
  （此前会导致 CLS 预留错误与意外裁切）：
  - 五行 5 张：`600×600` → **`600×450`**（真实交付文件为 4:3）
  - 女娲：`400×400` → **`400×533`**（真实交付文件为 3:4 竖版）
  参考 PNG 尺寸为 2364×1773 / 1773×2364。

### Guardian Composition / De-duplication

- **D-PHASE1E.4-A-010** — 移除 Phase 1E.3-C-R1 的 4 层 overlay 堆叠：
  `.guardian-seal-overlay`（`left:-12px` 悬垂）、
  `.guardian-glass-overlay`（`right:0` 压住 26% 展板）、`.archive-paper-edge`、
  `.depth-edge-marker`。这些负偏移 / 覆盖层已被删除（非仅仅停用）。
  新组合为**一展开档案、两栏、无任何重叠**。
- **D-PHASE1E.4-A-011** — Guardian 当前坐标读数**只保留一处**。
  修复前「兑 · 青年期 · 4/8」在本 section 出现 **3 次**
  （section aside / archive sheet header / glass panel）；
  现在仅由 header 右侧**唯一一个** live glass 面板权威呈现。
- **D-PHASE1E.4-A-012** — 移除 Guardian header 中与 section intro 重复的
  第二段说明文字；移除 `GuardianLifecycle` 的 active-stage caption 盒
  （与 stage-subject caption 重复；当前阶段仍由 rail 填充节点 +
  `当前 04 · 兑` rail label + GuardianTaskFlow 场景标签共同表达）。
- **D-PHASE1E.4-A-013** — `GuardianLifecycle` rail 不再同时使用
  `sm:justify-center` 与 `overflow-x-auto`（两者互相冲突，可能在平板宽度裁掉
  首个阶段）。移动端 active stage 通过 `scrollIntoView` 自动进入可见区域，
  并遵守 `prefers-reduced-motion`（无动画滚动）。
- **D-PHASE1E.4-A-014** — GuardianSeal 不再是浮动覆盖层，
  而是作为 archive identity mark 位于 stage subject caption 栏右侧。
  组件 API 与状态语义（outline/partial/complete）不变。

### Glass Reduction

- **D-PHASE1E.4-A-015** — 首页 Glass surface 由 **5 降至 2**（实测 `glassSurfaces: 2`）：
  1. Guardian `当前坐标 · LIVE` 面板
  2. Town 选中服务档案面板（`TownServiceDrawer`）
  **AI / Hero / Technology / About = 0 glass。**
  `ProgressTrace` 由 glass 改为 neutral paper panel（`.ai-process-panel`）。
  移除 `.ai-glass-bg` / `.ai-glass-center`。符合 D-9.8「glass 仅用于浮动实时信息」。

### AI Quiet Workspace

- **D-PHASE1E.4-A-016** — AI section 重构为 **QUIET DOCUMENT WORKSPACE**。
  阅读顺序：01 输入文档 → 02 处理过程 → 03 结果文档 → Word 成品 rail。
  移除：中央巨大浮动 Glass、负 margin、文档互相覆盖、process panel 遮挡 result、
  `translateZ` 炫技、`lelan-perspective`。**AI 不再使用任何 glass。**
- **D-PHASE1E.4-A-017** — 7 份 Word 成品保留**真实名称**，形态改为
  compact output rail（hairline 左边界 + 分组色调），
  Desktop 4 列 / Tablet 2 列 / Mobile 2 列，不再是 7 张巨大卡片。
  新增免责声明："相关检测与分析结果仅供参考，不代表第三方检测结论。"
  **未新增任何虚假指标。**
- **D-PHASE1E.4-A-018** — AI 文案一致性统一：`positioning` 与
  `features.aigc.description` 中残留的「自然化改写」改为
  「AIGC 分析与降 AIGC」/「AIGC 改写」，与 D-PHASE1E.3-C-008 的品牌修正
  及 `lelan-shouhu` 真实能力一致。**未修改 `lelan-shouhu`。**
- **D-PHASE1E.4-A-019** — AI section 高度：1440 由 **1603px → 1157px**。
  手段是去重与结构简化（移除 4-up facts 列表、移除重复「体验版可用」徽标
  ——该状态此前在同一 section 出现 3 次、移除 4 个固定高度文档盒），
  **不是**硬编码裁切。

### Town — Held Quiet

- **D-PHASE1E.4-A-020** — Town 本轮**只降噪，不做 Globe**。
  删除 `.lelan-town-fg-eave-left/right` 前景飞檐渐变 wedge
  （两条 45%×18% 深色 clip-path，读起来像地面污渍且抢 plot 标签注意力）。
  删除 Guardian 与 Town 连续两次的 `.lelan-divider-coord-fade`（仅保留一处）。
- **D-PHASE1E.4-A-021** — **Town renderer seam 冻结，不得破坏**：
  - `HomeTownClient` 独占 `selectedId` + URL hash 同步（**未改动**）
  - `TownMapStage` 为纯渲染器：props in `{ shops, selectedId, stageLabel? }`，
    不持有状态
  - `TownServiceDrawer` 为纯详情面板
  - `content/town.ts` 仍为唯一真相源，8 个铺子与 `plot {x, y}` 坐标全部保留
  下一阶段 `TownGlobe`（WebGL / R3F）可直接替换或与 `TownMapStage` 并存。
- **D-PHASE1E.4-A-022** — 保留：8 shops / selection / radio keyboard 可达性 /
  hash 双向同步 / drawer / capabilities strip。
  Town 本轮**不塞人物图填空**。

### Section Numbering

- **D-PHASE1E.4-A-023** — 修复可见编号断层：`00 / 01 / 03 / 04 / 05 / 06`
  → **`00 / 01 / 02 / 03 / 04 / 05`**（连续）。
  `content/home.ts` 中 Town=02、AI=03、Technology=04、About=05。
  **业务顺序未改变。** 流水线编号 02 的空缺源自 Phase 1D-G3 移除
  `HomeArchitecture` section。

### Visual Rhythm（本轮验收标准）

- **D-PHASE1E.4-A-024** — 首页最终节奏：
  Hero CALM → Guardian EMOTIONAL / ARCHIVE → Town SPATIAL PREVIEW（收敛）
  → AI QUIET SOFTWARE → Technology CALM → About CALM。
  不再允许 Guardian / Town / AI 连续三个 section 都成为视觉高潮。
  下一轮 Town Globe 完成后，Town 才升级为首页最强空间高潮。

### Engineering / QA

- **D-PHASE1E.4-A-025** — `npm run lint` 0 errors / 0 warnings；
  `npx tsc --noEmit` 0 errors；`npm run build` 成功导出 8 个静态页。
- **D-PHASE1E.4-A-026** — 生产静态预览实测（1440 / 1024 / 768 / 375）：
  document 级无横向滚动；无 broken image（`imgTotal: 8`，全部 `naturalWidth > 0`）；
  console errors 0；无 4xx。
  仅有的 `net::ERR_ABORTED` 来自 Next.js `Link` 的 RSC prefetch 请求，
  与 D-PHASE1E.3-C-009 记录的既有现象一致，非 404。
- **D-PHASE1E.4-A-027** — 本轮**未**安装 three.js / @react-three/fiber / drei，
  **未**实现 Town Globe，**未**进入 Dify，**未**修改 `lelan-shouhu`
  （结束前 `git status` 仍为 clean）。
  R3F 方案评估已被接受为**下一阶段原型方向**，但本阶段**未**实现，
  文档中不得表述为已完成。

## D-PHASE1E.4-B · Interactive Town Globe Prototype（追加于 2026-09-11）

### WebGL 使用边界（正式取代 D-VISUAL-005 的绝对禁令）

- **D-PHASE1E.4-B-001** — 正式允许 `three` + `@react-three/fiber` 用于**成果小镇
  区块的 3D 渲染**。取代 D-VISUAL-005「第一阶段不引入 Three.js」与
  D-ASSET-006 的绝对禁令。
  **仅限 Town**：Guardian 与 AI **不得**使用 WebGL（D-PHASE1E.4-A 已分别确立
  「档案/坐标」与「安静软件」的视觉语言）。
- **D-PHASE1E.4-B-002** — **明确禁止** globe 类库：`globe.gl` / `react-globe.gl` /
  `three-globe` / `cobe`。理由：自带 three 造成重复打包，且把 Earth 语义
  （geojson / 经纬 / 弧线）强加进「东方微缩沙盘」。
- **D-PHASE1E.4-B-003** — `@react-three/drei` **最终未采用**。初版用于 `<Html>` 与
  `useTexture`，但二者均可用极少量代码自行实现；drei 会把大量额外代码并入
  three chunk 而收益极小。已从依赖中移除，改为自写纹理加载 + 自写标签投影。
- **D-PHASE1E.4-B-004** — 新增依赖**仅 3 个**：`three@^0.186.0`、
  `@react-three/fiber@^9.7.0`（dependencies），`@types/three@^0.185.4`
  （devDependencies）。**未引入** GSAP / framer-motion / postprocessing /
  leva / rapier / cannon；`zustand` 仅为 drei 的传递依赖，随 drei 一并移除。

### 不是地球（Earth Semantics Forbidden）

- **D-PHASE1E.4-B-005** — Town Globe **不是**地球/世界地图/物流球/太空星球。
  **禁止**：大陆、国界、经纬网格、卫星贴图、物流弧线、轨道线、星野、星系、
  行星环、卫星、太空尘埃、黑色太空背景。
- **D-PHASE1E.4-B-006** — 地形为**程序化低浮雕球冠**（spherical cap），不是完整球体。
  视觉目标是「放在展示台上的东方微缩沙盘」。球冠下方以平面 rim disc 收口，
  使其读作有底座的实体模型，而非悬空球。
- **D-PHASE1E.4-B-007** — 材质色板限定为 warm ivory / muted jade / earth beige /
  ink green + 极少量 cinnabar（仅用于选中态）。**禁止**蓝色海洋星球、游戏草地绿、
  neon。**未使用** HDR / Environment map / Bloom / SSAO / god rays / lens flare，
  仅 AmbientLight + 2 × DirectionalLight。**第一版不使用实时阴影**
  （改用极淡的 painted contact disc）。

### 架构与状态（seam 冻结，不得破坏）

- **D-PHASE1E.4-B-008** — Town 状态归属**不变**：`HomeTownClient` 独占
  `selectedId` + URL hash + aria-live。`TownGlobe` 与 `TownMapStage` 都是
  **纯渲染器**，接口为 `{ shops, selectedId, onSelect }`，**不得**各自维护第二份
  selected state。
- **D-PHASE1E.4-B-009** — `TownMapStage` 作为**2D fallback renderer 永久保留**，
  同时充当 Globe 的加载态。Globe 在其之上淡入，因此**永远不会出现空白或 spinner**。
- **D-PHASE1E.4-B-010** — `content/town.ts` 仍为唯一业务真相源。新增 `globe:
  { latitude, longitude, elevation? }` 字段；**`plot {x, y}` 保留不删**，
  供 2D fallback 使用。**禁止**把 8 个位置硬编码为 JSX。
- **D-PHASE1E.4-B-011** — `components/town/globe/TownBuildingVisual.tsx` 是**未来资产
  替换 seam**。正式 3D/2.5D 建筑资产到位后，**只需替换该组件**；selection / rotation /
  camera / hash / fallback / drawer **不得**改动。

### 素材诚实性

- **D-PHASE1E.4-B-012** — 01 / 02 使用现有**非透明** WebP，渲染为
  **architectural display panel**（纸框建筑铭牌，立在 plinth 上），
  明确是「微缩立面展板」，**不假装是抠图 3D 建筑**，不使用 alpha 欺骗。
- **D-PHASE1E.4-B-013** — 03–08 无美术资产，统一渲染为**低浮雕 proxy pavilion**
  （plinth + 体块 + 飞檐板 + 四坡顶），必须明显读作「待建/占位建筑形态」，
  **不是空灰盒**。
- **D-PHASE1E.4-B-014** — **禁止**把论文茶寮或课题小铺的图复制给其他铺子，
  **禁止**用换色伪装成 8 栋建筑。8 个业务全部存在，**不因缺美术而减少**。
- **D-PHASE1E.4-B-015** — 只加载现有 2 张 delivery WebP（52KB / 104KB）作为纹理。
  **禁止**把 136MB reference PNG 直接作为 WebGL texture。
  **禁止**任何新增网络资产（模型 / texture / HDRI / skybox / stock map）。

### 能力门（Capability Gate）

- **D-PHASE1E.4-B-016** — 原则：**feature detect first, heuristic second,
  fallback safe**。判定顺序：viewport ≥1024 → WebGL 可用 → 非
  `prefers-reduced-motion` → 非低功耗设备。
- **D-PHASE1E.4-B-017** — 低功耗判定**只接受正向证据**：
  `hardwareConcurrency < 4` 或 `deviceMemory < 4`。**`undefined` 不得判为弱设备**
  （否则会误伤全部 Safari / Firefox 用户）。
- **D-PHASE1E.4-B-018** — **门控必须使用 viewport 宽度，不得使用组件容器宽度**。
  Town 区块内 globe 列在 1440 viewport 下仅约 678px 宽（服务索引与抽屉占用其余
  空间），若以容器宽度门控会在完全合格的桌面上误判为窄视口而永不挂载。
  （此为 Phase 1E.4-B 实际踩到的缺陷，已修。）
- **D-PHASE1E.4-B-019** — `prefers-reduced-motion: reduce` → 直接使用 2D fallback
  （本阶段策略）。Globe 的本体是「手拨沙盘」，向要求减少动效的用户提供只有拖拽的
  3D 体验不如提供已存在的、完全可导航的镇地图。

### 交互

- **D-PHASE1E.4-B-020** — **旋转世界，不是环绕世界的相机**。拖拽 = 转动手中的沙盘
  模型，效果如「手拨沙盘球体」。允许 yaw + 少量 pitch；
  **pitch clamp 为 −0.40 … 0.62**，不得翻到球底。
- **D-PHASE1E.4-B-021** — **禁止持续自动旋转**（无 auto-rotate、无 idle spin）。
  仅在 selectedId 变化时做程序化 rotate-to：**700ms ease-out**；
  `prefers-reduced-motion` 时**瞬时**。旋转后**不完全正中**，保留少量世界上下文。
- **D-PHASE1E.4-B-022** — **wheel 不劫持页面滚动**。本阶段**不提供 zoom**；
  wheel 完全交给浏览器。已在 QA 中验证：wheel 300px → 页面滚动 300px。
- **D-PHASE1E.4-B-023** — 拖拽需有 **drag threshold（5px）**，避免 click 被识别为
  drag；pointer capture + `touch-action: pan-y`（横向拖拽旋转，纵向仍可滚动页面）。
- **D-PHASE1E.4-B-024** — **`frameloop="demand"`**：空闲时**0 连续渲染帧**
  （QA 实测 1.5s 内 requestAnimationFrame 调用 = 0）。仅在拖拽 / selection tween /
  初始挂载时 `invalidate()`。
  ⚠ **关键工程约束**：`frameloop="demand"` 下任何只改数值而不调用 `invalidate()`
  的交互都**不会重绘**。拖拽处理器因此**必须位于 `<Canvas>` 内**以取得
  `invalidate`（此为本阶段实际踩到的缺陷，已修）。
- **D-PHASE1E.4-B-025** — `dpr={[1, 1.5]}`（上限 1.75），基础 antialias，
  不使用 MSAA / supersampling。`<Canvas>` 每个 R3F hook 组件必须在 Canvas 内：
  `useFrame` / `useThree` 在 Canvas 外调用会抛
  "R3F: Hooks can only be used within the Canvas component!"。

### 无障碍

- **D-PHASE1E.4-B-026** — Canvas 为 `aria-hidden="true"` + `role="presentation"`；
  **业务入口永远是 HTML**（左侧语义化服务索引 + 抽屉 + 静态 HTML 8 铺子）。
  Canvas **不得** trap focus。
- **D-PHASE1E.4-B-027** — 新增 `aria-live="polite"` 播报选中项：
  「已选择 01 论文茶寮 · 文曲茶娘」（编号 + 名称 + 人格，不播报长描述）。
- **D-PHASE1E.4-B-028** — 键盘模型不变：原生 `<input type="radio">` + Tab / 方向键 /
  Enter / Space；index 选择 → globe rotate-to。**未因 3D 破坏键盘可达性**。
- **D-PHASE1E.4-B-029** — 标签为**真实 HTML**（不是 3D text），且**只显示选中项一个**；
  其余铺子仅以底座 marker ring 表示，避免 8 个大标签覆盖球体。
  投影由自写 world→NDC 计算完成，避免为一个小徽标引入 drei。

### URL / Hash

- **D-PHASE1E.4-B-030** — 保留既有 hash 机制。**同时支持**
  `#shop-01`…`#shop-08`（数字别名）**与** 原有 `#shop-paper-teahouse`（slug）。
  写回 URL 时仍使用 **slug 作为规范形式**，因此**旧 deep link 不被破坏**。
  非法 hash → 回落 `paper-teahouse` 并规范化 URL。

### 降级与移动端

- **D-PHASE1E.4-B-031** — **≥1024px 才允许挂载 WebGL**。
  **768–1023 与 ≤767 一律使用 2D fallback**，绝不出现
  「浏览器不支持 3D」之类提示，也绝不让手机用户被迫旋转 3D。
- **D-PHASE1E.4-B-032** — Globe **不随页面加载**。仅在 Town 区块接近视口时
  （`IntersectionObserver`，`rootMargin: 300px`）才动态挂载。用户若从未滚到 Town，
  **three / R3F 完全不下载**。
- **D-PHASE1E.4-B-033** — three / R3F 以 `dynamic(..., { ssr: false })` 引入：
  **静态导出 HTML 中不含 canvas、不含 three**，爬虫与 no-JS 只看到完整的
  语义化 8 铺子索引与 2D 地图。
- **D-PHASE1E.4-B-034** — WebGL context lost / 初始化失败 → **自动回落 2D**，
  不抛错、不崩溃页面。

### QA 结果

- **D-PHASE1E.4-B-035** — lint 0 / tsc 0 / build 成功导出 8 页。
  1440 / 1024 / 768 / 375 全部 `document.scrollWidth === viewport`（无横向溢出）；
  `/guardian/demo`、`/login`、`/profile` 同样无溢出。
  0 broken image（8 张图全部 naturalWidth > 0）。
  **0 JavaScript error / 0 exception / 0 404**。
  唯一 console 输出为 `THREE.Clock is deprecated` 的 warning，来自
  `@react-three/fiber` 内部（`frameloop` 计时），非本项目代码，不影响功能。
- **D-PHASE1E.4-B-036** — three chunk 实测 **907KB raw / 233KB gzip**，
  **未被 `index.html` 引用**（纯懒加载）。Town 进入视口后才请求。
  首屏 JS 总量约 646KB raw（未含 three）。
- **D-PHASE1E.4-B-037** — 交互已实测验证（非仅代码审查）：
  拖拽 yaw 变化 = 像素位移 × 灵敏度；rotate-to 最终 yaw = 目标经度精确值；
  pitch 精确停在 clamp 上限 0.62；globe 点击 → selectedId + hash + drawer + index
  四者同步；wheel 不劫持页面。
- **D-PHASE1E.4-B-038** — 本轮**未**进入 Dify，**未**修改 `lelan-shouhu`
  （结束前 `git status` 仍为 clean），**未**修改 Guardian contract，
  **未**修改 AI 产品能力描述。

## D-PHASE1E.4-B1 · Town Globe Composition Fixes（追加于 2026-09-11）

> 本轮为 Phase 1E.4-B Final Audit（verdict: PASS WITH FIXES）的小修轮。
> **未**改动 R3F architecture / selection state / hash model / fallback architecture。

### 建筑尺度

- **D-PHASE1E.4-B1-001** — 建筑统一放大 **1.25×**（审计：8 栋建筑在 ~330px 球体上
  仅约 40px，读作"球上几个小点"而非"一个镇"）。
  实现方式：在 `TownBuildingVisual` 外层加**唯一一个** `scale` wrapper，
  使 plinth / 体块 / 飞檐 / 屋顶 / 立面展板 / marker / hit target
  **一起缩放**，永不相互错位。
- **D-PHASE1E.4-B1-002** — 放大前已做**碰撞核算**：1.25× 时最宽飞檐半宽 0.073 球半径，
  需要 8.35° 间隔；实际最近一对（04 软著 ↔ 07 产学研）为 **19.0°**，
  余量 **10.6°**。8 栋方位全部复核，**无 overlap、无 label 碰撞、无 hit area 碰撞**。
- **D-PHASE1E.4-B1-003** — **只放大建筑**。globe / terrain / roads **均未**缩放，
  道路也未随之变粗。

### 相机与取景

- **D-PHASE1E.4-B1-004** — 1440 下沙盘下缘被 viewport 底部裁切。根因是**两个**问题叠加：
  section header 占 ~379px，而 stage 固定 560px，超出 900px viewport。
  两个都已修。
- **D-PHASE1E.4-B1-005** — stage 高度改为**视口相关**：`min(54vh, 500px)`
  （移动端 `h-[400px]` / `sm:h-[440px]`，短视口下限 400px）。
  1440×900 下 stage = 486px，画布底 865 < 900 → **不再被 fold 裁切**。
- **D-PHASE1E.4-B1-006** — 相机 **`[0, 1.13, 3.85]`**（原 `[0, 1.15, 3.9]`），
  `lookAt` y = **0.02**（原 0.06）。取景基于**实测像素**而非估算：
  改前模型仅占画布高 65%（上留 84px / 下留 88px）；改后占 **83%**，
  上留 42px / 下留 39px。FOV 仍为 34（区间 30–45 内，非广角）。
- **D-PHASE1E.4-B1-007** — `lookAt` 目标改为**组合体的真实垂直中心**
  （穹顶 +1.0 → 底座脚 ≈ −0.64），而非穹顶原点。原先对准原点导致模型在画面中偏低，
  是裁切的原因之一。

### 沙盘轮廓（Sand-table）

- **D-PHASE1E.4-B1-008** — cap 由 124° 加宽至 **130°**，rim 下移至 y = −0.643
  （原 −0.559），穹顶更扁、更像"落定的地形"而非球体。
  继续**禁止**大陆 / 经纬 / 轨道 / 太空 / 星野 / 大气辉光 / 黑色背景。

### 展示底座 —— 结论：本相机角度下不可行（已实测）

- **D-PHASE1E.4-B1-009** — 审计建议"增加克制底座以去除 planet 感"。
  **实测四种方案后确认：在当前相机角度下，可见的宽底座无法避免渲染瑕疵。**
  几何原因（已记录在 `TownTerrain.tsx` 注释）：
  底座是位于 rim 高度的**水平圆盘**。相机位于其平面上方时，圆盘的**前缘**在屏幕上
  投影得比盘心**更低**，且该偏移随半径增大。任何宽到足以从穹顶轮廓后"探出"的圆盘
  （≥ 约 1.25× rim）其前缘都会下探到把一条浅色带横切在沙盘中部 —— 这正是评审中
  看到的瑕疵。1.04× 的"小唇边"同样产生该带（已实测确认）。
- **D-PHASE1E.4-B1-010** — 因此底座保持**略小于**地形 rim 半径
  （top 0.83× / bottom 0.78× rim，高 0.1），作为不可见的承托脚存在，
  由下方 contact shadow 把模型"压"在纸面上。
  **正式的宽展示底座移交 Town Art Pass**，届时可连同地形与相机仰角一起重新设计。
  **本轮不为此硬造视觉。**

### Drawer 间距与均衡

- **D-PHASE1E.4-B1-011** — 修复 `ARCHIVE · SHOP-xx` 与店铺名仅 ~7px 的贴挤。
  archive ID 改为**正常文档流**首行，其后**固定 18px** 呼吸空间再是店铺名。
  实测 **gap = 18px**。**未**加边框、未加额外标签、未加装饰。
- **D-PHASE1E.4-B1-012** — 曾试 `mt-auto` 把内容推到面板底部，反而把 header 与
  正文拉开 ~50px，形成"头尾分离"。已回退为**固定间距**方案。
- **D-PHASE1E.4-B1-013** — drawer 高度改为与 stage **等高**（列容器 `lg:flex`），
  实测 drawer 486px = stage 486px，消除了右下方的空置感。
  **未填充任何无意义文字**。

### 01 / 02 与 03–08

- **D-PHASE1E.4-B1-014** — 01/02 **未重做素材**。仅调整立面比例：面板区相对纸框
  收窄约 10%，纸边留白加宽，读作"带装裱的信息铭牌"而非"整幅照片板"。
  **未做假抠图**。真正的风格统一留待 Art Pass。
- **D-PHASE1E.4-B1-015** — 03–08 继续使用现有 proxy。仅**柔和屋顶**：
  高度 0.030–0.042 → **0.022–0.030**，底面半径 0.80w → **0.94w**，
  飞檐 1.34w → **1.42w**（与更宽的屋顶成比例）。
  审计指出的"屋顶略尖"已消除。**未**做复杂中国古建筑。

### 其余

- **D-PHASE1E.4-B1-016** — Terrain 本轮**未**做完整 art pass；未加 height variation /
  courtyard / water patch（避免拖慢本轮）。正式 terrain 留 Art Pass。
- **D-PHASE1E.4-B1-017** — **Hash 行为未改**。`#bogus` 不 normalize 的现状保持，
  本轮不引入 router complexity。
- **D-PHASE1E.4-B1-018** — **favicon**：项目当前**没有任何** favicon / icon 资源
  （`app/favicon.*` 与 `public/*icon*` 均不存在）。按指示**不临时绘制低质量图标**，
  记为 known limitation，留待品牌资产到位时正式接入。

### 性能不变量（全部保持）

- **D-PHASE1E.4-B1-019** — 保持：lazy load / `frameloop="demand"` / `dpr max 1.5` /
  no drei / no postprocessing / no shadows / no auto rotation / no wheel zoom。
  实测：初始 JS **646,414 bytes**（与 1E.4-B 的 646,463 基本一致 → **首屏无回归**）；
  three chunk 908,379 raw / 233.1 KB gzip，**仍未被 index.html 引用**；
  空闲 1.5s 内 rAF = **0**。

### 回归验证（全部通过）

- **D-PHASE1E.4-B1-020** — 实测通过：drag（无文字选中、无横向位移）、
  click（globe → selectedId + hash + drawer + aria-live + index 同步）、
  rotate-to（8 个铺子全部正确落位）、index sync、drawer sync、hash sync、
  keyboard、aria-live、reduced-motion（canvas=0 且 three 完全不下载）、
  context-loss fallback（canvas 消失、2D 恢复、无错误）、375 fallback、768 fallback。
  1440/1024/768/375 全部 `document.scrollWidth === viewport`，0 broken image，
  0 JS error / 0 exception / 0 404。

## D-PHASE1E.4-C · Town Art Pass（追加于 2026-09-11）

> Town 美术与视觉统一轮。**未**改动 R3F architecture / selection / hash / fallback，
> **未**重新设计 Guardian / AI，**未**进入 Dify，**未**修改 `lelan-shouhu`。

### Hybrid Building System（正式采用）

- **D-PHASE1E.4-C-001** — 正式采用 **Hybrid 建筑系统**，取代原型期的
  "01/02 照片牌 + 03–08 假代理体"：
  **程序化 3D 体量（backing slab + ledge + plinth）＋ 2.5D 立面资产**。
  每栋仍有真实 3D 体积（parallax / occlusion），而东方建筑识别来自立面资产。
  兼顾低 payload、统一风格、低维护。
- **D-PHASE1E.4-C-002** — **8 栋全部使用同一种建筑系统**。
  01/02 不再特殊：它们与其他 6 栋共享同一 delivery 规格（668×508 纸装裱板）、
  同一材质逻辑、同一底座与檐口语法。01/02 与 proxy 的风格割裂已消除。
- **D-PHASE1E.4-C-003** — 每栋保留独立识别，但**不通过大图标**：
  形制、牌匾（源自素材本身）、比例差异 + drawer 文案承担业务识别。
  **禁止**把 03 做成巨大齿轮 / 04 做成巨大电脑 / 08 做成发光机器人。
  建筑仍是东方微缩建筑。

### 透明抠图裁定：不可行（已实测）

- **D-PHASE1E.4-C-004** — 简报优先透明 2.5D，但要求"若源背景复杂则不要强行抠图，
  退回统一 mounted façade panel"。
  **实测结论：必须退回。** 依据：
  - 8 张 reference PNG **虽为 RGBA，但 alpha 全部为 255**（min=max=255），
    即 alpha 通道是完全不透明的填充 —— **根本不存在可保留的透明主体**。
    （现有 delivery WebP 为 `VP8`，本身即丢弃 alpha。）
  - 背景边缘标准差：ai-workshop 18、software-shop 26（接近平坦），
    其余 6 张为 **37–59**（完整渲染场景）。对这些强行阈值分割会切掉建筑本体
    或留下白边。
  **因此 8 栋统一为同一种产物：纸装裱建筑板（paper-mounted architectural plate）。**
  由构造保证统一，且诚实。
- **D-PHASE1E.4-C-005** — **未**做水印移除、**未**做会移除主体的裁切、**未**重绘、
  **未**虚构建筑。reference PNG 仅被读取。

### Delivery 资产生成

- **D-PHASE1E.4-C-006** — 新增 `scripts/derive-town-buildings.cjs`
  （保留原 `derive-town-pair.cjs` 不动）。确定性、可重复运行、
  只写 `public/images/town/buildings/`、绝不覆盖 reference。
- **D-PHASE1E.4-C-007** — 8 栋 delivery 全部为 **668×508 WebP**，
  `content/assets.ts` 声明的 width/height **与真实文件一致**（不再出现声明错位）。
- **D-PHASE1E.4-C-008** — 色彩统一（grading，非重绘）：
  - saturation **0.30** —— 把素材中饱和的蓝 / 紫 / 亮金压入中性带。
    （0.72 太轻，software-shop 仍显饱和蓝、产学研仍显紫，8 张不成一家。）
  - 暖象牙色洗 **0.20** —— 把 8 种不同光温收敛到 town palette
  - 统一左上光向 ramp **0.07** —— 简报要求"只选一个光向"，
    而非 8 张各自不同光
- **D-PHASE1E.4-C-009** — **禁止**亮蓝 / 霓虹紫 / 赛博青 / 饱和金 / 旅游景区红金。
  Town palette 固定为 warm ivory / paper beige / muted jade / earth ochre /
  dark ink green + 极少量 cinnabar；新增 muted grey-green `water`
  （**不是**蓝色湖泊）。

### 建筑摆放（重要渲染决定）

- **D-PHASE1E.4-C-010** — 建筑为**直立且面向相机**（upright, camera-facing）。
  曾试两种方案并**均已否决**，原因记录以免重试：
  1. **径向站立**（up = surface normal）：物理正确，但相机从约 16° 俯视沙盘，
     所有立面几乎与视线平行，8 栋渲染成白色薄片。
  2. **部分朝观察者倾斜**：近处朝前、侧面变成接近剖面的角度 —— 正是本轮要消除的
     不一致。
  直立 + 绕 Y 朝向相机是实体模型村与等距城市视图的通行做法，
  8 栋在任意旋转角度下呈现一致。建筑仍**定位在球面上**，镇的空间弯曲与
  "坐落于沙盘"的观感保留。
- **D-PHASE1E.4-C-011** — `BUILDING_SCALE` 1.25 → **1.15**，
  与更大的 668×508 立面板配套，避免建筑在穹顶上互相压挤。

### Terrain Art Pass

- **D-PHASE1E.4-C-012** — 新增 `components/town/globe/TownTerrainDressing.tsx`：
  地形不再是一块素色穹顶，而有明确分区 ——
  **A** 主地面（沿用穹顶）／**B** 2 个院落 courtyard／**C** 1 个小水面
  （muted grey-green）／**D** 道路（保留 5 条主路）／**E** 轻高差（2 阶 terrace）。
- **D-PHASE1E.4-C-013** — 院落 2 个（中央核心区与南侧 05/06/07 前排），
  石材/纸面、极浅。**不是**中国园林大全。
- **D-PHASE1E.4-C-014** — 水面 1 个小 patch，颜色 muted jade / grey-green，
  面积小，作用仅为打破纯球面。**禁止**蓝色湖泊。
- **D-PHASE1E.4-C-015** — 植被 **6 个**极简 low-poly 树（双锥 + 树干），
  只做剪影，仅作尺度参照。**禁止**森林 / 花园 / 粒子叶片。
- **D-PHASE1E.4-C-016** — 灯 **3 个**（墨色杆 + 朱砂罩），桥 **0 个**
  （本轮未做，避免装饰堆砌）。均只作空间比例参照。
- **D-PHASE1E.4-C-017** — 高度变化仅 2 阶极浅 terrace（0.012），
  **禁止**山峰 / 悬崖 / 游戏地图层级。
- **D-PHASE1E.4-C-018** — **重要几何约束**：球面上任何**水平贴片**（院落 / 水面 /
  terrace）在俯视相机下其前缘会向屏幕下方偏移，偏移量随半径增大。
  1E.4-B1 建底座时已确认过该带纹瑕疵，因此**所有地面贴片半径都有意保持克制**。
  未来放大它们时须重新检查是否出现横切沙盘的浅色带。

### 2D Fallback Art

- **D-PHASE1E.4-C-019** — 因 8 栋均有真实 delivery 资产，**2D `TownMapStage` fallback
  自动升级为 8 个真实建筑图**（此前为 2 实图 + 6 灰代理）。
  实测 768 / 375 下 `imgCount = 8`、`broken = 0`，
  资产列表为全部 8 个建筑 WebP。**§48"fallback 也要显示 8 个真实建筑"已达成。**

### 性能不变量（全部保持）

- **D-PHASE1E.4-C-020** — 保持：lazy load（滚动前 `canvas=0`、三包未请求）/
  `frameloop="demand"`（空闲 1.5s 内 rAF = **0**）/ `dpr` 上限 1.5 /
  no drei / no postprocessing / **no shadow maps** / no HDRI /
  no continuous animation / no auto rotation / no wheel zoom。
  通道：wheel 300px → 页面滚动 300px。
- **D-PHASE1E.4-C-021** — 几何预算：8 栋 = 每栋 4 个 low-poly mesh
  （backing slab / art plane / ledge / plinth），无合并需求即已很低。
  Terrain dressing 追加约 30 个极小 primitive。纹理仅 8 个 668×508。

### Delivery 预算

- **D-PHASE1E.4-C-022** — 8 栋总计 **188.4 KB**（单栋 14.9–35.5 KB），
  远低于"单栋 <150KB、8 栋 <1MB"的要求。
  未把 5MB 原始 PNG 直接压成 1MB WebP。

### 版权状态（强制保持）

- **D-PHASE1E.4-C-023** — 所有 reference 资产**仍是 placeholder / 来源未确认**。
  本轮仅可用于 prototype / internal visual pass。
  `content/assets.ts` 中 8 栋建筑的 `status` **保持 `"placeholder"`**，
  **不得**改为 `"approved"`。
  docs 继续标注：**NOT FINAL COMMERCIAL ASSET — pending copyright / source clearance**
  （D-ASSET-007 / D-ASSET-008）。发布前必须完成版权复核或替换。

### 工程验证

- **D-PHASE1E.4-C-024** — lint 0 / tsc 0 / build 成功导出 8 页。
  1440 / 1024 / 768 / 375 全部 `document.scrollWidth === viewport`；
  0 broken image（每页 14 张 `<img>`，含 8 栋建筑）；
  **0 JavaScript error / 0 exception / 0 404**。
  回归全部通过：drag（无文字选中）、globe click（→ AI 工具坊，四态同步）、
  rotate-to ×8、index sync、drawer sync、hash sync、wheel 不劫持、
  reduced-motion（canvas=0）、context-loss fallback（canvas 消失且 2D 恢复）、
  8 项语义索引 + 8 个 radio + `aria-live="polite"`。

### 已知限制

- **D-PHASE1E.4-C-025** — **WebGL 立面纹理在评审所用的软件光栅化环境中无法验证**。
  已实测确认：8 个纹理均成功加载（668×508）、上传（`texture.image` 已设置）、
  材质与网格均已挂载、并已 `invalidate()` 重绘，但建筑板在
  headless SwiftShader 下仍渲染为空白纸板。
  已依次排除：图层遮挡（合并为**唯一**一个贴图面）、demand 模式不重绘
  （多次 invalidate）、`HTMLImageElement` 上传路径（改用 `createImageBitmap`）、
  材质记忆化（按就绪状态 key 整个 group）。
  **结论：纹理管线在代码层面正确，但无法在本环境的软件光栅化下确认最终像素**。
  真实 GPU 浏览器验收仍待进行。**2D fallback 与所有交互不受此限制影响。**
- **D-PHASE1E.4-C-026** — favicon 仍缺失（唯一真实 404），保持 known limitation。

## 修改规范

- 新决定追加在文末，按 `D-<类别>-<序号>` 编号。
- 不得删除或改写历史条目。
- 若某条决定被推翻，**新增**一条"取代 D-XXX-YYY"，保留原条目并标注状态。

## D-PHASE1A · Homepage Preparation Patch（追加于 2026-09-10）

### Source / Delivery 资产分层

- **D-PHASE1A-001** — `assets/reference/` 为唯一 reference 视觉资产仓库；
  `public/images/` 仅含实际进入 UI 的 delivery 资源。
- **D-PHASE1A-002** — 组件层只通过 `content/assets.ts` 的语义 id 引用资产；
  路径与扩展名可在 mapping 中演进，**不**直接硬编码到组件中。
- **D-PHASE1A-003** — Reference 资源**不**暴露浏览器 URL；
  `VisualAsset.reference` 仅供工程溯源。
- **D-PHASE1A-004** — `VisualAsset.status` 必填为 `placeholder` / `approved` /
  `future` 之一；`placeholder` 表示**非最终商用定稿**。

### Routing 与 Indexing 解耦

- **D-PHASE1A-005** — 路由"是否可被用户访问"由 Next.js App Router
  (`app/<route>/page.tsx`) 决定，**不**由 `publishedRoutes` 决定。
- **D-PHASE1A-006** — `publishedRoutes` 仅决定 sitemap 中**对外可被搜索引擎索引**
  的路由子集；为空时仅表示"暂不公开索引"，**不**影响导航。
- **D-PHASE1A-007** — 公开预览 (域名未确认) 期间：robots.txt allow "/",
  页面级 `noindex/nofollow`，配合以避免 placeholder domain 污染索引。
- **D-PHASE1A-008** — 公开预览期间**不**输出 `sitemap.xml` URL 与 `host` 字段，
  避免爬虫索引 placeholder URL。

### Hero copy baseline

- **D-PHASE1A-009** — 首页 hero baseline 为：
  > "把科研能力，变成可被使用的产品。"
  后续措辞微调应保持"克制 / 真实 / 不夸大"基线。

### Guardian 排序原则

- **D-PHASE1A-010** — Guardian 首页内容排序 **必先**呈现四步法
  （人生档案 → 队列建模 → 横断面校准 → 风险预警），
  五行 / 八阶段仅在 `/guardian` 详细页作为分类 / 记忆助记符使用。
- **D-PHASE1A-011** — 五行 / 八阶段**不**作为风险打分输入，
  **不**作为科学因果机制主张。
- **D-PHASE1A-012** — Guardian 未来首个 MVP 可能聚焦饮食 / 营养场景；
  **当前阶段不实现**任何健康表单、风险评分、营养推荐、医疗筛查或健康数据存储。

### 组织层级原则

- **D-PHASE1A-013** — 乐懒科技对外表达为"两大系统 + 一项软件产品能力"：
  Town（成果小镇）、Guardian（乐懒守护）+ AI（软件产品）。
  AI **不**与 Town / Guardian 并列构成"三业务"。
- **D-PHASE1A-014** — 首页 architecture 段落必须明确两个系统层级关系，
  并显式声明 AI 作为贯穿两个体系的软件能力桥接。

### Layout / 内部导航

- **D-PHASE1A-015** — 内部"返回首页"等导航链接直接使用 `"/"`，**不**绑定到
  `siteUrl`（未确认时为空），避免 placeholder URL 出现在 DOM 中。

---

## D-PHASE1D-G3 · Guardian-first Homepage + LeLan AI Integration（追加于 2026-09-11）

### Homepage 产品叙事优先级

- **D-PHASE1D-G3-001** — Homepage 新顺序：Hero → 乐懒守护 → 成果小镇 → LeLan AI → Technology → About。
  乐懒守护为第一核心产品模块，成果小镇为第二主要业务系统。
- **D-PHASE1D-G3-002** — `HomeArchitecture` section 移除，
  不再作为独立 section。两个系统关系在 Hero 中通过三产品 pillar cards 表达。
- **D-PHASE1D-G3-003** — LeLan AI 作为"已上线独立软件产品"定位，
  不是"Beta 即将开放"。文案升级为"体验版可用"。

### Header 导航重排

- **D-PHASE1D-G3-004** — Header nav 新顺序：首页 / 乐懒守护 / 成果小镇 / 乐懒 AI / 关于。
  `#ai` 指向 AI section。
- **D-PHASE1D-G3-005** — "产品" anchor（指向 #architecture）移除。

### LeLan AI 文案与外链

- **D-PHASE1D-G3-006** — LeLan AI 文案基于 `lelan-shouhu` 仓库 read-only audit 确认的实际能力：
  - 文本输入或 .docx 上传（≤ 10 MB）
  - 三档降重强度（轻度 / 中度 / 深度），独立调模型
  - AIGC 分析（结构化 JSON 输出）
  - 降 AIGC 自然化改写（基于分析结果）
  - 7 个 Word 成品：降重 Word × 3 + AIGC 报告 + 摘要 + 批注版 + 原文标注版
  - DeepSeek-v4-Flash 模型
  - 无需登录即可体验
- **D-PHASE1D-G3-007** — LeLan AI 当前**无确认的公开生产 URL**。
  lelan-shouhu repo 确认部署在 Render（`lelan-shouhu` service），但无域名确认。
  官网不硬编码未确认 URL，正确报告"体验入口整理中"。
- **D-PHASE1D-G3-008** — LeLan AI 与官网融合说明：
  "独立产品体验版已上线；与乐懒科技官网的账号和深度集成规划中。"
  **不**声称已统一账号、数据或 API。

### 两系统关系

- **D-PHASE1D-G3-009** — "两大系统，一个体系"表达保留，
  在 Hero 三产品 pillar 中简洁体现，不通过独立 section 呈现。
- **D-PHASE1D-G3-010** — LeLan AI 不是第三业务翼，而是真实软件产品能力入口。
  三产品 pillar 均作入口用途，不是等权业务线。

### Repo 边界

- **D-PHASE1D-G3-011** — 官网与 lelan-shouhu 保持独立部署，
  **不**实现：代码合并 / monorepo / submodule / shared session / cross-domain SSO。
  "融合"定义为品牌/导航/域名的长期规划，不是本阶段实现目标。

## D-PHASE1E · Guardian Demo Contract Freeze + Mock Adapter（追加于 2026-09-11）

### 三层 Contract 系统

- **D-PHASE1E-001** — 明确三层 Contract 边界：
  - `GuardianDemoInput`：用户建档输入（Step 1–5 表单数据）
  - `GuardianAnalysisResult`：分析层（future Dify 输出，当前由 mock adapter 生成）
  - `GuardianProfile`：最终档案（`/profile` UI 唯一消费的数据结构）
- **D-PHASE1E-002** — `GuardianProfile` contract 保持与 Phase 1D-G2 完全兼容，
  不因 Demo 功能重命名或扩展字段。

### Deterministic vs AI/Dify 职责分离

- **D-PHASE1E-003** — 以下由前端/adapter deterministic logic 负责：
  `age → stage mapping`、`stage metadata`、`scenario metadata`、
  `task total`、`task done/current/upcoming`、`progress completed/total`、
  `archive id`、`basic timeline records`。
  **LLM 不应决定确定性事实**（人生阶段、完成进度、任务是否完成）。
- **D-PHASE1E-004** — 以下可由 Dify/rule engine 提供（future）：
  `summary`、`attentionItems`、`dimensionNotes`、`explanation`、
  `suggested next information direction`。

### Mock Adapter

- **D-PHASE1E-005** — `lib/guardian/mock-adapter.ts` 实现 `createGuardianDemoProfile(input) → GuardianProfile | GuardianDemoError`。
  内部为本地 deterministic 逻辑，无网络调用。
- **D-PHASE1E-006** — 未来替换方案：在 `createGuardianDemoProfile` 内部替换为
  `fetch("https://api.lelan.tech/guardian/demo", { method: "POST", body: JSON.stringify(input) })`。
  Profile UI 无需改动。
- **D-PHASE1E-007** — Mock adapter validation 返回结构化错误：
  `INVALID_INPUT`、`STAGE_MISMATCH`（含 expectedStage）、`UNSUPPORTED_SCENARIO`、`GENERATION_FAILED`。
  UI 展示用户友好的中文错误文案，不暴露技术 stack。

### Stage / Scenario / Tag IDs

- **D-PHASE1E-008** — 8个稳定 Stage ID：`zhen-infant` / `xun-child` / `li-adolescent` /
  `dui-young-adult` / `qian-adult` / `kan-middle-age` / `gen-later-life` / `kun-elder`。
  当前版本年龄映射：0–9 / 10–19 / 20–29 / 30–39 / 40–49 / 50–59 / 60–69 / 70+。
- **D-PHASE1E-009** — V1 5个 Scenario ID：`general` / `study-career` / `startup` / `health` / `wealth`。
  其他场景（housing/food/travel）预留，不在 V1 UI 中开放。
- **D-PHASE1E-010** — 18个 Dimension Tag ID（stable internal IDs，中文 label 分离）：
  wealth: budget/insurance/business-account/tax-attention；
  health: annual-checkup-pending/sleep-attention/exercise-record/health-record；
  travel: frequent-travel/document-check/trip-planning；
  food: irregular-meals/nutrition-record/meal-routine；
  housing: renting/housing-plan/renovation/family-housing。

### sessionStorage 边界

- **D-PHASE1E-011** — `lelan_demo_session`：m123/n123 演示账号登录状态。
  `lelan_generated_guardian_profile`：/guardian/demo 生成的档案。
  两者独立存储，互不覆盖。
- **D-PHASE1E-012** — 用户登录 m123/n123 时，清除 `lelan_generated_guardian_profile`。
  因为用户明确选择了模拟账号，generated profile 不应残留。
- **D-PHASE1E-013** — `/profile` 数据来源优先级：
  优先级1：generated profile；优先级2：demo account persona；优先级3：空状态。

### 禁止术语

- **D-PHASE1E-014** — Guardian Analysis / Mock Notice **禁止**使用以下术语：
  `riskScore` / `riskLevel` / `highRisk` / `mediumRisk` / `lowRisk` /
  `疾病诊断` / `治疗方案` / `药物建议` / `投资建议` / `准确预测`。
  全部使用粗粒度、正向/neutral 的 notices（如"作息记录值得持续关注"）。

### Visual / Privacy

- **D-PHASE1E-015** — `/guardian/demo` 页面顶部必须显示 disclaimer：
  "当前为乐懒守护产品演示，不建立真实医疗档案。"
  所有数据仅在当前浏览器中展示，关闭标签页后自动清除。
- **D-PHASE1E-016** — `/profile` 顶部区分来源标签：
  generated profile → "本次 Demo 档案"（绿色）；demo account → "模拟账号档案"（灰色）。

## D-PHASE1E.3-A · Engineering Hardening + Guardian Visual System（追加于 2026-09-11）

### P0: Guardian Demo Step 2 Bypass Fix

- **D-PHASE1E.3-A-001** — `/guardian/demo` Step 2 仅保留唯一前进路径："确认阶段"按钮。不再暴露通用"下一步"。
  用户必须明确点击"确认阶段"才能进入 Step 3。
- **D-PHASE1E.3-A-002** — Step 6（档案校对）始终同时显示"返回修改"和"生成我的人生档案"两个操作按钮。
- **D-PHASE1E.3-A-003** — Step 变更前增加 pre-entry guard：如果 state 不完整，跳回对应步骤并显示错误。
- **D-PHASE1E.3-A-004** — Step 变更时 focus 到步骤 heading（`headingRef`），改善键盘 / 屏幕阅读器体验。

### Age Validation Fix

- **D-PHASE1E.3-A-005** — 年龄输入改为 `type="text"` + `inputMode="numeric"`，
  避免浏览器将 `36.8` 自动规范化为 `36`。使用 `parseAndValidateAge()` → `Number()` + `isValidAge()` 拒绝小数、负数、NaN、空值。
  `parseAndValidateAge` 导出自 `content/guardian.ts`。

### Navigation / Anchor Fix

- **D-PHASE1E.3-A-006** — Header / Footer 所有 section 导航链接统一使用绝对路径 `/#section`（如 `/#guardian`、`/#town`），
  确保从 `/profile`、`/login`、`/guardian/demo` 等子页点击后可正确返回首页对应 section。
- **D-PHASE1E.3-A-007** — Hero pillar href 从 display label 字符串匹配改为 content model 中的显式 `href` 字段。
  `content/home.ts` 的 `HomeHeroSection.pillars[].href` 存储明确的锚点路径。
  Hero 也新增 `software` 字段，独立于 pillars，用于渲染软件产品行。

### Mock Adapter Validation

- **D-PHASE1E.3-A-008** — `completedTaskIds` 验证：
  1. 必须是字符串数组
  2. 每个 ID 必须属于 `ALL_VALID_TASK_ID_SET`（所有 V1 scenario task ID 的并集）
  3. 每个 ID 必须属于当前 selected scenario 的 task 集合
  任何违规返回 `INVALID_INPUT` + 具体无效 ID。
- **D-PHASE1E.3-A-009** — `selectedDimensionTags` 验证：
  每个 tag ID 必须属于 `VALID_DIMENSION_TAG_ID_SET`（18个稳定 tag ID）。违规返回 `INVALID_INPUT`。

### Missing-Dimension Semantic Fix

- **D-PHASE1E.3-A-010** — 用户未选择某生活维度的任何 tag 时，该维度在 GuardianProfile 中默认状态为 `planned` / "待完善"，
  而非 `normal` / "已记录"。"已记录"仅用于用户实际提供了 tag 的维度。

### Corrupt Cache Safe State

- **D-PHASE1E.3-A-011** — `getGeneratedProfile()` 读取 sessionStorage 时，
  如果 JSON malformed 或结构缺少 `id`/`archiveRef`/`tasks`/`elements` 等关键字段，自动清除该条 corrupt entry 并返回 null。
  `/profile` 页面显示 safe empty state 而非 crash。

### Generated Profile vs Login State Differentiation

- **D-PHASE1E.3-A-012** — Header 中 `DemoAccountNav` 区分三种状态：
  1. 未登录 → "登录"
  2. Demo 账号登录 → "我的档案" + "退出" + "本次档案" 入口
  3. 仅存在 generated profile → "本次档案" + "清除" + "查看" 入口
  Generated profile 不等于登录 session；Header 不将 generated profile 当作真实认证状态。

### archiveRef Determinism Fix

- **D-PHASE1E.3-A-013** — `archiveRef` 改为确定性格式：`LELAN-DEMO-GEN-{AGE}-{GENDER}-{STAGE-SHORT}`。
  例如：`LELAN-DEMO-GEN-36-F-DUI`、`LELAN-DEMO-GEN-28-M-LI`。
  不再使用 `currentYear`。同一输入在所有运行 / 年份中产生相同 archiveRef。

### Content / Technology Copy Fix

- **D-PHASE1E.3-A-014** — Technology 三项工程能力文案改为诚实描述：
  "可追溯" → "工程目标：所有生成内容可被回溯到来源、模型与编辑过程。"
  "人在回路" → "设计原则：关键判断保留人类复核环节，AI 不替代最终决策。"
  "最小数据" → "设计原则：面向最小数据原则设计；用户控制权作为产品目标持续推进。"
  不再将"工程目标"和"设计原则"描述为现有已实现的能力保证。

### Visual System

- **D-PHASE1E.3-A-015** — 建立全站 6 元素 Visual Grammar（`app/globals.css`）：
  1. Coordinate Line（坐标线）— 细线结构
  2. Position Node（阶段节点）— 圆形节点
  3. Archive ID（档案编号）— 等宽字体小号编号
  4. Guardian Square Seal（方形守护印）— 新增 `components/guardian/GuardianSeal.tsx`
  5. Archive Corner（档案边角）— 四角装饰线
  6. Annotation Leader（边注引线）— 微型注释
- **D-PHASE1E.3-A-016** — 建立 Spatial Depth System（`app/globals.css`）：
  Depth 0–4（背景 / 坐标面 / 主体表面 / 主对象 / 标注层），
  CSS `translateZ()` 仅在 ≥641px 生效，≤640px 禁用 perspective/3D transform。
  仅 archive sheet / GuardianSeal / coordinate canvas 使用 depth；普通按钮/文字不使用。
- **D-PHASE1E.3-A-017** — Background system：
  L0（Editorial，`--color-paper`）用于 Hero / Technology / About；
  L1（Paper/Archive，`--color-paper-pure`）用于 Demo / Profile；
  L2（Coordinate，`lelan-bg-coordinate`）用于 Guardian 主视觉局部。
- **D-PHASE1E.3-A-018** — Footer 按 SYSTEMS / SOFTWARE / COMPANY / LEGAL 分组，
  SYSTEMS（乐懒守护、成果小镇）+ SOFTWARE（乐懒 AI）+ COMPANY（首页、关于）+ LEGAL（隐私、条款）。
  不再将 Beta 状态混入 Footer；AI "体验版可用" 仅出现在 AI section 和 SOFTWARE group。
- **D-PHASE1E.3-A-019** — Hero 重构：
  不再使用三个等权大卡；改为左右两栏（60/40 split）。
  左：品牌声明 + baseline + CTA；右：两大系统节点 + 软件产品行（独立行）。
  Hero 主视觉保持 premium editorial；Guardian 第一视觉高潮。
- **D-PHASE1E.3-A-020** — Guardian Homepage 重构：
  引入 coordinate plane（graph-paper 背景）+ archive sheet（投影）+ GuardianSeal。
  三栏布局（desktop）：左 Y轴（八阶段）/ 中当前坐标 + 任务链 / 右 GuardianSeal。
  移除主 lifecycle rail 上的缩略图（40–56px 无意义图片噪声）；
  阶段由结构性标记（trigram · name · age range）定义。
- **D-PHASE1E.3-A-021** — Five Elements 重构：
  不再使用 5 张独立卡片；改为连续档案带（desktop 单行，5 列由细竖线分隔；mobile 5 行堆叠）。
  每项：金/木/水/火/土 + 维度名 + 状态标签 + 一句说明。
  禁止：五行转盘、相生相克箭头、宝石/球/神兽。
- **D-PHASE1E.3-A-022** — `/profile` 重构：
  从 Dashboard 变为个人档案首页；视觉优先级：GuardianSeal → 当前坐标 → 任务链 → 五维档案 → Timeline（低权重）→ 方法（折叠 disclosure）。
  Archive ID 降级为小号边注，不抢主视觉。
- **D-PHASE1E.3-A-023** — `/guardian/demo` 产品化：
  重命名为"建立一份人生档案"；标题为 h1；步骤标题始终可见；
  Step 1 标题："基础信息"；Step 2："确认人生阶段 · 唯一前进步骤"；
  Step 6："档案校对"；GuardianSeal 状态随步骤推进（outline → partial → complete）。
  Mobile（≤640）：进度始终可见"3 / 6 · 当前场景"不要求滚动 stepper。
- **D-PHASE1E.3-A-024** — GuardianSeal 组件（`components/guardian/GuardianSeal.tsx`）：
  现代档案身份标记；open square frame + stage marks + coordinate point + minimal structural lines + LELAN archive marker。
  三种状态：outline / partial / complete。
  主色：墨绿；朱砂仅用于 current dot（极局部）；禁止：gold glow / red glow / mystic light。
  装饰 SVG `aria-hidden` + `pointer-events-none`；文字内容为真实 HTML 供屏幕阅读器读取。

### Repo Safety

- **D-PHASE1E.3-A-025** — 本次 Phase 严格保持 `lelan-shouhu` 为 READ ONLY。
  未复制任何代码 / CSS / 组件 / API routes。未实现 monorepo / submodule / shared session。

---

## D-PHASE1E.3-B · Town Spatial Upgrade + AI Product Visualization + Visual Polish

### Visual System

- **D-PHASE1E.3-B-001** — 成果小镇升级为"东方数字城镇 / Spatial Product Interface"。
  Town 不再是 8 张服务卡的目录，而是一个有地面、道路、地块、建筑、标签、详情 6 个层级的共同空间。
  所有 8 个服务坐标 (`plot: {x, y}`) 锁定在 `content/town.ts`，双轴同步；调整需同时更新 plot 坐标和地面网格。

- **D-PHASE1E.3-B-002** — 复用 Phase A 已建立的 6 个 Graphic System 元素（Coordinate Line / Position Node / Archive ID / Guardian Square Seal / Archive Corner / Annotation Leader）。
  Town 与 AI 不引入新的视觉语言；新元素（如服务档案角注、过程追踪 step 数字）均来自现有元素家族。
  禁止：另起 Town 字体系统或 AI 图标族。

- **D-PHASE1E.3-B-003** — 继续使用 Phase A 5 层 Spatial Depth System（Depth 0–4）。
  Town 是 STRONG depth（最强），AI 是 MEDIUM depth。
  没有创建 DEPTH 7 / DEPTH 20 / z-index 9999 等混乱层级。

- **D-PHASE1E.3-B-004** — 全站空间节奏：Hero (flat) → Guardian (medium) → Town (strong) → AI (medium) → Technology/About (flat)。
  这是 Phase 1E.3-B 的核心验收指标之一。
  在 `globals.css` 中显式建立两个 transition helper：
  `.lelan-divider-coord-fade`（Guardian → Town 淡入）和 `.lelan-divider-paper-flat`（AI → Technology 平面分隔）。

### Town Implementation

- **D-PHASE1E.3-B-005** — 新增 `components/town/TownMapStage.tsx`：
  TownMapStage (L0–L4) + TownServiceDrawer (L4 详情)。
  5 个 layer 全部用 CSS / SVG / HTML 实现；零 Canvas、零 WebGL、零 3D 数学。

- **D-PHASE1E.3-B-006** — 地面实现：`.lelan-town-ground` 暖土色梯度 + `.lelan-town-grid` CSS 路面网格。
  桌面端 (≥768) 应用 `perspective: 1200px; perspective-origin: 50% 30%`（在 `@media (min-width: 768px)` 内）。
  移动端 (≤767) 完全禁用 perspective：layout 退化为 2D layered composition。

- **D-PHASE1E.3-B-007** — 建筑素材策略：
  严格使用 `visualAssets` registry 中已注册的素材（`townPaperTeahouse` + `townResearchShop`）。
  仅有 2 栋真实建筑时，只在对应 plot 渲染这 2 张图；其余 6 个 plot 显示 architectural placeholder（dashed footprint + "未来建筑位"标签）。
  禁止：把同一张建筑图复制到 8 个 plot / 用 CSS mask 假装抠图 / mix-blend-mode。

- **D-PHASE1E.3-B-008** — Hash 双向同步：
  `HomeTownClient` 在 `useEffect` 中监听 `hashchange` 并解析 `#shop-<id>`。
  selection 变化时用 `history.replaceState` 写回 hash；无效 hash 回落 `DEFAULT_SHOP_ID = paper-teahouse`。
  刷新：hash → selection 保持。键盘：原生 `<input type="radio">` group 支持 Tab + 方向键。

- **D-PHASE1E.3-B-009** — Town compact service index（左列）：
  8 个店铺的索引条目，使用编号 + 名称 + 通俗业务描述 + selected node。
  不是 8 张 cards。视觉比例约 20%；桌面端 `lg:w-48 xl:w-52`。

### AI Implementation

- **D-PHASE1E.3-B-010** — 新增 `components/ai/AiWorkflowPreview.tsx`：
  AiWorkflowPreview (L0–L4)。从 lelan-shouhu READ-ONLY 审计确认的实际能力出发，独立实现（未复制任何组件 / CSS）。
  视觉流程：INPUT DOCUMENT → MODE/PROCESS TRACE → RESULT DOCUMENT → WORD OUTPUT TOKENS。
  这是软件工作流而非营销步骤卡。

- **D-PHASE1E.3-B-011** — AI 模式名称仅使用 lelan-shouhu 实际存在的 3 档：
  轻度 / 中度 / 深度（`light_rewrite_word`, `medium_rewrite_word`, `deep_rewrite_word`）。
  未发明：Ultra / Expert / GPT Research / Auto Publish 等。

- **D-PHASE1E.3-B-012** — 7 份 Word 成品：
  内容模型 `HomeAiSection.wordOutputs` 完全镜像 `lelan-shouhu/src/lib/output-options.ts`：
  - 轻度降重后的Word
  - 中度降重后的Word
  - 深度降重后的Word
  - AIGC检测报告-Word标红版
  - AIGC特征分析摘要Word
  - 原Word降AIGC批注版
  - 降AIGC后的Word

  没有凭记忆新增任何文件类型；没有伪造准确率 / 通过率 / AIGC 降低率。

- **D-PHASE1E.3-B-013** — AI 视觉主体是文档页面（3 列：input / process / result），不是 feature cards。
  删除了 Phase A 的 `verifiedFeatures` 6-cell grid 和 `flowSteps` 4-card 流程卡；
  保留 `limits` 紧凑文本列表（输入格式 / 单次上限 / 登录要求 / 当前状态）。
  没有：聊天机器人 UI、AI orb、蓝紫 gradient、玻璃面板、neon、fake terminal、data dashboard。

- **D-PHASE1E.3-B-014** — AI CTA 保守文案：
  因 source-of-truth (`docs/PROJECT.md`) 尚未确认 public product URL，文案使用
  "了解乐懒 AI" / "体验入口整理中"；未把 Render URL / GitHub URL 包装为正式产品入口。

### Responsive Flatten

- **D-PHASE1E.3-B-015** — `.lelan-perspective` 加 `@media (min-width: 768px)` 守卫：
  mobile (≤767) 不应用 perspective；只保留 overlap / shadow / paper stack / position node。

- **D-PHASE1E.3-B-016** — AI 工作台在 768 不硬挤 3 列：
  桌面 (≥1024) `lg:grid-cols-12` 三列；平板 (≥640) `sm:grid-cols-2` 两列；
  mobile (≤639) 单列堆叠。
  Word output token grid：mobile 2 列，tablet 4 列，desktop 7 列。

### Card Reduction

- **D-PHASE1E.3-B-017** — 显式减少卡片堆叠：
  Town 不再是"8 cards + detail card + capability cards"。视觉主体是 TownMapStage。
  AI 不再是"6 cards + 4 cards"。视觉主体是 AiWorkflowPreview。
  保留少量 archive-style drawer / text list，但不再依赖 cards 表达。

### Motion + Accessibility

- **D-PHASE1E.3-B-018** — Motion：
  Town plot hover / selected：160–220ms translateY / box-shadow ease；
  AI stack item hover：180ms translateY；
  AI process pulse：2200ms 单 cycle（仅 `.lelan-ai-pulse[data-active="true"]` 触发）。
  所有动画受 `@media (prefers-reduced-motion: reduce)` 影响：hover 静止、pulse 不触发。
  禁用：bounce / large zoom / rotate / shake / continuous floating。

- **D-PHASE1E.3-B-019** — Accessibility：
  Town shop 选择器：真实 `<input type="radio">`，不是 `<div onClick>`。原生支持 Tab / 方向键。
  Selected state 不只靠颜色：checked 属性 + 加粗字体 + 左 border-l-2 + 绿色背景填充。
  AI 预览是静态 preview，明确标注 "产品界面示意" / "实际处理流程以独立产品体验版为准"，避免误导交互。
  所有装饰 SVG：`aria-hidden="true" pointer-events-none`。
  Shop 名称 / 编号 / 维度全部为真实 HTML。

### Repo Safety

- **D-PHASE1E.3-B-020** — 持续保持 `lelan-shouhu` 为 READ ONLY。
  Phase 1E.3-B 期间所有 AI 能力信息通过 `cd D:\Cursor-work\check-Projects\lelan-shouhu && git status`
  + 读源码确认（`src/lib/output-options.ts`、`src/app/process/page.tsx`），未复制 / 修改任何文件。
  提交前最终验证 `lelan-shouhu` working tree clean。

### Lint + Build

- **D-PHASE1E.3-B-021** — 修复 Phase A 留下的 `STATUS_LABEL_TO_TONE` lint warning：
  彻底删除（该变量未被任何组件引用），无任何对 GuardianProfile 的功能性改动。
  最终 lint：0 errors, 0 warnings.

- **D-PHASE1E.3-B-022** — production validation 全通过：
  `npm run lint` 0/0；`npx tsc --noEmit` 0 errors；`npm run build` 成功生成 8 个静态页。
  使用 `npx serve out -l 5000` 在生产静态构建上验证 hydration，无 hydration 错误。
  网络：所有 1st-party 资源 200/304；404 仅来自 RSC prefetch URL（next.js Link prefetch 在静态导出下
  不适用，与功能无关）。

### Documentation

- **D-PHASE1E.3-B-023** — 更新 `docs/DESIGN-SYSTEM.md` 新增 §9：Town Spatial System、
  AI Document Workspace、Section Transitions、Background System L3/L4、Future Asset Hooks。
- **D-PHASE1E.3-B-024** — 更新 `docs/DECISIONS.md`（本文件）记录本 Phase 24 项决策。
- **D-PHASE1E.3-B-025** — 更新 `docs/ROADMAP.md`：标记 Phase 1E.3-B 完成；
  Phase 1E.3 Visual V1 视为基本完成；下一步等待用户 + ChatGPT + Codex 进行 Visual V1 验收；
  Phase 1F (Dify / Adapter) 仍 gated，由用户确认后才进入。

### Phase 1E.3-C — Spatial Glass + Asset Deepening

- **D-PHASE1E.3-C-001** — Asset Visibility Audit：
  18 个 public 资产全部存在且 HTTP 200。0 TYPE A（render bug）。16 个 TYPE C（asset gap — 已声明但未在组件中引用）。
  Town buildings (02) 和 lelan-shouhu 对比通过 — P1 不正确 brand term "自然化改写" → "AIGC 改写" 已修复。

- **D-PHASE1E.3-C-002** — Frosted Archive Glass Material：
  新增 `--glass-*` CSS token 系统 + `.lelan-glass` / `.lelan-glass-soft` / `.lelan-glass-raised` 工具类。
  backdrop-filter blur 14px / jade-tinted border / inset highlight / soft shadow。
  fallback: `@supports not (backdrop-filter)` → solid rgba(248,248,240,0.94)。
  Mobile: blur 降至 8px。

- **D-PHASE1E.3-C-003** — Semantic Depth Layers Z0–Z5：
  新增 `--depth-z*` CSS token（Z0–Z5 映射到 translateZ 0–40px）。
  Z4 = Frosted Glass，Z5 = Label/Node/Annotation。

- **D-PHASE1E.3-C-004** — Town Section Upgrade：
  `.lelan-section-field-town` — 3 个 radial gradient 远景层（jade + earth warm）。
  远景 eave: `.lelan-town-fg-eave-left` / `.lelan-town-fg-eave-right` clip-path 遮挡。
  Plot 真实建筑：`lelan-town-building-frame` — paper mount + subtle inset border + glass reflection。
  Plot 未来位：`.lelan-plot-future` — 强化底纹深度。

- **D-PHASE1E.3-C-005** — Town Floating Glass Panel：
  Desktop (lg+): `TownServiceDrawer` 改为 `.lelan-glass-raised` + `absolute` 浮在 map 右上方。
  Mobile (<lg): drawer 出现在 map 下方，与 map 不重叠。
  两个 drawer 使用 Tailwind `lg:hidden` 控制显示/隐藏。

- **D-PHASE1E.3-C-006** — Guardian Glass Panel：
  新增 "当前坐标 · LIVE" frosted glass overlay 在 archive sheet 右上角。
  占用主视觉约 15–20%，含阶段名/场景/进度/待办数量。
  移动端不显示（`hidden sm:block`）。

- **D-PHASE1E.3-C-007** — AI Glass Process Surface：
  `ProcessTrace` 容器改为 `.lelan-glass-soft` — 数字流程控制面。
  Input / Result documents 保持 paper (`lelan-ai-page`)。
  整体 workspace 有 `lelan-perspective`（perspective 1200px）+ `lelan-section-field-ai` 暖光背景。

- **D-PHASE1E.3-C-008** — P1 fix — 自然化改写 branding：
  `content/home.ts` Hero CTA: "三档降重 / AIGC 分析 / 自然化改写" → "三档降重 / AIGC 改写"。

- **D-PHASE1E.3-C-009** — P0 fix — RSC prefetch 404：
  14 个跨页面 `<Link>` 添加 `prefetch={false}`（所有非 hash anchor 链接）。
  涉及：HomeHero、HomeGuardian、SiteHeader、SiteFooter、DemoAccountNav、LoginForm、Profile、GuardianDemoForm。
  静态导出不生成 subpage RSC prefetch 文件，`prefetch={false}` 防止浏览器请求。

- **D-PHASE1E.3-C-010** — Engineering validation：
  lint: 0 errors。
  tsc: 0 errors。
  build: 成功，静态导出 8 个页面。
  14 个 Link prefetch 补丁均无 TypeScript / lint 错误。

- **D-PHASE1E.3-C-011** — 禁止事项确认：
  未使用 Three.js / WebGL / Canvas 3D / GSAP / Framer Motion / 鼠标追踪 / card flip / 大角度 rotateX / scroll-jacking。
  Glass 偏 jade/ivory，不偏 cyan/electric blue/purple。
  无 generic glassmorphism SaaS — glass 仅用于信息浮层。

---

## D-PHASE1F · Guardian 智能分析接入 Dify（追加于 2026-09-12）

> 把已发布的 Dify Workflow 接入 Guardian。**未**改动部署架构、
> **未**重写 `/profile`、**未**重构无关代码、**未**修改 `lelan-shouhu`。

### 架构裁定

- **D-PHASE1F-001** — 官网保持**静态导出**（`output: "export"`）。
  **禁止**为了本功能把静态站改成 SSR / server Next.js。
  静态导出下 Route Handler 在生产不存在，因此 **`POST /api/guardian/analyze`
  不予实现**。
- **D-PHASE1F-002** — 采用**独立部署的 server-side Adapter 服务**：
  `Browser → 官网控制的 Adapter → Dify → normalize → GuardianAnalysisResult → UI`。
  浏览器**永不**直连 `api.dify.ai`。
- **D-PHASE1F-003** — Adapter 位于 `tools/guardian-adapter/`：Node 20+、
  **仅 Node 内置模块**（零运行时依赖，无 Express 等框架）。独立部署为 Node Web
  Service；**不得**塞进静态站托管。
- **D-PHASE1F-004** — Dify 只是 **analysis / explanation layer**，不是 source of
  truth。`age` / `stage` / `scenario` / `tasks` / `done-current-upcoming` /
  `progress_completed` / `progress_total` **继续由网站确定性逻辑负责**，
  Dify **不得**重算或覆盖。

### 环境变量与密钥

- **D-PHASE1F-005** — 服务端机密（**只**存在于 Adapter 部署环境）：
  `DIFY_API_KEY` / `DIFY_API_BASE_URL` / `PORT` / `ALLOWED_ORIGINS` /
  `DIFY_TIMEOUT_MS`。
- **D-PHASE1F-006** — 官网侧**唯一**公开变量：
  `NEXT_PUBLIC_GUARDIAN_ADAPTER_URL`。这是**地址**而非密钥。
  为空 ⇒ 分析功能关闭，官网**完全回退到原有行为**（不渲染、不报错、不发请求）。
  因其在构建时内联，更换 URL 需重新构建静态站。
- **D-PHASE1F-007** — **禁止** `DIFY_API_KEY` 出现在 React / Client Component /
  `public/` / 浏览器 JS / `NEXT_PUBLIC_*` / Git / 日志。
- **D-PHASE1F-008** — 新增 `.env.example`（仓库根 + Adapter 目录），只含变量名与
  非敏感默认值。原 `.gitignore` 的 `.env*` 会连示例文件一起忽略，因此新增例外
  `!.env.example` 与 `!**/.env.example`。真实 `.env` / `.env.local`
  **仍被忽略**（已实测确认）。

### 请求契约

- **D-PHASE1F-009** — 浏览器发送**结构化数据**（真实数组 + 真实 number），
  **不发送已 stringify 的 JSON 字符串**；由 Adapter 自己 `JSON.stringify`，
  避免客户端注入任意字符串。
- **D-PHASE1F-010** — Dify `inputs` 类型约束：`age` / `progress_completed` /
  `progress_total` 为 **number**；`gender` / `city` / `stage_id` / `stage_name` /
  `scenario_id` / `scenario_name` 为 **string**；六个 `*_json` 为 **string**；
  空数组必须序列化为 `"[]"`。
- **D-PHASE1F-011** — `response_mode: "blocking"`；`user` 使用稳定非敏感内部标识
  `lelan-guardian-web-demo`，**禁止**身份证号 / 手机号 / 真实姓名 / 邮箱等 PII。

### 校验（服务端）

- **D-PHASE1F-012** — 服务端强制校验：`age` 合理范围；`progress_total` 正整数；
  `progress_completed` 非负且 `<= progress_total`；`gender` 仅允许
  `male` / `female`；`stage.id` / `scenario.id` 必须为已知内部值；数组字段必须是
  array of string；并限制数组长度、单项长度、city 长度。异常 payload 一律
  400 `INVALID_INPUT`。
- **D-PHASE1F-013** — **`stage.name` 必须与 `stage.id` 一致**，Adapter
  **不接受**自相矛盾的 stage（防止 AI 层被告知与官网生命周期数据冲突的阶段名）。
  同时接受两种拼写：官网权威值（`guardianStages[].name`，**不含卦名**，如
  `"青年期"` / `"青少年期"`）与接入简报中的卦名前缀写法（如 `"兑 · 青年期"`）。
  ⚠ 首版曾误以为卦名前缀是权威值，导致所有 persona 被拒；已修正。

### 输出规范化

- **D-PHASE1F-014** — Dify 临时字段 `summary2` / `attention2_items` /
  `dimension_notes2` / `disclaimer2` **只存在于 integration layer**，
  规范化后**绝不泄漏到 React UI**（已实测断言）。
- **D-PHASE1F-015** — 规范化为**现有的** `GuardianAnalysisResult`
  （`content/guardian.ts`），**不创建 competing type**。实测 Dify 实际输出为
  snake_case（`description` / `action_label` / `source_type`），而现有 contract 为
  `explanation` / `actionLabel` / `sourceHint`，因此 normalize 同时接受两种拼写并
  映射到现有字段。
- **D-PHASE1F-016** — `dimension_notes2` **缺少任一维度 key 视为硬失败**（502），
  因为 UI 会渲染全部五个维度。

### 内容安全

- **D-PHASE1F-017** — normalize 拒绝含以下内容的结果：`risk_score`、
  高中低风险**分级**、疾病概率、确诊/诊断结果/治疗方案/用药建议、
  cohort statistics、裸百分比。五行仅作为**生活维度**（wealth 财富 / health 健康 /
  travel 出行 / food 饮食 / housing 安居），不作为因果或预测模型。
  ⚠ 首版规则使用裸 `高(风险|危)` 交替式，会误伤正当健康语句（如「不构成医学判断」
  中含「高危」二字），已改为锚定**风险术语**，并用 9 条用例验证
  （真实违规全部拒绝，正当健康文本全部接受）。

### 可靠性（实测）

- **D-PHASE1F-018** — 已发布的 Workflow **又慢又不稳定**：实测单次运行
  **5.2s–22.4s**，且观察到一次 `status: succeeded` 但 `summary2` **长度为 0**。
  因此 Adapter 采用**共享总预算 + 单次有界重试**：
  - `DIFY_TIMEOUT_MS` 是**跨尝试的总预算**（默认 40000），不是每次尝试的超时，
    避免最坏情况被乘倍
  - 仅当工作流「成功但输出为空」时重试一次；鉴权失败 / 传输失败 / 超时**不重试**
  - ⚠ 首版把 normalize 放在重试边界**之外**，导致「空输出」这一条件永远无法被
    重试逻辑看到；已把 normalize 移入重试边界内
- **D-PHASE1F-019** — 官网客户端超时（50s）**必须大于** Adapter 总预算（40s），
  这样 Adapter 的结构化超时错误会先返回，而不是被客户端 abort 成通用网络错误。
  实测 Adapter 超时返回 504 `ANALYSIS_TIMEOUT`。

### 错误契约

- **D-PHASE1F-020** — 错误码固定为：`INVALID_INPUT`(400) /
  `ANALYSIS_TIMEOUT`(504) / `ANALYSIS_UNAVAILABLE`(503) /
  `INVALID_ANALYSIS_RESPONSE`(502) / `SERVER_ERROR`(500)。浏览器**只**看到
  `{ error: { code, message } }` 两个字段。**禁止**返回 Dify 原始异常、原始响应、
  内部 stack、Authorization。
- **D-PHASE1F-021** — 服务端日志只记录：request id / 路由 / outcome / code /
  HTTP status / 耗时 / **脱敏后的输入摘要**（stage/scenario/age/gender + 计数）。
  **禁止**记录完整人生档案、`DIFY_API_KEY`、`Authorization`、完整 Dify 原始响应。

### 前端接入

- **D-PHASE1F-022** — **未重写 `/profile` UI**。`/profile` 的数据来源
  （generated profile → demo session → 空状态）**未改动**。
- **D-PHASE1F-023** — 新增**独立**的 `GuardianAnalysisPanel`，以一行挂载在现有
  「当前事项」与「五行档案」之间。分析功能未配置时**渲染 null**，此时 Profile 与
  改动前完全一致。
- **D-PHASE1F-024** — 状态机：`disabled` / `idle` / `loading` / `success` /
  `error`（超时与网络错误统一收敛为 `error`，UI 只显示一句安全文案 + 重试）。
- **D-PHASE1F-025** — **防重复请求**：以输入签名（age/gender/stage/scenario/
  tasks/tags/progress）去重；普通 rerender 或相同输入的重新挂载**不再请求**。
  实测确认整页仅 **1 次** `/guardian/analyze`。
- **D-PHASE1F-026** — `progress_completed` / `progress_total` **读取当前展示的
  `GuardianProfile`**（`tasks` 的 done 计数与总数），不由 AI 层重算，
  确保分析不会与屏幕上的档案自相矛盾。
- **D-PHASE1F-027** — 项目存在**两套 ID 命名空间**：固定 demo persona
  （`demo-m28` / `demo-f36`）与 step-form contract **不一致**。实测 `demo-f36`：
  `stage.name "青年期"`（非 `"兑 · 青年期"`）、`scenario.id "entrepreneurship"`
  （非 `"startup"`）、任务 id `t1..t8`（非 `startup-t1..t8`）。
  因此 `demoInputFromProfile()` 用官网权威表（`guardianStages` /
  `GUARDIAN_SCENARIOS`）把 persona id **翻译**成 contract id；任务以 **label 为
  join key** 映射；无法匹配的任务被丢弃而不是发送未知 id。persona 数据本身
  **未改动**。

### 验证

- **D-PHASE1F-028** — Adapter 离线测试 **56/56 通过**（对本地 fake Dify 跑真实
  HTTP 全链路）：含两个有效 persona、Dify 请求契约（workflow run / Bearer /
  blocking / 非 PII user / number 与 string 类型 / 空数组 → `"[]"`）、8 项校验失败、
  Dify 401/403/500、`status=failed`、outputs 缺失、非 JSON、超时 504、
  `summary2` 类型错误、`attention2_items` 畸形、`dimension_notes2` 缺 key、
  违禁语言、JSON 字符串输出兼容、空输出重试成功，以及 10 项泄漏断言
  （响应与日志中均无 key / Bearer / 上游错误 / 堆栈）。
- **D-PHASE1F-029** — **真实 Dify 联调通过**（非仅 mock）：Persona A
  （28 男 · 离 · 青少年 · 综合生活）与 Persona B（36 女 · 兑 · 青年期 · 创业）
  均返回 200 且内容合法。
- **D-PHASE1F-030** — 浏览器端实测：`/profile` 显示 loading → success，档案主体
  （archiveRef / Seal / 五行档案 / 当前事项 / 时间线）**完好**，**0** 次直连
  `api.dify.ai`，请求与页面文本中**均无** API Key，**无** Dify 字段泄漏，
  **无**风险语言，**0 console error**。无 session 时**不渲染分析区且不发请求**；
  `/`、`/login`、`/guardian/demo` 完全不受影响。
- **D-PHASE1F-031** — 构建产物中**无** API Key、**无** `api.dify.ai` 引用；
  静态导出 8 页构建成功，未因本功能破坏。

---

## D-PHASE1F.1 · Guardian Dify Integration Hardening（追加于 2026-09-12）

> 上线前加固轮。**不是重构**：未改 blocking 架构、未改 `/profile`、
> 未动 Town、未动 `lelan-shouhu`。

### Canonical 阶段命名（业务事实修正）

- **D-PHASE1F.1-001** — **修正 Phase 1F 的业务事实错误**：
  网站内简化的 `guardianStages[].name` **不是**最高业务事实来源。
  Guardian **canonical display name 是「卦名 · 阶段名」**：
  ```
  震 · 婴儿期 0–9    巽 · 少儿期 10–19   离 · 青少年 20–29   兑 · 青年期 30–39
  乾 · 壮年期 40–49   坎 · 中年期 50–59    艮 · 中老年期 60–69  坤 · 老年期 70+
  ```
  特别注意 `li-adolescent` 的业务名是 **「离 · 青少年」**，**不是**「青少年期」
  （也不是「青年期」/「成年早期」）。
- **D-PHASE1F.1-002** — **不创建第三套重复数据**。`guardianStages` 本就是唯一的
  stage 表（每个条目已含 `id` / `trigram` / `name`），因此**扩展它而不是另建表**：
  新增 **`displayName`** 字段承载 canonical 值，并保留 `name` 作为**不含卦名**的
  短名（供 Seal 等自行渲染卦名的场景使用）。
  经审计，此前存在 **3 处**命名表述：① `guardianStages[].name`（短名）
  ② demo persona 的 `stage.name`（另一份短名，且与 ① 不一致）
  ③ `guardianStages[].trigram` 与 ① 在渲染处拼成完整名。
  现统一为**一处** `displayName` 作为唯一 canonical 表述。
- **D-PHASE1F.1-003** — 新增最小 canonical mapper（与 `findStageById` 同处）：
  - `getGuardianStageDisplayName(stageId)` → canonical「卦名 · 阶段名」
  - `getGuardianStageShortName(stageId)` → 不含卦名的短名
  - `normalizeGuardianStageName(stageId, stageName)` → alias → canonical（无法识别返回
    `null`）
  - `GUARDIAN_STAGE_NAME_ALIASES` → 兼容映射表

  同一 `stage_id` 无论来自 **demo persona / generated profile / step form /
  Dify request / profile 渲染**，最终 canonical displayName **一致**。
- **D-PHASE1F.1-004** — 同步修正 persona 数据里的短名，使
  `guardianStages[].name` 与 persona `stage.name` 不再互相矛盾
  （`li-adolescent` 由「青少年期」→「青少年」）。

### 兼容别名

- **D-PHASE1F.1-005** — 继续接受历史拼写：
  `青少年期`、`离 · 青少年期`、`离 · 青少年`、`青年期`、`兑 · 青年期` …
  但这些**只是 input alias**，内部一律 normalize 成 canonical：
  `li-adolescent` → `离 · 青少年`；`dui-young-adult` → `兑 · 青年期`。
  **Dify 收到的是 canonical 值；UI 显示阶段全名时也用 canonical 值。**
- **D-PHASE1F.1-006** — **别名按 stage id 限定作用域**：`青年期` 对
  `dui-young-adult` 合法，对 `li-adolescent` **一律拒绝**（400）。
  `stage.id` 是权威，别名不可能把一个阶段的名字安到另一个阶段上。
  凭空拼写的名字（如「成年早期」）同样拒绝。

### CORS / 来源加固

- **D-PHASE1F.1-007** — **生产环境 `ALLOWED_ORIGINS` 强制**：
  `NODE_ENV=production` 且 `ALLOWED_ORIGINS` 缺失或为空时，
  Adapter **启动失败**（exit 1）并输出**不含任何 secret** 的配置错误说明。
  理由：无 allow-list 就没有安全默认值 —— 允许任意来源或回显任意 Origin
  等于让任何网站用我们的 Dify 凭据驱动该服务。拒绝启动是唯一诚实的选项。
  开发环境（非 production）仍允许不配置，便于本地调试。
- **D-PHASE1F.1-008** — **不再回显任意 Origin、不再有 `*` 通配**。
  `Access-Control-Allow-Origin` **只**对 allow-list 内的 Origin 返回；
  非白名单来源**不获得任何** `Access-Control-*` 头（浏览器因此拦下响应），
  并在服务端直接以 403 + 安全错误形状拒绝。
- **D-PHASE1F.1-009** — 允许面收窄到最小：
  methods **仅** `POST, GET, OPTIONS`（GET 仅 `/health`）；
  headers **仅** `Content-Type`；`Max-Age` 600。
  `OPTIONS` 仅对**已登记路由 + 白名单 Origin** 返回 204，其余 403。
  无 Origin 头的请求（curl / 服务间调用 / 健康检查）放行 —— CORS 的作用是阻止
  **其他网站**，而浏览器必然携带 Origin。

### Dify caller id

- **D-PHASE1F.1-010** — **不再让所有请求永久共用**一个常量 user。
  新增 `getDifyUserId(profile)`：以网站自身的不透明内部 id 生成
  `guardian-${internalId}`（如 `guardian-demo-m28` / `guardian-demo-f36`）。
  Dify 以 `user` 分组 run，共用常量会把所有访客合并成同一个身份。
- **D-PHASE1F.1-011** — **PII 防护是结构性的**：内部 id 必须匹配
  `^[a-z0-9_-]{1,48}$` 且至少含一个字母，否则回退到常量 `guardian-web-demo`。
  该模式在结构上无法承载姓名（无中日韩字符）、邮箱（无 `@`）、
  手机号或身份证号（无全数字串）。服务端同样再校验一次，双重防护。
- **D-PHASE1F.1-012** — `getDifyUserId` 已抽成独立函数，为将来账号系统预留：
  届时内部 id 换成账号的不透明 id 即可，回退分支自然不再触发。

### 超时与预算（记录，不改架构）

- **D-PHASE1F.1-013** — 保留 server-side timeout / retry 设计不变。当前预算：
  - **server 总预算** `DIFY_TIMEOUT_MS` = **40000 ms**（**跨尝试共享**，非每次）
  - **retry 预算** = 最多 **2 次尝试**（仅当「成功但输出为空」时重试一次），
    共享同一 40 s 预算 ⇒ **最坏 40 s**
  - **client 超时** = **50000 ms**（必须 **>** server 总预算，
    这样 Adapter 的结构化超时错误先返回，而不是被浏览器 abort 成通用网络错误）
  - **本阶段未提高 client 超时**。
- **D-PHASE1F.1-014** — 已在 docs 标记：**Workflow 单次运行 > 20 s 属于
  Dify 侧的 optimization issue**，不应通过继续放大客户端超时来掩盖。
  实测该 Workflow 单次耗时 5.2 s–22.4 s。

### 验证

- **D-PHASE1F.1-015** — Adapter 离线测试 **67/67 通过**（较 Phase 1F 的 56 项新增
  11 项），新增覆盖：Persona A `stage_name === "离 · 青少年"`、
  Persona B `stage_name === "兑 · 青年期"`、两者各自携带 per-profile caller id、
  legacy `青少年期` → `离 · 青少年`、legacy `青年期` → `兑 · 青年期`、
  **跨阶段别名被拒**、**凭空阶段名被拒**、**PII 形状 caller id 不被转发**。
- **D-PHASE1F.1-016** — **CORS / 启动加固专项 14/14 通过**：白名单 Origin 精确回显、
  methods/headers 最小化、非白名单 preflight 403 且**无** ACAO、
  非白名单 POST 403 且**无** ACAO、无 Origin 放行、**无 `*` 通配**、
  启动日志无 secret、未登记路由 404；并以隔离副本实测
  **production 缺 ALLOWED_ORIGINS 时启动失败（exit 1）**。
- **D-PHASE1F.1-017** — **真实 Dify 联调通过**：Persona A 与 Persona B 均 200，
  且 Adapter 日志确认线上请求携带的 `stage_name` 分别为
  **`离 · 青少年`** 与 **`兑 · 青年期`**（canonical）。
- **D-PHASE1F.1-018** — 浏览器端实测：`/profile` 收到并展示
  「兑 · 青年期」；实测浏览器发出的 payload 为
  `stage.name = "兑 · 青年期"` 且 `user = "guardian-demo-f36"`；
  档案主体完好、**1** 次请求、**0** 次直连 `api.dify.ai`、无 Key、无 Dify 字段泄漏、
  无风险语言、0 console error。
- **D-PHASE1F.1-019** — `demo-m28` 与 `demo-f36` 的档案页阶段渲染分别为
  「离 · 青少年」与「兑 · 青年期」，**未出现卦名重复**。
- **D-PHASE1F.1-020** — 安全检索：`git grep` 全仓库**不存在**真实
  `app-xxxxxxxx` 形式的 Dify key（唯一匹配是 `.env.example` 里的占位说明
  `# 形如 app-xxxxxxxxxxxxxxxx`，不是密钥）；已跟踪的 `.env` 类文件**仅有**
  `.env.example`；构建产物中无 key 模式。
