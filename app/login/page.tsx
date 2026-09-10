/**
 * LELAN TECHNOLOGY · Demo Login Page
 *
 * Phase 1D-G2 — DEMO ONLY, NOT AUTHENTICATION.
 *
 * Route: /login
 *
 * Features:
 *   - Demo credential validation (m123 / n123)
 *   - Quick-fill buttons for both demo personas
 *   - Accessible form with proper labels
 *   - Error messages with aria-live
 *   - sessionStorage session management
 *
 * Demo credentials (PUBLIC — not production auth):
 *   m123 / 12345 → 28岁男性，离·青少年期
 *   n123 / 12345 → 36岁女性，兑·青年期
 */
"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DEMO_CREDENTIALS } from "@/content/guardian";
import { demoLogin, isDemoLoggedIn } from "@/lib/demo";

/** DEMO ONLY — not real authentication */
function QuickFillButton({
  credential,
  onFill,
}: {
  credential: (typeof DEMO_CREDENTIALS)[number];
  onFill: (u: string, p: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onFill(credential.username, credential.password)}
      className="flex flex-col gap-1 rounded-sm border border-rule bg-paper-pure p-3 text-left transition-colors hover:border-green/40 hover:bg-paper"
    >
      <span className="font-serif text-sm text-ink">{credential.personaLabel}</span>
      <span className="font-mono text-[0.65rem] text-muted">
        {credential.personaSummary}
      </span>
      <span className="mt-1 font-mono text-[0.6rem] uppercase tracking-wider text-muted/70">
        账号 {credential.username}
      </span>
    </button>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const errorRef = useRef<HTMLParagraphElement>(null);

  // Clear error on input change
  const handleUsernameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value);
      if (error) setError(null);
    },
    [error]
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      if (error) setError(null);
    },
    [error]
  );

  const handleQuickFill = useCallback((u: string, p: string) => {
    setUsername(u);
    setPassword(p);
    setError(null);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!username.trim() || !password.trim()) {
        setError("请输入账号和密码。");
        return;
      }
      setLoading(true);
      setError(null);

      // Simulate brief network delay for UX
      await new Promise((r) => setTimeout(r, 400));

      const ok = demoLogin(username, password);
      if (ok) {
        router.push("/profile");
      } else {
        setError("当前仅开放演示账号（m123 / n123），请使用演示账号登录。");
        setLoading(false);
      }
    },
    [username, password, router]
  );

  // Redirect if already logged in
  useEffect(() => {
    if (isDemoLoggedIn()) {
      router.replace("/profile");
    }
  }, [router]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Page header */}
        <div className="mb-8 text-center">
          <h1 className="font-serif text-2xl text-ink sm:text-3xl">
            登录体验
          </h1>
          <p className="mt-2 text-sm text-muted">
            乐懒守护 · 人生档案演示
          </p>
        </div>

        {/* Demo disclaimer */}
        <div className="mb-6 rounded-sm border border-cinnabar/30 bg-cinnabar/5 px-4 py-3">
          <p className="text-xs text-cinnabar">
            本页面为产品演示登录，不构成任何真实账号或身份认证系统。
            当前仅开放两个固定演示账号，请勿输入个人真实信息。
          </p>
        </div>

        {/* Quick-fill section */}
        <div className="mb-6">
          <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-wider text-muted">
            快速体验
          </p>
          <div className="grid grid-cols-2 gap-3">
            {DEMO_CREDENTIALS.map((cred) => (
              <QuickFillButton
                key={cred.username}
                credential={cred}
                onFill={handleQuickFill}
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-rule" aria-hidden />
          <span className="font-mono text-[0.6rem] uppercase tracking-wider text-muted">
            或手动输入
          </span>
          <span className="h-px flex-1 bg-rule" aria-hidden />
        </div>

        {/* Login form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="username"
              className="font-mono text-[0.65rem] uppercase tracking-wider text-muted"
            >
              账号
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="演示账号"
              className="w-full rounded-sm border border-rule bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-muted/50 focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
              aria-required="true"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="font-mono text-[0.65rem] uppercase tracking-wider text-muted"
            >
              密码
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="演示密码"
              className="w-full rounded-sm border border-rule bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-muted/50 focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
              aria-required="true"
            />
          </div>

          {/* Error message */}
          {error && (
            <p
              ref={errorRef}
              role="alert"
              aria-live="polite"
              className="rounded-sm border border-cinnabar/30 bg-cinnabar/5 px-3 py-2 text-xs text-cinnabar"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-sm border border-ink bg-ink px-4 py-2.5 text-sm text-paper transition-colors hover:bg-green-dark disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "登录中…" : "登录 Demo"}
          </button>
        </form>

        {/* Back link */}
        <div className="mt-6 text-center">
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
