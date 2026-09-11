# LELAN TECHNOLOGY · Design System

> 单文件说明：视觉方向、气质、禁制、品牌视觉资产策略。
> 视觉系统的唯一来源（Source of Truth）。

---

## 1. 设计方向

**"东方数字城镇 × 现代科技产品"**

### 1.1 基础气质

- 高级
- 安静
- 东方
- 现代
- 科研
- 可信
- 克制
- 精确

### 1.2 基础页面视觉（已落地）

- warm white / paper 底色
- dark ink typography（编辑设计字感）
- restrained green（企业色，沉稳，非荧光）
- tiny cinnabar / ochre accent（印章感，克制使用）
- editorial typography
- numbered sections
- thin rules
- large intentional whitespace
- strong information hierarchy

设计 token 已实现于 `app/globals.css`：
`--color-paper / --color-ink / --color-muted / --color-rule / --color-green* / --color-cinnabar / --color-ochre`。

---

## 2. 禁制清单（强制）

以下视觉语言**禁止**出现在乐懒官网任何页面：

- 紫蓝 AI 渐变
- glassmorphism
- AI brain 视觉
- glowing orb
- neural-network cliché
- 过度 card grid
- 三张完全相同的 feature cards
- 巨型居中 SaaS hero
- 过度 rounded corners
- 过度阴影
- emoji 图标
- 假数据 / fake metrics
- 无意义动画
- 通用 AI illustration 占位
- gaming-style overloaded interface

---

## 3. 品牌视觉资产策略

### 3.1 客户期望引入的视觉素材

客户希望 PPT 中以下元素能够进入官网视觉体系：

- 建筑
- 店铺
- 人物角色
- 东方叙事形象

### 3.2 重要约束

- **不得**直接无整理地把 PPT 图片贴到网页。
- 必须经过统一 art direction 后重新整理或正式生成。
- 未来需要正式视觉资产（透明 WebP/AVIF、统一光影、统一色板）。

### 3.3 成果小镇视觉概念

> **"业务入口本身就是空间。"**

- 建筑 = 服务入口
- 人物 = 服务人格
- 店铺 = 业务分类
- 小镇 = 乐懒科技科研服务生态

### 3.4 桌面端未来形态

- 2.5D architecture
- 透明 WebP/AVIF 资产
- CSS perspective
- 微妙 parallax
- hover elevation
- tooltip / information panel

### 3.5 移动端约束（强制）

- 移动端**不得依赖 hover**。
- 点击建筑后必须出现清晰的信息面板或进入对应内容。
- 所有视觉入口必须保留真实 HTML navigation / semantic links。
- **不得**将核心导航完全放入 Canvas / WebGL 中。

### 3.6 阶段化策略

- V1（当前）：semantic HTML + CSS + static imagery + light motion；
  **不依赖** Three.js / React Three Fiber / 重 WebGL。
- V2（后续）：layered pseudo-3D（CSS perspective + parallax）。
- V3（后续，**非 MVP**）：real WebGL 3D。

### 3.7 当前 placeholder 资产策略（过渡期）

`public/images/` 内的现有素材为客户 PPT / 素材库的 placeholder / reference assets，
**不是最终视觉定稿**。

- **当前阶段目标**：使用现有素材把官网结构与交互做出来。
- **最终阶段目标**：升级为统一的 2.5D Oriental Visual System。
- **替换原则**：正式重绘时**优先保持现有 `public/images/` 路径与文件名**。
- **Town 语义**：`buildings/` = 服务入口；`characters/` = 未来 Agent 人格 / 界面入口。
- **Guardian 语义**：`overview/` 守护官；`elements/` 五行；`stages/` 八阶段；`characters/` 文化守护使（当前未导入）。
- **版权前置**：PPT / 客户素材即使已复制进入 `public/`，**不得**自动视为最终可公开商用素材；发布前必须做版权 / 授权复核。
- **含水印 / 来源不明素材**：必须重新确认或替换。
- **未锁定关系素材**（如 Guardian 神兽中的"毕方"坎 / 艮两阶段重复）暂不进入 active asset set。
- **规格不匹配素材**（如 528×701 鬼谷子、1024×1024 伊尹）不作为 placeholder 导入。

更详细的决策条目见 `docs/DECISIONS.md` 的 `D-ASSET-*` 系列。

---

## 4. Guardian 视觉语言（与小镇分离）

成果小镇 = **东方数字建筑世界**。
乐懒守护 = **东方生命档案系统**。

Guardian **不是**"小镇 + 角色"的另一版小镇。
其专属语义锚点：

- archive（档案）
- lifecycle（生命周期）
- coordinates（坐标 / 时间轴）
- research system（科研系统）

**Phase 2 更新（2026-09-10）**：
Guardian 首页已升级为**乐懒守护符·人生坐标系统**：
- 八阶段（八卦）作为生命周期纵轴 Y
- 当前阶段任务链作为横轴 X
- 五行生活维度 teaser
- 科学方法论降级为底层说明

**八卦/五行是信息组织和品牌记忆语言**，不是玄学预测依据。
科学逻辑负责可信；东方文化系统负责记忆。

