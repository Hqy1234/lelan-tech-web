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