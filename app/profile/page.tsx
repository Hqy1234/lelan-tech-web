/**
 * LELAN TECHNOLOGY · Profile Page
 *
 * Phase 1E — Generated Demo Profile Support.
 *
 * Route: /profile
 *
 * Data priority:
 *   1. Generated guardian profile (from /guardian/demo) — sessionStorage key: lelan_generated_guardian_profile
 *   2. Demo account persona (from /login) — sessionStorage key: lelan_demo_session
 *   3. Empty state with CTA
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
import { getGeneratedProfile } from "@/lib/guardian/mock-adapter";
import type { GuardianProfile } from "@/content/guardian";
import { GuardianProfileView } from "@/components/guardian/GuardianProfileView";

type ProfileSource = "generated" | "demo-account" | null;

export default function ProfilePage() {
  const [profile, setProfile] = useState<GuardianProfile | null>(null);
  const [source, setSource] = useState<ProfileSource>(null);

  useEffect(() => {
    // Priority 1: generated profile from /guardian/demo
    const generated = getGeneratedProfile();
    if (generated) {
      setProfile(generated);
      setSource("generated");
      return;
    }
    // Priority 2: demo account persona
    const demo = getDemoProfile();
    if (demo) {
      setProfile(demo);
      setSource("demo-account");
      return;
    }
    setProfile(null);
    setSource(null);
  }, []);

  if (!profile) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="max-w-sm rounded-sm border border-rule bg-paper-pure p-6">
          <h1 className="font-serif text-xl text-ink">请先选择演示账号或体验建档</h1>
          <p className="mt-3 text-sm text-muted">
            本页面为演示模式，请从登录页选择演示账号，
            <br />
            或体验人生档案 Demo。
          </p>
          <div className="mt-6 flex flex-col items-center gap-3">
            <Link
              href="/guardian/demo"
              className="inline-flex items-center gap-2 rounded-sm border border-ink bg-ink px-4 py-2 text-sm text-paper transition-colors hover:bg-green-dark"
            >
              体验建档 Demo
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-sm border border-rule px-4 py-2 text-sm text-muted transition-colors hover:border-muted hover:text-ink"
            >
              选择演示账号
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
          {/* Source label */}
          {source === "generated" && (
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-sm border border-green/30 bg-green/5 px-2.5 py-1 font-mono text-[0.6rem] text-green">
              <span>·</span> 本次 Demo 档案
            </p>
          )}
          {source === "demo-account" && (
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-sm border border-rule bg-paper-pure px-2.5 py-1 font-mono text-[0.6rem] text-muted">
              <span>·</span> 模拟账号档案
            </p>
          )}
        </div>

        <GuardianProfileView profile={profile} />

        {/* Re-demo CTA */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <Link
            href="/guardian/demo"
            className="font-mono text-[0.65rem] uppercase tracking-wider text-muted transition-colors hover:text-ink"
          >
            重新体验建档 Demo
          </Link>
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