**Guardian ≠ Town**：Town = 空间/建筑/服务世界；Guardian = 档案/坐标/生命周期。
**当前 NOT active**：
- 八大神兽（毕方关系未锁定）
- 鬼谷子（分辨率不足）
- 伊尹人物（分辨率不足）

### Guardian 个人主页（/profile）设计原则

- 主体像"人生档案产品"，**不是**企业后台 Dashboard
- 禁止：侧边栏企业后台 / 20个 KPI card / 饼图 / 柱状图 / 销售 Dashboard / 数据大屏
- 推荐：档案感 / 坐标轨道 / 任务链 / 五维状态标签 / 档案时间线 / 文档感
- 五行状态词汇：已记录 / 持续关注 / 当前事项 / 待完善
- 禁止：low/medium/high risk 等风险分级词汇
- 所有内容须明确标注"模拟演示数据"

### Homepage 产品叙事节奏

- 区块视觉节奏：Guardian ★★★★★ / Town ★★★★ / AI ★★★ / Technology ★★ / About ★
- 三大产品（Guardian / Town / AI）第一眼区别明显：档案感 vs 空间感 vs 软件工作流感
- 不要让所有 section 等高或等权重；Guardian 可获更多垂直空间
- 继续东方数字系统 × 现代科技产品 × 编辑式官网视觉语言

---

## 5. 排版与节奏（已落地原则）

- 中英文混排，注意 CJK font fallback。
- `font-serif` 用于标题与品牌字感。
- `font-mono` 用于编号 / 元数据 / 技术性标签。
- 数字与英文使用 `tracking-[0.2em]` 类排版节律。
- 段落级留白优先于边框、阴影、卡片化。

---

## 6. 可访问性 / 性能（强制）

- WCAG 2.2 AA
- Lighthouse Performance ≥ 90，目标 95+
- SEO 100
- axe critical = 0
- 单 Light Editorial 主题，不提供 theme toggle
- 图片未优化（`images.unoptimized: true`），但需选择合适格式与尺寸

---

## 7. 与工程实现的对应

| 设计约束 | 工程落地位置 |
| --- | --- |
| 色彩 / 字体 token | `app/globals.css` |
| 内容常量 | `content/site.ts` |
| Metadata / OG | `lib/seo.ts` |
| 路由清单 | `content/site.ts` → `publicRoutes` |
| 静态导出 | `next.config.ts` |

---

## 8. Phase 1E.3-A — 视觉系统升级（追加于 2026-09-11）

### 8.1 全站 Graphic System（6 元素）

Phase 1E.3-A 在 `app/globals.css` 建立 6 元素全站 Visual Grammar：

| 编号 | 元素 | 用途 | 工程实现 |
|---|---|---|---|
| 1 | Coordinate Line（坐标线） | 视觉结构、Y轴/X轴暗示 | `.lelan-line-coordinate` |
| 2 | Position Node（位置节点） | lifecycle rail、task chain 节点 | `.lelan-node` / `.lelan-node-current` / `.lelan-node-done` |
| 3 | Archive ID（档案编号） | 固定 micro 格式 | `.lelan-archive-id` |
| 4 | Guardian Square Seal（方形守护印） | 档案身份标记 | `components/guardian/GuardianSeal.tsx` |
| 5 | Archive Corner（档案边角） | 档案封面四角落 | `.lelan-corner` |
| 6 | Annotation Leader（边注引线） | 微型注释 | `.lelan-annotation` |

### 8.2 Spatial Depth System

`app/globals.css` 中的 CSS 变量和 utility class：

| Layer | 用途 | CSS token | class |
|---|---|---|---|
| Depth 0 | 背景 | — | — |
| Depth 1 | Coordinate / Ground Plane | `--depth-1-translate` | `.lelan-depth-1` |
| Depth 2 | Main Surface（archive sheet） | `--depth-2-translate` | `.lelan-depth-2` |
| Depth 3 | Primary Object（GuardianSeal） | `--depth-3-translate` | `.lelan-depth-3` |
| Depth 4 | Annotation | `--depth-4-translate` | `.lelan-depth-4` |

- Mobile（≤640px）：所有 perspective/translateZ 禁用（`.lelan-flat-mobile`）
- Desktop（≥641px）：CSS `perspective` + `translateZ()`
- 仅用于 archive sheet / GuardianSeal / coordinate canvas；普通按钮 / 文字 / 列表不使用 depth
- Contact shadow：`--depth-1-shadow` 至 `--depth-4-shadow`（`.lelan-contact-shadow-1` 至 `.lelan-contact-shadow-4`）

### 8.3 Background System

| Layer | 用途 | CSS class |
|---|---|---|
| L0 | Editorial base（Hero / Technology / About） | `.lelan-bg-l0` |
| L1 | Paper / Archive（Demo / Profile） | `.lelan-bg-l1` |
| L1-soft | Archive soft variant | `.lelan-bg-l1-soft` |
| L2 | Coordinate canvas | `.lelan-bg-coordinate`（graph-paper 背景） |

### 8.4 GuardianSeal

