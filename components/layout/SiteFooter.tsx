/**
 * LELAN TECHNOLOGY · Site Footer
 *
 * Phase 1E.3-A — Engineering Hardening + grouped links.
 *
 * Changes from Phase 1C:
 * - All cross-page anchors use "/#section" absolute paths so links
 *   work from any subpage (matches Header).
 * - Grouped by SYSTEMS / SOFTWARE / COMPANY / LEGAL.
 * - Footer Beta entry replaced with explicit software status so it
 *   does not contradict AI's "体验版可用" — LeLan AI is in SOFTWARE
 *   group, with status text matching the AI section.
 *
 * Server component. Static.
 */
import Link from "next/link";
import { brandName, siteName } from "@/content/site";
import { Container } from "./Container";

const FOOTER_SECTIONS: ReadonlyArray<{
  group: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}> = [
  {
    group: "SYSTEMS",
    links: [
      { label: "乐懒守护", href: "/#guardian" },
      { label: "成果小镇", href: "/#town" },
    ],
  },
  {
    group: "SOFTWARE",
    links: [
      { label: "乐懒 AI · 论文智能助手", href: "/#ai" },
    ],
  },
  {
    group: "COMPANY",
    links: [
      { label: "首页", href: "/#hero" },
      { label: "关于", href: "/#about" },
    ],
  },
  {
    group: "LEGAL",
    links: [
      { label: "隐私政策", href: "/#privacy" },
      { label: "使用条款", href: "/#terms" },
    ],
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="mt-16 border-t border-rule bg-paper-pure text-ink"
      role="contentinfo"
    >
      <Container density="default">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          {/* Identity column */}
          <div className="col-span-2 sm:col-span-1">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted">
              {siteName}
            </p>
            <p className="mt-2 font-serif text-lg text-ink">{brandName}</p>
            <p className="mt-3 max-w-xs text-xs text-muted">
              一家将科研能力、数据与 AI 转化为真实可用产品与服务的科技公司。
            </p>
          </div>

          {FOOTER_SECTIONS.map((section) => (
            <div key={section.group}>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted">
                {section.group}
              </p>
              <ul className="mt-2 space-y-1.5 text-sm">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      prefetch={false}
                      className="text-ink/80 transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            © {year} {brandName}. 保留所有权利。
          </p>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
            公开预览 · noindex
          </p>
        </div>
      </Container>
    </footer>
  );
}
