/**
 * LELAN TECHNOLOGY · Demo Account / Generated Profile Nav
 *
 * Phase 1E.3-A — Differentiated header state.
 *
 * Three states:
 *   1. Not logged in                    → "登录" link
 *   2. Demo-account logged in           → "我的档案" + "退出"
 *   3. Generated profile present        → "本次档案" + clear button
 *   4. Both                             → both panels visible, distinct copy
 *
 * Critical: Generated profile is NOT a login session. The site must
 * not pretend the user is "logged in" when only /guardian/demo has
 * populated sessionStorage.
 *
 * Minimal client boundary — only this component is a client component.
 * Handles SSR/hydration via lazy-initialized mounted state.
 */
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { isDemoLoggedIn, demoLogout } from "@/lib/demo";
import { getGeneratedProfile, clearGeneratedProfile } from "@/lib/guardian/mock-adapter";

export function DemoAccountNav() {
  const [mounted, setMounted] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLoggedIn(isDemoLoggedIn());
    setHasGenerated(getGeneratedProfile() !== null);
  }, []);

  const handleLogout = useCallback(() => {
    demoLogout();
    // Force a hard reload to ensure /profile's empty-state is shown.
    window.location.href = "/";
  }, []);

  const handleClearGenerated = useCallback(() => {
    clearGeneratedProfile();
    setHasGenerated(false);
  }, []);

  // SSR / pre-hydration placeholder prevents mismatch
  if (!mounted) {
    return (
      <span
        aria-hidden
        className="inline-block h-8 w-32 rounded-sm bg-paper-pure"
      />
    );
  }

  // Generated profile panel (independent of login state)
  const generatedPanel = hasGenerated ? (
    <div className="flex items-center gap-2">
      <Link
        href="/profile"
        className="inline-flex items-center gap-1.5 rounded-sm border border-green/40 bg-green/5 px-2.5 py-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-green transition-colors hover:bg-green/10"
        title="查看本次 Demo 档案"
      >
        本次档案
      </Link>
      <button
        type="button"
        onClick={handleClearGenerated}
        className="rounded-sm px-2 py-1.5 font-mono text-[0.6rem] uppercase tracking-wider text-muted transition-colors hover:bg-paper-pure hover:text-ink"
        aria-label="清除本次档案"
      >
        清除
      </button>
    </div>
  ) : null;

  if (loggedIn) {
    return (
      <div className="flex items-center gap-2 sm:gap-3">
        {generatedPanel}
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 rounded-sm border border-green px-2.5 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-green transition-colors hover:border-green-dark hover:text-green-dark"
        >
          我的档案
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-sm px-2 py-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-muted transition-colors hover:bg-paper-pure hover:text-ink"
          aria-label="退出演示账号"
        >
          退出
        </button>
      </div>
    );
  }

  if (hasGenerated) {
    return (
      <div className="flex items-center gap-2 sm:gap-3">
        {generatedPanel}
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="inline-flex items-center gap-2 rounded-sm border border-ink px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-ink transition-colors hover:border-green hover:text-green"
    >
      登录
    </Link>
  );
}