`components/guardian/GuardianSeal.tsx`：

- 不是传统红印章 / 玄学护符 / 八卦罗盘
- 现代档案身份标记：open square frame + stage marks + coordinate point + minimal lines + LELAN archive marker
- 三种状态：outline / partial / complete
- 主色：墨绿；朱砂极局部（current dot）
- 禁止：gold glow / red glow / mystic light / 完整八卦盘

### 8.5 Five Elements Archive Band

- Desktop（≥640）：单行 5 列，细竖线分隔
- Mobile（<640）：5 行堆叠（不再横向挤压）
- 每项：element badge + dimension name + status label + notice text
- 禁止：五行球 / 五宝石 / 五神兽 / 五行转盘 / 相生相克箭头

### 8.6 Guardian Homepage Coordinate Plane

- Layer 0：淡 Guardian background field（可选）
- Layer 1：coordinate plane（graph-paper 背景）
- Layer 2：archive sheet（轻 translateZ，1–2° rotateX/Y，桌面）
- Layer 3：GuardianSeal（压 archive 边缘）
- Layer 4：small annotations

### 8.7 Responsive Flatten Strategy

- 375px：禁用所有 perspective / rotateX / rotateY
- 保留：layer overlap / contact shadow / paper hierarchy / foreground/background
- 三栏 Guardian → 垂直堆叠（mobile）

### 8.8 Typography Scale（Phase 1E.3-A）

| 层级 | 尺寸 | 用途 |
|---|---|---|
| Display | 60px / 40px mobile | Hero 标题 |
| H2 | 44px / 32px mobile | Section heading |
| H3 | 26px | Subsection |
| Body | 17px | 正文 |
| Label | 14px | 标签 |
| Archive ID | 13px | 档案编号 |
| Micro | 12px | 注释（最低） |

---

## 9. Phase 1E.3-B · Town Spatial + AI Document Workspace + Section Transitions

### 9.1 Town Spatial System（东方数字城镇）

**Goal** — 让"成果小镇"第一眼像一个共同空间里的镇，而不是 8 个 SaaS cards。

**5-Layer Spatial Composition** (`components/town/TownMapStage.tsx`)：

| Layer | 含义 | 实现 |
|---|---|---|
| L0 | Background Terrain | CSS radial-gradient + faint architectural horizon (warm jade highlight) |
| L1 | Ground Plane | `.lelan-town-ground` warm earth gradient + `.lelan-town-grid` SVG road grid |
| L2 | Building / Plot | Absolutely-positioned HTML plot div, sized by shop.plot (normalized 0–100) |
| L3 | Labels / Markers | Shop number + name + dimension badge inside each plot |
| L4 | Selected Detail | `TownServiceDrawer` — service archive sheet on right column |

**8 Shops** — coordinates locked in `content/town.ts`:
- West → East axis (research flow): 03 → 01 → 02 → 04 → 06 → 08
- North → South axis (research / funding / transformation)

**Roads** (L1 SVG, 4 line types, all CSS color values):
- 1 main east-west road at y=50
- 1 main north-south road at x=50
- 1 secondary lower east-west road at y=75 (dashed)
- 8 short connector segments from each plot to the nearest road (dashed, 0.3px stroke)

**Existing buildings** — only 2 delivery assets exist (`townPaperTeahouse`, `townResearchShop`).
The map shows them as real building images. The remaining 6 plots render as **architectural
placeholder** (dashed footprint + "未来建筑位" label). Never fake or duplicate real buildings.

**Perspective** (Desktop ≥768):
- Container: `perspective: 1200px; perspective-origin: 50% 30%`
- Ground plane: `.lelan-town-ground` (no rotateX — depth comes from perspective only)
- Plots stay upright (independent transform layer)
- Hover / selected: translateY(-2px to -3px), 200ms ease, no bounce

**Mobile ≤767** — all `perspective` disabled (`@media (min-width: 768px)` guard on
`.lelan-perspective`). Layout becomes vertical 2D layered composition.

### 9.2 Town Hash Sync + Keyboard

- Selection state lives in `HomeTownClient` (Client Component, one island).
- URL hash bidirectional:
  - selection → `window.history.replaceState(null, "", "#shop-<id>")`
  - hash → selection on `useEffect` + `hashchange` listener
- Invalid hash → fallback to `DEFAULT_SHOP_ID` (`paper-teahouse`).
- Keyboard support: native `<input type="radio">` group — Tab navigates, Arrow keys move selection.

### 9.3 AI Document Workspace（真实文档软件工作台）

**Goal** — 让"乐懒 AI"第一眼像一个已经存在的软件，而不是 AI 营销页。

**5-Layer Spatial Composition** (`components/ai/AiWorkflowPreview.tsx`)：

| Layer | 含义 | 实现 |
|---|---|---|
| L0 | Workspace Background | `.lelan-bg-l4-ai` warm tool surface |
| L1 | Input Document | `DocumentPage` with `demo-paper.docx` caption + 4 sample lines |
| L2 | Process Trace | Vertical timeline: input detection → feature selection → intensity → AI processing → output |
| L3 | Result Document | `DocumentPage` showing AIGC analysis excerpt with one highlighted line |
| L4 | Word Output Tokens | 7 file tokens in 2-row grid, grouped by `rewrite` / `aigc` |

