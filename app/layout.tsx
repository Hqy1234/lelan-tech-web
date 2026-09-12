/**
 * LELAN TECHNOLOGY · Root Layout
 *
 * Phase 1F.3 — Light / Dark Theme Foundation.
 *
 * <html data-theme="auto"> — default. The pre-paint script below reads
 * localStorage and upgrades to "light" / "dark" before first paint.
 * This prevents FOUC for users who have already chosen a theme.
 */
import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { brandName, locale } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";

/** Pre-paint theme initializer — runs before first paint, no flash.
 * Reads localStorage["lelan:theme"]. If present, upgrades data-theme
 * from "auto" to the stored value. Otherwise leaves "auto" so CSS
 * media queries follow system preference.
 * Safe to inline — this script is ~15 lines and runs < 1ms.
 */
const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('lelan:theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})()`;

export const metadata: Metadata = buildMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f3ec",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={locale} className="h-full antialiased" data-theme="auto" suppressHydrationWarning>
      {/* Pre-paint theme initialization — must be FIRST child of <html>
        (inside <body>) to minimize flash risk. Putting <head> directly
        in App Router layouts is forbidden in Next.js 13+ — it conflicts
        with Next's automatic head management. The script is harmless
        if Next moves it; it only reads localStorage and sets data-theme. */}
      <body className="min-h-full bg-paper text-ink" suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
        {/* Skip link — first focusable element for keyboard users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-paper-pure focus:px-3 focus:py-2 focus:text-ink focus:underline"
        >
          跳到主内容
        </a>
        <SiteHeader />
        {/* Phase 1G-R3 — LELAN EDITORIAL SPINE.
            The <main> wraps the entire homepage in a single ambient
            atmospheric field. Every chapter section sits on top of
            this shared paper/ink foundation rather than painting
            its own solid rectangle. The spine hairline (visible
            only on desktop) marks where every chapter number lives. */}
        <main id="main" className="lelan-page-spine">
          {children}
        </main>
        <SiteFooter />
        <noscript>
          <p className="px-5 py-4 text-sm text-muted">
            本站点由 {brandName} 提供。启用 JavaScript 以获得完整体验。{" "}
            <Link href="#hero">返回顶部</Link>
          </p>
        </noscript>
      </body>
    </html>
  );
}
