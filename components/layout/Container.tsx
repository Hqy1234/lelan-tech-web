/**
 * LELAN TECHNOLOGY · Container
 *
 * 编辑型页宽容器：mobile 满宽 + 安全内边距；desktop 上限 1200px。
 *
 * 纯 server component；不依赖任何 client runtime。
 */
import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  /** 视觉节律：默认宽松；`tight` 用于紧凑列表 / footer */
  density?: "default" | "tight";
  /** 选择 native `<section>` / `<div>`，让调用方语义化 */
  as?: "div" | "section" | "header" | "footer" | "nav" | "main";
  /** 可选 aria label */
  ariaLabel?: string;
  /** 自定义 className */
  className?: string;
}

export function Container({
  children,
  density = "default",
  as: Tag = "div",
  ariaLabel,
  className,
}: ContainerProps) {
  const padY =
    density === "tight" ? "py-6 sm:py-8" : "py-12 sm:py-16 md:py-20";
  const merged = `mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10 ${padY} ${className ?? ""}`.trim();
  return (
    <Tag
      className={merged}
      {...(ariaLabel ? { "aria-label": ariaLabel } : {})}
    >
      {children}
    </Tag>
  );
}