**Three-column desktop layout** (≥1024px, `lg:grid-cols-12`):
- Column 1: `lg:col-span-4` — Input Document
- Column 2: `lg:col-span-4` — Process Trace
- Column 3: `lg:col-span-4` — Result Document

**Tablet 768–1023**: 2 columns (`sm:grid-cols-2`). Spec: AI cannot 3-column at 768.
**Mobile ≤640**: single column stacked.

**Perspective** (AI): 0–1° tilt on document pages (negligible). Spatial depth comes from
`overlap`, `offset`, `paper stack shadow`, `translateY(-2px)` hover on file tokens.

### 9.4 AI Capability Source-of-Truth

All verified names + outputs come from `content/home.ts` → `HomeAiSection.wordOutputs`,
which mirrors the literal IDs from `lelan-shouhu/src/lib/output-options.ts`:

| Output ID (repo) | Display Name |
|---|---|
| `light_rewrite_word` | 轻度降重后的Word |
| `medium_rewrite_word` | 中度降重后的Word |
| `deep_rewrite_word` | 深度降重后的Word |
| `aigc_report_word` | AIGC检测报告-Word标红版 |
| `aigc_analysis_summary_word` | AIGC特征分析摘要Word |
| `original_word_aigc_annotation` | 原Word降AIGC批注版 |
| `deai_word` | 降AIGC后的Word |

**Forbidden in AI copy** — accuracy numbers, fake metrics, automatic submission claims,
journal acceptance guarantees, AIGC detection evasion guarantees.

### 9.5 Section Transitions（FLAT → DEPTH → STRONG DEPTH → DEPTH → FLAT）

**Visual rhythm across homepage sections**:

```
Hero           (flat editorial — L0 base)
  ↓
Guardian       (medium depth — coordinate plane L1, GuardianSeal L3)
  ↓ .lelan-divider-coord-fade (fade left → right)
Town           (STRONG depth — perspective ground L1, plots L2–3, drawer L4)
  ↓ paper baseline fade
AI             (medium depth — document workspace L0–4)
  ↓ .lelan-divider-paper-flat (flat hairline)
Technology     (flat editorial)
  ↓
About          (flat editorial)
```

**Transition helpers** (in `globals.css`):
- `.lelan-divider-coord-fade` — picks up Guardian's coordinate cross and fades into Town ground
- `.lelan-divider-paper-flat` — AI → Technology flat hairline divider

### 9.6 Background System (Phase 1E.3-B added)

| Level | Section | Color |
|---|---|---|
| L0 | Base Editorial | `var(--color-paper)` warm beige |
| L1 | Paper / Archive | `var(--color-paper-pure)` |
| L2 | Guardian Coordinate | `.lelan-bg-coordinate` graph-paper |
| L3 | **Town Spatial** (NEW) | `.lelan-bg-l3-town` warm jade + horizon highlight |
| L4 | **AI Workspace** (NEW) | `.lelan-bg-l4-ai` clean warm document white |

### 9.7 Future Asset Hooks (decoupled)

- Town: when transparent building PNGs arrive, swap into the `PlotView` real-building
  branch (`hasBuildingAsset === true`). No need to rewrite `TownMapStage` roads/plots.
- AI: when real product screenshots arrive, swap into `DocumentPage` for `Result Document`
  (L3). The 7 Word output tokens (L4) remain token-based.

### 9.8 Frosted Archive Glass Material (Phase 1E.3-C added)

玉质档案玻璃 — 数字信息层（不是通用 glassmorphism SaaS）

| Token | Value | Usage |
|---|---|---|
| `--glass-bg` | `rgba(248,248,240,0.62)` | Default glass surface |
| `--glass-bg-soft` | `rgba(248,248,240,0.52)` | Softer glass overlay |
| `--glass-bg-raised` | `rgba(248,248,240,0.74)` | Raised / selected glass |
| `--glass-blur` | `14px` | Default backdrop-filter |
| `--glass-border` | `rgba(50,75,62,0.12)` | Jade-tinted border |
| `--glass-shadow` | light inset + soft drop | Contact shadow |

Classes: `.lelan-glass`, `.lelan-glass-soft`, `.lelan-glass-raised`, `.lelan-glass-darktext`

Fallback: `@supports not (backdrop-filter)` → solid `rgba(248,248,240,0.94)` — readable without blur.

**Only use glass for:**
- Guardian current-coordinate live info panel (top-right of archive sheet, ~15–30% of main visual)
- Town selected service floating panel (overlaps map on desktop)
- AI process trace control surface (between input/result papers)

**Never use glass for:** buttons, footer, technology section, about section, every card.

Mobile: blur reduced to 8px, ≤2 simultaneous blur surfaces.

### 9.9 Semantic Depth Layers Z0–Z5 (Phase 1E.3-C added)

