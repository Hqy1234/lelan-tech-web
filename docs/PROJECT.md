# LELAN TECHNOLOGY · Project Source of Truth

> 单文件说明：项目身份、业务边界、公开路由、术语对照。
> 一切与"乐懒科技 / LELAN TECHNOLOGY"官网相关的工作，以本文件为准。

---

## 1. 项目身份

- 项目：**乐懒科技官方网站 / LELAN TECHNOLOGY**
- 工程仓库：`lelan-tech-web`
- 生产域名：待用户正式确认（占位常量集中于 `content/site.ts`，禁止编造）
- 工程类型：Next.js App Router + 静态导出（`output: "export"`）
- 工程定位：纯前端官网，**不直连**任何外部后端服务
- 部署形态：Static Export（可托管于任意静态平台）

---

## 2. 网站角色

乐懒科技官网同时承担四个角色：

1. **品牌官网** — 传递乐懒科技"东方数字城镇 × 现代科技编辑系统"的整体气质。
2. **产品入口** — 让访客清晰理解乐懒科技当前的产品矩阵。
3. **服务理解** — 用编辑设计语言解释成果小镇 / 守护体系等服务方法论。
4. **Beta 转化入口** — 提供"立即使用 → 即将上线 / 申请加入 Beta"的真实转化路径。

---

## 3. 核心业务

乐懒科技当前由 **两大系统 + 一项软件产品能力** 组成。

### 3.1 乐懒 AI · 论文智能助手

- 论文智能助手产品。
- AI **不是**与 Town / Guardian 并列的"第三个业务"。
- AI 是乐懒科技在两大系统之中沉淀下来的软件产品能力。
- 现有体验版**属于独立项目 `lelan-shouhu`**，本仓库**不得复制、引用、镜像其代码**。
- 未来通过以下方式之一与体验版建立关系：
  - `ai.lelan.tech` 子域跳转
  - 官方 API 接入
  - 统一 account architecture
- 官网 AI 截图一律标注：
  > "产品界面示意，实际界面以体验版为准。"

### 3.2 乐懒成果小镇 · 科研成果与科技服务体系

**完整 8 个铺子**（官网 `town` 路由必须呈现）：

| 编号 | 铺子 | 人格 |
| --- | --- | --- |
| 01 | 论文茶寮 | 文曲茶娘 |
| 02 | 课题小铺 | 灵枢子 |
| 03 | 专利小铺 | 机枢生 |
| 04 | 软著小铺 | 珠玑客 |
| 05 | 申报辅导 | 奏章生 |
| 06 | 成果转化 | 通宝掌柜 |
| 07 | 产学研对接 | 连横子 |
| 08 | AI 工具坊 | 丹青客 |

**六个能力维度**（横切表达）：

- Research
- Writing
- IP
- Funding
- Transformation
- AI Tools

### 3.3 乐懒守护 · 人生档案与生命周期坐标系统

守护体系以**乐懒守护符·人生坐标**作为产品主视觉：

**核心产品层级**（Phase 2 已落地首页）：
1. 人生档案（Life Archive）
2. 乐懒守护符 · 人生坐标（Life Coordinate System）
3. 坐标化闯关（八阶段 Y × 当前任务 X）
4. 五行生活维度 teaser
5. 科学方法论（底层说明）

**八阶段（纵轴 Y）**：

| 编号 | 卦 | 阶段 | 年龄 |
| --- | --- | --- | --- |
| 01 | 震 | 婴儿期 | 0–9 |
| 02 | 巽 | 少儿期 | 10–19 |
| 03 | 离 | 青少年期 | 20–29 |
| 04 | 兑 | 青年期 | 30–39 |
| 05 | 乾 | 壮年期 | 40–49 |
| 06 | 坎 | 中年期 | 50–59 |
| 07 | 艮 | 中老年期 | 60–69 |
| 08 | 坤 | 老年期 | 70+ |

**八卦/五行是信息组织与品牌记忆语言**，不是玄学预测依据。
科学逻辑负责可信；东方文化系统负责记忆。

**五行生活维度**（横切）：

| 元素 | 维度 | 说明 |
| --- | --- | --- |
| 金 | 财富 | 财务与资产规划 |
| 木 | 健康 | 健康与长期状态管理 |
| 水 | 出行 | 出行与旅途安排 |
| 火 | 饮食 | 饮食与营养场景 |
| 土 | 安居 | 居住与家庭环境 |

**重要约束**：
- 首页 Guardian 展示简化版八阶段生命周期坐标 + 五行 teaser；
  完整解释在 `/guardian` 详细页。
- Guardian 视觉语言 ≠ Town：
  Town = 空间/建筑/服务世界；Guardian = 档案/坐标/生命周期/数据。
- 五行 × 八阶段**不**作为风险打分输入，
  **不**作为科学因果机制主张。
- 当前 MVP 不实现任何健康表单、风险评分、营养推荐、医疗筛查或健康数据存储。

---

## 4. 主要路由

