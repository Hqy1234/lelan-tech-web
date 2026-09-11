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
