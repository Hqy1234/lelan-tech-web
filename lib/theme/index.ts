/**
 * LELAN TECHNOLOGY · Theme
 *
 * Phase 1F.3 — Light / Dark Theme Foundation.
 *
 * Storage: localStorage["lelan:theme"]
 * Values: "light" | "dark"
 * No value = follow system (prefers-color-scheme)
 *
 * Exported:
 *   THEME_STORAGE_KEY
 *   Theme
 *   getStoredTheme()      → Theme | null
 *   storeTheme(t: Theme)  → void
 *   clearStoredTheme()    → void
 *   systemTheme()         → "light" | "dark"
 *   effectiveTheme(t)     → "light" | "dark"  (null → system)
 */

export const THEME_STORAGE_KEY = "lelan:theme" as const;

export type Theme = "light" | "dark";

/** Read from localStorage. Returns null if not yet chosen by user. */
export function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return null;
}

/** Persist user choice. */
export function storeTheme(theme: Theme): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

/** Clear stored choice — reverts to system preference. */
export function clearStoredTheme(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(THEME_STORAGE_KEY);
}

/** Read the OS preference. */
export function systemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/** Resolve effective theme: explicit choice or system. */
export function effectiveTheme(stored: Theme | null): Theme {
  return stored ?? systemTheme();
}

/** Apply theme to <html> attribute. */
export function applyTheme(theme: Theme): void {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
}
