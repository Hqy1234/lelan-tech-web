# LELAN TECHNOLOGY · Roadmap

> 单文件说明：阶段划分、阶段目标、阶段产物。
> 每个阶段有明确的"开始 / 结束 / 下一阶段"。

---

## 当前进度

- **当前阶段**：Phase 1E.4-B1 — Town Globe Composition Fixes（已完成）
- **下一阶段**：Phase 1E.4-C — Town Art Production / Polish（**尚未开始**）
- **说明**：Phase 1E.4-B1 完成（Phase 1E.4-B Final Audit 的 PASS WITH FIXES 小修轮）。
  建筑统一放大 **1.25×**（只放大建筑，globe/terrain/roads 不变；放大前已核算碰撞，
  最近一对 19.0° vs 需要 8.35°，余量 10.6°）；stage 改为 `min(54vh, 500px)`、
  相机 `[0, 1.13, 3.85]` + `lookAt y=0.02`，实测模型填充画布高度 65% → **83%**，
  1440×900 下**完整沙盘不再被 fold 裁切**；cap 加宽至 **130°** 使轮廓更扁平；
  drawer 修复 header 贴挤（archive ID → **18px** → 店铺名）并与 stage **等高**
  （486 = 486），消除右下方空置；proxy 屋顶柔和化（更矮更宽）；
  01/02 仅调立面比例，未重做素材。
  **重要发现（已实测四种方案）**：当前相机仰角下，任何可见宽底座都会在沙盘中部横切出
  一条浅色带，因此底座保持不可见承托脚，**正式宽底座移交 Art Pass**。
  favicon 仍缺失，记为 known limitation。
  lint/tsc/build 全通过；1440/1024/768/375 无横向溢出；0 broken image；
  0 JS error / 0 exception / 0 404；初始 JS 646,414 bytes（与 1E.4-B 一致，
  **首屏无回归**）；three chunk 仍为懒加载。本轮**未**进入 Dify，
  **未**修改 `lelan-shouhu`，**未**改 selection / hash / fallback architecture。

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

## Phase 1E.4-B · Interactive Town Globe Prototype（已完成）

**目标**：把成果小镇从 2D / 2.5D flat map 升级为**可拖动旋转的东方微缩数字城镇沙盘球体**。

- **技术路线**：`three` + `@react-three/fiber`（React Three Fiber 优先）
  - **不采用** `@react-three/drei`：自写纹理加载 + 自写 world→NDC 标签投影即可，
    drei 会把大量额外代码并入 three chunk
  - **禁止** globe.gl / react-globe.gl / three-globe / cobe
  - **禁止** postprocessing / HDR environment / 复杂 shader / 高面数模型 / 物理引擎
- **Scene 结构**：程序化低浮雕**球冠** + 平面 rim disc（沙盘底座）+ 5 条大圆弧道路
  + 8 个 shop node + 1 个 HTML 标签；仅 AmbientLight + 2 × DirectionalLight；
  无实时阴影（极淡 painted contact disc）
- **不是地球**：无大陆 / 国界 / 经纬 / 卫星图 / 物流弧线 / 轨道线 / 星野 / 星系 /
  行星环 / 太空背景；材质限 warm ivory / muted jade / earth beige / ink green + 极少量 cinnabar
- **相机**：PerspectiveCamera FOV 34，略高于赤道面；**旋转世界而非环绕相机**；
  pitch clamp −0.40 … 0.62
- **交互**：drag 旋转（threshold 5px）、click 建筑选择、index → rotate-to
  （700ms ease-out）、**wheel 不劫持页面滚动**、**无自动旋转**
- **8 铺子全部存在**，不因缺美术而减少：
  - 01 / 02 → architectural display panel（现有非透明 WebP，诚实呈现为微缩立面展板）
  - 03–08 → 统一低浮雕 proxy pavilion（明确读作「待建形态」，非空灰盒）
  - **禁止**复制同一张建筑图 / 换色伪装
- **能力门（capability gate）**：feature detect first, heuristic second, fallback safe
  - **≥1024px 才挂载 WebGL**；768–1023 与 ≤767 使用 2D fallback
  - WebGL 不可用 / context lost / reduced-motion / 低功耗 → 2D fallback
  - 低功耗判定**只接受正向证据**（`undefined` 不判为弱设备）
  - **门控使用 viewport 宽度，不是组件容器宽度**
- **懒加载**：`IntersectionObserver`（rootMargin 300px）+ `dynamic({ssr:false})`
  → three 不进静态导出 HTML / 首屏 bundle（实测 907KB raw / 233KB gzip）
