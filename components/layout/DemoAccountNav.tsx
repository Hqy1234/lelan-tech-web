/**
 * LELAN TECHNOLOGY · Demo Account Nav
 *
 * Phase 1D-G2 — Client island for header login state.
 *
 * Reads sessionStorage on mount and shows:
 *   - "登录" → when not logged in
 *   - "我的档案" + logout button → when logged in
 *
 * Minimal client boundary — only this component is a client component.
 * Handles SSR/hydration via lazy-initialized mounted state.
 */
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { isDemoLoggedIn, demoLogout } from "@/lib/demo";

export function DemoAccountNav() {
  const [mounted, setMounted] = useState(false);
  // Initialize from sessionStorage — called on client only so window is defined
  const [loggedIn] = useState(() => isDemoLoggedIn());

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = useCallback(() => {
    demoLogout();
    window.location.href = "/";
  }, []);

  // SSR / pre-hydration placeholder prevents mismatch
  if (!mounted) {
    return (
      <span
        aria-hidden
        className="inline-block h-8 w-16 rounded-sm bg-paper-pure"
      />
    );
  }

  if (loggedIn) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 rounded-sm border border-green px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-green transition-colors hover:border-green-dark hover:text-green-dark"
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

  return (
    <Link
      href="/login"
      className="inline-flex items-center gap-2 rounded-sm border border-ink px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-ink transition-colors hover:border-green hover:text-green"
    >
      登录
    </Link>
  );
}
