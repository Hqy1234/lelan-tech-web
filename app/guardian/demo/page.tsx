/**
 * LELAN TECHNOLOGY · Guardian Demo Page
 *
 * Phase 1E — Life Archive Demo
 *
 * Route: /guardian/demo
 *
 * Product demo page for building a personal life archive.
 * NOT a real health assessment.
 * NOT a real medical record.
 *
 * This is a Client Component island.
 * The rest of the app remains server-first.
 */
"use client";

import { GuardianDemoForm } from "@/components/guardian/demo/GuardianDemoForm";

export default function GuardianDemoPage() {
  return (
    <div className="min-h-screen border-b border-rule bg-paper">
      {/* Page header — h2 since the form IS the main content of this page */}
      <div className="border-b border-rule bg-paper-pure">
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
          <p className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
            乐懒守护 · 产品演示
          </p>
          <h2 className="mt-2 font-serif text-2xl text-ink sm:text-3xl">
            体验人生档案
          </h2>
          <p className="mt-3 text-sm text-muted">
            乐懒守护将你的人生划分为八个阶段坐标，
            并在每个阶段提供当前事项与五行生活维度的整理方式。
          </p>
          <div className="mt-4 rounded-sm border border-cinnabar/20 bg-cinnabar/5 px-4 py-3">
            <p className="text-xs text-cinnabar">
              当前为乐懒守护产品演示，不建立真实医疗档案。
              所有数据仅在当前浏览器中展示，关闭标签页后自动清除。
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <GuardianDemoForm />
      </div>
    </div>
  );
}