- **性能**：`frameloop="demand"` 空闲 0 渲染帧；`dpr={[1, 1.5]}`；基础 antialias
- **无障碍**：Canvas `aria-hidden` + `role="presentation"`，不 trap focus；
  业务入口恒为 HTML（8 铺子语义索引 + 抽屉 + `aria-live` 播报）
- **URL**：保留既有 hash，同时支持 `#shop-01`…`#shop-08` 与 `#shop-paper-teahouse`；
  写回仍用 slug → 旧 deep link 不破坏
- **seam 冻结**：`HomeTownClient` 独占状态；`TownGlobe` / `TownMapStage` 为纯渲染器；
  `content/town.ts` 唯一真相源（新增 `globe` 字段，`plot` 保留给 2D fallback）；
  `TownBuildingVisual` 为**唯一**未来资产替换点
- **QA**：lint 0 / tsc 0 / build 8 页；1440/1024/768/375 无横向溢出；
  0 broken image；**0 JS error / 0 exception / 0 404**；交互经实测验证
  （拖拽 yaw 变化、rotate-to 精确落点、pitch 精确 clamp、globe→index/hash/drawer 同步、
  wheel 不劫持页面）

## Phase 1E.4-B1 · Town Globe Composition Fixes（已完成）

Phase 1E.4-B Final Audit（verdict: PASS WITH FIXES）的小修轮。
**未**改动 R3F architecture / selection state / hash model / fallback architecture。

- **建筑尺度**：统一 **1.25×**（唯一 `scale` wrapper，plinth / 体块 / 飞檐 / 屋顶 /
  立面 / marker / hit target 一起缩放）。**只放大建筑**，globe / terrain / roads 不变。
  放大前核算碰撞：1.25× 需 8.35°，实际最近一对 19.0°，余量 10.6° →
  **无 overlap / 无 label 碰撞 / 无 hit area 碰撞**
- **取景**：stage `min(54vh, 500px)`（移动端 400 / tablet 440，下限 400）；
  相机 `[0, 1.13, 3.85]`，`lookAt` y = 0.02（组合体真实垂直中心）。
  实测模型填充画布高度 **65% → 83%**；1440×900 画布底 865 < 900 →
  **完整沙盘 + 底座不再被 fold 裁切**。1024 画布 536×486，不拥挤
- **Sand-table 轮廓**：cap 加宽至 **130°**（rim y = −0.643），更扁、更少 planet 感
- **展示底座（重要约束）**：实测四种方案后确认，**当前相机仰角下任何可见宽底座都会
  在沙盘中部横切出一条浅色带**（水平圆盘前缘的屏幕投影随半径下移所致）。
  因此底座保持**不可见承托脚**（0.83× / 0.78× rim，高 0.1），由 contact shadow 接地。
  **正式宽底座移交 Art Pass** —— 届时须连同地形与相机仰角一起重新设计
- **Drawer**：archive ID 回到正常文档流首行 + **固定 18px** 呼吸空间 + 店铺名
  （实测 gap = 18px；**禁用** `mt-auto` 弹性间距，会把 header 与正文拉开约 50px）；
  drawer 与 stage **等高**（486 = 486），消除右下方空置；未填充无意义文字
- **Proxy 屋顶柔和化**：高度 0.022–0.030（原 0.030–0.042），底面半径 0.94w（原 0.80w），
  飞檐 1.42w（原 1.34w）
- **01/02**：仅调整立面比例（面板相对纸框收窄约 10%），**未重做素材**、**未假抠图**；
  风格统一留 Art Pass
- **未做**：terrain 完整 art pass（避免拖慢本轮）；hash 行为未改；
  favicon 仍缺失 → known limitation（不临时绘制低质量图标）
- **性能不变量全部保持**：lazy load / `frameloop="demand"`（空闲 0 rAF）/
  `dpr max 1.5` / no drei / no postprocessing / no shadows / no auto rotation /
  no wheel zoom。初始 JS **646,414 bytes**（与 1E.4-B 一致 → **首屏无回归**）；
  three chunk 仍未被 `index.html` 引用
- **回归**：drag / click / rotate-to（8 铺子）/ index / drawer / hash / keyboard /
  aria-live / reduced-motion / context-loss / 375 / 768 全部通过；
  四断点无横向溢出；0 broken image；0 JS error / 0 exception / 0 404

## Phase 1E.4-C · Town Art Production / Polish（下一阶段 · 尚未开始）


**前置条件**：本轮完成后，Town Globe 的**渲染器与交互已就绪**，瓶颈转为**美术资产**。

- **必须补齐 6 栋缺失建筑**：专利小铺 / 软著小铺 / 申报辅导 / 成果转化 /
  产学研对接 / AI 工具坊 —— reference PNG 已存在（2364×1773），
  但**没有 delivery WebP**；需先派生，或直接制作 globe-ready 资产
