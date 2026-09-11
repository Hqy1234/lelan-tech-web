/**
 * LELAN TECHNOLOGY · Profile Page
 *
 * Phase 1E.3-A — Life archive home page.
 *
 * Route: /profile
 *
 * Data priority:
 *   1. Generated guardian profile (from /guardian/demo) — sessionStorage
 *   2. Demo account persona (from /login) — sessionStorage
 *   3. Safe empty state with CTA
 *
 * Phase 1E.3-A changes:
 * - Corrupt generated profile cache is auto-cleared by getGeneratedProfile;
 *   if it returns null, we fall through to demo account / empty state
 *   without crashing (Codex P1).
 * - Removed hidden <span> hack — added explicit data-state UI.
 */
"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getDemoProfile } from "@/lib/demo";
import {
  getGeneratedProfile,
  clearGeneratedProfile,
} from "@/lib/guardian/mock-adapter";
import type { GuardianProfile } from "@/content/guardian";
import { GuardianProfileView } from "@/components/guardian/GuardianProfileView";

type ProfileSource = "generated" | "demo-account" | null;

export default function ProfilePage() {
  const [profile, setProfile] = useState<GuardianProfile | null>(null);
  const [source, setSource] = useState<ProfileSource>(null);
  const [corrupt, setCorrupt] = useState(false);

  useEffect(() => {
    // Snapshot sessionStorage to detect a corrupt entry — if found and
    // getGeneratedProfile() returned null after auto-clear, surface the
    // safe state with a friendly explanation.
    try {
      if (typeof window !== "undefined") {
        const raw = window.sessionStorage.getItem("lelan_generated_guardian_profile");
        if (raw) {
          try {
            JSON.parse(raw);
          } catch {
            setCorrupt(true);
          }
        }
      }
    } catch {
      /* ignore — defensive only */
    }

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
        <div className="max-w-md rounded-sm border border-rule bg-paper-pure p-6">
          <h1 className="font-serif text-xl text-ink">请先选择演示账号或体验建档</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            本页面为演示模式，请从登录页选择演示账号，或体验人生档案 Demo。
          </p>

          {corrupt && (
            <p
              role="alert"
              className="mt-3 rounded-sm border border-cinnabar/30 bg-cinnabar/5 px-3 py-2 text-xs text-cinnabar"
            >
              上次 Demo 档案的本地存档已损坏，已自动清除。请重新体验 Demo 或登录。
            </p>
          )}

          <div className="mt-6 flex flex-col items-center gap-3">
            <Link
              href="/guardian/demo"
              className="inline-flex w-full items-center justify-center gap-2 rounded-sm border border-ink bg-ink px-4 py-2.5 text-sm text-paper transition-colors hover:bg-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-cinnabar focus-visible:outline-offset-2"
            >
              体验建档 Demo
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/login"
              className="inline-flex w-full items-center justify-center gap-2 rounded-sm border border-rule px-4 py-2.5 text-sm text-muted transition-colors hover:border-muted hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-cinnabar focus-visible:outline-offset-2"
            >
              选择演示账号
            </Link>
            <Link
              href="/#hero"
              className="font-mono text-[0.65rem] uppercase tracking-wider text-muted transition-colors hover:text-ink"
            >
              ← 返回首页
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-rule bg-paper">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        {/* Source label — small badge above the cover */}
        <div className="mb-4 flex items-center gap-2">
          {source === "generated" && (
            <span className="inline-flex items-center gap-1.5 rounded-sm border border-green/30 bg-green/5 px-2 py-0.5 font-mono text-[0.65rem] text-green">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-green" />
              本次 Demo 档案
            </span>
          )}
          {source === "demo-account" && (
            <span className="inline-flex items-center gap-1.5 rounded-sm border border-rule bg-paper-pure px-2 py-0.5 font-mono text-[0.65rem] text-muted">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-muted" />
              模拟账号档案
            </span>
          )}
          {source === "generated" && (
            <button
              type="button"
              onClick={() => {
                clearGeneratedProfile();
                window.location.reload();
              }}
              className="font-mono text-[0.6rem] uppercase tracking-wider text-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-cinnabar focus-visible:outline-offset-2"
            >
              清除本次档案
            </button>
          )}
        </div>

        <GuardianProfileView profile={profile} />

        <div className="mt-10 flex flex-col items-center gap-3">
          <Link
            href="/guardian/demo"
            className="font-mono text-[0.65rem] uppercase tracking-wider text-muted transition-colors hover:text-ink"
          >
            重新体验建档 Demo
          </Link>
          <Link
            href="/#hero"
            className="font-mono text-[0.65rem] uppercase tracking-wider text-muted transition-colors hover:text-ink"
          >
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
