/**
 * LELAN TECHNOLOGY · Homepage
 *
 * Phase 1B · Responsive Homepage Baseline
 *
 * 区块顺序（与 content/home.ts 完全对齐）：
 *   00 / Hero
 *   01 / Two-System Architecture
 *   02 / LeLan AI
 *   03 / LeLan Town
 *   04 / LeLan Guardian
 *   05 / Technology / Capability
 *   06 / About
 *
 * 设计原则：80% editorial / 20% oriental-spatial；
 *          Server Components only；无 hover-only 信息。
 */
import { homeSections } from "@/content/home";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeArchitecture } from "@/components/home/HomeArchitecture";
import { HomeAi } from "@/components/home/HomeAi";
import { HomeTown } from "@/components/home/HomeTown";
import { HomeGuardian } from "@/components/home/HomeGuardian";
import { HomeTechnology } from "@/components/home/HomeTechnology";
import { HomeAbout } from "@/components/home/HomeAbout";

export default function HomePage() {
  return (
    <>
      {homeSections.map((section) => {
        switch (section.kind) {
          case "hero":
            return <HomeHero key={section.id} section={section} />;
          case "architecture":
            return <HomeArchitecture key={section.id} section={section} />;
          case "ai":
            return <HomeAi key={section.id} section={section} />;
          case "town":
            return <HomeTown key={section.id} section={section} />;
          case "guardian":
            return <HomeGuardian key={section.id} section={section} />;
          case "technology":
            return <HomeTechnology key={section.id} section={section} />;
          case "about":
            return <HomeAbout key={section.id} section={section} />;
        }
      })}
    </>
  );
}
