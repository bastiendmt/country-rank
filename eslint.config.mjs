import next from 'eslint-config-next';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

const eslintConfig = [
  ...next,
  ...nextCoreWebVitals,
  ...nextTypescript,
  js.configs.recommended,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  {
    // TypeScript already reports undefined names, and `no-undef` flags Next's
    // global `PageProps` / `LayoutProps` types.
    files: ['**/*.{ts,tsx}'],
    rules: { 'no-undef': 'off' },
  },
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
];

export default eslintConfig;
