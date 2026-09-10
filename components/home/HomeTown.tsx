/**
 * LELAN TECHNOLOGY · Home · Town (成果小镇)
 *
 * 设计原则：
 * - 8 个铺子**全部可见**，不依赖 hover-only tooltip；
 * - 使用原生 <details>/<summary> 实现选择/披露，**无需任何 JS**；
 * - 8 个铺子的 plain-language 服务描述全部在初始 HTML 中出现；
 * - 视觉：bounded image frames（占位图不透明）+ 编辑型栅格。
 *
 * Server component。完全静态。
 */
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusLabel } from "@/components/ui/StatusLabel";
import { townShops } from "@/content/town";
import { townPaperTeahouse, townWenqu } from "@/content/assets";
import type { HomeTownSection } from "@/content/home";

interface HomeTownProps {
  section: HomeTownSection;
}

/**
 * 仅在 Phase 1B 拥有 delivery 资产的铺子才接收视觉锚点；
 * 其余铺子保留纯文字铺位卡片，避免出现伪造或拼接的视觉。
 *
 * 当前 Phase 1B 不在每个铺子卡片上绘制建筑 / 角色图，
 * 以避免对未透明化的 placeholder 资产做伪"贴图对齐"。
 * 真实交付的图层就绪后，再按需逐个铺位解锁。
 */

const AVAILABILITY_TONE: Record<string, "preview" | "concept" | "ready"> = {
  preview: "preview",
  concept: "concept",
  ready: "ready",
};

const AVAILABILITY_LABEL: Record<string, string> = {
  preview: "Preview",
  concept: "Concept",
  ready: "Ready",
};

export function HomeTown({ section }: HomeTownProps) {
  const ordered = section.shopIds
    .map((id) => townShops.find((s) => s.id === id))
    .filter((s): s is (typeof townShops)[number] => Boolean(s));

  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="border-b border-rule bg-paper"
    >
      <Container as="div">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <SectionHeading
            id={`${section.id}-title`}
            number={section.number}
            title={section.title}
            intro={section.intro}
            systemLabel="Town · 阳"
          />
          <StatusLabel tone="preview" label="图谱阶段" />
        </div>

        {/* Capabilities strip — restrained */}
        <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-mono uppercase tracking-[0.2em] text-muted">
            六维能力
          </span>
          {section.capabilities.map((cap) => (
            <span
              key={cap}
              className="rounded-sm border border-rule px-2 py-0.5 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-ink/80"
            >
              {cap}
            </span>
          ))}
        </div>

        {/* Shop grid */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ordered.map((shop) => {
            return (
              <details
                key={shop.id}
                className="group rounded-sm border border-rule bg-paper-pure transition-colors open:border-green/40 hover:border-green/40"
              >
                <summary className="flex cursor-pointer list-none items-start gap-3 p-4 transition-colors group-hover:bg-paper/40">
                  <span
                    aria-hidden
                    className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-rule font-mono text-[0.65rem] uppercase tracking-[0.15em] text-ink/70 transition-colors group-open:border-green group-open:text-green"
                  >
                    {shop.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-serif text-base leading-tight text-ink">
                      {shop.name}
                    </p>
                    <p className="mt-1 truncate text-xs text-muted">
                      {shop.plainLanguageService}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="mt-0.5 text-muted transition-transform group-open:rotate-90"
                  >
                    ›
                  </span>
                </summary>

                <div className="border-t border-rule px-4 pb-4 pt-4">
                  <p className="text-sm leading-relaxed text-ink/85">
                    {shop.shortDescription}
                  </p>
                  <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                    <dt className="font-mono uppercase tracking-[0.18em] text-muted">
                      Agent
                    </dt>
                    <dd className="text-ink">{shop.agent}</dd>
                    <dt className="font-mono uppercase tracking-[0.18em] text-muted">
                      Status
                    </dt>
                    <dd>
                      <StatusLabel
                        tone={AVAILABILITY_TONE[shop.availability]}
                        label={AVAILABILITY_LABEL[shop.availability]}
                      />
                    </dd>
                  </dl>
                </div>
              </details>
            );
          })}
        </div>

        {/* Representative visual — bounded frame, opaque placeholder */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <figure className="overflow-hidden rounded-sm border border-rule bg-paper-pure">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={townPaperTeahouse.src}
                alt={townPaperTeahouse.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <figcaption className="border-t border-rule px-4 py-3 text-xs text-muted">
              论文茶寮 · 建筑示意
              <span className="ml-2 inline-block rounded-sm border border-rule px-1.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.18em]">
                Placeholder
              </span>
            </figcaption>
          </figure>

          <figure className="overflow-hidden rounded-sm border border-rule bg-paper-pure">
            <div className="relative aspect-square w-full">
              <Image
                src={townWenqu.src}
                alt={townWenqu.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <figcaption className="border-t border-rule px-4 py-3 text-xs text-muted">
              文曲茶娘 · 服务人格示意
              <span className="ml-2 inline-block rounded-sm border border-rule px-1.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.18em]">
                Placeholder
              </span>
            </figcaption>
          </figure>
        </div>

        <p className="mt-6 text-xs text-muted sm:text-sm">{section.statusNote}</p>
      </Container>
    </section>
  );
}