| Z | Name | Implementation |
|---|---|---|
| Z0 | Editorial Background | Hero, Technology, About, Footer |
| Z1 | Spatial Field | Section rear planes via `.lelan-section-field` |
| Z2 | Ground / Coordinate | Town ground, Guardian coordinate canvas |
| Z3 | Primary Object | Buildings, paper sheets, GuardianSeal |
| Z4 | Frosted Glass | Current-info panel, service panel, process trace |
| Z5 | Label / Node | Shop numbers, archive IDs, stage annotations |

Implementation: semantic translateZ CSS variables, not literal z-index stacking.

### 9.10 Spatial Archive Interface (Phase 1E.3-C added)

Section depth planes via `.lelan-section-field`:
- `.lelan-section-field-guardian` — coordinate continuation + warm jade overlay
- `.lelan-section-field-town` — atmospheric depth (3 radial gradients)
- `.lelan-section-field-ai` — document workspace warm glow

Foreground transition via `.lelan-section-foreground::after`:
- Subtle bottom edge line, not a full card tilt

Town 3-plane depth:
- Background: far silhouette (CSS radial gradients, no images)
- Midground: ground plane with perspective 1200px + rotateX 3deg
- Foreground: corner eaves via `.lelan-town-fg-eave-left` / `.lelan-town-fg-eave-right` + clip-path

Paper vs Glass semantics:
- **Paper** = stable, persistent, archive (GuardianSeal, Town buildings, AI documents)
- **Glass** = live, digital, floating (current coordinate, selected service, process controls)
- Both hooks live as separate component branches — no layout rewrite required.

---

## 10. Phase 1E.4-A — Visual De-noising + Guardian Subject Restoration + AI Simplification

> 本轮主题：**停止继续叠加视觉系统。**
> 问题不是"设计不够多"，而是"结构语言过多、视觉主体过少"。
> 原则：**留白 > 边框 / 主体 > 系统线 / 对象 > 注释。**

### 10.1 首页最终视觉节奏

| Section | 角色 | 材质预算 |
|---|---|---|
| Hero | 品牌入口 · CALM | paper，0 glass |
| **Guardian** | **情绪与叙事高潮 · 东方生命档案** | paper + **1** glass（LIVE 坐标） |
| Town | 空间预览 · 本轮收敛（下轮升级为最强空间高潮） | paper + **1** glass（服务面板） |
| AI | 最安静 · 真实软件证明 | paper only，**0 glass** |
| Technology | 呼吸区 · CALM | paper，0 glass |
| About | 呼吸区 · CALM | paper，0 glass |

**强制**：不允许 Guardian / Town / AI 连续三个 section 都成为视觉高潮。

### 10.2 Glass 预算（硬规则）

首页 **最多 2 个** glass surface：

1. Guardian `当前坐标 · LIVE` 面板
2. Town 选中服务档案面板（`TownServiceDrawer`）

**禁止 glass**：AI / Hero / Technology / About / 按钮 / footer / 卡片网格 /
文档页 / document workspace。

`ProcessTrace` 已由 glass 改为 neutral paper panel（`.ai-process-panel`）。
`.ai-glass-bg` / `.ai-glass-center` 已删除。

### 10.3 Guardian Subject Restoration（选择性恢复）

**恢复**：

- **ONE LARGE STAGE SUBJECT** — `GuardianArchive` 左栏单张大图，
  默认 `stage-04-dui-young-adult`（兑·青年期 30–39），切换 stage 时跟随切换。
  比例 **5:4**（`.lelan-stage-subject-media`）；交付文件为 800×800。
- **5 张五行视觉资产** — 连续档案带 `.lelan-element-plate`（**4:3**，与 600×450
  交付文件一致，不裁切不拉伸）。Desktop 5 列 / Tablet 3 列 / Mobile 2 列。
  实测 plate ≈189×142（desktop）/ ≈133×100（mobile）。

**不恢复**：

- ❌ 8 张 40–56px 阶段小缩略图（Phase 1E.3-A 判定为视觉噪声，结论不变）
- ❌ 女娲 / Nuwa ——⛔ **BLOCKED pending copyright clearance**
  （水印未清；禁止显示 / 裁切 / 遮水印 / 去水印 / 重绘 / AI 修复）
- ❌ full-bleed stage backgrounds

### 10.4 Guardian 组合（一展开档案，两栏，零重叠）

```
┌────────────────────────────┬──────────────────────────────┐
│ CURRENT LIFE STAGE VISUAL  │ stage identity + GuardianSeal │
│  (1 张大图，跟随 stage)      │ Y axis 八阶段 rail            │
│                            │ X axis 当前事项链             │
└────────────────────────────┴──────────────────────────────┘
        ↓ 五行生活维度 · 连续档案带（5 张真实图）
        ↓ 坐标背后的方法（科学层 · 沉默声明）
```

**禁止**：负偏移覆盖层（`left:-12px` 悬垂印章 / `right:0` 玻璃压住展板）、
Glass on Glass、每个状态都 Glass、同一坐标重复出现。
**当前坐标只允许一处权威呈现。**

### 10.5 AI Quiet Document Workspace

阅读顺序（不得重叠）：

