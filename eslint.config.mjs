import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Build scripts — not part of the web app
    "scripts/**",
  ]),
  // Relax react-hooks/set-state-in-effect for intentional sessionStorage hydration.
  // This is the standard Next.js pattern for reading sessionStorage/localStorage post-mount.
  {
    files: [
      "**/app/profile/page.tsx",
      "**/components/layout/DemoAccountNav.tsx",
      "**/app/login/LoginForm.tsx",
      "**/components/guardian/demo/GuardianDemoForm.tsx",
    ],
    rules: {
      "react-hooks/set-state-in-effect": "off",
      // Allow window.location.href for reliable navigation in static export demo
      "@next/next/no-location-assign-relative-destination": "off",
    },
  },
]);

export default eslintConfig;
