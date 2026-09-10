/**
 * LELAN TECHNOLOGY · Site Header
 *
 * Phase 1D-G2 improvements:
 * - Demo login entry via DemoAccountNav client island.
 * - "Beta 即将开放" removed from header (shown inline on hero).
 * - DemoAccountNav reads sessionStorage; prevents hydration mismatch via mounted guard.
 */
import Link from "next/link";
import { brandName, siteName } from "@/content/site";
import { Container } from "./Container";
import { DemoAccountNav } from "./DemoAccountNav";

const NAV_ITEMS = [
  { href: "#hero", label: "首页" },
  { href: "#architecture", label: "产品" },
  { href: "#town", label: "成果小镇" },
  { href: "#guardian", label: "乐懒守护" },
  { href: "#about", label: "关于" },
] as const;

export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-40 border-b border-rule bg-paper/85 backdrop-blur supports-[backdrop-filter]:bg-paper/70"
      role="banner"
    >
      <Container density="tight" as="div" className="!py-3 sm:!py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Identity */}
          <Link
            href="#hero"
            className="group inline-flex items-baseline gap-2 font-serif text-ink no-underline"
            aria-label={`${siteName} ${brandName} 首页`}
          >
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted transition-colors group-hover:text-green">
              {siteName}
            </span>
            <span className="hidden text-xs text-muted sm:inline">·</span>
            <span className="hidden text-sm text-ink sm:inline">
              {brandName}
            </span>
          </Link>

          {/* Primary nav — desktop */}
          <nav
            aria-label="主导航"
            className="hidden items-center gap-6 text-sm md:flex"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                className="text-muted transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Demo account nav — client island */}
          <DemoAccountNav />
        </div>

        {/* Mobile nav: improved readability and touch targets */}
        <nav
          aria-label="主导航（移动）"
          className="mt-2 flex items-center gap-4 overflow-x-auto pb-1 text-xs text-muted md:hidden"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={`m-${item.label}-${item.href}`}
              href={item.href}
              className="shrink-0 whitespace-nowrap rounded-sm px-2 py-1.5 transition-colors hover:bg-paper-pure hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