```
[ 01 输入文档 ]  →  [ 02 处理过程 ]  →  [ 03 结果文档 ]
        ↓
[ Word 成品 · 7 份 compact rail ]
```

- Desktop ≥1024：`lg:grid-cols-12`，4 / 4 / 4
- Tablet ≥640：单列堆叠（处理过程不再横向挤压）
- Mobile <640：单列堆叠
- Word rail：Desktop 4 列 / Tablet 2 列 / Mobile 2 列
- **禁止**：中央巨大浮动 Glass、负 margin、文档互相覆盖、
  process panel 遮挡 result、translateZ 炫技、`lelan-perspective`
- 必需免责声明："相关检测与分析结果仅供参考，不代表第三方检测结论。"

### 10.6 横向 Overflow 规则（工程硬约束）

- 判定标准是 **document 级** `document.documentElement.scrollWidth`
  `=== viewport width`；**不得**用 `body { overflow-x: hidden }` 掩盖。
- **禁止**以负 `margin` / 负 `left` / 负 `right` 制造"深度"或"溢出感"。
  特别注意：**绝对定位元素的百分比 margin 以包含块宽度解析**，
  `left:25%; right:25%` + `margin:-8%` 会产生 116% 宽度。
- **允许** `overflow-x-auto` 内部滚动容器（如 Guardian 八阶段 rail，
  见 D-PHASE2-023）。其子节点超出 viewport 属设计行为，不构成 page-level 溢出。

### 10.7 Section 编号

连续编号 `00–05`，不得出现断层。

### 10.8 Town — 本轮只降噪（seam 冻结）

- 删除：前景飞檐 wedge（`.lelan-town-fg-eave-*`，45%×18% clip-path 深色渐变）、
  连续两次的 `.lelan-divider-coord-fade`、浮动抽屉负偏移
- **冻结 renderer seam**（供下一轮 `TownGlobe` 替换）：
  - `HomeTownClient` 独占 `selectedId` + hash 同步
  - `TownMapStage` 纯渲染器：`{ shops, selectedId, stageLabel? }`
  - `content/town.ts` 唯一真相源（8 铺子 + `plot {x, y}`）
- 不塞人物图填空；8 shops 结构不得因素材缺失而删减

### 10.9 资产尺寸声明

`content/assets.ts` 的 `width` / `height` **必须**等于真实交付文件尺寸：

| 资产组 | 参考 PNG | 交付 WebP | 声明 |
|---|---|---|---|
| guardian/stages | 2048×2048 | 800×800 | 800×800 |
| guardian/elements | 2364×1773 | 600×450 | **600×450** |
| guardian/overview (女娲) | 1773×2364 | 400×533 | **400×533**（BLOCKED） |
| town/buildings | 2364×1773 | 1200×900 | 1200×900 |
| town/characters | 2048×2048 | 800×800 | 800×800 |

---

## 11. Phase 1E.4-B — Town Globe（LELAN TOWN GLOBE）

> **东方微缩沙盘，不是地球。**
> Town 成为首页最强空间高潮；这是唯一允许 WebGL 的区块。

### 11.1 WebGL 使用边界（硬规则）

| 区块 | 允许 WebGL |
|---|---|
| **Town** | ✅ 是（唯一） |
| Hero | ❌ |
| Guardian | ❌（档案 / 坐标 / 纸张语言） |
| AI | ❌（安静软件语言） |
| Technology / About | ❌ |

**禁止**：`globe.gl` / `react-globe.gl` / `three-globe` / `cobe`；
postprocessing / HDR environment / 复杂 shader / 高面数模型 / 物理引擎；
GSAP / framer-motion / leva / rapier / cannon。
**允许**：`three` + `@react-three/fiber`。

### 11.2 Globe 视觉语法（Visual Grammar）

| 层 | 内容 | 实现 |
|---|---|---|
| L0 背景 | warm spatial field（paper / jade 渐变，**非太空**） | `.lelan-globe-stage` CSS |
| L1 地形 | 程序化低浮雕**球冠**（不是完整球体） | `TownTerrain`，`SphereGeometry` + 顶点色 |
| L2 收口 | 平面 rim disc = 沙盘底座 | `circleGeometry` |
| L3 道路 | **5 条**大圆弧 Tube；镇内街道，**不是数据关系图** | `TownRoads`，`CatmullRomCurve3` |
| L4 建筑 | 01/02 = 立面展板；03–08 = proxy pavilion | `TownBuildingVisual`（= 资产替换 seam） |
| L5 标签 | **仅选中项**一个 HTML 标签 | 自写 world→NDC 投影 |

**禁止**：大陆 / 国界 / 经纬网格 / 卫星图 / 物流弧线 / 轨道线 / 星野 / 星系 /
行星环 / 月亮 / 太空尘埃 / 黑色背景 / 八卦铺满球面 / 龙凤 / 传统红金。

### 11.3 相机与旋转模型

- `PerspectiveCamera`，**FOV 34**（规定区间 30–45，刻意不用超广角）
- 初始位置略高于赤道面（约 19°），同时看到**上表面与近处建筑立面**；
  **不**正对球心如普通地球仪
