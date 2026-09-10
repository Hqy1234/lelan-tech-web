# LELAN TECHNOLOGY · Design System

> 单文件说明：视觉方向、气质、禁制、品牌视觉资产策略。
> 视觉系统的唯一来源（Source of Truth）。

---

## 1. 设计方向

**"东方数字城镇 × 现代科技编辑系统"**

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

| 版本 | 形态 | 是否 MVP |
| --- | --- | --- |
| V1 | image + CSS | ✅ |
| V2 | layered pseudo-3D | 后续 |
| V3 | real WebGL 3D | 后续（**非 MVP 依赖**） |

第一阶段优先 2.5D / pseudo-3D。
**不直接采用** Three.js / React Three Fiber / 重 WebGL。

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

Guardian 不复用小镇的建筑世界。其专属视觉语言为：

- archive（档案）
- lifecycle（生命周期）
- coordinates（坐标 / 时间轴）
- data（数据曲线）
- risk map（风险地图）
- research system（科研系统）

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