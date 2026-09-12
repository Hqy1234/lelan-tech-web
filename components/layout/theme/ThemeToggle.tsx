/**
 * LELAN TECHNOLOGY · ThemeToggle
 *
 * Phase 1F.3 — Light / Dark Theme Toggle.
 *
 * A minimal sun/moon button that toggles the site theme.
 * - Uses `useTheme()` hook for state management
 * - No icon library dependency — pure inline SVG
 * - Hydration-safe: renders a silent placeholder before mount
 * - Fully keyboard accessible + focus-visible
 */

"use client";

import { useTheme } from "@/lib/theme/useTheme";

/** Inline SVG — Sun icon */
function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
      <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
      <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
    </svg>
  );
}

/** Inline SVG — Moon icon */
function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function ThemeToggle() {
  const { theme, mounted, toggle } = useTheme();

  // SSR / pre-hydration placeholder — prevents mismatch
  if (!mounted) {
    return (
      <span
        aria-hidden
        className="inline-block h-8 w-8 rounded-sm"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      className={[
        "relative inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-sm",
        "border border-border text-foreground-muted",
        "transition-colors duration-150",
        "hover:border-border-strong hover:text-foreground",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cinnabar",
      ].join(" ")}
      aria-label={isDark ? "切换到浅色模式" : "切换到深色模式"}
      title={isDark ? "切换到浅色模式" : "切换到深色模式"}
    >
      {isDark ? (
        <MoonIcon />
      ) : (
        <SunIcon />
      )}
    </button>
  );
}