- **旋转世界（town group），不是环绕世界的相机**
- 允许 yaw + 少量 pitch；**pitch clamp −0.40 … 0.62**，不得翻到球底
- **禁止持续自动旋转**；仅 selectedId 变化时 rotate-to **700ms ease-out**，
  reduced-motion 时瞬时；旋转后**不完全正中**，保留世界上下文

### 11.4 交互契约

| 输入 | 行为 |
|---|---|
| pointer drag | 旋转世界（yaw + clamped pitch） |
| wheel | **页面继续滚动**，不劫持；本阶段无 zoom |
| click 建筑 / marker | `onSelect(shop.id)` |
| click 服务索引 | selectedId + hash + globe rotate-to（三者同步） |
| keyboard（radio + 方向键） | 同 index 选择 |
| touch swipe | 旋转世界（`touch-action: pan-y`） |
| tap | 选择 |

- **drag threshold 5px**：区分 click 与 drag
- 选中态克制：cinnabar marker ring + 少量 scale + HTML 标签；**禁止 neon glow**
- **禁止游戏化**：无 RPG HUD / 角色跑动 / 任务系统 / 金币 / 经验 / 摇杆 /
  昼夜循环 / 满屏粒子 / 背景音乐

### 11.5 Desktop-only 策略与 2D Fallback

| 视口 | 渲染器 |
|---|---|
| ≥1024px + WebGL + 非 reduced-motion + 非低功耗 | **Town Globe（WebGL）** |
| 768–1023px | 2D `TownMapStage` |
| ≤767px | 2D `TownMapStage` |
| `prefers-reduced-motion: reduce` | 2D `TownMapStage` |
| WebGL 不可用 / context lost | 2D `TownMapStage` |

- **门控使用 viewport 宽度，不是组件容器宽度**（Town 内 globe 列在 1440 下仅约
  678px 宽，用容器宽度会误判）
- 低功耗判定**只接受正向证据**（`hardwareConcurrency < 4` / `deviceMemory < 4`）；
  `undefined` **不得**判为弱设备
- 2D 地图**始终在 DOM 中**，作为加载态 + fallback + no-JS/SEO 表面；
  Globe 在其上淡入 → **永不出现空白或 spinner**

### 11.6 无障碍（Canvas 不是业务来源）

- Canvas：`aria-hidden="true"` + `role="presentation"`，**不得** trap focus
- **业务入口永远是 HTML**：语义化服务索引（8 项）+ `TownServiceDrawer` + 静态 HTML
- `aria-live="polite"`：「已选择 01 论文茶寮 · 文曲茶娘」
- 键盘：原生 radio + Tab / 方向键；选中 → globe rotate-to
- 标签为真实 HTML（继承站点字体、可选中），**不是 3D text**
- **仅显示选中项标签**；其余仅 marker ring → 8 个大标签不得铺满球体

### 11.7 性能预算

- **`frameloop="demand"`**：空闲 **0 连续渲染帧**；仅拖拽 / tween / 初始挂载
  `invalidate()`
- ⚠ **关键**：demand 模式下任何只改数值不 `invalidate()` 的交互都不会重绘；
  拖拽处理器**必须位于 `<Canvas>` 内**以取得 `invalidate`
- `dpr={[1, 1.5]}`（上限 1.75）；基础 antialias；**无** MSAA / supersampling
- 灯光：AmbientLight + 2 × DirectionalLight；**无** HDR / env map / bloom / SSAO
- **第一版不用实时阴影**（极淡 painted contact disc 代替）
- 几何预算：8 nodes + 1 terrain + 5 roads + 2 image planes + 6 proxy volumes
- 懒加载：`IntersectionObserver`（`rootMargin: 300px`）+ `dynamic(..., {ssr:false})`
  → three **完全不进静态导出 HTML / 首屏 bundle**
- 实测：three chunk **907KB raw / 233KB gzip**，Town 进入视口后才请求
- ⚠ **每个 R3F hook 组件必须在 `<Canvas>` 内**：`useFrame` / `useThree` 在 Canvas 外
  调用会抛 "R3F: Hooks can only be used within the Canvas component!"

### 11.8 资产替换 seam（未来只改一处）

`components/town/globe/TownBuildingVisual.tsx` 是**唯一**未来资产替换点。

- 现状：01/02 = **architectural display panel**（纸框立面展板，立在 plinth 上），
  明确是「微缩立面展板」而**不假装是抠图 3D 建筑**，不使用 alpha 欺骗
- 现状：03–08 = 统一 **proxy pavilion**（plinth + 体块 + 飞檐板 + 四坡顶），
  必须明显读作「待建形态」，**不是空灰盒**
- **禁止**：把论文茶寮 / 课题小铺复制给其他铺子；换色伪装 8 栋建筑；
  引用 136MB reference PNG 作为 texture；任何新增网络资产
- 正式资产到位后：**只替换该组件**，selection / rotation / camera / hash /
  fallback / drawer **不得**改动

### 11.9 与 Town 状态架构的关系（不得破坏）

