import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

// @ts-expect-error - eslint-plugin-next is not typed
import pluginNext from '@next/eslint-plugin-next';

export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: {
      globals: {
        ...globals.browser,
        process: true,
      },
    }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact?.configs?.flat?.recommended,
  {settings: {
      react: {
        version: "detect"
      }
    }},
  {ignores: [
      ".next/*",
      "*.cjs",
      "tailwind.config.ts",
      "*/components/ui/*",
      "node_modules/*",
    ]},
  {rules: {
      'no-unused-expressions': 'error',
      '@typescript-eslint/no-unused-expressions': 'off',
      "react/react-in-jsx-scope": "off",
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
    }},
  {plugins: {
      '@next/next': pluginNext,
    }},
];