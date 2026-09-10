/**
 * LELAN TECHNOLOGY · Site Footer
 *
 * Phase 1C alignment with header:
 * - Nav items match header: 首页 / 产品 / 成果小镇 / 乐懒守护 / 关于
 * - Beta availability shown consistently (Beta 即将开放, not "申请 Beta")
 * - Consistent honest treatment: both header and footer show "Beta 即将开放"
 *
 * Server component. Static.
 */
import Link from "next/link";
import { brandName, siteName } from "@/content/site";
import { Container } from "./Container";

const FOOTER_SECTIONS: ReadonlyArray<{
  title: string;
  links: ReadonlyArray<{ label: string; href: string; pending?: boolean }>;
}> = [
  {
    title: "产品",
    links: [
      { label: "成果小镇", href: "#town" },
      { label: "乐懒守护", href: "#guardian" },
      { label: "乐懒 AI · 论文智能助手", href: "#ai" },
    ],
  },
  {
    title: "了解乐懒",
    links: [
      { label: "首页", href: "#hero" },
      { label: "关于", href: "#about" },
    ],
  },
  {
    title: "Beta",
    links: [
      { label: "Beta 即将开放", href: "#ai", pending: true },
    ],
  },
  {
    title: "法务",
    links: [
      { label: "隐私政策", href: "#privacy" },
      { label: "使用条款", href: "#terms" },
    ],
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="mt-12 border-t border-rule bg-paper-pure text-ink sm:mt-16"
      role="contentinfo"
    >
      <Container density="default">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* Identity column */}
          <div className="md:col-span-1">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted">
              {siteName}
            </p>
            <p className="mt-2 font-serif text-lg text-ink">{brandName}</p>
            <p className="mt-3 max-w-xs text-xs text-muted">
              一家将科研能力、数据与 AI 转化为真实可用产品与服务的科技公司。
            </p>
          </div>

          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted">
                {section.title}
              </p>
              <ul className="mt-2 space-y-1.5 text-sm">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.pending ? (
                      <span
                        className="inline-flex items-baseline gap-2 text-muted"
                        aria-disabled="true"
                      >
                        <span>{link.label}</span>
                      </span>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-ink/80 transition-colors hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="my-10 border-rule" />

        <div className="flex flex-col items-start justify-between gap-2 text-xs text-muted sm:flex-row sm:items-center">
          <p>
            © {year} {brandName}. 保留所有权利。
          </p>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em]">
            当前为公开预览阶段 · noindex
          </p>
        </div>
      </Container>
    </footer>
  );
}