```
HomeTownClient      owns selectedId + URL hash + aria-live   ← 状态唯一来源
  ├─ TownGlobe      纯渲染器 { shops, selectedId, onSelect }  ← 可被替换
  └─ TownMapStage   纯渲染器 { shops, selectedId }            ← 永久 fallback
TownServiceDrawer   纯详情面板 { shop, agentRoleLabel }        ← 真实 HTML，不搬进 Canvas
content/town.ts     唯一业务真相源（8 铺子 + plot + globe）
```

**禁止**在 `TownGlobe` 内维护第二份 selected state。

### 11.10 Hash 契约

- 支持 `#shop-01`…`#shop-08`（数字别名）**与** `#shop-paper-teahouse`（slug）
- 写回 URL 使用 **slug 作为规范形式** → **旧 deep link 不被破坏**
- 非法 hash → 回落 `paper-teahouse` 并规范化 URL

---

## 12. Phase 1E.4-B1 — Town Globe 构图修正

> Phase 1E.4-B Final Audit（PASS WITH FIXES）的小修轮。
> **未**改动 R3F architecture / selection state / hash model / fallback architecture。

### 12.1 建筑尺度

- 统一 **1.25×**，通过 `TownBuildingVisual` 外层**唯一一个** `scale` wrapper 实现，
  使 plinth / 体块 / 飞檐 / 屋顶 / 立面展板 / marker / hit target **一起缩放**
- **只放大建筑**：globe / terrain / roads 不缩放，道路不变粗
- 放大前必须做碰撞核算：1.25× 需 8.35° 间隔，实际最近一对 19.0°，余量 10.6°
- 实测屏幕效果：建筑从约 40px → **约 50px**，在 678×486 画布上可读

### 12.2 取景（Camera / Stage）

| 项 | 值 |
|---|---|
| stage 高度 | `min(54vh, 500px)`；移动端 400 / tablet 440；下限 400px |
| 相机位置 | `[0, 1.13, 3.85]` |
| `lookAt` | y = **0.02**（组合体真实垂直中心，非穹顶原点） |
| FOV | 34（区间 30–45 内） |

- **实测而非估算**：模型填充画布高度由 65% → **83%**（上留 42px / 下留 39px）
- 1440×900 下画布底 865 < 900 → **完整沙盘 + 底座不再被 fold 裁切**
- 1024：画布 536×486，index / globe / drawer 不拥挤

### 12.3 Sand-table 轮廓

- cap **130°**（原 124°），rim 下移至 y = −0.643 → 更扁、更像落定地形而非球体
- **禁止**（继续）：大陆 / 国界 / 经纬网格 / 卫星图 / 物流弧线 / 轨道线 / 星野 /
  星系 / 行星环 / 月亮 / 太空尘埃 / 黑色背景 / 大气辉光

### 12.4 展示底座 —— 本相机角度下不可行（重要设计约束）

**结论：在当前相机仰角下，任何宽到足以可见的底座都会产生渲染瑕疵。**

几何原因：底座是位于 rim 高度的**水平圆盘**。相机位于其平面上方时，圆盘**前缘**的
屏幕投影低于盘心，偏移量随半径增大。任何宽到能从穹顶轮廓后探出的圆盘（≥ 约 1.25×
rim）其前缘都会在沙盘中部横切出一条浅色带。**已实测四种方案（0.83× / 1.04× /
1.06× / 1.09×+ 高 0.34），全部确认。** 1.04× 的小唇边同样产生该带。

**因此：**
- 底座保持**略小于**地形 rim（0.83× / 0.78× rim，高 0.1），作为不可见承托脚
- 由下方 contact shadow 把模型"压"在纸面上完成接地
- **正式的宽展示底座属于 Town Art Pass**：届时须连同地形与相机仰角一起重新设计
- **不要**在现有相机角度下硬造可见底座 —— 会得到横切沙盘的浅色带

### 12.5 Drawer 间距与均衡

- `ARCHIVE · SHOP-xx` 位于**正常文档流**首行，其后**固定 18px** 呼吸空间再是店铺名
  （实测 gap = 18px）。**禁止**用 `mt-auto` 做弹性间距 —— 会把 header 与正文拉开约
  50px 形成"头尾分离"
- drawer 与 stage **等高**（列容器 `lg:flex`），实测 486px = 486px
- **禁止**为填满高度而添加无意义文字

### 12.6 01/02 与 03–08

- 01/02：**不重做素材**。仅调整立面比例（面板相对纸框收窄约 10%，纸边留白加宽），
  读作"带装裱的信息铭牌"。**禁止假抠图**。风格统一留 Art Pass
- 03–08：继续 proxy。屋顶**柔和化**：高度 0.022–0.030（原 0.030–0.042），
  底面半径 0.94w（原 0.80w），飞檐 1.42w（原 1.34w）
- **禁止**把论文茶寮 / 课题小铺复制给其他铺子

### 12.7 Known limitation — favicon

项目当前**没有**任何 favicon / icon 资源；`/favicon.ico` 是唯一真实 404。
按指示**不临时绘制低质量图标**，留待品牌资产到位时正式接入。


