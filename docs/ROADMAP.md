# LELAN TECHNOLOGY · Roadmap

> 单文件说明：阶段划分、阶段目标、阶段产物。
> 每个阶段有明确的"开始 / 结束 / 下一阶段"。

---

## 当前进度

- **当前阶段**：Phase 1E.3-A — Engineering Hardening + Guardian Visual System + Hero/Guardian/Profile Redesign
- **下一阶段**：Phase 1E.3-B — Town Spatial Upgrade + AI Product Visualization + 2.5D Spatial Refinement
- **说明**：Phase 1E.3-A 完成工程硬化（Guardian Demo P0 bypass 修复、年龄验证、导航修复、Adapter 验证强化）、全站基础 Graphic System + Spatial Depth、Hero 重构（两大系统 + 软件产品）、Guardian Homepage 重构（档案坐标平面）、Five Elements 连续档案带、Profile 重构（个人档案首页）、Demo 产品化、Header/Footer 分组修正、Technology 文案诚实化。Town 大改 + AI 大改 + Dify 留待 Phase 1E.3-B。

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

## Phase 1C · Homepage Town V1.5 + Approval Fixes（已完成）

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

## Phase 2 · Guardian Life Coordinate System（已完成）

- Guardian 首页升级为"乐懒守护符·人生坐标"主视觉
- 八阶段生命周期纵轴（八卦·八阶段）与 Y-axis lifecycle rail
- 坐标化闯关横轴（当前阶段任务链）+ progress 指示
- 五行生活维度 teaser（5 元素紧凑入口 + 建筑缩略图）
- 科学方法论降级为底层说明
- Client island `GuardianArchive` 管理选择状态
- 八阶段 + 五行 + 女娲共 14 个 Guardian WebP derivative 生成
- data model: `content/guardian.ts`（stages / elements / methodology）
- 文档更新：PROJECT / DESIGN-SYSTEM / DECISIONS / ROADMAP

## Phase 1D-G2 · Guardian Demo Login + Personal Life Archive（已完成）

- `/login` 演示登录页：m123/12345（28岁男性）+ n123/12345（36岁女性）
- 快速填充按钮 + 手动登录表单 + aria-live 错误提示
- `lib/demo.ts` sessionStorage 工具（demoLogin / demoLogout / getDemoProfile）
- `DemoAccountNav` client island：Header 右上角"登录"/"我的档案"切换
- `/profile` 个人档案页：GuardianProfile contract 渲染
- `GuardianProfileView`：8阶段坐标 + 任务链 + 五行 dashboard + 档案时间线
- `GuardianProfile` contract：identity / stage / tasks / elements / timeline / methodSteps
- 两个 Demo Persona 数据完整写入 `content/guardian.ts`（m123: 离·青少年 / n123: 兑·青年期）
- HomeGuardian 新增"登录查看模拟人生档案"CTA
- 页面底部 demo disclaimer
- 文档更新：PROJECT / DESIGN-SYSTEM / DECISIONS / ROADMAP

## Phase 1E · Guardian Demo Contract Freeze + /guardian/demo Frontend + Local Mock Adapter（已完成）

- **Contract 冻结（三层）**：
  - `GuardianDemoInput`：age / gender / city / stage.id / scenario.id / completedTaskIds / selectedDimensionTags
  - `GuardianAnalysisResult`：summary / attentionItems / dimensionNotes / disclaimer（future Dify output）
  - `GuardianProfile`：冻结现有 contract，保持与 `/profile` UI 兼容
- **Type definitions** in `content/guardian.ts`：`GuardianStageId`（8个稳定ID）/ `GuardianScenarioId`（5个V1场景）/ `GuardianDimensionTagId`（18个标签）
- **Deterministic logic 明确分离**：age→stage mapping / task state algorithm（done→current→upcoming）/ progress calculation — 由前端/adapter 负责
- **未来 AI/Dify 职责**：summary / attention items / dimension notes — 不由 LLM 决定确定性事实
- **`lib/guardian/mock-adapter.ts`**：Local mock adapter，接口 `createGuardianDemoProfile(input: unknown) → GuardianProfile | GuardianDemoError`
  - 输入 validation：age 0–120 / gender male/female / stage existence / age-stage consistency
  - STAGE_MISMATCH error：返回 expectedStage，不 silent correct
  - Task state algorithm：用户勾选 done → adapter 计算 current/upcoming
  - Mock analysis：基于 tag 生成简单 notices（不使用 riskScore / diseaseDiagnosis 等禁止术语）
  - Deterministic archiveRef：`LELAN-DEMO-GEN-{age}-{M/F}-{year}`
