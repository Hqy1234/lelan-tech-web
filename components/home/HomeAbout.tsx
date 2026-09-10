/**
 * LELAN TECHNOLOGY · Home · About
 *
 * Phase 1C: Reduced card repetition, tighter vertical rhythm.
 *
 * Server component. Static.
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
      <Container density="tight" as="div">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
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
          </div>
        </div>
      </Container>
    </section>
  );
}
