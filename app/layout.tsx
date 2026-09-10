import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { brandName, locale } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";

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
    <html lang={locale} className="h-full antialiased">
      <body className="min-h-full bg-paper text-ink" suppressHydrationWarning>
        {/* Skip link — first focusable element for keyboard users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-paper-pure focus:px-3 focus:py-2 focus:text-ink focus:underline"
        >
          跳到主内容
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
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