| 路径 | 用途 |
| --- | --- |
| `/` | 首页：Guardian-first 产品叙事 + 乐懒守护 + 成果小镇 + LeLan AI |
| `/ai` | 乐懒 AI 详情（独立项目外链，URL 待确认） |
| `/town` | 成果小镇：8 铺子 + 6 能力维度 |
| `/guardian` | 乐懒守护：人生档案 + 坐标系统 |
| `/guardian/demo` | 乐懒守护产品演示：6步建档 Demo（Phase 1E 新增） |
| `/login` | 演示登录页（m123/n123 公开账号） |
| `/profile` | 个人档案页：支持固定 Persona + /guardian/demo 生成的档案 |
| `/about` | 关于乐懒科技 |
| `/team` | 团队（当前不发布具体成员） |
| `/contact` | 联系方式（邮箱待确认，使用 fallback 文案） |
| `/privacy` | 隐私政策 |
| `/terms` | 使用条款 |

> 路由清单同时声明于 `content/site.ts` 的 `publicRoutes`，
> `app/sitemap.ts` 与 `app/robots.ts` 单一来源引用，禁止重复定义。

---

## 4.1 Guardian Demo 技术架构

**三层 Contract**：

```
GuardianDemoInput → Mock Adapter / Future Dify → GuardianProfile → Profile UI
```

- `GuardianDemoInput`：Step 1–5 表单数据（age/gender/stage/scenario/tasks/dimensions）
- `GuardianAnalysisResult`：分析结果（summary/attentionItems/dimensionNotes/disclaimer），future Dify 输出
- `GuardianProfile`：冻结的最终档案数据结构，所有 Profile UI 消费同一个 contract

**Adapter 接口**（`lib/guardian/mock-adapter.ts`）：

```typescript
async function createGuardianDemoProfile(
  input: unknown
): Promise<GuardianProfile | GuardianDemoError>
```

- 当前：本地 deterministic mock adapter，无网络调用
- 未来：替换为 `fetch("https://api.lelan.tech/guardian/demo")`

**Deterministic Logic**（前端/adapter 负责）：

- `age → stage` mapping（8个稳定 ID + 年龄映射表）
- Task state：`done`（用户勾选）→ `current`（第一个未完成）→ `upcoming`（其余）
- Progress：`completed / total`
- Archive ID：deterministic format `LELAN-DEMO-GEN-{age}-{M/F}-{year}`

**AI/Dify（Future）**：

- summary / attentionItems / dimensionNotes / explanation
- **不**决定确定性事实（阶段、完成进度、任务状态）

**sessionStorage**：

- `lelan_generated_guardian_profile`：/guardian/demo 生成的档案
- `lelan_demo_session`：m123/n123 演示账号登录 session
- 两者独立存储；登录 m123/n123 时清除 generated profile

**隐私约束**：

- 不收集真实姓名、手机号、身份证、具体病名、药物信息
- 所有标签粗粒度（如"作息记录"而非"睡眠障碍诊断"）
- Demo disclaimer 明确："当前为产品演示，不建立真实医疗档案"

---

## 5. 工程边界（强制）

- 本仓库**不得**包含 `lelan-shouhu` 项目的任何源码、数据、截图资源。
- `lelan-shouhu` 是独立仓库，未来通过品牌、域名、账号、API 层连接。
- 任何关于体验版能力的描述均来自产品侧文案，不读取其代码。

---

## 5.1 Guardian 智能分析（Dify 接入）

### 架构

```
Browser
  → 官网控制的 server-side Adapter（独立部署）
  → Dify Workflow
  → Adapter normalize
  → GuardianAnalysisResult
  → 现有 GuardianProfile / UI
```

**Dify 只是 analysis / explanation layer，不是 source of truth。**

`age` / `stage` / `scenario` / `tasks` / `done-current-upcoming` /
`progress_completed` / `progress_total` **继续由网站现有确定性逻辑负责**，
Dify **不得**重算或覆盖。

### 为什么是独立服务，而不是 Next.js Route Handler

官网是**静态导出**（`next.config.ts` → `output: "export"`）。
静态导出下 Next.js Route Handler **在生产环境不存在**；而 Dify 的 `blocking`
调用必须在服务端发起（API Key 不能进浏览器）。

因此：**保持静态官网架构不变**（`output: "export"` 不得删除），
Guardian 分析使用**独立的 server-side Adapter 服务**，
浏览器**只能**调用该 Adapter，**不得**直连 `api.dify.ai`。

### Adapter

- 位置：`tools/guardian-adapter/`（Node 20+，仅 Node 内置模块，零运行时依赖）
- 端点：`GET /health`、`POST /guardian/analyze`
- 详见 `tools/guardian-adapter/README.md`

### 环境变量

Adapter 服务（服务端 · 机密）：

```
DIFY_API_KEY=          # 真实 Key 只存在于 Adapter 部署环境
DIFY_API_BASE_URL=https://api.dify.ai/v1
PORT=8787
ALLOWED_ORIGINS=       # ⚠ 生产环境必填，缺失则拒绝启动
DIFY_TIMEOUT_MS=40000  # 跨尝试共享的总预算
```

