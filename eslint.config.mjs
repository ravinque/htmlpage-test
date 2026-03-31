import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    ignores: [
      'node_modules/**',
      'playwright-report/**',
      'test-results/**',
      'reports/**',
      'blob-report/**',
      'eslint.config.mjs',
      '**/*.cjs',
    ],
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  }
);