- **需要一套 globe-ready 建筑资产**：现有 reference 是**带背景的方形构图 PNG**，
  不是抠图资产，无法直接用于球体。需：
  - 透明背景 WebP/AVIF，或低模 3D / 2.5D sprite
  - **统一光影方向与色板**（否则 8 栋会像来自不同世界）
  - 保持 `public/images/` 原路径文件名，以便零代码替换
- **可选地形升级**：单一高分辨率东方风地形贴图（equirect 或球冠 UV），
  或简单 heightfield；**不得**使用真实卫星图
- **替换点唯一**：只改 `components/town/globe/TownBuildingVisual.tsx`，
  **不得**改动 selection / rotation / camera / hash / fallback / drawer
- **版权前置**：全部 30 张 reference 需完成版权 / 授权复核（D-ASSET-007/008）；
  女娲仍 **BLOCKED**
- **不进入 Dify**：Phase 1F（Dify / Adapter）仍 gated by user confirmation

## Phase 1E.4-A · Visual De-noising + Guardian Subject Restoration + AI Simplification（已完成）

**问题诊断**：不是"设计不够多"，而是"结构语言过多、视觉主体过少"。
Phase 1E.3-B/C 连续两轮只做加法（glass、Z0–Z5、section field、飞檐、负偏移、
错位堆叠），却未删除任何东西，导致 Guardian / Town / AI 三个连续 section
都自称"最深"。

- **P0 布局缺陷修复**
  - 1440 横向 overflow 168px 的两个根因均修 root cause
    （`ai-glass-center` 绝对定位下百分比 margin 解析为包含块宽度；
    `town-drawer-float` 负 `right/top`）；未使用 `overflow-x: hidden` 掩盖
  - 实测 1440 / 1024 / 768 / 375：`document.scrollWidth === viewport width`
  - AI section overflow = 0（此前 168px）
- **Guardian 主体恢复（选择性，不 revert 1ded190）**
  - 恢复 ONE LARGE STAGE SUBJECT：1 张大图跟随 stage 切换，默认 04 兑·青年期
  - 恢复 5 张五行视觉资产，形态为连续档案带（非 5 张大卡、非 30–40px 缩略条）
  - **不恢复** 8 张 40–56px 阶段缩略图（Phase 1E.3-A 的噪声判定不变）
  - **女娲保持 BLOCKED**（水印/版权未清，不显示/不裁切/不遮/不去水印/不重绘）
  - 保留：GuardianSeal / Y轴八阶段 / X轴事项链 / GuardianProfile contract /
    method strip / 人生坐标逻辑
  - 当前坐标读数 3 处 → 1 处；移除 4 层 overlay 堆叠与所有负偏移
- **素材 metadata 修正**：五行 `600×600`→`600×450`；女娲 `400×400`→`400×533`
- **AI 重构为 Quiet Document Workspace**
  - 阅读顺序 01 输入 → 02 处理 → 03 结果 → Word 成品；无重叠、无负 margin、
    无 translateZ、无 perspective
  - 7 份 Word 成品保留真实名称，改为 compact rail（桌面 4 列）
  - 新增"相关检测与分析结果仅供参考，不代表第三方检测结论。"
  - 文案统一为"AIGC 分析与降 AIGC"；高度 1440 由 1603px → 1157px
- **Glass 由 5 降至 2**（仅 Guardian LIVE + Town 服务面板；AI/Hero/Tech/About = 0）
- **Town 仅降噪**：删除前景飞檐 wedge、去除重复 coord-fade、移除浮动抽屉负偏移；
  **冻结 renderer seam**（`HomeTownClient` 持状态 / `TownMapStage` 纯渲染器 /
  `content/town.ts` 唯一真相源），供下一轮 `TownGlobe` 替换
- **Section 编号**修复为连续 `00–05`（业务顺序不变）
- **首页节奏**：Hero CALM → Guardian EMOTIONAL → Town SPATIAL（收敛）→
  AI QUIET → Technology/About CALM
- **QA**：lint 0/0、tsc 0、build 8 页成功、无 broken image、无 console error、
  无 4xx、document 级无横向滚动（1440/1024/768/375）
- **本轮明确未做**：Town Globe 未实现；three.js / @react-three/fiber / drei 未安装；
  Dify 未进入；`lelan-shouhu` 未修改

> **注**：原「Phase 1E.4-B · Town Globe Prototype（下一阶段 · 尚未开始）」条目
> 已由上文 **Phase 1E.4-B · Interactive Town Globe Prototype（已完成）** 取代。
> 差异记录：drei **最终未采用**（自写纹理与标签投影），且 3D 资产并非本阶段的
> 阻塞项 —— renderer / 交互先落地，**美术资产生产移交 Phase 1E.4-C**。

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