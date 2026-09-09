/**
 * Temporary home — Phase 0 scaffold smoke page.
 *
 * 仅用于验证：
 *   - App Router 正常编译
 *   - Tailwind v4 + LELAN EDITORIAL tokens 生效
 *   - 基础 typography（中文 + 拉丁文）显示正确
 *
 * 不含业务文案 / 假数据 / 复杂组件。正式官网首页留到后续阶段。
 */

import { brandName } from "@/content/site";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
        Scaffold · Phase 0
      </p>

      <h1 className="mt-6 font-serif text-4xl leading-tight text-ink sm:text-5xl">
        LELAN TECHNOLOGY
      </h1>

      <p className="mt-3 text-base text-muted">
        {brandName} · 工程脚手架
      </p>

      <hr className="mt-12 border-rule" />

      <p className="mt-12 text-sm text-muted">
        本页面为临时占位，仅用于脚手架验证。官网设计、产品矩阵、AI
        能力等内容将在后续阶段正式开发。
      </p>
    </div>
  );
}
