# LELAN TECHNOLOGY Official Website

上海乐懒科技有限公司官方官方网站。

> **项目状态**：Phase 0 · 工程脚手架
>
> 本仓库为独立项目，与 `lelan-shouhu`（参考体验版）完全分离。
> 两者独立代码库、独立 package、独立 git、独立部署、独立环境变量。

## 技术栈

- Next.js 16.3.x（App Router, `output: "export"`）
- React 19
- TypeScript（strict）
- Tailwind CSS v4（CSS-first，`@theme`）
- ESLint + eslint-config-next

## 本地开发

```bash
npm install
npm run dev
# http://localhost:3000
```

## 静态构建

```bash
npm run build
# 产物：./out
```

## 部署

Render Static Site（独立 service，不与 lelan-shouhu 共享）。

## License

MIT
