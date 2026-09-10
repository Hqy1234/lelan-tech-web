/**
 * LELAN TECHNOLOGY · Homepage
 *
 * Phase 1D-G3 — Guardian-first Homepage
 *
 * 区块顺序（与 content/home.ts 完全对齐）：
 *   00 / Hero
 *   01 / 乐懒守护（核心产品，坐标化系统）
 *   03 / 乐懒成果小镇
 *   04 / 乐懒 AI · 论文智能助手
 *   05 / Technology
 *   06 / About
 *
 * 设计原则：80% editorial / 20% oriental；
 *          Server Components only；无 hover-only 信息。
 */
import { homeSections } from "@/content/home";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeGuardian } from "@/components/home/HomeGuardian";
import { HomeTown } from "@/components/home/HomeTown";
import { HomeAi } from "@/components/home/HomeAi";
import { HomeTechnology } from "@/components/home/HomeTechnology";
import { HomeAbout } from "@/components/home/HomeAbout";

export default function HomePage() {
  return (
    <>
      {homeSections.map((section) => {
        switch (section.kind) {
          case "hero":
            return <HomeHero key={section.id} section={section} />;
          case "guardian":
            return <HomeGuardian key={section.id} section={section} />;
          case "town":
            return <HomeTown key={section.id} section={section} />;
          case "ai":
            return <HomeAi key={section.id} section={section} />;
          case "technology":
            return <HomeTechnology key={section.id} section={section} />;
          case "about":
            return <HomeAbout key={section.id} section={section} />;
        }
      })}
    </>
  );
}
