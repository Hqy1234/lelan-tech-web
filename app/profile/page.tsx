/**
 * LELAN TECHNOLOGY · Profile Page
 *
 * Phase 1D-G2 — Personal Life Archive Demo.
 *
 * Route: /profile
 *
 * Guard:
 *   - If no demo session, show "please select a demo account" + return to /login
 *
 * Data:
 *   - Reads sessionStorage for profileId
 *   - Maps to DEMO_PROFILES
 *   - Renders GuardianProfileView with the profile
 *
 * NOT real authentication.
 * NOT a real profile system.
 *
 * SSR disabled via dynamic = "force-dynamic" — page reads sessionStorage.
 */
"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getDemoProfile } from "@/lib/demo";
import type { GuardianProfile } from "@/content/guardian";
import { GuardianProfileView } from "@/components/guardian/GuardianProfileView";

export default function ProfilePage() {
  const [profile, setProfile] = useState<GuardianProfile | null>(null);

  useEffect(() => {
    setProfile(getDemoProfile());
  }, []);

  if (!profile) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="max-w-sm rounded-sm border border-rule bg-paper-pure p-6">
          <h1 className="font-serif text-xl text-ink">请先选择演示账号</h1>
          <p className="mt-3 text-sm text-muted">
            本页面为演示模式，请从登录页选择演示账号。
          </p>
          <p className="mt-2 text-xs text-muted/70">
            当前无有效的演示会话。
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-sm border border-ink bg-ink px-4 py-2 text-sm text-paper transition-colors hover:bg-green-dark"
            >
              前往登录
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-rule bg-paper">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Page header */}
        <div className="mb-8">
          <p className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
            乐懒守护
          </p>
          <h1 className="mt-2 font-serif text-2xl text-ink sm:text-3xl">
            我的人生档案
          </h1>
          <p className="mt-2 text-sm text-muted">
            {profile.identity.age} 岁 {profile.identity.genderLabel} ·{" "}
            {profile.stage.trigram} · {profile.stage.name}
          </p>
        </div>

        <GuardianProfileView profile={profile} />

        {/* Back to homepage */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/"
            className="font-mono text-[0.65rem] uppercase tracking-wider text-muted transition-colors hover:text-ink"
          >
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
