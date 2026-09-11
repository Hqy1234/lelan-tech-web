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