# LELAN TECHNOLOGY · Roadmap

> 单文件说明：阶段划分、阶段目标、阶段产物。
> 每个阶段有明确的"开始 / 结束 / 下一阶段"。

---

## 当前进度

- **当前阶段**：Phase 0.7 — Project Alignment + Scaffold Cleanup + Git Sync
- **下一阶段**：Phase 0.8 — Foundation Verification / Baseline Commit
- **说明**：Phase 0.7 完成 docs 建档 + 默认 scaffold 清理 + 本分支基线 commit；
  Phase 0.8 在 0.7 基础上进行构建链验证与最小可发布静态产物封板。

---

## Phase 0 · Engineering Foundation

**目标**：建立可被未来所有 Phase 信任的工程底座。

- Phase 0.1 — 仓库初始化 + Next.js 16 App Router + Tailwind v4 + 静态导出
- Phase 0.2 — 设计 token（warm white / ink / restrained green / 印章红赭石）
- Phase 0.3 — `content/site.ts` / `lib/seo.ts` / `sitemap.ts` / `robots.ts`
- Phase 0.4 — ESLint / TS strict / 构建链绿
- Phase 0.5 — 单 Light Editorial 主题、可访问性基线
- Phase 0.6 — `AGENTS.md` / `CLAUDE.md` 工程规则文件
- **Phase 0.7 — Project Source of Truth 文档 + Scaffold 清理 + Git 基线（当前）**
- Phase 0.8 — Foundation Verification / Baseline Commit（下一阶段）
- Phase 0.9 — 静态导出产物封板 / 域名占位 / 回滚预案

## Phase 1 · Brand System + Content Model

- Logo wordmark 最终化
- 字体方案确认（CJK + Latin）
- 设计 token 与排版系统定稿
- 内容模型（Products / Shops / Guardian Steps / Stages）
- 站点信息常量最终化（域名 / 邮箱 / 联系信息）

## Phase 2 · Homepage

- 首页信息架构与排版节律
- 三业务总览（AI / Town / Guardian）
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

- 四步法首页表达
- 五行 × 八阶段详细页
- 风险地图 / 队列建模示意（编辑设计，非炫技）
- 保持 MVP 定位，不展开临床 / 科研合规表述

## Phase 6 · Character / Building Visual Assets

- PPT 视觉素材整理与资产化
- 统一 art direction：光影、色板、笔触、人物比例
- 透明 WebP/AVIF 资产输出
- 与产品 / 文档三方对齐

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