**`ALLOWED_ORIGINS` 在生产环境是强制项**：`NODE_ENV=production` 且该项缺失或为空时，
Adapter **拒绝启动**（exit 1）。没有安全默认值 —— 允许任意来源或回显任意 Origin
等于让任何网站用我们的 Dify 凭据驱动该服务。
`Access-Control-Allow-Origin` **只**对白名单内的 Origin 返回，**无 `*` 通配**；
允许面收窄为 `POST, GET, OPTIONS`（GET 仅 `/health`）与 `Content-Type` 一个头。

**超时预算（记录，勿随意调整）**：server 总预算 40 s（跨尝试共享）·
retry 最多 2 次尝试 · 最坏 40 s · 客户端 50 s（必须 > server 预算）。
Workflow 单次 >20 s 属于 **Dify 侧 optimization issue**，不应靠放大客户端超时掩盖。

**Dify caller id**：由官网按档案的不透明内部 id 生成
`guardian-${internalId}`（如 `guardian-demo-f36`），不再让所有请求共用同一常量。
该 id 必须匹配 `^[a-z0-9_-]{1,48}$` 且含至少一个字母 ——
结构上无法承载姓名 / 邮箱 / 手机号 / 身份证号；不合规时回退到
`guardian-web-demo`，服务端会再校验一次。

**Canonical 阶段命名**：阶段唯一标识是 `stage.id`，业务展示名（canonical）是
**「卦名 · 阶段名」**，来源为 `guardianStages[].displayName`：

```
震 · 婴儿期 · 巽 · 少儿期 · 离 · 青少年 · 兑 · 青年期
乾 · 壮年期 · 坎 · 中年期 · 艮 · 中老年期 · 坤 · 老年期
```

注意 `li-adolescent` 是 **「离 · 青少年」**（不是「青少年期」）。
历史拼写（如「青少年期」「青年期」）只作为 **input alias** 被接受，
内部一律 normalize 成 canonical 后才发给 Dify；UI 显示全名时同样使用 canonical 值。

官网（静态站 · 公开；这是**地址**不是密钥）：

```
NEXT_PUBLIC_GUARDIAN_ADAPTER_URL=
```

`NEXT_PUBLIC_*` 在**构建时**内联，更换 Adapter URL 需要重新构建静态站。
该变量为空时官网完全回退到原有行为：不渲染分析区、不报错、不发请求。

**禁止**把 `DIFY_API_KEY` 放入 React / Client Component / `public/` /
浏览器 JS / `NEXT_PUBLIC_*` / Git / 日志。

### 本地运行

```bash
cd tools/guardian-adapter
cp .env.example .env       # 填入 DIFY_API_KEY
npm start                  # http://127.0.0.1:8787

# 让官网指向它（构建时内联）
# .env.local: NEXT_PUBLIC_GUARDIAN_ADAPTER_URL=http://127.0.0.1:8787
npm run build              # 回到仓库根目录执行
```

### 失败行为

Dify 是**增强**，不是 Profile 的单点故障。timeout / 网络错误 / 非 2xx /
`data.status=failed` / outputs 缺失 / 输出类型错误 / 规范化失败时：

- **现有 Profile 仍完整显示**：人生阶段、五行结构、lifecycle、任务、进度
- 分析区显示「暂时无法生成智能分析，请稍后重试。」并提供重试
- **不得**白屏、抛原始错误、显示 Dify 原始响应 / 内部 stack / Authorization / API Key

### 生产部署

Adapter 作为**独立 Node Web Service** 部署（Node 20+）。
**不要**把它塞进静态站托管 —— 静态站按设计没有 server runtime。

1. 以 `tools/guardian-adapter` 为根建立服务
2. 启动命令 `node server.js`
3. 服务环境配置 `DIFY_API_KEY` / `DIFY_API_BASE_URL` / `ALLOWED_ORIGINS`
4. 记录其 HTTPS URL，在**官网构建时**配置为 `NEXT_PUBLIC_GUARDIAN_ADAPTER_URL`，
   然后重新构建并重新部署静态站

---

## 6. 编辑与产品原则

- 官网内容必须经由产品侧文案确认后再上线。
- 不得捏造：成功率、市场验证数据、合作伙伴 logo、媒体报道截图。
- Beta CTA 当前文案为"立即使用"→ 即将上线 / 申请加入 Beta，
  不得假装"提交成功"或伪造反馈态。

---

## 7. 文档关系

- `docs/PROJECT.md` — 项目身份与业务边界（本文）
- `docs/DESIGN-SYSTEM.md` — 视觉系统与禁制
- `docs/DECISIONS.md` — 工程 / 产品 / 流程已确认决定
- `docs/ROADMAP.md` — 阶段路线图

任何冲突以 `docs/DECISIONS.md` 为准；任何视觉冲突以 `docs/DESIGN-SYSTEM.md` 为准。