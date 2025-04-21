import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      // 'eslint:recommended',
      'next',
      'next/core-web-vitals',
      'next/typescript',
      'prettier',
    ],
  }),
];

export default eslintConfig;
