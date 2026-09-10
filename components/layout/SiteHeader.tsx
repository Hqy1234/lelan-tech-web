/**
 * LELAN TECHNOLOGY · Site Header
 *
 * 静态顶部导航；不依赖 JS。
 * 导航链接当前全部走 Homepage 内 anchor，因为目标路由尚未发布。
 *
 * 设计选择：sticky + 半透明纸色背景，便于长 Town 区块滚动时保留品牌锚点。
 * 选择"sticky"而不是"fixed"，避免占位与 hero 视觉打架。
 */
import Link from "next/link";
import { brandName, siteName } from "@/content/site";
import { Container } from "./Container";

const NAV_ITEMS = [
  { href: "#hero", label: "首页" },
  { href: "#architecture", label: "产品" },
  { href: "#about", label: "关于" },
  { href: "#about", label: "团队" },
  { href: "#about", label: "联系" },
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

          {/* Primary nav */}
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

          {/* Beta CTA — honest: scrolls to AI section which holds the beta entry */}
          <Link
            href="#ai"
            className="inline-flex items-center gap-2 rounded-sm border border-green px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-green transition-colors hover:bg-green hover:text-paper"
          >
            申请 Beta
          </Link>
        </div>

        {/* Mobile nav: compact horizontal scroll */}
        <nav
          aria-label="主导航（移动）"
          className="mt-2 flex items-center gap-4 overflow-x-auto text-xs text-muted md:hidden"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={`m-${item.label}-${item.href}`}
              href={item.href}
              className="shrink-0 whitespace-nowrap transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
