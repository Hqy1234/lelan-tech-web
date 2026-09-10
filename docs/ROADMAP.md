# LELAN TECHNOLOGY · Roadmap

> 单文件说明：阶段划分、阶段目标、阶段产物。
> 每个阶段有明确的"开始 / 结束 / 下一阶段"。

---

## 当前进度

- **当前阶段**：Phase 1C — Homepage Town V1.5 + Approval Corrections
- **下一阶段**：Phase 1C → Phase 1D（细节打磨）/ Phase 2（品牌系统）待确认
- **说明**：Phase 1B 在 `feat/homepage` 上完成首页响应式基线；Phase 1C 完成小镇 V1.5 架构（index + selected stage）+ 审批问题修复 + 文案校正。

---

## Phase 0 · Engineering Foundation

**目标**：建立可被未来所有 Phase 信任的工程底座。

- Phase 0.1 — 仓库初始化 + Next.js 16 App Router + Tailwind v4 + 静态导出
- Phase 0.2 — 设计 token（warm white / ink / restrained green / 印章红赭石）
- Phase 0.3 — `content/site.ts` / `lib/seo.ts` / `sitemap.ts` / `robots.ts`
- Phase 0.4 — ESLint / TS strict / 构建链绿
- Phase 0.5 — 单 Light Editorial 主题、可访问性基线
- Phase 0.6 — `AGENTS.md` / `CLAUDE.md` 工程规则文件
- **Phase 0.7 — Project Source of Truth 文档 + Scaffold 清理 + Git 基线（已完成）**
- **Phase 0.8 — Foundation Verification / Baseline Commit（已完成）**
- **Phase 0.9 — 静态导出产物封板 / 域名占位 / 回滚预案（已完成）**

## Phase 1A · Homepage Preparation Patch（当前）

- 原 reference 视觉资产从 `public/images/` 迁至 `assets/reference/`，**不**对外暴露浏览器 URL
- `public/images/` 仅含实际进入 UI 的 derivatives（Phase 1A 仅 2 张 WebP representative）
- 内容模型：`content/assets.ts` / `content/town.ts` / `content/home.ts`
- SEO 修复：移除 `robots.ts` placeholder domain；区分"路由可用"与"搜索引擎索引"；预览期 `noindex` 但允许爬取
- **不**实现首页 UI

## Phase 1B · Homepage Implementation（已完成）

- 基于 `content/home.ts` 的首页结构渲染
- Hero / Architecture / AI / Town / Guardian / Technology / About 六段编辑型版式
- 在 bounded image frame 中使用 representative WebP derivatives
- 移动端不依赖 hover 的等效可达性

## Phase 1C · Homepage Town V1.5 + Approval Fixes（当前）

- Town V1.5 架构：8-service index + selected-shop stage（radio-group 交互）
- Town Client Component island（仅用于选择状态 + URL hash 同步）
- 第二套建筑/角色视觉对（02 课题小铺 + 灵枢子）derivative WebP 生成
- Hero 关系图替代 Editorial Mark；中文身份优先层级
- Beta journey 修复：移除"申请 Beta"CTA，改为"Beta 即将开放"
- 修正 unsupported 能力措辞（可追溯 / 最小数据 / 风险预警）
- Architecture 去除多余卡片边框；Guardian 四步连续进程感
- Technology dt/dd 语义修正；微文字可读性提升
- Mobile Header 可达性 + Sticky header anchor offset 修复
- Header / Footer Beta 与导航对齐；About section 卡片去除

## Phase 1 · Brand System + Content Model

- Logo wordmark 最终化
- 字体方案确认（CJK + Latin）
- 设计 token 与排版系统定稿
- 内容模型（Products / Shops / Guardian Steps / Stages）
- 站点信息常量最终化（域名 / 邮箱 / 联系信息）

## Phase 2 · Homepage

- 首页信息架构与排版节律
- 两大系统（Town / Guardian）+ 一项软件产品能力（AI）的层级表达
- **不**把 AI 描述为与 Town / Guardian 并列的"第三个业务"
- Beta CTA 文案与转化路径
- 编辑设计 hero / numbered sections / thin rules
- 不含 3D、不含重动画

## Phase 3 · Town Spatial Experience

- 成果小镇桌面端 V1（image + CSS）
- 8 铺子入口 + 6 能力维度
- 移动端信息面板（不依赖 hover）
- V2 路径：layered pseudo-3D（CSS perspective + parallax）
- V3 路径：real WebGL 3D（**非 MVP**，后续阶段）

## Phase 4 · LeLan AI

- AI 独立 mock 截图
- 标注"产品界面示意，实际界面以体验版为准"
- 体验版入口：外链 / 子域占位
- 严禁引入 `lelan-shouhu` 源码

## Phase 5 · Guardian

- 四步法首页表达（人生档案 → 队列建模 → 横断面校准 → 风险预警）
- 五行 × 八阶段作为分类 / 记忆助记符仅在 `/guardian` 详细页展开
- **学科 / 产品语义先于文化符号**：五行 / 八阶段**不**作为科学因果机制，**不**作为风险打分输入
- 风险地图 / 队列建模示意（编辑设计，非炫技）
- 保持 MVP 定位，不展开临床 / 科研合规表述
- 未来首个 MVP 可能聚焦饮食 / 营养等日常生活维度（**当前未实现**）

## Phase 6 · Character / Building Visual Assets

- `assets/reference/` 内的资产审核与升级为正式 2.5D art direction
- 透明 WebP/AVIF 资产输出（从 reference → delivery 流程化）
- 与产品 / 文档三方对齐
- 版权 / 授权复核优先于上线

### Phase 6A · Asset Delivery Boundary（执行规则）

- reference 资源仅位于 `assets/reference/`，**不**进入 `public/`
- delivery 资源位于 `public/images/`，仅含 UI 实际引用的 derivatives
- 组件层通过 `content/assets.ts` 的 `id` 引用资产，**不**直接硬编码路径
- `reference` 字段保留工程溯源信息，但浏览器不可见

## Phase 7 · Interaction / Responsive / Motion

- 桌面 / 平板 / 移动端响应式
- 微动效：节律化 reveal、hover elevation、tooltip
- 焦点态、键盘可达性
- Reduced Motion 适配

## Phase 8 · QA / SEO / Performance / Deployment

- Lighthouse ≥ 90（目标 95+）
- SEO 100
- axe critical = 0
- 静态导出构建稳定
- 部署：域名 / DNS / HTTPS / 缓存策略

---

## 关键策略声明

### Town 3D 策略

- **V1 优先**：image + CSS
- **V2 次优**：layered pseudo-3D
- **V3 后置**：real WebGL 3D（**非 MVP 依赖**）
- 第一阶段**不**引入 Three.js / React Three Fiber / 重 WebGL

### 内容真实性策略

- 不展示 fake metrics
- 不展示伪市场验证
- 不伪造 Beta 提交成功反馈

### 工程真实性策略

- 所有未确认的域名 / 邮箱保持为空字符串，引用处使用 fallback
- 任何新增配置必须先经 ChatGPT 确认，再由 Cursor 实施

---

## 阶段切换原则

- 任一阶段若依赖未确认的资产 / 文案 / 域名，**不得**进入下一阶段。
- 任一阶段若 axe / Lighthouse / SEO 未达标，**不得**进入下一阶段。
- 任一阶段若与 `docs/DECISIONS.md` 冲突，**不得**进入下一阶段。