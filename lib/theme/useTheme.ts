/**
 * LELAN TECHNOLOGY · useTheme
 *
 * Phase 1F.3 — Client-side theme hook.
 *
 * Responsibilities:
 *   1. Apply stored theme to <html data-theme> on mount
 *   2. Listen for system preference changes (matchMedia listener)
 *   3. Provide toggle() to switch between light/dark
 *
 * SSR-safe: uses useSyncExternalStore for both system preference and
 * localStorage. The pre-paint script in layout.tsx sets data-theme before
 * React hydrates, so SSR and first paint agree.
 *
 * The toggle uses a custom in-memory store (NOT setState in effect) so
 * React re-renders the icon correctly after the user clicks.
 */

"use client";

import { useSyncExternalStore } from "react";
import {
  type Theme,
  getStoredTheme,
  storeTheme as persist,
  systemTheme,
  applyTheme,
} from "./index";

// ── Store 1: system dark-mode preference ────────────────────────────────────

function subscribeSystem(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}
function getSystemSnapshot() {
  return systemTheme();
}
function getServerSnapshot_System() {
  return "light" as Theme;
}

// ── Store 2: in-memory mirror of localStorage ───────────────────────────────
//
// localStorage's `storage` event does NOT fire on the same tab that wrote.
// To make the icon update immediately after toggle(), we keep an in-memory
// version of the user's choice and re-read localStorage on each snapshot.
//
// Cross-tab sync is handled by the storage event in subscribe().

let memStored: Theme | null = null;
if (typeof window !== "undefined") {
  memStored = getStoredTheme();
}

function subscribeStored(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  // Cross-tab sync
  window.addEventListener("storage", (e) => {
    if (e.key === "lelan:theme" || e.key === null) {
      memStored = getStoredTheme();
      callback();
    }
  });
  // Same-tab updates: a custom event the toggle() function dispatches.
  window.addEventListener("lelan:theme-changed", () => {
    memStored = getStoredTheme();
    callback();
  });
  return () => {
    window.removeEventListener("storage", () => {});
    window.removeEventListener("lelan:theme-changed", () => {});
  };
}
function getStoredSnapshot() {
  return memStored;
}
function getServerSnapshot_Stored() {
  return null as Theme | null;
}

export interface UseThemeReturn {
  /** The theme that IS CURRENTLY APPLIED to <html>. */
  theme: Theme;
  /** True after the first client render. SSR renders false (placeholder). */
  mounted: boolean;
  /** Toggle to the other theme. */
  toggle: () => void;
}

/**
 * useTheme — single source of truth for the theme state.
 *
 * The `mounted` flag uses a third useSyncExternalStore (with a server snapshot
 * of `false` and client snapshot of `true`) so the placeholder-vs-icon switch
 * is fully reactive — no setState in effects.
 */
export function useTheme(): UseThemeReturn {
  const system = useSyncExternalStore(
    subscribeSystem,
    getSystemSnapshot,
    getServerSnapshot_System
  );
  const stored = useSyncExternalStore(
    subscribeStored,
    getStoredSnapshot,
    getServerSnapshot_Stored
  );
  // mounted: server=false, client=true (after hydration useSyncExternalStore
  // returns the client snapshot).
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const effective: Theme = stored ?? system;

  const toggle = () => {
    const next: Theme = effective === "light" ? "dark" : "light";
    persist(next);
    applyTheme(next);
    // Notify same-tab subscribers
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("lelan:theme-changed"));
    }
  };

  return { theme: effective, mounted, toggle };
}
