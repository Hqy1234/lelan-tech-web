/**
 * LELAN TECHNOLOGY · Home · About
 *
 * 克制、短、不重复 hero；不发明团队规模、融资、合作伙伴、年限。
 *
 * Server component，静态。
 */
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { HomeAboutSection } from "@/content/home";

interface HomeAboutProps {
  section: HomeAboutSection;
}

export function HomeAbout({ section }: HomeAboutProps) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="border-b border-rule bg-paper-pure"
    >
      <Container as="div">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionHeading
              id={`${section.id}-title`}
              number={section.number}
              title={section.title}
              intro={section.intro}
            />
          </div>

          <div className="md:col-span-8">
            <p className="lede text-lg leading-relaxed text-ink sm:text-xl">
              {section.body}
            </p>

            {/* Honest contact placeholder */}
            <div className="mt-8 rounded-sm border border-rule bg-paper p-5 sm:p-6">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted">
                联系与团队详情
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink/85 sm:text-base">
                团队介绍、详细联系信息与正式联系邮箱将在后续版本公布；
                当前阶段如需沟通，请通过首页 Beta 申请入口提交。
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