- **`/guardian/demo` 路由**（`app/guardian/demo/page.tsx`）：
  - 产品演示，不建立真实医疗档案，页面顶部 disclaimer
  - 6步表单（Client Component island）：
    - Step 1 基础信息：年龄（0–120）/ 性别（男/女）/ 城市（可选）
    - Step 2 人生阶段：根据年龄自动建议阶段，显示8阶段 rail，需用户点击确认
    - Step 3 当前场景：5选1（综合生活 / 学习职业 / 创业 / 健康记录 / 财富事项）
    - Step 4 生活维度：5维度多选，每维度 2–4 个 tag（共18个稳定ID）
    - Step 5 当前事项：基于 stage+scenario 显示任务列表，用户勾选已完成
    - Step 6 确认：汇总展示 + disclaimer + 生成按钮
  - `field`/`legend` 语义 / `label` 绑定 / `role=alert` 错误 / `fieldset` 分组 / keyboard 导航
  - 移动端 375px 单列布局
- **sessionStorage 分离**：
  - `lelan_generated_guardian_profile`：/guardian/demo 生成的档案
  - `lelan_demo_session`：m123/n123 登录 session
  - 两者独立，互不覆盖
- **`/profile` 数据来源优先级**：
  - 优先级1：`lelan_generated_guardian_profile`（generated profile）
  - 优先级2：`lelan_demo_session`（demo account persona）
  - 优先级3：空状态 + CTA
- **来源标签**：`/profile` 顶部区分"本次 Demo 档案"（绿色标签）和"模拟账号档案"（灰色标签）
- **登录优先级冲突**：用户登录 m123/n123 时，清除 `lelan_generated_guardian_profile`（明确选择模拟账号）
- **Homepage Guardian CTA**：新增"体验人生档案 Demo" → `/guardian/demo`（绿色高亮）
- **`/login` CTA**：新增"想自己建立一份演示档案？体验建档 Demo →"
- **`/profile` CTA**：新增"重新体验建档 Demo →"
- **无 Dify / 无 API key**：所有逻辑本地 deterministic，无网络调用
- **静态导出兼容**：`output: "export"` 保持，`/guardian/demo` 静态生成
- 文档更新：PROJECT / DESIGN-SYSTEM / DECISIONS / ROADMAP

## Phase 1D-G3 · Guardian-first Homepage + LeLan AI Integration（已完成）

- Homepage section 重排：Hero → 乐懒守护 → 成果小镇 → LeLan AI → Technology → About
- HomeArchitecture section 移除（`HomeArchitecture.tsx` 删除）
- `content/home.ts` 全面重构：移除 `HomeArchitectureSection`，新增 `HomeGuardianSection`，`HomeAiSection` 增加 `verifiedFeatures` 和 `flowSteps`
- Header nav 重排：首页 / 乐懒守护 / 成果小镇 / 乐懒 AI / 关于（`#ai`）
- Hero 重构：三产品 pillar cards（乐懒守护 / 成果小镇 / 乐懒 AI）
- `HomeGuardian` 接受 `section` prop，使用 `content/home.ts` 的 `section.number` 作为 eyebrow
- `HomeAi` 文案基于 `lelan-shouhu` read-only audit：确认 7 个真实 Word 成品 / 3 档降重 / AIGC 分析 / 降 AIGC 自然化 / DeepSeek-v4-Flash / 无需登录
- LeLan AI 状态由"Beta 即将开放"升级为"体验版可用"
- 无确认公开 URL → 不使用硬编码外链（正确报告）
- lelan-shouhu read-only audit：确认 Deploy on Render / `lelan-shouhu` service name / 无生产域名确认
- 文档更新：PROJECT / DESIGN-SYSTEM / DECISIONS / ROADMAP

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