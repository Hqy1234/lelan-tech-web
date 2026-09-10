/**
 * LELAN TECHNOLOGY · Site Footer
 *
 * 仅展示已存在 / 已规划的导航与品牌信息；
 * 不出现任何邮箱、地址、注册号、合作伙伴 logo 等未确认信息。
 *
 * 隐私 / 条款当前**未发布**；采用 honest unavailable state：
 * 在 footer 中保留路由名但显式标注"尚未发布"，点击不跳到任何虚构 URL。
 */
import Link from "next/link";
import { brandName, siteName } from "@/content/site";
import { Container } from "./Container";

interface FooterLink {
  label: string;
  href: string | null;
  pending?: boolean;
}

const FOOTER_SECTIONS: ReadonlyArray<{
  title: string;
  links: ReadonlyArray<FooterLink>;
}> = [
  {
    title: "产品",
    links: [
      { label: "乐懒成果小镇", href: "#town" },
      { label: "乐懒守护", href: "#guardian" },
      { label: "乐懒 AI · 论文智能助手", href: "#ai" },
    ],
  },
  {
    title: "了解乐懒",
    links: [
      { label: "关于", href: "#about" },
      { label: "团队", href: "#about", pending: true },
      { label: "联系", href: "#about", pending: true },
    ],
  },
  {
    title: "法务",
    links: [
      { label: "隐私政策", href: null, pending: true },
      { label: "使用条款", href: null, pending: true },
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
              <ul className="mt-3 space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.href && !link.pending ? (
                      <Link
                        href={link.href}
                        className="text-ink/80 transition-colors hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <span
                        className="inline-flex items-baseline gap-2 text-muted/70"
                        aria-disabled="true"
                      >
                        <span>{link.label}</span>
                        <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em]">
                          尚未发布
                        </span>
                      </span>
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
