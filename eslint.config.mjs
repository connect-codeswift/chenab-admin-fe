import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import tailwind from "eslint-plugin-tailwindcss";

const V3_GRADIENT = "bg-gradient-to-";
const FRACTIONAL_ARBITRARY =
  "(?<!tracking-|leading-)\\[-?[0-9]*\\.[0-9]+(px|rem)\\]";
const FRACTIONAL_MESSAGE =
  "Fractional px/rem from Figma/MCP. Round to the nearest integer, then to the Tailwind 4px scale (h-[180px] -> h-45). Sub-pixel borders are `border`, not `border-[0.97px]`.";
const GRADIENT_MESSAGE =
  "Tailwind v4 renamed gradients: use bg-linear-to-* instead of bg-gradient-to-*. from-*/via-*/to-* are unchanged.";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: { tailwindcss: tailwind },
    settings: {
      tailwindcss: { cssConfigPath: "./src/app/globals.css" },
    },
    rules: {
      "tailwindcss/no-unnecessary-arbitrary-value": "warn",
      "tailwindcss/no-contradicting-classname": "warn",
      "tailwindcss/enforces-negative-arbitrary-values": "warn",
      "tailwindcss/important-modifier-suffix": "warn",
      "tailwindcss/classnames-order": "off",
      "tailwindcss/no-arbitrary-value": "off",
      "tailwindcss/enforces-shorthand": "off",
      "tailwindcss/no-custom-classname": "off",

      "no-restricted-syntax": [
        "warn",
        {
          selector: `Literal[value=/${FRACTIONAL_ARBITRARY}/]`,
          message: FRACTIONAL_MESSAGE,
        },
        {
          selector: `TemplateElement[value.raw=/${FRACTIONAL_ARBITRARY}/]`,
          message: FRACTIONAL_MESSAGE,
        },
        {
          selector: `Literal[value=/${V3_GRADIENT}/]`,
          message: GRADIENT_MESSAGE,
        },
        {
          selector: `TemplateElement[value.raw=/${V3_GRADIENT}/]`,
          message: GRADIENT_MESSAGE,
        },
      ],
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "public/**",
  ]),
]);

export default eslintConfig;
