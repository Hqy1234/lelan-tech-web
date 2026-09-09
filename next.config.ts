import type { NextConfig } from "next";

/**
 * LELAN TECHNOLOGY 官方网站 — Next.js 配置
 *
 * - 静态导出 (output: "export")：站点为纯前端，无 API Routes / Server Actions。
 * - 不连接任何外部服务（Dify / DeepSeek / Supabase 等）。
 * - App Router；图片通过 unoptimized 走静态导出。
 */
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
