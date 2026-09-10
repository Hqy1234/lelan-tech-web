/**
 * LELAN TECHNOLOGY · Demo Session Utilities
 *
 * Phase 1D-G2 — DEMO ONLY, NOT AUTHENTICATION.
 *
 * This module manages the demo session stored in sessionStorage.
 * It is NOT real authentication — all credentials are publicly documented.
 *
 * Future: Replace with real auth provider (Supabase Auth / NextAuth / etc.)
 * without changing the Profile page UI, as long as the session stores
 * a profileId that maps to the same GuardianProfile contract.
 *
 * Session shape:
 *   { profileId: string }
 *
 * NEVER store passwords in sessionStorage.
 * NEVER use these credentials as a model for production auth.
 */

import {
  DEMO_CREDENTIALS,
  DEMO_PROFILES,
  SESSION_KEY,
  type DemoCredential,
  type GuardianProfile,
} from "@/content/guardian";

/* ========================================================================
   Session read / write (client-side only)
   ======================================================================== */

export interface DemoSession {
  profileId: string;
}

/** Read current demo session from sessionStorage. Returns null if not logged in. */
export function getDemoSession(): DemoSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (
      parsed &&
      typeof parsed === "object" &&
      "profileId" in parsed &&
      typeof (parsed as DemoSession).profileId === "string"
    ) {
      return parsed as DemoSession;
    }
    return null;
  } catch {
    return null;
  }
}

/** Write demo session to sessionStorage. */
export function setDemoSession(session: DemoSession): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

/** Remove demo session (logout). */
export function clearDemoSession(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_KEY);
}

/** Check whether a demo session exists. */
export function isDemoLoggedIn(): boolean {
  return getDemoSession() !== null;
}

/** Get the currently logged-in demo profile, or null. */
export function getDemoProfile(): GuardianProfile | null {
  const session = getDemoSession();
  if (!session) return null;
  return DEMO_PROFILES.get(session.profileId) ?? null;
}

/* ========================================================================
   Credential validation (client-side demo only)
   Returns the profileId on success, null on failure.
   ======================================================================== */

export function validateDemoCredential(
  username: string,
  password: string
): string | null {
  const match = DEMO_CREDENTIALS.find(
    (c: DemoCredential) => c.username === username && c.password === password
  );
  return match ? match.profileId : null;
}

/** Attempt demo login. Returns true on success. */
export function demoLogin(username: string, password: string): boolean {
  const profileId = validateDemoCredential(username, password);
  if (!profileId) return false;
  setDemoSession({ profileId });
  return true;
}

/** Attempt demo logout. */
export function demoLogout(): void {
  clearDemoSession();
}
