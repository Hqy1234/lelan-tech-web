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